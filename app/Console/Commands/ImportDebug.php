<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\ProductImport;
use Illuminate\Support\Facades\Log;

class ImportDebug extends Command
{
    protected $signature = 'import:debug {file}';
    protected $description = 'Debug product import';

    public function handle()
    {
        $file = $this->argument('file');
        $this->info("Starting import of {$file}...");

        try {
            Excel::import(new ProductImport, $file);
            $this->info("Import completed.");
        } catch (\Exception $e) {
            $this->error("Import failed: " . $e->getMessage());
            if (method_exists($e, 'failures')) {
                foreach ($e->failures() as $failure) {
                    $this->error("Row " . $failure->row() . ": " . implode(', ', $failure->errors()));
                }
            }
        }
    }
}
