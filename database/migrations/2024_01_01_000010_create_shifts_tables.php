<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Shifts table - manage cashier shifts
        Schema::create('shifts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('shift_number', 50)->unique();
            $table->timestamp('started_at');
            $table->timestamp('ended_at')->nullable();
            $table->decimal('opening_cash', 15, 2)->default(0);
            $table->decimal('closing_cash', 15, 2)->nullable();
            $table->decimal('expected_cash', 15, 2)->nullable();
            $table->decimal('difference', 15, 2)->nullable();
            $table->enum('status', ['active', 'closed'])->default('active');
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->index(['user_id', 'status']);
            $table->index('started_at');
        });

        // Cash flows table - track cash in/out during shift
        Schema::create('cash_flows', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shift_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['in', 'out'])->comment('in = cash received, out = cash paid');
            $table->decimal('amount', 15, 2);
            $table->string('category', 100)->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
            
            $table->index(['shift_id', 'type']);
        });

        // Add foreign key for shift_id in transactions
        Schema::table('transactions', function (Blueprint $table) {
            $table->foreign('shift_id')
                ->references('id')
                ->on('shifts')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropForeign(['shift_id']);
        });
        
        Schema::dropIfExists('cash_flows');
        Schema::dropIfExists('shifts');
    }
};
