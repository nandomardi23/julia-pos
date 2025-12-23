<?php

namespace Database\Seeders;

use App\Models\Display;
use App\Models\Supplier;
use App\Models\Warehouse;
use Illuminate\Database\Seeder;

class InventoryDataSeeder extends Seeder
{
    /**
     * Seed initial inventory data: warehouse, display, and sample supplier.
     */
    public function run(): void
    {
        // Create default warehouse
        Warehouse::firstOrCreate(
            ['name' => 'Gudang Utama'],
            [
                'location' => 'Lokasi Utama',
                'is_active' => true,
            ]
        );

        // Create default display
        Display::firstOrCreate(
            ['name' => 'Display Utama'],
            [
                'location' => 'Area Kasir',
                'is_active' => true,
            ]
        );

        // Create sample suppliers
        Supplier::firstOrCreate(
            ['name' => 'Supplier Buah Segar'],
            [
                'company' => 'PT Buah Nusantara',
                'email' => 'buah@supplier.com',
                'phone' => '021-1234567',
                'address' => 'Pasar Induk Jakarta',
            ]
        );

        Supplier::firstOrCreate(
            ['name' => 'Supplier Perlengkapan'],
            [
                'company' => 'CV Plastik Jaya',
                'email' => 'plastik@supplier.com',
                'phone' => '021-7654321',
                'address' => 'Kawasan Industri Tangerang',
            ]
        );

        $this->command->info('Inventory data seeded: 1 Warehouse, 1 Display, 2 Suppliers');
    }
}
