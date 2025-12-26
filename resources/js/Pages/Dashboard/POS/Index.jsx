import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import Input from "@/Components/Common/Input";
import Button from "@/Components/Common/Button";
import Table from "@/Components/Common/Table";
import { useTheme } from "@/Context/ThemeSwitcherContext";
import {
    IconArrowLeft,
    IconArrowRight,
    IconCash,
    IconCreditCard,
    IconMinus,
    IconMoon,
    IconPackage,
    IconPlus,
    IconScale,
    IconSearch,
    IconShoppingCart,
    IconSun,
    IconTrash,
    IconX,
} from "@tabler/icons-react";

export default function Index({
    products = [],
    categories = [],
    carts = [],
    carts_total = 0,
    paymentGateways = [],
    defaultPaymentGateway = "cash",
}) {
    const { auth, errors } = usePage().props;
    const { darkMode, themeSwitcher } = useTheme();

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [discountInput, setDiscountInput] = useState("");
    const [discountType, setDiscountType] = useState("nominal");
    const [cashInput, setCashInput] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const PRODUCTS_PER_PAGE = 12;
    const [paymentMethod, setPaymentMethod] = useState(
        defaultPaymentGateway ?? "cash"
    );
    const [qtyModalOpen, setQtyModalOpen] = useState(false);
    const [qtyModalProduct, setQtyModalProduct] = useState(null);
    const [qtyModalValue, setQtyModalValue] = useState("");
    const [variantModalOpen, setVariantModalOpen] = useState(false);
    const [variantModalProduct, setVariantModalProduct] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const searchInputRef = useRef(null);
    
    // Local state for optimistic updates - Moved up to fix ReferenceError
    const [localCarts, setLocalCarts] = useState(carts);
    
    // Sync local state when props change (server response)
    useEffect(() => {
        setLocalCarts(carts);
    }, [carts]);

    // Recalculate totals based on local state
    const localCartsTotal = useMemo(() => {
        return localCarts.reduce((total, item) => total + (item.price * item.qty), 0);
    }, [localCarts]);
    const lastInputTimeRef = useRef(Date.now());
    const barcodeBufferRef = useRef("");

    // Play beep sound for feedback
    const playBeep = useCallback((success = true) => {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = success ? 800 : 300;
            oscillator.type = "sine";
            gainNode.gain.value = 0.3;
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + (success ? 0.1 : 0.3));
        } catch (e) {
            console.log("Audio not available");
        }
    }, []);

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

    // Barcode scanner detection - auto-add when Enter is pressed after fast input
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Only handle if search input is focused
            if (document.activeElement !== searchInputRef.current) return;
            
            const now = Date.now();
            const timeDiff = now - lastInputTimeRef.current;
            lastInputTimeRef.current = now;
            
            // If Enter is pressed and we have a search value
            if (e.key === "Enter" && search.trim()) {
                e.preventDefault();
                
                // Find product by exact barcode match
                const product = products.find(
                    (p) => p.barcode && p.barcode.toLowerCase() === search.trim().toLowerCase()
                );
                
                if (product) {
                    playBeep(true);
                    handleAddToCart(product);
                    setSearch("");
                } else {
                    playBeep(false);
                    toast.error("Produk tidak ditemukan!");
                }
            }
        };
        
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [search, products, playBeep]);

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
        const total = localCartsTotal || 0;

        if (discountType === "percent") {
            const percent = Math.min(Math.max(value, 0), 100);
            return Math.round((total * percent) / 100);
        }

        return Math.min(value, total);
    }, [discountInput, discountType, localCartsTotal]);
    
    const subtotal = useMemo(() => localCartsTotal ?? 0, [localCartsTotal]);
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
        () => localCarts.reduce((total, item) => total + Number(item.qty), 0),
        [localCarts]
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
                description: "Pembayaran tunai",
            },
            {
                value: "transfer",
                label: "Transfer",
                description: "Transfer bank (manual)",
            },
            {
                value: "qris",
                label: "QRIS",
                description: "Scan QRIS (manual)",
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
            : "Bayar Sekarang"
        : `Bayar ${activePaymentOption?.label ?? ""}`;

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

    const sanitizeDecimalInput = (value) => {
        // Allow numbers and one decimal point
        const cleaned = value.replace(/[^\d.]/g, "");
        // Only allow one decimal point
        const parts = cleaned.split(".");
        if (parts.length > 2) {
            return parts[0] + "." + parts.slice(1).join("");
        }
        return cleaned;
    };

    // Check if product is sold by weight/volume
    const isWeightBasedUnit = (unit) => {
        const weightUnits = ["kg", "gram", "g", "liter", "l", "ml", "ons", "ton"];
        return weightUnits.includes(unit?.toLowerCase());
    };

    const formatQty = (qty, unit) => {
        const numQty = parseFloat(qty);
        if (isWeightBasedUnit(unit)) {
            return numQty % 1 === 0 ? numQty.toString() : numQty.toFixed(2);
        }
        return Math.floor(numQty).toString();
    };

    const handleAddToCart = (product, customQty = null, variantId = null) => {
        const qty = customQty || 1;
        
        // Check if product has variants and no variant selected
        if (product.variants && product.variants.length > 0 && !variantId && customQty === null) {
            setVariantModalProduct(product);
            setSelectedVariant(product.variants.find(v => v.is_default) || product.variants[0]);
            setVariantModalOpen(true);
            return;
        }
        
        if (product.display_qty < qty) {
            toast.error("Stok produk tidak mencukupi!");
            return;
        }

        // If product is sold by weight and no custom qty, show modal
        if (isWeightBasedUnit(product.unit) && customQty === null && !variantId) {
            setQtyModalProduct(product);
            setQtyModalValue("1");
            setQtyModalOpen(true);
            return;
        }

        router.post(
            route("pos.addToCart"),
            {
                product_id: product.id,
                product_variant_id: variantId,
                qty: qty,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Produk ditambahkan");
                    setQtyModalOpen(false);
                    setQtyModalProduct(null);
                    setVariantModalOpen(false);
                    setVariantModalProduct(null);
                },
            }
        );
    };

    const handleVariantSelect = () => {
        if (!selectedVariant || !variantModalProduct) return;
        handleAddToCart(variantModalProduct, 1, selectedVariant.id);
    };

    const handleQtyModalSubmit = () => {
        const qty = parseFloat(qtyModalValue);
        if (isNaN(qty) || qty <= 0) {
            toast.error("Jumlah tidak valid!");
            return;
        }
        handleAddToCart(qtyModalProduct, qty);
    };

    const handleRemoveFromCart = (cartId) => {
        router.delete(route("pos.destroyCart", cartId), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Produk dihapus");
            },
        });
    };

    const handleUpdateCartQty = (cartId, newQty, sync = true) => {
        if (newQty === '' || newQty < 0) newQty = 0; // Allow 0 for input typing, handle validation later? No, stick to logic
        if (newQty <= 0 && sync) return; // Don't sync invalid

        // Optimistic update
        setLocalCarts(prevCarts => 
            prevCarts.map(cart => 
                cart.id === cartId 
                    ? { ...cart, qty: newQty } 
                    : cart
            )
        );

        // Send request in background ONLY if sync is true
        if (sync) {
            router.patch(
                route("pos.updateCart", cartId),
                {
                    qty: newQty,
                },
                {
                    preserveScroll: true,
                    preserveState: true,
                    onFinish: () => {
                        // Optional: handle completion
                    }
                }
            );
        }
    };

    const handleBack = () => {
        router.visit(route("dashboard"));
    };

    const handleSubmitTransaction = () => {
        if (localCarts.length === 0) {
            toast.error("Keranjang kosong!");
            return;
        }

        router.post(
            route("pos.store"),
            {
                discount: discount,
                grand_total: payable,
                cash: isCashPayment ? cash : payable,
                change: isCashPayment ? change : 0,
                payment_method: paymentMethod,
            },
            {
                preserveScroll: true,
                onSuccess: (response) => {
                    setDiscountInput("");
                    setCashInput("");
                    const invoice = response?.props?.flash?.invoice;
                    if (invoice) {
                        toast.success("Transaksi berhasil!");
                    }
                },
                onError: (errors) => {
                    if (errors.payment_required) {
                        window.location.href = errors.payment_url;
                    } else {
                        toast.error(
                            errors.message || "Gagal memproses transaksi"
                        );
                    }
                },
            }
        );
    };



    return (
        <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
            <Head title="POS - Kasir" />
            <Toaster position="top-right" />

            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
                {/* Header */}
                <header className="bg-white dark:bg-gray-950 border-b dark:border-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            <IconArrowLeft size={20} />
                            <span className="hidden sm:inline">Kembali</span>
                        </button>
                        <div className="h-6 w-px bg-gray-300 dark:bg-gray-700" />
                        <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                            KASIR
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                            {auth.user.name}
                        </span>
                        <button
                            onClick={themeSwitcher}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                        >
                            {darkMode ? (
                                <IconSun size={20} />
                            ) : (
                                <IconMoon size={20} />
                            )}
                        </button>
                    </div>
                </header>

                {/* Main Content */}
                <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                    {/* Products Panel */}
                    <div className="flex-1 flex flex-col overflow-hidden lg:w-2/3">
                        {/* Search & Categories */}
                        <div className="bg-white dark:bg-gray-950 border-b dark:border-gray-800 p-4 space-y-3">
                            {/* Search */}
                            <div className="relative">
                                <IconSearch
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Cari produk atau scan barcode... (Enter untuk tambah)"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {search && (
                                    <button
                                        onClick={() => setSearch("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <IconX size={16} />
                                    </button>
                                )}
                            </div>

                            {/* Category Tabs */}
                            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                                        !selectedCategory
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                    }`}
                                >
                                    Semua
                                </button>
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() =>
                                            setSelectedCategory(category)
                                        }
                                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                                            selectedCategory?.id === category.id
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                        }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {filteredProducts.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                    <IconPackage size={64} className="mb-4 opacity-50" />
                                    <p className="text-lg">Tidak ada produk ditemukan</p>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                                        {paginatedProducts.map((product) => (
                                            <div
                                                key={product.id}
                                                onClick={() =>
                                                    handleAddToCart(product)
                                                }
                                                className={`bg-white dark:bg-gray-950 rounded-xl border dark:border-gray-800 overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] ${
                                                    product.display_qty < 1
                                                        ? "opacity-50 cursor-not-allowed"
                                                        : ""
                                                }`}
                                            >
                                                {/* Product Image */}
                                                <div className="aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden relative">
                                                    <img
                                                        src={product.image}
                                                        alt={product.title}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.src =
                                                                "https://via.placeholder.com/200x200?text=No+Image";
                                                        }}
                                                    />
                                                    {/* Stock Badge */}
                                                    <span
                                                        className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-medium ${
                                                            product.display_qty > 10
                                                                ? "bg-emerald-500 text-white"
                                                                : product.display_qty > 0
                                                                ? "bg-amber-500 text-white"
                                                                : "bg-rose-500 text-white"
                                                        }`}
                                                    >
                                                        {product.display_qty > 0 
                                                            ? (product.is_recipe || product.product_type === 'recipe' 
                                                                ? '✓' 
                                                                : product.display_qty)
                                                            : 'Habis'}
                                                    </span>
                                                </div>

                                                {/* Product Info */}
                                                <div className="p-3">
                                                    <h4 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">
                                                        {product.title}
                                                    </h4>
                                                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                                        {formatPrice(product.sell_price)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="flex justify-center items-center gap-2 mt-4 pt-4 border-t dark:border-gray-800">
                                            <button
                                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                                disabled={currentPage === 1}
                                                className="p-2 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700 disabled:opacity-50"
                                            >
                                                <IconArrowLeft size={16} />
                                            </button>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {currentPage} / {totalPages}
                                            </span>
                                            <button
                                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                                disabled={currentPage === totalPages}
                                                className="p-2 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700 disabled:opacity-50"
                                            >
                                                <IconArrowRight size={16} />
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Cart Panel */}
                    <div className="lg:w-1/3 xl:w-[400px] bg-white dark:bg-gray-950 border-t lg:border-t-0 lg:border-l dark:border-gray-800 flex flex-col max-h-[50vh] lg:max-h-none">
                        {/* Cart Header */}
                        <div className="p-4 border-b dark:border-gray-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <IconShoppingCart size={20} className="text-blue-600" />
                                <h2 className="font-bold text-gray-900 dark:text-white">
                                    Keranjang
                                </h2>
                            </div>
                            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {cartCount} item
                            </span>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {localCarts.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                                    <IconShoppingCart size={32} className="mb-2 opacity-50" />
                                    <p className="text-sm">Keranjang kosong</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {localCarts.map((cart) => (
                                        <div
                                            key={cart.id}
                                            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl"
                                        >
                                            <img
                                                src={cart.product?.image}
                                                alt={cart.product?.title}
                                                className="w-12 h-12 rounded-lg object-cover"
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/48";
                                                }}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                                                    {cart.product?.title}
                                                    {cart.variant && (
                                                        <span className="ml-1 text-xs font-normal text-blue-600 dark:text-blue-400">
                                                            ({cart.variant.name})
                                                        </span>
                                                    )}
                                                </h4>
                                                
                                                {/* Qty Controls */}
                                                <div className="flex items-center gap-3 mt-2">
                                                    <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm h-8">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleUpdateCartQty(cart.id, Number(cart.qty) - 1);
                                                            }}
                                                            disabled={Number(cart.qty) <= 1}
                                                            className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-500 transition-colors rounded-l-lg"
                                                        >
                                                            <IconMinus size={14} />
                                                        </button>
                                                        <div className="w-px h-4 bg-gray-200 dark:bg-gray-700"></div>
                                                        <div className="relative">
                                                            <input
                                                                type="number"
                                                                value={isWeightBasedUnit(cart.product?.unit) ? cart.qty : Math.floor(cart.qty)}
                                                                onClick={(e) => e.stopPropagation()}
                                                                onChange={(e) => {
                                                                    const val = e.target.value;
                                                                    handleUpdateCartQty(cart.id, val, false);
                                                                }}
                                                                onBlur={(e) => {
                                                                    const val = e.target.value;
                                                                    if (val && val != cart.qty) {
                                                                         handleUpdateCartQty(cart.id, val, true);
                                                                    }
                                                                }}
                                                                onKeyDown={(e) => {
                                                                    if(e.key === 'Enter') {
                                                                        e.currentTarget.blur();
                                                                    }
                                                                }}
                                                                className="w-12 text-center text-sm font-semibold text-gray-900 dark:text-white bg-transparent border-none focus:ring-0 p-0 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                            />
                                                        </div>
                                                        <div className="w-px h-4 bg-gray-200 dark:bg-gray-700"></div>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleUpdateCartQty(cart.id, Number(cart.qty) + 1);
                                                            }}
                                                            className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors rounded-r-lg"
                                                        >
                                                            <IconPlus size={14} />
                                                        </button>
                                                    </div>
                                                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                                        {cart.product?.unit || 'pcs'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-gray-900 dark:text-white text-sm">
                                                    {formatPrice(cart.price * cart.qty)}
                                                </p>
                                                <button
                                                    onClick={() => handleRemoveFromCart(cart.id)}
                                                    className="text-rose-500 hover:text-rose-600 mt-1"
                                                >
                                                    <IconTrash size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Cart Summary & Payment */}
                        <div className="border-t dark:border-gray-800 p-4 space-y-4">
                            {/* Discount */}
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <div className="flex rounded-lg border dark:border-gray-700 overflow-hidden text-sm">
                                        <button
                                            type="button"
                                            onClick={() => setDiscountType("nominal")}
                                            className={`flex-1 px-3 py-2 transition-colors ${
                                                discountType === "nominal"
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                                            }`}
                                        >
                                            Rp
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setDiscountType("percent")}
                                            className={`flex-1 px-3 py-2 transition-colors ${
                                                discountType === "percent"
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                                            }`}
                                        >
                                            %
                                        </button>
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="Diskon"
                                    value={discountInput}
                                    onChange={(e) =>
                                        setDiscountInput(sanitizeNumericInput(e.target.value))
                                    }
                                    className="flex-1 px-3 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                                />
                            </div>

                            {/* Summary */}
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-rose-500">
                                        <span>Diskon</span>
                                        <span>-{formatPrice(discount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white pt-2 border-t dark:border-gray-700">
                                    <span>Total</span>
                                    <span>{formatPrice(payable)}</span>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="flex gap-2">
                                {paymentOptions.map((option) => {
                                    const isActive = option.value === paymentMethod;
                                    const IconComponent =
                                        option.value === "cash" ? IconCash : IconCreditCard;

                                    return (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => setPaymentMethod(option.value)}
                                            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                                                isActive
                                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                                            }`}
                                        >
                                            <IconComponent size={16} />
                                            {option.label}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Cash Input */}
                            {isCashPayment && (
                                <div>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        placeholder="Jumlah bayar..."
                                        value={cashInput}
                                        onChange={(e) =>
                                            setCashInput(sanitizeNumericInput(e.target.value))
                                        }
                                        className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-lg font-medium"
                                    />
                                    {change > 0 && (
                                        <p className="mt-2 text-center text-emerald-600 font-bold">
                                            Kembalian: {formatPrice(change)}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="button"
                                onClick={handleSubmitTransaction}
                                disabled={isSubmitDisabled}
                                className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-colors ${
                                    isSubmitDisabled
                                        ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700"
                                }`}
                            >
                                {submitLabel}
                                <IconArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Qty Input Modal for Weight-based Products */}
            {qtyModalOpen && qtyModalProduct && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-sm shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <IconScale size={24} className="text-blue-600" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                Masukkan Jumlah
                            </h3>
                        </div>
                        
                        <div className="mb-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {qtyModalProduct.title}
                            </p>
                            <p className="text-sm text-gray-500">
                                Harga: {formatPrice(qtyModalProduct.sell_price)} / {qtyModalProduct.unit}
                            </p>
                            <p className="text-sm text-gray-500">
                                Stok tersedia: {qtyModalProduct.display_qty} {qtyModalProduct.unit}
                            </p>
                        </div>

                        <div className="mb-4">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    inputMode="decimal"
                                    value={qtyModalValue}
                                    onChange={(e) => setQtyModalValue(sanitizeDecimalInput(e.target.value))}
                                    placeholder="0.00"
                                    className="flex-1 px-4 py-3 text-2xl font-bold text-center rounded-xl border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                                    autoFocus
                                />
                                <span className="text-lg font-medium text-gray-600 dark:text-gray-400 w-16">
                                    {qtyModalProduct.unit}
                                </span>
                            </div>
                            {qtyModalValue && (
                                <p className="text-center mt-2 text-blue-600 font-medium">
                                    Total: {formatPrice(parseFloat(qtyModalValue || 0) * qtyModalProduct.sell_price)}
                                </p>
                            )}
                        </div>

                        {/* Quick buttons */}
                        <div className="grid grid-cols-4 gap-2 mb-4">
                            {[0.25, 0.5, 1, 1.5].map((val) => (
                                <button
                                    key={val}
                                    type="button"
                                    onClick={() => setQtyModalValue(val.toString())}
                                    className="py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                    {val}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setQtyModalOpen(false);
                                    setQtyModalProduct(null);
                                }}
                                className="flex-1 py-3 rounded-xl border dark:border-gray-700 text-gray-600 dark:text-gray-400 font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleQtyModalSubmit}
                                disabled={!qtyModalValue || parseFloat(qtyModalValue) <= 0}
                                className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                Tambahkan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Variant Selection Modal */}
            {variantModalOpen && variantModalProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-xl">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                            Pilih Ukuran
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            {variantModalProduct.title}
                        </p>

                        {/* Variant Options */}
                        <div className="space-y-2 mb-6">
                            {variantModalProduct.variants.map((variant) => (
                                <button
                                    key={variant.id}
                                    type="button"
                                    onClick={() => setSelectedVariant(variant)}
                                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                                        selectedVariant?.id === variant.id
                                            ? "border-blue-600 bg-blue-50 dark:bg-blue-900/30"
                                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                                    }`}
                                >
                                    <span className={`font-medium ${
                                        selectedVariant?.id === variant.id
                                            ? "text-blue-600 dark:text-blue-400"
                                            : "text-gray-700 dark:text-gray-300"
                                    }`}>
                                        {variant.name}
                                    </span>
                                    <span className={`font-bold ${
                                        selectedVariant?.id === variant.id
                                            ? "text-blue-600 dark:text-blue-400"
                                            : "text-gray-900 dark:text-white"
                                    }`}>
                                        {formatPrice(variant.sell_price)}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setVariantModalOpen(false);
                                    setVariantModalProduct(null);
                                    setSelectedVariant(null);
                                }}
                                className="flex-1 py-3 rounded-xl border dark:border-gray-700 text-gray-600 dark:text-gray-400 font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleVariantSelect}
                                disabled={!selectedVariant}
                                className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                Tambahkan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
