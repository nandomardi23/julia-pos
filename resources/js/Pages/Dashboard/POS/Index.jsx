import React, { useEffect, useMemo, useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Card from "@/Components/Dashboard/Card";
import Input from "@/Components/Dashboard/Input";
import Button from "@/Components/Dashboard/Button";
import InputSelect from "@/Components/Dashboard/InputSelect";
import Table from "@/Components/Dashboard/Table";
import {
    IconArrowRight,
    IconCash,
    IconCreditCard,
    IconPackage,
    IconReceipt,
    IconSearch,
    IconShoppingBag,
    IconShoppingCartPlus,
    IconTrash,
    IconUser,
    IconFilter,
} from "@tabler/icons-react";

export default function Index({
    products = [],
    categories = [],
    carts = [],
    carts_total = 0,
    customers = [],
    paymentGateways = [],
    defaultPaymentGateway = "cash",
}) {
    const { auth, errors } = usePage().props;

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [discountInput, setDiscountInput] = useState("");
    const [discountType, setDiscountType] = useState("nominal");
    const [cashInput, setCashInput] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const PRODUCTS_PER_PAGE = 8;
    const [paymentMethod, setPaymentMethod] = useState(
        defaultPaymentGateway ?? "cash"
    );

    useEffect(() => {
        setPaymentMethod(defaultPaymentGateway ?? "cash");
    }, [defaultPaymentGateway]);

    // Filter products
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const searchLower = search.toLowerCase();
            const matchesSearch =
                product.title.toLowerCase().includes(searchLower) ||
                (product.barcode &&
                    product.barcode.toLowerCase().includes(searchLower));
            const matchesCategory =
                !selectedCategory ||
                product.category_id === selectedCategory.id;
            return matchesSearch && matchesCategory;
        });
    }, [products, search, selectedCategory]);

    // Reset page when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [search, selectedCategory]);

    // Paginated products
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
        return filteredProducts.slice(
            startIndex,
            startIndex + PRODUCTS_PER_PAGE
        );
    }, [filteredProducts, currentPage]);

    const discount = useMemo(() => {
        const value = Number(discountInput) || 0;
        const total = carts_total || 0;

        if (discountType === "percent") {
            const percent = Math.min(Math.max(value, 0), 100);
            return Math.round((total * percent) / 100);
        }

        return Math.min(value, total);
    }, [discountInput, discountType, carts_total]);
    const subtotal = useMemo(() => carts_total ?? 0, [carts_total]);
    const payable = useMemo(
        () => Math.max(subtotal - discount, 0),
        [subtotal, discount]
    );
    const cash = useMemo(
        () =>
            paymentMethod === "cash"
                ? Math.max(0, Number(cashInput) || 0)
                : payable,
        [cashInput, paymentMethod, payable]
    );
    const change = useMemo(() => Math.max(cash - payable, 0), [cash, payable]);
    const remaining = useMemo(
        () => Math.max(payable - cash, 0),
        [payable, cash]
    );
    const cartCount = useMemo(
        () => carts.reduce((total, item) => total + Number(item.qty), 0),
        [carts]
    );

    const paymentOptions = useMemo(() => {
        const options = Array.isArray(paymentGateways)
            ? paymentGateways.filter(
                  (gateway) =>
                      gateway?.value && gateway.value.toLowerCase() !== "cash"
              )
            : [];

        return [
            {
                value: "cash",
                label: "Tunai",
                description: "Pembayaran tunai langsung di kasir.",
            },
            ...options,
        ];
    }, [paymentGateways]);

    const activePaymentOption =
        paymentOptions.find((option) => option.value === paymentMethod) ??
        paymentOptions[0];

    const isCashPayment = activePaymentOption?.value === "cash";

    useEffect(() => {
        if (
            paymentOptions.length &&
            !paymentOptions.find((option) => option.value === paymentMethod)
        ) {
            setPaymentMethod(paymentOptions[0].value);
        }
    }, [paymentOptions, paymentMethod]);

    useEffect(() => {
        if (!isCashPayment && payable >= 0) {
            setCashInput(String(payable));
        }
    }, [isCashPayment, payable]);

    const submitLabel = isCashPayment
        ? remaining > 0
            ? "Menunggu Pembayaran"
            : "Selesaikan Transaksi"
        : `Buat Pembayaran ${activePaymentOption?.label ?? ""}`;

    const isSubmitDisabled =
        carts.length === 0 || (isCashPayment && remaining > 0);

    const formatPrice = (value = 0) =>
        value.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        });

    const sanitizeNumericInput = (value) => {
        const numbersOnly = value.replace(/[^\d]/g, "");
        if (numbersOnly === "") return "";
        return numbersOnly.replace(/^0+(?=\d)/, "");
    };

    const handleAddToCart = (product) => {
        if (product.stock < 1) {
            toast.error("Stok produk habis!");
            return;
        }

        router.post(
            route("pos.addToCart"),
            {
                product_id: product.id,
                qty: 1,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Produk ditambahkan ke keranjang");
                },
            }
        );
    };

    const handleRemoveFromCart = (cartId) => {
        router.delete(route("pos.destroyCart", cartId), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Produk dihapus dari keranjang");
            },
        });
    };

    const handleSubmitTransaction = (event) => {
        event.preventDefault();

        if (carts.length === 0) {
            toast.error("Keranjang masih kosong");
            return;
        }

        // if (!selectedCustomer?.id) {
        //     toast.error("Pilih pelanggan terlebih dahulu");
        //     return;
        // }

        if (isCashPayment && cash < payable) {
            toast.error("Jumlah pembayaran kurang dari total");
            return;
        }

        router.post(
            route("transactions.store"),
            {
                customer_id: selectedCustomer?.id ?? null, // Bisa null
                discount,
                grand_total: payable,
                cash: isCashPayment ? cash : payable,
                change: isCashPayment ? change : 0,
                payment_gateway: isCashPayment ? null : paymentMethod,
            },
            {
                onSuccess: () => {
                    setDiscountInput("");
                    setCashInput("");
                    setSelectedCustomer(null);
                    setPaymentMethod(defaultPaymentGateway ?? "cash");
                    toast.success("Transaksi berhasil disimpan");
                },
            }
        );
    };

    return (
        <>
            <Head title="POS - Point of Sale" />

            <div className="space-y-5">
                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card
                        title="Total Item"
                        icon={<IconShoppingBag size={18} />}
                    >
                        <p className="text-3xl font-semibold text-gray-900 dark:text-white">
                            {cartCount}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            Produk di keranjang
                        </p>
                    </Card>
                    <Card title="Subtotal" icon={<IconReceipt size={18} />}>
                        <p className="text-3xl font-semibold text-gray-900 dark:text-white">
                            {formatPrice(subtotal)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            Belanja sebelum diskon
                        </p>
                    </Card>
                    <Card title="Kembalian" icon={<IconCash size={18} />}>
                        <p className="text-3xl font-semibold text-gray-900 dark:text-white">
                            {formatPrice(change)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            {remaining > 0
                                ? `Kurang ${formatPrice(remaining)}`
                                : "Siap diberikan ke pelanggan"}
                        </p>
                    </Card>
                </div>

                <div className="grid gap-5 lg:grid-cols-3">
                    {/* Products Section */}
                    <div className="space-y-5 lg:col-span-2">
                        {/* Search and Filter */}
                        <Card
                            title="Pilih Produk"
                            icon={<IconPackage size={20} />}
                            form={(e) => e.preventDefault()}
                        >
                            <div className="flex flex-col gap-4 md:flex-row md:items-end">
                                <div className="flex-1">
                                    <Input
                                        type="text"
                                        label="Cari Produk"
                                        placeholder="Ketik nama atau kode produk..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        icon={<IconSearch size={18} />}
                                    />
                                </div>
                                <div className="flex-1">
                                    <InputSelect
                                        label="Filter Kategori"
                                        data={categories}
                                        selected={selectedCategory}
                                        setSelected={setSelectedCategory}
                                        placeholder="Semua Kategori"
                                        displayKey="name"
                                        multiple={false}
                                    />
                                </div>
                                {selectedCategory && (
                                    <Button
                                        type="button"
                                        label="Reset"
                                        onClick={() =>
                                            setSelectedCategory(null)
                                        }
                                        className="border bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-900"
                                    />
                                )}
                            </div>

                            {/* Product Grid */}
                            <div className="mt-5 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {filteredProducts.length === 0 && (
                                    <div className="col-span-full text-center py-12 text-gray-500">
                                        <IconPackage
                                            size={48}
                                            className="mx-auto mb-3 opacity-50"
                                        />
                                        <p>Tidak ada produk ditemukan</p>
                                    </div>
                                )}
                                {paginatedProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        onClick={() => handleAddToCart(product)}
                                        className={`relative cursor-pointer rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] ${
                                            product.stock < 1
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                        }`}
                                    >
                                        {/* Product Image */}
                                        <div className="aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src =
                                                        "https://via.placeholder.com/200x200?text=No+Image";
                                                }}
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-3">
                                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">
                                                {product.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 mb-2">
                                                {product.category?.name ||
                                                    "Tanpa Kategori"}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                                                    {formatPrice(
                                                        product.sell_price
                                                    )}
                                                </p>
                                                <span
                                                    className={`text-xs px-2 py-0.5 rounded-full ${
                                                        product.stock > 10
                                                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                            : product.stock > 0
                                                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                                            : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                                                    }`}
                                                >
                                                    Stok: {product.stock}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Add to Cart Overlay */}
                                        <div className="absolute inset-0 bg-indigo-600/0 hover:bg-indigo-600/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                                            <div className="bg-indigo-600 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
                                                <IconShoppingCartPlus
                                                    size={16}
                                                />
                                                Tambah
                                            </div>
                                        </div>

                                        {/* Out of Stock Badge */}
                                        {product.stock < 1 && (
                                            <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                                                <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                    Stok Habis
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-between border-t pt-4 dark:border-gray-800">
                                    <p className="text-sm text-gray-500">
                                        Menampilkan{" "}
                                        {Math.min(
                                            paginatedProducts.length,
                                            PRODUCTS_PER_PAGE
                                        )}{" "}
                                        dari {filteredProducts.length} produk
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            type="button"
                                            label="Sebelumnya"
                                            onClick={() =>
                                                setCurrentPage((prev) =>
                                                    Math.max(prev - 1, 1)
                                                )
                                            }
                                            disabled={currentPage === 1}
                                            className={`px-3 py-1.5 text-sm border bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-900 ${
                                                currentPage === 1
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : ""
                                            }`}
                                        />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Halaman {currentPage} dari{" "}
                                            {totalPages}
                                        </span>
                                        <Button
                                            type="button"
                                            label="Selanjutnya"
                                            onClick={() =>
                                                setCurrentPage((prev) =>
                                                    Math.min(
                                                        prev + 1,
                                                        totalPages
                                                    )
                                                )
                                            }
                                            disabled={
                                                currentPage === totalPages
                                            }
                                            className={`px-3 py-1.5 text-sm border bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-900 ${
                                                currentPage === totalPages
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : ""
                                            }`}
                                        />
                                    </div>
                                </div>
                            )}
                        </Card>
                    </div>

                    {/* Payment Section */}
                    <div className="space-y-5">
                        <Card
                            title="Informasi Pelanggan"
                            icon={<IconUser size={18} />}
                        >
                            <div className="space-y-3">
                                <Input
                                    label="Kasir"
                                    type="text"
                                    value={auth.user.name}
                                    disabled
                                />

                                <InputSelect
                                    label="Pelanggan"
                                    data={customers}
                                    selected={selectedCustomer}
                                    setSelected={setSelectedCustomer}
                                    placeholder="Cari nama pelanggan"
                                    errors={errors?.customer_id}
                                    multiple={false}
                                    searchable
                                    displayKey="name"
                                />
                            </div>
                        </Card>

                        {/* Cart Table (Condensed) */}
                        <Table.Card title="Keranjang">
                            <Table>
                                <Table.Thead>
                                    <tr>
                                        <Table.Th>Item</Table.Th>
                                        <Table.Th className="text-center">
                                            Qty
                                        </Table.Th>
                                        <Table.Th className="text-right">
                                            Total
                                        </Table.Th>
                                        <Table.Th></Table.Th>
                                    </tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {carts.length === 0 && (
                                        <tr>
                                            <Table.Td
                                                colSpan={4}
                                                className="py-4 text-center text-gray-500 text-sm"
                                            >
                                                Keranjang kosong
                                            </Table.Td>
                                        </tr>
                                    )}

                                    {carts.map((item) => (
                                        <tr
                                            key={`${item.id}-${item.product_id}`}
                                        >
                                            <Table.Td className="!whitespace-normal">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-gray-900 dark:text-white line-clamp-1 text-sm">
                                                        {item.product.title}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {formatPrice(
                                                            item.product
                                                                .sell_price
                                                        )}
                                                    </span>
                                                </div>
                                            </Table.Td>
                                            <Table.Td className="text-center text-sm">
                                                {item.qty}
                                            </Table.Td>
                                            <Table.Td className="text-right text-sm">
                                                {formatPrice(
                                                    item.product.sell_price *
                                                        item.qty
                                                )}
                                            </Table.Td>
                                            <Table.Td className="text-right">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRemoveFromCart(
                                                            item.id
                                                        )
                                                    }
                                                    className="text-rose-500 hover:text-rose-600 p-1"
                                                >
                                                    <IconTrash size={18} />
                                                </button>
                                            </Table.Td>
                                        </tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        </Table.Card>

                        <Card
                            title="Ringkasan Pembayaran"
                            icon={<IconReceipt size={18} />}
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">
                                        Subtotal
                                    </span>
                                    <span className="font-medium">
                                        {formatPrice(subtotal)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">
                                        Diskon
                                    </span>
                                    <span className="font-medium text-rose-500">
                                        - {formatPrice(discount)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-base font-semibold">
                                    <span>Total Bayar</span>
                                    <span>{formatPrice(payable)}</span>
                                </div>

                                <div className="grid gap-3">
                                    {/* Discount Mode Toggle */}
                                    <div className="flex bg-gray-100 p-1 rounded-lg dark:bg-gray-800">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setDiscountType("nominal");
                                                setDiscountInput("");
                                            }}
                                            className={`flex-1 text-sm font-medium py-1.5 rounded-md transition-all ${
                                                discountType === "nominal"
                                                    ? "bg-white text-gray-900 shadow dark:bg-gray-700 dark:text-white"
                                                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
                                            }`}
                                        >
                                            Rp (Nominal)
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setDiscountType("percent");
                                                setDiscountInput("");
                                            }}
                                            className={`flex-1 text-sm font-medium py-1.5 rounded-md transition-all ${
                                                discountType === "percent"
                                                    ? "bg-white text-gray-900 shadow dark:bg-gray-700 dark:text-white"
                                                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
                                            }`}
                                        >
                                            % (Persen)
                                        </button>
                                    </div>

                                    <Input
                                        type="text"
                                        inputMode="numeric"
                                        label={
                                            discountType === "percent"
                                                ? "Diskon (%)"
                                                : "Diskon (Rp)"
                                        }
                                        placeholder="0"
                                        value={discountInput}
                                        onChange={(event) =>
                                            setDiscountInput(
                                                sanitizeNumericInput(
                                                    event.target.value
                                                )
                                            )
                                        }
                                    />
                                    <Input
                                        type="text"
                                        inputMode="numeric"
                                        label={
                                            isCashPayment
                                                ? "Bayar Tunai (Rp)"
                                                : "Nominal Pembayaran"
                                        }
                                        placeholder="0"
                                        value={
                                            isCashPayment
                                                ? cashInput
                                                : payable.toString()
                                        }
                                        disabled={!isCashPayment}
                                        readOnly={!isCashPayment}
                                        onChange={(event) =>
                                            setCashInput(
                                                sanitizeNumericInput(
                                                    event.target.value
                                                )
                                            )
                                        }
                                    />
                                </div>

                                <div className="space-y-3">
                                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        Pilih Metode Pembayaran
                                    </p>
                                    <div className="grid gap-3">
                                        {paymentOptions.map((option) => {
                                            const isActive =
                                                option.value === paymentMethod;
                                            const IconComponent =
                                                option.value === "cash"
                                                    ? IconCash
                                                    : IconCreditCard;

                                            return (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    onClick={() =>
                                                        setPaymentMethod(
                                                            option.value
                                                        )
                                                    }
                                                    className={`w-full rounded-xl border p-3 text-left transition ${
                                                        isActive
                                                            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10"
                                                            : "border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700"
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between gap-3">
                                                        <div>
                                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                                {option.label}
                                                            </p>
                                                            {option?.description && (
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                    {
                                                                        option.description
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                        <IconComponent
                                                            size={18}
                                                            className={
                                                                isActive
                                                                    ? "text-indigo-600"
                                                                    : "text-gray-400"
                                                            }
                                                        />
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900/40">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">
                                            Metode
                                        </span>
                                        <span className="font-medium">
                                            {activePaymentOption?.label ??
                                                "Tunai"}
                                        </span>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between text-sm">
                                        <span className="text-gray-500">
                                            {isCashPayment
                                                ? "Kembalian"
                                                : "Status"}
                                        </span>
                                        <span
                                            className={`font-semibold ${
                                                isCashPayment
                                                    ? "text-emerald-500"
                                                    : "text-amber-500"
                                            }`}
                                        >
                                            {isCashPayment
                                                ? change > 0
                                                    ? formatPrice(change)
                                                    : "-"
                                                : "Menunggu pembayaran"}
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    type="button"
                                    label={submitLabel}
                                    icon={<IconArrowRight size={18} />}
                                    onClick={handleSubmitTransaction}
                                    disabled={isSubmitDisabled}
                                    className={`border bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-900 w-full ${
                                        isSubmitDisabled
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

Index.layout = (page) => <DashboardLayout children={page} />;
