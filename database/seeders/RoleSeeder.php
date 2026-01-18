<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ==================== BUSINESS ROLES ====================
        
        // 1. Super Admin - Full access (bypass all permissions)
        Role::firstOrCreate(['name' => 'super-admin']);

        // 2. Owner - View all reports & profits, manage products (no daily operations)
        $ownerRole = Role::firstOrCreate(['name' => 'owner']);
        $ownerRole->syncPermissions([
            'dashboard-access',
            'reports-access',
            'profits-access',
            'products-access',
            'categories-access',
            'suppliers-access',
            'warehouses-access',
            'displays-access',
            'stock-movements-access',
            'purchase-orders-access',
            'transactions-access', // View transaction history
            'payment-settings-access',
        ]);

        // 3. Cashier - POS operations only
        $cashierRole = Role::firstOrCreate(['name' => 'cashier']);
        $cashierRole->syncPermissions([
            'dashboard-access',
            'transactions-access',
            'shifts-access',
            'shifts-create',
        ]);

        // 4. Warehouse Staff - Inventory management
        $warehouseRole = Role::firstOrCreate(['name' => 'warehouse']);
        $warehouseRole->syncPermissions([
            'dashboard-access',
            'products-access',
            'categories-access',
            'suppliers-access',
            'warehouses-access',
            'displays-access',
            'stock-movements-access',
            'stock-movements-create',
            'purchase-orders-access',
            'purchase-orders-create',
            'purchase-orders-edit',
            'stock-opname-access',
            'stock-opname-create',
            'returns-access',
            'returns-create',
        ]);

        // 5. Admin - Everything except user/role management (for store manager)
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $adminRole->syncPermissions(
            Permission::whereNotIn('name', [
                'users-access', 'users-create', 'users-update', 'users-delete',
                'roles-access', 'roles-create', 'roles-update', 'roles-delete',
                'permissions-access', 'permissions-create', 'permissions-update', 'permissions-delete',
            ])->pluck('name')->toArray()
        );
    }
}