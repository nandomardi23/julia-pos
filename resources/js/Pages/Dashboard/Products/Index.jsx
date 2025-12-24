import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, usePage } from '@inertiajs/react'
import Button from '@/Components/Dashboard/Button'
import { IconCirclePlus, IconDatabaseOff, IconPencilCog, IconTrash } from '@tabler/icons-react'
import Search from '@/Components/Dashboard/Search'
import Table from '@/Components/Dashboard/Table'

export default function Index({ products }) {
    const formatCurrency = (value) => new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(value || 0);

    return (
        <>
            <Head title='Produk' />
            <div className='mb-4'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
                    <Button
                        type={'link'}
                        icon={<IconCirclePlus size={20} strokeWidth={1.5} />}
                        className={'border bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:border-blue-700 dark:hover:bg-blue-700'}
                        label={'Tambah Produk'}
                        href={route('products.create')}
                    />
                    <div className='w-full sm:w-80'>
                        <Search
                            url={route('products.index')}
                            placeholder='Cari produk...'
                        />
                    </div>
                </div>
            </div>
            <Table.Card 
                title={'Data Produk'}
                links={products.links}
                meta={{
                    from: products.from,
                    to: products.to,
                    total: products.total,
                    per_page: products.per_page
                }}
                url={route('products.index')}
            >
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className='w-12 text-center'>No</Table.Th>
                            <Table.Th>Produk</Table.Th>
                            <Table.Th className='text-center'>Kategori</Table.Th>
                            <Table.Th className='text-center'>Satuan</Table.Th>
                            <Table.Th className='text-right'>Harga Beli</Table.Th>
                            <Table.Th className='text-right'>Harga Jual</Table.Th>
                            <Table.Th className='w-24 text-center'>Aksi</Table.Th>
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
                                        <div className='flex items-center gap-3'>
                                            <div className='w-10 h-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0'>
                                                <img
                                                    src={product.image || '/assets/photo/auth.jpg'}
                                                    alt={product.title}
                                                    className='w-full h-full object-cover'
                                                    onError={(e) => { e.target.src = '/assets/photo/auth.jpg' }}
                                                />
                                            </div>
                                            <div>
                                                <p className='font-medium text-gray-900 dark:text-white'>{product.title}</p>
                                                <p className='text-xs text-gray-500 dark:text-gray-400'>{product.barcode}</p>
                                            </div>
                                        </div>
                                    </Table.Td>
                                    <Table.Td className='text-center'>
                                        <span className='inline-flex px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'>
                                            {product.category?.name || '-'}
                                        </span>
                                    </Table.Td>
                                    <Table.Td className='text-center'>
                                        <span className='inline-flex px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'>
                                            {product.unit || 'pcs'}
                                        </span>
                                    </Table.Td>
                                    <Table.Td className='text-right font-medium text-gray-600 dark:text-gray-400'>
                                        {formatCurrency(product.buy_price)}
                                    </Table.Td>
                                    <Table.Td className='text-right font-semibold text-gray-900 dark:text-white'>
                                        {formatCurrency(product.sell_price)}
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex justify-center gap-1'>
                                            <Button
                                                type={'edit'}
                                                icon={<IconPencilCog size={14} strokeWidth={1.5} />}
                                                className={'border bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-900'}
                                                href={route('products.edit', product.id)}
                                            />
                                            <Button
                                                type={'delete'}
                                                icon={<IconTrash size={14} strokeWidth={1.5} />}
                                                className={'border bg-red-50 border-red-200 text-red-600 hover:bg-red-100 dark:bg-red-950 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900'}
                                                url={route('products.destroy', product.id)}
                                            />
                                        </div>
                                    </Table.Td>
                                </tr>
                            )) :
                            <Table.Empty colSpan={7} message={
                                <>
                                    <div className='flex justify-center items-center text-center mb-2'>
                                        <IconDatabaseOff size={48} strokeWidth={1} className='text-gray-300 dark:text-gray-600' />
                                    </div>
                                    <span className='text-gray-500 dark:text-gray-400'>Data produk tidak ditemukan</span>
                                </>
                            } />
                        }
                    </Table.Tbody>
                </Table>
            </Table.Card>
        </>
    )
}

Index.layout = page => <DashboardLayout children={page} />
