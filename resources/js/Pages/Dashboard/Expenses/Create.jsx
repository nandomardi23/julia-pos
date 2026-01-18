import React, { useState } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, router, useForm } from '@inertiajs/react'
import Card from '@/Components/Common/Card'
import Button from '@/Components/Common/Button'
import { IconReceipt, IconArrowLeft, IconUpload } from '@tabler/icons-react'

export default function Create({ categories }) {
    const [previewImage, setPreviewImage] = useState(null)
    
    const { data, setData, post, processing, errors } = useForm({
        expense_category_id: '',
        amount: '',
        expense_date: new Date().toISOString().split('T')[0],
        description: '',
        proof_image: null,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('expenses.store'))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setData('proof_image', file)
            setPreviewImage(URL.createObjectURL(file))
        }
    }

    return (
        <>
            <Head title="Tambah Pengeluaran" />
            
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tambah Pengeluaran</h1>
                <Button
                    type={'link'}
                    label={'Kembali'}
                    icon={<IconArrowLeft size={18} strokeWidth={1.5} />}
                    className={'border bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700'}
                    href={route('expenses.index')}
                />
            </div>

            <Card
                title="Form Pengeluaran"
                icon={<IconReceipt size={20} strokeWidth={1.5} />}
            >
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Kategori */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Kategori <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={data.expense_category_id}
                                onChange={(e) => setData('expense_category_id', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Pilih Kategori</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            {errors.expense_category_id && <p className="text-red-500 text-xs mt-1">{errors.expense_category_id}</p>}
                        </div>

                        {/* Tanggal */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Tanggal <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                value={data.expense_date}
                                onChange={(e) => setData('expense_date', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.expense_date && <p className="text-red-500 text-xs mt-1">{errors.expense_date}</p>}
                        </div>

                        {/* Jumlah */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Jumlah (Rp) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={data.amount}
                                onChange={(e) => setData('amount', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                placeholder="0"
                                min="0"
                            />
                            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                        </div>

                        {/* Bukti Pembayaran */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Bukti Pembayaran
                            </label>
                            <div className="flex items-center gap-4">
                                <label className="flex-1 cursor-pointer">
                                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                                        <IconUpload size={24} className="mx-auto mb-2 text-gray-400" />
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {data.proof_image ? data.proof_image.name : 'Klik untuk upload'}
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                                {previewImage && (
                                    <img src={previewImage} alt="Preview" className="w-20 h-20 object-cover rounded-lg border" />
                                )}
                            </div>
                            {errors.proof_image && <p className="text-red-500 text-xs mt-1">{errors.proof_image}</p>}
                        </div>

                        {/* Deskripsi */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Deskripsi
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                rows={3}
                                placeholder="Keterangan pengeluaran..."
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-6 pt-4 border-t dark:border-gray-800">
                        <Button
                            type={'link'}
                            label={'Batal'}
                            className={'border bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200'}
                            href={route('expenses.index')}
                        />
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </Card>
        </>
    )
}

Create.layout = page => <DashboardLayout children={page} />
