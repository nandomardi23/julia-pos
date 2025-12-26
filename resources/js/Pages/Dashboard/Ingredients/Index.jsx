import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, router } from '@inertiajs/react'
import Button from '@/Components/Common/Button'
import { IconCirclePlus, IconDatabaseOff, IconPencilCog, IconTrash, IconEye } from '@tabler/icons-react'
import Search from '@/Components/Common/Search'
import Table from '@/Components/Common/Table'

export default function Index({ ingredients }) {
    const formatCurrency = (value) => new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(value || 0);

    return (
        <>
            <Head title="Bahan Baku" />
            <div className='mb-4'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
                    <Button
                        type={'link'}
                        icon={<IconCirclePlus size={20} strokeWidth={1.5} />}
                        className={'border bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:border-green-700 dark:hover:bg-green-700'}
                        label={'Tambah Bahan Baku'}
                        href={route('ingredients.create')}
                    />
                    <div className='w-full sm:w-80'>
                        <Search
                            url={route('ingredients.index')}
                            placeholder={'Cari bahan baku...'}
                        />
                    </div>
                </div>
            </div>
            <Table.Card 
                title="Data Bahan Baku"
                links={ingredients.links}
                meta={{
                    from: ingredients.from,
                    to: ingredients.to,
                    total: ingredients.total,
                    per_page: ingredients.per_page
                }}
                url={route('ingredients.index')}
            >
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className='w-12 text-center'>No</Table.Th>
                            <Table.Th>Bahan Baku</Table.Th>
                            <Table.Th className='text-center'>Kategori</Table.Th>
                            <Table.Th className='text-center'>Satuan</Table.Th>
                            <Table.Th className='text-right'>Harga Beli</Table.Th>
                            <Table.Th className='text-right'>Harga Jual</Table.Th>
                            <Table.Th className='w-24 text-center'>Aksi</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {ingredients.data.length ?
                            ingredients.data.map((ingredient, i) => (
                                <tr className='hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors' key={ingredient.id}>
                                    <Table.Td className='text-center font-medium'>
                                        {++i + (ingredients.current_page - 1) * ingredients.per_page}
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex items-center gap-3'>
                                            <div className='w-10 h-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0'>
                                                <img
                                                    src={ingredient.image || '/assets/photo/auth.jpg'}
                                                    alt={ingredient.title}
                                                    className='w-full h-full object-cover'
                                                    onError={(e) => { e.target.src = '/assets/photo/auth.jpg' }}
                                                />
                                            </div>
                                            <div>
                                                <p className='font-medium text-gray-900 dark:text-white'>{ingredient.title}</p>
                                                <p className='text-xs text-gray-500 dark:text-gray-400'>{ingredient.barcode}</p>
                                            </div>
                                        </div>
                                    </Table.Td>
                                    <Table.Td className='text-center'>
                                        <span className='inline-flex px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'>
                                            {ingredient.category?.name || '-'}
                                        </span>
                                    </Table.Td>
                                    <Table.Td className='text-center'>
                                        <span className='inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300'>
                                            {ingredient.unit || 'pcs'}
                                        </span>
                                    </Table.Td>
                                    <Table.Td className='text-right font-medium text-gray-600 dark:text-gray-400'>
                                        {formatCurrency(ingredient.buy_price)}
                                    </Table.Td>
                                    <Table.Td className='text-right font-semibold text-gray-900 dark:text-white'>
                                        {formatCurrency(ingredient.sell_price)}
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex justify-center gap-1'>
                                            <Button
                                                type={'modal'}
                                                icon={<IconEye size={14} strokeWidth={1.5} />}
                                                className={'border bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900'}
                                                onClick={() => router.visit(route('products.show', ingredient.id))}
                                            />
                                            <Button
                                                type={'edit'}
                                                icon={<IconPencilCog size={14} strokeWidth={1.5} />}
                                                className={'border bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-900'}
                                                href={route('ingredients.edit', ingredient.id)}
                                            />
                                            <Button
                                                type={'delete'}
                                                icon={<IconTrash size={14} strokeWidth={1.5} />}
                                                className={'border bg-red-50 border-red-200 text-red-600 hover:bg-red-100 dark:bg-red-950 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900'}
                                                url={route('ingredients.destroy', ingredient.id)}
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
                                    <span className='text-gray-500 dark:text-gray-400'>Data bahan baku tidak ditemukan</span>
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
