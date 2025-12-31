<?php

namespace App\Exports;

use App\Models\Product;
use App\Models\StockMovement;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class StockReportExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize, WithStyles
{
    protected $filters;
    protected $soldQuantities;
    protected $damagedQuantities;

    public function __construct($filters = [])
    {
        $this->filters = $filters;
        $this->preloadSoldAndDamagedQuantities();
    }

    /**
     * Preload sold and damaged quantities to avoid N+1 queries
     */
    private function preloadSoldAndDamagedQuantities()
    {
        // Get sold quantities (movements to transaction)
        $this->soldQuantities = StockMovement::where('to_type', 'transaction')
            ->selectRaw('product_id, SUM(quantity) as total_sold')
            ->groupBy('product_id')
            ->pluck('total_sold', 'product_id')
            ->toArray();

        // Get damaged/out quantities (movements to out with loss_amount > 0)
        $this->damagedQuantities = StockMovement::where('to_type', 'out')
            ->where('loss_amount', '>', 0)
            ->selectRaw('product_id, SUM(quantity) as total_damaged')
            ->groupBy('product_id')
            ->pluck('total_damaged', 'product_id')
            ->toArray();
    }

    public function collection()
    {
        $query = Product::with(['warehouseStocks', 'displayStocks', 'category'])
            ->whereIn('product_type', [Product::TYPE_SELLABLE, Product::TYPE_INGREDIENT, Product::TYPE_SUPPLY]);

        // Apply filters
        if (!empty($this->filters['category_id'])) {
            $query->where('category_id', $this->filters['category_id']);
        }

        if (!empty($this->filters['search'])) {
            $search = $this->filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('sku', 'like', "%{$search}%");
            });
        }

        return $query->orderBy('title')->get();
    }

    public function headings(): array
    {
        return [
            'Nama Produk',
            'SKU',
            'Kategori',
            'Stok di Warehouse',
            'Stok Di Display',
            'Stok Rusak',
            'Terjual',
            'Total Stok',
        ];
    }

    public function map($product): array
    {
        $warehouseStock = $product->warehouseStocks->sum('quantity');
        $displayStock = $product->displayStocks->sum('quantity');
        $soldQty = $this->soldQuantities[$product->id] ?? 0;
        $damagedQty = $this->damagedQuantities[$product->id] ?? 0;
        $totalStock = $warehouseStock + $displayStock;

        return [
            $product->title,
            $product->sku ?? '-',
            $product->category->name ?? '-',
            $this->formatNumber($warehouseStock),
            $this->formatNumber($displayStock),
            $this->formatNumber($damagedQty),
            $this->formatNumber($soldQty),
            $this->formatNumber($totalStock),
        ];
    }

    private function formatNumber($value)
    {
        if (floor($value) == $value) {
            return (int)$value;
        }
        return round($value, 2);
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => [
                'font' => ['bold' => true],
                'fill' => [
                    'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'startColor' => ['rgb' => 'E2E8F0'],
                ],
            ],
        ];
    }
}
