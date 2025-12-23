import React, { useState } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, useForm, usePage } from '@inertiajs/react'
import Card from '@/Components/Dashboard/Card'
import Button from '@/Components/Dashboard/Button'
import { IconPencilPlus, IconCirclePlus } from '@tabler/icons-react'
import Input from '@/Components/Dashboard/Input'
import Textarea from '@/Components/Dashboard/TextArea'
import Select from '@/Components/Dashboard/Select'
import SearchableSelect from '@/Components/Dashboard/SearchableSelect'
import toast from 'react-hot-toast'

export default function Create({ warehouses, products, suppliers }) {
    const { errors } = usePage().props

    const { data, setData, post, processing } = useForm({
        warehouse_id: warehouses.length > 0 ? warehouses[0].id : '',
        product_id: '',
        supplier_id: '',
        quantity: '',
        purchase_price: '',
        note: ''
    })

    // Format products untuk react-select
    const productOptions = products.map(product => ({
        value: product.id,
        label: `${product.title} (${product.barcode}) - ${product.category?.name || 'Tanpa Kategori'}`
    }))

    // Format suppliers untuk react-select
    const supplierOptions = suppliers.map(supplier => ({
        value: supplier.id,
        label: supplier.company ? `${supplier.name} (${supplier.company})` : supplier.name
    }))

    // Find selected options
    const selectedProduct = productOptions.find(opt => opt.value == data.product_id) || null
    const selectedSupplier = supplierOptions.find(opt => opt.value == data.supplier_id) || null

    // Format currency
    const formatCurrency = (value) => {
        const num = parseInt(value.replace(/\D/g, ''), 10)
        if (isNaN(num)) return ''
        return new Intl.NumberFormat('id-ID').format(num)
    }

    const handlePriceChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, '')
        setData('purchase_price', rawValue)
    }

    const submit = (e) => {
        e.preventDefault()
        post(route('stock-movements.store'), {
            onSuccess: () => {
                toast('Stok berhasil ditambahkan ke gudang', {
                    icon: '👏',
                    style: { borderRadius: '10px', background: '#1C1F29', color: '#fff' },
                })
            },
            onError: () => {
                toast('Terjadi kesalahan', {
                    style: { borderRadius: '10px', background: '#FF0000', color: '#fff' },
                })
            },
        })
    }

    return (
        <>
            <Head title='Barang Masuk' />
            <Card
                title={'Barang Masuk ke Gudang'}
                icon={<IconCirclePlus size={20} strokeWidth={1.5} />}
                footer={
                    <Button
                        type={'submit'}
                        label={'Simpan'}
                        icon={<IconPencilPlus size={20} strokeWidth={1.5} />}
                        className={'border bg-green-500 text-white hover:bg-green-600'}
                    />
                }
                form={submit}
            >
                <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-6'>
                        <SearchableSelect
                            label="Supplier"
                            options={supplierOptions}
                            value={selectedSupplier}
                            onChange={(option) => setData('supplier_id', option ? option.value : '')}
                            placeholder="Pilih supplier (opsional)..."
                            isClearable={true}
                            errors={errors.supplier_id}
                        />
                    </div>
                    <div className='col-span-6'>
                        <Select
                            label="Gudang Tujuan"
                            value={data.warehouse_id}
                            onChange={e => setData('warehouse_id', e.target.value)}
                            errors={errors.warehouse_id}
                        >
                            {warehouses.map(warehouse => (
                                <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
                            ))}
                        </Select>
                    </div>
                    <div className='col-span-6'>
                        <SearchableSelect
                            label="Produk"
                            options={productOptions}
                            value={selectedProduct}
                            onChange={(option) => setData('product_id', option ? option.value : '')}
                            placeholder="Cari dan pilih produk..."
                            errors={errors.product_id}
                        />
                    </div>
                    <div className='col-span-3'>
                        <Input
                            name='quantity'
                            label={'Jumlah'}
                            type={'number'}
                            min='1'
                            placeholder={'Qty'}
                            value={data.quantity}
                            errors={errors.quantity}
                            onChange={e => setData('quantity', e.target.value)}
                        />
                    </div>
                    <div className='col-span-3'>
                        <Input
                            name='purchase_price'
                            label={'Harga Pembelian (Rp)'}
                            type={'text'}
                            placeholder={'Harga beli'}
                            value={formatCurrency(data.purchase_price)}
                            errors={errors.purchase_price}
                            onChange={handlePriceChange}
                        />
                    </div>
                    <div className="col-span-12">
                        <Textarea
                            name='note'
                            label={'Catatan (Opsional)'}
                            placeholder={'Catatan barang masuk'}
                            value={data.note}
                            errors={errors.note}
                            onChange={e => setData('note', e.target.value)}
                        />
                    </div>
                </div>
            </Card>
        </>
    )
}

Create.layout = page => <DashboardLayout children={page} />

