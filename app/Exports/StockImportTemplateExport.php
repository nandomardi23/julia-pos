<?php

namespace App\Exports;

use App\Models\Product;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class StockImportTemplateExport implements FromCollection, WithHeadings, WithStyles, WithColumnWidths
{
    /**
     * Template untuk import barang masuk.
     * Menyediakan daftar produk yang bisa diisi quantity dan harga belinya.
     */
    public function collection()
    {
        return Product::select('id', 'barcode', 'title', 'unit')
            ->orderBy('title')
            ->get()
            ->map(function ($product) {
                return [
                    'product_id' => $product->id,
                    'barcode' => $product->barcode,
                    'title' => $product->title,
                    'unit' => $product->unit,
                    'quantity' => '', // User fills this
                    'purchase_price' => '', // User fills this
                ];
            });
    }

    public function headings(): array
    {
        return [
            'ID Produk',
            'Barcode',
            'Nama Produk',
            'Satuan',
            'Jumlah (Isi)',
            'Harga Beli (Isi)',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            // Header row bold
            1 => ['font' => ['bold' => true]],
        ];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 10,
            'B' => 15,
            'C' => 40,
            'D' => 10,
            'E' => 15,
            'F' => 15,
        ];
    }
}
