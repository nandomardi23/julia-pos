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
        host: "0.0.0.0", // Or your specific IP address
        // origin: "http://192.168.1.16:8000", // Use your local IP and port
        hmr: {
            host: "192.168.1.16", // Use your local IP
        },
    },
});
