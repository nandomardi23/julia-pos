<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ProfitsExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize, WithStyles
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
            'Pendapatan',
            'Profit',
            'Margin (%)',
        ];
    }

    public function map($transaction): array
    {
        $revenue = $transaction->grand_total ?? 0;
        $profit = $transaction->total_profit ?? 0;
        $margin = $revenue > 0 ? round(($profit / $revenue) * 100, 2) : 0;

        return [
            $transaction->invoice,
            $transaction->created_at,
            $transaction->cashier->name ?? '-',
            $transaction->total_items ?? 0,
            $revenue,
            $profit,
            $margin . '%',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }
}
