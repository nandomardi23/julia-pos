import React, { useState } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, useForm, usePage } from '@inertiajs/react'
import Card from '@/Components/Dashboard/Card'
import Button from '@/Components/Dashboard/Button'
import { IconPencilPlus, IconUsersPlus } from '@tabler/icons-react'
import Input from '@/Components/Dashboard/Input'
import Textarea from '@/Components/Dashboard/TextArea'
import toast from 'react-hot-toast'
import InputSelect from '@/Components/Dashboard/InputSelect'
import Select from '@/Components/Dashboard/Select'

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

export default function Create({ categories, suppliers }) {

    const { errors } = usePage().props

    const { data, setData, post, processing } = useForm({
        image: '',
        barcode: '',
        title: '',
        category_id: '',
        supplier_id: '',
        description: '',
        buy_price: '',
        sell_price: '',
        unit: 'pcs'
    })

    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedSupplier, setSelectedSupplier] = useState(null)

    // Set category
    const setSelectedCategoryHandler = (value) => {
        setSelectedCategory(value)
        setData('category_id', value.id)
    }

    // Set supplier
    const setSelectedSupplierHandler = (value) => {
        setSelectedSupplier(value)
        setData('supplier_id', value ? value.id : '')
    }


    const handleImageChange = (e) => {
        const image = e.target.files[0]
        setData('image', image)
    }

    const submit = (e) => {
        e.preventDefault()
        post(route('products.store'), {
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
            <Head title='Tambah Data Produk' />
            <Card
                title={'Tambah Data Produk'}
                icon={<IconUsersPlus size={20} strokeWidth={1.5} />}
                footer={
                    <Button
                        type={'submit'}
                        label={'Simpan'}
                        icon={<IconPencilPlus size={20} strokeWidth={1.5} />}
                        className={'border bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-900'}
                    />
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
                    <div className='col-span-12'>
                        <InputSelect
                            label="Supplier (Opsional)"
                            data={suppliers.map(s => ({ ...s, name: s.company ? `${s.name} (${s.company})` : s.name }))}
                            selected={selectedSupplier}
                            setSelected={setSelectedSupplierHandler}
                            placeholder="Pilih supplier"
                            errors={errors.supplier_id}
                            multiple={false}
                            searchable={true}
                            displayKey='name'
                        />
                    </div>
                    <div className='col-span-12'>
                        <Input
                            type={'text'}
                            label={'Kode Produk/Barcode'}
                            value={data.barcode}
                            onChange={e => setData('barcode', e.target.value)}
                            errors={errors.barcode}
                            placeholder={'Barcode'}
                        />
                    </div>
                    <div className='col-span-6'>
                        <Input
                            type={'text'}
                            label={'Nama'}
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            errors={errors.title}
                            placeholder={'Nama produk'}
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
                            placeholder={'Deskripsi produk'}
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
                            placeholder={'Harga beli produk'}
                        />
                    </div>
                    <div className='col-span-6'>
                        <Input
                            type={'number'}
                            label={'Harga Jual'}
                            value={data.sell_price}
                            onChange={e => setData('sell_price', e.target.value)}
                            errors={errors.sell_price}
                            placeholder={'Harga jual produk'}
                        />
                    </div>
                </div>
            </Card>
        </>
    )
}

Create.layout = page => <DashboardLayout children={page} />
