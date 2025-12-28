import React, { useState } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, useForm, usePage, router } from '@inertiajs/react'
import Card from '@/Components/Common/Card'
import Button from '@/Components/Common/Button'
import { IconPencilPlus, IconLeaf, IconArrowLeft } from '@tabler/icons-react'
import Input from '@/Components/Common/Input'
import Textarea from '@/Components/Common/TextArea'
import toast from 'react-hot-toast'
import InputSelect from '@/Components/Common/InputSelect'
import Select from '@/Components/Common/Select'
import ImagePreview from '@/Components/Product/ImagePreview'
import PriceHistoryTable from '@/Components/Product/PriceHistoryTable'

const unitOptions = [
    { value: 'kg', label: 'Kilogram (KG)' },
    { value: 'gram', label: 'Gram' },
    { value: 'liter', label: 'Liter' },
    { value: 'ml', label: 'Mililiter (ML)' },
    { value: 'pcs', label: 'Pcs (Pieces)' },
    { value: 'buah', label: 'Buah' },
    { value: 'pack', label: 'Pack' },
]

export default function Edit({ ingredient, categories, priceHistories = [] }) {
    const { errors } = usePage().props

    const { data, setData, post, processing } = useForm({
        _method: 'PUT',
        image: '',
        barcode: ingredient.barcode || '',
        title: ingredient.title || '',
        category_id: ingredient.category_id || '',
        description: ingredient.description || '',
        buy_price: ingredient.buy_price || '',
        sell_price: ingredient.sell_price || '',
        unit: ingredient.unit || 'kg'
    })

    const [selectedCategory, setSelectedCategory] = useState(
        categories.find(c => c.id === ingredient.category_id) || null
    )

    const setSelectedCategoryHandler = (value) => {
        setSelectedCategory(value)
        setData('category_id', value.id)
    }

    const handleImageChange = (e) => {
        const image = e.target.files[0]
        setData('image', image)
    }

    const submit = (e) => {
        e.preventDefault()
        post(route('ingredients.update', ingredient.id), {
            onSuccess: () => {
                toast.success('Bahan baku berhasil diperbarui!')
            },
            onError: () => {
                toast.error('Terjadi kesalahan!')
            },
        })
    }

    return (
        <>
            <Head title='Edit Bahan Baku' />
            <Card
                title={'Edit Bahan Baku'}
                icon={<IconLeaf size={20} strokeWidth={1.5} />}
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
                            className={'border bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:border-green-700 dark:hover:bg-green-700'}
                        />
                    </div>
                }
                form={submit}
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
                    <div className='col-span-12'>
                        <Input
                            type={'text'}
                            label={'Nama Bahan Baku'}
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            errors={errors.title}
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
                            label={'Deskripsi (Opsional)'}
                            errors={errors.description}
                            onChange={e => setData('description', e.target.value)}
                            value={data.description}
                        />
                    </div>
                    <div className='col-span-6'>
                        <Input
                            type={'number'}
                            label={'Harga Beli per Satuan'}
                            value={data.buy_price}
                            onChange={e => setData('buy_price', e.target.value)}
                            errors={errors.buy_price}
                        />
                    </div>
                    <div className='col-span-6'>
                        <Input
                            type={'number'}
                            label={'Harga Jual per Satuan'}
                            value={data.sell_price}
                            onChange={e => setData('sell_price', e.target.value)}
                            errors={errors.sell_price}
                        />
                    </div>

                    {/* Price History */}
                    {priceHistories && priceHistories.length > 0 && (
                        <div className='col-span-12'>
                            <PriceHistoryTable priceHistories={priceHistories} />
                        </div>
                    )}
                </div>
            </Card>
        </>
    )
}

Edit.layout = page => <DashboardLayout children={page} />
