import { useEffect } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Login({ status, canResetPassword }) {
    const { app_settings: settings = {} } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => reset("password");
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    // Check if there are any errors
    const hasErrors = Object.keys(errors).length > 0;

    return (
        <>
            <Head title="Login" />

            <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white text-gray-900 dark:bg-neutral-900 dark:text-gray-100">
                {/* Left - Form */}
                <div className="flex items-center justify-center p-8">
                    <div className="w-full max-w-md">
                        <div className="mb-8">
                            {settings.store_logo ? (
                                <img 
                                    src={`/storage/settings/${settings.store_logo}`} 
                                    alt={settings.store_name || 'Logo'}
                                    className="w-16 h-16 mb-4 object-contain"
                                />
                            ) : (
                                <ApplicationLogo className="w-16 h-16 mb-4" />
                            )}
                            <h1 className="text-3xl font-bold">
                                {settings.store_name || 'Aplikasi Kasir'}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Masuk ke Dashboard
                            </p>
                        </div>

                        {/* Status Message */}
                        {status && (
                            <div className="mb-4 px-4 py-3 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                                <p className="text-sm text-green-700 dark:text-green-400">
                                    {status}
                                </p>
                            </div>
                        )}

                        {/* Error Alert - Shows when login fails */}
                        {hasErrors && (
                            <div className="mb-4 px-4 py-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 animate-[shake_0.5s_ease-in-out]">
                                <p className="text-sm text-red-600 dark:text-red-400">
                                    {errors.email || errors.password || "Terjadi kesalahan saat login."}
                                </p>
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    disabled={processing}
                                    className={`mt-1 block w-full px-4 py-2 rounded-md border bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-neutral-700 focus:border-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                                        errors.email
                                            ? "border-red-400 dark:border-red-600"
                                            : "border-gray-300 dark:border-neutral-700"
                                    }`}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    disabled={processing}
                                    className={`mt-1 block w-full px-4 py-2 rounded-md border bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-neutral-700 focus:border-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                                        errors.password
                                            ? "border-red-400 dark:border-red-600"
                                            : "border-gray-300 dark:border-neutral-700"
                                    }`}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked
                                            )
                                        }
                                        disabled={processing}
                                        className="h-4 w-4 text-neutral-900 dark:text-neutral-200 border-gray-300 dark:border-neutral-700 rounded focus:ring-neutral-700 disabled:opacity-50"
                                    />
                                    <span className="text-sm">Ingat saya</span>
                                </label>

                                {canResetPassword && (
                                    <a
                                        href={route("password.request")}
                                        className="text-sm text-neutral-800 dark:text-neutral-300 hover:underline"
                                    >
                                        Lupa Password?
                                    </a>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-2.5 rounded-md bg-black dark:bg-neutral-800 text-white font-semibold hover:bg-neutral-900 dark:hover:bg-neutral-700 focus:ring-4 focus:ring-neutral-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                fill="none"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Memproses...
                                    </>
                                ) : (
                                    "Masuk"
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right - Image */}
                <div className="hidden lg:block">
                    <div
                        className="h-full w-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url('/assets/photo/auth.jpg')`,
                        }}
                    />
                </div>
            </div>

            {/* Shake animation for error */}
            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
                    20%, 40%, 60%, 80% { transform: translateX(4px); }
                }
            `}</style>
        </>
    );
}
