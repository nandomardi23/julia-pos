import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, router } from '@inertiajs/react'
import { IconTruck, IconBox, IconShoppingCart, IconCurrencyDollar, IconPackage, IconArrowLeft } from '@tabler/icons-react'
import Card from '@/Components/Common/Card'
import Table from '@/Components/Common/Table'
import Button from '@/Components/Common/Button'

export default function Show({ supplier, purchases, stats, products }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('id-ID', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric'
        })
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID').format(amount || 0)
    }

    return (
        <>
            <Head title={`Supplier: ${supplier.name}`} />
            <div className='mb-4'>
                <Button
                    type={'button'}
                    label={'Kembali'}
                    icon={<IconArrowLeft size={20} strokeWidth={1.5} />}
                    className={'border bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700'}
                    onClick={() => router.visit(route('suppliers.index'))}
                />
            </div>
            
            <div className='grid grid-cols-12 gap-4'>
                {/* Supplier Info */}
                <div className='col-span-12 md:col-span-4'>
                    <Card title={'Informasi Supplier'} icon={<IconTruck size={20} strokeWidth={1.5} />}>
                        <div className='space-y-3'>
                            <div>
                                <span className='text-sm text-gray-500 dark:text-gray-400'>Nama</span>
                                <p className='font-medium text-gray-900 dark:text-white'>{supplier.name}</p>
                            </div>
                            {supplier.company && (
                                <div>
                                    <span className='text-sm text-gray-500 dark:text-gray-400'>Perusahaan</span>
                                    <p className='font-medium text-gray-900 dark:text-white'>{supplier.company}</p>
                                </div>
                            )}
                            <div>
                                <span className='text-sm text-gray-500 dark:text-gray-400'>Telepon</span>
                                <p className='font-medium text-gray-900 dark:text-white'>{supplier.phone}</p>
                            </div>
                            {supplier.email && (
                                <div>
                                    <span className='text-sm text-gray-500 dark:text-gray-400'>Email</span>
                                    <p className='font-medium text-gray-900 dark:text-white'>{supplier.email}</p>
                                </div>
                            )}
                            {supplier.address && (
                                <div>
                                    <span className='text-sm text-gray-500 dark:text-gray-400'>Alamat</span>
                                    <p className='font-medium text-gray-900 dark:text-white'>{supplier.address}</p>
                                </div>
                            )}
                            {supplier.description && (
                                <div>
                                    <span className='text-sm text-gray-500 dark:text-gray-400'>Keterangan</span>
                                    <p className='font-medium text-gray-900 dark:text-white'>{supplier.description}</p>
                                </div>
                            )}
                            <div>
                                <span className='text-sm text-gray-500 dark:text-gray-400'>Jumlah Produk</span>
                                <p className='font-medium text-gray-900 dark:text-white'>
                                    <span className='bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs dark:bg-blue-900 dark:text-blue-300'>
                                        {stats.total_products} produk
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Stats */}
                    <div className='mt-4 grid grid-cols-1 gap-3'>
                        <div className='bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-800 p-4'>
                            <div className='flex items-center gap-3'>
                                <div className='p-2 bg-green-100 dark:bg-green-900 rounded-lg'>
                                    <IconShoppingCart size={20} className='text-green-600 dark:text-green-400' />
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500 dark:text-gray-400'>Total Pembelian</p>
                                    <p className='text-lg font-semibold text-gray-900 dark:text-white'>{stats.total_purchases}x</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-800 p-4'>
                            <div className='flex items-center gap-3'>
                                <div className='p-2 bg-blue-100 dark:bg-blue-900 rounded-lg'>
                                    <IconCurrencyDollar size={20} className='text-blue-600 dark:text-blue-400' />
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500 dark:text-gray-400'>Total Nilai Pembelian</p>
                                    <p className='text-lg font-semibold text-gray-900 dark:text-white'>Rp {formatCurrency(stats.total_spent)}</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-800 p-4'>
                            <div className='flex items-center gap-3'>
                                <div className='p-2 bg-purple-100 dark:bg-purple-900 rounded-lg'>
                                    <IconPackage size={20} className='text-purple-600 dark:text-purple-400' />
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500 dark:text-gray-400'>Total Barang Masuk</p>
                                    <p className='text-lg font-semibold text-gray-900 dark:text-white'>{formatCurrency(stats.total_items)} unit</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className='col-span-12 md:col-span-8 space-y-4'>
                    {/* Purchase History */}
                    <Table.Card title={'Riwayat Pembelian dari Supplier'}>
                        <Table>
                            <Table.Thead>
                                <tr>
                                    <Table.Th>Tanggal</Table.Th>
                                    <Table.Th>Produk</Table.Th>
                                    <Table.Th className='text-center'>Qty</Table.Th>
                                    <Table.Th className='text-right'>Harga Beli</Table.Th>
                                    <Table.Th>User</Table.Th>
                                </tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {purchases && purchases.length > 0 ? (
                                    purchases.map((purchase, i) => (
                                        <tr className='hover:bg-gray-100 dark:hover:bg-gray-900' key={i}>
                                            <Table.Td className='text-sm'>
                                                {formatDate(purchase.created_at)}
                                            </Table.Td>
                                            <Table.Td>
                                                <div className='flex items-center gap-2'>
                                                    <IconBox size={16} className='text-gray-400' />
                                                    {purchase.product?.title}
                                                </div>
                                            </Table.Td>
                                            <Table.Td className='text-center'>
                                                <span className='bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium dark:bg-gray-800 dark:text-gray-300'>
                                                    {purchase.quantity}
                                                </span>
                                            </Table.Td>
                                            <Table.Td className='text-right'>
                                                {purchase.purchase_price 
                                                    ? `Rp ${formatCurrency(purchase.purchase_price)}`
                                                    : '-'
                                                }
                                            </Table.Td>
                                            <Table.Td className='text-sm'>{purchase.user?.name}</Table.Td>
                                        </tr>
                                    ))
                                ) : (
                                    <Table.Empty colSpan={5} message="Belum ada riwayat pembelian dari supplier ini" />
                                )}
                            </Table.Tbody>
                        </Table>
                    </Table.Card>

                    {/* Products from this supplier */}
                    <Table.Card title={'Produk dari Supplier Ini'}>
                        <Table>
                            <Table.Thead>
                                <tr>
                                    <Table.Th>Produk</Table.Th>
                                    <Table.Th>Kategori</Table.Th>
                                    <Table.Th>Harga Beli</Table.Th>
                                    <Table.Th>Harga Jual</Table.Th>
                                </tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {products && products.length > 0 ? (
                                    products.map((product, i) => (
                                        <tr className='hover:bg-gray-100 dark:hover:bg-gray-900' key={i}>
                                            <Table.Td>
                                                <div className='flex items-center gap-2'>
                                                    <IconBox size={16} className='text-gray-400' />
                                                    {product.title}
                                                </div>
                                            </Table.Td>
                                            <Table.Td>{product.category?.name || '-'}</Table.Td>
                                            <Table.Td>Rp {parseInt(product.buy_price).toLocaleString('id-ID')}</Table.Td>
                                            <Table.Td>Rp {parseInt(product.sell_price).toLocaleString('id-ID')}</Table.Td>
                                        </tr>
                                    ))
                                ) : (
                                    <Table.Empty colSpan={4} message="Belum ada produk dari supplier ini" />
                                )}
                            </Table.Tbody>
                        </Table>
                    </Table.Card>
                </div>
            </div>
        </>
    )
}

Show.layout = page => <DashboardLayout children={page} />
