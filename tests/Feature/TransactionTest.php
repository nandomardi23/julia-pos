<?php

namespace Tests\Feature;

use App\Models\Cart;
use App\Models\Display;
use App\Models\DisplayStock;
use App\Models\Product;
use App\Models\Shift;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TransactionTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // Seed permissions if needed, usually we can actAs user
        // Assuming user has permission or we can just make a superadmin
    }

    public function test_user_can_create_transaction_with_server_side_calculation()
    {
        // 1. Setup Data
        // Use manual creation for reliability if factories are missing
        $user = User::create([
            'name' => 'Test Cashier',
            'email' => 'cashier@test.com',
            'password' => bcrypt('password'),
        ]);

        // Setup Permissions
        \Spatie\Permission\Models\Permission::create(['name' => 'transactions-access']);
        $user->givePermissionTo('transactions-access');
        
        $display = Display::create([
            'name' => 'Main Display',
            'is_active' => true,
        ]);
        
        $category = \App\Models\Category::create([
            'name' => 'Test Category',
            'image' => 'default.jpg'
        ]);
        
        $product = Product::create([
            'title' => 'Test Product',
            'category_id' => $category->id,
            'price' => 10000, 
            'sell_price' => 10000,
            'buy_price' => 8000,
            'stock' => 100,
            'unit' => 'pcs',
            'product_type' => 'product',
            'image' => 'default.jpg',
            'barcode' => '123456789'
        ]);

        // Add stock to display
        DisplayStock::create([
            'display_id' => $display->id,
            'product_id' => $product->id,
            'quantity' => 100,
        ]);

        // Start Shift
        $shift = Shift::create([
            'user_id' => $user->id,
            'shift_number' => 'SFT-' . date('Ymd') . '-001',
            'started_at' => now(),
            'initial_petti_cash' => 100000,
        ]);

        // 2. Add to Cart
        Cart::create([
            'cashier_id' => $user->id,
            'product_id' => $product->id,
            'qty' => 2,
            'price' => 10000,
        ]);

        // 3. Perform Transaction Request
        // Intentionally send WRONG tax/total to test security
        $response = $this->actingAs($user)->post(route('pos.store'), [
            'payment_method' => 'cash',
            'grand_total' => 500, // FAKE TOTAL (Should be 20.000 + Tax)
            'discount' => 0,
            'cash' => 50000,
            'change' => 20000,
            'ppn' => 12, // 12%
            'tax' => 100, // FAKE TAX
        ]);

        // 4. Verification
        // 4. Verification
        $response->assertRedirect(route('pos.index'));
        $response->assertSessionHasNoErrors();
        $this->assertEquals(1, Transaction::count(), 'Transaction was not created in DB');

        $response->assertSessionHas('transaction');

        $transaction = Transaction::first();
        // Subtotal = 2 * 10.000 = 20.000
        // Discount = 0
        // Tax (12%) = 20.000 * 0.12 = 2.400
        // Grand Total = 22.400
        
        $this->assertEquals(22400, $transaction->grand_total, 'Grand total should be recalculated server-side');
        $this->assertEquals(2400, $transaction->tax, 'Tax should be recalculated server-side');
        $this->assertEquals(20000 + 2400, $transaction->grand_total);
        
        // Check Stock Deduction
        $this->assertDatabaseHas('display_stock', [
            'display_id' => $display->id,
            'product_id' => $product->id,
            'quantity' => 98, // 100 - 2
        ]);

        // Check Profit
        // Profit = (Sell - Buy) * Qty = (10000 - 8000) * 2 = 4000
        $this->assertDatabaseHas('profits', [
            'transaction_id' => $transaction->id,
            'total' => 4000,
        ]);
    }
}
