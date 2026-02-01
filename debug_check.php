<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$targetInvoice = 'TRX-EDUCY3064P';
$specificTransaction = App\Models\Transaction::where('invoice', $targetInvoice)->first();

$targetProduct = 'Anggur Merah Curah RRC';
$productMovement = App\Models\StockMovement::whereHas('product', function($q) use ($targetProduct) {
    $q->where('title', 'like', "%$targetProduct%");
})->latest()->take(5)->get();

$inventory = App\Models\Product::where('title', 'like', "%$targetProduct%")->with('displayStock')->first();


$output = "";
$output .= "=== SEARCH RESULT FOR $targetInvoice ===\n";
if ($specificTransaction) {
    $output .= "FOUND!\n";
    $output .= "ID: " . $specificTransaction->id . "\n";
    $output .= "Invoice: " . $specificTransaction->invoice . "\n";
    $output .= "Total: " . $specificTransaction->grand_total . "\n";
    $output .= "Created At: " . $specificTransaction->created_at . "\n";
    $output .= "Payment Status: " . $specificTransaction->payment_status . "\n";
} else {
    $output .= "NOT FOUND.\n";
}

$output .= "\n=== MOVEMENTS FOR '$targetProduct' ===\n";
foreach ($productMovement as $mov) {
    $output .= "Date: " . $mov->created_at . " | Qty: " . $mov->quantity . " | Type: " . $mov->from_type . " -> " . $mov->to_type . "\n";
}

if ($inventory) {
    $output .= "\n=== CURRENT STOCK FOR '$targetProduct' ===\n";
    $output .= "Display Stock: " . $inventory->display_qty . "\n";
    $output .= "Warehouse Stock: " . $inventory->warehouse_qty . "\n";
}

file_put_contents('debug_output.txt', $output);
echo "Debug output written to debug_output.txt";
