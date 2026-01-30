<?php
/**
 * Debug EscposImage capabilities
 */
require_once 'vendor/autoload.php';
use Mike42\Escpos\EscposImage;
use Mike42\Escpos\GdEscposImage;

echo "=== EscposImage Debug ===\n\n";

// Check GD
echo "GD Info:\n";
if (function_exists('gd_info')) {
    $gd = gd_info();
    echo "  GD Version: " . $gd['GD Version'] . "\n";
    echo "  JPEG Support: " . ($gd['JPEG Support'] ? 'Yes' : 'No') . "\n";
    echo "  PNG Support: " . ($gd['PNG Support'] ? 'Yes' : 'No') . "\n";
} else {
    echo "  GD NOT AVAILABLE!\n";
}

// Try GdEscposImage directly
echo "\nTesting GdEscposImage:\n";
$testFile = 'C:/Users/Nando/Documents/belajar/pos-julia/storage/app/public/settings/store_logo.png';

if (file_exists($testFile)) {
    echo "File exists: $testFile\n";

    try {
        // Use GdEscposImage directly
        $img = new GdEscposImage($testFile);
        echo "GdEscposImage created!\n";
        echo "Width: " . $img->getWidth() . "\n";
        echo "Height: " . $img->getHeight() . "\n";
    } catch (Exception $e) {
        echo "GdEscposImage error: " . $e->getMessage() . "\n";
    }

    // Check PHP version
    echo "\nPHP Version: " . PHP_VERSION . "\n";

    // Try imagecreatefromstring
    echo "\nTesting GD directly:\n";
    $data = file_get_contents($testFile);
    $img = @imagecreatefromstring($data);
    if ($img) {
        echo "imagecreatefromstring: OK\n";
        echo "Width: " . imagesx($img) . "\n";
        echo "Height: " . imagesy($img) . "\n";
        imagedestroy($img);
    } else {
        echo "imagecreatefromstring: FAILED\n";
    }
} else {
    echo "File NOT found: $testFile\n";
}
