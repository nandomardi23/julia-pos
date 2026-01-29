import React, { useEffect, useMemo, useState } from "react";
import { Head, router } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Card from "@/Components/Common/Card";
import Input from "@/Components/Common/Input";
import Button from "@/Components/Common/Button";
import InputSelect from "@/Components/Common/InputSelect";
import Table from "@/Components/Common/Table";
import Pagination from "@/Components/Common/Pagination";
import {
    IconArrowDownRight,
    IconArrowUpRight,
    IconCoin,
    IconDatabaseOff,
    IconFileSpreadsheet,
    IconPercentage,
    IconReceipt,
} from "@tabler/icons-react";

const defaultFilters = {
    start_date: "",
    end_date: "",
    invoice: "",
    cashier_id: "",
};

const formatCurrency = (value = 0) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);

const formatQty = (qty) => {
    // Format quantity: remove trailing zeros, max 3 decimals
    return parseFloat(Number(qty).toFixed(3)).toString();
};

const SummaryStat = ({ title, value, description, icon, accent }) => (
    <div className="rounded-lg border bg-white p-4 dark:border-gray-900 dark:bg-gray-950">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {title}
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {value}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {description}
                </p>
            </div>
            <div
                className={`rounded-full ${accent} p-3 text-indigo-600 dark:text-indigo-200`}
            >
                {icon}
            </div>
        </div>
    </div>
);

