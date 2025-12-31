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
} from "@tabler/icons-react";

const locationTypeOptions = [
    { id: "warehouse", name: "Gudang" },
    { id: "display", name: "Display" },
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

    const handlePhysicalQtyChange = (index, value) => {
        setItemsData((prev) => {
            const updated = [...prev];
            updated[index].physical_qty = parseFloat(value) || 0;
            return updated;
        });
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

    return (
        <>
            <Head title="Buat Stock Opname" />

            <Card
                title="Buat Stock Opname"
                footer={
                    <div className="flex justify-between">
                        <Link href={route("stock-opnames.index")}>
                            <Button
                                label="Kembali"
                                icon={<IconArrowLeft size={18} />}
                                className="border bg-white text-gray-700 hover:bg-gray-100"
                            />
                        </Link>
                        {itemsData.length > 0 && (
                            <Button
                                label="Simpan Draft"
                                icon={<IconDeviceFloppy size={18} />}
                                className="bg-indigo-600 text-white hover:bg-indigo-700"
                                onClick={handleSubmit}
                            />
                        )}
                    </div>
                }
            >
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Pilih lokasi dan input stok fisik untuk pencocokan (max 50 produk)
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

                {/* Products Table */}
                {itemsData.length > 0 ? (
                    <div>
                        {totalProducts > 50 && (
                            <div className="mb-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-sm text-yellow-700 dark:text-yellow-300">
                                ⚠️ Menampilkan 50 dari {totalProducts} produk. Produk dengan stok 0 tidak ditampilkan.
                            </div>
                        )}
                        <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                            Menampilkan {itemsData.length} produk
                        </div>
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
                                {itemsData.map((item, index) => (
                                    <tr key={item.product_id}>
                                        <Table.Td className="text-center">{index + 1}</Table.Td>
                                        <Table.Td className="font-medium">{item.title}</Table.Td>
                                        <Table.Td className="text-gray-500">{item.sku || "-"}</Table.Td>
                                        <Table.Td className="text-center">{item.system_qty}</Table.Td>
                                        <Table.Td className="text-center">
                                            <input
                                                type="number"
                                                step="0.001"
                                                min="0"
                                                value={item.physical_qty}
                                                onChange={(e) =>
                                                    handlePhysicalQtyChange(index, e.target.value)
                                                }
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
