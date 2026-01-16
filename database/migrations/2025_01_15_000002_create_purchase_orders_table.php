<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Tabel purchase_orders: Menyimpan data Purchase Order (PO)
     * Tabel purchase_order_items: Menyimpan detail item per PO
     */
    public function up(): void
    {
        // Tabel Purchase Orders
        Schema::create('purchase_orders', function (Blueprint $table) {
            $table->id();
            $table->string('po_number')->unique()->comment('Nomor PO unik (auto-generate)');
            $table->foreignId('supplier_id')->constrained('suppliers')->onDelete('restrict');
            $table->foreignId('warehouse_id')->constrained('warehouses')->onDelete('restrict');
            $table->enum('status', [
                'draft',      // PO baru dibuat, bisa diedit
                'sent',       // PO sudah dikirim ke supplier
                'confirmed',  // Supplier konfirmasi
                'shipped',    // Barang dalam pengiriman
                'partial',    // Sebagian barang diterima
                'received',   // Barang sudah diterima lengkap
                'cancelled',  // PO dibatalkan
            ])->default('draft');
            $table->date('order_date')->comment('Tanggal pembuatan PO');
            $table->date('expected_date')->nullable()->comment('Tanggal kedatangan yang diharapkan');
            $table->date('received_date')->nullable()->comment('Tanggal barang diterima');
            $table->text('notes')->nullable()->comment('Catatan PO');
            $table->decimal('total_amount', 15, 2)->default(0)->comment('Total nilai PO');
            $table->foreignId('user_id')->constrained('users')->onDelete('restrict');
            $table->timestamps();
            
            // Indexes for faster queries
            $table->index('status');
            $table->index('order_date');
            $table->index('expected_date');
        });

        // Tabel Purchase Order Items
        Schema::create('purchase_order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('purchase_order_id')->constrained('purchase_orders')->onDelete('cascade');
            $table->foreignId('product_id')->constrained('products')->onDelete('restrict');
            $table->decimal('quantity_ordered', 10, 2)->comment('Jumlah yang dipesan');
            $table->decimal('quantity_received', 10, 2)->default(0)->comment('Jumlah yang sudah diterima');
            $table->decimal('unit_price', 15, 2)->comment('Harga satuan');
            $table->decimal('subtotal', 15, 2)->comment('quantity × price');
            $table->string('batch_number')->nullable()->comment('Nomor batch produk');
            $table->date('expiry_date')->nullable()->comment('Tanggal kadaluarsa');
            $table->text('notes')->nullable()->comment('Catatan item');
            $table->timestamps();
            
            // Index for faster queries
            $table->index(['purchase_order_id', 'product_id']);
        });

        // Tambahkan kolom purchase_order_id ke stock_movements untuk referensi
        Schema::table('stock_movements', function (Blueprint $table) {
            $table->foreignId('purchase_order_id')->nullable()->after('receipt_id')
                ->constrained('purchase_orders')->onDelete('set null')
                ->comment('Referensi ke PO jika dari penerimaan PO');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('stock_movements', function (Blueprint $table) {
            $table->dropForeign(['purchase_order_id']);
            $table->dropColumn('purchase_order_id');
        });
        
        Schema::dropIfExists('purchase_order_items');
        Schema::dropIfExists('purchase_orders');
    }
};
