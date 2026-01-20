import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { IconHome, IconRefresh, IconArrowLeft, IconAlertTriangle, IconLock, IconSearch, IconServerOff } from '@tabler/icons-react';

export default function Error({ status }) {
    const title = {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: '404: Page Not Found',
        403: '403: Forbidden',
        419: '419: Page Expired',
    }[status] || 'Error';

    const description = {
        503: 'Maaf, kami sedang melakukan pemeliharaan rutin. Silakan kembali lagi nanti.',
        500: 'Oppss! Terjadi kesalahan pada server kami. Kami akan segera memperbaikinya.',
        404: 'Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.',
        403: 'Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.',
        419: 'Sesi Anda telah berakhir. Silakan muat ulang halaman dan coba lagi.',
    }[status] || 'Terjadi kesalahan yang tidak terduga pada sistem.';

    const icon = {
        503: <IconServerOff size={80} strokeWidth={1.5} className="text-amber-500" />,
        500: <IconAlertTriangle size={80} strokeWidth={1.5} className="text-rose-500" />,
        404: <IconSearch size={80} strokeWidth={1.5} className="text-blue-500" />,
        403: <IconLock size={80} strokeWidth={1.5} className="text-rose-600" />,
        419: <IconRefresh size={80} strokeWidth={1.5} className="text-indigo-500" />,
    }[status] || <IconAlertTriangle size={80} strokeWidth={1.5} className="text-gray-500" />;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-6">
            <Head title={title} />
            
            <div className="max-w-md w-full text-center">
                {/* Decoration */}
                <div className="mb-8 flex justify-center animate-bounce-slow">
                    <div className="relative">
                        <div className="absolute inset-0 bg-current opacity-10 blur-3xl rounded-full scale-150"></div>
                        <div className="relative z-10 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
                            {icon}
                        </div>
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                    {title}
                </h1>
                
                <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                    {description}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 transition-all duration-200"
                    >
                        <IconHome size={20} strokeWidth={2} />
                        <span>Kembali ke Beranda</span>
                    </Link>
                    
                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 font-semibold rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 active:scale-95"
                    >
                        <IconArrowLeft size={20} strokeWidth={2} />
                        <span>Halaman Sebelumnya</span>
                    </button>
                </div>

                {/* Footer Info */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                        &copy; {new Date().getFullYear()} Julia POS. All rights reserved.
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
