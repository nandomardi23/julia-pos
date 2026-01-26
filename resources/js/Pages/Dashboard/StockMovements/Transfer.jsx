import React, { useState, useEffect } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, useForm, usePage, router } from '@inertiajs/react'
import Card from '@/Components/Common/Card'
import Button from '@/Components/Common/Button'
import { IconPencilPlus, IconArrowsExchange, IconArrowLeft } from '@tabler/icons-react'
import Input from '@/Components/Common/Input'
import Textarea from '@/Components/Common/TextArea'
import Select from '@/Components/Common/Select'
import SearchableSelect from '@/Components/Common/SearchableSelect'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function Transfer({ warehouses, displays, products }) {
    const { errors } = usePage().props

    const [availableStock, setAvailableStock] = useState(0)

    const { data, setData, post, processing } = useForm({
        warehouse_id: warehouses.length > 0 ? warehouses[0].id : '',
        display_id: displays.length > 0 ? displays[0].id : '',
        product_id: '',
        quantity: '',
        note: ''
    })

    // Get available stock when warehouse or product changes
    useEffect(() => {
        if (data.warehouse_id && data.product_id) {
            axios.get(route('stock-movements.warehouseStock'), {
                params: {
                    warehouse_id: data.warehouse_id,
                    product_id: data.product_id
                }
            }).then(response => {
                setAvailableStock(response.data.quantity)
            }).catch(error => {
                setAvailableStock(0)
            })
        } else {
            setAvailableStock(0)
        }
    }, [data.warehouse_id, data.product_id])

    // Get products that have stock in selected warehouse
    const getProductsWithStock = () => {
        if (!data.warehouse_id || !warehouses.length) return products;
        
        const warehouse = warehouses.find(w => w.id == data.warehouse_id)
        if (!warehouse || !warehouse.stocks) return products;
        
        const productIdsWithStock = warehouse.stocks.map(s => s.product_id)
        return products.filter(p => productIdsWithStock.includes(p.id))
    }

    const productsWithStock = getProductsWithStock()

    // Format products untuk react-select
    const productOptions = productsWithStock.map(product => ({
        value: product.id,
        label: product.barcode 
            ? `${product.title} (${product.barcode})` 
            : product.title
    }))

    // Find selected product option
    const selectedProduct = productOptions.find(opt => opt.value == data.product_id) || null

    const submit = (e) => {
        e.preventDefault()
        post(route('stock-movements.storeTransfer'), {
            onSuccess: () => {
                toast('Stok berhasil ditransfer ke display', {
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
            <Head title='Transfer Stok' />
            <Card
                title={'Transfer Stok: Gudang → Display'}
                icon={<IconArrowsExchange size={20} strokeWidth={1.5} />}
                footer={
                    <div className='flex items-center gap-2'>
                        <Button
                            type={'button'}
                            label={'Kembali'}
                            icon={<IconArrowLeft size={20} strokeWidth={1.5} />}
                            className={'border bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700'}
                            onClick={() => router.visit(route('stock-movements.index'))}
                        />
                        <Button
                            type={'submit'}
                            label={'Transfer'}
                            icon={<IconPencilPlus size={20} strokeWidth={1.5} />}
                            className={'border bg-blue-500 text-white hover:bg-blue-600'}
                        />
                    </div>
                }
                form={submit}
            >
                <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-6'>
                        <Select
                            label="Dari Gudang"
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
                        <Select
                            label="Ke Display"
                            value={data.display_id}
                            onChange={e => setData('display_id', e.target.value)}
                            errors={errors.display_id}
                        >
                            {displays.map(display => (
                                <option key={display.id} value={display.id}>{display.name}</option>
                            ))}
                        </Select>
                    </div>
                    <div className='col-span-12'>
                        <SearchableSelect
                            label="Produk"
                            options={productOptions}
                            value={selectedProduct}
                            onChange={(option) => setData('product_id', option ? option.value : '')}
                            placeholder="Cari dan pilih produk..."
                            errors={errors.product_id}
                        />
                    </div>
                    
                    {data.product_id && (
                        <div className='col-span-12'>
                            <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3'>
                                <p className='text-sm text-blue-700 dark:text-blue-300'>
                                    Stok tersedia di gudang: <strong>{availableStock}</strong>
                                </p>
                            </div>
                        </div>
                    )}

                    <div className='col-span-6'>
                        <Input
                            name='quantity'
                            label={'Jumlah Transfer'}
                            type={'number'}
                            min='0.001'
                            step='any'
                            max={availableStock}
                            placeholder={'Jumlah yang akan ditransfer'}
                            value={data.quantity}
                            errors={errors.quantity}
                            onChange={e => setData('quantity', e.target.value)}
                        />
                    </div>
                    <div className="col-span-12">
                        <Textarea
                            name='note'
                            label={'Catatan (Opsional)'}
                            placeholder={'Catatan transfer stok'}
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

Transfer.layout = page => <DashboardLayout children={page} />
