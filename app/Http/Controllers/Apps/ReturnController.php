<?php

namespace App\Http\Controllers\Apps;

use App\Models\ProductReturn;
use App\Models\ReturnItem;
use App\Models\Transaction;
use App\Models\Display;
use App\Models\DisplayStock;
use App\Models\StockMovement;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReturnController extends Controller
{
    /**
     * Display a listing of returns.
     */
    public function index(Request $request)
    {
        $query = ProductReturn::with(['transaction', 'user', 'approver', 'items'])
            ->withCount('items');

        // Filter by status
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Search by return number or transaction invoice
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('return_number', 'like', "%{$search}%")
                    ->orWhereHas('transaction', function ($tq) use ($search) {
                        $tq->where('invoice', 'like', "%{$search}%");
                    });
            });
        }

        $query->orderBy('created_at', 'desc');

        $returns = $query->paginate(15)->withQueryString();

        return Inertia::render('Dashboard/Returns/Index', [
            'returns' => $returns,
            'filters' => $request->only(['status', 'search']),
            'statuses' => ProductReturn::getStatuses(),
        ]);
    }

    /**
     * Show form to create a return from a transaction.
     */
    public function create(Request $request)
    {
        $transaction = null;
        
        if ($request->filled('invoice')) {
            $transaction = Transaction::with(['details.product', 'cashier'])
                ->where('invoice', $request->invoice)
                ->first();
        }

        return Inertia::render('Dashboard/Returns/Create', [
            'transaction' => $transaction,
            'returnTypes' => ProductReturn::getReturnTypes(),
        ]);
    }

    /**
     * Store a new return request.
     */
    public function store(Request $request)
    {
        $request->validate([
            'transaction_id' => 'required|exists:transactions,id',
            'return_type' => 'required|in:refund,exchange,credit',
            'reason' => 'required|string|max:1000',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.qty' => 'required|numeric|min:0.001',
            'items.*.price' => 'required|numeric|min:0',
            'items.*.variant_name' => 'nullable|string',
            'items.*.condition_note' => 'nullable|string|max:500',
        ]);

        try {
            DB::beginTransaction();

            // Calculate total return amount
            $returnAmount = 0;
            foreach ($request->items as $item) {
                $returnAmount += $item['qty'] * $item['price'];
            }

            // Create return
            $return = ProductReturn::create([
                'transaction_id' => $request->transaction_id,
                'user_id' => auth()->id(),
                'return_type' => $request->return_type,
                'status' => ProductReturn::STATUS_PENDING,
                'return_amount' => $returnAmount,
                'reason' => $request->reason,
            ]);

            // Create return items
            foreach ($request->items as $item) {
                ReturnItem::create([
                    'return_id' => $return->id,
                    'product_id' => $item['product_id'],
                    'variant_name' => $item['variant_name'] ?? null,
                    'qty' => $item['qty'],
                    'price' => $item['price'],
                    'subtotal' => $item['qty'] * $item['price'],
                    'condition_note' => $item['condition_note'] ?? null,
                ]);
            }

            DB::commit();

            return redirect()->route('returns.show', $return->id)
                ->with('success', 'Return berhasil dibuat dengan nomor: ' . $return->return_number . '. Menunggu approval manager.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Gagal membuat return: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified return.
     */
    public function show($id)
    {
        $return = ProductReturn::with([
            'transaction.cashier',
            'transaction.details.product',
            'user',
            'approver',
            'items.product',
        ])->findOrFail($id);

        return Inertia::render('Dashboard/Returns/Show', [
            'return' => $return,
            'statuses' => ProductReturn::getStatuses(),
            'returnTypes' => ProductReturn::getReturnTypes(),
        ]);
    }

    /**
     * Approve a pending return (manager only).
     */
    public function approve($id)
    {
        $return = ProductReturn::with('items')->findOrFail($id);

        if (!$return->canBeApproved()) {
            return back()->with('error', 'Return ini tidak dapat disetujui.');
        }

        try {
            DB::beginTransaction();

            // Update return status
            $return->update([
                'status' => ProductReturn::STATUS_APPROVED,
                'approved_by' => auth()->id(),
                'approved_at' => now(),
            ]);

            // Restore stock to display
            $display = Display::active()->first();
            
            if ($display) {
                foreach ($return->items as $item) {
                    // Add stock back to display
                    $displayStock = DisplayStock::firstOrCreate(
                        [
                            'display_id' => $display->id,
                            'product_id' => $item->product_id,
                        ],
                        ['quantity' => 0]
                    );
                    $displayStock->increment('quantity', $item->qty);

                    // Create stock movement record
                    StockMovement::create([
                        'product_id' => $item->product_id,
                        'from_type' => StockMovement::TYPE_TRANSACTION,
                        'from_id' => $return->transaction_id,
                        'to_type' => StockMovement::TYPE_DISPLAY,
                        'to_id' => $display->id,
                        'quantity' => $item->qty,
                        'note' => 'Return: ' . $return->return_number . ' - ' . $return->reason,
                        'user_id' => auth()->id(),
                    ]);
                }
            }

            // Mark as completed
            $return->update(['status' => ProductReturn::STATUS_COMPLETED]);

            DB::commit();

            return back()->with('success', 'Return berhasil disetujui dan stok telah dikembalikan ke display.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Gagal menyetujui return: ' . $e->getMessage());
        }
    }

    /**
     * Reject a pending return (manager only).
     */
    public function reject(Request $request, $id)
    {
        $request->validate([
            'rejection_note' => 'required|string|max:1000',
        ]);

        $return = ProductReturn::findOrFail($id);

        if (!$return->canBeApproved()) {
            return back()->with('error', 'Return ini tidak dapat ditolak.');
        }

        $return->update([
            'status' => ProductReturn::STATUS_REJECTED,
            'approved_by' => auth()->id(),
            'approved_at' => now(),
            'rejection_note' => $request->rejection_note,
        ]);

        return back()->with('success', 'Return telah ditolak.');
    }

    /**
     * Search transaction by invoice.
     */
    public function searchTransaction(Request $request)
    {
        $request->validate([
            'invoice' => 'required|string',
        ]);

        $transaction = Transaction::with(['details.product', 'cashier'])
            ->where('invoice', $request->invoice)
            ->first();

        if (!$transaction) {
            return response()->json(['error' => 'Transaksi tidak ditemukan'], 404);
        }

        return response()->json(['transaction' => $transaction]);
    }
}
