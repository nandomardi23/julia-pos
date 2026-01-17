<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Product;

class GenerateBarcodes extends Command
{
    protected $signature = 'products:generate-barcodes {--force : Overwrite existing barcodes}';
    protected $description = 'Generate barcodes for products that don\'t have one';

    public function handle()
    {
        $force = $this->option('force');
        
        // Get products without barcode (or all if force)
        $query = Product::whereIn('product_type', ['sellable', 'recipe']);
        
        if (!$force) {
            $query->whereNull('barcode')->orWhere('barcode', '');
        }
        
        $products = $query->get();
        
        if ($products->isEmpty()) {
            $this->info('Semua produk sudah memiliki barcode!');
            return 0;
        }
        
        $this->info("Menemukan {$products->count()} produk untuk di-generate barcode...\n");
        
        $generated = 0;
        
        foreach ($products as $product) {
            // Generate barcode from SKU or random
            $barcode = $this->generateBarcode($product);
            
            // Make sure barcode is unique
            while (Product::where('barcode', $barcode)->where('id', '!=', $product->id)->exists()) {
                $barcode = $this->generateBarcode($product, true);
            }
            
            $product->barcode = $barcode;
            $product->save();
            
            $this->line("  [{$product->id}] {$product->title} => {$barcode}");
            $generated++;
        }
        
        $this->newLine();
        $this->info("✓ Berhasil generate {$generated} barcode!");
        
        return 0;
    }
    
    private function generateBarcode(Product $product, bool $random = false): string
    {
        if (!$random && $product->sku) {
            // Use SKU as barcode (cleaned up)
            return strtoupper(preg_replace('/[^A-Za-z0-9]/', '', $product->sku));
        }
        
        // Generate random barcode with prefix based on category
        $prefix = 'PRD';
        if ($product->category) {
            $prefix = strtoupper(substr($product->category->name, 0, 3));
        }
        
        $suffix = strtoupper(substr(md5($product->id . time() . rand()), 0, 8));
        
        return $prefix . '-' . $suffix;
    }
}
