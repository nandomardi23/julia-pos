import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import Input from "@/Components/Common/Input";
import Button from "@/Components/Common/Button";
import Table from "@/Components/Common/Table";
import { useTheme } from "@/Context/ThemeSwitcherContext";
import PrintService, { WebSocketPrintService } from "@/Services/PrintService";
import {
    IconArrowLeft,
    IconArrowRight,
    IconCash,
    IconCreditCard,
    IconMinus,
    IconMoon,
    IconPackage,
    IconPlus,
    IconPrinter,
    IconScale,
    IconSearch,
    IconShoppingCart,
    IconSun,
    IconTrash,
    IconX,
    IconBrandLaravel,
} from "@tabler/icons-react";

export default function Index({
    products = { data: [] },
    categories = [],
    carts = [],
    carts_total = 0,
    paymentGateways = [],
    defaultPaymentGateway = "cash",
    activeShift = null,
    filters = {},
}) {
    const { auth, errors, app_settings: settings = {}, flash = {} } = usePage().props;
    const { darkMode, themeSwitcher } = useTheme();

    // Get products data from paginated response
    const productsList = products?.data || products || [];
    const pagination = products?.links ? products : null;

    const [search, setSearch] = useState(filters?.search || "");
    const [selectedCategory, setSelectedCategory] = useState(
        filters?.category ? categories.find(c => c.id == filters.category) : null
    );
    const [discountInput, setDiscountInput] = useState("");
    const [discountType, setDiscountType] = useState("nominal");
    const [taxInput, setTaxInput] = useState("12"); // Default 12%
    const [cashInput, setCashInput] = useState("");
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
    
    // QZ Tray connection status
    const [qzStatus, setQzStatus] = useState({
        checking: true,
        connected: false,
        printerName: null
    });
    
    // Print mode: 'qz' or 'server' (persisted in localStorage)
    const [printMode, setPrintMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('pos_print_mode') || 'qz';
        }
        return 'qz';
    });
    
    // Save printMode to localStorage when changed
    useEffect(() => {
        localStorage.setItem('pos_print_mode', printMode);
    }, [printMode]);
    
    // Server print status
    const [serverPrintStatus, setServerPrintStatus] = useState({
        available: false,
        printerName: null,
        checking: false
    });
    
    // WebSocket print status
    const [wsStatus, setWsStatus] = useState({
        connected: false,
        reconnecting: false,
        message: 'Disconnected'
    });
    
    // Register WebSocket status callback
    useEffect(() => {
        WebSocketPrintService.onStatusChange(setWsStatus);
        
        // Try to connect on mount
        WebSocketPrintService.connect().catch(() => {
            // Silent fail - status will be updated via callback
        });
        
        return () => {
            // Cleanup on unmount
            WebSocketPrintService.disconnect();
        };
    }, []);
    
    // Hide out of stock filter
    const [hideOutOfStock, setHideOutOfStock] = useState(filters?.hide_out_of_stock ?? false);
    
    // Receipt modal state
    const [receiptModalOpen, setReceiptModalOpen] = useState(false);
    const [lastTransaction, setLastTransaction] = useState(null);
    const [thermalPrinting, setThermalPrinting] = useState(false);
    const [drawerOpening, setDrawerOpening] = useState(false);
    
    // Check for flash transaction (after successful payment)
    useEffect(() => {
        if (flash?.transaction) {
            setLastTransaction(flash.transaction);
            setReceiptModalOpen(true);
            // Note: Cash drawer will be opened automatically when printing receipt (for cash payments)
        }
    }, [flash?.transaction]);
    

    
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
    
    // QZ Tray connection check handler (lazy - on demand)
    const handleQzCheck = async () => {
        if (qzStatus.checking) return; // Prevent multiple checks
        
        setQzStatus(prev => ({ ...prev, checking: true }));
        try {
            const status = await PrintService.checkConnection();
            setQzStatus({
                checking: false,
                connected: status.connected,
                printerName: status.thermalPrinter
            });
        } catch {
            setQzStatus({ checking: false, connected: false, printerName: null });
        }
    };

    // Debounced search to server
    const searchTimeoutRef = useRef(null);
    const handleSearchChange = (value) => {
        setSearch(value);
        
        // Clear previous timeout
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        
        // Debounce 500ms before sending to server
        searchTimeoutRef.current = setTimeout(() => {
            router.get(route('pos.index'), {
                search: value || undefined,
                category: selectedCategory?.id || undefined,
                hide_out_of_stock: hideOutOfStock || undefined,
            }, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 500);
    };

    // Handle category change - immediate server request
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        router.get(route('pos.index'), {
            search: search || undefined,
            category: category?.id || undefined,
            hide_out_of_stock: hideOutOfStock || undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };
    
    // Handle hide out of stock toggle
    const handleHideOutOfStockChange = (checked) => {
        setHideOutOfStock(checked);
        router.get(route('pos.index'), {
            search: search || undefined,
            category: selectedCategory?.id || undefined,
            hide_out_of_stock: checked || undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    // Products are already filtered from server
    const filteredProducts = productsList;

    // Barcode scanner detection - auto-add when Enter is pressed after fast input
    const scanningRef = useRef(false); // Lock to prevent concurrent scans
    
    // Buffer for headless scanning
    const bufferTimeoutRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = async (e) => {
            const activeElement = document.activeElement;
            const isTypingField = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA';
            const isSearchFocused = activeElement === searchInputRef.current;

            // 1. If typing in another field (e.g. Payment/Discount) that is NOT search, ignore scanning
            if (isTypingField && !isSearchFocused) return;

            // 2. Headless Layout: Capture non-control characters into buffer
            if (!isSearchFocused && e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
                const now = Date.now();
                // Check inter-keypress timing. Scanners are fast (<50ms). Humans are slow.
                // If gap > 100ms, assume new sequence or manual type.
                if (now - lastInputTimeRef.current > 100) {
                     barcodeBufferRef.current = ""; 
                }
                lastInputTimeRef.current = now;
                barcodeBufferRef.current += e.key;

                // Auto-clear buffer if sequence stops (noise prevention)
                if (bufferTimeoutRef.current) clearTimeout(bufferTimeoutRef.current);
                bufferTimeoutRef.current = setTimeout(() => {
                    barcodeBufferRef.current = "";
                }, 200);
            }

            // 3. Handle Enter Key (Trigger Search)
            if (e.key === "Enter") {
                let barcodeToSearch = "";

                // Prefer Search Input value if focused, otherwise Buffer
                if (isSearchFocused) {
                    barcodeToSearch = search.trim();
                } else {
                    barcodeToSearch = barcodeBufferRef.current.trim();
                }

                if (barcodeToSearch) {
                    e.preventDefault();
                    if (scanningRef.current) return;

                    const barcode = barcodeToSearch;

                    // Cleanup
                    setSearch("");
                    barcodeBufferRef.current = "";
                    if (bufferTimeoutRef.current) clearTimeout(bufferTimeoutRef.current);
                    
                    if (searchTimeoutRef.current) {
                        clearTimeout(searchTimeoutRef.current);
                        searchTimeoutRef.current = null;
                    }

                    scanningRef.current = true;
                    // Provide immediate feedback to reduce perceived delay
                    const loadingToast = toast.loading("Mencari produk...");
                    
                    try {
                        // First try to find in current products list (fast)
                        const localProduct = productsList.find(
                            (p) => p.barcode && p.barcode.toLowerCase() === barcode.toLowerCase()
                        );
                        
                        if (localProduct) {
                            toast.dismiss(loadingToast); // Dismiss loading immediately
                            playBeep(true);
                            handleAddToCart(localProduct);
                            return;
                        }
                        
                        // If not found locally, search in database via API
                        const response = await fetch(`/dashboard/pos/find-by-barcode?barcode=${encodeURIComponent(barcode)}`);
                        const data = await response.json();
                        
                        toast.dismiss(loadingToast); // Dismiss loading before showing result
                        
                        if (data.found && data.product) {
                            playBeep(true);
                            handleAddToCart(data.product);
                        } else {
                            playBeep(false);
                            toast.error(data.message || "Produk tidak ditemukan!");
                        }
                    } catch (error) {
                        toast.dismiss(loadingToast);
                        playBeep(false);
                        toast.error("Gagal mencari produk: " + error.message);
                    } finally {
                        scanningRef.current = false;
                    }
                }
            }
        };
        
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [search, productsList, playBeep]);

    // Server-side pagination
    const totalPages = pagination?.last_page || 1;
    const currentServerPage = pagination?.current_page || 1;
    const paginatedProducts = filteredProducts;

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
    
    // Tax calculation: (Subtotal - Discount) * Tax%
    // Only apply tax if result is positive
    const taxAmount = useMemo(() => {
        const afterDiscount = Math.max(subtotal - discount, 0);
        const taxPercent = parseFloat(taxInput) || 0;
        return Math.round(afterDiscount * (taxPercent / 100));
    }, [subtotal, discount, taxInput]);

    const payable = useMemo(
        () => Math.max(subtotal - discount + taxAmount, 0),
        [subtotal, discount, taxAmount]
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
            // Smart Warning: Check if product has warehouse stock
            if (product.warehouse_qty > 0) {
                toast.error(
                    `Stok display habis! Tersedia ${product.warehouse_qty} unit di Gudang. Silakan transfer ke Display terlebih dahulu.`,
                    { duration: 5000 }
                );
            } else {
                toast.error("Stok produk tidak mencukupi!");
            }
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
        if (newQty === '' || newQty < 0) newQty = 0;
        if (newQty <= 0 && sync) return;

        // Find the cart item and corresponding product
        const cartItem = localCarts.find(c => c.id === cartId);
        if (!cartItem) return;

        // Find product in productsList to get available stock
        const product = productsList.find(p => p.id === cartItem.product_id);
        const isRecipe = product?.product_type === 'recipe';
        const availableStock = product?.display_qty || 0;

        // Validate stock for non-recipe products before sync
        if (sync && !isRecipe && newQty > availableStock) {
            toast.error(`Stok tidak mencukupi! (Tersedia: ${availableStock})`);
            // Revert to max available stock
            setLocalCarts(prevCarts => 
                prevCarts.map(cart => 
                    cart.id === cartId 
                        ? { ...cart, qty: availableStock } 
                        : cart
                )
            );
            return;
        }

        // Save previous qty for potential rollback
        const previousQty = cartItem.qty;

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
                    onError: (errors) => {
                        // Rollback on error
                        toast.error(errors.message || "Stok tidak mencukupi!");
                        setLocalCarts(prevCarts => 
                            prevCarts.map(cart => 
                                cart.id === cartId 
                                    ? { ...cart, qty: previousQty } 
                                    : cart
                            )
                        );
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
                ppn: parseFloat(taxInput) || 0,
                tax: taxAmount,
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




    // Handle thermal print from receipt modal (supports QZ Tray, Server, and WebSocket modes)
    const handleThermalPrint = async () => {
        if (thermalPrinting || !lastTransaction) return;
        
        setThermalPrinting(true);
        try {
            let result;
            
            if (printMode === 'server') {
                // Server-side printing (using axios for proper CSRF)
                const response = await window.axios.post(`/dashboard/print/receipt/${lastTransaction.invoice}`);
                result = response.data;
            } else if (printMode === 'websocket') {
                // WebSocket printing
                if (!wsStatus.connected) {
                    toast.error('Print server not connected. Please start the print server.');
                    setThermalPrinting(false);
                    return;
                }
                
                result = await WebSocketPrintService.printReceipt(
                    lastTransaction,
                    settings,
                    'POS-80' // Default printer name, can be made configurable
                );
            } else {
                // QZ Tray (client-side)
                result = await PrintService.printReceipt(lastTransaction, settings);
            }
            
            if (result.success) {
                toast.success('Struk dicetak ke printer thermal');
            } else {
                toast.error(result.message || 'Gagal cetak thermal');
            }
        } catch (err) {
            toast.error('Gagal cetak: ' + (err.response?.data?.message || err.message));
        } finally {
            setThermalPrinting(false);
        }
    };

    // Handle cash drawer open (supports QZ Tray, Server, and WebSocket modes)
    const handleOpenDrawer = async () => {
        if (drawerOpening) return;
        
        setDrawerOpening(true);
        try {
            let result;
            
            if (printMode === 'server') {
                // Server-side (using axios for proper CSRF)
                const response = await window.axios.post('/dashboard/print/drawer');
                result = response.data;
            } else if (printMode === 'websocket') {
                // WebSocket
                if (!wsStatus.connected) {
                    toast.error('Print server not connected. Please start the print server.');
                    setDrawerOpening(false);
                    return;
                }
                
                result = await WebSocketPrintService.openCashDrawer('POS-80');
            } else {
                // QZ Tray
                result = await PrintService.openCashDrawer();
            }
            
            if (result.success) {
                toast.success('Laci kasir dibuka');
            } else {
                toast.error(result.message || 'Gagal buka laci');
            }
        } catch (err) {
            toast.error('Gagal buka laci: ' + (err.response?.data?.message || err.message));
        } finally {
            setDrawerOpening(false);
        }
    };

    // Check server printer status
    const handleCheckServerPrinter = async () => {
        setServerPrintStatus(prev => ({ ...prev, checking: true }));
        try {
            const response = await window.axios.get('/dashboard/print/status');
            const result = response.data;
            setServerPrintStatus({
                available: result.available,
                printerName: result.printerName,
                checking: false
            });
        } catch (err) {
            setServerPrintStatus({ available: false, printerName: null, checking: false });
        }
    };

    // Switch to server mode and auto-check printer
    const handleSwitchToServerMode = () => {
        setPrintMode('server');
        // Auto-check server printer status if not already checked
        if (!serverPrintStatus.available && !serverPrintStatus.checking) {
            handleCheckServerPrinter();
        }
    };

    // Close receipt modal
    const handleCloseReceiptModal = () => {
        setReceiptModalOpen(false);
        setLastTransaction(null);
    };

    // Date/time formatters for receipt
    const formatDate = (value) =>
        new Date(value).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

    const formatTime = (value) =>
        new Date(value).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });


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
                        <div className="flex items-center gap-2">
                            {settings.store_logo ? (
                                <img 
                                    src={`/storage/settings/${settings.store_logo}`} 
                                    className="w-7 h-7 object-contain"
                                    alt="Logo"
                                />
                            ) : (
                                <div className="p-1 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
                                    <IconBrandLaravel size={18} strokeWidth={2} />
                                </div>
                            )}
                            <h1 className="text-lg font-bold text-gray-900 dark:text-white uppercase truncate max-w-[150px] sm:max-w-none">
                                {settings.store_name || "KASIR"}
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                            {auth.user.name}
                        </span>
                        <div className="h-5 w-px bg-gray-300 dark:bg-gray-700 hidden sm:block" />
                        {/* QZ Tray Status Indicator */}
                        <button
                            onClick={handleQzCheck}
                            className="relative group"
                            title="Klik untuk cek koneksi printer"
                        >
                            <div className={`p-2 rounded-lg transition-colors ${
                                qzStatus.checking 
                                    ? 'text-gray-400 animate-pulse'
                                    : qzStatus.connected
                                    ? 'text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                                    : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}>
                                <IconPrinter size={20} />
                            </div>
                            {/* Tooltip */}
                            <div className="absolute right-0 top-full mt-1 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                                {qzStatus.checking 
                                    ? 'Memeriksa koneksi printer...'
                                    : qzStatus.connected
                                    ? `✓ ${qzStatus.printerName || 'Printer terhubung'}`
                                    : 'Klik untuk cek printer'}
                            </div>
                        </button>
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

                {/* Shift Warning Banner */}
                {!activeShift && (
                    <div className="bg-amber-50 dark:bg-amber-900/30 border-b border-amber-200 dark:border-amber-800 px-4 py-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm font-medium">Shift belum dibuka! Transaksi tidak akan tercatat ke shift.</span>
                            </div>
                            <a
                                href={route('shifts.create')}
                                className="px-3 py-1.5 text-xs font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors"
                            >
                                Buka Shift
                            </a>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden overflow-y-auto">
                    {/* Products Panel */}
                    <div className="flex-1 flex flex-col lg:overflow-hidden lg:w-2/3">
                        {/* Search & Categories */}
                        <div className="bg-white dark:bg-gray-950 border-b dark:border-gray-800 p-4 space-y-3 sticky top-0 z-40">
                            {/* Search */}
                            <div className="relative">
                                <IconSearch
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Ketik nama produk atau scan barcode langsung (tidak perlu klik)..."
                                    value={search}
                                    onChange={(e) => handleSearchChange(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {search && (
                                    <button
                                        onClick={() => handleSearchChange("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <IconX size={16} />
                                    </button>
                                )}
                            </div>

                            {/* Category Tabs */}
                            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                                <button
                                    onClick={() => handleCategoryChange(null)}
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
                                        onClick={() => handleCategoryChange(category)}
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
                            
                            {/* Hide Out of Stock Toggle */}
                            <label className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={hideOutOfStock}
                                    onChange={(e) => handleHideOutOfStockChange(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                Sembunyikan stok habis
                            </label>
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
                                        {paginatedProducts.map((product) => {
                                            const isOutOfStock = product.display_qty <= 0 || product.is_available === false;
                                            
                                            return (
                                                <div
                                                    key={product.id}
                                                    onClick={() => {
                                                        if (isOutOfStock) {
                                                            toast.error("Produk tidak tersedia!");
                                                            return;
                                                        }
                                                        handleAddToCart(product);
                                                    }}
                                                    className={`bg-white dark:bg-gray-950 rounded-xl border dark:border-gray-800 overflow-hidden transition-all ${
                                                        isOutOfStock
                                                            ? "opacity-60 cursor-not-allowed"
                                                            : "cursor-pointer hover:shadow-lg hover:scale-[1.02]"
                                                    }`}
                                                >
                                                    {/* Product Image */}
                                                    <div className="aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden relative">
                                                        <img
                                                            src={product.image}
                                                            alt={product.title}
                                                            className={`w-full h-full object-cover ${isOutOfStock ? "grayscale" : ""}`}
                                                            onError={(e) => {
                                                                e.target.src =
                                                                    "https://via.placeholder.com/200x200?text=No+Image";
                                                            }}
                                                        />
                                                        {/* Stock Badge */}
                                                        <span
                                                            className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-medium ${
                                                                isOutOfStock
                                                                    ? "bg-rose-500 text-white"
                                                                    : product.display_qty > 10
                                                                    ? "bg-emerald-500 text-white"
                                                                    : "bg-amber-500 text-white"
                                                            }`}
                                                        >
                                                            {isOutOfStock 
                                                                ? 'Habis'
                                                                : (product.is_recipe || product.product_type === 'recipe' 
                                                                    ? '✓' 
                                                                    : product.display_qty)}
                                                        </span>
                                                        {/* Out of Stock Overlay */}
                                                        {isOutOfStock && (
                                                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                                                <span className="bg-rose-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-lg">
                                                                    Tidak Tersedia
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Product Info */}
                                                    <div className="p-3">
                                                        <h4 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">
                                                            {product.title}
                                                        </h4>
                                                        <p className={`text-sm font-bold ${isOutOfStock ? "text-gray-400" : "text-blue-600 dark:text-blue-400"}`}>
                                                            {formatPrice(product.sell_price)}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Pagination */}
                                    {pagination && totalPages > 1 && (
                                        <div className="flex justify-center items-center gap-2 mt-4 pt-4 border-t dark:border-gray-800">
                                            <button
                                                onClick={() => {
                                                    if (pagination.prev_page_url) {
                                                        router.get(pagination.prev_page_url, {}, {
                                                            preserveState: true,
                                                            preserveScroll: true,
                                                        });
                                                    }
                                                }}
                                                disabled={!pagination.prev_page_url}
                                                className="p-2 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700 disabled:opacity-50"
                                            >
                                                <IconArrowLeft size={16} />
                                            </button>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {currentServerPage} / {totalPages}
                                            </span>
                                            <button
                                                onClick={() => {
                                                    if (pagination.next_page_url) {
                                                        router.get(pagination.next_page_url, {}, {
                                                            preserveState: true,
                                                            preserveScroll: true,
                                                        });
                                                    }
                                                }}
                                                disabled={!pagination.next_page_url}
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
                    <div className="lg:w-1/3 xl:w-[400px] bg-white dark:bg-gray-950 border-t lg:border-t-0 lg:border-l dark:border-gray-800 flex flex-col shrink-0">
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
                                                                    const val = parseFloat(e.target.value);
                                                                    if (!isNaN(val) && val > 0) {
                                                                         handleUpdateCartQty(cart.id, val, true);
                                                                    } else {
                                                                         // Reset to 1 if invalid
                                                                         handleUpdateCartQty(cart.id, 1, true);
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
                                    {/* Discount & Tax Section */}
                                    <div className="space-y-3 pt-4 border-t dark:border-gray-800">
                                        {/* Discount Input */}
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Diskon
                                                </label>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => setDiscountType("nominal")}
                                                        className={`text-xs px-2 py-1 rounded transition-colors ${
                                                            discountType === "nominal"
                                                                ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-medium"
                                                                : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                                        }`}
                                                    >
                                                        Rp
                                                    </button>
                                                    <button
                                                        onClick={() => setDiscountType("percent")}
                                                        className={`text-xs px-2 py-1 rounded transition-colors ${
                                                            discountType === "percent"
                                                                ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-medium"
                                                                : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                                        }`}
                                                    >
                                                        %
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                    {discountType === "nominal" ? "Rp" : "%"}
                                                </div>
                                                <input
                                                    type="text" // Keep as text to control input logic
                                                    value={discountInput}
                                                    onChange={(e) => {
                                                        const val = sanitizeNumericInput(e.target.value);
                                                        setDiscountInput(val);
                                                    }}
                                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white text-right"
                                                    placeholder="0"
                                                />
                                            </div>
                                        </div>

                                        {/* Tax Input */}
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Pajak (PPN)
                                                </label>
                                                <span className="text-xs text-gray-500">%</span>
                                            </div>
                                            <div className="relative">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                    %
                                                </div>
                                                <input
                                                    type="text"
                                                    value={taxInput}
                                                    onChange={(e) => {
                                                        const val = sanitizeDecimalInput(e.target.value);
                                                        setTaxInput(val);
                                                    }}
                                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white text-right"
                                                    placeholder="0"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Summary Totals */}
                                    <div className="pt-4 space-y-2 border-t dark:border-gray-800">
                                        <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm">
                                            <span>Subtotal</span>
                                            {/* Fix hydration mismatch by forcing a string initially or suppression */}
                                            <span>{formatPrice(subtotal)}</span>
                                        </div>
                                        {discount > 0 && (
                                            <div className="flex justify-between text-red-500 text-sm">
                                                <span>Diskon</span>
                                                <span>-{formatPrice(discount)}</span>
                                            </div>
                                        )}
                                        {taxAmount > 0 && (
                                            <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm">
                                                <span>PPN ({parseFloat(taxInput) || 0}%)</span>
                                                <span>{formatPrice(taxAmount)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-gray-900 dark:text-white font-bold text-lg pt-2 border-t dark:border-gray-800">
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
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <IconScale size={24} className="text-blue-600" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                Masukkan Jumlah
                            </h3>
                        </div>
                        
                        <div className="mb-4 text-center">
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
                            <input
                                type="text"
                                inputMode="decimal"
                                value={qtyModalValue}
                                onChange={(e) => setQtyModalValue(sanitizeDecimalInput(e.target.value))}
                                placeholder="0.00"
                                className="w-full px-4 py-3 text-2xl font-bold text-center rounded-xl border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white mb-2"
                                autoFocus
                            />
                            <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                                {qtyModalProduct.unit}
                            </p>
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

            {/* Receipt Modal */}
            {receiptModalOpen && lastTransaction && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-800">
                            <h3 className="font-bold text-gray-900 dark:text-white">Struk Transaksi</h3>
                            <button
                                onClick={handleCloseReceiptModal}
                                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
                            >
                                <IconX size={20} />
                            </button>
                        </div>

                        {/* Receipt Preview */}
                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 font-mono text-sm">
                                {/* Header */}
                                <div className="text-center mb-3">
                                    {settings.store_logo ? (
                                        <img
                                            src={`/storage/settings/${settings.store_logo}`}
                                            alt="Logo"
                                            className="w-12 h-12 mx-auto mb-2 object-contain"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 mx-auto mb-2 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                                            <span className="text-xl font-bold text-gray-500">
                                                {(settings.store_name || 'S').charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                    <h4 className="font-bold">{settings.store_name || 'Toko'}</h4>
                                    {settings.store_address && (
                                        <p className="text-xs text-gray-600 dark:text-gray-400">{settings.store_address}</p>
                                    )}
                                    <p className="text-xs text-gray-500">{lastTransaction.invoice}</p>
                                </div>

                                <div className="border-t border-dashed border-gray-300 dark:border-gray-600 my-2"></div>

                                {/* Date/Cashier */}
                                <div className="flex justify-between text-xs mb-1">
                                    <span>{formatDate(lastTransaction.created_at)}</span>
                                    <span>{lastTransaction.cashier?.name || 'Kasir'}</span>
                                </div>
                                <div className="text-xs mb-2">{formatTime(lastTransaction.created_at)}</div>

                                <div className="border-t border-dashed border-gray-300 dark:border-gray-600 my-2"></div>

                                {/* Items */}
                                <div className="space-y-1 mb-2">
                                    {(lastTransaction.details || []).map((item, index) => {
                                        const qty = Number(item.qty) || 1;
                                        const price = Number(item.price) || 0;
                                        return (
                                            <div key={item.id || index}>
                                                <div className="font-semibold text-xs">
                                                    {index + 1}. {item.product?.title}
                                                    {item.variant_name && <span className="font-normal"> ({item.variant_name})</span>}
                                                </div>
                                                <div className="flex justify-between text-xs pl-3">
                                                    <span>{qty} x {formatPrice(price)}</span>
                                                    <span>{formatPrice(qty * price)}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="border-t border-dashed border-gray-300 dark:border-gray-600 my-2"></div>

                                {/* Totals */}
                                <div className="space-y-1 text-xs">
                                    {Number(lastTransaction.discount) > 0 && (
                                        <div className="flex justify-between text-gray-500">
                                            <span>Diskon</span>
                                            <span>-{formatPrice(lastTransaction.discount)}</span>
                                        </div>
                                    )}
                                    {Number(lastTransaction.tax) > 0 && (
                                        <div className="flex justify-between text-gray-500">
                                            <span>PPN ({Number(lastTransaction.ppn) || 0}%)</span>
                                            <span>{formatPrice(lastTransaction.tax)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between font-bold text-sm">
                                        <span>Total</span>
                                        <span>{formatPrice(lastTransaction.grand_total)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Bayar</span>
                                        <span>{formatPrice(lastTransaction.cash)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Kembali</span>
                                        <span>{formatPrice(lastTransaction.change)}</span>
                                    </div>
                                </div>

                                <div className="border-t border-dashed border-gray-300 dark:border-gray-600 my-2"></div>

                                <p className="text-center text-xs text-gray-500">Terimakasih Telah Berbelanja</p>
                            </div>
                        </div>

                        {/* Print Controls */}
                        <div className="p-4 border-t dark:border-gray-800 space-y-3">
                            {/* Mode Selector */}
                            <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Mode:</span>
                                <div className="flex-1 flex rounded-lg border dark:border-gray-700 overflow-hidden text-xs">
                                    <button
                                        type="button"
                                        onClick={() => setPrintMode('qz')}
                                        className={`flex-1 px-3 py-1.5 flex items-center justify-center gap-1 transition-colors ${
                                            printMode === 'qz'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400'
                                        }`}
                                    >
                                        <IconPrinter size={14} />
                                        QZ Tray
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSwitchToServerMode}
                                        className={`flex-1 px-3 py-1.5 flex items-center justify-center gap-1 transition-colors ${
                                            printMode === 'server'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400'
                                        }`}
                                    >
                                        <IconPrinter size={14} />
                                        Server
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPrintMode('websocket')}
                                        className={`flex-1 px-3 py-1.5 flex items-center justify-center gap-1 transition-colors ${
                                            printMode === 'websocket'
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400'
                                        }`}
                                    >
                                        <IconPrinter size={14} />
                                        WebSocket
                                    </button>
                                </div>
                            </div>

                            {/* Status based on mode */}
                            {printMode === 'qz' ? (
                                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs text-gray-500 dark:text-gray-400">
                                    <IconPrinter size={14} />
                                    <span>QZ Tray: {qzStatus.connected ? `✓ ${qzStatus.printerName || 'Connected'}` : 'Klik icon printer di header untuk cek koneksi'}</span>
                                </div>
                            ) : printMode === 'server' ? (
                                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${
                                    serverPrintStatus.available
                                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                                        : 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                                }`}>
                                    <IconPrinter size={14} />
                                    <span>
                                        {serverPrintStatus.checking 
                                            ? 'Memeriksa printer...' 
                                            : serverPrintStatus.available 
                                                ? `✓ Server: ${serverPrintStatus.printerName}`
                                                : `Server: ${serverPrintStatus.printerName || 'POS-80'}`}
                                    </span>
                                </div>
                            ) : (
                                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${
                                    wsStatus.connected
                                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                                        : wsStatus.reconnecting
                                            ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
                                            : 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400'
                                }`}>
                                    <span className={`w-2 h-2 rounded-full ${
                                        wsStatus.connected ? 'bg-emerald-500 animate-pulse' : 
                                        wsStatus.reconnecting ? 'bg-amber-500 animate-pulse' : 
                                        'bg-rose-500'
                                    }`} />
                                    <span>
                                        {wsStatus.connected 
                                            ? '✓ WebSocket: Connected (localhost:9100)' 
                                            : wsStatus.reconnecting
                                                ? 'WebSocket: Reconnecting...'
                                                : 'WebSocket: Disconnected - Start print server'}
                                    </span>
                                </div>
                            )}
                            
                            {/* Print Buttons */}
                            <div className="flex gap-2">
                                <button
                                    onClick={handleThermalPrint}
                                    disabled={thermalPrinting}
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <IconPrinter size={16} />
                                    {thermalPrinting ? 'Mencetak...' : `Cetak (${printMode === 'qz' ? 'QZ Tray' : printMode === 'server' ? 'Server' : 'WebSocket'})`}
                                </button>
                                <button
                                    onClick={handleOpenDrawer}
                                    disabled={drawerOpening}
                                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-amber-600 rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <IconCash size={16} />
                                    {drawerOpening ? '...' : 'Laci'}
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => window.print()}
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                    <IconPrinter size={16} />
                                    Cetak Browser
                                </button>
                                <button
                                    onClick={handleCloseReceiptModal}
                                    className="flex-1 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                >
                                    Tutup & Lanjutkan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
