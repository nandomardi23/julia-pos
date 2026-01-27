<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class StockMovementTemplateExport implements FromArray, WithHeadings, WithTitle, ShouldAutoSize
{
    public function array(): array
    {
        return [
            [
                'PRD-001', // SKU or Barcode
                10,        // Quantity
                10000,     // Purchase Price (optional)
            ],
            [
                '123456789',
                5,
                0,
            ]
        ];
    }

    public function headings(): array
    {
        return [
            'sku',
            'jumlah',
            'harga_beli',
        ];
    }

    public function title(): string
    {
        return 'Format Import Stok Masuk';
    }
}
