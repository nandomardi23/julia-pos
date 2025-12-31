<?php

namespace App\Services;

use App\Models\Display;
use App\Models\DisplayStock;
use App\Models\Product;
use App\Models\StockMovement;
use App\Models\Warehouse;
use App\Models\WarehouseStock;
use Illuminate\Support\Facades\DB;

class StockService
{
    /**
     * Add stock to warehouse (from supplier).
     *
     * @param array $data
     * @return array ['success' => bool, 'message' => string]
     */
    public function addToWarehouse(array $data): array
    {
        $productId = $data['product_id'];
        $warehouseId = $data['warehouse_id'];
        $quantity = $data['quantity'];
        $purchasePrice = $data['purchase_price'] ?? null;
        $supplierId = $data['supplier_id'] ?? null;
        $note = $data['note'] ?? 'Barang masuk dari supplier';

        DB::transaction(function () use ($productId, $warehouseId, $quantity, $purchasePrice, $supplierId, $note) {
            // Add or update warehouse stock
            $warehouseStock = WarehouseStock::firstOrCreate(
                [
                    'warehouse_id' => $warehouseId,
                    'product_id' => $productId,
                ],
                ['quantity' => 0]
            );
            $warehouseStock->increment('quantity', $quantity);

            // Create stock movement record
            StockMovement::create([
                'product_id' => $productId,
                'supplier_id' => $supplierId,
                'from_type' => StockMovement::TYPE_SUPPLIER,
                'from_id' => $supplierId,
                'to_type' => StockMovement::TYPE_WAREHOUSE,
                'to_id' => $warehouseId,
                'quantity' => $quantity,
                'purchase_price' => $purchasePrice,
                'note' => $note,
                'user_id' => auth()->id(),
            ]);
        });

        // Recalculate average cost
        $product = Product::find($productId);
        if ($product) {
            $product->updateAverageCost();
        }

        return ['success' => true, 'message' => 'Stok berhasil ditambahkan ke gudang!'];
    }

    /**
     * Transfer stock from warehouse to display.
     *
     * @param array $data
     * @return array ['success' => bool, 'message' => string]
     */
    public function transferToDisplay(array $data): array
    {
        $warehouseId = $data['warehouse_id'];
        $displayId = $data['display_id'];
        $productId = $data['product_id'];
        $quantity = $data['quantity'];
        $note = $data['note'] ?? 'Transfer dari gudang ke display';

        // Check warehouse stock
        $warehouseStock = WarehouseStock::where('warehouse_id', $warehouseId)
            ->where('product_id', $productId)
            ->first();

        if (!$warehouseStock || $warehouseStock->quantity < $quantity) {
            return ['success' => false, 'message' => 'Stok gudang tidak mencukupi!'];
        }

        DB::transaction(function () use ($warehouseId, $displayId, $productId, $quantity, $note, $warehouseStock) {
            // Decrease warehouse stock
            $warehouseStock->decrement('quantity', $quantity);

            // Add or update display stock
            $displayStock = DisplayStock::firstOrCreate(
                [
                    'display_id' => $displayId,
                    'product_id' => $productId,
                ],
                ['quantity' => 0]
            );
            $displayStock->increment('quantity', $quantity);

            // Create stock movement record
            StockMovement::create([
                'product_id' => $productId,
                'from_type' => StockMovement::TYPE_WAREHOUSE,
                'from_id' => $warehouseId,
                'to_type' => StockMovement::TYPE_DISPLAY,
                'to_id' => $displayId,
                'quantity' => $quantity,
                'note' => $note,
                'user_id' => auth()->id(),
            ]);
        });

        return ['success' => true, 'message' => 'Stok berhasil ditransfer ke display!'];
    }

    /**
     * Remove stock (stock out) from warehouse or display.
     *
     * @param array $data
     * @return array ['success' => bool, 'message' => string]
     */
    public function stockOut(array $data): array
    {
        $locationType = $data['location_type'];
        $locationId = $data['location_id'];
        $productId = $data['product_id'];
        $quantity = $data['quantity'];
        $reason = $data['reason'];
        $note = $data['note'] ?? '';

        // Get product to calculate loss
        $product = Product::findOrFail($productId);

        // Check stock based on location type
        if ($locationType === 'warehouse') {
            $stock = WarehouseStock::where('warehouse_id', $locationId)
                ->where('product_id', $productId)
                ->first();
            $fromType = StockMovement::TYPE_WAREHOUSE;
        } else {
            $stock = DisplayStock::where('display_id', $locationId)
                ->where('product_id', $productId)
                ->first();
            $fromType = StockMovement::TYPE_DISPLAY;
        }

        if (!$stock || $stock->quantity < $quantity) {
            return ['success' => false, 'message' => 'Stok tidak mencukupi!'];
        }

        // Get reason label
        $reasons = StockMovement::getStockOutReasons();
        $reasonLabel = $reasons[$reason] ?? $reason;

        // Calculate loss amount
        $lossAmount = $this->calculateLoss($product, $quantity, $reason);

        DB::transaction(function () use ($productId, $stock, $fromType, $locationId, $quantity, $reasonLabel, $note, $lossAmount) {
            // Decrease stock
            $stock->decrement('quantity', $quantity);

            // Create stock movement record
            StockMovement::create([
                'product_id' => $productId,
                'from_type' => $fromType,
                'from_id' => $locationId,
                'to_type' => StockMovement::TYPE_OUT,
                'to_id' => null,
                'quantity' => $quantity,
                'loss_amount' => $lossAmount,
                'note' => '[' . $reasonLabel . '] ' . $note,
                'user_id' => auth()->id(),
            ]);
        });

        $message = 'Barang keluar berhasil dicatat!';
        if ($lossAmount) {
            $formattedLoss = 'Rp ' . number_format($lossAmount, 0, ',', '.');
            $message .= ' Kerugian: ' . $formattedLoss;
        }

        return ['success' => true, 'message' => $message];
    }

    /**
     * Calculate loss amount for stock out.
     *
     * @param Product $product
     * @param float $quantity
     * @param string $reason
     * @return float|null
     */
    public function calculateLoss(Product $product, float $quantity, string $reason): ?float
    {
        $lossReasons = [
            StockMovement::REASON_DAMAGED,
            StockMovement::REASON_EXPIRED,
            StockMovement::REASON_INTERNAL_USE,
            StockMovement::REASON_ADJUSTMENT,
            StockMovement::REASON_OTHER,
        ];

        if (!in_array($reason, $lossReasons)) {
            return null;
        }

        $costPerUnit = $product->average_cost ?: ($product->buy_price ?: 0);
        return $quantity * $costPerUnit;
    }

    /**
     * Get warehouse stock quantity for a product.
     *
     * @param int $warehouseId
     * @param int $productId
     * @return float
     */
    public function getWarehouseStock(int $warehouseId, int $productId): float
    {
        $stock = WarehouseStock::where('warehouse_id', $warehouseId)
            ->where('product_id', $productId)
            ->first();

        return $stock ? (float) $stock->quantity : 0;
    }

    /**
     * Get display stock quantity for a product.
     *
     * @param int $displayId
     * @param int $productId
     * @return float
     */
    public function getDisplayStock(int $displayId, int $productId): float
    {
        $stock = DisplayStock::where('display_id', $displayId)
            ->where('product_id', $productId)
            ->first();

        return $stock ? (float) $stock->quantity : 0;
    }
}
