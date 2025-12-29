import React, { useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { IconArrowLeft, IconPrinter } from "@tabler/icons-react";

export default function Print({ transaction }) {
    const { app_settings: settings = {} } = usePage().props;

    useEffect(() => {
        // Auto print after a short delay
        const timer = setTimeout(() => {
            window.print();
        }, 500);
        return () => clearTimeout(timer);
    }, []);

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
                {/* Action Buttons */}
                <div className="max-w-md mx-auto mb-4 flex items-center justify-between no-print">
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
                        Cetak
                    </button>
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
                            <span>Rp {formatPrice(transaction.grand_total + (transaction.discount || 0))}</span>
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
