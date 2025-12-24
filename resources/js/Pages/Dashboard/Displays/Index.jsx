import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head } from '@inertiajs/react'
import Button from '@/Components/Dashboard/Button'
import { IconCirclePlus, IconDatabaseOff, IconEye, IconPencilCog, IconTrash, IconLayoutList } from '@tabler/icons-react'
import Search from '@/Components/Dashboard/Search'
import Table from '@/Components/Dashboard/Table'

export default function Index({ displays, filters }) {
    return (
        <>
            <Head title='Display' />
            <div className='mb-2'>
                <div className='flex justify-between items-center gap-2'>
                    <Button
                        type={'link'}
                        icon={<IconCirclePlus size={20} strokeWidth={1.5} />}
                        className={'border bg-white text-gray-700 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200'}
                        label={'Tambah Display'}
                        href={route('displays.create')}
                    />
                    <div className='w-full md:w-4/12'>
                        <Search
                            url={route('displays.index')}
                            placeholder='Cari display...'
                        />
                    </div>
                </div>
            </div>
            <Table.Card 
                title={'Data Display'}
                links={displays.links}
                meta={{
                    from: displays.from,
                    to: displays.to,
                    total: displays.total,
                    per_page: displays.per_page
                }}
                url={route('displays.index')}
            >
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className='w-10'>No</Table.Th>
                            <Table.Th>Nama</Table.Th>
                            <Table.Th>Lokasi</Table.Th>
                            <Table.Th className='w-24 text-center'>Produk</Table.Th>
                            <Table.Th className='w-24 text-center'>Total Stok</Table.Th>
                            <Table.Th className='w-20 text-center'>Status</Table.Th>
                            <Table.Th></Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {displays.data.length ?
                            displays.data.map((display, i) => (
                                <tr className='hover:bg-gray-100 dark:hover:bg-gray-900' key={i}>
                                    <Table.Td className='text-center'>
                                        {++i + (displays.current_page - 1) * displays.per_page}
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex items-center gap-2'>
                                            <IconLayoutList size={18} className='text-gray-400' />
                                            {display.name}
                                        </div>
                                    </Table.Td>
                                    <Table.Td>{display.location || '-'}</Table.Td>
                                    <Table.Td className='text-center'>
                                        <span className='bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium dark:bg-blue-900 dark:text-blue-300'>
                                            {display.products_count || 0}
                                        </span>
                                    </Table.Td>
                                    <Table.Td className='text-center'>
                                        <span className='bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium dark:bg-green-900 dark:text-green-300'>
                                            {display.stocks_sum_quantity || 0}
                                        </span>
                                    </Table.Td>
                                    <Table.Td className='text-center'>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            display.is_active 
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                                                : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                        }`}>
                                            {display.is_active ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex gap-1'>
                                            <Button
                                                type={'link'}
                                                icon={<IconEye size={14} strokeWidth={1.5} />}
                                                className={'border bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900'}
                                                href={route('displays.show', display.id)}
                                            />
                                            <Button
                                                type={'edit'}
                                                icon={<IconPencilCog size={14} strokeWidth={1.5} />}
                                                className={'border bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-900'}
                                                href={route('displays.edit', display.id)}
                                            />
                                            <Button
                                                type={'delete'}
                                                icon={<IconTrash size={14} strokeWidth={1.5} />}
                                                className={'border bg-red-50 border-red-200 text-red-600 hover:bg-red-100 dark:bg-red-950 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900'}
                                                url={route('displays.destroy', display.id)}
                                            />
                                        </div>
                                    </Table.Td>
                                </tr>
                            )) :
                            <Table.Empty colSpan={7} message={
                                <>
                                    <div className='flex justify-center items-center text-center mb-2'>
                                        <IconDatabaseOff size={24} strokeWidth={1.5} className='text-gray-500 dark:text-white' />
                                    </div>
                                    <span className='text-gray-500'>Data display</span> <span className='text-rose-500 underline underline-offset-2'>tidak ditemukan.</span>
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
