# 🚀 Quick Start - WebSocket Print Server

Cara tercepat untuk mulai menggunakan WebSocket printing!

## 1️⃣ Install Dependencies (Sekali Saja)

```bash
cd printer-server
composer install
```

Tunggu sampai selesai download Workerman dan escpos-php.

---

## 2️⃣ Start Print Server

### Windows:
```cmd
cd printer-server
start.bat
```

### Linux/Mac:
```bash
cd printer-server
chmod +x start.sh
./start.sh
```

**Jika berhasil, akan muncul:**
```
======================================
  POS Julia Print Server v1.0
======================================
WebSocket Server: ws://0.0.0.0:9100
Status: Starting...
======================================

Workerman[POS-Julia-Print-Server] start in DEBUG mode
```

**✅ Jangan tutup terminal ini! Biarkan tetap running.**

---

## 3️⃣ Test dari Browser

### Opsi A: Pakai Component Test

1. Tambahkan ke halaman mana saja (contoh: Settings page):

```jsx
import WebSocketPrintTest from '@/Components/WebSocketPrintTest';

// Di dalam component
<WebSocketPrintTest />
```

2. Buka halaman tersebut di browser
3. Lihat status indicator:
   - 🟢 Hijau = Connected
   - 🔴 Merah = Disconnected

4. Klik **"Test Print"** untuk test cetak

### Opsi B: Pakai Browser Console

1. Buka browser console (F12)
2. Ketik:

```javascript
// Import service
const { WebSocketPrintService } = await import('./resources/js/Services/PrintService.js');

// Check connection
await WebSocketPrintService.checkConnection();

// Test print
await WebSocketPrintService.testPrint('POS-80');
```

---

## 4️⃣ Konfigurasi Printer Name

Ubah `'POS-80'` sesuai printer Anda:

### Windows:
1. Buka **Settings → Printers**
2. Lihat nama printer persis (case-sensitive)
3. Contoh: `"EPSON TM-U220"`, `"POS-80"`, `"Generic Text Printer"`

### Linux:
1. Run: `ls /dev/usb/` atau `ls /dev/lp*`
2. Contoh: `"/dev/usb/lp0"`, `"/dev/lp0"`
3. Berikan permission: `sudo chmod 666 /dev/usb/lp0`

### Network Printer:
- Gunakan IP printer, contoh: `"192.168.1.100"`

---

## 5️⃣ Print Receipt Setelah Transaksi

Update kode Anda untuk pakai WebSocket printing:

```javascript
import { WebSocketPrintService } from '@/Services/PrintService';

// Setelah transaksi selesai
const result = await WebSocketPrintService.printAndOpenDrawer(
    transaction,  // data transaksi
    settings      // store settings
);

if (result.success) {
    Swal.fire('Berhasil!', 'Struk berhasil dicetak', 'success');
} else {
    // Fallback ke browser print
    window.print();
}
```

---

## ❓ Troubleshooting

### Server tidak bisa start

**Error:** `composer: command not found`
```bash
# Install Composer dulu
# Windows: Download dari https://getcomposer.org/
# Linux: sudo apt install composer
```

**Error:** `php: command not found`
```bash
# Install PHP CLI dulu
# Windows: Download dari php.net
# Linux: sudo apt install php-cli
```

### Browser tidak bisa connect

1. **Check server running:**
   - Lihat terminal print server, ada log "New connection" nggak?

2. **Check firewall:**
   - Windows: Allow port 9100
   - Linux: `sudo ufw allow 9100`

3. **Coba URL berbeda:**
   - `ws://localhost:9100` → ganti ke `ws://127.0.0.1:9100`

### Printer not found

**Windows:**
- Pastikan nama printer **persis sama** dengan di Control Panel

**Linux:**
- Check permission: `sudo chmod 666 /dev/usb/lp0`
- Check device ada: `ls /dev/usb/`

---

## 🎯 Next Steps

Setelah berhasil test print:

1. **[RECOMMENDED]** Update Receipt Modal untuk tambahkan opsi WebSocket Print
2. **[OPTIONAL]** Tambahkan settings page untuk konfigurasi printer name
3. **[OPTIONAL]** Run print server sebagai service agar auto-start

Lihat [walkthrough.md](file:///C:/Users/Nando/.gemini/antigravity/brain/7659e42d-2fa2-40cc-92c8-6faa32be1640/walkthrough.md) untuk tutorial lengkap!

---

## 📋 Command Cheatsheet

```bash
# Install dependencies
cd printer-server && composer install

# Start server (Windows)
cd printer-server && start.bat

# Start server (Linux/Mac)
cd printer-server && chmod +x start.sh && ./start.sh

# Stop server
Ctrl+C di terminal

# Update dependencies
cd printer-server && composer update
```

---

**Butuh bantuan lebih lanjut?** Lihat:
- [printer-server/README.md](file:///c:/Users/Nando/Documents/belajar/pos-julia/printer-server/README.md) - Full documentation
- [walkthrough.md](file:///C:/Users/Nando/.gemini/antigravity/brain/7659e42d-2fa2-40cc-92c8-6faa32be1640/walkthrough.md) - Complete walkthrough
- [implementation_plan.md](file:///C:/Users/Nando/.gemini/antigravity/brain/7659e42d-2fa2-40cc-92c8-6faa32be1640/implementation_plan.md) - Technical details
