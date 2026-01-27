<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductionTransactionSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('transactions')->truncate();

        $transactions = [
            [1, 3, 1, 'TRX-96MR4T7TV2', 10000, 0, 0, 0.00, 0, 10000, 'cash', 'paid', NULL, NULL, '2026-01-26 10:41:01', '2026-01-26 10:41:01'],
            [2, 3, 1, 'TRX-55D86I9FO5', 5400, 0, 0, 0.00, 0, 5400, 'qris', 'pending', NULL, NULL, '2026-01-26 10:43:38', '2026-01-26 10:43:38'],
            [3, 3, 1, 'TRX-3181107I1M', 5400, 0, 0, 0.00, 0, 5400, 'qris', 'pending', NULL, NULL, '2026-01-26 10:45:10', '2026-01-26 10:45:10'],
            [4, 3, 1, 'TRX-H72349TXP7', 58800, 0, 0, 0.00, 0, 58800, 'cash', 'paid', NULL, NULL, '2026-01-26 11:08:20', '2026-01-26 11:08:20'],
            [5, 3, 1, 'TRX-P7MHU8S296', 58800, 0, 0, 0.00, 0, 58800, 'cash', 'paid', NULL, NULL, '2026-01-26 11:09:15', '2026-01-26 11:09:15'],
            [6, 3, 1, 'TRX-1JH9MB2SN2', 5400, 0, 0, 0.00, 0, 5400, 'qris', 'pending', NULL, NULL, '2026-01-26 11:09:51', '2026-01-26 11:09:51'],
            [7, 3, 1, 'TRX-3D2K9U05U4', 42200, 0, 0, 0.00, 0, 42200, 'qris', 'pending', NULL, NULL, '2026-01-26 13:05:52', '2026-01-26 13:05:52'],
            [8, 3, 1, 'TRX-0ZU0670WAY', 50825, 0, 0, 0.00, 0, 50825, 'qris', 'pending', NULL, NULL, '2026-01-26 13:33:36', '2026-01-26 13:33:36'],
            [9, 3, 1, 'TRX-Q4VSR3XLQ4', 36000, 0, 0, 0.00, 0, 36000, 'cash', 'paid', NULL, NULL, '2026-01-26 14:38:48', '2026-01-26 14:38:48'],
            [10, 3, 1, 'TRX-91CUPIY4YA', 18720, 0, 0, 0.00, 0, 18720, 'cash', 'paid', NULL, NULL, '2026-01-26 14:50:40', '2026-01-26 14:50:40'],
            [11, 3, 1, 'TRX-433876ZXHT', 52024, 5574, 0, 0.00, 0, 46450, 'cash', 'paid', NULL, NULL, '2026-01-26 15:12:45', '2026-01-26 15:12:45'],
            [12, 3, 1, 'TRX-0I04BZH5RV', 50000, 3550, 0, 0.00, 0, 46450, 'cash', 'paid', NULL, NULL, '2026-01-26 15:14:44', '2026-01-26 15:14:44'],
            [13, 3, 1, 'TRX-P0EZSGPX2P', 20000, 0, 0, 0.00, 0, 20000, 'cash', 'paid', NULL, NULL, '2026-01-26 15:30:49', '2026-01-26 15:30:49'],
            [16, 3, 1, 'TRX-50Y4LE9M3B', 15000, 1000, 0, 0.00, 0, 14000, 'cash', 'paid', NULL, NULL, '2026-01-26 15:57:28', '2026-01-26 15:57:28'],
            [18, 6, 2, 'TRX-OL71H5FR33', 100000, 56600, 0, 0.00, 0, 43400, 'cash', 'paid', NULL, NULL, '2026-01-26 16:43:27', '2026-01-26 16:43:27'],
            [19, 6, 2, 'TRX-IKB782J9S3', 92850, 0, 0, 0.00, 0, 92850, 'qris', 'pending', NULL, NULL, '2026-01-26 16:55:57', '2026-01-26 16:55:57'],
            [20, 6, 2, 'TRX-AM4RLY418I', 80000, 0, 0, 0.00, 0, 80000, 'qris', 'pending', NULL, NULL, '2026-01-26 17:19:22', '2026-01-26 17:19:22'],
            [21, 6, 2, 'TRX-65G4H88691', 50000, 5000, 0, 0.00, 0, 45000, 'cash', 'paid', NULL, NULL, '2026-01-26 17:29:23', '2026-01-26 17:29:23'],
            [22, 6, 2, 'TRX-1V16015545', 50000, 15000, 0, 0.00, 0, 35000, 'cash', 'paid', NULL, NULL, '2026-01-26 17:44:04', '2026-01-26 17:44:04'],
            [23, 6, 2, 'TRX-6203XX5KC3', 100000, 27680, 0, 0.00, 0, 72320, 'cash', 'paid', NULL, NULL, '2026-01-26 18:16:34', '2026-01-26 18:16:34'],
            [24, 6, 2, 'TRX-6EIQ7W7600', 152850, 0, 0, 0.00, 0, 152850, 'qris', 'pending', NULL, NULL, '2026-01-26 20:09:40', '2026-01-26 20:09:40'],
            [25, 6, 2, 'TRX-EF71R08103', 45000, 0, 0, 0.00, 0, 45000, 'qris', 'pending', NULL, NULL, '2026-01-26 20:33:01', '2026-01-26 20:33:01'],
            [26, 6, 2, 'TRX-QSS44YX02U', 77000, 0, 0, 0.00, 0, 77000, 'cash', 'paid', NULL, NULL, '2026-01-26 20:50:43', '2026-01-26 20:50:43'],
            [27, 6, 2, 'TRX-05Q30134TK', 43000, 250, 0, 0.00, 0, 42750, 'cash', 'paid', NULL, NULL, '2026-01-26 20:52:25', '2026-01-26 20:52:25'],
            [28, 6, 2, 'TRX-Q0NP2695GB', 26000, 800, 0, 0.00, 0, 25200, 'cash', 'paid', NULL, NULL, '2026-01-26 20:53:04', '2026-01-26 20:53:04'],
            [29, 6, 2, 'TRX-3L4UI7DPP0', 100000, 25000, 0, 0.00, 0, 75000, 'cash', 'paid', NULL, NULL, '2026-01-26 21:46:33', '2026-01-26 21:46:33'],
            [30, 6, 2, 'TRX-LTGIO741Z8', 50000, 9900, 0, 0.00, 0, 40100, 'cash', 'paid', NULL, NULL, '2026-01-26 22:22:07', '2026-01-26 22:22:07'],
        ];

        foreach ($transactions as $txn) {
            DB::table('transactions')->insert([
                'id' => $txn[0],
                'cashier_id' => $txn[1],
                'shift_id' => $txn[2],
                'invoice' => $txn[3],
                'cash' => $txn[4],
                'change' => $txn[5],
                'discount' => $txn[6],
                // 'ppn' => $txn[7], // Not in original schema likely, check migration if error
                // 'tax' => $txn[8],
                'grand_total' => $txn[9],
                'payment_method' => $txn[10],
                'payment_status' => $txn[11],
                'payment_reference' => $txn[12],
                'payment_url' => $txn[13],
                'created_at' => $txn[14],
                'updated_at' => $txn[15],
            ]);
        }
        
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
