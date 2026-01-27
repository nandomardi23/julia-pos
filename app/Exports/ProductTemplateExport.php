<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class ProductTemplateExport implements FromArray, WithHeadings, WithTitle, ShouldAutoSize
{
    public function array(): array
    {
        return [
            [
                'PRD-001',          // sku
                '123456789',        // barcode
                'Contoh Produk',    // nama_produk
                'Makanan',          // kategori
                'Deskripsi produk', // deskripsi
                10000,              // harga_beli
                15000,              // harga_jual
                'pcs',              // satuan
                10                  // stok_minimal
            ],
            [
                'PRD-002',
                '',
                'Produk Kedua',
                'Minuman',
                '',
                5000,
                8000,
                'botol',
                5
            ]
        ];
    }

    public function headings(): array
    {
        return [
            'sku',
            'barcode',
            'nama_produk',
            'kategori',
            'deskripsi',
            'harga_beli',
            'harga_jual',
            'satuan',
            'stok_minimal',
        ];
    }

    public function title(): string
    {
        return 'Template Import Produk';
    }
}
