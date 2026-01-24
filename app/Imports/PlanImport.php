<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\ToArray;
use Maatwebsite\Excel\Concerns\WithCalculatedFormulas;
use Maatwebsite\Excel\Concerns\WithStartRow;

class PlanImport implements ToArray, WithStartRow, WithCalculatedFormulas
{
    /**
     * @return int
     */
    public function startRow(): int
    {
        return 4; // Data starts at row 4
    }

    /**
     * @param array $array
     * @return array
     */
    public function array(array $array)
    {
        return $array;
    }
}
