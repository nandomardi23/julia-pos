<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Services\ThermalPrintService;
use Illuminate\Http\Request;

class PrintController extends Controller
{
    protected ThermalPrintService $printService;

    public function __construct(ThermalPrintService $printService)
    {
        $this->printService = $printService;
    }

    /**
     * Print receipt for a transaction
     * Auto-opens cash drawer for cash payments
     */
    public function printReceipt(string $invoice)
    {
        $transaction = Transaction::where('invoice', $invoice)->firstOrFail();
        
        // Auto-open drawer for cash payments
        $openDrawer = $transaction->payment_method === 'cash';
        
        $result = $this->printService->printReceipt($transaction, $openDrawer);
        
        return response()->json($result);
    }

    /**
     * Open cash drawer
     */
    public function openDrawer()
    {
        $result = $this->printService->openCashDrawer();
        
        return response()->json($result);
    }

    /**
     * Test print
     */
    public function testPrint()
    {
        $result = $this->printService->testPrint();
        
        return response()->json($result);
    }

    /**
     * Get printer status
     */
    public function status()
    {
        $result = $this->printService->getStatus();
        
        return response()->json($result);
    }
}
