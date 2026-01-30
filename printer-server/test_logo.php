<?php
/**
 * Print logo using direct GD to ESC/POS conversion
 */
require_once 'vendor/autoload.php';
use Mike42\Escpos\Printer;
use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;
use Mike42\Escpos\EscposImage;

// IMPORTANT: Check if GD is properly loaded
echo "GD functions available: " . (function_exists('imagecreatefromstring') ? 'YES' : 'NO') . "\n";

$printerName = 'POS-80';
$logoPath = __DIR__ . '/../storage/app/public/settings/store_logo.png';

echo "=== Logo Print Test ===\n\n";

// Load image
$srcImage = imagecreatefrompng($logoPath);
if (!$srcImage) {
    die("Cannot load source image\n");
}

$width = imagesx($srcImage);
$height = imagesy($srcImage);
echo "Source: {$width}x{$height}\n";

// Resize
$maxWidth = 200;
$newWidth = min($maxWidth, $width);
$newHeight = intval($height * ($newWidth / $width));

$dstImage = imagecreatetruecolor($newWidth, $newHeight);
$white = imagecolorallocate($dstImage, 255, 255, 255);
imagefill($dstImage, 0, 0, $white);
imagealphablending($dstImage, true);
imagecopyresampled($dstImage, $srcImage, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
imagedestroy($srcImage);

echo "Resized to: {$newWidth}x{$newHeight}\n";

// Save to temp file with different formats
$tempPng = sys_get_temp_dir() . '/logo_test.png';
$tempGif = sys_get_temp_dir() . '/logo_test.gif';

// Try saving as a simple format
imagepng($dstImage, $tempPng);
imagegif($dstImage, $tempGif); // GIF tends to be more compatible
imagedestroy($dstImage);

echo "Saved to: $tempPng and $tempGif\n\n";

// Try loading GIF instead
echo "Testing with GIF format:\n";
try {
    $image = EscposImage::load($tempGif, false);
    echo "  Width: " . $image->getWidth() . ", Height: " . $image->getHeight() . "\n";

    if ($image->getWidth() > 0) {
        echo "\nPrinting...\n";
        $connector = new WindowsPrintConnector($printerName);
        $printer = new Printer($connector);

        $printer->setJustification(Printer::JUSTIFY_CENTER);
        $printer->bitImage($image, Printer::IMG_DEFAULT);
        $printer->feed(1);
        $printer->text("=== LOGO OK ===\n");
        $printer->feed(3);
        $printer->cut();
        $printer->close();
        echo "SUCCESS!\n";
    } else {
        echo "Width is 0 - cannot print\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}

@unlink($tempPng);
@unlink($tempGif);
