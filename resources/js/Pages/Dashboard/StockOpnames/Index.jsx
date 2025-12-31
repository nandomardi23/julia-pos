import React, { useState } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, router, Link } from '@inertiajs/react'
import Button from '@/Components/Common/Button'
import Input from '@/Components/Common/Input'
import InputSelect from '@/Components/Common/InputSelect'
import Table from '@/Components/Common/Table'
import {
    IconPlus,
    IconEye,
    IconTrash,
    IconDatabaseOff,
    IconClipboardCheck,
} from '@tabler/icons-react'

const statusOptions = [
    { id: '', name: 'Semua Status' },
    { id: 'draft', name: 'Draft' },
    { id: 'completed', name: 'Selesai' },
]

export default function Index({ opnames, filters }) {
    const [filterData, setFilterData] = useState({
        status: filters?.status ?? '',
        start_date: filters?.start_date ?? '',
        end_date: filters?.end_date ?? '',
    })

    const [selectedStatus, setSelectedStatus] = useState(
        statusOptions.find((s) => s.id === filters?.status) || statusOptions[0]
    )

    const handleChange = (field, value) => {
        setFilterData((prev) => ({ ...prev, [field]: value }))
    }

    const applyFilters = (e) => {
        e.preventDefault()
        router.get(route('stock-opnames.index'), filterData, {
            preserveState: true,
            preserveScroll: true,
        })
    }

    const resetFilters = () => {
        setFilterData({ status: '', start_date: '', end_date: '' })
        setSelectedStatus(statusOptions[0])
        router.get(route('stock-opnames.index'), {}, { replace: true })
    }

    const handleDelete = (id) => {
        if (confirm('Hapus stock opname draft ini?')) {
            router.delete(route('stock-opnames.destroy', id))
        }
    }

    const rows = opnames?.data ?? []
    const links = opnames?.links ?? []
    const currentPage = opnames?.current_page ?? 1
    const perPage = opnames?.per_page ?? 10

    return (
        <>
            <Head title="Stock Opname" />

            {/* Header with Button */}
            <div className='mb-4'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
                    <Button
                        type='link'
                        icon={<IconPlus size={20} strokeWidth={1.5} />}
                        className='border bg-indigo-500 text-white hover:bg-indigo-600'
                        label='Buat Opname'
                        href={route('stock-opnames.create')}
                    />
                </div>
            </div>

            {/* Filter Section */}
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border dark:border-gray-800 mb-4">
                <form onSubmit={applyFilters} className="flex flex-wrap items-end gap-4">
                    <div className="flex-1 min-w-[140px]">
                        <Input
                            type="date"
                            label="Mulai"
                            value={filterData.start_date}
                            onChange={(e) => handleChange('start_date', e.target.value)}
                        />
                    </div>
                    <div className="flex-1 min-w-[140px]">
                        <Input
                            type="date"
                            label="Selesai"
                            value={filterData.end_date}
                            onChange={(e) => handleChange('end_date', e.target.value)}
                        />
                    </div>
                    <div className="flex-1 min-w-[140px]">
                        <InputSelect
                            label="Status"
                            data={statusOptions}
                            selected={selectedStatus}
                            setSelected={(value) => {
                                setSelectedStatus(value)
                                handleChange('status', value?.id ?? '')
                            }}
                            placeholder="Semua Status"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            label="Reset"
                            className="border bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                            onClick={resetFilters}
                        />
                        <Button
                            type="submit"
                            label="Cari"
                            className="border bg-gray-700 text-white hover:bg-gray-800"
                        />
                    </div>
                </form>
            </div>

            <Table.Card
                title="Riwayat Stock Opname"
                links={links}
                meta={{
                    from: opnames?.from,
                    to: opnames?.to,
                    total: opnames?.total,
                    per_page: perPage,
                }}
                url={route('stock-opnames.index')}
            >
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className="w-12 text-center">No</Table.Th>
                            <Table.Th>Tanggal</Table.Th>
                            <Table.Th>Lokasi</Table.Th>
                            <Table.Th>User</Table.Th>
                            <Table.Th className="text-center">Total Item</Table.Th>
                            <Table.Th className="text-center">Selisih</Table.Th>
                            <Table.Th className="text-center">Status</Table.Th>
                            <Table.Th className="text-center">Aksi</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {rows.length ? (
                            rows.map((opname, index) => (
                                <tr key={opname.id}>
                                    <Table.Td className="text-center">
                                        {(currentPage - 1) * perPage + index + 1}
                                    </Table.Td>
                                    <Table.Td>{opname.created_at}</Table.Td>
                                    <Table.Td>
                                        <span className="capitalize">{opname.location_type}</span>
                                        {' - '}
                                        {opname.location_name}
                                    </Table.Td>
                                    <Table.Td>{opname.user?.name ?? '-'}</Table.Td>
                                    <Table.Td className="text-center">{opname.total_items}</Table.Td>
                                    <Table.Td className="text-center">
                                        {opname.items_with_difference > 0 ? (
                                            <span className="text-red-500 font-semibold">
                                                {opname.items_with_difference} item
                                            </span>
                                        ) : (
                                            <span className="text-green-500">Cocok</span>
                                        )}
                                    </Table.Td>
                                    <Table.Td className="text-center">
                                        {opname.status === 'completed' ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                                                <IconClipboardCheck size={14} />
                                                Selesai
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                                                Draft
                                            </span>
                                        )}
                                    </Table.Td>
                                    <Table.Td className="text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <Link href={route('stock-opnames.show', opname.id)}>
                                                <Button
                                                    type="button"
                                                    icon={<IconEye size={14} />}
                                                    className="text-blue-600 hover:text-blue-800 p-1"
                                                    variant="ghost"
                                                />
                                            </Link>
                                            {opname.status === 'draft' && (
                                                <Button
                                                    type="button"
                                                    icon={<IconTrash size={14} />}
                                                    className="text-red-500 hover:text-red-700 p-1"
                                                    variant="ghost"
                                                    onClick={() => handleDelete(opname.id)}
                                                />
                                            )}
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))
                        ) : (
                            <Table.Empty
                                colSpan={8}
                                message={
                                    <>
                                        <div className='flex justify-center items-center text-center mb-2'>
                                            <IconDatabaseOff size={48} strokeWidth={1} className='text-gray-300 dark:text-gray-600' />
                                        </div>
                                        <span className='text-gray-500 dark:text-gray-400'>Belum ada stock opname</span>
                                    </>
                                }
                            />
                        )}
                    </Table.Tbody>
                </Table>
            </Table.Card>
        </>
    )
}

Index.layout = page => <DashboardLayout children={page} />
