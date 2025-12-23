<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Carts (temporary cart for POS)
        Schema::create('carts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cashier_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->integer('qty');
            $table->bigInteger('price');
            $table->timestamps();
        });

        // Transactions
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cashier_id')->constrained('users');
            $table->string('invoice')->unique();
            $table->bigInteger('cash');
            $table->bigInteger('change');
            $table->bigInteger('discount')->default(0);
            $table->bigInteger('grand_total');
            $table->string('payment_method')->default('cash');
            $table->string('payment_status')->default('paid');
            $table->string('payment_reference')->nullable();
            $table->text('payment_url')->nullable();
            $table->timestamps();
        });

        // Transaction Details
        Schema::create('transaction_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transaction_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->constrained();
            $table->integer('qty');
            $table->bigInteger('price');
            $table->timestamps();
        });

        // Profits
        Schema::create('profits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transaction_id')->constrained()->cascadeOnDelete();
            $table->bigInteger('total');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profits');
        Schema::dropIfExists('transaction_details');
        Schema::dropIfExists('transactions');
        Schema::dropIfExists('carts');
    }
};
