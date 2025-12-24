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
                    title: "Produk",
                    href: route("products.index"),
                    active: url.startsWith("/dashboard/products"),
                    icon: <IconBox size={20} strokeWidth={1.5} />,
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
                    title: "Barang Masuk",
                    href: route("stock-movements.create"),
                    active: url === "/dashboard/stock-movements/create",
                    icon: <IconCirclePlus size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission(["stock-movements-create"]),
                },
                {
                    title: "Transfer Stok",
                    href: route("stock-movements.transfer"),
                    active: url === "/dashboard/stock-movements/transfer",
                    icon: <IconArrowsExchange size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission(["stock-movements-create"]),
                },
                {
                    title: "Barang Keluar",
                    href: route("stock-movements.stockOut"),
                    active: url === "/dashboard/stock-movements/stock-out",
                    icon: <IconMinus size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission(["stock-movements-create"]),
                },
                {
                    title: "Riwayat Stok",
                    href: route("stock-movements.index"),
                    active: url === "/dashboard/stock-movements",
                    icon: <IconClockHour6 size={20} strokeWidth={1.5} />,
                    permissions: hasAnyPermission(["stock-movements-access"]),
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
            ],
        },
    ];

    return menuNavigation;
}
