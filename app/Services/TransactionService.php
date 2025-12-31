<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\Display;
use App\Models\DisplayStock;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\StockMovement;
use App\Models\Transaction;
use App\Models\WarehouseStock;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TransactionService
{
    /**
     * Generate unique invoice number.
     *
     * @return string
     */
    public function generateInvoice(): string
    {
        $length = 10;
        $random = '';
        for ($i = 0; $i < $length; $i++) {
            $random .= rand(0, 1) ? rand(0, 9) : chr(rand(ord('a'), ord('z')));
        }
        return 'TRX-' . Str::upper($random);
    }

    /**
     * Delete transaction and revert all stock changes.
     *
     * @param Transaction $transaction
     * @return array ['success' => bool, 'message' => string]
     */
    public function deleteTransaction(Transaction $transaction): array
    {
        DB::transaction(function () use ($transaction) {
            // Get display for restoring stock
            $display = Display::active()->first();

            // Restore stock for each transaction detail
            foreach ($transaction->details as $detail) {
                $product = Product::find($detail->product_id);
                
                if ($product && $display) {
                    // Kembalikan stok ke display
                    $displayStock = DisplayStock::firstOrCreate(
                        [
                            'display_id' => $display->id,
                            'product_id' => $detail->product_id,
                        ],
                        ['quantity' => 0]
                    );
                    $displayStock->increment('quantity', $detail->qty);
                }
            }

            // Delete related stock movements
            StockMovement::where('to_type', StockMovement::TYPE_TRANSACTION)
                ->where('to_id', $transaction->id)
                ->delete();

            // Delete profits
            $transaction->profits()->delete();

            // Delete transaction details
            $transaction->details()->delete();

            // Delete transaction
            $transaction->delete();
        });

        return ['success' => true, 'message' => 'Transaksi berhasil dihapus dan stok dikembalikan!'];
    }

    /**
     * Deduct ingredient stocks for recipe products.
     * Supports variant-based ingredients.
     *
     * @param Product $product The recipe product
     * @param ProductVariant|null $variant The selected variant
     * @param float $multiplier Quantity multiplier
     * @param Display $display Active display location
     * @param Transaction $transaction Current transaction
     * @return void
     */
    public function deductIngredientStock(Product $product, ?ProductVariant $variant, float $multiplier, Display $display, Transaction $transaction): void
    {
        if ($product->product_type !== Product::TYPE_RECIPE) {
            return;
        }

        // Get ingredients from the selected variant
        $ingredients = [];
        if ($variant) {
            $variant->load('ingredients.ingredient');
            $ingredients = $variant->ingredients;
        }

        // If no ingredients on variant, skip
        if (empty($ingredients) || count($ingredients) === 0) {
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
     * Calculate buy price for a cart item.
     *
     * @param Cart $cart
     * @return float
     */
    public function calculateBuyPrice(Cart $cart): float
    {
        return $cart->variant 
            ? ($cart->variant->buy_price ?? $cart->product->buy_price ?? 0)
            : ($cart->product->buy_price ?? 0);
    }
}
