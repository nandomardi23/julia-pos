import React from 'react'
import { Link, router } from '@inertiajs/react'
import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react'

const Card = ({ icon, title, className, children, links, meta, url, action }) => {
    const perPageOptions = [10, 15, 25, 50, 75, 100]

    const handlePerPageChange = (e) => {
        if (url) {
            // Get current URL query parameters and preserve them
            const currentParams = new URLSearchParams(window.location.search);
            const params = Object.fromEntries(currentParams.entries());
            params.per_page = e.target.value;
            // Reset to page 1 when changing per_page
            delete params.page;
            router.get(url, params, { preserveState: true, preserveScroll: true })
        }
    }

    return (
        <div className='rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden shadow-sm'>
            {/* Header */}
            {title && (
                <div className={`px-5 py-4 border-b border-gray-200 dark:border-gray-800 ${className} bg-gray-50/50 dark:bg-gray-900/50`}>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                        <div className='flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-100'>
                            {icon}
                            <span>{title}</span>
                        </div>
                        {action && (
                            <div className='w-full md:w-auto min-w-[200px]'>
                                {action}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Body */}
            <div>
                {children}
            </div>

            {/* Footer with Pagination */}
            {(meta || (links && links.length > 3)) && (
                <div className='px-5 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50'>
                    <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
                        {/* Info & Per Page Selector */}
                        <div className='flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400'>
                            {meta && (
                                <span className='hidden sm:inline'>
                                    Menampilkan <span className='font-medium text-gray-900 dark:text-white'>{meta.from || 0}</span> - <span className='font-medium text-gray-900 dark:text-white'>{meta.to || 0}</span> dari <span className='font-medium text-gray-900 dark:text-white'>{meta.total || 0}</span> data
                                </span>
                            )}
                            {url && (
                                <div className='flex items-center gap-2'>
                                    <span className='text-gray-500 dark:text-gray-400'>Per halaman:</span>
                                    <select
                                        value={meta?.per_page || 10}
                                        onChange={handlePerPageChange}
                                        className='pl-3 pr-8 py-1.5 text-sm border rounded-lg bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer appearance-none bg-no-repeat bg-right'
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                                            backgroundSize: '16px',
                                            backgroundPosition: 'right 8px center'
                                        }}
                                    >
                                        {perPageOptions.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Pagination Links */}
                        {links && links.length > 0 && (
                            <ul className='flex items-center gap-1'>
                                {links.map((item, i) => {
                                    if (item.url == null) return null;

                                    const baseStyle = 'flex items-center justify-center min-w-[32px] h-8 px-2 text-sm border rounded-lg transition-colors'
                                    const activeStyle = 'bg-blue-500 text-white border-blue-500 dark:bg-blue-600 dark:border-blue-600'
                                    const inactiveStyle = 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'

                                    if (item.label.includes('Previous')) {
                                        return (
                                            <Link className={`${baseStyle} ${inactiveStyle}`} key={i} href={item.url}>
                                                <IconChevronLeft size={16} strokeWidth={2} />
                                                <span className='hidden sm:inline ml-1'>Prev</span>
                                            </Link>
                                        )
                                    }

                                    if (item.label.includes('Next')) {
                                        return (
                                            <Link className={`${baseStyle} ${inactiveStyle}`} key={i} href={item.url}>
                                                <span className='hidden sm:inline mr-1'>Next</span>
                                                <IconChevronRight size={16} strokeWidth={2} />
                                            </Link>
                                        )
                                    }

                                    // Hide middle page numbers on mobile, show only active
                                    return (
                                        <Link
                                            className={`${baseStyle} ${item.active ? activeStyle : `${inactiveStyle} hidden sm:flex`}`}
                                            key={i}
                                            href={item.url}
                                        >
                                            {item.label}
                                        </Link>
                                    )
                                })}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

const Table = ({ children }) => {
    return (
        <div className="w-full overflow-hidden overflow-x-auto">
            <table className="w-full text-sm">
                {children}
            </table>
        </div>
    );
};

const Thead = ({ className, children }) => {
    return (
        <thead className={`${className} border-b bg-gray-50/80 dark:border-gray-800 dark:bg-gray-900/80`}>
            {children}
        </thead>
    );
};

const Tbody = ({ className, children }) => {
    return (
        <tbody className={`${className} divide-y bg-white dark:divide-gray-800 dark:bg-gray-950`}>
            {children}
        </tbody>
    );
};

const Td = ({ className, children, colSpan }) => {
    return (
        <td
            colSpan={colSpan}
            className={`${className} whitespace-nowrap px-4 py-3 align-middle text-gray-700 dark:text-gray-300`}
        >
            {children}
        </td>
    );
};

const Th = ({ className, children }) => {
    return (
        <th
            scope="col"
            className={`${className} h-12 px-4 text-left align-middle font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider`}
        >
            {children}
        </th>
    );
};

const Empty = ({ colSpan, message, children }) => {
    return (
        <tr>
            <td colSpan={colSpan}>
                <div className="flex items-center justify-center py-16">
                    <div className="text-center">
                        {children}
                        <div className="mt-3 text-gray-500 dark:text-gray-400">
                            {message}
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}

Table.Card = Card;
Table.Thead = Thead;
Table.Tbody = Tbody;
Table.Td = Td;
Table.Th = Th;
Table.Empty = Empty;

export default Table;
