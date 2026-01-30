<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductionStockMovementSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('stock_movements')->truncate();
        DB::table('display_stock')->truncate();

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

        // Get all existing product IDs
        $existingProductIds = Product::pluck('id')->toArray();

        if (empty($existingProductIds)) {
            $this->command->warn('No products found in database. Skipping stock movement seeding.');
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
            return;
        }

        $this->command->info('Found ' . count($existingProductIds) . ' products. Creating initial display stocks...');

        // Create display stock for all products with 0 quantity (fresh start)
        foreach ($existingProductIds as $pid) {
            DB::table('display_stock')->insert([
                'display_id' => 1,
                'product_id' => $pid,
                'quantity' => 0,
                'min_stock' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $this->command->info('Display stock created for all products (quantity: 0, fresh start).');
        $this->command->info('Stock movements cleared. You can now add stock via the application.');
    }
}
