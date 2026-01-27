# 🔒 Audit Keamanan & Risiko POS Julia

**Tanggal Audit:** 28 Januari 2026  
**Reviewer:** AI Security Audit

---

## 🚨 Ringkasan Temuan

| Severity | Jumlah |
|----------|--------|
| 🔴 KRITIS | 3 |
| 🟠 TINGGI | 4 |
| 🟡 SEDANG | 3 |

---

## 🔴 RISIKO KRITIS

### 1. Return Approval Tanpa Permission Check

**File:** `ReturnController.php` (line 157-166)

**Masalah:**  
Siapapun yang login bisa meng-approve/reject return. Tidak ada pengecekan role "Manager" atau permission khusus.

```php
// MASALAH: Tidak ada middleware atau permission check
public function approve(Request $request, $id, ReturnService $returnService)
{
    $returnService->approveReturn($id, auth()->id()); // Siapa saja bisa!
}
```

**Dampak:**
- Kasir bisa meng-approve return sendiri
- Potensi fraud: return refund/exchange tanpa approval manager

**Rekomendasi:**
```php
// Tambahkan permission check
if (!auth()->user()->can('returns-approve')) {
    abort(403);
}
```

---

### 2. Hapus Transaksi Tanpa Role Check

**File:** `TransactionController.php` (line 142-159)

**Masalah:**  
Transaksi bisa dihapus oleh siapapun yang punya akses ke halaman transaksi. Tidak ada pengecekan apakah user adalah admin/manager.

```php
public function destroy($invoice)
{
    // Hanya cek hasProcessedReturns, TIDAK cek role/permission
    $transaction = Transaction::where('invoice', $invoice)->firstOrFail();
    // ...
    $this->transactionService->deleteTransaction($transaction);
}
```

**Dampak:**
- Kasir bisa menghapus transaksi (dan stok dikembalikan!)
- Potensi manipulasi data penjualan
- Audit trail hilang

**Rekomendasi:**
1. Tambahkan middleware `permission:transactions-delete`
2. Atau disable fitur hapus transaksi, gunakan void/cancel instead

---

### 3. Database Backup Tanpa Admin Check

**File:** `BackupController.php` (line 15-26)

**Masalah:**  
Download backup database tidak memvalidasi apakah user adalah Super Admin.

**Dampak:**
- Siapa saja yang tau URL bisa download seluruh database
- Data pelanggan, transaksi, password hash bisa bocor

**Rekomendasi:**
```php
public function download()
{
    if (!auth()->user()->isSuperAdmin()) {
        abort(403);
    }
    // ...
}
```

---

## 🟠 RISIKO TINGGI

### 4. Stock Out Tanpa Approval Workflow

**File:** `StockMovementController.php` (line 390-411)

**Masalah:**  
Stok bisa dikeluarkan (rusak, hilang, dll) tanpa perlu approval. Tidak ada double-check mechanism.

**Dampak:**
- Staff bisa mengeluarkan stok tanpa pengawasan
- Potensi pencurian inventaris

**Rekomendasi:**
- Implementasi approval workflow untuk stock out di atas threshold tertentu
- Logging siapa yang melakukan stock out

---

### 5. Hapus Stock Movement Tanpa Audit Trail

**File:** `StockMovementController.php` (line 489-557)

**Masalah:**  
Stock movement bisa dihapus dan stok di-revert. Ini bisa disalahgunakan untuk menutupi manipulasi stok.

**Dampak:**
- Kehilangan audit trail
- Susah melacak discrepancy stok

**Rekomendasi:**
- Gunakan soft delete, bukan hard delete
- Atau buat "correction" movement, bukan hapus

---

### 6. Cash Flow Tanpa Limit/Threshold

**File:** `ShiftController.php` (line 214-241)

**Masalah:**  
Kas masuk/keluar bisa diinput tanpa limit. Tidak ada approval untuk jumlah besar.

```php
$request->validate([
    'amount' => 'required|numeric|min:0.01', // Tidak ada max!
]);
```

**Dampak:**
- Kasir bisa input kas keluar dalam jumlah besar
- Potensi penggelapan

**Rekomendasi:**
- Tambahkan threshold (contoh: > 500rb perlu approval)
- Alert ke manager untuk transaksi kas besar

---

### 7. Recipe Deletion Tanpa Cek Transaksi Historis

**File:** `TransactionService.php` (line 341-428)

**Masalah:**  
Saat menghapus transaksi yang berisi resep, variant_id tidak disimpan di transaction_details. Ini menyebabkan ingredient restoration tidak akurat.

> Komentar di kode: "If detail doesn't save variant_id, we can't accurately restore variant-specific ingredients!"

**Dampak:**
- Stok bahan tidak dikembalikan dengan benar
- Discrepancy inventaris

**Rekomendasi:**
- Simpan `variant_id` di `transaction_details` table
- Atau disable delete untuk transaksi dengan resep

---

## 🟡 RISIKO SEDANG

### 8. Shift Bisa Ditutup Meski Ada Selisih Besar

**File:** `ShiftController.php` (line 174-209)

**Masalah:**  
Shift bisa ditutup dengan selisih kas berapa saja tanpa warning keras atau approval.

**Rekomendasi:**
- Tambahkan threshold selisih (contoh: > 50rb perlu konfirmasi manager)
- Logging selisih untuk audit

---

### 9. Import Excel Tanpa Validasi Ketat

**File:** `StockMovementController.php` (line 418-455)

**Masalah:**  
Import stok dari Excel hanya memvalidasi file type, tidak ada limit jumlah item atau approval untuk import besar.

**Dampak:**
- Bisa import ribuan stok dengan cepat
- Susah di-review jika ada kesalahan

**Rekomendasi:**
- Tambahkan preview sebelum import
- Limit items per import
- Approval untuk import besar

---

### 10. Transaksi Tanpa Shift Warning Lemah

**Masalah:**  
User bisa bertransaksi tanpa shift aktif (tergantung konfigurasi). Ini bisa menyebabkan kas tidak terlacak.

**Rekomendasi:**
- Paksa buka shift sebelum bisa bertransaksi
- Atau warning yang lebih prominent

---

## ✅ Yang Sudah Bagus

1. **Permission middleware** sudah digunakan untuk sebagian besar route
2. **DB Transaction** digunakan untuk operasi kritis
3. **Stock lock** (`lockForUpdate()`) mencegah race condition
4. **Return workflow** ada status pending → approved/rejected
5. **Shift owner check** sudah ada untuk close shift

---

## 📋 Prioritas Perbaikan

| Urutan | Issue | Effort |
|--------|-------|--------|
| 1 | Return approval permission | Kecil |
| 2 | Transaction delete permission | Kecil |
| 3 | Backup admin check | Kecil |
| 4 | Stock out approval | Sedang |
| 5 | Soft delete stock movement | Sedang |

---

## 🛠️ Quick Fixes (Bisa Langsung Diimplementasi)

Apakah kamu mau saya perbaiki issue #1, #2, dan #3 yang effort-nya kecil? Ini hanya perlu menambahkan beberapa baris permission check.
