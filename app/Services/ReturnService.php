<?php

namespace App\Services;

use App\Models\Display;
use App\Models\DisplayStock;
use App\Models\Product;
use App\Models\ProductReturn;
use App\Models\ReturnItem;
use App\Models\Shift;
use App\Models\StockMovement;
use App\Models\Transaction;
use App\Models\WarehouseStock;
use Illuminate\Support\Facades\DB;

class ReturnService
{
    /**
     * Approve a return request.
     * 
     * @param int $returnId
     * @param int $approverId
     * @return ProductReturn
     * @throws \Exception
     */
    public function approveReturn(int $returnId, int $approverId): ProductReturn
    {
        $return = ProductReturn::with('items')->findOrFail($returnId);

        if (!$return->canBeApproved()) {
            throw new \Exception('Return ini tidak dapat disetujui.');
        }

        return DB::transaction(function () use ($return, $approverId) {
            // 1. Update return status
            $return->update([
                'status' => ProductReturn::STATUS_APPROVED,
                'approved_by' => $approverId,
                'approved_at' => now(),
            ]);

            // 2. Restore stock (Base logic for all returns)
            $this->restoreStock($return);

            // 3. Handle specific logic based on return type
            switch ($return->return_type) {
                case ProductReturn::TYPE_EXCHANGE:
                    $this->handleExchange($return);
                    break;
                case ProductReturn::TYPE_REFUND:
                    $this->handleRefund($return);
                    break;
                case ProductReturn::TYPE_CREDIT:
                    $this->handleCredit($return);
                    break;
            }

            // 4. Mark as completed
            $return->update(['status' => ProductReturn::STATUS_COMPLETED]);

            return $return;
        });
    }

    /**
     * Restore stock from returned items.
     */
    protected function restoreStock(ProductReturn $return): void
    {
        $display = Display::active()->first();
        if (!$display) return;

        foreach ($return->items as $item) {
            $product = Product::find($item->product_id);
            if (!$product) continue;

            // Handle Recipe Products
            if ($product->product_type === Product::TYPE_RECIPE) {
                $effectiveIngredients = $product->getEffectiveIngredients();
                
                foreach ($effectiveIngredients as $ingredientData) {
                    $ingredient = $ingredientData->ingredient;
                    if (!$ingredient) continue;
                    
                    $ingredientQty = $ingredientData->quantity * $item->qty;
                    
                    if ($ingredient->product_type === Product::TYPE_SUPPLY) {
                        // Restore supply to warehouse
                        $warehouseStock = WarehouseStock::where('product_id', $ingredient->id)->first();
                        if ($warehouseStock) {
                            $warehouseStock->increment('quantity', $ingredientQty);
                            
                            StockMovement::create([
                                'product_id' => $ingredient->id,
                                'from_type' => StockMovement::TYPE_TRANSACTION,
                                'from_id' => $return->transaction_id,
                                'to_type' => StockMovement::TYPE_WAREHOUSE,
                                'to_id' => $warehouseStock->warehouse_id,
                                'quantity' => $ingredientQty,
                                'note' => 'Return bahan resep: ' . $return->return_number . ' - ' . $product->title,
                                'user_id' => auth()->id(),
                            ]);
                        }
                    } else {
                        // Restore ingredient to display
                        $this->incrementDisplayStock($display->id, $ingredient->id, $ingredientQty, $return, 'Return bahan resep: ' . $return->return_number . ' - ' . $product->title);
                    }
                }
            } else {
                // Handle Regular Products
                $this->incrementDisplayStock($display->id, $item->product_id, $item->qty, $return, 'Return: ' . $return->return_number . ' - ' . $return->reason);
            }
        }
    }

    /**
     * Helper to increment display stock and log movement.
     */
    protected function incrementDisplayStock($displayId, $productId, $qty, $return, $note)
    {
        $displayStock = DisplayStock::firstOrCreate(
            ['display_id' => $displayId, 'product_id' => $productId],
            ['quantity' => 0]
        );
        $displayStock->increment('quantity', $qty);

        StockMovement::create([
            'product_id' => $productId,
            'from_type' => StockMovement::TYPE_TRANSACTION,
            'from_id' => $return->transaction_id,
            'to_type' => StockMovement::TYPE_DISPLAY,
            'to_id' => $displayId,
            'quantity' => $qty,
            'note' => $note,
            'user_id' => auth()->id(),
        ]);
    }

