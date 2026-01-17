<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('returns', function (Blueprint $table) {
            $table->id();
            $table->string('return_number')->unique();
            $table->foreignId('transaction_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained(); // User who created the return
            $table->foreignId('approved_by')->nullable()->constrained('users'); // Manager who approved
            $table->enum('return_type', ['refund', 'exchange', 'credit'])->default('refund');
            $table->enum('status', ['pending', 'approved', 'rejected', 'completed'])->default('pending');
            $table->decimal('return_amount', 15, 2)->default(0);
            $table->text('reason')->nullable();
            $table->text('rejection_note')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();
        });

        Schema::create('return_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('return_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->constrained();
            $table->string('variant_name')->nullable();
            $table->decimal('qty', 10, 3);
            $table->decimal('price', 15, 2);
            $table->decimal('subtotal', 15, 2);
            $table->text('condition_note')->nullable(); // Item condition on return
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('return_items');
        Schema::dropIfExists('returns');
    }
};
