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

            // Receipt settings
            ['group' => 'receipt', 'key' => 'receipt_header', 'value' => 'Selamat Berbelanja!'],
            ['group' => 'receipt', 'key' => 'receipt_footer', 'value' => 'Terima kasih atas kunjungan Anda.'],
            ['group' => 'receipt', 'key' => 'receipt_show_logo', 'value' => '1'],

            // Sales settings
            ['group' => 'sales', 'key' => 'default_payment_method', 'value' => 'cash'],
            ['group' => 'sales', 'key' => 'low_stock_threshold', 'value' => '10'],
            ['group' => 'sales', 'key' => 'allow_negative_stock', 'value' => '0'],

            // Display settings
            ['group' => 'display', 'key' => 'default_theme', 'value' => 'system'],
            ['group' => 'display', 'key' => 'products_per_page', 'value' => '12'],

            // Notification settings
            ['group' => 'notification', 'key' => 'notify_low_stock', 'value' => '1'],
            ['group' => 'notification', 'key' => 'notification_email', 'value' => ''],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
