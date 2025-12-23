import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, usePage } from '@inertiajs/react'
import Button from '@/Components/Dashboard/Button'
import { IconCirclePlus, IconDatabaseOff, IconEye, IconPencilCog, IconTrash, IconBuildingWarehouse } from '@tabler/icons-react'
import Search from '@/Components/Dashboard/Search'
import Table from '@/Components/Dashboard/Table'

export default function Index({ warehouses, filters }) {
    return (
        <>
            <Head title='Gudang' />
            <div className='mb-2'>
                <div className='flex justify-between items-center gap-2'>
                    <Button
                        type={'link'}
                        icon={<IconCirclePlus size={20} strokeWidth={1.5} />}
                        className={'border bg-white text-gray-700 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200'}
                        label={'Tambah Gudang'}
                        href={route('warehouses.create')}
                    />
                    <div className='w-full md:w-4/12'>
                        <Search
                            url={route('warehouses.index')}
                            placeholder='Cari gudang...'
                        />
                    </div>
                </div>
            </div>
            <Table.Card 
                title={'Data Gudang'}
                links={warehouses.links}
                meta={{
                    from: warehouses.from,
                    to: warehouses.to,
                    total: warehouses.total,
                    per_page: warehouses.per_page
                }}
                url={route('warehouses.index')}
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
                        {warehouses.data.length ?
                            warehouses.data.map((warehouse, i) => (
                                <tr className='hover:bg-gray-100 dark:hover:bg-gray-900' key={i}>
                                    <Table.Td className='text-center'>
                                        {++i + (warehouses.current_page - 1) * warehouses.per_page}
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex items-center gap-2'>
                                            <IconBuildingWarehouse size={18} className='text-gray-400' />
                                            {warehouse.name}
                                        </div>
                                    </Table.Td>
                                    <Table.Td>{warehouse.location || '-'}</Table.Td>
                                    <Table.Td className='text-center'>
                                        <span className='bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium dark:bg-blue-900 dark:text-blue-300'>
                                            {warehouse.products_count || 0}
                                        </span>
                                    </Table.Td>
                                    <Table.Td className='text-center'>
                                        <span className='bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium dark:bg-green-900 dark:text-green-300'>
                                            {warehouse.stocks_sum_quantity || 0}
                                        </span>
                                    </Table.Td>
                                    <Table.Td className='text-center'>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            warehouse.is_active 
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                                                : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                        }`}>
                                            {warehouse.is_active ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex gap-2'>
                                            <Button
                                                type={'link'}
                                                icon={<IconEye size={16} strokeWidth={1.5} />}
                                                className={'border bg-blue-100 border-blue-300 text-blue-500 hover:bg-blue-200 dark:bg-blue-950 dark:border-blue-800 dark:text-gray-300 dark:hover:bg-blue-900'}
                                                href={route('warehouses.show', warehouse.id)}
                                            />
                                            <Button
                                                type={'edit'}
                                                icon={<IconPencilCog size={16} strokeWidth={1.5} />}
                                                className={'border bg-orange-100 border-orange-300 text-orange-500 hover:bg-orange-200 dark:bg-orange-950 dark:border-orange-800 dark:text-gray-300  dark:hover:bg-orange-900'}
                                                href={route('warehouses.edit', warehouse.id)}
                                            />
                                            <Button
                                                type={'delete'}
                                                icon={<IconTrash size={16} strokeWidth={1.5} />}
                                                className={'border bg-rose-100 border-rose-300 text-rose-500 hover:bg-rose-200 dark:bg-rose-950 dark:border-rose-800 dark:text-gray-300  dark:hover:bg-rose-900'}
                                                url={route('warehouses.destroy', warehouse.id)}
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
                                    <span className='text-gray-500'>Data gudang</span> <span className='text-rose-500 underline underline-offset-2'>tidak ditemukan.</span>
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
