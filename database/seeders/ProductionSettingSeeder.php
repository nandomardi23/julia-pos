<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class ProductionSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            ['group' => 'store', 'key' => 'store_name', 'value' => 'Julia Freshmart'],
            ['group' => 'store', 'key' => 'store_address', 'value' => 'KM.11 Jalan Raya Uban Lama'],
            ['group' => 'store', 'key' => 'store_phone', 'value' => '081234567'],
            ['group' => 'store', 'key' => 'store_email', 'value' => 'julia@example.com'],
            ['group' => 'store', 'key' => 'store_logo', 'value' => 'store_logo.png'],
        ];

        foreach ($settings as $setting) {
            Setting::firstOrCreate(
                ['key' => $setting['key']],
                [
                    'group' => $setting['group'],
                    'value' => $setting['value']
                ]
            );
        }
    }
}
