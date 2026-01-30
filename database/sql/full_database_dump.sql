-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 30, 2026 at 09:55 AM
-- Server version: 11.8.3-MariaDB-log
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
SET FOREIGN_KEY_CHECKS = 0;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u495071025_posJulia`
--

-- --------------------------------------------------------
-- DROP TABLES FIRST
-- --------------------------------------------------------

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

-- --------------------------------------------------------

--
-- CATATAN: File SQL dump lengkap terlalu besar untuk ditulis secara otomatis.
-- 
-- Silakan SIMPAN file SQL dump dari phpMyAdmin langsung, lalu:
-- 1. Jalankan file drop_all_tables.sql terlebih dahulu
-- 2. Import file SQL dump Anda melalui phpMyAdmin
--
-- Atau saat import, centang opsi "Add DROP TABLE" di phpMyAdmin
--

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
