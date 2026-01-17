<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Warehouses
        Schema::create('warehouses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('location')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Displays
        Schema::create('displays', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('location')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Warehouse Stock
        Schema::create('warehouse_stock', function (Blueprint $table) {
            $table->id();
            $table->foreignId('warehouse_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->integer('quantity')->default(0);
            $table->timestamps();

            $table->unique(['warehouse_id', 'product_id']);
        });

        // Display Stock
        Schema::create('display_stock', function (Blueprint $table) {
            $table->id();
            $table->foreignId('display_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->integer('quantity')->default(0);
            $table->integer('min_stock')->default(0);
            $table->timestamps();

            $table->unique(['display_id', 'product_id']);
        });

        // Stock Movements
        Schema::create('stock_movements', function (Blueprint $table) {
            $table->id();
            $table->string('receipt_id')->nullable()->comment('Group ID for multi-item entry');
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->string('from_type'); // supplier, warehouse, display
            $table->unsignedBigInteger('from_id')->nullable();
            $table->foreignId('supplier_id')->nullable()->constrained()->nullOnDelete();
            $table->string('invoice_number')->nullable()->comment('Invoice number from supplier');
            $table->string('batch_number')->nullable()->comment('Product batch number');
            $table->date('expiry_date')->nullable()->comment('Product expiry date');
            $table->string('to_type'); // warehouse, display, transaction, out
            $table->unsignedBigInteger('to_id')->nullable();
            $table->integer('quantity');
            $table->decimal('purchase_price', 15, 2)->nullable()->comment('Purchase price from supplier');
            $table->decimal('loss_amount', 15, 2)->nullable()->comment('Loss = quantity × buy_price (for stock out)');
            $table->text('note')->nullable();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->timestamps();

            // Indexes for faster queries
            $table->index('receipt_id');
            $table->index('invoice_number');
            $table->index('batch_number');
            $table->index('from_type');
            $table->index('to_type');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stock_movements');
        Schema::dropIfExists('display_stock');
        Schema::dropIfExists('warehouse_stock');
        Schema::dropIfExists('displays');
        Schema::dropIfExists('warehouses');
    }
};
