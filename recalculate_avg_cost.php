<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Product;

echo "Recalculating average costs...\n\n";

$products = Product::all();

foreach ($products as $product) {
    $avgCost = $product->updateAverageCost();
    echo $product->title . ": Rp " . number_format($avgCost, 0, ',', '.') . "\n";
}

echo "\nDone! " . $products->count() . " products updated.\n";
