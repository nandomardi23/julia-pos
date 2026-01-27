import React, { useState, useEffect } from "react";
import { Head, router, Link } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Card from "@/Components/Common/Card";
import Button from "@/Components/Common/Button";
import Input from "@/Components/Common/Input";
import InputSelect from "@/Components/Common/InputSelect";
import Table from "@/Components/Common/Table";
import {
    IconArrowLeft,
    IconDeviceFloppy,
    IconSearch,
    IconChevronLeft,
    IconChevronRight,
} from "@tabler/icons-react";

const locationTypeOptions = [
    { id: "warehouse", name: "Gudang" },
    { id: "display", name: "Display" },
];

const perPageOptions = [
    { id: 10, name: "10" },
    { id: 25, name: "25" },
    { id: 50, name: "50" },
    { id: 100, name: "100" },
];

const StockOpnameCreate = ({
    warehouses,
    displays,
    products,
    totalProducts, 
    selectedLocationType,
    selectedLocationId,
}) => {
    const [locationType, setLocationType] = useState(
        locationTypeOptions.find((l) => l.id === selectedLocationType) || locationTypeOptions[0]
    );
    const [locationId, setLocationId] = useState(selectedLocationId || "");
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [itemsData, setItemsData] = useState([]);
    const [note, setNote] = useState("");

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const locationOptions = locationType?.id === "warehouse" ? warehouses : displays;

    useEffect(() => {
        if (selectedLocationId && locationOptions) {
            const found = locationOptions.find((l) => l.id == selectedLocationId);
            setSelectedLocation(found || null);
        }
    }, [selectedLocationId, locationOptions]);

    useEffect(() => {
        if (products && products.length > 0) {
            setItemsData(
                products.map((p) => ({
                    product_id: p.id,
                    title: p.title,
                    sku: p.sku,
                    barcode: p.barcode,
                    system_qty: p.system_qty,
                    physical_qty: p.system_qty,
                }))
            );
            setCurrentPage(1); // Reset page on load
        }
    }, [products]);

    const handleLoadProducts = () => {
        if (!locationId) {
            alert("Pilih lokasi terlebih dahulu");
            return;
        }
        router.get(
            route("stock-opnames.create"),
            {
                location_type: locationType?.id,
                location_id: locationId,
            },
            { preserveState: false }
        );
    };

    const handlePhysicalQtyChange = (productId, value) => {
        setItemsData((prev) =>
            prev.map((item) =>
                item.product_id === productId
                    ? { ...item, physical_qty: parseFloat(value) || 0 }
                    : item
            )
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (itemsData.length === 0) {
            alert("Tidak ada produk untuk di-opname");
            return;
        }

        router.post(route("stock-opnames.store"), {
            location_type: locationType?.id,
            location_id: locationId,
            note: note,
            items: itemsData.map((item) => ({
                product_id: item.product_id,
                system_qty: item.system_qty,
                physical_qty: item.physical_qty,
            })),
        });
    };

    const getDifference = (item) => {
        return (item.physical_qty - item.system_qty).toFixed(3);
    };

    const getDifferenceClass = (item) => {
        const diff = item.physical_qty - item.system_qty;
        if (diff < 0) return "text-red-500 font-semibold";
        if (diff > 0) return "text-green-500 font-semibold";
        return "text-gray-500";
    };

    // Pagination Logic
    const indexOfLastItem = currentPage * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const currentItems = itemsData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(itemsData.length / perPage);

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
            <Head title="Buat Stock Opname" />

            <Card
                title="Buat Stock Opname"
            >
                <div className="mb-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                        Pilih lokasi dan input stok fisik untuk pencocokan.
                    </p>

                    {/* Location Selection */}
                    <div className="grid gap-4 md:grid-cols-4 mb-6">
                        <InputSelect
                            label="Tipe Lokasi"
                            data={locationTypeOptions}
                            selected={locationType}
                            setSelected={(value) => {
                                setLocationType(value);
                                setLocationId("");
                                setSelectedLocation(null);
                                setItemsData([]);
                            }}
                        />
                        <InputSelect
                            label={locationType?.id === "warehouse" ? "Pilih Gudang" : "Pilih Display"}
                            data={locationOptions || []}
                            selected={selectedLocation}
                            setSelected={(value) => {
                                setSelectedLocation(value);
                                setLocationId(value?.id || "");
                            }}
                            placeholder="Pilih lokasi..."
                        />
                        <div className="flex items-end">
                            <Button
                                type="button"
                                label="Load Produk"
                                icon={<IconSearch size={18} />}
                                className="bg-emerald-600 text-white hover:bg-emerald-700"
                                onClick={handleLoadProducts}
                            />
                        </div>
                        <Input
                            label="Catatan (opsional)"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Catatan opname..."
                        />
                    </div>
                </div>

                {/* Products Table */}
                {itemsData.length > 0 ? (
                    <div>
                        <Table>
                            <Table.Thead>
                                <tr>
                                    <Table.Th className="w-12 text-center">No</Table.Th>
                                    <Table.Th>Produk</Table.Th>
                                    <Table.Th>SKU</Table.Th>
                                    <Table.Th className="text-center">Stok Sistem</Table.Th>
                                    <Table.Th className="text-center w-40">Stok Fisik</Table.Th>
                                    <Table.Th className="text-center">Selisih</Table.Th>
                                </tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {currentItems.map((item, index) => (
                                    <tr key={item.product_id}>
                                        <Table.Td className="text-center">
                                            {indexOfFirstItem + index + 1}
                                        </Table.Td>
                                        <Table.Td className="font-medium">
                                            <div>{item.title}</div>
                                            <div className="text-xs text-gray-500">{item.barcode}</div>
                                        </Table.Td>
                                        <Table.Td className="text-gray-500">{item.sku || "-"}</Table.Td>
                                        <Table.Td className="text-center">{item.system_qty}</Table.Td>
                                        <Table.Td className="text-center">
                                            <input
                                                type="number"
                                                step="any"
                                                min="0"
                                                value={item.physical_qty}
                                                onChange={(e) =>
                                                    handlePhysicalQtyChange(item.product_id, e.target.value)
                                                }
                                                onKeyDown={(e) => {
                                                    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') e.stopPropagation();
                                                }}
                                                className="w-full px-3 py-1.5 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                            />
                                        </Table.Td>
                                        <Table.Td className={`text-center ${getDifferenceClass(item)}`}>
                                            {getDifference(item)}
                                        </Table.Td>
                                    </tr>
                                ))}
                            </Table.Tbody>
                        </Table>

                        {/* FOOTER AREA (Using standard divs instead of prop) */}
                        <div className="mt-8 border-t border-gray-100 dark:border-gray-800 pt-6">
                            {/* Pagination Controls */}
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                                <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                    <span>
                                        Menampilkan <span className="font-semibold text-gray-900 dark:text-gray-200">{indexOfFirstItem + 1}</span> - <span className="font-semibold text-gray-900 dark:text-gray-200">{Math.min(indexOfLastItem, itemsData.length)}</span> dari <span className="font-semibold text-gray-900 dark:text-gray-200">{itemsData.length}</span> data
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

                            {/* Action Buttons */}
                            <div className="flex justify-between items-center w-full">
                                <Button
                                    type="link"
                                    href={route("stock-opnames.index")}
                                    label="Kembali"
                                    icon={<IconArrowLeft size={18} />}
                                    className="border bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
                                />
                                <Button
                                    type="button"
                                    label="Simpan Draft"
                                    icon={<IconDeviceFloppy size={18} />}
                                    className="bg-indigo-600 text-white hover:bg-indigo-700 shadow-md transition-all active:scale-95"
                                    onClick={handleSubmit}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        <p>Pilih lokasi dan klik "Load Produk" untuk memulai stock opname.</p>
                    </div>
                )}
            </Card>
        </>
    );
};

StockOpnameCreate.layout = (page) => <DashboardLayout children={page} />;

export default StockOpnameCreate;
