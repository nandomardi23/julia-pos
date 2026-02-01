import React, { useState } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, router, useForm } from '@inertiajs/react'
import Button from '@/Components/Common/Button'
import { IconCirclePlus, IconDatabaseOff, IconPencilCog, IconTrash, IconFolder } from '@tabler/icons-react'
import Search from '@/Components/Common/Search'
import Table from '@/Components/Common/Table'
import { Dialog, Transition } from '@headlessui/react'

export default function Index({ categories }) {
    const [showModal, setShowModal] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [editId, setEditId] = useState(null)
    
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        description: '',
    })

    const openCreateModal = () => {
        reset()
        setEditMode(false)
        setEditId(null)
        setShowModal(true)
    }

    const openEditModal = (category) => {
        setData({
            name: category.name,
            description: category.description || '',
        })
        setEditMode(true)
        setEditId(category.id)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        reset()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (editMode) {
            put(route('expense-categories.update', editId), {
                onSuccess: () => closeModal(),
            })
        } else {
            post(route('expense-categories.store'), {
                onSuccess: () => closeModal(),
            })
        }
    }

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
            router.delete(route('expense-categories.destroy', id))
        }
    }

    return (
        <>
            <Head title="Kategori Pengeluaran" />
            
            <Table.Card 
                title="Kategori Pengeluaran"
                links={categories.links}
                meta={{
                    from: categories.from,
                    to: categories.to,
                    total: categories.total,
                    per_page: categories.per_page
                }}
                url={route('expense-categories.index')}
                action={
                    <div className='flex items-center gap-2 w-full sm:w-auto'>
                         <Button
                            type={'button'}
                            icon={<IconCirclePlus size={18} strokeWidth={1.5} />}
                            className={'bg-blue-600 text-white hover:bg-blue-700 border-transparent shadow-sm dark:bg-blue-600 dark:hover:bg-blue-700 whitespace-nowrap'}
                            label={'Tambah'}
                            onClick={openCreateModal}
                        />
                        <div className='w-full sm:w-64'>
                            <Search
                                url={route('expense-categories.index')}
                                placeholder={'Cari kategori...'}
                            />
                        </div>
                    </div>
                }
            >
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className='w-12 text-center'>No</Table.Th>
                            <Table.Th>Nama Kategori</Table.Th>
                            <Table.Th>Deskripsi</Table.Th>
                            <Table.Th className='text-center'>Jumlah Data</Table.Th>
                            <Table.Th className='w-24 text-center'>Aksi</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {categories.data.length ?
                            categories.data.map((category, i) => (
                                <tr className='hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors' key={category.id}>
                                    <Table.Td className='text-center font-medium'>
                                        {++i + (categories.current_page - 1) * categories.per_page}
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex items-center gap-3'>
                                            <div className='p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30'>
                                                <IconFolder size={18} className='text-orange-600 dark:text-orange-400' />
                                            </div>
                                            <span className='font-medium text-gray-900 dark:text-white'>{category.name}</span>
                                        </div>
                                    </Table.Td>
                                    <Table.Td className='text-gray-600 dark:text-gray-400'>
                                        {category.description || '-'}
                                    </Table.Td>
                                    <Table.Td className='text-center'>
                                        <span className='inline-flex px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'>
                                            {category.expenses_count} pengeluaran
                                        </span>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex justify-center gap-1'>
                                            <button
                                                onClick={() => openEditModal(category)}
                                                className='p-1.5 rounded-md text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/30'
                                                title='Edit'
                                            >
                                                <IconPencilCog size={14} strokeWidth={1.5} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category.id)}
                                                className='p-1.5 rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30'
                                                title='Hapus'
                                            >
                                                <IconTrash size={14} strokeWidth={1.5} />
                                            </button>
                                        </div>
                                    </Table.Td>
                                </tr>
                            )) :
                            <Table.Empty colSpan={5} message={
                                <>
                                    <div className='flex justify-center items-center text-center mb-2'>
                                        <IconDatabaseOff size={48} strokeWidth={1} className='text-gray-300 dark:text-gray-600' />
                                    </div>
                                    <span className='text-gray-500 dark:text-gray-400'>Belum ada kategori pengeluaran</span>
                                </>
                            } />
                        }
                    </Table.Tbody>
                </Table>
            </Table.Card>

            {/* Modal Create/Edit */}
            <Transition show={showModal}>
                <Dialog onClose={closeModal} className="relative z-50">
                    <Transition.Child
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/30" />
                    </Transition.Child>
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Transition.Child
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md rounded-xl bg-white dark:bg-gray-950 p-6 shadow-xl">
                                <Dialog.Title className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                    {editMode ? 'Edit Kategori' : 'Tambah Kategori'}
                                </Dialog.Title>
                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Nama Kategori <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                                placeholder="Contoh: Listrik, Air, Internet"
                                            />
                                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Deskripsi
                                            </label>
                                            <textarea
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                                rows={3}
                                                placeholder="Deskripsi opsional..."
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2 mt-6">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                                        >
                                            {processing ? 'Menyimpan...' : 'Simpan'}
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

Index.layout = page => <DashboardLayout children={page} />
