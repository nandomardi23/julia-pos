import React, { useState } from "react";
import { Head, router, Link } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Card from "@/Components/Common/Card";
import Input from "@/Components/Common/Input";
import Button from "@/Components/Common/Button";
import Table from "@/Components/Common/Table";
import {
    IconDatabaseOff,
    IconSearch,
    IconClock,
    IconPlus,
    IconEye,
    IconDoorExit,
    IconCheck,
    IconAlertCircle,
} from "@tabler/icons-react";
import toast from "react-hot-toast";

const formatCurrency = (value = 0) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);

const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const StatusBadge = ({ status }) => {
    const styles = {
        active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        closed: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
    };

    const labels = {
        active: "Aktif",
        closed: "Ditutup",
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles.closed}`}>
            {labels[status] || status}
        </span>
    );
};

const Index = ({ shifts, activeShift, filters, statuses }) => {
    const [filterData, setFilterData] = useState({
        status: filters?.status ?? "",
        start_date: filters?.start_date ?? "",
        end_date: filters?.end_date ?? "",
    });

    const handleChange = (field, value) => {
        setFilterData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const applyFilters = (event) => {
        event.preventDefault();
        router.get(route("shifts.index"), filterData, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const resetFilters = () => {
        const defaultFilters = { status: "", start_date: "", end_date: "" };
        setFilterData(defaultFilters);
        router.get(route("shifts.index"), defaultFilters, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };

    const rows = shifts?.data ?? [];
    const links = shifts?.links ?? [];
    const currentPage = shifts?.current_page ?? 1;
    const perPage = shifts?.per_page ? Number(shifts?.per_page) : rows.length || 1;

    return (
        <>
            <Head title="Manajemen Shift" />
            <div className="space-y-6">
                {/* Active Shift Banner */}
                {activeShift && (
                    <Card className="border-l-4 border-l-green-500 bg-green-50 dark:bg-green-900/20">
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-500 rounded-lg text-white">
                                    <IconClock size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-green-700 dark:text-green-300">
                                        Shift Aktif
                                    </p>
                                    <p className="font-semibold text-green-900 dark:text-green-100">
                                        {activeShift.shift_number}
                                    </p>
                                    <p className="text-xs text-green-600 dark:text-green-400">
                                        Dibuka: {formatDate(activeShift.started_at)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link
                                    href={route("shifts.show", activeShift.id)}
                                    className="px-4 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 dark:bg-green-800 dark:text-green-200 dark:hover:bg-green-700"
                                >
                                    <IconEye size={16} className="inline mr-1" />
                                    Detail
                                </Link>
                                <Link
                                    href={route("shifts.close", activeShift.id)}
                                    className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600"
                                >
                                    <IconDoorExit size={16} className="inline mr-1" />
                                    Tutup Shift
                                </Link>
                            </div>
                        </div>
                    </Card>
                )}

                <Table.Card
                    title="Manajemen Shift"
                    links={links}
                    meta={{
                        from: shifts?.from,
                        to: shifts?.to,
                        total: shifts?.total,
                        per_page: shifts?.per_page,
                    }}
                    url={route("shifts.index")}
                    actions={
                        !activeShift && (
                            <Link
                                href={route("shifts.create")}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all shadow-md"
                            >
                                <IconPlus size={18} />
                                Buka Shift
                            </Link>
                        )
                    }
                >
                    {/* Filter Section */}
                    <form
                        onSubmit={applyFilters}
                        className="px-5 py-4 border-b dark:border-gray-800 bg-white dark:bg-gray-950"
                    >
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Status
                                </label>
                                <select
                                    value={filterData.status}
                                    onChange={(e) => handleChange("status", e.target.value)}
                                    className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
                                >
                                    <option value="">Semua Status</option>
                                    {Object.entries(statuses || {}).map(([key, label]) => (
                                        <option key={key} value={key}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <Input
                                type="date"
                                label="Tanggal Mulai"
                                value={filterData.start_date}
                                onChange={(e) => handleChange("start_date", e.target.value)}
                            />
                            <Input
                                type="date"
                                label="Tanggal Selesai"
                                value={filterData.end_date}
                                onChange={(e) => handleChange("end_date", e.target.value)}
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
                                <Table.Th>No. Shift</Table.Th>
                                <Table.Th>Kasir</Table.Th>
                                <Table.Th>Mulai</Table.Th>
                                <Table.Th>Selesai</Table.Th>
                                <Table.Th className="text-right">Modal Awal</Table.Th>
                                <Table.Th className="text-right">Total Sales</Table.Th>
                                <Table.Th className="text-center">Trx</Table.Th>
                                <Table.Th className="text-center">Status</Table.Th>
                                <Table.Th className="text-center">Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {rows.length ? (
                                rows.map((shift, index) => (
                                    <tr
                                        key={shift.id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                                    >
                                        <Table.Td className="text-center font-medium">
                                            {index + 1 + (currentPage - 1) * perPage}
                                        </Table.Td>
                                        <Table.Td className="font-semibold text-gray-900 dark:text-gray-100">
                                            {shift.shift_number}
                                        </Table.Td>
                                        <Table.Td>{shift.user?.name ?? "-"}</Table.Td>
                                        <Table.Td>{formatDate(shift.started_at)}</Table.Td>
                                        <Table.Td>
                                            {shift.ended_at ? formatDate(shift.ended_at) : "-"}
                                        </Table.Td>
                                        <Table.Td className="text-right">
                                            {formatCurrency(shift.opening_cash)}
                                        </Table.Td>
                                        <Table.Td className="text-right font-semibold text-emerald-600 dark:text-emerald-400">
                                            {formatCurrency(shift.total_sales ?? 0)}
                                        </Table.Td>
                                        <Table.Td className="text-center">
                                            {shift.transactions_count ?? 0}
                                        </Table.Td>
                                        <Table.Td className="text-center">
                                            <StatusBadge status={shift.status} />
                                        </Table.Td>
                                        <Table.Td>
                                            <div className="flex items-center justify-center gap-1">
                                                <Link
                                                    href={route("shifts.show", shift.id)}
                                                    className="p-1.5 rounded-md text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30"
                                                    title="Lihat Detail"
                                                >
                                                    <IconEye size={14} />
                                                </Link>
                                                {shift.status === "active" && (
                                                    <Link
                                                        href={route("shifts.close", shift.id)}
                                                        className="p-1.5 rounded-md text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-900/30"
                                                        title="Tutup Shift"
                                                    >
                                                        <IconDoorExit size={14} />
                                                    </Link>
                                                )}
                                                {shift.status === "closed" && shift.difference !== null && (
                                                    <span
                                                        className={`p-1.5 rounded-md ${
                                                            shift.difference === 0
                                                                ? "text-green-600"
                                                                : "text-amber-600"
                                                        }`}
                                                        title={
                                                            shift.difference === 0
                                                                ? "Kas Sesuai"
                                                                : `Selisih: ${formatCurrency(shift.difference)}`
                                                        }
                                                    >
                                                        {shift.difference === 0 ? (
                                                            <IconCheck size={14} />
                                                        ) : (
                                                            <IconAlertCircle size={14} />
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                        </Table.Td>
                                    </tr>
                                ))
                            ) : (
                                <Table.Empty
                                    colSpan={10}
                                    message={
                                        <div className="text-gray-500">
                                            <IconDatabaseOff
                                                size={30}
                                                className="mx-auto mb-2 text-gray-400"
                                            />
                                            Belum ada shift.
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

Index.layout = (page) => <DashboardLayout children={page} />;

export default Index;
