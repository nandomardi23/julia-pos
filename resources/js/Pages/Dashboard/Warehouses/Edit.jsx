import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, useForm, usePage } from '@inertiajs/react'
import Card from '@/Components/Dashboard/Card'
import Button from '@/Components/Dashboard/Button'
import { IconPencilPlus, IconBuildingWarehouse } from '@tabler/icons-react'
import Input from '@/Components/Dashboard/Input'
import Textarea from '@/Components/Dashboard/TextArea'
import toast from 'react-hot-toast'

export default function Edit({ warehouse }) {
    const { errors } = usePage().props

    const { data, setData, put, processing } = useForm({
        name: warehouse.name || '',
        location: warehouse.location || '',
        description: warehouse.description || '',
        is_active: warehouse.is_active ?? true
    })

    const submit = (e) => {
        e.preventDefault()
        put(route('warehouses.update', warehouse.id), {
            onSuccess: () => {
                toast('Gudang berhasil diupdate', {
                    icon: '👏',
                    style: { borderRadius: '10px', background: '#1C1F29', color: '#fff' },
                })
            },
            onError: () => {
                toast('Terjadi kesalahan', {
                    style: { borderRadius: '10px', background: '#FF0000', color: '#fff' },
                })
            },
        })
    }

    return (
        <>
            <Head title='Edit Gudang' />
            <Card
                title={'Edit Gudang'}
                icon={<IconBuildingWarehouse size={20} strokeWidth={1.5} />}
                footer={
                    <Button
                        type={'submit'}
                        label={'Update'}
                        icon={<IconPencilPlus size={20} strokeWidth={1.5} />}
                        className={'border bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-900'}
                    />
                }
                form={submit}
            >
                <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-6'>
                        <Input
                            name='name'
                            label={'Nama Gudang'}
                            type={'text'}
                            placeholder={'Nama gudang'}
                            value={data.name}
                            errors={errors.name}
                            onChange={e => setData('name', e.target.value)}
                        />
                    </div>
                    <div className="col-span-6">
                        <Input
                            name='location'
                            label={'Lokasi'}
                            type={'text'}
                            placeholder={'Lokasi gudang (opsional)'}
                            value={data.location}
                            errors={errors.location}
                            onChange={e => setData('location', e.target.value)}
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
                    <div className="col-span-12">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={data.is_active}
                                onChange={e => setData('is_active', e.target.checked)}
                                className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Gudang Aktif</span>
                        </label>
                    </div>
                </div>
            </Card>
        </>
    )
}

Edit.layout = page => <DashboardLayout children={page} />
