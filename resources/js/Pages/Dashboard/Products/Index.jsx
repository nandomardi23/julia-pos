import React, { useState } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, usePage, router, Link } from '@inertiajs/react'
import Button from '@/Components/Common/Button'
import { IconCirclePlus, IconDatabaseOff, IconPencilCog, IconTrash, IconEye, IconBarcode } from '@tabler/icons-react'
import Search from '@/Components/Common/Search'
import Table from '@/Components/Common/Table'
import BarcodeModal from '@/Components/Common/BarcodeModal'
import toast from 'react-hot-toast'
import ImportModal from '@/Components/ImportModal'
import { IconFileSpreadsheet } from '@tabler/icons-react'

export default function Index({ products, currentType = 'product', typeLabel = 'Produk' }) {
    const [barcodeModal, setBarcodeModal] = useState({ show: false, product: null });

    const handleOpenBarcodeModal = (product) => {
        if (!product.barcode) {
            toast.error('Produk ini tidak memiliki barcode. Silakan tambahkan barcode terlebih dahulu di halaman edit.')
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

    // Import State
    const [showImport, setShowImport] = useState(false);
    const [importing, setImporting] = useState(false);
    const [importErrors, setImportErrors] = useState({});

    const handleImport = (file) => {
        setImporting(true);
        router.post(route('products.import'), {
            file: file
        }, {
            forceFormData: true,
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setShowImport(false);
                setImporting(false);
                setImportErrors({});
                toast.success('Produk berhasil diimport!');
            },
            onError: (err) => {
                setImporting(false);
                setImportErrors(err);
                toast.error('Gagal Import Produk');
            },
            onFinish: () => setImporting(false)
        });
    };

    return (
        <>
            <Head title={typeLabel} />

            <BarcodeModal
                show={barcodeModal.show}
                onClose={() => setBarcodeModal({ show: false, product: null })}
                onConfirm={handlePrintBarcode}
                productName={barcodeModal.product?.title || ''}
            />

            <ImportModal
                show={showImport}
                onClose={() => setShowImport(false)}
                title="Import Produk"
                templateUrl={route('products.template')}
                onSubmit={handleImport}
                processing={importing}
                errors={importErrors}
            />

            <div className='mb-4'>
                <div className='flex items-center gap-2 mb-4 overflow-x-auto pb-2'>
                    {['all', 'product', 'ingredient'].map((t) => (
                        <Link
                            key={t}
                            href={route('products.index', { type: t })}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${currentType === t
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
                                }`}
                        >
                            {t === 'all' ? 'Semua' :
                                t === 'product' ? 'Produk Jual' :
                                    t === 'ingredient' ? 'Bahan Baku' : t}
                        </Link>
                    ))}
                    <span className='mx-2 text-gray-300 dark:text-gray-600'>|</span>
                    {['', 'active', 'inactive'].map((s) => (
                        <Link
                            key={s}
                            href={route('products.index', { type: currentType, status: s || undefined })}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${(new URLSearchParams(window.location.search).get('status') || '') === s
                                    ? 'bg-gray-700 text-white border-gray-700 dark:bg-gray-600'
                                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-700'
                                }`}
                        >
                            {s === '' ? 'Semua Status' : s === 'active' ? '✓ Aktif' : '✗ Tidak Aktif'}
                        </Link>
                    ))}
                </div>

                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
                    <div className='flex items-center gap-2'>
                        <Button
                            type={'link'}
                            icon={<IconCirclePlus size={20} strokeWidth={1.5} />}
                            className={'border bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:border-blue-700 dark:hover:bg-blue-700'}
                            label={`Tambah Data`}
                            href={route('products.create') + `?type=${currentType === 'all' ? 'sellable' : (currentType === 'product' ? 'sellable' : currentType)}`}
                        />
                        <Button
                            type={'button'}
                            icon={<IconFileSpreadsheet size={20} strokeWidth={1.5} />}
                            className={'border bg-emerald-500 text-white hover:bg-emerald-600 dark:bg-emerald-600 dark:border-emerald-700 dark:hover:bg-emerald-700'}
                            label={`Import`}
                            onClick={() => setShowImport(true)}
                        />
                        <Button
                            type={'button'}
                            icon={<IconFileSpreadsheet size={20} strokeWidth={1.5} />}
                            className={'border bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:border-green-800 dark:hover:bg-green-800'}
                            label={`Export`}
                            onClick={() => {
                                const params = new URLSearchParams(window.location.search);
                                window.open(route('products.export') + '?' + params.toString(), '_blank');
                            }}
                        />
                    </div>
                    <div className='w-full sm:w-80'>
                        <Search
                            url={route('products.index') + `?type=${currentType}`}
                            placeholder={`Cari ${typeLabel.toLowerCase()}...`}
                        />
                    </div>
                </div>
            </div>
            <Table.Card
                title={`Data ${typeLabel}`}
                links={products.links}
                meta={{
                    from: products.from,
                    to: products.to,
                    total: products.total,
                    per_page: products.per_page
                }}
                url={route('products.index') + `?type=${currentType}`}
            >
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className='w-12 text-center'>No</Table.Th>
                            <Table.Th>Produk</Table.Th>
                            <Table.Th className='text-center'>Kategori</Table.Th>
                            <Table.Th className='text-center'>Tipe</Table.Th>
                            <Table.Th className='text-center'>Satuan</Table.Th>
                            <Table.Th className='text-right'>Harga Beli</Table.Th>
                            <Table.Th className='text-right'>Harga Jual</Table.Th>
                            <Table.Th className='text-center'>Status</Table.Th>
                            <Table.Th className='w-24 text-center'>Aksi</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {products.data.length ?
                            products.data.map((product, i) => (
                                <tr className={`hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors ${!product.is_active ? 'opacity-60' : ''}`} key={product.id}>
                                    <Table.Td className='text-center font-medium'>
                                        {++i + (products.current_page - 1) * products.per_page}
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex items-center gap-3'>
                                            <div className='w-10 h-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0'>
                                                <img
                                                    src={product.image || '/assets/photo/auth.jpg'}
                                                    alt={product.title}
                                                    className='w-full h-full object-cover'
                                                    onError={(e) => { e.target.src = '/assets/photo/auth.jpg' }}
                                                />
                                            </div>
                                            <div>
                                                <div className='flex items-center gap-2'>
                                                    <p className='font-medium text-gray-900 dark:text-white'>{product.title}</p>
                                                </div>
                                                <p className='text-xs text-gray-500 dark:text-gray-400'>{product.barcode}</p>
                                            </div>
                                        </div>
                                    </Table.Td>
                                    <Table.Td className='text-center'>
                                        <span className='inline-flex px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'>
                                            {product.category?.name || '-'}
                                        </span>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className="flex flex-wrap gap-1.5 justify-center">
                                            {(product.tags || [product.product_type]).map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border ${tag === 'sellable' ? 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-900' :
                                                        tag === 'ingredient' ? 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-900' :
                                                            tag === 'supply' ? 'bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-900' :
                                                                'bg-gray-50 text-gray-700 border-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
                                                        }`}
                                                >
                                                    {tag === 'sellable' ? 'Produk Jual' :
                                                        tag === 'ingredient' ? 'Bahan Baku' :
                                                            tag === 'supply' ? 'Alat' :
                                                                tag === 'recipe' ? 'Resep' : tag}
                                                </span>
                                            ))}
                                        </div>
                                    </Table.Td>
                                    <Table.Td className='text-center'>
                                        <span className='inline-flex px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'>
                                            {product.unit || 'pcs'}
                                        </span>
                                    </Table.Td>
                                    <Table.Td className='text-right font-medium text-gray-600 dark:text-gray-400'>
                                        {formatCurrency(product.buy_price)}
                                    </Table.Td>
                                    <Table.Td className='text-right font-semibold text-gray-900 dark:text-white'>
                                        {formatCurrency(product.sell_price)}
                                    </Table.Td>
                                    <Table.Td className='text-center'>
                                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${product.is_active
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                            }`}>
                                            {product.is_active ? 'Aktif' : 'Tidak Aktif'}
                                        </span>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex justify-center gap-1'>
                                            <Link
                                                href={route('products.show', product.id)}
                                                className='p-1.5 rounded-md text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30'
                                                title='Lihat Detail'
                                            >
                                                <IconEye size={14} strokeWidth={1.5} />
                                            </Link>
                                            <button
                                                onClick={() => handleOpenBarcodeModal(product)}
                                                className='p-1.5 rounded-md text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/30'
                                                title='Cetak Barcode'
                                            >
                                                <IconBarcode size={14} strokeWidth={1.5} />
                                            </button>
                                            <Link
                                                href={route('products.edit', product.id)}
                                                className='p-1.5 rounded-md text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/30'
                                                title='Edit'
                                            >
                                                <IconPencilCog size={14} strokeWidth={1.5} />
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
                                                        router.delete(route('products.destroy', product.id))
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
                            <Table.Empty colSpan={8} message={
                                <>
                                    <div className='flex justify-center items-center text-center mb-2'>
                                        <IconDatabaseOff size={48} strokeWidth={1} className='text-gray-300 dark:text-gray-600' />
                                    </div>
                                    <span className='text-gray-500 dark:text-gray-400'>Data produk tidak ditemukan</span>
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
