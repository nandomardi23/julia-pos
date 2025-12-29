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
} from "@tabler/icons-react";
import toast from "react-hot-toast";

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

const History = ({ transactions, filters }) => {
    const [filterData, setFilterData] = useState({
        invoice: filters?.invoice ?? "",
        start_date: filters?.start_date ?? "",
        end_date: filters?.end_date ?? "",
    });

    useEffect(() => {
        setFilterData({
            invoice: filters?.invoice ?? "",
            start_date: filters?.start_date ?? "",
            end_date: filters?.end_date ?? "",
        });
    }, [filters]);

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
                                <Table.Th className="text-center">Item</Table.Th>
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
                                        <Table.Td>{transaction.created_at}</Table.Td>
                                        <Table.Td>{transaction.cashier?.name ?? "-"}</Table.Td>
                                        <Table.Td className="text-center">
                                            {transaction.total_items ?? 0}
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
                                                <a
                                                    href={route('transactions.print', transaction.invoice)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-1.5 rounded-md text-cyan-600 hover:bg-cyan-50 dark:text-cyan-400 dark:hover:bg-cyan-900/30"
                                                    title="Cetak Struk"
                                                >
                                                    <IconPrinter size={14} />
                                                </a>
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
        </>
    );
};

History.layout = (page) => <DashboardLayout children={page} />;

export default History;
