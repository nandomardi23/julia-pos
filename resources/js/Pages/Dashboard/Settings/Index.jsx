import React, { useState } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, useForm } from '@inertiajs/react'
import Card from '@/Components/Common/Card'
import Button from '@/Components/Common/Button'
import Input from '@/Components/Common/Input'
import Textarea from '@/Components/Common/TextArea'
import toast from 'react-hot-toast'
import { 
    IconSettings, 
    IconBuildingStore, 
    IconPhoto,
    IconDeviceFloppy,
    IconDatabaseExport,
    IconTool,
    IconPrinter,
    IconPlugConnected
} from '@tabler/icons-react'
import { WebSocketPrintService } from '@/Services/PrintService'

const tabs = [
    { id: 'store', label: 'Informasi Toko', icon: IconBuildingStore },
    { id: 'print', label: 'Printer', icon: IconPrinter },
    { id: 'maintenance', label: 'Pemeliharaan', icon: IconTool },
]

export default function Index({ settings }) {
    const [activeTab, setActiveTab] = useState('store')
    const [testingConnection, setTestingConnection] = useState(false)
    const [connectionStatus, setConnectionStatus] = useState(null)

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

    const printForm = useForm({
        group: 'print',
        _method: 'PUT',
        settings: {
            websocket_url: settings.print?.websocket_url || 'ws://localhost:9100',
            printer_name: settings.print?.printer_name || 'POS-80',
        }
    })

    const getActiveForm = () => {
        if (activeTab === 'print') return printForm
        return storeForm
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = getActiveForm()
        
        form.post(route('settings.update'), {
            forceFormData: true,
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

    const handleTestConnection = async () => {
        setTestingConnection(true)
        setConnectionStatus(null)
        
        try {
            // Set WebSocket URL before testing
            WebSocketPrintService.setServerUrl(printForm.data.settings.websocket_url)
            
            const status = await WebSocketPrintService.checkConnection()
            setConnectionStatus(status)
            
            if (status.connected) {
                toast.success('Koneksi berhasil!')
            } else {
                toast.error('Gagal terhubung ke print server')
            }
        } catch (error) {
            setConnectionStatus({
                connected: false,
                message: error.message || 'Connection failed'
            })
            toast.error('Gagal testing koneksi')
        } finally {
            setTestingConnection(false)
        }
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

                    {/* Tab 2: Print Settings */}
                    {activeTab === 'print' && (
                        <div className="space-y-6">
                            <div className="p-4 border border-blue-100 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-900/30 rounded-lg">
                                <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2">
                                    <IconPrinter size={18} />
                                    Konfigurasi Printer Server
                                </h4>
                                <p className="text-sm text-blue-700 dark:text-blue-400">
                                    Jika mengakses dari shared hosting, ubah WebSocket URL ke IP komputer kasir (contoh: ws://192.168.1.100:9100)
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <Input
                                    label="WebSocket URL"
                                    value={printForm.data.settings.websocket_url}
                                    onChange={(e) => updateSetting('websocket_url', e.target.value)}
                                    placeholder="ws://localhost:9100"
                                    helpText="Format: ws://IP_ADDRESS:9100 (contoh: ws://192.168.1.100:9100)"
                                />
                                
                                <Input
                                    label="Nama Printer"
                                    value={printForm.data.settings.printer_name}
                                    onChange={(e) => updateSetting('printer_name', e.target.value)}
                                    placeholder="POS-80"
                                    helpText="Nama printer Windows yang terhubung (cek di Devices and Printers)"
                                />

                                <div>
                                    <Button
                                        type="button"
                                        onClick={handleTestConnection}
                                        label={testingConnection ? "Testing..." : "Test Connection"}
                                        icon={<IconPlugConnected size={18} />}
                                        className="bg-green-600 text-white hover:bg-green-700"
                                        disabled={testingConnection}
                                    />
                                    
                                    {connectionStatus && (
                                        <div className={`mt-3 p-3 rounded-lg text-sm ${
                                            connectionStatus.connected 
                                                ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-900/30'
                                                : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/30'
                                        }`}>
                                            <strong>{connectionStatus.connected ? '✓ Terhubung' : '✗ Tidak Terhubung'}</strong>
                                            <p className="mt-1">{connectionStatus.message}</p>
                                            {connectionStatus.serverUrl && (
                                                <p className="mt-1 text-xs opacity-75">Server: {connectionStatus.serverUrl}</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab 3: Pemeliharaan */}
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
                    {(activeTab === 'store' || activeTab === 'print') && (
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
