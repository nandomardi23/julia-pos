import Widget from "@/Components/Dashboard/Widget";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
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
                                    Sisa: {formatDecimal(item.stock)} {item.unit} (min: {formatDecimal(item.min_stock)})
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

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
                            {totalCategories === 0 && (
                                <a href={route('categories.create')} className="mt-2 inline-block text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
                                    Buat Kategori →
                                </a>
                            )}
                        </div>
                        <div className={`p-4 rounded-lg ${totalProducts > 0 ? 'bg-green-100 dark:bg-green-900' : 'bg-white dark:bg-gray-800'}`}>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${totalProducts > 0 ? 'bg-green-500 text-white' : 'bg-indigo-500 text-white'}`}>
                                    {totalProducts > 0 ? '✓' : '2'}
                                </span>
                                <span className="font-medium text-gray-800 dark:text-gray-200">Tambah Produk</span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Daftarkan barang dagangan</p>
                            {totalProducts === 0 && totalCategories > 0 && (
                                <a href={route('products.create')} className="mt-2 inline-block text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
                                    Tambah Produk →
                                </a>
                            )}
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

            {/* Today Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="rounded-xl border bg-white p-4 dark:border-gray-900 dark:bg-gray-950">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Transaksi Hari Ini
                            </p>
                            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                {todayTransactions}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Total hari ini
                            </p>
                        </div>
                        <div className="rounded-full bg-blue-50 dark:bg-blue-900/40 p-3 text-blue-600 dark:text-blue-200">
                            <IconTrendingUp size={22} />
                        </div>
                    </div>
                </div>
                <div className="rounded-xl border bg-white p-4 dark:border-gray-900 dark:bg-gray-950">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Pendapatan Hari Ini
                            </p>
                            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                {formatCurrency(todayRevenue)}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Revenue hari ini
                            </p>
                        </div>
                        <div className="rounded-full bg-emerald-50 dark:bg-emerald-900/40 p-3 text-emerald-600 dark:text-emerald-200">
                            <IconCoin size={22} />
                        </div>
                    </div>
                </div>
                <div className="rounded-xl border bg-white p-4 dark:border-gray-900 dark:bg-gray-950">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Profit Hari Ini
                            </p>
                            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                {formatCurrency(todayProfit)}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Keuntungan bersih
                            </p>
                        </div>
                        <div className="rounded-full bg-purple-50 dark:bg-purple-900/40 p-3 text-purple-600 dark:text-purple-200">
                            <IconMoneybag size={22} />
                        </div>
                    </div>
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
        </>
    );
}

Dashboard.layout = (page) => <DashboardLayout children={page} />;
