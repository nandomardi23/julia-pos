<?php

namespace Tests\Feature;

use App\Models\Cart;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TransactionTaxTest extends TestCase
{
    use RefreshDatabase;

    public function test_transaction_stores_tax_correctly()
    {
        // 1. Setup User
        $user = User::first();
        if (!$user) {
            $user = User::factory()->create();
        }
        
        // Setup permission
        $permission = \Spatie\Permission\Models\Permission::create(['name' => 'transactions-access', 'guard_name' => 'web']);
        $user->givePermissionTo($permission);
        
        $this->actingAs($user);

        // 2. Clear Carts
        Cart::truncate();

        // Create dependent models
        $category = \App\Models\Category::create([
            'name' => 'Test Category',
            'description' => 'Test Description',
            'image' => 'test.jpg'
        ]);

        $display = \App\Models\Display::first();
        if (!$display) {
            $display = \App\Models\Display::create([
                'name' => 'Store Display',
                'location' => 'Main Area'
            ]);
        }

        // 3. Setup Product
        $product = Product::first();
        if (!$product) {
            $product = Product::create([
                'image' => 'test.jpg',
                'barcode' => '12345678',
                'title' => 'Test Product',
                'description' => 'Test Description',
                'category_id' => $category->id,
                'buy_price' => 5000,
                'sell_price' => 10000,
            ]);
            
            // Create Display Stock
            \App\Models\DisplayStock::create([
                'display_id' => $display->id,
                'product_id' => $product->id,
                'quantity' => 100,
            ]);
        }

        // 4. Add to Cart
        $response = $this->withHeaders(['Referer' => route('pos.index')])
            ->post(route('pos.addToCart'), [
                'product_id' => $product->id,
                'qty' => 1,
            ]);

        $response->assertSessionHasNoErrors();
        $response->assertSessionHas('success');

        // 5. Calculate Expected Values
        // Price: product->sell_price
        // Discount: 0
        // Tax: 12%
        $price = $product->sell_price;
        $discount = 0;
        $taxPercent = 12;
        $taxAmount = round(($price - $discount) * ($taxPercent / 100));
        $grandTotal = $price - $discount + $taxAmount;

        // 6. Submit Transaction
        $response = $this->post(route('pos.store'), [
            'discount' => $discount,
            'grand_total' => $grandTotal,
            'cash' => $grandTotal, // Exact cash
            'change' => 0,
            'payment_method' => 'cash',
            // New fields
            'ppn' => $taxPercent,
            'tax' => $taxAmount,
        ]);

        $response->assertRedirect(route('pos.index'));
        $response->assertSessionHas('transaction');

        // 7. Verify Database
        $transaction = session('transaction');
        $this->assertNotNull($transaction);
        
        $dbTransaction = Transaction::find($transaction->id);
        $this->assertEquals($taxPercent, $dbTransaction->ppn);
        $this->assertEquals($taxAmount, $dbTransaction->tax);
        $this->assertEquals($grandTotal, $dbTransaction->grand_total);
    }
}
