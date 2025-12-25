# Alur Project POS Julia

Dokumentasi lengkap tentang arsitektur dan alur sistem Point of Sale (POS) Julia.

---

## 📋 Overview Project

**POS Julia** adalah sistem kasir berbasis web yang dibangun dengan:
- **Backend**: Laravel (PHP)
- **Frontend**: React + Inertia.js
- **Database**: MySQL/PostgreSQL
- **Styling**: Tailwind CSS

---

## 🏗️ Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                         │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ Dashboard │ POS │ Products │ Stock │ Reports │ Settings    ││
│  └─────────────────────────────────────────────────────────────┘│
│                           ↕ Inertia.js                          │
├─────────────────────────────────────────────────────────────────┤
│                        BACKEND (Laravel)                        │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │     Controllers  │  Models  │  Middleware  │  Routes       ││
│  └─────────────────────────────────────────────────────────────┘│
│                           ↕                                     │
├─────────────────────────────────────────────────────────────────┤
│                        DATABASE                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ users│products│categories│warehouses│displays│transactions ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Struktur Folder

```
pos-julia/
├── app/
│   ├── Http/Controllers/
│   │   ├── Apps/                  # Controller fitur utama
│   │   │   ├── CategoryController.php
│   │   │   ├── ProductController.php
│   │   │   ├── POSController.php
│   │   │   ├── TransactionController.php
│   │   │   ├── StockMovementController.php
│   │   │   ├── WarehouseController.php
│   │   │   ├── DisplayController.php
│   │   │   ├── SupplierController.php
│   │   │   └── PaymentSettingController.php
│   │   ├── Reports/               # Controller laporan
│   │   │   ├── SalesReportController.php
│   │   │   └── ProfitReportController.php
│   │   ├── DashboardController.php
│   │   ├── UserController.php
│   │   ├── RoleController.php
│   │   └── PermissionController.php
│   └── Models/                    # Model database
│       ├── User.php
│       ├── Product.php
│       ├── ProductVariant.php
│       ├── ProductIngredient.php
│       ├── Category.php
│       ├── Supplier.php
│       ├── Warehouse.php
│       ├── WarehouseStock.php
│       ├── Display.php
│       ├── DisplayStock.php
│       ├── StockMovement.php
│       ├── Cart.php
│       ├── Transaction.php
│       ├── TransactionDetail.php
│       ├── Profit.php
│       └── PaymentSetting.php
├── resources/js/
│   ├── Pages/Dashboard/           # Halaman React
│   │   ├── Index.jsx              # Dashboard utama
│   │   ├── POS/                   # Halaman kasir
│   │   ├── Products/              # CRUD produk
│   │   ├── Categories/            # CRUD kategori
│   │   ├── Suppliers/             # CRUD supplier
│   │   ├── Warehouses/            # CRUD gudang
│   │   ├── Displays/              # CRUD etalase
│   │   ├── StockMovements/        # Manajemen stok
│   │   ├── Transactions/          # Histori transaksi
│   │   ├── Reports/               # Laporan
│   │   ├── Users/                 # Manajemen user
│   │   ├── Roles/                 # Manajemen role
│   │   ├── Permissions/           # Permissions
│   │   └── Settings/              # Pengaturan
│   └── Components/                # Komponen reusable
├── database/migrations/           # Schema database
└── routes/web.php                 # Definisi routing
```

---

## 🔄 Alur Fitur Utama

### 1. Alur Autentikasi

```mermaid
flowchart TD
    A[User akses /] --> B[Redirect ke /login]
    B --> C[Input email & password]
    C --> D{Validasi}
    D -->|Gagal| E[Tampilkan error]
    E --> C
    D -->|Sukses| F[Buat session]
    F --> G[Redirect ke /dashboard]
    G --> H{Cek permission}
    H --> I[Tampilkan menu sesuai role]
```

---

### 2. Alur Master Data

#### 2.1 Kategori (Categories)

```mermaid
flowchart LR
    A[Categories Index] --> B[Create Category]
    B --> C[Input nama & deskripsi]
    C --> D[Save ke database]
    D --> A
    A --> E[Edit Category]
    E --> F[Update data]
    F --> A
    A --> G[Delete Category]
    G --> H{Ada produk?}
    H -->|Ya| I[Gagal hapus]
    H -->|Tidak| J[Hapus kategori]
```

**Route**: `/dashboard/categories`

---

#### 2.2 Produk (Products)

```mermaid
flowchart TD
    A[Products Index] --> B[Create Product]
    B --> C[Isi form produk]
    C --> D{is_recipe?}
    D -->|Ya| E[Pilih ingredients]
    D -->|Tidak| F[Skip ingredients]
    E --> G[Upload gambar]
    F --> G
    G --> H[Save ke database]
    H --> I{Product variants?}
    I -->|Ya| J[Save variants]
    I -->|Tidak| K[Selesai]
    J --> K
```

