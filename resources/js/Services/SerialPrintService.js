/**
 * SerialPrintService - Direct USB thermal printing via Web Serial API
 * 
 * This service enables direct browser-to-USB printer communication
 * without requiring a print server, firewall setup, or networking.
 * 
 * Features:
 * - Zero setup required
 * - Direct USB connection
 * - Auto cut paper
 * - Cash drawer kick
 * - ESC/POS thermal printing
 * 
 * Browser Support:
 * - Chrome 89+
 * - Edge 89+
 * 
 * Requirements:
 * - USB thermal printer
 * - User interaction to select printer (browser security)
 */

class SerialPrintService {
    static port = null;
    static writer = null;
    static isConnected = false;

    /**
     * Check if Web Serial API is supported
     */
    static isSupported() {
        return 'serial' in navigator;
    }

    /**
     * Request user to select USB printer
     * This must be called from a user interaction (button click)
     */
    static async requestPort() {
        if (!this.isSupported()) {
            throw new Error('Web Serial API not supported in this browser. Please use Chrome or Edge.');
        }

        try {
            // Request port without filters to allow ANY serial device/printer
            this.port = await navigator.serial.requestPort({});

            return this.port;
        } catch (error) {
            if (error.name === 'NotFoundError') {
                throw new Error('No printer selected');
            }
            throw error;
        }
    }

    /**
     * Connect to the selected printer
     */
    static async connect() {
        if (!this.port) {
            throw new Error('No printer selected. Please select a printer first.');
        }

        try {
            // Open port with common thermal printer settings
            await this.port.open({
                baudRate: 9600,
                dataBits: 8,
                stopBits: 1,
                parity: 'none',
                flowControl: 'none'
            });

            this.isConnected = true;
            this.writer = this.port.writable.getWriter();
            console.log('✓ Connected to USB printer');
            return true;
        } catch (error) {
            this.isConnected = false;
            throw new Error('Failed to connect to printer: ' + error.message);
        }
    }

    /**
     * Disconnect from printer
     */
    static async disconnect() {
        try {
            if (this.writer) {
                this.writer.releaseLock();
                this.writer = null;
            }

            if (this.port) {
                await this.port.close();
                this.isConnected = false;
                console.log('✓ Disconnected from USB printer');
            }
        } catch (error) {
            console.error('Error disconnecting:', error);
        }
    }

    /**
     * Ensure connection before printing
     */
    static async ensureConnection() {
        if (!this.port) {
            await this.requestPort();
        }

        if (!this.isConnected) {
            await this.connect();
        }
    }

