<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Menambahkan kolom loss_amount untuk menyimpan nilai kerugian
     * saat stock out (barang rusak, expired, dll).
     */
    public function up(): void
    {
        Schema::table('stock_movements', function (Blueprint $table) {
            $table->decimal('loss_amount', 15, 2)->nullable()->after('quantity')
                ->comment('Kerugian = quantity * buy_price (untuk stock out)');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('stock_movements', function (Blueprint $table) {
            $table->dropColumn('loss_amount');
        });
    }
};
