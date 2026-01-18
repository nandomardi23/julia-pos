<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // dashboard permissions
        Permission::firstOrCreate(['name' => 'dashboard-access']);

        // users permissions
        Permission::firstOrCreate(['name' => 'users-access']);
        Permission::firstOrCreate(['name' => 'users-create']);
        Permission::firstOrCreate(['name' => 'users-update']);
        Permission::firstOrCreate(['name' => 'users-delete']);

        // roles permissions
        Permission::firstOrCreate(['name' => 'roles-access']);
        Permission::firstOrCreate(['name' => 'roles-create']);
        Permission::firstOrCreate(['name' => 'roles-update']);
        Permission::firstOrCreate(['name' => 'roles-delete']);

        // permissions permissions
        Permission::firstOrCreate(['name' => 'permissions-access']);
        Permission::firstOrCreate(['name' => 'permissions-create']);
        Permission::firstOrCreate(['name' => 'permissions-update']);
        Permission::firstOrCreate(['name' => 'permissions-delete']);

        //permission categories
        Permission::firstOrCreate(['name' => 'categories-access']);
        Permission::firstOrCreate(['name' => 'categories-create']);
        Permission::firstOrCreate(['name' => 'categories-edit']);
        Permission::firstOrCreate(['name' => 'categories-delete']);

        //permission products
        Permission::firstOrCreate(['name' => 'products-access']);
        Permission::firstOrCreate(['name' => 'products-create']);
        Permission::firstOrCreate(['name' => 'products-edit']);
        Permission::firstOrCreate(['name' => 'products-delete']);

        //permission customers (deprecated but kept for compatibility)
        Permission::firstOrCreate(['name' => 'customers-access']);
        Permission::firstOrCreate(['name' => 'customers-create']);
        Permission::firstOrCreate(['name' => 'customers-edit']);
        Permission::firstOrCreate(['name' => 'customers-delete']);

        //permission transactions
        Permission::firstOrCreate(['name' => 'transactions-access']);

        // permission reports
        Permission::firstOrCreate(['name' => 'reports-access']);
        Permission::firstOrCreate(['name' => 'profits-access']);

        // payment settings
        Permission::firstOrCreate(['name' => 'payment-settings-access']);

        // suppliers permissions
        Permission::firstOrCreate(['name' => 'suppliers-access']);
        Permission::firstOrCreate(['name' => 'suppliers-create']);
        Permission::firstOrCreate(['name' => 'suppliers-edit']);
        Permission::firstOrCreate(['name' => 'suppliers-delete']);

        // warehouses permissions
        Permission::firstOrCreate(['name' => 'warehouses-access']);
        Permission::firstOrCreate(['name' => 'warehouses-create']);
        Permission::firstOrCreate(['name' => 'warehouses-edit']);
        Permission::firstOrCreate(['name' => 'warehouses-delete']);

        // displays permissions
        Permission::firstOrCreate(['name' => 'displays-access']);
        Permission::firstOrCreate(['name' => 'displays-create']);
        Permission::firstOrCreate(['name' => 'displays-edit']);
        Permission::firstOrCreate(['name' => 'displays-delete']);

        // stock movements permissions
        Permission::firstOrCreate(['name' => 'stock-movements-access']);
        Permission::firstOrCreate(['name' => 'stock-movements-create']);

        // purchase orders permissions
        Permission::firstOrCreate(['name' => 'purchase-orders-access']);
        Permission::firstOrCreate(['name' => 'purchase-orders-create']);
        Permission::firstOrCreate(['name' => 'purchase-orders-edit']);
        Permission::firstOrCreate(['name' => 'purchase-orders-delete']);

        // shifts permissions
        Permission::firstOrCreate(['name' => 'shifts-access']);
        Permission::firstOrCreate(['name' => 'shifts-create']);

        // stock opname permissions
        Permission::firstOrCreate(['name' => 'stock-opname-access']);
        Permission::firstOrCreate(['name' => 'stock-opname-create']);

        // returns permissions
        Permission::firstOrCreate(['name' => 'returns-access']);
        Permission::firstOrCreate(['name' => 'returns-create']);
    }
}
