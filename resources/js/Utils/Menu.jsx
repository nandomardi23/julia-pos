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
import React from "react";

export default function Menu() {
    const { url } = usePage();

    const menuNavigation = [
        // ===== DASHBOARD =====
        {
            title: "Menu Utama",
            details: [
                {
                    title: "Dashboard",
                    href: route("dashboard"),
                    active: url === "/dashboard",
                    icon: <IconLayout2 size={20} strokeWidth={1.5} />,
                    permissions: true, // Dashboard accessible by all authenticated users
                },
                {
                    title: "POS / Kasir",
                    href: route("pos.index"),
                    active: url === "/dashboard/pos",
                    icon: <IconShoppingCart size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission(["transactions-access"]),
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
                    permissions: hasAnyPermission(["categories-access"]),
                },
                {
                    title: "Produk Jual",
                    href: route("products.index"),
                    active: url.startsWith("/dashboard/products"),
                    icon: <IconBox size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission(["products-access"]),
                },
                {
                    title: "Bahan Baku",
                    href: route("products.index") + '?type=ingredient',
                    active: url.startsWith("/dashboard/products") && url.includes('type=ingredient'),
                    icon: <IconLeaf size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission(["products-access"]),
                },
                {
                    title: "Supply",
                    href: route("products.index") + '?type=supply',
                    active: url.startsWith("/dashboard/products") && url.includes('type=supply'),
                    icon: <IconCup size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission(["products-access"]),
                },
                {
                    title: "Resep",
                    href: route("recipes.index"),
                    active: url.startsWith("/dashboard/recipes"),
                    icon: <IconToolsKitchen2 size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission(["products-access"]),
                },
                {
                    title: "Supplier",
                    href: route("suppliers.index"),
                    active: url.startsWith("/dashboard/suppliers"),
                    icon: <IconTruck size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission(["suppliers-access"]),
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
                    permissions: hasAnyPermission(["warehouses-access"]),
                },
                {
                    title: "Display",
                    href: route("displays.index"),
                    active: url.startsWith("/dashboard/displays"),
                    icon: <IconLayoutList size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission(["displays-access"]),
                },
                {
                    title: "Purchase Order",
                    href: route("purchase-orders.index"),
                    active: url.startsWith("/dashboard/purchase-orders"),
                    icon: <IconFileInvoice size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission(["purchase-orders-access"]),
                },
                {
                    title: "Manajemen Stok",
                    href: route("stock-movements.index"),
                    active: url === "/dashboard/stock-movements",
                    icon: <IconClockHour6 size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission(["stock-movements-access"]),
                },
                {
                    title: "Stock Opname",
                    href: route("stock-opnames.index"),
                    active: url.startsWith("/dashboard/stock-opnames"),
                    icon: <IconClipboardCheck size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission(["stock-movements-access"]),
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
                    permissions: hasAnyPermission(["expenses-access"]),
                },
                {
                    title: "Kategori",
                    href: route("expense-categories.index"),
                    active: url.startsWith("/dashboard/expense-categories"),
                    icon: <IconFolder size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission(["expense-categories-access"]),
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
                    permissions: hasAnyPermission(["transactions-access"]),
                },
                {
                    title: "Return / Refund",
                    href: route("returns.index"),
                    active: url.startsWith("/dashboard/returns"),
                    icon: <IconArrowsExchange size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission(["transactions-access"]),
                },
                {
                    title: "Shift Kasir",
                    href: route("shifts.index"),
                    active: url.startsWith("/dashboard/shifts"),
                    icon: <IconCash size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission(["transactions-access"]),
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
                    permissions: hasAnyPermission(["reports-access"]),
                },
                {
                    title: "Keuntungan",
                    href: route("reports.profits.index"),
                    active: url.startsWith("/dashboard/reports/profits"),
                    icon: <IconChartBarPopular size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission(["profits-access"]),
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
                    permissions: hasAnyPermission(["users-access"]),
                },
                {
                    title: "Akses Group",
                    href: route("roles.index"),
                    active: url === "/dashboard/roles",
                    icon: <IconUserShield size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission(["roles-access"]),
                },
                {
                    title: "Hak Akses",
                    href: route("permissions.index"),
                    active: url === "/dashboard/permissions",
                    icon: <IconUserBolt size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission(["permissions-access"]),
                },
                {
                    title: "Payment Gateway",
                    href: route("settings.payments.edit"),
                    active: url === "/dashboard/settings/payments",
                    icon: <IconCreditCard size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission(["payment-settings-access"]),
                },
                {
                    title: "Pengaturan Aplikasi",
                    href: route("settings.index"),
                    active: url === "/dashboard/settings",
                    icon: <IconSettings size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission(["payment-settings-access"]),
                },
            ],
        },
    ];

    return menuNavigation;
}
