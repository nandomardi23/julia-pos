<?php

namespace Database\Seeders;

use App\Models\Shift;
use Illuminate\Database\Seeder;

class ProductionShiftSeeder extends Seeder
{
    public function run(): void
    {
        // Shift 1: Suci (ID 3), Closed
        Shift::create([
            'id' => 1,
            'user_id' => 3, // suci
            'shift_number' => 'SFT-20260126-001',
            'started_at' => '2026-01-26 08:30:48',
            'ended_at' => '2026-01-26 16:06:30',
            'opening_cash' => 268000.00,
            'closing_cash' => 239700.00,
            'expected_cash' => 567096.00,
            'difference' => -327396.00,
            'status' => 'closed',
            'notes' => "ada tiga barang yang tidak masuk dikarenakan salah harga perkilo nya, seharusnya jeruk raja 35.000 \n(jeruk raja 185 gram = 6.475)\n(jeruk raja 925 gram = 32.375)\n(kelengkeng 390 gram = 18.720) kelengkeng tidak masuk karena satu pembayaran dengan jeruk raja.",
            'created_at' => '2026-01-26 08:30:48',
            'updated_at' => '2026-01-26 16:06:30',
        ]);

        // Shift 2: Silfy (ID 6), Active
        Shift::create([
            'id' => 2,
            'user_id' => 6, // Silfy
            'shift_number' => 'SFT-20260126-002',
            'started_at' => '2026-01-26 16:08:40',
            'ended_at' => null,
            'opening_cash' => 497700.00,
            'closing_cash' => null,
            'expected_cash' => null,
            'difference' => null,
            'status' => 'active',
            'notes' => null,
            'created_at' => '2026-01-26 16:08:40',
            'updated_at' => '2026-01-26 16:08:40',
        ]);
    }
}
