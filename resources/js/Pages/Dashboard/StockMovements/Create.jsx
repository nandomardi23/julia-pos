import React, { useState, useEffect, useCallback } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, useForm, usePage, router } from '@inertiajs/react'
import Card from '@/Components/Common/Card'
import Button from '@/Components/Common/Button'
import { IconPencilPlus, IconCirclePlus, IconArrowLeft, IconPlus, IconTrash, IconInfoCircle } from '@tabler/icons-react'
import Input from '@/Components/Common/Input'
import Textarea from '@/Components/Common/TextArea'
import Select from '@/Components/Common/Select'
import SearchableSelect from '@/Components/Common/SearchableSelect'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function Create({ warehouses = [], products = [], suppliers = [] }) {
    const { errors } = usePage().props

    // Format products untuk react-select (with defensive check)
    const productOptions = (products || []).map(product => {
        const barcodeText = product.barcode ? ` (${product.barcode})` : '';
        const categoryText = product.category?.name || 'Tanpa Kategori';
        return {
            value: product.id,
            label: `${product.title}${barcodeText} - ${categoryText}`
        };
    })

    // Format suppliers untuk react-select (with defensive check)
    const supplierOptions = (suppliers || []).map(supplier => ({
        value: supplier.id,
        label: supplier.company ? `${supplier.name} (${supplier.company})` : supplier.name
    }))

    // State untuk form data
    const [formData, setFormData] = useState({
        warehouse_id: (warehouses || []).length > 0 ? warehouses[0].id : '',
        supplier_id: '',
        invoice_number: '',
    })

    // State untuk items (multi-item entry)
    const [items, setItems] = useState([{
        id: Date.now(),
        product_id: '',
        // Unit conversion fields
        packaging_qty: '',      // Qty kemasan (misal: 10 box)
        packaging_unit: 'pcs',  // Jenis satuan (box, karton, pcs, dll)
        qty_per_package: '1',   // Isi per kemasan (misal: 40 pcs per box)
        quantity: '',           // Total qty (calculated: packaging_qty × qty_per_package)
        purchase_price: '',
        batch_number: '',
        expiry_date: '',
        note: '',
        stock_info: null,
        last_price_info: null,
        priceAutoFilled: false,
    }])

    // Packaging unit options
    const packagingUnits = [
        { value: 'pcs', label: 'Pcs/Biji' },
        { value: 'box', label: 'Box' },
        { value: 'karton', label: 'Karton' },
        { value: 'dus', label: 'Dus' },
        { value: 'pack', label: 'Pack' },
        { value: 'lusin', label: 'Lusin (12)' },
        { value: 'kodi', label: 'Kodi (20)' },
        { value: 'kg', label: 'Kg' },
        { value: 'liter', label: 'Liter' },
        { value: 'botol', label: 'Botol' },
        { value: 'kaleng', label: 'Kaleng' },
        { value: 'sak', label: 'Sak' },
    ]

    const [isSubmitting, setIsSubmitting] = useState(false)

    // Format currency
    const formatCurrency = (value) => {
        if (!value) return ''
        const num = parseInt(String(value).replace(/\D/g, ''), 10)
        if (isNaN(num)) return ''
        return new Intl.NumberFormat('id-ID').format(num)
    }

    const parseCurrency = (value) => {
        return String(value).replace(/\D/g, '')
    }

    // Fetch product stock info
    const fetchProductStock = useCallback(async (productId, itemId) => {
        if (!productId) return
        try {
            const response = await axios.get(route('stock-movements.productStock'), {
                params: {
                    product_id: productId,
                    warehouse_id: formData.warehouse_id
                }
            })
            setItems(prev => prev.map(item =>
                item.id === itemId
                    ? { ...item, stock_info: response.data }
                    : item
            ))
        } catch (error) {
            console.error('Error fetching stock:', error)
        }
    }, [formData.warehouse_id])

    // Fetch last purchase price
    const fetchLastPrice = useCallback(async (productId, itemId) => {
        if (!productId) return
        try {
            const response = await axios.get(route('stock-movements.lastPrice'), {
                params: {
                    product_id: productId,
                    supplier_id: formData.supplier_id || null
                }
            })

            // Debug: log API response
            console.log('Last Price API Response:', response.data)

            setItems(prev => prev.map(item => {
                if (item.id === itemId) {
                    const updatedItem = { ...item, last_price_info: response.data }

                    // Auto-fill price if available, current price is empty, and not already auto-filled
                    if (response.data.purchase_price && !item.purchase_price && !item.priceAutoFilled) {
                        const rawPrice = response.data.purchase_price
                        const numericPrice = Number(rawPrice)

                        console.log('Auto-fill Debug:', { rawPrice, numericPrice, type: typeof rawPrice })

                        if (!isNaN(numericPrice) && numericPrice > 0) {
                            updatedItem.purchase_price = String(Math.round(numericPrice))
                            updatedItem.priceAutoFilled = true // Mark as auto-filled to prevent duplicates
                            console.log('Auto-filled price:', updatedItem.purchase_price)
                        }
                    }
                    return updatedItem
                }
                return item
            }))
        } catch (error) {
            console.error('Error fetching last price:', error)
        }
    }, [formData.supplier_id])

    // Handle product change
    const handleProductChange = (itemId, option) => {
        const productId = option ? option.value : ''
        setItems(prev => prev.map(item =>
            item.id === itemId
                ? { ...item, product_id: productId, stock_info: null, last_price_info: null }
                : item
        ))

        if (productId) {
            fetchProductStock(productId, itemId)
            fetchLastPrice(productId, itemId)
        }
    }

    // Handle item field change with auto-calculation
    const handleItemChange = (itemId, field, value) => {
        setItems(prev => prev.map(item => {
            if (item.id !== itemId) return item

            const updatedItem = { ...item, [field]: value }

            // Auto-calculate total quantity when packaging fields change
            if (['packaging_qty', 'qty_per_package', 'packaging_unit'].includes(field)) {
                const packagingQty = parseInt(updatedItem.packaging_qty) || 0
                const qtyPerPackage = parseInt(updatedItem.qty_per_package) || 1

                // If unit is 'pcs', no conversion needed
                if (updatedItem.packaging_unit === 'pcs') {
                    updatedItem.quantity = String(packagingQty)
                    updatedItem.qty_per_package = '1'
                } else {
                    updatedItem.quantity = String(packagingQty * qtyPerPackage)
                }
            }

            return updatedItem
        }))
    }

    // Add new item row
    const addItem = () => {
        setItems(prev => [...prev, {
            id: Date.now(),
            product_id: '',
            packaging_qty: '',
            packaging_unit: 'pcs',
            qty_per_package: '1',
            quantity: '',
            purchase_price: '',
            batch_number: '',
            expiry_date: '',
            note: '',
            stock_info: null,
            last_price_info: null,
            priceAutoFilled: false,
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

    // Calculate totals
    const totalItems = items.filter(item => item.product_id && item.quantity).length
    const totalQty = items.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0)
    // Total is sum of purchase prices (Harga Beli is total amount, not per-unit)
    const totalValue = items.reduce((sum, item) => {
        const price = parseInt(parseCurrency(item.purchase_price)) || 0
        return sum + price
    }, 0)

    // Submit form
    const submit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Validate items - check packaging_qty instead of quantity
        const validItems = items.filter(item => item.product_id && item.packaging_qty)
        if (validItems.length === 0) {
            toast.error('Minimal harus ada 1 item dengan produk dan qty kemasan')
            setIsSubmitting(false)
            return
        }

        // Prepare data with packaging conversion fields
        const payload = {
            warehouse_id: formData.warehouse_id,
            supplier_id: formData.supplier_id || null,
            invoice_number: formData.invoice_number || null,
            items: validItems.map(item => ({
                product_id: item.product_id,
                packaging_qty: parseInt(item.packaging_qty) || 0,
                packaging_unit: item.packaging_unit || 'pcs',
                qty_per_package: parseInt(item.qty_per_package) || 1,
                quantity: parseInt(item.quantity) || 0, // Calculated total
                purchase_price: parseCurrency(item.purchase_price) || null,
                batch_number: item.batch_number || null,
                expiry_date: item.expiry_date || null,
                note: item.note || null,
            }))
        }

        try {
            router.post(route('stock-movements.store'), payload, {
                onSuccess: () => {
                    toast('Stok berhasil ditambahkan ke gudang', {
                        icon: '👏',
                        style: { borderRadius: '10px', background: '#1C1F29', color: '#fff' },
                    })
                },
                onError: (errors) => {
                    console.error('Errors:', errors)
                    toast.error('Terjadi kesalahan saat menyimpan')
                },
                onFinish: () => {
                    setIsSubmitting(false)
                }
            })
        } catch (error) {
            console.error('Submit error:', error)
            toast.error('Terjadi kesalahan')
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <Head title='Barang Masuk' />
            <form onSubmit={submit}>
                {/* Header Info Card */}
                <Card
                    title={'Barang Masuk ke Gudang'}
                    icon={<IconCirclePlus size={20} strokeWidth={1.5} />}
                >
                    <div className='grid grid-cols-12 gap-4'>
                        <div className='col-span-12 md:col-span-4'>
                            <SearchableSelect
                                label="Supplier"
                                options={supplierOptions}
                                value={supplierOptions.find(opt => opt.value == formData.supplier_id) || null}
                                onChange={(option) => setFormData(prev => ({ ...prev, supplier_id: option ? option.value : '' }))}
                                placeholder="Pilih supplier (opsional)..."
                                isClearable={true}
                                errors={errors.supplier_id}
                            />
                        </div>
                        <div className='col-span-12 md:col-span-4'>
                            <Select
                                label="Gudang Tujuan"
                                value={formData.warehouse_id}
                                onChange={e => setFormData(prev => ({ ...prev, warehouse_id: e.target.value }))}
                                errors={errors.warehouse_id}
                            >
                                {warehouses.map(warehouse => (
                                    <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
                                ))}
                            </Select>
                        </div>
                        <div className='col-span-12 md:col-span-4'>
                            <Input
                                name='invoice_number'
                                label={'No. Faktur / Invoice'}
                                type={'text'}
                                placeholder={'Nomor faktur...'}
                                value={formData.invoice_number}
                                errors={errors.invoice_number}
                                onChange={e => setFormData(prev => ({ ...prev, invoice_number: e.target.value }))}
                            />
                        </div>
                    </div>
                </Card>

                {/* Items Card */}
                <Card
                    title={'Daftar Produk'}
                    icon={<IconCirclePlus size={20} strokeWidth={1.5} />}
                    className="mt-4"
                >
                    {/* Header with Add Button */}
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Tambahkan produk yang akan masuk ke gudang
                        </span>
                        <Button
                            type={'button'}
                            label={'Tambah Item'}
                            icon={<IconPlus size={18} strokeWidth={1.5} />}
                            className={'bg-blue-500 text-white hover:bg-blue-600 text-sm py-1.5 px-3'}
                            onClick={addItem}
                        />
                    </div>

                    <div className="space-y-4">
                        {items.map((item, index) => (
                            <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Item #{index + 1}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-500 hover:text-red-700 p-1"
                                    >
                                        <IconTrash size={18} />
                                    </button>
                                </div>

                                <div className='grid grid-cols-12 gap-3'>
                                    {/* Produk */}
                                    <div className='col-span-12 md:col-span-6'>
                                        <SearchableSelect
                                            label="Produk"
                                            options={productOptions}
                                            value={productOptions.find(opt => opt.value == item.product_id) || null}
                                            onChange={(option) => handleProductChange(item.id, option)}
                                            placeholder="Cari dan pilih produk..."
                                            errors={errors[`items.${index}.product_id`]}
                                        />
                                        {/* Stock Info */}
                                        {item.stock_info && (
                                            <div className="mt-1 flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                                                <IconInfoCircle size={14} />
                                                <span>
                                                    Stok: Gudang {item.stock_info.warehouse_stock} | Display {item.stock_info.display_stock} | Total {item.stock_info.total_stock}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Qty Kemasan */}
                                    <div className='col-span-4 md:col-span-2'>
                                        <Input
                                            name={`packaging_qty_${item.id}`}
                                            label={'Qty Kemasan'}
                                            type={'number'}
                                            min='1'
                                            placeholder={'Qty'}
                                            value={item.packaging_qty}
                                            errors={errors[`items.${index}.packaging_qty`]}
                                            onChange={e => handleItemChange(item.id, 'packaging_qty', e.target.value)}
                                        />
                                    </div>

                                    {/* Jenis Satuan */}
                                    <div className='col-span-4 md:col-span-2'>
                                        <Select
                                            label="Satuan"
                                            value={item.packaging_unit}
                                            onChange={e => handleItemChange(item.id, 'packaging_unit', e.target.value)}
                                        >
                                            {packagingUnits.map(unit => (
                                                <option key={unit.value} value={unit.value}>{unit.label}</option>
                                            ))}
                                        </Select>
                                    </div>

                                    {/* Isi per Kemasan */}
                                    <div className='col-span-4 md:col-span-2'>
                                        <Input
                                            name={`qty_per_package_${item.id}`}
                                            label={'Isi/Kemasan'}
                                            type={'number'}
                                            min='1'
                                            placeholder={'Isi'}
                                            value={item.qty_per_package}
                                            disabled={item.packaging_unit === 'pcs'}
                                            errors={errors[`items.${index}.qty_per_package`]}
                                            onChange={e => handleItemChange(item.id, 'qty_per_package', e.target.value)}
                                        />
                                    </div>

                                    {/* Total Qty (read-only) */}
                                    <div className='col-span-6 md:col-span-2'>
                                        <div className="flex flex-col gap-2">
                                            <label className='text-gray-600 text-sm dark:text-gray-300'>Total Qty</label>
                                            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-md px-3 py-2 text-sm font-semibold text-blue-700 dark:text-blue-300">
                                                {item.quantity || 0} pcs
                                            </div>
                                        </div>
                                    </div>

                                    {/* Harga */}
                                    <div className='col-span-6 md:col-span-4'>
                                        <Input
                                            name={`purchase_price_${item.id}`}
                                            label={'Total Harga Beli (Rp)'}
                                            type={'text'}
                                            placeholder={'Total harga'}
                                            value={formatCurrency(item.purchase_price)}
                                            errors={errors[`items.${index}.purchase_price`]}
                                            onChange={e => handleItemChange(item.id, 'purchase_price', parseCurrency(e.target.value))}
                                        />
                                        {item.last_price_info?.purchase_price && (
                                            <div className="mt-1 text-xs text-gray-500">
                                                Harga terakhir: Rp {formatCurrency(Math.round(item.last_price_info.purchase_price))} ({item.last_price_info.last_date})
                                            </div>
                                        )}
                                    </div>

                                    {/* Batch Number */}
                                    <div className='col-span-6 md:col-span-4'>
                                        <Input
                                            name={`batch_number_${item.id}`}
                                            label={'No. Batch'}
                                            type={'text'}
                                            placeholder={'Nomor batch (opsional)'}
                                            value={item.batch_number}
                                            errors={errors[`items.${index}.batch_number`]}
                                            onChange={e => handleItemChange(item.id, 'batch_number', e.target.value)}
                                        />
                                    </div>

                                    {/* Expiry Date */}
                                    <div className='col-span-6 md:col-span-4'>
                                        <Input
                                            name={`expiry_date_${item.id}`}
                                            label={'Tanggal Kadaluarsa'}
                                            type={'date'}
                                            value={item.expiry_date}
                                            errors={errors[`items.${index}.expiry_date`]}
                                            onChange={e => handleItemChange(item.id, 'expiry_date', e.target.value)}
                                        />
                                    </div>

                                    {/* Note */}
                                    <div className='col-span-12 md:col-span-4'>
                                        <Input
                                            name={`note_${item.id}`}
                                            label={'Catatan'}
                                            type={'text'}
                                            placeholder={'Catatan (opsional)'}
                                            value={item.note}
                                            errors={errors[`items.${index}.note`]}
                                            onChange={e => handleItemChange(item.id, 'note', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalItems}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Item</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalQty}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Total Qty</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">Rp {formatCurrency(totalValue)}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Total Nilai</div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Actions */}
                <div className="mt-4 flex items-center justify-end gap-2">
                    <Button
                        type={'button'}
                        label={'Kembali'}
                        icon={<IconArrowLeft size={20} strokeWidth={1.5} />}
                        className={'border bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700'}
                        onClick={() => router.visit(route('stock-movements.index'))}
                    />
                    <Button
                        type={'submit'}
                        label={isSubmitting ? 'Menyimpan...' : 'Simpan'}
                        icon={<IconPencilPlus size={20} strokeWidth={1.5} />}
                        className={'border bg-green-500 text-white hover:bg-green-600'}
                        disabled={isSubmitting}
                    />
                </div>
            </form>
        </>
    )
}

Create.layout = page => <DashboardLayout children={page} />
