<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductionInventorySeeder extends Seeder
{
    public function run(): void
    {
        // Disable Foreign Key Checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Truncate tables
        DB::table('stock_movements')->truncate();
        DB::table('display_stock')->truncate();
        DB::table('warehouse_stock')->truncate();

        // Get all existing product IDs
        $existingProductIds = Product::pluck('id')->toArray();

        if (empty($existingProductIds)) {
            $this->command->warn('No products found in database. Skipping inventory seeding.');
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
            return;
        }

        $this->command->info('Found ' . count($existingProductIds) . ' products. Creating display stocks...');

        // Ensure Display 1 exists
        $display = DB::table('displays')->find(1);
        if (!$display) {
            DB::table('displays')->insert([
                'id' => 1,
                'name' => 'Toko Utama',
                'location' => 'Store Front',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Ensure Warehouse 1 exists
        $warehouse = DB::table('warehouses')->find(1);
        if (!$warehouse) {
            DB::table('warehouses')->insert([
                'id' => 1,
                'name' => 'Gudang Utama',
                'location' => 'Pusat',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Create display stock for all products with 0 quantity (fresh start)
        foreach ($existingProductIds as $pid) {
            DB::table('display_stock')->insert([
                'display_id' => 1,
                'product_id' => $pid,
                'quantity' => 0,
                'min_stock' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->command->info('Display stock created for all products (quantity: 0, fresh start).');

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
