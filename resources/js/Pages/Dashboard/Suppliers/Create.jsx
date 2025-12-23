import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, useForm, usePage } from '@inertiajs/react'
import Card from '@/Components/Dashboard/Card'
import Button from '@/Components/Dashboard/Button'
import { IconPencilPlus, IconTruck } from '@tabler/icons-react'
import Input from '@/Components/Dashboard/Input'
import Textarea from '@/Components/Dashboard/TextArea'
import toast from 'react-hot-toast'

export default function Create() {
    const { errors } = usePage().props

    const { data, setData, post, processing } = useForm({
        name: '',
        company: '',
        email: '',
        phone: '',
        address: '',
        description: ''
    })

    const submit = (e) => {
        e.preventDefault()
        post(route('suppliers.store'), {
            onSuccess: () => {
                if (Object.keys(errors).length === 0) {
                    toast('Supplier berhasil ditambahkan', {
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
            <Head title='Tambah Supplier' />
            <Card
                title={'Tambah Supplier'}
                icon={<IconTruck size={20} strokeWidth={1.5} />}
                footer={
                    <Button
                        type={'submit'}
                        label={'Simpan'}
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
                            label={'Nama Supplier'}
                            type={'text'}
                            placeholder={'Nama supplier'}
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
                            errors={errors.email}
                            onChange={e => setData('email', e.target.value)}
                        />
                    </div>
                    <div className="col-span-12">
                        <Textarea
                            name='address'
                            label={'Alamat'}
                            placeholder={'Alamat supplier'}
                            errors={errors.address}
                            onChange={e => setData('address', e.target.value)}
                        />
                    </div>
                    <div className="col-span-12">
                        <Textarea
                            name='description'
                            label={'Keterangan'}
                            placeholder={'Keterangan tambahan (opsional)'}
                            errors={errors.description}
                            onChange={e => setData('description', e.target.value)}
                        />
                    </div>
                </div>
            </Card>
        </>
    )
}

Create.layout = page => <DashboardLayout children={page} />
