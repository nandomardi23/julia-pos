<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RealUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'id' => 1,
                'name' => 'Administrator',
                'email' => 'admin@admin.com',
                'password' => '$2y$12$zqGqfNO38VIgX//Vi.6wp.RS1BFK7u1bv3SzslIw.RaSKLAE7qIe6',
                'role' => 'super-admin'
            ],
            [
                'id' => 2,
                'name' => 'Nando',
                'email' => 'fernando@example.com',
                'password' => '$2y$12$srRDcRhyvoiaOrxbd/jSAOWNxTz8iNKjN4SdRl5gGZe0wUBMew/ZO',
                'role' => 'cashier'
            ],
            [
                'id' => 3,
                'name' => 'suci ramadantia',
                'email' => 'suciramadantia2@gmail.com',
                'password' => '$2y$12$IQv7/GRfcnQVHxa6HJL7EuwLIrdO3ToS/MP/6gjRQLkcVYT9qiB32',
                'role' => 'cashier'
            ],
            [
                'id' => 4,
                'name' => 'anggie',
                'email' => 'anggidwii578652@gmail.com',
                'password' => '$2y$12$4.J49fdYN9FtbmLbLrdEnu.0Dh9ei83rKNhoh56tuCUA1giZsspQ6',
                'role' => 'cashier'
            ],
            [
                'id' => 5,
                'name' => 'tiara',
                'email' => 'tiarakasih518@gmail.com',
                'password' => '$2y$12$dlVALmBq1e.ZdjXS/uZER.T.PyPcWaRbctMTnmyhXNrjD3.X6Oiju',
                'role' => 'warehouse'
            ],
            [
                'id' => 6,
                'name' => 'SILFY DESTIANTI',
                'email' => 'Silfydestiantif@gmail.com',
                'password' => '$2y$12$eNnpfResy1iaRl2IRuTlLO2anqjXtSppbfeN1490tX68jwGFpUalO',
                'role' => 'admin'
            ],
        ];

        foreach ($users as $userData) {
            $roleName = $userData['role'];
            unset($userData['role']);

            $user = User::updateOrCreate(
                ['id' => $userData['id']],
                $userData
            );

            // Assign role if it exists
            $role = Role::where('name', $roleName)->first();
            if ($role) {
                $user->assignRole($role);
            }
        }
    }
}
