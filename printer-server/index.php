<?php
/**
 * WebSocket Print Server for POS Julia
 * 
 * This server runs on the cashier's computer and receives print jobs
 * via WebSocket from the browser, then prints to the local thermal printer.
 * 
 * Usage: php index.php start
 */

// CRITICAL: Prevent any Laravel environment loading
// This print server is STANDALONE and does NOT need database access
if (file_exists(__DIR__ . '/../vendor/autoload.php')) {
    // Prevent accidentally loading Laravel's autoloader
    error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
}

use Workerman\Worker;
use Mike42\Escpos\Printer;
use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;
use Mike42\Escpos\PrintConnectors\FilePrintConnector;
use Mike42\Escpos\PrintConnectors\NetworkPrintConnector;
use Mike42\Escpos\EscposImage;

require_once __DIR__ . '/vendor/autoload.php';

// Load printer server configuration
$config = require __DIR__ . '/config.php';

// WebSocket server configuration
$ws_worker = new Worker('websocket://0.0.0.0:9100');
$ws_worker->count = 1;
$ws_worker->name = 'POS-Julia-Print-Server';

echo "======================================\n";
echo "  POS Julia Print Server v1.0\n";
echo "======================================\n";
echo "WebSocket Server: ws://0.0.0.0:9100\n";
echo "Status: Starting...\n";
echo "======================================\n\n";

// Connection opened
$ws_worker->onConnect = function ($connection) {
    echo "[" . date('Y-m-d H:i:s') . "] New connection from {$connection->getRemoteIp()}\n";
    $connection->send(json_encode([
        'type' => 'connected',
        'message' => 'Connected to POS Julia Print Server',
        'timestamp' => time()
    ]));
};

// Message received
$ws_worker->onMessage = function ($connection, $data) {
    try {
        $payload = json_decode($data, true);

        if (!$payload) {
            throw new Exception('Invalid JSON payload');
        }

        echo "[" . date('Y-m-d H:i:s') . "] Received command: " . ($payload['command'] ?? 'unknown') . "\n";

        // Handle different commands
        switch ($payload['command'] ?? '') {
            case 'ping':
                $connection->send(json_encode([
                    'type' => 'pong',
                    'timestamp' => time()
                ]));
                break;

            case 'print_receipt':
                $result = printReceipt($payload['data'] ?? []);
                $connection->send(json_encode($result));
                break;

            case 'test_print':
                $result = testPrint($payload['printer_name'] ?? null);
                $connection->send(json_encode($result));
                break;

            case 'open_drawer':
                $result = openCashDrawer($payload['printer_name'] ?? null);
                $connection->send(json_encode($result));
                break;

            case 'get_printers':
                $result = getInstalledPrinters();
                $connection->send(json_encode($result));
                break;

            default:
                $connection->send(json_encode([
                    'type' => 'error',
                    'message' => 'Unknown command: ' . ($payload['command'] ?? 'none')
                ]));
        }

    } catch (Exception $e) {
        echo "[ERROR] " . $e->getMessage() . "\n";
        $connection->send(json_encode([
            'type' => 'error',
            'message' => $e->getMessage()
        ]));
    }
};

// Connection closed
$ws_worker->onClose = function ($connection) {
    echo "[" . date('Y-m-d H:i:s') . "] Connection closed from {$connection->getRemoteIp()}\n";
};

// Error handler
$ws_worker->onError = function ($connection, $code, $msg) {
    echo "[ERROR] Code: $code, Message: $msg\n";
};

// Start server
Worker::runAll();

/**
 * Print receipt to thermal printer
 */
