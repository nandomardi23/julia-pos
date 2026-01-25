import React, { useEffect, useState, useMemo } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, useForm, usePage, router } from '@inertiajs/react'
import Card from '@/Components/Common/Card'
import Button from '@/Components/Common/Button'
import { IconPencilPlus, IconBox, IconArrowLeft } from '@tabler/icons-react'
import Input from '@/Components/Common/Input'
import Textarea from '@/Components/Common/TextArea'
import ConfirmDialog from '@/Components/Common/ConfirmDialog'
import toast from 'react-hot-toast'
import InputSelect from '@/Components/Common/InputSelect'
import Select from '@/Components/Common/Select'
import ImagePreview from '@/Components/Product/ImagePreview'
import { parseDecimalInput } from '@/Utils/Format'

// Daftar satuan yang tersedia
const unitOptions = [
    { value: 'pcs', label: 'Pcs (Pieces)' },
    { value: 'cup', label: 'Cup' },
    { value: 'botol', label: 'Botol' },
    { value: 'gelas', label: 'Gelas' },
    { value: 'kg', label: 'Kilogram (KG)' },
    { value: 'gram', label: 'Gram' },
    { value: 'liter', label: 'Liter' },
    { value: 'ml', label: 'Mililiter (ML)' },
    { value: 'pack', label: 'Pack' },
    { value: 'dus', label: 'Dus' },
    { value: 'box', label: 'Box' },
    { value: 'sisir', label: 'Sisir' },
    { value: 'buah', label: 'Buah' },
    { value: 'porsi', label: 'Porsi' },
    { value: 'lembar', label: 'Lembar' },
    { value: 'pasang', label: 'Pasang' },
]

