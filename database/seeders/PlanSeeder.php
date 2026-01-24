<?php

namespace Database\Seeders;

use App\Imports\PlanImport;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\Warehouse;
use App\Models\WarehouseStock;


class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $file = base_path('Plan.xlsx');

        if (!file_exists($file)) {
            $this->command->error("File Plan.xlsx not found at $file");
            return;
        }

        $this->command->info("Reading Plan.xlsx...");

        // Use the Import class to handle formula calculation
        $data = Excel::toArray(new PlanImport, $file);

        // $data[0] is the first sheet
        $rows = $data[0];

        $this->command->info("Found " . count($rows) . " rows to process.");

        foreach ($rows as $index => $row) {
            // Mapping based on inspection:
            // 0: NO
            // 1: NAMA
            // 2: Kategori (Formula) -> often empty in raw read if not calculated, but we use WithCalculatedFormulas
            // 3: Harga Beli Persatuan
            // 4: Harga Jual Persatuan (" Rp 35,000 ")
            // 5: Jenis Satuan ("KG", "PCS")
            // 6: Barcode ("621110100001")
            // ...
            // 13: No (Duplicate?)
            // 14: Nama-Kategori ("Sayuran") -> This seems reliably populated in the inspected data
            // 15: Kode awal Untuk Barcode

            $name = $row[1];
            $categoryName = $row[14] ?? null;
            $buyPriceRaw = $row[3];
            $sellPriceRaw = $row[4];
            $unit = $row[5] ?? 'pcs';
            $barcode = $row[6];

            // Skip empty rows
            if (empty($name) || empty($barcode)) {
                continue;
            }

            // Skip header row if it slipped through
            if ($name === 'NAMA' || $barcode === 'Barcode') {
                continue;
            }

            // Clean prices
            $buyPrice = (int) str_replace(['Rp', ',', '.', ' '], '', $buyPriceRaw ?: '0');
            $sellPrice = (int) str_replace(['Rp', ',', '.', ' '], '', $sellPriceRaw ?: '0');

            // Find or Create Category
            // Default to "Uncategorized" if empty, though inspection showed "Nama-Kategori" had data
            $finalCategoryName = $categoryName ?: 'Uncategorized';

            $category = Category::firstOrCreate(
                ['name' => $finalCategoryName],
                ['description' => 'Imported from Plan.xlsx']
            );

            $product = Product::updateOrCreate(
                ['barcode' => $barcode],
                [
                    'title' => $name,
                    'category_id' => $category->id,
                    'buy_price' => $buyPrice,
                    'sell_price' => $sellPrice,
                    'unit' => $unit,
                    'image' => 'no-image.png', // Default image
                    'description' => "Imported product",
                    'product_type' => 'sellable',
                    'min_stock' => 0,
                    'average_cost' => $buyPrice, // Init average cost with buy price
                    'sku' => $barcode, // Using barcode as SKU for now if unique
                ]
            );

            // Handle Initial Stock (QTY)
            $quantity = (int) ($row[7] ?? 0);
            if ($quantity > 0) {
                // Ensure a default warehouse exists
                $warehouse = Warehouse::firstOrCreate(
                    ['name' => 'Gudang Utama'],
                    ['location' => 'Pusat', 'is_active' => true]
                );

                // Update or Create Stock
                WarehouseStock::updateOrCreate(
                    [
                        'warehouse_id' => $warehouse->id,
                        'product_id' => $product->id,
                    ],
                    [
                        'quantity' => $quantity // Set stock level
                    ]
                );
            }

            // $this->command->info("Processed: $name");
        }

        $this->command->info("Plan.xlsx import completed.");
    }
}
