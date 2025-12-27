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
    IconDeviceFloppy
} from '@tabler/icons-react'

const tabs = [
    { id: 'store', label: 'Informasi Toko', icon: IconBuildingStore },
    { id: 'receipt', label: 'Pengaturan Struk', icon: IconReceipt },
    { id: 'sales', label: 'Pengaturan Penjualan', icon: IconShoppingCart },
    { id: 'display', label: 'Pengaturan Tampilan', icon: IconPalette },
    { id: 'notification', label: 'Notifikasi', icon: IconBell },
]

export default function Index({ settings }) {
    const [activeTab, setActiveTab] = useState('store')

    // Form untuk masing-masing tab
    const storeForm = useForm({
        group: 'store',
        settings: {
            store_name: settings.store?.store_name || '',
            store_address: settings.store?.store_address || '',
            store_phone: settings.store?.store_phone || '',
            store_email: settings.store?.store_email || '',
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

    const displayForm = useForm({
        group: 'display',
        settings: {
            default_theme: settings.display?.default_theme || 'system',
            products_per_page: settings.display?.products_per_page || '12',
        }
    })

    const notificationForm = useForm({
        group: 'notification',
        settings: {
            notify_low_stock: settings.notification?.notify_low_stock === '1',
            notification_email: settings.notification?.notification_email || '',
        }
    })

    const getActiveForm = () => {
        switch (activeTab) {
            case 'store': return storeForm
            case 'receipt': return receiptForm
            case 'sales': return salesForm
            case 'display': return displayForm
            case 'notification': return notificationForm
            default: return storeForm
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = getActiveForm()
        form.put(route('settings.update'), {
            onSuccess: () => toast.success('Pengaturan berhasil disimpan!'),
            onError: () => toast.error('Gagal menyimpan pengaturan!'),
        })
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

                    {/* Tab 4: Pengaturan Tampilan */}
                    {activeTab === 'display' && (
                        <div className="space-y-4">
                            <Select
                                label="Tema Default"
                                value={displayForm.data.settings.default_theme}
                                onChange={(e) => updateSetting('default_theme', e.target.value)}
                            >
                                <option value="system">Ikuti Sistem</option>
                                <option value="light">Terang</option>
                                <option value="dark">Gelap</option>
                            </Select>
                            <Input
                                label="Produk Per Halaman (POS)"
                                type="number"
                                value={displayForm.data.settings.products_per_page}
                                onChange={(e) => updateSetting('products_per_page', e.target.value)}
                                placeholder="12"
                            />
                        </div>
                    )}

                    {/* Tab 5: Notifikasi */}
                    {activeTab === 'notification' && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="notify_low_stock"
                                    checked={notificationForm.data.settings.notify_low_stock}
                                    onChange={(e) => updateSetting('notify_low_stock', e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="notify_low_stock" className="text-sm text-gray-700 dark:text-gray-300">
                                    Aktifkan notifikasi stok rendah
                                </label>
                            </div>
                            <Input
                                label="Email Notifikasi"
                                type="email"
                                value={notificationForm.data.settings.notification_email}
                                onChange={(e) => updateSetting('notification_email', e.target.value)}
                                placeholder="admin@example.com"
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400 -mt-2">
                                Email untuk menerima notifikasi sistem (opsional)
                            </p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="mt-6 pt-4 border-t dark:border-gray-800">
                        <Button
                            type="submit"
                            label="Simpan Pengaturan"
                            icon={<IconDeviceFloppy size={18} />}
                            className="bg-blue-600 text-white hover:bg-blue-700"
                            disabled={getActiveForm().processing}
                        />
                    </div>
                </form>
            </Card>
        </>
    )
}

Index.layout = page => <DashboardLayout children={page} />
