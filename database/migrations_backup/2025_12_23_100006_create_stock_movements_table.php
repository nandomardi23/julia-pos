<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stock_movements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            
            // Source: supplier, warehouse, display
            $table->string('from_type'); // 'supplier', 'warehouse', 'display'
            $table->unsignedBigInteger('from_id')->nullable();
            
            // Destination: warehouse, display, transaction
            $table->string('to_type'); // 'warehouse', 'display', 'transaction'
            $table->unsignedBigInteger('to_id')->nullable();
            
            $table->integer('quantity');
            $table->text('note')->nullable();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();

            // Indexes for faster queries
            $table->index(['from_type', 'from_id']);
            $table->index(['to_type', 'to_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_movements');
    }
};
