import React, { useState, useMemo } from "react";
import { Head, usePage, useForm, router } from "@inertiajs/react";
import Card from "@/Components/Dashboard/Card";
import DashboardLayout from "@/Layouts/DashboardLayout";
import {
    IconUsersPlus,
    IconPencilPlus,
    IconArrowLeft,
} from "@tabler/icons-react";
import Input from "@/Components/Dashboard/Input";
import Button from "@/Components/Dashboard/Button";
import Checkbox from "@/Components/Dashboard/Checkbox";
import ConfirmDialog from "@/Components/Dashboard/ConfirmDialog";
import toast from "react-hot-toast";

export default function Edit() {
    // destruct props roles from use page
    const { roles, user } = usePage().props;
    const [showConfirm, setShowConfirm] = useState(false);

    // Simpan data original untuk perbandingan
    const originalData = useMemo(() => ({
        name: user.name || '',
        selectedRoles: user.roles.map((role) => role.name).sort(),
    }), [user.id]);

    const { data, setData, post, errors } = useForm({
        name: user.name,
        email: user.email,
        password: "",
        password_confirmation: "",
        selectedRoles: user.roles.map((role) => role.name),
        _method: "PUT",
    });

    // Cek apakah ada perubahan data
    const hasChanges = () => {
        // Password baru berarti ada perubahan
        if (data.password) return true;
        // Bandingkan nama
        if (data.name !== originalData.name) return true;
        // Bandingkan roles
        const sortedRoles = [...data.selectedRoles].sort();
        if (JSON.stringify(sortedRoles) !== JSON.stringify(originalData.selectedRoles)) return true;
        return false;
    };

    const setSelectedRoles = (e) => {
        let items = data.selectedRoles;

        if (items.some((name) => name === e.target.value))
            items = items.filter((name) => name !== e.target.value);
        else items.push(e.target.value);

        setData("selectedRoles", items);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!hasChanges()) {
            toast('Tidak ada perubahan data', {
                icon: 'ℹ️',
                style: {
                    borderRadius: '10px',
                    background: '#3B82F6',
                    color: '#fff',
                },
            });
            return;
        }
        
        setShowConfirm(true);
    };

    const confirmUpdate = () => {
        post(route("users.update", user.id), {
            onSuccess: () => {
                setShowConfirm(false);
                toast("Data berhasil disimpan", {
                    icon: "👏",
                    style: {
                        borderRadius: "10px",
                        background: "#1C1F29",
                        color: "#fff",
                    },
                });
            },
            onError: () => {
                setShowConfirm(false);
            },
        });
    };

    return (
        <>
            <Head title={"Ubah Data Pengguna"} />
            <Card
                title={"Ubah Data Pengguna"}
                icon={<IconUsersPlus size={20} strokeWidth={1.5} />}
                footer={
                    <div className="flex items-center gap-2">
                        <Button
                            type={"button"}
                            label={"Kembali"}
                            icon={<IconArrowLeft size={20} strokeWidth={1.5} />}
                            className={
                                "border bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
                            }
                            onClick={() => router.visit(route("users.index"))}
                        />
                        <Button
                            type={"submit"}
                            label={"Simpan Perubahan"}
                            icon={<IconPencilPlus size={20} strokeWidth={1.5} />}
                            className={
                                "border bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-900"
                            }
                        />
                    </div>
                }
                form={handleSubmit}
            >
                <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
                    <div className="w-full md:w-1/2">
                        <Input
                            type={"text"}
                            label={"Nama Pengguna"}
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            errors={errors.name}
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <Input
                            type={"email"}
                            label={"Email Pengguna"}
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            errors={errors.email}
                            disabled
                        />
                    </div>
                </div>
                <div className="mb-4 flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/2">
                        <Input
                            type={"password"}
                            label={"Kata Sandi"}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            errors={errors.password}
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <Input
                            type={"password"}
                            label={"Konfirmasi Kata Sandi"}
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            errors={errors.password_confirmation}
                        />
                    </div>
                </div>
                <div
                    className={`p-4 rounded-t-lg border bg-white dark:bg-gray-950 dark:border-gray-900`}
                >
                    <div className="flex items-center gap-2 font-semibold text-sm text-gray-700 dark:text-gray-400">
                        Akses Group
                    </div>
                </div>
                <div className="p-4 rounded-b-lg border border-t-0 bg-gray-100 dark:bg-gray-900 dark:border-gray-900">
                    <div className="flex flex-row flex-wrap gap-4">
                        {roles.map((role, i) => (
                            <Checkbox
                                key={i}
                                label={role.name}
                                value={role.name}
                                onChange={setSelectedRoles}
                                defaultChecked={data.selectedRoles.some(
                                    (name) =>
                                        name === role.name ? true : false
                                )}
                            />
                        ))}
                    </div>
                    {errors.selectedRoles && (
                        <div className="text-xs text-red-500 mt-4">
                            {errors.selectedRoles}
                        </div>
                    )}
                </div>
            </Card>

            <ConfirmDialog
                show={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={confirmUpdate}
                title="Konfirmasi Perubahan"
                message="Apakah Anda yakin ingin menyimpan perubahan data pengguna ini?"
                confirmLabel="Ya, Simpan"
                cancelLabel="Batal"
                type="warning"
            />
        </>
    );
}

Edit.layout = (page) => <DashboardLayout children={page} />;
