import React, { useState, useEffect } from 'react'
import { IconPhoto, IconUpload } from '@tabler/icons-react'

/**
 * ImagePreview - Shows current image with live preview when new file is selected
 */
export default function ImagePreview({ currentImage, onImageChange, errors }) {
    const [preview, setPreview] = useState(null)

    // Generate preview when file is selected
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(file)
            onImageChange(e)
        }
    }

    // Reset preview if currentImage changes (e.g., form reset)
    useEffect(() => {
        if (!currentImage) {
            setPreview(null)
        }
    }, [currentImage])

    // Check if currentImage is already a full URL or just a filename
    const getImageUrl = (image) => {
        if (!image) return null
        // If it's already a full URL (starts with http or /), use it directly
        if (image.startsWith('http') || image.startsWith('/storage')) {
            return image
        }
        // Otherwise, construct the URL
        return `/storage/products/${image}`
    }

    const displayImage = preview || getImageUrl(currentImage)

    return (
        <div className='space-y-3'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Gambar Produk
            </label>
            
            {/* Image Preview */}
            <div className='flex items-center gap-4'>
                <div className='w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-800 dark:border-gray-700'>
                    {displayImage ? (
                        <img 
                            src={displayImage} 
                            alt="Preview" 
                            className='w-full h-full object-cover'
                        />
                    ) : (
                        <IconPhoto size={32} className='text-gray-400' />
                    )}
                </div>
                
                <div className='flex-1'>
                    <label className='cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition'>
                        <IconUpload size={18} />
                        <span className='text-sm text-gray-700 dark:text-gray-300'>
                            {preview ? 'Ganti Gambar' : (currentImage ? 'Ubah Gambar' : 'Pilih Gambar')}
                        </span>
                        <input 
                            type='file' 
                            accept='image/jpeg,image/jpg,image/png'
                            onChange={handleFileChange}
                            className='hidden'
                        />
                    </label>
                    <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                        Format: JPG, JPEG, PNG (max 2MB)
                    </p>
                    {preview && (
                        <p className='text-xs text-green-600 dark:text-green-400 mt-1'>
                            ✓ Gambar baru dipilih
                        </p>
                    )}
                </div>
            </div>
            
            {errors && (
                <div className='text-sm text-red-500 mt-1'>{errors}</div>
            )}
        </div>
    )
}
