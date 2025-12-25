import React from 'react'
import { Link, usePage } from '@inertiajs/react'
export default function LinkItem({ href, icon, link, access, title, sidebarOpen, onNavigate, ...props }) {
    // destruct url from usepage
    const { url } = usePage();

    // destruct auth from usepage props
    const { auth } = usePage().props;

    const handleClick = () => {
        if (onNavigate) {
            onNavigate();
        }
    };

    // Safety check for href
    const isActive = href && url.startsWith(href);

    return (
        <>
            {
                auth.super === true ?
                    sidebarOpen ?
                        <Link
                            href={href}
                            onClick={handleClick}
                            className={`${isActive && 'border-r-2 border-r-gray-400 bg-gray-100 text-gray-700 dark:border-r-gray-500 dark:bg-gray-900 dark:text-white'} flex items-center font-medium gap-x-3.5 px-4 py-3 hover:border-r-2 capitalize hover:cursor-pointer text-sm text-gray-500 hover:border-r-gray-700 hover:text-gray-900 dark:text-gray-500 dark:hover:border-r-gray-50 dark:hover:text-gray-100`}
                            {...props}
                        >
                            {icon} {title}
                        </Link>
                        :
                        <Link
                            href={href}
                            onClick={handleClick}
                            className={` ${isActive && 'border-r-2 border-r-gray-400 bg-gray-100 text-gray-700 dark:border-r-gray-500 dark:bg-gray-900 dark:text-white'} min-w-full flex justify-center py-3 hover:border-r-2 hover:cursor-pointer  text-gray-500 hover:border-r-gray-700 hover:text-gray-900 dark:text-gray-500 dark:hover:border-r-gray-50 dark:hover:text-gray-100`}
                            {...props}
                        >
                            {icon}
                        </Link>
                    :
                    access === true &&
                        sidebarOpen ?
                        <Link
                            href={href}
                            onClick={handleClick}
                            className={`${isActive && 'border-r-2 border-r-gray-400 bg-gray-100 text-gray-700 dark:border-r-gray-500 dark:bg-gray-900 dark:text-white'} flex items-center font-medium gap-x-3.5 px-4 py-3 hover:border-r-2 capitalize hover:cursor-pointer text-sm text-gray-500 hover:border-r-gray-700 hover:text-gray-900 dark:text-gray-500 dark:hover:border-r-gray-50 dark:hover:text-gray-100`}
                            {...props}
                        >
                            {icon} {title}
                        </Link>
                        :
                        <Link
                            href={href}
                            onClick={handleClick}
                            className={` ${isActive && 'border-r-2 border-r-gray-400 bg-gray-100 text-gray-700 dark:border-r-gray-500 dark:bg-gray-900 dark:text-white'} min-w-full flex justify-center py-3 hover:border-r-2 hover:cursor-pointer text-gray-500 hover:border-r-gray-700 hover:text-gray-900 dark:text-gray-500 dark:hover:border-r-gray-50 dark:hover:text-gray-100`}
                            {...props}
                        >
                            {icon}
                        </Link>
            }
        </>
    )
}