    /**
     * Generate ESC/POS commands for receipt
     * Same format as WebSocket/QZ Tray for consistency
     */
    static generateReceiptCommands(transaction, settings = {}) {
        const commands = [];
        const WIDTH = 48; // 80mm paper = 48 characters

        // Helper to add bytes
        const add = (...bytes) => commands.push(...bytes);
        const addText = (text) => {
            const encoded = new TextEncoder().encode(text);
            commands.push(...encoded);
        };

        // ESC/POS constants
        const ESC = 0x1B;
        const GS = 0x1D;
        const LF = 0x0A;

        // Initialize printer
        add(ESC, 0x40); // ESC @ - Initialize

        // ===== HEADER =====
        // Center align
        add(ESC, 0x61, 0x01); // ESC a 1

        // Store name (bold, double size)
        add(ESC, 0x45, 0x01); // Bold ON
        add(GS, 0x21, 0x11);  // Double height + width
        addText((settings.store_name || 'TOKO') + '\n');
        add(GS, 0x21, 0x00);  // Normal size
        add(ESC, 0x45, 0x00); // Bold OFF

        // Address
        if (settings.store_address) {
            addText(settings.store_address + '\n');
        }

        // Phone
        if (settings.store_phone) {
            addText('Telp: ' + settings.store_phone + '\n');
        }

        // Invoice
        addText((transaction.invoice || '-') + '\n');

        // Divider
        addText('-'.repeat(WIDTH) + '\n');

        // ===== TRANSACTION INFO =====
        // Left align
        add(ESC, 0x61, 0x00); // ESC a 0

        const dateStr = this.formatDateOnly(transaction.created_at);
        const cashierName = transaction.cashier?.name || 'Kasir';
        const dateLineSpaces = Math.max(1, WIDTH - dateStr.length - cashierName.length);
        addText(dateStr + ' '.repeat(dateLineSpaces) + cashierName + '\n');
        addText(this.formatTimeOnly(transaction.created_at) + '\n');
        addText('-'.repeat(WIDTH) + '\n');

        // ===== ITEMS =====
        const details = transaction.details || [];
        let totalQty = 0;

        details.forEach((item, index) => {
            const productName = item.product?.title || 'Item';
            const variantName = item.variant_name ? ` (${item.variant_name})` : '';
            const name = (productName + variantName).substring(0, 40);

            const qty = Number(item.qty) || 1;
            const price = Number(item.price) || 0;
            const subtotal = qty * price;
            totalQty += qty;

            // Item name (bold)
            add(ESC, 0x45, 0x01);
            addText(`${index + 1}. ${name}\n`);
            add(ESC, 0x45, 0x00);

            // Qty x Price = Subtotal
            const qtyPrice = `   ${qty} x ${this.formatNumber(price)}`;
            const subtotalStr = 'Rp ' + this.formatNumber(subtotal);
            const spaces = Math.max(1, WIDTH - qtyPrice.length - subtotalStr.length);
            addText(qtyPrice + ' '.repeat(spaces) + subtotalStr + '\n\n');
        });

        addText('='.repeat(WIDTH) + '\n');

        // ===== TOTALS =====
        const grandTotal = Number(transaction.grand_total) || 0;
        const discount = Number(transaction.discount) || 0;
        const cash = Number(transaction.cash) || 0;
        const change = Number(transaction.change) || 0;
        const paymentMethod = transaction.payment_method || 'cash';

        const subtotal = details.reduce((sum, item) => {
            return sum + (Number(item.qty) || 1) * (Number(item.price) || 0);
        }, 0);

        addText('Total QTY : ' + totalQty + '\n');
        addText('-'.repeat(WIDTH) + '\n');

        // Sub Total
        addText(this.formatTotalLine('Sub Total', subtotal, WIDTH) + '\n');

        // Discount
        if (discount > 0) {
            addText(this.formatTotalLine('Diskon', -discount, WIDTH) + '\n');
        }

        // Tax (PPN)
        const tax = Number(transaction.tax) || 0;
        const ppn = Number(transaction.ppn) || 0;

        if (tax > 0) {
            let label = 'PPN';
            if (ppn > 0) {
                const ppnStr = ppn % 1 === 0 ? ppn.toFixed(0) : ppn.toString();
                label += ` (${ppnStr}%)`;
            }
            addText(this.formatTotalLine(label, tax, WIDTH) + '\n');
        }

        // Total (bold)
        addText('-'.repeat(WIDTH) + '\n');
        add(ESC, 0x45, 0x01);
        addText(this.formatTotalLine('Total', grandTotal, WIDTH) + '\n');
        add(ESC, 0x45, 0x00);

        // Payment method
        const methodLabels = {
            'cash': 'Bayar (Cash)',
            'transfer': 'Bayar (Transfer)',
            'qris': 'Bayar (QRIS)'
        };
        const methodLabel = methodLabels[paymentMethod] || 'Bayar';
        addText(this.formatTotalLine(methodLabel, cash, WIDTH) + '\n');

        // Change
        addText(this.formatTotalLine('Kembali', change, WIDTH) + '\n');
        addText('-'.repeat(WIDTH) + '\n');

        // ===== FOOTER =====
        // Center align
        add(ESC, 0x61, 0x01);
        add(LF);
        addText('Terimakasih Telah Berbelanja\n');

        if (settings.store_website) {
            addText(settings.store_website + '\n');
        }

        // Feed and cut
        add(LF, LF, LF);
        add(GS, 0x56, 0x00); // GS V 0 - Full cut

        return new Uint8Array(commands);
    }

    /**
     * Print receipt to USB thermal printer
     */
    static async printReceipt(transaction, settings = {}, openDrawer = false) {
        try {
            await this.ensureConnection();

            const commands = this.generateReceiptCommands(transaction, settings);
            await this.writer.write(commands);

            // Open cash drawer if requested (for cash payments)
            if (openDrawer && transaction.payment_method === 'cash') {
                await new Promise(resolve => setTimeout(resolve, 100)); // Small delay
                await this.openCashDrawer();
            }

            console.log('✓ Receipt printed successfully');
            return {
                success: true,
                message: 'Struk berhasil dicetak'
            };

        } catch (error) {
            console.error('Print error:', error);
            return {
                success: false,
                message: error.message || 'Gagal mencetak struk'
            };
        }
    }

    /**
     * Open cash drawer
     * ESC p m t1 t2
     */
    static async openCashDrawer() {
        try {
            await this.ensureConnection();

            // ESC p 0 25 250 - Standard drawer kick
            const command = new Uint8Array([0x1B, 0x70, 0x00, 0x19, 0xFA]);
            await this.writer.write(command);

            console.log('✓ Cash drawer opened');
            return {
                success: true,
                message: 'Laci kasir dibuka'
            };

        } catch (error) {
            console.error('Drawer error:', error);
            return {
                success: false,
                message: error.message || 'Gagal membuka laci kasir'
            };
        }
    }

    // ===== HELPER FUNCTIONS =====

    static formatNumber(num) {
        return Number(num || 0).toLocaleString('id-ID');
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

    static formatTotalLine(label, value, width = 48) {
        const valueStr = 'Rp ' + this.formatNumber(Math.abs(value));
        const prefix = value < 0 ? '-' : '';
        const fullValue = prefix + valueStr;
        const spaces = Math.max(1, width - label.length - fullValue.length);
        return label + ' '.repeat(spaces) + fullValue;
    }
}

export default SerialPrintService;
