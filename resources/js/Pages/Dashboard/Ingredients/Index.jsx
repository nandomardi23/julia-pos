import React, { useState } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, usePage, router, Link } from '@inertiajs/react'
import Button from '@/Components/Common/Button'
import { IconCirclePlus, IconDatabaseOff, IconPencilCog, IconTrash, IconEye, IconBarcode } from '@tabler/icons-react'
import Search from '@/Components/Common/Search'
import Table from '@/Components/Common/Table'
import BarcodeModal from '@/Components/Common/BarcodeModal'
import toast from 'react-hot-toast'

export default function Index({ ingredients }) {
    const [barcodeModal, setBarcodeModal] = useState({ show: false, product: null });

    const handleOpenBarcodeModal = (product) => {
        if (!product.barcode) {
            toast.error('Bahan baku ini tidak memiliki barcode. Silakan tambahkan barcode terlebih dahulu di halaman edit.')
            return
        }
        setBarcodeModal({ show: true, product })
    }

    const formatCurrency = (value) => new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(value || 0);

    const handlePrintBarcode = (qty) => {
        if (barcodeModal.product) {
            window.open(route('products.print_barcode', { product_id: barcodeModal.product.id, qty: qty }), '_blank');
            setBarcodeModal({ show: false, product: null });
        }
    };

    return (
        <>
            <Head title="Bahan Baku" />

            <BarcodeModal
                show={barcodeModal.show}
                onClose={() => setBarcodeModal({ show: false, product: null })}
                onConfirm={handlePrintBarcode}
                productName={barcodeModal.product?.title || ''}
            />

            <div className='mb-4'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
                    <Button
                        type={'link'}
                        icon={<IconCirclePlus size={20} strokeWidth={1.5} />}
                        className={'border bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:border-blue-700 dark:hover:bg-blue-700'}
                        label={'Tambah Bahan Baku'}
                        href={route('ingredients.create')}
                    />
                    <div className='w-full sm:w-80'>
                        <Search
                            url={route('ingredients.index')}
                            placeholder={'Cari bahan baku...'}
                        />
                    </div>
                </div>
            </div>
            <Table.Card
                title="Data Bahan Baku"
                links={ingredients.links}
                meta={{
                    from: ingredients.from,
                    to: ingredients.to,
                    total: ingredients.total,
                    per_page: ingredients.per_page
                }}
                url={route('ingredients.index')}
            >
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className='w-12 text-center'>No</Table.Th>
                            <Table.Th>Bahan Baku</Table.Th>
                            <Table.Th className='text-center'>Kategori</Table.Th>
                            <Table.Th className='text-center'>Satuan</Table.Th>
                            <Table.Th className='text-right'>Harga Beli</Table.Th>
                            <Table.Th className='text-right'>Harga Jual</Table.Th>
                            <Table.Th className='w-24 text-center'>Aksi</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {ingredients.data.length ?
                            ingredients.data.map((ingredient, i) => (
                                <tr className='hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors' key={ingredient.id}>
                                    <Table.Td className='text-center font-medium'>
                                        {++i + (ingredients.current_page - 1) * ingredients.per_page}
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex items-center gap-3'>
                                            <div className='w-10 h-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0'>
                                                <img
                                                    src={ingredient.image || '/assets/photo/auth.jpg'}
                                                    alt={ingredient.title}
                                                    className='w-full h-full object-cover'
                                                    onError={(e) => { e.target.src = '/assets/photo/auth.jpg' }}
                                                />
                                            </div>
                                            <div>
                                                <div className='flex items-center gap-2'>
                                                    <p className='font-medium text-gray-900 dark:text-white'>{ingredient.title}</p>
                                                    <span className="px-2 py-0.5 text-[10px] rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 whitespace-nowrap">
                                                        Bahan Baku
                                                    </span>
                                                </div>
                                                <p className='text-xs text-gray-500 dark:text-gray-400'>{ingredient.barcode}</p>
                                            </div>
                                        </div>
                                    </Table.Td>
                                    <Table.Td className='text-center'>
                                        <span className='inline-flex px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'>
                                            {ingredient.category?.name || '-'}
                                        </span>
                                    </Table.Td>
                                    <Table.Td className='text-center'>
                                        <span className='inline-flex px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'>
                                            {ingredient.unit || 'pcs'}
                                        </span>
                                    </Table.Td>
                                    <Table.Td className='text-right font-medium text-gray-600 dark:text-gray-400'>
                                        {formatCurrency(ingredient.buy_price)}
                                    </Table.Td>
                                    <Table.Td className='text-right font-semibold text-gray-900 dark:text-white'>
                                        {formatCurrency(ingredient.sell_price)}
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex justify-center gap-1'>
                                            <Link
                                                href={route('products.show', ingredient.id)}
                                                className='p-1.5 rounded-md text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30'
                                                title='Lihat Detail'
                                            >
                                                <IconEye size={14} strokeWidth={1.5} />
                                            </Link>
                                            <button
                                                onClick={() => handleOpenBarcodeModal(ingredient)}
                                                className='p-1.5 rounded-md text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/30'
                                                title='Cetak Barcode'
                                            >
                                                <IconBarcode size={14} strokeWidth={1.5} />
                                            </button>
                                            <Link
                                                href={route('ingredients.edit', ingredient.id)}
                                                className='p-1.5 rounded-md text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/30'
                                                title='Edit'
                                            >
                                                <IconPencilCog size={14} strokeWidth={1.5} />
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (confirm('Apakah Anda yakin ingin menghapus bahan baku ini?')) {
                                                        router.delete(route('ingredients.destroy', ingredient.id))
                                                    }
                                                }}
                                                className='p-1.5 rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30'
                                                title='Hapus'
                                            >
                                                <IconTrash size={14} strokeWidth={1.5} />
                                            </button>
                                        </div>
                                    </Table.Td>
                                </tr>
                            )) :
                            <Table.Empty colSpan={7} message={
                                <>
                                    <div className='flex justify-center items-center text-center mb-2'>
                                        <IconDatabaseOff size={48} strokeWidth={1} className='text-gray-300 dark:text-gray-600' />
                                    </div>
                                    <span className='text-gray-500 dark:text-gray-400'>Data bahan baku tidak ditemukan</span>
                                </>
                            } />
                        }
                    </Table.Tbody>
                </Table>
            </Table.Card>
        </>
    )
}

Index.layout = page => <DashboardLayout children={page} />
