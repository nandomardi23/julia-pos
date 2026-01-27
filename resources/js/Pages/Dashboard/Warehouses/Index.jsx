import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, usePage, Link, router } from '@inertiajs/react'
import Button from '@/Components/Common/Button'
import { IconCirclePlus, IconDatabaseOff, IconEye, IconPencilCog, IconTrash, IconBuildingWarehouse } from '@tabler/icons-react'
import Search from '@/Components/Common/Search'
import Table from '@/Components/Common/Table'

export default function Index({ warehouses, filters }) {
    // Helper for formatting quantity
    const isWeightBasedUnit = (unit) => {
        const weightUnits = ["kg", "gram", "g", "liter", "l", "ml", "ons", "ton"];
        return weightUnits.includes(unit?.toLowerCase());
    };

    const formatQty = (qty, unit) => {
        const numQty = parseFloat(qty);
        if (isWeightBasedUnit(unit) || (numQty % 1 !== 0)) {
            // Allow decimals but strip unnecessary trailing zeros, max 3 places
            return parseFloat(numQty.toFixed(3)).toString();
        }
        return Math.floor(numQty).toString();
    };

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
                                            {formatQty(warehouse.stocks_sum_quantity || 0, 'kg')}
                                        </span>
                                    </Table.Td>
                                    <Table.Td className='text-center'>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${warehouse.is_active
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                            }`}>
                                            {warehouse.is_active ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex justify-center gap-1'>
                                            <Link
                                                href={route('warehouses.show', warehouse.id)}
                                                className='p-1.5 rounded-md text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30'
                                                title='Lihat'
                                            >
                                                <IconEye size={14} strokeWidth={1.5} />
                                            </Link>
                                            <Link
                                                href={route('warehouses.edit', warehouse.id)}
                                                className='p-1.5 rounded-md text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/30'
                                                title='Edit'
                                            >
                                                <IconPencilCog size={14} strokeWidth={1.5} />
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (confirm('Apakah Anda yakin ingin menghapus gudang ini?')) {
                                                        router.delete(route('warehouses.destroy', warehouse.id))
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
