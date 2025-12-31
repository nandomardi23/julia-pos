<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Display;
use App\Models\DisplayStock;
use App\Models\Product;
use App\Models\Warehouse;
use App\Models\WarehouseStock;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class MassProductSeeder extends Seeder
{
    private array $productImages = [
        'Coffee' => [
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
            'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400',
            'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400',
            'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
            'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400',
            'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
            'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400',
        ],
        'Jus' => [
            'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400',
            'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400',
            'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
            'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=400',
            'https://images.unsplash.com/photo-1570696516188-ade861b84a4e?w=400',
            'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400',
        ],
        'Buah' => [
            'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400',
            'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400',
            'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400',
            'https://images.unsplash.com/photo-1546173159-315724a31696?w=400',
            'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400',
            'https://images.unsplash.com/photo-1547514701-42782101795e?w=400',
            'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400',
            'https://images.unsplash.com/photo-1568702846914-96b305d2uj67?w=400',
        ],
        'Cake' => [
            'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
            'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400',
            'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400',
            'https://images.unsplash.com/photo-1586985289071-03e1b6b4a5cd?w=400',
            'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400',
            'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=400',
            'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400',
        ],
    ];

    private array $productNames = [
        'Coffee' => [
            'Espresso', 'Americano', 'Latte', 'Cappuccino', 'Mocha', 'Macchiato',
            'Affogato', 'Ristretto', 'Lungo', 'Cortado', 'Flat White', 'Cold Brew',
            'Irish Coffee', 'Vienna Coffee', 'Turkish Coffee', 'Greek Coffee',
            'Frappe', 'Mazagran', 'Kopi Tubruk', 'Kopi Susu', 'Es Kopi', 'Kopi Gula Aren',
            'Hazelnut Coffee', 'Vanilla Latte', 'Caramel Macchiato', 'Toffee Nut Latte',
            'Cinnamon Coffee', 'Mint Mocha', 'White Mocha', 'Honey Coffee',
        ],
        'Jus' => [
            'Jus Jeruk', 'Jus Apel', 'Jus Mangga', 'Jus Semangka', 'Jus Melon',
            'Jus Strawberry', 'Jus Alpukat', 'Jus Jambu', 'Jus Nanas', 'Jus Pepaya',
            'Jus Wortel', 'Jus Bayam', 'Jus Tomat', 'Jus Belimbing', 'Jus Sirsak',
            'Mixed Fruit Juice', 'Green Juice', 'Detox Juice', 'Energy Juice',
            'Jus Kedondong', 'Jus Markisa', 'Jus Kelapa', 'Jus Lemon', 'Jus Anggur',
        ],
        'Buah' => [
            'Apel Merah', 'Apel Hijau', 'Jeruk Manis', 'Jeruk Bali', 'Mangga Harum Manis',
            'Mangga Gedong', 'Pisang Cavendish', 'Pisang Raja', 'Anggur Merah', 'Anggur Hijau',
            'Semangka Merah', 'Melon Hijau', 'Melon Kuning', 'Pepaya California',
            'Salak Pondoh', 'Rambutan', 'Durian Monthong', 'Duku', 'Langsat', 'Kelengkeng',
            'Manggis', 'Sawo', 'Nangka', 'Cempedak', 'Kiwi', 'Pir', 'Plum', 'Persik',
            'Strawberry', 'Blueberry', 'Raspberry', 'Blackberry', 'Cherry', 'Nanas',
            'Jambu Biji', 'Jambu Air', 'Belimbing', 'Sirsak', 'Markisa', 'Alpukat',
        ],
        'Cake' => [
            'Chocolate Cake', 'Vanilla Cake', 'Red Velvet', 'Cheesecake', 'Tiramisu',
            'Black Forest', 'Opera Cake', 'Mille Crepes', 'Brownies', 'Lava Cake',
            'Carrot Cake', 'Lemon Cake', 'Coconut Cake', 'Pandan Cake', 'Marble Cake',
            'Sponge Cake', 'Pound Cake', 'Angel Food Cake', 'Chiffon Cake', 'Bundt Cake',
            'Mousse Cake', 'Fruit Cake', 'Coffee Cake', 'Banana Cake', 'Orange Cake',
            'Matcha Cake', 'Strawberry Cake', 'Mango Cake', 'Durian Cake', 'Taro Cake',
            'Cheese Tart', 'Egg Tart', 'Fruit Tart', 'Eclair', 'Croissant', 'Danish Pastry',
            'Cinnamon Roll', 'Donut', 'Churros', 'Macaron',
        ],
    ];

    private array $variants = ['Small', 'Medium', 'Large', 'Extra Large'];
    private array $adjectives = ['Premium', 'Special', 'Fresh', 'Organic', 'Deluxe', 'Classic', 'Original', 'Homemade', 'Artisan', 'Signature'];
    
    public function run(): void
    {
        Storage::disk('public')->makeDirectory('products');
        Storage::disk('public')->makeDirectory('category');

        $this->command->info('📂 Creating/Getting categories...');
        $categories = $this->getOrCreateCategories();

        $this->command->info('🏪 Getting warehouse & display...');
        $warehouse = Warehouse::first() ?? Warehouse::create(['name' => 'Gudang Utama', 'location' => 'Lantai Bawah', 'is_active' => true]);
        $display = Display::first() ?? Display::create(['name' => 'Counter Kasir', 'location' => 'Lantai 1', 'is_active' => true]);

        $this->command->info('📦 Creating 1000 products...');
        $this->createProducts($categories, $warehouse, $display);

        $this->command->info('✅ 1000 Products seeded successfully!');
    }

    private function getOrCreateCategories(): array
    {
        $categoryData = [
            'Coffee' => 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
            'Jus' => 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400',
            'Buah' => 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400',
            'Cake' => 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
        ];

        $result = [];
        foreach ($categoryData as $name => $imageUrl) {
            $category = Category::where('name', $name)->first();
            if (!$category) {
                $imageName = $this->downloadImage($imageUrl, 'category', Str::slug($name));
                $category = Category::create(['name' => $name, 'image' => $imageName]);
                $this->command->info("  ✓ Created category: {$name}");
            } else {
                $this->command->info("  ✓ Using existing category: {$name}");
            }
            $result[$name] = $category;
        }
        return $result;
    }

    private function createProducts(array $categories, Warehouse $warehouse, Display $display): void
    {
        $categoryNames = array_keys($categories);
        $productsPerCategory = 250; // 250 x 4 = 1000 products
        $counter = 0;

        foreach ($categoryNames as $categoryName) {
            $category = $categories[$categoryName];
            $baseNames = $this->productNames[$categoryName];
            $images = $this->productImages[$categoryName];

            $this->command->info("  📦 Creating {$productsPerCategory} products for {$categoryName}...");

            for ($i = 0; $i < $productsPerCategory; $i++) {
                $counter++;
                
                // Generate unique product name
                $baseName = $baseNames[array_rand($baseNames)];
                $adjective = $this->adjectives[array_rand($this->adjectives)];
                $variant = $this->variants[array_rand($this->variants)];
                $productName = "{$adjective} {$baseName} {$variant}";
                
                // Generate SKU with timestamp to ensure uniqueness
                $timestamp = now()->format('ymd');
                $randomStr = strtoupper(Str::random(4));
                $sku = strtoupper(substr($categoryName, 0, 2)) . '-' . $timestamp . '-' . $randomStr . '-' . str_pad($counter, 4, '0', STR_PAD_LEFT);
                
                // Generate prices based on category
                $priceMultiplier = match($categoryName) {
                    'Coffee' => rand(15, 45),
                    'Jus' => rand(12, 35),
                    'Buah' => rand(20, 80),
                    'Cake' => rand(25, 75),
                    default => rand(15, 50),
                };
                $buyPrice = $priceMultiplier * 1000;
                $sellPrice = $buyPrice * (1 + (rand(30, 80) / 100)); // 30-80% markup

                // Get random image
                $imageUrl = $images[array_rand($images)];
                $imageName = $this->downloadImage($imageUrl, 'products', Str::slug($productName . '-' . $counter));

                // Determine product type
                $productType = match($categoryName) {
                    'Buah' => Product::TYPE_SELLABLE,
                    'Cake' => Product::TYPE_SELLABLE,
                    default => Product::TYPE_RECIPE,
                };

                // Create product
                $product = Product::create([
                    'sku' => $sku,
                    'title' => $productName,
                    'category_id' => $category->id,
                    'buy_price' => $buyPrice,
                    'sell_price' => round($sellPrice / 1000) * 1000, // Round to nearest 1000
                    'unit' => match($categoryName) {
                        'Buah' => ['kg', 'pack', 'sisir', 'buah'][array_rand(['kg', 'pack', 'sisir', 'buah'])],
                        'Cake' => ['slice', 'box', 'pcs'][array_rand(['slice', 'box', 'pcs'])],
                        default => 'cup',
                    },
                    'min_stock' => rand(5, 20),
                    'image' => $imageName,
                    'product_type' => $productType,
                ]);

                // Add warehouse stock
                WarehouseStock::create([
                    'warehouse_id' => $warehouse->id,
                    'product_id' => $product->id,
                    'quantity' => rand(10, 100),
                ]);

                // Add display stock for sellable products
                if ($productType === Product::TYPE_SELLABLE) {
                    DisplayStock::create([
                        'display_id' => $display->id,
                        'product_id' => $product->id,
                        'quantity' => rand(5, 30),
                    ]);
                }

                // Progress indicator every 50 products
                if ($counter % 50 === 0) {
                    $this->command->info("    ✓ Created {$counter}/1000 products...");
                }
            }
        }
    }

    private function downloadImage(string $url, string $folder, string $name): string
    {
        $filename = substr($name, 0, 100) . '.jpg'; // Limit filename length
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
            // Silent fail, use placeholder
        }
        
        return 'placeholder.jpg';
    }
}
