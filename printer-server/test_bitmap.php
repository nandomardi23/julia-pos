<?php
/**
 * Print logo using raw bitmap approach
 */
require_once 'vendor/autoload.php';
use Mike42\Escpos\Printer;
use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;

$printerName = 'POS-80';
$logoPath = __DIR__ . '/../storage/app/public/settings/store_logo.png';

echo "=== Logo Print (Raw Bitmap) ===\n\n";

// Load and resize image
$srcImage = imagecreatefrompng($logoPath);
$width = imagesx($srcImage);
$height = imagesy($srcImage);

$maxWidth = 200;
$newWidth = min($maxWidth, $width);
$newHeight = intval($height * ($newWidth / $width));

// Create white background image
$dstImage = imagecreatetruecolor($newWidth, $newHeight);
$white = imagecolorallocate($dstImage, 255, 255, 255);
imagefill($dstImage, 0, 0, $white);
imagealphablending($dstImage, true);
imagecopyresampled($dstImage, $srcImage, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
imagedestroy($srcImage);

echo "Image resized to: {$newWidth}x{$newHeight}\n";

// Convert to 1-bit bitmap for thermal printer
// For each row, create a byte array where 1=black, 0=white
$rows = [];
for ($y = 0; $y < $newHeight; $y++) {
    $rowBytes = [];
    $byte = 0;
    $bitCount = 0;

    for ($x = 0; $x < $newWidth; $x++) {
        $rgb = imagecolorat($dstImage, $x, $y);
        $r = ($rgb >> 16) & 0xFF;
        $g = ($rgb >> 8) & 0xFF;
        $b = $rgb & 0xFF;

        // Convert to grayscale and threshold (< 128 = black = 1, >= 128 = white = 0)
        $gray = ($r * 0.299 + $g * 0.587 + $b * 0.114);
        $bit = $gray < 128 ? 1 : 0;

        $byte = ($byte << 1) | $bit;
        $bitCount++;

        if ($bitCount == 8) {
            $rowBytes[] = $byte;
            $byte = 0;
            $bitCount = 0;
        }
    }

    // Pad remaining bits
    if ($bitCount > 0) {
        $byte = $byte << (8 - $bitCount);
        $rowBytes[] = $byte;
    }

    $rows[] = $rowBytes;
}
imagedestroy($dstImage);

echo "Bitmap created: " . count($rows) . " rows x " . count($rows[0]) . " bytes/row\n";

// Print using ESC * command
try {
    $connector = new WindowsPrintConnector($printerName);
    $printer = new Printer($connector);

    $printer->setJustification(Printer::JUSTIFY_CENTER);

    // Print bitmap row by row
    $bytesPerRow = ceil($newWidth / 8);

    foreach ($rows as $row) {
        // ESC * m nL nH d1 d2 ...
        // m = 0 (8-dot single-density), 1 (8-dot double-density), 32 (24-dot single), 33 (24-dot double)
        $mode = 0; // 8-dot single density
        $nL = $newWidth % 256;
        $nH = intval($newWidth / 256);

        $data = chr(27) . chr(42) . chr($mode) . chr($nL) . chr($nH);
        foreach ($row as $byte) {
            $data .= chr($byte);
        }
        $data .= "\n";

        fwrite($connector->getRawSocket() ?? STDOUT, $data);
    }

    $printer->feed(2);
    $printer->text("=== BITMAP TEST ===\n");
    $printer->feed(3);
    $printer->cut();
    $printer->close();

    echo "SUCCESS!\n";
} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
