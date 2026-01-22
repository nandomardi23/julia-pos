import React, { useState, useEffect } from 'react';
import { WebSocketPrintService } from '@/Services/PrintService';

export default function WebSocketPrintTest() {
    const [status, setStatus] = useState({ connected: false, message: 'Not connected' });
    const [testResult, setTestResult] = useState('');

    useEffect(() => {
        // Register status callback
        WebSocketPrintService.onStatusChange(setStatus);

        // Try to connect
        WebSocketPrintService.connect().catch(err => {
            console.log('Initial connection failed:', err.message);
        });

        return () => {
            WebSocketPrintService.disconnect();
        };
    }, []);

    const handleTestPrint = async () => {
        setTestResult('Printing...');
        const result = await WebSocketPrintService.testPrint('POS-80');
        setTestResult(result.success ? '✓ ' + result.message : '✗ ' + result.message);
    };

    const handleOpenDrawer = async () => {
        setTestResult('Opening drawer...');
        const result = await WebSocketPrintService.openCashDrawer('POS-80');
        setTestResult(result.success ? '✓ ' + result.message : '✗ ' + result.message);
    };

    const handleCheckStatus = async () => {
        setTestResult('Checking...');
        const result = await WebSocketPrintService.checkConnection();
        setTestResult(`${result.connected ? '✓' : '✗'} ${result.message}`);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">WebSocket Print Server Test</h3>
            
            <div className="mb-4">
                <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${status.connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm">
                        {status.message}
                        {status.reconnecting && ' (Reconnecting...)'}
                    </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                    Server: {WebSocketPrintService.serverUrl}
                </p>
            </div>

            <div className="space-y-2 mb-4">
                <button
                    onClick={handleCheckStatus}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Check Status
                </button>
                
                <button
                    onClick={handleTestPrint}
                    disabled={!status.connected}
                    className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300"
                >
                    Test Print
                </button>
                
                <button
                    onClick={handleOpenDrawer}
                    disabled={!status.connected}
                    className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-gray-300"
                >
                    Open Drawer
                </button>
            </div>

            {testResult && (
                <div className="p-3 bg-gray-100 rounded text-sm">
                    {testResult}
                </div>
            )}

            <div className="mt-4 pt-4 border-t text-xs text-gray-600">
                <p className="font-semibold mb-1">ℹ️ Setup Instructions:</p>
                <ol className="list-decimal list-inside space-y-1">
                    <li>Go to <code className="bg-gray-200 px-1">printer-server</code> directory</li>
                    <li>Run: <code className="bg-gray-200 px-1">composer install</code></li>
                    <li>Start server: <code className="bg-gray-200 px-1">start.bat</code> (Windows) or <code className="bg-gray-200 px-1">./start.sh</code> (Linux/Mac)</li>
                </ol>
            </div>
        </div>
    );
}
