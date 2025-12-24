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

class StockImport implements ToCollection, WithHeadingRow, WithValidation
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
            $rowNumber = $index + 2; // +2 for header row and 0-index
            
            // Skip empty rows
            if (empty($row['jumlah_isi']) && empty($row['harga_beli_isi'])) {
                continue;
            }

            $productId = $row['id_produk'] ?? null;
            $quantity = floatval($row['jumlah_isi'] ?? 0);
            $purchasePrice = floatval($row['harga_beli_isi'] ?? 0);

            // Validate product exists
            $product = Product::find($productId);
            if (!$product) {
                $this->errors[] = "Baris {$rowNumber}: Produk ID {$productId} tidak ditemukan";
                continue;
            }

            // Validate quantity
            if ($quantity <= 0) {
                $this->errors[] = "Baris {$rowNumber}: Jumlah harus lebih dari 0";
                continue;
            }

            try {
                DB::transaction(function () use ($product, $quantity, $purchasePrice) {
                    // Add or update warehouse stock
                    $stock = WarehouseStock::firstOrCreate(
                        [
                            'warehouse_id' => $this->warehouseId,
                            'product_id' => $product->id,
                        ],
                        ['quantity' => 0]
                    );
                    $stock->increment('quantity', $quantity);

                    // Create stock movement record
                    StockMovement::create([
                        'product_id' => $product->id,
                        'from_type' => StockMovement::TYPE_SUPPLIER,
                        'from_id' => $this->supplierId,
                        'supplier_id' => $this->supplierId,
                        'to_type' => StockMovement::TYPE_WAREHOUSE,
                        'to_id' => $this->warehouseId,
                        'quantity' => $quantity,
                        'purchase_price' => $purchasePrice > 0 ? $purchasePrice : null,
                        'note' => 'Import dari Excel',
                        'user_id' => $this->userId,
                    ]);

                    $this->importedCount++;
                });
            } catch (\Exception $e) {
                $this->errors[] = "Baris {$rowNumber}: " . $e->getMessage();
            }
        }
    }

    public function rules(): array
    {
        return [
            'id_produk' => 'nullable|integer',
            'jumlah_isi' => 'nullable|numeric',
            'harga_beli_isi' => 'nullable|numeric',
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
