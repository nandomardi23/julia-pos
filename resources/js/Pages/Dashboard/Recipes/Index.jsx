import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, router, Link } from '@inertiajs/react'
import Button from '@/Components/Common/Button'
import { IconCirclePlus, IconDatabaseOff, IconPencilCog, IconTrash, IconEye } from '@tabler/icons-react'
import Search from '@/Components/Common/Search'
import Table from '@/Components/Common/Table'

export default function Index({ recipes }) {
    const formatCurrency = (value) => new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(value || 0);

    return (
        <>
            <Head title="Resep" />
            <div className='mb-4'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
                    <Button
                        type={'link'}
                        icon={<IconCirclePlus size={20} strokeWidth={1.5} />}
                        className={'border bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:border-blue-700 dark:hover:bg-blue-700'}
                        label={'Tambah Resep'}
                        href={route('recipes.create')}
                    />
                    <div className='w-full sm:w-80'>
                        <Search
                            url={route('recipes.index')}
                            placeholder={'Cari resep...'}
                        />
                    </div>
                </div>
            </div>
            <Table.Card 
                title="Data Resep"
                links={recipes.links}
                meta={{
                    from: recipes.from,
                    to: recipes.to,
                    total: recipes.total,
                    per_page: recipes.per_page
                }}
                url={route('recipes.index')}
            >
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className='w-12 text-center'>No</Table.Th>
                            <Table.Th>Resep</Table.Th>
                            <Table.Th className='text-center'>Kategori</Table.Th>
                            <Table.Th className='text-center'>Variant</Table.Th>
                            <Table.Th className='text-right'>Harga Jual</Table.Th>
                            <Table.Th className='w-24 text-center'>Aksi</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {recipes.data.length ?
                            recipes.data.map((recipe, i) => (
                                <tr className='hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors' key={recipe.id}>
                                    <Table.Td className='text-center font-medium'>
                                        {++i + (recipes.current_page - 1) * recipes.per_page}
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex items-center gap-3'>
                                            <div className='w-10 h-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0'>
                                                <img
                                                    src={recipe.image || '/assets/photo/auth.jpg'}
                                                    alt={recipe.title}
                                                    className='w-full h-full object-cover'
                                                    onError={(e) => { e.target.src = '/assets/photo/auth.jpg' }}
                                                />
                                            </div>
                                            <div>
                                                <p className='font-medium text-gray-900 dark:text-white'>{recipe.title}</p>
                                                <p className='text-xs text-gray-500 dark:text-gray-400'>{recipe.barcode}</p>
                                            </div>
                                        </div>
                                    </Table.Td>
                                    <Table.Td className='text-center'>
                                        <span className='inline-flex px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'>
                                            {recipe.category?.name || '-'}
                                        </span>
                                    </Table.Td>
                                    <Table.Td className='text-center'>
                                        <div className='flex flex-wrap justify-center gap-1'>
                                            {recipe.variants?.length > 0 ? (
                                                recipe.variants.map(v => (
                                                    <span key={v.id} className='inline-flex px-2 py-0.5 rounded text-xs font-medium bg-orange-50 text-orange-700 dark:bg-orange-900 dark:text-orange-300'>
                                                        {v.name}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className='text-gray-400'>-</span>
                                            )}
                                        </div>
                                    </Table.Td>
                                    <Table.Td className='text-right font-semibold text-gray-900 dark:text-white'>
                                        {formatCurrency(recipe.sell_price)}
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex justify-center gap-1'>
                                            <Link
                                                href={route('products.show', recipe.id)}
                                                className='p-1.5 rounded-md text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30'
                                                title='Lihat Detail'
                                            >
                                                <IconEye size={14} strokeWidth={1.5} />
                                            </Link>
                                            <Link
                                                href={route('recipes.edit', recipe.id)}
                                                className='p-1.5 rounded-md text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/30'
                                                title='Edit'
                                            >
                                                <IconPencilCog size={14} strokeWidth={1.5} />
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (confirm('Apakah Anda yakin ingin menghapus resep ini?')) {
                                                        router.delete(route('recipes.destroy', recipe.id))
                                                    }
                                                }}
                                                className='p-1.5 rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30'
                                                title='Hapus'
                                            >
                                                <IconTrash size={14} strokeWidth={1.5} />
                                            </button>
                                        </div>
                                    </Table.Td>
                                </tr>
                            )) :
                            <Table.Empty colSpan={6} message={
                                <>
                                    <div className='flex justify-center items-center text-center mb-2'>
                                        <IconDatabaseOff size={48} strokeWidth={1} className='text-gray-300 dark:text-gray-600' />
                                    </div>
                                    <span className='text-gray-500 dark:text-gray-400'>Data resep tidak ditemukan</span>
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
