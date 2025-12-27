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
        // Step 1: Drop the existing barcode unique index
        Schema::table('products', function (Blueprint $table) {
            $table->dropUnique(['barcode']);
        });

        // Step 2: Rename barcode column to sku
        Schema::table('products', function (Blueprint $table) {
            $table->renameColumn('barcode', 'sku');
        });

        // Step 3: Make sku nullable (ingredients and supplies don't need SKU)
        Schema::table('products', function (Blueprint $table) {
            $table->string('sku')->nullable()->change();
        });

        // Step 4: Add unique index to sku (allowing nulls)
        Schema::table('products', function (Blueprint $table) {
            $table->unique('sku');
        });

        // Step 5: Add new nullable barcode column with unique index
        Schema::table('products', function (Blueprint $table) {
            $table->string('barcode')->nullable()->unique()->after('sku');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remove barcode column
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('barcode');
        });

        // Drop sku unique index
        Schema::table('products', function (Blueprint $table) {
            $table->dropUnique(['sku']);
        });

        // Rename sku back to barcode
        Schema::table('products', function (Blueprint $table) {
            $table->renameColumn('sku', 'barcode');
        });

        // Re-add barcode unique index
        Schema::table('products', function (Blueprint $table) {
            $table->unique('barcode');
        });
    }
};
