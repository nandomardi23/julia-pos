import React, { useState, useEffect } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, useForm, router } from '@inertiajs/react'
import Card from '@/Components/Common/Card'
import Button from '@/Components/Common/Button'
import Input from '@/Components/Common/Input'
import Textarea from '@/Components/Common/TextArea'
import SearchableSelect from '@/Components/Common/SearchableSelect'
import toast from 'react-hot-toast'
import { IconCirclePlus, IconTrash, IconArrowLeft } from '@tabler/icons-react'

export default function Edit({ purchaseOrder, warehouses = [], products = [], suppliers = [] }) {
    const po = purchaseOrder

    // Form state
    const { data, setData, put, processing, errors } = useForm({
        supplier_id: po.supplier_id || '',
        warehouse_id: po.warehouse_id || '',
        expected_date: po.expected_date ? po.expected_date.split('T')[0] : '',
        notes: po.notes || '',
        items: [],
    })

    // Items state - initialize from existing items
    const [items, setItems] = useState(
        po.items?.map(item => ({
            id: item.id,
            product_id: item.product_id,
            quantity: item.quantity_ordered,
            unit_price: item.unit_price,
            batch_number: item.batch_number || '',
            expiry_date: item.expiry_date ? item.expiry_date.split('T')[0] : '',
            notes: item.notes || '',
            product_name: item.product?.title || '',
        })) || [{ id: Date.now(), product_id: '', quantity: '', unit_price: '', batch_number: '', expiry_date: '', notes: '', product_name: '' }]
    )

    // Format currency
    const formatCurrency = (value) => {
        if (!value) return ''
        const numValue = parseFloat(String(value).replace(/[^\d]/g, ''))
        if (isNaN(numValue)) return ''
        return new Intl.NumberFormat('id-ID').format(numValue)
    }

    const parseCurrency = (value) => {
        return parseFloat(String(value).replace(/[^\d]/g, '')) || 0
    }

    // Convert products for SearchableSelect
    const productOptions = products.map(p => ({
        value: p.id,
        label: `${p.title}${p.sku ? ` (${p.sku})` : ''}`,
        buy_price: p.buy_price,
    }))

    // Supplier options
    const supplierOptions = suppliers.map(s => ({
        value: s.id,
        label: s.company ? `${s.name} - ${s.company}` : s.name,
    }))

    // Warehouse options
    const warehouseOptions = warehouses.map(w => ({
        value: w.id,
        label: w.name,
    }))

    // Handle product change
    const handleProductChange = (itemId, option) => {
        setItems(prev => prev.map(item => {
            if (item.id === itemId) {
                return {
                    ...item,
                    product_id: option?.value || '',
                    product_name: option?.label || '',
                    unit_price: option?.buy_price || item.unit_price,
                }
            }
            return item
        }))
    }

    // Handle item field change
    const handleItemChange = (itemId, field, value) => {
        setItems(prev => prev.map(item =>
            item.id === itemId
                ? { ...item, [field]: value }
                : item
        ))
    }

    // Add new item row
    const addItem = () => {
        setItems(prev => [...prev, {
            id: Date.now(),
            product_id: '',
            quantity: '',
            unit_price: '',
            batch_number: '',
            expiry_date: '',
            notes: '',
            product_name: '',
        }])
    }

    // Remove item row
    const removeItem = (itemId) => {
        if (items.length === 1) {
            toast.error('Minimal harus ada 1 item')
            return
        }
        setItems(prev => prev.filter(item => item.id !== itemId))
    }

    // Calculate subtotal for an item
    const calculateSubtotal = (item) => {
        const qty = parseFloat(item.quantity) || 0
        const price = parseFloat(item.unit_price) || 0
        return qty * price
    }

    // Calculate grand total
    const calculateTotal = () => {
        return items.reduce((sum, item) => sum + calculateSubtotal(item), 0)
    }

    // Submit form
    const submit = (e) => {
        e.preventDefault()

        // Validate items
        const validItems = items.filter(item => item.product_id && parseFloat(item.quantity) > 0)

        if (validItems.length === 0) {
            toast.error('Tambahkan minimal 1 item dengan produk dan quantity yang valid')
            return
        }

        // Prepare items data
        const formattedItems = validItems.map(item => ({
            product_id: item.product_id,
            quantity: parseFloat(item.quantity),
            unit_price: parseFloat(item.unit_price) || 0,
            batch_number: item.batch_number || null,
            expiry_date: item.expiry_date || null,
            notes: item.notes || null,
        }))

        put(route('purchase-orders.update', po.id), {
            data: {
                ...data,
                items: formattedItems,
            },
            onSuccess: () => {
                toast.success('Purchase Order berhasil diupdate')
            },
            onError: (errors) => {
                const firstError = Object.values(errors)[0]
                toast.error(firstError || 'Terjadi kesalahan')
            },
        })
    }

    // Update form data when items change
    useEffect(() => {
        const validItems = items.filter(item => item.product_id && parseFloat(item.quantity) > 0)
        setData('items', validItems.map(item => ({
            product_id: item.product_id,
            quantity: parseFloat(item.quantity),
            unit_price: parseFloat(item.unit_price) || 0,
            batch_number: item.batch_number || null,
            expiry_date: item.expiry_date || null,
            notes: item.notes || null,
        })))
    }, [items])

    return (
        <>
            <Head title={`Edit PO: ${po.po_number}`} />

            <div className='mb-4 flex items-center gap-3'>
                <Button
                    type='link'
                    icon={<IconArrowLeft size={18} strokeWidth={1.5} />}
                    className='border bg-white text-gray-700 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200'
                    label='Kembali'
                    href={route('purchase-orders.show', po.id)}
                />
                <h1 className='text-xl font-semibold text-gray-800 dark:text-white'>Edit: {po.po_number}</h1>
            </div>

            <form onSubmit={submit}>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                    {/* Form Inputs - Left Side */}
                    <div className='lg:col-span-2 space-y-4'>
                        {/* Header Info */}
                        <Card title='Informasi PO'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                                        Supplier <span className='text-red-500'>*</span>
                                    </label>
                                    <SearchableSelect
                                        options={supplierOptions}
                                        value={supplierOptions.find(o => o.value === parseInt(data.supplier_id))}
                                        onChange={(option) => setData('supplier_id', option?.value || '')}
                                        placeholder='Pilih Supplier...'
                                        isClearable
                                    />
                                    {errors.supplier_id && <p className='text-red-500 text-xs mt-1'>{errors.supplier_id}</p>}
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                                        Gudang Tujuan <span className='text-red-500'>*</span>
                                    </label>
                                    <SearchableSelect
                                        options={warehouseOptions}
                                        value={warehouseOptions.find(o => o.value === parseInt(data.warehouse_id))}
                                        onChange={(option) => setData('warehouse_id', option?.value || '')}
                                        placeholder='Pilih Gudang...'
                                        isClearable
                                    />
                                    {errors.warehouse_id && <p className='text-red-500 text-xs mt-1'>{errors.warehouse_id}</p>}
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                                        Tanggal Kedatangan (Estimasi)
                                    </label>
                                    <Input
                                        type='date'
                                        value={data.expected_date}
                                        onChange={(e) => setData('expected_date', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                                        Catatan
                                    </label>
                                    <Textarea
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        placeholder='Catatan untuk PO ini...'
                                        rows={2}
                                    />
                                </div>
                            </div>
                        </Card>

                        {/* Items List */}
                        <Card title='Daftar Item'>
                            <div className='overflow-x-auto'>
                                <table className='w-full text-sm'>
                                    <thead>
                                        <tr className='border-b dark:border-gray-700'>
                                            <th className='text-left py-2 px-2 font-medium' style={{ minWidth: '250px' }}>Produk</th>
                                            <th className='text-center py-2 px-2 font-medium' style={{ width: '100px' }}>Qty</th>
                                            <th className='text-right py-2 px-2 font-medium' style={{ width: '150px' }}>Harga Satuan</th>
                                            <th className='text-right py-2 px-2 font-medium' style={{ width: '150px' }}>Subtotal</th>
                                            <th className='text-center py-2 px-2 font-medium' style={{ width: '50px' }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item) => (
                                            <tr key={item.id} className='border-b dark:border-gray-700'>
                                                <td className='py-2 px-2'>
                                                    <SearchableSelect
                                                        options={productOptions}
                                                        value={productOptions.find(o => o.value === parseInt(item.product_id))}
                                                        onChange={(option) => handleProductChange(item.id, option)}
                                                        placeholder='Pilih produk...'
                                                        isClearable
                                                    />
                                                </td>
                                                <td className='py-2 px-2'>
                                                    <Input
                                                        type='number'
                                                        value={item.quantity}
                                                        onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                                                        placeholder='0'
                                                        min='0.01'
                                                        step='0.01'
                                                        className='text-center'
                                                    />
                                                </td>
                                                <td className='py-2 px-2'>
                                                    <Input
                                                        type='number'
                                                        value={item.unit_price}
                                                        onChange={(e) => handleItemChange(item.id, 'unit_price', e.target.value)}
                                                        placeholder='0'
                                                        min='0'
                                                        className='text-right'
                                                    />
                                                </td>
                                                <td className='py-2 px-2 text-right font-medium'>
                                                    Rp {formatCurrency(calculateSubtotal(item))}
                                                </td>
                                                <td className='py-2 px-2 text-center'>
                                                    <button
                                                        type='button'
                                                        onClick={() => removeItem(item.id)}
                                                        className='p-1.5 rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30'
                                                        title='Hapus'
                                                    >
                                                        <IconTrash size={16} strokeWidth={1.5} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='mt-4'>
                                <Button
                                    type='button'
                                    onClick={addItem}
                                    icon={<IconCirclePlus size={18} strokeWidth={1.5} />}
                                    className='border bg-gray-50 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200'
                                    label='Tambah Item'
                                />
                            </div>
                        </Card>
                    </div>

                    {/* Summary - Right Side */}
                    <div className='lg:col-span-1'>
                        <Card title='Ringkasan' className='sticky top-4'>
                            <div className='space-y-3'>
                                <div className='flex justify-between text-sm'>
                                    <span className='text-gray-600 dark:text-gray-400'>Jumlah Item</span>
                                    <span className='font-medium'>
                                        {items.filter(i => i.product_id && parseFloat(i.quantity) > 0).length} item
                                    </span>
                                </div>
                                <div className='flex justify-between text-sm'>
                                    <span className='text-gray-600 dark:text-gray-400'>Total Qty</span>
                                    <span className='font-medium'>
                                        {items.reduce((sum, i) => sum + (parseFloat(i.quantity) || 0), 0).toFixed(2)}
                                    </span>
                                </div>
                                <hr className='dark:border-gray-700' />
                                <div className='flex justify-between'>
                                    <span className='font-medium'>Total</span>
                                    <span className='text-lg font-bold'>
                                        Rp {formatCurrency(calculateTotal())}
                                    </span>
                                </div>
                            </div>
                            <div className='mt-6'>
                                <Button
                                    type='submit'
                                    disabled={processing}
                                    className='w-full bg-blue-600 text-white hover:bg-blue-700'
                                    label={processing ? 'Menyimpan...' : 'Update PO'}
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            </form>
        </>
    )
}

Edit.layout = page => <DashboardLayout children={page} />
