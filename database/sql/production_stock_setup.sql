-- ===========================================
-- Production Stock Setup SQL
-- Jalankan di phpMyAdmin Hostinger
-- ===========================================

-- Disable Foreign Key Checks
SET FOREIGN_KEY_CHECKS = 0;

-- ===========================================
-- 1. Pastikan Display & Warehouse ada
-- ===========================================

INSERT IGNORE INTO displays (id, name, location, is_active, created_at, updated_at)
VALUES (1, 'Toko Utama', 'Store Front', 1, NOW(), NOW());

INSERT IGNORE INTO warehouses (id, name, location, is_active, created_at, updated_at)
VALUES (1, 'Gudang Utama', 'Pusat', 1, NOW(), NOW());

-- ===========================================
-- 2. Buat warehouse_stock untuk semua produk yang belum ada
-- ===========================================

INSERT INTO warehouse_stock (warehouse_id, product_id, quantity, min_stock, created_at, updated_at)
SELECT 1, p.id, 0, 5, NOW(), NOW()
FROM products p
WHERE NOT EXISTS (
    SELECT 1 FROM warehouse_stock ws 
    WHERE ws.warehouse_id = 1 AND ws.product_id = p.id
);

-- ===========================================
-- 3. Buat display_stock untuk semua produk yang belum ada
-- ===========================================

INSERT INTO display_stock (display_id, product_id, quantity, min_stock, created_at, updated_at)
SELECT 1, p.id, 0, 0, NOW(), NOW()
FROM products p
WHERE NOT EXISTS (
    SELECT 1 FROM display_stock ds 
    WHERE ds.display_id = 1 AND ds.product_id = p.id
);

-- Re-enable Foreign Key Checks
SET FOREIGN_KEY_CHECKS = 1;

-- ===========================================
-- Verifikasi hasil
-- ===========================================

SELECT 'Products' as tabel, COUNT(*) as total FROM products
UNION ALL
SELECT 'Warehouse Stock', COUNT(*) FROM warehouse_stock WHERE warehouse_id = 1
UNION ALL
SELECT 'Display Stock', COUNT(*) FROM display_stock WHERE display_id = 1;
