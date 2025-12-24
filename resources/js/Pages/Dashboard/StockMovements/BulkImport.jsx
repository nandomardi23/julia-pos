import React, { useState } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, router, usePage } from '@inertiajs/react'
import { IconUpload, IconDownload, IconFileSpreadsheet, IconAlertCircle, IconCheck } from '@tabler/icons-react'
import Button from '@/Components/Dashboard/Button'
import Select from '@/Components/Dashboard/Select'
import Card from '@/Components/Dashboard/Card'

export default function BulkImport({ warehouses, suppliers }) {
    const { flash } = usePage().props
    const [formData, setFormData] = useState({
        warehouse_id: '',
        supplier_id: '',
        file: null
    })
    const [fileName, setFileName] = useState('')
    const [isUploading, setIsUploading] = useState(false)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData({ ...formData, file })
            setFileName(file.name)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.warehouse_id || !formData.file) {
            return
        }

        setIsUploading(true)
        const form = new FormData()
        form.append('warehouse_id', formData.warehouse_id)
        form.append('supplier_id', formData.supplier_id || '')
        form.append('file', formData.file)

        router.post(route('stock-movements.processImport'), form, {
            onFinish: () => setIsUploading(false),
            forceFormData: true
        })
    }

    return (
        <>
            <Head title='Import Barang Masuk' />
            
            <div className='mb-4'>
                <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Import Barang Masuk (Excel)</h1>
                <p className='text-gray-500 dark:text-gray-400'>Upload file Excel untuk menambahkan stok ke gudang secara bulk</p>
            </div>

            <div className='grid gap-6 md:grid-cols-2'>
                {/* Step 1: Download Template */}
                <Card title="Langkah 1: Download Template">
                    <div className='space-y-4'>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>
                            Download template Excel yang berisi daftar produk. Isi kolom <strong>"Jumlah"</strong> dan <strong>"Harga Beli"</strong> untuk produk yang ingin ditambahkan stoknya.
                        </p>
                        <a
                            href={route('stock-movements.downloadTemplate')}
                            className='inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
                        >
                            <IconDownload size={18} />
                            Download Template Excel
                        </a>
                    </div>
                </Card>

                {/* Step 2: Upload File */}
                <Card title="Langkah 2: Upload File">
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <Select
                            label="Gudang Tujuan *"
                            value={formData.warehouse_id}
                            onChange={(e) => setFormData({...formData, warehouse_id: e.target.value})}
                            required
                        >
                            <option value="">Pilih Gudang</option>
                            {warehouses.map(w => (
                                <option key={w.id} value={w.id}>{w.name}</option>
                            ))}
                        </Select>

                        <Select
                            label="Supplier (Opsional)"
                            value={formData.supplier_id}
                            onChange={(e) => setFormData({...formData, supplier_id: e.target.value})}
                        >
                            <option value="">Pilih Supplier</option>
                            {suppliers.map(s => (
                                <option key={s.id} value={s.id}>{s.name} {s.company ? `(${s.company})` : ''}</option>
                            ))}
                        </Select>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                                File Excel *
                            </label>
                            <label className='flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'>
                                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                    {fileName ? (
                                        <>
                                            <IconFileSpreadsheet size={32} className='text-green-500 mb-2' />
                                            <p className='text-sm text-gray-500 dark:text-gray-400'>{fileName}</p>
                                        </>
                                    ) : (
                                        <>
                                            <IconUpload size={32} className='text-gray-400 mb-2' />
                                            <p className='text-sm text-gray-500 dark:text-gray-400'>Klik untuk upload file Excel</p>
                                        </>
                                    )}
                                </div>
                                <input 
                                    type='file' 
                                    className='hidden' 
                                    accept='.xlsx,.xls,.csv'
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>

                        <Button
                            type='submit'
                            label={isUploading ? 'Mengimport...' : 'Import ke Gudang'}
                            icon={<IconUpload size={18} />}
                            className='w-full bg-blue-600 text-white hover:bg-blue-700'
                            disabled={!formData.warehouse_id || !formData.file || isUploading}
                        />
                    </form>
                </Card>
            </div>

            {/* Success/Warning Messages */}
            {flash?.success && (
                <div className='mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 dark:bg-green-900/30 dark:border-green-800'>
                    <IconCheck size={20} className='text-green-600' />
                    <span className='text-green-800 dark:text-green-300'>{flash.success}</span>
                </div>
            )}

            {flash?.warning && (
                <div className='mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg dark:bg-yellow-900/30 dark:border-yellow-800'>
                    <div className='flex items-center gap-3 mb-2'>
                        <IconAlertCircle size={20} className='text-yellow-600' />
                        <span className='text-yellow-800 dark:text-yellow-300 font-medium'>{flash.warning}</span>
                    </div>
                    {flash.importErrors && flash.importErrors.length > 0 && (
                        <ul className='list-disc list-inside text-sm text-yellow-700 dark:text-yellow-400'>
                            {flash.importErrors.map((err, i) => (
                                <li key={i}>{err}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </>
    )
}

BulkImport.layout = page => <DashboardLayout children={page} />
