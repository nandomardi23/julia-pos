<?php
require_once 'vendor/autoload.php';
use Mike42\Escpos\Printer;
use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;

$printerName = 'POS80';  // Without hyphen - this is the shared name

echo "Testing printer: $printerName\n";
try {
    $connector = new WindowsPrintConnector($printerName);
    $printer = new Printer($connector);
    $printer->setJustification(Printer::JUSTIFY_CENTER);
    $printer->text("=== TEST PRINT ===\n");
    $printer->text("Printer: $printerName\n");
    $printer->text("Time: " . date('Y-m-d H:i:s') . "\n");
    $printer->text("==================\n");
    $printer->feed(3);
    $printer->cut();
    $printer->close();
    echo "SUCCESS: Printer $printerName works!\n";
} catch (Exception $e) {
    echo "FAILED: " . $e->getMessage() . "\n";
}
