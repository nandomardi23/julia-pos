import { usePage } from "@inertiajs/react";
import {
    IconBox,
    IconFolder,
    IconLayout2,
    IconShoppingCart,
    IconUsers,
    IconUserShield,
    IconUserBolt,
    IconTruck,
    IconBuildingWarehouse,
    IconLayoutList,
    IconArrowsExchange,
    IconCirclePlus,
    IconMinus,
    IconClockHour6,
    IconChartArrowsVertical,
    IconChartBarPopular,
    IconCreditCard,
    IconReceipt,
    IconLeaf,
    IconCup,
    IconToolsKitchen2,
    IconSettings,
    IconClipboardCheck,
    IconFileInvoice,
    IconCash,
} from "@tabler/icons-react";
import hasAnyPermission from "./Permission";
import React, { useMemo } from "react";

export default function Menu() {
    const { url } = usePage();

    // Call all permission checks at top level (outside useMemo) to respect rules of hooks
    const canTransactions = hasAnyPermission(["transactions-access"]);
    const canCategories = hasAnyPermission(["categories-access"]);
    const canProducts = hasAnyPermission(["products-access"]);
    const canSuppliers = hasAnyPermission(["suppliers-access"]);
    const canWarehouses = hasAnyPermission(["warehouses-access"]);
    const canDisplays = hasAnyPermission(["displays-access"]);
    const canPurchaseOrders = hasAnyPermission(["purchase-orders-access"]);
    const canStockMovements = hasAnyPermission(["stock-movements-access"]);
    const canExpenses = hasAnyPermission(["expenses-access"]);
    const canExpenseCategories = hasAnyPermission(["expense-categories-access"]);
    const canReports = hasAnyPermission(["reports-access"]);
    const canProfits = hasAnyPermission(["profits-access"]);
    const canUsers = hasAnyPermission(["users-access"]);
    const canRoles = hasAnyPermission(["roles-access"]);
    const canPermissions = hasAnyPermission(["permissions-access"]);
    const canPaymentSettings = hasAnyPermission(["payment-settings-access"]);

    const menuNavigation = useMemo(() => [
        // ===== DASHBOARD =====
        {
            title: "Menu Utama",
            details: [
                {
                    title: "Dashboard",
                    href: route("dashboard"),
                    active: url === "/dashboard",
                    icon: <IconLayout2 size={20} strokeWidth={1.5} />,
                    permissions: true,
                },
                {
                    title: "POS / Kasir",
                    href: route("pos.index"),
                    active: url === "/dashboard/pos",
                    icon: <IconShoppingCart size={20} strokeWidth={1.5} />,
                    permissions: canTransactions,
                },
            ],
        },

        // ===== MASTER DATA =====
        {
            title: "Master Data",
            details: [
                {
                    title: "Kategori",
                    href: route("categories.index"),
                    active: url === "/dashboard/categories",
                    icon: <IconFolder size={20} strokeWidth={1.5} />,
                    permissions: canCategories,
                },
                {
                    title: "Data Produk",
                    href: route("products.index"),
                    active: url.startsWith("/dashboard/products") && !url.includes('type=supply'),
                    icon: <IconBox size={20} strokeWidth={1.5} />,
                    permissions: canProducts,
                },
                {
                    title: "Supply",
                    href: route("products.index") + '?type=supply',
                    active: url.startsWith("/dashboard/products") && url.includes('type=supply'),
                    icon: <IconCup size={20} strokeWidth={1.5} />,
                    permissions: canProducts,
                },
                {
                    title: "Resep",
                    href: route("recipes.index"),
                    active: url.startsWith("/dashboard/recipes"),
                    icon: <IconToolsKitchen2 size={20} strokeWidth={1.5} />,
                    permissions: canProducts,
                },
                {
                    title: "Supplier",
                    href: route("suppliers.index"),
                    active: url.startsWith("/dashboard/suppliers"),
                    icon: <IconTruck size={20} strokeWidth={1.5} />,
                    permissions: canSuppliers,
                },
            ],
        },

        // ===== INVENTORY =====
        {
            title: "Inventory",
            details: [
                {
                    title: "Gudang",
                    href: route("warehouses.index"),
                    active: url.startsWith("/dashboard/warehouses"),
                    icon: <IconBuildingWarehouse size={20} strokeWidth={1.5} />,
                    permissions: canWarehouses,
                },
                {
                    title: "Display",
                    href: route("displays.index"),
                    active: url.startsWith("/dashboard/displays"),
                    icon: <IconLayoutList size={20} strokeWidth={1.5} />,
                    permissions: canDisplays,
                },
                {
                    title: "Purchase Order",
                    href: route("purchase-orders.index"),
                    active: url.startsWith("/dashboard/purchase-orders"),
                    icon: <IconFileInvoice size={20} strokeWidth={1.5} />,
                    permissions: canPurchaseOrders,
                },
                {
                    title: "Manajemen Stok",
                    href: route("stock-movements.index"),
                    active: url === "/dashboard/stock-movements",
                    icon: <IconClockHour6 size={20} strokeWidth={1.5} />,
                    permissions: canStockMovements,
                },
                {
                    title: "Stock Opname",
                    href: route("stock-opnames.index"),
                    active: url.startsWith("/dashboard/stock-opnames"),
                    icon: <IconClipboardCheck size={20} strokeWidth={1.5} />,
                    permissions: canStockMovements,
                },
            ],
        },

        // ===== PENGELUARAN =====
        {
            title: "Pengeluaran",
            details: [
                {
                    title: "Daftar Pengeluaran",
                    href: route("expenses.index"),
                    active: url.startsWith("/dashboard/expenses"),
                    icon: <IconReceipt size={20} strokeWidth={1.5} />,
                    permissions: canExpenses,
                },
                {
                    title: "Kategori",
                    href: route("expense-categories.index"),
                    active: url.startsWith("/dashboard/expense-categories"),
                    icon: <IconFolder size={20} strokeWidth={1.5} />,
                    permissions: canExpenseCategories,
                },
            ],
        },

        // ===== TRANSAKSI =====
        {
            title: "Transaksi",
            details: [
                {
                    title: "Riwayat Transaksi",
                    href: route("transactions.history"),
                    active: url === "/dashboard/transactions/history",
                    icon: <IconReceipt size={20} strokeWidth={1.5} />,
                    permissions: canTransactions,
                },
                {
                    title: "Return / Refund",
                    href: route("returns.index"),
                    active: url.startsWith("/dashboard/returns"),
                    icon: <IconArrowsExchange size={20} strokeWidth={1.5} />,
                    permissions: canTransactions,
                },
                {
                    title: "Shift Kasir",
                    href: route("shifts.index"),
                    active: url.startsWith("/dashboard/shifts"),
                    icon: <IconCash size={20} strokeWidth={1.5} />,
                    permissions: canTransactions,
                },
            ],
        },

        // ===== LAPORAN =====
        {
            title: "Laporan",
            details: [
                {
                    title: "Penjualan",
                    href: route("reports.sales.index"),
                    active: url.startsWith("/dashboard/reports/sales"),
                    icon: <IconChartArrowsVertical size={20} strokeWidth={1.5} />,
                    permissions: canReports,
                },
                {
                    title: "Keuntungan",
                    href: route("reports.profits.index"),
                    active: url.startsWith("/dashboard/reports/profits"),
                    icon: <IconChartBarPopular size={20} strokeWidth={1.5} />,
                    permissions: canProfits,
                },
            ],
        },

        // ===== PENGATURAN =====
        {
            title: "Pengaturan",
            details: [
                {
                    title: "Pengguna",
                    href: route("users.index"),
                    active: url.startsWith("/dashboard/users"),
                    icon: <IconUsers size={20} strokeWidth={1.5} />,
                    permissions: canUsers,
                },
                {
                    title: "Akses Group",
                    href: route("roles.index"),
                    active: url === "/dashboard/roles",
                    icon: <IconUserShield size={20} strokeWidth={1.5} />,
                    permissions: canRoles,
                },
                {
                    title: "Hak Akses",
                    href: route("permissions.index"),
                    active: url === "/dashboard/permissions",
                    icon: <IconUserBolt size={20} strokeWidth={1.5} />,
                    permissions: canPermissions,
                },
                {
                    title: "Payment Gateway",
                    href: route("settings.payments.edit"),
                    active: url === "/dashboard/settings/payments",
                    icon: <IconCreditCard size={20} strokeWidth={1.5} />,
                    permissions: canPaymentSettings,
                },
                {
                    title: "Pengaturan Aplikasi",
                    href: route("settings.index"),
                    active: url === "/dashboard/settings",
                    icon: <IconSettings size={20} strokeWidth={1.5} />,
                    permissions: canPaymentSettings,
                },
            ],
        },
    ], [url, canTransactions, canCategories, canProducts, canSuppliers, canWarehouses, canDisplays, canPurchaseOrders, canStockMovements, canExpenses, canExpenseCategories, canReports, canProfits, canUsers, canRoles, canPermissions, canPaymentSettings]);

    return menuNavigation;
}

