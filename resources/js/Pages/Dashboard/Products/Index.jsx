import React, { useState } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, router, Link } from '@inertiajs/react'
import Button from '@/Components/Common/Button'
import { IconCirclePlus, IconDatabaseOff, IconPencilCog, IconTrash, IconEye, IconBarcode, IconFileSpreadsheet, IconFilter, IconDownload, IconUpload, IconChevronDown } from '@tabler/icons-react'
import Search from '@/Components/Common/Search'
import Table from '@/Components/Common/Table'
import BarcodeModal from '@/Components/Common/BarcodeModal'
import toast from 'react-hot-toast'
import ImportModal from '@/Components/ImportModal'
import Swal from 'sweetalert2';

export default function Index({ products, categories, currentType = 'all', typeLabel = 'Produk', filters = {} }) {
    const [barcodeModal, setBarcodeModal] = useState({ show: false, product: null });
    
    // Import State
    const [showImport, setShowImport] = useState(false);
    const [importing, setImporting] = useState(false);
    const [importErrors, setImportErrors] = useState({});

    const handleOpenBarcodeModal = (product) => {
        if (!product.barcode) {
            toast.error('Produk ini tidak memiliki barcode. SIlakan tambahkan barcode terlebih dahulu.')
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

    // Helper to update filters while preserving others
    const updateFilter = (newFilter) => {
        router.get(route('products.index'), {
            ...filters,
            ...newFilter, 
            search: filters.search // Preserve search if exists
        }, {
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    };

    const handleExport = () => {
        const params = new URLSearchParams(window.location.search);
        window.open(route('products.export') + '?' + params.toString(), '_blank');
    };

    // Construct URL for Search component (excluding search param itself)
    const searchUrl = route('products.index', {
        type: currentType,
        category_id: filters.category_id,
        status: filters.status
    });

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

            {/* Header Actions & Filters */}
            <div className='flex flex-col gap-4 mb-6'>
                {/* Upper Toolbar: Categories & Actions */}
                <div className='flex flex-col lg:flex-row justify-between lg:items-center gap-4'>
                    
                    {/* Modern Tab Segmented Control */}
                    <div className='bg-gray-100 p-1 rounded-xl inline-flex dark:bg-gray-800 self-start lg:self-auto'>
                        {[
                            { id: 'all', label: 'Semua Data' },
                            { id: 'product', label: 'Produk Jual' },
                            { id: 'ingredient', label: 'Bahan Baku' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => updateFilter({ type: tab.id })}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    currentType === tab.id
                                    ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-700 dark:text-blue-400'
                                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className='flex items-center gap-2 self-end lg:self-auto'>
                        <Button
                            type={'button'}
                            icon={<IconFileSpreadsheet size={18} />}
                            className={'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'}
                            label={`Template`}
                            onClick={() => window.open(route('products.template'), '_blank')}
                        />
                         <Button
                            type={'button'}
                            icon={<IconUpload size={18} />}
                            className={'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800 dark:hover:bg-emerald-900/30'}
                            label={`Import`}
                            onClick={() => setShowImport(true)}
                        />
                         <Button
                            type={'button'}
                            icon={<IconDownload size={18} />}
                            className={'bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800 dark:hover:bg-indigo-900/30'}
                            label={`Export`}
                            onClick={handleExport}
                        />
                        <Button
                            type={'link'}
                            icon={<IconCirclePlus size={18} />}
                            className={'bg-blue-600 text-white hover:bg-blue-700 border-transparent shadow-md dark:bg-blue-600 dark:hover:bg-blue-700'}
                            label={`Tambah`}
                            href={route('products.create') + `?type=${currentType === 'all' ? 'sellable' : (currentType === 'product' ? 'sellable' : currentType)}`}
                        />
                    </div>
                </div>
            </div>

            {/* Main Table Card */}
            <Table.Card
                title={`Data ${typeLabel}`}
                icon={<div className="p-2 bg-blue-50 text-blue-600 rounded-lg dark:bg-blue-900/20 dark:text-blue-400"><IconDatabaseOff size={20}/></div>}
                links={products.links}
                meta={{
                    from: products.from,
                    to: products.to,
                    total: products.total,
                    per_page: products.per_page
                }}
                action={
                    <div className='flex flex-col sm:flex-row gap-3 min-w-0 sm:min-w-[600px] justify-end'>
                         {/* Category Dropdown */}
                        <div className='relative w-full sm:w-48'>
                            <select 
                                value={filters.category_id || ''}
                                onChange={(e) => updateFilter({ category_id: e.target.value })}
                                className='w-full pl-3 pr-10 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-0 focus:border-gray-300 dark:focus:border-gray-600 dark:bg-gray-950 dark:border-gray-900 dark:text-gray-300 appearance-none cursor-pointer transition-colors'
                            >
                                <option value="">Semua Kategori</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                                 <IconChevronDown size={16} />
                            </div>
                        </div>

                        {/* Status Dropdown */}
                        <div className='relative w-full sm:w-40'>
                            <select 
                                value={filters.status || ''}
                                onChange={(e) => updateFilter({ status: e.target.value })}
                                className='w-full pl-3 pr-10 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-0 focus:border-gray-300 dark:focus:border-gray-600 dark:bg-gray-950 dark:border-gray-900 dark:text-gray-300 appearance-none cursor-pointer transition-colors'
                            >
                                <option value="">Semua Status</option>
                                <option value="active">✓ Aktif</option>
                                <option value="inactive">✗ Tidak Aktif</option>
                            </select>
                             <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                                 <IconChevronDown size={16} />
                            </div>
                        </div>
                        
                        {/* Search */}
                        <div className='w-full sm:flex-1'>
                            <Search
                                url={searchUrl}
                                placeholder={`Cari...`}
                                initialValue={filters.search}
                            />
                        </div>
                    </div>
                }
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
                                            <div className='w-10 h-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 border border-gray-100 dark:border-gray-700'>
                                                <img
                                                    src={product.image || '/assets/photo/auth.jpg'}
                                                    alt={product.title}
                                                    className='w-full h-full object-cover'
                                                    onError={(e) => { e.target.src = '/assets/photo/auth.jpg' }}
                                                />
                                            </div>
                                            <div>
                                                <div className='flex items-center gap-2'>
                                                    <p className='font-medium text-gray-900 dark:text-white line-clamp-1'>{product.title}</p>
                                                </div>
                                                <p className='text-xs text-gray-500 dark:text-gray-400 font-mono'>{product.barcode}</p>
                                            </div>
                                        </div>
                                    </Table.Td>
                                    <Table.Td className='text-center'>
                                        <span className='inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'>
                                            {product.category?.name || '-'}
                                        </span>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className="flex flex-wrap gap-1.5 justify-center">
                                            {(product.tags || [product.product_type]).map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide border ${tag === 'sellable' ? 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-900' :
                                                        tag === 'ingredient' ? 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-900' :
                                                            tag === 'supply' ? 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-900' :
                                                                'bg-gray-50 text-gray-600 border-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
                                                        }`}
                                                >
                                                    {tag === 'sellable' ? 'Jual' :
                                                        tag === 'ingredient' ? 'Bahan' :
                                                            tag === 'supply' ? 'Alat' :
                                                                tag === 'recipe' ? 'Resep' : tag}
                                                </span>
                                            ))}
                                        </div>
                                    </Table.Td>
                                    <Table.Td className='text-center'>
                                        <span className='text-sm text-gray-600 dark:text-gray-400'>
                                            {product.unit || 'pcs'}
                                        </span>
                                    </Table.Td>
                                    <Table.Td className='text-right font-medium text-gray-500 dark:text-gray-400 text-sm'>
                                        {formatCurrency(product.buy_price)}
                                    </Table.Td>
                                    <Table.Td className='text-right font-semibold text-gray-900 dark:text-white'>
                                        {formatCurrency(product.sell_price)}
                                    </Table.Td>
                                    <Table.Td className='text-center'>
                                        {product.is_active ? (
                                             <span className='inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'>
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Aktif
                                             </span>
                                        ) : (
                                            <span className='inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'>
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Nonaktif
                                            </span>
                                        )}
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex justify-center gap-2'>
                                            <Link
                                                href={route('products.show', product.id)}
                                                className='text-gray-400 hover:text-blue-600 transition-colors'
                                                title='Lihat Detail'
                                            >
                                                <IconEye size={18} strokeWidth={1.5} />
                                            </Link>
                                            <button
                                                onClick={() => handleOpenBarcodeModal(product)}
                                                className='text-gray-400 hover:text-emerald-600 transition-colors'
                                                title='Cetak Barcode'
                                            >
                                                <IconBarcode size={18} strokeWidth={1.5} />
                                            </button>
                                            <Link
                                                href={route('products.edit', product.id)}
                                                className='text-gray-400 hover:text-amber-600 transition-colors'
                                                title='Edit'
                                            >
                                                <IconPencilCog size={18} strokeWidth={1.5} />
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    Swal.fire({
                                                        title: 'Apakah Anda yakin?',
                                                        text: "Produk yang dihapus tidak dapat dikembalikan!",
                                                        icon: 'warning',
                                                        showCancelButton: true,
                                                        confirmButtonColor: '#3085d6',
                                                        cancelButtonColor: '#d33',
                                                        confirmButtonText: 'Ya, hapus!',
                                                        cancelButtonText: 'Batal'
                                                    }).then((result) => {
                                                        if (result.isConfirmed) {
                                                            router.delete(route('products.destroy', product.id))
                                                        }
                                                    })
                                                }}
                                                className='text-gray-400 hover:text-red-600 transition-colors'
                                                title='Hapus'
                                            >
                                                <IconTrash size={18} strokeWidth={1.5} />
                                            </button>
                                        </div>
                                    </Table.Td>
                                </tr>
                            )) :
                            <Table.Empty colSpan={9} message={
                                <>
                                    <div className='flex justify-center items-center text-center mb-2'>
                                        <div className="p-4 bg-gray-50 rounded-full dark:bg-gray-800">
                                            <IconDatabaseOff size={48} strokeWidth={1} className='text-gray-300 dark:text-gray-600' />
                                        </div>
                                    </div>
                                    <span className='text-gray-500 dark:text-gray-400 font-medium'>Data {typeLabel.toLowerCase()} tidak ditemukan</span>
                                    <p className="text-sm text-gray-400 mt-1">Coba sesuaikan filter atau kata kunci pencarian Anda</p>
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
