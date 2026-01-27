import React, { useState, useEffect } from 'react';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { usePage } from '@inertiajs/react';

export default function ImportModal({
    show,
    onClose,
    title = 'Import Data',
    templateUrl,
    onSubmit,
    processing,
    errors = {},
    children
}) {
    const [file, setFile] = useState(null);

    // Reset file when modal opens/closes
    useEffect(() => {
        if (!show) setFile(null);
    }, [show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(file);
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <form onSubmit={handleSubmit} className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">{title}</h2>

                {children}

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">File Excel</label>
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={e => setFile(e.target.files[0])}
                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-indigo-50 file:text-indigo-700
                            hover:file:bg-indigo-100"
                    />
                    {errors?.file && <div className="text-red-500 text-sm mt-1">{errors.file}</div>}
                    {errors?.import_errors && Array.isArray(errors.import_errors) && (
                        <div className="text-red-500 text-sm mt-2 bg-red-50 p-2 rounded max-h-32 overflow-y-auto">
                            <p className="font-bold">Errors:</p>
                            <ul className="list-disc pl-4">
                                {errors.import_errors.map((err, idx) => (
                                    <li key={idx}>{err}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {templateUrl && (
                    <div className="mt-4">
                        <a href={templateUrl} className="text-indigo-600 hover:underline text-sm flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download Template Excel
                        </a>
                    </div>
                )}

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={onClose} disabled={processing} type="button">
                        Batal
                    </SecondaryButton>
                    <PrimaryButton className="ml-3" disabled={processing || !file}>
                        {processing ? 'Proses...' : 'Import'}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