**Jenis Produk**:
| Tipe | Keterangan |
|------|------------|
| **Reguler** | Produk standar dijual langsung |
| **Recipe** | Produk komposit dari bahan lain |
| **Ingredient** | Bahan baku untuk resep |
| **Supply** | Alat pendukung (cup, sedotan) |

**Route**: `/dashboard/products`

---

#### 2.3 Supplier

```mermaid
flowchart LR
    A[Suppliers Index] --> B[Create Supplier]
    B --> C[Input: nama, alamat, telepon]
    C --> D[Save]
    D --> A
```

**Route**: `/dashboard/suppliers`

---

### 3. Alur Manajemen Stok

#### 3.1 Struktur Lokasi Stok

```
         SUPPLIER
            │
            │ Stock In
            ▼
       ┌─────────┐
       │WAREHOUSE│ ← Gudang utama
       └────┬────┘
            │ Transfer
            ▼
       ┌─────────┐
       │ DISPLAY │ ← Etalase/Toko
       └────┬────┘
            │ Sale
            ▼
       TRANSACTION
```

#### 3.2 Jenis Pergerakan Stok

| Tipe | Dari | Ke | Deskripsi |
|------|------|----|-----------| 
| **Stock In** | Supplier | Warehouse | Pembelian barang |
| **Transfer** | Warehouse | Display | Kirim ke toko |
| **Transfer** | Warehouse | Warehouse | Pindah gudang |
| **Sale** | Display | - | Penjualan via POS |
| **Stock Out** | Display | - | Barang rusak/expired |

#### 3.3 Alur Stock In

```mermaid
flowchart TD
    A[Stock Movement] --> B[Pilih Stock In]
    B --> C[Pilih produk & warehouse]
    C --> D[Input quantity & harga beli]
    D --> E[Save to warehouse_stocks]
    E --> F[Create stock_movements record]
```

**Route**: `/dashboard/stock-movements/create`

#### 3.4 Alur Transfer

```mermaid
flowchart TD
    A[Stock Movement] --> B[Pilih Transfer]
    B --> C[Pilih source location]
    C --> D[Pilih destination location]
    D --> E[Pilih produk & quantity]
    E --> F{Stok cukup?}
    F -->|Ya| G[Kurangi source stock]
    F -->|Tidak| H[Error: Stok tidak cukup]
    G --> I[Tambah destination stock]
    I --> J[Create stock_movements record]
```

**Route**: `/dashboard/stock-movements/transfer`

#### 3.5 Bulk Import Stock

```mermaid
flowchart LR
    A[Download Template Excel] --> B[Isi data stok]
    B --> C[Upload file]
    C --> D[Validasi data]
    D --> E[Import ke database]
```

**Route**: `/dashboard/stock-movements/bulk-import`

---

### 4. Alur Point of Sale (POS)

#### 4.1 Alur Lengkap Transaksi

```mermaid
flowchart TD
    A[Kasir buka /pos] --> B[Load produk & cart]
    B --> C[Scan/Pilih produk]
    C --> D{Ada varian?}
    D -->|Ya| E[Pilih varian]
    D -->|Tidak| F[Langsung tambah ke cart]
    E --> F
    F --> G[Cart updated]
    G --> H{Tambah lagi?}
    H -->|Ya| C
    H -->|Tidak| I[Input diskon]
    I --> J[Pilih payment method]
    J --> K{Cash?}
    K -->|Ya| L[Input uang diterima]
    K -->|Tidak| M[Pilih payment gateway]
    L --> N[Hitung kembalian]
    M --> N
    N --> O[Klik Bayar]
    O --> P[Proses transaksi]
```

#### 4.2 Proses Backend Transaksi

```mermaid
flowchart TD
    A[Request store transaction] --> B[Generate invoice number]
    B --> C[Create transaction record]
    C --> D[Loop setiap cart item]
    D --> E[Create transaction_detail]
    E --> F{Produk is_recipe?}
    F -->|Tidak| G[Kurangi display_stocks produk]
    F -->|Ya| H[Loop setiap ingredient]
    H --> I[Kurangi display_stocks ingredient]
    I --> J[Next ingredient]
    G --> K[Create stock_movement]
    J --> K
    K --> L[Hitung & simpan profit]
    L --> M{Item lain?}
    M -->|Ya| D
    M -->|Tidak| N[Hapus cart items]
    N --> O[Return invoice]
```

