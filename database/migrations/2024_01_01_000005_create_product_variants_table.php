<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Product Variants
        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->string('name'); // "Regular", "Large", "Extra Large"
            $table->string('sku')->nullable(); // Optional SKU per variant
            $table->decimal('buy_price', 12, 0)->default(0);
            $table->decimal('sell_price', 12, 0);
            $table->integer('sort_order')->default(0);
            $table->boolean('is_default')->default(false);
            $table->timestamps();
        });

        // Add foreign key to carts table
        Schema::table('carts', function (Blueprint $table) {
            $table->foreign('product_variant_id')
                ->references('id')
                ->on('product_variants')
                ->nullOnDelete();
        });

        // Product Variant Ingredients (for recipes with variants)
        Schema::create('product_variant_ingredients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_variant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('ingredient_id')->constrained('products')->cascadeOnDelete();
            $table->decimal('quantity', 10, 3)->default(1);
            $table->timestamps();

            $table->unique(['product_variant_id', 'ingredient_id'], 'pvi_variant_ingredient_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_variant_ingredients');
        
        Schema::table('carts', function (Blueprint $table) {
            $table->dropForeign(['product_variant_id']);
        });
        
        Schema::dropIfExists('product_variants');
    }
};
