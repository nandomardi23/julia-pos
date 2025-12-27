import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, usePage, Link, router } from '@inertiajs/react'
import Button from '@/Components/Common/Button'
import { IconCirclePlus, IconDatabaseOff, IconEye, IconPencilCog, IconTrash } from '@tabler/icons-react'
import Search from '@/Components/Common/Search'
import Table from '@/Components/Common/Table'

export default function Index({ suppliers, filters }) {
    const { errors } = usePage().props;

    return (
        <>
            <Head title='Supplier' />
            <div className='mb-2'>
                <div className='flex justify-between items-center gap-2'>
                    <Button
                        type={'link'}
                        icon={<IconCirclePlus size={20} strokeWidth={1.5} />}
                        className={'border bg-white text-gray-700 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200'}
                        label={'Tambah Supplier'}
                        href={route('suppliers.create')}
                    />
                    <div className='w-full md:w-4/12'>
                        <Search
                            url={route('suppliers.index')}
                            placeholder='Cari supplier...'
                        />
                    </div>
                </div>
            </div>
            <Table.Card 
                title={'Data Supplier'}
                links={suppliers.links}
                meta={{
                    from: suppliers.from,
                    to: suppliers.to,
                    total: suppliers.total,
                    per_page: suppliers.per_page
                }}
                url={route('suppliers.index')}
            >
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className='w-10'>No</Table.Th>
                            <Table.Th>Nama</Table.Th>
                            <Table.Th>Perusahaan</Table.Th>
                            <Table.Th>Telepon</Table.Th>
                            <Table.Th>Email</Table.Th>
                            <Table.Th className='w-24'>Transaksi</Table.Th>
                            <Table.Th className='w-24 text-center'>Aksi</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {suppliers.data.length ?
                            suppliers.data.map((supplier, i) => (
                                <tr className='hover:bg-gray-100 dark:hover:bg-gray-900' key={i}>
                                    <Table.Td className='text-center'>
                                        {++i + (suppliers.current_page - 1) * suppliers.per_page}
                                    </Table.Td>
                                    <Table.Td>{supplier.name}</Table.Td>
                                    <Table.Td>{supplier.company || '-'}</Table.Td>
                                    <Table.Td>{supplier.phone}</Table.Td>
                                    <Table.Td>{supplier.email || '-'}</Table.Td>
                                    <Table.Td className='text-center'>
                                        <span className='bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium dark:bg-blue-900 dark:text-blue-300'>
                                            {supplier.stock_movements_count}
                                        </span>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex justify-center gap-1'>
                                            <Link
                                                href={route('suppliers.show', supplier.id)}
                                                className='p-1.5 rounded-md text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30'
                                                title='Lihat Detail'
                                            >
                                                <IconEye size={14} strokeWidth={1.5} />
                                            </Link>
                                            <Link
                                                href={route('suppliers.edit', supplier.id)}
                                                className='p-1.5 rounded-md text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/30'
                                                title='Edit'
                                            >
                                                <IconPencilCog size={14} strokeWidth={1.5} />
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (confirm('Apakah Anda yakin ingin menghapus supplier ini?')) {
                                                        router.delete(route('suppliers.destroy', supplier.id))
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
                                    <span className='text-gray-500'>Data supplier</span> <span className='text-rose-500 underline underline-offset-2'>tidak ditemukan.</span>
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
