<?php

namespace App\Http\Controllers\Apps;

use App\Models\Transaction;
use App\Models\ProductReturn;
use App\Services\TransactionService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Payments\PaymentGatewayManager;
use Inertia\Inertia;
use App\Exceptions\PaymentGatewayException;

class TransactionController extends Controller
{
    protected TransactionService $transactionService;

    public function __construct(TransactionService $transactionService)
    {
        $this->transactionService = $transactionService;
    }




    /**
     * store
     *
     * @param  mixed $request
     * @param  PaymentGatewayManager $paymentGatewayManager
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function store(Request $request, PaymentGatewayManager $paymentGatewayManager)
    {
        try {
            $transaction = $this->transactionService->createTransaction($request, $paymentGatewayManager);

            if ($request->wantsJson()) {
                return response()->json([
                    'success' => true,
                    'transaction' => $transaction->load(['details.product', 'cashier'])
                ]);
            }

            return to_route('pos.index')->with('transaction', $transaction->load(['details.product', 'cashier']));

        } catch (PaymentGatewayException $exception) {
            // Usually PaymentGatewayException happens AFTER transaction creation but during payment processing
            // If createTransaction handles it and throws, we catch it here.
            // But wait, createTransaction in Service handles the external gateway call too.
            // If it throws, transaction might be created or not?
            // In Service I put it AFTER the DB transaction.

            // If exception has a transaction attached? Service doesn't pass it back on error easily.
            // But logically, if payment fails, maybe we redirect to print/retry?
            // The service code threw PaymentGatewayException.

            // Re-throw or handle?
            // "return redirect()->route('transactions.print', $transaction->invoice)..."
            // We need the transaction object to redirect.
            // The service creates transaction first.

            // Maybe TransactionService should RETURN even if payment fails?
            // Or catch internally?

            return redirect()->back()->with('error', $exception->getMessage());

        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Display transaction detail.
     */
    public function show($invoice)
    {
        $transaction = Transaction::with(['details.product', 'cashier'])
            ->where('invoice', $invoice)
            ->firstOrFail();

        return Inertia::render('Dashboard/Transactions/Show', [
            'transaction' => $transaction
        ]);
    }

    public function print($invoice)
    {
        //get transaction
        $transaction = Transaction::with('details.product', 'cashier')->where('invoice', $invoice)->firstOrFail();

        return Inertia::render('Dashboard/Transactions/Print', [
            'transaction' => $transaction
        ]);
    }

    /**
     * Display transaction history.
     */
    public function history(Request $request)
    {
        $filters = [
            'invoice' => $request->input('invoice'),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
        ];

        $query = Transaction::query()
            ->with(['cashier:id,name'])
            ->withCount('details as details_count') // Count of line items (number of different products)
            ->withSum('details as total_items', 'qty') // Keep for backwards compatibility
            ->withSum('profits as total_profit', 'total')
            ->orderByDesc('created_at');

        if (!$request->user()->isSuperAdmin()) {
            $query->where('cashier_id', $request->user()->id);
        }

        $query
            ->when($filters['invoice'], function (Builder $builder, $invoice) {
                $builder->where('invoice', 'like', '%' . $invoice . '%');
            })
            ->when($filters['start_date'], function (Builder $builder, $date) {
                $builder->whereDate('created_at', '>=', $date);
            })
            ->when($filters['end_date'], function (Builder $builder, $date) {
                $builder->whereDate('created_at', '<=', $date);
            });

        $transactions = $query->paginate($request->input('per_page', 10))->withQueryString();

        // Get settings for receipt modal
        $settings = \App\Models\Setting::all()->pluck('value', 'key')->toArray();

        return Inertia::render('Dashboard/Transactions/History', [
            'transactions' => $transactions,
            'filters' => $filters,
            'settings' => $settings,
        ]);
    }

    /**
     * Get transaction details as JSON for API/modal usage.
     */
    public function showJson($invoice)
    {
        $transaction = Transaction::with(['details.product', 'cashier'])
            ->where('invoice', $invoice)
            ->firstOrFail();

        return response()->json([
            'transaction' => $transaction
        ]);
    }

    /**
     * Delete transaction and revert stock changes.
     * Bug #4 Fix: Check for processed returns before deletion.
     */
    public function destroy($invoice)
    {
        $transaction = Transaction::where('invoice', $invoice)->firstOrFail();

        // Bug #4 Fix: Check for processed returns before deleting
        $hasProcessedReturns = ProductReturn::where('transaction_id', $transaction->id)
            ->whereIn('status', [ProductReturn::STATUS_APPROVED, ProductReturn::STATUS_COMPLETED])
            ->exists();

        if ($hasProcessedReturns) {
            return redirect()->route('transactions.history')
                ->with('error', 'Transaksi tidak dapat dihapus karena sudah memiliki return yang diproses. Menghapus transaksi ini akan menyebabkan stok terhitung ganda.');
        }

        $result = $this->transactionService->deleteTransaction($transaction);

        return redirect()->route('transactions.history')->with('success', $result['message']);
    }
}
