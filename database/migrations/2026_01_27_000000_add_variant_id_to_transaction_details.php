<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('transaction_details', function (Blueprint $table) {
            // Add variant_id to track specific product variant (e.g. Size Large)
            // Nullable because not all products have variants
            $table->foreignId('product_variant_id')
                  ->nullable()
                  ->after('product_id')
                  ->constrained('product_variants')
                  ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('transaction_details', function (Blueprint $table) {
            $table->dropForeign(['product_variant_id']);
            $table->dropColumn('product_variant_id');
        });
    }
};
