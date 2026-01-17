/**
 * PrintService - Client-side thermal printing via QZ Tray
 * 
 * QZ Tray must be installed on cashier's PC
 * Download: https://qz.io/download/
 * 
 * Supported Features:
 * - ESC/POS receipt printing (80mm paper)
 * - Cash drawer kick (via RJ11 connected to printer)
 * - Auto-print after transaction
 */

class PrintService {
    static qz = null;
    static isConnected = false;
    static connectionPromise = null;
    static selectedPrinter = null; // Manual printer selection

    /**
     * Set printer manually (for debugging)
     */
    static setSelectedPrinter(printerName) {
        this.selectedPrinter = printerName;
        console.log('Printer dipilih:', printerName);
    }

    /**
     * Get the current printer (selected or auto-detected)
     */
    static async getCurrentPrinter() {
        if (this.selectedPrinter) {
            return this.selectedPrinter;
        }
        return await this.findThermalPrinter();
    }

    /**
     * Initialize QZ Tray connection
     */
    static async connect() {
        // Return existing connection if already connected
        if (this.isConnected && this.qz?.websocket?.isActive()) {
            return true;
        }

        // Return pending connection if one is in progress
        if (this.connectionPromise) {
            return this.connectionPromise;
        }

        this.connectionPromise = this._doConnect();

        try {
            const result = await this.connectionPromise;
            return result;
        } finally {
            this.connectionPromise = null;
        }
    }

    static async _doConnect() {
        try {
            if (typeof window === 'undefined' || !window.qz) {
                console.warn('QZ Tray not loaded. Make sure qz-tray.js is included.');
                return false;
            }

            this.qz = window.qz;

            // Check if already connected
            if (this.qz.websocket.isActive()) {
                this.isConnected = true;
                return true;
            }

            // IMPORTANT: For local development, we need to bypass certificate validation
            // In production, you should use a proper signed certificate from QZ Industries

            // Certificate promise - return a demo/override certificate
            this.qz.security.setCertificatePromise(function (resolve, reject) {
                // For local development, we can use an override
                // This tells QZ Tray to allow unsigned requests
                resolve(""); // Empty string = use override/demo mode
            });

            // Signature promise - skip signing for local development
            this.qz.security.setSignaturePromise(function (toSign) {
                return function (resolve, reject) {
                    // Return empty signature for local development
                    resolve("");
                };
            });

            await this.qz.websocket.connect();
            this.isConnected = true;
            console.log('✓ QZ Tray terhubung');
            return true;
        } catch (error) {
            console.error('✗ QZ Tray gagal terhubung:', error.message || error);
            this.isConnected = false;
            return false;
        }
    }

    /**
     * Disconnect from QZ Tray
     */
    static async disconnect() {
        if (this.qz && this.isConnected) {
            try {
                await this.qz.websocket.disconnect();
            } catch (e) {
                // Ignore disconnect errors
            }
            this.isConnected = false;
        }
    }

    /**
     * Get available printers
     */
    static async getPrinters() {
        const connected = await this.connect();
        if (!connected) return [];

        try {
            return await this.qz.printers.find();
        } catch (error) {
            console.error('Error getting printers:', error);
            return [];
        }
    }

    /**
     * Find thermal/POS printer (Kassen, BTP, POS, etc)
     */
    static async findThermalPrinter() {
        const printers = await this.getPrinters();

        // Keywords to look for in printer name
        const keywords = ['kassen', 'btp', 'pos', 'thermal', 'receipt', 'epson', 'tm-'];

        const thermal = printers.find(p => {
            const name = p.toLowerCase();
            return keywords.some(k => name.includes(k));
        });

        if (thermal) {
            console.log('Found thermal printer:', thermal);
            return thermal;
        }

        // Fallback to first printer
        if (printers.length > 0) {
            console.log('Using default printer:', printers[0]);
            return printers[0];
        }

        return null;
    }

