<?php

namespace App\Http\Controllers\Apps;

use App\Models\Cart;
use App\Exceptions\PaymentGatewayException;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\PaymentSetting;
use App\Models\Display;
use App\Models\DisplayStock;
use App\Models\WarehouseStock;
use App\Models\ProductVariant;
use App\Models\StockMovement;
use App\Services\TransactionService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Payments\PaymentGatewayManager;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransactionController extends Controller
{
    protected TransactionService $transactionService;

    public function __construct(TransactionService $transactionService)
    {
        $this->transactionService = $transactionService;
    }

    /**
     * Recursively deduct ingredient stocks for recipe products.
     * Supports variant-based ingredients.
     *
     * @param  Product $product The recipe product
     * @param  ProductVariant|null $variant The selected variant
     * @param  float $multiplier Quantity multiplier
     * @param  Display $display Active display location
     * @param  Transaction $transaction Current transaction
     * @return void
     */
    private function deductIngredientStock($product, $variant, $multiplier, $display, $transaction)
    {
        if ($product->product_type !== Product::TYPE_RECIPE) {
            return;
        }

        // Get ingredients - first try variant, then fallback to product-level
        $ingredients = collect();
        
        if ($variant) {
            $variant->load('ingredients.ingredient');
            $ingredients = $variant->ingredients;
        }

        // If no ingredients on variant, try product-level ingredients
        if ($ingredients->isEmpty()) {
            $product->load('ingredients.ingredient');
            $ingredients = $product->ingredients;
        }

        // If still no ingredients, skip
        if ($ingredients->isEmpty()) {
            return;
        }

        foreach ($ingredients as $variantIngredient) {
            $ingredient = $variantIngredient->ingredient;
            if (!$ingredient) continue;
            
            $ingredientQty = $variantIngredient->quantity * $multiplier;

            if ($ingredient->is_supply || $ingredient->product_type === Product::TYPE_SUPPLY) {
                // SUPPLY → deduct from WAREHOUSE (first available)
                $warehouseStock = WarehouseStock::where('product_id', $ingredient->id)
                    ->where('quantity', '>=', $ingredientQty)
                    ->first();

                if ($warehouseStock) {
                    $warehouseStock->decrement('quantity', $ingredientQty);

                    StockMovement::create([
                        'product_id' => $ingredient->id,
                        'from_type' => StockMovement::TYPE_WAREHOUSE,
                        'from_id' => $warehouseStock->warehouse_id,
                        'to_type' => StockMovement::TYPE_TRANSACTION,
                        'to_id' => $transaction->id,
                        'quantity' => $ingredientQty,
                        'note' => 'Supply resep: ' . $product->title . ' (' . ($variant->name ?? 'default') . ') x' . $multiplier,
                        'user_id' => auth()->id(),
                    ]);
                }
            } else {
                // INGREDIENT → deduct from DISPLAY
                $ingredientDisplayStock = DisplayStock::where('display_id', $display->id)
                    ->where('product_id', $ingredient->id)
                    ->first();

                if ($ingredientDisplayStock) {
                    $ingredientDisplayStock->decrement('quantity', $ingredientQty);

                    StockMovement::create([
                        'product_id' => $ingredient->id,
                        'from_type' => StockMovement::TYPE_DISPLAY,
                        'from_id' => $display->id,
                        'to_type' => StockMovement::TYPE_TRANSACTION,
                        'to_id' => $transaction->id,
                        'quantity' => $ingredientQty,
                        'note' => 'Bahan resep: ' . $product->title . ' (' . ($variant->name ?? 'default') . ') x' . $multiplier,
                        'user_id' => auth()->id(),
                    ]);
                }
            }
        }
    }

    /**
     * store
     *
     * @param  mixed $request
     * @param  PaymentGatewayManager $paymentGatewayManager
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request, PaymentGatewayManager $paymentGatewayManager)
    {
        // Accept either payment_gateway (for gateway payments) or payment_method (for display)
        $paymentMethod = $request->input('payment_method') ?? $request->input('payment_gateway');
        if ($paymentMethod) {
            $paymentMethod = strtolower($paymentMethod);
        }
        $paymentSetting = null;

        // Only check gateway for external payments (midtrans, xendit, etc)
        $isExternalGateway = $paymentMethod && !in_array($paymentMethod, ['cash', 'transfer', 'qris']);
        
        if ($isExternalGateway) {
            $paymentSetting = PaymentSetting::first();

            if (!$paymentSetting || !$paymentSetting->isGatewayReady($paymentMethod)) {
                return redirect()
                    ->route('pos.index')
                    ->with('error', 'Gateway pembayaran belum dikonfigurasi.');
            }
        }

        $length = 10;
        $random = '';
        for ($i = 0; $i < $length; $i++) {
            $random .= rand(0, 1) ? rand(0, 9) : chr(rand(ord('a'), ord('z')));
        }

        $invoice = 'TRX-' . Str::upper($random);
        $isCashPayment = empty($paymentMethod) || $paymentMethod === 'cash';
        $cashAmount = $isCashPayment ? $request->cash : $request->grand_total;
        $changeAmount = $isCashPayment ? $request->change : 0;

        $transaction = DB::transaction(function () use (
            $request,
            $invoice,
            $cashAmount,
            $changeAmount,
            $paymentMethod,
            $isCashPayment
        ) {
            $transaction = Transaction::create([
                'cashier_id' => auth()->user()->id,
                'invoice' => $invoice,
                'cash' => $cashAmount,
                'change' => $changeAmount,
                'discount' => $request->discount,
                'grand_total' => $request->grand_total,
                'payment_method' => $paymentMethod ?: 'cash',
                'payment_status' => $isCashPayment ? 'paid' : 'pending',
            ]);

            $carts = Cart::with(['product', 'variant'])->where('cashier_id', auth()->user()->id)->get();

            foreach ($carts as $cart) {
                // Simpan buy_price saat transaksi agar profit tetap akurat meski harga berubah
                // Use variant buy_price if available
                $currentBuyPrice = $cart->variant 
                    ? ($cart->variant->buy_price ?? $cart->product->buy_price)
                    : $cart->product->buy_price;
                
                $transaction->details()->create([
                    'transaction_id' => $transaction->id,
                    'product_id' => $cart->product_id,
                    'variant_name' => $cart->variant?->name,
                    'qty' => $cart->qty,
                    'price' => $cart->price,
                    'buy_price' => $currentBuyPrice,
                ]);

                // Hitung profit berdasarkan buy_price saat transaksi
                $total_buy_price = $currentBuyPrice * $cart->qty;
                $total_sell_price = $cart->product->sell_price * $cart->qty;
                $profits = $total_sell_price - $total_buy_price;

                $transaction->profits()->create([
                    'transaction_id' => $transaction->id,
                    'total' => $profits,
                ]);

                // Deduct from display stock (for non-recipe products only)
                $display = Display::active()->first();
                $product = $cart->product;
                
                if ($display) {
                    // Only deduct display stock for non-recipe products
                if ($product->product_type !== Product::TYPE_RECIPE) {
                        $displayStock = DisplayStock::where('display_id', $display->id)
                            ->where('product_id', $cart->product_id)
                            ->first();
                        
                        if ($displayStock) {
                            $displayStock->decrement('quantity', (float) $cart->qty);
                            
                            // Create stock movement record
                            StockMovement::create([
                                'product_id' => $cart->product_id,
                                'from_type' => StockMovement::TYPE_DISPLAY,
                                'from_id' => $display->id,
                                'to_type' => StockMovement::TYPE_TRANSACTION,
                                'to_id' => $transaction->id,
                                'quantity' => $cart->qty,
                                'note' => 'Penjualan: ' . $transaction->invoice,
                                'user_id' => auth()->id(),
                            ]);
                        }
                    }

                    // Deduct ingredient stocks for recipe products
                if ($product->product_type === Product::TYPE_RECIPE) {
                        // Load variant from cart if available
                        $variant = $cart->variant;
                        $this->deductIngredientStock($product, $variant, (float) $cart->qty, $display, $transaction);
                    }
                }
            }

            Cart::where('cashier_id', auth()->user()->id)->delete();

            return $transaction->fresh();
        });

        if ($isExternalGateway) {
            try {
                $paymentResponse = $paymentGatewayManager->createPayment($transaction, $paymentMethod, $paymentSetting);

                $transaction->update([
                    'payment_reference' => $paymentResponse['reference'] ?? null,
                    'payment_url' => $paymentResponse['payment_url'] ?? null,
                ]);
            } catch (PaymentGatewayException $exception) {
                return redirect()
                    ->route('transactions.print', $transaction->invoice)
                    ->with('error', $exception->getMessage());
            }
        }

        return to_route('transactions.print', $transaction->invoice);
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
            ->withSum('details as total_items', 'qty')
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

        $transactions = $query->paginate(10)->withQueryString();

        return Inertia::render('Dashboard/Transactions/History', [
            'transactions' => $transactions,
            'filters' => $filters,
        ]);
    }

    /**
     * Delete transaction and revert stock changes.
     */
    public function destroy($invoice)
    {
        $transaction = Transaction::where('invoice', $invoice)->firstOrFail();

        $result = $this->transactionService->deleteTransaction($transaction);

        return redirect()->route('transactions.history')->with('success', $result['message']);
    }
}
