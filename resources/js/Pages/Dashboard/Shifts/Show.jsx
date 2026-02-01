import React from "react";
import { Head, Link } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Card from "@/Components/Common/Card";
import Table from "@/Components/Common/Table";
import Pagination from "@/Components/Common/Pagination";
import {
    IconClock,
    IconReceipt,
    IconCash,
    IconArrowLeft,
    IconDoorExit,
    IconArrowUpRight,
    IconArrowDownRight,
    IconCheck,
    IconAlertCircle,
} from "@tabler/icons-react";

const formatCurrency = (value = 0) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);

const formatTime = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).replace(/\./g, ':');
};

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

const SummaryCard = ({ icon: Icon, label, value, className = "", valueClass = "" }) => (
    <div className={`p-4 rounded-lg ${className}`}>
        <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/20">
                <Icon size={20} className="text-white" />
            </div>
            <div>
                <p className="text-sm text-white/80">{label}</p>
                <p className={`text-lg font-bold text-white ${valueClass}`}>{value}</p>
            </div>
        </div>
    </div>
);

const Show = ({ shift, summary, transactions }) => {
    const isActive = shift.status === "active";
    const hasDifference = shift.difference !== null && shift.difference !== 0;

    return (
        <>
            <Head title={`Detail Shift - ${shift.shift_number}`} />
            <div className="space-y-6">
                {/* Header */}
                <Card>
                    <div className="p-6 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-t-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/20 rounded-xl">
                                    <IconClock size={32} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-white/80">Detail Shift</p>
                                    <h1 className="text-2xl font-bold text-white">
                                        {shift.shift_number}
                                    </h1>
                                    <p className="text-sm text-white/80">
                                        Kasir: {shift.user?.name ?? "-"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${isActive
                                        ? "bg-green-500 text-white"
                                        : "bg-white/20 text-white"
                                        }`}
                                >
                                    {isActive ? "Aktif" : "Ditutup"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Time Info */}
                    <div className="grid grid-cols-2 gap-4 p-6 border-b dark:border-gray-800">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Waktu Mulai
                            </p>
                            <p className="font-semibold text-gray-900 dark:text-gray-100">
                                {formatDate(shift.started_at)}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Waktu Selesai
                            </p>
                            <p className="font-semibold text-gray-900 dark:text-gray-100">
                                {shift.ended_at ? formatDate(shift.ended_at) : "-"}
                            </p>
                        </div>
                    </div>

                    {/* Summary Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
                        <SummaryCard
                            icon={IconCash}
                            label="Modal Awal"
                            value={formatCurrency(shift.opening_cash)}
                            className="bg-gradient-to-br from-blue-500 to-blue-600"
                        />
                        <SummaryCard
                            icon={IconReceipt}
                            label="Total Penjualan"
                            value={formatCurrency(summary.total_sales)}
                            className="bg-gradient-to-br from-emerald-500 to-emerald-600"
                        />
                        <SummaryCard
                            icon={IconArrowUpRight}
                            label="Kas Masuk"
                            value={formatCurrency(summary.total_cash_in)}
                            className="bg-gradient-to-br from-green-500 to-green-600"
                        />
                        <SummaryCard
                            icon={IconArrowDownRight}
                            label="Kas Keluar"
                            value={formatCurrency(summary.total_cash_out)}
                            className="bg-gradient-to-br from-orange-500 to-orange-600"
                        />
                    </div>

                    {/* Expected Cash & Difference */}
                    {!isActive && (
                        <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 dark:bg-gray-900/50 border-t dark:border-gray-800">
                            <div className="text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Kas Diharapkan
                                </p>
                                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                    {formatCurrency(shift.expected_cash)}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Kas Aktual
                                </p>
                                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                    {formatCurrency(shift.closing_cash)}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Selisih
                                </p>
                                <p
                                    className={`text-xl font-bold flex items-center justify-center gap-1 ${shift.difference === 0
                                        ? "text-green-600"
                                        : shift.difference > 0
                                            ? "text-blue-600"
                                            : "text-red-600"
                                        }`}
                                >
                                    {shift.difference === 0 ? (
                                        <IconCheck size={20} />
                                    ) : (
                                        <IconAlertCircle size={20} />
                                    )}
                                    {formatCurrency(shift.difference)}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Notes */}
                    {shift.notes && (
                        <div className="p-6 border-t dark:border-gray-800">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                Catatan
                            </p>
                            <p className="text-gray-900 dark:text-gray-100">{shift.notes}</p>
                        </div>
                    )}
                </Card>

                {/* Cash Flows */}
                {shift.cash_flows?.length > 0 && (
                    <Card>
                        <div className="px-6 py-4 border-b dark:border-gray-800">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                Kas Masuk / Keluar
                            </h3>
                        </div>
                        <Table>
                            <Table.Thead>
                                <tr>
                                    <Table.Th>Waktu</Table.Th>
                                    <Table.Th>Tipe</Table.Th>
                                    <Table.Th>Kategori</Table.Th>
                                    <Table.Th>Keterangan</Table.Th>
                                    <Table.Th className="text-right">Jumlah</Table.Th>
                                </tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {shift.cash_flows.map((cf) => (
                                    <tr key={cf.id}>
                                        <Table.Td>
                                            {formatTime(cf.created_at)}
                                        </Table.Td>
                                        <Table.Td>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${cf.type === "in"
                                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                    }`}
                                            >
                                                {cf.type === "in" ? "Masuk" : "Keluar"}
                                            </span>
                                        </Table.Td>
                                        <Table.Td>{cf.category || "-"}</Table.Td>
                                        <Table.Td>{cf.description || "-"}</Table.Td>
                                        <Table.Td
                                            className={`text-right font-medium ${cf.type === "in"
                                                ? "text-green-600"
                                                : "text-red-600"
                                                }`}
                                        >
                                            {cf.type === "in" ? "+" : "-"}
                                            {formatCurrency(cf.amount)}
                                        </Table.Td>
                                    </tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </Card>
                )}

                {/* Recent Transactions */}
                {transactions?.data?.length > 0 && (
                    <Card>
                        <div className="px-6 py-4 border-b dark:border-gray-800">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                Transaksi
                            </h3>
                        </div>
                        <Table>
                            <Table.Thead>
                                <tr>
                                    <Table.Th>Invoice</Table.Th>
                                    <Table.Th>Waktu</Table.Th>
                                    <Table.Th>Metode</Table.Th>
                                    <Table.Th className="text-right">Total</Table.Th>
                                </tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {transactions.data.map((trx) => (
                                    <tr key={trx.id}>
                                        <Table.Td className="font-medium">
                                            <Link
                                                href={route("transactions.show", trx.invoice)}
                                                className="text-blue-600 hover:underline"
                                            >
                                                {trx.invoice}
                                            </Link>
                                        </Table.Td>
                                        <Table.Td>
                                            {formatTime(trx.created_at)}
                                        </Table.Td>
                                        <Table.Td className="capitalize">
                                            {trx.payment_method}
                                        </Table.Td>
                                        <Table.Td className="text-right font-semibold">
                                            {formatCurrency(trx.grand_total)}
                                        </Table.Td>
                                    </tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                        <div className="p-4 border-t dark:border-gray-800">
                            <Pagination links={transactions.links} />
                        </div>
                    </Card>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between">
                    <Link
                        href={route("shifts.index")}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        <IconArrowLeft size={18} />
                        Kembali
                    </Link>
                    {isActive && (
                        <Link
                            href={route("shifts.close", shift.id)}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600"
                        >
                            <IconDoorExit size={18} />
                            Tutup Shift
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

Show.layout = (page) => <DashboardLayout children={page} />;

export default Show;
