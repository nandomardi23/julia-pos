<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Remove supplier_id from products table.
     * Supplier info moved to stock_movements for clean architecture.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // Drop foreign key constraint first
            $table->dropForeign(['supplier_id']);
            
            // Drop the column
            $table->dropColumn('supplier_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // Re-add supplier_id column
            $table->foreignId('supplier_id')
                ->nullable()
                ->after('category_id')
                ->constrained('suppliers')
                ->onDelete('set null');
        });
    }
};
