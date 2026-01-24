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
            ['Kol Merah', 'Sayuran', 25000, 35000, 'KG', '621110100001', 0],
            ['Beet root', 'Umbi & Akar', 29000, 39000, 'KG', '621110300001', 0],
            ['Bunga Kucai', 'Sayuran', 54250, 64250, 'KG', '621110100002', 0],
            ['Lettuce', 'Sayuran', 35857, 45857, 'KG', '621110100003', 0],
            ['Roman Lettuce', 'Sayuran', 41333, 51333, 'KG', '621110100004', 0],
            ['Brocoli', 'Sayuran', 41571, 51571, 'KG', '621110100005', 0],
            ['Bunga Kol', 'Sayuran', 38000, 48000, 'KG', '621110100006', 0],
            ['Bunga Seng', 'Sayuran', 47000, 57000, 'KG', '621110100007', 0],
            ['Wong sui', 'Sayuran', 3000, 13000, 'KG', '621110100008', 0],
            ['Celery', 'Sayuran', 3000, 13000, 'KG', '621110100009', 0],
            ['Baby Kailan', 'Sayuran', 58000, 68000, 'KG', '621110100010', 0],
            ['Sawi Minyak Shang', 'Sayuran', 33909, 43909, 'KG', '621110100011', 0],
            ['Sawi Minyak Baby', 'Sayuran', 55500, 65500, 'KG', '621110100012', 0],
            ['Kailan HK', 'Sayuran', 43000, 53000, 'KG', '621110100013', 0],
            ['Huai shan', 'Sayuran', 35000, 45000, 'KG', '621110100014', 0],
            ['Pueleng', 'Sayuran', 55500, 65500, 'KG', '621110100015', 0],
            ['Xiang mai', 'Sayuran', 48000, 58000, 'KG', '621110100016', 0],
            ['Jamur Simeji Putih', 'Jamur', 8250, 10500, 'PCS', '621110400001', 40],
            ['Jamur Shitake', 'Jamur', 13800, 16000, 'PCS', '621110400002', 24],
            ['Jamur Oister', 'Jamur', 9400, 12000, 'PCS', '621110400003', 30],
            ['Jamur Xinbao', 'Jamur', 9400, 11900, 'PCS', null, 0], // No Barcode
            ['Jamur Snow White', 'Jamur', 7250, 9750, 'PCS', '621110400004', 42],
            ['Jamur Enoki', 'Jamur', 3800, 7000, 'PCS', '621110400005', 32],
            ['Kacang Arcis', 'Kacang-Kacangan', 8533, 11033, 'PCS', '621110200001', 0],
            ['Kacang Manis', 'Kacang-Kacangan', 8533, 11033, 'PCS', '621110200002', 0],
            ['Jamur Kuping', 'Jamur', 11000, 15000, 'PCS', '621110400006', 23],
            ['Bamboo Shoots', 'Sayuran', 10500, 13500, 'PCS', '621110100017', 38],
            ['Wortel', 'Sayuran', 14000, 0, 'KG', '621110100018', 0], // Sell price missing or 0
            ['Daun Ketumbar', 'Sayuran', 0, 0, '-', '621110100019', 0],
            ['Dou Pai', 'Sayuran', 55500, 67500, 'PCS', '621110100020', 0],
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
            ['Anggur Merah Flame Sedless', 'Buah', 42500, 47500, 'Pack', '621110700001', 0],
            ['Anggur Merah Crimson aust', 'Buah', 30000, 40000, 'Pack', '621110700002', 8],
            ['Anggur Merah Aus BAG', 'Buah', 100000, 150000, 'Pack', '621110700003', 7],
            ['Anggur Hitam Aust', 'Buah', 114111, 124111, 'KG', '621110700004', 0],
            ['Anggur Hitam Curah a17', 'Buah', 18000, 22000, 'Pack', '621110700005', 16],
            ['Apple Strawberry Curah', 'Buah', 47444, 57444, 'KG', '621110700006', 0],
            ['Apple Strawberry Pack', 'Buah', 26500, 35000, 'Pack', '621110700007', 7],
            ['Mangga susu Thai', 'Buah', 28000, 43000, 'KG', '621110700008', 0],
            ['Peach Merah Aust', 'Buah', 15300, 25000, 'PCS', '621110700009', 22],
            ['Cherry Chilli Red S', 'Buah', 30000, 35000, 'Pack', '621110700010', 24],
            ['Plam merah aust', 'Buah', 66158, 76158, 'KG', '621110700011', 0],
            ['Netarin Merah aust', 'Buah', 63000, 80000, 'KG', '621110700012', 10],
            ['Bluberry peru 125', 'Buah', 32167, 45000, 'Pack', '621110700013', 12],
            ['Kelapa coco thumb', 'Buah', 33833, 40000, 'PCS', '621110700014', 10],
            ['Kesemak', 'Buah', 9300, 15000, 'KG', '621110700015', 0],
            ['Kesemak Vakum', 'Buah', 10000, 15000, 'PCS', '621110700016', 29],
            ['Dragon Kuning ecuador', 'Buah', 53000, 60000, 'Pack', '621110700017', 0],
            ['Dragon White 14"', 'Buah', 24429, 30000, 'PCS', '621110700018', 14],
            ['Dragon White 18"', 'Buah', 19667, 25000, 'PCS', '621110700019', 18],
            ['Kiwi Merah RRC', 'Buah', 31333, 45000, 'Pack', '621110700020', 12],
            ['Kiwi Gold RRC', 'Buah', 25000, 35000, 'Pack', '621110700021', 20],
            ['Kiwi Green RRC Curah', 'Buah', 45000, 60000, 'KG', '621110700022', 8],
            ['Kiwi Merah France', 'Buah', 83000, 95000, 'Pack', '621110700023', 0],
            ['Kiwi Gold NZ', 'Buah', 50000, 55000, 'Pack', '621110700024', 11],
            ['Kiwi Green NZ', 'Buah', 11269, 14000, 'Pack', '621110700025', 0],
            ['Jeruk Bali Merah', 'Buah', 46750, 60000, 'Pack', '621110700026', 0],
            ['Golden Pear 30', 'Buah', 16333, 20000, 'Pack', '621110700027', 0],
            ['Golden Pear 36', 'Buah', 13944, 18000, 'Pack', '621110700028', 0],
            ['Pear Merah Packing', 'Buah', 51000, 60000, 'Pack', '621110700029', 20],
            ['Pear Nam Sui Lie 36', 'Buah', 750, 55000, 'Pack', '621110700030', 0],
            ['Pear Nam Sui Lie 8', 'Buah', 30000, 40000, 'PCS', '621110700031', 8],
            ['Pear Merah TC', 'Buah', 49000, 60000, 'Pack', '621110700032', 12.8],
            ['Delima', 'Buah', 35000, 45000, 'PCS', '621110700033', 19],
            ['Kiwi Gold Pack', 'Buah', 21833, 30000, 'Pack', '621110700034', 0],
            ['Hami Melon', 'Buah', 59000, 80000, 'PCS', '621110700035', 24],
            ['Lemon', 'Buah', 6000, 7000, 'PCS', '621110700036', 75],
            ['Anggur Hijau Muscat', 'Buah', 29000, 35000, 'Pack', '621110700037', 64],
            ['Anggur R/G China', 'Buah', 21000, 35000, 'Pack', '621110700038', 3],
            ['Plam Queen', 'Buah', 180000, 200000, 'KG', '621110700039', 0],
            ['Plam Dandy', 'Buah', 95000, 115000, 'KG', '621110700040', 9.2],
            ['A.C.N', 'Buah', 15000, 25000, 'PCS', '621110700041', 24],
            ['Avokado Aust', 'Buah', 21000, 25000, 'PCS', '621110700042', 54],
            ['Cherry Chilli Red L', 'Buah', 70000, 75000, 'Pack', '621110700043', 14],
            ['Pear Fragrant', 'Buah', 12000, 15000, 'PCS', '621110700044', 63],
            ['Kiwi Gold Itali', 'Buah', 18000, 25000, 'PCS', '621110700045', 45],
            ['Kiwi Green Itali', 'Buah', 10500, 15000, 'PCS', '621110700046', 78],
            ['Stawberry Lokal', 'Buah', 25000, 30000, 'Pack', '621110700047', 13],
            ['Kelengkeng', 'Buah', 38000, 48000, 'KG', '621110700048', 21.833],
            ['Jeruk Bali IPOH', 'Buah', 95000, 120000, 'PCS', '621110700049', 19],
            ['Pamello', 'Buah', 46000, 60000, 'PCS', '621110700050', 4],
            ['Apple Rossy S', 'Buah', 35000, 40000, 'KG', '621110700051', 100],
            ['Apple Rossy L', 'Buah', 37000, 45000, 'KG', '621110700052', 27],
            ['Pear Golden', 'Buah', 35000, 45000, 'KG', '621110700053', 13],
            ['Pear Naci', 'Buah', 23000, 30000, 'KG', '621110700054', 117.5],
            ['Apple Mini (Anna)', 'Buah', 21000, 30000, 'KG', '621110700055', 17],
            ['Apple Sunpeng', 'Buah', 22000, 30000, 'KG', '621110700056', 14.6],
            ['Orange Palensia', 'Buah', 26000, 35000, 'KG', '621110700057', 17.8],
            ['Apel Hijau', 'Buah', 38000, 45000, 'KG', '621110700058', 45.6],
            ['Pear Hijau', 'Buah', 31000, 40000, 'KG', '621110700059', 9.6],
            ['Pear Yali', 'Buah', 20000, 25000, 'KG', '621110700060', 68],
            ['Apple Galla', 'Buah', 30000, 40000, 'KG', '621110700061', 17],
        ];

        DB::beginTransaction();

        try {
            foreach ($data as $item) {
                // 1. Get or Create Category
                $categoryName = $item[1];
                if (empty($categoryName))
                    $categoryName = 'Uncategorized';

                $category = Category::firstOrCreate(
                    ['name' => $categoryName],
                    ['description' => 'Kategori ' . $categoryName]
                );

                // 2. Create Product
                $product = Product::create([
                    'title' => $item[0],
                    'category_id' => $category->id,
                    'buy_price' => $item[2],
                    'sell_price' => $item[3],
                    'unit' => $item[4],
                    'product_type' => Product::TYPE_SELLABLE,
                    'image' => 'default.png', // Placeholder image
                    'barcode' => $item[5],
                    'min_stock' => 5,
                    // Generate SKU if barcode is missing, or use barcode
                    'sku' => $item[5] ?? Product::generateSku($category, $item[0]),
                ]);

                // 3. Initial Stock
                $qty = $item[6];
                if ($qty > 0) {
                    WarehouseStock::create([
                        'warehouse_id' => 1, // Assuming Main Warehouse ID 1 exists
                        'product_id' => $product->id,
                        'quantity' => $qty,
                    ]);

                    // Optional: Update average cost if needed, but buy_price is already set on product
                }
            }

            DB::commit();
            $this->command->info('Real products seeded successfully!');

        } catch (\Exception $e) {
            DB::rollBack();
            $this->command->error('Error seeding products: ' . $e->getMessage());
        }
    }
}
