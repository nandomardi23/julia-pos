# Point of Sales – Laravel & Inertia

> Sistem kasir modern dengan alur transaksi cepat, dukungan laporan, dan mode cetak invoice yang rapi. Kalau kamu suka proyek ini, bantu dengan menekan ⭐ di atas – itu sangat membantu visibilitas repositori ini.

![Dashboard Preview](public/media/readme-dashboard.png "Point of Sales Dashboard Preview")
<sub>_Cuplikan antarmuka kasir. Screenshot tambahan ada di bagian di bawah._</sub>

## ✨ Kenapa Menarik?

-   **Kasir cepat & intuitif** – pencarian barcode, keranjang, ringkasan pembayaran, dan kalkulasi diskon otomatis.
-   **Invoice siap cetak & payment link** – setelah transaksi, kasir bisa melihat preview invoice elegan, membagikan link pembayaran Midtrans/Xendit, dan memilih kapan mau mencetaknya.
-   **Direct Thermal Printing** – cetak struk langsung ke printer thermal via WebSocket server (tanpa dialog print browser).
-   **Laporan lengkap** – dari penjualan, profit, sampai riwayat transaksi dengan filter multi parameter.
-   **Akses berbasis role** – integrasi Spatie Permissions bawaan untuk role, user, dan hak akses yang granular.

## 🔧 Teknologi Inti

-   [Laravel 12](https://laravel.com) + [Inertia.js](https://inertiajs.com)
-   [React](https://react.dev) + [Tailwind CSS](https://tailwindcss.com)
-   [Spatie Laravel Permission](https://spatie.be/docs/laravel-permission)
-   [Workerman](https://github.com/walkor/workerman) untuk Print Server WebSocket
-   Integrasi payment gateway Midtrans Snap & Xendit Invoice (opsional)

---

## 🚀 Installation Guide

### 1. Production Setup (Server / Cloud)

Instalasi untuk server utama yang menyimpan database dan aplikasi web.

1.  **Clone Repository**
    ```bash
    git clone https://github.com/<username>/point-of-sales.git
    cd point-of-sales
    ```

2.  **Setup Environment**
    ```bash
    cp .env.example .env
    ```
    -   Edit `.env` dan sesuaikan database credentials (`DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`).
    -   Pastikan `APP_URL` sesuai domain Anda.

3.  **Install Dependencies**
    ```bash
    composer install --optimize-autoloader --no-dev
    npm install
    ```

4.  **Database & Key**
    ```bash
    php artisan key:generate
    php artisan migrate --seed --force
    php artisan storage:link
    ```
    > **Note:** Seed akan membuat user default `admin@gmail.com` / `password`.

5.  **Build Assets**
    ```bash
    npm run build
    ```

6.  **Optimasi (Opsional)**
    ```bash
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    ```

### 2. Cashier Setup (Printer Server)

Aplikasi ini menggunakan **WebSocket Print Server** yang berjalan di komputer kasir untuk mencetak struk secara langsung (tanpa dialog print browser).

**Persyaratan di Komputer Kasir:**
-   PHP Installed (tambahkan ke PATH environment variable)
-   Composer Installed
-   Printer Thermal (USB/LAN/Bluetooth) yang sudah terinstall driver-nya.

**Langkah Instalasi:**

1.  Copy folder `printer-server` dari project ini ke komputer kasir (atau clone full repo juga bisa).
2.  Buka terminal di folder `printer-server`.
3.  Install dependencies:
    ```bash
    composer install
    ```
4.  Jalankan server:
    -   **Windows:** Double click `start.bat`
    -   **Linux/Mac:** `./start.sh`

**Konfigurasi Printer:**
-   Pastikan nama printer di setting atau code sesuai dengan nama printer di **Control Panel > Devices and Printers**.
-   Contoh: `POS-80` atau `EPSON TM-U220`.

> 💡 **Panduan Lengkap:** Baca [printer-server/README.md](printer-server/README.md) untuk detail troubleshooting dan cara menjadikan service otomatis.

---

## 📊 Fitur Utama

-   **Dashboard**: ringkasan kategori, produk, transaksi, pendapatan, dan trend chart.
-   **Kelola Produk & Stok**: CRUD lengkap dengan kategori, barcode unik, dan support varian unit.
-   **Modul Kasir**: pencarian barcode, keranjang multi item, diskon, hitung kembalian otomatis, dan pilihan gateway.
-   **Invoice / Payment Link**: tampilan siap cetak + tombol manual print dan tautan pembayaran.
-   **Riwayat Transaksi**: filter per tanggal/invoice/kasir + export laporan.
-   **Laporan Profit & Penjualan**: pantau performa bisnis dalam sekali klik.
-   **Manajemen Shift**: tracking uang masuk/keluar kasir per shift.

## 📷 Cuplikan Layar

| Modul                  | Preview                                                    |
| ---------------------- | ---------------------------------------------------------- |
| Dashboard              | ![Dashboard Screenshot](public/media/readme-dashboard.png) |
| Kasir / POS            | ![POS Screenshot](public/media/readme-pos.png)             |
| Invoice Ready-to-Print | ![Invoice Screenshot](public/media/readme-invoice.png)     |

## 🧪 Pengujian

```bash
php artisan test --filter=TransactionFlowTest
```

Pengujian ini mensimulasikan checkout lengkap: keranjang ➜ transaksi ➜ invoice, termasuk validasi stok, detail transaksi, profit, dan hitung stok.

## 🤝 Kontribusi

1. Fork repo ini
2. Buat branch fitur: `git checkout -b feature/namamu`
3. Commit perubahanmu: `git commit -m "Tambah fitur X"`
4. Push branch: `git push origin feature/namamu`
5. Buka Pull Request

## Authors

-   [Arya Dwi Putra](https://www.github.com/aryadwiputra)
-   Modifikasi & Fitur Tambahan oleh Tim Pengembang POS Julia

## ⭐ Dukung Proyek Ini

Kalau repositori ini membantumu membangun POS lebih cepat, klik **Star**. Dukungan kecil ini bikin proyek tetap aktif dan membantu developer lain menemukannya. Terima kasih! 🙌