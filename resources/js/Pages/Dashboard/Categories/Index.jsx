import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, usePage } from '@inertiajs/react'
import Button from '@/Components/Common/Button'
import { IconCirclePlus, IconDatabaseOff, IconPencilCog, IconTrash } from '@tabler/icons-react'
import Search from '@/Components/Common/Search'
import Table from '@/Components/Common/Table'

export default function Index({ categories }) {
    const { roles, permissions, errors, } = usePage().props;

    return (
        <>
            <Head title='Kategori' />
            <div className='mb-4'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
                    <Button
                        type={'link'}
                        icon={<IconCirclePlus size={20} strokeWidth={1.5} />}
                        className={'border bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:border-blue-700 dark:hover:bg-blue-700'}
                        label={'Tambah Kategori'}
                        href={route('categories.create')}
                    />
                    <div className='w-full sm:w-80'>
                        <Search
                            url={route('categories.index')}
                            placeholder='Cari kategori...'
                        />
                    </div>
                </div>
            </div>
            <Table.Card 
                title={'Data Kategori'}
                links={categories.links}
                meta={{
                    from: categories.from,
                    to: categories.to,
                    total: categories.total,
                    per_page: categories.per_page
                }}
                url={route('categories.index')}
            >
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className='w-12 text-center'>No</Table.Th>
                            <Table.Th className='w-20'>Gambar</Table.Th>
                            <Table.Th>Nama Kategori</Table.Th>
                            <Table.Th className='w-32 text-center'>Aksi</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {categories.data.length ?
                            categories.data.map((category, i) => (
                                <tr className='hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors' key={category.id}>
                                    <Table.Td className='text-center font-medium'>
                                        {++i + (categories.current_page - 1) * categories.per_page}
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800'>
                                            <img
                                                src={category.image || '/assets/photo/auth.jpg'}
                                                alt={category.name}
                                                className='w-full h-full object-cover'
                                                onError={(e) => { e.target.src = '/assets/photo/auth.jpg' }}
                                            />
                                        </div>
                                    </Table.Td>
                                    <Table.Td>
                                        <span className='font-medium text-gray-900 dark:text-white'>
                                            {category.name}
                                        </span>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex justify-center gap-1'>
                                            <Button
                                                type={'edit'}
                                                icon={<IconPencilCog size={14} strokeWidth={1.5} />}
                                                className={'border bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-900'}
                                                href={route('categories.edit', category.id)}
                                            />
                                            <Button
                                                type={'delete'}
                                                icon={<IconTrash size={14} strokeWidth={1.5} />}
                                                className={'border bg-red-50 border-red-200 text-red-600 hover:bg-red-100 dark:bg-red-950 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900'}
                                                url={route('categories.destroy', category.id)}
                                            />
                                        </div>
                                    </Table.Td>
                                </tr>
                            )) :
                            <Table.Empty colSpan={4} message={
                                <>
                                    <div className='flex justify-center items-center text-center mb-2'>
                                        <IconDatabaseOff size={48} strokeWidth={1} className='text-gray-300 dark:text-gray-600' />
                                    </div>
                                    <span className='text-gray-500 dark:text-gray-400'>Data kategori tidak ditemukan</span>
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
