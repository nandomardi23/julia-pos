<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\Display;
use App\Models\DisplayStock;
use App\Models\PaymentSetting;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Shift;
use App\Models\StockMovement;
use App\Models\Transaction;
use App\Models\WarehouseStock;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Exceptions\PaymentGatewayException;
use App\Services\Payments\PaymentGatewayManager;

class TransactionService
{
    /**
     * Create a new transaction.
     */
    public function createTransaction($request, PaymentGatewayManager $paymentGatewayManager)
    {
        // 1. Validate Payment Gateway
        $paymentMethod = $request->input('payment_method') ?? $request->input('payment_gateway');
        if ($paymentMethod) {
            $paymentMethod = strtolower($paymentMethod);
        }
        
        $isExternalGateway = $paymentMethod && !in_array($paymentMethod, ['cash', 'transfer', 'qris']);
        $paymentSetting = null;

        if ($isExternalGateway) {
            $paymentSetting = PaymentSetting::first();
            if (!$paymentSetting || !$paymentSetting->isGatewayReady($paymentMethod)) {
                throw new \Exception('Gateway pembayaran belum dikonfigurasi.');
            }
        }

        // 2. Validate Stock
        $carts = Cart::with(['product', 'variant'])->where('cashier_id', auth()->user()->id)->get();
        if ($carts->isEmpty()) {
            throw new \Exception('Keranjang belanja kosong.');
        }

        $display = Display::active()->first();
        if ($display) {
            $insufficientItems = $this->validateIngredientStock($carts, $display);
            if (!empty($insufficientItems)) {
                $messages = [];
                foreach ($insufficientItems as $item) {
                     $messages[] = "{$item['recipe']}: {$item['ingredient']} (butuh {$item['required']} {$item['unit']}, tersedia {$item['available']} {$item['unit']})";
                }
                throw new \Exception('Stok bahan tidak cukup: ' . implode('; ', $messages));
            }
        }

        // 3. Prepare Data
        $length = 10;
        $random = '';
        for ($i = 0; $i < $length; $i++) {
            $random .= rand(0, 1) ? rand(0, 9) : chr(rand(ord('a'), ord('z')));
        }

        $invoice = 'TRX-' . Str::upper($random);
        $isCashPayment = empty($paymentMethod) || $paymentMethod === 'cash';
        $cashAmount = $isCashPayment ? $request->cash : $request->grand_total;
        $changeAmount = $isCashPayment ? $request->change : 0;
        $activeShift = Shift::getActiveShift();

        // 4. DB Transaction
        $transaction = DB::transaction(function () use (
            $request,
            $carts,
            $invoice,
            $cashAmount,
            $changeAmount,
            $paymentMethod,
            $isCashPayment,
            $activeShift,
            $display
        ) {
            // Recalculate totals
            $subTotal = 0;
            foreach ($carts as $item) {
                $subTotal += $item->price * $item->qty;
            }
            
            $discountAmount = (float) $request->discount;
            $taxPercent = (float) ($request->ppn ?? 0);
            
            $taxable = max($subTotal - $discountAmount, 0);
            $taxAmount = round($taxable * ($taxPercent / 100));
            $grandTotal = max($subTotal - $discountAmount + $taxAmount, 0);

            // Create Transaction
            $transaction = Transaction::create([
                'cashier_id' => $request->user()->id,
                'customer_id' => $request->customer_id, // Add customer
                'shift_id' => $activeShift?->id,
                'invoice' => $invoice,
                'cash' => $cashAmount,
                'change' => $changeAmount,
                'discount' => $discountAmount,
                'grand_total' => $grandTotal,
                'payment_method' => $paymentMethod ?: 'cash',
                'payment_status' => $isCashPayment ? 'paid' : 'pending',
                'ppn' => $taxPercent,
                'tax' => $taxAmount,
            ]);

            // Create Details & Manage Stock
            foreach ($carts as $cart) {
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

                // Stock Reduction
                $product = $cart->product;
                if ($display) {
                    if ($product->product_type !== Product::TYPE_RECIPE) {
                        $this->decrementDisplayStock($display, $product->id, $cart->qty, $transaction);
                    } elseif ($product->product_type === Product::TYPE_RECIPE) {
                        $this->deductIngredientStock($product, $cart->variant, (float) $cart->qty, $display, $transaction);
                    }
                }
            }

            // Clear Cart
            Cart::where('cashier_id', auth()->user()->id)->delete();

            return $transaction;
        });

        // 5. Handle Payment Gateway
        if ($isExternalGateway) {
            $paymentResponse = $paymentGatewayManager->createPayment($transaction, $paymentMethod, $paymentSetting);
            $transaction->update([
                'payment_reference' => $paymentResponse['reference'] ?? null,
                'payment_url' => $paymentResponse['payment_url'] ?? null,
            ]);
        }

        return $transaction;
    }

    private function decrementDisplayStock($display, $productId, $qty, $transaction)
    {
        $displayStock = DisplayStock::where('display_id', $display->id)
            ->where('product_id', $productId)
            ->lockForUpdate()
            ->first();
        
        if ($displayStock) {
            $displayStock->decrement('quantity', (float) $qty);
            
            StockMovement::create([
                'product_id' => $productId,
                'from_type' => StockMovement::TYPE_DISPLAY,
                'from_id' => $display->id,
                'to_type' => StockMovement::TYPE_TRANSACTION,
                'to_id' => $transaction->id,
                'quantity' => $qty,
                'note' => 'Penjualan: ' . $transaction->invoice,
                'user_id' => $transaction->cashier_id,
            ]);
        }
    }

