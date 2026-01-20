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
use App\Models\ProductReturn;
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
                    ->lockForUpdate()
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
                        'user_id' => $transaction->cashier_id,
                    ]);
                }
            } else {
                // INGREDIENT → deduct from DISPLAY
                $ingredientDisplayStock = DisplayStock::where('display_id', $display->id)
                    ->where('product_id', $ingredient->id)
                    ->lockForUpdate()
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
                        'user_id' => $transaction->cashier_id,
                    ]);
                }
            }
        }
    }

    /**
     * Validate ingredient stocks for recipe products before transaction.
     * Returns array of insufficient items, empty if all stock is sufficient.
     *
     * @param  \Illuminate\Support\Collection $carts
     * @param  Display $display
     * @return array
     */
    private function validateIngredientStock($carts, $display): array
    {
        $insufficientItems = [];
        $recipeCarts = $carts->filter(fn($c) => $c->product->product_type === Product::TYPE_RECIPE);
        
        if ($recipeCarts->isEmpty()) {
            return [];
        }

        // 1. Gather all unique ingredient IDs needed
        $neededIngredients = [];
        foreach ($recipeCarts as $cart) {
            $ingredients = $cart->product->getEffectiveIngredients($cart->variant);
            foreach ($ingredients as $ingredientData) {
                $id = $ingredientData->ingredient_id;
                $neededIngredients[$id] = [
                    'id' => $id,
                    'type' => $ingredientData->ingredient->product_type,
                    'title' => $ingredientData->ingredient->title,
                    'unit' => $ingredientData->ingredient->unit ?? 'pcs',
                ];
            }
        }

        if (empty($neededIngredients)) {
            return [];
        }

        $ingredientIds = array_keys($neededIngredients);

        // 2. Bulk fetch all needed stocks
        // Warehouse stock for supplies
        $warehouseStockMap = WarehouseStock::whereIn('product_id', $ingredientIds)
            ->select('product_id', DB::raw('SUM(quantity) as total_qty'))
            ->groupBy('product_id')
            ->pluck('total_qty', 'product_id')
            ->toArray();

        // Display stock for ingredients
        $displayStockMap = [];
        if ($display) {
            $displayStockMap = DisplayStock::where('display_id', $display->id)
                ->whereIn('product_id', $ingredientIds)
                ->select('product_id', DB::raw('SUM(quantity) as total_qty'))
                ->groupBy('product_id')
                ->pluck('total_qty', 'product_id')
                ->toArray();
        }

        // 3. Validate requirements against stock maps
        foreach ($recipeCarts as $cart) {
            $product = $cart->product;
            $variant = $cart->variant;
            $multiplier = (float) $cart->qty;
            $ingredients = $product->getEffectiveIngredients($variant);
            
            foreach ($ingredients as $ingredientData) {
                $ingredientId = $ingredientData->ingredient_id;
                $requiredQty = $ingredientData->quantity * $multiplier;
                
                $isSupply = $neededIngredients[$ingredientId]['type'] === Product::TYPE_SUPPLY;
                $availableStock = $isSupply 
                    ? ($warehouseStockMap[$ingredientId] ?? 0)
                    : ($displayStockMap[$ingredientId] ?? 0);
                
                if ($availableStock < $requiredQty) {
                    $insufficientItems[] = [
                        'recipe' => $product->title . ($variant ? ' (' . $variant->name . ')' : ''),
                        'ingredient' => $neededIngredients[$ingredientId]['title'],
                        'required' => $requiredQty,
                        'available' => $availableStock,
                        'unit' => $neededIngredients[$ingredientId]['unit'],
                    ];
                }
            }
        }
        
        return $insufficientItems;
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

        // Bug #2 Fix: Validate ingredient stock before transaction
        $carts = Cart::with(['product', 'variant'])->where('cashier_id', auth()->user()->id)->get();
        $display = Display::active()->first();
        
        if ($display) {
            $insufficientItems = $this->validateIngredientStock($carts, $display);
            
            if (!empty($insufficientItems)) {
                $messages = [];
                foreach ($insufficientItems as $item) {
                    $messages[] = "{$item['recipe']}: {$item['ingredient']} (butuh {$item['required']} {$item['unit']}, tersedia {$item['available']} {$item['unit']})";
                }
                return redirect()->route('pos.index')
                    ->with('error', 'Stok bahan tidak cukup: ' . implode('; ', $messages));
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

        // Get active shift for the cashier
        $activeShift = \App\Models\Shift::getActiveShift();

        $transaction = DB::transaction(function () use (
            $request,
            $invoice,
            $cashAmount,
            $changeAmount,
            $paymentMethod,
            $isCashPayment,
            $activeShift
        ) {
            // Recalculate totals server-side for security
            $carts = Cart::with(['product', 'variant'])->where('cashier_id', $request->user()->id)->get();
            
            $subTotal = 0;
            foreach ($carts as $item) {
                $subTotal += $item->price * $item->qty;
            }
            
            // Recalculate Tax & Total
            $discountAmount = (float) $request->discount;
            $taxPercent = (float) ($request->ppn ?? 0);
            
            // Taxable amount (Subtotal - Discount), min 0
            $taxable = max($subTotal - $discountAmount, 0);
            $taxAmount = round($taxable * ($taxPercent / 100));
            
            $grandTotal = max($subTotal - $discountAmount + $taxAmount, 0);

            $transaction = Transaction::create([
                'cashier_id' => $request->user()->id,
                'shift_id' => $activeShift?->id,
                'invoice' => $invoice,
                'cash' => $cashAmount, // This might need validation too if we want to be strict, but commonly flexible
                'change' => $changeAmount,
                'discount' => $discountAmount,
                'grand_total' => $grandTotal,
                'payment_method' => $paymentMethod ?: 'cash',
                'payment_status' => $isCashPayment ? 'paid' : 'pending',
                'ppn' => $taxPercent,
                'tax' => $taxAmount,
            ]);

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

                // Bug #3 Fix: Use variant sell_price if available for accurate profit calculation
                $currentSellPrice = $cart->variant 
                    ? ($cart->variant->sell_price ?? $cart->product->sell_price)
                    : $cart->product->sell_price;
                
                $total_buy_price = $currentBuyPrice * $cart->qty;
                $total_sell_price = $currentSellPrice * $cart->qty;
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
                            ->lockForUpdate()
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
                                'user_id' => $transaction->cashier_id,
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

        return to_route('pos.index')->with('transaction', $transaction->load(['details.product', 'cashier']));
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
