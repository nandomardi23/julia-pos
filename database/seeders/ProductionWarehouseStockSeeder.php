<?php

namespace Database\Seeders;

use App\Models\Product;
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

        $warehouseId = 1;

        // Get all existing product IDs from database
        $existingProductIds = Product::pluck('id')->toArray();

        if (empty($existingProductIds)) {
            $this->command->warn('No products found in database. Skipping warehouse stock seeding.');
            return;
        }

        $this->command->info('Found ' . count($existingProductIds) . ' products. Creating warehouse stocks...');

        foreach ($existingProductIds as $productId) {
            // Check if warehouse stock already exists
            $exists = WarehouseStock::where('warehouse_id', $warehouseId)
                ->where('product_id', $productId)
                ->exists();

            if (!$exists) {
                // Create warehouse stock with 0 quantity (initial state)
                WarehouseStock::create([
                    'warehouse_id' => $warehouseId,
                    'product_id' => $productId,
                    'quantity' => 0,
                ]);
            }
        }

        $this->command->info('Warehouse stocks created/verified for all products.');
    }
}
