import React, { useState } from 'react'
import { IconPackage, IconCash, IconReceipt, IconTrendingUp, IconChartPie, IconHistory } from '@tabler/icons-react'

export default function ProductSalesAnalytics({ salesStats, variantSales = [], recentTransactions = [], product }) {
    const [activeTab, setActiveTab] = useState('variants')
    
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

    // Format quantity: show integer if whole number, otherwise max 2 decimals
    const formatQty = (qty) => {
        const num = parseFloat(qty) || 0
        if (Number.isInteger(num)) {
            return num.toString()
        }
        return num.toLocaleString('id-ID', { maximumFractionDigits: 2 })
    }

    const totalQtySold = salesStats?.total_qty_sold || 0
    const totalRevenue = salesStats?.total_revenue || 0
    const totalTransactions = salesStats?.total_transactions || 0

    const hasNoSales = totalQtySold === 0

    return (
        <div className="space-y-6">
            {/* Summary Cards - Stacked layout for better readability */}
            <div className="grid grid-cols-3 gap-3">
                {/* Total Sold */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-center">
                    <div className="flex justify-center mb-2">
                        <div className="p-2 bg-blue-500 rounded-lg">
                            <IconPackage size={20} className="text-white" />
                        </div>
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">Total Terjual</p>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                        {formatQty(totalQtySold)}
                    </p>
                    <p className="text-xs text-blue-500 dark:text-blue-400">{product.unit}</p>
                </div>

                {/* Total Revenue */}
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-900/10 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 text-center">
                    <div className="flex justify-center mb-2">
                        <div className="p-2 bg-emerald-500 rounded-lg">
                            <IconCash size={20} className="text-white" />
                        </div>
                    </div>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-1">Total Revenue</p>
                    <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300">
                        {formatPrice(totalRevenue)}
                    </p>
                </div>

                {/* Total Transactions */}
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-center">
                    <div className="flex justify-center mb-2">
                        <div className="p-2 bg-amber-500 rounded-lg">
                            <IconReceipt size={20} className="text-white" />
                        </div>
                    </div>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mb-1">Total Transaksi</p>
                    <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                        {totalTransactions}
                    </p>
                </div>
            </div>

            {hasNoSales ? (
                <div className="bg-white dark:bg-gray-950 border dark:border-gray-800 rounded-xl p-12 text-center">
                    <IconTrendingUp size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-700" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Belum Ada Data Penjualan</h3>
                    <p className="text-gray-600 dark:text-gray-400">Produk ini belum pernah terjual</p>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-950 border dark:border-gray-800 rounded-xl overflow-hidden">
                    {/* Tab Header */}
                    <div className="flex border-b dark:border-gray-800">
                        <button
                            onClick={() => setActiveTab('variants')}
                            className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                                activeTab === 'variants'
                                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                        >
                            <IconChartPie size={16} />
                            Per Variant
                        </button>
                        <button
                            onClick={() => setActiveTab('transactions')}
                            className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                                activeTab === 'transactions'
                                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                        >
                            <IconHistory size={16} />
                            Transaksi
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="max-h-64 overflow-y-auto">
                        {activeTab === 'variants' && (
                            <>
                                {variantSales.length > 0 ? (
                                    <table className="w-full">
                                        <thead className="bg-gray-50 dark:bg-gray-900 sticky top-0">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Variant</th>
                                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Qty</th>
                                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Revenue</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                            {variantSales.map((vs, idx) => (
                                                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{vs.variant_name || 'No Variant'}</td>
                                                    <td className="px-4 py-3 text-sm text-right text-gray-700 dark:text-gray-300">{formatQty(vs.qty_sold)} {product.unit}</td>
                                                    <td className="px-4 py-3 text-sm text-right font-semibold text-emerald-600 dark:text-emerald-400">{formatPrice(vs.revenue)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                                        Tidak ada data variant
                                    </div>
                                )}
                            </>
                        )}

                        {activeTab === 'transactions' && (
                            <>
                                {recentTransactions.length > 0 ? (
                                    <table className="w-full">
                                        <thead className="bg-gray-50 dark:bg-gray-900 sticky top-0">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Invoice</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Tanggal</th>
                                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Qty</th>
                                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                            {recentTransactions.slice(0, 5).map((tx) => (
                                                <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                                    <td className="px-4 py-3 text-sm font-medium text-blue-600 dark:text-blue-400">{tx.invoice}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{formatDate(tx.transaction_date)}</td>
                                                    <td className="px-4 py-3 text-sm text-right text-gray-700 dark:text-gray-300">{formatQty(tx.qty)} {product.unit}</td>
                                                    <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900 dark:text-white">{formatPrice(tx.price * tx.qty)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                                        Tidak ada transaksi dalam 30 hari terakhir
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
