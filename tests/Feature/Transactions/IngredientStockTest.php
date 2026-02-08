<?php

namespace Tests\Feature\Transactions;

use App\Models\Cart;
use App\Models\Category;
use App\Models\Display;
use App\Models\DisplayStock;
use App\Models\Product;
use App\Models\ProductIngredient;
use App\Models\User;
use App\Models\Warehouse;
use App\Models\WarehouseStock;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;
use Tests\TestCase;

class IngredientStockTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Permission::firstOrCreate([
            'name' => 'transactions-access',
            'guard_name' => 'web',
        ]);
        
        // Ensure Display and Warehouse exist
        if (Display::count() === 0) {
            Display::create([
                'name' => 'Toko Utama',
                'location' => 'Depan',
                'is_active' => true,
            ]);
        }
        
        if (Warehouse::count() === 0) {
            Warehouse::create([
                'id' => 1,
                'name' => 'Gudang Utama',
                'location' => 'Belakang',
                'is_active' => true,
            ]);
        }
    }

    public function test_transaction_fails_if_ingredient_only_in_warehouse_without_fix(): void
    {
        // This test simulates the CURRENT broken behavior or the desired fixed behavior.
        // Let's write it to Expect Success if we are fixing it.
        
        $cashier = $this->createCashier();
        
        // 1. Create Ingredient (Bahan Baku)
        $ingredient = $this->createProduct('Bahan Baku', Product::TYPE_INGREDIENT);
        
        // Set Stock: 0 in Display, 100 in Warehouse
        $warehouse = Warehouse::first();
        $display = Display::first();
        
        WarehouseStock::updateOrCreate(
            ['warehouse_id' => $warehouse->id, 'product_id' => $ingredient->id],
            ['quantity' => 100]
        );
        
        DisplayStock::updateOrCreate(
            ['display_id' => $display->id, 'product_id' => $ingredient->id],
            ['quantity' => 0]
        );

        // 2. Create Recipe Product
        $recipeProduct = $this->createProduct('Kopi Susu', Product::TYPE_RECIPE);
        
        // Link Ingredient to Recipe (needs 10 units)
        ProductIngredient::create([
            'product_id' => $recipeProduct->id,
            'ingredient_id' => $ingredient->id,
            'quantity' => 10,
        ]);

        // 3. Add to Cart
        Cart::create([
            'cashier_id' => $cashier->id,
            'product_id' => $recipeProduct->id,
            'qty' => 1,
            'price' => $recipeProduct->sell_price,
        ]);

        // 4. Attempt Checkout
        $response = $this
            ->actingAs($cashier)
            ->post(route('transactions.store'), [
                'grand_total' => $recipeProduct->sell_price,
                'cash' => $recipeProduct->sell_price,
                'change' => 0,
                'payment_method' => 'cash',
            ]);

        // CURRENTLY: expect session error "Stok bahan tidak cukup"
        // DESIRED: Success
        // Let's assert what we expect AFTER fix.
        
        if (session('error')) {
             // If we haven't fixed it yet, this might fail or pass depending on assertion
             // For now, let's just dump session if it fails
        }

        $response->assertSessionHasNoErrors();
        $this->assertDatabaseHas('transactions', [
            'cashier_id' => $cashier->id,
        ]);
        
        // Verify Stock Deducted from Warehouse
        $this->assertEquals(90, $ingredient->refresh()->warehouse_stock, 'Warehouse stock should be reduced by 10');
    }

    protected function createCashier(): User
    {
        $user = User::factory()->create();
        $user->givePermissionTo('transactions-access');
        return $user;
    }

    protected function createProduct($title, $type): Product
    {
        $category = Category::firstOrCreate(['name' => 'General']);

        return Product::create([
            'category_id' => $category->id,
            'image' => 'product.png',
            'barcode' => 'BRCD-' . Str::upper(Str::random(10)),
            'title' => $title,
            'description' => 'Desc',
            'buy_price' => 1000,
            'sell_price' => 2000,
            'stock' => 0,
            'product_type' => $type, // ingredient or recipe
            'unit' => 'pcs',
            'tags' => [$type]
        ]);
    }
}
