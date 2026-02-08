import Widget from "@/Components/Dashboard/Widget";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useMemo, useRef } from "react";
import Chart from "chart.js/auto";
import { formatDecimal } from "@/Utils/Format";
import {
    IconBox,
    IconCategory,
    IconMoneybag,
    IconUsers,
    IconCoin,
    IconReceipt,
    IconAlertTriangle,
    IconTrendingUp,
    IconTrendingDown,
    IconCreditCard,
    IconCashRegister,
    IconPlus,
    IconChartBar,
    IconClock,
    IconUser,
    IconPackageOff,
    IconCalendar,
} from "@tabler/icons-react";

const formatCurrency = (value = 0) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);

// Helper to calculate percentage change
const calcChange = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
};

export default function Dashboard({
    totalCategories = 0,
    totalProducts = 0,
    totalTransactions = 0,
    totalUsers = 0,
    todayTransactions = 0,
    todayRevenue = 0,
    todayProfit = 0,
    yesterdayTransactions = 0,
    yesterdayRevenue = 0,
    yesterdayProfit = 0,
    revenueTrend = [],
    profitTrend = [],
    thisMonthRevenue = 0,
    lastMonthRevenue = 0,
    topProducts = [],
    recentTransactions = [],
    lowStockProducts = [],
    paymentMethodStats = [],
    slowProducts = [],
    topCashiers = [],
    peakHours = [],
}) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const paymentChartRef = useRef(null);
    const paymentChartInstance = useRef(null);
    const peakHoursChartRef = useRef(null);
    const peakHoursChartInstance = useRef(null);

    const chartData = useMemo(() => revenueTrend ?? [], [revenueTrend]);
    const profitData = useMemo(() => profitTrend ?? [], [profitTrend]);
    const paymentData = useMemo(() => paymentMethodStats ?? [], [paymentMethodStats]);
    const peakData = useMemo(() => peakHours ?? [], [peakHours]);

    // Calculate changes
    const transactionChange = calcChange(todayTransactions, yesterdayTransactions);
    const revenueChange = calcChange(todayRevenue, yesterdayRevenue);
    const profitChange = calcChange(todayProfit, yesterdayProfit);
    const monthChange = calcChange(thisMonthRevenue, lastMonthRevenue);

    // Revenue + Profit Dual Line Chart
    useEffect(() => {
        if (!chartRef.current) return;

        if (chartInstance.current) {
            chartInstance.current.destroy();
            chartInstance.current = null;
        }

        if (!chartData.length && !profitData.length) return;

        // Merge labels from both datasets
        const allDates = [...new Set([...chartData.map(d => d.date), ...profitData.map(d => d.date)])].sort();
        const labels = allDates.map(date => {
            const item = chartData.find(d => d.date === date) || profitData.find(d => d.date === date);
            return item?.label || date;
        });

        const revenueValues = allDates.map(date => chartData.find(d => d.date === date)?.total || 0);
        const profitValues = allDates.map(date => profitData.find(d => d.date === date)?.total || 0);

        chartInstance.current = new Chart(chartRef.current, {
            type: "line",
            data: {
                labels,
                datasets: [
                    {
                        label: "Pendapatan",
                        data: revenueValues,
                        borderColor: "#4f46e5",
                        backgroundColor: "rgba(79,70,229,0.1)",
                        borderWidth: 2,
                        fill: true,
                        tension: 0.35,
                        pointRadius: 3,
                        pointBackgroundColor: "#4f46e5",
                    },
                    {
                        label: "Profit",
                        data: profitValues,
                        borderColor: "#10b981",
                        backgroundColor: "rgba(16,185,129,0.1)",
                        borderWidth: 2,
                        fill: true,
                        tension: 0.35,
                        pointRadius: 3,
                        pointBackgroundColor: "#10b981",
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                        position: "top",
                        labels: { usePointStyle: true, padding: 15 },
                    },
                },
                scales: {
                    y: {
                        ticks: { callback: (value) => formatCurrency(value) },
                        grid: { color: "rgba(148, 163, 184, 0.2)" },
                    },
                    x: { grid: { display: false } },
                },
            },
        });

        return () => chartInstance.current?.destroy();
    }, [chartData, profitData]);

    // Payment Method Doughnut Chart
    useEffect(() => {
        if (!paymentChartRef.current) return;

        if (paymentChartInstance.current) {
            paymentChartInstance.current.destroy();
            paymentChartInstance.current = null;
        }

        if (!paymentData.length) return;

        const colors = {
            cash: "#10b981",
            transfer: "#3b82f6",
            qris: "#8b5cf6",
            default: "#6b7280",
        };

        const labels = paymentData.map((item) => item.label);
        const counts = paymentData.map((item) => item.count);
        const backgroundColors = paymentData.map(
            (item) => colors[item.method] || colors.default
        );

        paymentChartInstance.current = new Chart(paymentChartRef.current, {
            type: "doughnut",
            data: {
                labels,
                datasets: [
                    {
                        data: counts,
                        backgroundColor: backgroundColors,
                        borderWidth: 0,
                        hoverOffset: 4,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "right",
                        labels: { usePointStyle: true, padding: 15, font: { size: 12 } },
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const item = paymentData[context.dataIndex];
                                return `${item.count} transaksi (${formatCurrency(item.total)})`;
                            },
                        },
                    },
                },
                cutout: "60%",
            },
        });

        return () => paymentChartInstance.current?.destroy();
    }, [paymentData]);

    // Peak Hours Bar Chart
    useEffect(() => {
        if (!peakHoursChartRef.current) return;

        if (peakHoursChartInstance.current) {
            peakHoursChartInstance.current.destroy();
            peakHoursChartInstance.current = null;
        }

        if (!peakData.length) return;

        const labels = peakData.map((item) => item.hour);
        const counts = peakData.map((item) => item.count);
        const maxCount = Math.max(...counts);
        const colors = counts.map((c) =>
            c === maxCount ? "#f59e0b" : "#3b82f6"
        );

        peakHoursChartInstance.current = new Chart(peakHoursChartRef.current, {
            type: "bar",
            data: {
                labels,
                datasets: [
                    {
                        label: "Transaksi",
                        data: counts,
                        backgroundColor: colors,
                        borderRadius: 4,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { stepSize: 1 },
                        grid: { color: "rgba(148, 163, 184, 0.2)" },
                    },
                    x: { grid: { display: false } },
                },
            },
        });

        return () => peakHoursChartInstance.current?.destroy();
    }, [peakData]);

    return (
        <>
            <Head title="Dashboard" />

            {/* Low Stock Alert */}
            {lowStockProducts.length > 0 && (
                <div className="mb-6 rounded-xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-900 dark:bg-orange-950">
                    <div className="flex items-center gap-2 mb-3">
                        <IconAlertTriangle className="text-orange-500" size={20} />
                        <h3 className="font-semibold text-orange-700 dark:text-orange-400">
                            Peringatan Stok Menipis
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
                        {lowStockProducts.map((item, index) => (
                            <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-2 text-sm">
                                <p className="font-medium text-gray-800 dark:text-gray-200 truncate">{item.name}</p>
                                <p className="text-orange-600 dark:text-orange-400">
                                    Sisa: {formatDecimal(item.stock)} {item.unit} (min: {formatDecimal(item.min_stock)})
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick Actions */}
            <div className="mb-6 flex flex-wrap gap-3">
                <Link
                    href={route("pos.index")}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <IconCashRegister size={18} />
                    Buka POS
                </Link>
                <Link
                    href={route("products.create")}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                    <IconPlus size={18} />
                    Tambah Produk
                </Link>
                <Link
                    href={route("reports.profits.index")}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                    <IconChartBar size={18} />
                    Laporan Profit
                </Link>
            </div>

            {/* Getting Started Guide for New Users */}
            {(totalCategories === 0 || totalProducts === 0) && (
                <div className="mb-6 rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50 p-6 dark:border-indigo-700 dark:bg-indigo-950">
                    <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-4">
                        🚀 Panduan Memulai
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Ikuti langkah berikut untuk mulai menggunakan sistem POS:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className={`p-4 rounded-lg ${totalCategories > 0 ? 'bg-green-100 dark:bg-green-900' : 'bg-white dark:bg-gray-800'}`}>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${totalCategories > 0 ? 'bg-green-500 text-white' : 'bg-indigo-500 text-white'}`}>
                                    {totalCategories > 0 ? '✓' : '1'}
                                </span>
                                <span className="font-medium text-gray-800 dark:text-gray-200">Buat Kategori</span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Kelompokkan produk Anda</p>
                        </div>
                        <div className={`p-4 rounded-lg ${totalProducts > 0 ? 'bg-green-100 dark:bg-green-900' : 'bg-white dark:bg-gray-800'}`}>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${totalProducts > 0 ? 'bg-green-500 text-white' : 'bg-indigo-500 text-white'}`}>
                                    {totalProducts > 0 ? '✓' : '2'}
                                </span>
                                <span className="font-medium text-gray-800 dark:text-gray-200">Tambah Produk</span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Daftarkan barang dagangan</p>
                        </div>
                        <div className="p-4 rounded-lg bg-white dark:bg-gray-800">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300">3</span>
                                <span className="font-medium text-gray-800 dark:text-gray-200">Isi Stok</span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Masukkan stok ke gudang</p>
                        </div>
                        <div className="p-4 rounded-lg bg-white dark:bg-gray-800">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300">4</span>
                                <span className="font-medium text-gray-800 dark:text-gray-200">Mulai Jual!</span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Buka POS dan layani pelanggan</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Today Stats with Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="rounded-xl border bg-white p-4 dark:border-gray-900 dark:bg-gray-950">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Transaksi Hari Ini</p>
                            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{todayTransactions}</p>
                            <div className="flex items-center gap-1 mt-1">
                                {transactionChange >= 0 ? (
                                    <IconTrendingUp size={14} className="text-emerald-500" />
                                ) : (
                                    <IconTrendingDown size={14} className="text-rose-500" />
                                )}
                                <span className={`text-xs font-medium ${transactionChange >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {transactionChange >= 0 ? '+' : ''}{transactionChange}% vs kemarin
                                </span>
                            </div>
                        </div>
                        <div className="rounded-full bg-blue-50 dark:bg-blue-900/40 p-3 text-blue-600 dark:text-blue-200">
                            <IconTrendingUp size={22} />
                        </div>
                    </div>
                </div>
                <div className="rounded-xl border bg-white p-4 dark:border-gray-900 dark:bg-gray-950">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Pendapatan Hari Ini</p>
                            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{formatCurrency(todayRevenue)}</p>
                            <div className="flex items-center gap-1 mt-1">
                                {revenueChange >= 0 ? (
                                    <IconTrendingUp size={14} className="text-emerald-500" />
                                ) : (
                                    <IconTrendingDown size={14} className="text-rose-500" />
                                )}
                                <span className={`text-xs font-medium ${revenueChange >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {revenueChange >= 0 ? '+' : ''}{revenueChange}% vs kemarin
                                </span>
                            </div>
                        </div>
                        <div className="rounded-full bg-emerald-50 dark:bg-emerald-900/40 p-3 text-emerald-600 dark:text-emerald-200">
                            <IconCoin size={22} />
                        </div>
                    </div>
                </div>
                <div className="rounded-xl border bg-white p-4 dark:border-gray-900 dark:bg-gray-950">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Profit Hari Ini</p>
                            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{formatCurrency(todayProfit)}</p>
                            <div className="flex items-center gap-1 mt-1">
                                {profitChange >= 0 ? (
                                    <IconTrendingUp size={14} className="text-emerald-500" />
                                ) : (
                                    <IconTrendingDown size={14} className="text-rose-500" />
                                )}
                                <span className={`text-xs font-medium ${profitChange >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {profitChange >= 0 ? '+' : ''}{profitChange}% vs kemarin
                                </span>
                            </div>
                        </div>
                        <div className="rounded-full bg-purple-50 dark:bg-purple-900/40 p-3 text-purple-600 dark:text-purple-200">
                            <IconMoneybag size={22} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Monthly Comparison Card */}
            <div className="mb-6 rounded-xl border bg-gradient-to-r from-indigo-500 to-purple-600 p-5 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <IconCalendar size={20} />
                            <h3 className="font-semibold">Pendapatan Bulan Ini</h3>
                        </div>
                        <p className="text-3xl font-bold">{formatCurrency(thisMonthRevenue)}</p>
                        <div className="flex items-center gap-2 mt-2">
                            {monthChange >= 0 ? (
                                <IconTrendingUp size={16} />
                            ) : (
                                <IconTrendingDown size={16} />
                            )}
                            <span className="text-sm opacity-90">
                                {monthChange >= 0 ? '+' : ''}{monthChange}% vs bulan lalu ({formatCurrency(lastMonthRevenue)})
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overview Widgets */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Widget title="Kategori" subtitle="Total" color="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200" icon={<IconCategory size={20} strokeWidth={1.5} />} total={totalCategories} />
                <Widget title="Produk" subtitle="Total" color="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200" icon={<IconBox size={20} strokeWidth={1.5} />} total={totalProducts} />
                <Widget title="Transaksi" subtitle="Total" color="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200" icon={<IconReceipt size={20} strokeWidth={1.5} />} total={totalTransactions} />
                <Widget title="Pengguna" subtitle="Total" color="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200" icon={<IconUsers size={20} strokeWidth={1.5} />} total={totalUsers} />
            </div>

            {/* Charts & Lists Row 1 */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue + Profit Trend Chart */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                        Tren Pendapatan & Profit (7 Hari)
                    </h3>
                    <div className="mt-4">
                        {chartData.length || profitData.length ? (
                            <canvas ref={chartRef} height={180}></canvas>
                        ) : (
                            <div className="flex h-32 items-center justify-center text-sm text-gray-500">
                                Belum ada data.
                            </div>
                        )}
                    </div>
                </div>

                {/* Top Products */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
                        Produk Terlaris (30 Hari)
                    </h3>
                    {topProducts.length ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left text-gray-500 border-b dark:border-gray-700">
                                        <th className="pb-2 w-8">#</th>
                                        <th className="pb-2">Nama Produk</th>
                                        <th className="pb-2 text-right">Terjual</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topProducts.map((product, index) => (
                                        <tr key={index} className="border-b dark:border-gray-800">
                                            <td className="py-2 text-gray-500">{index + 1}</td>
                                            <td className="py-2 text-gray-800 dark:text-gray-200">{product.name}</td>
                                            <td className="py-2 text-right font-medium text-emerald-600 dark:text-emerald-400">{product.qty}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex h-32 items-center justify-center text-sm text-gray-500">
                            Belum ada data produk.
                        </div>
                    )}
                </div>
            </div>

            {/* Charts & Lists Row 2 */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Payment Method Stats */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
                    <div className="flex items-center gap-2 mb-3">
                        <IconCreditCard size={18} className="text-gray-500" />
                        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                            Metode Pembayaran
                        </h3>
                    </div>
                    {paymentData.length ? (
                        <div className="h-48">
                            <canvas ref={paymentChartRef}></canvas>
                        </div>
                    ) : (
                        <div className="flex h-32 items-center justify-center text-sm text-gray-500">
                            Belum ada data.
                        </div>
                    )}
                </div>

                {/* Peak Hours */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
                    <div className="flex items-center gap-2 mb-3">
                        <IconClock size={18} className="text-gray-500" />
                        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                            Jam Ramai (30 Hari)
                        </h3>
                    </div>
                    {peakData.length ? (
                        <div className="h-48">
                            <canvas ref={peakHoursChartRef}></canvas>
                        </div>
                    ) : (
                        <div className="flex h-32 items-center justify-center text-sm text-gray-500">
                            Belum ada data.
                        </div>
                    )}
                </div>

                {/* Top Cashiers */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
                    <div className="flex items-center gap-2 mb-3">
                        <IconUser size={18} className="text-gray-500" />
                        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                            Top Kasir (30 Hari)
                        </h3>
                    </div>
                    {topCashiers.length ? (
                        <ul className="space-y-2">
                            {topCashiers.map((cashier, index) => (
                                <li key={index} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${index === 0 ? 'bg-amber-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                                            {index + 1}
                                        </span>
                                        <span className="text-gray-700 dark:text-gray-300">{cashier.name}</span>
                                    </div>
                                    <span className="font-medium text-gray-900 dark:text-white">{cashier.count} trx</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="flex h-32 items-center justify-center text-sm text-gray-500">
                            Belum ada data kasir.
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Row: Slow Products + Recent Transactions */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Slow Moving Products */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
                    <div className="flex items-center gap-2 mb-3">
                        <IconPackageOff size={18} className="text-rose-500" />
                        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                            Produk Tidak Laku (30+ Hari)
                        </h3>
                    </div>
                    {slowProducts.length ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left text-gray-500 border-b dark:border-gray-700">
                                        <th className="pb-2 w-8">#</th>
                                        <th className="pb-2">Nama Produk</th>
                                        <th className="pb-2 text-right">Harga</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {slowProducts.map((product, index) => (
                                        <tr key={index} className="border-b dark:border-gray-800">
                                            <td className="py-2 text-gray-500">{index + 1}</td>
                                            <td className="py-2 text-gray-800 dark:text-gray-200">{product.name}</td>
                                            <td className="py-2 text-right text-gray-500">{formatCurrency(product.price)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex h-24 items-center justify-center text-sm text-emerald-600">
                            ✓ Semua produk aktif terjual dalam 30 hari terakhir!
                        </div>
                    )}
                </div>

                {/* Recent Transactions */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
                        10 Transaksi Terakhir
                    </h3>
                    {recentTransactions.length ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left text-gray-500 border-b dark:border-gray-700">
                                        <th className="pb-2">No. Resi</th>
                                        <th className="pb-2">Tanggal</th>
                                        <th className="pb-2">Kasir</th>
                                        <th className="pb-2 text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentTransactions.map((trx, index) => (
                                        <tr key={index} className="border-b dark:border-gray-800">
                                            <td className="py-2 font-medium text-gray-900 dark:text-white">{trx.invoice}</td>
                                            <td className="py-2 text-gray-600 dark:text-gray-400">{trx.date}</td>
                                            <td className="py-2 text-gray-600 dark:text-gray-400">{trx.cashier}</td>
                                            <td className="py-2 text-right font-medium text-gray-900 dark:text-white">{formatCurrency(trx.total)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex h-24 items-center justify-center text-sm text-gray-500">
                            Belum ada transaksi.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page) => <DashboardLayout children={page} />;