const ProfitReport = ({
    transactions,
    summary,
    filters,
    cashiers,
}) => {
    const [filterData, setFilterData] = useState({
        start_date: filters?.start_date ?? "",
        end_date: filters?.end_date ?? "",
        invoice: filters?.invoice ?? "",
        cashier_id: filters?.cashier_id ?? "",
    });

    const [selectedCashier, setSelectedCashier] = useState(null);

    useEffect(() => {
        setFilterData({
            start_date: filters?.start_date ?? "",
            end_date: filters?.end_date ?? "",
            invoice: filters?.invoice ?? "",
            cashier_id: filters?.cashier_id ?? "",
        });
        setSelectedCashier(
            (cashiers ?? []).find((item) => String(item.id) === filters?.cashier_id) ||
            null
        );
    }, [filters, cashiers]);

    const handleChange = (field, value) => {
        setFilterData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const applyFilters = (event) => {
        event.preventDefault();
        router.get(route("reports.profits.index"), filterData, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const resetFilters = () => {
        setFilterData(defaultFilters);
        setSelectedCashier(null);

        router.get(route("reports.profits.index"), defaultFilters, {
            replace: true,
            preserveScroll: true,
        });
    };

    const rows = transactions?.data ?? [];
    const links = transactions?.links ?? [];
    const currentPage = transactions?.current_page ?? 1;
    const perPage = transactions?.per_page
        ? Number(transactions?.per_page)
        : rows.length || 1;

    const stats = {
        profit_total: summary?.profit_total ?? 0,
        revenue_total: summary?.revenue_total ?? 0,
        orders_count: summary?.orders_count ?? 0,
        items_sold: summary?.items_sold ?? 0,
        average_profit: summary?.average_profit ?? 0,
        margin: summary?.margin ?? 0,
        best_invoice: summary?.best_invoice ?? "-",
        best_profit: summary?.best_profit ?? 0,
    };

    return (
        <>
            <Head title="Laporan Keuntungan" />

            <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <SummaryStat
                        title="Total Profit"
                        value={formatCurrency(stats.profit_total)}
                        description="Akumulasi bersih"
                        icon={<IconCoin size={22} />}
                        accent="bg-emerald-50 dark:bg-emerald-900/40"
                    />
                    <SummaryStat
                        title="Rata-rata Profit"
                        value={formatCurrency(stats.average_profit)}
                        description={`${stats.orders_count} transaksi`}
                        icon={<IconArrowUpRight size={22} />}
                        accent="bg-indigo-50 dark:bg-indigo-900/40"
                    />
                    <SummaryStat
                        title="Margin Kotor"
                        value={`${stats.margin}%`}
                        description="Profit vs penjualan"
                        icon={<IconPercentage size={22} />}
                        accent="bg-amber-50 dark:bg-amber-900/40"
                    />
                    <SummaryStat
                        title="Transaksi Terbaik"
                        value={stats.best_invoice}
                        description={formatCurrency(stats.best_profit)}
                        icon={<IconReceipt size={22} />}
                        accent="bg-rose-50 dark:bg-rose-900/40"
                    />
                </div>

                <Table.Card
                    title="Detail Keuntungan"
                    links={links}
                    meta={{
                        from: transactions?.from,
                        to: transactions?.to,
                        total: transactions?.total,
                        per_page: transactions?.per_page
                    }}
                    url={route('reports.profits.index')}
                >
                    {/* Filter Section */}
                    <form onSubmit={applyFilters} className="px-5 py-4 border-b dark:border-gray-800 bg-white dark:bg-gray-950">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Input
                                type="date"
                                label="Mulai"
                                value={filterData.start_date}
                                onChange={(event) =>
                                    handleChange("start_date", event.target.value)
                                }
                            />
                            <Input
                                type="date"
                                label="Selesai"
                                value={filterData.end_date}
                                onChange={(event) =>
                                    handleChange("end_date", event.target.value)
                                }
                            />
                            <Input
                                type="text"
                                label="No. Resi"
                                placeholder="Cari resi"
                                value={filterData.invoice}
                                onChange={(event) =>
                                    handleChange("invoice", event.target.value)
                                }
                            />
                            <InputSelect
                                label="Kasir"
                                data={cashiers ?? []}
                                selected={selectedCashier}
                                setSelected={(value) => {
                                    setSelectedCashier(value);
                                    handleChange(
                                        "cashier_id",
                                        value ? String(value.id) : ""
                                    );
                                }}
                                placeholder="Semua kasir"
                                searchable
                            />
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-4">
                            <Button
                                type="button"
                                label="Reset"
                                className="border bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-900"
                                onClick={resetFilters}
                            />
                            <Button
                                type="submit"
                                label="Cari"
                                icon={<IconArrowDownRight size={18} />}
                                className="border bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-900"
                            />
                            <Button
                                type="button"
                                label="Export"
                                icon={<IconFileSpreadsheet size={18} />}
                                className="border bg-emerald-600 text-white hover:bg-emerald-700"
                                onClick={() => {
                                    const params = new URLSearchParams(filterData).toString();
                                    window.open(route("reports.profits.export") + "?" + params, "_blank");
                                }}
                            />
                        </div>
                    </form>

                    {/* Table Section */}
                    <Table className="mt-5">
                        <Table.Thead>
                            <tr>
                                <Table.Th className="w-16 text-center">
                                    No
                                </Table.Th>
                                <Table.Th>No. Resi</Table.Th>
                                <Table.Th>Tanggal</Table.Th>
                                <Table.Th>Kasir</Table.Th>
                                <Table.Th className="text-center">
                                    Jml Item
                                </Table.Th>
                                <Table.Th className="text-right">
                                    Penjualan
                                </Table.Th>
                                <Table.Th className="text-right">
                                    Profit
                                </Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {rows.length ? (
                                rows.map((transaction, index) => (
                                    <tr key={transaction.id}>
                                        <Table.Td className="text-center">
                                            {index +
                                                1 +
                                                (currentPage - 1) * perPage}
                                        </Table.Td>
                                        <Table.Td className="font-semibold text-gray-900 dark:text-gray-100">
                                            {transaction.invoice}
                                        </Table.Td>
                                        <Table.Td>
                                            {transaction.created_at}
                                        </Table.Td>
                                        <Table.Td>
                                            {transaction.cashier?.name ?? "-"}
                                        </Table.Td>
                                        <Table.Td className="text-center">
                                            {Number(transaction.total_items ?? 0)}
                                        </Table.Td>
                                        <Table.Td className="text-right">
                                            {formatCurrency(
                                                transaction.grand_total ?? 0
                                            )}
                                        </Table.Td>
                                        <Table.Td className="text-right text-emerald-500 font-semibold">
                                            {formatCurrency(
                                                transaction.total_profit ?? 0
                                            )}
                                        </Table.Td>
                                    </tr>
                                ))
                            ) : (
                                <Table.Empty
                                    colSpan={7}
                                    message={
                                        <div className="text-gray-500">
                                            <IconDatabaseOff
                                                size={30}
                                                className="mx-auto mb-2 text-gray-400"
                                            />
                                            Tidak ada transaksi sesuai filter.
                                        </div>
                                    }
                                />
                            )}
                        </Table.Tbody>
                    </Table>
                </Table.Card>
            </div>
        </>
    );
};

ProfitReport.layout = (page) => <DashboardLayout children={page} />;

export default ProfitReport;
