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
            $table->json('tags')->nullable()->after('product_type');
        });

        // Migrate existing data
        DB::table('products')->orderBy('id')->chunk(100, function ($products) {
            foreach ($products as $product) {
                // If product already has tags (unlikely but safe), skip
                if ($product->tags) continue;

                $tags = [];
                if ($product->product_type === 'sellable') {
                    $tags[] = 'sellable';
                } elseif ($product->product_type === 'ingredient') {
                    $tags[] = 'ingredient';
                } elseif ($product->product_type === 'supply') {
                    $tags[] = 'supply';
                } elseif ($product->product_type === 'recipe') {
                    $tags[] = 'recipe';
                    // Recipes are usually sellable too, but let's stick to 1:1 mapping first
                    // Actually, recipes in this system are usually sellable items that have ingredients.
                    // So we might want to tag them as sellable too?
                    // Let's keep it simple: 1:1 mapping for now to maintain behavior.
                }

                DB::table('products')
                    ->where('id', $product->id)
                    ->update(['tags' => json_encode($tags)]);
            }
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('tags');
        });
    }
};
