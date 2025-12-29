import React, { useState, useRef } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, useForm, usePage } from '@inertiajs/react'
import { IconCamera, IconTrash, IconUser, IconMail, IconLock, IconCheck, IconEye, IconEyeOff } from '@tabler/icons-react'

export default function Edit({ user, mustVerifyEmail, status }) {
    const [avatarPreview, setAvatarPreview] = useState(user.avatar_url);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const fileInputRef = useRef(null);

    // Profile form
    const profileForm = useForm({
        name: user.name,
        email: user.email,
        avatar: null,
        remove_avatar: false,
        _method: 'PATCH',
    });

    // Password form
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            profileForm.setData('avatar', file);
            profileForm.setData('remove_avatar', false);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveAvatar = () => {
        profileForm.setData('avatar', null);
        profileForm.setData('remove_avatar', true);
        setAvatarPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const submitProfile = (e) => {
        e.preventDefault();
        profileForm.post(route('profile.update'), {
            forceFormData: true,
        });
    };

    const submitPassword = (e) => {
        e.preventDefault();
        passwordForm.put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
            onError: (errors) => {
                if (errors.password) {
                    passwordForm.reset('password', 'password_confirmation');
                }
                if (errors.current_password) {
                    passwordForm.reset('current_password');
                }
            },
        });
    };

    return (
        <>
            <Head title="Profil Saya" />
            
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column - Avatar & Quick Info */}
                <div className="lg:w-1/3">
                    <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-6 h-full">
                        {/* Avatar */}
                        <div className="text-center">
                            <div className="relative inline-block">
                                <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto">
                                    {avatarPreview ? (
                                        <img 
                                            src={avatarPreview} 
                                            alt={user.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-white text-5xl font-bold uppercase">
                                            {user.name.charAt(0)}
                                        </span>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute bottom-0 right-0 p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors"
                                >
                                    <IconCamera size={18} />
                                </button>
                            </div>
                            
                            <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                            <p className="text-gray-500 dark:text-gray-400">{user.email}</p>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="hidden"
                            />

                            <div className="mt-4 flex justify-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                                >
                                    Ganti Foto
                                </button>
                                {(avatarPreview || user.avatar) && (
                                    <button
                                        type="button"
                                        onClick={handleRemoveAvatar}
                                        className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm font-medium"
                                    >
                                        <IconTrash size={16} />
                                    </button>
                                )}
                            </div>
                            <p className="mt-2 text-xs text-gray-400">JPG, PNG, GIF, WEBP. Maks 2MB</p>
                            {profileForm.errors.avatar && (
                                <p className="mt-1 text-xs text-red-600">{profileForm.errors.avatar}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column - Forms */}
                <div className="lg:w-2/3 space-y-6">
                    {/* Success Message */}
                    {profileForm.recentlySuccessful && (
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3">
                            <div className="p-1 bg-green-500 rounded-full">
                                <IconCheck size={16} className="text-white" />
                            </div>
                            <p className="text-green-700 dark:text-green-400 font-medium">Profil berhasil diperbarui!</p>
                        </div>
                    )}

                    {passwordForm.recentlySuccessful && (
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3">
                            <div className="p-1 bg-green-500 rounded-full">
                                <IconCheck size={16} className="text-white" />
                            </div>
                            <p className="text-green-700 dark:text-green-400 font-medium">Password berhasil diubah!</p>
                        </div>
                    )}

                    {/* Profile Information Form */}
                    <form onSubmit={submitProfile}>
                        <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Informasi Profil</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Nama Lengkap
                                    </label>
                                    <div className="relative">
                                        <IconUser size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            value={profileForm.data.name}
                                            onChange={(e) => profileForm.setData('name', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    {profileForm.errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{profileForm.errors.name}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <IconMail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="email"
                                            value={profileForm.data.email}
                                            onChange={(e) => profileForm.setData('email', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    {profileForm.errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{profileForm.errors.email}</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={profileForm.processing}
                                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                                >
                                    {profileForm.processing ? 'Menyimpan...' : 'Simpan Profil'}
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Change Password Form */}
                    <form onSubmit={submitPassword}>
                        <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ubah Password</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                Pastikan akun Anda menggunakan password yang panjang dan acak agar tetap aman.
                            </p>
                            
                            <div className="space-y-4">
                                {/* Current Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Password Saat Ini
                                    </label>
                                    <div className="relative">
                                        <IconLock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type={showCurrentPassword ? 'text' : 'password'}
                                            value={passwordForm.data.current_password}
                                            onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                            className="w-full pl-10 pr-12 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showCurrentPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                                        </button>
                                    </div>
                                    {passwordForm.errors.current_password && (
                                        <p className="mt-1 text-sm text-red-600">{passwordForm.errors.current_password}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* New Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Password Baru
                                        </label>
                                        <div className="relative">
                                            <IconLock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type={showNewPassword ? 'text' : 'password'}
                                                value={passwordForm.data.password}
                                                onChange={(e) => passwordForm.setData('password', e.target.value)}
                                                className="w-full pl-10 pr-12 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showNewPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                                            </button>
                                        </div>
                                        {passwordForm.errors.password && (
                                            <p className="mt-1 text-sm text-red-600">{passwordForm.errors.password}</p>
                                        )}
                                    </div>

                                    {/* Confirm Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Konfirmasi Password
                                        </label>
                                        <div className="relative">
                                            <IconLock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                value={passwordForm.data.password_confirmation}
                                                onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                                className="w-full pl-10 pr-12 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showConfirmPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                                            </button>
                                        </div>
                                        {passwordForm.errors.password_confirmation && (
                                            <p className="mt-1 text-sm text-red-600">{passwordForm.errors.password_confirmation}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={passwordForm.processing}
                                    className="px-5 py-2.5 bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                                >
                                    {passwordForm.processing ? 'Mengubah...' : 'Ubah Password'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

Edit.layout = page => <DashboardLayout children={page} />
