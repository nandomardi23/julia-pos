import React, { useState, useEffect, useMemo } from "react";
import { Head, Link, router } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Card from "@/Components/Common/Card";
import Button from "@/Components/Common/Button";
import Table from "@/Components/Common/Table";
import Input from "@/Components/Common/Input";
import Swal from "sweetalert2";
import {
    IconArrowLeft,
    IconCheck,
    IconTrash,
    IconAlertTriangle,
    IconSearch,
    IconChevronLeft,
    IconChevronRight,
    IconFilter,
} from "@tabler/icons-react";

const formatCurrency = (value = 0) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);

const perPageOptions = [
    { id: 10, name: "10" },
    { id: 25, name: "25" },
    { id: 50, name: "50" },
    { id: 100, name: "100" },
];

const StockOpnameShow = ({ opname }) => {
    // State for Tabs & Search
    const [tab, setTab] = useState("all"); // 'all', 'mismatch'
    const [search, setSearch] = useState("");
    
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const handleComplete = () => {
        Swal.fire({
            title: 'Finalisasi Stock Opname?',
            text: "Stok sistem akan dikoreksi sesuai stok fisik. Tindakan ini tidak dapat dibatalkan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#059669',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Finalisasi!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route("stock-opnames.complete", opname.id));
            }
        });
    };

    const handleDelete = () => {
        Swal.fire({
            title: 'Hapus Draft Opname?',
            text: "Data draft ini akan dihapus permanen.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("stock-opnames.destroy", opname.id));
            }
        });
    };

    const items = opname?.items ?? [];
    const itemsWithDifference = items.filter((i) => i.difference != 0);
    const totalLoss = opname?.total_loss ?? 0;

    // Filter Logic
    const filteredItems = useMemo(() => {
        let result = items;

        // Filter by Tab
        if (tab === "mismatch") {
            result = result.filter((i) => i.difference != 0);
        }

        // Filter by Search
        if (search) {
            const lowerSearch = search.toLowerCase();
            result = result.filter((i) => 
                (i.product?.title?.toLowerCase() || "").includes(lowerSearch) ||
                (i.product?.sku?.toLowerCase() || "").includes(lowerSearch) ||
                (i.product?.barcode?.toLowerCase() || "").includes(lowerSearch)
            );
        }

        return result;
    }, [items, tab, search]);

    // Pagination Logic
    const indexOfLastItem = currentPage * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredItems.length / perPage);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [tab, search, perPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        let pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 4) {
                pages = [1, 2, 3, 4, 5, '...', totalPages];
            } else if (currentPage >= totalPages - 3) {
                pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            } else {
                pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
            }
        }

        return (
            <div className="flex items-center gap-1">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-md border text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-700 dark:hover:bg-gray-800"
                >
                    <IconChevronLeft size={16} />
                </button>
                {pages.map((page, index) => (
                    <button
                        key={index}
                        onClick={() => typeof page === 'number' && handlePageChange(page)}
                        disabled={typeof page !== 'number'}
                        className={`min-w-[32px] h-8 rounded-md border text-sm font-medium transition-colors ${
                            page === currentPage
                                ? "bg-indigo-600 border-indigo-600 text-white"
                                : "border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                        } ${typeof page !== 'number' ? 'border-transparent hover:bg-transparent cursor-default' : ''}`}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-md border text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-700 dark:hover:bg-gray-800"
                >
                    <IconChevronRight size={16} />
                </button>
            </div>
        );
    };

    return (
        <>
            <Head title={`Stock Opname #${opname.id}`} />

            <Card
                title={`Stock Opname #${opname.id}`}
                description={`Dibuat oleh ${opname.user?.name ?? "-"} pada ${opname.created_at}`}
            >
                {/* Summary Cards */}
                <div className="grid gap-4 md:grid-cols-4 mb-6">
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Lokasi</p>
                        <p className="font-semibold text-gray-900 dark:text-white capitalize">
                            {opname.location_type} - {opname.location_name}
                        </p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                        <p className={`font-semibold ${opname.status === "completed" ? "text-green-600" : "text-yellow-600"}`}>
                            {opname.status === "completed" ? "Selesai" : "Draft"}
                        </p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Item dengan Selisih</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                            {itemsWithDifference.length} dari {items.length} item
                        </p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Kerugian</p>
                        <p className="font-semibold text-red-600">
                            {formatCurrency(totalLoss)}
                        </p>
                    </div>
                </div>

                {/* Warning for items with difference (Draft only) */}
                {opname.status === "draft" && itemsWithDifference.length > 0 && (
                    <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-start gap-3">
                        <IconAlertTriangle className="text-yellow-600 flex-shrink-0" size={20} />
                        <div>
                            <p className="font-medium text-yellow-800 dark:text-yellow-200">
                                Perhatian: Ada {itemsWithDifference.length} item dengan selisih
                            </p>
                            <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                Klik "Finalisasi & Koreksi Stok" untuk menyesuaikan stok sistem dengan stok fisik.
                            </p>
                        </div>
                    </div>
                )}

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    {/* Tabs */}
                    <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                        <button
                            onClick={() => setTab("all")}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                                tab === "all"
                                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            }`}
                        >
                            Semua Item
                        </button>
                        <button
                            onClick={() => setTab("mismatch")}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${
                                tab === "mismatch"
                                    ? "bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm"
                                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            }`}
                        >
                            <IconAlertTriangle size={16} />
                            Hanya Selisih ({itemsWithDifference.length})
                        </button>
                    </div>

                    {/* Search */}
                    <div className="w-full md:w-72">
                        <div className="relative">
                            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Cari nama, SKU, atau barcode..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Items Table */}
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className="w-12 text-center">No</Table.Th>
                            <Table.Th>Produk</Table.Th>
                            <Table.Th>SKU</Table.Th>
                            <Table.Th className="text-center">Stok Sistem</Table.Th>
                            <Table.Th className="text-center">Stok Fisik</Table.Th>
                            <Table.Th className="text-center">Selisih</Table.Th>
                            <Table.Th className="text-right">Kerugian</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((item, index) => (
                                <tr 
                                    key={item.id} 
                                    className={item.difference != 0 ? "bg-red-50 dark:bg-red-900/10" : ""}
                                >
                                    <Table.Td className="text-center">
                                        {indexOfFirstItem + index + 1}
                                    </Table.Td>
                                    <Table.Td className="font-medium">
                                        <div>{item.product?.title ?? "-"}</div>
                                        <div className="text-xs text-gray-500">{item.product?.barcode ?? "-"}</div>
                                    </Table.Td>
                                    <Table.Td className="text-gray-500">{item.product?.sku ?? "-"}</Table.Td>
                                    <Table.Td className="text-center">{item.system_qty ?? 0}</Table.Td>
                                    <Table.Td className="text-center font-medium">{item.physical_qty ?? 0}</Table.Td>
                                    <Table.Td className="text-center">
                                        <span
                                            className={`font-bold px-2 py-1 rounded text-xs ${
                                                item.difference < 0
                                                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                                    : item.difference > 0
                                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                                            }`}
                                        >
                                            {item.difference > 0 ? "+" : ""}
                                            {item.difference}
                                        </span>
                                    </Table.Td>
                                    <Table.Td className="text-right font-medium text-red-600">
                                        {item.loss_amount ? formatCurrency(item.loss_amount) : "-"}
                                    </Table.Td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <Table.Td colSpan={7} className="text-center py-8 text-gray-500">
                                    Tidak ada data yang ditemukan.
                                </Table.Td>
                            </tr>
                        )}
                    </Table.Tbody>
                </Table>

                {/* Footer Area */}
                <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-6">
                    {/* Pagination */}
                    {filteredItems.length > 0 && (
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                            <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                <span>
                                    Menampilkan <span className="font-semibold text-gray-900 dark:text-gray-200">{indexOfFirstItem + 1}</span> - <span className="font-semibold text-gray-900 dark:text-gray-200">{Math.min(indexOfLastItem, filteredItems.length)}</span> dari <span className="font-semibold text-gray-900 dark:text-gray-200">{filteredItems.length}</span> data
                                </span>
                                <span className="hidden sm:inline text-gray-300 dark:text-gray-600">|</span>
                                <div className="flex items-center gap-2">
                                    <span>Per halaman:</span>
                                    <select
                                        value={perPage}
                                        onChange={(e) => {
                                            setPerPage(Number(e.target.value));
                                            setCurrentPage(1);
                                        }}
                                        className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-sm py-1 pl-2 pr-6 cursor-pointer"
                                    >
                                        {perPageOptions.map((opt) => (
                                            <option key={opt.id} value={opt.id}>
                                                {opt.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {renderPagination()}
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <Button
                            type="link"
                            href={route("stock-opnames.index")}
                            label="Kembali"
                            icon={<IconArrowLeft size={18} />}
                            className="w-full md:w-auto border bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700 justify-center"
                        />
                        
                        {opname.status === "draft" && (
                            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                                <Button
                                    type="button"
                                    label="Hapus Draft"
                                    icon={<IconTrash size={18} />}
                                    className="w-full md:w-auto border border-red-300 bg-white text-red-600 hover:bg-red-50 justify-center"
                                    onClick={handleDelete}
                                />
                                <Button
                                    type="button"
                                    label="Finalisasi & Koreksi Stok"
                                    icon={<IconCheck size={18} />}
                                    className="w-full md:w-auto bg-emerald-600 text-white hover:bg-emerald-700 shadow-md justify-center"
                                    onClick={handleComplete}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </>
    );
};

StockOpnameShow.layout = (page) => <DashboardLayout children={page} />;

export default StockOpnameShow;
