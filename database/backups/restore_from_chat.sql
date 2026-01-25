-- Database Backup
-- Generated: 2026-01-25 20:35:02
-- Database: u495071025_posJulia
-- --------------------------------------------------------

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------
-- Table structure for `cache`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `cache`;
CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('settings', 'a:5:{s:10:\"store_name\";s:15:\"Julia Freshmart\";s:13:\"store_address\";s:26:\"KM.11 Jalan Raya Uban Lama\";s:11:\"store_phone\";s:11:\"08912309239\";s:11:\"store_email\";s:15:\"julia@gmail.com\";s:10:\"store_logo\";s:14:\"store_logo.png\";}', 1769350794),
('spatie.permission.cache', 'a:3:{s:5:\"alias\";a:4:{s:1:\"a\";s:2:\"id\";s:1:\"b\";s:4:\"name\";s:1:\"c\";s:10:\"guard_name\";s:1:\"r\";s:5:\"roles\";}s:11:\"permissions\";a:61:{i:0;a:4:{s:1:\"a\";i:1;s:1:\"b\";s:16:\"dashboard-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:4:{i:0;i:2;i:1;i:3;i:2;i:4;i:3;i:5;}}i:1;a:3:{s:1:\"a\";i:2;s:1:\"b\";s:12:\"users-access\";s:1:\"c\";s:3:\"web\";}i:2;a:3:{s:1:\"a\";i:3;s:1:\"b\";s:12:\"users-create\";s:1:\"c\";s:3:\"web\";}i:3;a:3:{s:1:\"a\";i:4;s:1:\"b\";s:12:\"users-update\";s:1:\"c\";s:3:\"web\";}i:4;a:3:{s:1:\"a\";i:5;s:1:\"b\";s:12:\"users-delete\";s:1:\"c\";s:3:\"web\";}i:5;a:3:{s:1:\"a\";i:6;s:1:\"b\";s:12:\"roles-access\";s:1:\"c\";s:3:\"web\";}i:6;a:3:{s:1:\"a\";i:7;s:1:\"b\";s:12:\"roles-create\";s:1:\"c\";s:3:\"web\";}i:7;a:3:{s:1:\"a\";i:8;s:1:\"b\";s:12:\"roles-update\";s:1:\"c\";s:3:\"web\";}i:8;a:3:{s:1:\"a\";i:9;s:1:\"b\";s:12:\"roles-delete\";s:1:\"c\";s:3:\"web\";}i:9;a:3:{s:1:\"a\";i:10;s:1:\"b\";s:18:\"permissions-access\";s:1:\"c\";s:3:\"web\";}i:10;a:3:{s:1:\"a\";i:11;s:1:\"b\";s:18:\"permissions-create\";s:1:\"c\";s:3:\"web\";}i:11;a:3:{s:1:\"a\";i:12;s:1:\"b\";s:18:\"permissions-update\";s:1:\"c\";s:3:\"web\";}i:12;a:3:{s:1:\"a\";i:13;s:1:\"b\";s:18:\"permissions-delete\";s:1:\"c\";s:3:\"web\";}i:13;a:4:{s:1:\"a\";i:14;s:1:\"b\";s:17:\"categories-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:2;i:1;i:4;i:2;i:5;}}i:14;a:4:{s:1:\"a\";i:15;s:1:\"b\";s:17:\"categories-create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:15;a:4:{s:1:\"a\";i:16;s:1:\"b\";s:15:\"categories-edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:16;a:4:{s:1:\"a\";i:17;s:1:\"b\";s:17:\"categories-delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:17;a:4:{s:1:\"a\";i:18;s:1:\"b\";s:15:\"products-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:2;i:1;i:4;i:2;i:5;}}i:18;a:4:{s:1:\"a\";i:19;s:1:\"b\";s:15:\"products-create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:19;a:4:{s:1:\"a\";i:20;s:1:\"b\";s:13:\"products-edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:20;a:4:{s:1:\"a\";i:21;s:1:\"b\";s:15:\"products-delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:21;a:4:{s:1:\"a\";i:22;s:1:\"b\";s:16:\"customers-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:22;a:4:{s:1:\"a\";i:23;s:1:\"b\";s:16:\"customers-create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:23;a:4:{s:1:\"a\";i:24;s:1:\"b\";s:14:\"customers-edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:24;a:4:{s:1:\"a\";i:25;s:1:\"b\";s:16:\"customers-delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:25;a:4:{s:1:\"a\";i:26;s:1:\"b\";s:19:\"transactions-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:2;i:1;i:3;i:2;i:5;}}i:26;a:4:{s:1:\"a\";i:27;s:1:\"b\";s:14:\"reports-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:2;i:1;i:5;}}i:27;a:4:{s:1:\"a\";i:28;s:1:\"b\";s:14:\"profits-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:2;i:1;i:5;}}i:28;a:4:{s:1:\"a\";i:29;s:1:\"b\";s:23:\"payment-settings-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:2;i:1;i:5;}}i:29;a:4:{s:1:\"a\";i:30;s:1:\"b\";s:16:\"suppliers-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:2;i:1;i:4;i:2;i:5;}}i:30;a:4:{s:1:\"a\";i:31;s:1:\"b\";s:16:\"suppliers-create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:31;a:4:{s:1:\"a\";i:32;s:1:\"b\";s:14:\"suppliers-edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:32;a:4:{s:1:\"a\";i:33;s:1:\"b\";s:16:\"suppliers-delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:33;a:4:{s:1:\"a\";i:34;s:1:\"b\";s:17:\"warehouses-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:2;i:1;i:4;i:2;i:5;}}i:34;a:4:{s:1:\"a\";i:35;s:1:\"b\";s:17:\"warehouses-create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:35;a:4:{s:1:\"a\";i:36;s:1:\"b\";s:15:\"warehouses-edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:36;a:4:{s:1:\"a\";i:37;s:1:\"b\";s:17:\"warehouses-delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:37;a:4:{s:1:\"a\";i:38;s:1:\"b\";s:15:\"displays-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:2;i:1;i:4;i:2;i:5;}}i:38;a:4:{s:1:\"a\";i:39;s:1:\"b\";s:15:\"displays-create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:39;a:4:{s:1:\"a\";i:40;s:1:\"b\";s:13:\"displays-edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:40;a:4:{s:1:\"a\";i:41;s:1:\"b\";s:15:\"displays-delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:41;a:4:{s:1:\"a\";i:42;s:1:\"b\";s:22:\"stock-movements-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:2;i:1;i:4;i:2;i:5;}}i:42;a:4:{s:1:\"a\";i:43;s:1:\"b\";s:22:\"stock-movements-create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:4;i:1;i:5;}}i:43;a:4:{s:1:\"a\";i:44;s:1:\"b\";s:22:\"purchase-orders-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:2;i:1;i:4;i:2;i:5;}}i:44;a:4:{s:1:\"a\";i:45;s:1:\"b\";s:22:\"purchase-orders-create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:4;i:1;i:5;}}i:45;a:4:{s:1:\"a\";i:46;s:1:\"b\";s:20:\"purchase-orders-edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:4;i:1;i:5;}}i:46;a:4:{s:1:\"a\";i:47;s:1:\"b\";s:22:\"purchase-orders-delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:47;a:4:{s:1:\"a\";i:48;s:1:\"b\";s:13:\"shifts-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:3;i:1;i:5;}}i:48;a:4:{s:1:\"a\";i:49;s:1:\"b\";s:13:\"shifts-create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:3;i:1;i:5;}}i:49;a:4:{s:1:\"a\";i:50;s:1:\"b\";s:19:\"stock-opname-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:4;i:1;i:5;}}i:50;a:4:{s:1:\"a\";i:51;s:1:\"b\";s:19:\"stock-opname-create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:4;i:1;i:5;}}i:51;a:4:{s:1:\"a\";i:52;s:1:\"b\";s:14:\"returns-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:4;i:1;i:5;}}i:52;a:4:{s:1:\"a\";i:53;s:1:\"b\";s:14:\"returns-create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:4;i:1;i:5;}}i:53;a:4:{s:1:\"a\";i:54;s:1:\"b\";s:25:\"expense-categories-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:2;i:1;i:5;}}i:54;a:4:{s:1:\"a\";i:55;s:1:\"b\";s:25:\"expense-categories-create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:55;a:4:{s:1:\"a\";i:56;s:1:\"b\";s:23:\"expense-categories-edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:56;a:4:{s:1:\"a\";i:57;s:1:\"b\";s:25:\"expense-categories-delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:57;a:4:{s:1:\"a\";i:58;s:1:\"b\";s:15:\"expenses-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:2;i:1;i:5;}}i:58;a:4:{s:1:\"a\";i:59;s:1:\"b\";s:15:\"expenses-create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:59;a:4:{s:1:\"a\";i:60;s:1:\"b\";s:13:\"expenses-edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:60;a:4:{s:1:\"a\";i:61;s:1:\"b\";s:15:\"expenses-delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}}s:5:\"roles\";a:4:{i:0;a:3:{s:1:\"a\";i:2;s:1:\"b\";s:5:\"owner\";s:1:\"c\";s:3:\"web\";}i:1;a:3:{s:1:\"a\";i:3;s:1:\"b\";s:7:\"cashier\";s:1:\"c\";s:3:\"web\";}i:2;a:3:{s:1:\"a\";i:4;s:1:\"b\";s:9:\"warehouse\";s:1:\"c\";s:3:\"web\";}i:3;a:3:{s:1:\"a\";i:5;s:1:\"b\";s:5:\"admin\";s:1:\"c\";s:3:\"web\";}}}', 1769412075);

