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
        $transaction = DB::transaction(function () use ($request, $carts, $invoice, $cashAmount, $changeAmount, $paymentMethod, $isCashPayment, $activeShift, $display) {
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
                $isIngredient = $neededIngredients[$ingredientId]['type'] === Product::TYPE_INGREDIENT;

                $displayQty = $displayStockMap[$ingredientId] ?? 0;
                $warehouseQty = $warehouseStockMap[$ingredientId] ?? 0;

                $availableStock = 0;
                if ($isSupply) {
                    // Supplies only from Warehouse
                    $availableStock = $warehouseQty;
                } elseif ($isIngredient) {
                    // Ingredients from Display + Warehouse
                    $availableStock = $displayQty + $warehouseQty;
                } else {
                    // Default fallback: check display only? Or both?
                    // Let's assume other types follow display only logic for now unless specified
                    $availableStock = $displayQty;
                }

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
            if (!$ingredient)
                continue;

            $requiredQty = $variantIngredient->quantity * $multiplier;

            if ($ingredient->is_supply || $ingredient->product_type === Product::TYPE_SUPPLY) {
                // Supply strictly from Warehouse
                $this->deductFromWarehouse($ingredient, $requiredQty, $transaction, $product, $variant, $multiplier);
            } else {
                // Ingredient: Try Display first, then Warehouse
                $deductedFromDisplay = 0;

                // 1. Try Deduct from Display
                $ingredientDisplayStock = DisplayStock::where('display_id', $display->id)
                    ->where('product_id', $ingredient->id)
                    ->lockForUpdate()
                    ->first();

                if ($ingredientDisplayStock && $ingredientDisplayStock->quantity > 0) {
                    $availableInDisplay = $ingredientDisplayStock->quantity;
                    $toDeduct = min($availableInDisplay, $requiredQty);

                    $ingredientDisplayStock->decrement('quantity', $toDeduct);

                    StockMovement::create([
                        'product_id' => $ingredient->id,
                        'from_type' => StockMovement::TYPE_DISPLAY,
                        'from_id' => $display->id,
                        'to_type' => StockMovement::TYPE_TRANSACTION,
                        'to_id' => $transaction->id,
                        'quantity' => $toDeduct,
                        'note' => 'Bahan resep (Toko): ' . $product->title . ' (' . ($variant->name ?? 'default') . ') x' . $multiplier,
                        'user_id' => $transaction->cashier_id,
                    ]);

                    $deductedFromDisplay = $toDeduct;
                }

                // 2. If still needed, Deduct from Warehouse
                $remainingQty = $requiredQty - $deductedFromDisplay;
                if ($remainingQty > 0) {
                    $this->deductFromWarehouse($ingredient, $remainingQty, $transaction, $product, $variant, $multiplier, 'Bahan resep (Gudang)');
                }
            }
        }
    }

    private function deductFromWarehouse($ingredient, $qty, $transaction, $product, $variant, $multiplier, $notePrefix = 'Supply resep')
    {
        // Find warehouse with stock. Ideally specifically selected, but for now grab from first available or main warehouse.
        // Assuming FIFO or just picking one for simplicity as per current logic.
        // Current logic was: `WarehouseStock::where(...)->first()`.

        $warehouseStock = WarehouseStock::where('product_id', $ingredient->id)
            ->where('quantity', '>', 0)
            ->orderBy('quantity', 'desc') // Pick from largest stock pile? Or just first?
            ->lockForUpdate()
            ->first();

        // If not enough in one pile, might need to split across warehouses? 
        // For now preventing overcomplication: take what we can or error if strictly validated before.
        // validation passed means total is enough.

        if (!$warehouseStock) {
            // Should not happen if validation passed, unless concurrency issue.
            // Fallback to creating negative stock or error? 
            // Let's try to find any warehouse stock record to go into negative?
            $warehouseStock = WarehouseStock::where('product_id', $ingredient->id)->first();
            if (!$warehouseStock) {
                // Create if doesn't exist (e.g. Warehouse 1)
                $warehouseStock = WarehouseStock::create([
                    'warehouse_id' => 1,
                    'product_id' => $ingredient->id,
                    'quantity' => 0
                ]);
            }
        }

        $warehouseStock->decrement('quantity', $qty);

        StockMovement::create([
            'product_id' => $ingredient->id,
            'from_type' => StockMovement::TYPE_WAREHOUSE,
            'from_id' => $warehouseStock->warehouse_id,
            'to_type' => StockMovement::TYPE_TRANSACTION,
            'to_id' => $transaction->id,
            'quantity' => $qty,
            'note' => $notePrefix . ': ' . $product->title . ' (' . ($variant->name ?? 'default') . ') x' . $multiplier,
            'user_id' => $transaction->cashier_id,
        ]);
    }

    public function deleteTransaction(Transaction $transaction)
    {
        return DB::transaction(function () use ($transaction) {
            // Revert stock by reversing all StockMovements linked to this transaction.
            // This is the single source of truth — it handles regular products,
            // recipe ingredients from display, and supplies from warehouse.
            $movements = StockMovement::where('to_type', StockMovement::TYPE_TRANSACTION)
                ->where('to_id', $transaction->id)
                ->get();

            /** @var StockMovement $movement */
            foreach ($movements as $movement) {
                // Reverse: Add back to 'from' source
                if ($movement->from_type === StockMovement::TYPE_DISPLAY) {
                    $stock = DisplayStock::where('display_id', $movement->from_id)
                        ->where('product_id', $movement->product_id)
                        ->first();
                    if ($stock) {
                        $stock->increment('quantity', $movement->quantity);
                    }
                } elseif ($movement->from_type === StockMovement::TYPE_WAREHOUSE) {
                    $stock = WarehouseStock::where('warehouse_id', $movement->from_id)
                        ->where('product_id', $movement->product_id)
                        ->first();
                    if ($stock) {
                        $stock->increment('quantity', $movement->quantity);
                    }
                }

                $movement->delete();
            }

            // Delete Details & Profits
            $transaction->details()->delete();
            $transaction->profits()->delete();

            // Delete Transaction
            $transaction->delete();

            return ['status' => 'success', 'message' => 'Transaksi berhasil dihapus dan stok dikembalikan.'];
        });
    }
}
