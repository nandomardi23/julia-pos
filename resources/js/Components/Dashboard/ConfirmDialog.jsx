import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IconAlertTriangle, IconCheck, IconX } from '@tabler/icons-react';
import Button from './Button';

export default function ConfirmDialog({
    show = false,
    onClose = () => {},
    onConfirm = () => {},
    title = 'Konfirmasi',
    message = 'Apakah Anda yakin ingin melanjutkan?',
    confirmLabel = 'Ya, Lanjutkan',
    cancelLabel = 'Batal',
    type = 'warning', // 'warning', 'danger', 'info'
    processing = false,
}) {
    const iconStyles = {
        warning: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
        danger: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
        info: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    };

    const confirmButtonStyles = {
        warning: 'bg-amber-600 hover:bg-amber-700 text-white',
        danger: 'bg-rose-600 hover:bg-rose-700 text-white',
        info: 'bg-blue-600 hover:bg-blue-700 text-white',
    };

    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog
                as="div"
                className="fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform transition-all"
                onClose={onClose}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-75"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-gray-500/75 dark:bg-gray-900/80" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <Dialog.Panel className="bg-white dark:bg-gray-950 rounded-xl overflow-hidden shadow-xl transform transition-all w-full sm:max-w-md sm:mx-auto">
                        <div className="p-6">
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-full ${iconStyles[type]}`}>
                                    <IconAlertTriangle size={24} strokeWidth={1.5} />
                                </div>
                                <div className="flex-1">
                                    <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {title}
                                    </Dialog.Title>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                        {message}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 flex justify-end gap-3">
                            <Button
                                type="button"
                                label={cancelLabel}
                                icon={<IconX size={18} />}
                                onClick={onClose}
                                disabled={processing}
                                className="border bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
                            />
                            <Button
                                type="button"
                                label={processing ? 'Memproses...' : confirmLabel}
                                icon={<IconCheck size={18} />}
                                onClick={onConfirm}
                                disabled={processing}
                                className={confirmButtonStyles[type]}
                            />
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}
