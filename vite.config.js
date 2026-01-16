import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import dns from "dns";

dns.setDefaultResultOrder("verbatim"); // Membantu mengatasi masalah localhost di Windows
export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: "0.0.0.0",
        hmr: {
            host: "localhost",
        },
    },
});
