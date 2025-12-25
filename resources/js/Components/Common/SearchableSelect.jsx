import React from 'react'
import ReactSelect from 'react-select'

export default function SearchableSelect({ label, options, value, onChange, placeholder, errors, isDisabled, ...props }) {
    // Custom styles untuk match dengan styling project
    const customStyles = {
        control: (base, state) => ({
            ...base,
            backgroundColor: 'white',
            borderColor: state.isFocused ? '#e5e7eb' : '#e5e7eb',
            borderRadius: '0.375rem',
            minHeight: '34px',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#e5e7eb'
            },
            fontSize: '0.875rem',
        }),
        valueContainer: (base) => ({
            ...base,
            padding: '0 0.75rem',
        }),
        input: (base) => ({
            ...base,
            margin: 0,
            padding: 0,
            color: '#374151',
        }),
        placeholder: (base) => ({
            ...base,
            color: '#9ca3af',
        }),
        singleValue: (base) => ({
            ...base,
            color: '#374151',
        }),
        menu: (base) => ({
            ...base,
            zIndex: 9999,
            borderRadius: '0.375rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#eff6ff' : 'white',
            color: state.isSelected ? 'white' : '#374151',
            fontSize: '0.875rem',
            padding: '8px 12px',
            cursor: 'pointer',
            '&:active': {
                backgroundColor: '#3b82f6',
            },
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        dropdownIndicator: (base) => ({
            ...base,
            padding: '4px 8px',
            color: '#9ca3af',
        }),
        noOptionsMessage: (base) => ({
            ...base,
            fontSize: '0.875rem',
            color: '#6b7280',
        }),
    }

    // Dark mode styles
    const darkStyles = {
        control: (base, state) => ({
            ...base,
            backgroundColor: '#111827',
            borderColor: '#1f2937',
            borderRadius: '0.375rem',
            minHeight: '34px',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#374151'
            },
            fontSize: '0.875rem',
        }),
        valueContainer: (base) => ({
            ...base,
            padding: '0 0.75rem',
        }),
        input: (base) => ({
            ...base,
            margin: 0,
            padding: 0,
            color: '#d1d5db',
        }),
        placeholder: (base) => ({
            ...base,
            color: '#6b7280',
        }),
        singleValue: (base) => ({
            ...base,
            color: '#d1d5db',
        }),
        menu: (base) => ({
            ...base,
            zIndex: 9999,
            backgroundColor: '#1f2937',
            borderRadius: '0.375rem',
            border: '1px solid #374151',
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#374151' : '#1f2937',
            color: state.isSelected ? 'white' : '#d1d5db',
            fontSize: '0.875rem',
            padding: '8px 12px',
            cursor: 'pointer',
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        dropdownIndicator: (base) => ({
            ...base,
            padding: '4px 8px',
            color: '#6b7280',
        }),
        noOptionsMessage: (base) => ({
            ...base,
            fontSize: '0.875rem',
            color: '#9ca3af',
        }),
    }

    // Detect dark mode
    const isDarkMode = typeof window !== 'undefined' && document.documentElement.classList.contains('dark')

    return (
        <div className='flex flex-col gap-2'>
            {label && <label className='text-gray-600 text-sm dark:text-gray-300'>{label}</label>}
            <ReactSelect
                options={options}
                value={value}
                onChange={onChange}
                placeholder={placeholder || 'Pilih...'}
                isDisabled={isDisabled}
                styles={isDarkMode ? darkStyles : customStyles}
                noOptionsMessage={() => 'Tidak ditemukan'}
                isClearable
                isSearchable
                {...props}
            />
            {errors && (
                <small className='text-xs text-red-500'>{errors}</small>
            )}
        </div>
    )
}
