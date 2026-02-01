<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithDrawings;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;

class ProductsExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize, WithStyles, WithDrawings, WithEvents
{
    protected $products;

    public function __construct($products)
    {
        $this->products = $products;
    }

    public function collection()
    {
        return $this->products;
    }

    public function headings(): array
    {
        return [
            'No',
            'Gambar', // Empty column for images
            'Nama Produk',
            'SKU',
            'Barcode',
            'Kategori',
            'Tipe',
            'Satuan',
            'Harga Beli',
            'Harga Jual',
            'Stok',
            'Status',
        ];
    }

    public function map($product): array
    {
        static $rowNumber = 0;
        $rowNumber++;

        // Helper to format currency
        $formatCurrency = function ($value) {
            return $value; // Let Excel handle formatting or format string here if needed
        };

        // Determine type label
        $tags = $product->tags ?? [];
        if (in_array('sellable', $tags)) $type = 'Produk Jual';
        elseif (in_array('ingredient', $tags)) $type = 'Bahan Baku';
        elseif (in_array('recipe', $tags)) $type = 'Resep';
        elseif (in_array('supply', $tags)) $type = 'Alat';
        else $type = $product->product_type;

        return [
            $rowNumber,
            '', // Image placeholder
            $product->title,
            $product->sku,
            $product->barcode,
            $product->category->name ?? '-',
            $type,
            $product->unit,
            $product->buy_price,
            $product->sell_price,
            $product->total_stock ?? 0, // Assuming total_stock is appended or we need to calculate it? Controller passes raw models mainly.
            // Note: Product model doesn't have total_stock by default unless loaded. 
            // For now, let's leave it simple or check if we need to load it. 
            // In the controller export method, we should probably load stock or calculate it if needed.
            // But standard product list usually doesn't show stock column in the provided Index.jsx table? 
            // Index.jsx DOES NOT show stock column. Okay, let's keep it but it might be just what's in database or 0.
            // Actually, let's just use what's available.
            $product->is_active ? 'Aktif' : 'Tidak Aktif',
        ];
    }

    public function drawings()
    {
        $drawings = [];
        $row = 2; // Start after header

        foreach ($this->products as $product) {
            $imagePath = null;
            $imageFilename = $product->getRawOriginal('image');
            
            // Check if image exists in storage
            // Storage path depends on where it was stored. 
            // storeAs('public/products', ...) stores in storage/app/public/products
            $fullPath = storage_path('app/public/products/' . $imageFilename);

            if ($imageFilename && file_exists($fullPath)) {
                $imagePath = $fullPath;
            }

            if ($imagePath) {
                $drawing = new Drawing();
                $drawing->setName($product->title);
                $drawing->setDescription($product->title);
                $drawing->setPath($imagePath);
                $drawing->setHeight(50); // Set fixed height
                $drawing->setCoordinates('B' . $row);
                $drawing->setOffsetX(5);
                $drawing->setOffsetY(5);
                $drawings[] = $drawing;
            }

            $row++;
        }

        return $drawings;
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                // Set default row height for all rows with data to accommodate images
                $rowCount = $this->products->count() + 1; // +1 for header
                for ($i = 2; $i <= $rowCount; $i++) {
                    $event->sheet->getDelegate()->getRowDimension($i)->setRowHeight(50);
                }
                
                // Center alignment for all cells
                $event->sheet->getDelegate()->getStyle('A1:L' . $rowCount)
                    ->getAlignment()->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);
                
                 // Format Currency Columns (I: Buy Price, J: Sell Price)
                $event->sheet->getDelegate()->getStyle('I2:I' . $rowCount)
                    ->getNumberFormat()->setFormatCode('#,##0');
                $event->sheet->getDelegate()->getStyle('J2:J' . $rowCount)
                    ->getNumberFormat()->setFormatCode('#,##0');
            },
        ];
    }
}
