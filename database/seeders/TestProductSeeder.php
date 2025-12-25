<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Display;
use App\Models\DisplayStock;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Warehouse;
use App\Models\WarehouseStock;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TestProductSeeder extends Seeder
{
    public function run(): void
    {
        $this->command->info('🧪 Creating test products...');

        Storage::disk('public')->makeDirectory('products');

        // Get or create category
        $category = Category::firstOrCreate(
            ['name' => 'Test Category'],
            ['image' => 'placeholder.jpg']
        );

        // Get warehouse and display
        $warehouse = Warehouse::first();
        $display = Display::first();

        $products = [];

        // ========== 3 SELLABLE PRODUCTS ==========
        $sellables = [
            ['title' => 'Roti Bakar', 'buy' => 8000, 'sell' => 15000, 'unit' => 'pcs', 'img' => 'https://images.unsplash.com/photo-1619535860434-cf8a064a8e1f?w=400'],
            ['title' => 'Teh Botol', 'buy' => 4000, 'sell' => 7000, 'unit' => 'botol', 'img' => 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'],
            ['title' => 'Keripik Singkong', 'buy' => 5000, 'sell' => 10000, 'unit' => 'pack', 'img' => 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400'],
        ];
        foreach ($sellables as $i => $s) {
            $imageName = $this->downloadImage($s['img'], 'products', Str::slug($s['title']));
            $products[] = Product::create([
                'barcode' => 'TST-SEL-' . str_pad($i + 1, 2, '0', STR_PAD_LEFT),
                'title' => $s['title'],
                'category_id' => $category->id,
                'buy_price' => $s['buy'],
                'sell_price' => $s['sell'],
                'unit' => $s['unit'],
                'image' => $imageName,
                'product_type' => Product::TYPE_SELLABLE,
                'is_recipe' => false,
                'is_supply' => false,
                'is_ingredient' => false,
            ]);
            $this->command->info("  ✓ Sellable: {$s['title']}");
        }

        // ========== 3 INGREDIENTS ==========
        $ingredients = [
            ['title' => 'Gula Pasir', 'buy' => 15000, 'sell' => 18000, 'unit' => 'kg', 'img' => 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400'],
            ['title' => 'Susu Cair', 'buy' => 12000, 'sell' => 15000, 'unit' => 'liter', 'img' => 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400'],
            ['title' => 'Bubuk Kopi', 'buy' => 80000, 'sell' => 100000, 'unit' => 'kg', 'img' => 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400'],
        ];
        foreach ($ingredients as $i => $ing) {
            $imageName = $this->downloadImage($ing['img'], 'products', Str::slug($ing['title']));
            $products[] = Product::create([
                'barcode' => 'TST-ING-' . str_pad($i + 1, 2, '0', STR_PAD_LEFT),
                'title' => $ing['title'],
                'category_id' => $category->id,
                'buy_price' => $ing['buy'],
                'sell_price' => $ing['sell'],
                'unit' => $ing['unit'],
                'image' => $imageName,
                'product_type' => Product::TYPE_INGREDIENT,
                'is_ingredient' => true,
                'is_recipe' => false,
                'is_supply' => false,
            ]);
            $this->command->info("  ✓ Ingredient: {$ing['title']}");
        }

        // ========== SUPPLIES (Including Cup R/L/XL) ==========
        $supplies = [
            ['title' => 'Cup Plastik R', 'buy' => 400, 'unit' => 'pcs', 'img' => 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=400'],
            ['title' => 'Cup Plastik L', 'buy' => 500, 'unit' => 'pcs', 'img' => 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=400'],
            ['title' => 'Cup Plastik XL', 'buy' => 600, 'unit' => 'pcs', 'img' => 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=400'],
            ['title' => 'Sedotan Plastik', 'buy' => 50, 'unit' => 'pcs', 'img' => 'https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=400'],
            ['title' => 'Tutup Cup', 'buy' => 100, 'unit' => 'pcs', 'img' => 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=400'],
        ];
        foreach ($supplies as $i => $sup) {
            $imageName = $this->downloadImage($sup['img'], 'products', Str::slug($sup['title']));
            $products[] = Product::create([
                'barcode' => 'TST-SUP-' . str_pad($i + 1, 2, '0', STR_PAD_LEFT),
                'title' => $sup['title'],
                'category_id' => $category->id,
                'buy_price' => $sup['buy'],
                'sell_price' => 0,
                'unit' => $sup['unit'],
                'image' => $imageName,
                'product_type' => Product::TYPE_SUPPLY,
                'is_supply' => true,
                'is_recipe' => false,
                'is_ingredient' => false,
            ]);
            $this->command->info("  ✓ Supply: {$sup['title']}");
        }

        // ========== 2 RECIPES ==========
        $recipes = [
            [
                'title' => 'Kopi Susu',
                'sell' => 18000,
                'img' => 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400',
                'variants' => [
                    ['name' => 'Regular', 'buy' => 8000, 'sell' => 18000],
                    ['name' => 'Large', 'buy' => 12000, 'sell' => 25000],
                ]
            ],
            [
                'title' => 'Es Susu Gula',
                'sell' => 15000,
                'img' => 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400',
                'variants' => [
                    ['name' => 'Regular', 'buy' => 6000, 'sell' => 15000],
                    ['name' => 'Large', 'buy' => 9000, 'sell' => 20000],
                ]
            ],
        ];
        foreach ($recipes as $i => $rec) {
            $imageName = $this->downloadImage($rec['img'], 'products', Str::slug($rec['title']));
            $product = Product::create([
                'barcode' => 'TST-RCP-' . str_pad($i + 1, 2, '0', STR_PAD_LEFT),
                'title' => $rec['title'],
                'category_id' => $category->id,
                'buy_price' => $rec['variants'][0]['buy'],
                'sell_price' => $rec['variants'][0]['sell'],
                'unit' => 'cup',
                'image' => $imageName,
                'product_type' => Product::TYPE_RECIPE,
                'is_recipe' => true,
                'is_supply' => false,
                'is_ingredient' => false,
            ]);
            $products[] = $product;

            // Create variants
            foreach ($rec['variants'] as $vi => $v) {
                ProductVariant::create([
                    'product_id' => $product->id,
                    'name' => $v['name'],
                    'buy_price' => $v['buy'],
                    'sell_price' => $v['sell'],
                    'sort_order' => $vi,
                    'is_default' => $vi === 0,
                ]);
            }
            $this->command->info("  ✓ Recipe: {$rec['title']} (" . count($rec['variants']) . " variants)");
        }

        // Add stock to warehouse and display
        if ($warehouse && $display) {
            $this->command->info('📦 Adding stock...');
            foreach ($products as $product) {
                // Recipe tidak masuk gudang - dibuat dari bahan baku
                if ($product->product_type === Product::TYPE_RECIPE) {
                    continue;
                }

                // Sellable, Ingredient, Supply masuk gudang
                WarehouseStock::firstOrCreate(
                    ['warehouse_id' => $warehouse->id, 'product_id' => $product->id],
                    ['quantity' => rand(20, 100)]
                );
                
                // Hanya sellable dan ingredient yang bisa dijual masuk display
                if ($product->sell_price > 0) {
                    DisplayStock::firstOrCreate(
                        ['display_id' => $display->id, 'product_id' => $product->id],
                        ['quantity' => rand(10, 30)]
                    );
                }
            }
        }

        $this->command->info('✅ Created 10 test products!');
        $this->command->info('   - 3 Sellable');
        $this->command->info('   - 3 Ingredients');
        $this->command->info('   - 2 Supplies');
        $this->command->info('   - 2 Recipes (with variants)');
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
            $this->command->warn("  ⚠ Failed to download: {$name}");
        }
        return 'placeholder.jpg';
    }
}
