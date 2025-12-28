import React, { useState } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, useForm } from '@inertiajs/react'
import Card from '@/Components/Common/Card'
import Button from '@/Components/Common/Button'
import Input from '@/Components/Common/Input'
import Textarea from '@/Components/Common/TextArea'
import Select from '@/Components/Common/Select'
import toast from 'react-hot-toast'
import { 
    IconSettings, 
    IconBuildingStore, 
    IconReceipt, 
    IconShoppingCart, 
    IconPalette, 
    IconBell,
    IconPhoto,
    IconDeviceFloppy,
    IconDatabaseExport,
    IconTool
} from '@tabler/icons-react'

const tabs = [
    { id: 'store', label: 'Informasi Toko', icon: IconBuildingStore },
    { id: 'receipt', label: 'Pengaturan Struk', icon: IconReceipt },
    { id: 'sales', label: 'Pengaturan Penjualan', icon: IconShoppingCart },
    { id: 'maintenance', label: 'Pemeliharaan', icon: IconTool },
]

export default function Index({ settings }) {
    const [activeTab, setActiveTab] = useState('store')

    // Form untuk masing-masing tab
    const storeForm = useForm({
        group: 'store',
        _method: 'PUT',
        settings: {
            store_name: settings.store?.store_name || '',
            store_address: settings.store?.store_address || '',
            store_phone: settings.store?.store_phone || '',
            store_email: settings.store?.store_email || '',
            store_logo: settings.store?.store_logo || null,
            logo: null, // for file upload
        }
    })

    const receiptForm = useForm({
        group: 'receipt',
        settings: {
            receipt_header: settings.receipt?.receipt_header || '',
            receipt_footer: settings.receipt?.receipt_footer || '',
            receipt_show_logo: settings.receipt?.receipt_show_logo === '1',
        }
    })

    const salesForm = useForm({
        group: 'sales',
        settings: {
            default_payment_method: settings.sales?.default_payment_method || 'cash',
            low_stock_threshold: settings.sales?.low_stock_threshold || '10',
            allow_negative_stock: settings.sales?.allow_negative_stock === '1',
        }
    })

    const getActiveForm = () => {
        switch (activeTab) {
            case 'store': return storeForm
            case 'receipt': return receiptForm
            case 'sales': return salesForm
            default: return storeForm
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = getActiveForm()
        
        // Use post for store tab to handle file upload correctly with _method simulation
        if (activeTab === 'store') {
            form.post(route('settings.update'), {
                forceFormData: true,
                onSuccess: () => toast.success('Pengaturan berhasil disimpan!'),
                onError: () => toast.error('Gagal menyimpan pengaturan!'),
            })
        } else {
            form.put(route('settings.update'), {
                onSuccess: () => toast.success('Pengaturan berhasil disimpan!'),
                onError: () => toast.error('Gagal menyimpan pengaturan!'),
            })
        }
    }

    const updateSetting = (key, value) => {
        const form = getActiveForm()
        form.setData('settings', {
            ...form.data.settings,
            [key]: value
        })
    }

    return (
        <>
            <Head title="Pengaturan Aplikasi" />
            
            <Card
                title="Pengaturan Aplikasi"
                icon={<IconSettings size={20} strokeWidth={1.5} />}
            >
                {/* Tabs */}
                <div className="border-b dark:border-gray-800 mb-6">
                    <nav className="flex gap-1 overflow-x-auto pb-px">
                        {tabs.map((tab) => {
                            const Icon = tab.icon
                            const isActive = activeTab === tab.id
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                                        isActive
                                            ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                    }`}
                                >
                                    <Icon size={18} />
                                    <span className="hidden sm:inline">{tab.label}</span>
                                </button>
                            )
                        })}
                    </nav>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Tab 1: Informasi Toko */}
                    {activeTab === 'store' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2 space-y-4 mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Logo Toko
                                </label>
                                <div className="flex items-center gap-6">
                                    <div className="relative group">
                                        <div className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900">
                                            {storeForm.data.settings.logo ? (
                                                <img 
                                                    src={URL.createObjectURL(storeForm.data.settings.logo)} 
                                                    className="w-full h-full object-contain"
                                                />
                                            ) : storeForm.data.settings.store_logo ? (
                                                <img 
                                                    src={`/storage/settings/${storeForm.data.settings.store_logo}`} 
                                                    className="w-full h-full object-contain"
                                                />
                                            ) : (
                                                <IconPhoto className="text-gray-400" size={32} />
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            id="logo-upload"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => updateSetting('logo', e.target.files[0])}
                                        />
                                        <label 
                                            htmlFor="logo-upload"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                                        >
                                            <IconPhoto size={18} />
                                            Pilih Logo
                                        </label>
                                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                            Rekomendasi ukuran 512x512px. Format PNG, JPG, GIF max 2MB.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <Input
                                    label="Nama Toko"
                                    value={storeForm.data.settings.store_name}
                                    onChange={(e) => updateSetting('store_name', e.target.value)}
                                    placeholder="Masukkan nama toko"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <Textarea
                                    label="Alamat"
                                    value={storeForm.data.settings.store_address}
                                    onChange={(e) => updateSetting('store_address', e.target.value)}
                                    placeholder="Masukkan alamat toko"
                                    rows={3}
                                />
                            </div>
                            <Input
                                label="No. Telepon"
                                value={storeForm.data.settings.store_phone}
                                onChange={(e) => updateSetting('store_phone', e.target.value)}
                                placeholder="08xxxxxxxxxx"
                            />
                            <Input
                                label="Email"
                                type="email"
                                value={storeForm.data.settings.store_email}
                                onChange={(e) => updateSetting('store_email', e.target.value)}
                                placeholder="email@example.com"
                            />
                        </div>
                    )}

                    {/* Tab 2: Pengaturan Struk */}
                    {activeTab === 'receipt' && (
                        <div className="space-y-4">
                            <Input
                                label="Header Struk"
                                value={receiptForm.data.settings.receipt_header}
                                onChange={(e) => updateSetting('receipt_header', e.target.value)}
                                placeholder="Teks yang muncul di atas struk"
                            />
                            <Textarea
                                label="Footer Struk"
                                value={receiptForm.data.settings.receipt_footer}
                                onChange={(e) => updateSetting('receipt_footer', e.target.value)}
                                placeholder="Teks yang muncul di bawah struk"
                                rows={3}
                            />
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="receipt_show_logo"
                                    checked={receiptForm.data.settings.receipt_show_logo}
                                    onChange={(e) => updateSetting('receipt_show_logo', e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="receipt_show_logo" className="text-sm text-gray-700 dark:text-gray-300">
                                    Tampilkan logo di struk
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Tab 3: Pengaturan Penjualan */}
                    {activeTab === 'sales' && (
                        <div className="space-y-4">
                            <Select
                                label="Default Metode Pembayaran"
                                value={salesForm.data.settings.default_payment_method}
                                onChange={(e) => updateSetting('default_payment_method', e.target.value)}
                            >
                                <option value="cash">Tunai</option>
                                <option value="transfer">Transfer</option>
                                <option value="qris">QRIS</option>
                            </Select>
                            <Input
                                label="Batas Stok Rendah"
                                type="number"
                                value={salesForm.data.settings.low_stock_threshold}
                                onChange={(e) => updateSetting('low_stock_threshold', e.target.value)}
                                placeholder="10"
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400 -mt-2">
                                Produk dengan stok di bawah nilai ini akan ditandai sebagai "Stok Rendah"
                            </p>
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="allow_negative_stock"
                                    checked={salesForm.data.settings.allow_negative_stock}
                                    onChange={(e) => updateSetting('allow_negative_stock', e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="allow_negative_stock" className="text-sm text-gray-700 dark:text-gray-300">
                                    Izinkan penjualan dengan stok minus
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Tab 4: Pemeliharaan */}
                    {activeTab === 'maintenance' && (
                        <div className="space-y-6">
                            <div className="p-4 border border-blue-100 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-900/30 rounded-lg">
                                <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2">
                                    <IconDatabaseExport size={18} />
                                    Backup Database
                                </h4>
                                <p className="text-sm text-blue-700 dark:text-blue-400 mb-4">
                                    Unduh salinan basis data Anda untuk cadangan. File ini berisi semua data produk, transaksi, dan pengaturan.
                                </p>
                                <a 
                                    href={route('settings.backup')}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                                >
                                    <IconDatabaseExport size={18} />
                                    Download Backup (.sql)
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    {activeTab !== 'maintenance' && (
                        <div className="mt-6 pt-4 border-t dark:border-gray-800">
                            <Button
                                type="submit"
                                label="Simpan Pengaturan"
                                icon={<IconDeviceFloppy size={18} />}
                                className="bg-blue-600 text-white hover:bg-blue-700"
                                disabled={getActiveForm().processing}
                            />
                        </div>
                    )}
                </form>
            </Card>
        </>
    )
}

Index.layout = page => <DashboardLayout children={page} />