    /**
     * Generate ESC/POS receipt commands for 80mm paper (48 chars width)
     * Format matches web preview exactly
     */
    static generateReceiptCommands(transaction, settings = {}, hasLogo = false) {
        const ESC = '\x1B';
        const GS = '\x1D';
        const LF = '\x0A';
        const WIDTH = 48; // 80mm paper = 48 characters

        let receipt = '';

        // Initialize printer (Only reset if NO logo, otherwise we might clear the logo buffer)
        if (!hasLogo) {
            receipt += ESC + '@'; 
        }

        // ===== HEADER =====
        // Center align
        receipt += ESC + 'a' + '\x01';

        // Add padding if logo was printed (prevent text from touching logo)
        if (hasLogo) {
            receipt += LF; 
        }

        // Store Initial placeholder (only if no logo image)
        if (!hasLogo) {
            const storeInitial = (settings.store_name || 'S').charAt(0).toUpperCase();
            receipt += ESC + 'E' + '\x01'; // Bold ON
            receipt += GS + '!' + '\x33';  // 4x height + 4x width (larger)
            receipt += storeInitial + LF;
            receipt += GS + '!' + '\x00';  // Normal size
            receipt += ESC + 'E' + '\x00'; // Bold OFF
            receipt += LF;
        }

        // Store name (bold, double height)
        receipt += ESC + 'E' + '\x01'; // Bold ON
        receipt += GS + '!' + '\x11';  // Double height + width
        receipt += (settings.store_name || 'Toko') + LF;
        receipt += GS + '!' + '\x00';  // Normal size
        receipt += ESC + 'E' + '\x00'; // Bold OFF

        // Store address (if available)
        if (settings.store_address) {
            receipt += settings.store_address + LF;
        }

        // Store phone (if available)
        if (settings.store_phone) {
            receipt += 'No. Telp ' + settings.store_phone + LF;
        }

        // Invoice number
        receipt += (transaction.invoice || '-') + LF;

        // Divider
        receipt += '------------------------------------------------' + LF;

        // ===== TRANSACTION INFO =====
        // Date and Cashier on same line (left and right)
        receipt += ESC + 'a' + '\x00'; // Left align
        const dateStr = this.formatDateOnly(transaction.created_at);
        const cashierName = transaction.cashier?.name || 'Kasir';
        const dateLineSpaces = Math.max(1, WIDTH - dateStr.length - cashierName.length);
        receipt += dateStr + ' '.repeat(dateLineSpaces) + cashierName + LF;

        // Time on next line
        receipt += this.formatTimeOnly(transaction.created_at) + LF;

        receipt += '------------------------------------------------' + LF;

        // ===== ITEMS =====
        const details = transaction.details || [];
        let totalQty = 0;

        details.forEach((item, index) => {
            const productName = item.product?.title || 'Item';
            const variantName = item.variant_name ? ` (${item.variant_name})` : '';
            const name = (productName + variantName).substring(0, 40); // Longer for 80mm

            const qty = Number(item.qty) || 1;
            const price = Number(item.price) || 0;
            const subtotal = qty * price;
            totalQty += qty;

            // Item name (bold)
            receipt += ESC + 'E' + '\x01';
            receipt += `${index + 1}. ${name}` + LF;
            receipt += ESC + 'E' + '\x00';

            // Qty x Price aligned with Rp Subtotal
            const qtyPrice = `   ${qty} x ${this.formatNumber(price)}`;
            const subtotalStr = 'Rp ' + this.formatNumber(subtotal);
            const spaces = Math.max(1, WIDTH - qtyPrice.length - subtotalStr.length);
            receipt += qtyPrice + ' '.repeat(spaces) + subtotalStr + LF;
        });

        receipt += '================================================' + LF;

        // ===== TOTALS =====
        const grandTotal = Number(transaction.grand_total) || 0;
        const discount = Number(transaction.discount) || 0;
        const cash = Number(transaction.cash) || 0;
        const change = Number(transaction.change) || 0;
        const paymentMethod = transaction.payment_method || 'cash';

        // Calculate subtotal from items
        const subtotal = details.reduce((sum, item) => {
            return sum + (Number(item.qty) || 1) * (Number(item.price) || 0);
        }, 0);

        // Total QTY (left aligned)
        receipt += 'Total QTY : ' + totalQty + LF;
        receipt += '------------------------------------------------' + LF;

        // Sub Total
        receipt += this.formatTotalLine('Sub Total', subtotal, 48) + LF;

        // Discount (if any)
        if (discount > 0) {
            receipt += this.formatTotalLine('Diskon', -discount, 48) + LF;
        }

        // Total (bold)
        receipt += ESC + 'E' + '\x01';
        receipt += this.formatTotalLine('Total', grandTotal, 48) + LF;
        receipt += ESC + 'E' + '\x00';

        // Payment method
        const methodLabels = {
            'cash': 'Bayar (Cash)',
            'transfer': 'Bayar (Transfer)',
            'qris': 'Bayar (QRIS)'
        };
        const methodLabel = methodLabels[paymentMethod] || 'Bayar';
        receipt += this.formatTotalLine(methodLabel, cash, 48) + LF;

        // Kembali
        receipt += this.formatTotalLine('Kembali', change, 48) + LF;

        receipt += '------------------------------------------------' + LF;

        // ===== FOOTER =====
        // Center align
        receipt += ESC + 'a' + '\x01';
        receipt += LF;
        receipt += 'Terimakasih Telah Berbelanja' + LF;

        if (settings.store_website) {
            receipt += settings.store_website + LF;
        }

        // Feed and cut
        receipt += LF + LF + LF;
        receipt += GS + 'V' + '\x00'; // Full cut

        return receipt;
    }

