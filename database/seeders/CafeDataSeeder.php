<?php

namespace Database\Seeders;

use App\Models\Cart;
use App\Models\Category;
use App\Models\Display;
use App\Models\DisplayStock;
use App\Models\Product;
use App\Models\ProductVariant;
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
    public function run(): void
    {
        $this->command->info('🧹 Cleaning up old data...');
        
        Schema::disableForeignKeyConstraints();
        Cart::truncate();
        TransactionDetail::truncate();
        Profit::truncate();
        Transaction::truncate();
        ProductVariant::truncate();
        DisplayStock::truncate();
        WarehouseStock::truncate();
        Product::truncate();
        Category::truncate();
        Supplier::truncate();
        Display::truncate();
        Warehouse::truncate();
        Schema::enableForeignKeyConstraints();

        Storage::disk('public')->makeDirectory('products');
        Storage::disk('public')->makeDirectory('category');

        $this->command->info('📦 Creating suppliers...');
        $suppliers = $this->seedSuppliers();

        $this->command->info('🏪 Creating warehouses & displays...');
        $warehouse = $this->seedWarehouse();
        $display = $this->seedDisplay();

        $this->command->info('📂 Creating categories...');
        $categories = $this->seedCategories();

        $this->command->info('☕ Creating products with variants...');
        $products = $this->seedProducts($categories, $suppliers);

        $this->command->info('📊 Adding stock...');
        $this->seedStock($products, $warehouse, $display);

        $this->command->info('✅ Cafe data seeded successfully!');
        $this->command->info('   Total products: ' . count($products));
    }

    private function seedSuppliers(): array
    {
        $suppliers = [
            ['name' => 'PT Kopi Nusantara', 'company' => 'Kopi Nusantara', 'phone' => '021-1234567', 'address' => 'Jakarta'],
            ['name' => 'CV Susu Murni', 'company' => 'Susu Murni', 'phone' => '022-9876543', 'address' => 'Bandung'],
            ['name' => 'UD Buah Segar', 'company' => 'Buah Segar', 'phone' => '021-5551234', 'address' => 'Jakarta'],
            ['name' => 'UD Packaging', 'company' => 'Packaging', 'phone' => '031-5556789', 'address' => 'Surabaya'],
        ];
        $result = [];
        foreach ($suppliers as $s) {
            $result[$s['company']] = Supplier::create($s);
        }
        return $result;
    }

    private function seedWarehouse(): Warehouse
    {
        return Warehouse::create(['name' => 'Gudang Utama', 'location' => 'Lantai Bawah', 'is_active' => true]);
    }

    private function seedDisplay(): Display
    {
        return Display::create(['name' => 'Counter Kasir', 'location' => 'Lantai 1', 'is_active' => true]);
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
        foreach ($categories as $c) {
            $imageName = $this->downloadImage($c['image'], 'category', Str::slug($c['name']));
            $result[$c['name']] = Category::create(['name' => $c['name'], 'image' => $imageName]);
        }
        return $result;
    }

    private function seedProducts(array $categories, array $suppliers): array
    {
        $products = [];
        $counter = 1;

        // ========== COFFEE with VARIANTS ==========
        $coffeeProducts = [
            ['name' => 'Espresso', 'img' => 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400', 
             'variants' => [['name' => 'Regular', 'buy' => 8000, 'sell' => 18000], ['name' => 'Double', 'buy' => 12000, 'sell' => 25000]]],
            ['name' => 'Americano', 'img' => 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400', 
             'variants' => [['name' => 'Regular', 'buy' => 10000, 'sell' => 22000], ['name' => 'Large', 'buy' => 12000, 'sell' => 26000], ['name' => 'Extra Large', 'buy' => 14000, 'sell' => 30000]]],
            ['name' => 'Caffe Latte', 'img' => 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400', 
             'variants' => [['name' => 'Regular', 'buy' => 12000, 'sell' => 28000], ['name' => 'Large', 'buy' => 15000, 'sell' => 33000], ['name' => 'Extra Large', 'buy' => 18000, 'sell' => 38000]]],
            ['name' => 'Cappuccino', 'img' => 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400', 
             'variants' => [['name' => 'Regular', 'buy' => 12000, 'sell' => 28000], ['name' => 'Large', 'buy' => 15000, 'sell' => 33000], ['name' => 'Extra Large', 'buy' => 18000, 'sell' => 38000]]],
            ['name' => 'Mocha', 'img' => 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400', 
             'variants' => [['name' => 'Regular', 'buy' => 14000, 'sell' => 30000], ['name' => 'Large', 'buy' => 17000, 'sell' => 36000]]],
            ['name' => 'Cold Brew', 'img' => 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400', 
             'variants' => [['name' => 'Regular', 'buy' => 15000, 'sell' => 28000], ['name' => 'Large', 'buy' => 18000, 'sell' => 34000]]],
        ];

        foreach ($coffeeProducts as $p) {
            $product = $this->createProductWithVariants($p, 'Coffee', $categories, $counter++);
            $products[$product->barcode] = $product;
        }

        // ========== NON-COFFEE with VARIANTS ==========
        $nonCoffeeProducts = [
            ['name' => 'Matcha Latte', 'img' => 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400', 
             'variants' => [['name' => 'Regular', 'buy' => 15000, 'sell' => 30000], ['name' => 'Large', 'buy' => 18000, 'sell' => 36000]]],
            ['name' => 'Thai Tea', 'img' => 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=400', 
             'variants' => [['name' => 'Regular', 'buy' => 10000, 'sell' => 25000], ['name' => 'Large', 'buy' => 13000, 'sell' => 30000]]],
            ['name' => 'Chocolate', 'img' => 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400', 
             'variants' => [['name' => 'Regular', 'buy' => 12000, 'sell' => 26000], ['name' => 'Large', 'buy' => 15000, 'sell' => 32000]]],
            ['name' => 'Green Tea', 'img' => 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400', 
             'variants' => [['name' => 'Regular', 'buy' => 8000, 'sell' => 18000], ['name' => 'Large', 'buy' => 10000, 'sell' => 22000]]],
        ];

        foreach ($nonCoffeeProducts as $p) {
            $product = $this->createProductWithVariants($p, 'Non-Coffee', $categories, $counter++);
            $products[$product->barcode] = $product;
        }

        // ========== JUS with VARIANTS ==========
        $jusProducts = [
            ['name' => 'Jus Jeruk', 'img' => 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400', 
             'variants' => [['name' => 'Regular', 'buy' => 10000, 'sell' => 22000], ['name' => 'Large', 'buy' => 13000, 'sell' => 28000]]],
            ['name' => 'Jus Apel', 'img' => 'https://images.unsplash.com/photo-1576673442511-7e39b6545c87?w=400', 
             'variants' => [['name' => 'Regular', 'buy' => 12000, 'sell' => 25000], ['name' => 'Large', 'buy' => 15000, 'sell' => 32000]]],
            ['name' => 'Jus Mangga', 'img' => 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400', 
             'variants' => [['name' => 'Regular', 'buy' => 12000, 'sell' => 25000], ['name' => 'Large', 'buy' => 15000, 'sell' => 32000]]],
            ['name' => 'Jus Alpukat', 'img' => 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400', 
             'variants' => [['name' => 'Regular', 'buy' => 15000, 'sell' => 30000], ['name' => 'Large', 'buy' => 18000, 'sell' => 38000]]],
        ];

        foreach ($jusProducts as $p) {
            // Jus adalah recipe karena dibuat dari buah segar
            $product = $this->createProductWithVariants($p, 'Jus', $categories, $counter++, true);
            $products[$product->barcode] = $product;
        }

        // ========== SALAD (no variants) ==========
        $salads = [
            ['name' => 'Caesar Salad', 'img' => 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400', 'buy' => 18000, 'sell' => 38000],
            ['name' => 'Garden Salad', 'img' => 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', 'buy' => 15000, 'sell' => 32000],
            ['name' => 'Fruit Salad', 'img' => 'https://images.unsplash.com/photo-1564093497595-593b96d80180?w=400', 'buy' => 18000, 'sell' => 35000],
        ];
        foreach ($salads as $s) {
            // Salad adalah recipe karena dibuat dari berbagai bahan
            $product = $this->createRecipeProduct($s, 'Salad', $categories, $counter++, 'porsi');
            $products[$product->barcode] = $product;
        }

        // ========== BUAH (no variants) ==========
        $buahs = [
            ['name' => 'Apel Fuji', 'img' => 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400', 'buy' => 12000, 'sell' => 25000],
            ['name' => 'Pisang', 'img' => 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400', 'buy' => 15000, 'sell' => 28000],
            ['name' => 'Jeruk', 'img' => 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400', 'buy' => 18000, 'sell' => 35000],
            ['name' => 'Anggur', 'img' => 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400', 'buy' => 25000, 'sell' => 45000],
        ];
        foreach ($buahs as $b) {
            $product = $this->createSimpleProduct($b, 'Buah', $categories, $counter++, 'pack');
            $products[$product->barcode] = $product;
        }

        // ========== SNACKS (no variants) ==========
        $snacks = [
            ['name' => 'Brownies', 'img' => 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400', 'buy' => 8000, 'sell' => 18000],
            ['name' => 'Cheesecake', 'img' => 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400', 'buy' => 15000, 'sell' => 30000],
            ['name' => 'Cookies', 'img' => 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400', 'buy' => 6000, 'sell' => 15000],
            ['name' => 'Croissant', 'img' => 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400', 'buy' => 12000, 'sell' => 25000],
        ];
        foreach ($snacks as $s) {
            // Snacks adalah recipe karena dibuat dari tepung, telur, dll
            $product = $this->createRecipeProduct($s, 'Snacks', $categories, $counter++, 'pcs');
            $products[$product->barcode] = $product;
        }

        // ========== SUPPLIES ==========
        $supplies = [
            ['name' => 'Cup Plastik 16oz', 'img' => 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=400', 'buy' => 500],
            ['name' => 'Cup Plastik 22oz', 'img' => 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=400', 'buy' => 700],
            ['name' => 'Sedotan', 'img' => 'https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=400', 'buy' => 50],
            ['name' => 'Lid Cup', 'img' => 'https://images.unsplash.com/photo-1571167530149-c1105da4c2c7?w=400', 'buy' => 200],
        ];
        foreach ($supplies as $s) {
            $imageName = $this->downloadImage($s['img'], 'products', Str::slug($s['name']));
            $product = Product::create([
                'category_id' => $categories['Supplies']->id,
                'barcode' => 'SUP-' . str_pad($counter++, 3, '0', STR_PAD_LEFT),
                'title' => $s['name'],
                'description' => $s['name'],
                'buy_price' => $s['buy'],
                'sell_price' => 0,
                'unit' => 'pcs',
                'min_stock' => 50,
                'product_type' => Product::TYPE_SUPPLY,
                'image' => $imageName,
            ]);
            $products[$product->barcode] = $product;
            $this->command->info("  ✓ {$s['name']}");
        }

        // ========== INGREDIENTS ==========
        $ingredients = [
            ['name' => 'Coffee Beans', 'img' => 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400', 'buy' => 150000, 'sell' => 220000, 'unit' => 'kg'],
            ['name' => 'Fresh Milk', 'img' => 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400', 'buy' => 18000, 'sell' => 25000, 'unit' => 'liter'],
            ['name' => 'Matcha Powder', 'img' => 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400', 'buy' => 95000, 'sell' => 0, 'unit' => 'pack'],
        ];
        foreach ($ingredients as $i) {
            $imageName = $this->downloadImage($i['img'], 'products', Str::slug($i['name']));
            $product = Product::create([
                'category_id' => $categories['Ingredients']->id,
                'barcode' => 'ING-' . str_pad($counter++, 3, '0', STR_PAD_LEFT),
                'title' => $i['name'],
                'description' => $i['name'],
                'buy_price' => $i['buy'],
                'sell_price' => $i['sell'],
                'unit' => $i['unit'],
                'min_stock' => 5,
                'product_type' => Product::TYPE_INGREDIENT,
                'image' => $imageName,
            ]);
            $products[$product->barcode] = $product;
            $this->command->info("  ✓ {$i['name']}");
        }

        return $products;
    }

    private function createProductWithVariants(array $data, string $category, array $categories, int $counter, bool $isRecipe = true): Product
    {
        $imageName = $this->downloadImage($data['img'], 'products', Str::slug($data['name']));
        $baseVariant = $data['variants'][0];
        
        $product = Product::create([
            'category_id' => $categories[$category]->id,
            'barcode' => substr($category, 0, 3) . '-' . str_pad($counter, 3, '0', STR_PAD_LEFT),
            'title' => $data['name'],
            'description' => $data['name'],
            'buy_price' => $baseVariant['buy'],
            'sell_price' => $baseVariant['sell'],
            'unit' => 'cup',
            'min_stock' => 5,
            'product_type' => $isRecipe ? Product::TYPE_RECIPE : Product::TYPE_SELLABLE,
            'image' => $imageName,
        ]);

        foreach ($data['variants'] as $i => $v) {
            ProductVariant::create([
                'product_id' => $product->id,
                'name' => $v['name'],
                'buy_price' => $v['buy'],
                'sell_price' => $v['sell'],
                'sort_order' => $i,
                'is_default' => $i === 0,
            ]);
        }

        $this->command->info("  ✓ {$data['name']} (" . count($data['variants']) . " variants)");
        return $product;
    }

    private function createSimpleProduct(array $data, string $category, array $categories, int $counter, string $unit): Product
    {
        $imageName = $this->downloadImage($data['img'], 'products', Str::slug($data['name']));
        
        $product = Product::create([
            'category_id' => $categories[$category]->id,
            'barcode' => substr($category, 0, 3) . '-' . str_pad($counter, 3, '0', STR_PAD_LEFT),
            'title' => $data['name'],
            'description' => $data['name'],
            'buy_price' => $data['buy'],
            'sell_price' => $data['sell'],
            'unit' => $unit,
            'min_stock' => 5,
            'product_type' => Product::TYPE_SELLABLE,
            'image' => $imageName,
        ]);

        $this->command->info("  ✓ {$data['name']}");
        return $product;
    }

    private function createRecipeProduct(array $data, string $category, array $categories, int $counter, string $unit): Product
    {
        $imageName = $this->downloadImage($data['img'], 'products', Str::slug($data['name']));
        
        $product = Product::create([
            'category_id' => $categories[$category]->id,
            'barcode' => substr($category, 0, 3) . '-' . str_pad($counter, 3, '0', STR_PAD_LEFT),
            'title' => $data['name'],
            'description' => $data['name'],
            'buy_price' => $data['buy'],
            'sell_price' => $data['sell'],
            'unit' => $unit,
            'min_stock' => 5,
            'product_type' => Product::TYPE_RECIPE,
            'image' => $imageName,
        ]);

        $this->command->info("  ✓ {$data['name']} (recipe)");
        return $product;
    }

    private function seedStock(array $products, Warehouse $warehouse, Display $display): void
    {
        foreach ($products as $product) {
            WarehouseStock::create(['warehouse_id' => $warehouse->id, 'product_id' => $product->id, 'quantity' => rand(50, 200)]);
            if ($product->sell_price > 0) {
                DisplayStock::create(['display_id' => $display->id, 'product_id' => $product->id, 'quantity' => rand(10, 50)]);
            }
        }
    }

    private function downloadImage(string $url, string $folder, string $name): string
    {
        $filename = $name . '.jpg';
        $path = $folder . '/' . $filename;
        try {
            if (Storage::disk('public')->exists($path)) return $filename;
            $response = Http::timeout(10)->get($url);
            if ($response->successful()) {
                Storage::disk('public')->put($path, $response->body());
                return $filename;
            }
        } catch (\Exception $e) {
            $this->command->warn("  ⚠ Failed: {$name}");
        }
        return 'placeholder.jpg';
    }
}
