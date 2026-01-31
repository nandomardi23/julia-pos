<?php

namespace App\Imports;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class ProductImport implements ToCollection, WithHeadingRow, WithValidation
{
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            // Normalize category name
            $categoryName = trim($row['kategori'] ?? 'Uncategorized');

            // Find or create category
            $category = Category::firstOrCreate(
                ['name' => $categoryName],
                ['description' => 'Imported category']
            );

            // Prepare product data
            $productData = [
                'barcode' => $row['barcode'] ?? null,
                'title' => $row['nama_produk'],
                'description' => $row['deskripsi'] ?? null,
                'category_id' => $category->id,
                'buy_price' => $row['harga_beli'] ?? 0,
                'sell_price' => $row['harga_jual'] ?? 0,
                'unit' => $row['satuan'] ?? 'pcs',
                'min_stock' => $row['stok_minimal'] ?? 0,
                'product_type' => 'sellable', // Default type
            ];

            // Handle SKU: use provided or generate new
            $sku = $row['sku'] ?? null;
            if (empty($sku)) {
                $sku = Product::generateSku($category, $row['nama_produk']);
            }

            // Handle Barcode: use provided or null (do not generate)
            $barcode = $row['barcode'] ?? null;

            // Update or Create Product
            // If SKU existed in file, we try to find by SKU and update.
            // If SKU was generated, it will be a create
            Product::updateOrCreate(
                ['sku' => $sku],
                array_merge($productData, [
                    'sku' => $sku,
                    'barcode' => $barcode // Can be null
                ])
            );
        }
    }

    public function rules(): array
    {
        return [
            'sku' => 'nullable|string',
            'nama_produk' => 'required|string',
            'harga_beli' => 'numeric|min:0',
            'harga_jual' => 'numeric|min:0',
        ];
    }
}
