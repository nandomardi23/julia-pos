import React, { useState } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, router } from '@inertiajs/react'
import Card from '@/Components/Common/Card'
import Button from '@/Components/Common/Button'
import { IconBox, IconArrowLeft, IconPencil, IconPackage, IconCash, IconReceipt, IconList, IconHistory, IconChartBar, IconTrendingUp } from '@tabler/icons-react'
import PriceHistoryTable from '@/Components/Product/PriceHistoryTable'
import { formatDecimal } from '@/Utils/Format'

export default function Show({ product, priceHistories = [], salesStats, variantSales = [], recentTransactions = [], warehouseStocks = [] }) {
    const [activeTab, setActiveTab] = useState('variants')
    
    const formatPrice = (value = 0) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value)
    }

    // Format quantity: show integer if whole number, otherwise max 2 decimals
    const formatQty = (qty) => {
        const num = parseFloat(qty) || 0
        if (Number.isInteger(num)) {
            return num.toString()
        }
        return num.toLocaleString('id-ID', { maximumFractionDigits: 2 })
    }

    // Smart unit conversion: kg → gram, L → ml for small quantities
    const formatQuantityWithUnit = (qty, unit) => {
        const quantity = parseFloat(qty) || 0
        const lowerUnit = (unit || '').toLowerCase()
        
        if (lowerUnit === 'kg' && quantity < 1) {
            return {
                qty: (quantity * 1000).toLocaleString('id-ID', { maximumFractionDigits: 2 }),
                unit: 'gr'
            }
        }
        
        if ((lowerUnit === 'l' || lowerUnit === 'liter' || lowerUnit === 'ltr') && quantity < 1) {
            return {
                qty: (quantity * 1000).toLocaleString('id-ID', { maximumFractionDigits: 2 }),
                unit: 'ml'
            }
        }
        
        return {
            qty: quantity.toLocaleString('id-ID', { maximumFractionDigits: 3 }),
            unit: unit || '-'
        }
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

    const getProductTypeLabel = (type) => {
        const types = {
            'sellable': 'Produk Jual',
            'ingredient': 'Bahan Baku',
            'supply': 'Alat Pendukung',
            'recipe': 'Resep'
        }
        return types[type] || type
    }

    const getProductTypeColor = (type) => {
        const colors = {
            'sellable': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            'ingredient': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            'supply': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
            'recipe': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
        }
        return colors[type] || 'bg-gray-100 text-gray-800'
    }

    const totalQtySold = salesStats?.total_qty_sold || 0
    const totalRevenue = salesStats?.total_revenue || 0
    const totalTransactions = salesStats?.total_transactions || 0

    return (
        <>
            <Head title={`Detail - ${product.title}`} />
            
            {/* Header with Back & Edit Buttons */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{product.title}</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${getProductTypeColor(product.product_type)}`}>
                            {getProductTypeLabel(product.product_type)}
                        </span>
                        {product.barcode && <span className="ml-2 font-mono">{product.barcode}</span>}
                    </p>
                </div>
                <div className='flex items-center gap-2'>
                    <Button
                        type={'button'}
                        label={'Kembali'}
                        icon={<IconArrowLeft size={18} strokeWidth={1.5} />}
                        className={'border bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700'}
                        onClick={() => {
                            const indexRoutes = {
                                'recipe': 'recipes.index',
                                'ingredient': 'ingredients.index',
                                'supply': 'supplies.index',
                                'sellable': 'products.index'
                            }
                            router.visit(route(indexRoutes[product.product_type] || 'products.index'))
                        }}
                    />
                    <Button
                        type={'button'}
                        label={'Edit'}
                        icon={<IconPencil size={18} strokeWidth={1.5} />}
                        className={'border bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:border-blue-700 dark:text-white dark:hover:bg-blue-700'}
                        onClick={() => {
                            const editRoutes = {
                                'recipe': 'recipes.edit',
                                'ingredient': 'ingredients.edit',
                                'supply': 'supplies.edit',
                                'sellable': 'products.edit'
                            }
                            router.visit(route(editRoutes[product.product_type] || 'products.edit', product.id))
                        }}
                    />
                </div>
            </div>

            {/* Card 1: Informasi Produk + Summary Stats (Full Width) */}
            <Card
                title={'Informasi Produk'}
                icon={<IconBox size={20} strokeWidth={1.5} />}
                className="mb-6"
            >
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left: Product Image & Details */}
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Product Image */}
                            {product.image && (
                                <div className="flex-shrink-0">
                                    <img 
                                        src={`/storage/products/${product.image}`} 
                                        alt={product.title}
                                        className="w-full md:w-32 h-32 object-cover rounded-xl border dark:border-gray-700"
                                    />
                                </div>
                            )}
                            
                            {/* Product Details */}
                            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Kategori</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{product.category?.name || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SKU</p>
                                    <p className="font-semibold text-gray-900 dark:text-white font-mono text-sm">{product.sku || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Barcode</p>
                                    <p className="font-semibold text-gray-900 dark:text-white font-mono text-sm">{product.barcode || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Satuan</p>
                                    <p className="font-semibold text-gray-900 dark:text-white uppercase">{product.unit}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Stok Minimum</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{formatDecimal(product.min_stock) || 0}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Harga Beli</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{formatPrice(product.buy_price)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Harga Jual</p>
                                    <p className="font-bold text-emerald-600 dark:text-emerald-400 text-lg">{formatPrice(product.sell_price)}</p>
                                </div>
                                {product.description && (
                                    <div className="col-span-2 md:col-span-3">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Deskripsi</p>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm">{product.description}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right: 3 Summary Stats Cards */}
                    <div className="lg:w-72 flex-shrink-0">
                        <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
                            {/* Total Sold */}
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-3 text-center">
                                <div className="flex items-center justify-center lg:justify-start gap-2">
                                    <div className="p-2 bg-blue-500 rounded-lg">
                                        <IconPackage size={16} className="text-white" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Total Terjual</p>
                                        <p className="text-xl font-bold text-blue-700 dark:text-blue-300">
                                            {formatQty(totalQtySold)} <span className="text-xs font-normal">{product.unit}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Total Revenue */}
                            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-900/10 border border-emerald-200 dark:border-emerald-800 rounded-xl p-3 text-center">
                                <div className="flex items-center justify-center lg:justify-start gap-2">
                                    <div className="p-2 bg-emerald-500 rounded-lg">
                                        <IconCash size={16} className="text-white" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Total Revenue</p>
                                        <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
                                            {formatPrice(totalRevenue)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Total Transactions */}
                            <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-3 text-center">
                                <div className="flex items-center justify-center lg:justify-start gap-2">
                                    <div className="p-2 bg-amber-500 rounded-lg">
                                        <IconReceipt size={16} className="text-white" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">Total Transaksi</p>
                                        <p className="text-xl font-bold text-amber-700 dark:text-amber-300">
                                            {totalTransactions}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Card 2: Tabbed Content (Full Width) */}
            <Card className="overflow-hidden">
                {/* Tab Header */}
                <div className="flex border-b dark:border-gray-800 -mx-6 -mt-6 mb-4">
                    <button
                        onClick={() => setActiveTab('variants')}
                        className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                            activeTab === 'variants'
                                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                    >
                        <IconList size={16} />
                        Varian & Bahan
                    </button>
                    <button
                        onClick={() => setActiveTab('price-history')}
                        className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                            activeTab === 'price-history'
                                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                    >
                        <IconHistory size={16} />
                        Riwayat Harga
                    </button>
                    <button
                        onClick={() => setActiveTab('sales')}
                        className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                            activeTab === 'sales'
                                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                    >
                        <IconChartBar size={16} />
                        Analisis Penjualan
                    </button>
                </div>

                {/* Tab Content */}
                <div className="max-h-96 overflow-y-auto">
                    {/* Tab 1: Variants & Ingredients */}
                    {activeTab === 'variants' && (
                        <div>
                            {product.variants && product.variants.length > 0 ? (
                                <div className="space-y-3">
                                    {product.variants.map((variant) => (
                                        <div key={variant.id} className="bg-gray-50 dark:bg-gray-900 rounded-xl border dark:border-gray-800 overflow-hidden">
                                            {/* Variant Header */}
                                            <div className="px-4 py-2.5 bg-gray-100 dark:bg-gray-800 flex justify-between items-center">
                                                <span className="font-semibold text-gray-900 dark:text-white text-sm">{variant.name}</span>
                                                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                                                    {formatPrice(product.sell_price + (variant.price_adjustment || 0))}
                                                </span>
                                            </div>
                                            
                                            {/* Variant Ingredients */}
                                            {variant.ingredients && variant.ingredients.length > 0 && (
                                                <div className="p-3">
                                                    <table className="w-full text-xs">
                                                        <thead>
                                                            <tr className="text-left text-gray-500 dark:text-gray-400">
                                                                <th className="pb-1 font-medium">Bahan</th>
                                                                <th className="pb-1 text-right font-medium">Qty</th>
                                                                <th className="pb-1 text-center font-medium">Satuan</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                                            {variant.ingredients.map((ing, idx) => {
                                                                const formatted = formatQuantityWithUnit(ing.quantity, ing.ingredient?.unit)
                                                                return (
                                                                <tr key={idx}>
                                                                    <td className="py-1.5 text-gray-900 dark:text-white">
                                                                        {ing.ingredient?.title || '-'}
                                                                    </td>
                                                                    <td className="py-1.5 text-right font-medium text-gray-900 dark:text-white">
                                                                        {formatted.qty}
                                                                    </td>
                                                                    <td className="py-1.5 text-center text-gray-500 dark:text-gray-400">
                                                                        {formatted.unit}
                                                                    </td>
                                                                </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )}
                                            
                                            {(!variant.ingredients || variant.ingredients.length === 0) && product.product_type === 'recipe' && (
                                                <div className="p-3 text-xs text-gray-500 dark:text-gray-400 text-center">
                                                    Belum ada bahan baku
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                                    <IconList size={32} className="mx-auto mb-2 opacity-50" />
                                    Tidak ada varian produk
                                </div>
                            )}
                        </div>
                    )}

                    {/* Tab 2: Price History */}
                    {activeTab === 'price-history' && (
                        <div>
                            {priceHistories && priceHistories.length > 0 ? (
                                <PriceHistoryTable priceHistories={priceHistories} />
                            ) : (
                                <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                                    <IconHistory size={32} className="mx-auto mb-2 opacity-50" />
                                    Belum ada perubahan harga
                                </div>
                            )}
                        </div>
                    )}

                    {/* Tab 3: Sales Analysis */}
                    {activeTab === 'sales' && (
                        <div className="space-y-4">
                            {totalQtySold === 0 ? (
                                <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                                    <IconTrendingUp size={32} className="mx-auto mb-2 opacity-50" />
                                    Belum ada data penjualan
                                </div>
                            ) : (
                                <>
                                    {/* Variant Sales */}
                                    {variantSales.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Penjualan per Variant</h4>
                                            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl border dark:border-gray-800 overflow-hidden">
                                                <table className="w-full text-sm">
                                                    <thead className="bg-gray-100 dark:bg-gray-800">
                                                        <tr>
                                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Variant</th>
                                                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Qty</th>
                                                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Revenue</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                                        {variantSales.map((vs, idx) => (
                                                            <tr key={idx}>
                                                                <td className="px-4 py-2 font-medium text-gray-900 dark:text-white">{vs.variant_name || 'No Variant'}</td>
                                                                <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">{formatQty(vs.qty_sold)} {product.unit}</td>
                                                                <td className="px-4 py-2 text-right font-semibold text-emerald-600 dark:text-emerald-400">{formatPrice(vs.revenue)}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}

                                    {/* Recent Transactions */}
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">5 Transaksi Terbaru</h4>
                                        {recentTransactions.length > 0 ? (
                                            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl border dark:border-gray-800 overflow-hidden">
                                                <table className="w-full text-sm">
                                                    <thead className="bg-gray-100 dark:bg-gray-800">
                                                        <tr>
                                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Invoice</th>
                                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Tanggal</th>
                                                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Qty</th>
                                                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Subtotal</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                                        {recentTransactions.slice(0, 5).map((tx) => (
                                                            <tr key={tx.id}>
                                                                <td className="px-4 py-2 font-medium text-blue-600 dark:text-blue-400">{tx.invoice}</td>
                                                                <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{formatDate(tx.transaction_date)}</td>
                                                                <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">{formatQty(tx.qty)} {product.unit}</td>
                                                                <td className="px-4 py-2 text-right font-semibold text-gray-900 dark:text-white">{formatPrice(tx.price * tx.qty)}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                                                Tidak ada transaksi dalam 30 hari terakhir
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </Card>
        </>
    )
}

Show.layout = page => <DashboardLayout children={page} />
