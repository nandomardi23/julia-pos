import React, { useState } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, router } from '@inertiajs/react'
import Card from '@/Components/Common/Card'
import Button from '@/Components/Common/Button'
import Input from '@/Components/Common/Input'
import Textarea from '@/Components/Common/TextArea'
import Table from '@/Components/Common/Table'
import toast from 'react-hot-toast'
import { IconArrowLeft, IconPackageImport, IconCheck, IconUpload } from '@tabler/icons-react'

export default function Receive({ purchaseOrder }) {
    const po = purchaseOrder

    // State for receiving items
    const [items, setItems] = useState(
        po.items?.map(item => ({
            id: item.id,
            product_id: item.product_id,
            product_name: item.product?.title || '',
            quantity_ordered: parseFloat(item.quantity_ordered),
            quantity_received: parseFloat(item.quantity_received),
            quantity_to_receive: Math.max(0, parseFloat(item.quantity_ordered) - parseFloat(item.quantity_received)),
            unit_price: parseFloat(item.unit_price),
            batch_number: item.batch_number || '',
            expiry_date: item.expiry_date ? item.expiry_date.split('T')[0] : '',
        })) || []
    )

    const [invoiceNumber, setInvoiceNumber] = useState('')
    const [invoiceFile, setInvoiceFile] = useState(null)
    const [notes, setNotes] = useState('')
    const [processing, setProcessing] = useState(false)

    // Format currency
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value || 0)
    }

    // Handle quantity change
    const handleQuantityChange = (itemId, value) => {
        setItems(prev => prev.map(item => {
            if (item.id === itemId) {
                const maxReceivable = item.quantity_ordered - item.quantity_received
                const qty = Math.min(Math.max(0, parseFloat(value) || 0), maxReceivable)
                return { ...item, quantity_to_receive: qty }
            }
            return item
        }))
    }

    // Handle field change
    const handleFieldChange = (itemId, field, value) => {
        setItems(prev => prev.map(item =>
            item.id === itemId
                ? { ...item, [field]: value }
                : item
        ))
    }

    // Receive all remaining
    const receiveAll = () => {
        setItems(prev => prev.map(item => ({
            ...item,
            quantity_to_receive: Math.max(0, item.quantity_ordered - item.quantity_received)
        })))
    }

    // Calculate totals
    const totalToReceive = items.reduce((sum, item) => sum + item.quantity_to_receive, 0)
    const totalValue = items.reduce((sum, item) => sum + (item.quantity_to_receive * item.unit_price), 0)

    // Submit receiving
    const submit = (e) => {
        e.preventDefault()

        if (totalToReceive <= 0) {
            toast.error('Tidak ada item yang akan diterima')
            return
        }

        setProcessing(true)

        // Use FormData for file upload
        const formData = new FormData()

        items.forEach((item, index) => {
            formData.append(`items[${index}][id]`, item.id)
            formData.append(`items[${index}][quantity_received]`, item.quantity_to_receive)
            if (item.batch_number) formData.append(`items[${index}][batch_number]`, item.batch_number)
            if (item.expiry_date) formData.append(`items[${index}][expiry_date]`, item.expiry_date)
        })

        if (invoiceNumber) formData.append('invoice_number', invoiceNumber)
        if (notes) formData.append('notes', notes)
        if (invoiceFile) formData.append('invoice_file', invoiceFile)

        router.post(route('purchase-orders.storeReceive', po.id), formData, {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Barang berhasil diterima!')
            },
            onError: (errors) => {
                const firstError = Object.values(errors)[0]
                toast.error(firstError || 'Terjadi kesalahan')
            },
            onFinish: () => {
                setProcessing(false)
            },
        })
    }

    return (
        <>
            <Head title={`Terima Barang: ${po.po_number}`} />

            {/* Header */}
            <div className='mb-4 flex items-center gap-3'>
                <Button
                    type='link'
                    icon={<IconArrowLeft size={18} strokeWidth={1.5} />}
                    className='border bg-white text-gray-700 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200'
                    label='Kembali'
                    href={route('purchase-orders.show', po.id)}
                />
                <div>
                    <h1 className='text-xl font-semibold text-gray-800 dark:text-white'>Terima Barang</h1>
                    <p className='text-sm text-gray-500'>{po.po_number} - {po.supplier?.name}</p>
                </div>
            </div>

            <form onSubmit={submit}>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                    {/* Left: Items */}
                    <div className='lg:col-span-2 space-y-4'>
                        <Card>
                            <div className='flex justify-between items-center mb-4'>
                                <h3 className='font-semibold text-gray-800 dark:text-white'>Daftar Item</h3>
                                <Button
                                    type='button'
                                    onClick={receiveAll}
                                    icon={<IconCheck size={16} strokeWidth={1.5} />}
                                    className='text-sm border bg-green-50 text-green-700 border-green-300 hover:bg-green-100'
                                    label='Terima Semua'
                                />
                            </div>

                            <div className='overflow-x-auto'>
                                <Table>
                                    <Table.Thead>
                                        <tr>
                                            <Table.Th>Produk</Table.Th>
                                            <Table.Th className='text-center'>Dipesan</Table.Th>
                                            <Table.Th className='text-center'>Sudah Diterima</Table.Th>
                                            <Table.Th className='text-center'>Sisa</Table.Th>
                                            <Table.Th className='text-center' style={{ width: '120px' }}>Qty Terima</Table.Th>
                                            <Table.Th style={{ width: '120px' }}>Batch No.</Table.Th>
                                            <Table.Th style={{ width: '130px' }}>Exp. Date</Table.Th>
                                        </tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                                        {items.map((item) => {
                                            const remaining = item.quantity_ordered - item.quantity_received
                                            const isFullyReceived = remaining <= 0

                                            return (
                                                <tr key={item.id} className={`${isFullyReceived ? 'bg-green-50 dark:bg-green-900/20' : ''}`}>
                                                    <Table.Td>
                                                        <span className='font-medium'>{item.product_name}</span>
                                                    </Table.Td>
                                                    <Table.Td className='text-center'>
                                                        {item.quantity_ordered.toFixed(2)}
                                                    </Table.Td>
                                                    <Table.Td className='text-center'>
                                                        <span className={item.quantity_received > 0 ? 'text-green-600 font-medium' : ''}>
                                                            {item.quantity_received.toFixed(2)}
                                                        </span>
                                                    </Table.Td>
                                                    <Table.Td className='text-center'>
                                                        <span className={remaining > 0 ? 'text-orange-600 font-medium' : 'text-green-600'}>
                                                            {remaining.toFixed(2)}
                                                        </span>
                                                    </Table.Td>
                                                    <Table.Td>
                                                        <Input
                                                            type='number'
                                                            value={item.quantity_to_receive}
                                                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                            disabled={isFullyReceived}
                                                            min='0'
                                                            max={remaining}
                                                            step='0.01'
                                                            className='text-center'
                                                        />
                                                    </Table.Td>
                                                    <Table.Td>
                                                        <Input
                                                            type='text'
                                                            value={item.batch_number}
                                                            onChange={(e) => handleFieldChange(item.id, 'batch_number', e.target.value)}
                                                            placeholder='Batch'
                                                            disabled={isFullyReceived}
                                                        />
                                                    </Table.Td>
                                                    <Table.Td>
                                                        <Input
                                                            type='date'
                                                            value={item.expiry_date}
                                                            onChange={(e) => handleFieldChange(item.id, 'expiry_date', e.target.value)}
                                                            disabled={isFullyReceived}
                                                        />
                                                    </Table.Td>
                                                </tr>
                                            )
                                        })}
                                    </Table.Tbody>
                                </Table>
                            </div>
                        </Card>

                        {/* Additional Info */}
                        <Card title='Informasi Tambahan'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                                        Nomor Faktur / Surat Jalan
                                    </label>
                                    <Input
                                        type='text'
                                        value={invoiceNumber}
                                        onChange={(e) => setInvoiceNumber(e.target.value)}
                                        placeholder='Contoh: INV-2025-001'
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                                        Catatan Penerimaan
                                    </label>
                                    <Textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder='Catatan kondisi barang, dll...'
                                        rows={2}
                                    />
                                </div>
                            </div>

                            {/* Invoice File Upload */}
                            <div className='mt-4'>
                                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                                    Upload Bukti Faktur/Resi Supplier
                                </label>
                                <div className='mt-1 flex items-center gap-4'>
                                    <label className='flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'>
                                        <IconUpload size={18} strokeWidth={1.5} className='text-gray-500' />
                                        <span className='text-sm text-gray-600 dark:text-gray-400'>
                                            {invoiceFile ? invoiceFile.name : 'Pilih File (JPG, PNG, PDF)'}
                                        </span>
                                        <input
                                            type='file'
                                            accept='.jpg,.jpeg,.png,.pdf'
                                            onChange={(e) => setInvoiceFile(e.target.files[0])}
                                            className='hidden'
                                        />
                                    </label>
                                    {invoiceFile && (
                                        <button
                                            type='button'
                                            onClick={() => setInvoiceFile(null)}
                                            className='text-sm text-red-600 hover:text-red-800'
                                        >
                                            Hapus
                                        </button>
                                    )}
                                </div>
                                <p className='text-xs text-gray-500 mt-1'>Maksimal 5MB (JPG, PNG, atau PDF)</p>
                            </div>
                        </Card>
                    </div>

                    {/* Right: Summary */}
                    <div className='lg:col-span-1'>
                        <Card title='Ringkasan Penerimaan' className='sticky top-4'>
                            <div className='space-y-3 text-sm'>
                                <div className='flex justify-between'>
                                    <span className='text-gray-500'>PO Number</span>
                                    <span className='font-medium'>{po.po_number}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-gray-500'>Supplier</span>
                                    <span className='font-medium'>{po.supplier?.name}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-gray-500'>Gudang Tujuan</span>
                                    <span className='font-medium'>{po.warehouse?.name}</span>
                                </div>
                                <hr className='dark:border-gray-700' />
                                <div className='flex justify-between'>
                                    <span className='text-gray-500'>Item Diterima</span>
                                    <span className='font-medium'>
                                        {items.filter(i => i.quantity_to_receive > 0).length} item
                                    </span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-gray-500'>Total Qty Diterima</span>
                                    <span className='font-medium text-green-600'>
                                        {totalToReceive.toFixed(2)}
                                    </span>
                                </div>
                                <hr className='dark:border-gray-700' />
                                <div className='flex justify-between'>
                                    <span className='font-medium'>Nilai Barang</span>
                                    <span className='text-lg font-bold'>{formatCurrency(totalValue)}</span>
                                </div>
                            </div>

                            <div className='mt-6 space-y-2'>
                                <Button
                                    type='submit'
                                    disabled={processing || totalToReceive <= 0}
                                    icon={<IconPackageImport size={18} strokeWidth={1.5} />}
                                    className='w-full bg-green-600 text-white hover:bg-green-700 disabled:opacity-50'
                                    label={processing ? 'Memproses...' : 'Konfirmasi Penerimaan'}
                                />

                                {totalToReceive <= 0 && (
                                    <p className='text-xs text-center text-gray-500'>
                                        Masukkan quantity yang akan diterima
                                    </p>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </form>
        </>
    )
}

Receive.layout = page => <DashboardLayout children={page} />
