import React, { useState, useEffect } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import { IconDatabaseOff, IconArrowsExchange, IconCirclePlus, IconMinus, IconTrash, IconFileSpreadsheet, IconX, IconPencilPlus, IconAlertTriangle, IconFileAnalytics, IconBulb, IconChevronDown, IconFilter } from '@tabler/icons-react'
import Table from '@/Components/Common/Table'
import Button from '@/Components/Common/Button'
import Input from '@/Components/Common/Input'
import Select from '@/Components/Common/Select'
import SearchableSelect from '@/Components/Common/SearchableSelect'
import Modal from '@/Components/Common/Modal'
import toast from 'react-hot-toast'
import axios from 'axios'
import ImportModal from '@/Components/ImportModal'

export default function Index({ movements, filters, warehouses, displays, transferProducts, allProducts, suppliers, stockOutReasons }) {
    const { auth } = usePage().props;
    const hasPermission = (name) => auth.super || auth.permissions[name];

    const [filterData, setFilterData] = useState({
        product: filters.product || '',
        type: filters.type || '',
        start_date: filters.start_date || '',
        end_date: filters.end_date || ''
    })

    // Modal States
    const [showTransferModal, setShowTransferModal] = useState(false)
    const [showStockInModal, setShowStockInModal] = useState(false)
    const [showStockOutModal, setShowStockOutModal] = useState(false)

    // Import States
    const [showImport, setShowImport] = useState(false);
    const [importing, setImporting] = useState(false);
    const [importErrors, setImportErrors] = useState({});
    const [importData, setImportData] = useState({
        warehouse_id: warehouses.length > 0 ? warehouses[0].id : '',
        supplier_id: ''
    });

    const handleImport = (file) => {
        setImporting(true);
        router.post(route('stock-movements.import'), {
            file: file,
            warehouse_id: importData.warehouse_id,
            supplier_id: importData.supplier_id
        }, {
            forceFormData: true,
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setShowImport(false);
                setImporting(false);
                setImportErrors({});
                toast.success('Stok berhasil diimport!');
            },
            onError: (err) => {
                setImporting(false);
                setImportErrors(err);
                toast.error('Gagal Import Stok');
            },
            onFinish: () => setImporting(false)
        });
    };

    // Stock availability states
    const [transferAvailableStock, setTransferAvailableStock] = useState(0)
    const [stockOutAvailableStock, setStockOutAvailableStock] = useState(0)
    const [stockOutFilteredProducts, setStockOutFilteredProducts] = useState([])

    // Transfer Form
    const transferForm = useForm({
        warehouse_id: warehouses.length > 0 ? warehouses[0].id : '',
        display_id: displays.length > 0 ? displays[0].id : '',
        product_id: '',
        quantity: '',
        note: ''
    })

    // Stock In Form (simplified single item)
    const stockInForm = useForm({
        warehouse_id: warehouses.length > 0 ? warehouses[0].id : '',
        supplier_id: '',
        product_id: '',
        quantity: '',
        purchase_price: '',
        note: ''
    })

    // Stock Out Form
    const stockOutForm = useForm({
        location_type: 'warehouse',
        location_id: warehouses.length > 0 ? warehouses[0].id : '',
        product_id: '',
        quantity: '',
        reason: 'damaged',
        note: ''
    })

    // ==================== TRANSFER MODAL LOGIC ====================
    useEffect(() => {
        if (transferForm.data.warehouse_id && transferForm.data.product_id) {
            axios.get(route('stock-movements.warehouseStock'), {
                params: {
                    warehouse_id: transferForm.data.warehouse_id,
                    product_id: transferForm.data.product_id
                }
            }).then(response => {
                setTransferAvailableStock(response.data.quantity)
            }).catch(() => {
                setTransferAvailableStock(0)
            })
        } else {
            setTransferAvailableStock(0)
        }
    }, [transferForm.data.warehouse_id, transferForm.data.product_id])

    const getTransferProductsWithStock = () => {
        if (!transferForm.data.warehouse_id || !warehouses.length) return transferProducts;
        const warehouse = warehouses.find(w => w.id == transferForm.data.warehouse_id)
        if (!warehouse || !warehouse.stocks) return transferProducts;
        const productIdsWithStock = warehouse.stocks.map(s => s.product_id)
        return transferProducts.filter(p => productIdsWithStock.includes(p.id))
    }

    const transferProductOptions = getTransferProductsWithStock().map(product => ({
        value: product.id,
        label: product.barcode ? `${product.title} (${product.barcode})` : product.title
    }))

    const selectedTransferProduct = transferProductOptions.find(opt => opt.value == transferForm.data.product_id) || null

    const handleTransferSubmit = (e) => {
        e.preventDefault()
        transferForm.post(route('stock-movements.storeTransfer'), {
            onSuccess: () => {
                toast('Stok berhasil ditransfer ke display', {
                    icon: '👏',
                    style: { borderRadius: '10px', background: '#1C1F29', color: '#fff' },
                })
                setShowTransferModal(false)
                transferForm.reset()
                setTransferAvailableStock(0)
            },
            onError: () => {
                toast('Terjadi kesalahan', {
                    style: { borderRadius: '10px', background: '#FF0000', color: '#fff' },
                })
            },
        })
    }

    const openTransferModal = () => {
        transferForm.reset()
        transferForm.setData({
            warehouse_id: warehouses.length > 0 ? warehouses[0].id : '',
            display_id: displays.length > 0 ? displays[0].id : '',
            product_id: '',
            quantity: '',
            note: ''
        })
        setTransferAvailableStock(0)
        setShowTransferModal(true)
    }

    // ==================== STOCK IN MODAL LOGIC ====================
    const allProductOptions = (allProducts || []).map(product => ({
        value: product.id,
        label: product.barcode
            ? `${product.title} (${product.barcode})`
            : product.title
    }))

    const supplierOptions = (suppliers || []).map(supplier => ({
        value: supplier.id,
        label: supplier.company ? `${supplier.name} (${supplier.company})` : supplier.name
    }))

    const selectedStockInProduct = allProductOptions.find(opt => opt.value == stockInForm.data.product_id) || null
    const selectedSupplier = supplierOptions.find(opt => opt.value == stockInForm.data.supplier_id) || null

    const formatCurrency = (value) => {
        if (!value) return ''
        const num = parseFloat(value)
        if (isNaN(num)) return ''
        return new Intl.NumberFormat('id-ID').format(num)
    }

    const parseCurrency = (value) => {
        return String(value).replace(/\D/g, '')
    }

    const handleStockInSubmit = (e) => {
        e.preventDefault()

        const payload = {
            warehouse_id: stockInForm.data.warehouse_id,
            supplier_id: stockInForm.data.supplier_id || null,
            product_id: stockInForm.data.product_id,
            quantity: stockInForm.data.quantity,
            purchase_price: parseCurrency(stockInForm.data.purchase_price) || null,
            note: stockInForm.data.note || null,
        }

        router.post(route('stock-movements.store'), payload, {
            onSuccess: () => {
                toast('Stok berhasil ditambahkan ke gudang', {
                    icon: '👏',
                    style: { borderRadius: '10px', background: '#1C1F29', color: '#fff' },
                })
                setShowStockInModal(false)
                stockInForm.reset()
            },
            onError: () => {
                toast('Terjadi kesalahan', {
                    style: { borderRadius: '10px', background: '#FF0000', color: '#fff' },
                })
            },
        })
    }

    const openStockInModal = () => {
        stockInForm.reset()
        stockInForm.setData({
            warehouse_id: warehouses.length > 0 ? warehouses[0].id : '',
            supplier_id: '',
            product_id: '',
            quantity: '',
            purchase_price: '',
            note: ''
        })
        setShowStockInModal(true)
    }

    // Edit Modal State
    const [showEditModal, setShowEditModal] = useState(false)
    const editForm = useForm({
        id: '',
        quantity: '',
        purchase_price: '',
        note: '',
        type: '', // for conditional rendering
        reason: '', // for stock out reason
    })

    const handleEdit = (movement) => {
        editForm.reset()
        editForm.setData({
            id: movement.id,
            quantity: movement.quantity,
            purchase_price: movement.purchase_price ? formatCurrency(movement.purchase_price) : '',
            note: movement.note ? movement.note.replace(/^\[.*?\]\s*/, '') : '', // Remove reason prefix if present
            type: movement.to_type,
            reason: movement.to_type === 'out' ? Object.keys(stockOutReasons).find(key => movement.note?.includes(stockOutReasons[key])) || 'other' : '',
        })
        setShowEditModal(true)
    }

    const handleEditSubmit = (e) => {
        e.preventDefault()

        editForm.transform((data) => ({
            ...data,
            quantity: parseFloat(data.quantity),
            purchase_price: data.type === 'warehouse' ? parseCurrency(data.purchase_price) : null,
        }))

        editForm.put(route('stock-movements.update', editForm.data.id), {
            onSuccess: () => {
                toast.success('Pergerakan stok berhasil diperbarui')
                setShowEditModal(false)
                editForm.reset()
            },
            onError: () => {
                toast.error('Gagal memperbarui pergerakan stok')
            }
        })
    }

    useEffect(() => {
        if (stockOutForm.data.location_type === 'warehouse') {
            const warehouse = warehouses.find(w => w.id == stockOutForm.data.location_id)
            if (warehouse && warehouse.stocks) {
                const productIds = warehouse.stocks.map(s => s.product_id)
                setStockOutFilteredProducts((allProducts || []).filter(p => productIds.includes(p.id)))
            } else {
                setStockOutFilteredProducts([])
            }
        } else {
            const display = displays.find(d => d.id == stockOutForm.data.location_id)
            if (display && display.stocks) {
                const productIds = display.stocks.map(s => s.product_id)
                setStockOutFilteredProducts((allProducts || []).filter(p => productIds.includes(p.id)))
            } else {
                setStockOutFilteredProducts([])
            }
        }
        stockOutForm.setData('product_id', '')
        setStockOutAvailableStock(0)
    }, [stockOutForm.data.location_type, stockOutForm.data.location_id])

    useEffect(() => {
        if (stockOutForm.data.location_id && stockOutForm.data.product_id) {
            const url = stockOutForm.data.location_type === 'warehouse'
                ? route('stock-movements.warehouseStock')
                : route('stock-movements.displayStock')

            const params = stockOutForm.data.location_type === 'warehouse'
                ? { warehouse_id: stockOutForm.data.location_id, product_id: stockOutForm.data.product_id }
                : { display_id: stockOutForm.data.location_id, product_id: stockOutForm.data.product_id }

            axios.get(url, { params }).then(response => {
                setStockOutAvailableStock(response.data.quantity)
            }).catch(() => {
                setStockOutAvailableStock(0)
            })
        } else {
            setStockOutAvailableStock(0)
        }
    }, [stockOutForm.data.product_id, stockOutForm.data.location_id, stockOutForm.data.location_type])

    const stockOutProductOptions = stockOutFilteredProducts.map(product => ({
        value: product.id,
        label: product.barcode ? `${product.title} (${product.barcode})` : product.title
    }))

    const selectedStockOutProduct = stockOutProductOptions.find(opt => opt.value == stockOutForm.data.product_id) || null

    const handleStockOutSubmit = (e) => {
        e.preventDefault()
        stockOutForm.post(route('stock-movements.storeStockOut'), {
            onSuccess: () => {
                toast('Barang keluar berhasil dicatat', {
                    icon: '✅',
                    style: { borderRadius: '10px', background: '#1C1F29', color: '#fff' },
                })
                setShowStockOutModal(false)
                stockOutForm.reset()
                setStockOutAvailableStock(0)
            },
            onError: () => {
                toast('Terjadi kesalahan', {
                    style: { borderRadius: '10px', background: '#FF0000', color: '#fff' },
                })
            },
        })
    }

    const openStockOutModal = () => {
        stockOutForm.reset()
        stockOutForm.setData({
            location_type: 'warehouse',
            location_id: warehouses.length > 0 ? warehouses[0].id : '',
            product_id: '',
            quantity: '',
            reason: 'damaged',
            note: ''
        })
        setStockOutAvailableStock(0)
        setShowStockOutModal(true)
    }

    const stockOutLocations = stockOutForm.data.location_type === 'warehouse' ? warehouses : displays

    // ==================== OTHER FUNCTIONS ====================
    // Helper for formatting quantity
    const isWeightBasedUnit = (unit) => {
        const weightUnits = ["kg", "gram", "g", "liter", "l", "ml", "ons", "ton"];
        return weightUnits.includes(unit?.toLowerCase());
    };

    const formatQty = (qty, unit) => {
        const numQty = parseFloat(qty);
        if (isWeightBasedUnit(unit) || (numQty % 1 !== 0)) {
            // Allow decimals but strip unnecessary trailing zeros, max 3 places
            return parseFloat(numQty.toFixed(3)).toString();
        }
        return Math.floor(numQty).toString();
    };

    const handleExport = () => {
        const params = new URLSearchParams(filterData).toString();
        window.open(route("stock-movements.export") + "?" + params, "_blank");
    }

    const handleExportStockReport = () => {
        window.open(route("stock-movements.exportStockReport"), "_blank");
    }

    const handleFilter = () => {
        router.get(route('stock-movements.index'), filterData, {
            preserveState: true
        })
    }

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus pergerakan stok ini? Stok akan dikembalikan ke posisi sebelumnya.')) {
            router.delete(route('stock-movements.destroy', id), {
                onSuccess: () => {
                    toast.success('Pergerakan stok berhasil dihapus')
                },
                onError: () => {
                    toast.error('Gagal menghapus pergerakan stok')
                }
            })
        }
    }

    const getTypeLabel = (movement) => {
        if (movement.to_type === 'warehouse') return { label: 'Barang Masuk', color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' }
        if (movement.from_type === 'warehouse' && movement.to_type === 'display') return { label: 'Transfer', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' }
        if (movement.to_type === 'transaction') return { label: 'Penjualan', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' }
        if (movement.to_type === 'out') return { label: 'Barang Keluar', color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' }
        return { label: 'Lainnya', color: 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300' }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <>
            <Head title='Riwayat Stok' />
            <Head title="Manajemen Stok" />

            <div className='flex flex-col lg:flex-row gap-4 mb-6'>
                {/* Main Action Buttons */}
                <div className="flex flex-wrap gap-2">
                    {hasPermission('stock-movements-create') && (
                        <>
                            <Button
                                type='button'
                                onClick={openStockInModal}
                                label='Barang Masuk'
                                icon={<IconCirclePlus size={18} />}
                                className='bg-green-600 hover:bg-green-700 text-white shadow-sm'
                            />
                            <Button
                                type='button'
                                onClick={openStockOutModal}
                                label='Barang Keluar'
                                icon={<IconMinus size={18} />}
                                className='bg-red-600 hover:bg-red-700 text-white shadow-sm'
                            />
                            <Button
                                type='button'
                                onClick={openTransferModal}
                                label='Transfer Stok'
                                icon={<IconArrowsExchange size={18} />}
                                className='bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                            />
                        </>
                    )}
                </div>

                {/* Right Side Actions */}
                <div className="flex flex-wrap gap-2 lg:ml-auto">
                    <Button
                        type='button'
                        onClick={handleExportStockReport}
                        label='Export Laporan Stok'
                        icon={<IconFileAnalytics size={18} />}
                        className='bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                    />
                    <Button
                        type='button'
                        onClick={handleExport}
                        label='Export Riwayat'
                        icon={<IconFileSpreadsheet size={18} />}
                        className='bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                    />
                    <Button
                        type='button'
                        onClick={() => setShowImport(true)}
                        label='Import Excel'
                        icon={<IconFileSpreadsheet size={18} />}
                        className='bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                    />
                </div>
            </div>

            {hasPermission('stock-movements-access') && (
                <div className='mb-6'>
                    <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3 text-blue-700 dark:text-blue-300'>
                        <IconBulb className="min-w-5 h-5 mt-0.5" />
                        <div className="text-sm">
                            <span className="font-semibold">Tips:</span> Gunakan "Barang Masuk" untuk penyesuaian stok cepat. Untuk pengadaan formal dengan tracking invoice dan partial receiving, gunakan menu <Link href={route('purchase-orders.index')} className="underline hover:text-blue-800">Purchase Order</Link>.
                        </div>
                    </div>
                </div>
            )}

            {/* Main Table Card */}
            <Table.Card
                title={'Riwayat Pergerakan Stok'}
                links={movements.links}
                meta={{
                    from: movements.from,
                    to: movements.to,
                    total: movements.total,
                    per_page: movements.per_page
                }}
                url={route('stock-movements.index')}
                action={
                    <div className='flex flex-col sm:flex-row gap-3 min-w-0 sm:min-w-[800px] justify-end items-center'>
                        {/* Type Filter */}
                        <div className='relative w-full sm:w-40'>
                            <select
                                value={filterData.type}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setFilterData(prev => ({ ...prev, type: val }));
                                    // Auto trigger filter on change for dropdowns preferably, or keep button?
                                    // For consistency with Product page, let's trigger on change or Keep "Filter" button?
                                    // Product page triggers on change. Let's try to trigger on change for Selects.
                                    router.get(route('stock-movements.index'), { ...filterData, type: val }, { preserveState: true });
                                }}
                                className='w-full pl-3 pr-10 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-0 focus:border-gray-300 dark:focus:border-gray-600 dark:bg-gray-950 dark:border-gray-900 dark:text-gray-300 appearance-none cursor-pointer transition-colors'
                            >
                                <option value="">Semua Tipe</option>
                                <option value="in">Barang Masuk</option>
                                <option value="transfer">Transfer</option>
                                <option value="sale">Penjualan</option>
                                <option value="stockout">Barang Keluar</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                                <IconChevronDown size={16} />
                            </div>
                        </div>

                        {/* Date Filters */}
                        <div className='flex gap-2 w-full sm:w-auto'>
                            <input
                                type='date'
                                value={filterData.start_date}
                                onChange={(e) => setFilterData(prev => ({ ...prev, start_date: e.target.value }))}
                                className='w-full sm:w-32 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-0 focus:border-gray-300 dark:focus:border-gray-600 dark:bg-gray-950 dark:border-gray-900 dark:text-gray-300 transition-colors'
                                placeholder='Dari'
                            />
                            <span className="self-center text-gray-400">-</span>
                            <input
                                type='date'
                                value={filterData.end_date}
                                onChange={(e) => setFilterData(prev => ({ ...prev, end_date: e.target.value }))}
                                className='w-full sm:w-32 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-0 focus:border-gray-300 dark:focus:border-gray-600 dark:bg-gray-950 dark:border-gray-900 dark:text-gray-300 transition-colors'
                                placeholder='Sampai'
                            />
                        </div>

                        {/* Search Product (Manual Input acting like Search) */}
                        <div className='flex gap-2 w-full sm:flex-1'>
                             <div className='relative w-full'>
                                <input
                                    type='text'
                                    value={filterData.product}
                                    onChange={(e) => setFilterData(prev => ({ ...prev, product: e.target.value }))}
                                    onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
                                    className='w-full pl-4 pr-10 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-0 focus:border-gray-300 dark:focus:border-gray-600 dark:bg-gray-950 dark:border-gray-900 dark:text-gray-300 transition-colors'
                                    placeholder='Cari produk...'
                                />
                                <button 
                                    onClick={handleFilter}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-blue-600"
                                >
                                    <IconFilter size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                }
            >
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className='w-40'>Tanggal</Table.Th>
                            <Table.Th>Produk</Table.Th>
                            <Table.Th className='w-24'>Tipe</Table.Th>
                            <Table.Th>Dari</Table.Th>
                            <Table.Th>Ke</Table.Th>
                            <Table.Th className='w-20 text-center'>Qty</Table.Th>
                            <Table.Th className='w-28 text-right'>Harga Beli</Table.Th>
                            <Table.Th className='w-28 text-right'>Kerugian</Table.Th>
                            <Table.Th>User</Table.Th>
                            <Table.Th className='w-16 text-center'>Aksi</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {movements.data.length ?
                            movements.data.map((movement, i) => {
                                const typeInfo = getTypeLabel(movement)
                                return (
                                    <tr className='hover:bg-gray-100 dark:hover:bg-gray-900' key={i}>
                                        <Table.Td className='text-sm'>
                                            {formatDate(movement.created_at)}
                                        </Table.Td>
                                        <Table.Td>{movement.product?.title}</Table.Td>
                                        <Table.Td>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
                                                {typeInfo.label}
                                            </span>
                                        </Table.Td>
                                        <Table.Td className='text-sm text-gray-600 dark:text-gray-400'>
                                            {movement.from_type === 'supplier'
                                                ? (movement.supplier?.name || 'Supplier')
                                                : movement.from_type
                                            }
                                        </Table.Td>
                                        <Table.Td className='text-sm text-gray-600 dark:text-gray-400'>
                                            {movement.to_type === 'out' ? 'Keluar' : movement.to_type}
                                        </Table.Td>
                                        <Table.Td className='text-center'>
                                            <span className='bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium dark:bg-gray-800 dark:text-gray-300'>
                                                {formatQty(movement.quantity, movement.product?.unit)}
                                            </span>
                                        </Table.Td>
                                        <Table.Td className='text-sm text-right'>
                                            {movement.purchase_price
                                                ? `Rp ${new Intl.NumberFormat('id-ID').format(movement.purchase_price)}`
                                                : '-'
                                            }
                                        </Table.Td>
                                        <Table.Td className='text-sm text-right'>
                                            {movement.loss_amount
                                                ? <span className='text-red-600 font-medium'>Rp {new Intl.NumberFormat('id-ID').format(movement.loss_amount)}</span>
                                                : '-'
                                            }
                                        </Table.Td>
                                        <Table.Td className='text-sm'>{movement.user?.name}</Table.Td>
                                        <Table.Td>
                                            {movement.to_type !== 'transaction' && (
                                                <div className='flex items-center justify-center gap-1'>
                                                    <button
                                                        onClick={() => handleEdit(movement)}
                                                        className='p-1.5 rounded-md text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-900/30'
                                                        title='Edit'
                                                    >
                                                        <IconPencilPlus size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(movement.id)}
                                                        className='p-1.5 rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30'
                                                        title='Hapus'
                                                    >
                                                        <IconTrash size={14} />
                                                    </button>
                                                </div>
                                            )}
                                        </Table.Td>
                                    </tr>
                                )
                            }) :
                            <Table.Empty colSpan={10} message={
                                <>
                                    <div className='flex justify-center items-center text-center mb-2'>
                                        <IconDatabaseOff size={24} strokeWidth={1.5} className='text-gray-500 dark:text-white' />
                                    </div>
                                    <span className='text-gray-500'>Belum ada riwayat pergerakan stok</span>
                                </>
                            } />
                        }
                    </Table.Tbody>
                </Table>
            </Table.Card>

            {/* ==================== TRANSFER MODAL ==================== */}
            <Modal
                show={showTransferModal}
                onClose={() => setShowTransferModal(false)}
                maxWidth="lg"
                title={
                    <div className='flex items-center gap-2'>
                        <IconArrowsExchange size={20} strokeWidth={1.5} />
                        <span>Transfer Stok: Gudang → Display</span>
                    </div>
                }
            >
                <form onSubmit={handleTransferSubmit}>
                    <div className='grid grid-cols-12 gap-4'>
                        <div className='col-span-6'>
                            <Select
                                label="Dari Gudang"
                                value={transferForm.data.warehouse_id}
                                onChange={e => transferForm.setData('warehouse_id', e.target.value)}
                                errors={transferForm.errors.warehouse_id}
                            >
                                {warehouses.map(warehouse => (
                                    <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
                                ))}
                            </Select>
                        </div>
                        <div className='col-span-6'>
                            <Select
                                label="Ke Display"
                                value={transferForm.data.display_id}
                                onChange={e => transferForm.setData('display_id', e.target.value)}
                                errors={transferForm.errors.display_id}
                            >
                                {displays.map(display => (
                                    <option key={display.id} value={display.id}>{display.name}</option>
                                ))}
                            </Select>
                        </div>
                        <div className='col-span-12'>
                            <SearchableSelect
                                label="Produk"
                                options={transferProductOptions}
                                value={selectedTransferProduct}
                                onChange={(option) => transferForm.setData('product_id', option ? option.value : '')}
                                placeholder="Cari dan pilih produk..."
                                errors={transferForm.errors.product_id}
                            />
                        </div>

                        {transferForm.data.product_id && (
                            <div className='col-span-12'>
                                <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3'>
                                    <p className='text-sm text-blue-700 dark:text-blue-300'>
                                        Stok tersedia di gudang: <strong>
                                            {(() => {
                                                const product = transferProducts.find(p => p.id == transferForm.data.product_id);
                                                return formatQty(transferAvailableStock, product?.unit);
                                            })()}
                                        </strong>
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className='col-span-6'>
                            <Input
                                name='quantity'
                                label={'Jumlah Transfer'}
                                type={'number'}
                                step='0.001'
                                max={transferAvailableStock}
                                placeholder={'Jumlah yang akan ditransfer'}
                                value={transferForm.data.quantity}
                                errors={transferForm.errors.quantity}
                                onChange={e => transferForm.setData('quantity', e.target.value)}
                            />
                        </div>
                        <div className="col-span-12">
                            <Input
                                name='note'
                                label={'Catatan (Opsional)'}
                                placeholder={'Catatan transfer stok'}
                                value={transferForm.data.note}
                                errors={transferForm.errors.note}
                                onChange={e => transferForm.setData('note', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='flex items-center justify-end gap-2 mt-6 pt-4 border-t dark:border-gray-800'>
                        <Button
                            type={'button'}
                            label={'Batal'}
                            icon={<IconX size={18} strokeWidth={1.5} />}
                            className={'border bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700'}
                            onClick={() => setShowTransferModal(false)}
                        />
                        <Button
                            type={'submit'}
                            label={transferForm.processing ? 'Memproses...' : 'Transfer'}
                            icon={<IconPencilPlus size={18} strokeWidth={1.5} />}
                            className={'border bg-blue-500 text-white hover:bg-blue-600'}
                            disabled={transferForm.processing}
                        />
                    </div>
                </form>
            </Modal>

            {/* ==================== STOCK IN MODAL ==================== */}
            <Modal
                show={showStockInModal}
                onClose={() => setShowStockInModal(false)}
                maxWidth="lg"
                title={
                    <div className='flex items-center gap-2'>
                        <IconCirclePlus size={20} strokeWidth={1.5} />
                        <span>Barang Masuk ke Gudang</span>
                    </div>
                }
            >
                <form onSubmit={handleStockInSubmit}>
                    <div className='grid grid-cols-12 gap-4'>
                        <div className='col-span-6'>
                            <SearchableSelect
                                label="Supplier (Opsional)"
                                options={supplierOptions}
                                value={selectedSupplier}
                                onChange={(option) => stockInForm.setData('supplier_id', option ? option.value : '')}
                                placeholder="Pilih supplier..."
                                isClearable={true}
                                errors={stockInForm.errors.supplier_id}
                            />
                        </div>
                        <div className='col-span-6'>
                            <Select
                                label="Gudang Tujuan"
                                value={stockInForm.data.warehouse_id}
                                onChange={e => stockInForm.setData('warehouse_id', e.target.value)}
                                errors={stockInForm.errors.warehouse_id}
                            >
                                {warehouses.map(warehouse => (
                                    <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
                                ))}
                            </Select>
                        </div>
                        <div className='col-span-12'>
                            <SearchableSelect
                                label="Produk"
                                options={allProductOptions}
                                value={selectedStockInProduct}
                                onChange={(option) => stockInForm.setData('product_id', option ? option.value : '')}
                                placeholder="Cari dan pilih produk..."
                                errors={stockInForm.errors.product_id}
                            />
                        </div>
                        <div className='col-span-6'>
                            <Input
                                name='quantity'
                                label={'Jumlah (Qty)'}
                                type={'number'}
                                min='0.001'
                                step='0.001'
                                placeholder={'Jumlah barang masuk'}
                                value={stockInForm.data.quantity}
                                errors={stockInForm.errors.quantity}
                                onChange={e => stockInForm.setData('quantity', e.target.value)}
                            />
                        </div>
                        <div className='col-span-6'>
                            <Input
                                name='purchase_price'
                                label={'Harga Beli Satuan (Rp)'}
                                type={'text'}
                                placeholder={'Harga per item/satuan'}
                                value={formatCurrency(stockInForm.data.purchase_price)}
                                errors={stockInForm.errors.purchase_price}
                                onChange={e => stockInForm.setData('purchase_price', parseCurrency(e.target.value))}
                            />
                        </div>
                        <div className="col-span-12">
                            <Input
                                name='note'
                                label={'Catatan (Opsional)'}
                                placeholder={'Catatan barang masuk'}
                                value={stockInForm.data.note}
                                errors={stockInForm.errors.note}
                                onChange={e => stockInForm.setData('note', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='flex items-center justify-end gap-2 mt-6 pt-4 border-t dark:border-gray-800'>
                        <Button
                            type={'button'}
                            label={'Batal'}
                            icon={<IconX size={18} strokeWidth={1.5} />}
                            className={'border bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700'}
                            onClick={() => setShowStockInModal(false)}
                        />
                        <Button
                            type={'submit'}
                            label={stockInForm.processing ? 'Memproses...' : 'Simpan Stok Masuk'}
                            icon={<IconCirclePlus size={18} strokeWidth={1.5} />}
                            className={'border bg-green-600 text-white hover:bg-green-700'}
                            disabled={stockInForm.processing}
                        />
                    </div>
                </form>
            </Modal>

            {/* ==================== EDIT MODAL ==================== */}
            <Modal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                maxWidth="lg"
                title={
                    <div className='flex items-center gap-2'>
                        <IconPencilPlus size={20} strokeWidth={1.5} />
                        <span>Edit Pergerakan Stok</span>
                    </div>
                }
            >
                <div className='mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex gap-3 text-amber-800 dark:text-amber-200'>
                    <IconAlertTriangle className='w-5 h-5 flex-shrink-0' />
                    <p className='text-sm'>
                        Perhatian: Mengedit stok akan mengembalikan stok sebelumnya dan menerapkan ulang perubahan baru. Pastikan data benar.
                    </p>
                </div>

                <form onSubmit={handleEditSubmit}>
                    <div className='space-y-4'>
                        <div>
                            <Input
                                name='quantity'
                                label={'Jumlah (Qty)'}
                                type={'number'}
                                step='0.001'
                                value={editForm.data.quantity}
                                errors={editForm.errors.quantity}
                                onChange={e => editForm.setData('quantity', e.target.value)}
                            />
                        </div>

                        {/* Field Harga Beli only visible for Stock In (warehouse) */}
                        {editForm.data.type === 'warehouse' && (
                            <div>
                                <Input
                                    name='purchase_price'
                                    label={'Harga Beli Satuan (Rp)'}
                                    type={'text'}
                                    placeholder={'Harga per item'}
                                    value={editForm.data.purchase_price}
                                    errors={editForm.errors.purchase_price}
                                    onChange={e => editForm.setData('purchase_price', parseCurrency(e.target.value))}
                                />
                                <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
                                    Masukkan harga beli per satuan/unit, bukan total harga.
                                </p>
                            </div>
                        )}

                        <div>
                            <Input
                                name='note'
                                label={'Catatan'}
                                placeholder={'Catatan pergerakan stok'}
                                value={editForm.data.note}
                                errors={editForm.errors.note}
                                onChange={e => editForm.setData('note', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='flex items-center justify-end gap-2 mt-6 pt-4 border-t dark:border-gray-800'>
                        <Button
                            type={'button'}
                            label={'Batal'}
                            icon={<IconX size={18} strokeWidth={1.5} />}
                            className={'border bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700'}
                            onClick={() => setShowEditModal(false)}
                        />
                        <Button
                            type={'submit'}
                            label={editForm.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            icon={<IconPencilPlus size={18} strokeWidth={1.5} />}
                            className={'border bg-blue-500 text-white hover:bg-blue-600'}
                            disabled={editForm.processing}
                        />
                    </div>
                </form>
            </Modal>

            {/* ==================== STOCK OUT MODAL ==================== */}
            <Modal
                show={showStockOutModal}
                onClose={() => setShowStockOutModal(false)}
                maxWidth="lg"
                title={
                    <div className='flex items-center gap-2'>
                        <IconMinus size={20} strokeWidth={1.5} />
                        <span>Barang Keluar (Non-Penjualan)</span>
                    </div>
                }
            >
                <form onSubmit={handleStockOutSubmit}>
                    <div className='bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-4'>
                        <div className='flex items-center gap-2 text-yellow-700 dark:text-yellow-300'>
                            <IconAlertTriangle size={20} />
                            <p className='text-sm'>
                                Untuk mencatat barang keluar selain penjualan (rusak, kadaluarsa, retur, dll).
                            </p>
                        </div>
                    </div>

                    <div className='grid grid-cols-12 gap-4'>
                        <div className='col-span-6'>
                            <Select
                                label="Lokasi Stok"
                                value={stockOutForm.data.location_type}
                                onChange={e => {
                                    stockOutForm.setData({
                                        ...stockOutForm.data,
                                        location_type: e.target.value,
                                        location_id: e.target.value === 'warehouse'
                                            ? (warehouses[0]?.id || '')
                                            : (displays[0]?.id || ''),
                                        product_id: ''
                                    })
                                }}
                            >
                                <option value="warehouse">Gudang</option>
                                <option value="display">Display</option>
                            </Select>
                        </div>
                        <div className='col-span-6'>
                            <Select
                                label={stockOutForm.data.location_type === 'warehouse' ? 'Pilih Gudang' : 'Pilih Display'}
                                value={stockOutForm.data.location_id}
                                onChange={e => stockOutForm.setData('location_id', e.target.value)}
                                errors={stockOutForm.errors.location_id}
                            >
                                {stockOutLocations.map(loc => (
                                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                                ))}
                            </Select>
                        </div>
                        <div className='col-span-12'>
                            <SearchableSelect
                                label="Produk"
                                options={stockOutProductOptions}
                                value={selectedStockOutProduct}
                                onChange={(option) => stockOutForm.setData('product_id', option ? option.value : '')}
                                placeholder="Cari dan pilih produk..."
                                errors={stockOutForm.errors.product_id}
                            />
                        </div>

                        {stockOutForm.data.product_id && (
                            <div className='col-span-12'>
                                <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3'>
                                    <p className='text-sm text-blue-700 dark:text-blue-300'>
                                        Stok tersedia: <strong>
                                            {(() => {
                                                const product = (allProducts || []).find(p => p.id == stockOutForm.data.product_id);
                                                return formatQty(stockOutAvailableStock, product?.unit);
                                            })()}
                                        </strong>
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className='col-span-6'>
                            <Select
                                label="Alasan"
                                value={stockOutForm.data.reason}
                                onChange={e => stockOutForm.setData('reason', e.target.value)}
                                errors={stockOutForm.errors.reason}
                            >
                                {stockOutReasons && Object.entries(stockOutReasons).map(([key, label]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </Select>
                        </div>
                        <div className='col-span-6'>
                            <Input
                                name='quantity'
                                label={'Jumlah'}
                                type={'number'}
                                min='1'
                                max={stockOutAvailableStock}
                                placeholder={'Jumlah barang keluar'}
                                value={stockOutForm.data.quantity}
                                errors={stockOutForm.errors.quantity}
                                onChange={e => stockOutForm.setData('quantity', e.target.value)}
                            />
                        </div>
                        <div className="col-span-12">
                            <Input
                                name='note'
                                label={'Catatan (Opsional)'}
                                placeholder={'Detail keterangan barang keluar'}
                                value={stockOutForm.data.note}
                                errors={stockOutForm.errors.note}
                                onChange={e => stockOutForm.setData('note', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='flex items-center justify-end gap-2 mt-6 pt-4 border-t dark:border-gray-800'>
                        <Button
                            type={'button'}
                            label={'Batal'}
                            icon={<IconX size={18} strokeWidth={1.5} />}
                            className={'border bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700'}
                            onClick={() => setShowStockOutModal(false)}
                        />
                        <Button
                            type={'submit'}
                            label={stockOutForm.processing ? 'Menyimpan...' : 'Simpan'}
                            icon={<IconPencilPlus size={18} strokeWidth={1.5} />}
                            className={'border bg-red-500 text-white hover:bg-red-600'}
                            disabled={stockOutForm.processing}
                        />
                    </div>
                </form>
            </Modal>

            {/* ==================== IMPORT MODAL ==================== */}
            <ImportModal
                show={showImport}
                onClose={() => setShowImport(false)}
                title="Import Stok Masuk"
                templateUrl={route('stock-movements.template')}
                onSubmit={handleImport}
                processing={importing}
                errors={importErrors}
            >
                <div className="mb-4 space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800 text-sm text-blue-800 dark:text-blue-300">
                        <p>Pastikan file Excel Anda menggunakan format yang sesuai. Download template untuk melihat format yang benar.</p>
                        <p className="mt-1 font-semibold">Semua item dalam file akan dimasukkan ke Gudang yang dipilih.</p>
                    </div>

                    <div>
                        <Select
                            label="Gudang Tujuan"
                            value={importData.warehouse_id}
                            onChange={e => setImportData({ ...importData, warehouse_id: e.target.value })}
                        >
                            {warehouses.map(w => (
                                <option key={w.id} value={w.id}>{w.name}</option>
                            ))}
                        </Select>
                    </div>

                    <div>
                        <SearchableSelect
                            label="Supplier (Opsional)"
                            options={supplierOptions}
                            value={supplierOptions.find(opt => opt.value == importData.supplier_id) || null}
                            onChange={(option) => setImportData({ ...importData, supplier_id: option ? option.value : '' })}
                            placeholder="Pilih Supplier..."
                            isClearable={true}
                        />
                    </div>
                </div>
            </ImportModal>
        </>
    )
}

Index.layout = page => <DashboardLayout children={page} />
