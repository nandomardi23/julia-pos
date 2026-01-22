# POS Julia Print Server

WebSocket-based print server for client-side thermal printing. This server runs on the cashier's computer and receives print jobs from the browser via WebSocket.

## Features

- ✅ **Client-side thermal printing** from web browser
- ✅ **WebSocket real-time communication**
- ✅ **Auto cash drawer opening** for cash payments
- ✅ **Cross-platform** (Windows, Linux, Mac)
- ✅ **Multiple printer connectors** (USB, Network, Windows Print Queue)
- ✅ **Free and open source**

## Requirements

- **PHP 7.4 or higher** with CLI support
- **Composer** (for installing dependencies)
- **Thermal printer** connected to the computer (USB, Network, or Windows Print Queue)

## Installation

### Step 1: Install Dependencies

Open terminal/command prompt in the `printer-server` directory and run:

```bash
composer install
```

This will install:
- `workerman/workerman` - WebSocket server
- `mike42/escpos-php` - Thermal printer library

### Step 2: Configure Printer

Edit the printer name in your frontend settings or pass it via WebSocket payload.

**Windows:** Use the printer name from Windows Settings → Printers (e.g., `"POS-80"`, `"EPSON TM-U220"`)

**Linux:** Use the device path (e.g., `"/dev/usb/lp0"`, `"/dev/lp0"`)

**Network:** Use IP address (e.g., `"192.168.1.100"`)

### Step 3: Start the Server

**Windows:**
```bash
start.bat
```

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

**Manual:**
```bash
php index.php start
```

You should see:
```
======================================
  POS Julia Print Server v1.0
======================================
WebSocket Server: ws://0.0.0.0:9100
Status: Starting...
======================================

Workerman[POS-Julia-Print-Server] start in DEBUG mode
```

## Usage

### From Browser (Frontend)

The frontend will automatically connect to `ws://localhost:9100` when WebSocket printing is enabled.

### WebSocket Commands

#### 1. Ping (Test Connection)
```json
{
  "command": "ping"
}
```

Response:
```json
{
  "type": "pong",
  "timestamp": 1234567890
}
```

#### 2. Test Print
```json
{
  "command": "test_print",
  "printer_name": "POS-80"
}
```

#### 3. Print Receipt
```json
{
  "command": "print_receipt",
  "data": {
    "printer_name": "POS-80",
    "open_drawer": true,
    "transaction": { /* transaction data */ },
    "settings": { /* store settings */ }
  }
}
```

#### 4. Open Cash Drawer
```json
{
  "command": "open_drawer",
  "printer_name": "POS-80"
}
```

## Troubleshooting

### Server won't start

**Issue:** `composer: command not found`
- **Solution:** Install Composer from https://getcomposer.org/

**Issue:** `php: command not found`
- **Solution:** Install PHP and add it to your PATH

### Printer not found

**Windows:**
1. Open Control Panel → Devices and Printers
2. Find your thermal printer name exactly (case-sensitive)
3. Use that exact name in the config

**Linux:**
1. Run `ls /dev/usb/` or `ls /dev/lp*`
2. Find your printer device (usually `lp0` or `usb/lp0`)
3. Make sure you have permission: `sudo chmod 666 /dev/usb/lp0`

**Network Printer:**
1. Find printer IP address (usually printed on config page)
2. Make sure printer is on the same network
3. Test connection: `ping 192.168.1.100`

### Connection refused from browser

1. Check firewall settings - allow port 9100
2. Make sure server is running (`start.bat` or `start.sh`)
3. Check server logs for errors
4. Try accessing from `ws://localhost:9100` first

### Print quality issues

1. Make sure you're using the correct printer connector
2. Check printer paper width (default 48 characters for 80mm)
3. Adjust text size if needed in `index.php`

## Running as System Service

### Windows (NSSM)

1. Download NSSM from https://nssm.cc/download
2. Run as administrator:
```cmd
nssm install POSJuliaPrintServer "C:\path\to\php.exe" "C:\path\to\printer-server\index.php start"
nssm start POSJuliaPrintServer
```

### Linux (systemd)

Create `/etc/systemd/system/pos-julia-print.service`:
```ini
[Unit]
Description=POS Julia Print Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/printer-server
ExecStart=/usr/bin/php /path/to/printer-server/index.php start
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable pos-julia-print
sudo systemctl start pos-julia-print
sudo systemctl status pos-julia-print
```

## Server Logs

All activities are logged to console output:
- Connection events
- Print jobs
- Errors

Example log:
```
[2026-01-23 02:00:00] New connection from 192.168.1.100
[2026-01-23 02:00:05] Received command: print_receipt
  → Connecting to printer: POS-80
  → Printing receipt for invoice: INV-20260123-001
  → Cash drawer opened
  ✓ Print completed successfully
```

## Security Notes

- Server listens on `0.0.0.0:9100` (all interfaces)
- For production, consider binding to `127.0.0.1:9100` (localhost only)
- No authentication by default - use firewall to restrict access
- Only accept connections from your POS domain

## Support

For issues related to:
- **Workerman:** https://github.com/walkor/workerman
- **escpos-php:** https://github.com/mike42/escpos-php
- **POS Julia:** Contact your developer

## License

This print server is part of POS Julia application.
