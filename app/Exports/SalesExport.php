<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class SalesExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize, WithStyles
{
    protected $transactions;

    public function __construct($transactions)
    {
        $this->transactions = $transactions;
    }

    public function collection()
    {
        return $this->transactions;
    }

    public function headings(): array
    {
        return [
            'Invoice',
            'Tanggal',
            'Kasir',
            'Total Items',
            'Diskon',
            'Grand Total',
            'Total Profit',
            'Metode Pembayaran',
        ];
    }

    public function map($transaction): array
    {
        return [
            $transaction->invoice,
            $transaction->created_at->format('d-m-Y H:i'),
            $transaction->cashier->name ?? '-',
            $transaction->total_items,
            $transaction->discount,
            $transaction->grand_total,
            $transaction->total_profit,
            strtoupper($transaction->payment_method),
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }
}
