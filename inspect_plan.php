<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

$kernel->bootstrap();

use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\Concerns\ToArray;

class PlanImport implements ToArray
{
    public function array(array $array)
    {
        return $array;
    }
}

try {
    $data = Excel::toArray(new PlanImport, __DIR__ . '/Plan.xlsx');

    echo "Found " . count($data) . " sheets.\n";
    foreach ($data as $sheetIndex => $sheet) {
        echo "Sheet $sheetIndex has " . count($sheet) . " rows.\n";
        echo "First 5 rows:\n";
        print_r(array_slice($sheet, 0, 5));
    }
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString();
}
