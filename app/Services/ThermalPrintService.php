<?php

namespace App\Services;

use App\Models\Setting;
use App\Models\Transaction;
use Carbon\Carbon;
use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;
use Mike42\Escpos\Printer;
use Mike42\Escpos\EscposImage;
use Exception;

class ThermalPrintService
{
    protected ?Printer $printer = null;
    protected string $printerName;
    protected int $width = 48; // 80mm paper = 48 chars

    public function __construct()
    {
        $this->printerName = config('printing.printer_name', env('THERMAL_PRINTER_NAME', 'POS-80'));
    }

    /**
     * Connect to printer
     */
    protected function connect(): bool
    {
        try {
            \Log::info('Attempting to connect to printer: ' . $this->printerName);
            $connector = new WindowsPrintConnector($this->printerName);
            $this->printer = new Printer($connector);
            \Log::info('Printer connected successfully');
            return true;
        } catch (Exception $e) {
            \Log::error('Printer connection error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Disconnect from printer
     */
    protected function disconnect(): void
    {
        if ($this->printer) {
            try {
                $this->printer->close();
            } catch (Exception $e) {
                // Ignore close errors
            }
            $this->printer = null;
        }
    }

    /**
     * Print receipt for transaction
     * @param Transaction $transaction
     * @param bool $openDrawer Whether to open cash drawer after printing (for cash payments)
     */
    public function printReceipt(Transaction $transaction, bool $openDrawer = false): array
    {
        if (!$this->connect()) {
            return [
                'success' => false,
                'message' => 'Tidak dapat terhubung ke printer "' . $this->printerName . '"'
            ];
        }

        try {
            $settings = Setting::getAll();
            $transaction->load(['details.product', 'cashier']);

            // ===== HEADER =====
            $this->printer->setJustification(Printer::JUSTIFY_CENTER);

            // Print logo if exists
            $this->printLogo($settings);

            // Store name (bold, double size)
            $this->printer->setEmphasis(true);
            $this->printer->setTextSize(2, 2);
            $this->printer->text(($settings['store_name'] ?? 'Toko') . "\n");
            $this->printer->setTextSize(1, 1);
            $this->printer->setEmphasis(false);

            // Address
            if (!empty($settings['store_address'])) {
                $this->printer->text($settings['store_address'] . "\n");
            }

            // Phone
            if (!empty($settings['store_phone'])) {
                $this->printer->text("No. Telp " . $settings['store_phone'] . "\n");
            }

            // Invoice
            $this->printer->text($transaction->invoice . "\n");
            $this->printer->text(str_repeat('-', $this->width) . "\n");

            // ===== TRANSACTION INFO =====
            $this->printer->setJustification(Printer::JUSTIFY_LEFT);
            
            $createdAt = $transaction->created_at instanceof Carbon 
                ? $transaction->created_at 
                : Carbon::parse($transaction->created_at);
            
            $date = $createdAt->format('d/m/Y');
            $time = $createdAt->format('H.i.s');
            $cashier = $transaction->cashier->name ?? 'Kasir';
            
            // Date and cashier on same line
            $this->printer->text($this->formatLine($date, $cashier) . "\n");
            $this->printer->text($time . "\n");
            $this->printer->text(str_repeat('-', $this->width) . "\n");

            // ===== ITEMS =====
            $totalQty = 0;
            foreach ($transaction->details as $index => $detail) {
                $productName = $detail->product->title ?? 'Item';
                $variantName = $detail->variant_name ? " ({$detail->variant_name})" : '';
                $name = substr($productName . $variantName, 0, 40);
                
                $qty = (int) $detail->qty;
                $price = (int) $detail->price;
                $subtotal = $qty * $price;
                $totalQty += $qty;

                // Item name (bold)
                $this->printer->setEmphasis(true);
                $this->printer->text(($index + 1) . ". " . $name . "\n");
                $this->printer->setEmphasis(false);

                // Qty x Price = Subtotal
                $qtyPrice = "   {$qty} x " . $this->formatNumber($price);
                $subtotalStr = "Rp " . $this->formatNumber($subtotal);
                $this->printer->text($this->formatLine($qtyPrice, $subtotalStr) . "\n");
            }

            $this->printer->text(str_repeat('=', $this->width) . "\n");

            // ===== TOTALS =====
            $subtotal = $transaction->details->sum(fn($d) => $d->qty * $d->price);
            $discount = (int) $transaction->discount;
            $grandTotal = (int) $transaction->grand_total;
            $cash = (int) $transaction->cash;
            $change = (int) $transaction->change;
            $paymentMethod = $transaction->payment_method ?? 'cash';

            // Total QTY
            $this->printer->text("Total QTY : {$totalQty}\n");
            $this->printer->text(str_repeat('-', $this->width) . "\n");

            // Sub Total
            $this->printer->text($this->formatLine('Sub Total', 'Rp ' . $this->formatNumber($subtotal)) . "\n");

            // Discount
            if ($discount > 0) {
                $this->printer->text($this->formatLine('Diskon', '-Rp ' . $this->formatNumber($discount)) . "\n");
            }

            // Tax (PPN)
            $tax = (int) $transaction->tax;
            $ppn = (float) $transaction->ppn;
            if ($tax > 0) {
                $label = 'PPN';
                if ($ppn > 0) {
                    $label .= ' (' . ($ppn == floor($ppn) ? number_format($ppn, 0) : $ppn) . '%)';
                }
                $this->printer->text($this->formatLine($label, 'Rp ' . $this->formatNumber($tax)) . "\n");
            }

            // Total (bold)
            $this->printer->text(str_repeat('-', $this->width) . "\n");
            $this->printer->setEmphasis(true);
            $this->printer->text($this->formatLine('Total', 'Rp ' . $this->formatNumber($grandTotal)) . "\n");
            $this->printer->setEmphasis(false);

            // Payment method
            $methodLabels = [
                'cash' => 'Bayar (Cash)',
                'transfer' => 'Bayar (Transfer)',
                'qris' => 'Bayar (QRIS)'
            ];
            $methodLabel = $methodLabels[$paymentMethod] ?? 'Bayar';
            $this->printer->text($this->formatLine($methodLabel, 'Rp ' . $this->formatNumber($cash)) . "\n");

            // Change
            $this->printer->text($this->formatLine('Kembali', 'Rp ' . $this->formatNumber($change)) . "\n");

            $this->printer->text(str_repeat('-', $this->width) . "\n");

            // ===== FOOTER =====
            $this->printer->setJustification(Printer::JUSTIFY_CENTER);
            $this->printer->text("\n");
            $this->printer->text("Terimakasih Telah Berbelanja\n");
            
            if (!empty($settings['store_website'])) {
                $this->printer->text($settings['store_website'] . "\n");
            }

            $this->printer->feed(3);
            $this->printer->cut();
            
            // Open cash drawer if requested (for cash payments)
            if ($openDrawer) {
                $this->printer->pulse();
                \Log::info('Cash drawer opened after print');
            }

            \Log::info('Print commands sent, closing printer connection...');
            $this->disconnect();
            \Log::info('Receipt printed successfully for invoice: ' . $transaction->invoice);

            return [
                'success' => true,
                'message' => 'Struk berhasil dicetak' . ($openDrawer ? ' dan laci dibuka' : '')
            ];

        } catch (Exception $e) {
            $this->disconnect();
            \Log::error('Print receipt error: ' . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Gagal mencetak: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Print logo at top of receipt (resized to 150px width for small logo)
     */
    protected function printLogo(array $settings): void
    {
        if (empty($settings['store_logo'])) {
            return;
        }

        $logoPath = storage_path('app/public/settings/' . $settings['store_logo']);
        
        if (!file_exists($logoPath)) {
            return;
        }

        try {
            // Resize logo to 150px width for smaller print
            $targetWidth = 150;
            
            // Get original image info
            $imageInfo = getimagesize($logoPath);
            if (!$imageInfo) {
                return;
            }
            
            $originalWidth = $imageInfo[0];
            $originalHeight = $imageInfo[1];
            $mimeType = $imageInfo['mime'];
            
            // Calculate new height maintaining aspect ratio
            $ratio = $targetWidth / $originalWidth;
            $targetHeight = (int) ($originalHeight * $ratio);
            
            // Create resized image
            $resized = imagecreatetruecolor($targetWidth, $targetHeight);
            
            // Load original based on mime type
            switch ($mimeType) {
                case 'image/png':
                    $original = imagecreatefrompng($logoPath);
                    // Preserve transparency
                    imagealphablending($resized, false);
                    imagesavealpha($resized, true);
                    $transparent = imagecolorallocatealpha($resized, 255, 255, 255, 127);
                    imagefilledrectangle($resized, 0, 0, $targetWidth, $targetHeight, $transparent);
                    imagealphablending($resized, true);
                    break;
                case 'image/jpeg':
                case 'image/jpg':
                    $original = imagecreatefromjpeg($logoPath);
                    break;
                case 'image/gif':
                    $original = imagecreatefromgif($logoPath);
                    break;
                default:
                    return;
            }
            
            // Resize
            imagecopyresampled($resized, $original, 0, 0, 0, 0, $targetWidth, $targetHeight, $originalWidth, $originalHeight);
            
            // Save to temp file
            $tempPath = storage_path('app/temp_logo.png');
            imagepng($resized, $tempPath);
            
            // Free memory
            imagedestroy($original);
            imagedestroy($resized);
            
            // Print resized logo
            $image = EscposImage::load($tempPath, false);
            $this->printer->bitImage($image, Printer::IMG_DEFAULT);
            $this->printer->feed(1);
            
            // Clean up temp file
            @unlink($tempPath);
            
        } catch (Exception $e) {
            // Skip logo if it fails
            \Log::warning('Logo print failed: ' . $e->getMessage());
        }
    }

    /**
     * Open cash drawer
     */
    public function openCashDrawer(): array
    {
        if (!$this->connect()) {
            return [
                'success' => false,
                'message' => 'Tidak dapat terhubung ke printer'
            ];
        }

        try {
            $this->printer->pulse();
            $this->disconnect();

            return [
                'success' => true,
                'message' => 'Laci kasir dibuka'
            ];
        } catch (Exception $e) {
            $this->disconnect();
            return [
                'success' => false,
                'message' => 'Gagal membuka laci: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Test print connection
     */
    public function testPrint(): array
    {
        if (!$this->connect()) {
            return [
                'success' => false,
                'message' => 'Tidak dapat terhubung ke printer "' . $this->printerName . '"'
            ];
        }

        try {
            $settings = Setting::getAll();

            $this->printer->setJustification(Printer::JUSTIFY_CENTER);
            $this->printer->setEmphasis(true);
            $this->printer->text("=== TEST PRINT ===\n");
            $this->printer->setEmphasis(false);
            $this->printer->text(($settings['store_name'] ?? 'Toko') . "\n");
            $this->printer->text("Printer: " . $this->printerName . "\n");
            $this->printer->text(date('d/m/Y H:i:s') . "\n");
            $this->printer->text("Server-side printing OK\n");
            $this->printer->feed(2);
            $this->printer->cut();

            $this->disconnect();

            return [
                'success' => true,
                'message' => 'Test print berhasil ke "' . $this->printerName . '"'
            ];
        } catch (Exception $e) {
            $this->disconnect();
            return [
                'success' => false,
                'message' => 'Test print gagal: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Check printer status
     */
    public function getStatus(): array
    {
        $canConnect = $this->connect();
        $this->disconnect();

        return [
            'available' => $canConnect,
            'printerName' => $this->printerName,
            'message' => $canConnect 
                ? 'Printer "' . $this->printerName . '" tersedia'
                : 'Printer "' . $this->printerName . '" tidak dapat dijangkau'
        ];
    }

    // ===== HELPER FUNCTIONS =====

    protected function formatNumber(int $num): string
    {
        return number_format($num, 0, ',', '.');
    }

    protected function formatLine(string $left, string $right): string
    {
        $spaces = max(1, $this->width - strlen($left) - strlen($right));
        return $left . str_repeat(' ', $spaces) . $right;
    }
}
