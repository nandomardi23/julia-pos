<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('product_type')->default('sellable')->after('is_ingredient');
        });

        // Map existing data to new product_type
        DB::statement("UPDATE products SET product_type = 'recipe' WHERE is_recipe = 1");
        DB::statement("UPDATE products SET product_type = 'supply' WHERE is_supply = 1");
        DB::statement("UPDATE products SET product_type = 'ingredient' WHERE is_ingredient = 1 AND is_recipe = 0 AND is_supply = 0");
        DB::statement("UPDATE products SET product_type = 'sellable' WHERE is_recipe = 0 AND is_supply = 0 AND is_ingredient = 0");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('product_type');
        });
    }
};
