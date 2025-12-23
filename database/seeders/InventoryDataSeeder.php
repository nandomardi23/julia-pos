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
                'description' => 'Gudang penyimpanan utama untuk semua produk',
                'is_active' => true,
            ]
        );

        // Create default display
        Display::firstOrCreate(
            ['name' => 'Display Utama'],
            [
                'location' => 'Area Kasir',
                'description' => 'Display utama untuk penjualan di kasir/POS',
                'is_active' => true,
            ]
        );

        // Create sample supplier (optional)
        Supplier::firstOrCreate(
            ['name' => 'Supplier Umum'],
            [
                'company' => null,
                'email' => null,
                'phone' => '-',
                'address' => null,
                'description' => 'Supplier default untuk produk tanpa supplier spesifik',
            ]
        );

        $this->command->info('Inventory data seeded: 1 Warehouse, 1 Display, 1 Sample Supplier');
    }
}
