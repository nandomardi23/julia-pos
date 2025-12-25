<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\Schema;

// Drop table jika ada
if (Schema::hasTable('product_variant_ingredients')) {
    Schema::dropIfExists('product_variant_ingredients');
    echo "Table product_variant_ingredients dropped.\n";
} else {
    echo "Table product_variant_ingredients does not exist.\n";
}
