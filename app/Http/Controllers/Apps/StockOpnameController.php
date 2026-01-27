<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Models\Display;
use App\Models\DisplayStock;
use App\Models\Product;
use App\Models\StockMovement;
use App\Models\StockOpname;
use App\Models\StockOpnameItem;
use App\Models\Warehouse;
use App\Models\WarehouseStock;
use App\Services\StockService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StockOpnameController extends Controller
{
    protected StockService $stockService;

    public function __construct(StockService $stockService)
    {
        $this->stockService = $stockService;
    }

    /**
     * Display a listing of stock opnames.
     */
    public function index(Request $request)
    {
        $filters = [
            'status' => $request->input('status'),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
        ];

        $opnames = StockOpname::query()
            ->with(['user:id,name', 'items'])
            ->when($filters['status'], fn($q, $status) => $q->where('status', $status))
            ->when($filters['start_date'], fn($q, $date) => $q->whereDate('created_at', '>=', $date))
            ->when($filters['end_date'], fn($q, $date) => $q->whereDate('created_at', '<=', $date))
            ->latest()
            ->paginate($request->input('per_page', 10))
            ->withQueryString();

        // Transform to add location_name and total_items
        $opnames->getCollection()->transform(function ($opname) {
            $opname->location_name = $opname->location_name;
            $opname->total_items = $opname->items->count();
            $opname->items_with_difference = $opname->items->filter(fn($i) => $i->difference != 0)->count();
            return $opname;
        });

        return Inertia::render('Dashboard/StockOpnames/Index', [
            'opnames' => $opnames,
            'filters' => $filters,
        ]);
    }

    /**
     * Show form to create a new stock opname.
     */
    public function create(Request $request)
    {
        $warehouses = Warehouse::active()->get();
        $displays = Display::active()->get();

        $locationType = $request->input('location_type', 'warehouse');
        $locationId = $request->input('location_id');

        $products = [];
        $totalProducts = 0;

        if ($locationId) {
            if ($locationType === 'warehouse') {
                $stocksQuery = WarehouseStock::where('warehouse_id', $locationId)
                    ->where('quantity', '>', 0)
                    ->with('product:id,title,sku,barcode');
            } else {
                $stocksQuery = DisplayStock::where('display_id', $locationId)
                    ->where('quantity', '>', 0)
                    ->with('product:id,title,sku,barcode');
            }

            $totalProducts = $stocksQuery->count();
            $stocks = $stocksQuery->get();

            $products = $stocks->map(function ($stock) {
                return [
                    'id' => $stock->product_id,
                    'title' => $stock->product->title ?? '-',
                    'sku' => $stock->product->sku ?? '-',
                    'barcode' => $stock->product->barcode ?? '-',
                    'system_qty' => (float) $stock->quantity,
                ];
            })->values();
        }

        return Inertia::render('Dashboard/StockOpnames/Create', [
            'warehouses' => $warehouses,
            'displays' => $displays,
            'products' => $products,
            'totalProducts' => $totalProducts,
            'selectedLocationType' => $locationType,
            'selectedLocationId' => $locationId,
        ]);
    }

    /**
     * Store a new stock opname.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'location_type' => 'required|in:warehouse,display',
            'location_id' => 'required|integer',
            'note' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.system_qty' => 'required|numeric|min:0',
            'items.*.physical_qty' => 'required|numeric|min:0',
        ]);

        $opname = DB::transaction(function () use ($validated) {
            $opname = StockOpname::create([
                'location_type' => $validated['location_type'],
                'location_id' => $validated['location_id'],
                'status' => StockOpname::STATUS_DRAFT,
                'note' => $validated['note'] ?? null,
                'user_id' => auth()->id(),
            ]);

            foreach ($validated['items'] as $item) {
                $difference = $item['physical_qty'] - $item['system_qty'];

                // Calculate loss if deficit
                $lossAmount = null;
                if ($difference < 0) {
                    $product = Product::find($item['product_id']);
                    $costPerUnit = $product->average_cost ?: ($product->buy_price ?: 0);
                    $lossAmount = abs($difference) * $costPerUnit;
                }

                $opname->items()->create([
                    'product_id' => $item['product_id'],
                    'system_qty' => $item['system_qty'],
                    'physical_qty' => $item['physical_qty'],
                    'difference' => $difference,
                    'loss_amount' => $lossAmount,
                ]);
            }

            return $opname;
        });

        return redirect()->route('stock-opnames.show', $opname->id)
            ->with('success', 'Stock opname berhasil disimpan sebagai draft.');
    }

    /**
     * Display the specified stock opname.
     */
    public function show($id)
    {
        $opname = StockOpname::with(['items.product:id,title,sku,barcode', 'user:id,name'])
            ->findOrFail($id);

        $opname->location_name = $opname->location_name;
        $opname->total_loss = $opname->total_loss;

        return Inertia::render('Dashboard/StockOpnames/Show', [
            'opname' => $opname,
        ]);
    }

    /**
     * Complete the stock opname and create adjustments.
     */
    public function complete($id)
    {
        $opname = StockOpname::with('items.product')->findOrFail($id);

        if ($opname->isCompleted()) {
            return redirect()->back()->with('error', 'Stock opname sudah selesai.');
        }

        DB::transaction(function () use ($opname) {
            foreach ($opname->items as $item) {
                if ($item->difference == 0)
                    continue;

                $product = $item->product;

                if ($opname->location_type === StockOpname::LOCATION_WAREHOUSE) {
                    $stock = WarehouseStock::where('warehouse_id', $opname->location_id)
                        ->where('product_id', $item->product_id)
                        ->first();
                    $fromType = StockMovement::TYPE_WAREHOUSE;
                } else {
                    $stock = DisplayStock::where('display_id', $opname->location_id)
                        ->where('product_id', $item->product_id)
                        ->first();
                    $fromType = StockMovement::TYPE_DISPLAY;
                }

                if (!$stock)
                    continue;

                if ($item->difference < 0) {
                    // Deficit: stock out
                    $stock->decrement('quantity', abs($item->difference));

                    StockMovement::create([
                        'product_id' => $item->product_id,
                        'from_type' => $fromType,
                        'from_id' => $opname->location_id,
                        'to_type' => StockMovement::TYPE_OUT,
                        'to_id' => null,
                        'quantity' => abs($item->difference),
                        'loss_amount' => $item->loss_amount,
                        'note' => '[Koreksi Stok - Opname #' . $opname->id . '] Selisih kurang',
                        'user_id' => auth()->id(),
                    ]);
                } else {
                    // Surplus: stock in (adjustment)
                    $stock->increment('quantity', $item->difference);

                    StockMovement::create([
                        'product_id' => $item->product_id,
                        'from_type' => StockMovement::TYPE_ADJUSTMENT,
                        'from_id' => null,
                        'to_type' => $fromType,
                        'to_id' => $opname->location_id,
                        'quantity' => $item->difference,
                        'note' => '[Koreksi Stok - Opname #' . $opname->id . '] Selisih lebih',
                        'user_id' => auth()->id(),
                    ]);
                }
            }

            $opname->update(['status' => StockOpname::STATUS_COMPLETED]);
        });

        return redirect()->route('stock-opnames.show', $opname->id)
            ->with('success', 'Stock opname berhasil diselesaikan dan stok telah dikoreksi.');
    }

    /**
     * Delete a draft stock opname.
     */
    public function destroy($id)
    {
        $opname = StockOpname::findOrFail($id);

        if ($opname->isCompleted()) {
            return redirect()->back()->with('error', 'Stock opname yang sudah selesai tidak bisa dihapus.');
        }

        $opname->delete();

        return redirect()->route('stock-opnames.index')
            ->with('success', 'Stock opname draft berhasil dihapus.');
    }
}
