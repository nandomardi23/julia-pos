<?php

namespace Database\Seeders;

use App\Models\StockMovement;
use App\Models\WarehouseStock;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductionWarehouseStockSeeder extends Seeder
{
    public function run(): void
    {
        // Ensure Warehouse 1 exists to prevent Integrity Constraint Violation
        if (!\App\Models\Warehouse::find(1)) {
            \App\Models\Warehouse::create([
                'id' => 1,
                'name' => 'Gudang Utama',
                'location' => 'Pusat',
                'is_active' => true,
            ]);
        }

        // Data format: [id, warehouse_id, product_id, quantity]
        // Extracted from user's SQL dump
        $stocks = [
            [1, 1, 1, 0],
            [2, 1, 2, 0],
            [3, 1, 3, 0],
            [4, 1, 4, 0],
            [5, 1, 5, 0],
            [6, 1, 6, 0],
            [7, 1, 7, 0],
            [8, 1, 8, 0],
            [9, 1, 9, 0],
            [10, 1, 10, 0],
            [11, 1, 11, 0],
            [12, 1, 12, 0],
            [13, 1, 13, 0],
            [14, 1, 14, 0],
            [15, 1, 15, 0],
            [16, 1, 16, 0],
            [17, 1, 17, 0],
            [18, 1, 18, 0],
            [19, 1, 19, 0],
            [20, 1, 20, 0],
            [21, 1, 21, 0],
            [22, 1, 22, 0],
            [23, 1, 23, 0],
            [24, 1, 24, 0],
            [25, 1, 25, 0],
            [26, 1, 26, 0],
            [27, 1, 27, 0],
            [28, 1, 28, 0],
            [29, 1, 29, 0],
            [30, 1, 30, 0],
            [31, 1, 31, 0],
            [32, 1, 32, 0],
            [33, 1, 33, 0],
            [34, 1, 34, 0],
            [35, 1, 35, 0],
            [36, 1, 36, 0],
            [37, 1, 37, 0],
            [38, 1, 38, 0],
            [39, 1, 39, 0],
            [40, 1, 40, 0],
            [41, 1, 41, 0],
            [42, 1, 42, 0],
            [43, 1, 43, 0],
            [44, 1, 44, 0],
            [45, 1, 45, 0],
            [46, 1, 46, 0],
            [47, 1, 47, 0],
            [48, 1, 48, 0],
            [49, 1, 49, 0],
            [50, 1, 50, 0],
            [51, 1, 51, 0],
            [52, 1, 52, 0],
            [53, 1, 53, 0],
            [54, 1, 54, 0],
            [55, 1, 55, 0],
            [56, 1, 56, 0],
            [57, 1, 57, 0],
            [58, 1, 58, 0],
            [59, 1, 59, 0],
            [60, 1, 60, 0],
            [61, 1, 61, 0],
            [62, 1, 62, 0],
            [63, 1, 63, 0],
            [64, 1, 64, 0],
            [65, 1, 65, 0],
            [66, 1, 66, 0],
            [67, 1, 67, 0],
            [68, 1, 68, 0],
            [69, 1, 69, 0],
            [70, 1, 70, 0],
            [71, 1, 71, 0],
            [72, 1, 72, 0],
            [73, 1, 73, 0],
            [74, 1, 74, 0],
            [75, 1, 75, 0],
            [76, 1, 76, 0],
            [77, 1, 77, 0],
            [78, 1, 78, 0],
            [79, 1, 79, 0],
            [80, 1, 80, 0],
            [81, 1, 81, 0],
            [82, 1, 82, 0],
            [83, 1, 83, 0],
            [84, 1, 84, 1], // Non-zero
            [85, 1, 85, 0],
            [86, 1, 86, 0],
            [87, 1, 87, 0],
            [88, 1, 88, 0],
            [89, 1, 89, 0],
            [90, 1, 90, 0],
            [91, 1, 91, 0],
            [92, 1, 92, 0],
            [93, 1, 93, 0],
            [94, 1, 94, 0],
            [95, 1, 95, 0],
            [96, 1, 96, 0],
            [97, 1, 97, 0],
            [98, 1, 98, 0],
            [99, 1, 99, 0],
            [100, 1, 100, 0],
            [101, 1, 101, 0],
            [102, 1, 102, 0],
            [103, 1, 103, 0],
            [104, 1, 104, 0],
            [105, 1, 105, 0],
            [106, 1, 106, 0],
            [107, 1, 107, 1], // Non-zero
            [108, 1, 108, 0],
            [109, 1, 109, 0],
            [110, 1, 110, 0],
            [111, 1, 111, 0],
            [112, 1, 112, 0],
            [113, 1, 113, 0],
            [114, 1, 114, 0],
            [115, 1, 115, 0],
            [116, 1, 116, 0],
            [117, 1, 117, 0],
            [118, 1, 118, 0],
            [119, 1, 119, 0],
            [120, 1, 120, 0],
            [121, 1, 121, 0],
            [122, 1, 122, 0],
            [123, 1, 123, 0],
            [124, 1, 124, 0],
            [125, 1, 125, 0],
            [126, 1, 126, 0],
            [127, 1, 127, 0],
        ];

        // Clear existing warehouse stocks to avoid duplication if re-run
        // DB::table('warehouse_stock')->truncate(); 
        // Note: Truncate might break foreign keys if referenced. Use createOrUpdate.

        foreach ($stocks as $item) {
            $warehouseId = $item[1];
            $productId = $item[2];
            $quantity = $item[3];

            // 1. Update/Create Warehouse Stock
            $stock = WarehouseStock::updateOrCreate(
                ['warehouse_id' => $warehouseId, 'product_id' => $productId],
                ['quantity' => $quantity, 'updated_at' => now(), 'created_at' => now()]
            );

            // 2. If Quantity > 0, ensure there is a StockMovement
            // This prevents "Phantom Stock" where stock exists without history.
            if ($quantity > 0) {
                // Check if an "Initial Seed" movement already exists for this product/warehouse to avoid duplicates
                $exists = StockMovement::where('product_id', $productId)
                    ->where('to_type', StockMovement::TYPE_WAREHOUSE)
                    ->where('to_id', $warehouseId)
                    ->where('note', 'Initial Seed from Dump')
                    ->exists();

                if (!$exists) {
                    StockMovement::create([
                        'product_id' => $productId,
                        'from_type' => StockMovement::TYPE_SUPPLIER, // Or Adjustment
                        'from_id' => null, // No specific supplier
                        'to_type' => StockMovement::TYPE_WAREHOUSE,
                        'to_id' => $warehouseId,
                        'quantity' => $quantity,
                        'note' => 'Initial Seed from Dump',
                        'user_id' => 1, // System or Admin
                        'created_at' => now(),
                        'updated_at' => now(),
                        // Add batch/expiry if known/needed, else null
                    ]);
                }
            }
        }
    }
}
