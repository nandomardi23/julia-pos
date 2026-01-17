import React, { useState } from "react";
import { Head, router, Link } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Card from "@/Components/Common/Card";
import Input from "@/Components/Common/Input";
import Button from "@/Components/Common/Button";
import {
    IconClock,
    IconCash,
    IconArrowLeft,
} from "@tabler/icons-react";
import toast from "react-hot-toast";

const Open = ({ suggestedOpeningCash }) => {
    const [data, setData] = useState({
        opening_cash: suggestedOpeningCash || "",
        notes: "",
    });
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.post(route("shifts.store"), data, {
            onSuccess: () => {
                toast.success("Shift berhasil dibuka!");
            },
            onError: (errors) => {
                setErrors(errors);
                toast.error("Gagal membuka shift");
            },
            onFinish: () => {
                setProcessing(false);
            },
        });
    };

    const formatCurrency = (value) => {
        if (!value) return "";
        return new Intl.NumberFormat("id-ID").format(value);
    };

    const handleCashChange = (e) => {
        // Remove non-numeric characters
        const value = e.target.value.replace(/\D/g, "");
        setData({ ...data, opening_cash: value });
    };

    return (
        <>
            <Head title="Buka Shift" />
            <div className="max-w-2xl mx-auto">
                <Card>
                    {/* Header */}
                    <div className="px-6 py-4 border-b dark:border-gray-800 bg-gradient-to-r from-teal-500 to-cyan-500">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <IconClock size={24} className="text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-white">
                                    Buka Shift Baru
                                </h2>
                                <p className="text-sm text-white/80">
                                    Masukkan modal awal untuk memulai shift
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Opening Cash */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Modal Awal (Kas Awal)
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <span className="text-gray-500 dark:text-gray-400">Rp</span>
                                </div>
                                <input
                                    type="text"
                                    value={formatCurrency(data.opening_cash)}
                                    onChange={handleCashChange}
                                    className={`w-full pl-10 pr-4 py-3 text-lg font-semibold border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 ${
                                        errors.opening_cash ? "border-red-500" : ""
                                    }`}
                                    placeholder="0"
                                    required
                                />
                            </div>
                            {errors.opening_cash && (
                                <p className="mt-1 text-sm text-red-500">{errors.opening_cash}</p>
                            )}
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Hitung uang kas di laci kasir sebelum memulai
                            </p>
                        </div>

                        {/* Quick Amount Buttons */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Pilihan Cepat
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                {[100000, 200000, 300000, 500000].map((amount) => (
                                    <button
                                        key={amount}
                                        type="button"
                                        onClick={() => setData({ ...data, opening_cash: amount })}
                                        className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        {formatCurrency(amount)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Catatan (Opsional)
                            </label>
                            <textarea
                                value={data.notes}
                                onChange={(e) => setData({ ...data, notes: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
                                placeholder="Catatan tambahan..."
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t dark:border-gray-800">
                            <Link
                                href={route("shifts.index")}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                <IconArrowLeft size={18} />
                                Kembali
                            </Link>
                            <Button
                                type="submit"
                                label={processing ? "Memproses..." : "Buka Shift"}
                                icon={<IconCash size={18} />}
                                disabled={processing || !data.opening_cash}
                                className="px-6 py-2 text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 disabled:opacity-50"
                            />
                        </div>
                    </form>
                </Card>
            </div>
        </>
    );
};

Open.layout = (page) => <DashboardLayout children={page} />;

export default Open;
