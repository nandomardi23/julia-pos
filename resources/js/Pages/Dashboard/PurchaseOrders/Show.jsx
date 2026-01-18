import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, Link, router } from '@inertiajs/react'
import Card from '@/Components/Common/Card'
import Button from '@/Components/Common/Button'
import Table from '@/Components/Common/Table'
import { IconArrowLeft, IconPencilCog, IconPackageImport, IconPrinter, IconSend, IconTruck, IconCheck, IconX, IconCircleCheck, IconFileInvoice, IconDownload, IconFileTypePdf } from '@tabler/icons-react'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'

export default function Show({ purchaseOrder, statuses }) {
    const po = purchaseOrder

    // Status badge colors
    const getStatusColor = (status) => {
        const colors = {
            draft: 'bg-gray-100 text-gray-700 border-gray-300',
            sent: 'bg-blue-100 text-blue-700 border-blue-300',
            confirmed: 'bg-indigo-100 text-indigo-700 border-indigo-300',
            shipped: 'bg-yellow-100 text-yellow-700 border-yellow-300',
            partial: 'bg-orange-100 text-orange-700 border-orange-300',
            received: 'bg-green-100 text-green-700 border-green-300',
            cancelled: 'bg-red-100 text-red-700 border-red-300',
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
            month: 'long',
            year: 'numeric',
        })
    }

    // Update status
    const updateStatus = (newStatus) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: `Ubah status menjadi "${statuses[newStatus]}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Ubah!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route('purchase-orders.updateStatus', po.id), { status: newStatus }, {
                    preserveScroll: true,
                    onSuccess: () => toast.success('Status berhasil diubah'),
                    onError: () => toast.error('Gagal mengubah status'),
                })
            }
        })
    }

    // Status timeline steps
    const statusSteps = [
        { key: 'draft', label: 'Draft', icon: IconPencilCog },
        { key: 'sent', label: 'Dikirim', icon: IconSend },
        { key: 'confirmed', label: 'Dikonfirmasi', icon: IconCheck },
        { key: 'shipped', label: 'Pengiriman', icon: IconTruck },
        { key: 'received', label: 'Diterima', icon: IconCircleCheck },
    ]

    const getStepStatus = (stepKey) => {
        const statusOrder = ['draft', 'sent', 'confirmed', 'shipped', 'partial', 'received']
        const currentIndex = statusOrder.indexOf(po.status)
        const stepIndex = statusOrder.indexOf(stepKey)

        if (po.status === 'cancelled') return 'cancelled'
        if (stepKey === 'received' && po.status === 'partial') return 'partial'
        if (stepIndex < currentIndex) return 'completed'
        if (stepIndex === currentIndex) return 'current'
        return 'pending'
    }

    return (
        <>
            <Head title={`PO: ${po.po_number}`} />

            {/* Header */}
            <div className='mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3'>
                <div className='flex items-center gap-3'>
                    <Button
                        type='link'
                        icon={<IconArrowLeft size={18} strokeWidth={1.5} />}
                        className='border bg-white text-gray-700 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200'
                        label='Kembali'
                        href={route('purchase-orders.index')}
                    />
                    <div>
                        <h1 className='text-xl font-semibold text-gray-800 dark:text-white'>{po.po_number}</h1>
                        <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(po.status)}`}>
                            {statuses[po.status]}
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-wrap gap-2'>
                    {/* PDF Download Button - Always visible */}
                    <Button
                        type='link'
                        icon={<IconFileTypePdf size={18} strokeWidth={1.5} />}
                        className='border bg-red-50 text-red-700 border-red-300 hover:bg-red-100'
                        label='Download PDF'
                        href={route('purchase-orders.pdf', po.id)}
                        target='_blank'
                    />

                    {po.status === 'draft' && (
                        <>
                            <Button
                                type='link'
                                icon={<IconPencilCog size={18} strokeWidth={1.5} />}
                                className='border bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
                                label='Edit'
                                href={route('purchase-orders.edit', po.id)}
                            />
                            <Button
                                type='button'
                                onClick={() => updateStatus('sent')}
                                icon={<IconSend size={18} strokeWidth={1.5} />}
                                className='bg-blue-600 text-white hover:bg-blue-700'
                                label='Kirim ke Supplier'
                            />
                        </>
                    )}
                    {po.status === 'sent' && (
                        <>
                            <Button
                                type='button'
                                onClick={() => updateStatus('confirmed')}
                                icon={<IconCheck size={18} strokeWidth={1.5} />}
                                className='bg-indigo-600 text-white hover:bg-indigo-700'
                                label='Konfirmasi'
                            />
                            <Button
                                type='button'
                                onClick={() => updateStatus('shipped')}
                                icon={<IconTruck size={18} strokeWidth={1.5} />}
                                className='bg-yellow-500 text-white hover:bg-yellow-600'
                                label='Barang Dikirim'
                            />
                        </>
                    )}
                    {po.status === 'confirmed' && (
                        <Button
                            type='button'
                            onClick={() => updateStatus('shipped')}
                            icon={<IconTruck size={18} strokeWidth={1.5} />}
                            className='bg-yellow-500 text-white hover:bg-yellow-600'
                            label='Barang Dikirim'
                        />
                    )}
                    {['sent', 'confirmed', 'shipped', 'partial'].includes(po.status) && (
                        <Button
                            type='link'
                            icon={<IconPackageImport size={18} strokeWidth={1.5} />}
                            className='bg-green-600 text-white hover:bg-green-700'
                            label='Terima Barang'
                            href={route('purchase-orders.receive', po.id)}
                        />
                    )}
                    {['draft', 'sent', 'confirmed'].includes(po.status) && (
                        <Button
                            type='button'
                            onClick={() => updateStatus('cancelled')}
                            icon={<IconX size={18} strokeWidth={1.5} />}
                            className='border bg-red-50 text-red-700 border-red-300 hover:bg-red-100'
                            label='Batalkan'
                        />
                    )}
                </div>
            </div>

            {/* Status Timeline */}
            {po.status !== 'cancelled' && (
                <Card className='mb-4'>
                    <div className='flex items-center justify-between py-2'>
                        {statusSteps.map((step, index) => {
                            const stepStatus = getStepStatus(step.key)
                            const StepIcon = step.icon

                            return (
                                <React.Fragment key={step.key}>
                                    <div className='flex flex-col items-center'>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stepStatus === 'completed' ? 'bg-green-500 text-white' :
                                            stepStatus === 'current' ? 'bg-blue-500 text-white' :
                                                stepStatus === 'partial' ? 'bg-orange-500 text-white' :
                                                    'bg-gray-200 text-gray-400 dark:bg-gray-700'
                                            }`}>
                                            <StepIcon size={20} strokeWidth={1.5} />
                                        </div>
                                        <span className={`text-xs mt-2 font-medium ${stepStatus === 'completed' || stepStatus === 'current' ? 'text-gray-800 dark:text-white' : 'text-gray-400'
                                            }`}>
                                            {step.label}
                                        </span>
                                    </div>
                                    {index < statusSteps.length - 1 && (
                                        <div className={`flex-1 h-1 mx-2 ${getStepStatus(statusSteps[index + 1].key) !== 'pending'
                                            ? 'bg-green-500'
                                            : 'bg-gray-200 dark:bg-gray-700'
                                            }`} />
                                    )}
                                </React.Fragment>
                            )
                        })}
                    </div>
                </Card>
            )}

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                {/* Left: Details and Items */}
                <div className='lg:col-span-2 space-y-4'>
                    {/* PO Info */}
                    <Card title='Informasi Purchase Order'>
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 text-sm'>
                            <div>
                                <span className='text-gray-500 dark:text-gray-400'>No. PO</span>
                                <p className='font-medium text-gray-800 dark:text-white'>{po.po_number}</p>
                            </div>
                            <div>
                                <span className='text-gray-500 dark:text-gray-400'>Supplier</span>
                                <p className='font-medium text-gray-800 dark:text-white'>{po.supplier?.name || '-'}</p>
                            </div>
                            <div>
                                <span className='text-gray-500 dark:text-gray-400'>Gudang Tujuan</span>
                                <p className='font-medium text-gray-800 dark:text-white'>{po.warehouse?.name || '-'}</p>
                            </div>
                            <div>
                                <span className='text-gray-500 dark:text-gray-400'>Tanggal Order</span>
                                <p className='font-medium text-gray-800 dark:text-white'>{formatDate(po.order_date)}</p>
                            </div>
                            <div>
                                <span className='text-gray-500 dark:text-gray-400'>Estimasi Kedatangan</span>
                                <p className='font-medium text-gray-800 dark:text-white'>{formatDate(po.expected_date)}</p>
                            </div>
                            <div>
                                <span className='text-gray-500 dark:text-gray-400'>Tanggal Diterima</span>
                                <p className='font-medium text-gray-800 dark:text-white'>{formatDate(po.received_date)}</p>
                            </div>
                            <div>
                                <span className='text-gray-500 dark:text-gray-400'>Dibuat Oleh</span>
                                <p className='font-medium text-gray-800 dark:text-white'>{po.user?.name || '-'}</p>
                            </div>
                            {po.notes && (
                                <div className='col-span-2'>
                                    <span className='text-gray-500 dark:text-gray-400'>Catatan</span>
                                    <p className='font-medium text-gray-800 dark:text-white'>{po.notes}</p>
                                </div>
                            )}
                            {po.invoice_number && (
                                <div>
                                    <span className='text-gray-500 dark:text-gray-400'>Nomor Faktur</span>
                                    <p className='font-medium text-gray-800 dark:text-white'>{po.invoice_number}</p>
                                </div>
                            )}
                            {po.invoice_file && (
                                <div>
                                    <span className='text-gray-500 dark:text-gray-400'>Bukti Faktur</span>
                                    <a
                                        href={`/storage/invoices/${po.invoice_file}`}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='flex items-center gap-1 mt-1 text-blue-600 hover:text-blue-800 dark:text-blue-400'
                                    >
                                        <IconFileInvoice size={16} strokeWidth={1.5} />
                                        <span className='text-sm'>Lihat Faktur</span>
                                        <IconDownload size={14} strokeWidth={1.5} />
                                    </a>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Items Table */}
                    <Card title='Daftar Item'>
                        <Table>
                            <Table.Thead>
                                <tr>
                                    <Table.Th className='w-10'>No</Table.Th>
                                    <Table.Th>Produk</Table.Th>
                                    <Table.Th className='text-center'>Dipesan</Table.Th>
                                    <Table.Th className='text-center'>Diterima</Table.Th>
                                    <Table.Th className='text-right'>Harga</Table.Th>
                                    <Table.Th className='text-right'>Subtotal</Table.Th>
                                </tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {po.items?.map((item, i) => (
                                    <tr key={item.id} className='hover:bg-gray-50 dark:hover:bg-gray-900'>
                                        <Table.Td className='text-center'>{i + 1}</Table.Td>
                                        <Table.Td>
                                            <div>
                                                <span className='font-medium'>{item.product?.title}</span>
                                                {item.batch_number && (
                                                    <span className='text-xs text-gray-500 block'>Batch: {item.batch_number}</span>
                                                )}
                                            </div>
                                        </Table.Td>
                                        <Table.Td className='text-center'>{parseFloat(item.quantity_ordered).toFixed(2)}</Table.Td>
                                        <Table.Td className='text-center'>
                                            <span className={`font-medium ${parseFloat(item.quantity_received) >= parseFloat(item.quantity_ordered)
                                                ? 'text-green-600 dark:text-green-400'
                                                : parseFloat(item.quantity_received) > 0
                                                    ? 'text-orange-600 dark:text-orange-400'
                                                    : 'text-gray-500'
                                                }`}>
                                                {parseFloat(item.quantity_received).toFixed(2)}
                                            </span>
                                        </Table.Td>
                                        <Table.Td className='text-right'>{formatCurrency(item.unit_price)}</Table.Td>
                                        <Table.Td className='text-right font-medium'>{formatCurrency(item.subtotal)}</Table.Td>
                                    </tr>
                                ))}
                            </Table.Tbody>
                            <tfoot>
                                <tr className='bg-gray-50 dark:bg-gray-800'>
                                    <Table.Td colSpan={5} className='text-right font-semibold'>Total</Table.Td>
                                    <Table.Td className='text-right font-bold text-lg'>{formatCurrency(po.total_amount)}</Table.Td>
                                </tr>
                            </tfoot>
                        </Table>
                    </Card>
                </div>

                {/* Right: Summary */}
                <div className='lg:col-span-1'>
                    <Card title='Ringkasan' className='sticky top-4'>
                        <div className='space-y-3 text-sm'>
                            <div className='flex justify-between'>
                                <span className='text-gray-500'>Jumlah Item</span>
                                <span className='font-medium'>{po.items?.length || 0} item</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-500'>Total Dipesan</span>
                                <span className='font-medium'>
                                    {po.items?.reduce((sum, i) => sum + parseFloat(i.quantity_ordered), 0).toFixed(2)}
                                </span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-500'>Total Diterima</span>
                                <span className='font-medium'>
                                    {po.items?.reduce((sum, i) => sum + parseFloat(i.quantity_received), 0).toFixed(2)}
                                </span>
                            </div>
                            <hr className='dark:border-gray-700' />
                            <div className='flex justify-between'>
                                <span className='font-medium'>Total Nilai</span>
                                <span className='text-lg font-bold'>{formatCurrency(po.total_amount)}</span>
                            </div>

                            {/* Progress bar for partial receiving */}
                            {['partial', 'shipped', 'sent', 'confirmed'].includes(po.status) && (
                                <div className='mt-4'>
                                    <div className='flex justify-between text-xs mb-1'>
                                        <span>Progress Penerimaan</span>
                                        <span>
                                            {Math.round(
                                                (po.items?.reduce((sum, i) => sum + parseFloat(i.quantity_received), 0) /
                                                    po.items?.reduce((sum, i) => sum + parseFloat(i.quantity_ordered), 0)) * 100
                                            ) || 0}%
                                        </span>
                                    </div>
                                    <div className='w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700'>
                                        <div
                                            className='bg-green-500 h-2 rounded-full transition-all'
                                            style={{
                                                width: `${Math.min(100, Math.round(
                                                    (po.items?.reduce((sum, i) => sum + parseFloat(i.quantity_received), 0) /
                                                        po.items?.reduce((sum, i) => sum + parseFloat(i.quantity_ordered), 0)) * 100
                                                ) || 0)}%`
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}

Show.layout = page => <DashboardLayout children={page} />