export default function Edit({ categories, ingredient }) {

    const { errors } = usePage().props
    const [showConfirm, setShowConfirm] = useState(false)

    // Simpan data original untuk perbandingan
    const originalData = useMemo(() => ({
        sku: ingredient.sku || '',
        barcode: ingredient.barcode || '',
        title: ingredient.title || '',
        category_id: ingredient.category_id || '',
        description: ingredient.description || '',
        buy_price: ingredient.buy_price || 0,
        sell_price: ingredient.sell_price || 0,
        min_stock: parseDecimalInput(ingredient.min_stock),
        unit: ingredient.unit || 'pcs',
    }), [ingredient.id])

    const { data, setData, post, processing } = useForm({
        image: '',
        sku: ingredient.sku || '',
        barcode: ingredient.barcode || '',
        title: ingredient.title || '',
        category_id: ingredient.category_id || '',
        description: ingredient.description || '',
        buy_price: ingredient.buy_price || 0,
        sell_price: ingredient.sell_price || 0,
        min_stock: parseDecimalInput(ingredient.min_stock),
        unit: ingredient.unit || 'pcs',
        _method: 'PUT'
    })

    // Cek apakah ada perubahan data
    const hasChanges = () => {
        // Jika ada gambar baru, berarti ada perubahan
        if (data.image) return true
        if (data.sku !== originalData.sku) return true
        if ((data.barcode || '') !== (originalData.barcode || '')) return true
        if (data.title !== originalData.title) return true
        if (data.category_id !== originalData.category_id) return true
        if ((data.description || '') !== (originalData.description || '')) return true
        if (parseFloat(data.buy_price) !== parseFloat(originalData.buy_price)) return true
        if (parseFloat(data.sell_price) !== parseFloat(originalData.sell_price)) return true
        if (parseFloat(data.min_stock || 0) !== parseFloat(originalData.min_stock || 0)) return true
        if (data.unit !== originalData.unit) return true
        return false
    }

    const [selectedCategory, setSelectedCategory] = useState(null)

    // Set category
    const setSelectedCategoryHandler = (value) => {
        setSelectedCategory(value)
        setData('category_id', value.id)
    }

    useEffect(() => {
        if (ingredient.category_id) {
            setSelectedCategory(categories.find(category => category.id === ingredient.category_id))
        }
    }, [ingredient.category_id])

    const handleImageChange = (e) => {
        const image = e.target.files[0]
        setData('image', image)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (!hasChanges()) {
            toast('Tidak ada perubahan data', {
                icon: 'ℹ️',
                style: {
                    borderRadius: '10px',
                    background: '#3B82F6',
                    color: '#fff',
                },
            })
            return
        }
        
        setShowConfirm(true)
    }

    const confirmUpdate = () => {
        post(route('ingredients.update', ingredient.id), {
            onSuccess: () => {
                setShowConfirm(false)
                if (Object.keys(errors).length === 0) {
                    toast('Data berhasil diubah', {
                        icon: '👏',
                        style: {
                            borderRadius: '10px',
                            background: '#1C1F29',
                            color: '#fff',
                        },
                    })
                }
            },
            onError: () => {
                setShowConfirm(false)
                toast('Terjadi kesalahan dalam penyimpanan data', {
                    style: {
                        borderRadius: '10px',
                        background: '#FF0000',
                        color: '#fff',
                    },
                })
            },
        })
    }

    return (
        <>
            <Head title='Ubah Bahan Baku' />
            <Card
                title={'Ubah Bahan Baku'}
                icon={<IconBox size={20} strokeWidth={1.5} />}
                footer={
                    <div className='flex items-center gap-2'>
                        <Button
                            type={'button'}
                            label={'Kembali'}
                            icon={<IconArrowLeft size={20} strokeWidth={1.5} />}
                            className={'border bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700'}
                            onClick={() => router.visit(route('ingredients.index'))}
                        />
                        <Button
                            type={'submit'}
                            label={'Simpan Perubahan'}
                            icon={<IconPencilPlus size={20} strokeWidth={1.5} />}
                            className={'border bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-900'}
                        />
                    </div>
                }
                form={handleSubmit}
            >

                <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-12'>
                        <ImagePreview
                            currentImage={ingredient.image}
                            onImageChange={handleImageChange}
                            errors={errors.image}
                        />
                    </div>
                    <div className='col-span-12'>
                        <InputSelect
                            label="Kategori"
                            data={categories}
                            selected={selectedCategory}
                            setSelected={setSelectedCategoryHandler}
                            placeholder="Pilih kategori"
                            errors={errors.category_id}
                            multiple={false}
                            searchable={true}
                            displayKey='name'
                        />
                    </div>

                    <div className='col-span-6'>
                        <Input
                            type={'text'}
                            label={'SKU'}
                            value={data.sku}
                            onChange={e => setData('sku', e.target.value)}
                            errors={errors.sku}
                            placeholder={'Kode SKU'}
                        />
                    </div>
                    <div className='col-span-6'>
                        <Input
                            type={'text'}
                            label={'Barcode (opsional)'}
                            value={data.barcode}
                            onChange={e => setData('barcode', e.target.value)}
                            errors={errors.barcode}
                            placeholder={'EAN-13 untuk scan'}
                        />
                    </div>
                    <div className='col-span-6'>
                        <Input
                            type={'text'}
                            label={'Nama'}
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            errors={errors.title}
                            placeholder={'Nama bahan baku'}
                        />
                    </div>
                    <div className='col-span-6'>
                        <Select
                            label="Satuan"
                            value={data.unit}
                            onChange={e => setData('unit', e.target.value)}
                            errors={errors.unit}
                        >
                            {unitOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div className='col-span-12'>
                        <Textarea
                            name='description'
                            label={'Deskripsi'}
                            type={'text'}
                            placeholder={'Deskripsi bahan baku'}
                            errors={errors.description}
                            onChange={e => setData('description', e.target.value)}
                            value={data.description}
                        />
                    </div>
                    <div className='col-span-6'>
                        <Input
                            type={'number'}
                            label={'Harga Beli'}
                            value={data.buy_price}
                            onChange={e => setData('buy_price', e.target.value)}
                            errors={errors.buy_price}
                            placeholder={'Harga beli'}
                        />
                    </div>
                    <div className='col-span-6'>
                        <Input
                            type={'number'}
                            label={'Harga Jual (Opsional)'}
                            value={data.sell_price}
                            onChange={e => setData('sell_price', e.target.value)}
                            errors={errors.sell_price}
                            placeholder={'0 jika tidak dijual langsung'}
                        />
                    </div>
                    <div className='col-span-6'>
                        <Input
                            type={'number'}
                            step={'0.001'}
                            label={'Stok Minimum (Alert)'}
                            value={data.min_stock}
                            onChange={e => setData('min_stock', e.target.value)}
                            errors={errors.min_stock}
                            placeholder={'0 = tidak ada alert'}
                        />
                    </div>
                </div>
            </Card>

            <ConfirmDialog
                show={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={confirmUpdate}
                title="Konfirmasi Perubahan"
                message="Apakah Anda yakin ingin menyimpan perubahan data bahan baku ini?"
                confirmLabel="Ya, Simpan"
                cancelLabel="Batal"
                type="warning"
                processing={processing}
            />
        </>
    )
}

Edit.layout = page => <DashboardLayout children={page} />
