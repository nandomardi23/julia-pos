<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * This table stores ingredients for recipe products at the PRODUCT level.
     * This is different from product_variant_ingredients which stores at VARIANT level.
     * 
     * For recipes WITHOUT variants, use this table.
     * For recipes WITH variants, use product_variant_ingredients.
     */
    public function up(): void
    {
        Schema::create('product_ingredients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete(); // The recipe product
            $table->foreignId('ingredient_id')->constrained('products')->cascadeOnDelete(); // The ingredient (bahan baku)
            $table->decimal('quantity', 10, 3); // Amount needed per 1 unit of recipe
            $table->timestamps();

            // Unique constraint: each ingredient can only appear once per product
            $table->unique(['product_id', 'ingredient_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_ingredients');
    }
};
