<?php

namespace Database\Seeders;

use App\Models\Display;
use App\Models\Supplier;
use App\Models\Warehouse;
use Illuminate\Database\Seeder;

class TestInventorySeeder extends Seeder
{
    public function run(): void
    {
        $this->command->info('🏪 Creating test inventory data...');

        // ========== WAREHOUSES ==========
        $warehouses = [
            ['name' => 'Gudang Utama', 'location' => 'Lantai Basement', 'is_active' => true],
            ['name' => 'Gudang Cadangan', 'location' => 'Lantai 2', 'is_active' => true],
        ];
        
        foreach ($warehouses as $w) {
            Warehouse::firstOrCreate(
                ['name' => $w['name']],
                $w
            );
            $this->command->info("  ✓ Warehouse: {$w['name']}");
        }

        // ========== DISPLAYS ==========
        $displays = [
            ['name' => 'Counter Kasir', 'location' => 'Lantai 1 - Depan', 'is_active' => true],
            ['name' => 'Etalase Samping', 'location' => 'Lantai 1 - Samping', 'is_active' => false],
        ];
        
        foreach ($displays as $d) {
            Display::firstOrCreate(
                ['name' => $d['name']],
                $d
            );
            $this->command->info("  ✓ Display: {$d['name']}");
        }

        // ========== SUPPLIERS ==========
        $suppliers = [
            [
                'name' => 'Ahmad Kopi',
                'company' => 'PT Kopi Nusantara',
                'phone' => '08123456789',
                'address' => 'Jl. Kopi No. 123, Jakarta',
            ],
            [
                'name' => 'Budi Susu',
                'company' => 'CV Susu Murni',
                'phone' => '08234567890',
                'address' => 'Jl. Susu No. 45, Bandung',
            ],
            [
                'name' => 'Citra Packaging',
                'company' => 'UD Packaging Jaya',
                'phone' => '08345678901',
                'address' => 'Jl. Industri No. 78, Surabaya',
            ],
            [
                'name' => 'Dewi Buah',
                'company' => 'Toko Buah Segar',
                'phone' => '08456789012',
                'address' => 'Pasar Induk, Kramat Jati',
            ],
        ];
        
        foreach ($suppliers as $s) {
            Supplier::firstOrCreate(
                ['phone' => $s['phone']],
                $s
            );
            $this->command->info("  ✓ Supplier: {$s['name']} ({$s['company']})");
        }

        $this->command->info('✅ Test inventory data created!');
        $this->command->info('   - 2 Warehouses');
        $this->command->info('   - 2 Displays');
        $this->command->info('   - 4 Suppliers');
    }
}