function printReceipt($data)
{
    try {
        $printerName = $data['printer_name'] ?? 'POS-80';
        $transaction = $data['transaction'] ?? null;
        $settings = $data['settings'] ?? [];
        $openDrawer = $data['open_drawer'] ?? false;

        if (!$transaction) {
            throw new Exception('Transaction data is required');
        }

        echo "  → Connecting to printer: $printerName\n";

        // Detect OS and use appropriate connector
        $connector = createPrinterConnector($printerName);
        $printer = new Printer($connector);

        echo "  → Printing receipt for invoice: {$transaction['invoice']}\n";

        // Print header
        printHeader($printer, $settings);

        // Print transaction info
        printTransactionInfo($printer, $transaction);

        // Print items
        printItems($printer, $transaction['details'] ?? []);

        // Print totals
        printTotals($printer, $transaction);

        // Print footer
        printFooter($printer, $settings);

        // Feed and cut
        $printer->feed(3);
        $printer->cut();

        // Open cash drawer if requested
        if ($openDrawer) {
            $printer->pulse();
            echo "  → Cash drawer opened\n";
        }

        $printer->close();
        echo "  ✓ Print completed successfully\n\n";

        return [
            'type' => 'success',
            'message' => 'Receipt printed successfully' . ($openDrawer ? ' and drawer opened' : ''),
            'timestamp' => time()
        ];

    } catch (Exception $e) {
        echo "  ✗ Print failed: " . $e->getMessage() . "\n\n";
        return [
            'type' => 'error',
            'message' => 'Print failed: ' . $e->getMessage()
        ];
    }
}

/**
 * Test printer connection
 */
function testPrint($printerName = null)
{
    try {
        $printerName = $printerName ?? 'POS-80';
        echo "  → Testing printer: $printerName\n";

        $connector = createPrinterConnector($printerName);
        $printer = new Printer($connector);

        $printer->setJustification(Printer::JUSTIFY_CENTER);
        $printer->setEmphasis(true);
        $printer->text("=== TEST PRINT ===\n");
        $printer->setEmphasis(false);
        $printer->text("POS Julia Print Server\n");
        $printer->text("Printer: $printerName\n");
        $printer->text(date('Y-m-d H:i:s') . "\n");
        $printer->text("Test successful!\n");
        $printer->feed(2);
        $printer->cut();
        $printer->close();

        echo "  ✓ Test print successful\n\n";

        return [
            'type' => 'success',
            'message' => 'Test print successful'
        ];

    } catch (Exception $e) {
        echo "  ✗ Test print failed: " . $e->getMessage() . "\n\n";
        return [
            'type' => 'error',
            'message' => 'Test print failed: ' . $e->getMessage()
        ];
    }
}

/**
 * Open cash drawer
 */
function openCashDrawer($printerName = null)
{
    try {
        $printerName = $printerName ?? 'POS-80';
        echo "  → Opening cash drawer via: $printerName\n";

        $connector = createPrinterConnector($printerName);
        $printer = new Printer($connector);
        $printer->pulse();
        $printer->close();

        echo "  ✓ Cash drawer opened\n\n";

        return [
            'type' => 'success',
            'message' => 'Cash drawer opened'
        ];

    } catch (Exception $e) {
        echo "  ✗ Failed to open drawer: " . $e->getMessage() . "\n\n";
        return [
            'type' => 'error',
            'message' => 'Failed to open drawer: ' . $e->getMessage()
        ];
    }
}

/**
 * Get installed printers
 */
function getInstalledPrinters()
{
    try {
        echo "  → Fetching installed printers...\n";
        $printers = [];
        $os = strtoupper(substr(PHP_OS, 0, 3));

        if ($os === 'WIN') {
            // Use PowerShell to get printer names
            $cmd = 'powershell -Command "Get-Printer | Select-Object -ExpandProperty Name"';
            exec($cmd, $output, $return_var);

            if ($return_var === 0) {
                // Filter out empty lines
                $printers = array_values(array_filter($output, function ($line) {
                    return !empty(trim($line));
                }));
            }
        } else {
            // Linux/Mac (lpstat)
            exec('lpstat -p | cut -d " " -f 2', $output, $return_var);
            if ($return_var === 0) {
                $printers = array_values(array_filter($output));
            }
        }

        echo "  ✓ Found " . count($printers) . " printers\n";

        return [
            'type' => 'success',
            'printers' => $printers,
            'message' => 'Found ' . count($printers) . ' printers'
        ];

    } catch (Exception $e) {
        echo "  ✗ Failed to get printers: " . $e->getMessage() . "\n";
        return [
            'type' => 'error',
            'message' => 'Failed to get printers: ' . $e->getMessage(),
            'printers' => []
        ];
    }
}

