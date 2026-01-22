<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            // Store settings
            ['group' => 'store', 'key' => 'store_name', 'value' => 'Toko Saya'],
            ['group' => 'store', 'key' => 'store_address', 'value' => 'Jl. Contoh No. 123'],
            ['group' => 'store', 'key' => 'store_phone', 'value' => '08123456789'],
            ['group' => 'store', 'key' => 'store_email', 'value' => 'toko@example.com'],
            ['group' => 'store', 'key' => 'store_logo', 'value' => null],
            
            // Print settings
            ['group' => 'print', 'key' => 'websocket_url', 'value' => 'ws://localhost:9100'],
            ['group' => 'print', 'key' => 'printer_name', 'value' => 'POS-80'],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
