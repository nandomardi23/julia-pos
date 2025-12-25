import React, { useEffect, useState, useMemo } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, useForm, usePage, router } from '@inertiajs/react'
import Card from '@/Components/Dashboard/Card'
import Button from '@/Components/Dashboard/Button'
import { IconPencilPlus, IconBox, IconArrowLeft } from '@tabler/icons-react'
import Input from '@/Components/Dashboard/Input'
import Textarea from '@/Components/Dashboard/TextArea'
import ConfirmDialog from '@/Components/Dashboard/ConfirmDialog'
import toast from 'react-hot-toast'
import InputSelect from '@/Components/Dashboard/InputSelect'
import Select from '@/Components/Dashboard/Select'
import ImagePreview from '@/Components/Dashboard/ImagePreview'
import PriceHistoryTable from '@/Components/Dashboard/PriceHistoryTable'

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

export default function Edit({ categories, product, suppliers, priceHistories = [] }) {

    const { errors } = usePage().props
    const [showConfirm, setShowConfirm] = useState(false)

    // Simpan data original untuk perbandingan
    const originalData = useMemo(() => ({
        barcode: product.barcode || '',
        title: product.title || '',
        category_id: product.category_id || '',
        supplier_id: product.supplier_id || '',
        description: product.description || '',
        buy_price: product.buy_price || 0,
        sell_price: product.sell_price || 0,
        unit: product.unit || 'pcs',
        is_recipe: product.is_recipe || false,
        is_supply: product.is_supply || false,
        is_ingredient: product.is_ingredient || false,
        ingredientsJson: JSON.stringify((product.ingredients || []).map(ing => ({
            ingredient_id: ing.ingredient_id,
            quantity: ing.quantity
        })).sort((a, b) => a.ingredient_id - b.ingredient_id)),
    }), [product.id])

    // Initialize ingredients from product
    const initialIngredients = product.ingredients?.map(ing => ({
        ingredient_id: ing.ingredient_id,
        quantity: ing.quantity,
        name: ing.ingredient?.title || ''
    })) || []

    // Initialize variants from product
    const initialVariants = product.variants?.map(v => ({
        id: v.id,
        name: v.name,
        buy_price: v.buy_price,
        sell_price: v.sell_price,
        is_default: v.is_default
    })) || []

    const { data, setData, post, processing } = useForm({
        image: '',
        barcode: product.barcode || '',
        title: product.title || '',
        category_id: product.category_id || '',
        supplier_id: product.supplier_id || '',
        description: product.description || '',
        buy_price: product.buy_price || 0,
        sell_price: product.sell_price || 0,
        min_stock: product.min_stock || 0,
        unit: product.unit || 'pcs',
        _method: 'PUT'
    })

    // Cek apakah ada perubahan data
    const hasChanges = () => {
        // Jika ada gambar baru, berarti ada perubahan
        if (data.image) return true
        // Bandingkan field-field utama
        if (data.barcode !== originalData.barcode) return true
        if (data.title !== originalData.title) return true
        if (data.category_id !== originalData.category_id) return true
        if ((data.supplier_id || '') !== (originalData.supplier_id || '')) return true
        if ((data.description || '') !== (originalData.description || '')) return true
        if (parseFloat(data.buy_price) !== parseFloat(originalData.buy_price)) return true
        if (parseFloat(data.sell_price) !== parseFloat(originalData.sell_price)) return true
        if (data.unit !== originalData.unit) return true
        if (data.is_recipe !== originalData.is_recipe) return true
        if (data.is_supply !== originalData.is_supply) return true
        if (data.is_ingredient !== originalData.is_ingredient) return true
        // Bandingkan ingredients
        const currentIngJson = JSON.stringify(data.ingredients.map(ing => ({
            ingredient_id: parseInt(ing.ingredient_id),
            quantity: parseFloat(ing.quantity)
        })).filter(i => i.ingredient_id).sort((a, b) => a.ingredient_id - b.ingredient_id))
        if (currentIngJson !== originalData.ingredientsJson) return true
        return false
    }

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

    // Add variant
    const addVariant = () => {
        setData('variants', [...data.variants, { id: null, name: '', buy_price: 0, sell_price: 0, is_default: data.variants.length === 0 }])
    }

    // Remove variant
    const removeVariant = (index) => {
        const newVariants = data.variants.filter((_, i) => i !== index)
        // Jika default dihapus, set yang pertama sebagai default
        if (newVariants.length > 0 && !newVariants.some(v => v.is_default)) {
            newVariants[0].is_default = true
        }
        setData('variants', newVariants)
    }

    // Update variant
    const updateVariant = (index, field, value) => {
        const newVariants = [...data.variants]
        if (field === 'is_default' && value) {
            // Hanya satu yang bisa default
            newVariants.forEach((v, i) => v.is_default = i === index)
        } else {
            newVariants[index][field] = value
        }
        setData('variants', newVariants)
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
        post(route('products.update', product.id), {
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
            <Head title='Ubah Data Produk' />
            <Card
                title={'Ubah Data Produk'}
                icon={<IconBox size={20} strokeWidth={1.5} />}
                footer={
                    <div className='flex items-center gap-2'>
                        <Button
                            type={'button'}
                            label={'Kembali'}
                            icon={<IconArrowLeft size={20} strokeWidth={1.5} />}
                            className={'border bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700'}
                            onClick={() => router.visit(route('products.index'))}
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
                            currentImage={product.image}
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

                    {/* Price History */}
                    {priceHistories && priceHistories.length > 0 && (
                        <div className='col-span-12'>
                            <PriceHistoryTable priceHistories={priceHistories} />
                        </div>
                    )}

                </div>
            </Card>

            <ConfirmDialog
                show={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={confirmUpdate}
                title="Konfirmasi Perubahan"
                message="Apakah Anda yakin ingin menyimpan perubahan data produk ini?"
                confirmLabel="Ya, Simpan"
                cancelLabel="Batal"
                type="warning"
                processing={processing}
            />
        </>
    )
}

Edit.layout = page => <DashboardLayout children={page} />
