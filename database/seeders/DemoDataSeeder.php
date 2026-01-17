<?php

namespace Database\Seeders;

use App\Models\Cart;
use App\Models\Category;
use App\Models\Display;
use App\Models\DisplayStock;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\ProductVariantIngredient;
use App\Models\Profit;
use App\Models\Supplier;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use App\Models\Warehouse;
use App\Models\WarehouseStock;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class DemoDataSeeder extends Seeder
{
    private array $ingredients = []; // Store ingredients for recipe linking

    public function run(): void
    {
        $this->command->info('🧹 Cleaning up old data...');
        
        Schema::disableForeignKeyConstraints();
        Cart::truncate();
        TransactionDetail::truncate();
        Profit::truncate();
        Transaction::truncate();
        ProductVariantIngredient::truncate();
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
        $this->seedSuppliers();

        $this->command->info('🏪 Creating warehouses & displays...');
        $warehouse = $this->seedWarehouse();
        $display = $this->seedDisplay();

        $this->command->info('📂 Creating categories...');
        $categories = $this->seedCategories();

        $this->command->info('🧪 Creating ingredients (bahan baku)...');
        $this->seedIngredients($categories, $warehouse, $display);

        $this->command->info('📦 Creating supplies (perlengkapan)...');
        $this->seedSupplies($categories, $warehouse);

        $this->command->info('🍎 Creating sellable products (produk jual langsung)...');
        $this->seedSellables($categories, $warehouse, $display);

        $this->command->info('☕ Creating recipes with variants & ingredients...');
        $this->seedRecipes($categories);

        $this->command->info('✅ Demo data seeded successfully!');
    }


    private function seedSuppliers(): void
    {
        $suppliers = [
            ['name' => 'PT Kopi Nusantara', 'company' => 'Kopi Nusantara', 'phone' => '021-1234567', 'address' => 'Jl. Kopi No. 1, Jakarta'],
            ['name' => 'CV Susu Murni', 'company' => 'Susu Murni', 'phone' => '022-9876543', 'address' => 'Jl. Susu No. 2, Bandung'],
            ['name' => 'UD Buah Segar', 'company' => 'Buah Segar', 'phone' => '021-5551234', 'address' => 'Pasar Induk, Jakarta'],
            ['name' => 'UD Packaging', 'company' => 'Packaging Jaya', 'phone' => '031-5556789', 'address' => 'Jl. Industri No. 5, Surabaya'],
        ];
        foreach ($suppliers as $s) {
            Supplier::create($s);
            $this->command->info("  ✓ {$s['name']}");
        }
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

    /**
     * INGREDIENTS - Bahan baku untuk resep
     * Masuk gudang DAN display (agar resep bisa dijual di POS)
     */
    private function seedIngredients(array $categories, Warehouse $warehouse, Display $display): void
    {
        $ingredients = [
            ['name' => 'Coffee Beans', 'img' => 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400', 'buy' => 150000, 'unit' => 'kg'],
            ['name' => 'Fresh Milk', 'img' => 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400', 'buy' => 18000, 'unit' => 'liter'],
            ['name' => 'Matcha Powder', 'img' => 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400', 'buy' => 95000, 'unit' => 'pack'],
            ['name' => 'Gula Pasir', 'img' => 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400', 'buy' => 15000, 'unit' => 'kg'],
            ['name' => 'Coklat Bubuk', 'img' => 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400', 'buy' => 45000, 'unit' => 'kg'],
            ['name' => 'Thai Tea Powder', 'img' => 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=400', 'buy' => 35000, 'unit' => 'pack'],
            ['name' => 'Jeruk Segar', 'img' => 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400', 'buy' => 25000, 'unit' => 'kg'],
            ['name' => 'Apel Segar', 'img' => 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400', 'buy' => 35000, 'unit' => 'kg'],
            ['name' => 'Mangga Segar', 'img' => 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400', 'buy' => 30000, 'unit' => 'kg'],
            ['name' => 'Es Batu', 'img' => 'https://images.unsplash.com/photo-1558624232-75ee22af7e67?w=400', 'buy' => 5000, 'unit' => 'pack'],
        ];

        foreach ($ingredients as $i => $ing) {
            $imageName = $this->downloadImage($ing['img'], 'products', Str::slug($ing['name']));
            $product = Product::create([
                'sku' => null, // Ingredients don't need SKU
                'title' => $ing['name'],
                'category_id' => $categories['Ingredients']->id,
                'buy_price' => $ing['buy'],
                'sell_price' => 0,
                'unit' => $ing['unit'],
                'min_stock' => 5,
                'image' => $imageName,
                'product_type' => Product::TYPE_INGREDIENT,
            ]);

            // Store for recipe linking
            $this->ingredients[$ing['name']] = $product;

            // Add to warehouse
            WarehouseStock::create([
                'warehouse_id' => $warehouse->id,
                'product_id' => $product->id,
                'quantity' => rand(20, 100),
            ]);

            // Add to display (for recipe availability check in POS)
            DisplayStock::create([
                'display_id' => $display->id,
                'product_id' => $product->id,
                'quantity' => rand(20, 100),
            ]);

            $this->command->info("  ✓ {$ing['name']}");
        }
    }

    /**
     * SUPPLIES - Perlengkapan operasional
     * Masuk gudang, sell_price = 0, TIDAK ke display
     */
    private function seedSupplies(array $categories, Warehouse $warehouse): void
    {
        $supplies = [
            ['name' => 'Cup Plastik R', 'img' => 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=400', 'buy' => 400],
            ['name' => 'Cup Plastik L', 'img' => 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=400', 'buy' => 500],
            ['name' => 'Cup Plastik XL', 'img' => 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=400', 'buy' => 600],
            ['name' => 'Sedotan', 'img' => 'https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=400', 'buy' => 50],
            ['name' => 'Lid Cup', 'img' => 'https://images.unsplash.com/photo-1571167530149-c1105da4c2c7?w=400', 'buy' => 200],
            ['name' => 'Tissue', 'img' => 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400', 'buy' => 100],
        ];

        foreach ($supplies as $i => $sup) {
            $imageName = $this->downloadImage($sup['img'], 'products', Str::slug($sup['name']));
            $product = Product::create([
                'sku' => null, // Supplies don't need SKU
                'title' => $sup['name'],
                'category_id' => $categories['Supplies']->id,
                'buy_price' => $sup['buy'],
                'sell_price' => 0,
                'unit' => 'pcs',
                'min_stock' => 50,
                'image' => $imageName,
                'product_type' => Product::TYPE_SUPPLY,
            ]);

            WarehouseStock::create([
                'warehouse_id' => $warehouse->id,
                'product_id' => $product->id,
                'quantity' => rand(100, 500),
            ]);

            $this->command->info("  ✓ {$sup['name']}");
        }
    }

    /**
     * SELLABLE - Produk jual langsung (bukan resep)
     * Masuk gudang DAN display
     */
    private function seedSellables(array $categories, Warehouse $warehouse, Display $display): void
    {
        $sellables = [
            ['name' => 'Pisang Cavendish', 'img' => 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400', 'buy' => 15000, 'sell' => 28000, 'unit' => 'sisir', 'cat' => 'Buah'],
            ['name' => 'Anggur Merah', 'img' => 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400', 'buy' => 45000, 'sell' => 75000, 'unit' => 'pack', 'cat' => 'Buah'],
            ['name' => 'Brownies Coklat', 'img' => 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400', 'buy' => 15000, 'sell' => 25000, 'unit' => 'box', 'cat' => 'Snacks'],
            ['name' => 'Cookies Oat', 'img' => 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400', 'buy' => 12000, 'sell' => 20000, 'unit' => 'pack', 'cat' => 'Snacks'],
        ];

        foreach ($sellables as $i => $s) {
            $imageName = $this->downloadImage($s['img'], 'products', Str::slug($s['name']));
            $product = Product::create([
                'sku' => strtoupper(substr($s['cat'], 0, 2)) . '-' . strtoupper(substr($s['name'], 0, 2)) . '-' . str_pad($i + 1, 3, '0', STR_PAD_LEFT),
                'title' => $s['name'],
                'category_id' => $categories[$s['cat']]->id,
                'buy_price' => $s['buy'],
                'sell_price' => $s['sell'],
                'unit' => $s['unit'],
                'min_stock' => 5,
                'image' => $imageName,
                'product_type' => Product::TYPE_SELLABLE,
            ]);

            WarehouseStock::create([
                'warehouse_id' => $warehouse->id,
                'product_id' => $product->id,
                'quantity' => rand(20, 50),
            ]);

            DisplayStock::create([
                'display_id' => $display->id,
                'product_id' => $product->id,
                'quantity' => rand(5, 20),
            ]);

            $this->command->info("  ✓ {$s['name']}");
        }
    }

    /**
     * RECIPES - Produk olahan dari bahan baku
     * TIDAK masuk gudang (stok dari bahan baku)
     * Memiliki variants dengan ingredients
     */
    private function seedRecipes(array $categories): void
    {
        $recipes = [
            // COFFEE
            [
                'name' => 'Espresso',
                'cat' => 'Coffee',
                'img' => 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400',
                'variants' => [
                    ['name' => 'Single', 'buy' => 5000, 'sell' => 15000, 'ingredients' => [
                        ['name' => 'Coffee Beans', 'qty' => 0.018], // 18 gram
                    ]],
                    ['name' => 'Double', 'buy' => 8000, 'sell' => 22000, 'ingredients' => [
                        ['name' => 'Coffee Beans', 'qty' => 0.036], // 36 gram
                    ]],
                ],
            ],
            [
                'name' => 'Caffe Latte',
                'cat' => 'Coffee',
                'img' => 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400',
                'variants' => [
                    ['name' => 'Regular', 'buy' => 8000, 'sell' => 22000, 'ingredients' => [
                        ['name' => 'Coffee Beans', 'qty' => 0.018],
                        ['name' => 'Fresh Milk', 'qty' => 0.15],
                        ['name' => 'Gula Pasir', 'qty' => 0.01],
                    ]],
                    ['name' => 'Large', 'buy' => 12000, 'sell' => 28000, 'ingredients' => [
                        ['name' => 'Coffee Beans', 'qty' => 0.025],
                        ['name' => 'Fresh Milk', 'qty' => 0.25],
                        ['name' => 'Gula Pasir', 'qty' => 0.015],
                    ]],
                ],
            ],
            [
                'name' => 'Cappuccino',
                'cat' => 'Coffee',
                'img' => 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
                'variants' => [
                    ['name' => 'Regular', 'buy' => 8000, 'sell' => 22000, 'ingredients' => [
                        ['name' => 'Coffee Beans', 'qty' => 0.018],
                        ['name' => 'Fresh Milk', 'qty' => 0.12],
                    ]],
                    ['name' => 'Large', 'buy' => 12000, 'sell' => 28000, 'ingredients' => [
                        ['name' => 'Coffee Beans', 'qty' => 0.025],
                        ['name' => 'Fresh Milk', 'qty' => 0.20],
                    ]],
                ],
            ],
            [
                'name' => 'Mocha',
                'cat' => 'Coffee',
                'img' => 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400',
                'variants' => [
                    ['name' => 'Regular', 'buy' => 10000, 'sell' => 26000, 'ingredients' => [
                        ['name' => 'Coffee Beans', 'qty' => 0.018],
                        ['name' => 'Fresh Milk', 'qty' => 0.15],
                        ['name' => 'Coklat Bubuk', 'qty' => 0.02],
                        ['name' => 'Gula Pasir', 'qty' => 0.015],
                    ]],
                    ['name' => 'Large', 'buy' => 14000, 'sell' => 32000, 'ingredients' => [
                        ['name' => 'Coffee Beans', 'qty' => 0.025],
                        ['name' => 'Fresh Milk', 'qty' => 0.25],
                        ['name' => 'Coklat Bubuk', 'qty' => 0.03],
                        ['name' => 'Gula Pasir', 'qty' => 0.02],
                    ]],
                ],
            ],

            // NON-COFFEE
            [
                'name' => 'Matcha Latte',
                'cat' => 'Non-Coffee',
                'img' => 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400',
                'variants' => [
                    ['name' => 'Regular', 'buy' => 12000, 'sell' => 28000, 'ingredients' => [
                        ['name' => 'Matcha Powder', 'qty' => 0.02],
                        ['name' => 'Fresh Milk', 'qty' => 0.20],
                        ['name' => 'Gula Pasir', 'qty' => 0.01],
                    ]],
                    ['name' => 'Large', 'buy' => 16000, 'sell' => 35000, 'ingredients' => [
                        ['name' => 'Matcha Powder', 'qty' => 0.03],
                        ['name' => 'Fresh Milk', 'qty' => 0.30],
                        ['name' => 'Gula Pasir', 'qty' => 0.015],
                    ]],
                ],
            ],
            [
                'name' => 'Thai Tea',
                'cat' => 'Non-Coffee',
                'img' => 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=400',
                'variants' => [
                    ['name' => 'Regular', 'buy' => 8000, 'sell' => 22000, 'ingredients' => [
                        ['name' => 'Thai Tea Powder', 'qty' => 0.025],
                        ['name' => 'Fresh Milk', 'qty' => 0.15],
                        ['name' => 'Gula Pasir', 'qty' => 0.02],
                        ['name' => 'Es Batu', 'qty' => 0.5],
                    ]],
                    ['name' => 'Large', 'buy' => 11000, 'sell' => 28000, 'ingredients' => [
                        ['name' => 'Thai Tea Powder', 'qty' => 0.035],
                        ['name' => 'Fresh Milk', 'qty' => 0.25],
                        ['name' => 'Gula Pasir', 'qty' => 0.03],
                        ['name' => 'Es Batu', 'qty' => 1],
                    ]],
                ],
            ],
            [
                'name' => 'Chocolate',
                'cat' => 'Non-Coffee',
                'img' => 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400',
                'variants' => [
                    ['name' => 'Regular', 'buy' => 9000, 'sell' => 24000, 'ingredients' => [
                        ['name' => 'Coklat Bubuk', 'qty' => 0.03],
                        ['name' => 'Fresh Milk', 'qty' => 0.20],
                        ['name' => 'Gula Pasir', 'qty' => 0.02],
                    ]],
                    ['name' => 'Large', 'buy' => 13000, 'sell' => 30000, 'ingredients' => [
                        ['name' => 'Coklat Bubuk', 'qty' => 0.045],
                        ['name' => 'Fresh Milk', 'qty' => 0.30],
                        ['name' => 'Gula Pasir', 'qty' => 0.03],
                    ]],
                ],
            ],

            // JUS
            [
                'name' => 'Jus Jeruk',
                'cat' => 'Jus',
                'img' => 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400',
                'variants' => [
                    ['name' => 'Regular', 'buy' => 8000, 'sell' => 18000, 'ingredients' => [
                        ['name' => 'Jeruk Segar', 'qty' => 0.3],
                        ['name' => 'Gula Pasir', 'qty' => 0.02],
                        ['name' => 'Es Batu', 'qty' => 0.5],
                    ]],
                    ['name' => 'Large', 'buy' => 12000, 'sell' => 25000, 'ingredients' => [
                        ['name' => 'Jeruk Segar', 'qty' => 0.5],
                        ['name' => 'Gula Pasir', 'qty' => 0.03],
                        ['name' => 'Es Batu', 'qty' => 1],
                    ]],
                ],
            ],
            [
                'name' => 'Jus Apel',
                'cat' => 'Jus',
                'img' => 'https://images.unsplash.com/photo-1576673442511-7e39b6545c87?w=400',
                'variants' => [
                    ['name' => 'Regular', 'buy' => 10000, 'sell' => 22000, 'ingredients' => [
                        ['name' => 'Apel Segar', 'qty' => 0.25],
                        ['name' => 'Gula Pasir', 'qty' => 0.015],
                        ['name' => 'Es Batu', 'qty' => 0.5],
                    ]],
                    ['name' => 'Large', 'buy' => 14000, 'sell' => 28000, 'ingredients' => [
                        ['name' => 'Apel Segar', 'qty' => 0.4],
                        ['name' => 'Gula Pasir', 'qty' => 0.02],
                        ['name' => 'Es Batu', 'qty' => 1],
                    ]],
                ],
            ],
            [
                'name' => 'Jus Mangga',
                'cat' => 'Jus',
                'img' => 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400',
                'variants' => [
                    ['name' => 'Regular', 'buy' => 10000, 'sell' => 22000, 'ingredients' => [
                        ['name' => 'Mangga Segar', 'qty' => 0.25],
                        ['name' => 'Fresh Milk', 'qty' => 0.05],
                        ['name' => 'Gula Pasir', 'qty' => 0.015],
                        ['name' => 'Es Batu', 'qty' => 0.5],
                    ]],
                    ['name' => 'Large', 'buy' => 14000, 'sell' => 28000, 'ingredients' => [
                        ['name' => 'Mangga Segar', 'qty' => 0.4],
                        ['name' => 'Fresh Milk', 'qty' => 0.1],
                        ['name' => 'Gula Pasir', 'qty' => 0.02],
                        ['name' => 'Es Batu', 'qty' => 1],
                    ]],
                ],
            ],
        ];

        $counter = 1;
        foreach ($recipes as $recipe) {
            $imageName = $this->downloadImage($recipe['img'], 'products', Str::slug($recipe['name']));
            $baseVariant = $recipe['variants'][0];

            // Create product
            $product = Product::create([
                'sku' => strtoupper(substr($recipe['cat'], 0, 2)) . '-' . strtoupper(substr(str_replace(' ', '', $recipe['name']), 0, 2)) . '-' . str_pad($counter++, 3, '0', STR_PAD_LEFT),
                'title' => $recipe['name'],
                'category_id' => $categories[$recipe['cat']]->id,
                'buy_price' => $baseVariant['buy'],
                'sell_price' => $baseVariant['sell'],
                'unit' => 'cup',
                'min_stock' => 0,
                'image' => $imageName,
                'product_type' => Product::TYPE_RECIPE,
            ]);

            // Create variants
            foreach ($recipe['variants'] as $vi => $v) {
                $variant = ProductVariant::create([
                    'product_id' => $product->id,
                    'name' => $v['name'],
                    'buy_price' => $v['buy'],
                    'sell_price' => $v['sell'],
                    'sort_order' => $vi,
                    'is_default' => $vi === 0,
                ]);

                // Create variant ingredients
                foreach ($v['ingredients'] as $ing) {
                    if (isset($this->ingredients[$ing['name']])) {
                        ProductVariantIngredient::create([
                            'product_variant_id' => $variant->id,
                            'ingredient_id' => $this->ingredients[$ing['name']]->id,
                            'quantity' => $ing['qty'],
                        ]);
                    }
                }
            }

            $ingredientCount = count($recipe['variants'][0]['ingredients']);
            $this->command->info("  ✓ {$recipe['name']} (" . count($recipe['variants']) . " variants, {$ingredientCount} ingredients each)");
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
