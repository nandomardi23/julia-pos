<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class ProductionUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Administrator (Super-Admin) - ID 1
        $admin = User::firstOrCreate(
            ['id' => 1],
            [
                'name' => 'Administrator',
                'email' => 'admin@admin.com',
                'password' => '$2y$12$zqGqfNO38VIgX//Vi.6wp.RS1BFK7u1bv3SzslIw.RaSKLAE7qIe6',
                'email_verified_at' => null,
            ]
        );
        $admin->assignRole('super-admin');

        // 2. Nando (Cashier) - ID 2
        $nando = User::firstOrCreate(
            ['id' => 2],
            [
                'name' => 'Nando',
                'email' => 'fernando@example.com',
                'password' => '$2y$12$srRDcRhyvoiaOrxbd/jSAOWNxTz8iNKjN4SdRl5gGZe0wUBMew/ZO',
                'email_verified_at' => null,
            ]
        );
        $nando->assignRole('cashier');

        // 3. Suci Ramadantia (Cashier) - ID 3
        $suci = User::firstOrCreate(
            ['id' => 3],
            [
                'name' => 'suci ramadantia',
                'email' => 'suciramadantia2@gmail.com',
                'password' => '$2y$12$IQv7/GRfcnQVHxa6HJL7EuwLIrdO3ToS/MP/6gjRQLkcVYT9qiB32',
                'email_verified_at' => null,
            ]
        );
        $suci->assignRole('cashier');

        // 4. Anggie (Cashier) - ID 4
        $anggie = User::firstOrCreate(
            ['id' => 4],
            [
                'name' => 'anggie',
                'email' => 'anggidwii578652@gmail.com', // dump email (without double i?) Dump says anggidwii... wait dump: anggidwii578652@gmail.com
                'password' => '$2y$12$4.J49fdYN9FtbmLbLrdEnu.0Dh9ei83rKNhoh56tuCUA1giZsspQ6',
                'email_verified_at' => null,
            ]
        );
        $anggie->assignRole('cashier');

        // 5. Tiara (Warehouse) - ID 5
        $tiara = User::firstOrCreate(
            ['id' => 5],
            [
                'name' => 'tiara',
                'email' => 'tiarakasih518@gmail.com',
                'password' => '$2y$12$dlVALmBq1e.ZdjXS/uZER.T.PyPcWaRbctMTnmyhXNrjD3.X6Oiju',
                'email_verified_at' => null,
            ]
        );
        $tiara->assignRole('warehouse');

        // 6. SILFY DESTIANTI (Admin) - ID 6
        $silfy = User::firstOrCreate(
            ['id' => 6],
            [
                'name' => 'SILFY DESTIANTI',
                'email' => 'Silfydestiantif@gmail.com', // Dump email has 'f' at end of name
                'password' => '$2y$12$eNnpfResy1iaRl2IRuTlLO2anqjXtSppbfeN1490tX68jwGFpUalO',
                'email_verified_at' => null,
            ]
        );
        $silfy->assignRole('admin');
    }
}
