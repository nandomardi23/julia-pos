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
        // Check if index exists before adding to prevent errors on re-run
        Schema::table('transaction_details', function (Blueprint $table) {
            // Index for product lookups (Top products report)
            $table->index('product_id', 'td_product_idx');
        });

        Schema::table('profits', function (Blueprint $table) {
            // Index for joining profits (Profit report)
            $table->index('transaction_id', 'profit_trx_idx');
        });

        Schema::table('carts', function (Blueprint $table) {
            // Index for faster cart lookups
            $table->index('product_id', 'cart_product_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transaction_details', function (Blueprint $table) {
            $table->dropIndex('td_product_idx');
        });

        Schema::table('profits', function (Blueprint $table) {
            $table->dropIndex('profit_trx_idx');
        });

        Schema::table('carts', function (Blueprint $table) {
            $table->dropIndex('cart_product_idx');
        });
    }
};
