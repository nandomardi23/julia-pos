<?php

namespace App\Imports;

use App\Models\Product;
use App\Models\StockMovement;
use App\Models\WarehouseStock;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class StockMovementImport implements ToCollection, WithHeadingRow, WithValidation
{
    protected $warehouseId;
    protected $supplierId;
    protected $userId;
    protected $importedCount = 0;
    protected $errors = [];

    public function __construct($warehouseId, $supplierId = null, $userId = null)
    {
        $this->warehouseId = $warehouseId;
        $this->supplierId = $supplierId;
        $this->userId = $userId ?? auth()->id();
    }

    public function collection(Collection $rows)
    {
        foreach ($rows as $index => $row) {
            $rowNumber = $index + 2; // Adjust for header and 0-index

            $sku = $row['sku'] ?? null;
            $quantity = floatval($row['jumlah'] ?? 0);
            $purchasePrice = floatval($row['harga_beli'] ?? 0);

            if (empty($sku)) {
                $this->errors[] = "Baris {$rowNumber}: SKU kosong";
                continue;
            }

            $product = Product::where('sku', $sku)->first();

            if (!$product) {
                // Try finding by barcode if SKU not found
                $product = Product::where('barcode', $sku)->first();
            }

            if (!$product) {
                $this->errors[] = "Baris {$rowNumber}: Produk dengan SKU/Barcode '{$sku}' tidak ditemukan";
                continue;
            }

            if ($quantity <= 0) {
                $this->errors[] = "Baris {$rowNumber}: Jumlah harus lebih dari 0";
                continue;
            }

            try {
                DB::transaction(function () use ($product, $quantity, $purchasePrice) {
                    // Update Warehouse Stock
                    $stock = WarehouseStock::firstOrCreate(
                        [
                            'warehouse_id' => $this->warehouseId,
                            'product_id' => $product->id,
                        ],
                        ['quantity' => 0]
                    );
                    $stock->increment('quantity', $quantity);

                    // Create Stock Movement
                    StockMovement::create([
                        'product_id' => $product->id,
                        'from_type' => StockMovement::TYPE_SUPPLIER,
                        'from_id' => $this->supplierId,
                        'supplier_id' => $this->supplierId,
                        'to_type' => StockMovement::TYPE_WAREHOUSE,
                        'to_id' => $this->warehouseId,
                        'quantity' => $quantity,
                        'purchase_price' => $purchasePrice > 0 ? $purchasePrice : ($product->buy_price ?? 0),
                        'note' => 'Import Barang Masuk via Excel',
                        'user_id' => $this->userId,
                    ]);

                    // Update Average Cost
                    $product->updateAverageCost();

                    $this->importedCount++;
                });
            } catch (\Exception $e) {
                $this->errors[] = "Baris {$rowNumber}: Gagal import item {$sku}. Error: " . $e->getMessage();
            }
        }
    }

    public function rules(): array
    {
        return [
            'sku' => 'required',
            'jumlah' => 'required|numeric|min:0.01',
        ];
    }

    public function getImportedCount(): int
    {
        return $this->importedCount;
    }

    public function getErrors(): array
    {
        return $this->errors;
    }
}
