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
        Schema::table('carts', function (Blueprint $table) {
            // Add composite index for cart lookup queries
            // This optimizes: Cart::where('cashier_id', ...)->where('product_id', ...)->where('product_variant_id', ...)
            $table->index(['cashier_id', 'product_id', 'product_variant_id'], 'carts_lookup_index');
        });

        Schema::table('transactions', function (Blueprint $table) {
            // Add index for date-based queries
            // This optimizes: Transaction::whereDate('created_at', ...)
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('carts', function (Blueprint $table) {
            $table->dropIndex('carts_lookup_index');
        });

        Schema::table('transactions', function (Blueprint $table) {
            $table->dropIndex(['created_at']);
        });
    }
};
