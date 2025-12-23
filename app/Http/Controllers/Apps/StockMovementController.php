<?php

namespace App\Http\Controllers\Apps;

use App\Models\Display;
use App\Models\DisplayStock;
use App\Models\Product;
use App\Models\StockMovement;
use App\Models\Supplier;
use App\Models\Warehouse;
use App\Models\WarehouseStock;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StockMovementController extends Controller
{
    /**
     * Display a listing of stock movements.
     */
    public function index(Request $request)
    {
        $filters = [
            'product' => $request->input('product'),
            'type' => $request->input('type'),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
        ];

        $movements = StockMovement::query()
            ->with(['product:id,title,barcode', 'user:id,name', 'supplier:id,name,company'])
            ->when($filters['product'], function ($query, $product) {
                $query->whereHas('product', function ($q) use ($product) {
                    $q->where('title', 'like', '%' . $product . '%')
                        ->orWhere('barcode', 'like', '%' . $product . '%');
                });
            })
            ->when($filters['type'], function ($query, $type) {
                if ($type === 'in') {
                    $query->where('to_type', 'warehouse');
                } elseif ($type === 'transfer') {
                    $query->where('from_type', 'warehouse')->where('to_type', 'display');
                } elseif ($type === 'sale') {
                    $query->where('to_type', 'transaction');
                } elseif ($type === 'stockout') {
                    $query->where('to_type', 'out');
                }
            })
            ->when($filters['start_date'], function ($query, $date) {
                $query->whereDate('created_at', '>=', $date);
            })
            ->when($filters['end_date'], function ($query, $date) {
                $query->whereDate('created_at', '<=', $date);
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Dashboard/StockMovements/Index', [
            'movements' => $movements,
            'filters' => $filters,
        ]);
    }

    /**
     * Show form to add stock to warehouse (from supplier).
     */
    public function create()
    {
        $warehouses = Warehouse::active()->get();
        $products = Product::with('category:id,name')->get(['id', 'title', 'barcode', 'category_id']);
        $suppliers = Supplier::orderBy('name')->get(['id', 'name', 'company']);

        return Inertia::render('Dashboard/StockMovements/Create', [
            'warehouses' => $warehouses,
            'products' => $products,
            'suppliers' => $suppliers,
        ]);
    }

    /**
     * Store stock from supplier to warehouse.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'warehouse_id' => 'required|exists:warehouses,id',
            'product_id' => 'required|exists:products,id',
            'supplier_id' => 'nullable|exists:suppliers,id',
            'quantity' => 'required|integer|min:1',
            'purchase_price' => 'nullable|numeric|min:0',
            'note' => 'nullable|string',
        ]);

        DB::transaction(function () use ($validated) {
            // Add or update warehouse stock
            $stock = WarehouseStock::firstOrCreate(
                [
                    'warehouse_id' => $validated['warehouse_id'],
                    'product_id' => $validated['product_id'],
                ],
                ['quantity' => 0]
            );
            $stock->increment('quantity', $validated['quantity']);

            // Create stock movement record
            StockMovement::create([
                'product_id' => $validated['product_id'],
                'from_type' => StockMovement::TYPE_SUPPLIER,
                'from_id' => $validated['supplier_id'] ?? null,
                'supplier_id' => $validated['supplier_id'] ?? null,
                'to_type' => StockMovement::TYPE_WAREHOUSE,
                'to_id' => $validated['warehouse_id'],
                'quantity' => $validated['quantity'],
                'purchase_price' => $validated['purchase_price'] ?? null,
                'note' => $validated['note'] ?? 'Barang masuk dari supplier',
                'user_id' => auth()->id(),
            ]);
        });

        return redirect()->route('stock-movements.index')->with('success', 'Stok berhasil ditambahkan ke gudang!');
    }

    /**
     * Show form to transfer stock from warehouse to display.
     */
    public function transfer()
    {
        $warehouses = Warehouse::active()->with(['stocks' => function ($query) {
            $query->where('quantity', '>', 0)->with('product:id,title,barcode');
        }])->get();
        
        $displays = Display::active()->get();
        
        $products = Product::whereHas('warehouseStocks', function ($query) {
            $query->where('quantity', '>', 0);
        })->with('category:id,name')->get(['id', 'title', 'barcode', 'category_id']);

        return Inertia::render('Dashboard/StockMovements/Transfer', [
            'warehouses' => $warehouses,
            'displays' => $displays,
            'products' => $products,
        ]);
    }

    /**
     * Process stock transfer from warehouse to display.
     */
    public function storeTransfer(Request $request)
    {
        $validated = $request->validate([
            'warehouse_id' => 'required|exists:warehouses,id',
            'display_id' => 'required|exists:displays,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'note' => 'nullable|string',
        ]);

        // Check warehouse stock
        $warehouseStock = WarehouseStock::where('warehouse_id', $validated['warehouse_id'])
            ->where('product_id', $validated['product_id'])
            ->first();

        if (!$warehouseStock || $warehouseStock->quantity < $validated['quantity']) {
            return redirect()->back()->with('error', 'Stok gudang tidak mencukupi!');
        }

        DB::transaction(function () use ($validated, $warehouseStock) {
            // Decrease warehouse stock
            $warehouseStock->decrement('quantity', $validated['quantity']);

            // Add or update display stock
            $displayStock = DisplayStock::firstOrCreate(
                [
                    'display_id' => $validated['display_id'],
                    'product_id' => $validated['product_id'],
                ],
                ['quantity' => 0]
            );
            $displayStock->increment('quantity', $validated['quantity']);

            // Create stock movement record
            StockMovement::create([
                'product_id' => $validated['product_id'],
                'from_type' => StockMovement::TYPE_WAREHOUSE,
                'from_id' => $validated['warehouse_id'],
                'to_type' => StockMovement::TYPE_DISPLAY,
                'to_id' => $validated['display_id'],
                'quantity' => $validated['quantity'],
                'note' => $validated['note'] ?? 'Transfer dari gudang ke display',
                'user_id' => auth()->id(),
            ]);
        });

        return redirect()->route('stock-movements.index')->with('success', 'Stok berhasil ditransfer ke display!');
    }

    /**
     * Get warehouse stock for a specific product (API endpoint).
     */
    public function getWarehouseStock(Request $request)
    {
        $warehouseId = $request->input('warehouse_id');
        $productId = $request->input('product_id');

        $stock = WarehouseStock::where('warehouse_id', $warehouseId)
            ->where('product_id', $productId)
            ->first();

        return response()->json([
            'quantity' => $stock ? $stock->quantity : 0,
        ]);
    }

    /**
     * Get display stock for a specific product (API endpoint).
     */
    public function getDisplayStock(Request $request)
    {
        $displayId = $request->input('display_id');
        $productId = $request->input('product_id');

        $stock = DisplayStock::where('display_id', $displayId)
            ->where('product_id', $productId)
            ->first();

        return response()->json([
            'quantity' => $stock ? $stock->quantity : 0,
        ]);
    }

    /**
     * Show form to remove stock (stock out).
     */
    public function stockOut()
    {
        $warehouses = Warehouse::active()->with(['stocks' => function ($query) {
            $query->where('quantity', '>', 0)->with('product:id,title,barcode');
        }])->get();
        
        $displays = Display::active()->with(['stocks' => function ($query) {
            $query->where('quantity', '>', 0)->with('product:id,title,barcode');
        }])->get();
        
        $products = Product::with('category:id,name')->get(['id', 'title', 'barcode', 'category_id']);
        
        $reasons = StockMovement::getStockOutReasons();

        return Inertia::render('Dashboard/StockMovements/StockOut', [
            'warehouses' => $warehouses,
            'displays' => $displays,
            'products' => $products,
            'reasons' => $reasons,
        ]);
    }

    /**
     * Process stock out (remove stock).
     */
    public function storeStockOut(Request $request)
    {
        $validated = $request->validate([
            'location_type' => 'required|in:warehouse,display',
            'location_id' => 'required|integer',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'reason' => 'required|string',
            'note' => 'nullable|string',
        ]);

        // Check stock based on location type
        if ($validated['location_type'] === 'warehouse') {
            $stock = WarehouseStock::where('warehouse_id', $validated['location_id'])
                ->where('product_id', $validated['product_id'])
                ->first();
            $fromType = StockMovement::TYPE_WAREHOUSE;
        } else {
            $stock = DisplayStock::where('display_id', $validated['location_id'])
                ->where('product_id', $validated['product_id'])
                ->first();
            $fromType = StockMovement::TYPE_DISPLAY;
        }

        if (!$stock || $stock->quantity < $validated['quantity']) {
            return redirect()->back()->with('error', 'Stok tidak mencukupi!');
        }

        // Get reason label
        $reasons = StockMovement::getStockOutReasons();
        $reasonLabel = $reasons[$validated['reason']] ?? $validated['reason'];

        DB::transaction(function () use ($validated, $stock, $fromType, $reasonLabel) {
            // Decrease stock
            $stock->decrement('quantity', $validated['quantity']);

            // Create stock movement record
            StockMovement::create([
                'product_id' => $validated['product_id'],
                'from_type' => $fromType,
                'from_id' => $validated['location_id'],
                'to_type' => StockMovement::TYPE_OUT,
                'to_id' => null,
                'quantity' => $validated['quantity'],
                'note' => '[' . $reasonLabel . '] ' . ($validated['note'] ?? ''),
                'user_id' => auth()->id(),
            ]);
        });

        return redirect()->route('stock-movements.index')->with('success', 'Barang keluar berhasil dicatat!');
    }
}

