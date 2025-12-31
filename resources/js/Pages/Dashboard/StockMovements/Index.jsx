import React, { useState } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, router } from '@inertiajs/react'
import { IconDatabaseOff, IconArrowsExchange, IconCirclePlus, IconMinus, IconTrash, IconFileSpreadsheet } from '@tabler/icons-react'
import Table from '@/Components/Common/Table'
import Button from '@/Components/Common/Button'
import Input from '@/Components/Common/Input'
import Select from '@/Components/Common/Select'
import toast from 'react-hot-toast'

export default function Index({ movements, filters }) {
    const [filterData, setFilterData] = useState({
        product: filters.product || '',
        type: filters.type || '',
        start_date: filters.start_date || '',
        end_date: filters.end_date || ''
    })
    const handleExport = () => {
        const params = new URLSearchParams(filterData).toString();
        window.open(route("stock-movements.export") + "?" + params, "_blank");
    }

    const handleExportStockReport = () => {
        window.open(route("stock-movements.exportStockReport"), "_blank");
    }

    const resetFilters = () => {
        router.get(route('stock-movements.index'), filterData, {
            preserveState: true
        })
    }

    const handleFilter = () => {
        router.get(route('stock-movements.index'), filterData, {
            preserveState: true
        })
    }

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus pergerakan stok ini? Stok akan dikembalikan ke posisi sebelumnya.')) {
            router.delete(route('stock-movements.destroy', id), {
                onSuccess: () => {
                    toast.success('Pergerakan stok berhasil dihapus')
                },
                onError: () => {
                    toast.error('Gagal menghapus pergerakan stok')
                }
            })
        }
    }

    const getTypeLabel = (movement) => {
        if (movement.to_type === 'warehouse') return { label: 'Barang Masuk', color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' }
        if (movement.from_type === 'warehouse' && movement.to_type === 'display') return { label: 'Transfer', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' }
        if (movement.to_type === 'transaction') return { label: 'Penjualan', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' }
        if (movement.to_type === 'out') return { label: 'Barang Keluar', color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' }
        return { label: 'Lainnya', color: 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300' }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('id-ID', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <>
            <Head title='Riwayat Stok' />
            
            {/* Action Buttons */}
            <div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
                <div className='flex flex-wrap gap-2'>
                    <Button
                        type={'link'}
                        icon={<IconCirclePlus size={18} strokeWidth={1.5} />}
                        className={'border bg-green-500 text-white hover:bg-green-600'}
                        label={'Barang Masuk'}
                        href={route('stock-movements.create')}
                    />
                    <Button
                        type={'link'}
                        icon={<IconMinus size={18} strokeWidth={1.5} />}
                        className={'border bg-red-500 text-white hover:bg-red-600'}
                        label={'Barang Keluar'}
                        href={route('stock-movements.stockOut')}
                    />
                    <Button
                        type={'link'}
                        icon={<IconArrowsExchange size={18} strokeWidth={1.5} />}
                        className={'border bg-blue-500 text-white hover:bg-blue-600'}
                        label={'Transfer Stok'}
                        href={route('stock-movements.transfer')}
                    />
                </div>
                <div className='flex flex-wrap gap-2'>
                    <Button
                        type={'button'}
                        label={'Export Laporan Stok'}
                        icon={<IconFileSpreadsheet size={18} />}
                        className={'border bg-indigo-600 text-white hover:bg-indigo-700'}
                        onClick={handleExportStockReport}
                    />
                    <Button
                        type={'button'}
                        label={'Export Riwayat'}
                        icon={<IconFileSpreadsheet size={18} />}
                        className={'border bg-emerald-600 text-white hover:bg-emerald-700'}
                        onClick={handleExport}
                    />
                </div>
            </div>

            {/* Filters */}
            <div className='bg-white dark:bg-gray-900 p-4 rounded-lg border dark:border-gray-800 mb-4'>
                <div className='flex flex-wrap items-end gap-4'>
                    <div className='flex-1 min-w-[200px]'>
                        <Input
                            name='product'
                            label='Produk'
                            type='text'
                            placeholder='Cari produk...'
                            value={filterData.product}
                            onChange={e => setFilterData({...filterData, product: e.target.value})}
                        />
                    </div>
                    <div className='w-40'>
                        <Select
                            label="Tipe"
                            value={filterData.type}
                            onChange={e => setFilterData({...filterData, type: e.target.value})}
                        >
                            <option value="">Semua</option>
                            <option value="in">Barang Masuk</option>
                            <option value="transfer">Transfer</option>
                            <option value="sale">Penjualan</option>
                            <option value="stockout">Barang Keluar</option>
                        </Select>
                    </div>
                    <div className='w-40'>
                        <Input
                            name='start_date'
                            label='Dari Tanggal'
                            type='date'
                            value={filterData.start_date}
                            onChange={e => setFilterData({...filterData, start_date: e.target.value})}
                        />
                    </div>
                    <div className='w-40'>
                        <Input
                            name='end_date'
                            label='Sampai Tanggal'
                            type='date'
                            value={filterData.end_date}
                            onChange={e => setFilterData({...filterData, end_date: e.target.value})}
                        />
                    </div>
                    <Button
                        type={'button'}
                        label={'Filter'}
                        className={'border bg-gray-700 text-white hover:bg-gray-800'}
                        onClick={handleFilter}
                    />
                </div>
            </div>

            <Table.Card 
                title={'Riwayat Pergerakan Stok'}
                links={movements.links}
                meta={{
                    from: movements.from,
                    to: movements.to,
                    total: movements.total,
                    per_page: movements.per_page
                }}
                url={route('stock-movements.index')}
            >
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className='w-40'>Tanggal</Table.Th>
                            <Table.Th>Produk</Table.Th>
                            <Table.Th className='w-24'>Tipe</Table.Th>
                            <Table.Th>Dari</Table.Th>
                            <Table.Th>Ke</Table.Th>
                            <Table.Th className='w-20 text-center'>Qty</Table.Th>
                            <Table.Th className='w-28 text-right'>Harga Beli</Table.Th>
                            <Table.Th className='w-28 text-right'>Kerugian</Table.Th>
                            <Table.Th>User</Table.Th>
                            <Table.Th className='w-16 text-center'>Aksi</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {movements.data.length ?
                            movements.data.map((movement, i) => {
                                const typeInfo = getTypeLabel(movement)
                                return (
                                    <tr className='hover:bg-gray-100 dark:hover:bg-gray-900' key={i}>
                                        <Table.Td className='text-sm'>
                                            {formatDate(movement.created_at)}
                                        </Table.Td>
                                        <Table.Td>{movement.product?.title}</Table.Td>
                                        <Table.Td>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
                                                {typeInfo.label}
                                            </span>
                                        </Table.Td>
                                        <Table.Td className='text-sm text-gray-600 dark:text-gray-400'>
                                            {movement.from_type === 'supplier' 
                                                ? (movement.supplier?.name || 'Supplier')
                                                : movement.from_type
                                            }
                                        </Table.Td>
                                        <Table.Td className='text-sm text-gray-600 dark:text-gray-400'>
                                            {movement.to_type === 'out' ? 'Keluar' : movement.to_type}
                                        </Table.Td>
                                        <Table.Td className='text-center'>
                                            <span className='bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium dark:bg-gray-800 dark:text-gray-300'>
                                                {movement.quantity}
                                            </span>
                                        </Table.Td>
                                        <Table.Td className='text-sm text-right'>
                                            {movement.purchase_price 
                                                ? `Rp ${new Intl.NumberFormat('id-ID').format(movement.purchase_price)}`
                                                : '-'
                                            }
                                        </Table.Td>
                                        <Table.Td className='text-sm text-right'>
                                            {movement.loss_amount 
                                                ? <span className='text-red-600 font-medium'>Rp {new Intl.NumberFormat('id-ID').format(movement.loss_amount)}</span>
                                                : '-'
                                            }
                                        </Table.Td>
                                        <Table.Td className='text-sm'>{movement.user?.name}</Table.Td>
                                        <Table.Td>
                                            {movement.to_type !== 'transaction' && (
                                                <div className='flex items-center justify-center'>
                                                    <button
                                                        onClick={() => handleDelete(movement.id)}
                                                        className='p-1.5 rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30'
                                                        title='Hapus'
                                                    >
                                                        <IconTrash size={14} />
                                                    </button>
                                                </div>
                                            )}
                                        </Table.Td>
                                    </tr>
                                )
                            }) :
                            <Table.Empty colSpan={10} message={
                                <>
                                    <div className='flex justify-center items-center text-center mb-2'>
                                        <IconDatabaseOff size={24} strokeWidth={1.5} className='text-gray-500 dark:text-white' />
                                    </div>
                                    <span className='text-gray-500'>Belum ada riwayat pergerakan stok</span>
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
