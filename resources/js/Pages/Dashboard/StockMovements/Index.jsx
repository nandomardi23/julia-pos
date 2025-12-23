import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head } from '@inertiajs/react'
import { IconDatabaseOff, IconArrowsExchange, IconCirclePlus, IconMinus } from '@tabler/icons-react'
import Table from '@/Components/Dashboard/Table'
import Button from '@/Components/Dashboard/Button'
import Input from '@/Components/Dashboard/Input'
import Select from '@/Components/Dashboard/Select'
import { router } from '@inertiajs/react'
import { useState } from 'react'

export default function Index({ movements, filters }) {
    const [filterData, setFilterData] = useState({
        product: filters.product || '',
        type: filters.type || '',
        start_date: filters.start_date || '',
        end_date: filters.end_date || ''
    })

    const handleFilter = () => {
        router.get(route('stock-movements.index'), filterData, {
            preserveState: true
        })
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
            
            <div className='mb-4 flex flex-wrap gap-2'>
                <Button
                    type={'link'}
                    icon={<IconCirclePlus size={20} strokeWidth={1.5} />}
                    className={'border bg-green-500 text-white hover:bg-green-600'}
                    label={'Barang Masuk'}
                    href={route('stock-movements.create')}
                />
                <Button
                    type={'link'}
                    icon={<IconMinus size={20} strokeWidth={1.5} />}
                    className={'border bg-red-500 text-white hover:bg-red-600'}
                    label={'Barang Keluar'}
                    href={route('stock-movements.stockOut')}
                />
                <Button
                    type={'link'}
                    icon={<IconArrowsExchange size={20} strokeWidth={1.5} />}
                    className={'border bg-blue-500 text-white hover:bg-blue-600'}
                    label={'Transfer Stok'}
                    href={route('stock-movements.transfer')}
                />
            </div>

            {/* Filters */}
            <div className='bg-white dark:bg-gray-900 p-4 rounded-lg border dark:border-gray-800 mb-4'>
                <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-3'>
                        <Input
                            name='product'
                            label='Produk'
                            type='text'
                            placeholder='Cari produk...'
                            value={filterData.product}
                            onChange={e => setFilterData({...filterData, product: e.target.value})}
                        />
                    </div>
                    <div className='col-span-2'>
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
                    <div className='col-span-2'>
                        <Input
                            name='start_date'
                            label='Dari Tanggal'
                            type='date'
                            value={filterData.start_date}
                            onChange={e => setFilterData({...filterData, start_date: e.target.value})}
                        />
                    </div>
                    <div className='col-span-2'>
                        <Input
                            name='end_date'
                            label='Sampai Tanggal'
                            type='date'
                            value={filterData.end_date}
                            onChange={e => setFilterData({...filterData, end_date: e.target.value})}
                        />
                    </div>
                    <div className='col-span-3 flex items-end'>
                        <Button
                            type={'button'}
                            label={'Filter'}
                            className={'border bg-gray-700 text-white hover:bg-gray-800'}
                            onClick={handleFilter}
                        />
                    </div>
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
                            <Table.Th>User</Table.Th>
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
                                        <Table.Td className='text-sm'>{movement.user?.name}</Table.Td>
                                    </tr>
                                )
                            }) :
                            <Table.Empty colSpan={8} message={
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
