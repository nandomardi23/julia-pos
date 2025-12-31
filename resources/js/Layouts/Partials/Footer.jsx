import React from 'react';
import { usePage } from '@inertiajs/react';

export default function Footer() {
    const { app_settings: settings = {} } = usePage().props;
    const currentYear = new Date().getFullYear();
    const storeName = settings.store_name || 'Julia Mart';

    return (
        <footer className="sticky bottom-0 bg-white dark:bg-neutral-800 border-t border-gray-200 dark:border-neutral-700 py-3 px-6 z-30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                    <span>© {currentYear}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{storeName}</span>
                    <span>- All rights reserved.</span>
                </div>
                <div className="flex items-center gap-1">
                    <span>Powered by</span>
                    <span className="font-semibold text-gray-900 dark:text-white">Fernando Mardi Nurzaman</span>
                </div>
            </div>
        </footer>
    );
}
