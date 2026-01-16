import React, { useEffect, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { IconArrowLeft, IconPrinter, IconCash, IconSettings } from "@tabler/icons-react";
import toast, { Toaster } from "react-hot-toast";
import PrintService from "@/Services/PrintService";

export default function Print({ transaction }) {
    const { app_settings: settings = {} } = usePage().props;
    const [thermalPrinting, setThermalPrinting] = useState(false);
    const [drawerOpening, setDrawerOpening] = useState(false);
    const [printers, setPrinters] = useState([]);
    const [selectedPrinter, setSelectedPrinter] = useState('');
    const [showPrinterSelect, setShowPrinterSelect] = useState(false);
    const [qzStatus, setQzStatus] = useState('checking...');

    // Load printers on mount
    useEffect(() => {
        const loadPrinters = async () => {
            if (PrintService.isAvailable()) {
                try {
                    const status = await PrintService.checkConnection();
                    setQzStatus(status.connected ? '✓ Terhubung' : '✗ Tidak terhubung');
                    if (status.printers) {
                        setPrinters(status.printers);
                        if (status.thermalPrinter) {
                            setSelectedPrinter(status.thermalPrinter);
                        }
                    }
                } catch (err) {
                    setQzStatus('✗ Error: ' + err.message);
                }
            } else {
                setQzStatus('✗ QZ Tray tidak terdeteksi');
            }
        };
        loadPrinters();
    }, []);

    useEffect(() => {
        // Try thermal print first, fallback to browser print
        const attemptPrint = async () => {
            // Check if QZ Tray is available
            if (PrintService.isAvailable()) {
                setThermalPrinting(true);
                try {
                    // Determine if drawer should open (cash only)
                    const isCash = transaction?.payment_method?.toLowerCase() === 'cash';

                    const result = await PrintService.printAndOpenDrawer(
                        transaction,
                        settings,
                        isCash // Only open drawer for cash
                    );

                    if (result.print.success) {
                        toast.success('Struk dicetak ke printer thermal');
                        if (isCash && result.drawer.success && !result.drawer.skipped) {
                            toast.success('Laci kasir dibuka');
                        }
                    } else if (result.print.fallback) {
                        // Fallback to browser print
                        console.log('Fallback to browser print');
                        window.print();
                    }
                } catch (err) {
                    console.error('Thermal print error:', err);
                    // Fallback to browser print
                    window.print();
                } finally {
                    setThermalPrinting(false);
                }
            } else {
                // QZ Tray not available, use browser print
                const timer = setTimeout(() => {
                    window.print();
                }, 500);
                return () => clearTimeout(timer);
            }
        };

        attemptPrint();
    }, []);

    // Handle manual thermal print
    const handleThermalPrint = async () => {
        if (thermalPrinting) return;

        setThermalPrinting(true);
        try {
            const result = await PrintService.printReceipt(transaction, settings);
            if (result.success) {
                toast.success('Struk dicetak ke printer thermal');
            } else {
                toast.error(result.message || 'Gagal cetak thermal');
                // Offer browser print as alternative
                if (result.fallback) {
                    window.print();
                }
            }
        } catch (err) {
            toast.error('Gagal cetak: ' + err.message);
        } finally {
            setThermalPrinting(false);
        }
    };

    // Handle manual drawer open
    const handleOpenDrawer = async () => {
        if (drawerOpening) return;

        setDrawerOpening(true);
        try {
            const result = await PrintService.openCashDrawer();
            if (result.success) {
                toast.success('Laci kasir dibuka');
            } else {
                toast.error(result.message || 'Gagal buka laci');
            }
        } catch (err) {
            toast.error('Gagal buka laci: ' + err.message);
        } finally {
            setDrawerOpening(false);
        }
    };

    const formatPrice = (price = 0) =>
        Number(price || 0).toLocaleString("id-ID");

    const formatDate = (value) =>
        new Date(value).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

    const formatTime = (value) =>
        new Date(value).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });

    const items = transaction?.details ?? [];
    const totalQty = items.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
    // Calculate subTotal from item details for accuracy
    const calculatedSubTotal = items.reduce((sum, item) => {
        const qty = Number(item.qty) || 0;
        const price = Number(item.price) || 0;
        return sum + (qty * price);
    }, 0);

    const paymentLabels = {
        cash: "Cash",
        transfer: "Transfer",
        qris: "QRIS",
    };
    const paymentMethodLabel = paymentLabels[transaction?.payment_method?.toLowerCase()] ?? "Cash";

    return (
        <>
            <Head title="Struk Penjualan" />

            {/* Print Styles */}
            <style>{`
                @media print {
                    @page {
                        size: 80mm auto;
                        margin: 0;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                        -webkit-print-color-adjust: exact;
                    }
                    .no-print {
                        display: none !important;
                    }
                    .receipt-container {
                        width: 80mm;
                        margin: 0;
                        padding: 8px;
                        box-shadow: none;
                        border: none;
                    }
                }
                .receipt-container {
                    font-family: 'Courier New', monospace;
                    font-size: 12px;
                    line-height: 1.4;
                }
                .divider {
                    border-top: 1px dashed #333;
                    margin: 8px 0;
                }
            `}</style>

            <div className="min-h-screen bg-gray-100 py-8 px-4">
                <Toaster position="top-right" />

                {/* Action Buttons */}
                <div className="max-w-md mx-auto mb-4 no-print">
                    <div className="flex items-center justify-between mb-3">
                        <Link
                            href={route("pos.index")}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                            <IconArrowLeft size={16} />
                            Kembali
                        </Link>
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            <IconPrinter size={16} />
                            Cetak Browser
                        </button>
                    </div>

                    {/* Thermal Printer Actions */}
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={handleThermalPrint}
                            disabled={thermalPrinting}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <IconPrinter size={16} />
                            {thermalPrinting ? 'Mencetak...' : 'Cetak Thermal'}
                        </button>
                        <button
                            type="button"
                            onClick={handleOpenDrawer}
                            disabled={drawerOpening}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-amber-600 rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <IconCash size={16} />
                            {drawerOpening ? '...' : 'Buka Laci'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowPrinterSelect(!showPrinterSelect)}
                            className="inline-flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                            title="Pengaturan Printer"
                        >
                            <IconSettings size={16} />
                        </button>
                    </div>

                    {/* Printer Debug Panel */}
                    {showPrinterSelect && (
                        <div className="mt-3 p-3 bg-gray-50 border rounded-lg text-sm">
                            <div className="font-semibold text-gray-700 mb-2">🔧 Debug Printer</div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">QZ Tray:</span>
                                    <span className={qzStatus.includes('✓') ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                        {qzStatus}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Printer Dipilih:</span>
                                    <span className="text-blue-600 font-medium">{selectedPrinter || '-'}</span>
                                </div>
                                <div>
                                    <span className="text-gray-600 block mb-1">Printer Tersedia:</span>
                                    {printers.length > 0 ? (
                                        <select
                                            value={selectedPrinter}
                                            onChange={(e) => {
                                                setSelectedPrinter(e.target.value);
                                                PrintService.setSelectedPrinter(e.target.value);
                                                toast.success(`Printer dipilih: ${e.target.value}`);
                                            }}
                                            className="w-full px-2 py-1.5 border rounded text-sm"
                                        >
                                            {printers.map(p => (
                                                <option key={p} value={p}>{p}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <span className="text-gray-400 italic">Tidak ada printer terdeteksi</span>
                                    )}
                                </div>
                                <div className="text-xs text-gray-500 mt-2 pt-2 border-t">
                                    💡 Pastikan printer thermal Kassen muncul di daftar di atas dan terpilih.
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Receipt */}
                <div className="receipt-container max-w-md mx-auto bg-white p-6 shadow-lg rounded-lg">
                    {/* Header - Logo & Store Info */}
                    <div className="text-center mb-4">
                        {settings.store_logo ? (
                            <img
                                src={`/storage/settings/${settings.store_logo}`}
                                alt="Logo"
                                className="w-16 h-16 mx-auto mb-2 object-contain"
                            />
                        ) : (
                            <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded flex items-center justify-center">
                                <span className="text-2xl font-bold text-gray-500">
                                    {(settings.store_name || 'S').charAt(0)}
                                </span>
                            </div>
                        )}
                        <h1 className="font-bold text-lg">{settings.store_name || 'Toko'}</h1>
                        {settings.store_address && (
                            <p className="text-xs text-gray-600">{settings.store_address}</p>
                        )}
                        {settings.store_phone && (
                            <p className="text-xs text-gray-600">No. Telp {settings.store_phone}</p>
                        )}
                        <p className="text-xs text-gray-600">{transaction.invoice}</p>
                    </div>

                    <div className="divider"></div>

                    {/* Transaction Info */}
                    <div className="flex justify-between text-xs mb-1">
                        <span>{formatDate(transaction.created_at)}</span>
                        <span>{transaction.cashier?.name || 'Kasir'}</span>
                    </div>
                    <div className="flex justify-between text-xs mb-2">
                        <span>{formatTime(transaction.created_at)}</span>
                    </div>

                    <div className="divider"></div>

                    {/* Items */}
                    <div className="space-y-2 mb-2">
                        {items.map((item, index) => {
                            const qty = Number(item.qty) || 1;
                            const price = Number(item.price) || 0;
                            const subtotal = qty * price;

                            return (
                                <div key={item.id ?? index}>
                                    <div className="font-semibold text-sm">
                                        {index + 1}. {item.product?.title}
                                        {item.variant_name && (
                                            <span className="font-normal text-gray-600"> ({item.variant_name})</span>
                                        )}
                                    </div>
                                    <div className="flex justify-between text-xs pl-4">
                                        <span>{qty} x {formatPrice(price)}</span>
                                        <span>Rp {formatPrice(subtotal)}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="divider"></div>

                    {/* Totals */}
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                            <span>Total QTY : {totalQty}</span>
                        </div>
                        <div className="divider"></div>

                        <div className="flex justify-between">
                            <span>Sub Total</span>
                            <span>Rp {formatPrice(calculatedSubTotal)}</span>
                        </div>
                        {(transaction.discount || 0) > 0 && (
                            <div className="flex justify-between text-red-600">
                                <span>Diskon</span>
                                <span>- Rp {formatPrice(transaction.discount)}</span>
                            </div>
                        )}
                        <div className="flex justify-between font-bold text-base">
                            <span>Total</span>
                            <span>Rp {formatPrice(transaction.grand_total)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Bayar ({paymentMethodLabel})</span>
                            <span>Rp {formatPrice(transaction.cash)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Kembali</span>
                            <span>Rp {formatPrice(transaction.change)}</span>
                        </div>
                    </div>

                    <div className="divider"></div>

                    {/* Footer */}
                    <div className="text-center text-xs text-gray-600 mt-4">
                        <p className="font-semibold">Terimakasih Telah Berbelanja</p>
                        {settings.store_website && (
                            <p className="mt-2 text-gray-500">{settings.store_website}</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
