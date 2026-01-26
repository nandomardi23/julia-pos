import React, { useState, useEffect } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, useForm, usePage, router } from '@inertiajs/react'
import Card from '@/Components/Common/Card'
import Button from '@/Components/Common/Button'
import { IconPencilPlus, IconMinus, IconAlertTriangle, IconArrowLeft } from '@tabler/icons-react'
import Input from '@/Components/Common/Input'
import Textarea from '@/Components/Common/TextArea'
import Select from '@/Components/Common/Select'
import SearchableSelect from '@/Components/Common/SearchableSelect'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function StockOut({ warehouses, displays, products, reasons }) {
    const { errors } = usePage().props

    const [availableStock, setAvailableStock] = useState(0)
    const [filteredProducts, setFilteredProducts] = useState([])

    const { data, setData, post, processing } = useForm({
        location_type: 'warehouse',
        location_id: warehouses.length > 0 ? warehouses[0].id : '',
        product_id: '',
        quantity: '',
        reason: 'damaged',
        note: ''
    })

    // Get products with stock in selected location
    useEffect(() => {
        if (data.location_type === 'warehouse') {
            const warehouse = warehouses.find(w => w.id == data.location_id)
            if (warehouse && warehouse.stocks) {
                const productIds = warehouse.stocks.map(s => s.product_id)
                setFilteredProducts(products.filter(p => productIds.includes(p.id)))
            } else {
                setFilteredProducts([])
            }
        } else {
            const display = displays.find(d => d.id == data.location_id)
            if (display && display.stocks) {
                const productIds = display.stocks.map(s => s.product_id)
                setFilteredProducts(products.filter(p => productIds.includes(p.id)))
            } else {
                setFilteredProducts([])
            }
        }
        setData('product_id', '')
        setAvailableStock(0)
    }, [data.location_type, data.location_id])

    // Get available stock when product changes
    useEffect(() => {
        if (data.location_id && data.product_id) {
            const url = data.location_type === 'warehouse' 
                ? route('stock-movements.warehouseStock')
                : route('stock-movements.displayStock')
            
            const params = data.location_type === 'warehouse'
                ? { warehouse_id: data.location_id, product_id: data.product_id }
                : { display_id: data.location_id, product_id: data.product_id }

            axios.get(url, { params }).then(response => {
                setAvailableStock(response.data.quantity)
            }).catch(error => {
                setAvailableStock(0)
            })
        } else {
            setAvailableStock(0)
        }
    }, [data.product_id, data.location_id, data.location_type])

    // Format products untuk react-select
    const productOptions = filteredProducts.map(product => ({
        value: product.id,
        label: product.barcode 
            ? `${product.title} (${product.barcode})` 
            : product.title
    }))

    // Find selected product option
    const selectedProduct = productOptions.find(opt => opt.value == data.product_id) || null

    const submit = (e) => {
        e.preventDefault()
        post(route('stock-movements.storeStockOut'), {
            onSuccess: () => {
                toast('Barang keluar berhasil dicatat', {
                    icon: '✅',
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

    const locations = data.location_type === 'warehouse' ? warehouses : displays

    return (
        <>
            <Head title='Barang Keluar' />
            <Card
                title={'Barang Keluar (Non-Penjualan)'}
                icon={<IconMinus size={20} strokeWidth={1.5} />}
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
                            label={'Simpan'}
                            icon={<IconPencilPlus size={20} strokeWidth={1.5} />}
                            className={'border bg-red-500 text-white hover:bg-red-600'}
                        />
                    </div>
                }
                form={submit}
            >
                <div className='bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-4'>
                    <div className='flex items-center gap-2 text-yellow-700 dark:text-yellow-300'>
                        <IconAlertTriangle size={20} />
                        <p className='text-sm'>
                            Fitur ini untuk mencatat barang keluar selain penjualan (rusak, kadaluarsa, retur, dll).
                        </p>
                    </div>
                </div>

                <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-6'>
                        <Select
                            label="Lokasi Stok"
                            value={data.location_type}
                            onChange={e => {
                                setData({
                                    ...data,
                                    location_type: e.target.value,
                                    location_id: e.target.value === 'warehouse' 
                                        ? (warehouses[0]?.id || '') 
                                        : (displays[0]?.id || ''),
                                    product_id: ''
                                })
                            }}
                        >
                            <option value="warehouse">Gudang</option>
                            <option value="display">Display</option>
                        </Select>
                    </div>
                    <div className='col-span-6'>
                        <Select
                            label={data.location_type === 'warehouse' ? 'Pilih Gudang' : 'Pilih Display'}
                            value={data.location_id}
                            onChange={e => setData('location_id', e.target.value)}
                            errors={errors.location_id}
                        >
                            {locations.map(loc => (
                                <option key={loc.id} value={loc.id}>{loc.name}</option>
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
                                    Stok tersedia: <strong>{availableStock}</strong>
                                </p>
                            </div>
                        </div>
                    )}

                    <div className='col-span-6'>
                        <Select
                            label="Alasan"
                            value={data.reason}
                            onChange={e => setData('reason', e.target.value)}
                            errors={errors.reason}
                        >
                            {Object.entries(reasons).map(([key, label]) => (
                                <option key={key} value={key}>{label}</option>
                            ))}
                        </Select>
                    </div>
                    <div className='col-span-6'>
                        <Input
                            name='quantity'
                            label={'Jumlah'}
                            type={'number'}
                            min='0.001'
                            step='any'
                            max={availableStock}
                            placeholder={'Jumlah barang keluar'}
                            value={data.quantity}
                            errors={errors.quantity}
                            onChange={e => setData('quantity', e.target.value)}
                        />
                    </div>
                    <div className="col-span-12">
                        <Textarea
                            name='note'
                            label={'Catatan (Opsional)'}
                            placeholder={'Detail keterangan barang keluar'}
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

StockOut.layout = page => <DashboardLayout children={page} />
