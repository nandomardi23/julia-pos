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
            // Add supplier relationship
            $table->foreignId('supplier_id')->nullable()->after('category_id')->constrained('suppliers')->onDelete('set null');
            
            // Add product details
            $table->string('sku')->nullable()->after('barcode');
            $table->string('unit')->default('pcs')->after('stock');
            $table->integer('min_stock')->default(0)->after('unit');
            $table->date('expiry_date')->nullable()->after('min_stock');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['supplier_id']);
            $table->dropColumn(['supplier_id', 'sku', 'unit', 'min_stock', 'expiry_date']);
        });
    }
};