    /**
     * Format a total line with left label and right-aligned Rp value
     * @param {string} label - Left-aligned label
     * @param {number} value - Monetary value
     * @param {number} width - Line width (default 48 for 80mm paper)
     */
    static formatTotalLine(label, value, width = 48) {
        const valueStr = 'Rp ' + this.formatNumber(Math.abs(value));
        const prefix = value < 0 ? '-' : '';
        const fullValue = prefix + valueStr;
        const spaces = Math.max(1, width - label.length - fullValue.length);
        return label + ' '.repeat(spaces) + fullValue;
    }

    /**
     * Print receipt to thermal printer
     */
    static async printReceipt(transaction, settings = {}) {
        try {
            const connected = await this.connect();
            if (!connected) {
                return {
                    success: false,
                    message: 'QZ Tray tidak terkoneksi. Pastikan QZ Tray sudah diinstall dan berjalan.',
                    fallback: true
                };
            }

            const printer = await this.getCurrentPrinter();
            if (!printer) {
                return {
                    success: false,
                    message: 'Printer thermal tidak ditemukan.',
                    fallback: true
                };
            }

            const config = this.qz.configs.create(printer);
            
            // 1. Print Logo (Separate Job to prevent Mixed Content Errors)
            let hasLogo = false;
            if (settings.store_logo) {
                const logoUrl = `/storage/settings/${settings.store_logo}`;
                const base64Image = await this.fetchImageBase64(logoUrl);
                
                if (base64Image) {
                    try {
                        console.log('Printing logo...');
                        await this.qz.print(config, [{
                            type: 'pixel',
                            format: 'image',
                            flavor: 'base64',
                            data: base64Image,
                            options: {
                                language: "ESCPOS",
                                dotDensity: "double"
                            }
                        }]);
                        hasLogo = true;
                    } catch (logoError) {
                        console.error('Logo print failed, proceeding with text:', logoError);
                    }
                }
            }

            // 2. Print Receipt Text (Separate Job)
            // Note: If logo was printed, the printer is already initialized. 
            // We pass hasLogo=true to generateReceiptCommands to skip big initial letter if desired.
            const receiptData = this.generateReceiptCommands(transaction, settings, hasLogo);
            
            try {
                console.log('Printing text...');
                await this.qz.print(config, [{
                    type: 'raw',
                    format: 'command',
                    flavor: 'hex',
                    data: this.toHex(receiptData)
                }]);
            } catch (textError) {
                console.error('Text print failed:', textError);
                throw textError;
            }

            console.log('✓ Struk berhasil dicetak');
            return { success: true, message: 'Struk berhasil dicetak' };
        } catch (error) {
            console.error('Print error:', error);
            return {
                success: false,
                message: error.message || 'Gagal mencetak struk',
                fallback: true
            };
        }
    }

