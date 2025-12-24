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
    }

    /**
     * Seed suppliers.
     */
    private function seedSuppliers(): array
    {
        $suppliers = [
            ['name' => 'PT Kopi Nusantara', 'company' => 'Kopi Nusantara', 'phone' => '021-1234567', 'address' => 'Jakarta Selatan'],
            ['name' => 'CV Susu Murni', 'company' => 'Susu Murni', 'phone' => '022-9876543', 'address' => 'Bandung'],
            ['name' => 'UD Packaging Jaya', 'company' => 'Packaging Jaya', 'phone' => '031-5556789', 'address' => 'Surabaya'],
        ];

        $result = [];
        foreach ($suppliers as $supplier) {
            $result[$supplier['company']] = Supplier::create($supplier);
        }

        return $result;
    }

    /**
     * Seed warehouse.
     */
    private function seedWarehouse(): Warehouse
    {
        return Warehouse::create([
            'name' => 'Gudang Utama',
            'location' => 'Lantai Bawah',
            'is_active' => true,
        ]);
    }

    /**
     * Seed display.
     */
    private function seedDisplay(): Display
    {
        return Display::create([
            'name' => 'Counter Kasir',
            'location' => 'Lantai 1',
            'is_active' => true,
        ]);
    }

    /**
     * Seed categories with images.
     */
    private function seedCategories(): array
    {
        $categories = [
            ['name' => 'Coffee', 'image' => 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400'],
            ['name' => 'Non-Coffee', 'image' => 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'],
            ['name' => 'Food', 'image' => 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400'],
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

    /**
     * Seed products with realistic images.
     */
    private function seedProducts(array $categories, array $suppliers): array
    {
        $products = [
            // Coffee drinks
            [
                'category' => 'Coffee',
                'supplier' => 'Kopi Nusantara',
                'barcode' => 'COF-001',
                'title' => 'Espresso',
                'description' => 'Espresso shot murni dengan crema tebal',
                'buy_price' => 8000,
                'sell_price' => 18000,
                'image' => 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400',
            ],
            [
                'category' => 'Coffee',
                'supplier' => 'Kopi Nusantara',
                'barcode' => 'COF-002',
                'title' => 'Americano',
                'description' => 'Espresso dengan air panas',
                'buy_price' => 10000,
                'sell_price' => 22000,
                'image' => 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400',
            ],
            [
                'category' => 'Coffee',
                'supplier' => 'Kopi Nusantara',
                'barcode' => 'COF-003',
                'title' => 'Caffe Latte',
                'description' => 'Espresso dengan steamed milk dan foam tipis',
                'buy_price' => 12000,
                'sell_price' => 28000,
                'image' => 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400',
            ],
            [
                'category' => 'Coffee',
                'supplier' => 'Kopi Nusantara',
                'barcode' => 'COF-004',
                'title' => 'Cappuccino',
                'description' => 'Espresso dengan steamed milk dan foam tebal',
                'buy_price' => 12000,
                'sell_price' => 28000,
                'image' => 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
            ],
            [
                'category' => 'Coffee',
                'supplier' => 'Kopi Nusantara',
                'barcode' => 'COF-005',
                'title' => 'Caramel Macchiato',
                'description' => 'Vanilla latte dengan caramel drizzle',
                'buy_price' => 15000,
                'sell_price' => 32000,
                'image' => 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400',
            ],
            [
                'category' => 'Coffee',
                'supplier' => 'Kopi Nusantara',
                'barcode' => 'COF-006',
                'title' => 'Mocha',
                'description' => 'Espresso dengan cokelat dan susu',
                'buy_price' => 14000,
                'sell_price' => 30000,
                'image' => 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400',
            ],
            [
                'category' => 'Coffee',
                'supplier' => 'Kopi Nusantara',
                'barcode' => 'COF-007',
                'title' => 'Cold Brew',
                'description' => 'Kopi seduh dingin 12 jam',
                'buy_price' => 15000,
                'sell_price' => 28000,
                'image' => 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
            ],
            [
                'category' => 'Coffee',
                'supplier' => 'Kopi Nusantara',
                'barcode' => 'COF-008',
                'title' => 'Affogato',
                'description' => 'Espresso panas disiram ke ice cream vanilla',
                'buy_price' => 18000,
                'sell_price' => 35000,
                'image' => 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=400',
            ],

            // Non-Coffee drinks
            [
                'category' => 'Non-Coffee',
                'supplier' => 'Susu Murni',
                'barcode' => 'NCF-001',
                'title' => 'Matcha Latte',
                'description' => 'Japanese matcha dengan susu',
                'buy_price' => 15000,
                'sell_price' => 30000,
                'image' => 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400',
            ],
            [
                'category' => 'Non-Coffee',
                'supplier' => 'Susu Murni',
                'barcode' => 'NCF-002',
                'title' => 'Thai Tea',
                'description' => 'Thai tea original dengan susu',
                'buy_price' => 10000,
                'sell_price' => 25000,
                'image' => 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=400',
            ],
            [
                'category' => 'Non-Coffee',
                'supplier' => 'Susu Murni',
                'barcode' => 'NCF-003',
                'title' => 'Chocolate',
                'description' => 'Hot/iced chocolate dengan susu',
                'buy_price' => 12000,
                'sell_price' => 26000,
                'image' => 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400',
            ],
            [
                'category' => 'Non-Coffee',
                'supplier' => 'Susu Murni',
                'barcode' => 'NCF-004',
                'title' => 'Red Velvet Latte',
                'description' => 'Red velvet dengan cream cheese foam',
                'buy_price' => 14000,
                'sell_price' => 28000,
                'image' => 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400',
            ],
            [
                'category' => 'Non-Coffee',
                'supplier' => 'Susu Murni',
                'barcode' => 'NCF-005',
                'title' => 'Taro Latte',
                'description' => 'Taro dengan susu',
                'buy_price' => 13000,
                'sell_price' => 27000,
                'image' => 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400',
            ],
            [
                'category' => 'Non-Coffee',
                'supplier' => 'Susu Murni',
                'barcode' => 'NCF-006',
                'title' => 'Lemon Tea',
                'description' => 'Teh lemon segar',
                'buy_price' => 8000,
                'sell_price' => 20000,
                'image' => 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
            ],

            // Food
            [
                'category' => 'Food',
                'supplier' => null,
                'barcode' => 'FOD-001',
                'title' => 'French Fries',
                'description' => 'Kentang goreng crispy',
                'buy_price' => 10000,
                'sell_price' => 22000,
                'image' => 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
            ],
            [
                'category' => 'Food',
                'supplier' => null,
                'barcode' => 'FOD-002',
                'title' => 'Chicken Wings',
                'description' => 'Sayap ayam goreng dengan saus',
                'buy_price' => 18000,
                'sell_price' => 35000,
                'image' => 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400',
            ],
            [
                'category' => 'Food',
                'supplier' => null,
                'barcode' => 'FOD-003',
                'title' => 'Club Sandwich',
                'description' => 'Sandwich triple layer dengan ayam dan bacon',
                'buy_price' => 20000,
                'sell_price' => 38000,
                'image' => 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400',
            ],
            [
                'category' => 'Food',
                'supplier' => null,
                'barcode' => 'FOD-004',
                'title' => 'Beef Burger',
                'description' => 'Burger daging sapi dengan keju',
                'buy_price' => 25000,
                'sell_price' => 45000,
                'image' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
            ],
            [
                'category' => 'Food',
                'supplier' => null,
                'barcode' => 'FOD-005',
                'title' => 'Croissant',
                'description' => 'Croissant butter fresh',
                'buy_price' => 12000,
                'sell_price' => 25000,
                'image' => 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
            ],
            [
                'category' => 'Food',
                'supplier' => null,
                'barcode' => 'FOD-006',
                'title' => 'Toast & Eggs',
                'description' => 'Roti panggang dengan telur',
                'buy_price' => 15000,
                'sell_price' => 28000,
                'image' => 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400',
            ],

            // Snacks
            [
                'category' => 'Snacks',
                'supplier' => null,
                'barcode' => 'SNK-001',
                'title' => 'Brownies',
                'description' => 'Brownies cokelat fudgy',
                'buy_price' => 8000,
                'sell_price' => 18000,
                'image' => 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400',
            ],
            [
                'category' => 'Snacks',
                'supplier' => null,
                'barcode' => 'SNK-002',
                'title' => 'Cheesecake',
                'description' => 'New York cheesecake',
                'buy_price' => 15000,
                'sell_price' => 30000,
                'image' => 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400',
            ],
            [
                'category' => 'Snacks',
                'supplier' => null,
                'barcode' => 'SNK-003',
                'title' => 'Cookies',
                'description' => 'Chocolate chip cookies',
                'buy_price' => 6000,
                'sell_price' => 15000,
                'image' => 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400',
            ],
            [
                'category' => 'Snacks',
                'supplier' => null,
                'barcode' => 'SNK-004',
                'title' => 'Banana Bread',
                'description' => 'Roti pisang homemade',
                'buy_price' => 10000,
                'sell_price' => 22000,
                'image' => 'https://images.unsplash.com/photo-1605090930406-f7ae8b08cf95?w=400',
            ],

            // Supplies (is_supply = true)
            [
                'category' => 'Supplies',
                'supplier' => 'Packaging Jaya',
                'barcode' => 'SUP-001',
                'title' => 'Cup Plastik 16oz',
                'description' => 'Cup plastik untuk minuman dingin',
                'buy_price' => 500,
                'sell_price' => 0,
                'is_supply' => true,
                'image' => 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=400',
            ],
            [
                'category' => 'Supplies',
                'supplier' => 'Packaging Jaya',
                'barcode' => 'SUP-002',
                'title' => 'Cup Paper 12oz',
                'description' => 'Cup kertas untuk minuman panas',
                'buy_price' => 800,
                'sell_price' => 0,
                'is_supply' => true,
                'image' => 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400',
            ],
            [
                'category' => 'Supplies',
                'supplier' => 'Packaging Jaya',
                'barcode' => 'SUP-003',
                'title' => 'Sedotan',
                'description' => 'Sedotan plastik standar',
                'buy_price' => 50,
                'sell_price' => 0,
                'is_supply' => true,
                'image' => 'https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=400',
            ],
            [
                'category' => 'Supplies',
                'supplier' => 'Packaging Jaya',
                'barcode' => 'SUP-004',
                'title' => 'Lid Cup',
                'description' => 'Tutup cup plastik',
                'buy_price' => 200,
                'sell_price' => 0,
                'is_supply' => true,
                'image' => 'https://images.unsplash.com/photo-1571167530149-c1105da4c2c7?w=400',
            ],

            // Ingredients (is_ingredient = true)
            [
                'category' => 'Ingredients',
                'supplier' => 'Kopi Nusantara',
                'barcode' => 'ING-001',
                'title' => 'Coffee Beans (kg)',
                'description' => 'Biji kopi arabica premium',
                'buy_price' => 150000,
                'sell_price' => 0,
                'is_ingredient' => true,
                'unit' => 'kg',
                'image' => 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400',
            ],
            [
                'category' => 'Ingredients',
                'supplier' => 'Susu Murni',
                'barcode' => 'ING-002',
                'title' => 'Fresh Milk (liter)',
                'description' => 'Susu segar murni',
                'buy_price' => 18000,
                'sell_price' => 0,
                'is_ingredient' => true,
                'unit' => 'liter',
                'image' => 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
            ],
            [
                'category' => 'Ingredients',
                'supplier' => 'Susu Murni',
                'barcode' => 'ING-003',
                'title' => 'Vanilla Syrup (bottle)',
                'description' => 'Sirup vanilla 750ml',
                'buy_price' => 85000,
                'sell_price' => 0,
                'is_ingredient' => true,
                'unit' => 'bottle',
                'image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
            ],
            [
                'category' => 'Ingredients',
                'supplier' => 'Susu Murni',
                'barcode' => 'ING-004',
                'title' => 'Caramel Sauce (bottle)',
                'description' => 'Saus caramel 500ml',
                'buy_price' => 65000,
                'sell_price' => 0,
                'is_ingredient' => true,
                'unit' => 'bottle',
                'image' => 'https://images.unsplash.com/photo-1558618896-e76237e21142?w=400',
            ],
        ];

        $result = [];
        foreach ($products as $product) {
            $imageName = $this->downloadImage($product['image'], 'products', Str::slug($product['title']));
            
            $created = Product::create([
                'category_id' => $categories[$product['category']]->id,
                'supplier_id' => $product['supplier'] ? ($suppliers[$product['supplier']]->id ?? null) : null,
                'barcode' => $product['barcode'],
                'title' => $product['title'],
                'description' => $product['description'],
                'buy_price' => $product['buy_price'],
                'sell_price' => $product['sell_price'],
                'unit' => $product['unit'] ?? 'pcs',
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

    /**
     * Seed stock to warehouse and display.
     */
    private function seedStock(array $products, Warehouse $warehouse, Display $display): void
    {
        foreach ($products as $barcode => $product) {
            // Add warehouse stock
            $warehouseQty = rand(50, 200);
            WarehouseStock::create([
                'warehouse_id' => $warehouse->id,
                'product_id' => $product->id,
                'quantity' => $warehouseQty,
            ]);

            // Add display stock (only for sellable products)
            if ($product->sell_price > 0) {
                $displayQty = rand(10, 50);
                DisplayStock::create([
                    'display_id' => $display->id,
                    'product_id' => $product->id,
                    'quantity' => $displayQty,
                    'min_stock' => 5,
                ]);
            }
        }
    }

    /**
     * Download image from URL and save to storage.
     */
    private function downloadImage(string $url, string $folder, string $name): string
    {
        $filename = $name . '.jpg';
        $path = $folder . '/' . $filename;

        try {
            // Skip if already exists
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

        // Fallback to placeholder
        return 'placeholder.jpg';
    }
}