/**
 * Create printer connector based on OS
 */
function createPrinterConnector($printerName)
{
    // Detect OS
    $os = strtoupper(substr(PHP_OS, 0, 3));

    if ($os === 'WIN') {
        // Windows
        return new WindowsPrintConnector($printerName);
    } else {
        // Linux/Mac - try file connector first
        if (file_exists($printerName)) {
            return new FilePrintConnector($printerName);
        }
        // Try network connector if it looks like an IP
        if (filter_var($printerName, FILTER_VALIDATE_IP)) {
            return new NetworkPrintConnector($printerName, 9100);
        }
        // Fallback to file connector with /dev/usb/lp0 or /dev/lp0
        $possiblePaths = [
            '/dev/usb/lp0',
            '/dev/lp0',
            '/dev/usb/lp1',
            '/dev/lp1'
        ];
        foreach ($possiblePaths as $path) {
            if (file_exists($path)) {
                return new FilePrintConnector($path);
            }
        }
        throw new Exception("Printer not found: $printerName");
    }
}

/**
 * Resize logo image for thermal printer
 * Thermal printers typically support max 384 pixels width
 * Converts to grayscale with white background for ESC/POS compatibility
 */
function resizeLogoForPrinter($imagePath, $maxWidth = 384)
{
    try {
        $imageInfo = getimagesize($imagePath);
        if (!$imageInfo) {
            echo "  → Cannot read image info\n";
            return null;
        }

        $width = $imageInfo[0];
        $height = $imageInfo[1];
        $type = $imageInfo[2];

        // Calculate new dimensions (always resize for consistency)
        $ratio = $maxWidth / $width;
        $newWidth = min($maxWidth, $width);
        $newHeight = intval($height * ($newWidth / $width));

        // Create source image based on type
        switch ($type) {
            case IMAGETYPE_PNG:
                $srcImage = imagecreatefrompng($imagePath);
                break;
            case IMAGETYPE_JPEG:
                $srcImage = imagecreatefromjpeg($imagePath);
                break;
            case IMAGETYPE_GIF:
                $srcImage = imagecreatefromgif($imagePath);
                break;
            default:
                echo "  → Unsupported image type\n";
                return null;
        }

        if (!$srcImage) {
            echo "  → Failed to create source image\n";
            return null;
        }

        // Create destination image with WHITE background (no transparency)
        $dstImage = imagecreatetruecolor($newWidth, $newHeight);
        $white = imagecolorallocate($dstImage, 255, 255, 255);
        imagefill($dstImage, 0, 0, $white);

        // Enable alpha blending for source to handle transparent PNGs
        imagealphablending($dstImage, true);

        // Resize
        imagecopyresampled($dstImage, $srcImage, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

        // Save as PNG (no transparency, white background)
        // Use local temp folder to avoid permission issues
        $tempDir = __DIR__ . '/temp';
        if (!file_exists($tempDir)) {
            mkdir($tempDir, 0777, true);
        }

        $tempPath = $tempDir . DIRECTORY_SEPARATOR . 'pos_logo_' . uniqid() . '.jpg';
        imagejpeg($dstImage, $tempPath, 100); // 100 = max quality

        // Cleanup
        imagedestroy($srcImage);
        imagedestroy($dstImage);

        echo "  → Resized logo from {$width}x{$height} to {$newWidth}x{$newHeight}\n";

        return $tempPath;
    } catch (Exception $e) {
        echo "  → Resize error: " . $e->getMessage() . "\n";
        return null;
    }
}

/**
 * Print header section
 */
function printHeader($printer, $settings)
{
    $printer->setJustification(Printer::JUSTIFY_CENTER);

    // Store logo if available
    if (!empty($settings['store_logo'])) {
        try {
            $logoPath = $settings['store_logo'];

            // If logo is just a filename, try to find it in common locations
            if (!file_exists($logoPath)) {
                // Try relative to project root (storage/app/public/settings/)
                $possiblePaths = [
                    __DIR__ . '/../storage/app/public/settings/' . $logoPath,
                    __DIR__ . '/../public/storage/settings/' . $logoPath,
                    __DIR__ . '/../storage/settings/' . $logoPath,
                ];

                foreach ($possiblePaths as $path) {
                    if (file_exists($path)) {
                        $logoPath = $path;
                        break;
                    }
                }
            }

            if (file_exists($logoPath)) {
                echo "  → Loading logo from: $logoPath\n";

                // Resize image if too large for thermal printer (max 384px width)
                $resizedPath = resizeLogoForPrinter($logoPath, 300); // Use smaller width for better compatibility

                if ($resizedPath) {
                    echo "  → Resized logo saved to: $resizedPath\n";

                    if (file_exists($resizedPath)) {
                        try {
                            // Try loading with GD capability check
                            $image = EscposImage::load($resizedPath, false);
                            $printer->bitImage($image, Printer::IMG_DEFAULT);
                            $printer->feed(1);
                            echo "  → Logo printed successfully\n";
                        } catch (Exception $imgEx) {
                            echo "  → Logo print error: " . $imgEx->getMessage() . "\n";
                            echo "  → Debug: GD Info: " . json_encode(gd_info()) . "\n";
                        }
                    } else {
                        echo "  → Error: Resized file lost at $resizedPath\n";
                    }

                    // Clean up temp file
                    if ($resizedPath !== $logoPath) {
                        @unlink($resizedPath);
                    }
                } else {
                    echo "  → Logo resize failed\n";
                }
            } else {
                echo "  → Logo not found: {$settings['store_logo']}\n";
            }
        } catch (Exception $e) {
            echo "  → Logo error: " . $e->getMessage() . "\n";
            // Skip logo if it fails
        }
    }

    // Store name
    $printer->setEmphasis(true);
    $printer->setTextSize(2, 2);
    $printer->text(($settings['store_name'] ?? 'TOKO') . "\n");
    $printer->setTextSize(1, 1);
    $printer->setEmphasis(false);

    // Address
    if (!empty($settings['store_address'])) {
        $printer->text($settings['store_address'] . "\n");
    }

    // Phone
    if (!empty($settings['store_phone'])) {
        $printer->text("Telp: " . $settings['store_phone'] . "\n");
    }

    $printer->feed(1);
}

/**
 * Print transaction info
 */
function printTransactionInfo($printer, $transaction)
{
    $printer->setJustification(Printer::JUSTIFY_LEFT);
    $printer->text(str_repeat('-', 48) . "\n");

    $printer->text($transaction['invoice'] . "\n");
    $printer->text(date('d/m/Y H:i:s', strtotime($transaction['created_at'])) . "\n");
    $printer->text("Kasir: " . ($transaction['cashier']['name'] ?? 'Admin') . "\n");

    $printer->text(str_repeat('-', 48) . "\n");
}

/**
 * Print items
 */
function printItems($printer, $details)
{
    $printer->setJustification(Printer::JUSTIFY_LEFT);

    foreach ($details as $idx => $detail) {
        $productName = $detail['product']['title'] ?? 'Item';
        $variantName = $detail['variant_name'] ?? '';
        $name = $productName . ($variantName ? " ($variantName)" : '');

        // Properly parse qty - handle string values with comma or period as decimal separator
        $qtyRaw = $detail['qty'] ?? 0;
        if (is_string($qtyRaw)) {
            // Replace comma with period for proper float conversion
            $qtyRaw = str_replace(',', '.', $qtyRaw);
        }
        $qty = floatval($qtyRaw);

        $price = (int) ($detail['price'] ?? 0);
        $subtotal = $qty * $price;

        // Format qty - show decimals only if needed
        // Use period as decimal separator for thermal printer ASCII compatibility
        if ($qty == floor($qty)) {
            $qtyFormatted = number_format($qty, 0);
        } else {
            // Format with period as decimal separator (ASCII compatible)
            $qtyFormatted = rtrim(rtrim(number_format($qty, 3, '.', ''), '0'), '.');
        }

        // Item name
        $printer->setEmphasis(true);
        $printer->text(($idx + 1) . ". " . $name . "\n");
        $printer->setEmphasis(false);

        // Qty x Price = Subtotal
        $qtyPrice = "   $qtyFormatted x " . number_format($price, 0, ',', '.');
        $subtotalStr = "Rp " . number_format($subtotal, 0, ',', '.');
        $printer->text(formatLine($qtyPrice, $subtotalStr, 48) . "\n");
    }

    $printer->text(str_repeat('=', 48) . "\n");
}

/**
 * Print totals
 */
function printTotals($printer, $transaction)
{
    $printer->setJustification(Printer::JUSTIFY_LEFT);

    $subtotal = 0;
    foreach ($transaction['details'] as $detail) {
        // Properly parse qty - handle string values with comma or period as decimal separator
        $qtyRaw = $detail['qty'] ?? 0;
        if (is_string($qtyRaw)) {
            $qtyRaw = str_replace(',', '.', $qtyRaw);
        }
        $qty = floatval($qtyRaw);
        $price = (int) ($detail['price'] ?? 0);
        $subtotal += $qty * $price;
    }

    $discount = (int) ($transaction['discount'] ?? 0);
    $tax = (int) ($transaction['tax'] ?? 0);
    $ppn = (float) ($transaction['ppn'] ?? 0);
    $grandTotal = (int) ($transaction['grand_total'] ?? 0);
    $cash = (int) ($transaction['cash'] ?? 0);
    $change = (int) ($transaction['change'] ?? 0);

    // Subtotal
    $printer->text(formatLine('Sub Total', 'Rp ' . number_format($subtotal, 0, ',', '.'), 48) . "\n");

    // Discount
    if ($discount > 0) {
        $printer->text(formatLine('Diskon', '-Rp ' . number_format($discount, 0, ',', '.'), 48) . "\n");
    }

    // Tax
    if ($tax > 0) {
        $label = 'PPN';
        if ($ppn > 0) {
            $label .= ' (' . ($ppn == floor($ppn) ? number_format($ppn, 0) : $ppn) . '%)';
        }
        $printer->text(formatLine($label, 'Rp ' . number_format($tax, 0, ',', '.'), 48) . "\n");
    }

    // Total
    $printer->text(str_repeat('-', 48) . "\n");
    $printer->setEmphasis(true);
    $printer->text(formatLine('TOTAL', 'Rp ' . number_format($grandTotal, 0, ',', '.'), 48) . "\n");
    $printer->setEmphasis(false);

    // Payment method
    $paymentMethod = $transaction['payment_method'] ?? 'cash';
    $methodLabels = [
        'cash' => 'Bayar (Tunai)',
        'transfer' => 'Bayar (Transfer)',
        'qris' => 'Bayar (QRIS)'
    ];
    $methodLabel = $methodLabels[$paymentMethod] ?? 'Bayar';
    $printer->text(formatLine($methodLabel, 'Rp ' . number_format($cash, 0, ',', '.'), 48) . "\n");

    // Change
    $printer->text(formatLine('Kembali', 'Rp ' . number_format($change, 0, ',', '.'), 48) . "\n");

    $printer->text(str_repeat('-', 48) . "\n");
}

/**
 * Print footer
 */
function printFooter($printer, $settings)
{
    $printer->setJustification(Printer::JUSTIFY_CENTER);
    $printer->feed(1);
    $printer->text("Terima kasih atas kunjungan Anda\n");

    if (!empty($settings['store_website'])) {
        $printer->text($settings['store_website'] . "\n");
    }
}

/**
 * Format line with left and right alignment
 */
function formatLine($left, $right, $width = 48)
{
    $spaces = max(1, $width - strlen($left) - strlen($right));
    return $left . str_repeat(' ', $spaces) . $right;
}
