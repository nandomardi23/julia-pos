<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class StockMovementsExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize, WithStyles
{
    protected $movements;

    public function __construct($movements)
    {
        $this->movements = $movements;
    }

    public function collection()
    {
        return $this->movements;
    }

    public function headings(): array
    {
        return [
            'Tanggal',
            'Produk',
            'SKU',
            'Tipe',
            'Dari',
            'Ke',
            'Quantity',
            'Harga Beli',
            'Kerugian',
            'User',
            'Catatan',
        ];
    }

    public function map($movement): array
    {
        $typeLabel = '';
        if ($movement->to_type === 'warehouse') $typeLabel = 'Barang Masuk';
        elseif ($movement->from_type === 'warehouse' && $movement->to_type === 'display') $typeLabel = 'Transfer';
        elseif ($movement->to_type === 'transaction') $typeLabel = 'Penjualan';
        elseif ($movement->to_type === 'out') $typeLabel = 'Barang Keluar';
        else $typeLabel = 'Lainnya';

        $fromLabel = $movement->from_type === 'supplier' 
            ? ($movement->supplier->name ?? 'Supplier')
            : $movement->from_type;

        $toLabel = $movement->to_type === 'out' ? 'Keluar' : $movement->to_type;

        return [
            $movement->created_at->format('d-m-Y H:i'),
            $movement->product->title ?? '-',
            $movement->product->sku ?? '-',
            $typeLabel,
            $fromLabel,
            $toLabel,
            $movement->quantity,
            $movement->purchase_price,
            $movement->loss_amount,
            $movement->user->name ?? '-',
            $movement->note,
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }
}
