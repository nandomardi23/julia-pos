import React, { useState } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, router, usePage } from '@inertiajs/react'
import Card from '@/Components/Common/Card'
import Button from '@/Components/Common/Button'
import Table from '@/Components/Common/Table'
import { IconArrowLeft, IconCheck, IconX, IconReceipt, IconUser, IconCalendar } from '@tabler/icons-react'
import Textarea from '@/Components/Common/TextArea'
import toast from 'react-hot-toast'

export default function Show({ return: returnData, statuses, returnTypes }) {
    const { auth } = usePage().props
    const [rejectionNote, setRejectionNote] = useState('')
    const [showRejectModal, setShowRejectModal] = useState(false)
    const [processing, setProcessing] = useState(false)

    // Check if user can approve (you might want to check for manager role)
    const canApprove = returnData.status === 'pending'

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
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    // Status colors
    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
            approved: 'bg-blue-100 text-blue-700 border-blue-300',
            rejected: 'bg-red-100 text-red-700 border-red-300',
            completed: 'bg-green-100 text-green-700 border-green-300',
        }
        return colors[status] || colors.pending
    }

    // Handle approve
    const handleApprove = () => {
        if (!confirm('Yakin ingin menyetujui return ini? Stok akan dikembalikan ke display.')) return

        setProcessing(true)
        router.post(route('returns.approve', returnData.id), {}, {
            onSuccess: () => {
                toast.success('Return berhasil disetujui')
                setProcessing(false)
            },
            onError: () => {
                toast.error('Gagal menyetujui return')
                setProcessing(false)
            }
        })
    }

    // Handle reject
    const handleReject = () => {
        if (!rejectionNote.trim()) {
            toast.error('Masukkan alasan penolakan')
            return
        }

        setProcessing(true)
        router.post(route('returns.reject', returnData.id), {
            rejection_note: rejectionNote
        }, {
            onSuccess: () => {
                toast.success('Return telah ditolak')
                setShowRejectModal(false)
                setProcessing(false)
            },
            onError: () => {
                toast.error('Gagal menolak return')
                setProcessing(false)
            }
        })
    }

    return (
        <>
            <Head title={`Return ${returnData.return_number}`} />

            {/* Header */}
            <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <Button
                    type='link'
                    label='Kembali'
                    icon={<IconArrowLeft size={20} strokeWidth={1.5} />}
                    className='border bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200'
                    href={route('returns.index')}
                />

                {canApprove && (
                    <div className="flex gap-2">
                        <Button
                            type='button'
                            label='Tolak'
                            icon={<IconX size={18} strokeWidth={1.5} />}
                            className='border bg-red-500 text-white hover:bg-red-600'
                            onClick={() => setShowRejectModal(true)}
                        />
                        <Button
                            type='button'
                            label={processing ? 'Memproses...' : 'Setujui & Kembalikan Stok'}
                            icon={<IconCheck size={18} strokeWidth={1.5} />}
                            className='border bg-green-500 text-white hover:bg-green-600'
                            onClick={handleApprove}
                            disabled={processing}
                        />
                    </div>
                )}
            </div>

            {/* Status Banner */}
            <div className={`mb-4 p-4 rounded-lg border ${getStatusColor(returnData.status)}`}>
                <div className="flex justify-between items-center">
                    <div>
                        <span className="font-medium">Status: </span>
                        <span className="font-bold">{statuses[returnData.status]}</span>
                    </div>
                    <span className="text-2xl font-bold">{returnData.return_number}</span>
                </div>
                {returnData.rejection_note && (
                    <p className="mt-2 text-sm">
                        <strong>Alasan Penolakan:</strong> {returnData.rejection_note}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Return Info */}
                <Card title="Informasi Return" className="lg:col-span-2">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-gray-500 flex items-center gap-1">
                                <IconReceipt size={16} /> Invoice Transaksi
                            </span>
                            <p className="font-medium text-blue-600">{returnData.transaction?.invoice}</p>
                        </div>
                        <div>
                            <span className="text-gray-500">Tipe Return</span>
                            <p className="font-medium">{returnTypes[returnData.return_type]}</p>
                        </div>
                        <div>
                            <span className="text-gray-500 flex items-center gap-1">
                                <IconUser size={16} /> Dibuat Oleh
                            </span>
                            <p className="font-medium">{returnData.user?.name}</p>
                        </div>
                        <div>
                            <span className="text-gray-500 flex items-center gap-1">
                                <IconCalendar size={16} /> Tanggal
                            </span>
                            <p className="font-medium">{formatDate(returnData.created_at)}</p>
                        </div>
                        {returnData.approver && (
                            <>
                                <div>
                                    <span className="text-gray-500">Diproses Oleh</span>
                                    <p className="font-medium">{returnData.approver?.name}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Tanggal Proses</span>
                                    <p className="font-medium">{formatDate(returnData.approved_at)}</p>
                                </div>
                            </>
                        )}
                        <div className="col-span-2">
                            <span className="text-gray-500">Alasan Return</span>
                            <p className="font-medium">{returnData.reason || '-'}</p>
                        </div>
                    </div>
                </Card>

                {/* Summary */}
                <Card title="Ringkasan">
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Jumlah Item</span>
                            <span className="font-medium">{returnData.items?.length || 0} item</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Total Qty</span>
                            <span className="font-medium">
                                {returnData.items?.reduce((sum, i) => sum + parseFloat(i.qty), 0).toFixed(0)}
                            </span>
                        </div>
                        <hr />
                        <div className="flex justify-between text-lg">
                            <span className="font-medium">Nilai Return</span>
                            <span className="font-bold text-blue-600">
                                {formatCurrency(returnData.return_amount)}
                            </span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Items Table */}
            <Card title="Item yang Di-return" className="mt-4">
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className='w-10'>No</Table.Th>
                            <Table.Th>Produk</Table.Th>
                            <Table.Th className='text-center'>Qty</Table.Th>
                            <Table.Th className='text-right'>Harga</Table.Th>
                            <Table.Th className='text-right'>Subtotal</Table.Th>
                            <Table.Th>Kondisi</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {returnData.items?.map((item, idx) => (
                            <tr key={item.id} className='hover:bg-gray-50 dark:hover:bg-gray-900'>
                                <Table.Td className='text-center'>{idx + 1}</Table.Td>
                                <Table.Td>
                                    <div className="font-medium">{item.product?.title || 'Produk'}</div>
                                    {item.variant_name && (
                                        <div className="text-xs text-gray-500">Varian: {item.variant_name}</div>
                                    )}
                                </Table.Td>
                                <Table.Td className='text-center'>{parseFloat(item.qty).toFixed(0)}</Table.Td>
                                <Table.Td className='text-right'>{formatCurrency(item.price)}</Table.Td>
                                <Table.Td className='text-right font-medium'>{formatCurrency(item.subtotal)}</Table.Td>
                                <Table.Td className='text-sm text-gray-500'>{item.condition_note || '-'}</Table.Td>
                            </tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Card>

            {/* Reject Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
                        <h3 className="text-lg font-bold mb-4">Tolak Return</h3>
                        <Textarea
                            label="Alasan Penolakan"
                            placeholder="Jelaskan alasan penolakan return ini..."
                            value={rejectionNote}
                            onChange={(e) => setRejectionNote(e.target.value)}
                            rows={4}
                        />
                        <div className="flex justify-end gap-2 mt-4">
                            <Button
                                type='button'
                                label='Batal'
                                className='border bg-gray-100 text-gray-700 hover:bg-gray-200'
                                onClick={() => setShowRejectModal(false)}
                            />
                            <Button
                                type='button'
                                label={processing ? 'Memproses...' : 'Tolak Return'}
                                className='border bg-red-500 text-white hover:bg-red-600'
                                onClick={handleReject}
                                disabled={processing}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

Show.layout = page => <DashboardLayout children={page} />
