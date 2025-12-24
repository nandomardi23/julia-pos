<?php

namespace Database\Seeders;

use App\Models\Cart;
use App\Models\Category;
use App\Models\Display;
use App\Models\DisplayStock;
use App\Models\Product;
use App\Models\ProductIngredient;
use App\Models\Profit;
use App\Models\Supplier;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use App\Models\User;
use App\Models\Warehouse;
use App\Models\WarehouseStock;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class CafeDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('🧹 Cleaning up old data...');
        
        Schema::disableForeignKeyConstraints();

        Cart::truncate();
        TransactionDetail::truncate();
        Profit::truncate();
        Transaction::truncate();
        ProductIngredient::truncate();
        DisplayStock::truncate();
        WarehouseStock::truncate();
        Product::truncate();
        Category::truncate();
        Supplier::truncate();
        Display::truncate();
        Warehouse::truncate();

        Schema::enableForeignKeyConstraints();

        // Ensure storage directories exist
        Storage::disk('public')->makeDirectory('products');
        Storage::disk('public')->makeDirectory('category');

        $this->command->info('📦 Creating suppliers...');
        $suppliers = $this->seedSuppliers();

        $this->command->info('🏪 Creating warehouses & displays...');
        $warehouse = $this->seedWarehouse();
        $display = $this->seedDisplay();

        $this->command->info('📂 Creating categories...');
        $categories = $this->seedCategories();

        $this->command->info('☕ Creating products with images...');
        $products = $this->seedProducts($categories, $suppliers);

        $this->command->info('📊 Adding stock to warehouse & display...');
        $this->seedStock($products, $warehouse, $display);

        $this->command->info('✅ Cafe data seeded successfully!');
        $this->command->info('   Total products: ' . count($products));
    }

    private function seedSuppliers(): array
    {
        $suppliers = [
            ['name' => 'PT Kopi Nusantara', 'company' => 'Kopi Nusantara', 'phone' => '021-1234567', 'address' => 'Jakarta Selatan'],
            ['name' => 'CV Susu Murni', 'company' => 'Susu Murni', 'phone' => '022-9876543', 'address' => 'Bandung'],
            ['name' => 'UD Buah Segar', 'company' => 'Buah Segar', 'phone' => '021-5551234', 'address' => 'Jakarta Barat'],
            ['name' => 'UD Packaging Jaya', 'company' => 'Packaging Jaya', 'phone' => '031-5556789', 'address' => 'Surabaya'],
        ];

        $result = [];
        foreach ($suppliers as $supplier) {
            $result[$supplier['company']] = Supplier::create($supplier);
        }
        return $result;
    }

    private function seedWarehouse(): Warehouse
    {
        return Warehouse::create([
            'name' => 'Gudang Utama',
            'location' => 'Lantai Bawah',
            'is_active' => true,
        ]);
    }

    private function seedDisplay(): Display
    {
        return Display::create([
            'name' => 'Counter Kasir',
            'location' => 'Lantai 1',
            'is_active' => true,
        ]);
    }

    private function seedCategories(): array
    {
        $categories = [
            ['name' => 'Coffee', 'image' => 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400'],
            ['name' => 'Non-Coffee', 'image' => 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'],
            ['name' => 'Jus', 'image' => 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400'],
            ['name' => 'Salad', 'image' => 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400'],
            ['name' => 'Buah', 'image' => 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400'],
            ['name' => 'Snacks', 'image' => 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400'],
            ['name' => 'Supplies', 'image' => 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=400'],
            ['name' => 'Ingredients', 'image' => 'https://images.unsplash.com/photo-1495195129352-aeb325a55b65?w=400'],
        ];

        $result = [];
        foreach ($categories as $category) {
            $imageName = $this->downloadImage($category['image'], 'category', Str::slug($category['name']));
            $result[$category['name']] = Category::create([
                'name' => $category['name'],
                'image' => $imageName,
            ]);
        }
        return $result;
    }

    private function seedProducts(array $categories, array $suppliers): array
    {
        $products = [];
        $counter = 1;

        // ========== COFFEE (with size variants) ==========
        $coffeeBase = [
            ['name' => 'Espresso', 'desc' => 'Espresso shot murni dengan crema tebal', 'img' => 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400', 
             'prices' => ['R' => [8000, 18000], 'L' => [10000, 22000]]],
            ['name' => 'Americano', 'desc' => 'Espresso dengan air panas', 'img' => 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400', 
             'prices' => ['R' => [10000, 22000], 'L' => [12000, 26000], 'XL' => [14000, 30000]]],
            ['name' => 'Caffe Latte', 'desc' => 'Espresso dengan steamed milk dan foam tipis', 'img' => 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400', 
             'prices' => ['R' => [12000, 28000], 'L' => [15000, 33000], 'XL' => [18000, 38000]]],
            ['name' => 'Cappuccino', 'desc' => 'Espresso dengan steamed milk dan foam tebal', 'img' => 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400', 
             'prices' => ['R' => [12000, 28000], 'L' => [15000, 33000], 'XL' => [18000, 38000]]],
            ['name' => 'Caramel Macchiato', 'desc' => 'Vanilla latte dengan caramel drizzle', 'img' => 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400', 
             'prices' => ['R' => [15000, 32000], 'L' => [18000, 38000], 'XL' => [21000, 44000]]],
            ['name' => 'Mocha', 'desc' => 'Espresso dengan cokelat dan susu', 'img' => 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400', 
             'prices' => ['R' => [14000, 30000], 'L' => [17000, 36000], 'XL' => [20000, 42000]]],
            ['name' => 'Cold Brew', 'desc' => 'Kopi seduh dingin 12 jam', 'img' => 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400', 
             'prices' => ['R' => [15000, 28000], 'L' => [18000, 34000]]],
            ['name' => 'Affogato', 'desc' => 'Espresso panas disiram ke ice cream vanilla', 'img' => 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=400', 
             'prices' => ['R' => [18000, 35000]]],
            ['name' => 'Vietnamese Coffee', 'desc' => 'Kopi Vietnam dengan susu kental manis', 'img' => 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400', 
             'prices' => ['R' => [12000, 25000], 'L' => [15000, 30000]]],
        ];

        foreach ($coffeeBase as $coffee) {
            foreach ($coffee['prices'] as $size => $prices) {
                $sizeLabel = $size === 'R' ? 'Regular' : ($size === 'L' ? 'Large' : 'Extra Large');
                $products[] = [
                    'category' => 'Coffee', 'supplier' => 'Kopi Nusantara',
                    'barcode' => 'COF-' . str_pad($counter++, 3, '0', STR_PAD_LEFT),
                    'title' => $coffee['name'] . ' (' . $sizeLabel . ')',
                    'description' => $coffee['desc'] . ' - Size ' . $sizeLabel,
                    'buy_price' => $prices[0], 'sell_price' => $prices[1],
                    'image' => $coffee['img'], 'unit' => 'cup',
                ];
            }
        }

        // ========== NON-COFFEE (with size variants) ==========
        $nonCoffeeBase = [
            ['name' => 'Matcha Latte', 'desc' => 'Japanese matcha dengan susu', 'img' => 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400', 
             'prices' => ['R' => [15000, 30000], 'L' => [18000, 36000], 'XL' => [21000, 42000]]],
            ['name' => 'Thai Tea', 'desc' => 'Thai tea original dengan susu', 'img' => 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=400', 
             'prices' => ['R' => [10000, 25000], 'L' => [13000, 30000], 'XL' => [16000, 35000]]],
            ['name' => 'Chocolate', 'desc' => 'Hot/iced chocolate dengan susu', 'img' => 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400', 
             'prices' => ['R' => [12000, 26000], 'L' => [15000, 32000], 'XL' => [18000, 38000]]],
            ['name' => 'Red Velvet Latte', 'desc' => 'Red velvet dengan cream cheese foam', 'img' => 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400', 
             'prices' => ['R' => [14000, 28000], 'L' => [17000, 34000]]],
            ['name' => 'Taro Latte', 'desc' => 'Taro dengan susu creamy', 'img' => 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400', 
             'prices' => ['R' => [13000, 27000], 'L' => [16000, 33000]]],
            ['name' => 'Lemon Tea', 'desc' => 'Teh lemon segar', 'img' => 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400', 
             'prices' => ['R' => [8000, 20000], 'L' => [10000, 25000]]],
            ['name' => 'Green Tea', 'desc' => 'Teh hijau premium', 'img' => 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400', 
             'prices' => ['R' => [8000, 18000], 'L' => [10000, 22000]]],
        ];

        foreach ($nonCoffeeBase as $drink) {
            foreach ($drink['prices'] as $size => $prices) {
                $sizeLabel = $size === 'R' ? 'Regular' : ($size === 'L' ? 'Large' : 'Extra Large');
                $products[] = [
                    'category' => 'Non-Coffee', 'supplier' => 'Susu Murni',
                    'barcode' => 'NCF-' . str_pad($counter++, 3, '0', STR_PAD_LEFT),
                    'title' => $drink['name'] . ' (' . $sizeLabel . ')',
                    'description' => $drink['desc'] . ' - Size ' . $sizeLabel,
                    'buy_price' => $prices[0], 'sell_price' => $prices[1],
                    'image' => $drink['img'], 'unit' => 'cup',
                ];
            }
        }

        // ========== JUS (with size variants) ==========
        $jusBase = [
            ['name' => 'Jus Jeruk', 'desc' => 'Jus jeruk segar tanpa gula tambahan', 'img' => 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400', 
             'prices' => ['R' => [10000, 22000], 'L' => [13000, 28000]]],
            ['name' => 'Jus Apel', 'desc' => 'Jus apel fuji segar', 'img' => 'https://images.unsplash.com/photo-1576673442511-7e39b6545c87?w=400', 
             'prices' => ['R' => [12000, 25000], 'L' => [15000, 32000]]],
            ['name' => 'Jus Mangga', 'desc' => 'Jus mangga harum manis', 'img' => 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400', 
             'prices' => ['R' => [12000, 25000], 'L' => [15000, 32000]]],
            ['name' => 'Jus Alpukat', 'desc' => 'Jus alpukat creamy dengan susu', 'img' => 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400', 
             'prices' => ['R' => [15000, 30000], 'L' => [18000, 38000]]],
            ['name' => 'Jus Semangka', 'desc' => 'Jus semangka segar', 'img' => 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400', 
             'prices' => ['R' => [10000, 20000], 'L' => [13000, 26000]]],
            ['name' => 'Jus Strawberry', 'desc' => 'Jus strawberry manis', 'img' => 'https://images.unsplash.com/photo-1506802913710-40e2e66339c9?w=400', 
             'prices' => ['R' => [14000, 28000], 'L' => [17000, 35000]]],
            ['name' => 'Mixed Fruit Juice', 'desc' => 'Campuran buah segar', 'img' => 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400', 
             'prices' => ['R' => [15000, 32000], 'L' => [18000, 40000]]],
        ];

        foreach ($jusBase as $jus) {
            foreach ($jus['prices'] as $size => $prices) {
                $sizeLabel = $size === 'R' ? 'Regular' : 'Large';
                $products[] = [
                    'category' => 'Jus', 'supplier' => 'Buah Segar',
                    'barcode' => 'JUS-' . str_pad($counter++, 3, '0', STR_PAD_LEFT),
                    'title' => $jus['name'] . ' (' . $sizeLabel . ')',
                    'description' => $jus['desc'] . ' - Size ' . $sizeLabel,
                    'buy_price' => $prices[0], 'sell_price' => $prices[1],
                    'image' => $jus['img'], 'unit' => 'cup',
                ];
            }
        }

        // ========== SALAD ==========
        $salads = [
            ['name' => 'Caesar Salad', 'desc' => 'Romaine lettuce dengan caesar dressing dan crouton', 'img' => 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400', 'buy' => 18000, 'sell' => 38000],
            ['name' => 'Garden Salad', 'desc' => 'Sayuran segar dengan vinaigrette', 'img' => 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', 'buy' => 15000, 'sell' => 32000],
            ['name' => 'Greek Salad', 'desc' => 'Timun, tomat, olive, feta cheese', 'img' => 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400', 'buy' => 20000, 'sell' => 42000],
            ['name' => 'Fruit Salad', 'desc' => 'Campuran buah segar dengan yogurt', 'img' => 'https://images.unsplash.com/photo-1564093497595-593b96d80180?w=400', 'buy' => 18000, 'sell' => 35000],
            ['name' => 'Chicken Salad', 'desc' => 'Salad dengan potongan ayam panggang', 'img' => 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400', 'buy' => 22000, 'sell' => 45000],
        ];

        foreach ($salads as $salad) {
            $products[] = [
                'category' => 'Salad', 'supplier' => 'Buah Segar',
                'barcode' => 'SLD-' . str_pad($counter++, 3, '0', STR_PAD_LEFT),
                'title' => $salad['name'], 'description' => $salad['desc'],
                'buy_price' => $salad['buy'], 'sell_price' => $salad['sell'],
                'image' => $salad['img'], 'unit' => 'porsi',
            ];
        }

        // ========== BUAH (Per portion/pack) ==========
        $buahs = [
            ['name' => 'Apel Fuji', 'desc' => 'Apel Fuji segar manis 3 buah', 'img' => 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400', 'buy' => 12000, 'sell' => 25000],
            ['name' => 'Pisang Cavendish', 'desc' => 'Pisang cavendish 1 sisir (6-8 buah)', 'img' => 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400', 'buy' => 15000, 'sell' => 28000],
            ['name' => 'Jeruk Mandarin', 'desc' => 'Jeruk mandarin manis 5 buah', 'img' => 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400', 'buy' => 18000, 'sell' => 35000],
            ['name' => 'Anggur Merah', 'desc' => 'Anggur merah seedless 250g', 'img' => 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400', 'buy' => 25000, 'sell' => 45000],
            ['name' => 'Mangga Harum Manis', 'desc' => 'Mangga harum manis matang 2 buah', 'img' => 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400', 'buy' => 20000, 'sell' => 38000],
            ['name' => 'Strawberry Pack', 'desc' => 'Strawberry segar 1 pack (250g)', 'img' => 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400', 'buy' => 22000, 'sell' => 42000],
            ['name' => 'Semangka Potong', 'desc' => 'Semangka potong segar 500g', 'img' => 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400', 'buy' => 10000, 'sell' => 20000],
            ['name' => 'Melon Potong', 'desc' => 'Melon potong segar 500g', 'img' => 'https://images.unsplash.com/photo-1571575173700-afb9492e6a50?w=400', 'buy' => 12000, 'sell' => 25000],
        ];

        foreach ($buahs as $buah) {
            $products[] = [
                'category' => 'Buah', 'supplier' => 'Buah Segar',
                'barcode' => 'BUA-' . str_pad($counter++, 3, '0', STR_PAD_LEFT),
                'title' => $buah['name'], 'description' => $buah['desc'],
                'buy_price' => $buah['buy'], 'sell_price' => $buah['sell'],
                'image' => $buah['img'], 'unit' => 'pack',
            ];
        }

        // ========== SNACKS ==========
        $snacks = [
            ['name' => 'Brownies', 'desc' => 'Brownies cokelat fudgy', 'img' => 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400', 'buy' => 8000, 'sell' => 18000],
            ['name' => 'Cheesecake', 'desc' => 'New York cheesecake', 'img' => 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400', 'buy' => 15000, 'sell' => 30000],
            ['name' => 'Cookies', 'desc' => 'Chocolate chip cookies 3pcs', 'img' => 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400', 'buy' => 6000, 'sell' => 15000],
            ['name' => 'Banana Bread', 'desc' => 'Roti pisang homemade', 'img' => 'https://images.unsplash.com/photo-1605090930406-f7ae8b08cf95?w=400', 'buy' => 10000, 'sell' => 22000],
            ['name' => 'Croissant', 'desc' => 'Croissant butter fresh', 'img' => 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400', 'buy' => 12000, 'sell' => 25000],
            ['name' => 'Donut', 'desc' => 'Donut glazed atau topping', 'img' => 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400', 'buy' => 6000, 'sell' => 15000],
        ];

        foreach ($snacks as $snack) {
            $products[] = [
                'category' => 'Snacks', 'supplier' => null,
                'barcode' => 'SNK-' . str_pad($counter++, 3, '0', STR_PAD_LEFT),
                'title' => $snack['name'], 'description' => $snack['desc'],
                'buy_price' => $snack['buy'], 'sell_price' => $snack['sell'],
                'image' => $snack['img'], 'unit' => 'pcs',
            ];
        }

        // ========== SUPPLIES ==========
        $supplies = [
            ['name' => 'Cup Plastik 16oz', 'desc' => 'Cup plastik minuman dingin', 'img' => 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=400', 'buy' => 500],
            ['name' => 'Cup Plastik 22oz', 'desc' => 'Cup plastik Large', 'img' => 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=400', 'buy' => 700],
            ['name' => 'Cup Paper 12oz', 'desc' => 'Cup kertas hot drink', 'img' => 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400', 'buy' => 800],
            ['name' => 'Cup Paper 16oz', 'desc' => 'Cup kertas hot drink Large', 'img' => 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400', 'buy' => 1000],
            ['name' => 'Sedotan', 'desc' => 'Sedotan plastik standar', 'img' => 'https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=400', 'buy' => 50],
            ['name' => 'Lid Cup', 'desc' => 'Tutup cup plastik', 'img' => 'https://images.unsplash.com/photo-1571167530149-c1105da4c2c7?w=400', 'buy' => 200],
            ['name' => 'Paper Bag', 'desc' => 'Tas kertas takeaway', 'img' => 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400', 'buy' => 500],
        ];

        foreach ($supplies as $supply) {
            $products[] = [
                'category' => 'Supplies', 'supplier' => 'Packaging Jaya',
                'barcode' => 'SUP-' . str_pad($counter++, 3, '0', STR_PAD_LEFT),
                'title' => $supply['name'], 'description' => $supply['desc'],
                'buy_price' => $supply['buy'], 'sell_price' => 0,
                'image' => $supply['img'], 'unit' => 'pcs', 'is_supply' => true,
            ];
        }

        // ========== INGREDIENTS ==========
        $ingredients = [
            ['name' => 'Coffee Beans', 'desc' => 'Biji kopi arabica premium', 'img' => 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400', 'buy' => 150000, 'sell' => 220000, 'unit' => 'kg'],
            ['name' => 'Fresh Milk', 'desc' => 'Susu segar murni', 'img' => 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400', 'buy' => 18000, 'sell' => 25000, 'unit' => 'liter'],
            ['name' => 'Vanilla Syrup', 'desc' => 'Sirup vanilla 750ml', 'img' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 'buy' => 85000, 'sell' => 0, 'unit' => 'bottle'],
            ['name' => 'Caramel Sauce', 'desc' => 'Saus caramel 500ml', 'img' => 'https://images.unsplash.com/photo-1558618896-e76237e21142?w=400', 'buy' => 65000, 'sell' => 0, 'unit' => 'bottle'],
            ['name' => 'Matcha Powder', 'desc' => 'Bubuk matcha Jepang 100g', 'img' => 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400', 'buy' => 95000, 'sell' => 0, 'unit' => 'pack'],
            ['name' => 'Chocolate Powder', 'desc' => 'Bubuk cokelat premium 500g', 'img' => 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400', 'buy' => 45000, 'sell' => 0, 'unit' => 'pack'],
        ];

        foreach ($ingredients as $ing) {
            $products[] = [
                'category' => 'Ingredients', 'supplier' => 'Susu Murni',
                'barcode' => 'ING-' . str_pad($counter++, 3, '0', STR_PAD_LEFT),
                'title' => $ing['name'], 'description' => $ing['desc'],
                'buy_price' => $ing['buy'], 'sell_price' => $ing['sell'],
                'image' => $ing['img'], 'unit' => $ing['unit'], 'is_ingredient' => true,
            ];
        }

        // ========== RECIPES (Composite Products) ==========
        $recipes = [
            ['name' => 'Paket Kopi Susu', 'desc' => 'Resep: Espresso + Fresh Milk + Vanilla Syrup', 'img' => 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400', 'buy' => 8000, 'sell' => 25000],
            ['name' => 'Paket Matcha Milk', 'desc' => 'Resep: Matcha Powder + Fresh Milk', 'img' => 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400', 'buy' => 12000, 'sell' => 30000],
            ['name' => 'Paket Chocolate Milk', 'desc' => 'Resep: Chocolate Powder + Fresh Milk', 'img' => 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400', 'buy' => 10000, 'sell' => 26000],
            ['name' => 'Caramel Latte Combo', 'desc' => 'Resep: Coffee + Fresh Milk + Caramel Sauce', 'img' => 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400', 'buy' => 12000, 'sell' => 32000],
            ['name' => 'Fruit Bowl Mix', 'desc' => 'Resep: Campuran buah segar potong', 'img' => 'https://images.unsplash.com/photo-1564093497595-593b96d80180?w=400', 'buy' => 15000, 'sell' => 35000],
            ['name' => 'Green Smoothie', 'desc' => 'Resep: Matcha + Milk + Banana', 'img' => 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400', 'buy' => 14000, 'sell' => 32000],
            ['name' => 'Breakfast Combo', 'desc' => 'Resep: Croissant + Latte', 'img' => 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400', 'buy' => 20000, 'sell' => 45000],
            ['name' => 'Avocado Coffee', 'desc' => 'Resep: Alpukat + Espresso + Milk', 'img' => 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400', 'buy' => 18000, 'sell' => 38000],
        ];

        foreach ($recipes as $recipe) {
            $products[] = [
                'category' => 'Coffee', 'supplier' => 'Kopi Nusantara',
                'barcode' => 'REC-' . str_pad($counter++, 3, '0', STR_PAD_LEFT),
                'title' => $recipe['name'], 'description' => $recipe['desc'],
                'buy_price' => $recipe['buy'], 'sell_price' => $recipe['sell'],
                'image' => $recipe['img'], 'unit' => 'porsi', 'is_recipe' => true,
            ];
        }

        // Create all products
        $result = [];
        foreach ($products as $product) {
            $imageName = $this->downloadImage($product['image'], 'products', Str::slug($product['title']));
            
            $created = Product::create([
                'category_id' => $categories[$product['category']]->id,
                'supplier_id' => isset($product['supplier']) && $product['supplier'] ? ($suppliers[$product['supplier']]->id ?? null) : null,
                'barcode' => $product['barcode'],
                'title' => $product['title'],
                'description' => $product['description'],
                'buy_price' => $product['buy_price'],
                'sell_price' => $product['sell_price'],
                'unit' => $product['unit'] ?? 'pcs',
                'min_stock' => 5,
                'is_recipe' => $product['is_recipe'] ?? false,
                'is_supply' => $product['is_supply'] ?? false,
                'is_ingredient' => $product['is_ingredient'] ?? false,
                'image' => $imageName,
            ]);

            $result[$product['barcode']] = $created;
            $this->command->info("  ✓ {$product['title']}");
        }

        return $result;
    }

    private function seedStock(array $products, Warehouse $warehouse, Display $display): void
    {
        foreach ($products as $barcode => $product) {
            $warehouseQty = rand(50, 200);
            WarehouseStock::create([
                'warehouse_id' => $warehouse->id,
                'product_id' => $product->id,
                'quantity' => $warehouseQty,
            ]);

            if ($product->sell_price > 0) {
                $displayQty = rand(10, 50);
                DisplayStock::create([
                    'display_id' => $display->id,
                    'product_id' => $product->id,
                    'quantity' => $displayQty,
                ]);
            }
        }
    }

    private function downloadImage(string $url, string $folder, string $name): string
    {
        $filename = $name . '.jpg';
        $path = $folder . '/' . $filename;

        try {
            if (Storage::disk('public')->exists($path)) {
                return $filename;
            }

            $response = Http::timeout(10)->get($url);
            
            if ($response->successful()) {
                Storage::disk('public')->put($path, $response->body());
                return $filename;
            }
        } catch (\Exception $e) {
            $this->command->warn("  ⚠ Failed to download image for {$name}");
        }

        return 'placeholder.jpg';
    }
}
