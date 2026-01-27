import React from "react";
import { Head, Link } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { IconArrowLeft, IconPrinter, IconReceipt, IconUser, IconCalendar, IconCash, IconDiscount } from "@tabler/icons-react";

export default function Show({ transaction }) {
    const formatPrice = (price = 0) =>
        Number(price || 0).toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        });

    const formatDateTime = (value) =>
        new Date(value).toLocaleString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }).replace(/\./g, ':');

    const items = transaction?.details ?? [];
    const totalQty = items.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);

    const paymentLabels = {
        cash: "Tunai",
        transfer: "Transfer Bank",
        qris: "QRIS",
    };
    const paymentMethodLabel = paymentLabels[transaction?.payment_method?.toLowerCase()] ?? "Tunai";

    const statusColors = {
        paid: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        failed: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };
    const statusLabels = {
        paid: "Lunas",
        pending: "Menunggu",
        failed: "Gagal",
    };

    return (
        <>
            <Head title={`Detail Transaksi - ${transaction.invoice}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route("transactions.history")}
                            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <IconArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Detail Transaksi</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.invoice}</p>
                        </div>
                    </div>
                    <a
                        href={route("transactions.print", transaction.invoice)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                        <IconPrinter size={18} />
                        Cetak Struk
                    </a>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Transaction Info */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Status Card */}
                        <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white">Status</h3>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[transaction.payment_status] || statusColors.paid}`}>
                                    {statusLabels[transaction.payment_status] || "Lunas"}
                                </span>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <IconReceipt size={18} className="text-gray-400" />
                                    <span className="text-gray-500 dark:text-gray-400">Invoice</span>
                                    <span className="ml-auto font-medium text-gray-900 dark:text-white">{transaction.invoice}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <IconCalendar size={18} className="text-gray-400" />
                                    <span className="text-gray-500 dark:text-gray-400">Tanggal</span>
                                    <span className="ml-auto font-medium text-gray-900 dark:text-white">{formatDateTime(transaction.created_at)}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <IconUser size={18} className="text-gray-400" />
                                    <span className="text-gray-500 dark:text-gray-400">Kasir</span>
                                    <span className="ml-auto font-medium text-gray-900 dark:text-white">{transaction.cashier?.name ?? "-"}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <IconCash size={18} className="text-gray-400" />
                                    <span className="text-gray-500 dark:text-gray-400">Pembayaran</span>
                                    <span className="ml-auto font-medium text-gray-900 dark:text-white">{paymentMethodLabel}</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Summary */}
                        <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Ringkasan Pembayaran</h3>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">Subtotal ({totalQty} item)</span>
                                    <span className="text-gray-900 dark:text-white">{formatPrice((transaction.grand_total || 0) + (transaction.discount || 0) - (transaction.tax || 0))}</span>
                                </div>
                                {(transaction.discount || 0) > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                            <IconDiscount size={14} /> Diskon
                                        </span>
                                        <span className="text-red-500">- {formatPrice(transaction.discount)}</span>
                                    </div>
                                )}
                                {(transaction.tax || 0) > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">PPN ({Number(transaction.ppn) || 0}%)</span>
                                        <span className="text-gray-900 dark:text-white">{formatPrice(transaction.tax)}</span>
                                    </div>
                                )}
                                <div className="border-t dark:border-gray-700 pt-3 flex justify-between font-bold">
                                    <span className="text-gray-900 dark:text-white">Total</span>
                                    <span className="text-blue-600 dark:text-blue-400 text-lg">{formatPrice(transaction.grand_total)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">Bayar</span>
                                    <span className="text-gray-900 dark:text-white">{formatPrice(transaction.cash)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">Kembalian</span>
                                    <span className="text-green-600 dark:text-green-400 font-medium">{formatPrice(transaction.change)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800">
                            <div className="p-6 border-b dark:border-gray-800">
                                <h3 className="font-semibold text-gray-900 dark:text-white">Daftar Produk</h3>
                            </div>

                            <div className="divide-y dark:divide-gray-800">
                                {items.map((item, index) => {
                                    const qty = Number(item.qty) || 1;
                                    const price = Number(item.price) || 0;
                                    const subtotal = qty * price;

                                    return (
                                        <div key={item.id ?? index} className="p-4 flex items-center gap-4">
                                            {/* Product Image */}
                                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                                                {item.product?.image ? (
                                                    <img
                                                        src={item.product.image}
                                                        alt={item.product.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        <IconReceipt size={24} />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-gray-900 dark:text-white truncate">
                                                    {item.product?.title}
                                                </h4>
                                                {item.variant_name && (
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Varian: {item.variant_name}</p>
                                                )}
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {qty} x {formatPrice(price)}
                                                </p>
                                            </div>

                                            {/* Subtotal */}
                                            <div className="text-right">
                                                <p className="font-semibold text-gray-900 dark:text-white">{formatPrice(subtotal)}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Show.layout = page => <DashboardLayout children={page} />;
