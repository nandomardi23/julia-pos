-- ===========================================
-- RESET Stock ke Fresh Start (Qty = 0)
-- HATI-HATI: Ini akan menghapus semua data stok!
-- ===========================================

-- Disable Foreign Key Checks
SET FOREIGN_KEY_CHECKS = 0;

-- Truncate semua tabel terkait stok
TRUNCATE TABLE stock_movements;
TRUNCATE TABLE display_stock;
TRUNCATE TABLE warehouse_stock;

-- Pastikan Display & Warehouse ada
INSERT IGNORE INTO displays (id, name, location, is_active, created_at, updated_at)
VALUES (1, 'Toko Utama', 'Store Front', 1, NOW(), NOW());

INSERT IGNORE INTO warehouses (id, name, location, is_active, created_at, updated_at)
VALUES (1, 'Gudang Utama', 'Pusat', 1, NOW(), NOW());

-- Buat warehouse_stock untuk semua produk (qty = 0)
INSERT INTO warehouse_stock (warehouse_id, product_id, quantity, min_stock, created_at, updated_at)
SELECT 1, id, 0, 5, NOW(), NOW() FROM products;

-- Buat display_stock untuk semua produk (qty = 0)
INSERT INTO display_stock (display_id, product_id, quantity, min_stock, created_at, updated_at)
SELECT 1, id, 0, 0, NOW(), NOW() FROM products;

-- Re-enable Foreign Key Checks
SET FOREIGN_KEY_CHECKS = 1;

-- Verifikasi
SELECT 'Products' as tabel, COUNT(*) as total FROM products
UNION ALL
SELECT 'Warehouse Stock', COUNT(*) FROM warehouse_stock
UNION ALL
SELECT 'Display Stock', COUNT(*) FROM display_stock
UNION ALL
SELECT 'Stock Movements', COUNT(*) FROM stock_movements;
