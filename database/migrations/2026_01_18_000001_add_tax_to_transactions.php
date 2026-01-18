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
        Schema::table('transactions', function (Blueprint $table) {
            $table->decimal('ppn', 5, 2)->default(0)->after('discount'); // Persentase PPN (e.g., 12.00)
            $table->bigInteger('tax')->default(0)->after('ppn'); // Nilai Rupiah PPN
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropColumn(['ppn', 'tax']);
        });
    }
};
