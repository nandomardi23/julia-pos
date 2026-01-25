import React, { useState } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, useForm, usePage, router } from '@inertiajs/react'
import Card from '@/Components/Common/Card'
import Button from '@/Components/Common/Button'
import { IconPencilPlus, IconBox, IconArrowLeft } from '@tabler/icons-react'
import Input from '@/Components/Common/Input'
import Textarea from '@/Components/Common/TextArea'
import toast from 'react-hot-toast'
import InputSelect from '@/Components/Common/InputSelect'
import Select from '@/Components/Common/Select'

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

export default function Create({ categories }) {

    const { errors } = usePage().props

    const { data, setData, post, processing } = useForm({
        image: '',
        sku: '',
        barcode: '',
        title: '',
        category_id: '',
        description: '',
        buy_price: '',
        sell_price: '',
        unit: 'pcs',
        min_stock: '',
    })

    const [selectedCategory, setSelectedCategory] = useState(null)

    // Set category
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
        post(route('ingredients.store'), {
            onSuccess: () => {
                if (Object.keys(errors).length === 0) {
                    toast('Data berhasil disimpan', {
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
            <Head title='Tambah Bahan Baku' />
            <Card
                title={'Tambah Bahan Baku'}
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
                            label={'Simpan'}
                            icon={<IconPencilPlus size={20} strokeWidth={1.5} />}
                            className={'border bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-900'}
                        />
                    </div>
                }
                form={submit}
            >

                <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-12'>
                        <Input
                            type={'file'}
                            label={'Gambar'}
                            onChange={handleImageChange}
                            errors={errors.image}
                            placeholder={'Gambar produk'}
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

                    <div className='col-span-6'>
                        <Input
                            type={'text'}
                            label={'SKU (otomatis)'}
                            value={data.sku}
                            onChange={e => setData('sku', e.target.value)}
                            errors={errors.sku}
                            placeholder={'Kosongkan untuk auto-generate'}
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
        </>
    )
}

Create.layout = page => <DashboardLayout children={page} />
