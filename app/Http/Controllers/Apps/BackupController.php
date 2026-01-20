<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BackupController extends Controller
{
    /**
     * Download database backup using pure PHP (no mysqldump dependency).
     */
    public function download()
    {
        $filename = 'backup-' . date('Y-m-d-H-i-s') . '.sql';
        
        return new StreamedResponse(function () {
            $this->generateBackup();
        }, 200, [
            'Content-Type' => 'application/x-sql',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
        ]);
    }

    /**
     * Generate SQL dump using PHP PDO.
     */
    private function generateBackup()
    {
        $pdo = DB::connection()->getPdo();
        $dbName = config('database.connections.mysql.database');

        // Header
        echo "-- Database Backup\n";
        echo "-- Generated: " . date('Y-m-d H:i:s') . "\n";
        echo "-- Database: {$dbName}\n";
        echo "-- --------------------------------------------------------\n\n";
        echo "SET FOREIGN_KEY_CHECKS=0;\n";
        echo "SET SQL_MODE = \"NO_AUTO_VALUE_ON_ZERO\";\n";
        echo "SET AUTOCOMMIT = 0;\n";
        echo "START TRANSACTION;\n";
        echo "SET time_zone = \"+00:00\";\n\n";
        flush();

        // Get all tables
        $tables = $pdo->query("SHOW TABLES")->fetchAll(\PDO::FETCH_COLUMN);

        foreach ($tables as $table) {
            // Skip migrations table optionally
            // if ($table === 'migrations') continue;

            echo "-- --------------------------------------------------------\n";
            echo "-- Table structure for `{$table}`\n";
            echo "-- --------------------------------------------------------\n\n";

            // Drop table
            echo "DROP TABLE IF EXISTS `{$table}`;\n";

            // Create table
            $createTable = $pdo->query("SHOW CREATE TABLE `{$table}`")->fetch(\PDO::FETCH_ASSOC);
            echo $createTable['Create Table'] . ";\n\n";
            flush();

            // Get data
            $rows = $pdo->query("SELECT * FROM `{$table}`");
            $rowCount = 0;
            $insertValues = [];

            while ($row = $rows->fetch(\PDO::FETCH_ASSOC)) {
                $rowCount++;
                $values = [];
                
                foreach ($row as $value) {
                    if ($value === null) {
                        $values[] = 'NULL';
                    } elseif (is_numeric($value)) {
                        $values[] = $value;
                    } else {
                        $values[] = $pdo->quote($value);
                    }
                }
                
                $insertValues[] = '(' . implode(', ', $values) . ')';

                // Batch insert every 100 rows for efficiency
                if (count($insertValues) >= 100) {
                    $columns = array_keys($row);
                    echo "INSERT INTO `{$table}` (`" . implode('`, `', $columns) . "`) VALUES\n";
                    echo implode(",\n", $insertValues) . ";\n\n";
                    flush();
                    $insertValues = [];
                }
            }

            // Insert remaining rows
            if (!empty($insertValues)) {
                // We need to get column names again
                $sampleRow = $pdo->query("SELECT * FROM `{$table}` LIMIT 1")->fetch(\PDO::FETCH_ASSOC);
                if ($sampleRow) {
                    $columns = array_keys($sampleRow);
                    echo "INSERT INTO `{$table}` (`" . implode('`, `', $columns) . "`) VALUES\n";
                    echo implode(",\n", $insertValues) . ";\n\n";
                }
                flush();
            }

            if ($rowCount > 0) {
                echo "-- {$rowCount} rows exported from `{$table}`\n\n";
            }
            flush();
        }

        echo "SET FOREIGN_KEY_CHECKS=1;\n";
        echo "COMMIT;\n";
        echo "\n-- Backup completed successfully\n";
        flush();
    }
}