-- 2 rows exported from `cache`

-- --------------------------------------------------------
-- Table structure for `cache_locks`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for `carts`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `cashier_id` bigint(20) unsigned NOT NULL,
  `product_id` bigint(20) unsigned NOT NULL,
  `product_variant_id` bigint(20) unsigned DEFAULT NULL,
  `qty` decimal(10,3) NOT NULL,
  `price` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `carts_lookup_index` (`cashier_id`,`product_id`,`product_variant_id`),
  KEY `carts_product_variant_id_foreign` (`product_variant_id`),
  KEY `cart_product_idx` (`product_id`),
  CONSTRAINT `carts_cashier_id_foreign` FOREIGN KEY (`cashier_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `carts_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `carts_product_variant_id_foreign` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `carts` (`id`, `cashier_id`, `product_id`, `product_variant_id`, `qty`, `price`, `created_at`, `updated_at`) VALUES
(22, 3, 77, NULL, 0.350, 115000, '2026-01-25 19:11:45', '2026-01-25 19:11:45'),
(23, 3, 74, NULL, 1.000, 35000, '2026-01-25 19:12:18', '2026-01-25 19:12:18');

-- 2 rows exported from `carts`

-- --------------------------------------------------------
-- Table structure for `cash_flows`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `cash_flows`;
CREATE TABLE `cash_flows` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `shift_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `type` enum('in','out') NOT NULL COMMENT 'in = cash received, out = cash paid',
  `amount` decimal(15,2) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cash_flows_user_id_foreign` (`user_id`),
  KEY `cash_flows_shift_id_type_index` (`shift_id`,`type`),
  CONSTRAINT `cash_flows_shift_id_foreign` FOREIGN KEY (`shift_id`) REFERENCES `shifts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cash_flows_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for `categories`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `categories` (`id`, `name`, `description`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Sayuran', 'Kategori Sayuran', NULL, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(2, 'Umbi & Akar', 'Kategori Umbi & Akar', NULL, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(3, 'Jamur', 'Kategori Jamur', NULL, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(4, 'Kacang-Kacangan', 'Kategori Kacang-Kacangan', NULL, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(5, 'Produk Olahan', 'Kategori Produk Olahan', NULL, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(6, 'Daging Ayam', 'Kategori Daging Ayam', NULL, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(7, 'Buah', 'Kategori Buah', NULL, '2026-01-25 14:21:03', '2026-01-25 14:21:03');

-- 7 rows exported from `categories`

-- --------------------------------------------------------
-- Table structure for `display_stock`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `display_stock`;
CREATE TABLE `display_stock` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `display_id` bigint(20) unsigned NOT NULL,
  `product_id` bigint(20) unsigned NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `min_stock` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `display_stock_display_id_product_id_unique` (`display_id`,`product_id`),
  KEY `display_stock_product_id_foreign` (`product_id`),
  CONSTRAINT `display_stock_display_id_foreign` FOREIGN KEY (`display_id`) REFERENCES `displays` (`id`) ON DELETE CASCADE,
  CONSTRAINT `display_stock_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `display_stock` (`id`, `display_id`, `product_id`, `quantity`, `min_stock`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 10, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(2, 1, 2, 10, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(3, 1, 3, 35, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(4, 1, 4, 6, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(5, 1, 5, 3, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(6, 1, 6, 11, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(7, 1, 7, 23, 0, '2026-01-25 14:21:03', '2026-01-25 18:37:16'),
(8, 1, 8, 10, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(9, 1, 9, 3, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(10, 1, 10, 2, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(11, 1, 11, 5, 0, '2026-01-25 14:21:03', '2026-01-25 18:37:16'),
(12, 1, 12, 4, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(13, 1, 13, 2, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(14, 1, 14, 40, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(15, 1, 15, 24, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(16, 1, 16, 30, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(17, 1, 17, 42, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(18, 1, 18, 32, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(19, 1, 19, 25, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(20, 1, 20, 26, 0, '2026-01-25 14:21:03', '2026-01-25 16:17:19'),
(21, 1, 21, 23, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(22, 1, 22, 38, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(23, 1, 23, 95, 0, '2026-01-25 14:21:03', '2026-01-25 16:17:19'),
(24, 1, 24, 3, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(25, 1, 25, 3, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(26, 1, 26, 99, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(27, 1, 27, 178, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(28, 1, 28, 0, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(29, 1, 29, 0, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(30, 1, 30, 0, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(31, 1, 31, 0, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(32, 1, 32, 0, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(33, 1, 33, 0, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(34, 1, 34, 0, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(35, 1, 35, 0, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(36, 1, 36, 0, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(37, 1, 37, 0, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(38, 1, 38, 0, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(39, 1, 39, 0, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(40, 1, 40, 0, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(41, 1, 41, 0, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(42, 1, 42, 0, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(43, 1, 43, 0, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(44, 1, 44, 0, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(45, 1, 45, 0, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(46, 1, 46, 0, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(47, 1, 47, 0, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(48, 1, 48, 10, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(49, 1, 49, 39, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(50, 1, 50, 8, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(51, 1, 51, 4, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(52, 1, 52, 13, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(53, 1, 53, 7, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(54, 1, 54, 22, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(55, 1, 55, 24, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(56, 1, 56, 10, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(57, 1, 57, 12, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(58, 1, 58, 10, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(59, 1, 59, 32, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(60, 1, 60, 29, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(61, 1, 61, 14, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(62, 1, 62, 18, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(63, 1, 63, 12, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(64, 1, 64, 20, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(65, 1, 65, 8, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(66, 1, 66, 11, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(67, 1, 67, 20, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(68, 1, 68, 30, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(69, 1, 69, 8, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(70, 1, 70, 13, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(71, 1, 71, 19, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(72, 1, 72, 24, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(73, 1, 73, 75, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(74, 1, 74, 62, 0, '2026-01-25 14:21:03', '2026-01-25 15:46:34'),
(75, 1, 75, 3, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(76, 1, 76, 5, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(77, 1, 77, 9, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(78, 1, 78, 24, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(79, 1, 79, 54, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(80, 1, 80, 14, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(81, 1, 81, 63, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(82, 1, 82, 20, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(83, 1, 83, 78, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(84, 1, 84, 12, 0, '2026-01-25 14:21:03', '2026-01-25 15:27:39'),
(85, 1, 85, 22, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(86, 1, 86, 22, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(87, 1, 87, 4, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(88, 1, 88, 134, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(89, 1, 89, 44, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(90, 1, 90, 13, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(91, 1, 91, 118, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(92, 1, 92, 17, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(93, 1, 93, 15, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(94, 1, 94, 17, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(95, 1, 95, 45, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(96, 1, 96, 10, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(97, 1, 97, 68, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(98, 1, 98, 7, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(99, 1, 99, 128, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(100, 1, 100, 112, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03');

INSERT INTO `display_stock` (`id`, `display_id`, `product_id`, `quantity`, `min_stock`, `created_at`, `updated_at`) VALUES
(101, 1, 101, 34, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(102, 1, 102, 20, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(103, 1, 103, 5, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(104, 1, 104, 5, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(105, 1, 105, 5, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(106, 1, 106, 36, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(107, 1, 107, 5, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(108, 1, 108, 5, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(109, 1, 109, 10, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(110, 1, 110, 16, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(111, 1, 111, 50, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(112, 1, 112, 4, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(113, 1, 113, 17, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(114, 1, 114, 7, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03'),
(115, 1, 115, 2, 0, '2026-01-25 14:21:03', '2026-01-25 14:21:03');

-- 115 rows exported from `display_stock`

-- --------------------------------------------------------
-- Table structure for `displays`
-- --------------------------------------------------------

DROP TABLE IF EXISTS `displays`;
CREATE TABLE `displays` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `displays` (`id`, `name`, `location`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Display Lantai 1', '-', 1, '2026-01-25 14:21:03', '2026-01-25 14:21:03');

-- 1 rows exported from `displays`

-- --------------------------------------------------------
-- Table structure for `posts` (omitted for brevity, user data follows)
-- ...
