<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Product;
use App\Models\Category;
use App\Models\Display;
use App\Models\DisplayStock;
use App\Models\StockMovement;
use Illuminate\Support\Str;

class ImportRealProductsSeeder extends Seeder
{
    public function run()
    {
        $products = [
            ['Kol Merah', 'Sayuran', 25000, 35000, 'KG', '621110100001', 10],
            ['Beet root', 'Umbi & Akar', 31000, 40000, 'KG', '621110300001', 10],
            ['Daun Kucai', 'Sayuran', 12000, 15000, 'IKAT', '621110100002', 35],
            ['Lettuce', 'Sayuran', 35857, 46000, 'KG', '621110100003', 6],
            ['Roman Lettuce', 'Sayuran', 41333, 52000, 'KG', '621110100004', 3],
            ['Brocoli', 'Sayuran', 41571, 50000, 'KG', '621110100005', 11.4],
            ['Bunga Kol', 'Sayuran', 38000, 48000, 'KG', '621110100006', 24],
            ['Bunga Seng', 'Sayuran', 47000, 55000, 'IKAT', '621110100007', 10],
            ['Baby Fatcoy', 'Sayuran', 58000, 68000, 'KG', '621110100008', 2.6],
            ['Sawi Minyak Baby', 'Sayuran', 55500, 65500, 'KG', '621110100009', 1.8],
            ['Kailan HK', 'Sayuran', 43000, 53000, 'KG', '621110100010', 4.6],
            ['Huai shan', 'Sayuran', 35000, 45000, 'KG', '621110100011', 3.6],
            ['Poeling', 'Sayuran', 55500, 65500, 'KG', '621110100012', 2.1],
            ['Jamur Simeji Putih', 'Jamur', 8250, 10500, 'PCS', '621110400001', 40],
            ['Jamur Shitake', 'Jamur', 13800, 16000, 'PCS', '621110400002', 24],
            ['Jamur Oister', 'Jamur', 9400, 12000, 'PCS', '621110400003', 30],
            ['Jamur Snow White', 'Jamur', 7250, 9750, 'PCS', '621110400004', 42],
            ['Jamur Enoki', 'Jamur', 3800, 7000, 'PCS', '621110400005', 32],
            ['Kacang Arcis', 'Kacang-Kacangan', 8533.33, 11000, 'PCS', '621110200001', 25],
            ['Kacang Manis', 'Kacang-Kacangan', 8533.33, 11000, 'PCS', '621110200002', 27],
            ['Jamur Kuping', 'Jamur', 11000, 15000, 'PCS', '621110400006', 23],
            ['Bamboo Shoots', 'Sayuran', 10500, 13500, 'PCS', '621110100013', 38],
            ['Wortel', 'Sayuran', 13000, 16000, 'KG', '621110100014', 97],
            ['Daun Ketumbar', 'Sayuran', 80000, 95000, 'KG', '621110100015', 3],
            ['Dou Pai', 'Sayuran', 55500, 67500, 'KG', '621110100016', 2.8],
            ['Tahu Kotak', 'Produk Olahan', 11600, 16000, 'PCS', '621110500001', 99],
            ['Tahu Telur', 'Produk Olahan', 4000, 7000, 'PCS', '621110500002', 178],
            ['Sosis Ayam Jofran', 'Produk Olahan', 13000, 18000, 'PCS', '621110500003', 164],
            ['Sosis Ayam Madu Jofran', 'Produk Olahan', 13000, 18000, 'PCS', '621110500004', 154],
            ['Ayam S 550-560', 'Daging Ayam', 34500, 45500, 'PCS', '621110600001', 45],
            ['Ayam S 650-750', 'Daging Ayam', 51000, 60000, 'PCS', '621110600002', 30],
            ['Chicken S 0.9', 'Daging Ayam', 45000, 54000, 'PCS', '621110600003', 30],
            ['Chicken CP 1100', 'Daging Ayam', 43000, 55000, 'PCS', '621110600004', 20],
            ['Chicken S 1100', 'Daging Ayam', 41000, 50000, 'PCS', '621110600005', 19],
            ['Chicken S 1200', 'Daging Ayam', 41000, 60000, 'PCS', '621110600006', 20],
            ['Chicken Feet', 'Daging Ayam', 25000, 32000, 'KG', '621110600007', 26],
            ['Chicken Breast Bone', 'Daging Ayam', 39000, 48000, 'PCS', '621110600009', 10],
            ['Chicken Breast Brown', 'Daging Ayam', 39000, 48000, 'KG', '621110600012', 10],
            ['Chicken Breast Kulit', 'Daging Ayam', 38000, 48000, 'KG', '621110600013', 7.2],
            ['Sosis Ayam Doux Pack', 'Produk Olahan', 19000, 24000, 'PCS', '621110500005', 108],
            ['Anggur Black Sedless', 'Buah', 42500, 60000, 'Pack', '621110700001', 10],
            ['Anggur Merah Curah RRC', 'Buah', 35000, 50000, 'KG', '621110700002', 38.6],
            ['Anggur Merah Aus BAG', 'Buah', 100000, 150000, 'Pack', '621110700003', 8],
            ['Anggur Hitam Aust', 'Buah', 114111, 150000, 'Pack', '621110700004', 4],
            ['Anggur Hitam Curah a17', 'Buah', 18000, 22000, 'Pack', '621110700005', 13],
            ['Apple Strawberry Pack', 'Buah', 26500, 35000, 'Pack', '621110700006', 7],
            ['Peach Merah Aust', 'Buah', 15300, 25000, 'PCS', '621110700007', 22],
            ['Cherry Chilli Red S', 'Buah', 30000, 35000, 'Pack', '621110700008', 24],
            ['Plam Netarin Merah aust', 'Buah', 63000, 80000, 'KG', '621110700009', 10],
            ['Bluberry peru 125', 'Buah', 32167, 45000, 'Pack', '621110700010', 12],
            ['Kelapa coco thumb', 'Buah', 33833, 40000, 'PCS', '621110700011', 10],
            ['Kesemak', 'Buah', 9300, 15000, 'PCS', '621110700012', 32],
            ['Kesemak Vakum', 'Buah', 10000, 15000, 'PCS', '621110700013', 29],
            ['Dragon White 14"', 'Buah', 24429, 30000, 'PCS', '621110700014', 14],
            ['Dragon White 18"', 'Buah', 19667, 25000, 'PCS', '621110700015', 18],
            ['Kiwi Merah RRC', 'Buah', 31333, 45000, 'Pack', '621110700016', 12],
            ['Kiwi Gold RRC', 'Buah', 25000, 35000, 'Pack', '621110700017', 20],
            ['Kiwi Green RRC Curah', 'Buah', 45000, 60000, 'KG', '621110700018', 8],
            ['Kiwi Gold NZ', 'Buah', 50000, 55000, 'Pack', '621110700019', 11],
            ['Pear Merah Packing', 'Buah', 51000, 60000, 'Pack', '621110700020', 20],
            ['Pear Nam Sui Lie 30', 'Buah', 15000, 25000, 'Pack', '621110700021', 30],
            ['Pear Nam Sui Lie 8', 'Buah', 30000, 40000, 'PCS', '621110700022', 8],
            ['Pear Merah TC', 'Buah', 49000, 60000, 'Pack', '621110700023', 12.8],
            ['Delima', 'Buah', 35000, 45000, 'PCS', '621110700024', 19],
            ['Hami Melon', 'Buah', 59000, 80000, 'PCS', '621110700025', 24],
            ['Lemon', 'Buah', 6000, 7000, 'PCS', '621110700026', 75],
            ['Anggur Hijau Muscat', 'Buah', 29000, 35000, 'Pack', '621110700027', 64],
            ['Anggur R/G India', 'Buah', 21000, 40000, 'Pack', '621110700028', 3],
            ['Plam Queen', 'Buah', 180000, 200000, 'KG', '621110700029', 4.8],
            ['Plam Dandy', 'Buah', 95000, 115000, 'KG', '621110700030', 9.2],
            ['Peach A.C.N', 'Buah', 15000, 25000, 'PCS', '621110700031', 24],
            ['Avokado Aust', 'Buah', 21000, 25000, 'PCS', '621110700032', 54],
            ['Cherry Chilli Red L', 'Buah', 70000, 75000, 'Pack', '621110700033', 14],
            ['Pear Fragrant', 'Buah', 12000, 15000, 'PCS', '621110700034', 63],
            ['Kiwi Gold Itali', 'Buah', 37000, 50000, 'Pack', '621110700035', 20],
            ['Kiwi Green Itali', 'Buah', 10500, 15000, 'PCS', '621110700036', 78],
            ['Stawberry Lokal', 'Buah', 25000, 30000, 'Pack', '621110700037', 13],
            ['Kelengkeng', 'Buah', 38000, 48000, 'KG', '621110700038', 22],
            ['Jeruk Bali IPOH', 'Buah', 95000, 120000, 'PCS', '621110700039', 21.8],
            ['Pamello', 'Buah', 46000, 60000, 'PCS', '621110700040', 4],
            ['Apple Rossy S', 'Buah', 35000, 40000, 'KG', '621110700041', 134],
            ['Apple Rossy L', 'Buah', 37000, 45000, 'KG', '621110700042', 44],
            ['Pear Golden', 'Buah', 35000, 45000, 'KG', '621110700043', 13],
            ['Pear Naci', 'Buah', 23000, 30000, 'KG', '621110700044', 117.5],
            ['Apple Mini (Anna)', 'Buah', 21000, 30000, 'KG', '621110700045', 17],
            ['Apple Sunpeng', 'Buah', 22000, 30000, 'KG', '621110700046', 14.6],
            ['Orange Palensia', 'Buah', 26000, 30000, 'KG', '621110700047', 17.4],
            ['Apple Hijau', 'Buah', 38000, 45000, 'KG', '621110700048', 45.3],
            ['Pear Hijau', 'Buah', 31000, 40000, 'KG', '621110700049', 9.6],
            ['Pear Yali', 'Buah', 20000, 25000, 'KG', '621110700050', 68],
            ['Apple Galla', 'Buah', 30000, 40000, 'KG', '621110700051', 7],
            ['Apple Rossi 64', 'Buah', 9500, 15000, 'PCS', '621110700052', 128],
            ['Apple Rossi 56', 'Buah', 9500, 15000, 'PCS', '621110700053', 112],
            ['Apple Fuji Boss', 'Buah', 23000, 30000, 'KG', '621110700054', 34],
            ['Jeruk BAG Barongsai', 'Buah', 88000, 100000, 'PCS', '621110700055', 20],
            ['Jeruk IMLEK KTK XL 38\'', 'Buah', 269000, 300000, 'BOX', '621110700056', 5],
            ['Jeruk IMLEK KTK L 34\'', 'Buah', 234000, 270000, 'BOX', '621110700057', 5],
            ['Jeruk IMLEK KTK M 52-54\'', 'Buah', 204000, 250000, 'BOX', '621110700058', 5],
            ['Pear Nam Sui Lie 36', 'Buah', 12000, 20000, 'PCS', '621110700059', 36],
            ['Jeruk IMLEK KCL M 4Kg', 'Buah', 112000, 160000, 'BOX', '621110700060', 5],
            ['Jeruk IMLEK KCL L 4Kg', 'Buah', 127000, 170000, 'BOX', '621110700061', 5],
            ['Paprica Merah', 'Sayuran', 71000, 85000, 'KG', '621110100017', 10],
            ['Mangga Thailand', 'Buah', 30000, 45000, 'KG', '621110700062', 16],
            ['Bawang Jawa', 'Umbi & Akar', 35000, 40000, 'KG', '621110300002', 50],
            ['Citrus Wogan', 'Buah', 25000, 30000, 'Pack', '621110700063', 4],
            ['Anggur Red Crimson AUS', 'Buah', 70000, 80000, 'Pack', '621110700064', 17],
            ['Plam Mini', 'Buah', 65000, 75000, 'KG', '621110700065', 6.5],
            ['Anggur Merah Afrika', 'Buah', 35000, 40000, 'Pack', '621110700066', 2],
            ['Bihun Segitiga 1/2 KG', 'Produk Olahan', 13500, 16000, 'Pack', '621110500006', 6],
            ['Bihun Segitiga 1/4 KG', 'Produk Olahan', 7000, 8000, 'Pack', '621110500007', 5],
            ['Pulut putih 1 KG', 'Produk Olahan', 22000, 32000, 'Pack', '621110500008', 21],
            ['Pulut putih 1/2 KG', 'Produk Olahan', 11000, 16000, 'Pack', '621110500009', 9],
            ['Wijen Putih 100Gram', 'Produk Olahan', 4200, 5300, 'Pack', '621110500010', 34],
            ['Wijen Putih 200Gram', 'Produk Olahan', 8400, 10350, 'Pack', '621110500011', 34],
            ['emping 1kg', 'Produk Olahan', 80000, 90000, 'Pack', '621110500012', 12],
            ['Bawang Merah 1/2 Kg', 'Umbi & Akar', 17500, 20000, 'Pack', '621110300003', 9],
            ['Bawang Merah 1/4 Kg', 'Umbi & Akar', 8750, 10000, 'Pack', '621110300004', 15],
            ['Bunga Lawang 1Kg', 'Umbi & Akar', 77000, 95000, 'PCS', '621110300005', 9],
            ['Bunga Lawang 25 gram', 'Umbi & Akar', 1925, 3800, 'PCS', '621110300006', 40],
            ['Chicken Wing 1 Kg', 'Daging Ayam', 39000, 48000, 'PCS', '621110600014', 2],
            ['Chicken Midle Wing', 'Daging Ayam', 41000, 48000, 'KG', '621110600015', 18],
            ['Paha Tulang Besar 650 Gram', 'Daging Ayam', 38000, 50000, 'KG', '621110600016', 10],
            ['Ayam Dada Filet 1KG', 'Daging Ayam', 39000, 45000, 'PCS', '621110600017', 65],
            ['Chicken Drum Stick Jumbo', 'Daging Ayam', 36000, 50000, 'KG', '621110600018', 10],
            ['Paha Fillet', 'Daging Ayam', 51000, 62500, 'KG', '621110600029', 12],
            ['Paprica Hijau', 'Sayuran', 56000, 67800, 'KG', '621110100018', 10],
            ['Paprica Kuning', 'Sayuran', 64000, 75800, 'KG', '621110100019', 10],
            ['Ketan Hitam 1Kg', 'Produk Olahan', 24600, 36200, 'PCS', '621110500013', 14],
            ['Ketan Hitam 1/2 Kg', 'Produk Olahan', 13600, 18100, 'PCS', '621110500014', 22],
            ['Gobanco Ring Milo', 'Makanan Ringan', 21900, 27000, 'Pcs', '62111100001', 5],
            ['Gobanco Chip Milo', 'Makanan Ringan', 21900, 27000, 'Pcs', '62111100002', 3],
            ['Gobanco Soes Milo', 'Makanan Ringan', 21900, 27000, 'Pcs', '62111100003', 4],
            ['Ladang Lima Blackthins', 'Makanan Ringan', 18700, 23000, 'Pcs', '62111100004', 2],
            ['Ladang Lima Blackmond', 'Makanan Ringan', 18700, 23000, 'Pcs', '62111100005', 2],
            ['Ladang Lima Pumpberry', 'Makanan Ringan', 18700, 23000, 'Pcs', '62111100006', 2],
            ['TYL Almond Mic Chocolate', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100007', 1],
            ['TYL Almond Dark Chocolate', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100008', 1],
            ['Alisha Strawberry Coklat', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100009', 1],
            ['Alisha Cookie Coated Chocolate', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100010', 2],
            ['Alisha Milk Coklat', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100011', 1],
            ['Alisha Cookie Coated Coklat Singapore', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100012', 3],
            ['Alisha Smilk Coklat Singapore', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100013', 1],
            ['Alisha Strawberry Coklat Singapore', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100014', 4],
            ['Truffle Huzelnut', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100015', 2],
            ['Truffle Caramel', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100016', 2],
            ['Truffle Strawberry', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100017', 2],
            ['Truffle Milk', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100018', 2],
            ['Truffle Tiramisu', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100019', 1],
            ['Choco Twist', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100020', 5],
            ['Mr. Sif Melisha', 'Makanan Ringan', 15000, 15000, 'Pcs', '62111100021', 5],
            ['Kyla Food Basreng', 'Makanan Ringan', 16200, 21500, 'Pcs', '62111100022', 4],
            ['Kyla Food Makaroni Spicy', 'Makanan Ringan', 16500, 21500, 'Pcs', '62111100023', 3],
            ['Kyla Food Batagor Kuah', 'Makanan Ringan', 15500, 23000, 'Pcs', '62111100024', 3],
            ['Kyla Food Seblak', 'Makanan Ringan', 15000, 23000, 'Pcs', '62111100025', 2],
            ['Basreng Stick Daun Jeruk', 'Makanan Ringan', 15800, 20000, 'Pcs', '62111100026', 1],
            ['Basreng Stick Original Daun Jeruk', 'Makanan Ringan', 15800, 20000, 'Pcs', '62111100027', 1],
            ['Popocorn Caramel', 'Makanan Ringan', 18500, 22500, 'Pcs', '62111100028', 13],
            ['Popocorn Keju', 'Makanan Ringan', 18500, 22500, 'Pcs', '62111100029', 4],
            ['Kaula Keripik Cireng Original', 'Makanan Ringan', 18000, 22400, 'Pcs', '62111100030', 3],
            ['Kaula Keripik Cireng BBQ', 'Makanan Ringan', 18000, 22400, 'Pcs', '62111100031', 3],
            ['Kacang Mente', 'Makanan Ringan', 15000, 17000, 'Pcs', '62111100032', 10],
            ['Puding Dark Cokelat', 'Makanan Ringan', 15000, 10000, 'Pcs', '62111100033', 22],
            ['Sald Buah', 'Makanan Ringan', 15000, 20000, 'Pcs', '62111100034', 11],
            ['Cremy Cofee Jelly', 'Makanan Ringan', 15000, 20000, 'Pcs', '62111100035', 19],
            ['Buko Pandan', 'Makanan Ringan', 15000, 20000, 'Pcs', '62111100036', 10],
            ['Lapis Legit', 'Makanan Ringan', 11100, 15000, 'Pcs', '62111100037', 10],
            ['Jeruk Raja', 'Buah', 25000, 35000, 'KG', '621110700067', 5],
        ];

        DB::transaction(function () use ($products) {
            $display = Display::find(1); // Default display for stocks

            foreach ($products as $item) {
                $name = $item[0];
                $categoryName = $item[1];
                $buyPrice = $item[2];
                $sellPrice = $item[3];
                $unit = $item[4];
                $barcode = $item[5];
                $qty = $item[6];

                // 1. Handle Category
                $category = Category::firstOrCreate(
                    ['name' => $categoryName],
                    ['description' => 'Kategori ' . $categoryName]
                );

                // 2. Handle Product
                // Try to find by Barcode first, then by Name if Barcode is null
                $product = null;
                if ($barcode) {
                    $product = Product::where('barcode', $barcode)->first();
                }

                if (!$product) {
                    $product = Product::where('title', $name)->first();
                }

                $isNew = false;
                if (!$product) {
                    $isNew = true;
                    // Create New Product
                    $product = Product::create([
                        'title' => $name,
                        'category_id' => $category->id,
                        'buy_price' => $buyPrice,
                        'sell_price' => $sellPrice,
                        'unit' => $unit,
                        'barcode' => $barcode,
                        'sku' => $barcode ?? Str::random(12), // Fallback SKU
                        'image' => 'default.png',
                        'product_type' => 'sellable',
                        'is_active' => 1,
                        'tags' => json_encode(['sellable']),
                    ]);
                } else {
                    // Update Existing Product (except stock)
                    $product->update([
                        'title' => $name, // Update name as requested
                        'category_id' => $category->id, // Update category
                        'buy_price' => $buyPrice,
                        'sell_price' => $sellPrice,
                        'unit' => $unit,
                        // 'barcode' => $barcode, // Don't update barcode if it exists, likely same
                        'is_active' => 1,
                    ]);
                }

                // 3. Handle Stock
                if ($isNew && $display) {
                    // Only update stock for NEW products
                    $displayStock = DisplayStock::firstOrCreate(
                        ['display_id' => $display->id, 'product_id' => $product->id],
                        ['quantity' => 0]
                    );

                    $displayStock->quantity = $qty;
                    $displayStock->save();

                    // Create log movement
                    StockMovement::create([
                        'product_id' => $product->id,
                        'from_type' => 'adjustment',
                        'to_type' => 'display',
                        'to_id' => $display->id,
                        'quantity' => $qty,
                        'purchase_price' => $buyPrice,
                        'note' => 'Initial Import (Seeding)',
                        'user_id' => 1, // Admin or System
                    ]);

                    $this->command->info("Created new product: {$name} - Stock: {$qty}");
                } else {
                    $this->command->info("Updated product: {$name} - Stock preserved");
                }
            }
        });
    }
}
