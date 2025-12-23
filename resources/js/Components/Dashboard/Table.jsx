import React from 'react'
import { Link, router } from '@inertiajs/react'
import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react'

const Card = ({ icon, title, className, children, links, meta, url }) => {
    const perPageOptions = [10, 25, 50, 75, 100]

    const handlePerPageChange = (e) => {
        if (url) {
            router.get(url, { per_page: e.target.value }, { preserveState: true })
        }
    }

    const style = 'p-1 text-sm border rounded-md bg-white text-gray-500 hover:bg-gray-100 dark:bg-gray-950 dark:text-gray-400 dark:hover:bg-gray-900 dark:border-gray-800'

    return (
        <div className='rounded-lg border bg-white dark:bg-gray-950 dark:border-gray-800 overflow-hidden'>
            {/* Header */}
            <div className={`px-4 py-3 border-b ${className} bg-gray-50 dark:bg-gray-900 dark:border-gray-800`}>
                <div className='flex items-center gap-2 font-semibold text-sm text-gray-700 dark:text-gray-200'>
                    {icon}
                    {title}
                </div>
            </div>
            
            {/* Body */}
            <div>
                {children}
            </div>

            {/* Footer with Pagination */}
            {links && links.length > 3 && (
                <div className='px-4 py-3 border-t bg-gray-50 dark:bg-gray-900 dark:border-gray-800'>
                    <div className='flex flex-col sm:flex-row justify-between items-center gap-3'>
                        {/* Info & Per Page Selector */}
                        <div className='flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400'>
                            {meta && (
                                <span>
                                    Menampilkan {meta.from || 0} - {meta.to || 0} dari {meta.total || 0} data
                                </span>
                            )}
                            {url && (
                                <div className='flex items-center gap-2'>
                                    <span>Per halaman:</span>
                                    <select
                                        value={meta?.per_page || 10}
                                        onChange={handlePerPageChange}
                                        className='px-2 py-1 text-sm border rounded-md bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500'
                                    >
                                        {perPageOptions.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Pagination Links */}
                        <ul className='flex items-center gap-1'>
                            {links.map((item, i) => {
                                return item.url != null ? (
                                    item.label.includes('Previous') ? (
                                        <Link className={style} key={i} href={item.url}>
                                            <IconChevronLeft size={'20'} strokeWidth={'1.5'} />
                                        </Link>
                                    ) : item.label.includes('Next') ? (
                                        <Link className={style} key={i} href={item.url}>
                                            <IconChevronRight size={'20'} strokeWidth={'1.5'} />
                                        </Link>
                                    ) : (
                                        <Link 
                                            className={`px-2 py-1 text-sm border rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:border-gray-700 ${item.active ? 'bg-blue-500 text-white border-blue-500 dark:bg-blue-600 dark:border-blue-600 dark:text-white' : 'bg-white dark:bg-gray-950'}`} 
                                            key={i} 
                                            href={item.url}
                                        >
                                            {item.label}
                                        </Link>
                                    )
                                ) : null;
                            })}
                        </ul>
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
        <thead className={`${className} border-b bg-gray-50 dark:border-gray-800 dark:bg-gray-900`}>{children}</thead>
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
            className={`${className} whitespace-nowrap p-4 align-middle text-gray-700 dark:text-gray-400`}
        >
            {children}
        </td>
    );
};

const Th = ({ className, children }) => {
    return (
        <th
            scope="col"
            className={`${className} h-12 px-4 text-left align-middle font-medium text-gray-700 dark:text-gray-400`}
        >
            {children}
        </th>
    );
};

const Empty = ({ colSpan, message, children }) => {
    return (
        <tr>
            <td colSpan={colSpan}>
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        {children}
                        <div className="mt-5 text-gray-500 dark:text-gray-400">
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
