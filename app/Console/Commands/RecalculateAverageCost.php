<?php

namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Console\Command;

class RecalculateAverageCost extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'products:recalculate-average-cost {--product-id= : Recalculate for specific product ID}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Recalculate average cost for all products or a specific product';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $productId = $this->option('product-id');

        if ($productId) {
            // Recalculate for a specific product
            $product = Product::find($productId);
            
            if (!$product) {
                $this->error("Product with ID {$productId} not found.");
                return 1;
            }

            $averageCost = $product->updateAverageCost();
            $this->info("Product: {$product->title}");
            $this->info("Average Cost: Rp " . number_format($averageCost, 2));
            
            return 0;
        }

        // Recalculate for all products
        $this->info('Recalculating average cost for all products...');
        
        $products = Product::all();
        $bar = $this->output->createProgressBar($products->count());
        $bar->start();

        $updated = 0;
        foreach ($products as $product) {
            $product->updateAverageCost();
            $updated++;
            $bar->advance();
        }

        $bar->finish();
        $this->newLine();
        $this->info("Successfully recalculated average cost for {$updated} products.");

        return 0;
    }
}
