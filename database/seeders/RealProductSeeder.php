<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\WarehouseStock;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RealProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['Kol Merah', 'Sayuran', 25000, 35000, 'KG', '621110100001', 10],
            ['Beet root', 'Umbi & Akar', 31000, 40000, 'KG', '621110300001', 10],
            ['Daun Kucai', 'Sayuran', 12000, 15000, 'IKAT', '621110100002', 35],
            ['Lettuce', 'Sayuran', 35857.14, 46000, 'KG', '621110100003', 0],
            ['Roman Lettuce', 'Sayuran', 41333.33, 52000, 'KG', '621110100004', 3],
            ['Brocoli', 'Sayuran', 41571.43, 50000, 'KG', '621110100005', 11.4],
            ['Bunga Kol', 'Sayuran', 38000, 48000, 'KG', '621110100006', 24],
            ['Bunga Seng', 'Sayuran', 47000, 55000, 'IKAT', '621110100007', 10],
            ['Baby Pakcoy', 'Sayuran', 55500, 65500, 'KG', '621110100008', 2.6],
            ['Sawi Minyak Baby', 'Sayuran', 55500, 65500, 'KG', '621110100009', 1.6],
            ['Kailan HK', 'Sayuran', 43000, 53000, 'KG', '621110100010', 4.8],
            ['Huai shan', 'Sayuran', 35000, 45000, 'KG', '621110100011', 3.5],
            ['Pueleng', 'Sayuran', 55500, 65500, 'KG', '621110100012', 2.1],
            ['Jamur Shimeji Putih', 'Jamur', 8250.71, 10500, 'PCS', '621110400001', 40],
            ['Jamur Shitake', 'Jamur', 13800, 16000, 'PCS', '621110400002', 24],
            ['Jamur Oister', 'Jamur', 9400, 12000, 'PCS', '621110400003', 30],
            ['Jamur Snow White', 'Jamur', 7250, 9750, 'PCS', '621110400004', 42],
            ['Jamur Enoki', 'Jamur', 3800, 7000, 'PCS', '621110400005', 32],
            ['Kacang Arcis', 'Kacang-Kacangan', 8533.33, 11033, 'PCS', '621110200001', 33],
            ['Kacang Manis', 'Kacang-Kacangan', 8533.33, 11033, 'PCS', '621110200002', 27],
            ['Jamur Kuping', 'Jamur', 11000, 15000, 'PCS', '621110400006', 23],
            ['Bamboo Shoots', 'Sayuran', 10500, 13500, 'PCS', '621110100013', 36],
            ['Wortel', 'Sayuran', 13000, 16000, 'KG', '621110100014', 92],
            ['Daun Ketumbar', 'Sayuran', 80000, 95000, 'KG', '621110100015', 3],
            ['Dou Pai', 'Sayuran', 55500, 67500, 'KG', '621110100016', 2.8],
            ['Tahu Kotak', 'Produk Olahan', 11600, 16000, 'PCS', '621110500001', 99],
            ['Tahu Telur', 'Produk Olahan', 4000, 7000, 'PCS', '621110500002', 178],
            ['Sosis Ayam Jofran', 'Produk Olahan', 13000, 18000, 'PCS', '621110500003', 0],
            ['Sosis Ayam Madu Jofran', 'Produk Olahan', 13000, 18000, 'PCS', '621110500004', 0],
            ['Ayam S 550-560', 'Daging Ayam', 55000, 64000, 'PCS', '621110600001', 0],
            ['Ayam S 650-750', 'Daging Ayam', 51000, 60000, 'PCS', '621110600002', 0],
            ['Chicken S 0.9', 'Daging Ayam', 45000, 54000, 'PCS', '621110600003', 0],
            ['Chicken 1100', 'Daging Ayam', 43000, 52000, 'PCS', '621110600004', 0],
            ['Chicken S 1100', 'Daging Ayam', 41000, 50000, 'PCS', '621110600005', 0],
            ['Chicken S 1200', 'Daging Ayam', 41000, 50000, 'PCS', '621110600006', 0],
            ['Chicken Feet', 'Daging Ayam', 25000, 34000, 'PCS', '621110600007', 0],
            ['Chicken Wing 90UP', 'Daging Ayam', 39000, 48000, 'PCS', '621110600008', 0],
            ['Chicken Breast Bone in', 'Daging Ayam', 39000, 48000, 'PCS', '621110600009', 0],
            ['Chicken Breast 1 KG', 'Daging Ayam', 42167, 51167, 'PCS', '621110600010', 0],
            ['Chicken Breast OD 1 KG', 'Daging Ayam', 40917, 49917, 'PCS', '621110600011', 0],
            ['Chicken Breast Brown', 'Daging Ayam', 39000, 48000, 'PCS', '621110600012', 0],
            ['Chicken Breast Kulit', 'Daging Ayam', 143200, 152200, 'PCS', '621110600013', 0],
            ['Chicken Leg Boneless', 'Daging Ayam', 102000, 111000, 'PCS', '621110600014', 0],
            ['Chicken Meat', 'Daging Ayam', 38000, 47000, 'PCS', '621110600015', 0],
            ['Chicken Drum Stick', 'Daging Ayam', 34000, 43000, 'PCS', '621110600016', 0],
            ['Chicken Mid Joint', 'Daging Ayam', 36000, 45000, 'PCS', '621110600017', 0],
            ['Sosis Ayam Doux Pack', 'Produk Olahan', 19000, 24000, 'PCS', '621110500005', 0],
            ['Anggur Black Seedless', 'Buah', 42500, 50000, 'Pack', '621110700001', 10],
            ['Anggur Merah Curah', 'Buah', 18000, 22000, 'KG', '621110700002', 10.4],
            ['Anggur Merah Aus BAG', 'Buah', 100000, 150000, 'Pack', '621110700003', 7],
            ['Anggur Hitam Aust', 'Buah', 114111, 124111, 'KG', '621110700004', 4.8],
            ['Anggur Hitam Curah a17', 'Buah', 18000, 22000, 'Pack', '621110700005', 13],
            ['Apple Strawberry Pack', 'Buah', 26500, 35000, 'Pack', '621110700008', 7],
            ['Peach Merah Aust', 'Buah', 15300, 25000, 'PCS', '621110700009', 22],
            ['Cherry Chilli Red S', 'Buah', 30000, 35000, 'Pack', '621110700010', 24],
            ['Plam Netarin Merah aust', 'Buah', 63000, 80000, 'KG', '621110700011', 10],
            ['Bluberry peru 125', 'Buah', 32167, 45000, 'Pack', '621110700012', 12],
            ['Kelapa coco thumb', 'Buah', 33833, 40000, 'PCS', '621110700013', 10],
            ['Kesemak', 'Buah', 9300, 15000, 'KG', '621110700014', 0],
            ['Kesemak Vakum', 'Buah', 10000, 15000, 'PCS', '621110700020', 29],
            ['Dragon White 14"', 'Buah', 24429, 30000, 'PCS', '621110700021', 14],
            ['Dragon White 18"', 'Buah', 19667, 25000, 'PCS', '621110700022', 18],
            ['Kiwi Merah RRC', 'Buah', 31333, 45000, 'Pack', '621110700023', 12],
            ['Kiwi Gold RRC', 'Buah', 25000, 35000, 'Pack', '621110700024', 20],
            ['Kiwi Green RRC Curah', 'Buah', 45000, 60000, 'KG', '621110700025', 8],
            ['Kiwi Gold NZ', 'Buah', 50000, 55000, 'Pack', '621110700028', 11],
            ['Pear Merah Packing', 'Buah', 51000, 60000, 'Pack', '621110700029', 20],
            ['Pear Nam Sui Lie 30', 'Buah', 15000, 25000, 'Pack', '621110700031', 30],
            ['Pear Nam Sui Lie 8', 'Buah', 30000, 40000, 'PCS', '621110700032', 8],
            ['Pear Murah TC', 'Buah', 49000, 60000, 'KG', '621110700034', 12.8],
            ['Delima', 'Buah', 35000, 45000, 'PCS', '621110700035', 19],
            ['Hami Melon', 'Buah', 59000, 80000, 'PCS', '621110700036', 24],
            ['Lemon', 'Buah', 6000, 7000, 'PCS', '621110700037', 75],
            ['Anggur Hijau Muscat', 'Buah', 29000, 35000, 'Pack', '621110700038', 64],
            ['Anggur R/G India', 'Buah', 21000, 35000, 'Pack', '621110700039', 3],
            ['Plam Queen', 'Buah', 180000, 200000, 'KG', '621110700052', 8.8],
            ['Plam Dandy', 'Buah', 95000, 115000, 'KG', '621110700053', 9.2],
            ['A.C.N', 'Buah', 15000, 25000, 'PCS', '621110700054', 24],
            ['Avokado Aust', 'Buah', 21000, 25000, 'PCS', '621110700055', 54],
            ['Cherry Chilli Red L', 'Buah', 70000, 75000, 'Pack', '621110700056', 14],
            ['Pear Fragrant', 'Buah', 12000, 15000, 'PCS', '621110700057', 63],
            ['Kiwi Gold Itali', 'Buah', 18000, 25000, 'PCS', '621110700058', 45],
            ['Kiwi Green Itali', 'Buah', 10500, 15000, 'PCS', '621110700059', 78],
            ['Stawberry Lokal', 'Buah', 25000, 30000, 'Pack', '621110700060', 13],
            ['Kelengkeng', 'Buah', 38000, 48000, 'KG', '621110700063', 22],
            ['Jeruk Bali IPOH', 'Buah', 95000, 120000, 'PCS', '621110700064', 21.8],
            ['Pamello', 'Buah', 46000, 60000, 'PCS', '621110700065', 4],
            ['Apple Rossy S', 'Buah', 35000, 40000, 'KG', '621110700041', 134],
            ['Apple Rossy L', 'Buah', 37000, 45000, 'KG', '621110700042', 44],
            ['Pear Golden', 'Buah', 35000, 45000, 'KG', '621110700043', 13],
            ['Pear Naci', 'Buah', 23000, 30000, 'KG', '621110700044', 117.5],
            ['Apple Mini (Anna)', 'Buah', 21000, 30000, 'KG', '621110700045', 17],
            ['Apple Sunpeng', 'Buah', 22000, 30000, 'KG', '621110700046', 14.6],
            ['Orange Valencia', 'Buah', 26000, 30000, 'KG', '621110700047', 17.4],
            ['Apel Hijau', 'Buah', 38000, 45000, 'KG', '621110700048', 45.3],
            ['Pear Hijau', 'Buah', 31000, 40000, 'KG', '621110700049', 9.6],
            ['Pear Yali', 'Buah', 20000, 25000, 'KG', '621110700050', 68],
            ['Apple Galla', 'Buah', 30000, 40000, 'KG', '621110700051', 16.3],
            ['Apple Rossi 64', 'Buah', 9500, 15000, 'PCS', '621110700062', 128],
            ['Apple Rossi 56', 'Buah', 9500, 15000, 'PCS', '621110700061', 112],
            ['Apple Fuji Boss', 'Buah', 23000, 30000, 'KG', '621110700064', 34],
            ['Jeruk BAG Barongsai', 'Buah', 88000, 100000, 'PCS', '621110700065', 20],
            ['Jeruk IMLEK KTK XL 38\'', 'Buah', 269000, 300000, 'BOX', '621110700066', 5],
            ['Jeruk IMLEK KTK L 34\'', 'Buah', 234000, 270000, 'BOX', '621110700067', 5],
            ['Jeruk IMLEK KTK M 52-54\'', 'Buah', 204000, 250000, 'BOX', '621110700068', 5],
            ['Pear Nam Sui Lie 36', 'Buah', 12000, 20000, 'PCS', '621110700069', 36],
            ['Jeruk IMLEK KCL M 4Kg', 'Buah', 112000, 160000, 'BOX', '621110700070', 5],
            ['Jeruk IMLEK KCL L 4Kg', 'Buah', 127000, 170000, 'BOX', '621110700071', 5],
            ['Paprica Merah', 'Sayuran', 71000, 85000, 'KG', '621110100021', 10],
            ['Mangga Thailand', 'Buah', 30000, 45000, 'KG', '621110700072', 16],
            ['Bawang Jawa', 'Umbi & Akar', 35000, 40000, 'KG', '621110300002', 50],
            ['Citrus Wogan', 'Buah', 25000, 30000, 'Pack', '621110700073', 4],
            ['Anggur Red Crimson AUS', 'Buah', 70000, 80000, 'Pack', '621110700074', 17],
            ['Plam Mini', 'Buah', 65000, 75000, 'KG', '621110700075', 6.5],
            ['Anggur Merah Afrika', 'Buah', 30000, 40000, 'Pack', '621110700076', 0],
        ];

        DB::beginTransaction();

        try {
            // 0. Create Supplier and Display
            $supplier = \App\Models\Supplier::firstOrCreate(
                ['name' => 'Owner (Julia)'],
                [
                    'company' => 'Julia Freshmart',
                    'phone' => '08123456789',
                    'email' => '-',
                    'address' => 'Medan',
                    'description' => 'Owner',
                ]
            );

            $display = \App\Models\Display::firstOrCreate(
                ['name' => 'Display Lantai 1'],
                [
                    'location' => '-',
                    'is_active' => true,
                ]
            );

            $warehouse = \App\Models\Warehouse::firstOrCreate(
                ['name' => 'Gudang Utama'],
                [
                    'location' => 'Lantai Bawah',
                    'is_active' => true,
                ]
            );

            foreach ($data as $item) {
                // 1. Get or Create Category
                $categoryName = $item[1];
                if (empty($categoryName))
                    $categoryName = 'Uncategorized';

                $category = Category::firstOrCreate(
                    ['name' => $categoryName],
                    ['description' => 'Kategori ' . $categoryName]
                );

                // 2. Create or Update Product
                $barcode = $item[5];
                $title = $item[0];

                $product = null;

                // Priority 1: Find by Barcode (if exists)
                if (!empty($barcode)) {
                    $product = Product::where('barcode', $barcode)->first();
                }

                // Priority 2: Find by Title (if not found by barcode)
                if (!$product) {
                    $product = Product::where('title', $title)->first();
                }

                $productData = [
                    'category_id' => $category->id,
                    'buy_price' => $item[2],
                    'sell_price' => $item[3],
                    'unit' => $item[4],
                    'product_type' => Product::TYPE_SELLABLE,
                    'tags' => ['sellable'],
                    'image' => 'default.png',
                    'barcode' => $barcode,
                    'min_stock' => 5,
                    'is_active' => true,
                ];

                if ($product) {
                    // Update existing
                    $product->update(array_merge($productData, ['title' => $title]));
                } else {
                    // Create new
                    $sku = $barcode ?? Product::generateSku($category, $title);
                    $product = Product::create(array_merge($productData, [
                        'title' => $title,
                        'sku' => $sku
                    ]));
                }

                // 3. Initial Stock
                $qty = $item[6];
                if ($qty > 0) {
                    // Start from 0, add to Warehouse (Inbound)
                    // Create Stock Movement: Adjustment In -> Warehouse
                    \App\Models\StockMovement::create([
                        'product_id' => $product->id,
                        'from_type' => 'adjustment', // Source is adjustment (initial stock)
                        'from_id' => null,
                        'to_type' => 'warehouse',
                        'to_id' => $warehouse->id,
                        'quantity' => $qty,
                        'purchase_price' => $item[2], // Buy price
                        'user_id' => 1, // Assume Admin/System (User ID 1)
                        'note' => 'Initial Stock Seeding (Opname Awal)',
                        'created_at' => now(),
                    ]);

                    // Update Warehouse Stock
                    $warehouseStock = WarehouseStock::firstOrCreate(
                        ['warehouse_id' => $warehouse->id, 'product_id' => $product->id],
                        ['quantity' => 0]
                    );
                    $warehouseStock->increment('quantity', $qty);

                    // Transfer ALL stock to Display (as requested)
                    // Create Stock Movement: Warehouse -> Display
                    \App\Models\StockMovement::create([
                        'product_id' => $product->id,
                        'from_type' => 'warehouse',
                        'from_id' => $warehouse->id,
                        'to_type' => 'display',
                        'to_id' => $display->id,
                        'quantity' => $qty,
                        'purchase_price' => $item[2],
                        'user_id' => 1,
                        'note' => 'Migrasi awal ke Display Toko',
                        'created_at' => now()->addSecond(), // Ensure it appears after adjustment
                    ]);

                    // Decrement Warehouse
                    $warehouseStock->decrement('quantity', $qty);

                    // Increment Display
                    $displayStock = \App\Models\DisplayStock::firstOrCreate(
                        ['display_id' => $display->id, 'product_id' => $product->id],
                        ['quantity' => 0]
                    );
                    $displayStock->increment('quantity', $qty);
                } else {
                    // If 0 stock, just create empty records
                    WarehouseStock::firstOrCreate(
                        ['warehouse_id' => $warehouse->id, 'product_id' => $product->id],
                        ['quantity' => 0]
                    );
                    \App\Models\DisplayStock::firstOrCreate(
                        ['display_id' => $display->id, 'product_id' => $product->id],
                        ['quantity' => 0]
                    );
                }
            }

            DB::commit();
            $this->command->info('Real products seeded successfully with Stock Movements!');

        } catch (\Exception $e) {
            DB::rollBack();
            $this->command->error('Error seeding products: ' . $e->getMessage());
        }
    }
}
