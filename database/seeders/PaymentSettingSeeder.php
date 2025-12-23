<?php

namespace Database\Seeders;

use App\Models\PaymentSetting;
use Illuminate\Database\Seeder;

class PaymentSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            ['key' => 'default_gateway', 'value' => 'cash', 'type' => 'string', 'description' => 'Default payment gateway'],
            ['key' => 'midtrans_enabled', 'value' => '0', 'type' => 'boolean', 'description' => 'Enable Midtrans payment'],
            ['key' => 'midtrans_server_key', 'value' => '', 'type' => 'string', 'description' => 'Midtrans Server Key'],
            ['key' => 'midtrans_client_key', 'value' => '', 'type' => 'string', 'description' => 'Midtrans Client Key'],
            ['key' => 'midtrans_is_production', 'value' => '0', 'type' => 'boolean', 'description' => 'Midtrans Production Mode'],
        ];

        foreach ($settings as $setting) {
            PaymentSetting::firstOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
