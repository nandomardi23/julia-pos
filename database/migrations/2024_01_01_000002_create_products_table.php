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
            $table->foreignId('supplier_id')->nullable()->constrained()->nullOnDelete();
            $table->string('image');
            $table->string('barcode')->unique();
            $table->string('title');
            $table->text('description')->nullable();
            $table->bigInteger('buy_price');
            $table->bigInteger('sell_price');
            $table->string('unit')->default('pcs');
            $table->boolean('is_recipe')->default(false); // Produk komposit/resep
            $table->boolean('is_supply')->default(false); // Alat pendukung (cup, pipet, dll)
            $table->boolean('is_ingredient')->default(false); // Bahan baku
            $table->timestamps();
        });

        // Product Ingredients (untuk resep)
        Schema::create('product_ingredients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete(); // Produk utama (resep)
            $table->foreignId('ingredient_id')->constrained('products')->cascadeOnDelete(); // Bahan/ingredient
            $table->decimal('quantity', 10, 3); // Jumlah bahan per 1 produk
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
