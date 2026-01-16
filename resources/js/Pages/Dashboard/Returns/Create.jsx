import React, { useState } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, useForm, usePage, router } from '@inertiajs/react'
import Card from '@/Components/Common/Card'
import Button from '@/Components/Common/Button'
import { IconArrowLeft, IconSearch, IconPackageOff, IconCheck } from '@tabler/icons-react'
import Input from '@/Components/Common/Input'
import Textarea from '@/Components/Common/TextArea'
import Select from '@/Components/Common/Select'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function Create({ transaction: initialTransaction, returnTypes }) {
    const { errors } = usePage().props
    const [transaction, setTransaction] = useState(initialTransaction)
    const [invoiceSearch, setInvoiceSearch] = useState(initialTransaction?.invoice || '')
    const [searching, setSearching] = useState(false)
    const [selectedItems, setSelectedItems] = useState([])

    const { data, setData, post, processing } = useForm({
        transaction_id: initialTransaction?.id || '',
        return_type: 'refund',
        reason: '',
        items: []
    })

    // Search transaction
    const searchTransaction = async () => {
        if (!invoiceSearch.trim()) {
            toast.error('Masukkan nomor invoice')
            return
        }

        setSearching(true)
        try {
            const response = await axios.get(route('returns.searchTransaction'), {
                params: { invoice: invoiceSearch }
            })
            setTransaction(response.data.transaction)
            setData('transaction_id', response.data.transaction.id)
            setSelectedItems([])
            toast.success('Transaksi ditemukan')
        } catch (error) {
            toast.error(error.response?.data?.error || 'Transaksi tidak ditemukan')
            setTransaction(null)
        } finally {
            setSearching(false)
        }
    }

    // Toggle item selection
    const toggleItem = (detail, checked) => {
        if (checked) {
            setSelectedItems([...selectedItems, {
                product_id: detail.product_id,
                variant_name: detail.variant_name,
                qty: detail.qty,
                max_qty: detail.qty,
                price: detail.price,
                product_name: detail.product?.title || 'Produk',
                condition_note: ''
            }])
        } else {
            setSelectedItems(selectedItems.filter(i =>
                !(i.product_id === detail.product_id && i.variant_name === detail.variant_name)
            ))
        }
    }

    // Update item quantity
    const updateItemQty = (index, value) => {
        const updated = [...selectedItems]
        updated[index].qty = Math.min(parseFloat(value) || 0, updated[index].max_qty)
        setSelectedItems(updated)
    }

    // Update item condition note
    const updateItemNote = (index, value) => {
        const updated = [...selectedItems]
        updated[index].condition_note = value
        setSelectedItems(updated)
    }

    // Calculate total return
    const totalReturn = selectedItems.reduce((sum, item) => sum + (item.qty * item.price), 0)

    // Format currency
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value || 0)
    }

    // Submit form
    const submit = (e) => {
        e.preventDefault()

        if (selectedItems.length === 0) {
            toast.error('Pilih minimal 1 item untuk di-return')
            return
        }

        const formData = {
            ...data,
            items: selectedItems.map(item => ({
                product_id: item.product_id,
                variant_name: item.variant_name,
                qty: item.qty,
                price: item.price,
                condition_note: item.condition_note
            }))
        }

        router.post(route('returns.store'), formData, {
            onSuccess: () => {
                toast.success('Return berhasil dibuat')
            },
            onError: () => {
                toast.error('Gagal membuat return')
            }
        })
    }

    return (
        <>
            <Head title='Buat Return' />

            {/* Search Transaction */}
            <Card title="Cari Transaksi" className="mb-4">
                <div className="flex gap-2">
                    <div className="flex-1">
                        <Input
                            placeholder="Masukkan nomor invoice (contoh: TRX-xxxxx)"
                            value={invoiceSearch}
                            onChange={(e) => setInvoiceSearch(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && searchTransaction()}
                        />
                    </div>
                    <Button
                        type="button"
                        label={searching ? "Mencari..." : "Cari"}
                        icon={<IconSearch size={18} />}
                        className="border bg-blue-500 text-white hover:bg-blue-600"
                        onClick={searchTransaction}
                        disabled={searching}
                    />
                </div>
            </Card>

            {/* Transaction Details */}
            {transaction && (
                <form onSubmit={submit}>
                    <Card
                        title={`Transaksi: ${transaction.invoice}`}
                        className="mb-4"
                    >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                            <div>
                                <span className="text-gray-500">Kasir:</span>
                                <p className="font-medium">{transaction.cashier?.name || '-'}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Tanggal:</span>
                                <p className="font-medium">
                                    {new Date(transaction.created_at).toLocaleDateString('id-ID')}
                                </p>
                            </div>
                            <div>
                                <span className="text-gray-500">Total:</span>
                                <p className="font-medium">{formatCurrency(transaction.grand_total)}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Metode Bayar:</span>
                                <p className="font-medium uppercase">{transaction.payment_method}</p>
                            </div>
                        </div>

                        <h4 className="font-medium mb-2">Pilih Item untuk Return:</h4>
                        <div className="space-y-2">
                            {transaction.details?.map((detail, idx) => {
                                const isSelected = selectedItems.some(i =>
                                    i.product_id === detail.product_id && i.variant_name === detail.variant_name
                                )
                                const selectedIndex = selectedItems.findIndex(i =>
                                    i.product_id === detail.product_id && i.variant_name === detail.variant_name
                                )

                                return (
                                    <div key={idx} className={`p-3 rounded-lg border ${isSelected ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>
                                        <div className="flex items-start gap-3">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={(e) => toggleItem(detail, e.target.checked)}
                                                className="mt-1 h-4 w-4 rounded border-gray-300"
                                            />
                                            <div className="flex-1">
                                                <div className="flex justify-between">
                                                    <div>
                                                        <p className="font-medium">{detail.product?.title || 'Produk'}</p>
                                                        {detail.variant_name && (
                                                            <p className="text-sm text-gray-500">Varian: {detail.variant_name}</p>
                                                        )}
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm">Qty: {detail.qty}</p>
                                                        <p className="font-medium">{formatCurrency(detail.price * detail.qty)}</p>
                                                    </div>
                                                </div>

                                                {isSelected && selectedIndex >= 0 && (
                                                    <div className="mt-2 grid grid-cols-2 gap-2">
                                                        <div>
                                                            <label className="text-xs text-gray-500">Qty Return (max: {selectedItems[selectedIndex].max_qty})</label>
                                                            <Input
                                                                type="number"
                                                                min="0.001"
                                                                max={selectedItems[selectedIndex].max_qty}
                                                                step="0.001"
                                                                value={selectedItems[selectedIndex].qty}
                                                                onChange={(e) => updateItemQty(selectedIndex, e.target.value)}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="text-xs text-gray-500">Kondisi Barang</label>
                                                            <Input
                                                                placeholder="Kondisi barang..."
                                                                value={selectedItems[selectedIndex].condition_note}
                                                                onChange={(e) => updateItemNote(selectedIndex, e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </Card>

                    {/* Return Details */}
                    {selectedItems.length > 0 && (
                        <Card
                            title="Detail Return"
                            footer={
                                <div className='flex items-center justify-between'>
                                    <Button
                                        type='button'
                                        label='Kembali'
                                        icon={<IconArrowLeft size={20} strokeWidth={1.5} />}
                                        className='border bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200'
                                        onClick={() => router.visit(route('returns.index'))}
                                    />
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">Total Return:</p>
                                        <p className="text-xl font-bold text-blue-600">{formatCurrency(totalReturn)}</p>
                                    </div>
                                    <Button
                                        type='submit'
                                        label={processing ? 'Menyimpan...' : 'Ajukan Return'}
                                        icon={<IconCheck size={20} strokeWidth={1.5} />}
                                        className='border bg-green-500 text-white hover:bg-green-600'
                                        disabled={processing}
                                    />
                                </div>
                            }
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Select
                                    label="Tipe Return"
                                    value={data.return_type}
                                    onChange={(e) => setData('return_type', e.target.value)}
                                    errors={errors.return_type}
                                >
                                    {Object.entries(returnTypes).map(([key, label]) => (
                                        <option key={key} value={key}>{label}</option>
                                    ))}
                                </Select>
                                <div></div>
                                <div className="md:col-span-2">
                                    <Textarea
                                        label="Alasan Return"
                                        placeholder="Jelaskan alasan return (wajib diisi)"
                                        value={data.reason}
                                        onChange={(e) => setData('reason', e.target.value)}
                                        errors={errors.reason}
                                        rows={3}
                                    />
                                </div>
                            </div>

                            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                    <strong>Catatan:</strong> Return akan menunggu approval dari manager sebelum diproses.
                                </p>
                            </div>
                        </Card>
                    )}
                </form>
            )}

            {/* No Transaction Selected */}
            {!transaction && (
                <Card>
                    <div className="text-center py-8">
                        <IconPackageOff size={48} className="mx-auto text-gray-400 mb-3" />
                        <p className="text-gray-500">Cari transaksi dengan memasukkan nomor invoice di atas</p>
                    </div>
                </Card>
            )}
        </>
    )
}

Create.layout = page => <DashboardLayout children={page} />
