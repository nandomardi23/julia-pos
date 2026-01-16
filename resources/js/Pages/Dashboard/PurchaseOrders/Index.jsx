import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, Link, router } from '@inertiajs/react'
import Button from '@/Components/Common/Button'
import { IconCirclePlus, IconDatabaseOff, IconEye, IconPencilCog, IconTrash, IconPackageImport, IconFilter, IconFileTypePdf } from '@tabler/icons-react'
import Search from '@/Components/Common/Search'
import Table from '@/Components/Common/Table'

export default function Index({ purchaseOrders, filters, statuses }) {
    // Status badge colors
    const getStatusColor = (status) => {
        const colors = {
            draft: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
            sent: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
            confirmed: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
            shipped: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
            partial: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
            received: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
            cancelled: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
        }
        return colors[status] || colors.draft
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
        })
    }

    // Filter by status
    const handleStatusFilter = (status) => {
        router.get(route('purchase-orders.index'), { status, search: filters.search }, { preserveState: true })
    }

    return (
        <>
            <Head title='Purchase Orders' />

            {/* Header Actions */}
            <div className='mb-4'>
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-3'>
                    <Button
                        type={'link'}
                        icon={<IconCirclePlus size={20} strokeWidth={1.5} />}
                        className={'border bg-white text-gray-700 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200'}
                        label={'Buat PO Baru'}
                        href={route('purchase-orders.create')}
                    />
                    <div className='w-full md:w-4/12'>
                        <Search
                            url={route('purchase-orders.index')}
                            placeholder='Cari PO atau supplier...'
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
                title={'Daftar Purchase Order'}
                links={purchaseOrders.links}
                meta={{
                    from: purchaseOrders.from,
                    to: purchaseOrders.to,
                    total: purchaseOrders.total,
                    per_page: purchaseOrders.per_page
                }}
                url={route('purchase-orders.index')}
            >
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className='w-10'>No</Table.Th>
                            <Table.Th>No. PO</Table.Th>
                            <Table.Th>Supplier</Table.Th>
                            <Table.Th>Gudang</Table.Th>
                            <Table.Th className='text-center'>Items</Table.Th>
                            <Table.Th className='text-right'>Total</Table.Th>
                            <Table.Th className='text-center'>Tgl Order</Table.Th>
                            <Table.Th className='text-center'>Status</Table.Th>
                            <Table.Th className='w-32 text-center'>Aksi</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {purchaseOrders.data.length ?
                            purchaseOrders.data.map((po, i) => (
                                <tr className='hover:bg-gray-100 dark:hover:bg-gray-900' key={po.id}>
                                    <Table.Td className='text-center'>
                                        {++i + (purchaseOrders.current_page - 1) * purchaseOrders.per_page}
                                    </Table.Td>
                                    <Table.Td>
                                        <Link
                                            href={route('purchase-orders.show', po.id)}
                                            className='font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'
                                        >
                                            {po.po_number}
                                        </Link>
                                    </Table.Td>
                                    <Table.Td>{po.supplier?.name || '-'}</Table.Td>
                                    <Table.Td>{po.warehouse?.name || '-'}</Table.Td>
                                    <Table.Td className='text-center'>
                                        <span className='bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium dark:bg-gray-700 dark:text-gray-300'>
                                            {po.items_count}
                                        </span>
                                    </Table.Td>
                                    <Table.Td className='text-right font-medium'>
                                        {formatCurrency(po.total_amount)}
                                    </Table.Td>
                                    <Table.Td className='text-center'>
                                        {formatDate(po.order_date)}
                                    </Table.Td>
                                    <Table.Td className='text-center'>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(po.status)}`}>
                                            {statuses[po.status] || po.status}
                                        </span>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex justify-center gap-1'>
                                            <Link
                                                href={route('purchase-orders.show', po.id)}
                                                className='p-1.5 rounded-md text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30'
                                                title='Lihat Detail'
                                            >
                                                <IconEye size={14} strokeWidth={1.5} />
                                            </Link>
                                            <a
                                                href={route('purchase-orders.pdf', po.id)}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='p-1.5 rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30'
                                                title='Download PDF'
                                            >
                                                <IconFileTypePdf size={14} strokeWidth={1.5} />
                                            </a>
                                            {po.status === 'draft' && (
                                                <>
                                                    <Link
                                                        href={route('purchase-orders.edit', po.id)}
                                                        className='p-1.5 rounded-md text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/30'
                                                        title='Edit'
                                                    >
                                                        <IconPencilCog size={14} strokeWidth={1.5} />
                                                    </Link>
                                                    <button
                                                        onClick={() => {
                                                            if (confirm('Apakah Anda yakin ingin menghapus PO ini?')) {
                                                                router.delete(route('purchase-orders.destroy', po.id))
                                                            }
                                                        }}
                                                        className='p-1.5 rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30'
                                                        title='Hapus'
                                                    >
                                                        <IconTrash size={14} strokeWidth={1.5} />
                                                    </button>
                                                </>
                                            )}
                                            {['sent', 'confirmed', 'shipped', 'partial'].includes(po.status) && (
                                                <Link
                                                    href={route('purchase-orders.receive', po.id)}
                                                    className='p-1.5 rounded-md text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/30'
                                                    title='Terima Barang'
                                                >
                                                    <IconPackageImport size={14} strokeWidth={1.5} />
                                                </Link>
                                            )}
                                        </div>
                                    </Table.Td>
                                </tr>
                            )) :
                            <Table.Empty colSpan={9} message={
                                <>
                                    <div className='flex justify-center items-center text-center mb-2'>
                                        <IconDatabaseOff size={24} strokeWidth={1.5} className='text-gray-500 dark:text-white' />
                                    </div>
                                    <span className='text-gray-500'>Data Purchase Order</span> <span className='text-rose-500 underline underline-offset-2'>tidak ditemukan.</span>
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
