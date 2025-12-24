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
        // Create product_variants table
        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->string('name');                                    // "Regular", "Large", "Extra Large"
            $table->string('sku')->nullable();                         // Optional SKU per variant
            $table->decimal('buy_price', 12, 0)->default(0);           // Harga beli variant
            $table->decimal('sell_price', 12, 0);                      // Harga jual variant
            $table->integer('sort_order')->default(0);
            $table->boolean('is_default')->default(false);
            $table->timestamps();
        });

        // Add variant_id to carts
        Schema::table('carts', function (Blueprint $table) {
            $table->foreignId('product_variant_id')->nullable()->after('product_id')
                ->constrained('product_variants')->nullOnDelete();
        });

        // Add variant_name to transaction_details
        Schema::table('transaction_details', function (Blueprint $table) {
            $table->string('variant_name')->nullable()->after('product_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transaction_details', function (Blueprint $table) {
            $table->dropColumn('variant_name');
        });

        Schema::table('carts', function (Blueprint $table) {
            $table->dropForeign(['product_variant_id']);
            $table->dropColumn('product_variant_id');
        });

        Schema::dropIfExists('product_variants');
    }
};
