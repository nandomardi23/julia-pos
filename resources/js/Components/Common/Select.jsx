import React from 'react'

export default function Select({ label, className, errors, children, ...props }) {
    return (
        <div className='flex flex-col gap-2'>
            {label && <label className='text-gray-600 text-sm dark:text-gray-300'>{label}</label>}
            <select
                className={`w-full px-3 py-1.5 border text-sm rounded-md focus:outline-none focus:ring-0 bg-white text-gray-700 focus:border-gray-200 border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-gray-700 dark:border-gray-800 ${className || ''}`}
                {...props}
            >
                {children}
            </select>
            {errors && (
                <small className='text-xs text-red-500'>{errors}</small>
            )}
        </div>
    )
}