    /**
     * Handle Exchange logic (Deduct stock for replacement items).
     */
    protected function handleExchange(ProductReturn $return): void
    {
        $display = Display::active()->first();
        if (!$display) return;

        foreach ($return->items as $item) {
            // Logic: We assume the exchange is 1-to-1 for the SAME product for now.
            // If the user wants to exchange for a DIFFERENT product, the UI/Data structure needs to support "Exchange Item Selection".
            // Since the current UI likely doesn't have "Replacement Item" selection, 
            // the safest assumption for "Tukar Barang" (Exchange) is replacing with the SAME item (e.g. size/color change or defect replacement).
            
            // Deduct stock for the NEW item being given to customer.
            $product = Product::find($item->product_id); // Assuming same product
             if (!$product) continue;
             
             // Check if it's a recipe
             if ($product->product_type === Product::TYPE_RECIPE) {
                 $effectiveIngredients = $product->getEffectiveIngredients();
                 foreach ($effectiveIngredients as $ingredientData) {
                     $ingredient = $ingredientData->ingredient;
                     if (!$ingredient) continue;
                     
                     $ingredientQty = $ingredientData->quantity * $item->qty;
                     
                     if ($ingredient->product_type === Product::TYPE_SUPPLY) {
                        // Supply from warehouse
                        $warehouseStock = WarehouseStock::where('product_id', $ingredient->id)->first();
                        if ($warehouseStock) {
                            $warehouseStock->decrement('quantity', $ingredientQty);
                            
                            StockMovement::create([
                                'product_id' => $ingredient->id,
                                'from_type' => StockMovement::TYPE_WAREHOUSE,
                                'from_id' => $warehouseStock->warehouse_id,
                                'to_type' => StockMovement::TYPE_TRANSACTION, // Sold out again
                                'to_id' => $return->transaction_id,
                                'quantity' => $ingredientQty,
                                'note' => 'Exchange Out (Bahan): ' . $return->return_number,
                                'user_id' => auth()->id(),
                            ]);
                        }
                     } else {
                         // Ingredient from display
                         $this->decrementDisplayStock($display->id, $ingredient->id, $ingredientQty, $return, 'Exchange Out (Bahan): ' . $return->return_number);
                     }
                 }
             } else {
                 // Regular Product
                 $this->decrementDisplayStock($display->id, $item->product_id, $item->qty, $return, 'Exchange Out: ' . $return->return_number);
             }
        }
    }

    /**
     * Helper to decrement display stock and log movement.
     */
    protected function decrementDisplayStock($displayId, $productId, $qty, $return, $note)
    {
        $displayStock = DisplayStock::where('display_id', $displayId)
            ->where('product_id', $productId)
            ->first();

        // Allow negative stock? Or throw error?
        // Usually for POS, we might allow negative stock or just set to 0 and warn.
        // For strict control, we should check. For now, let's decrement.
        if ($displayStock) {
            $displayStock->decrement('quantity', $qty);
        } else {
            // Create negative stock if didn't exist?
            $displayStock = DisplayStock::create([
                'display_id' => $displayId,
                'product_id' => $productId,
                'quantity' => -$qty
            ]);
        }

        StockMovement::create([
            'product_id' => $productId,
            'from_type' => StockMovement::TYPE_DISPLAY,
            'from_id' => $displayId,
            'to_type' => StockMovement::TYPE_TRANSACTION,
            'to_id' => $return->transaction_id,
            'quantity' => $qty,
            'note' => $note,
            'user_id' => auth()->id(),
        ]);
    }

    protected function handleRefund(ProductReturn $return): void
    {
        // 1. Get active shift for the approver
        $activeShift = Shift::getActiveShift(auth()->id());
        
        // 2. Determine refund amount (negative)
        $refundAmount = -abs((float) $return->return_amount);
        
        // 3. Create negative transaction
        $transaction = Transaction::create([
            'cashier_id' => auth()->id(), // Approver acts as cashier
            'shift_id' => $activeShift?->id,
            'invoice' => 'REF-' . $return->return_number, // Unique Refund Invoice
            'cash' => $refundAmount, // Assume cash refund
            'change' => 0,
            'discount' => 0,
            'grand_total' => $refundAmount,
            'payment_method' => 'cash', // Default to cash for now
            'payment_status' => 'paid',
            'ppn' => 0,
            'tax' => 0,
            'created_at' => now(),
        ]);
        
        // 4. Link return to this new transaction (optional, maybe add column later)
        // For now, the invoice 'REF-...' is the link.
    }

    protected function handleCredit(ProductReturn $return): void
    {
        // 1. Validate Customer
        $transaction = $return->transaction;
        if (!$transaction || !$transaction->customer_id) {
            throw new \Exception('Transaksi tidak memiliki data pelanggan. Tidak dapat memproses Store Credit.');
        }

        // 2. Add Balance to User
        $creditAmount = abs((float) $return->return_amount);
        $transaction->customer->increment('balance', $creditAmount);

        // 3. Create Negative Transaction (Accounting Adjustment)
        // We need to decrease Sales (Grand Total) but NOT Cash.
        // Because money stays in company (as liability/deposit), but Revenue is reversed.
        
        $activeShift = Shift::getActiveShift(auth()->id());
        $refundAmount = -$creditAmount;

        Transaction::create([
            'cashier_id' => auth()->id(),
            'customer_id' => $transaction->customer_id,
            'shift_id' => $activeShift?->id,
            'invoice' => 'CRD-' . $return->return_number, // Unique Credit Invoice
            'cash' => 0, // No cash out
            'change' => 0,
            'discount' => 0,
            'grand_total' => $refundAmount, // Reduce Sales Report
            'payment_method' => 'store_credit',
            'payment_status' => 'paid',
            'ppn' => 0,
            'tax' => 0,
            'created_at' => now(),
        ]);
    }
}
