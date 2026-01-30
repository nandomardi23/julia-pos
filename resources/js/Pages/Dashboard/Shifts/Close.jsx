import React, { useState } from "react";
import { Head, router, Link } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Card from "@/Components/Common/Card";
import Button from "@/Components/Common/Button";
import {
    IconDoorExit,
    IconCash,
    IconArrowLeft,
    IconCalculator,
    IconReceipt,
    IconArrowUpRight,
    IconArrowDownRight,
} from "@tabler/icons-react";
import toast from "react-hot-toast";

const formatCurrency = (value = 0) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);

const SummaryRow = ({ label, value, className = "" }) => (
    <div className="flex items-center justify-between py-2">
        <span className="text-gray-600 dark:text-gray-400">{label}</span>
        <span className={`font-semibold ${className}`}>{value}</span>
    </div>
);

const Close = ({ shift, summary }) => {
    const [data, setData] = useState({
        closing_cash: "",
        notes: "",
    });
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const difference = data.closing_cash
        ? parseFloat(data.closing_cash) - summary.expected_cash
        : null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);

        router.post(route("shifts.storeClose", shift.id), data, {
            onSuccess: () => {
                toast.success("Shift berhasil ditutup!");
            },
            onError: (errors) => {
                setErrors(errors);
                toast.error("Gagal menutup shift");
            },
            onFinish: () => {
                setProcessing(false);
            },
        });
    };

    const handleCashChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setData({ ...data, closing_cash: value });
    };

    const formatInputCurrency = (value) => {
        if (!value) return "";
        return new Intl.NumberFormat("id-ID").format(value);
    };

    return (
        <>
            <Head title="Tutup Shift" />
            <div className="max-w-3xl mx-auto">
                <Card>
                    {/* Header */}
                    <div className="px-6 py-4 border-b dark:border-gray-800 bg-gradient-to-r from-orange-500 to-red-500">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <IconDoorExit size={24} className="text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-white">
                                    Tutup Shift
                                </h2>
                                <p className="text-sm text-white/80">
                                    {shift.shift_number}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Summary Section */}
                    <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-b dark:border-gray-800">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                            <IconCalculator size={18} />
                            Ringkasan Shift
                        </h3>
                        <div className="space-y-1 divide-y dark:divide-gray-800">
                            <SummaryRow
                                label="Modal Awal"
                                value={formatCurrency(summary.opening_cash)}
                            />
                            <SummaryRow
                                label="Penjualan Tunai"
                                value={formatCurrency(summary.total_cash_sales)}
                                className="text-emerald-600"
                            />
                            <SummaryRow
                                label="Kembalian"
                                value={`- ${formatCurrency(summary.total_change)}`}
                                className="text-gray-500"
                            />
                            <SummaryRow
                                label="Kas Masuk"
                                value={`+ ${formatCurrency(summary.total_cash_in)}`}
                                className="text-green-600"
                            />
                            <SummaryRow
                                label="Kas Keluar"
                                value={`- ${formatCurrency(summary.total_cash_out)}`}
                                className="text-orange-600"
                            />
                            <div className="pt-3 mt-2 border-t-2 dark:border-gray-700">
                                <SummaryRow
                                    label="Kas Diharapkan"
                                    value={formatCurrency(summary.expected_cash)}
                                    className="text-xl text-blue-600 dark:text-blue-400"
                                />
                            </div>
                        </div>
                        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                            Formula: Modal + Penjualan Tunai + Kas Masuk - Kas Keluar
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 p-6 border-b dark:border-gray-800">
                        <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                            <IconReceipt size={24} className="text-emerald-600" />
                            <div>
                                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                                    Total Transaksi
                                </p>
                                <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300">
                                    {summary.transaction_count}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <IconCash size={24} className="text-blue-600" />
                            <div>
                                <p className="text-sm text-blue-600 dark:text-blue-400">
                                    Total Penjualan
                                </p>
                                <p className="text-xl font-bold text-blue-700 dark:text-blue-300">
                                    {formatCurrency(summary.total_sales)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Closing Cash */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Kas Aktual (Hitung Fisik)
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <span className="text-gray-500 dark:text-gray-400">Rp</span>
                                </div>
                                <input
                                    type="text"
                                    value={formatInputCurrency(data.closing_cash)}
                                    onChange={handleCashChange}
                                    className={`w-full pl-10 pr-4 py-3 text-lg font-semibold border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 ${
                                        errors.closing_cash ? "border-red-500" : ""
                                    }`}
                                    placeholder="0"
                                    required
                                />
                            </div>
                            {errors.closing_cash && (
                                <p className="mt-1 text-sm text-red-500">{errors.closing_cash}</p>
                            )}
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Hitung semua uang di laci kasir
                            </p>
                        </div>

                        {/* Difference Preview */}
                        {difference !== null && (
                            <div
                                className={`p-4 rounded-lg ${
                                    difference === 0
                                        ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                                        : difference > 0
                                        ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                                        : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                                }`}
                            >
                                <p
                                    className={`text-sm font-medium ${
                                        difference === 0
                                            ? "text-green-700 dark:text-green-300"
                                            : difference > 0
                                            ? "text-blue-700 dark:text-blue-300"
                                            : "text-red-700 dark:text-red-300"
                                    }`}
                                >
                                    {difference === 0
                                        ? "✓ Kas sesuai, tidak ada selisih"
                                        : difference > 0
                                        ? `↑ Selisih lebih: ${formatCurrency(difference)}`
                                        : `↓ Selisih kurang: ${formatCurrency(Math.abs(difference))}`}
                                </p>
                            </div>
                        )}

                        {/* Notes */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Catatan Penutupan (Opsional)
                            </label>
                            <textarea
                                value={data.notes}
                                onChange={(e) => setData({ ...data, notes: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
                                placeholder="Catatan tentang selisih atau hal lainnya..."
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t dark:border-gray-800">
                            <Link
                                href={route("shifts.show", shift.id)}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                <IconArrowLeft size={18} />
                                Kembali
                            </Link>
                            <Button
                                type="submit"
                                label={processing ? "Memproses..." : "Tutup Shift"}
                                icon={<IconDoorExit size={18} />}
                                disabled={processing || !data.closing_cash}
                                className="px-6 py-2 text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-50"
                            />
                        </div>
                    </form>
                </Card>
            </div>
        </>
    );
};

Close.layout = (page) => <DashboardLayout children={page} />;

export default Close;
