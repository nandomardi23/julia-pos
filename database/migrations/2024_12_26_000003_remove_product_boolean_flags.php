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
        Schema::table('products', function (Blueprint $table) {
            // Remove duplicate boolean flags
            // We now only use product_type field
            $table->dropColumn(['is_recipe', 'is_supply', 'is_ingredient']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // Restore columns if needed for rollback
            $table->boolean('is_recipe')->default(false)->after('unit');
            $table->boolean('is_supply')->default(false)->after('is_recipe');
            $table->boolean('is_ingredient')->default(false)->after('is_supply');
        });
    }
};
