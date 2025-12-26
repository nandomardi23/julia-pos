import React from 'react'

export default function Card({ icon, title, children, footer, className, form }) {
    const Wrapper = form ? 'form' : 'div'
    
    return (
        <Wrapper onSubmit={form} className={`bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden ${className || ''}`}>
            {/* Card Header */}
            {title && (
                <div className='px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30'>
                    <div className='flex items-center gap-2 font-semibold text-gray-900 dark:text-white'>
                        {icon && <span className="text-gray-500 dark:text-gray-400">{icon}</span>}
                        {title}
                    </div>
                </div>
            )}
            
            {/* Card Body */}
            <div className='p-5'>
                {children}
            </div>
            
            {/* Card Footer */}
            {footer && (
                <div className='px-5 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30'>
                    {footer}
                </div>
            )}
        </Wrapper>
    )
}
