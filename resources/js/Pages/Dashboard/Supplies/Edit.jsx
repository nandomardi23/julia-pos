import React, { useState } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, useForm, usePage, router } from '@inertiajs/react'
import Card from '@/Components/Dashboard/Card'
import Button from '@/Components/Dashboard/Button'
import { IconPencilPlus, IconCup, IconArrowLeft } from '@tabler/icons-react'
import Input from '@/Components/Dashboard/Input'
import Textarea from '@/Components/Dashboard/TextArea'
import toast from 'react-hot-toast'
import InputSelect from '@/Components/Dashboard/InputSelect'
import Select from '@/Components/Dashboard/Select'
import ImagePreview from '@/Components/Dashboard/ImagePreview'
import PriceHistoryTable from '@/Components/Dashboard/PriceHistoryTable'

const unitOptions = [
    { value: 'pcs', label: 'Pcs (Pieces)' },
    { value: 'pack', label: 'Pack' },
    { value: 'box', label: 'Box' },
    { value: 'dus', label: 'Dus' },
    { value: 'lembar', label: 'Lembar' },
]

export default function Edit({ supply, categories, priceHistories = [] }) {
    const { errors } = usePage().props

    const { data, setData, post, processing } = useForm({
        _method: 'PUT',
        image: '',
        barcode: supply.barcode || '',
        title: supply.title || '',
        category_id: supply.category_id || '',
        description: supply.description || '',
        buy_price: supply.buy_price || '',
        unit: supply.unit || 'pcs'
    })

    const [selectedCategory, setSelectedCategory] = useState(
        categories.find(c => c.id === supply.category_id) || null
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
        post(route('supplies.update', supply.id), {
            onSuccess: () => {
                toast.success('Supply berhasil diperbarui!')
            },
            onError: () => {
                toast.error('Terjadi kesalahan!')
            },
        })
    }

    return (
        <>
            <Head title='Edit Supply' />
            <Card
                title={'Edit Supply'}
                icon={<IconCup size={20} strokeWidth={1.5} />}
                footer={
                    <div className='flex items-center gap-2'>
                        <Button
                            type={'button'}
                            label={'Kembali'}
                            icon={<IconArrowLeft size={20} strokeWidth={1.5} />}
                            className={'border bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700'}
                            onClick={() => router.visit(route('supplies.index'))}
                        />
                        <Button
                            type={'submit'}
                            label={'Simpan Perubahan'}
                            icon={<IconPencilPlus size={20} strokeWidth={1.5} />}
                            className={'border bg-purple-500 text-white hover:bg-purple-600 dark:bg-purple-600 dark:border-purple-700 dark:hover:bg-purple-700'}
                        />
                    </div>
                }
                form={submit}
            >
                <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-12'>
                        <ImagePreview
                            currentImage={supply.image}
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
                            label={'Kode/Barcode'}
                            value={data.barcode}
                            onChange={e => setData('barcode', e.target.value)}
                            errors={errors.barcode}
                        />
                    </div>
                    <div className='col-span-6'>
                        <Input
                            type={'text'}
                            label={'Nama Supply'}
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
                    <div className='col-span-12'>
                        <Input
                            type={'number'}
                            label={'Harga Beli per Satuan'}
                            value={data.buy_price}
                            onChange={e => setData('buy_price', e.target.value)}
                            errors={errors.buy_price}
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
