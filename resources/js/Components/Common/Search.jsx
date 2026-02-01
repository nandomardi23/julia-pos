import { useForm } from '@inertiajs/react';
import { IconSearch } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'

export default function Search({ url, placeholder, initialValue = '' }) {

    // define use form inertia
    const { data, setData, get } = useForm({
        search: initialValue,
    })

    // Track first render to avoid auto-search on mount
    const [isMounted, setIsMounted] = useState(false);

    // Live search with debounce
    useEffect(() => {
        if (!isMounted) {
            setIsMounted(true);
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            const separator = url.includes('?') ? '&' : '?';
            get(`${url}${separator}search=${data.search}`, {
                preserveState: true,
                preserveScroll: true,
                replace: true
            })
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [data.search])

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className='relative'>
                <input
                    type='text'
                    value={data.search}
                    onChange={e => setData('search', e.target.value)}
                    className='py-2 px-4 pr-11 block w-full rounded-lg text-sm border focus:outline-none focus:ring-0 focus:ring-gray-400 text-gray-700 bg-white border-gray-200 focus:border-gray-200 dark:focus:ring-gray-500 dark:focus:border-gray-800 dark:text-gray-200 dark:bg-gray-950 dark:border-gray-900 transition-colors'
                    placeholder={placeholder} />
                <div className='absolute inset-y-0 right-0 flex items-center pointer-events-none pr-4'>
                    <IconSearch className='text-gray-500 w-5 h-5' />
                </div>
            </div>
        </form>
    )
}
