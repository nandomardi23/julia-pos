import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, Link, usePage } from '@inertiajs/react'
import Table from '@/Components/Common/Table'
import { IconBox, IconFolder, IconArrowLeft } from '@tabler/icons-react'

export default function Show({ category, products }) {
    
    // helper to format currency
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value)
    }

    return (
        <>
            <Head title={`Detail Kategori - ${category.name}`} />

            <div className='mb-4'>
                <Link
                    href={route('categories.index')}
                    className='inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors'
                >
                    <IconArrowLeft size={20} strokeWidth={1.5} />
                    <span>Kembali ke Kategori</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Category Info Card */}
                <div className="md:col-span-1">
                    <div className="bg-white dark:bg-gray-950 rounded-xl border dark:border-gray-900 shadow-sm overflow-hidden">
                        <div className="p-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center mb-4 overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm">
                                    {category.image ? (
                                        <img 
                                            src={category.image} 
                                            alt={category.name} 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <IconFolder size={48} className="text-gray-400 dark:text-gray-600" strokeWidth={1} />
                                    )}
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{category.name}</h2>
                                {category.description ? (
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">{category.description}</p>
                                ) : (
                                    <span className="text-gray-400 dark:text-gray-600 text-sm italic">Tidak ada deskripsi</span>
                                )}
                            </div>
                            
                            <div className="mt-6 pt-6 border-t dark:border-gray-900">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">Total Produk</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{products.total} Item</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products List */}
                <div className="md:col-span-2">
                    <Table.Card 
                        title={`Produk dalam Kategori: ${category.name}`} 
                        icon={<IconBox size={20} strokeWidth={1.5} />}
                        links={products.links}
                        meta={{
                            from: products.from,
                            to: products.to,
                            total: products.total,
                            per_page: products.per_page
                        }}
                    >
                        <Table>
                            <Table.Thead>
                                <tr>
                                    <Table.Th className='w-12 text-center'>No</Table.Th>
                                    <Table.Th>Produk</Table.Th>
                                    <Table.Th>Harga Beli</Table.Th>
                                    <Table.Th>Harga Jual</Table.Th>
                                    <Table.Th className='text-center'>Stok</Table.Th>
                                </tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {products.data.length ? 
                                    products.data.map((product, i) => (
                                        <tr className='hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors' key={product.id}>
                                            <Table.Td className='text-center font-medium'>
                                                {++i + (products.current_page - 1) * products.per_page}
                                            </Table.Td>
                                            <Table.Td>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                                                        {product.image ? (
                                                            <img 
                                                                src={product.image} 
                                                                alt={product.title} 
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <IconBox size={20} className="text-gray-400 dark:text-gray-600" strokeWidth={1.5} />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900 dark:text-white">{product.title}</div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">{product.barcode || '-'}</div>
                                                    </div>
                                                </div>
                                            </Table.Td>
                                            <Table.Td>{formatCurrency(product.buy_price)}</Table.Td>
                                            <Table.Td>{formatCurrency(product.sell_price)}</Table.Td>
                                            <Table.Td className='text-center'>
                                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                                    product.stock > 10 
                                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                        : product.stock > 0
                                                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                }`}>
                                                    {product.stock}
                                                </span>
                                            </Table.Td>
                                        </tr>
                                    )) : 
                                    <Table.Empty colSpan={5} message="Belum ada produk dalam kategori ini" />
                                }
                            </Table.Tbody>
                        </Table>
                    </Table.Card>
                </div>
            </div>
        </>
    )
}

Show.layout = page => <DashboardLayout children={page} />
