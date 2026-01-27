# Alur Migrasi Data Produksi

Dokumen ini menjelaskan alur migrasi data (seeding) yang baru dibuat untuk memindahkan data lama atau inisialisasi awal database **POS Julia** ke state produksi yang siap pakai.

Strategi ini dirancang untuk memastikan integritas data stok dan history transaksi tetap terjaga.

## 1. Overview Seeder

Semua seeder dijalankan melalui `DatabaseSeeder.php` dengan urutan yang ketat (sequential). Urutan ini **tidak boleh diubah** karena adanya ketergantungan antar data (foreign keys dan logika stok).

Perintah eksekusi:
```bash
php artisan migrate:fresh --seed
```

## 2. Urutan Eksekusi

Berikut adalah urutan seeder yang dijalankan:

1.  **ACL & Master User**
    -   `PermissionSeeder`: Membuat permission dasar.
    -   `RoleSeeder`: Membuat role (Admin, Cashier).
    -   `ProductionUserSeeder`: Membuat user riil (bukan dummy).
2.  **Master Data Poduk**
    -   `ProductionCategorySeeder`: Kategori produk.
    -   `ProductionProductSeeder`: Data produk lengkap.
3.  **Konfigurasi**
    -   `PaymentSettingSeeder` & `ProductionSettingSeeder`: Setting aplikasi.
4.  **Inventory (Logika Penting)**
    -   `ProductionWarehouseStockSeeder`: Inisialisasi stok gudang.
    -   `ProductionStockMovementSeeder`: History pergerakan stok & stok display.
5.  **Transaksi**
    -   `ProductionTransactionSeeder`: Header transaksi.
    -   `ProductionTransactionDetailSeeder`: Detail item transaksi.
    -   `ProductionShiftSeeder`: Data shift kasir.

## 3. Detail Logika Penting

### A. Initialization Warehouse Stock (`ProductionWarehouseStockSeeder`)
Seeder ini tidak hanya melakukan `insert` ke tabel `warehouse_stock`.
-   **Input**: Data array manual/dump dari stok fisik gudang.
-   **Logika "Anti-Phantom Stock"**:
    -   Untuk setiap produk dengan `quantity > 0`, seeder secara otomatis membuat record **StockMovement** bertipe `initial seed` (From: Supplier -> To: Warehouse).
    -   Hal ini menjamin bahwa **setiap stok yang ada di gudang memiliki asal-usul (traceability)** di tabel history (`stock_movements`), sehingga laporan kartu stok tidak minus atau corrupt di awal.

### B. Historical Movements & Display Stock (`ProductionStockMovementSeeder`)
Seeder ini menangani riwayat pergerakan stok (transfer ke display, adjustment, dll) dan menghitung stok toko (Display).
-   **Step 1**: Truncate (kosongkan) table `stock_movements`.
-   **Step 2**: Insert data history pergerakan stok (manual dump).
-   **Step 3 (Re-calculation)**:
    -   Seeder akan melakukan kalkulasi ulang (aggregation) dari semua pergerakan yang mengarah ke `display` (masuk) dan keluar dari `display` (keluar).
    -   Hasil kalkulasi ini kemudian di-insert ke tabel `display_stock`.
    -   **Penting**: Tabel `display_stock` **tidak di-seed secara langsung** (hardcode), melainkan hasil kalkulasi dari pergerakan barang. Ini menjamin konsistensi antara history dan stok fisik tercatat.

### C. Transaction History
-   Data transaksi diimport setelah inventory siap.
-   Pastikan `FOREIGN_KEY_CHECKS=0` digunakan dalam seeder ini jika urutan timeline transaksi dan stok agak "messy" di data legacy, namun idealnya transaksi harus sesuai dengan ketersediaan stok pada saat itu.

## 4. Cara Update Data

Jika ada data baru (misal hasil opname ulang):
1.  Update array data di `ProductionWarehouseStockSeeder.php` untuk stok gudang.
2.  Update array data di `ProductionStockMovementSeeder.php` untuk pergerakan ke toko/display.
3.  Jalankan `php artisan migrate:fresh --seed`.