**Routes**:
- `GET /dashboard/pos` - Halaman POS
- `POST /dashboard/pos/addToCart` - Tambah ke cart
- `DELETE /dashboard/pos/{cart_id}/destroyCart` - Hapus item cart
- `PATCH /dashboard/pos/{cart_id}/updateCart` - Update quantity
- `POST /dashboard/pos/store` - Proses transaksi

---

### 5. Alur Laporan (Reports)

#### 5.1 Sales Report

```mermaid
flowchart LR
    A[Reports > Sales] --> B[Filter: tanggal, kasir]
    B --> C[Query transactions]
    C --> D[Tampilkan tabel & chart]
```

**Data ditampilkan**:
- Total transaksi
- Total penjualan
- Breakdown per produk
- Trend penjualan

**Route**: `/dashboard/reports/sales`

#### 5.2 Profit Report

```mermaid
flowchart LR
    A[Reports > Profits] --> B[Filter periode]
    B --> C[Query profits table]
    C --> D[Tampilkan profit harian/bulanan]
```

**Route**: `/dashboard/reports/profits`

---

### 6. Alur User Management

#### 6.1 Hierarki Akses

```
PERMISSIONS (aksi dasar)
    ↓
ROLES (kumpulan permissions)
    ↓
USERS (memiliki roles)
```

#### 6.2 Contoh Permission

| Permission | Deskripsi |
|------------|-----------|
| `products-access` | Lihat daftar produk |
| `products-create` | Tambah produk baru |
| `products-edit` | Edit produk |
| `products-delete` | Hapus produk |
| `transactions-access` | Akses POS & transaksi |
| `reports-access` | Lihat laporan |

---

## 📊 Entity Relationship Diagram

```mermaid
erDiagram
    USERS ||--o{ TRANSACTIONS : creates
    USERS ||--o{ CARTS : has
    
    CATEGORIES ||--o{ PRODUCTS : contains
    SUPPLIERS ||--o{ PRODUCTS : supplies
    
    PRODUCTS ||--o{ PRODUCT_VARIANTS : has
    PRODUCTS ||--o{ PRODUCT_INGREDIENTS : has_ingredients
    PRODUCTS ||--o{ WAREHOUSE_STOCKS : stored_in
    PRODUCTS ||--o{ DISPLAY_STOCKS : displayed_in
    
    WAREHOUSES ||--o{ WAREHOUSE_STOCKS : contains
    DISPLAYS ||--o{ DISPLAY_STOCKS : contains
    
    PRODUCTS ||--o{ CARTS : added_to
    PRODUCT_VARIANTS ||--o{ CARTS : selected_in
    
    TRANSACTIONS ||--o{ TRANSACTION_DETAILS : has
    TRANSACTIONS ||--o{ PROFITS : generates
    
    STOCK_MOVEMENTS }|--|| PRODUCTS : tracks
```

---

## 🔐 Middleware & Authorization

Semua route dilindungi oleh:

1. **`auth`** - Memastikan user sudah login
2. **`permission:xxx`** - Memastikan user punya permission tertentu

Contoh:
```php
Route::get('/products', [ProductController::class, 'index'])
    ->middleware('permission:products-access');
```

---

## 📱 Navigasi Menu

```
Dashboard
├── 📊 Dashboard (overview)
├── 🛒 POS (kasir)
├── 📦 Master Data
│   ├── Categories
│   ├── Products
│   └── Suppliers
├── 📍 Inventory
│   ├── Warehouses
│   ├── Displays
│   └── Stock Movements
├── 💰 Transactions
│   └── History
├── 📈 Reports
│   ├── Sales Report
│   └── Profit Report
├── 👥 User Management
│   ├── Users
│   ├── Roles
│   └── Permissions
└── ⚙️ Settings
    └── Payment Settings
```

---

## 🔧 Konfigurasi Environment

File `.env` yang perlu dikonfigurasi:

```env
APP_NAME=POS-Julia
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pos_julia
DB_USERNAME=root
DB_PASSWORD=

# Payment Settings (jika ada)
PAYMENT_GATEWAY_KEY=xxx
```

---

## 🚀 Menjalankan Project

### Development

```bash
# Install dependencies
composer install
npm install

# Setup database
php artisan migrate
php artisan db:seed

# Run servers
php artisan serve    # Backend: http://localhost:8000
npm run dev          # Frontend Vite
```

### Production

```bash
npm run build
php artisan optimize
```

---

## 📝 Catatan Penting

1. **Stok produk resep**: Saat dijual, stok SEMUA ingredient akan dikurangi otomatis
2. **Supply**: Dipotong dari warehouse pertama yang memiliki stok cukup
3. **Profit**: Dihitung dari `sell_price - buy_price` per item
4. **Varian produk**: Nama varian akan disimpan di transaction_detail untuk riwayat

---

*Dokumentasi dibuat: Desember 2025*
