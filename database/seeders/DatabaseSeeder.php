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
            ProductionCategorySeeder::class, // New
            PaymentSettingSeeder::class,
            ProductionSettingSeeder::class, // Store config
            ProductionProductSeeder::class,
            ProductionInventorySeeder::class, // New (Stock & Movements)
            ProductionShiftSeeder::class,
            ProductionTransactionSeeder::class,
        ]);
    }
}
