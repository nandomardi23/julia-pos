import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, Link, router } from '@inertiajs/react'
import Button from '@/Components/Common/Button'
import { IconCirclePlus, IconDatabaseOff, IconEye, IconFilter } from '@tabler/icons-react'
import Search from '@/Components/Common/Search'
import Table from '@/Components/Common/Table'

export default function Index({ returns, filters, statuses }) {
    // Status badge colors
    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
            approved: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
            rejected: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
            completed: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
        }
        return colors[status] || colors.pending
    }

    // Format currency
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value || 0)
    }

    // Format date
    const formatDate = (date) => {
        if (!date) return '-'
        return new Date(date).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    // Filter by status
    const handleStatusFilter = (status) => {
        router.get(route('returns.index'), { status, search: filters.search }, { preserveState: true })
    }

    return (
        <>
            <Head title='Return / Refund' />

            {/* Header Actions */}
            <div className='mb-4'>
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-3'>
                    <Button
                        type={'link'}
                        icon={<IconCirclePlus size={20} strokeWidth={1.5} />}
                        className={'border bg-white text-gray-700 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200'}
                        label={'Buat Return'}
                        href={route('returns.create')}
                    />
                    <div className='w-full md:w-4/12'>
                        <Search
                            url={route('returns.index')}
                            placeholder='Cari nomor return atau invoice...'
                        />
                    </div>
                </div>
            </div>

            {/* Status Filter Tabs */}
            <div className='mb-4 flex flex-wrap gap-2'>
                <button
                    onClick={() => handleStatusFilter('all')}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${!filters.status || filters.status === 'all'
                        ? 'bg-gray-800 text-white dark:bg-white dark:text-gray-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                        }`}
                >
                    Semua
                </button>
                {Object.entries(statuses).map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => handleStatusFilter(key)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${filters.status === key
                            ? 'bg-gray-800 text-white dark:bg-white dark:text-gray-800'
                            : `${getStatusColor(key)} hover:opacity-80`
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Table */}
            <Table.Card
                title={'Daftar Return / Refund'}
                links={returns.links}
                meta={{
                    from: returns.from,
                    to: returns.to,
                    total: returns.total,
                    per_page: returns.per_page
                }}
                url={route('returns.index')}
            >
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className='w-10'>No</Table.Th>
                            <Table.Th>No. Return</Table.Th>
                            <Table.Th>Invoice Asli</Table.Th>
                            <Table.Th className='text-center'>Items</Table.Th>
                            <Table.Th className='text-right'>Nilai Return</Table.Th>
                            <Table.Th className='text-center'>Tanggal</Table.Th>
                            <Table.Th className='text-center'>Status</Table.Th>
                            <Table.Th className='w-20 text-center'>Aksi</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {returns.data.length ?
                            returns.data.map((ret, i) => (
                                <tr className='hover:bg-gray-100 dark:hover:bg-gray-900' key={ret.id}>
                                    <Table.Td className='text-center'>
                                        {++i + (returns.current_page - 1) * returns.per_page}
                                    </Table.Td>
                                    <Table.Td>
                                        <Link
                                            href={route('returns.show', ret.id)}
                                            className='font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'
                                        >
                                            {ret.return_number}
                                        </Link>
                                    </Table.Td>
                                    <Table.Td>
                                        <Link
                                            href={route('transactions.show', ret.transaction?.invoice)}
                                            className='text-gray-600 hover:text-gray-800 dark:text-gray-400'
                                        >
                                            {ret.transaction?.invoice || '-'}
                                        </Link>
                                    </Table.Td>
                                    <Table.Td className='text-center'>
                                        <span className='bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium dark:bg-gray-700 dark:text-gray-300'>
                                            {ret.items_count}
                                        </span>
                                    </Table.Td>
                                    <Table.Td className='text-right font-medium'>
                                        {formatCurrency(ret.return_amount)}
                                    </Table.Td>
                                    <Table.Td className='text-center text-sm'>
                                        {formatDate(ret.created_at)}
                                    </Table.Td>
                                    <Table.Td className='text-center'>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ret.status)}`}>
                                            {statuses[ret.status] || ret.status}
                                        </span>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex justify-center gap-1'>
                                            <Link
                                                href={route('returns.show', ret.id)}
                                                className='p-1.5 rounded-md text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30'
                                                title='Lihat Detail'
                                            >
                                                <IconEye size={14} strokeWidth={1.5} />
                                            </Link>
                                        </div>
                                    </Table.Td>
                                </tr>
                            )) :
                            <Table.Empty colSpan={8} message={
                                <>
                                    <div className='flex justify-center items-center text-center mb-2'>
                                        <IconDatabaseOff size={24} strokeWidth={1.5} className='text-gray-500 dark:text-white' />
                                    </div>
                                    <span className='text-gray-500'>Data Return</span> <span className='text-rose-500 underline underline-offset-2'>tidak ditemukan.</span>
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
