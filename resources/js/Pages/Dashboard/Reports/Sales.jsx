import React, { useEffect, useMemo, useState } from "react";
import { Head, router } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Card from "@/Components/Common/Card";
import Input from "@/Components/Common/Input";
import InputSelect from "@/Components/Common/InputSelect";
import Button from "@/Components/Common/Button";
import Table from "@/Components/Common/Table";
import Pagination from "@/Components/Common/Pagination";
import {
    IconCoin,
    IconDatabaseOff,
    IconDiscount2,
    IconFileSpreadsheet,
    IconReceipt2,
    IconShoppingBag,
    IconTrendingUp,
} from "@tabler/icons-react";

const SummaryCard = ({ icon, title, value, description }) => (
    <div className="flex items-center justify-between rounded-lg border bg-white p-4 dark:border-gray-900 dark:bg-gray-950">
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {value}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
                {description}
            </p>
        </div>
        <div className="rounded-full bg-indigo-50 p-3 text-indigo-500 dark:bg-indigo-900/40">
            {icon}
        </div>
    </div>
);

const defaultFilterState = {
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

const castFilterString = (value) =>
    typeof value === "number" ? String(value) : value ?? "";

const Sales = ({ transactions, summary, filters, cashiers }) => {
    const [filterData, setFilterData] = useState({
        ...defaultFilterState,
        start_date: castFilterString(filters?.start_date),
        end_date: castFilterString(filters?.end_date),
        invoice: castFilterString(filters?.invoice),
        cashier_id: castFilterString(filters?.cashier_id),
    });

    const cashierFromFilters = useMemo(
        () =>
            (cashiers ?? []).find(
                (cashier) =>
                    castFilterString(cashier.id) === filterData.cashier_id
            ) ?? null,
        [cashiers, filterData.cashier_id]
    );

    const [selectedCashier, setSelectedCashier] = useState(cashierFromFilters);

    useEffect(() => {
        setSelectedCashier(cashierFromFilters);
    }, [cashierFromFilters]);



    useEffect(() => {
        setFilterData({
            ...defaultFilterState,
            start_date: castFilterString(filters?.start_date),
            end_date: castFilterString(filters?.end_date),
            invoice: castFilterString(filters?.invoice),
            cashier_id: castFilterString(filters?.cashier_id),
        });
    }, [filters]);

    const handleChange = (field, value) => {
        setFilterData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSelectCashier = (value) => {
        setSelectedCashier(value);
        handleChange("cashier_id", value ? String(value.id) : "");
    };



    const applyFilters = (event) => {
        event.preventDefault();
        router.get(route("reports.sales.index"), filterData, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleExport = () => {
        const params = new URLSearchParams(filterData).toString();
        window.open(route("reports.sales.export") + "?" + params, "_blank");
    };

    const resetFilters = () => {
        setFilterData(defaultFilterState);
        setSelectedCashier(null);

        router.get(route("reports.sales.index"), defaultFilterState, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };

    const rows = transactions?.data ?? [];
    const paginationLinks = transactions?.links ?? [];
    const currentPage = transactions?.current_page ?? 1;
    // const perPage = transactions?.per_page ?? rows.length || 1;
    const perPage = transactions?.per_page
        ? Number(transactions?.per_page)
        : rows.length || 1;

    const safeSummary = {
        orders_count: summary?.orders_count ?? 0,
        revenue_total: summary?.revenue_total ?? 0,
        discount_total: summary?.discount_total ?? 0,
        items_sold: summary?.items_sold ?? 0,
        profit_total: summary?.profit_total ?? 0,
        average_order: summary?.average_order ?? 0,
    };

    const summaryCards = [
        {
            title: "Pendapatan Bersih",
            value: formatCurrency(safeSummary.revenue_total),
            description: "Total setelah diskon",
            icon: <IconReceipt2 size={22} />,
        },
        {
            title: "Diskon Diberikan",
            value: formatCurrency(safeSummary.discount_total),
            description: "Akumulasi promo",
            icon: <IconDiscount2 size={22} />,
        },
        {
            title: "Item Terjual",
            value: safeSummary.items_sold.toLocaleString("id-ID"),
            description: `${safeSummary.orders_count} transaksi`,
            icon: <IconShoppingBag size={22} />,
        },
        {
            title: "Total Profit",
            value: formatCurrency(safeSummary.profit_total),
            description:
                safeSummary.average_order > 0
                    ? `Rata-rata ${formatCurrency(safeSummary.average_order)}`
                    : "Rata-rata -",
            icon: <IconCoin size={22} />,
        },
    ];

    return (
        <>
            <Head title="Laporan Penjualan" />

            <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {summaryCards.map((card) => (
                        <SummaryCard key={card.title} {...card} />
                    ))}
                </div>

                <Table.Card 
                    title="Laporan Penjualan"
                    links={paginationLinks}
                    meta={{
                        from: transactions?.from,
                        to: transactions?.to,
                        total: transactions?.total,
                        per_page: transactions?.per_page
                    }}
                    url={route('reports.sales.index')}
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
                            <InputSelect
                                label="Kasir"
                                data={cashiers ?? []}
                                selected={selectedCashier}
                                setSelected={handleSelectCashier}
                                placeholder="Semua kasir"
                                searchable
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
                                    label="Filter"
                                    icon={<IconTrendingUp size={18} />}
                                    className="flex-1 border bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-900"
                                />
                                <Button
                                    type="button"
                                    label="Export"
                                    icon={<IconFileSpreadsheet size={18} />}
                                    className="flex-1 border bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800"
                                    onClick={handleExport}
                                />
                            </div>
                        </div>
                    </form>

                    {/* Table Section */}
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th className="w-12 text-center">No</Table.Th>
                                <Table.Th>Tanggal</Table.Th>
                                <Table.Th>Kasir</Table.Th>
                                <Table.Th className="text-center">Item</Table.Th>
                                <Table.Th className="text-right">Diskon</Table.Th>
                                <Table.Th className="text-right">Total</Table.Th>
                                <Table.Th className="text-right">Profit</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {rows.length > 0 ? (
                                rows.map((transaction, index) => (
                                    <tr 
                                        key={transaction.id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                                    >
                                        <Table.Td className="text-center font-medium">
                                            {index + 1 + (currentPage - 1) * perPage}
                                        </Table.Td>
                                        <Table.Td>{transaction.created_at}</Table.Td>
                                        <Table.Td>{transaction.cashier?.name ?? "-"}</Table.Td>
                                        <Table.Td className="text-center">
                                            {transaction.total_items ?? 0}
                                        </Table.Td>
                                        <Table.Td className="text-right">
                                            {formatCurrency(transaction.discount ?? 0)}
                                        </Table.Td>
                                        <Table.Td className="text-right font-semibold text-gray-900 dark:text-white">
                                            {formatCurrency(transaction.grand_total ?? 0)}
                                        </Table.Td>
                                        <Table.Td className="text-right text-emerald-500 font-medium">
                                            {formatCurrency(transaction.total_profit ?? 0)}
                                        </Table.Td>
                                    </tr>
                                ))
                            ) : (
                                <Table.Empty 
                                    colSpan={7} 
                                    message={
                                        <>
                                            <div className="flex justify-center items-center text-center mb-2">
                                                <IconDatabaseOff size={48} strokeWidth={1} className="text-gray-300 dark:text-gray-600" />
                                            </div>
                                            <span className="text-gray-500 dark:text-gray-400">Tidak ada data sesuai filter.</span>
                                        </>
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

Sales.layout = (page) => <DashboardLayout children={page} />;

export default Sales;
