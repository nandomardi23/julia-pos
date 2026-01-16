<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Menambahkan kolom baru untuk fitur enhanced stock movement:
     * - invoice_number: Nomor faktur dari supplier
     * - batch_number: Nomor batch produk
     * - expiry_date: Tanggal kadaluarsa
     * - receipt_id: Group ID untuk multi-item entry
     */
    public function up(): void
    {
        Schema::table('stock_movements', function (Blueprint $table) {
            $table->string('invoice_number')->nullable()->after('supplier_id')
                ->comment('Nomor faktur dari supplier');
            $table->string('batch_number')->nullable()->after('invoice_number')
                ->comment('Nomor batch produk');
            $table->date('expiry_date')->nullable()->after('batch_number')
                ->comment('Tanggal kadaluarsa produk');
            $table->string('receipt_id')->nullable()->after('id')
                ->comment('Group ID untuk multi-item entry');
            
            // Index for faster queries
            $table->index('receipt_id');
            $table->index('invoice_number');
            $table->index('batch_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('stock_movements', function (Blueprint $table) {
            $table->dropIndex(['receipt_id']);
            $table->dropIndex(['invoice_number']);
            $table->dropIndex(['batch_number']);
            $table->dropColumn(['invoice_number', 'batch_number', 'expiry_date', 'receipt_id']);
        });
    }
};
