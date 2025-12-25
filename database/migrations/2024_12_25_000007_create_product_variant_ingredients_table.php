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
        // Tabel untuk menyimpan ingredient per variant
        // Jika variant tidak memiliki ingredient sendiri, akan fall back ke product_ingredients
        Schema::create('product_variant_ingredients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_variant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('ingredient_id')->constrained('products')->cascadeOnDelete();
            $table->decimal('quantity', 10, 3)->default(1); // Jumlah ingredient per variant
            $table->timestamps();

            $table->unique(['product_variant_id', 'ingredient_id'], 'pvi_variant_ingredient_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_variant_ingredients');
    }
};
