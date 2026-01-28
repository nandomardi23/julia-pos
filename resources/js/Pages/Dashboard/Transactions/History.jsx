import React, { useEffect, useState } from "react";
import { Head, router, Link } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Card from "@/Components/Common/Card";
import Input from "@/Components/Common/Input";
import Button from "@/Components/Common/Button";
import Table from "@/Components/Common/Table";
import Pagination from "@/Components/Common/Pagination";
import {
    IconDatabaseOff,
    IconSearch,
    IconClockHour6,
    IconEye,
    IconPrinter,
    IconTrash,
    IconX,
    IconCash,
} from "@tabler/icons-react";
import toast from "react-hot-toast";
import { WebSocketPrintService } from "@/Services/PrintService";

const defaultFilters = {
    invoice: "",
    start_date: "",
    end_date: "",
};

const formatCurrency = (value = 0) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);

const formatPrice = (value = 0) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);

const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).replace(/\./g, ':');
};

const formatDateShort = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

const formatTime = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
};

const formatQty = (qty) => {
    // Format quantity: remove trailing zeros, max 3 decimals
    return parseFloat(Number(qty).toFixed(3)).toString();
};

const History = ({ transactions, filters, settings }) => {
    const [filterData, setFilterData] = useState({
        invoice: filters?.invoice ?? "",
        start_date: filters?.start_date ?? "",
        end_date: filters?.end_date ?? "",
    });

    // Receipt Modal State
    const [receiptModalOpen, setReceiptModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [loadingTransaction, setLoadingTransaction] = useState(false);
    const [thermalPrinting, setThermalPrinting] = useState(false);
    const [wsStatus, setWsStatus] = useState({ connected: false });

    useEffect(() => {
        setFilterData({
            invoice: filters?.invoice ?? "",
            start_date: filters?.start_date ?? "",
            end_date: filters?.end_date ?? "",
        });
    }, [filters]);

    // WebSocket connection
    useEffect(() => {
        WebSocketPrintService.onStatusChange((status) => {
            setWsStatus(status);
        });

        // Try to connect
        WebSocketPrintService.connect().catch(() => {});

        return () => {
            // Cleanup if needed
        };
    }, []);

    const handleChange = (field, value) => {
        setFilterData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleDelete = (invoice) => {
        if (confirm('Apakah Anda yakin ingin menghapus transaksi ini? Stok akan dikembalikan.')) {
            router.delete(route('transactions.destroy', invoice), {
                onSuccess: () => {
                    toast.success('Transaksi berhasil dihapus');
                },
                onError: () => {
                    toast.error('Gagal menghapus transaksi');
                }
            });
        }
    };

    const handleOpenReceiptModal = async (transaction) => {
        setLoadingTransaction(true);
        setReceiptModalOpen(true);

        try {
            // Fetch full transaction details
            const response = await fetch(route('api.transactions.show', transaction.invoice));
            const data = await response.json();
            setSelectedTransaction(data.transaction || data);
        } catch (error) {
            console.error('Failed to load transaction:', error);
            // Fallback to basic transaction data
            setSelectedTransaction(transaction);
            toast.error('Gagal memuat detail transaksi');
        } finally {
            setLoadingTransaction(false);
        }
    };

    const handleCloseReceiptModal = () => {
        setReceiptModalOpen(false);
        setSelectedTransaction(null);
    };

    const handleThermalPrint = async () => {
        if (!selectedTransaction) return;

        setThermalPrinting(true);
        try {
            const isCashPayment = selectedTransaction.payment_method?.toLowerCase() === 'cash';
            const result = await WebSocketPrintService.printReceipt(
                selectedTransaction,
                settings || {},
                isCashPayment
            );

            if (result.success) {
                toast.success('Struk berhasil dicetak');
            } else {
                toast.error(result.message || 'Gagal mencetak struk');
            }
        } catch (error) {
            toast.error('Gagal mencetak: ' + error.message);
        } finally {
            setThermalPrinting(false);
        }
    };

    const handleOpenDrawer = async () => {
        try {
            const result = await WebSocketPrintService.openCashDrawer();
            if (result.success) {
                toast.success('Laci kasir dibuka');
            } else {
                toast.error(result.message || 'Gagal membuka laci');
            }
        } catch (error) {
            toast.error('Gagal membuka laci: ' + error.message);
        }
    };

    const handleBrowserPrint = () => {
        window.print();
    };

    const applyFilters = (event) => {
        event.preventDefault();
        router.get(route("transactions.history"), filterData, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const resetFilters = () => {
        setFilterData(defaultFilters);
        router.get(route("transactions.history"), defaultFilters, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };

    const rows = transactions?.data ?? [];
    const links = transactions?.links ?? [];
    const currentPage = transactions?.current_page ?? 1;
    const perPage = transactions?.per_page
        ? Number(transactions?.per_page)
        : rows.length || 1;

    return (
        <>
            <Head title="Riwayat Transaksi" />
            <div className="space-y-6">
                <Table.Card
                    title="Riwayat Transaksi"
                    links={links}
                    meta={{
                        from: transactions?.from,
                        to: transactions?.to,
                        total: transactions?.total,
                        per_page: transactions?.per_page
                    }}
                    url={route('transactions.history')}
                >
                    {/* Filter Section */}
                    <form onSubmit={applyFilters} className="px-5 py-4 border-b dark:border-gray-800 bg-white dark:bg-gray-950">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Input
                                type="text"
                                label="No. Resi"
                                placeholder="Contoh: TRX-"
                                value={filterData.invoice}
                                onChange={(event) =>
                                    handleChange("invoice", event.target.value)
                                }
                            />
                            <Input
                                type="date"
                                label="Tanggal Mulai"
                                value={filterData.start_date}
                                onChange={(event) =>
                                    handleChange("start_date", event.target.value)
                                }
                            />
                            <Input
                                type="date"
                                label="Tanggal Selesai"
                                value={filterData.end_date}
                                onChange={(event) =>
                                    handleChange("end_date", event.target.value)
                                }
                            />
                            <div className="flex items-end gap-2">
                                <Button
                                    type="button"
                                    label="Reset"
                                    className="flex-1 border bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-900"
                                    onClick={resetFilters}
                                />
                                <Button
                                    type="submit"
                                    label="Cari"
                                    icon={<IconSearch size={18} />}
                                    className="flex-1 border bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-900"
                                />
                            </div>
                        </div>
                    </form>

                    {/* Table Section */}
                    <Table className="my-10 mt-5">
                        <Table.Thead>
                            <tr>
                                <Table.Th className="w-12 text-center">No</Table.Th>
                                <Table.Th>No. Resi</Table.Th>
                                <Table.Th>Tanggal</Table.Th>
                                <Table.Th>Kasir</Table.Th>
                                <Table.Th className="text-center">Jml Item</Table.Th>
                                <Table.Th className="text-right">Diskon</Table.Th>
                                <Table.Th className="text-right">Total</Table.Th>
                                <Table.Th className="text-right">Profit</Table.Th>
                                <Table.Th className="text-center">Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {rows.length ? (
                                rows.map((transaction, index) => (
                                    <tr
                                        key={transaction.id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                                    >
                                        <Table.Td className="text-center font-medium">
                                            {index + 1 + (currentPage - 1) * perPage}
                                        </Table.Td>
                                        <Table.Td className="font-semibold text-gray-900 dark:text-gray-100">
                                            {transaction.invoice}
                                        </Table.Td>
                                        <Table.Td>{formatDate(transaction.created_at)}</Table.Td>
                                        <Table.Td>{transaction.cashier?.name ?? "-"}</Table.Td>
                                        <Table.Td className="text-center">
                                            {transaction.details_count ?? transaction.details?.length ?? 0}
                                        </Table.Td>
                                        <Table.Td className="text-right">
                                            {formatCurrency(transaction.discount ?? 0)}
                                        </Table.Td>
                                        <Table.Td className="text-right font-semibold text-gray-900 dark:text-gray-100">
                                            {formatCurrency(transaction.grand_total ?? 0)}
                                        </Table.Td>
                                        <Table.Td className="text-right text-emerald-500 font-medium">
                                            {formatCurrency(transaction.total_profit ?? 0)}
                                        </Table.Td>
                                        <Table.Td>
                                            <div className="flex items-center justify-center gap-1">
                                                <Link
                                                    href={route('transactions.show', transaction.invoice)}
                                                    className="p-1.5 rounded-md text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30"
                                                    title="Lihat Detail"
                                                >
                                                    <IconEye size={14} />
                                                </Link>
                                                <button
                                                    onClick={() => handleOpenReceiptModal(transaction)}
                                                    className="p-1.5 rounded-md text-cyan-600 hover:bg-cyan-50 dark:text-cyan-400 dark:hover:bg-cyan-900/30"
                                                    title="Cetak Struk"
                                                >
                                                    <IconPrinter size={14} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(transaction.invoice)}
                                                    className="p-1.5 rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
                                                    title="Hapus"
                                                >
                                                    <IconTrash size={14} />
                                                </button>
                                            </div>
                                        </Table.Td>
                                    </tr>
                                ))
                            ) : (
                                <Table.Empty
                                    colSpan={9}
                                    message={
                                        <div className="text-gray-500">
                                            <IconDatabaseOff
                                                size={30}
                                                className="mx-auto mb-2 text-gray-400"
                                            />
                                            Belum ada transaksi sesuai filter.
                                        </div>
                                    }
                                />
                            )}
                        </Table.Tbody>
                    </Table>
                </Table.Card>
            </div>

            {/* Receipt Modal */}
            {receiptModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 print:bg-white print:p-0">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col shadow-2xl print:max-w-none print:max-h-none print:rounded-none print:shadow-none">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-800 print:hidden">
                            <h3 className="font-bold text-gray-900 dark:text-white">Struk Transaksi</h3>
                            <button
                                onClick={handleCloseReceiptModal}
                                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
                            >
                                <IconX size={20} />
                            </button>
                        </div>

                        {/* Receipt Preview */}
                        <div className="flex-1 overflow-y-auto p-4 print:overflow-visible">
                            {loadingTransaction ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
                                </div>
                            ) : selectedTransaction ? (
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 font-mono text-sm print:bg-white print:p-0">
                                    {/* Header */}
                                    <div className="text-center mb-3">
                                        {settings?.store_logo ? (
                                            <img
                                                src={`/storage/settings/${settings.store_logo}`}
                                                alt="Logo"
                                                className="w-12 h-12 mx-auto mb-2 object-contain"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 mx-auto mb-2 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center print:hidden">
                                                <span className="text-xl font-bold text-gray-500">
                                                    {(settings?.store_name || 'S').charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                        <h4 className="font-bold">{settings?.store_name || 'Toko'}</h4>
                                        {settings?.store_address && (
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{settings.store_address}</p>
                                        )}
                                        <p className="text-xs text-gray-500">{selectedTransaction.invoice}</p>
                                    </div>

                                    <div className="border-t border-dashed border-gray-300 dark:border-gray-600 my-2"></div>

                                    {/* Date/Cashier */}
                                    <div className="flex justify-between text-xs mb-1">
                                        <span>{formatDateShort(selectedTransaction.created_at)}</span>
                                        <span>{selectedTransaction.cashier?.name || 'Kasir'}</span>
                                    </div>
                                    <div className="text-xs mb-2">{formatTime(selectedTransaction.created_at)}</div>

                                    <div className="border-t border-dashed border-gray-300 dark:border-gray-600 my-2"></div>

                                    {/* Items */}
                                    <div className="space-y-1 mb-2">
                                        {(selectedTransaction.details || []).map((item, index) => {
                                            const qty = Number(item.qty) || 1;
                                            const price = Number(item.price) || 0;
                                            const formattedQty = qty.toLocaleString('id-ID', { maximumFractionDigits: 3 });

                                            return (
                                                <div key={item.id || index}>
                                                    <div className="font-semibold text-xs">
                                                        {index + 1}. {item.product?.title}
                                                        {item.variant_name && <span className="font-normal"> ({item.variant_name})</span>}
                                                    </div>
                                                    <div className="flex justify-between text-xs pl-3">
                                                        <span>{formattedQty} x {price.toLocaleString('id-ID')}</span>
                                                        <span>{formatPrice(qty * price)}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="border-t border-dashed border-gray-300 dark:border-gray-600 my-2"></div>

                                    {/* Total QTY & Subtotal */}
                                    {(() => {
                                        const totalQty = (selectedTransaction.details || []).reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
                                        const subTotal = (selectedTransaction.details || []).reduce((sum, item) => sum + ((Number(item.qty) || 0) * (Number(item.price) || 0)), 0);
                                        const formattedTotalQty = totalQty.toLocaleString('id-ID', { maximumFractionDigits: 3 });

                                        return (
                                            <>
                                                <div className="flex justify-between text-xs mb-2 font-mono">
                                                    <span>Total QTY : {formattedTotalQty}</span>
                                                </div>

                                                <div className="border-t border-dashed border-gray-300 dark:border-gray-600 my-2"></div>

                                                {/* Totals */}
                                                <div className="space-y-1 text-xs">
                                                    <div className="flex justify-between">
                                                        <span>Sub Total</span>
                                                        <span>{formatPrice(subTotal)}</span>
                                                    </div>
                                                    {Number(selectedTransaction.discount) > 0 && (
                                                        <div className="flex justify-between text-gray-500">
                                                            <span>Diskon</span>
                                                            <span>-{formatPrice(selectedTransaction.discount)}</span>
                                                        </div>
                                                    )}
                                                    {Number(selectedTransaction.tax) > 0 && (
                                                        <div className="flex justify-between text-gray-500">
                                                            <span>PPN ({Number(selectedTransaction.ppn) || 0}%)</span>
                                                            <span>{formatPrice(selectedTransaction.tax)}</span>
                                                        </div>
                                                    )}
                                                    <div className="flex justify-between font-bold text-sm">
                                                        <span>Total</span>
                                                        <span>{formatPrice(selectedTransaction.grand_total)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Bayar</span>
                                                        <span>{formatPrice(selectedTransaction.cash)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Kembali</span>
                                                        <span>{formatPrice(selectedTransaction.change)}</span>
                                                    </div>
                                                </div>

                                                <div className="border-t border-dashed border-gray-300 dark:border-gray-600 my-2"></div>

                                                <p className="text-center text-xs text-gray-500">Terimakasih Telah Berbelanja</p>
                                            </>
                                        );
                                    })()}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    Tidak ada data transaksi
                                </div>
                            )}
                        </div>

                        {/* Print Controls */}
                        <div className="p-4 border-t dark:border-gray-800 space-y-3 print:hidden">
                            {/* WebSocket Status */}
                            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${wsStatus.connected
                                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                                : 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400'
                                }`}>
                                <span className={`w-2 h-2 rounded-full ${wsStatus.connected ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                                <span>
                                    {wsStatus.connected
                                        ? '✓ Print Server: Connected'
                                        : 'Print Server: Offline - Start printer-server'}
                                </span>
                            </div>

                            {/* Print Buttons */}
                            <div className="flex gap-2">
                                <button
                                    onClick={handleThermalPrint}
                                    disabled={thermalPrinting || !wsStatus.connected}
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <IconPrinter size={16} />
                                    {thermalPrinting ? 'Mencetak...' : 'Cetak Thermal'}
                                </button>
                                <button
                                    onClick={handleOpenDrawer}
                                    disabled={!wsStatus.connected}
                                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-amber-600 rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <IconCash size={16} />
                                    Laci
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleBrowserPrint}
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                    <IconPrinter size={16} />
                                    Cetak Browser
                                </button>
                                <button
                                    onClick={handleCloseReceiptModal}
                                    className="flex-1 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

History.layout = (page) => <DashboardLayout children={page} />;

export default History;

