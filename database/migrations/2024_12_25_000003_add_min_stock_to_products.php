<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Menambahkan kolom min_stock untuk mengatur stok minimum
     * yang akan memicu alert jika stok di bawah nilai ini.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->decimal('min_stock', 10, 3)->default(0)->after('unit')
                ->comment('Stok minimum untuk alert. 0 = tidak ada alert.');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('min_stock');
        });
    }
};
