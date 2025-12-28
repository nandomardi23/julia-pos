import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IconBarcode, IconX } from '@tabler/icons-react';

export default function BarcodeModal({ show, onClose, onConfirm, productName }) {
    const [qty, setQty] = useState(10);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (qty > 0) {
            onConfirm(qty);
        }
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
                    <Dialog.Panel className="mb-6 bg-white dark:bg-gray-950 rounded-xl overflow-hidden shadow-2xl transform transition-all w-full sm:mx-auto sm:max-w-md">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        <IconBarcode size={24} className="text-white" />
                                    </div>
                                    <div>
                                        <Dialog.Title className="font-bold text-lg text-white">
                                            Cetak Barcode
                                        </Dialog.Title>
                                        <p className="text-sm text-emerald-100 truncate max-w-[200px]">
                                            {productName}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                                >
                                    <IconX size={18} className="text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <form onSubmit={handleSubmit} className="p-5">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Jumlah Label
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="100"
                                value={qty}
                                onChange={(e) => setQty(parseInt(e.target.value) || 1)}
                                className="w-full px-4 py-3 text-lg font-semibold text-center border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-800 dark:bg-gray-900 dark:text-white transition-all outline-none"
                                autoFocus
                            />
                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
                                Masukkan jumlah label yang ingin dicetak (1-100)
                            </p>

                            {/* Quick Select */}
                            <div className="flex gap-2 mt-4 justify-center">
                                {[5, 10, 20, 50].map((num) => (
                                    <button
                                        key={num}
                                        type="button"
                                        onClick={() => setQty(num)}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                            qty === num
                                                ? 'bg-emerald-500 text-white shadow-md'
                                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all"
                                >
                                    Cetak {qty} Label
                                </button>
                            </div>
                        </form>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}
