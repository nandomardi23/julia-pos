import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, router } from '@inertiajs/react'
import { IconLayoutList, IconBox, IconShoppingCart, IconArrowLeft } from '@tabler/icons-react'
import Card from '@/Components/Common/Card'
import Table from '@/Components/Common/Table'
import Button from '@/Components/Common/Button'
import Search from '@/Components/Common/Search'

export default function Show({ display, stocks, filters }) {
    return (
        <>
            <Head title={`Display: ${display.name}`} />
            <div className='mb-4'>
                <Button
                    type={'button'}
                    label={'Kembali'}
                    icon={<IconArrowLeft size={20} strokeWidth={1.5} />}
                    className={'border bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700'}
                    onClick={() => router.visit(route('displays.index'))}
                />
            </div>

            <div className='grid grid-cols-12 gap-4'>
                {/* Display Info */}
                <div className='col-span-12 md:col-span-4'>
                    <Card title={'Informasi Display'} icon={<IconLayoutList size={20} strokeWidth={1.5} />}>
                        <div className='space-y-3'>
                            <div>
                                <span className='text-sm text-gray-500 dark:text-gray-400'>Nama</span>
                                <p className='font-medium text-gray-900 dark:text-white'>{display.name}</p>
                            </div>
                            {display.location && (
                                <div>
                                    <span className='text-sm text-gray-500 dark:text-gray-400'>Lokasi</span>
                                    <p className='font-medium text-gray-900 dark:text-white'>{display.location}</p>
                                </div>
                            )}
                            {display.description && (
                                <div>
                                    <span className='text-sm text-gray-500 dark:text-gray-400'>Keterangan</span>
                                    <p className='font-medium text-gray-900 dark:text-white'>{display.description}</p>
                                </div>
                            )}
                            <div>
                                <span className='text-sm text-gray-500 dark:text-gray-400'>Status</span>
                                <p>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${display.is_active
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                        }`}>
                                        {display.is_active ? 'Aktif' : 'Nonaktif'}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className='mt-4 pt-4 border-t dark:border-gray-700'>
                            <Button
                                type={'link'}
                                icon={<IconShoppingCart size={18} strokeWidth={1.5} />}
                                className={'w-full border bg-green-500 text-white hover:bg-green-600'}
                                label={'Buka POS'}
                                href={route('pos.index')}
                            />
                        </div>
                    </Card>
                </div>

                {/* Stock List */}
                <div className='col-span-12 md:col-span-8'>
                    <div className='mb-2'>
                        <Search
                            url={route('displays.show', display.id)}
                            placeholder='Cari produk di display ini...'
                        />
                    </div>
                    <Table.Card
                        title={'Stok di Display (Tersedia untuk Dijual)'}
                        links={stocks.links}
                        meta={{
                            from: stocks.from,
                            to: stocks.to,
                            total: stocks.total,
                            per_page: stocks.per_page
                        }}
                        url={route('displays.show', display.id)}
                    >
                        <Table>
                            <Table.Thead>
                                <tr>
                                    <Table.Th>Produk</Table.Th>
                                    <Table.Th>Barcode</Table.Th>
                                    <Table.Th>Kategori</Table.Th>
                                    <Table.Th>Harga Jual</Table.Th>
                                    <Table.Th className='text-center'>Stok Gudang</Table.Th>
                                    <Table.Th className='text-center'>Stok Display</Table.Th>
                                </tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {stocks.data && stocks.data.length > 0 ? (
                                    stocks.data.map((stock, i) => (
                                        <tr className='hover:bg-gray-100 dark:hover:bg-gray-900' key={i}>
                                            <Table.Td>
                                                <div className='flex items-center gap-2'>
                                                    <IconBox size={16} className='text-gray-400' />
                                                    {stock.product?.title}
                                                </div>
                                            </Table.Td>
                                            <Table.Td>{stock.product?.barcode}</Table.Td>
                                            <Table.Td>{stock.product?.category?.name || '-'}</Table.Td>
                                            <Table.Td>Rp {parseInt(stock.product?.sell_price || 0).toLocaleString('id-ID')}</Table.Td>
                                            <Table.Td className='text-center'>
                                                <span className='bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium dark:bg-gray-800 dark:text-gray-300'>
                                                    {stock.product?.warehouse_stocks_sum_quantity || 0}
                                                </span>
                                            </Table.Td>
                                            <Table.Td className='text-center'>
                                                <span className='bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium dark:bg-green-900 dark:text-green-300'>
                                                    {stock.quantity}
                                                </span>
                                            </Table.Td>
                                        </tr>
                                    ))
                                ) : (
                                    <Table.Empty colSpan={6} message="Belum ada stok di display ini. Transfer stok dari gudang terlebih dahulu." />
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
