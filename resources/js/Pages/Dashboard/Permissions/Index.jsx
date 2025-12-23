import Search from '@/Components/Dashboard/Search';
import Table from '@/Components/Dashboard/Table'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, usePage } from '@inertiajs/react'
import { IconDatabaseOff, IconShieldCheck } from '@tabler/icons-react';
import React from 'react'

export default function Index() {
    const { permissions } = usePage().props;

    const getPermissionBadge = (name) => {
        if (name.includes('delete')) return 'bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-300';
        if (name.includes('create')) return 'bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300';
        if (name.includes('update') || name.includes('edit')) return 'bg-amber-50 text-amber-700 dark:bg-amber-900 dark:text-amber-300';
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
    };

    return (
        <>
            <Head title='Hak Akses' />
            <div className='mb-4'>
                <Search
                    url={route('permissions.index')}
                    placeholder='Cari hak akses...'
                />
            </div>
            <Table.Card 
                title={'Data Hak Akses'}
                icon={<IconShieldCheck size={20} strokeWidth={1.5} />}
                links={permissions.links}
                meta={{
                    from: permissions.from,
                    to: permissions.to,
                    total: permissions.total,
                    per_page: permissions.per_page
                }}
                url={route('permissions.index')}
            >
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className='w-16 text-center'>No</Table.Th>
                            <Table.Th>Nama Hak Akses</Table.Th>
                            <Table.Th className='w-40 text-center'>Kategori</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {permissions.data.length ?
                            permissions.data.map((permission, i) => (
                                <tr className='hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors' key={permission.id}>
                                    <Table.Td className='text-center font-medium'>
                                        {++i + (permissions.current_page - 1) * permissions.per_page}
                                    </Table.Td>
                                    <Table.Td>
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getPermissionBadge(permission.name)}`}>
                                            {permission.name}
                                        </span>
                                    </Table.Td>
                                    <Table.Td className='text-center'>
                                        <span className='text-xs text-gray-500 dark:text-gray-400 capitalize'>
                                            {permission.name.split('-')[0]}
                                        </span>
                                    </Table.Td>
                                </tr>
                            )) :
                            <Table.Empty colSpan={3} message={
                                <>
                                    <div className='flex justify-center items-center text-center mb-2'>
                                        <IconDatabaseOff size={48} strokeWidth={1} className='text-gray-300 dark:text-gray-600' />
                                    </div>
                                    <span className='text-gray-500 dark:text-gray-400'>Data hak akses tidak ditemukan</span>
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
