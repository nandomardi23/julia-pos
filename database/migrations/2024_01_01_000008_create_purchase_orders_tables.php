<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Purchase Orders
        Schema::create('purchase_orders', function (Blueprint $table) {
            $table->id();
            $table->string('po_number')->unique()->comment('Auto-generated PO number');
            $table->foreignId('supplier_id')->constrained('suppliers')->onDelete('restrict');
            $table->foreignId('warehouse_id')->constrained('warehouses')->onDelete('restrict');
            $table->enum('status', [
                'draft',      // PO newly created, editable
                'sent',       // PO sent to supplier
                'confirmed',  // Supplier confirmed
                'shipped',    // Items being shipped
                'partial',    // Partially received
                'received',   // Fully received
                'cancelled',  // PO cancelled
            ])->default('draft');
            $table->date('order_date')->comment('PO creation date');
            $table->date('expected_date')->nullable()->comment('Expected delivery date');
            $table->date('received_date')->nullable()->comment('Actual received date');
            $table->text('notes')->nullable()->comment('PO notes');
            $table->string('invoice_number')->nullable();
            $table->string('invoice_file')->nullable();
            $table->decimal('total_amount', 15, 2)->default(0)->comment('Total PO value');
            $table->foreignId('user_id')->constrained('users')->onDelete('restrict');
            $table->timestamps();
            
            // Indexes for faster queries
            $table->index('status');
            $table->index('order_date');
            $table->index('expected_date');
        });

        // Purchase Order Items
        Schema::create('purchase_order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('purchase_order_id')->constrained('purchase_orders')->onDelete('cascade');
            $table->foreignId('product_id')->constrained('products')->onDelete('restrict');
            $table->decimal('quantity_ordered', 10, 2)->comment('Quantity ordered');
            $table->decimal('quantity_received', 10, 2)->default(0)->comment('Quantity received');
            $table->decimal('unit_price', 15, 2)->comment('Unit price');
            $table->decimal('subtotal', 15, 2)->comment('quantity × price');
            $table->string('batch_number')->nullable()->comment('Product batch number');
            $table->date('expiry_date')->nullable()->comment('Expiry date');
            $table->text('notes')->nullable()->comment('Item notes');
            $table->timestamps();
            
            $table->index(['purchase_order_id', 'product_id']);
        });

        // Add purchase_order_id to stock_movements
        Schema::table('stock_movements', function (Blueprint $table) {
            $table->foreignId('purchase_order_id')->nullable()->after('receipt_id')
                ->constrained('purchase_orders')->onDelete('set null')
                ->comment('Reference to PO if from PO receipt');
        });
    }

    public function down(): void
    {
        Schema::table('stock_movements', function (Blueprint $table) {
            $table->dropForeign(['purchase_order_id']);
            $table->dropColumn('purchase_order_id');
        });
        
        Schema::dropIfExists('purchase_order_items');
        Schema::dropIfExists('purchase_orders');
    }
};
