<?php

namespace App\Http\Controllers\Apps;

use App\Models\Product;
use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderItem;
use App\Models\Supplier;
use App\Models\Warehouse;
use App\Models\WarehouseStock;
use App\Models\StockMovement;
use App\Services\StockService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PurchaseOrderController extends Controller
{
    protected $stockService;

    public function __construct(StockService $stockService)
    {
        $this->stockService = $stockService;
    }

    /**
     * Display a listing of purchase orders.
     */
    public function index(Request $request)
    {
        $query = PurchaseOrder::with(['supplier', 'warehouse', 'user'])
            ->withCount('items');

        // Filter by status
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Search by PO number or supplier name
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('po_number', 'like', "%{$search}%")
                    ->orWhereHas('supplier', function ($sq) use ($search) {
                        $sq->where('name', 'like', "%{$search}%");
                    });
            });
        }

        // Sort
        $sortField = $request->get('sort', 'created_at');
        $sortDir = $request->get('dir', 'desc');
        $query->orderBy($sortField, $sortDir);

        $purchaseOrders = $query->paginate(15)->withQueryString();

        return Inertia::render('Dashboard/PurchaseOrders/Index', [
            'purchaseOrders' => $purchaseOrders,
            'filters' => $request->only(['status', 'search']),
            'statuses' => PurchaseOrder::getStatuses(),
        ]);
    }

    /**
     * Show the form for creating a new purchase order.
     */
    public function create()
    {
        $suppliers = Supplier::orderBy('name')->get(['id', 'name', 'company']);
        $warehouses = Warehouse::active()->orderBy('name')->get(['id', 'name']);
        $products = Product::where('product_type', '!=', 'recipe')
            ->orderBy('title')
            ->get(['id', 'title', 'sku', 'buy_price']);

        return Inertia::render('Dashboard/PurchaseOrders/Create', [
            'suppliers' => $suppliers,
            'warehouses' => $warehouses,
            'products' => $products,
        ]);
    }

    /**
     * Store a newly created purchase order.
     */
    public function store(Request $request)
    {
        $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'warehouse_id' => 'required|exists:warehouses,id',
            'expected_date' => 'nullable|date',
            'notes' => 'nullable|string|max:1000',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|numeric|min:0.01',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.batch_number' => 'nullable|string|max:100',
            'items.*.expiry_date' => 'nullable|date',
            'items.*.notes' => 'nullable|string|max:500',
        ]);

        try {
            DB::beginTransaction();

            // Create PO
            $po = PurchaseOrder::create([
                'supplier_id' => $request->supplier_id,
                'warehouse_id' => $request->warehouse_id,
                'order_date' => now(),
                'expected_date' => $request->expected_date,
                'notes' => $request->notes,
                'user_id' => auth()->id(),
            ]);

            // Create items
            foreach ($request->items as $item) {
                PurchaseOrderItem::create([
                    'purchase_order_id' => $po->id,
                    'product_id' => $item['product_id'],
                    'quantity_ordered' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'subtotal' => $item['quantity'] * $item['unit_price'],
                    'batch_number' => $item['batch_number'] ?? null,
                    'expiry_date' => $item['expiry_date'] ?? null,
                    'notes' => $item['notes'] ?? null,
                ]);
            }

            // Recalculate total
            $po->recalculateTotal();

            DB::commit();

            return redirect()->route('purchase-orders.show', $po->id)
                ->with('success', 'Purchase Order berhasil dibuat dengan nomor: ' . $po->po_number);

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Gagal membuat Purchase Order: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified purchase order.
     */
    public function show($id)
    {
        $purchaseOrder = PurchaseOrder::with([
            'supplier',
            'warehouse',
            'user',
            'items.product',
            'stockMovements',
        ])->findOrFail($id);

        return Inertia::render('Dashboard/PurchaseOrders/Show', [
            'purchaseOrder' => $purchaseOrder,
            'statuses' => PurchaseOrder::getStatuses(),
        ]);
    }

    /**
     * Show the form for editing the purchase order (draft only).
     */
    public function edit($id)
    {
        $purchaseOrder = PurchaseOrder::with('items.product')->findOrFail($id);

        if (!$purchaseOrder->canBeEdited()) {
            return redirect()->route('purchase-orders.show', $id)
                ->with('error', 'Purchase Order tidak dapat diedit karena sudah diproses.');
        }

        $suppliers = Supplier::orderBy('name')->get(['id', 'name', 'company']);
        $warehouses = Warehouse::active()->orderBy('name')->get(['id', 'name']);
        $products = Product::where('product_type', '!=', 'recipe')
            ->orderBy('title')
            ->get(['id', 'title', 'sku', 'buy_price']);

        return Inertia::render('Dashboard/PurchaseOrders/Edit', [
            'purchaseOrder' => $purchaseOrder,
            'suppliers' => $suppliers,
            'warehouses' => $warehouses,
            'products' => $products,
        ]);
    }

    /**
     * Update the specified purchase order (draft only).
     */
    public function update(Request $request, $id)
    {
        $purchaseOrder = PurchaseOrder::findOrFail($id);

        if (!$purchaseOrder->canBeEdited()) {
            return redirect()->route('purchase-orders.show', $id)
                ->with('error', 'Purchase Order tidak dapat diedit karena sudah diproses.');
        }

        $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'warehouse_id' => 'required|exists:warehouses,id',
            'expected_date' => 'nullable|date',
            'notes' => 'nullable|string|max:1000',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|numeric|min:0.01',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.batch_number' => 'nullable|string|max:100',
            'items.*.expiry_date' => 'nullable|date',
            'items.*.notes' => 'nullable|string|max:500',
        ]);

        try {
            DB::beginTransaction();

            // Update PO
            $purchaseOrder->update([
                'supplier_id' => $request->supplier_id,
                'warehouse_id' => $request->warehouse_id,
                'expected_date' => $request->expected_date,
                'notes' => $request->notes,
            ]);

            // Delete old items and recreate
            $purchaseOrder->items()->delete();

            foreach ($request->items as $item) {
                PurchaseOrderItem::create([
                    'purchase_order_id' => $purchaseOrder->id,
                    'product_id' => $item['product_id'],
                    'quantity_ordered' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'subtotal' => $item['quantity'] * $item['unit_price'],
                    'batch_number' => $item['batch_number'] ?? null,
                    'expiry_date' => $item['expiry_date'] ?? null,
                    'notes' => $item['notes'] ?? null,
                ]);
            }

            // Recalculate total
            $purchaseOrder->recalculateTotal();

            DB::commit();

            return redirect()->route('purchase-orders.show', $purchaseOrder->id)
                ->with('success', 'Purchase Order berhasil diupdate.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Gagal mengupdate Purchase Order: ' . $e->getMessage());
        }
    }

    /**
     * Update the status of a purchase order.
     */
    public function updateStatus(Request $request, $id)
    {
        $purchaseOrder = PurchaseOrder::findOrFail($id);

        $request->validate([
            'status' => 'required|in:' . implode(',', array_keys(PurchaseOrder::getStatuses())),
        ]);

        $newStatus = $request->status;

        // Validate status transition
        if ($newStatus === PurchaseOrder::STATUS_CANCELLED && !$purchaseOrder->canBeCancelled()) {
            return back()->with('error', 'Purchase Order tidak dapat dibatalkan.');
        }

        $purchaseOrder->update(['status' => $newStatus]);

        return back()->with('success', 'Status berhasil diubah menjadi: ' . $purchaseOrder->status_label);
    }

    /**
     * Show the form for receiving goods.
     */
    public function receive($id)
    {
        $purchaseOrder = PurchaseOrder::with(['supplier', 'warehouse', 'items.product'])
            ->findOrFail($id);

        if (!$purchaseOrder->canBeReceived()) {
            return redirect()->route('purchase-orders.show', $id)
                ->with('error', 'Purchase Order tidak dapat diterima. Status saat ini: ' . $purchaseOrder->status_label);
        }

        return Inertia::render('Dashboard/PurchaseOrders/Receive', [
            'purchaseOrder' => $purchaseOrder,
        ]);
    }

    /**
     * Process goods receiving.
     */
    public function storeReceive(Request $request, $id)
    {
        $purchaseOrder = PurchaseOrder::with('items')->findOrFail($id);

        if (!$purchaseOrder->canBeReceived()) {
            return redirect()->route('purchase-orders.show', $id)
                ->with('error', 'Purchase Order tidak dapat diterima.');
        }

        $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:purchase_order_items,id',
            'items.*.quantity_received' => 'required|numeric|min:0',
            'items.*.batch_number' => 'nullable|string|max:100',
            'items.*.expiry_date' => 'nullable|date',
            'invoice_number' => 'nullable|string|max:100',
            'invoice_file' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:5120',
            'notes' => 'nullable|string|max:1000',
        ]);

        try {
            DB::beginTransaction();

            $receiptId = 'RCV-' . now()->format('YmdHis') . '-' . str_pad(rand(0, 999), 3, '0', STR_PAD_LEFT);
            $hasReceived = false;

            foreach ($request->items as $itemData) {
                $item = PurchaseOrderItem::find($itemData['id']);
                
                if (!$item || $item->purchase_order_id !== $purchaseOrder->id) {
                    continue;
                }

                $qtyToReceive = floatval($itemData['quantity_received']);
                
                if ($qtyToReceive <= 0) {
                    continue;
                }

                // Can't receive more than remaining
                $maxReceivable = $item->remaining_quantity;
                $qtyToReceive = min($qtyToReceive, $maxReceivable);

                if ($qtyToReceive <= 0) {
                    continue;
                }

                $hasReceived = true;

                // Update item received quantity
                $item->quantity_received += $qtyToReceive;
                $item->batch_number = $itemData['batch_number'] ?? $item->batch_number;
                $item->expiry_date = $itemData['expiry_date'] ?? $item->expiry_date;
                $item->save();

                // Create stock movement
                StockMovement::create([
                    'receipt_id' => $receiptId,
                    'purchase_order_id' => $purchaseOrder->id,
                    'product_id' => $item->product_id,
                    'from_type' => StockMovement::TYPE_SUPPLIER,
                    'from_id' => $purchaseOrder->supplier_id,
                    'supplier_id' => $purchaseOrder->supplier_id,
                    'to_type' => StockMovement::TYPE_WAREHOUSE,
                    'to_id' => $purchaseOrder->warehouse_id,
                    'quantity' => $qtyToReceive,
                    'purchase_price' => $item->unit_price,
                    'invoice_number' => $request->invoice_number,
                    'batch_number' => $itemData['batch_number'] ?? null,
                    'expiry_date' => $itemData['expiry_date'] ?? null,
                    'note' => $request->notes ?? 'Penerimaan dari PO: ' . $purchaseOrder->po_number,
                    'user_id' => auth()->id(),
                ]);

                // Update warehouse stock
                $warehouseStock = WarehouseStock::firstOrCreate(
                    [
                        'warehouse_id' => $purchaseOrder->warehouse_id,
                        'product_id' => $item->product_id,
                    ],
                    ['quantity' => 0]
                );
                $warehouseStock->increment('quantity', $qtyToReceive);

                // Update product average cost
                $product = $item->product;
                if ($product) {
                    $currentStock = $product->current_stock ?? 0;
                    $currentAvgCost = $product->average_cost ?? 0;
                    $newTotalValue = ($currentStock * $currentAvgCost) + ($qtyToReceive * $item->unit_price);
                    $newTotalQty = $currentStock + $qtyToReceive;
                    
                    if ($newTotalQty > 0) {
                        $product->average_cost = $newTotalValue / $newTotalQty;
                        $product->save();
                    }
                }
            }

            if (!$hasReceived) {
                DB::rollBack();
                return back()->with('error', 'Tidak ada barang yang diterima. Pastikan quantity > 0.');
            }

            // Update PO status
            $purchaseOrder->refresh();
            $allReceived = $purchaseOrder->items->every(fn($item) => $item->is_fully_received);
            
            if ($allReceived) {
                $purchaseOrder->status = PurchaseOrder::STATUS_RECEIVED;
                $purchaseOrder->received_date = now();
            } else {
                $purchaseOrder->status = PurchaseOrder::STATUS_PARTIAL;
            }

            // Save invoice number
            if ($request->filled('invoice_number')) {
                $purchaseOrder->invoice_number = $request->invoice_number;
            }

            // Handle invoice file upload
            if ($request->hasFile('invoice_file')) {
                $file = $request->file('invoice_file');
                $filename = 'invoice_' . $purchaseOrder->po_number . '_' . time() . '.' . $file->getClientOriginalExtension();
                $file->storeAs('invoices', $filename, 'public');
                $purchaseOrder->invoice_file = $filename;
            }

            $purchaseOrder->save();

            DB::commit();

            return redirect()->route('purchase-orders.show', $purchaseOrder->id)
                ->with('success', 'Barang berhasil diterima. Status: ' . $purchaseOrder->status_label);

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Gagal menerima barang: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified purchase order (draft only).
     */
    public function destroy($id)
    {
        $purchaseOrder = PurchaseOrder::findOrFail($id);

        if (!$purchaseOrder->canBeEdited()) {
            return back()->with('error', 'Purchase Order tidak dapat dihapus karena sudah diproses.');
        }

        $purchaseOrder->items()->delete();
        $purchaseOrder->delete();

        return redirect()->route('purchase-orders.index')
            ->with('success', 'Purchase Order berhasil dihapus.');
    }

    /**
     * Get last purchase price for a product from supplier.
     */
    public function getLastPrice(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'supplier_id' => 'nullable|exists:suppliers,id',
        ]);

        // Check from PO items first
        $query = PurchaseOrderItem::where('product_id', $request->product_id)
            ->whereHas('purchaseOrder', function ($q) use ($request) {
                $q->whereIn('status', [
                    PurchaseOrder::STATUS_RECEIVED,
                    PurchaseOrder::STATUS_PARTIAL
                ]);
                if ($request->filled('supplier_id')) {
                    $q->where('supplier_id', $request->supplier_id);
                }
            })
            ->orderBy('created_at', 'desc')
            ->first();

        if ($query) {
            return response()->json([
                'price' => $query->unit_price,
                'source' => 'purchase_order',
            ]);
        }

        // Fallback to stock movements
        $movement = StockMovement::where('product_id', $request->product_id)
            ->where('from_type', StockMovement::TYPE_SUPPLIER);
        
        if ($request->filled('supplier_id')) {
            $movement->where('supplier_id', $request->supplier_id);
        }

        $movement = $movement->orderBy('created_at', 'desc')->first();

        if ($movement) {
            return response()->json([
                'price' => $movement->purchase_price,
                'source' => 'stock_movement',
            ]);
        }

        // Fallback to product buy price
        $product = Product::find($request->product_id);

        return response()->json([
            'price' => $product ? $product->buy_price : 0,
            'source' => 'product',
        ]);
    }

    /**
     * Download Purchase Order as PDF.
     */
    public function downloadPdf($id)
    {
        try {
            // Clean any previous output
            if (ob_get_level()) {
                ob_end_clean();
            }

            $po = PurchaseOrder::with([
                'supplier',
                'warehouse',
                'user',
                'items.product',
            ])->findOrFail($id);

            $statuses = PurchaseOrder::getStatuses();

            $pdf = \PDF::loadView('pdf.purchase-order', [
                'po' => $po,
                'statuses' => $statuses,
            ]);

            $pdf->setPaper('a4', 'portrait');

            $filename = 'PO-' . $po->po_number . '.pdf';
            
            // Return with explicit headers
            return response($pdf->output(), 200)
                ->header('Content-Type', 'application/pdf')
                ->header('Content-Disposition', 'attachment; filename="' . $filename . '"')
                ->header('Cache-Control', 'no-cache, no-store, must-revalidate')
                ->header('Pragma', 'no-cache')
                ->header('Expires', '0');
                
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Gagal generate PDF: ' . $e->getMessage()
            ], 500);
        }
    }
}
