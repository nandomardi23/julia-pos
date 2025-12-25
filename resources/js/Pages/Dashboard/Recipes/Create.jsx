import React, { useState } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, useForm, usePage, router } from '@inertiajs/react'
import Card from '@/Components/Common/Card'
import Button from '@/Components/Common/Button'
import { IconPencilPlus, IconToolsKitchen2, IconArrowLeft, IconPlus, IconTrash } from '@tabler/icons-react'
import Input from '@/Components/Common/Input'
import Textarea from '@/Components/Common/TextArea'
import toast from 'react-hot-toast'
import InputSelect from '@/Components/Common/InputSelect'
import Select from '@/Components/Common/Select'

export default function Create({ categories, ingredients, supplies }) {
    const { errors } = usePage().props

    const [variants, setVariants] = useState([
        { name: 'Regular', buy_price: '', sell_price: '', ingredients: [] }
    ])

    const { data, setData, post, processing } = useForm({
        image: '',
        barcode: '',
        title: '',
        category_id: '',
        description: '',
        buy_price: '',
        sell_price: '',
        variants: []
    })

    const [selectedCategory, setSelectedCategory] = useState(null)

    const setSelectedCategoryHandler = (value) => {
        setSelectedCategory(value)
        setData('category_id', value.id)
    }

    const handleImageChange = (e) => {
        const image = e.target.files[0]
        setData('image', image)
    }

    // Variant handlers
    const addVariant = () => {
        setVariants([...variants, { name: '', buy_price: '', sell_price: '', ingredients: [] }])
    }

    const removeVariant = (index) => {
        if (variants.length > 1) {
            setVariants(variants.filter((_, i) => i !== index))
        }
    }

    const updateVariant = (index, field, value) => {
        const updated = [...variants]
        updated[index][field] = value
        setVariants(updated)
    }

    // Ingredient handlers for variant
    const addIngredientToVariant = (variantIndex) => {
        const updated = [...variants]
        updated[variantIndex].ingredients.push({ ingredient_id: '', quantity: '' })
        setVariants(updated)
    }

    const removeIngredientFromVariant = (variantIndex, ingredientIndex) => {
        const updated = [...variants]
        updated[variantIndex].ingredients = updated[variantIndex].ingredients.filter((_, i) => i !== ingredientIndex)
        setVariants(updated)
    }

    const updateIngredientInVariant = (variantIndex, ingredientIndex, field, value) => {
        const updated = [...variants]
        updated[variantIndex].ingredients[ingredientIndex][field] = value
        setVariants(updated)
    }

    // Combine ingredients and supplies for selection
    const allIngredients = [
        ...ingredients.map(i => ({ ...i, type: 'ingredient' })),
        ...supplies.map(s => ({ ...s, type: 'supply' }))
    ]

    const submit = (e) => {
        e.preventDefault()
        
        const formData = {
            ...data,
            variants: variants
        }
        
        post(route('recipes.store'), {
            data: formData,
            onSuccess: () => {
                toast.success('Resep berhasil ditambahkan!')
            },
            onError: () => {
                toast.error('Terjadi kesalahan!')
            },
        })
    }

    return (
        <>
            <Head title='Tambah Resep' />
            <form onSubmit={submit}>
                {/* Basic Info Card */}
                <Card
                    title={'Tambah Resep'}
                    icon={<IconToolsKitchen2 size={20} strokeWidth={1.5} />}
                    className="mb-4"
                >
                    <div className='grid grid-cols-12 gap-4'>
                        <div className='col-span-12'>
                            <Input
                                type={'file'}
                                label={'Gambar (Opsional)'}
                                onChange={handleImageChange}
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
                                label={'Kode/Barcode'}
                                value={data.barcode}
                                onChange={e => setData('barcode', e.target.value)}
                                errors={errors.barcode}
                                placeholder={'Kode resep'}
                            />
                        </div>
                        <div className='col-span-6'>
                            <Input
                                type={'text'}
                                label={'Nama Resep'}
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                errors={errors.title}
                                placeholder={'Contoh: Jus Apel Hijau'}
                            />
                        </div>
                        <div className='col-span-12'>
                            <Textarea
                                name='description'
                                label={'Deskripsi (Opsional)'}
                                placeholder={'Deskripsi resep'}
                                errors={errors.description}
                                onChange={e => setData('description', e.target.value)}
                                value={data.description}
                            />
                        </div>
                        <div className='col-span-6'>
                            <Input
                                type={'number'}
                                label={'Harga Jual Default'}
                                value={data.sell_price}
                                onChange={e => setData('sell_price', e.target.value)}
                                errors={errors.sell_price}
                                placeholder={'Harga jual'}
                            />
                        </div>
                    </div>
                </Card>

                {/* Variants Card */}
                <Card
                    title={'Variant & Bahan'}
                    className="mb-4"
                >
                    <div className='space-y-6'>
                        {variants.map((variant, vIndex) => (
                            <div key={vIndex} className='p-4 border border-gray-200 dark:border-gray-700 rounded-lg'>
                                <div className='flex justify-between items-center mb-4'>
                                    <h4 className='font-semibold text-gray-900 dark:text-white'>
                                        Variant #{vIndex + 1}
                                    </h4>
                                    {variants.length > 1 && (
                                        <button
                                            type='button'
                                            onClick={() => removeVariant(vIndex)}
                                            className='text-red-500 hover:text-red-700'
                                        >
                                            <IconTrash size={18} />
                                        </button>
                                    )}
                                </div>

                                <div className='grid grid-cols-12 gap-3 mb-4'>
                                    <div className='col-span-4'>
                                        <Input
                                            type={'text'}
                                            label={'Nama Variant'}
                                            value={variant.name}
                                            onChange={e => updateVariant(vIndex, 'name', e.target.value)}
                                            placeholder={'Contoh: Regular, Large, XL'}
                                        />
                                    </div>
                                    <div className='col-span-4'>
                                        <Input
                                            type={'number'}
                                            label={'Harga Beli'}
                                            value={variant.buy_price}
                                            onChange={e => updateVariant(vIndex, 'buy_price', e.target.value)}
                                            placeholder={'0'}
                                        />
                                    </div>
                                    <div className='col-span-4'>
                                        <Input
                                            type={'number'}
                                            label={'Harga Jual'}
                                            value={variant.sell_price}
                                            onChange={e => updateVariant(vIndex, 'sell_price', e.target.value)}
                                            placeholder={'0'}
                                        />
                                    </div>
                                </div>

                                {/* Ingredients for this variant */}
                                <div className='mt-4'>
                                    <div className='flex justify-between items-center mb-2'>
                                        <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                                            Bahan-bahan untuk variant ini:
                                        </label>
                                        <button
                                            type='button'
                                            onClick={() => addIngredientToVariant(vIndex)}
                                            className='text-sm text-blue-500 hover:text-blue-700 flex items-center gap-1'
                                        >
                                            <IconPlus size={14} /> Tambah Bahan
                                        </button>
                                    </div>

                                    {variant.ingredients.length === 0 ? (
                                        <p className='text-sm text-gray-400 italic'>Belum ada bahan ditambahkan</p>
                                    ) : (
                                        <div className='space-y-2'>
                                            {variant.ingredients.map((ing, iIndex) => (
                                                <div key={iIndex} className='flex gap-2 items-center'>
                                                    <div className='flex-1'>
                                                        <Select
                                                            value={ing.ingredient_id}
                                                            onChange={e => updateIngredientInVariant(vIndex, iIndex, 'ingredient_id', e.target.value)}
                                                        >
                                                            <option value=''>Pilih bahan...</option>
                                                            <optgroup label="Bahan Baku">
                                                                {ingredients.map(i => (
                                                                    <option key={`ing-${i.id}`} value={i.id}>
                                                                        {i.title} ({i.unit})
                                                                    </option>
                                                                ))}
                                                            </optgroup>
                                                            <optgroup label="Supply">
                                                                {supplies.map(s => (
                                                                    <option key={`sup-${s.id}`} value={s.id}>
                                                                        {s.title} ({s.unit})
                                                                    </option>
                                                                ))}
                                                            </optgroup>
                                                        </Select>
                                                    </div>
                                                    <div className='w-32'>
                                                        <Input
                                                            type={'number'}
                                                            value={ing.quantity}
                                                            onChange={e => updateIngredientInVariant(vIndex, iIndex, 'quantity', e.target.value)}
                                                            placeholder={'Qty'}
                                                            step="0.001"
                                                        />
                                                    </div>
                                                    <button
                                                        type='button'
                                                        onClick={() => removeIngredientFromVariant(vIndex, iIndex)}
                                                        className='text-red-500 hover:text-red-700 p-2'
                                                    >
                                                        <IconTrash size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        <button
                            type='button'
                            onClick={addVariant}
                            className='w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 hover:border-orange-400 hover:text-orange-500 transition-colors flex items-center justify-center gap-2'
                        >
                            <IconPlus size={18} /> Tambah Variant Lain
                        </button>
                    </div>
                </Card>

                {/* Footer */}
                <div className='flex items-center gap-2'>
                    <Button
                        type={'button'}
                        label={'Kembali'}
                        icon={<IconArrowLeft size={20} strokeWidth={1.5} />}
                        className={'border bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700'}
                        onClick={() => router.visit(route('recipes.index'))}
                    />
                    <Button
                        type={'submit'}
                        label={'Simpan Resep'}
                        icon={<IconPencilPlus size={20} strokeWidth={1.5} />}
                        className={'border bg-orange-500 text-white hover:bg-orange-600 dark:bg-orange-600 dark:border-orange-700 dark:hover:bg-orange-700'}
                    />
                </div>
            </form>
        </>
    )
}

Create.layout = page => <DashboardLayout children={page} />
