import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, router } from '@inertiajs/react'
import Card from '@/Components/Common/Card'
import Button from '@/Components/Common/Button'
import { IconBox, IconArrowLeft, IconPencil, IconHistory, IconChartBar, IconList } from '@tabler/icons-react'
import PriceHistoryTable from '@/Components/Product/PriceHistoryTable'
import ProductSalesAnalytics from '@/Components/Product/ProductSalesAnalytics'

export default function Show({ product, priceHistories = [], salesStats, variantSales = [], recentTransactions = [], warehouseStocks = [] }) {
    
    const formatPrice = (value = 0) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value)
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
                        <span className="ml-2 font-mono">{product.barcode}</span>
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

            {/* Grid Layout for Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Card 1: Informasi Produk */}
                <Card
                    title={'Informasi Produk'}
                    icon={<IconBox size={20} strokeWidth={1.5} />}
                >
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Product Image */}
                        {product.image && (
                            <div className="flex-shrink-0">
                                <img 
                                    src={`/storage/products/${product.image}`} 
                                    alt={product.title}
                                    className="w-full md:w-40 h-40 object-cover rounded-xl border dark:border-gray-700"
                                />
                            </div>
                        )}
                        
                        {/* Product Details */}
                        <div className="flex-1 grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Kategori</p>
                                <p className="font-semibold text-gray-900 dark:text-white">{product.category?.name || '-'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Satuan</p>
                                <p className="font-semibold text-gray-900 dark:text-white uppercase">{product.unit}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Harga Beli</p>
                                <p className="font-semibold text-gray-900 dark:text-white">{formatPrice(product.buy_price)}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Harga Jual</p>
                                <p className="font-bold text-emerald-600 dark:text-emerald-400 text-lg">{formatPrice(product.sell_price)}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Stok Minimum</p>
                                <p className="font-semibold text-gray-900 dark:text-white">{product.min_stock || 0}</p>
                            </div>
                        </div>
                    </div>
                    {product.description && (
                        <div className="mt-4 pt-4 border-t dark:border-gray-800">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Deskripsi</p>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">{product.description}</p>
                        </div>
                    )}
                </Card>

                {/* Card 2: Varian & Bahan Baku */}
                {product.variants && product.variants.length > 0 && (
                    <Card
                        title={product.product_type === 'recipe' ? 'Varian & Bahan Baku' : 'Varian Produk'}
                        icon={<IconList size={20} strokeWidth={1.5} />}
                    >
                        <div className="space-y-3 max-h-80 overflow-y-auto">
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
                    </Card>
                )}

                {/* Card 3: Riwayat Harga */}
                <Card
                    title={'Riwayat Perubahan Harga'}
                    icon={<IconHistory size={20} strokeWidth={1.5} />}
                >
                    {priceHistories && priceHistories.length > 0 ? (
                        <div className="max-h-64 overflow-y-auto">
                            <PriceHistoryTable priceHistories={priceHistories} />
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                            Belum ada perubahan harga
                        </div>
                    )}
                </Card>

                {/* Card 4: Analisis Penjualan */}
                <Card
                    title={'Analisis Penjualan'}
                    icon={<IconChartBar size={20} strokeWidth={1.5} />}
                    className={`${(!product.variants || product.variants.length === 0) ? 'lg:col-span-1' : ''}`}
                >
                    <ProductSalesAnalytics 
                        salesStats={salesStats}
                        variantSales={variantSales}
                        recentTransactions={recentTransactions}
                        product={product}
                    />
                </Card>
            </div>
        </>
    )
}

Show.layout = page => <DashboardLayout children={page} />
