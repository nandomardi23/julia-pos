<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Mengubah kolom qty dari integer ke decimal untuk mendukung
     * quantity desimal seperti 0.5kg, 1.5 liter, dll.
     */
    public function up(): void
    {
        // Update carts table
        Schema::table('carts', function (Blueprint $table) {
            $table->decimal('qty', 10, 3)->change();
        });

        // Update transaction_details table
        Schema::table('transaction_details', function (Blueprint $table) {
            $table->decimal('qty', 10, 3)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert carts table
        Schema::table('carts', function (Blueprint $table) {
            $table->integer('qty')->change();
        });

        // Revert transaction_details table
        Schema::table('transaction_details', function (Blueprint $table) {
            $table->integer('qty')->change();
        });
    }
};
