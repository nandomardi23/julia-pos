import React, { useState } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, router, Link } from '@inertiajs/react'
import Button from '@/Components/Common/Button'
import { IconCirclePlus, IconDatabaseOff, IconPencilCog, IconTrash, IconEye, IconReceipt, IconFilter, IconPhoto } from '@tabler/icons-react'
import Search from '@/Components/Common/Search'
import Table from '@/Components/Common/Table'
import Card from '@/Components/Common/Card'

export default function Index({ expenses, categories, totalExpenses }) {
    const [filters, setFilters] = useState({
        category: new URLSearchParams(window.location.search).get('category') || '',
        start_date: new URLSearchParams(window.location.search).get('start_date') || '',
        end_date: new URLSearchParams(window.location.search).get('end_date') || '',
    })

    const formatCurrency = (value) => new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(value || 0)

    const formatDate = (date) => new Date(date).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })

    const handleFilter = () => {
        const params = new URLSearchParams()
        if (filters.category) params.set('category', filters.category)
        if (filters.start_date) params.set('start_date', filters.start_date)
        if (filters.end_date) params.set('end_date', filters.end_date)
        router.visit(route('expenses.index') + '?' + params.toString())
    }

    const handleResetFilter = () => {
        setFilters({ category: '', start_date: '', end_date: '' })
        router.visit(route('expenses.index'))
    }

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus pengeluaran ini?')) {
            router.delete(route('expenses.destroy', id))
        }
    }

    return (
        <>
            <Head title="Pengeluaran" />
            
            {/* Summary Card */}
            <div className="mb-6">
                <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-900/10 border border-red-200 dark:border-red-800 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-red-600 dark:text-red-400 font-medium">Total Pengeluaran</p>
                            <p className="text-2xl font-bold text-red-700 dark:text-red-300">{formatCurrency(totalExpenses)}</p>
                        </div>
                        <div className="p-3 bg-red-500 rounded-xl">
                            <IconReceipt size={24} className="text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Section */}
            <Card className="mb-4">
                <div className="flex flex-col md:flex-row gap-3 items-end">
                    <div className="flex-1">
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Kategori</label>
                        <select
                            value={filters.category}
                            onChange={(e) => setFilters({...filters, category: e.target.value})}
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white"
                        >
                            <option value="">Semua Kategori</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Dari Tanggal</label>
                        <input
                            type="date"
                            value={filters.start_date}
                            onChange={(e) => setFilters({...filters, start_date: e.target.value})}
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Sampai Tanggal</label>
                        <input
                            type="date"
                            value={filters.end_date}
                            onChange={(e) => setFilters({...filters, end_date: e.target.value})}
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleFilter}
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1"
                        >
                            <IconFilter size={16} /> Filter
                        </button>
                        <button
                            onClick={handleResetFilter}
                            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </Card>

            <div className='mb-4'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
                    <Button
                        type={'link'}
                        icon={<IconCirclePlus size={20} strokeWidth={1.5} />}
                        className={'border bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:border-blue-700 dark:hover:bg-blue-700'}
                        label={'Tambah Pengeluaran'}
                        href={route('expenses.create')}
                    />
                    <div className='w-full sm:w-80'>
                        <Search
                            url={route('expenses.index')}
                            placeholder={'Cari pengeluaran...'}
                        />
                    </div>
                </div>
            </div>

            <Table.Card 
                title="Data Pengeluaran"
                links={expenses.links}
                meta={{
                    from: expenses.from,
                    to: expenses.to,
                    total: expenses.total,
                    per_page: expenses.per_page
                }}
                url={route('expenses.index')}
            >
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className='w-12 text-center'>No</Table.Th>
                            <Table.Th>Tanggal</Table.Th>
                            <Table.Th>Kategori</Table.Th>
                            <Table.Th>Deskripsi</Table.Th>
                            <Table.Th className='text-right'>Jumlah</Table.Th>
                            <Table.Th className='text-center'>Bukti</Table.Th>
                            <Table.Th className='w-24 text-center'>Aksi</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {expenses.data.length ?
                            expenses.data.map((expense, i) => (
                                <tr className='hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors' key={expense.id}>
                                    <Table.Td className='text-center font-medium'>
                                        {++i + (expenses.current_page - 1) * expenses.per_page}
                                    </Table.Td>
                                    <Table.Td className='font-medium text-gray-900 dark:text-white'>
                                        {formatDate(expense.expense_date)}
                                    </Table.Td>
                                    <Table.Td>
                                        <span className='inline-flex px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'>
                                            {expense.category?.name || '-'}
                                        </span>
                                    </Table.Td>
                                    <Table.Td className='text-gray-600 dark:text-gray-400 max-w-xs truncate'>
                                        {expense.description || '-'}
                                    </Table.Td>
                                    <Table.Td className='text-right font-semibold text-red-600 dark:text-red-400'>
                                        {formatCurrency(expense.amount)}
                                    </Table.Td>
                                    <Table.Td className='text-center'>
                                        {expense.proof_image ? (
                                            <a
                                                href={`/storage/expenses/${expense.proof_image}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                            >
                                                <IconPhoto size={16} /> Lihat
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex justify-center gap-1'>
                                            <Link
                                                href={route('expenses.edit', expense.id)}
                                                className='p-1.5 rounded-md text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/30'
                                                title='Edit'
                                            >
                                                <IconPencilCog size={14} strokeWidth={1.5} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(expense.id)}
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
                                        <IconDatabaseOff size={48} strokeWidth={1} className='text-gray-300 dark:text-gray-600' />
                                    </div>
                                    <span className='text-gray-500 dark:text-gray-400'>Belum ada data pengeluaran</span>
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