    private function validateIngredientStock($carts, $display): array
    {
        $insufficientItems = [];
        $recipeCarts = $carts->filter(fn($c) => $c->product->product_type === Product::TYPE_RECIPE);
        
        if ($recipeCarts->isEmpty()) {
            return [];
        }

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

        $warehouseStockMap = WarehouseStock::whereIn('product_id', $ingredientIds)
            ->select('product_id', DB::raw('SUM(quantity) as total_qty'))
            ->groupBy('product_id')
            ->pluck('total_qty', 'product_id')
            ->toArray();

        $displayStockMap = [];
        if ($display) {
            $displayStockMap = DisplayStock::where('display_id', $display->id)
                ->whereIn('product_id', $ingredientIds)
                ->select('product_id', DB::raw('SUM(quantity) as total_qty'))
                ->groupBy('product_id')
                ->pluck('total_qty', 'product_id')
                ->toArray();
        }

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

    private function deductIngredientStock($product, $variant, $multiplier, $display, $transaction)
    {
        if ($product->product_type !== Product::TYPE_RECIPE) {
            return;
        }

        $ingredients = collect();
        if ($variant) {
            $variant->load('ingredients.ingredient');
            $ingredients = $variant->ingredients;
        }

        if ($ingredients->isEmpty()) {
            $product->load('ingredients.ingredient');
            $ingredients = $product->ingredients;
        }

        if ($ingredients->isEmpty()) {
            return;
        }

        foreach ($ingredients as $variantIngredient) {
            $ingredient = $variantIngredient->ingredient;
            if (!$ingredient) continue;
            
            $ingredientQty = $variantIngredient->quantity * $multiplier;

            if ($ingredient->is_supply || $ingredient->product_type === Product::TYPE_SUPPLY) {
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

    public function deleteTransaction(Transaction $transaction)
    {
        return DB::transaction(function () use ($transaction) {
            // 1. Revert Stock Logic
            foreach ($transaction->details as $detail) {
                $product = $detail->product;
                if (!$product) continue;

                // Only revert if stock was actually deducted (Sellable/Recipe)
                // Assuming we track movements, we can look at StockMovement, 
                // but simpler to reverse the logic based on product type.

                $display = Display::active()->first();
                if ($display) {
                    if ($product->product_type === Product::TYPE_RECIPE) {
                       // Restore Ingredients
                       $variants = $product->variants;
                        // Determine which variant was sold - transaction_details specific variant?
                        // The detail stores 'variant_name' but not ID directly? 
                        // Wait, TransactionDetail has product_id. Does it have variant_id?
                        // Migration showed: variant_name. It didn't show variant_id foreign key in 2024_01_01_000004_create_transaction_tables.php?
                        // Let's check schema again. Schema says: variant_name (string).
                        // Ah, Carts table has product_variant_id, but TransactionDetail might NOT.
                        // Let's check TransactionDetail model/migration again.
                        
                        // If detail doesn't save variant_id, we can't accurately restore variant-specific ingredients!
                        // This is a potential existing bug or limitation.
                        // However, we can try to guess or just restore the *effective* ingredients if simple.
                        
                        // For now, let's look at how existing logic does it? 
                        // Existing logic might rely on StockMovement reversion?
                        // If StockMovement exists, we can just reverse them?
                        
                        // Let's fallback to StockMovement reversal if possible.
                        // StockMovement::where('to_type', 'transaction')->where('to_id', $transaction->id)->get();
                        
                    } else {
                        // Restore Display Stock
                         $displayStock = DisplayStock::firstOrCreate(
                            ['display_id' => $display->id, 'product_id' => $product->id],
                            ['quantity' => 0]
                        );
                        $displayStock->increment('quantity', $detail->qty);
                    }
                }
            }
            
            // Actually, the most robust way is to finding the StockMovements associated with this transaction and reversing them.
            // But 'from_type' varies.
            
            // Let's use the StockMovement to reverse.
            $movements = StockMovement::where('to_type', StockMovement::TYPE_TRANSACTION)
                ->where('to_id', $transaction->id)
                ->get();

            foreach ($movements as $movement) {
                // Reverse: Add back to 'from' source
                if ($movement->from_type === StockMovement::TYPE_DISPLAY) {
                    $stock = DisplayStock::find($movement->from_id); // This assumes from_id IS the DisplayStock ID? No, from_id is display_id.
                    // We need to find the stock record for (display_id, product_id)
                    $stock = DisplayStock::where('display_id', $movement->from_id)
                        ->where('product_id', $movement->product_id)
                        ->first();
                    if ($stock) $stock->increment('quantity', $movement->quantity);
                } elseif ($movement->from_type === StockMovement::TYPE_WAREHOUSE) {
                     $stock = WarehouseStock::where('warehouse_id', $movement->from_id)
                        ->where('product_id', $movement->product_id)
                        ->first();
                    if ($stock) $stock->increment('quantity', $movement->quantity);
                }
                
                // We should also delete the movement or creating a "Correction" movement?
                // Usually deleting the transaction implies these movements never happened (Hard Delete approach)
                // OR creating a cancellation movement.
                // Given the method is Delete, likely we hard delete the movement logic?
                $movement->delete();
            }

            // 2. Delete Details & Profits
            $transaction->details()->delete();
            $transaction->profits()->delete();

            // 3. Delete Transaction
            $transaction->delete();

            return ['status' => 'success', 'message' => 'Transaksi berhasil dihapus dan stok dikembalikan.'];
        });
    }
}
