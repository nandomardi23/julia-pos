import React, { useState } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, Link, router, usePage, useForm } from '@inertiajs/react'
import Button from '@/Components/Common/Button'
import { IconCirclePlus, IconDatabaseOff, IconPencilCog, IconTrash, IconEye, IconX, IconDeviceFloppy, IconUpload, IconPhoto } from '@tabler/icons-react'
import Search from '@/Components/Common/Search'
import Table from '@/Components/Common/Table'
import Modal from '@/Components/Common/Modal'
import Input from '@/Components/Common/Input'
import Textarea from '@/Components/Common/TextArea'
import ConfirmDialog from '@/Components/Common/ConfirmDialog'
import toast from 'react-hot-toast'

export default function Index({ categories }) {
    const { roles, permissions, errors: pageErrors } = usePage().props;

    // State for Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    // State for ConfirmDialog
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // Form handling
    const { data, setData, post, put, processing, reset, errors, clearErrors } = useForm({
        id: '',
        name: '',
        description: '',
        image: '',
        _method: 'POST'
    });

    const openCreateModal = () => {
        setModalTitle('Tambah Kategori');
        setIsEditing(false);
        setImagePreview(null);
        reset();
        clearErrors();
        setData({
            id: '',
            name: '',
            description: '',
            image: '',
            _method: 'POST'
        });
        setIsModalOpen(true);
    };

    const openEditModal = (category) => {
        setModalTitle('Edit Kategori');
        setIsEditing(true);
        setImagePreview(category.image);
        clearErrors();
        setData({
            id: category.id,
            name: category.name || '',
            description: category.description || '',
            image: '',
            _method: 'PUT' // Common workaround for file uploads in Laravel PUT requests
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
        clearErrors();
        setImagePreview(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            post(route('categories.update', data.id), {
                onSuccess: () => {
                    closeModal();
                    toast.success('Data kategori berhasil diperbarui!', {
                        style: {
                            borderRadius: '10px',
                            background: '#1C1F29',
                            color: '#fff',
                        },
                    });
                },
                onError: () => {
                    toast.error('Gagal memperbarui data kategori.', {
                        style: {
                            borderRadius: '10px',
                            background: '#EF4444',
                            color: '#fff',
                        },
                    });
                }
            });
        } else {
            post(route('categories.store'), {
                onSuccess: () => {
                    closeModal();
                    toast.success('Kategori baru berhasil ditambahkan!', {
                        style: {
                            borderRadius: '10px',
                            background: '#1C1F29',
                            color: '#fff',
                        },
                    });
                },
                onError: () => {
                    toast.error('Gagal menambahkan kategori baru.', {
                        style: {
                            borderRadius: '10px',
                            background: '#EF4444',
                            color: '#fff',
                        },
                    });
                }
            });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setShowDeleteConfirm(true);
    };

    const handleDelete = () => {
        router.delete(route('categories.destroy', deleteId), {
            onSuccess: () => {
                setShowDeleteConfirm(false);
                toast.success('Kategori berhasil dihapus!');
            },
            onError: () => {
                setShowDeleteConfirm(false);
                toast.error('Gagal menghapus kategori.');
            }
        });
    };

    return (
        <>
            <Head title='Kategori' />
            <div className='mb-4'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
                    <Button
                        type={'button'}
                        icon={<IconCirclePlus size={20} strokeWidth={1.5} />}
                        className={'border bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:border-blue-700 dark:hover:bg-blue-700'}
                        label={'Tambah Kategori'}
                        onClick={openCreateModal}
                    />
                    <div className='w-full sm:w-80'>
                        <Search
                            url={route('categories.index')}
                            placeholder='Cari kategori...'
                        />
                    </div>
                </div>
            </div>
            <Table.Card
                title={'Data Kategori'}
                links={categories.links}
                meta={{
                    from: categories.from,
                    to: categories.to,
                    total: categories.total,
                    per_page: categories.per_page
                }}
                url={route('categories.index')}
            >
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className='w-12 text-center'>No</Table.Th>
                            <Table.Th className='w-20'>Gambar</Table.Th>
                            <Table.Th>Nama Kategori</Table.Th>
                            <Table.Th className='w-32 text-center'>Aksi</Table.Th>
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
                                        <div className='w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'>
                                            <img
                                                src={category.image || '/assets/photo/auth.jpg'}
                                                alt={category.name}
                                                className='w-full h-full object-cover'
                                                onError={(e) => { e.target.src = '/assets/photo/auth.jpg' }}
                                            />
                                        </div>
                                    </Table.Td>
                                    <Table.Td>
                                        <span className='font-medium text-gray-900 dark:text-white'>
                                            {category.name}
                                        </span>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex justify-center gap-1'>
                                            <Link
                                                href={route('categories.show', category.id)}
                                                className='p-1.5 rounded-md text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30'
                                                title='Lihat'
                                            >
                                                <IconEye size={14} strokeWidth={1.5} />
                                            </Link>
                                            <button
                                                onClick={() => openEditModal(category)}
                                                className='p-1.5 rounded-md text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/30'
                                                title='Edit'
                                            >
                                                <IconPencilCog size={14} strokeWidth={1.5} />
                                            </button>
                                            <button
                                                onClick={() => confirmDelete(category.id)}
                                                className='p-1.5 rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30'
                                                title='Hapus'
                                            >
                                                <IconTrash size={14} strokeWidth={1.5} />
                                            </button>
                                        </div>
                                    </Table.Td>
                                </tr>
                            )) :
                            <Table.Empty colSpan={4} message={
                                <>
                                    <div className='flex justify-center items-center text-center mb-2'>
                                        <IconDatabaseOff size={48} strokeWidth={1} className='text-gray-300 dark:text-gray-600' />
                                    </div>
                                    <span className='text-gray-500 dark:text-gray-400'>Data kategori tidak ditemukan</span>
                                </>
                            } />
                        }
                    </Table.Tbody>
                </Table>
            </Table.Card>

            {/* Modal for Create/Edit */}
            <Modal
                show={isModalOpen}
                onClose={closeModal}
                maxWidth='md'
                title={
                    <div className='flex items-center gap-2'>
                        {isEditing ? <IconPencilCog size={20} strokeWidth={1.5} /> : <IconCirclePlus size={20} strokeWidth={1.5} />}
                        <span>{modalTitle}</span>
                    </div>
                }
            >
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-12 gap-4'>
                        {/* Custom Image Input */}
                        <div className="col-span-12">
                            <label className="text-gray-700 dark:text-gray-300 font-medium text-sm mb-2 block">Gambar Kategori</label>
                            <div className="flex items-start gap-4">
                                <div className="relative group w-24 h-24 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.src = '/assets/photo/auth.jpg' }}
                                        />
                                    ) : (
                                        <IconPhoto className="text-gray-400" size={32} />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <IconUpload className="w-6 h-6 mb-2 text-gray-500 dark:text-gray-400" />
                                            <p className="mb-1 text-xs text-gray-500 dark:text-gray-400"><span className="font-semibold">Klik untuk upload</span></p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG (MAX. 2MB)</p>
                                        </div>
                                        <input
                                            id="dropzone-file"
                                            type="file"
                                            className="hidden"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                        />
                                    </label>
                                    {errors.image && (
                                        <small className='text-xs text-red-500 mt-1 block'>{errors.image}</small>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12">
                            <Input
                                name='name'
                                label={'Nama Kategori'}
                                type={'text'}
                                placeholder={'Masukkan nama kategori'}
                                errors={errors.name}
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                            />
                        </div>

                        <div className="col-span-12">
                            <Textarea
                                name='description'
                                label={'Deskripsi'}
                                placeholder={'Masukkan deskripsi kategori (opsional)'}
                                errors={errors.description}
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='flex items-center justify-end gap-2 mt-6 pt-4 border-t dark:border-gray-800'>
                        <Button
                            type={'button'}
                            label={'Batal'}
                            icon={<IconX size={18} strokeWidth={1.5} />}
                            className={'border bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700'}
                            onClick={closeModal}
                        />
                        <Button
                            type={'submit'}
                            label={'Simpan'}
                            icon={<IconDeviceFloppy size={18} />}
                            className={'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 border-transparent'}
                            disabled={processing}
                        />
                    </div>
                </form>
            </Modal>

            {/* Confirm Dialog for Delete */}
            <ConfirmDialog
                show={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={handleDelete}
                title="Hapus Kategori"
                message="Apakah Anda yakin ingin menghapus kategori ini? Data yang terhapus tidak dapat dikembalikan."
                confirmLabel="Ya, Hapus"
                cancelLabel="Batal"
                type="danger"
            />
        </>
    )
}

Index.layout = page => <DashboardLayout children={page} />
