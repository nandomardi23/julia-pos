<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BackupController extends Controller
{
    /**
     * Download database backup.
     */
    public function download()
    {
        $filename = 'backup-' . date('Y-m-d-H-i-s') . '.sql';
        
        $dbHost = config('database.connections.mysql.host');
        $dbName = config('database.connections.mysql.database');
        $dbUser = config('database.connections.mysql.username');
        $dbPass = config('database.connections.mysql.password');

        // Build command
        $command = sprintf(
            'mysqldump --host=%s --user=%s %s %s',
            escapeshellarg($dbHost),
            escapeshellarg($dbUser),
            $dbPass ? '--password=' . escapeshellarg($dbPass) : '',
            escapeshellarg($dbName)
        );

        return new StreamedResponse(function () use ($command) {
            $handle = popen($command, 'r');
            if ($handle) {
                while (!feof($handle)) {
                    echo fread($handle, 4096);
                    flush();
                }
                pclose($handle);
            }
        }, 200, [
            'Content-Type' => 'application/x-sql',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }
}
