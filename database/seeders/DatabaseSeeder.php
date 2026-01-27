<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            PermissionSeeder::class,
            RoleSeeder::class,
            ProductionUserSeeder::class,
            ProductionCategorySeeder::class, 
            PaymentSettingSeeder::class,
            ProductionSettingSeeder::class, 
            ProductionProductSeeder::class,
            ProductionWarehouseStockSeeder::class, // 1. Warehouse Stock
            ProductionStockMovementSeeder::class, // 2. Movements & Display Stock
            ProductionTransactionSeeder::class, // 3. Transactions
            ProductionTransactionDetailSeeder::class, // 4. Details
            ProductionShiftSeeder::class,
            // ProductionInventorySeeder::class, // Deprecated in favor of specific seeders
        ]);
    }
}
