<?php

namespace App\Http\Controllers\Apps;

use App\Models\Display;
use App\Models\DisplayStock;
use App\Models\Product;
use App\Models\StockMovement;
use App\Models\Supplier;
use App\Models\Warehouse;
use App\Models\WarehouseStock;
use App\Exports\StockImportTemplateExport;
use App\Exports\StockMovementsExport;
use App\Exports\StockReportExport;
use App\Services\StockService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class StockMovementController extends Controller
{
    protected StockService $stockService;

    public function __construct(StockService $stockService)
    {
        $this->stockService = $stockService;
    }
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

        // Data for Transfer Modal
        $warehouses = Warehouse::active()->with(['stocks' => function ($query) {
            $query->where('quantity', '>', 0)->with('product:id,title,barcode');
        }])->get();
        
        $displays = Display::active()->with(['stocks' => function ($query) {
            $query->where('quantity', '>', 0)->with('product:id,title,barcode');
        }])->get();
        
        $transferProducts = Product::whereHas('warehouseStocks', function ($query) {
            $query->where('quantity', '>', 0);
        })->with('category:id,name')->get(['id', 'title', 'barcode', 'category_id']);

        // Data for Stock In Modal
        $allProducts = Product::with('category:id,name')->get(['id', 'title', 'barcode', 'category_id']);
        $suppliers = Supplier::orderBy('name')->get(['id', 'name', 'company']);

        // Data for Stock Out Modal
        $stockOutReasons = StockMovement::getStockOutReasons();

        return Inertia::render('Dashboard/StockMovements/Index', [
            'movements' => $movements,
            'filters' => $filters,
            'warehouses' => $warehouses,
            'displays' => $displays,
            'transferProducts' => $transferProducts,
            'allProducts' => $allProducts,
            'suppliers' => $suppliers,
            'stockOutReasons' => $stockOutReasons,
        ]);
    }

    /**
     * Export stock movements to Excel.
     */
    public function export(Request $request)
    {
        $filters = [
            'product' => $request->input('product'),
            'type' => $request->input('type'),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
        ];

        $movements = StockMovement::query()
            ->with(['product:id,title,barcode,sku', 'user:id,name', 'supplier:id,name,company'])
            ->when($filters['product'], function ($query, $product) {
                $query->whereHas('product', function ($q) use ($product) {
                    $q->where('title', 'like', '%' . $product . '%')
                        ->orWhere('barcode', 'like', '%' . $product . '%')
                        ->orWhere('sku', 'like', '%' . $product . '%');
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
            ->get();

        return Excel::download(new StockMovementsExport($movements), 'riwayat_stok_' . date('Y-m-d') . '.xlsx');
    }

    /**
     * Export stock report to Excel.
     * Includes: Nama Produk, Stok Warehouse, Stok Display, Stok Rusak, Terjual
     */
    public function exportStockReport(Request $request)
    {
        $filters = [
            'category_id' => $request->input('category_id'),
            'search' => $request->input('search'),
        ];

        return Excel::download(
            new StockReportExport($filters), 
            'laporan_stok_' . date('Y-m-d') . '.xlsx'
        );
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
     * Supports multi-item entry with items array.
     */
    public function store(Request $request)
    {
        // Check if it's multi-item entry
        if ($request->has('items') && is_array($request->items)) {
            $validated = $request->validate([
                'warehouse_id' => 'required|exists:warehouses,id',
                'supplier_id' => 'nullable|exists:suppliers,id',
                'invoice_number' => 'nullable|string|max:100',
                'items' => 'required|array|min:1',
                'items.*.product_id' => 'required|exists:products,id',
                'items.*.packaging_qty' => 'required|integer|min:1',
                'items.*.packaging_unit' => 'nullable|string|max:50',
                'items.*.qty_per_package' => 'nullable|integer|min:1',
                'items.*.quantity' => 'nullable|integer|min:0', // Calculated field
                'items.*.purchase_price' => 'nullable|numeric|min:0',
                'items.*.batch_number' => 'nullable|string|max:100',
                'items.*.expiry_date' => 'nullable|date',
                'items.*.note' => 'nullable|string',
            ]);

            $result = $this->stockService->addMultipleToWarehouse($validated);
        } else {
            // Single item entry (backward compatible)
            $validated = $request->validate([
                'warehouse_id' => 'required|exists:warehouses,id',
                'product_id' => 'required|exists:products,id',
                'supplier_id' => 'nullable|exists:suppliers,id',
                'invoice_number' => 'nullable|string|max:100',
                'batch_number' => 'nullable|string|max:100',
                'expiry_date' => 'nullable|date',
                'quantity' => 'required|integer|min:1',
                'purchase_price' => 'nullable|numeric|min:0',
                'note' => 'nullable|string',
            ]);

            $result = $this->stockService->addToWarehouse($validated);
        }

        return redirect()->route('stock-movements.index')->with('success', $result['message']);
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

        $result = $this->stockService->transferToDisplay($validated);

        if (!$result['success']) {
            return redirect()->back()->with('error', $result['message']);
        }

        return redirect()->route('stock-movements.index')->with('success', $result['message']);
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
     * Get last purchase price for a product from a supplier (API endpoint).
     */
    public function getLastPurchasePrice(Request $request)
    {
        $productId = $request->input('product_id');
        $supplierId = $request->input('supplier_id');

        $query = StockMovement::where('product_id', $productId)
            ->where('to_type', StockMovement::TYPE_WAREHOUSE)
            ->whereNotNull('purchase_price')
            ->where('purchase_price', '>', 0);

        if ($supplierId) {
            $query->where('supplier_id', $supplierId);
        }

        $lastMovement = $query->latest()->first();

        return response()->json([
            'purchase_price' => $lastMovement ? (float) $lastMovement->purchase_price : null,
            'last_date' => $lastMovement ? $lastMovement->created_at->format('d/m/Y') : null,
        ]);
    }

    /**
     * Get combined stock for a product across all warehouses (API endpoint).
     */
    public function getProductStock(Request $request)
    {
        $productId = $request->input('product_id');
        $warehouseId = $request->input('warehouse_id');

        // Get warehouse stock
        $warehouseStockQuery = WarehouseStock::where('product_id', $productId);
        if ($warehouseId) {
            $warehouseStockQuery->where('warehouse_id', $warehouseId);
        }
        $warehouseStock = $warehouseStockQuery->sum('quantity');

        // Get display stock
        $displayStock = DisplayStock::where('product_id', $productId)->sum('quantity');

        return response()->json([
            'warehouse_stock' => (float) $warehouseStock,
            'display_stock' => (float) $displayStock,
            'total_stock' => (float) ($warehouseStock + $displayStock),
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
            'quantity' => 'required|numeric|min:0.001',
            'reason' => 'required|string',
            'note' => 'nullable|string',
        ]);

        $result = $this->stockService->stockOut($validated);

        if (!$result['success']) {
            return redirect()->back()->with('error', $result['message']);
        }

        return redirect()->route('stock-movements.index')->with('success', $result['message']);
    }

    /**
     * Show bulk import form.
     */


    /**
     * Delete stock movement and revert stock changes.
     */
    public function destroy($id)
    {
        $movement = StockMovement::findOrFail($id);

        // Tidak boleh hapus movement dari transaksi
        if ($movement->to_type === StockMovement::TYPE_TRANSACTION) {
            return redirect()->back()->with('error', 'Tidak dapat menghapus pergerakan stok dari transaksi!');
        }

        DB::transaction(function () use ($movement) {
            // Revert stock based on movement type
            if ($movement->to_type === StockMovement::TYPE_WAREHOUSE) {
                // Stock In: kurangi stok warehouse
                $stock = WarehouseStock::where('warehouse_id', $movement->to_id)
                    ->where('product_id', $movement->product_id)
                    ->first();
                if ($stock) {
                    $stock->decrement('quantity', $movement->quantity);
                }
            } elseif ($movement->to_type === StockMovement::TYPE_DISPLAY) {
                // Transfer: kembalikan ke warehouse, kurangi display
                $warehouseStock = WarehouseStock::where('warehouse_id', $movement->from_id)
                    ->where('product_id', $movement->product_id)
                    ->first();
                if ($warehouseStock) {
                    $warehouseStock->increment('quantity', $movement->quantity);
                }
                
                $displayStock = DisplayStock::where('display_id', $movement->to_id)
                    ->where('product_id', $movement->product_id)
                    ->first();
                if ($displayStock) {
                    $displayStock->decrement('quantity', $movement->quantity);
                }
            } elseif ($movement->to_type === StockMovement::TYPE_OUT) {
                // Stock Out: kembalikan stok
                if ($movement->from_type === StockMovement::TYPE_WAREHOUSE) {
                    $stock = WarehouseStock::where('warehouse_id', $movement->from_id)
                        ->where('product_id', $movement->product_id)
                        ->first();
                    if ($stock) {
                        $stock->increment('quantity', $movement->quantity);
                    }
                } elseif ($movement->from_type === StockMovement::TYPE_DISPLAY) {
                    $stock = DisplayStock::where('display_id', $movement->from_id)
                        ->where('product_id', $movement->product_id)
                        ->first();
                    if ($stock) {
                        $stock->increment('quantity', $movement->quantity);
                    }
                }
            }

            // Recalculate average cost if this was a stock in with purchase price
            if ($movement->to_type === StockMovement::TYPE_WAREHOUSE && $movement->purchase_price) {
                $product = Product::find($movement->product_id);
                if ($product) {
                    // Delete first, then recalculate
                    $movement->delete();
                    $product->updateAverageCost();
                    return;
                }
            }

            $movement->delete();
        });

        return redirect()->route('stock-movements.index')->with('success', 'Pergerakan stok berhasil dihapus!');
    }
}
