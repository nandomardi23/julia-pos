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

Aplikasi ini menggunakan **WebSocket Print Server** yang berjalan di komputer kasir untuk mencetak struk secara langsung (Direct Thermal Printing) tanpa menampilkan dialog print browser.

#### 📋 Apa Saja yang Dibutuhkan?

Sebelum setup, pastikan komputer kasir memiliki:

1.  **Hardware**
    -   PC / Laptop (Windows disarankan).
    -   Thermal Printer (USB/LAN) yang sudah terhubung dan terinstall driver-nya.
    -   Kertas thermal (ukuran 58mm atau 80mm).

2.  **Software**
    -   **PHP (v7.4 atau lebih baru)**: Wajib terinstall.
        -   *Solusi Mudah:* Install **Laragon** (Portable) atau **XAMPP**. Ini otomatis menginstall PHP.
        -   *Solusi Ringan:* Download PHP binary dari [windows.php.net](https://windows.php.net).
        -   *PENTING:* Pastikan PHP bisa dipanggil dari CMD (ketik `php -v`). Jika pakai XAMPP/Laragon tapi tidak muncul, tambahkan path php ke "Environment Variables".
    -   **Composer**: Untuk install library printer.
        -   *Cek:* Buka CMD, ketik `composer -v`.
        -   *Download:* [getcomposer.org](https://getcomposer.org)
    -   **Printer Driver**: Pastikan printer muncul di *Devices and Printers* dan bisa "Test Print".

#### ⚙️ Langkah Instalasi

1.  **Siapkan Folder Server**
    Copy folder `printer-server` dari source code ini ke Desktop atau Documents di komputer kasir.

2.  **Install Library**
    Buka terminal/CMD, masuk ke folder `printer-server` tersebut, lalu jalankan:
    ```bash
    composer install
    ```
    *Tunggu sampai proses selesai. Folder `vendor` akan muncul.*

3.  **Jalankan Server**
    -   **Windows:** Double click file `start.bat`.
    -   **Linux/Mac:** Jalankan `./start.sh` di terminal.

    Jendela terminal baru akan terbuka dengan status:
    ```
    Workerman[POS-Julia-Print-Server] start in DEBUG mode
    WebSocket Server: ws://0.0.0.0:9100
    ```
    *Biarkan jendela ini tetap terbuka selama kasir beroperasi.*

4.  **Setting Nama Printer**
    -   Lihat nama printer persis di **Control Panel > Devices and Printers**.
    -   Contoh nama: `POS-58`, `EPSON TM-U220 Receipt`, `Generic / Text Only`.
    -   Masukkan nama printer ini di menu **Settings > Printer** pada aplikasi web POS Julia.

#### 🛠️ Troubleshooting

-   **Error `php is not recognized`**: Artinya PHP belum masuk ke Environment Variables Windows. Cari tutorial "Add PHP to Path Windows" di Google.
-   **Server tidak bisa connect**:
    -   Pastikan file `start.bat` sudah berjalan.
    -   Cek firewall Windows, pastikan port `9100` diizinkan (allow).
    -   Pastikan tidak ada aplikasi lain yang menggunakan port 9100.
-   **Printer tidak merespon tapi status sukses**:
    -   Cek apakah nama printer di setting aplikasi SAMA PERSIS dengan di Control Panel (termasuk spasi/huruf besar).
    -   Pastikan kabel USB printer tidak kendor.

#### � Agar Jalan Otomatis (Auto Start)

Agar server printer langsung menyala saat komputer kasir dihidupkan, lakukan langkah ini:

**Cara Mudah (Startup Folder):**
1.  Tekan tombol keyboard **Windows + R** untuk membuka menu Run.
2.  Ketik `shell:startup` lalu tekan Enter. Akan muncul folder Startup.
3.  Klik kanan pada file `start.bat` di folder `printer-server`, pilih **Create Shortcut**.
4.  Pindahkan shortcut yang baru dibuat itu ke dalam folder Startup tadi.
5.  Selesai! Sekarang server akan otomatis menyala setiap kali komputer masuk Windows.

> [!IMPORTANT]
> **Pengguna XAMPP / Laragon Wajib Baca:**
> Agar `start.bat` bisa jalan otomatis, Windows harus "mengenal" perintah `php`.
> 1.  Cari folder PHP anda.
>     -   **XAMPP**: Biasanya di `C:\xampp\php`
>     -   **Laragon**: Biasanya di `C:\laragon\bin\php\php-8.x.x` (pilih versi yg aktif)
> 2.  **Copy alamat folder tersebut.**
> 3.  Di Windows Search, ketik **"Edit the system environment variables"**, enter.
> 4.  Klik tombol **Environment Variables**.
> 5.  Di bagian *System variables* (bawah), cari dan pilih **Path**, lalu klik **Edit**.
> 6.  Klik **New**, lalu **Paste** alamat folder PHP tadi. Klik OK di semua jendela.
>
> Tanpa langkah ini, `start.bat` akan langsung tertutup sendiri (error) saat komputer nyala.

**Cara Profesional (Hidden Service):**
Jika ingin server berjalan di background (tanpa jendela hitam), gunakan **NSSM**. Panduan lengkapnya ada di file [printer-server/README.md](printer-server/README.md).

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
