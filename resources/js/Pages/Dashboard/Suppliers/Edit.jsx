import React, { useState, useMemo } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, useForm, usePage, router } from '@inertiajs/react'
import Card from '@/Components/Dashboard/Card'
import Button from '@/Components/Dashboard/Button'
import { IconPencilPlus, IconTruck, IconArrowLeft } from '@tabler/icons-react'
import Input from '@/Components/Dashboard/Input'
import Textarea from '@/Components/Dashboard/TextArea'
import ConfirmDialog from '@/Components/Dashboard/ConfirmDialog'
import toast from 'react-hot-toast'

export default function Edit({ supplier }) {
    const { errors } = usePage().props
    const [showConfirm, setShowConfirm] = useState(false)

    // Simpan data original untuk perbandingan
    const originalData = useMemo(() => ({
        name: supplier.name || '',
        company: supplier.company || '',
        email: supplier.email || '',
        phone: supplier.phone || '',
        address: supplier.address || '',
        description: supplier.description || '',
    }), [supplier.id])

    const { data, setData, put, processing } = useForm({
        name: supplier.name || '',
        company: supplier.company || '',
        email: supplier.email || '',
        phone: supplier.phone || '',
        address: supplier.address || '',
        description: supplier.description || ''
    })

    // Cek apakah ada perubahan data
    const hasChanges = () => {
        return data.name !== originalData.name ||
               data.company !== originalData.company ||
               data.email !== originalData.email ||
               data.phone !== originalData.phone ||
               data.address !== originalData.address ||
               data.description !== originalData.description
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
        put(route('suppliers.update', supplier.id), {
            onSuccess: () => {
                setShowConfirm(false)
                if (Object.keys(errors).length === 0) {
                    toast('Supplier berhasil diupdate', {
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
            <Head title='Edit Supplier' />
            <Card
                title={'Edit Supplier'}
                icon={<IconTruck size={20} strokeWidth={1.5} />}
                footer={
                    <div className='flex items-center gap-2'>
                        <Button
                            type={'button'}
                            label={'Kembali'}
                            icon={<IconArrowLeft size={20} strokeWidth={1.5} />}
                            className={'border bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700'}
                            onClick={() => router.visit(route('suppliers.index'))}
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
                    <div className='col-span-6'>
                        <Input
                            name='name'
                            label={'Nama Supplier'}
                            type={'text'}
                            placeholder={'Nama supplier'}
                            value={data.name}
                            errors={errors.name}
                            onChange={e => setData('name', e.target.value)}
                        />
                    </div>
                    <div className="col-span-6">
                        <Input
                            name='company'
                            label={'Nama Perusahaan'}
                            type={'text'}
                            placeholder={'Nama perusahaan (opsional)'}
                            value={data.company}
                            errors={errors.company}
                            onChange={e => setData('company', e.target.value)}
                        />
                    </div>
                    <div className='col-span-6'>
                        <Input
                            name='phone'
                            label={'No. Telepon'}
                            type={'text'}
                            placeholder={'No. telepon supplier'}
                            value={data.phone}
                            errors={errors.phone}
                            onChange={e => setData('phone', e.target.value)}
                        />
                    </div>
                    <div className="col-span-6">
                        <Input
                            name='email'
                            label={'Email'}
                            type={'email'}
                            placeholder={'Email supplier (opsional)'}
                            value={data.email}
                            errors={errors.email}
                            onChange={e => setData('email', e.target.value)}
                        />
                    </div>
                    <div className="col-span-12">
                        <Textarea
                            name='address'
                            label={'Alamat'}
                            placeholder={'Alamat supplier'}
                            value={data.address}
                            errors={errors.address}
                            onChange={e => setData('address', e.target.value)}
                        />
                    </div>
                    <div className="col-span-12">
                        <Textarea
                            name='description'
                            label={'Keterangan'}
                            placeholder={'Keterangan tambahan (opsional)'}
                            value={data.description}
                            errors={errors.description}
                            onChange={e => setData('description', e.target.value)}
                        />
                    </div>
                </div>
            </Card>

            <ConfirmDialog
                show={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={confirmUpdate}
                title="Konfirmasi Perubahan"
                message="Apakah Anda yakin ingin menyimpan perubahan data supplier ini?"
                confirmLabel="Ya, Simpan"
                cancelLabel="Batal"
                type="warning"
                processing={processing}
            />
        </>
    )
}

Edit.layout = page => <DashboardLayout children={page} />
