-- ===========================================
-- JALANKAN INI DULU SEBELUM IMPORT SQL DUMP
-- ===========================================

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `cache`;
DROP TABLE IF EXISTS `cache_locks`;
DROP TABLE IF EXISTS `carts`;
DROP TABLE IF EXISTS `cash_flows`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `displays`;
DROP TABLE IF EXISTS `display_stock`;
DROP TABLE IF EXISTS `expenses`;
DROP TABLE IF EXISTS `expense_categories`;
DROP TABLE IF EXISTS `failed_jobs`;
DROP TABLE IF EXISTS `jobs`;
DROP TABLE IF EXISTS `job_batches`;
DROP TABLE IF EXISTS `migrations`;
DROP TABLE IF EXISTS `model_has_permissions`;
DROP TABLE IF EXISTS `model_has_roles`;
DROP TABLE IF EXISTS `password_reset_tokens`;
DROP TABLE IF EXISTS `payment_settings`;
DROP TABLE IF EXISTS `permissions`;
DROP TABLE IF EXISTS `price_histories`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `product_ingredients`;
DROP TABLE IF EXISTS `product_variants`;
DROP TABLE IF EXISTS `product_variant_ingredients`;
DROP TABLE IF EXISTS `profits`;
DROP TABLE IF EXISTS `purchase_orders`;
DROP TABLE IF EXISTS `purchase_order_items`;
DROP TABLE IF EXISTS `returns`;
DROP TABLE IF EXISTS `return_items`;
DROP TABLE IF EXISTS `roles`;
DROP TABLE IF EXISTS `role_has_permissions`;
DROP TABLE IF EXISTS `sessions`;
DROP TABLE IF EXISTS `settings`;
DROP TABLE IF EXISTS `shifts`;
DROP TABLE IF EXISTS `stock_movements`;
DROP TABLE IF EXISTS `stock_opnames`;
DROP TABLE IF EXISTS `stock_opname_items`;
DROP TABLE IF EXISTS `suppliers`;
DROP TABLE IF EXISTS `transactions`;
DROP TABLE IF EXISTS `transaction_details`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `warehouses`;
DROP TABLE IF EXISTS `warehouse_stock`;

SET FOREIGN_KEY_CHECKS = 1;

-- ===========================================
-- SETELAH INI, IMPORT FILE: u495071025_posJulia (2).sql
-- ===========================================
SELECT 'All tables dropped! Now import your SQL dump.' as Status;
