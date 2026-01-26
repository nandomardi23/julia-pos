<?php

namespace Tests\Feature\Transactions;

use App\Models\Display;
use App\Models\DisplayStock;
use App\Models\Product;
use App\Models\ProductReturn;
use App\Models\Shift;
use App\Models\Transaction;
use App\Models\User;
use App\Services\ReturnService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReturnAndCreditTest extends TestCase
{
    use RefreshDatabase;

    protected $cashier;
    protected $customer;
    protected $manager;
    protected $product;
    protected $display;
    protected $shift;

    protected function setUp(): void
    {
        parent::setUp();

        // 1. Setup Cashier
        $this->cashier = User::create([
            'name' => 'Cashier Test',
            'email' => 'cashier@pos.com',
            'password' => bcrypt('password'),
        ]);

        // 2. Setup Customer
        $this->customer = User::create([
            'name' => 'Customer VIP',
            'email' => 'vip@customer.com',
            'password' => bcrypt('password'),
            'balance' => 0,
        ]);

        // 3. Setup Manager (Approver)
        $this->manager = User::create([
            'name' => 'Manager Test',
            'email' => 'manager@pos.com',
            'password' => bcrypt('password'),
        ]);

        // Permissions
        \Spatie\Permission\Models\Permission::create(['name' => 'transactions-access']);
        $this->cashier->givePermissionTo('transactions-access');
        $this->manager->givePermissionTo('transactions-access');

        // 4. Setup Product & Display
        $this->display = Display::create(['name' => 'Main Display', 'is_active' => true]);
        
        $category = \App\Models\Category::create(['name' => 'General', 'image' => 'def.jpg']);
        
        $this->product = Product::create([
            'title' => 'Expensive Item',
            'category_id' => $category->id,
            'price' => 50000,
            'sell_price' => 50000,
            'buy_price' => 40000,
            'stock' => 10,
            'unit' => 'pcs',
            'product_type' => 'product',
            'image' => 'def.jpg',
            'barcode' => '888888'
        ]);

        DisplayStock::create([
            'display_id' => $this->display->id,
            'product_id' => $this->product->id,
            'quantity' => 10,
        ]);

        // 5. Start Shift
        $this->shift = Shift::create([
            'user_id' => $this->cashier->id,
            'shift_number' => 'SFT-001',
            'started_at' => now(),
            'initial_petti_cash' => 100000,
            'status' => 'active'
        ]);
        
        // Also start shift for manager to approve returns
        Shift::create([
            'user_id' => $this->manager->id,
            'shift_number' => 'SFT-MGR-001',
            'started_at' => now(),
            'initial_petti_cash' => 0,
            'status' => 'active'
        ]);
    }

    /** @test */
    public function it_can_process_store_credit_return_for_registered_customer()
    {
        // 1. Create Initial Transaction (Linked to Customer)
        $transaction = Transaction::create([
            'cashier_id' => $this->cashier->id,
            'customer_id' => $this->customer->id,
            'shift_id' => $this->shift->id,
            'invoice' => 'TRX-CREDIT-001',
            'grand_total' => 50000,
            'discount' => 0,
            'tax' => 0,
            'cash' => 50000,
            'change' => 0,
            'payment_status' => 'paid',
            'payment_method' => 'cash',
        ]);

        // 2. Create Return Request
        $return = ProductReturn::create([
            'return_number' => 'RTN-001',
            'transaction_id' => $transaction->id,
            'user_id' => $this->cashier->id, // Created by cashier
            'return_type' => 'credit',
            'status' => 'pending',
            'return_amount' => 50000,
            'reason' => 'Defect',
        ]);
        
        // Add item to return
        $return->items()->create([
            'product_id' => $this->product->id,
            'qty' => 1,
            'price' => 50000,
            'subtotal' => 50000,
            'condition' => 'bad'
        ]);

        // 3. Approve Return (Trigger Service)
        $returnService = new ReturnService();
        $this->actingAs($this->manager); // Act as manager
        $returnService->approveReturn($return->id, $this->manager->id);

        // 4. Assertions
        
        // A. Customer Balance Updated
        $this->assertEquals(50000, $this->customer->fresh()->balance, 'Customer balance should increase by 50.000');

        // B. Negative Transaction Created
        $negativeTrx = Transaction::where('invoice', 'like', 'CRD-%')->first();
        $this->assertNotNull($negativeTrx, 'Negative transaction (CRD) should be created');
        $this->assertEquals(-50000, $negativeTrx->grand_total, 'Grand total should be negative');
        $this->assertEquals(0, $negativeTrx->cash, 'Cash should be 0 for credit return');
        $this->assertEquals($this->customer->id, $negativeTrx->customer_id, 'Negative transaction must belong to customer');

        // C. Stock Restored
        $this->assertDatabaseHas('display_stock', [
            'display_id' => $this->display->id,
            'product_id' => $this->product->id,
            'quantity' => 11 // 10 initial - 0 sold (mocked) + 1 returned = 11? 
                             // Wait, setup has 10. We didn't actually deduct in step 1 (manual create).
                             // So it should be 10 + 1 = 11. Correct.
        ]);
    }

    /** @test */
    public function it_fails_store_credit_if_transaction_has_no_customer()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Transaksi tidak memiliki data pelanggan');

        // 1. Anonymous Transaction
        $transaction = Transaction::create([
            'cashier_id' => $this->cashier->id,
            'customer_id' => null, // ANONYMOUS
            'shift_id' => $this->shift->id,
            'invoice' => 'TRX-ANON-001',
            'grand_total' => 50000,
            'discount' => 0,
            'tax' => 0,
            'cash' => 50000,
            'change' => 0,
            'payment_status' => 'paid',
        ]);

        // 2. Create Return Request
        $return = ProductReturn::create([
            'return_number' => 'RTN-002',
            'transaction_id' => $transaction->id,
            'user_id' => $this->cashier->id,
            'return_type' => 'credit', // STORE CREDIT
            'status' => 'pending',
            'return_amount' => 50000,
            'return_amount' => 50000,
        ]);
        
        
        $return->items()->create(['product_id' => $this->product->id, 'qty' => 1, 'price' => 50000, 'subtotal' => 50000]);

        // 3. Approve (Should Fail)
        $returnService = new ReturnService();
        $this->actingAs($this->manager);
        $returnService->approveReturn($return->id, $this->manager->id);
    }

    /** @test */
    public function it_can_process_cash_refund()
    {
        $transaction = Transaction::create([
            'cashier_id' => $this->cashier->id,
            'invoice' => 'TRX-REFUND-001',
            'grand_total' => 50000,
            'discount' => 0,
            'tax' => 0,
            'cash' => 50000,
            'change' => 0,
            'payment_status' => 'paid',
        ]);

        $return = ProductReturn::create([
            'return_number' => 'RTN-003',
            'transaction_id' => $transaction->id,
            'user_id' => $this->cashier->id,
            'return_type' => 'refund', // CASH REFUND
            'status' => 'pending',
            'return_amount' => 50000,
            'return_amount' => 50000,
        ]);
        
        $return->items()->create(['product_id' => $this->product->id, 'qty' => 1, 'price' => 50000, 'subtotal' => 50000]);

        $returnService = new ReturnService();
        $this->actingAs($this->manager);
        $returnService->approveReturn($return->id, $this->manager->id);

        // Assert Negative Transaction (Refund)
        $refundTrx = Transaction::where('invoice', 'like', 'REF-%')->first();
        $this->assertNotNull($refundTrx);
        $this->assertEquals(-50000, $refundTrx->grand_total);
        $this->assertEquals(-50000, $refundTrx->cash, 'Cash should be reduced (negative) for Refund');
        
        // Customer Balance should NOT change
        $this->assertEquals(0, $this->customer->balance);
    }
}