    /**
     * Open cash drawer via ESC/POS command
     * Cash drawer must be connected to printer via RJ11 cable
     * 
     * Command: ESC p m t1 t2
     * - ESC p = 0x1B 0x70
     * - m = pin number (0 = pin 2, 1 = pin 5)
     * - t1 = on time (25 = 50ms)
     * - t2 = off time (250 = 500ms)
     */
    static async openCashDrawer() {
        try {
            const connected = await this.connect();
            if (!connected) {
                return {
                    success: false,
                    message: 'QZ Tray tidak terkoneksi'
                };
            }

            const printer = await this.getCurrentPrinter();
            if (!printer) {
                return {
                    success: false,
                    message: 'Printer tidak ditemukan'
                };
            }

            const config = this.qz.configs.create(printer);

            // ESC p 0 25 250 - Standard cash drawer kick command
            // Works with most RJ11-connected cash drawers
            // Hex: 1B700019FA
            const drawerKickHex = '1B700019FA';

            await this.qz.print(config, [{
                type: 'raw',
                format: 'command',
                flavor: 'hex',
                data: drawerKickHex
            }]);

            console.log('✓ Cash drawer dibuka');
            return { success: true, message: 'Laci kasir dibuka' };
        } catch (error) {
            console.error('Drawer error:', error);
            return {
                success: false,
                message: error.message || 'Gagal membuka laci kasir'
            };
        }
    }

    /**
     * Print receipt and optionally open cash drawer
     * Cash drawer ONLY opens for cash payments
     * 
     * @param {Object} transaction - Transaction data
     * @param {Object} settings - Store settings
     * @param {boolean} openDrawer - Whether to open drawer (based on payment method)
     */
    static async printAndOpenDrawer(transaction, settings = {}, openDrawer = true) {
        const results = {
            print: { success: false },
            drawer: { success: false, skipped: false }
        };

        // Print receipt
        results.print = await this.printReceipt(transaction, settings);

        // Only open drawer for CASH payments
        const isCashPayment = transaction.payment_method?.toLowerCase() === 'cash';

        if (openDrawer && isCashPayment) {
            // Small delay before opening drawer
            await new Promise(resolve => setTimeout(resolve, 300));
            results.drawer = await this.openCashDrawer();
        } else {
            results.drawer = {
                success: true,
                skipped: true,
                message: 'Laci tidak dibuka (pembayaran non-tunai)'
            };
        }

        return results;
    }

    /**
     * Check if QZ Tray is available
     */
    static isAvailable() {
        return typeof window !== 'undefined' && window.qz !== undefined;
    }

    /**
     * Check current connection status
     */
    static async checkConnection() {
        if (!this.isAvailable()) {
            return {
                available: false,
                connected: false,
                message: 'QZ Tray tidak terinstall atau belum dimuat'
            };
        }

        const connected = await this.connect();
        const printers = connected ? await this.getPrinters() : [];
        const thermalPrinter = connected ? await this.findThermalPrinter() : null;

        return {
            available: true,
            connected,
            printers,
            thermalPrinter,
            message: connected
                ? `Terhubung. Printer: ${thermalPrinter || 'Tidak ditemukan'}`
                : 'Tidak dapat terhubung ke QZ Tray'
        };
    }

    // ===== HELPER FUNCTIONS =====

    static formatNumber(num) {
        return Number(num || 0).toLocaleString('id-ID');
    }

    static formatDate(dateStr) {
        try {
            const date = new Date(dateStr);
            return date.toLocaleString('id-ID', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return dateStr || '-';
        }
    }

    static formatDateOnly(dateStr) {
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('id-ID', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch {
            return dateStr || '-';
        }
    }

    static formatTimeOnly(dateStr) {
        try {
            const date = new Date(dateStr);
            return date.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        } catch {
            return '-';
        }
    }

    /**
     * Fetch image from URL and convert to Base64 (without header)
     */
    static async fetchImageBase64(url) {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64Combined = reader.result;
                    // Split header "data:image/png;base64," to get pure base64
                    const base64Pure = base64Combined.split(',')[1];
                    resolve(base64Pure);
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error('Error fetching image for printing:', error);
            return null;
        }
    }

    /**
     * Convert string to Hex string for QZ Tray
     * Ensures only single-byte characters are processed to avoid invalid hex length
     */
    static toHex(str) {
        let hex = '';
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            // Force 8-bit range. Replace non-ASCII (>255) with '?' (0x3F)
            if (code > 255) {
                code = 0x3F; 
            }
            hex += code.toString(16).padStart(2, '0');
        }
        return hex.toUpperCase();
    }
}

export default PrintService;
