<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

/**
 * Production Seeder - Only creates essential data for production deployment
 * 
 * Creates:
 * - All permissions
 * - Business roles (super-admin, owner, admin, cashier, warehouse)
 * - One super-admin user
 * 
 * Usage: php artisan db:seed --class=ProductionSeeder
 */
class ProductionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->seedPermissions();
        $this->seedRoles();
        $this->seedSuperAdmin();
    }

    /**
     * Seed all permissions
     */
    private function seedPermissions(): void
    {
        $permissions = [
            // Dashboard
            'dashboard-access',
            
            // Users
            'users-access',
            'users-create',
            'users-update',
            'users-delete',
            
            // Roles
            'roles-access',
            'roles-create',
            'roles-update',
            'roles-delete',
            
            // Permissions
            'permissions-access',
            'permissions-create',
            'permissions-update',
            'permissions-delete',
            
            // Categories
            'categories-access',
            'categories-create',
            'categories-edit',
            'categories-delete',
            
            // Products
            'products-access',
            'products-create',
            'products-edit',
            'products-delete',
            
            // Customers (deprecated but kept for compatibility)
            'customers-access',
            'customers-create',
            'customers-edit',
            'customers-delete',
            
            // Transactions
            'transactions-access',
            
            // Reports
            'reports-access',
            'profits-access',
            
            // Payment Settings
            'payment-settings-access',
            
            // Suppliers
            'suppliers-access',
            'suppliers-create',
            'suppliers-edit',
            'suppliers-delete',
            
            // Warehouses
            'warehouses-access',
            'warehouses-create',
            'warehouses-edit',
            'warehouses-delete',
            
            // Displays
            'displays-access',
            'displays-create',
            'displays-edit',
            'displays-delete',
            
            // Stock Movements
            'stock-movements-access',
            'stock-movements-create',
            
            // Purchase Orders
            'purchase-orders-access',
            'purchase-orders-create',
            'purchase-orders-edit',
            'purchase-orders-delete',
            
            // Shifts
            'shifts-access',
            'shifts-create',
            
            // Stock Opname
            'stock-opname-access',
            'stock-opname-create',
            
            // Returns
            'returns-access',
            'returns-create',
            
            // Expense Categories
            'expense-categories-access',
            'expense-categories-create',
            'expense-categories-edit',
            'expense-categories-delete',
            
            // Expenses
            'expenses-access',
            'expenses-create',
            'expenses-edit',
            'expenses-delete',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        $this->command->info('✓ ' . count($permissions) . ' permissions created');
    }

    /**
     * Seed business roles with appropriate permissions
     */
    private function seedRoles(): void
    {
        // 1. Super Admin - Full access (bypass all permissions via Gate::before)
        Role::firstOrCreate(['name' => 'super-admin', 'guard_name' => 'web']);

        // 2. Owner - View all reports & profits, manage products (no daily operations)
        $ownerRole = Role::firstOrCreate(['name' => 'owner', 'guard_name' => 'web']);
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
            'transactions-access',
            'payment-settings-access',
            'expense-categories-access',
            'expenses-access',
        ]);

        // 3. Cashier - POS operations only
        $cashierRole = Role::firstOrCreate(['name' => 'cashier', 'guard_name' => 'web']);
        $cashierRole->syncPermissions([
            'dashboard-access',
            'transactions-access',
            'shifts-access',
            'shifts-create',
        ]);

        // 4. Warehouse Staff - Inventory management
        $warehouseRole = Role::firstOrCreate(['name' => 'warehouse', 'guard_name' => 'web']);
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

        // 5. Admin - Everything except user/role management
        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $adminRole->syncPermissions(
            Permission::whereNotIn('name', [
                'users-access', 'users-create', 'users-update', 'users-delete',
                'roles-access', 'roles-create', 'roles-update', 'roles-delete',
                'permissions-access', 'permissions-create', 'permissions-update', 'permissions-delete',
            ])->pluck('name')->toArray()
        );

        $this->command->info('✓ 5 roles created (super-admin, owner, cashier, warehouse, admin)');
    }

    /**
     * Seed super admin user
     */
    private function seedSuperAdmin(): void
    {
        // Check if admin already exists
        $existingAdmin = User::where('email', 'admin@admin.com')->first();
        
        if ($existingAdmin) {
            $this->command->warn('! Admin user already exists, skipping...');
            return;
        }

        $admin = User::create([
            'name' => 'Administrator',
            'email' => 'admin@admin.com',
            'password' => bcrypt('admin123'),
        ]);

        // Assign super-admin role
        $admin->assignRole('super-admin');

        // Also sync all permissions (for explicit permission checks)
        $admin->syncPermissions(Permission::all());

        $this->command->info('✓ Super Admin created:');
        $this->command->info('  Email: admin@admin.com');
        $this->command->info('  Password: admin123');
        $this->command->warn('  ⚠ PENTING: Segera ganti password setelah login!');
    }
}
