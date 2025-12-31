import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Card from "@/Components/Common/Card";
import Button from "@/Components/Common/Button";
import Table from "@/Components/Common/Table";
import {
    IconArrowLeft,
    IconCheck,
    IconTrash,
    IconAlertTriangle,
} from "@tabler/icons-react";

const formatCurrency = (value = 0) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);

const StockOpnameShow = ({ opname }) => {
    const handleComplete = () => {
        if (
            confirm(
                "Finalisasi stock opname? Stok akan dikoreksi sesuai input fisik dan tidak bisa dibatalkan."
            )
        ) {
            router.post(route("stock-opnames.complete", opname.id));
        }
    };

    const handleDelete = () => {
        if (confirm("Hapus stock opname draft ini?")) {
            router.delete(route("stock-opnames.destroy", opname.id));
        }
    };

    const items = opname?.items ?? [];
    const itemsWithDifference = items.filter((i) => i.difference != 0);
    const totalLoss = opname?.total_loss ?? 0;

    return (
        <>
            <Head title={`Stock Opname #${opname.id}`} />

            <Card
                title={`Stock Opname #${opname.id}`}
                description={`Dibuat oleh ${opname.user?.name ?? "-"} pada ${opname.created_at}`}
                footer={
                    <div className="flex justify-between">
                        <Link href={route("stock-opnames.index")}>
                            <Button
                                label="Kembali"
                                icon={<IconArrowLeft size={18} />}
                                className="border bg-white text-gray-700 hover:bg-gray-100"
                            />
                        </Link>
                        {opname.status === "draft" && (
                            <div className="flex gap-2">
                                <Button
                                    label="Hapus Draft"
                                    icon={<IconTrash size={18} />}
                                    className="border border-red-300 bg-white text-red-600 hover:bg-red-50"
                                    onClick={handleDelete}
                                />
                                <Button
                                    label="Finalisasi & Koreksi Stok"
                                    icon={<IconCheck size={18} />}
                                    className="bg-emerald-600 text-white hover:bg-emerald-700"
                                    onClick={handleComplete}
                                />
                            </div>
                        )}
                    </div>
                }
            >
                {/* Summary */}
                <div className="grid gap-4 md:grid-cols-4 mb-6">
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Lokasi</p>
                        <p className="font-semibold text-gray-900 dark:text-white capitalize">
                            {opname.location_type} - {opname.location_name}
                        </p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                        <p className={`font-semibold ${opname.status === "completed" ? "text-green-600" : "text-yellow-600"}`}>
                            {opname.status === "completed" ? "Selesai" : "Draft"}
                        </p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Item dengan Selisih</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                            {itemsWithDifference.length} dari {items.length} item
                        </p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Kerugian</p>
                        <p className="font-semibold text-red-600">
                            {formatCurrency(totalLoss)}
                        </p>
                    </div>
                </div>

                {/* Warning for items with difference */}
                {opname.status === "draft" && itemsWithDifference.length > 0 && (
                    <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-start gap-3">
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

                {/* Note */}
                {opname.note && (
                    <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Catatan:</p>
                        <p className="text-gray-900 dark:text-white">{opname.note}</p>
                    </div>
                )}

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
                        {items.map((item, index) => (
                            <tr 
                                key={item.id} 
                                className={item.difference != 0 ? "bg-red-50 dark:bg-red-900/10" : ""}
                            >
                                <Table.Td className="text-center">{index + 1}</Table.Td>
                                <Table.Td className="font-medium">{item.product?.title ?? "-"}</Table.Td>
                                <Table.Td className="text-gray-500">{item.product?.sku ?? "-"}</Table.Td>
                                <Table.Td className="text-center">{item.system_qty}</Table.Td>
                                <Table.Td className="text-center">{item.physical_qty}</Table.Td>
                                <Table.Td className="text-center">
                                    <span
                                        className={`font-semibold ${
                                            item.difference < 0
                                                ? "text-red-600"
                                                : item.difference > 0
                                                ? "text-green-600"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        {item.difference > 0 ? "+" : ""}
                                        {item.difference}
                                    </span>
                                </Table.Td>
                                <Table.Td className="text-right text-red-600">
                                    {item.loss_amount ? formatCurrency(item.loss_amount) : "-"}
                                </Table.Td>
                            </tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Card>
        </>
    );
};

StockOpnameShow.layout = (page) => <DashboardLayout children={page} />;

export default StockOpnameShow;
