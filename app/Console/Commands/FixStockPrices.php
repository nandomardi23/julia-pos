<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\StockMovement;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class FixStockPrices extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fix:stock-prices';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fix inflated stock prices (converts Total Price to Unit Price) for existing data';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting stock price fix...');

        // Find potential candidates: Stock In (to_type = warehouse) with qty > 1 and price > 0
        // We assume high prices are "Total Prices" erroneously stored as "Unit Prices"
        $movements = StockMovement::where('to_type', 'warehouse')
            ->where('quantity', '>', 1)
            ->where('purchase_price', '>', 0)
            ->get();

        $count = 0;
        $affectedProducts = [];

        $this->withProgressBar($movements, function ($movement) use (&$count, &$affectedProducts) {

            // Heuristic check:
            // If the user bought 10 items for 100,000, the stored price is 100,000.
            // Real unit price should be 10,000.
            // We can't know for sure if it WAS 100k/unit, but based on the bug report, this is the issue.
            // We will divide by quantity.

            $originalPrice = $movement->purchase_price;
            $quantity = $movement->quantity;

            // Calculate new unit price
            $newUnitPrice = $originalPrice / $quantity;

            // Update
            $movement->purchase_price = $newUnitPrice;
            $movement->save();

            $affectedProducts[$movement->product_id] = true;
            $count++;
        });

        $this->newLine();
        $this->info("Fixed prices for {$count} stock movements.");

        $this->info('Recalculating average costs for affected products...');

        $bar = $this->output->createProgressBar(count($affectedProducts));
        foreach (array_keys($affectedProducts) as $productId) {
            $product = Product::find($productId);
            if ($product) {
                // This updates the 'average_cost' column on the product
                $product->updateAverageCost();

                // NEW: Now looking for existing "Stock Out" records for this product
                // and recalculating their 'loss_amount' with the NEW correct average cost.
                $outMovements = StockMovement::where('product_id', $productId)
                    ->where('to_type', StockMovement::TYPE_OUT)
                    ->get();

                foreach ($outMovements as $out) {
                    // Loss = Qty * Current Average Cost
                    // We use the product's NEW average cost
                    $newLoss = $out->quantity * $product->average_cost;

                    if ($newLoss != $out->loss_amount) {
                        $out->loss_amount = $newLoss;
                        $out->save();
                    }
                }
            }
            $bar->advance();
        }
        $bar->finish();

        $this->newLine();
        $this->info('Done! Also recalculated losses for associated Stock Outs.');
    }
}
