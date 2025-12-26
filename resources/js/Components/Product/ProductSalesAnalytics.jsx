import React from 'react'
import { IconPackage, IconCash, IconReceipt, IconTrendingUp } from '@tabler/icons-react'

export default function ProductSalesAnalytics({ salesStats, variantSales = [], recentTransactions = [], product }) {
    
    const formatPrice = (value = 0) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value)
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const totalQtySold = salesStats?.total_qty_sold || 0
    const totalRevenue = salesStats?.total_revenue || 0
    const totalTransactions = salesStats?.total_transactions || 0

    const hasNoSales = totalQtySold === 0

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Total Sold */}
                <div className="bg-white dark:bg-gray-950 border dark:border-gray-800 rounded-xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <IconPackage size={24} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Terjual</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {totalQtySold.toLocaleString('id-ID')} <span className="text-sm font-normal text-gray-500">{product.unit}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Total Revenue */}
                <div className="bg-white dark:bg-gray-950 border dark:border-gray-800 rounded-xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                            <IconCash size={24} className="text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {formatPrice(totalRevenue)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Total Transactions */}
                <div className="bg-white dark:bg-gray-950 border dark:border-gray-800 rounded-xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                            <IconReceipt size={24} className="text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Transaksi</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {totalTransactions.toLocaleString('id-ID')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {hasNoSales ? (
                <div className="bg-white dark:bg-gray-950 border dark:border-gray-800 rounded-xl p-12 text-center">
                    <IconTrendingUp size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-700" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Belum Ada Data Penjualan</h3>
                    <p className="text-gray-600 dark:text-gray-400">Produk ini belum pernah terjual</p>
                </div>
            ) : (
                <>
                    {/* Variant Sales Breakdown */}
                    {variantSales.length > 0 && (
                        <div className="bg-white dark:bg-gray-950 border dark:border-gray-800 rounded-xl overflow-hidden">
                            <div className="px-6 py-4 border-b dark:border-gray-800">
                                <h3 className="font-bold text-gray-900 dark:text-white">Penjualan per Variant</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 dark:bg-gray-900">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                                Variant
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                                Qty Terjual
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                                Revenue
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                        {variantSales.map((vs, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                                    {vs.variant_name || 'No Variant'}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-right text-gray-700 dark:text-gray-300">
                                                    {parseFloat(vs.qty_sold).toLocaleString('id-ID')} {product.unit}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-right font-semibold text-emerald-600 dark:text-emerald-400">
                                                    {formatPrice(vs.revenue)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Recent Transactions */}
                    <div className="bg-white dark:bg-gray-950 border dark:border-gray-800 rounded-xl overflow-hidden">
                        <div className="px-6 py-4 border-b dark:border-gray-800">
                            <h3 className="font-bold text-gray-900 dark:text-white">Transaksi Terbaru (30 Hari)</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Menampilkan maksimal 20 transaksi terakhir</p>
                        </div>
                        <div className="overflow-x-auto">
                            {recentTransactions.length === 0 ? (
                                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                                    Tidak ada transaksi dalam 30 hari terakhir
                                </div>
                            ) : (
                                <table className="w-full">
                                    <thead className="bg-gray-50 dark:bg-gray-900">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                                Invoice
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                                Tanggal
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                                Variant
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                                Qty
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                                Harga
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                                Subtotal
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                        {recentTransactions.map((tx) => (
                                            <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                                <td className="px-6 py-4 text-sm font-medium text-blue-600 dark:text-blue-400">
                                                    {tx.invoice}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                                    {formatDate(tx.transaction_date)}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                                    {tx.variant_name || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-right text-gray-700 dark:text-gray-300">
                                                    {parseFloat(tx.qty).toLocaleString('id-ID')} {product.unit}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-right text-gray-700 dark:text-gray-300">
                                                    {formatPrice(tx.price)}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-right font-semibold text-gray-900 dark:text-white">
                                                    {formatPrice(tx.price * tx.qty)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
