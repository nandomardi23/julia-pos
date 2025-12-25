import React from 'react'
import { IconHistory, IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react'

/**
 * PriceHistoryTable - Shows history of price changes for a product
 */
export default function PriceHistoryTable({ priceHistories = [] }) {
    if (!priceHistories || priceHistories.length === 0) {
        return null
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price || 0)
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getPriceChange = (oldPrice, newPrice) => {
        const diff = newPrice - oldPrice
        if (diff > 0) {
            return { icon: <IconArrowUpRight size={14} className="text-red-500" />, color: 'text-red-500', prefix: '+' }
        } else if (diff < 0) {
            return { icon: <IconArrowDownRight size={14} className="text-green-500" />, color: 'text-green-500', prefix: '' }
        }
        return { icon: null, color: 'text-gray-500', prefix: '' }
    }

    return (
        <div className='border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700'>
            <h3 className='text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-4'>
                <IconHistory size={20} /> Riwayat Perubahan Harga
            </h3>
            <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                    <thead>
                        <tr className='text-left text-gray-600 dark:text-gray-400 border-b dark:border-gray-700'>
                            <th className='py-2 px-2'>Tanggal</th>
                            <th className='py-2 px-2'>Harga Beli</th>
                            <th className='py-2 px-2'>Harga Jual</th>
                            <th className='py-2 px-2'>Diubah Oleh</th>
                        </tr>
                    </thead>
                    <tbody>
                        {priceHistories.map((history, index) => {
                            const buyChange = getPriceChange(history.old_buy_price, history.new_buy_price)
                            const sellChange = getPriceChange(history.old_sell_price, history.new_sell_price)
                            
                            return (
                                <tr key={history.id || index} className='border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'>
                                    <td className='py-2 px-2 text-gray-600 dark:text-gray-400'>
                                        {formatDate(history.created_at)}
                                    </td>
                                    <td className='py-2 px-2'>
                                        {history.old_buy_price !== history.new_buy_price ? (
                                            <div className='flex flex-col'>
                                                <span className='text-gray-400 line-through text-xs'>
                                                    {formatPrice(history.old_buy_price)}
                                                </span>
                                                <span className={`flex items-center gap-1 ${buyChange.color}`}>
                                                    {buyChange.icon}
                                                    {formatPrice(history.new_buy_price)}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className='text-gray-500'>-</span>
                                        )}
                                    </td>
                                    <td className='py-2 px-2'>
                                        {history.old_sell_price !== history.new_sell_price ? (
                                            <div className='flex flex-col'>
                                                <span className='text-gray-400 line-through text-xs'>
                                                    {formatPrice(history.old_sell_price)}
                                                </span>
                                                <span className={`flex items-center gap-1 ${sellChange.color}`}>
                                                    {sellChange.icon}
                                                    {formatPrice(history.new_sell_price)}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className='text-gray-500'>-</span>
                                        )}
                                    </td>
                                    <td className='py-2 px-2 text-gray-600 dark:text-gray-400'>
                                        {history.user?.name || 'System'}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
