import React, { useEffect, useState } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, useForm, usePage } from '@inertiajs/react'
import Card from '@/Components/Dashboard/Card'
import Button from '@/Components/Dashboard/Button'
import { IconPencilPlus, IconUsersPlus, IconPlus, IconTrash, IconChefHat } from '@tabler/icons-react'
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

export default function Edit({ categories, product, suppliers, availableIngredients = [] }) {

    const { errors } = usePage().props

    // Initialize ingredients from product
    const initialIngredients = product.ingredients?.map(ing => ({
        ingredient_id: ing.ingredient_id,
        quantity: ing.quantity,
        name: ing.ingredient?.title || ''
    })) || []

    const { data, setData, post, processing } = useForm({
        image: '',
        barcode: product.barcode,
        title: product.title,
        category_id: product.category_id,
        supplier_id: product.supplier_id || '',
        description: product.description,
        buy_price: product.buy_price,
        sell_price: product.sell_price,
        unit: product.unit || 'pcs',
        is_recipe: product.is_recipe || false,
        is_supply: product.is_supply || false,
        is_ingredient: product.is_ingredient || false,
        ingredients: initialIngredients,
        _method: 'PUT'
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

    useEffect(() => {
        if (product.category_id) {
            setSelectedCategory(categories.find(category => category.id === product.category_id))
        }
        if (product.supplier_id && suppliers) {
            setSelectedSupplier(suppliers.find(supplier => supplier.id === product.supplier_id))
        }
    }, [product.category_id, product.supplier_id])

    const handleImageChange = (e) => {
        const image = e.target.files[0]
        setData('image', image)
    }

    // Add ingredient
    const addIngredient = () => {
        setData('ingredients', [...data.ingredients, { ingredient_id: '', quantity: 1, name: '' }])
    }

    // Remove ingredient
    const removeIngredient = (index) => {
        const newIngredients = data.ingredients.filter((_, i) => i !== index)
        setData('ingredients', newIngredients)
    }

    // Update ingredient
    const updateIngredient = (index, field, value) => {
        const newIngredients = [...data.ingredients]
        newIngredients[index][field] = value
        if (field === 'ingredient_id') {
            const ing = availableIngredients.find(i => i.id === parseInt(value))
            newIngredients[index].name = ing?.title || ''
        }
        setData('ingredients', newIngredients)
    }

    const submit = (e) => {
        e.preventDefault()
        post(route('products.update', product.id), {
            onSuccess: () => {
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
            <Head title='Ubah Data Produk' />
            <Card
                title={'Ubah Data Produk'}
                icon={<IconUsersPlus size={20} strokeWidth={1.5} />}
                footer={
                    <Button
                        type={'submit'}
                        label={'Ubah'}
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

                    {/* Product Type Flags */}
                    <div className='col-span-12'>
                        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                            Tipe Produk
                        </label>
                        <div className='flex flex-wrap gap-4'>
                            <label className='flex items-center gap-2 cursor-pointer'>
                                <input
                                    type='checkbox'
                                    checked={data.is_recipe}
                                    onChange={e => setData('is_recipe', e.target.checked)}
                                    className='w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600'
                                />
                                <span className='text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1'>
                                    <IconChefHat size={16} /> Resep (Produk Komposit)
                                </span>
                            </label>
                            <label className='flex items-center gap-2 cursor-pointer'>
                                <input
                                    type='checkbox'
                                    checked={data.is_supply}
                                    onChange={e => setData('is_supply', e.target.checked)}
                                    className='w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600'
                                />
                                <span className='text-sm text-gray-700 dark:text-gray-300'>
                                    Supply (Cup, Pipet, dll)
                                </span>
                            </label>
                            <label className='flex items-center gap-2 cursor-pointer'>
                                <input
                                    type='checkbox'
                                    checked={data.is_ingredient}
                                    onChange={e => setData('is_ingredient', e.target.checked)}
                                    className='w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600'
                                />
                                <span className='text-sm text-gray-700 dark:text-gray-300'>
                                    Bahan Baku
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Ingredients Section (only shown if is_recipe is checked) */}
                    {data.is_recipe && (
                        <div className='col-span-12'>
                            <div className='border rounded-lg p-4 bg-gray-50 dark:bg-gray-800 dark:border-gray-700'>
                                <div className='flex justify-between items-center mb-4'>
                                    <h3 className='text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2'>
                                        <IconChefHat size={20} /> Bahan-bahan Resep
                                    </h3>
                                    <button
                                        type='button'
                                        onClick={addIngredient}
                                        className='flex items-center gap-1 px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600'
                                    >
                                        <IconPlus size={16} /> Tambah Bahan
                                    </button>
                                </div>
                                
                                {data.ingredients.length === 0 ? (
                                    <p className='text-gray-500 dark:text-gray-400 text-sm text-center py-4'>
                                        Belum ada bahan. Klik "Tambah Bahan" untuk menambahkan bahan resep.
                                    </p>
                                ) : (
                                    <div className='space-y-3'>
                                        {data.ingredients.map((ingredient, index) => (
                                            <div key={index} className='flex gap-3 items-center bg-white dark:bg-gray-900 p-3 rounded-lg border dark:border-gray-700'>
                                                <div className='flex-1'>
                                                    <select
                                                        value={ingredient.ingredient_id}
                                                        onChange={e => updateIngredient(index, 'ingredient_id', e.target.value)}
                                                        className='w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                                    >
                                                        <option value=''>Pilih bahan...</option>
                                                        {availableIngredients.map(ing => (
                                                            <option key={ing.id} value={ing.id}>
                                                                {ing.title} ({ing.unit})
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className='w-24'>
                                                    <input
                                                        type='number'
                                                        step='0.001'
                                                        min='0'
                                                        value={ingredient.quantity}
                                                        onChange={e => updateIngredient(index, 'quantity', e.target.value)}
                                                        placeholder='Qty'
                                                        className='w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-200 p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                                    />
                                                </div>
                                                <button
                                                    type='button'
                                                    onClick={() => removeIngredient(index)}
                                                    className='p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg'
                                                >
                                                    <IconTrash size={18} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </>
    )
}

Edit.layout = page => <DashboardLayout children={page} />
