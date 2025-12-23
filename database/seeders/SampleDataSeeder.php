<?php

namespace Database\Seeders;

use App\Models\Cart;
use App\Models\Category;
use App\Models\Product;
use App\Models\Profit;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SampleDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();

        Cart::truncate();
        TransactionDetail::truncate();
        Profit::truncate();
        Transaction::truncate();
        Product::truncate();
        Category::truncate();

        Schema::enableForeignKeyConstraints();

        $placeholders = $this->ensurePlaceholderImages();

        $categories = $this->seedCategories($placeholders['category']);
        $products = $this->seedProducts($categories, $placeholders['product']);

        $this->seedTransactions($products);
    }

    /**
     * Ensure we have at least one placeholder image stored under the public disk.
     */
    private function ensurePlaceholderImages(): array
    {
        $source = public_path('assets/photo/auth.jpg');

        $categoryFile = 'sample-category.jpg';
        $productFile = 'sample-product.jpg';

        if (file_exists($source)) {
            if (!Storage::disk('public')->exists('category/' . $categoryFile)) {
                Storage::disk('public')->put('category/' . $categoryFile, file_get_contents($source));
            }

            if (!Storage::disk('public')->exists('products/' . $productFile)) {
                Storage::disk('public')->put('products/' . $productFile, file_get_contents($source));
            }
        }

        return [
            'category' => $categoryFile,
            'product' => $productFile,
        ];
    }

    /**
     * Seed master categories.
     */
    private function seedCategories(string $image): Collection
    {
        $categories = collect([
            ['name' => 'Beverages'],
            ['name' => 'Snacks'],
            ['name' => 'Fresh Produce'],
            ['name' => 'Household'],
            ['name' => 'Personal Care'],
        ]);

        return $categories
            ->map(fn ($category) => Category::create([
                'name' => $category['name'],
                'image' => $image,
            ]))
            ->keyBy('name');
    }

    /**
     * Seed master products.
     */
    private function seedProducts(Collection $categories, string $image): Collection
    {
        $products = collect([
            ['category' => 'Beverages', 'barcode' => 'BRG-0001', 'title' => 'Cold Brew Coffee 250ml', 'description' => 'Kopi Arabica rumahan dengan rasa manis alami.', 'buy_price' => 25000, 'sell_price' => 35000],
            ['category' => 'Beverages', 'barcode' => 'BRG-0002', 'title' => 'Thai Tea Literan', 'description' => 'Thai tea original dengan susu kental manis.', 'buy_price' => 30000, 'sell_price' => 42000],
            ['category' => 'Snacks', 'barcode' => 'BRG-0003', 'title' => 'Keripik Singkong Balado', 'description' => 'Keripik singkong renyah rasa balado pedas manis.', 'buy_price' => 12000, 'sell_price' => 18000],
            ['category' => 'Snacks', 'barcode' => 'BRG-0004', 'title' => 'Granola Bar Cokelat', 'description' => 'Granola bar sehat dengan kacang-kacangan premium.', 'buy_price' => 15000, 'sell_price' => 22000],
            ['category' => 'Fresh Produce', 'barcode' => 'BRG-0005', 'title' => 'Paket Salad Buah', 'description' => 'Campuran buah segar potong siap saji.', 'buy_price' => 20000, 'sell_price' => 32000],
            ['category' => 'Fresh Produce', 'barcode' => 'BRG-0006', 'title' => 'Sayur Organik Mix', 'description' => 'Paket kangkung, bayam, dan selada organik.', 'buy_price' => 18000, 'sell_price' => 27000],
            ['category' => 'Household', 'barcode' => 'BRG-0007', 'title' => 'Sabun Cair Lemon 1L', 'description' => 'Sabun cair anti bakteri aroma lemon segar.', 'buy_price' => 22000, 'sell_price' => 32000],
            ['category' => 'Household', 'barcode' => 'BRG-0008', 'title' => 'Tisu Dapur 2 Ply', 'description' => 'Tisu dapur serbaguna dua lapis.', 'buy_price' => 9000, 'sell_price' => 15000],
            ['category' => 'Personal Care', 'barcode' => 'BRG-0009', 'title' => 'Hand Sanitizer 250ml', 'description' => 'Hand sanitizer food grade non lengket.', 'buy_price' => 17000, 'sell_price' => 25000],
            ['category' => 'Personal Care', 'barcode' => 'BRG-0010', 'title' => 'Shampoo Botani 500ml', 'description' => 'Shampoo botani untuk semua jenis rambut.', 'buy_price' => 28000, 'sell_price' => 40000],
            // Supplies
            ['category' => 'Supplies', 'barcode' => 'SUP-0001', 'title' => 'Cup Plastik 16oz', 'description' => 'Cup plastik untuk minuman dingin.', 'buy_price' => 500, 'sell_price' => 0, 'is_supply' => true],
            ['category' => 'Supplies', 'barcode' => 'SUP-0002', 'title' => 'Pipet/Sedotan', 'description' => 'Sedotan plastik standar.', 'buy_price' => 100, 'sell_price' => 0, 'is_supply' => true],
            ['category' => 'Supplies', 'barcode' => 'SUP-0003', 'title' => 'Kantong Plastik Kecil', 'description' => 'Kantong plastik ukuran kecil.', 'buy_price' => 200, 'sell_price' => 0, 'is_supply' => true],
            // Ingredients
            ['category' => 'Fresh Produce', 'barcode' => 'ING-0001', 'title' => 'Apel Fuji (per kg)', 'description' => 'Apel fuji segar untuk jus.', 'buy_price' => 35000, 'sell_price' => 0, 'is_ingredient' => true, 'unit' => 'kg'],
            ['category' => 'Fresh Produce', 'barcode' => 'ING-0002', 'title' => 'Jeruk Manis (per kg)', 'description' => 'Jeruk manis segar untuk jus.', 'buy_price' => 25000, 'sell_price' => 0, 'is_ingredient' => true, 'unit' => 'kg'],
            // Recipe
            ['category' => 'Beverages', 'barcode' => 'RCP-0001', 'title' => 'Jus Mix Spesial', 'description' => 'Jus campuran apel dan jeruk segar.', 'buy_price' => 0, 'sell_price' => 25000, 'is_recipe' => true],
        ]);

        // Create Supplies category if not exists
        $suppliesCategory = \App\Models\Category::firstOrCreate(
            ['name' => 'Supplies'],
            ['image' => $image]
        );
        $categories->put('Supplies', $suppliesCategory);

        return $products
            ->map(function ($product) use ($categories, $image) {
                $category = $categories->get($product['category']);

                return Product::create([
                    'category_id' => $category?->id,
                    'image' => $image,
                    'barcode' => $product['barcode'],
                    'title' => $product['title'],
                    'description' => $product['description'],
                    'buy_price' => $product['buy_price'],
                    'sell_price' => $product['sell_price'],
                    'unit' => $product['unit'] ?? 'pcs',
                    'is_recipe' => $product['is_recipe'] ?? false,
                    'is_supply' => $product['is_supply'] ?? false,
                    'is_ingredient' => $product['is_ingredient'] ?? false,
                ]);
            })
            ->keyBy('barcode');
    }

    /**
     * Seed sample transactions.
     */
    private function seedTransactions(Collection $products): void
    {
        $cashier = User::where('email', 'cashier@gmail.com')->first() ?? User::first();

        if (!$cashier) {
            return;
        }

        $blueprints = [
            [
                'discount' => 5000,
                'cash' => 200000,
                'items' => [
                    ['barcode' => 'BRG-0001', 'qty' => 2],
                    ['barcode' => 'BRG-0003', 'qty' => 3],
                ],
            ],
            [
                'discount' => 0,
                'cash' => 150000,
                'items' => [
                    ['barcode' => 'BRG-0005', 'qty' => 2],
                    ['barcode' => 'BRG-0009', 'qty' => 1],
                ],
            ],
            [
                'discount' => 10000,
                'cash' => 180000,
                'items' => [
                    ['barcode' => 'BRG-0007', 'qty' => 2],
                    ['barcode' => 'BRG-0008', 'qty' => 4],
                    ['barcode' => 'BRG-0010', 'qty' => 1],
                ],
            ],
        ];

        foreach ($blueprints as $blueprint) {
            $items = collect($blueprint['items'])
                ->map(function ($item) use ($products) {
                    $product = $products->get($item['barcode']);

                    if (!$product) {
                        return null;
                    }

                    $lineTotal = $product->sell_price * $item['qty'];

                    return [
                        'product' => $product,
                        'qty' => $item['qty'],
                        'line_total' => $lineTotal,
                        'profit' => ($product->sell_price - $product->buy_price) * $item['qty'],
                    ];
                })
                ->filter();

            if ($items->isEmpty()) {
                continue;
            }

            $discount = max(0, $blueprint['discount']);
            $gross = $items->sum('line_total');
            $grandTotal = max(0, $gross - $discount);
            $cashPaid = max($grandTotal, $blueprint['cash']);
            $change = $cashPaid - $grandTotal;

            $transaction = Transaction::create([
                'cashier_id' => $cashier->id,
                'invoice' => 'TRX-' . Str::upper(Str::random(8)),
                'cash' => $cashPaid,
                'change' => $change,
                'discount' => $discount,
                'grand_total' => $grandTotal,
            ]);

            foreach ($items as $item) {
                $transaction->details()->create([
                    'product_id' => $item['product']->id,
                    'qty' => $item['qty'],
                    'price' => $item['line_total'],
                ]);

                $transaction->profits()->create([
                    'total' => $item['profit'],
                ]);
            }
        }
    }
}
