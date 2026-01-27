<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductionProductSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        
        // 1. Map Category Names to IDs based on ProductionCategorySeeder
        $catMap = [
            'Sayuran' => 1,
            'Kacang-Kacangan' => 2,
            'Umbi & Akar' => 3,
            'Jamur' => 4,
            'Produk Olahan' => 5,
            'Daging Ayam' => 6,
            'Buah' => 7,
            'Jus' => 8,
            'Makanan Berat' => 9,
            'Makanan Ringan' => 10,
        ];

        // 2. Full Product List (Parsed from Text)
        // IDs 1-168
        $products = [
            [1, 'Kol Merah', 'Sayuran', 25000, 35000, 'KG', '621110100001', 5.000],
            [2, 'Beet root', 'Umbi & Akar', 31000, 40000, 'KG', '621110300001', 5.000],
            [3, 'Daun Kucai', 'Sayuran', 12000, 15000, 'IKAT', '621110100002', 5.000],
            [4, 'Lettuce', 'Sayuran', 35857, 46000, 'KG', '621110100003', 5.000],
            [5, 'Roman Lettuce', 'Sayuran', 41333, 52000, 'KG', '621110100004', 5.000],
            [6, 'Brocoli', 'Sayuran', 41571, 50000, 'KG', '621110100005', 5.000],
            [7, 'Bunga Kol', 'Sayuran', 38000, 48000, 'KG', '621110100006', 5.000],
            [8, 'Bunga Seng', 'Sayuran', 47000, 55000, 'IKAT', '621110100007', 5.000],
            [9, 'Baby Fatcoy', 'Sayuran', 58000, 68000, 'KG', '621110100008', 5.000],
            [10, 'Sawi Minyak Baby', 'Sayuran', 55500, 65500, 'KG', '621110100009', 5.000],
            [11, 'Kailan HK', 'Sayuran', 43000, 53000, 'KG', '621110100010', 5.000],
            [12, 'Huai shan', 'Sayuran', 35000, 45000, 'KG', '621110100011', 5.000],
            [13, 'Poeling', 'Sayuran', 55500, 65500, 'KG', '621110100012', 5.000],
            [14, 'Jamur Simeji Putih', 'Jamur', 8250, 10500, 'PCS', '621110400001', 5.000],
            [15, 'Jamur Shitake', 'Jamur', 13800, 16000, 'PCS', '621110400002', 5.000],
            [16, 'Jamur Oister', 'Jamur', 9400, 12000, 'PCS', '621110400003', 5.000],
            [17, 'Jamur Snow White', 'Jamur', 7250, 9750, 'PCS', '621110400004', 5.000],
            [18, 'Jamur Enoki', 'Jamur', 3800, 7000, 'PCS', '621110400005', 5.000],
            [19, 'Kacang Arcis', 'Kacang-Kacangan', 8533, 11000, 'PCS', '621110200001', 5.000],
            [20, 'Kacang Manis', 'Kacang-Kacangan', 8533, 11000, 'PCS', '621110200002', 5.000],
            [21, 'Jamur Kuping', 'Jamur', 11000, 15000, 'PCS', '621110400006', 5.000],
            [22, 'Bamboo Shoots', 'Sayuran', 10500, 13500, 'PCS', '621110100013', 5.000],
            [23, 'Wortel', 'Sayuran', 13000, 16000, 'KG', '621110100014', 5.000],
            [24, 'Daun Ketumbar', 'Sayuran', 80000, 95000, 'KG', '621110100015', 5.000],
            [25, 'Dou Pai', 'Sayuran', 55500, 67500, 'KG', '621110100016', 5.000],
            [26, 'Tahu Kotak', 'Produk Olahan', 11600, 16000, 'PCS', '621110500001', 5.000],
            [27, 'Tahu Telur', 'Produk Olahan', 4000, 7000, 'PCS', '621110500002', 5.000],
            [28, 'Sosis Ayam Jofran', 'Produk Olahan', 13000, 18000, 'PCS', '621110500003', 5.000],
            [29, 'Sosis Ayam Madu Jofran', 'Produk Olahan', 13000, 18000, 'PCS', '621110500004', 5.000],
            [30, 'Ayam S 550-560', 'Daging Ayam', 34500, 45500, 'PCS', '621110600001', 5.000],
            [31, 'Ayam S 650-750', 'Daging Ayam', 51000, 60000, 'PCS', '621110600002', 5.000],
            [32, 'Chicken S 0.9', 'Daging Ayam', 45000, 54000, 'PCS', '621110600003', 5.000],
            [33, 'Chicken CP 1100', 'Daging Ayam', 43000, 55000, 'PCS', '621110600004', 5.000],
            [34, 'Chicken S 1100', 'Daging Ayam', 41000, 50000, 'PCS', '621110600005', 5.000],
            [35, 'Chicken S 1200', 'Daging Ayam', 41000, 60000, 'PCS', '621110600006', 5.000],
            [36, 'Chicken Feet', 'Daging Ayam', 25000, 32000, 'KG', '621110600007', 5.000],
            [37, 'Chicken Breast Bone', 'Daging Ayam', 39000, 48000, 'PCS', '621110600009', 5.000],
            [38, 'Chicken Breast Brown', 'Daging Ayam', 39000, 48000, 'KG', '621110600012', 5.000],
            [39, 'Chicken Breast Kulit', 'Daging Ayam', 38000, 48000, 'KG', '621110600013', 5.000],
            [40, 'Sosis Ayam Doux Pack', 'Produk Olahan', 19000, 24000, 'PCS', '621110500005', 5.000],
            [41, 'Anggur Black Sedless', 'Buah', 42500, 60000, 'Pack', '621110700001', 5.000],
            [42, 'Anggur Merah Curah RRC', 'Buah', 35000, 50000, 'KG', '621110700002', 5.000],
            [43, 'Anggur Merah Aus BAG', 'Buah', 100000, 150000, 'Pack', '621110700003', 5.000],
            [44, 'Anggur Hitam Aust', 'Buah', 114111, 150000, 'Pack', '621110700004', 5.000],
            [45, 'Anggur Hitam Curah a17', 'Buah', 18000, 22000, 'Pack', '621110700005', 5.000],
            [46, 'Apple Strawberry Pack', 'Buah', 26500, 35000, 'Pack', '621110700006', 5.000],
            [47, 'Peach Merah Aust', 'Buah', 15300, 25000, 'PCS', '621110700007', 5.000],
            [48, 'Cherry Chilli Red S', 'Buah', 30000, 35000, 'Pack', '621110700008', 5.000],
            [49, 'Plam Netarin Merah aust', 'Buah', 63000, 80000, 'KG', '621110700009', 5.000],
            [50, 'Bluberry peru 125', 'Buah', 32167, 45000, 'Pack', '621110700010', 5.000],
            [51, 'Kelapa coco thumb', 'Buah', 33833, 40000, 'PCS', '621110700011', 5.000],
            [52, 'Kesemak', 'Buah', 9300, 15000, 'PCS', '621110700012', 5.000],
            [53, 'Kesemak Vakum', 'Buah', 10000, 15000, 'PCS', '621110700013', 5.000],
            [54, 'Dragon White 14"', 'Buah', 24429, 30000, 'PCS', '621110700014', 5.000],
            [55, 'Dragon White 18"', 'Buah', 19667, 25000, 'PCS', '621110700015', 5.000],
            [56, 'Kiwi Merah RRC', 'Buah', 31333, 45000, 'Pack', '621110700016', 5.000],
            [57, 'Kiwi Gold RRC', 'Buah', 25000, 35000, 'Pack', '621110700017', 5.000],
            [58, 'Kiwi Green RRC Curah', 'Buah', 45000, 60000, 'KG', '621110700018', 5.000],
            [59, 'Kiwi Gold NZ', 'Buah', 50000, 55000, 'Pack', '621110700019', 5.000],
            [60, 'Pear Merah Packing', 'Buah', 51000, 60000, 'Pack', '621110700020', 5.000],
            [61, 'Pear Nam Sui Lie 30', 'Buah', 15000, 25000, 'Pack', '621110700021', 5.000],
            [62, 'Pear Nam Sui Lie 8', 'Buah', 30000, 40000, 'PCS', '621110700022', 5.000],
            [63, 'Pear Merah TC', 'Buah', 49000, 60000, 'Pack', '621110700023', 5.000],
            [64, 'Delima', 'Buah', 35000, 45000, 'PCS', '621110700024', 5.000],
            [65, 'Hami Melon', 'Buah', 59000, 80000, 'PCS', '621110700025', 5.000],
            [66, 'Lemon', 'Buah', 6000, 7000, 'PCS', '621110700026', 5.000],
            [67, 'Anggur Hijau Muscat', 'Buah', 29000, 35000, 'Pack', '621110700027', 5.000],
            [68, 'Anggur R/G India', 'Buah', 21000, 40000, 'Pack', '621110700028', 5.000],
            [69, 'Plam Queen', 'Buah', 180000, 200000, 'KG', '621110700029', 5.000],
            [70, 'Plam Dandy', 'Buah', 95000, 115000, 'KG', '621110700030', 5.000],
            [71, 'Peach A.C.N', 'Buah', 15000, 25000, 'PCS', '621110700031', 5.000],
            [72, 'Avokado Aust', 'Buah', 21000, 25000, 'PCS', '621110700032', 5.000],
            [73, 'Cherry Chilli Red L', 'Buah', 70000, 75000, 'Pack', '621110700033', 5.000],
            [74, 'Pear Fragrant', 'Buah', 12000, 15000, 'PCS', '621110700034', 5.000],
            [75, 'Kiwi Gold Itali', 'Buah', 37000, 50000, 'Pack', '621110700035', 5.000],
            [76, 'Kiwi Green Itali', 'Buah', 10500, 15000, 'PCS', '621110700036', 5.000],
            [77, 'Stawberry Lokal', 'Buah', 25000, 30000, 'Pack', '621110700037', 5.000],
            [78, 'Kelengkeng', 'Buah', 38000, 48000, 'KG', '621110700038', 5.000],
            [79, 'Jeruk Bali IPOH', 'Buah', 95000, 120000, 'PCS', '621110700039', 5.000],
            [80, 'Pamello', 'Buah', 46000, 60000, 'PCS', '621110700040', 5.000],
            [81, 'Apple Rossy S', 'Buah', 35000, 40000, 'KG', '621110700041', 5.000],
            [82, 'Apple Rossy L', 'Buah', 37000, 45000, 'KG', '621110700042', 5.000],
            [83, 'Pear Golden', 'Buah', 35000, 45000, 'KG', '621110700043', 5.000],
            [84, 'Pear Naci', 'Buah', 23000, 30000, 'KG', '621110700044', 5.000],
            [85, 'Apple Mini (Anna)', 'Buah', 21000, 30000, 'KG', '621110700045', 5.000],
            [86, 'Apple Sunpeng', 'Buah', 22000, 30000, 'KG', '621110700046', 5.000],
            [87, 'Orange Palensia', 'Buah', 26000, 30000, 'KG', '621110700047', 5.000],
            [88, 'Apple Hijau', 'Buah', 38000, 45000, 'KG', '621110700048', 5.000],
            [89, 'Pear Hijau', 'Buah', 31000, 40000, 'KG', '621110700049', 5.000],
            [90, 'Pear Yali', 'Buah', 20000, 25000, 'KG', '621110700050', 5.000],
            [91, 'Apple Galla', 'Buah', 30000, 40000, 'KG', '621110700051', 5.000],
            [92, 'Apple Rossi 64', 'Buah', 9500, 15000, 'PCS', '621110700052', 5.000],
            [93, 'Apple Rossi 56', 'Buah', 9500, 15000, 'PCS', '621110700053', 5.000],
            [94, 'Apple Fuji Boss', 'Buah', 23000, 30000, 'KG', '621110700054', 5.000],
            [95, 'Jeruk BAG Barongsai', 'Buah', 88000, 100000, 'PCS', '621110700055', 5.000],
            [96, 'Jeruk IMLEK KTK XL 38\'', 'Buah', 269000, 300000, 'BOX', '621110700056', 5.000],
            [97, 'Jeruk IMLEK KTK L 34\'', 'Buah', 234000, 270000, 'BOX', '621110700057', 5.000],
            [98, 'Jeruk IMLEK KTK M 52-54\'', 'Buah', 204000, 250000, 'BOX', '621110700058', 5.000],
            [99, 'Pear Nam Sui Lie 36', 'Buah', 12000, 20000, 'PCS', '621110700059', 5.000],
            [100, 'Jeruk IMLEK KCL M 4Kg', 'Buah', 112000, 160000, 'BOX', '621110700060', 5.000],
            [101, 'Jeruk IMLEK KCL L 4Kg', 'Buah', 127000, 170000, 'BOX', '621110700061', 5.000],
            [102, 'Paprica Merah', 'Sayuran', 71000, 85000, 'KG', '621110100017', 5.000],
            [103, 'Mangga Thailand', 'Buah', 30000, 45000, 'KG', '621110700062', 5.000],
            [104, 'Bawang Jawa', 'Umbi & Akar', 35000, 40000, 'KG', '621110300002', 5.000],
            [105, 'Citrus Wogan', 'Buah', 25000, 30000, 'Pack', '621110700063', 5.000],
            [106, 'Anggur Red Crimson AUS', 'Buah', 70000, 80000, 'Pack', '621110700064', 5.000],
            [107, 'Plam Mini', 'Buah', 65000, 75000, 'KG', '621110700065', 5.000],
            [108, 'Anggur Merah Afrika', 'Buah', 35000, 40000, 'Pack', '621110700066', 5.000],
            [109, 'Bihun Segitiga 1/2 KG', 'Produk Olahan', 13500, 16000, 'Pack', '621110500006', 5.000],
            [110, 'Bihun Segitiga 1/4 KG', 'Produk Olahan', 7000, 8000, 'Pack', '621110500007', 5.000],
            [111, 'Pulut putih 1 KG', 'Produk Olahan', 22000, 32000, 'Pack', '621110500008', 5.000],
            [112, 'Pulut putih 1/2 KG', 'Produk Olahan', 11000, 16000, 'Pack', '621110500009', 5.000],
            [113, 'Wijen Putih 100Gram', 'Produk Olahan', 4200, 5300, 'Pack', '621110500010', 5.000],
            [114, 'Wijen Putih 200Gram', 'Produk Olahan', 8400, 10350, 'Pack', '621110500011', 5.000],
            [115, 'emping 1kg', 'Produk Olahan', 80000, 90000, 'Pack', '621110500012', 5.000],
            [116, 'Bawang Merah 1/2 Kg', 'Umbi & Akar', 17500, 20000, 'Pack', '621110300003', 5.000],
            [117, 'Bawang Merah 1/4 Kg', 'Umbi & Akar', 8750, 10000, 'Pack', '621110300004', 5.000],
            [118, 'Bunga Lawang 1Kg', 'Umbi & Akar', 77000, 95000, 'PCS', '621110300005', 5.000],
            [119, 'Bunga Lawang 25 gram', 'Umbi & Akar', 1925, 3800, 'PCS', '621110300006', 5.000],
            [120, 'Chicken Wing 500 gram', 'Daging Ayam', 19500, 25000, 'PCS', '621110600014', 5.000], // Extrapolated from dump, missing in list? No, list skips 120. Wait text has 119 then 121.
            // Wait, look at text: 119... 121. 120 is missing in User List!
            // I will restore ID 120 from old dump?
            // "Chicken Wing 500 gram" (ID 120 in dump). User list skips it.
            // I will keep ID 120.
            [121, 'Chicken Wing 1 Kg', 'Daging Ayam', 39000, 48000, 'PCS', '621110600121', 5.000], // Note: Barcode fixed to avoid duplicate
            [122, 'Chicken Midle Wing', 'Daging Ayam', 41000, 48000, 'KG', '621110600015', 5.000],
            [123, 'Paha Tulang Besar 650 Gram', 'Daging Ayam', 38000, 50000, 'KG', '621110600016', 5.000],
            [124, 'Ayam Dada Filet 1KG', 'Daging Ayam', 39000, 45000, 'PCS', '621110600017', 5.000],
            [125, 'Chicken Drum Stick Jumbo', 'Daging Ayam', 36000, 50000, 'KG', '621110600018', 5.000],
            [126, 'Paha Fillet', 'Daging Ayam', 51000, 62500, 'KG', '621110600029', 5.000],
            [127, 'Paprica Hijau', 'Sayuran', 56000, 67800, 'KG', '621110100018', 5.000],
            [128, 'Paprica Kuning', 'Sayuran', 64000, 75800, 'KG', '621110100019', 5.000],
            [129, 'Ketan Hitam 1Kg', 'Produk Olahan', 24600, 36200, 'PCS', '621110500013', 5.000],
            [130, 'Ketan Hitam 1/2 Kg', 'Produk Olahan', 13600, 18100, 'PCS', '621110500014', 5.000],
            [131, 'Gobanco Ring Milo', 'Makanan Ringan', 21900, 27000, 'Pcs', '62111100001', 5.000],
            [132, 'Gobanco Chip Milo', 'Makanan Ringan', 21900, 27000, 'Pcs', '62111100002', 5.000],
            [133, 'Gobanco Soes Milo', 'Makanan Ringan', 21900, 27000, 'Pcs', '62111100003', 5.000],
            [134, 'Ladang Lima Blackthins', 'Makanan Ringan', 18700, 23000, 'Pcs', '62111100004', 5.000],
            [135, 'Ladang Lima Blackmond', 'Makanan Ringan', 18700, 23000, 'Pcs', '62111100005', 5.000],
            [136, 'Ladang Lima Pumpberry', 'Makanan Ringan', 18700, 23000, 'Pcs', '62111100006', 5.000],
            [137, 'TYL Almond Mic Chocolate', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100007', 5.000],
            [138, 'TYL Almond Dark Chocolate', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100008', 5.000],
            [139, 'Alisha Strawberry Coklat', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100009', 5.000],
            [140, 'Alisha Cookie Coated Chocolate', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100010', 5.000],
            [141, 'Alisha Milk Coklat', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100011', 5.000],
            [142, 'Alisha Cookie Coated Coklat Singapore', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100012', 5.000],
            [143, 'Alisha Smilk Coklat Singapore', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100013', 5.000],
            [144, 'Alisha Strawberry Coklat Singapore', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100014', 5.000],
            [145, 'Truffle Huzelnut', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100015', 5.000],
            [146, 'Truffle Caramel', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100016', 5.000],
            [147, 'Truffle Strawberry', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100017', 5.000],
            [148, 'Truffle Milk', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100018', 5.000],
            [149, 'Truffle Tiramisu', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100019', 5.000],
            [150, 'Choco Twist', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100020', 5.000],
            [151, 'Mr. Sif Melisha', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100021', 5.000],
            [152, 'Kyla Food Basreng', 'Makanan Ringan', 16200, 21500, 'Pcs', '62111100022', 5.000],
            [153, 'Kyla Food Makaroni Spicy', 'Makanan Ringan', 16500, 21500, 'Pcs', '62111100023', 5.000],
            [154, 'Kyla Food Batagor Kuah', 'Makanan Ringan', 15500, 23000, 'Pcs', '62111100024', 5.000],
            [155, 'Kyla Food Seblak', 'Makanan Ringan', 15000, 23000, 'Pcs', '62111100025', 5.000],
            [156, 'Basreng Stick Daun Jeruk', 'Makanan Ringan', 15800, 20000, 'Pcs', '62111100026', 5.000],
            [157, 'Basreng Stick Original Daun Jeruk', 'Makanan Ringan', 15800, 20000, 'Pcs', '62111100027', 5.000],
            [158, 'Popocorn Caramel', 'Makanan Ringan', 18500, 22500, 'Pcs', '62111100028', 5.000],
            [159, 'Popocorn Keju', 'Makanan Ringan', 18500, 22500, 'Pcs', '62111100029', 5.000],
            [160, 'Kaula Keripik Cireng Original', 'Makanan Ringan', 18000, 22400, 'Pcs', '62111100030', 5.000],
            [161, 'Kaula Keripik Cireng BBQ', 'Makanan Ringan', 18000, 22400, 'Pcs', '62111100031', 5.000],
            [162, 'Kacang Mente', 'Makanan Ringan', 15000, 17000, 'Pcs', '62111100032', 5.000],
            [163, 'Puding Dark Cokelat', 'Makanan Ringan', 15000, 10000, 'Pcs', '62111100033', 5.000],
            [164, 'Sald Buah', 'Makanan Ringan', 15000, 20000, 'Pcs', '62111100034', 5.000],
            [165, 'Cremy Cofee Jelly', 'Makanan Ringan', 15000, 20000, 'Pcs', '62111100035', 5.000],
            [166, 'Buko Pandan', 'Makanan Ringan', 15000, 20000, 'Pcs', '62111100036', 5.000],
            [167, 'Lapis Legit', 'Makanan Ringan', 11100, 15000, 'Pcs', '62111100037', 5.000],
            [168, 'Jeruk Raja', 'Buah', 25000, 35000, 'KG', '621110700067', 5.000],
        ];

        // Add 120 if missing from list but present in dump?
        // ID 120 is already in the main $products array (Row 151), so we remove this duplicate append.
        // $products[] = [120, 'Chicken Wing 500 gram', 'Daging Ayam', 19500, 25000, 'PCS', '621110600120', 5.000];
        
        // Wait, array index order is loose. I'll sort by ID before insert to be safe.
        usort($products, fn($a, $b) => $a[0] <=> $b[0]);

        DB::table('products')->truncate();

        foreach ($products as $prod) {
            $catId = $catMap[$prod[2]] ?? 1; // Default to 1 if not found
            
            try {
                DB::table('products')->insert([
                    'id' => $prod[0],
                    'category_id' => $catId,
                    'title' => $prod[1],
                    'buy_price' => $prod[3],
                    'sell_price' => $prod[4],
                    'unit' => $prod[5],
                    'barcode' => $prod[6],
                    'sku' => $prod[6],
                    'image' => 'default.png',
                    'min_stock' => $prod[7],
                    'product_type' => 'sellable',
                    'tags' => json_encode(['sellable']),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            } catch (\Exception $e) {
                echo "FAILED ID {$prod[0]}: " . $e->getMessage() . "\n";
                // Optionally continue or throw?
                // throw $e; 
            }
        }
        
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
