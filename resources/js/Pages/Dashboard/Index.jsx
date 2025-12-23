import Widget from "@/Components/Dashboard/Widget";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useMemo, useRef } from "react";
import Chart from "chart.js/auto";
import {
    IconBox,
    IconCategory,
    IconMoneybag,
    IconUsers,
    IconCoin,
    IconReceipt,
    IconAlertTriangle,
    IconTrendingUp,
} from "@tabler/icons-react";

const formatCurrency = (value = 0) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);

export default function Dashboard({
    totalCategories = 0,
    totalProducts = 0,
    totalTransactions = 0,
    totalUsers = 0,
    todayTransactions = 0,
    todayRevenue = 0,
    todayProfit = 0,
    totalRevenue = 0,
    totalProfit = 0,
    revenueTrend = [],
    topProducts = [],
    recentTransactions = [],
    lowStockProducts = [],
}) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    const chartData = useMemo(() => revenueTrend ?? [], [revenueTrend]);

    useEffect(() => {
        if (!chartRef.current) return;

        if (chartInstance.current) {
            chartInstance.current.destroy();
            chartInstance.current = null;
        }

        if (!chartData.length) return;

        const labels = chartData.map((item) => item.label);
        const totals = chartData.map((item) => item.total);

        chartInstance.current = new Chart(chartRef.current, {
            type: "line",
            data: {
                labels,
                datasets: [{
                    label: "Pendapatan",
                    data: totals,
                    borderColor: "#4f46e5",
                    backgroundColor: "rgba(79,70,229,0.2)",
                    borderWidth: 2,
                    fill: true,
                    tension: 0.35,
                    pointRadius: 3,
                    pointBackgroundColor: "#4f46e5",
                }],
            },
            options: {
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        ticks: {
                            callback: (value) => formatCurrency(value),
                        },
                        grid: { color: "rgba(148, 163, 184, 0.2)" },
                    },
                    x: { grid: { display: false } },
                },
            },
        });

        return () => chartInstance.current?.destroy();
    }, [chartData]);

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
                                    Sisa: {item.stock} {item.unit} (min: {item.min_stock})
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Today Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 p-4 dark:border-blue-900 dark:from-blue-950 dark:to-blue-900">
                    <div className="flex items-center gap-2 mb-2">
                        <IconTrendingUp className="text-blue-500" size={20} />
                        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Transaksi Hari Ini</p>
                    </div>
                    <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{todayTransactions}</p>
                </div>
                <div className="rounded-xl border-2 border-green-200 bg-gradient-to-r from-green-50 to-green-100 p-4 dark:border-green-900 dark:from-green-950 dark:to-green-900">
                    <div className="flex items-center gap-2 mb-2">
                        <IconCoin className="text-green-500" size={20} />
                        <p className="text-sm text-green-600 dark:text-green-400 font-medium">Pendapatan Hari Ini</p>
                    </div>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">{formatCurrency(todayRevenue)}</p>
                </div>
                <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-purple-100 p-4 dark:border-purple-900 dark:from-purple-950 dark:to-purple-900">
                    <div className="flex items-center gap-2 mb-2">
                        <IconMoneybag className="text-purple-500" size={20} />
                        <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Profit Hari Ini</p>
                    </div>
                    <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{formatCurrency(todayProfit)}</p>
                </div>
            </div>

            {/* Overview Widgets */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Widget
                    title="Kategori"
                    subtitle="Total"
                    color="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    icon={<IconCategory size={20} strokeWidth={1.5} />}
                    total={totalCategories}
                />
                <Widget
                    title="Produk"
                    subtitle="Total"
                    color="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    icon={<IconBox size={20} strokeWidth={1.5} />}
                    total={totalProducts}
                />
                <Widget
                    title="Transaksi"
                    subtitle="Total"
                    color="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    icon={<IconReceipt size={20} strokeWidth={1.5} />}
                    total={totalTransactions}
                />
                <Widget
                    title="Pengguna"
                    subtitle="Total"
                    color="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    icon={<IconUsers size={20} strokeWidth={1.5} />}
                    total={totalUsers}
                />
            </div>

            {/* Financial Summary */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
                    <p className="text-sm text-gray-500">Total Pendapatan (All-time)</p>
                    <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{formatCurrency(totalRevenue)}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
                    <p className="text-sm text-gray-500">Total Profit (All-time)</p>
                    <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{formatCurrency(totalProfit)}</p>
                </div>
            </div>

            {/* Charts & Lists */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Trend Chart */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                        Tren Pendapatan (7 Hari)
                    </h3>
                    <div className="mt-4">
                        {chartData.length ? (
                            <canvas ref={chartRef} height={180}></canvas>
                        ) : (
                            <div className="flex h-32 items-center justify-center text-sm text-gray-500">
                                Belum ada data pendapatan.
                            </div>
                        )}
                    </div>
                </div>

                {/* Top Products */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
                        Top 5 Produk Terlaris
                    </h3>
                    {topProducts.length ? (
                        <ul className="space-y-2">
                            {topProducts.map((product, index) => (
                                <li key={index} className="flex items-center justify-between text-sm">
                                    <span className="text-gray-700 dark:text-gray-300">{product.name}</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{product.qty} terjual</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="flex h-32 items-center justify-center text-sm text-gray-500">
                            Belum ada data produk.
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
                    5 Transaksi Terakhir
                </h3>
                {recentTransactions.length ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-gray-500 border-b dark:border-gray-700">
                                    <th className="pb-2">Invoice</th>
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
        </>
    );
}

Dashboard.layout = (page) => <DashboardLayout children={page} />;
