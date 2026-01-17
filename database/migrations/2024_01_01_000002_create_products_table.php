<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->string('sku')->nullable()->unique();
            $table->string('barcode')->nullable()->unique();
            $table->string('image');
            $table->string('title');
            $table->text('description')->nullable();
            $table->bigInteger('buy_price');
            $table->decimal('average_cost', 15, 2)->default(0);
            $table->bigInteger('sell_price');
            $table->string('unit')->default('pcs');
            $table->decimal('min_stock', 10, 3)->default(0)->comment('Minimum stock for alert. 0 = no alert.');
            $table->string('product_type')->default('sellable'); // sellable, recipe, ingredient, supply
            $table->timestamps();

            // Performance indexes
            $table->index('product_type');
            $table->index('category_id');
        });

        // Product Ingredients (for recipes at PRODUCT level)
        Schema::create('product_ingredients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete(); // Recipe product
            $table->foreignId('ingredient_id')->constrained('products')->cascadeOnDelete(); // Ingredient
            $table->decimal('quantity', 10, 3); // Amount per 1 unit of recipe
            $table->timestamps();

            $table->unique(['product_id', 'ingredient_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_ingredients');
        Schema::dropIfExists('products');
    }
};
