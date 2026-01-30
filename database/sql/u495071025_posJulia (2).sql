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


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u495071025_posJulia`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('admin@admin|2404:c0:5010::dbe:a750', 'i:1;', 1769603352),
('admin@admin|2404:c0:5010::dbe:a750:timer', 'i:1769603352;', 1769603352),
('settings', 'a:5:{s:10:\"store_name\";s:15:\"Julia Freshmart\";s:13:\"store_address\";s:26:\"KM.11 Jalan Raya Uban Lama\";s:11:\"store_phone\";s:9:\"081234567\";s:11:\"store_email\";s:17:\"julia@example.com\";s:10:\"store_logo\";s:14:\"store_logo.png\";}', 1769769123),
('spatie.permission.cache', 'a:3:{s:5:\"alias\";a:4:{s:1:\"a\";s:2:\"id\";s:1:\"b\";s:4:\"name\";s:1:\"c\";s:10:\"guard_name\";s:1:\"r\";s:5:\"roles\";}s:11:\"permissions\";a:61:{i:0;a:4:{s:1:\"a\";i:1;s:1:\"b\";s:16:\"dashboard-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:4:{i:0;i:2;i:1;i:3;i:2;i:4;i:3;i:5;}}i:1;a:3:{s:1:\"a\";i:2;s:1:\"b\";s:12:\"users-access\";s:1:\"c\";s:3:\"web\";}i:2;a:3:{s:1:\"a\";i:3;s:1:\"b\";s:12:\"users-create\";s:1:\"c\";s:3:\"web\";}i:3;a:3:{s:1:\"a\";i:4;s:1:\"b\";s:12:\"users-update\";s:1:\"c\";s:3:\"web\";}i:4;a:3:{s:1:\"a\";i:5;s:1:\"b\";s:12:\"users-delete\";s:1:\"c\";s:3:\"web\";}i:5;a:3:{s:1:\"a\";i:6;s:1:\"b\";s:12:\"roles-access\";s:1:\"c\";s:3:\"web\";}i:6;a:3:{s:1:\"a\";i:7;s:1:\"b\";s:12:\"roles-create\";s:1:\"c\";s:3:\"web\";}i:7;a:3:{s:1:\"a\";i:8;s:1:\"b\";s:12:\"roles-update\";s:1:\"c\";s:3:\"web\";}i:8;a:3:{s:1:\"a\";i:9;s:1:\"b\";s:12:\"roles-delete\";s:1:\"c\";s:3:\"web\";}i:9;a:3:{s:1:\"a\";i:10;s:1:\"b\";s:18:\"permissions-access\";s:1:\"c\";s:3:\"web\";}i:10;a:3:{s:1:\"a\";i:11;s:1:\"b\";s:18:\"permissions-create\";s:1:\"c\";s:3:\"web\";}i:11;a:3:{s:1:\"a\";i:12;s:1:\"b\";s:18:\"permissions-update\";s:1:\"c\";s:3:\"web\";}i:12;a:3:{s:1:\"a\";i:13;s:1:\"b\";s:18:\"permissions-delete\";s:1:\"c\";s:3:\"web\";}i:13;a:4:{s:1:\"a\";i:14;s:1:\"b\";s:17:\"categories-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:2;i:1;i:4;i:2;i:5;}}i:14;a:4:{s:1:\"a\";i:15;s:1:\"b\";s:17:\"categories-create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:15;a:4:{s:1:\"a\";i:16;s:1:\"b\";s:15:\"categories-edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:16;a:4:{s:1:\"a\";i:17;s:1:\"b\";s:17:\"categories-delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:17;a:4:{s:1:\"a\";i:18;s:1:\"b\";s:15:\"products-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:2;i:1;i:4;i:2;i:5;}}i:18;a:4:{s:1:\"a\";i:19;s:1:\"b\";s:15:\"products-create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:19;a:4:{s:1:\"a\";i:20;s:1:\"b\";s:13:\"products-edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:20;a:4:{s:1:\"a\";i:21;s:1:\"b\";s:15:\"products-delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:21;a:4:{s:1:\"a\";i:22;s:1:\"b\";s:16:\"customers-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:22;a:4:{s:1:\"a\";i:23;s:1:\"b\";s:16:\"customers-create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:23;a:4:{s:1:\"a\";i:24;s:1:\"b\";s:14:\"customers-edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:24;a:4:{s:1:\"a\";i:25;s:1:\"b\";s:16:\"customers-delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:25;a:4:{s:1:\"a\";i:26;s:1:\"b\";s:19:\"transactions-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:2;i:1;i:3;i:2;i:5;}}i:26;a:4:{s:1:\"a\";i:27;s:1:\"b\";s:14:\"reports-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:2;i:1;i:5;}}i:27;a:4:{s:1:\"a\";i:28;s:1:\"b\";s:14:\"profits-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:2;i:1;i:5;}}i:28;a:4:{s:1:\"a\";i:29;s:1:\"b\";s:23:\"payment-settings-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:2;i:1;i:5;}}i:29;a:4:{s:1:\"a\";i:30;s:1:\"b\";s:16:\"suppliers-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:2;i:1;i:4;i:2;i:5;}}i:30;a:4:{s:1:\"a\";i:31;s:1:\"b\";s:16:\"suppliers-create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:31;a:4:{s:1:\"a\";i:32;s:1:\"b\";s:14:\"suppliers-edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:32;a:4:{s:1:\"a\";i:33;s:1:\"b\";s:16:\"suppliers-delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:33;a:4:{s:1:\"a\";i:34;s:1:\"b\";s:17:\"warehouses-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:2;i:1;i:4;i:2;i:5;}}i:34;a:4:{s:1:\"a\";i:35;s:1:\"b\";s:17:\"warehouses-create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:35;a:4:{s:1:\"a\";i:36;s:1:\"b\";s:15:\"warehouses-edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:36;a:4:{s:1:\"a\";i:37;s:1:\"b\";s:17:\"warehouses-delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:37;a:4:{s:1:\"a\";i:38;s:1:\"b\";s:15:\"displays-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:2;i:1;i:4;i:2;i:5;}}i:38;a:4:{s:1:\"a\";i:39;s:1:\"b\";s:15:\"displays-create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:39;a:4:{s:1:\"a\";i:40;s:1:\"b\";s:13:\"displays-edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:40;a:4:{s:1:\"a\";i:41;s:1:\"b\";s:15:\"displays-delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:41;a:4:{s:1:\"a\";i:42;s:1:\"b\";s:22:\"stock-movements-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:2;i:1;i:4;i:2;i:5;}}i:42;a:4:{s:1:\"a\";i:43;s:1:\"b\";s:22:\"stock-movements-create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:4;i:1;i:5;}}i:43;a:4:{s:1:\"a\";i:44;s:1:\"b\";s:22:\"purchase-orders-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:2;i:1;i:4;i:2;i:5;}}i:44;a:4:{s:1:\"a\";i:45;s:1:\"b\";s:22:\"purchase-orders-create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:4;i:1;i:5;}}i:45;a:4:{s:1:\"a\";i:46;s:1:\"b\";s:20:\"purchase-orders-edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:4;i:1;i:5;}}i:46;a:4:{s:1:\"a\";i:47;s:1:\"b\";s:22:\"purchase-orders-delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:47;a:4:{s:1:\"a\";i:48;s:1:\"b\";s:13:\"shifts-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:3;i:1;i:5;}}i:48;a:4:{s:1:\"a\";i:49;s:1:\"b\";s:13:\"shifts-create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:3;i:1;i:5;}}i:49;a:4:{s:1:\"a\";i:50;s:1:\"b\";s:19:\"stock-opname-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:4;i:1;i:5;}}i:50;a:4:{s:1:\"a\";i:51;s:1:\"b\";s:19:\"stock-opname-create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:4;i:1;i:5;}}i:51;a:4:{s:1:\"a\";i:52;s:1:\"b\";s:14:\"returns-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:4;i:1;i:5;}}i:52;a:4:{s:1:\"a\";i:53;s:1:\"b\";s:14:\"returns-create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:4;i:1;i:5;}}i:53;a:4:{s:1:\"a\";i:54;s:1:\"b\";s:25:\"expense-categories-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:2;i:1;i:5;}}i:54;a:4:{s:1:\"a\";i:55;s:1:\"b\";s:25:\"expense-categories-create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:55;a:4:{s:1:\"a\";i:56;s:1:\"b\";s:23:\"expense-categories-edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:56;a:4:{s:1:\"a\";i:57;s:1:\"b\";s:25:\"expense-categories-delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:57;a:4:{s:1:\"a\";i:58;s:1:\"b\";s:15:\"expenses-access\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:2;i:1;i:5;}}i:58;a:4:{s:1:\"a\";i:59;s:1:\"b\";s:15:\"expenses-create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:59;a:4:{s:1:\"a\";i:60;s:1:\"b\";s:13:\"expenses-edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}i:60;a:4:{s:1:\"a\";i:61;s:1:\"b\";s:15:\"expenses-delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:5;}}}s:5:\"roles\";a:4:{i:0;a:3:{s:1:\"a\";i:2;s:1:\"b\";s:5:\"owner\";s:1:\"c\";s:3:\"web\";}i:1;a:3:{s:1:\"a\";i:3;s:1:\"b\";s:7:\"cashier\";s:1:\"c\";s:3:\"web\";}i:2;a:3:{s:1:\"a\";i:4;s:1:\"b\";s:9:\"warehouse\";s:1:\"c\";s:3:\"web\";}i:3;a:3:{s:1:\"a\";i:5;s:1:\"b\";s:5:\"admin\";s:1:\"c\";s:3:\"web\";}}}', 1769826661),
('suciramadantia2@gmail.comm|103.152.235.19', 'i:2;', 1769765869),
('suciramadantia2@gmail.comm|103.152.235.19:timer', 'i:1769765869;', 1769765869);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cashier_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `product_variant_id` bigint(20) UNSIGNED DEFAULT NULL,
  `qty` decimal(10,3) NOT NULL,
  `price` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cash_flows`
--

CREATE TABLE `cash_flows` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `shift_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `type` enum('in','out') NOT NULL COMMENT 'in = cash received, out = cash paid',
  `amount` decimal(15,2) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Sayuran', 'Kategori Sayuran', NULL, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(2, 'Kacang-Kacangan', 'Kategori Kacang-Kacangan', NULL, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(3, 'Umbi & Akar', 'Kategori Umbi & Akar', NULL, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(4, 'Jamur', 'Kategori Jamur', NULL, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(5, 'Produk Olahan', 'Kategori Produk Olahan', NULL, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(6, 'Daging Ayam', 'Kategori Daging Ayam', NULL, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(7, 'Buah', 'Kategori Buah', NULL, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(8, 'Jus', 'Kategori Jus', NULL, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(9, 'Makanan Berat', 'Kategori Makanan Berat', NULL, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(10, 'Makanan Ringan', 'Kategori Makanan Ringan', NULL, '2026-01-25 22:04:26', '2026-01-25 22:04:26');

-- --------------------------------------------------------

--
-- Table structure for table `displays`
--

CREATE TABLE `displays` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `displays`
--

INSERT INTO `displays` (`id`, `name`, `location`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Toko Utama', 'Store Front', 1, '2026-01-27 08:23:45', '2026-01-27 08:23:45');

-- --------------------------------------------------------

--
-- Table structure for table `display_stock`
--

CREATE TABLE `display_stock` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `display_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` decimal(15,3) NOT NULL DEFAULT 0.000,
  `min_stock` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `display_stock`
--

INSERT INTO `display_stock` (`id`, `display_id`, `product_id`, `quantity`, `min_stock`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 10.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(2, 1, 2, 6.110, 0, '2026-01-27 08:23:45', '2026-01-29 21:02:53'),
(3, 1, 3, 34.000, 0, '2026-01-27 08:23:45', '2026-01-27 17:15:12'),
(4, 1, 4, 2.365, 0, '2026-01-27 08:23:45', '2026-01-29 15:13:18'),
(5, 1, 5, 2.495, 0, '2026-01-27 08:23:45', '2026-01-30 11:37:37'),
(6, 1, 6, 9.210, 0, '2026-01-27 08:23:45', '2026-01-29 17:54:36'),
(7, 1, 7, 23.235, 0, '2026-01-27 08:23:45', '2026-01-29 12:11:57'),
(8, 1, 8, 9.660, 0, '2026-01-27 08:23:45', '2026-01-29 19:27:07'),
(9, 1, 9, 6.370, 0, '2026-01-27 08:23:45', '2026-01-30 15:11:22'),
(10, 1, 10, 1.500, 0, '2026-01-27 08:23:45', '2026-01-27 19:16:51'),
(11, 1, 11, 5.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(12, 1, 12, 4.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(13, 1, 13, 2.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(14, 1, 14, 37.000, 0, '2026-01-27 08:23:45', '2026-01-30 14:57:37'),
(15, 1, 15, 18.000, 0, '2026-01-27 08:23:45', '2026-01-29 14:21:50'),
(16, 1, 16, 27.000, 0, '2026-01-27 08:23:45', '2026-01-29 12:13:22'),
(17, 1, 17, 38.000, 0, '2026-01-27 08:23:45', '2026-01-30 14:57:37'),
(18, 1, 18, 119.000, 0, '2026-01-27 08:23:45', '2026-01-29 19:29:03'),
(19, 1, 19, 20.000, 0, '2026-01-27 08:23:45', '2026-01-28 09:46:52'),
(20, 1, 20, 40.000, 0, '2026-01-27 08:23:45', '2026-01-30 15:26:19'),
(21, 1, 21, 22.000, 0, '2026-01-27 08:23:45', '2026-01-30 16:46:48'),
(22, 1, 22, 35.000, 0, '2026-01-27 08:23:45', '2026-01-28 19:49:33'),
(23, 1, 23, 89.270, 0, '2026-01-27 08:23:45', '2026-01-30 13:32:19'),
(24, 1, 24, 2.970, 0, '2026-01-27 08:23:45', '2026-01-27 17:45:53'),
(25, 1, 25, 3.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(26, 1, 26, 94.000, 0, '2026-01-27 08:23:45', '2026-01-29 15:14:46'),
(27, 1, 27, 165.000, 0, '2026-01-27 08:23:45', '2026-01-30 16:39:12'),
(28, 1, 28, 161.000, 0, '2026-01-27 08:23:45', '2026-01-29 15:04:50'),
(29, 1, 29, 151.000, 0, '2026-01-27 08:23:45', '2026-01-30 15:26:19'),
(30, 1, 30, 45.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(31, 1, 31, 30.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(32, 1, 32, 30.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(33, 1, 33, 20.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(34, 1, 34, 19.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(35, 1, 35, 19.000, 0, '2026-01-27 08:23:45', '2026-01-29 22:32:49'),
(36, 1, 36, 26.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(37, 1, 37, 10.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(38, 1, 38, 10.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(39, 1, 39, 6.600, 0, '2026-01-27 08:23:45', '2026-01-30 16:46:48'),
(40, 1, 40, 103.000, 0, '2026-01-27 08:23:45', '2026-01-29 17:51:13'),
(41, 1, 41, 10.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(42, 1, 42, 33.885, 0, '2026-01-27 08:23:45', '2026-01-29 17:13:30'),
(43, 1, 43, 8.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(44, 1, 44, 4.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(45, 1, 45, 13.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(46, 1, 46, 15.000, 0, '2026-01-27 08:23:45', '2026-01-30 14:55:54'),
(47, 1, 47, 15.000, 0, '2026-01-27 08:23:45', '2026-01-29 19:31:59'),
(48, 1, 48, 18.000, 0, '2026-01-27 08:23:45', '2026-01-30 14:55:54'),
(49, 1, 49, 8.170, 0, '2026-01-27 08:23:45', '2026-01-30 14:55:54'),
(50, 1, 50, 6.000, 0, '2026-01-27 08:23:45', '2026-01-30 16:39:12'),
(51, 1, 51, 6.000, 0, '2026-01-27 08:23:45', '2026-01-29 15:04:50'),
(52, 1, 52, 11.000, 0, '2026-01-27 08:23:45', '2026-01-30 11:34:51'),
(53, 1, 53, 28.000, 0, '2026-01-27 08:23:45', '2026-01-30 16:39:12'),
(54, 1, 54, 13.000, 0, '2026-01-27 08:23:45', '2026-01-28 11:24:28'),
(55, 1, 55, 14.000, 0, '2026-01-27 08:23:45', '2026-01-28 21:18:40'),
(56, 1, 56, 10.000, 0, '2026-01-27 08:23:45', '2026-01-29 18:22:56'),
(57, 1, 57, 20.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(58, 1, 58, 7.250, 0, '2026-01-27 08:23:45', '2026-01-28 21:17:10'),
(59, 1, 59, 12.000, 0, '2026-01-27 08:23:45', '2026-01-28 09:47:53'),
(60, 1, 60, 19.000, 0, '2026-01-27 08:23:45', '2026-01-27 20:19:00'),
(61, 1, 61, 27.000, 0, '2026-01-27 08:23:45', '2026-01-29 19:18:00'),
(62, 1, 62, 6.000, 0, '2026-01-27 08:23:45', '2026-01-30 16:39:12'),
(63, 1, 63, 12.495, 0, '2026-01-27 08:23:45', '2026-01-29 21:08:33'),
(64, 1, 64, 15.000, 0, '2026-01-27 08:23:45', '2026-01-28 21:17:10'),
(65, 1, 65, 15.000, 0, '2026-01-27 08:23:45', '2026-01-30 09:31:39'),
(66, 1, 66, 62.000, 0, '2026-01-27 08:23:45', '2026-01-30 11:32:40'),
(67, 1, 67, 49.000, 0, '2026-01-27 08:23:45', '2026-01-30 14:57:37'),
(68, 1, 68, 1.000, 0, '2026-01-27 08:23:45', '2026-01-28 19:16:28'),
(69, 1, 69, 3.600, 0, '2026-01-27 08:23:45', '2026-01-30 16:39:12'),
(70, 1, 70, 7.635, 0, '2026-01-27 08:23:45', '2026-01-29 19:31:59'),
(71, 1, 71, 22.000, 0, '2026-01-27 08:23:45', '2026-01-27 19:21:14'),
(72, 1, 72, 47.000, 0, '2026-01-27 08:23:45', '2026-01-29 19:27:07'),
(73, 1, 73, 11.000, 0, '2026-01-27 08:23:45', '2026-01-30 11:34:51'),
(74, 1, 74, 58.000, 0, '2026-01-27 08:23:45', '2026-01-29 19:31:59'),
(75, 1, 75, 17.000, 0, '2026-01-27 08:23:45', '2026-01-30 14:55:54'),
(76, 1, 76, 77.000, 0, '2026-01-27 08:23:45', '2026-01-27 20:59:56'),
(77, 1, 77, 12.000, 0, '2026-01-27 08:23:45', '2026-01-28 20:02:57'),
(78, 1, 78, 20.175, 0, '2026-01-27 08:23:45', '2026-01-29 21:14:06'),
(79, 1, 79, 21.000, 0, '2026-01-27 08:23:45', '2026-01-30 14:55:54'),
(80, 1, 80, 1.000, 0, '2026-01-27 08:23:45', '2026-01-30 15:01:59'),
(81, 1, 81, 126.715, 0, '2026-01-27 08:23:45', '2026-01-30 16:50:40'),
(82, 1, 82, 34.570, 0, '2026-01-27 08:23:45', '2026-01-30 14:55:54'),
(83, 1, 83, 6.335, 0, '2026-01-27 08:23:45', '2026-01-30 09:38:30'),
(84, 1, 84, 106.960, 0, '2026-01-27 08:23:45', '2026-01-29 19:29:03'),
(85, 1, 85, 9.830, 0, '2026-01-27 08:23:45', '2026-01-30 09:38:30'),
(86, 1, 86, 13.450, 0, '2026-01-27 08:23:45', '2026-01-28 08:37:10'),
(87, 1, 87, 12.340, 0, '2026-01-27 08:23:45', '2026-01-30 10:15:34'),
(88, 1, 88, 42.430, 0, '2026-01-27 08:23:45', '2026-01-30 12:29:11'),
(89, 1, 89, 7.630, 0, '2026-01-27 08:23:45', '2026-01-29 17:53:22'),
(90, 1, 90, 66.955, 0, '2026-01-27 08:23:45', '2026-01-29 12:17:52'),
(91, 1, 91, 7.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(92, 1, 92, 128.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(93, 1, 93, 112.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(94, 1, 94, 34.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(95, 1, 95, 20.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(96, 1, 96, 5.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(97, 1, 97, 5.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(98, 1, 98, 4.000, 0, '2026-01-27 08:23:45', '2026-01-29 22:32:49'),
(99, 1, 99, 36.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(100, 1, 100, 5.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(101, 1, 101, 5.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(102, 1, 102, 9.555, 0, '2026-01-27 08:23:45', '2026-01-29 17:22:36'),
(103, 1, 103, 25.655, 0, '2026-01-27 08:23:45', '2026-01-30 15:11:22'),
(104, 1, 104, 48.305, 0, '2026-01-27 08:23:45', '2026-01-30 11:32:40'),
(105, 1, 105, 18.000, 0, '2026-01-27 08:23:45', '2026-01-30 15:01:59'),
(106, 1, 106, 8.000, 0, '2026-01-27 08:23:45', '2026-01-30 10:44:07'),
(107, 1, 107, 5.540, 0, '2026-01-27 08:23:45', '2026-01-29 15:13:18'),
(108, 1, 108, 5.000, 0, '2026-01-27 08:23:45', '2026-01-29 18:33:43'),
(109, 1, 109, 6.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(110, 1, 110, 5.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(111, 1, 111, 21.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(112, 1, 112, 9.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(113, 1, 115, 12.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(114, 1, 116, 6.000, 0, '2026-01-27 08:23:45', '2026-01-27 19:45:29'),
(115, 1, 117, 12.000, 0, '2026-01-27 08:23:45', '2026-01-29 19:29:03'),
(116, 1, 118, 9.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(117, 1, 119, 38.000, 0, '2026-01-27 08:23:45', '2026-01-28 18:44:03'),
(118, 1, 120, 20.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(119, 1, 121, 2.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(120, 1, 122, 16.095, 0, '2026-01-27 08:23:45', '2026-01-29 10:52:52'),
(121, 1, 123, 30.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(122, 1, 124, 18.000, 0, '2026-01-27 08:23:45', '2026-01-30 16:46:48'),
(123, 1, 125, 3.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(124, 1, 126, 7.386, 0, '2026-01-27 08:23:45', '2026-01-30 16:46:48'),
(125, 1, 127, 16.640, 0, '2026-01-27 08:23:45', '2026-01-29 10:52:52'),
(126, 1, 128, 8.795, 0, '2026-01-27 08:23:45', '2026-01-28 09:46:52'),
(127, 1, 129, 10.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(128, 1, 130, 10.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(129, 1, 131, 6.000, 0, '2026-01-27 08:23:45', '2026-01-28 19:55:08'),
(130, 1, 132, 38.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(131, 1, 133, 8.000, 0, '2026-01-27 08:23:45', '2026-01-28 22:04:11'),
(132, 1, 134, 6.000, 0, '2026-01-27 08:23:45', '2026-01-28 15:09:39'),
(133, 1, 135, 6.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(134, 1, 136, 40.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(135, 1, 137, 40.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(136, 1, 138, 39.000, 0, '2026-01-27 08:23:45', '2026-01-30 15:26:19'),
(137, 1, 139, 40.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(138, 1, 140, 40.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(139, 1, 141, 40.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(140, 1, 142, 40.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(141, 1, 143, 40.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(142, 1, 144, 40.000, 0, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(143, 1, 169, 9.000, 0, '2026-01-27 16:56:37', '2026-01-28 18:08:11'),
(144, 1, 168, 73.565, 0, '2026-01-27 17:12:26', '2026-01-29 18:13:52'),
(145, 1, 170, 11.470, 0, '2026-01-27 17:28:36', '2026-01-30 10:24:50'),
(146, 1, 171, 7.000, 0, '2026-01-27 17:40:37', '2026-01-30 11:32:40'),
(147, 1, 162, 5.000, 0, '2026-01-27 17:43:57', '2026-01-28 16:56:08'),
(148, 1, 166, 2.000, 0, '2026-01-27 18:06:46', '2026-01-28 21:17:10'),
(149, 1, 174, 14.000, 0, '2026-01-27 18:11:17', '2026-01-28 17:18:15'),
(150, 1, 175, 4.000, 0, '2026-01-27 18:37:00', '2026-01-29 12:15:35'),
(151, 1, 164, 8.000, 0, '2026-01-27 18:41:55', '2026-01-29 17:41:19'),
(152, 1, 158, 13.000, 0, '2026-01-27 18:45:05', '2026-01-27 18:45:05'),
(153, 1, 176, 9.905, 0, '2026-01-27 18:52:49', '2026-01-28 20:23:51'),
(154, 1, 177, 8.715, 0, '2026-01-27 20:47:32', '2026-01-28 20:01:55'),
(155, 1, 178, 1.650, 0, '2026-01-27 20:48:18', '2026-01-30 15:11:22'),
(156, 1, 179, 12.520, 0, '2026-01-27 20:49:38', '2026-01-29 21:16:08'),
(157, 1, 180, 2.115, 0, '2026-01-27 20:50:10', '2026-01-30 11:37:37'),
(158, 1, 181, 10.000, 0, '2026-01-27 20:50:44', '2026-01-27 20:50:44'),
(159, 1, 182, 2.200, 0, '2026-01-27 20:51:31', '2026-01-29 19:20:55'),
(160, 1, 183, 2.000, 0, '2026-01-27 21:56:08', '2026-01-28 15:47:19'),
(161, 1, 184, 10.000, 0, '2026-01-27 22:03:13', '2026-01-29 13:51:20'),
(162, 1, 185, 0.775, 0, '2026-01-27 22:51:58', '2026-01-28 09:46:52'),
(163, 1, 188, 24.475, 0, '2026-01-28 16:45:27', '2026-01-30 11:32:40'),
(164, 1, 154, 3.000, 0, '2026-01-28 18:47:12', '2026-01-28 18:47:12'),
(165, 1, 191, 7.800, 0, '2026-01-28 19:35:25', '2026-01-28 19:35:53'),
(166, 1, 160, 2.000, 0, '2026-01-28 21:00:19', '2026-01-28 22:04:11'),
(167, 1, 161, 2.000, 0, '2026-01-28 21:00:30', '2026-01-28 21:00:56'),
(168, 1, 153, 3.000, 0, '2026-01-28 21:34:11', '2026-01-28 21:34:11'),
(169, 1, 193, 2.000, 0, '2026-01-29 12:54:36', '2026-01-30 10:44:07'),
(170, 1, 194, 16.000, 0, '2026-01-29 12:59:22', '2026-01-30 16:39:12'),
(171, 1, 195, 7.040, 0, '2026-01-29 13:02:27', '2026-01-29 15:04:50'),
(172, 1, 196, 10.200, 0, '2026-01-29 13:04:50', '2026-01-29 13:04:50'),
(173, 1, 197, 3.680, 0, '2026-01-29 13:12:46', '2026-01-29 13:44:12'),
(174, 1, 198, 6.582, 0, '2026-01-29 13:29:10', '2026-01-29 13:51:20'),
(175, 1, 199, 1.000, 0, '2026-01-29 15:39:14', '2026-01-29 15:39:14'),
(176, 1, 163, 4.000, 0, '2026-01-29 17:31:32', '2026-01-29 17:33:03'),
(177, 1, 202, 9.000, 0, '2026-01-29 17:33:36', '2026-01-29 17:34:29'),
(178, 1, 200, 7.000, 0, '2026-01-29 18:44:19', '2026-01-29 19:29:25'),
(179, 1, 204, 8.000, 0, '2026-01-30 08:23:39', '2026-01-30 08:23:39'),
(180, 1, 205, 9.200, 0, '2026-01-30 11:49:53', '2026-01-30 11:49:53'),
(181, 1, 208, 4.000, 0, '2026-01-30 14:40:51', '2026-01-30 14:40:51'),
(182, 1, 206, 6.000, 0, '2026-01-30 14:40:58', '2026-01-30 14:40:58'),
(183, 1, 207, 6.000, 0, '2026-01-30 14:41:05', '2026-01-30 14:41:05'),
(184, 1, 210, 4.000, 0, '2026-01-30 14:47:00', '2026-01-30 14:47:00'),
(185, 1, 209, 4.000, 0, '2026-01-30 14:47:10', '2026-01-30 14:47:10'),
(186, 1, 211, 4.000, 0, '2026-01-30 15:06:57', '2026-01-30 15:06:57');

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `expense_category_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `expense_date` date NOT NULL,
  `description` text DEFAULT NULL,
  `proof_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expense_categories`
--

CREATE TABLE `expense_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_01_01_000001_create_core_tables', 1),
(5, '2024_01_01_000002_create_products_table', 1),
(6, '2024_01_01_000003_create_inventory_tables', 1),
(7, '2024_01_01_000004_create_transaction_tables', 1),
(8, '2024_01_01_000005_create_product_variants_table', 1),
(9, '2024_01_01_000006_create_price_histories_table', 1),
(10, '2024_01_01_000007_create_stock_opnames_tables', 1),
(11, '2024_01_01_000008_create_purchase_orders_tables', 1),
(12, '2024_01_01_000009_create_returns_tables', 1),
(13, '2024_01_01_000010_create_shifts_tables', 1),
(14, '2024_06_13_082620_create_permission_tables', 1),
(15, '2026_01_18_000001_add_tax_to_transactions', 1),
(16, '2026_01_18_000002_add_indexes_to_transaction_tables', 1),
(17, '2026_01_18_163636_create_expense_categories_table', 1),
(18, '2026_01_18_163643_create_expenses_table', 1),
(19, '2026_01_22_082400_add_description_to_warehouses_table', 1),
(20, '2026_01_25_015435_add_tags_to_products_table', 1),
(21, '2026_01_25_030017_add_is_active_to_products_table', 1),
(22, '2026_01_25_232740_add_balance_to_users_table', 1),
(23, '2026_01_25_233139_add_customer_id_to_transactions_table', 1),
(24, '2026_01_27_000000_add_variant_id_to_transaction_details', 1);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(3, 'App\\Models\\User', 2),
(3, 'App\\Models\\User', 3),
(3, 'App\\Models\\User', 4),
(4, 'App\\Models\\User', 5),
(5, 'App\\Models\\User', 6);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_settings`
--

CREATE TABLE `payment_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'string',
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payment_settings`
--

INSERT INTO `payment_settings` (`id`, `key`, `value`, `type`, `description`, `created_at`, `updated_at`) VALUES
(1, 'default_gateway', 'cash', 'string', 'Default payment gateway', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(2, 'midtrans_enabled', '0', 'boolean', 'Enable Midtrans payment', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(3, 'midtrans_server_key', '', 'string', 'Midtrans Server Key', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(4, 'midtrans_client_key', '', 'string', 'Midtrans Client Key', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(5, 'midtrans_is_production', '0', 'boolean', 'Midtrans Production Mode', '2026-01-27 08:23:45', '2026-01-27 08:23:45');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'dashboard-access', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(2, 'users-access', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(3, 'users-create', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(4, 'users-update', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(5, 'users-delete', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(6, 'roles-access', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(7, 'roles-create', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(8, 'roles-update', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(9, 'roles-delete', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(10, 'permissions-access', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(11, 'permissions-create', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(12, 'permissions-update', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(13, 'permissions-delete', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(14, 'categories-access', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(15, 'categories-create', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(16, 'categories-edit', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(17, 'categories-delete', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(18, 'products-access', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(19, 'products-create', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(20, 'products-edit', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(21, 'products-delete', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(22, 'customers-access', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(23, 'customers-create', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(24, 'customers-edit', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(25, 'customers-delete', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(26, 'transactions-access', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(27, 'reports-access', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(28, 'profits-access', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(29, 'payment-settings-access', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(30, 'suppliers-access', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(31, 'suppliers-create', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(32, 'suppliers-edit', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(33, 'suppliers-delete', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(34, 'warehouses-access', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(35, 'warehouses-create', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(36, 'warehouses-edit', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(37, 'warehouses-delete', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(38, 'displays-access', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(39, 'displays-create', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(40, 'displays-edit', 'web', '2026-01-27 08:23:44', '2026-01-27 08:23:44'),
(41, 'displays-delete', 'web', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(42, 'stock-movements-access', 'web', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(43, 'stock-movements-create', 'web', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(44, 'purchase-orders-access', 'web', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(45, 'purchase-orders-create', 'web', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(46, 'purchase-orders-edit', 'web', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(47, 'purchase-orders-delete', 'web', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(48, 'shifts-access', 'web', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(49, 'shifts-create', 'web', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(50, 'stock-opname-access', 'web', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(51, 'stock-opname-create', 'web', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(52, 'returns-access', 'web', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(53, 'returns-create', 'web', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(54, 'expense-categories-access', 'web', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(55, 'expense-categories-create', 'web', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(56, 'expense-categories-edit', 'web', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(57, 'expense-categories-delete', 'web', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(58, 'expenses-access', 'web', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(59, 'expenses-create', 'web', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(60, 'expenses-edit', 'web', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(61, 'expenses-delete', 'web', '2026-01-27 08:23:45', '2026-01-27 08:23:45');

-- --------------------------------------------------------

--
-- Table structure for table `price_histories`
--

CREATE TABLE `price_histories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `old_buy_price` decimal(15,2) DEFAULT NULL,
  `new_buy_price` decimal(15,2) DEFAULT NULL,
  `old_sell_price` decimal(15,2) DEFAULT NULL,
  `new_sell_price` decimal(15,2) DEFAULT NULL,
  `changed_by` bigint(20) UNSIGNED DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `price_histories`
--

INSERT INTO `price_histories` (`id`, `product_id`, `old_buy_price`, `new_buy_price`, `old_sell_price`, `new_sell_price`, `changed_by`, `note`, `created_at`, `updated_at`) VALUES
(1, 183, 100000.00, 25000.00, 120000.00, 30000.00, 6, NULL, '2026-01-27 21:57:06', '2026-01-27 21:57:06'),
(2, 158, 18500.00, 18500.00, 22500.00, 25000.00, 6, NULL, '2026-01-27 22:42:24', '2026-01-27 22:42:24'),
(3, 159, 18500.00, 18500.00, 22500.00, 25000.00, 6, NULL, '2026-01-27 22:44:17', '2026-01-27 22:44:17'),
(4, 12, 35000.00, 34000.00, 45000.00, 48000.00, 6, NULL, '2026-01-28 16:50:22', '2026-01-28 16:50:22'),
(5, 67, 29000.00, 29000.00, 35000.00, 30000.00, 6, NULL, '2026-01-28 18:22:48', '2026-01-28 18:22:48'),
(6, 160, 18000.00, 18000.00, 22400.00, 22000.00, 6, NULL, '2026-01-28 18:50:52', '2026-01-28 18:50:52'),
(7, 161, 18000.00, 18000.00, 22400.00, 22000.00, 6, NULL, '2026-01-28 18:52:05', '2026-01-28 18:52:05'),
(8, 156, 15800.00, 15800.00, 20000.00, 21000.00, 6, NULL, '2026-01-28 18:58:32', '2026-01-28 18:58:32'),
(9, 157, 15800.00, 15800.00, 20000.00, 21000.00, 6, NULL, '2026-01-28 18:59:29', '2026-01-28 18:59:29'),
(10, 152, 16200.00, 16200.00, 21500.00, 20000.00, 6, NULL, '2026-01-28 19:00:57', '2026-01-28 19:00:57'),
(11, 17, 7250.00, 7250.00, 9750.00, 10000.00, 6, NULL, '2026-01-28 20:05:19', '2026-01-28 20:05:19'),
(12, 164, 15000.00, 15000.00, 20000.00, 15000.00, 6, NULL, '2026-01-28 21:03:04', '2026-01-28 21:03:04'),
(13, 68, 21000.00, 45000.00, 40000.00, 60000.00, 6, NULL, '2026-01-28 22:13:22', '2026-01-28 22:13:22'),
(14, 170, 23000.00, 20500.00, 29000.00, 29000.00, 6, NULL, '2026-01-29 13:07:17', '2026-01-29 13:07:17'),
(15, 9, 58000.00, 52000.00, 68000.00, 58000.00, 6, NULL, '2026-01-29 13:23:23', '2026-01-29 13:23:23'),
(16, 105, 25000.00, 21000.00, 30000.00, 32000.00, 6, NULL, '2026-01-29 13:38:48', '2026-01-29 13:38:48'),
(17, 164, 15000.00, 1000.00, 15000.00, 5000.00, 6, NULL, '2026-01-29 17:28:20', '2026-01-29 17:28:20'),
(18, 163, 15000.00, 1000.00, 10000.00, 5000.00, 6, NULL, '2026-01-29 17:30:27', '2026-01-29 17:30:27'),
(19, 50, 32167.00, 32167.00, 45000.00, 40000.00, 6, NULL, '2026-01-30 08:11:16', '2026-01-30 08:11:16'),
(20, 64, 35000.00, 35000.00, 45000.00, 35000.00, 6, NULL, '2026-01-30 08:13:44', '2026-01-30 08:13:44'),
(21, 64, 35000.00, 21999.00, 35000.00, 35000.00, 6, NULL, '2026-01-30 08:14:26', '2026-01-30 08:14:26'),
(22, 84, 23000.00, 25000.00, 30000.00, 35000.00, 6, NULL, '2026-01-30 08:15:11', '2026-01-30 08:15:11'),
(23, 206, 24696.00, 24696.00, 28440.00, 29000.00, 6, NULL, '2026-01-30 14:36:00', '2026-01-30 14:36:00'),
(24, 46, 26500.00, 26500.00, 35000.00, 39000.00, 6, NULL, '2026-01-30 14:54:00', '2026-01-30 14:54:00');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `barcode` varchar(255) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `buy_price` bigint(20) NOT NULL,
  `average_cost` decimal(15,2) NOT NULL DEFAULT 0.00,
  `sell_price` bigint(20) NOT NULL,
  `unit` varchar(255) NOT NULL DEFAULT 'pcs',
  `min_stock` decimal(10,3) NOT NULL DEFAULT 0.000 COMMENT 'Minimum stock for alert. 0 = no alert.',
  `product_type` varchar(255) NOT NULL DEFAULT 'sellable',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `sku`, `barcode`, `image`, `title`, `description`, `buy_price`, `average_cost`, `sell_price`, `unit`, `min_stock`, `product_type`, `is_active`, `tags`, `created_at`, `updated_at`) VALUES
(1, 1, '621110100001', '621110100001', 'momIMtE00FLWtKhS8XnvQhnhfOwpmqXQooJ6aREW.jpg', 'Kol Merah', NULL, 25000, 0.00, 35000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 22:54:38'),
(2, 3, '621110300001', '621110300001', 'CSlWLssEVqC6hnXrRteWggHhN1uxU9r0wC5kuaum.jpg', 'Beet root', NULL, 31000, 0.00, 40000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 22:55:12'),
(3, 1, '621110100002', '621110100002', 'default.png', 'Daun Kucai', NULL, 12000, 0.00, 15000, 'IKAT', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(4, 1, '621110100003', '621110100003', 'default.png', 'Lettuce', NULL, 35857, 0.00, 46000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(5, 1, '621110100004', '621110100004', 'default.png', 'Roman Lettuce', NULL, 41333, 0.00, 52000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(6, 1, '621110100005', '621110100005', 'lARRSkoTeJiFmakaxebCWmvDUBwlKSNEhqMQRjt5.jpg', 'Brocoli', NULL, 41571, 0.00, 50000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 22:55:49'),
(7, 1, '621110100006', '621110100006', 'OChU7X4eJSxvSwGfgyDiFx81mGTJ4S7qHi0N5pyA.jpg', 'Bunga Kol', NULL, 38000, 0.00, 48000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 22:56:32'),
(8, 1, '621110100007', '621110100007', 'F5A2nqYQHGeK1t9IlQiIWzh6BedoSkUwvZB6Pytd.png', 'garlic sprout', NULL, 47000, 0.00, 55000, 'kg', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 21:31:05'),
(9, 1, '621110100008', '621110100008', 'noapYIlS7f7D622aNzDavdGSgOsoeFmQyApZ8Yrw.jpg', 'Baby pakcoy', NULL, 52000, 0.00, 58000, 'kg', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 13:25:10'),
(10, 1, '621110100009', '621110100009', 'default.png', 'Sawi Minyak Baby', NULL, 55500, 0.00, 65500, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(11, 1, '621110100010', '621110100010', 'default.png', 'Kailan HK', NULL, 43000, 0.00, 53000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(12, 1, '621110100011', '621110100011', 'x11eC0ajYjTw7xN3qQaNtg3V68n0WKTScmga9dHV.png', 'Huai shan', NULL, 34000, 0.00, 48000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 16:50:22'),
(13, 1, '621110100012', '621110100012', 'default.png', 'Poeling', NULL, 55500, 0.00, 65500, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(14, 4, '621110400001', '621110400001', 'TKGQ2mWMfRtLxjCwj3u228io36PYlX3mukq1uNdz.jpg', 'Jamur Simeji Putih', NULL, 8250, 0.00, 10500, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 22:59:30'),
(15, 4, '621110400002', '621110400002', 'jGepG2oUzNehydw6kztoZ1qkTz2pZPjxmhCu9pfq.jpg', 'Jamur Shitake', NULL, 13800, 0.00, 16000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 20:10:06'),
(16, 4, '621110400003', '621110400003', 'hGF6Olwo9qaH4YcpcR9EY1FHMvjU0ZvcMnxhGEgn.jpg', 'Jamur Oister', NULL, 9400, 0.00, 12000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 20:07:32'),
(17, 4, '621110400004', '621110400004', 'yJhfdbCZYpdreYusUqw0jq30Sxa3EgHpySiIuMKH.jpg', 'Jamur Snow White', NULL, 7250, 0.00, 10000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 20:08:33'),
(18, 4, '621110400005', '621110400005', 'NA1rZFbdR0aY02W47rhBeeOA0Lw0TM8bWyjERk5c.jpg', 'Jamur Enoki', NULL, 3800, 190000.00, 7000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 19:59:15'),
(19, 2, '621110200001', '621110200001', 'IH26QbFk60v8jeFJqxn9q7pcGzodycdNRUlKDUI6.jpg', 'Kacang Arcis', NULL, 8533, 0.00, 11000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 20:25:36'),
(20, 2, '621110200002', '621110200002', 'OfVNRcCUncUpBtJ8pHbXjn0TkCl1UgsQslm58F0E.jpg', 'Kacang Manis', NULL, 8533, 0.00, 11000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 20:26:36'),
(21, 4, '621110400006', '621110400006', 'MyOxS9CudgFsiNwsDwCUPpy0AIWc2h2KYWmZWdtg.jpg', 'Jamur Kuping fresh', NULL, 11000, 0.00, 15000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 20:04:22'),
(22, 1, '621110100013', '621110100013', 'nVYFck9DxyoedPRYgcUyKOtpBPClJzNZt1mBmNlQ.jpg', 'Bamboo Shoots', NULL, 10500, 0.00, 13500, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 20:37:12'),
(23, 1, '621110100014', '621110100014', 'jdjtbimhF4nKyfuXJPp1pSe5qA0ocmqjm68a6DOc.jpg', 'Wortel', NULL, 13000, 0.00, 16000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 21:27:00'),
(24, 1, '621110100015', '621110100015', 'eRyp8Z7OD0Pex7gI9uD2Czn8MuTxNV0WRenHAdBe.jpg', 'Daun Ketumbar', NULL, 80000, 0.00, 95000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 17:46:24'),
(25, 1, '621110100016', '621110100016', 'default.png', 'Dou Pai', NULL, 55500, 0.00, 67500, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(26, 5, '621110500001', '621110500001', 'default.png', 'Tahu Kotak', NULL, 11600, 0.00, 16000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(27, 5, '621110500002', '621110500002', 'default.png', 'Tahu Telur', NULL, 4000, 0.00, 7000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(28, 5, '621110500003', '621110500003', 'mXmgIodJMwRmhaun70ZsBRxAaiWPiiwSaYCqo2mP.jpg', 'Sosis Ayam Jofran', NULL, 13000, 0.00, 18000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 22:02:57'),
(29, 5, '621110500004', '621110500004', 'VbpMcSGOTQPlnlQZB3TbjjjSDlBgJu3GE4tvbfYb.png', 'Sosis Ayam Madu Jofran', NULL, 13000, 0.00, 18000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 22:03:31'),
(30, 6, '621110600001', '621110600001', 'mnbiFOEuFjOOP0GHTsll6wUtCcLzMwruaHb3oQyl.jpg', 'Ayam S 550-560', NULL, 34500, 0.00, 45500, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 15:53:47'),
(31, 6, '621110600002', '621110600002', 'bWOGj26d3q9mNXBJUZ7WpfiwgZ7jaN4VPztmuhjZ.jpg', 'Ayam S 650-750', NULL, 51000, 0.00, 60000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 15:54:06'),
(32, 6, '621110600003', '621110600003', 'default.png', 'Chicken S 0.9', NULL, 45000, 0.00, 54000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(33, 6, '621110600004', '621110600004', 'H1YWE3PQmJEaZSVQPBAX4Y9m98Kly2PtMdMNngre.jpg', 'Chicken CP 1100', NULL, 43000, 0.00, 55000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 15:55:10'),
(34, 6, '621110600005', '621110600005', 'default.png', 'Chicken S 1100', NULL, 41000, 0.00, 50000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(35, 6, '621110600006', '621110600006', 'default.png', 'Chicken S 1200', NULL, 41000, 0.00, 60000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(36, 6, '621110600007', '621110600007', 'uKPfbTeGNKNUQ9WqjWwsBPOBU8chKoufutQgGHsm.jpg', 'Chicken Feet ( ceker)', NULL, 25000, 0.00, 32000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 21:32:54'),
(37, 6, '621110600009', '621110600009', 'QY6qbVpCfNeqRoyDIP93xbfoPvfiHXP9egkD0syp.jpg', 'Chicken Breast Bone', NULL, 39000, 0.00, 48000, 'kg', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 19:57:49'),
(38, 6, '621110600012', '621110600012', '2dPtESzY4Kq06WjTu4ED5QJsmAXx5W0FQNCw04vn.jpg', 'Chicken Breast Brown', NULL, 39000, 0.00, 48000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 15:52:18'),
(39, 6, '621110600013', '621110600013', 'SlcBPTjgdKv55pgt0j0z5bEj7JJsjiHRnKJF9ZCX.jpg', 'Chicken Breast Kulit', NULL, 38000, 0.00, 48000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 21:59:54'),
(40, 5, '621110500005', '621110500005', '1l5wMD9AhCDWgWiCt3YGyp4m73nunAl3I2aGlrMV.png', 'Sosis Ayam Doux Pack', NULL, 19000, 0.00, 24000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 22:02:24'),
(41, 7, '621110700001', '621110700001', 'default.png', 'Anggur Black Sedless', NULL, 42500, 0.00, 60000, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(42, 7, '621110700002', '621110700002', 'vcCv1dUPTTdCptNTrz2oKpFOYKcUEK5dknr18L0P.jpg', 'Anggur Merah Curah RRC', NULL, 35000, 0.00, 50000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 15:42:58'),
(43, 7, '621110700003', '621110700003', 'default.png', 'Anggur Merah Aus BAG', NULL, 100000, 0.00, 150000, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(44, 7, '621110700004', '621110700004', 'default.png', 'Anggur Hitam Aust', NULL, 114111, 0.00, 150000, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(45, 7, '621110700005', '621110700005', 'default.png', 'Anggur Hitam Curah a17', NULL, 18000, 0.00, 22000, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(46, 7, '621110700006', '621110700006', 'bD2CIs2GYV0giSosx5gof0Pm03QZVGoPnFlLV325.jpg', 'Apple Strawberry Pack', NULL, 26500, 270000.00, 39000, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-30 14:54:00'),
(47, 7, '621110700007', '621110700007', 'default.png', 'Peach Merah Aust', NULL, 15300, 0.00, 25000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(48, 7, '621110700008', '621110700008', 'default.png', 'Cherry Chilli Red S', NULL, 30000, 0.00, 35000, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(49, 7, '621110700009', '621110700009', 'default.png', 'Plam Netarin Merah aust', NULL, 63000, 0.00, 80000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(50, 7, '621110700010', '621110700010', 'default.png', 'Bluberry peru 125', NULL, 32167, 0.00, 40000, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-30 08:11:16'),
(51, 7, '621110700011', '621110700011', 'default.png', 'Kelapa coco thumb', NULL, 33833, 0.00, 40000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(52, 7, '621110700012', '621110700012', 'default.png', 'Kesemak', NULL, 9300, 0.00, 15000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(53, 7, '621110700013', '621110700013', 'default.png', 'Kesemak Vakum', NULL, 10000, 0.00, 15000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(54, 7, '621110700014', '621110700014', 'zzhkWqcKnwBvUh8gOLnWW2NteyjKopHHdRdtM2Aj.jpg', 'Dragon White 14\"', NULL, 24429, 0.00, 30000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 19:09:03'),
(55, 7, '621110700015', '621110700015', 'aUqlfWi4sw8NRYeJTvTevp4M7aOBTJDnTD0dJrgT.jpg', 'Dragon White 18\"', NULL, 19667, 0.00, 25000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 19:09:17'),
(56, 7, '621110700016', '621110700016', 'default.png', 'Kiwi Merah RRC', NULL, 31333, 0.00, 45000, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(57, 7, '621110700017', '621110700017', 'default.png', 'Kiwi Gold RRC', NULL, 25000, 0.00, 35000, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(58, 7, '621110700018', '621110700018', 'default.png', 'Kiwi Green RRC Curah', NULL, 45000, 0.00, 60000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(59, 7, '621110700019', '621110700019', 'default.png', 'Kiwi Gold NZ', NULL, 50000, 0.00, 55000, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(60, 7, '621110700020', '621110700020', 'default.png', 'Pear Merah Packing', NULL, 51000, 0.00, 60000, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(61, 7, '621110700021', '621110700021', 'default.png', 'Pear Nam Sui Lie 30', NULL, 15000, 0.00, 25000, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(62, 7, '621110700022', '621110700022', 'default.png', 'Pear Nam Sui Lie 8', NULL, 30000, 0.00, 40000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(63, 7, '621110700023', '621110700023', 'default.png', 'Pear Merah TC', NULL, 49000, 0.00, 60000, 'kg', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 22:34:23'),
(64, 7, '621110700024', '621110700024', 'default.png', 'Delima', NULL, 21999, 0.00, 35000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-30 08:14:26'),
(65, 7, '621110700025', '621110700025', 'default.png', 'Hami Melon', NULL, 59000, 0.00, 80000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(66, 7, '621110700026', '621110700026', 'default.png', 'Lemon', NULL, 6000, 0.00, 7000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(67, 7, '621110700027', '621110700027', 'U3kAQhE6qmvZ25CkWkCkJ2IPQbGupmMjwcT913A7.jpg', 'Anggur Hijau Muscat', NULL, 29000, 400000.00, 30000, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 13:32:56'),
(68, 7, '621110700028', '621110700028', 'gmKBLrNUiAcCEQM2km7um0Lw1Sh3UwGRqeWw06NP.jpg', 'Anggur R/G India', NULL, 45000, 0.00, 60000, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 22:13:22'),
(69, 7, '621110700029', '621110700029', 'default.png', 'Plam Queen', NULL, 180000, 0.00, 200000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(70, 7, '621110700030', '621110700030', 'default.png', 'Plam Dandy', NULL, 95000, 0.00, 115000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(71, 7, '621110700031', '621110700031', 'default.png', 'Peach A.C.N', NULL, 15000, 0.00, 25000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(72, 7, '621110700032', '621110700032', 'default.png', 'Avocado Aust ( alpukat)', NULL, 21000, 0.00, 25000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 21:25:44'),
(73, 7, '621110700033', '621110700033', 'default.png', 'Cherry Chilli Red L', NULL, 70000, 0.00, 75000, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(74, 7, '621110700034', '621110700034', 'default.png', 'Pear Fragrant', NULL, 12000, 0.00, 15000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(75, 7, '621110700035', '621110700035', 'default.png', 'Kiwi Gold Itali', NULL, 37000, 0.00, 50000, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(76, 7, '621110700036', '621110700036', 'default.png', 'Kiwi Green Itali', NULL, 10500, 0.00, 15000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(77, 7, '621110700037', '621110700037', 'default.png', 'Stawberry Lokal', NULL, 25000, 0.00, 30000, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(78, 7, '621110700038', '621110700038', 'default.png', 'Kelengkeng', NULL, 38000, 0.00, 48000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(79, 7, '621110700039', '621110700039', 'default.png', 'Jeruk Bali IPOH', NULL, 95000, 0.00, 120000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(80, 7, '621110700040', '621110700040', 'default.png', 'Pamello', NULL, 46000, 0.00, 60000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(81, 7, '621110700041', '621110700041', 'blQkxN2XTgFloo6KuijqkgoGSuhfyyd492Fw3t43.jpg', 'Apple Rossy S', NULL, 35000, 0.00, 40000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-30 08:25:55'),
(82, 7, '621110700042', '621110700042', 'Fp7fGH8tu9smqUehk0166DfKo9LmOQqtksSNasit.jpg', 'Apple Rossy L', NULL, 37000, 0.00, 45000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-30 08:26:08'),
(83, 7, '621110700043', '621110700043', 'default.png', 'Pear Golden', NULL, 35000, 0.00, 45000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(84, 7, '621110700044', '621110700044', 'default.png', 'Pear Naci', NULL, 25000, 0.00, 35000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-30 08:15:11'),
(85, 7, '621110700045', '621110700045', 'default.png', 'Apple Mini (Anna)', NULL, 21000, 0.00, 30000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(86, 7, '621110700046', '621110700046', 'default.png', 'Apple Sunpeng', NULL, 22000, 0.00, 30000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(87, 7, '621110700047', '621110700047', 'default.png', 'Orange Palensia', NULL, 26000, 0.00, 30000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(88, 7, '621110700048', '621110700048', 'SdtcdgSy9U9PqDNwjtxsMr26Y2X3flG5UxSNd2xz.jpg', 'Apple Hijau', NULL, 38000, 0.00, 45000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-30 08:25:01'),
(89, 7, '621110700049', '621110700049', 'default.png', 'Pear Hijau', NULL, 31000, 0.00, 40000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(90, 7, '621110700050', '621110700050', 'default.png', 'Pear Yali', NULL, 20000, 0.00, 25000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(91, 7, '621110700051', '621110700051', 'default.png', 'Apple Galla', NULL, 30000, 0.00, 40000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(92, 7, '621110700052', '621110700052', 'default.png', 'Apple Rossi 64', NULL, 9500, 0.00, 15000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(93, 7, '621110700053', '621110700053', 'default.png', 'Apple Rossi 56', NULL, 9500, 0.00, 15000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(94, 7, '621110700054', '621110700054', 'default.png', 'Apple Fuji Boss', NULL, 23000, 0.00, 30000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(95, 7, '621110700055', '621110700055', 'default.png', 'Jeruk BAG Barongsai', NULL, 88000, 0.00, 100000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(96, 7, '621110700056', '621110700056', 'default.png', 'Jeruk IMLEK KTK XL 38\'', NULL, 269000, 0.00, 300000, 'BOX', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(97, 7, '621110700057', '621110700057', 'default.png', 'Jeruk IMLEK KTK L 34\'', NULL, 234000, 0.00, 270000, 'BOX', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(98, 7, '621110700058', '621110700058', 'default.png', 'Jeruk IMLEK KTK M 52-54\'', NULL, 204000, 0.00, 250000, 'BOX', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(99, 7, '621110700059', '621110700059', 'default.png', 'Pear Nam Sui Lie 36', NULL, 12000, 0.00, 20000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(100, 7, '621110700060', '621110700060', 'default.png', 'Jeruk IMLEK KCL M 4Kg', NULL, 112000, 0.00, 160000, 'BOX', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(101, 7, '621110700061', '621110700061', 'default.png', 'Jeruk IMLEK KCL L 4Kg', NULL, 127000, 0.00, 170000, 'BOX', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(102, 1, '621110100017', '621110100017', 'rQrPgS61xCQg9OqEcB3WpiVYeHBpyyiMqPAdIqR9.jpg', 'Paprika Merah', NULL, 71000, 0.00, 85000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 21:24:11'),
(103, 7, '621110700062', '621110700062', 'qfaCoa2RXfKq6KOlLC8vjexlq7OszyRg44eKadOU.jpg', 'Mangga Thailand', NULL, 30000, 558000.00, 45000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 18:35:04'),
(104, 3, '621110300002', '621110300002', 'sVAJmOvrfkxIAOhxmDR9Vp314NCXf3CypyUlz4D4.jpg', 'Bawang Jawa', NULL, 35000, 0.00, 40000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 21:21:32'),
(105, 7, '621110700063', '621110700063', 'tOWS0Z7Jnr7CcIQZKGLiYKCrdG1FZzQYSMx23R5o.jpg', 'Jeruk Wogan tangerine', NULL, 21000, 0.00, 32000, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 13:38:48'),
(106, 7, '621110700064', '621110700064', 'default.png', 'Anggur Red Crimson AUS', NULL, 70000, 0.00, 80000, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(107, 7, '621110700065', '621110700065', 'default.png', 'Plam Mini', NULL, 65000, 0.00, 75000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(108, 7, '621110700066', '621110700066', 'default.png', 'Anggur Merah Afrika curah', NULL, 35000, 0.00, 40000, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 18:33:30'),
(109, 5, '621110500006', '621110500006', 'O4PQ7yCJwA6OB946zhm1e7NMBmIMXTVSFvTs2x0k.jpg', 'Bihun Segitiga 1/2 KG', NULL, 13500, 0.00, 16000, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 19:39:36'),
(110, 5, '621110500007', '621110500007', 'c45k0moOKV1qVRor4E9D9LB40FUyyR67aPAvVRtV.jpg', 'Bihun Segitiga 1/4 KG', NULL, 7000, 0.00, 8000, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 19:39:50'),
(111, 5, '621110500008', '621110500008', 'fBvVlIiW6q3iJ8mmKCindsSVxHNSI3R3wK5Tg4m8.jpg', 'Pulut putih 1 KG', NULL, 22000, 0.00, 32000, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 21:18:58'),
(112, 5, '621110500009', '621110500009', 'yzw9tlzBFO5dLTHDuwr0yZ6S7GhJnO1stC4uoFOo.jpg', 'Pulut putih 1/2 KG', NULL, 11000, 0.00, 16000, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 21:19:16'),
(113, 5, '621110500010', '621110500010', 'RxHuTumJke9GqvpEUBT3HtpcS7VtKorSoJENzALv.jpg', 'Wijen Putih 100Gram', NULL, 4200, 0.00, 5300, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 21:19:45'),
(114, 5, '621110500011', '621110500011', '92L2WRQ7weAuyeM6ZMLQoVt1RRBGCxsI75SMBFqm.jpg', 'Wijen Putih 200Gram', NULL, 8400, 0.00, 10350, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 21:19:58'),
(115, 5, '621110500012', '621110500012', '5rkZLKBsQ2pEp8DCC6BqAwquxap0JLm3lsq5qX5U.jpg', 'emping 1kg', NULL, 80000, 0.00, 90000, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 21:17:00'),
(116, 3, '621110300003', '621110300003', 'O2IjgpXS2iiDgZ1MPKvAJUcJGA6fjzzjLOiZVTSK.jpg', 'Bawang Merah 1/2 Kg', NULL, 17500, 0.00, 20000, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 21:20:54'),
(117, 3, '621110300004', '621110300004', 'wHZ0TVnmGNaC95IqlHkCbQufVMfw0JXcPmZNmrca.jpg', 'Bawang Merah 1/4 Kg', NULL, 8750, 0.00, 10000, 'Pack', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 21:21:07'),
(118, 3, '621110300005', '621110300005', 'iOZVa9PvuLgYNeHkGgtH1rfkGovZhFVbv2u4DaYp.jpg', 'Bunga Lawang 1Kg', NULL, 77000, 0.00, 95000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 22:05:29'),
(119, 3, '621110300006', '621110300006', 'wnRTWjTRsfUh7qNYb673vTkkbzYDjkHHtB8CckQK.jpg', 'Bunga Lawang 25 gram', NULL, 1925, 0.00, 3800, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 22:05:13'),
(120, 6, '621110600014', '621110600014', 'default.png', 'Chicken Wing 500 gram', NULL, 19500, 0.00, 25000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(121, 6, '621110600121', '621110600121', 'default.png', 'Chicken Wing 1 Kg', NULL, 39000, 0.00, 48000, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(122, 6, '621110600015', '621110600015', 'wbYPCDJCKJKAyP6xM1TOsKJ7AyFBmEQ50RpTLhMl.jpg', 'Chicken Midle Wing', NULL, 41000, 0.00, 48000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 19:44:28'),
(123, 6, '621110600016', '621110600016', 'default.png', 'Paha Tulang Besar 650 Gram', NULL, 38000, 0.00, 50000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(124, 6, '621110600017', '621110600017', 'xdMFkoKUgMlw9ig6QX5c6UVAnxZ2827PC6xS0M5t.jpg', 'Ayam Dada Filet 1KG', '-', 39000, 0.00, 45000, 'PCS', 50.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 16:35:19'),
(125, 6, '621110600018', '621110600018', 'L86SAg69FQinLwroLC660UWFqWnIuvcvr0TLRR3h.jpg', 'Chicken Drum Stick Jumbo', NULL, 36000, 0.00, 50000, 'kg', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 15:50:58'),
(126, 6, '621110600029', '621110600029', 'default.png', 'Paha Fillet', NULL, 51000, 0.00, 62500, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(127, 1, '621110100018', '621110100018', '7quYsGxieMEAmn4s5IRK4WN2vMSjAT8WYAd4SYRp.jpg', 'Paprika Hijau', NULL, 56000, 0.00, 67800, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 21:24:30'),
(128, 1, '621110100019', '621110100019', 'juNztIacHQ2qxV2fyH9NX4wQIctQNDy5CGcQbYEO.jpg', 'Paprika Kuning', NULL, 64000, 0.00, 75800, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 21:25:23'),
(129, 5, '621110500013', '621110500013', 'JUCXbv0L7iAc1yrTc8KqsQ1AYKwV0dRkADJM6EeI.jpg', 'Ketan Hitam 1Kg', NULL, 24600, 0.00, 36200, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 21:17:53'),
(130, 5, '621110500014', '621110500014', '1vPW5ROj4oQfEGjhWHfQKpdslIbK7tVmSgc88q5a.jpg', 'Ketan Hitam 1/2 Kg', NULL, 13600, 0.00, 18100, 'PCS', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 21:18:06'),
(131, 10, '62111100001', '62111100001', 'EkOBZatox31OvEqgQfW2EIguJvycNPyaniuZcOpl.jpg', 'Gobanco Ring Milo merah', NULL, 21900, 0.00, 27000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 19:06:38'),
(132, 10, '62111100002', '62111100002', 'R6fsPUq1wTfqrpbeqbXRzKgpedlREPsO3jhL5iK4.jpg', 'Gobanco Chip Milo hijau', NULL, 21900, 0.00, 27000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 19:07:20'),
(133, 10, '62111100003', '62111100003', 'Fa6EaQOM1hGDa6yxpm7Io66u4HeyThHtO5VU99EU.jpg', 'Gobanco Soes Milo ungu', NULL, 21900, 0.00, 27000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 19:07:52'),
(134, 10, '62111100004', '62111100004', 'eGtou6XRXIwYnMohBXMS4AWhlMnVLVmUd3meGNUR.jpg', 'Ladang Lima Blackthins', NULL, 18700, 0.00, 23000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 18:54:24'),
(135, 10, '62111100005', '62111100005', 'orrvzFdYqqw0E6TXnFu6lvxnv8NDIAP0mH6NLSF6.jpg', 'Ladang Lima Blackmond', NULL, 18700, 0.00, 23000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 18:55:04'),
(136, 10, '62111100006', '62111100006', 'DI8cpTp1P29XIlxDhENKgSZBGtad6pE23SO4o5x3.jpg', 'Ladang Lima Pumpberry', NULL, 18700, 0.00, 23000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 18:56:55'),
(137, 10, '62111100007', '62111100007', '2v4qnWkvtgXPsBVhGE9hgtk5jQV0CqssGnEoQ3c3.jpg', 'Coklat TYL Almond Milk Chocolate', NULL, 15000, 0.00, 15000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 21:45:25'),
(138, 10, '62111100008', '62111100008', 'bomEpIOIKgBwzUR2l6fvsmmup97ePgMUxkO7hbGB.jpg', 'TYL Almond Dark Chocolate', NULL, 15000, 0.00, 15000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 18:40:43'),
(139, 10, '62111100009', '62111100009', 'wV08xy5iAO1zvmeDazS9jexLCuyEbzn1of5UWap5.jpg', 'Alisha Strawberry Coklat', NULL, 15000, 0.00, 15000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 21:36:13'),
(140, 10, '62111100010', '62111100010', 'p7w0J7AdmdltODsGvYJNQJNeSgqyF2TdAw2cp3KX.jpg', 'Alisha Cookie milk singapore', '-', 15000, 0.00, 15000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 21:52:57'),
(141, 10, '62111100011', '62111100011', 'gB988hT5Qsw1v06Q3zGHhgxYNZaHGGKK9Eas8rpG.jpg', 'Alisha Milk Coklat', NULL, 15000, 0.00, 15000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 21:37:50'),
(142, 10, '62111100012', '62111100012', 'F6XcZcdatjVXJvUErPSmsHWv09Rz1Ov2FbG2ORfH.jpg', 'Alisha Cookie Coated Coklat Singapore', NULL, 15000, 0.00, 15000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 21:39:06'),
(143, 10, '62111100013', '62111100013', 'O4qct1azpmVLKsnooF1Gqjj77o2ZfmMiIjfebhNu.jpg', 'Ailisha chocolate taste', NULL, 15000, 0.00, 15000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 21:42:25'),
(144, 10, '62111100014', '62111100014', 'HRROgIB7SJrS71u2gdw9toA9UNwP25RlTQ3ALRvL.jpg', 'Alisha Strawberry Coklat Singapore', NULL, 15000, 0.00, 15000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 19:19:27'),
(145, 10, '62111100015', '62111100015', 'VmtCXmcxRM9GE7VYIR1H4dlG1Prl2KSvOsQx0pTd.jpg', 'Coklat Truffle mix', '-', 15000, 0.00, 15000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 21:50:14'),
(146, 10, '62111100016', '62111100016', 'DnDxpE4Z3hV2bHBt2ryqEz7c2qxxMrzmVqUvSemE.jpg', 'Truffle Caramel', NULL, 15000, 0.00, 15000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 18:38:12'),
(147, 10, '62111100017', '62111100017', 'ydmAZ6091IiedYVrCwgb1EGqXLDXHQSZSDxmrlcv.jpg', 'Truffle Strawberry', NULL, 15000, 0.00, 15000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 18:38:49'),
(148, 10, '62111100018', '62111100018', 'Ksyljt3odUW3KcH5jt3ArRonSniOugPinAf1R2O2.jpg', 'Truffle Milk', NULL, 15000, 0.00, 15000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 18:39:41'),
(149, 10, '62111100019', '62111100019', 'UvJ88Q5kXvcm29BxKbgHmJiZpFvz6xkpkVDKMnQt.jpg', 'Truffle Tiramisu', NULL, 15000, 0.00, 15000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 18:37:21'),
(150, 10, '62111100020', '62111100020', 'ofZqaINCirWXwWxhUwvMzFHHu624RWJfbFOI1t8r.jpg', 'Coklat Choco Twist', '-', 15000, 0.00, 15000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 21:54:35'),
(151, 10, '62111100021', '62111100021', 'qhcwP4PyrOlN8b2gjlpTPZvoqaCn7SeG54tsT9Jr.jpg', 'Mr.Sif Melisha', NULL, 15000, 0.00, 15000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 21:43:44'),
(152, 10, '62111100022', '62111100022', 'cramd1oMYLx7IwFE5SnswJn0KxnEYGw6mC4ULucm.jpg', 'KylaFood Basreng chips original & pedas', NULL, 16200, 0.00, 20000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 19:02:59'),
(153, 10, '62111100023', '62111100023', 'zf7nCGRL4rOIiPZcgWQSwAvtUNuvHt2JEdv8ISix.jpg', 'Kyla Food Makaroni Spicy', NULL, 16500, 0.00, 21500, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 21:34:03'),
(154, 10, '62111100024', '62111100024', 'P6PwEgSTQyanUYN6LCIlXPAdmmgiDfYlnuAa54v3.jpg', 'Kyla Food Batagor Kuah', NULL, 15500, 0.00, 23000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 18:48:05'),
(155, 10, '62111100025', '62111100025', 'EK3RaCsekP6DAlZjTY4rPOB6HUo50twXs8QCJKAH.jpg', 'Kyla Food Seblak', NULL, 15000, 0.00, 23000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 18:49:16'),
(156, 10, '62111100026', '62111100026', 'ApqfeeccWMlzTMj8YOFgrKXSlgCUoPnpodRvgiSq.jpg', 'Basreng Stick Daun Jeruk', NULL, 15800, 0.00, 21000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 18:58:32'),
(157, 10, '62111100027', '62111100027', 'D8BLgKcSZCIh8ZEdJol9QRNEpHZSi8SQkL0ie7QA.jpg', 'Basreng Stick Original Daun Jeruk', NULL, 15800, 0.00, 21000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 18:59:29'),
(158, 10, '62111100028', '62111100028', 'default.png', 'Popocorn Caramel', NULL, 18500, 240500.00, 25000, 'Pcs', 9.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 22:45:17'),
(159, 10, '62111100029', '62111100029', 'Yju794kMC4oV1ZoEbQ8KGEeJU37DxrwdjOJWfYQ5.jpg', 'Popocorn Keju', NULL, 18500, 0.00, 25000, 'Pcs', 4.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 22:45:29'),
(160, 10, '62111100030', '62111100030', '7BuApFEyw8RzOzewGV4lDaRcHp1Gz4juIFhGCChS.jpg', 'Kaula Keripik Cireng Original', NULL, 18000, 0.00, 22000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 20:57:55'),
(161, 10, '62111100031', '62111100031', 'aTo8qJkdB1qd9Pit3OvBgEur3KGEKJJfGh72k9IW.jpg', 'Kaula Keripik Cireng BBQ', NULL, 18000, 0.00, 22000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 20:58:07'),
(162, 10, '62111100032', '62111100032', 'default.png', 'Kacang Mente', NULL, 15000, 15000000.00, 17000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 17:43:48'),
(163, 10, '62111100033', '62111100033', 'default.png', 'Puding Dark Cokelat', NULL, 1000, 5000.00, 5000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 17:31:23'),
(164, 10, '62111100034', '62111100034', 'uNlWn9RRlo9Vwfdj3Tt686hflfXHaPow4ipPnT1g.jpg', 'Sald Buah', NULL, 1000, 156000.00, 5000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 17:28:20'),
(165, 10, '62111100035', '62111100035', 'default.png', 'Cremy Cofee Jelly', NULL, 15000, 0.00, 20000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(166, 10, '62111100036', '62111100036', '6J7d5doCBvUdLnixLcvofhZ63QOm52DQTZCMZewu.jpg', 'Buko Pandan', NULL, 15000, 150000.00, 20000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 15:56:24'),
(167, 10, '62111100037', '62111100037', 'iuPouG2XBM8Tc0wunzbrQbhhAIew390EEaNuNBfB.jpg', 'Lapis Legit', NULL, 11100, 0.00, 15000, 'Pcs', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-28 19:26:53'),
(168, 7, '621110700067', '621110700067', 'UBlpaQC4gg7dXFFK2VnqMgOqCyHFULFjYgni8MoD.jpg', 'Jeruk Raja', NULL, 25000, 350000.00, 35000, 'KG', 5.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 08:23:45', '2026-01-29 15:40:54'),
(169, 7, 'BU-SL-001', NULL, 'NHpekPMzxJSyPwjpwBibmv7ktPPY8buXb5wp9KBx.jpg', 'Strawberry Lokal Besar', '-', 25000, 300000.00, 35000, 'pcs', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 16:54:31', '2026-01-27 16:56:14'),
(170, 7, 'BU-PC-001', NULL, 'TlfI3W1kpjKLRGTlXpDvEyqOf41TCzShvg0IJu8I.jpg', 'pisang cavendish', '-', 20500, 303638.39, 29000, 'kg', 0.000, 'sellable', 1, '[\"sellable\",\"ingredient\"]', '2026-01-27 17:01:52', '2026-01-29 13:07:17'),
(171, 7, 'BU-TC-001', NULL, 'GBTZRfm0xv9WT3MekQf5ABgRjGmMZllSm6iGZEdI.jpg', 'Tomat Cerry', '-', 13000, 195000.00, 18000, 'pcs', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 17:39:54', '2026-01-27 17:40:30'),
(172, 10, 'MA-KM-001', NULL, 'qMEiZbIsrDckM3jwLpQDTsjbB26yBXplXSbGRdC3.jpg', 'Kacang Mente', '-', 15000, 0.00, 17000, 'pcs', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 17:42:56', '2026-01-29 21:28:31'),
(174, 10, 'MA-CC-001', NULL, '5ENexwndnGe2QKGGy4tkBvcyGKcidFdpXlJVypz6.jpg', 'creamy coffee jelly', '_', 15000, 270000.00, 20000, 'pcs', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 18:10:23', '2026-01-27 18:11:06'),
(175, 7, 'BU-KP-001', NULL, '8AnYbNEvTodEil2CSi8l5rxLRfb4JFy3P7AN2E0U.jpg', 'Kelengkeng Pack', '_', 30000, 330000.00, 35000, 'pcs', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 18:35:52', '2026-01-28 06:12:58'),
(176, 6, 'DA-CW-001', NULL, 'dLu9Z6SH4QUyAKPj1WIdHCGFU9LkeJQGBcHdcsjr.jpg', 'chicken wings', '_', 39000, 421200.00, 48000, 'kg', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 18:49:40', '2026-01-28 20:23:14'),
(177, 7, 'BU-T-001', NULL, 'uSxdJGJiwhrPXxgXA3AO3LTMdtE2eTkHqYz5guBm.jpg', 'Tomat', '_', 11000, 110000.00, 19000, 'kg', 0.000, 'sellable', 1, '[\"sellable\",\"ingredient\"]', '2026-01-27 20:15:14', '2026-01-27 20:43:56'),
(178, 1, 'SA-CR-001', NULL, 'mWLre84LzKSyxxfLAwBoaeL6hQKUoa2aDI0Rh8cX.png', 'Cabe rawit', '_', 56000, 56000.00, 65000, 'gram', 1.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 20:16:58', '2026-01-28 20:18:41'),
(179, 1, 'SA-CM-001', NULL, 'oyiStHCziCfkScclWrc22kgvbnC1LGc7vUXzBwbU.jpg', 'Cabe merah', '_', 43000, 43000.00, 50000, 'gram', 0.900, 'sellable', 1, '[\"sellable\"]', '2026-01-27 20:28:50', '2026-01-29 21:16:00'),
(180, 1, 'SA-T-001', NULL, 'NltQjfWYX219GDbmRpCeDs3NOrwOzWP25LiDS9v4.jpg', 'Timun', '_', 8000, 40000.00, 13000, 'kg', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 20:30:06', '2026-01-27 20:49:59'),
(181, 1, 'SA-K-001', NULL, 'gbq321yxpHooyPGqJN0qkmXKDund6KbPFF41Be6R.jpg', 'Kol', '_', 6800, 68000.00, 13000, 'kg', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 20:31:13', '2026-01-27 20:50:32'),
(182, 7, 'BU-AL-001', NULL, 'JwBul8UeDXk9EhL2A4kYrO4j9SbtQTyIYiMNUitl.jpg', 'Alpukat lokal', '_', 24000, 96000.00, 35000, 'kg', 0.000, 'sellable', 1, '[\"sellable\",\"ingredient\"]', '2026-01-27 20:33:09', '2026-01-28 17:32:31'),
(183, 7, 'BU-SM-001', NULL, '6gHsyxJGfn33iFPw2Z3irgQ0qdn3OysK8CXOAkYm.jpg', 'Strawberry mini', '_', 25000, 100000.00, 30000, 'pcs', 0.000, 'sellable', 1, '[\"sellable\",\"ingredient\"]', '2026-01-27 21:55:00', '2026-01-28 16:27:45'),
(184, 7, 'BU-JP-001', NULL, 'RRmDlHUnoU3y8KyWTaGYoSr1G5mopqjtPdM9BLjU.jpg', 'Jeruk Papakam', '_', 25000, 275000.00, 29000, 'pcs', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 22:01:46', '2026-01-28 06:02:13'),
(185, 1, 'SA-PC-001', NULL, 'JWoV2TF9KXZ9fU8YcHZOMjTE5eYgEnrta7TYwQ9F.jpg', 'Pak Coy', '_', 32500, 32500.00, 55000, 'gram', 1.000, 'sellable', 1, '[\"sellable\"]', '2026-01-27 22:49:24', '2026-01-28 06:02:27'),
(188, 3, 'UM-BP-001', NULL, 'Nc7MLEpxIvu4rWQ8YGKx1h5BSED4nv68qpBvUGN6.jpg', 'Bawang putih', '_', 28000, 0.00, 38000, 'kg', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-28 16:44:47', '2026-01-28 16:45:14'),
(191, 3, 'UM-CK-001', NULL, '2iyjYgyK1X6EjlKJ24twkrIZvoDmkIsIO9G5tYpy.jpg', 'cabe kering', '_', 61000, 488000.00, 75000, 'kg', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-28 19:32:55', '2026-01-28 19:33:23'),
(192, 1, 'SA-KP-001', NULL, 'udxfqM7s1aoQQCoL7gVtqc7FCqsWbNWFvYmDc6qW.jpg', 'Kol Putih', '-', 6800, 68000.00, 12000, 'kg', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-28 22:30:45', '2026-01-28 22:31:32'),
(193, 7, 'BU-SK-001', NULL, 'D9O0M57QMD36zekwRdrTTETQ5Be2aAux66IybObP.jpg', 'Strawberry Korea', '_', 84000, 672000.00, 100000, 'pcs', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-29 12:52:17', '2026-01-29 12:54:26'),
(194, 3, 'UM-JH-001', NULL, 'BPiRSqJVUwRs5u3ZWGUD6jeQtdO7Oo2VEpkeADp8.jpg', 'jagung hitam ( black corn)', '_', 16500, 295000.00, 21000, 'pcs', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-29 12:58:42', '2026-01-29 12:59:15'),
(195, 7, 'BU-JK-001', NULL, 'PmuRXugOEoeKRd1SkUR9LPK6HvYT4TOjwJuWUJEf.jpg', 'Jeruk kino pakistan', '-', 28000, 224000.00, 39000, 'kg', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-29 13:01:42', '2026-01-29 13:02:16'),
(196, 1, 'SA-CS-001', NULL, 'eAjPtOx2yZ25DGBDl1gebr4fDvHpaOovOwVRhTLS.png', 'Celery / seledry', '-', 27000, 275400.00, 39000, 'kg', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-29 13:04:12', '2026-01-29 13:04:42'),
(197, 3, 'UM-DS-001', NULL, 'TpeeposJJnn9HBGkpiVCJ9TOBTAUNCoZ13etiRMW.jpg', 'Durian sweet potato', '-', 63000, 264600.00, 77000, 'kg', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-29 13:10:57', '2026-01-29 13:18:26'),
(198, 7, 'BU-EO-001', NULL, 'AGFwHqvWNJvro4D2UgJtlsN8gJb6123S9P4O7UJG.jpg', 'Ehim orange ( jelly orange)', '-', 35000, 238000.00, 48000, 'kg', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-29 13:28:36', '2026-01-29 13:30:07'),
(199, 1, 'SA-CH-001', NULL, '6LkkYQr01KjWL4oIk9Nxiw9sYJyPOZHbHpyf4M4B.jpg', 'Cabe hijau', '-', 40000, 40000.00, 48000, 'kg', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-29 15:38:41', '2026-01-29 15:39:36'),
(200, 10, 'MA-IC-001', NULL, 'ZXP08sQHWeyp4Fzxidj89hCQwHB4NACP9zc9va0H.jpg', 'Ice cream 3 scoop', '-', 12000, 0.00, 20000, 'cup', 0.000, 'sellable', 1, '[\"sellable\",\"ingredient\"]', '2026-01-29 17:21:02', '2026-01-29 18:44:09'),
(201, 10, 'MA-IC-002', NULL, 'Epr6sceHfUB5REewzwXAHWOQGGND0HBvdHfbqwrE.jpg', 'ice cream 8L', '-', 190000, 0.00, 210000, 'pcs', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-29 17:25:15', '2026-01-29 17:25:15'),
(202, 8, 'JU-JS-001', NULL, 'sss9LYofCftwYABA1ZQWa5ochMGovaVmQ9LzUJWU.jpg', 'Jus semangka', '-', 8000, 0.00, 20000, 'pcs', 0.000, 'sellable', 1, '[\"ingredient\",\"sellable\"]', '2026-01-29 17:32:49', '2026-01-30 12:22:05'),
(203, 8, 'JU-JO-001', NULL, 'ypsuBd6wNVJwce0YzRGOwzbCMq8f8JBxPFBKrCWS.jpg', 'jus orange ( jeruk)', '-', 13000, 0.00, 22000, 'pcs', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-29 17:44:25', '2026-01-29 17:44:25'),
(204, 7, 'BU-JI-001', NULL, 'U3v0JbinG3EktipQCY1oUGQWNMC09IwjdTRDt3Ic.jpg', 'Jeruk imlek eceran', '-', 33750, 0.00, 40000, 'kg', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-30 08:22:25', '2026-01-30 08:23:10'),
(205, 7, 'BU-N-001', NULL, 'w6QVVMTCyRknTkPpw9bSIUSJXOT2LLquUT7sulKr.jpg', 'Nanas', '-', 16000, 147200.00, 20000, 'kg', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-30 11:49:11', '2026-01-30 11:50:37'),
(206, 5, 'PR-NK-001', NULL, 'lSx3I6QkILOhkax7iiXvAAfUy8aeQIyIPuNAO2kG.jpg', 'Nugget Kanzler crispy 250 gram', '-', 24696, 148176.00, 29000, 'pcs', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-30 14:33:12', '2026-01-30 14:36:00'),
(207, 5, 'PR-NS-001', NULL, 'tp7c7CdHUYIIzEy2Fr9bSjYIGrFEu4fd3MLvMUTw.jpg', 'Nugget stick crispy kanzler 250 gram', '-', 24696, 148176.00, 29000, 'pcs', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-30 14:35:46', '2026-01-30 14:36:52'),
(208, 5, 'PR-NC-001', NULL, 'WlpqasKtlOZj3YxvZCpiaCmQkVvxMd2BVnGZxthN.jpg', 'Nugget crispy kanzler 450gram', '-', 46486, 185944.00, 54000, 'pcs', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-30 14:39:46', '2026-01-30 14:40:39'),
(209, 5, 'PR-NK-002', NULL, '6rGanziy7snCO4ujSh0fYbB8SQxQv7ftwqfmAWnm.jpg', 'nugget kanzler crispy spicy 250gram', '-', 48468, 193872.00, 56000, 'pcs', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-30 14:43:26', '2026-01-30 14:43:58'),
(210, 5, 'PR-NK-003', NULL, 'J40LWh6GVUpcFfnBMWHYZdKaZPZy73wL6zAcutzX.jpg', 'nugget kanzler stick crispy 450 gram', '-', 46486, 185944.00, 54000, 'pcs', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-30 14:46:18', '2026-01-30 14:46:51'),
(211, 5, 'PR-NK-004', NULL, 'uvFz8oDH1QYpu0modbtiUfwV07B0cQHeO7K7LYNW.jpg', 'nugget kanzler original 250 gram', '-', 45405, 181620.00, 53000, 'pcs', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-30 15:06:16', '2026-01-30 15:06:46'),
(212, 5, 'PR-SK-001', NULL, 'dwWNJai6VFm6I11S9maKMfxMsWdhtBvz0aVlxthE.jpg', 'sosis kanzler 500 gram beef cocktail', '-', 30486, 0.00, 36000, 'pcs', 0.000, 'sellable', 1, '[\"sellable\"]', '2026-01-30 15:09:10', '2026-01-30 15:09:36');

-- --------------------------------------------------------

--
-- Table structure for table `product_ingredients`
--

CREATE TABLE `product_ingredients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `ingredient_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` decimal(10,3) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_variants`
--

CREATE TABLE `product_variants` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `buy_price` decimal(12,0) NOT NULL DEFAULT 0,
  `sell_price` decimal(12,0) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_variant_ingredients`
--

CREATE TABLE `product_variant_ingredients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_variant_id` bigint(20) UNSIGNED NOT NULL,
  `ingredient_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` decimal(10,3) NOT NULL DEFAULT 1.000,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `profits`
--

CREATE TABLE `profits` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `transaction_id` bigint(20) UNSIGNED NOT NULL,
  `total` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `profits`
--

INSERT INTO `profits` (`id`, `transaction_id`, `total`, `created_at`, `updated_at`) VALUES
(1, 31, 1470, '2026-01-27 08:51:28', '2026-01-27 08:51:28'),
(2, 31, 1640, '2026-01-27 08:51:28', '2026-01-27 08:51:28'),
(3, 32, 6000, '2026-01-27 08:52:20', '2026-01-27 08:52:20'),
(4, 33, 2467, '2026-01-27 09:25:24', '2026-01-27 09:25:24'),
(5, 33, 5000, '2026-01-27 09:25:24', '2026-01-27 09:25:24'),
(6, 34, 1620, '2026-01-27 10:15:21', '2026-01-27 10:15:21'),
(7, 35, 10000, '2026-01-27 13:06:22', '2026-01-27 13:06:22'),
(8, 36, 5700, '2026-01-27 13:25:24', '2026-01-27 13:25:24'),
(9, 36, 2000, '2026-01-27 13:25:24', '2026-01-27 13:25:24'),
(10, 37, 12000, '2026-01-27 13:32:09', '2026-01-27 13:32:09'),
(11, 38, 8400, '2026-01-27 14:22:59', '2026-01-27 14:22:59'),
(13, 40, 5575, '2026-01-27 14:42:09', '2026-01-27 14:42:09'),
(14, 41, 2500, '2026-01-27 15:21:20', '2026-01-27 15:21:20'),
(15, 41, 5000, '2026-01-27 15:21:20', '2026-01-27 15:21:20'),
(16, 41, 6000, '2026-01-27 15:21:20', '2026-01-27 15:21:20'),
(17, 42, 9700, '2026-01-27 16:22:31', '2026-01-27 16:22:31'),
(18, 42, 21000, '2026-01-27 16:22:31', '2026-01-27 16:22:31'),
(19, 42, 6000, '2026-01-27 16:22:31', '2026-01-27 16:22:31'),
(20, 42, 5000, '2026-01-27 16:22:31', '2026-01-27 16:22:31'),
(21, 42, 10000, '2026-01-27 16:22:31', '2026-01-27 16:22:31'),
(22, 43, 19400, '2026-01-27 16:31:37', '2026-01-27 16:31:37'),
(23, 43, 21000, '2026-01-27 16:31:37', '2026-01-27 16:31:37'),
(24, 43, 6000, '2026-01-27 16:31:37', '2026-01-27 16:31:37'),
(25, 43, 5000, '2026-01-27 16:31:37', '2026-01-27 16:31:37'),
(26, 43, 10000, '2026-01-27 16:31:37', '2026-01-27 16:31:37'),
(27, 44, 1485, '2026-01-27 16:33:19', '2026-01-27 16:33:19'),
(28, 44, 6000, '2026-01-27 16:33:19', '2026-01-27 16:33:19'),
(29, 44, 3745, '2026-01-27 16:33:19', '2026-01-27 16:33:19'),
(30, 44, 3150, '2026-01-27 16:33:19', '2026-01-27 16:33:19'),
(31, 44, 4365, '2026-01-27 16:33:19', '2026-01-27 16:33:19'),
(32, 44, 2500, '2026-01-27 16:33:19', '2026-01-27 16:33:19'),
(33, 44, 1875, '2026-01-27 16:33:19', '2026-01-27 16:33:19'),
(34, 45, 4950, '2026-01-27 16:34:37', '2026-01-27 16:34:37'),
(35, 46, 6000, '2026-01-27 16:53:36', '2026-01-27 16:53:36'),
(36, 47, 6800, '2026-01-27 17:06:59', '2026-01-27 17:06:59'),
(37, 47, 10000, '2026-01-27 17:06:59', '2026-01-27 17:06:59'),
(38, 47, 1250, '2026-01-27 17:06:59', '2026-01-27 17:06:59'),
(39, 48, 3000, '2026-01-27 17:09:59', '2026-01-27 17:09:59'),
(40, 48, 5000, '2026-01-27 17:09:59', '2026-01-27 17:09:59'),
(41, 49, 3000, '2026-01-27 17:15:12', '2026-01-27 17:15:12'),
(42, 49, 4400, '2026-01-27 17:15:12', '2026-01-27 17:15:12'),
(43, 49, 7450, '2026-01-27 17:15:12', '2026-01-27 17:15:12'),
(44, 49, 3115, '2026-01-27 17:15:12', '2026-01-27 17:15:12'),
(45, 49, 4750, '2026-01-27 17:15:12', '2026-01-27 17:15:12'),
(46, 50, 3200, '2026-01-27 17:17:23', '2026-01-27 17:17:23'),
(47, 50, 6000, '2026-01-27 17:17:23', '2026-01-27 17:17:23'),
(48, 50, 3950, '2026-01-27 17:17:23', '2026-01-27 17:17:23'),
(49, 51, 21000, '2026-01-27 17:18:42', '2026-01-27 17:18:42'),
(50, 51, 1900, '2026-01-27 17:18:42', '2026-01-27 17:18:42'),
(51, 52, 1920, '2026-01-27 17:19:40', '2026-01-27 17:19:40'),
(52, 52, 3000, '2026-01-27 17:19:40', '2026-01-27 17:19:40'),
(53, 53, 7150, '2026-01-27 17:20:51', '2026-01-27 17:20:51'),
(54, 54, 2380, '2026-01-27 17:22:38', '2026-01-27 17:22:38'),
(55, 54, 6150, '2026-01-27 17:22:38', '2026-01-27 17:22:38'),
(56, 55, 12833, '2026-01-27 17:23:53', '2026-01-27 17:23:53'),
(57, 55, 7725, '2026-01-27 17:23:53', '2026-01-27 17:23:53'),
(58, 56, 5450, '2026-01-27 17:26:53', '2026-01-27 17:26:53'),
(59, 57, 13800, '2026-01-27 17:31:09', '2026-01-27 17:31:09'),
(60, 58, 17150, '2026-01-27 17:32:52', '2026-01-27 17:32:52'),
(61, 59, 5000, '2026-01-27 17:37:35', '2026-01-27 17:37:35'),
(62, 59, 12000, '2026-01-27 17:37:35', '2026-01-27 17:37:35'),
(63, 59, 3550, '2026-01-27 17:37:35', '2026-01-27 17:37:35'),
(64, 59, 3240, '2026-01-27 17:37:35', '2026-01-27 17:37:35'),
(65, 60, 450, '2026-01-27 17:45:53', '2026-01-27 17:45:53'),
(66, 60, 4000, '2026-01-27 17:45:53', '2026-01-27 17:45:53'),
(67, 60, 1470, '2026-01-27 17:45:53', '2026-01-27 17:45:53'),
(68, 61, 3550, '2026-01-27 17:57:02', '2026-01-27 17:57:02'),
(69, 61, 3950, '2026-01-27 17:57:02', '2026-01-27 17:57:02'),
(70, 62, 2700, '2026-01-27 18:03:15', '2026-01-27 18:03:15'),
(71, 62, 975, '2026-01-27 18:03:15', '2026-01-27 18:03:15'),
(72, 62, 7875, '2026-01-27 18:03:15', '2026-01-27 18:03:15'),
(73, 63, 5000, '2026-01-27 18:03:43', '2026-01-27 18:03:43'),
(74, 64, 2000, '2026-01-27 18:04:23', '2026-01-27 18:04:23'),
(75, 65, 10000, '2026-01-27 18:07:23', '2026-01-27 18:07:23'),
(76, 66, 5000, '2026-01-27 18:11:40', '2026-01-27 18:11:40'),
(77, 67, 7401, '2026-01-27 18:16:05', '2026-01-27 18:16:05'),
(78, 67, 5700, '2026-01-27 18:16:05', '2026-01-27 18:16:05'),
(79, 67, 21000, '2026-01-27 18:16:05', '2026-01-27 18:16:05'),
(80, 68, 5000, '2026-01-27 18:23:17', '2026-01-27 18:23:17'),
(81, 68, 21000, '2026-01-27 18:23:17', '2026-01-27 18:23:17'),
(82, 68, 2500, '2026-01-27 18:23:17', '2026-01-27 18:23:17'),
(83, 68, 2430, '2026-01-27 18:23:17', '2026-01-27 18:23:17'),
(84, 68, 5000, '2026-01-27 18:23:17', '2026-01-27 18:23:17'),
(85, 69, 6000, '2026-01-27 18:23:48', '2026-01-27 18:23:48'),
(86, 70, 9265, '2026-01-27 18:28:21', '2026-01-27 18:28:21'),
(87, 70, 6167, '2026-01-27 18:28:21', '2026-01-27 18:28:21'),
(88, 70, 6800, '2026-01-27 18:28:21', '2026-01-27 18:28:21'),
(89, 71, 10000, '2026-01-27 18:32:13', '2026-01-27 18:32:13'),
(90, 71, 5000, '2026-01-27 18:32:13', '2026-01-27 18:32:13'),
(91, 71, 4230, '2026-01-27 18:32:13', '2026-01-27 18:32:13'),
(92, 72, 5000, '2026-01-27 18:37:24', '2026-01-27 18:37:24'),
(93, 73, 5000, '2026-01-27 18:42:22', '2026-01-27 18:42:22'),
(94, 74, 6000, '2026-01-27 18:59:02', '2026-01-27 18:59:02'),
(95, 74, 6000, '2026-01-27 18:59:02', '2026-01-27 18:59:02'),
(96, 75, 6000, '2026-01-27 19:00:04', '2026-01-27 19:00:04'),
(97, 76, 6000, '2026-01-27 19:00:43', '2026-01-27 19:00:43'),
(98, 77, 2500, '2026-01-27 19:16:51', '2026-01-27 19:16:51'),
(99, 77, 2200, '2026-01-27 19:16:51', '2026-01-27 19:16:51'),
(100, 77, 1760, '2026-01-27 19:16:51', '2026-01-27 19:16:51'),
(101, 78, 5000, '2026-01-27 19:18:11', '2026-01-27 19:18:11'),
(102, 78, 10000, '2026-01-27 19:18:11', '2026-01-27 19:18:11'),
(103, 79, 5000, '2026-01-27 19:21:14', '2026-01-27 19:21:14'),
(104, 79, 6000, '2026-01-27 19:21:14', '2026-01-27 19:21:14'),
(105, 79, 10000, '2026-01-27 19:21:14', '2026-01-27 19:21:14'),
(106, 79, 4185, '2026-01-27 19:21:14', '2026-01-27 19:21:14'),
(107, 79, 3060, '2026-01-27 19:21:14', '2026-01-27 19:21:14'),
(108, 79, 5000, '2026-01-27 19:21:14', '2026-01-27 19:21:14'),
(109, 80, 5000, '2026-01-27 19:22:42', '2026-01-27 19:22:42'),
(110, 81, 1530, '2026-01-27 19:32:32', '2026-01-27 19:32:32'),
(111, 81, 21000, '2026-01-27 19:32:32', '2026-01-27 19:32:32'),
(112, 81, 8155, '2026-01-27 19:32:32', '2026-01-27 19:32:32'),
(113, 81, 7290, '2026-01-27 19:32:32', '2026-01-27 19:32:32'),
(114, 81, 3450, '2026-01-27 19:32:32', '2026-01-27 19:32:32'),
(115, 81, 5000, '2026-01-27 19:32:32', '2026-01-27 19:32:32'),
(116, 82, 3449, '2026-01-27 19:39:19', '2026-01-27 19:39:19'),
(117, 82, 21000, '2026-01-27 19:39:19', '2026-01-27 19:39:19'),
(118, 82, 3560, '2026-01-27 19:39:19', '2026-01-27 19:39:19'),
(119, 82, 4200, '2026-01-27 19:39:19', '2026-01-27 19:39:19'),
(120, 82, 2610, '2026-01-27 19:39:19', '2026-01-27 19:39:19'),
(121, 82, 5000, '2026-01-27 19:39:19', '2026-01-27 19:39:19'),
(122, 83, 2080, '2026-01-27 19:41:32', '2026-01-27 19:41:32'),
(123, 83, 1000, '2026-01-27 19:41:32', '2026-01-27 19:41:32'),
(124, 84, 1000, '2026-01-27 19:45:29', '2026-01-27 19:45:29'),
(125, 84, 2500, '2026-01-27 19:45:29', '2026-01-27 19:45:29'),
(126, 85, 3105, '2026-01-27 19:51:26', '2026-01-27 19:51:26'),
(127, 85, 910, '2026-01-27 19:51:26', '2026-01-27 19:51:26'),
(128, 86, 8500, '2026-01-27 19:55:57', '2026-01-27 19:55:57'),
(129, 86, 2000, '2026-01-27 19:55:57', '2026-01-27 19:55:57'),
(130, 87, 5100, '2026-01-27 20:01:49', '2026-01-27 20:01:49'),
(131, 88, 11400, '2026-01-27 20:03:47', '2026-01-27 20:03:47'),
(132, 88, 1850, '2026-01-27 20:03:47', '2026-01-27 20:03:47'),
(133, 89, 5100, '2026-01-27 20:06:27', '2026-01-27 20:06:27'),
(134, 90, 3240, '2026-01-27 20:11:54', '2026-01-27 20:11:54'),
(135, 91, 6167, '2026-01-27 20:19:00', '2026-01-27 20:19:00'),
(136, 91, 13667, '2026-01-27 20:19:00', '2026-01-27 20:19:00'),
(137, 91, 9000, '2026-01-27 20:19:00', '2026-01-27 20:19:00'),
(138, 91, 5000, '2026-01-27 20:19:00', '2026-01-27 20:19:00'),
(139, 92, 5000, '2026-01-27 20:21:23', '2026-01-27 20:21:23'),
(140, 92, 6000, '2026-01-27 20:21:23', '2026-01-27 20:21:23'),
(141, 92, 10290, '2026-01-27 20:21:23', '2026-01-27 20:21:23'),
(142, 92, 4350, '2026-01-27 20:21:23', '2026-01-27 20:21:23'),
(143, 92, 5000, '2026-01-27 20:21:23', '2026-01-27 20:21:23'),
(144, 93, 3900, '2026-01-27 20:25:20', '2026-01-27 20:25:20'),
(145, 93, 4450, '2026-01-27 20:25:20', '2026-01-27 20:25:20'),
(146, 93, 2790, '2026-01-27 20:25:20', '2026-01-27 20:25:20'),
(147, 94, 3725, '2026-01-27 20:26:32', '2026-01-27 20:26:32'),
(148, 94, 5670, '2026-01-27 20:26:32', '2026-01-27 20:26:32'),
(149, 95, 5700, '2026-01-27 20:38:50', '2026-01-27 20:38:50'),
(150, 95, 6000, '2026-01-27 20:38:50', '2026-01-27 20:38:50'),
(151, 95, 4000, '2026-01-27 20:38:50', '2026-01-27 20:38:50'),
(152, 95, 880, '2026-01-27 20:38:50', '2026-01-27 20:38:50'),
(153, 96, 4400, '2026-01-27 20:41:24', '2026-01-27 20:41:24'),
(154, 96, 6580, '2026-01-27 20:41:24', '2026-01-27 20:41:24'),
(155, 97, 7500, '2026-01-27 20:46:29', '2026-01-27 20:46:29'),
(156, 98, 5100, '2026-01-27 20:52:50', '2026-01-27 20:52:50'),
(157, 99, 13050, '2026-01-27 20:58:16', '2026-01-27 20:58:16'),
(158, 100, 4500, '2026-01-27 20:59:56', '2026-01-27 20:59:56'),
(159, 101, 5000, '2026-01-27 21:00:23', '2026-01-27 21:00:23'),
(160, 101, 5000, '2026-01-27 21:00:23', '2026-01-27 21:00:23'),
(161, 102, 6000, '2026-01-27 21:09:40', '2026-01-27 21:09:40'),
(162, 102, 6650, '2026-01-27 21:09:40', '2026-01-27 21:09:40'),
(163, 103, 5000, '2026-01-27 21:25:32', '2026-01-27 21:25:32'),
(164, 103, 1250, '2026-01-27 21:25:32', '2026-01-27 21:25:32'),
(165, 103, 320, '2026-01-27 21:25:32', '2026-01-27 21:25:32'),
(166, 103, 1015, '2026-01-27 21:25:32', '2026-01-27 21:25:32'),
(167, 104, 2467, '2026-01-27 21:30:24', '2026-01-27 21:30:24'),
(168, 104, 1440, '2026-01-27 21:30:24', '2026-01-27 21:30:24'),
(169, 104, 2000, '2026-01-27 21:30:24', '2026-01-27 21:30:24'),
(170, 105, 5000, '2026-01-27 21:57:53', '2026-01-27 21:57:53'),
(171, 106, 14250, '2026-01-28 08:37:10', '2026-01-28 08:37:10'),
(172, 106, 12400, '2026-01-28 08:37:10', '2026-01-28 08:37:10'),
(173, 107, 6000, '2026-01-28 08:45:40', '2026-01-28 08:45:40'),
(174, 107, 2610, '2026-01-28 08:45:40', '2026-01-28 08:45:40'),
(175, 108, 5000, '2026-01-28 09:11:48', '2026-01-28 09:11:48'),
(176, 109, 5000, '2026-01-28 09:12:11', '2026-01-28 09:12:11'),
(177, 110, 8745, '2026-01-28 09:16:57', '2026-01-28 09:16:57'),
(186, 113, 9700, '2026-01-28 09:41:39', '2026-01-28 09:41:39'),
(187, 113, 5700, '2026-01-28 09:41:39', '2026-01-28 09:41:39'),
(188, 113, 5000, '2026-01-28 09:41:39', '2026-01-28 09:41:39'),
(189, 113, 10000, '2026-01-28 09:41:39', '2026-01-28 09:41:39'),
(190, 114, 5021, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(191, 114, 3540, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(192, 114, 2600, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(193, 114, 6400, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(194, 114, 2467, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(195, 114, 2467, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(196, 114, 2006, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(197, 114, 2419, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(198, 114, 5063, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(199, 115, 1515, '2026-01-28 09:56:22', '2026-01-28 09:56:22'),
(200, 115, 1000, '2026-01-28 09:56:22', '2026-01-28 09:56:22'),
(201, 116, 1515, '2026-01-28 09:57:53', '2026-01-28 09:57:53'),
(202, 116, 1000, '2026-01-28 09:57:53', '2026-01-28 09:57:53'),
(203, 117, 2100, '2026-01-28 10:15:20', '2026-01-28 10:15:20'),
(204, 118, 2100, '2026-01-28 10:16:16', '2026-01-28 10:16:16'),
(205, 119, 5333, '2026-01-28 10:17:20', '2026-01-28 10:17:20'),
(206, 120, 7250, '2026-01-28 10:46:09', '2026-01-28 10:46:09'),
(207, 121, 7250, '2026-01-28 10:46:41', '2026-01-28 10:46:41'),
(208, 122, 10000, '2026-01-28 10:48:32', '2026-01-28 10:48:32'),
(209, 123, 10000, '2026-01-28 11:19:27', '2026-01-28 11:19:27'),
(210, 123, 6000, '2026-01-28 11:19:27', '2026-01-28 11:19:27'),
(211, 123, 16125, '2026-01-28 11:19:27', '2026-01-28 11:19:27'),
(212, 123, 5250, '2026-01-28 11:19:27', '2026-01-28 11:19:27'),
(213, 123, 9625, '2026-01-28 11:19:27', '2026-01-28 11:19:27'),
(214, 124, 10400, '2026-01-28 11:20:03', '2026-01-28 11:20:03'),
(215, 125, 10666, '2026-01-28 11:21:32', '2026-01-28 11:21:32'),
(216, 126, 5571, '2026-01-28 11:24:28', '2026-01-28 11:24:28'),
(217, 126, 19000, '2026-01-28 11:24:28', '2026-01-28 11:24:28'),
(218, 126, 5900, '2026-01-28 11:24:28', '2026-01-28 11:24:28'),
(219, 127, 8600, '2026-01-28 11:25:27', '2026-01-28 11:25:27'),
(222, 129, 2200, '2026-01-28 11:32:56', '2026-01-28 11:32:56'),
(223, 129, 4400, '2026-01-28 11:32:56', '2026-01-28 11:32:56'),
(227, 131, 5333, '2026-01-28 11:41:21', '2026-01-28 11:41:21'),
(228, 131, 1900, '2026-01-28 11:41:21', '2026-01-28 11:41:21'),
(229, 131, 1740, '2026-01-28 11:41:21', '2026-01-28 11:41:21'),
(230, 132, 5000, '2026-01-28 11:55:46', '2026-01-28 11:55:46'),
(231, 132, 8600, '2026-01-28 11:55:46', '2026-01-28 11:55:46'),
(232, 132, 4080, '2026-01-28 11:55:46', '2026-01-28 11:55:46'),
(233, 132, 3360, '2026-01-28 11:55:46', '2026-01-28 11:55:46'),
(234, 132, 2840, '2026-01-28 11:55:46', '2026-01-28 11:55:46'),
(235, 133, 11400, '2026-01-28 13:25:23', '2026-01-28 13:25:23'),
(236, 133, 3360, '2026-01-28 13:25:23', '2026-01-28 13:25:23'),
(237, 134, 13800, '2026-01-28 13:42:35', '2026-01-28 13:42:35'),
(238, 134, 10000, '2026-01-28 13:42:35', '2026-01-28 13:42:35'),
(239, 135, 5000, '2026-01-28 13:58:12', '2026-01-28 13:58:12'),
(240, 135, 5880, '2026-01-28 13:58:12', '2026-01-28 13:58:12'),
(241, 135, 2450, '2026-01-28 13:58:12', '2026-01-28 13:58:12'),
(242, 135, 13250, '2026-01-28 13:58:12', '2026-01-28 13:58:12'),
(243, 136, 10750, '2026-01-28 14:13:33', '2026-01-28 14:13:33'),
(244, 137, 6000, '2026-01-28 14:19:43', '2026-01-28 14:19:43'),
(245, 138, 3000, '2026-01-28 15:09:39', '2026-01-28 15:09:39'),
(246, 138, 10000, '2026-01-28 15:09:39', '2026-01-28 15:09:39'),
(247, 138, 4300, '2026-01-28 15:09:39', '2026-01-28 15:09:39'),
(248, 138, 16500, '2026-01-28 15:09:39', '2026-01-28 15:09:39'),
(249, 139, 3300, '2026-01-28 15:12:21', '2026-01-28 15:12:21'),
(250, 139, 3800, '2026-01-28 15:12:21', '2026-01-28 15:12:21'),
(251, 140, 5700, '2026-01-28 15:14:51', '2026-01-28 15:14:51'),
(252, 140, 6000, '2026-01-28 15:14:51', '2026-01-28 15:14:51'),
(253, 141, 7850, '2026-01-28 15:27:21', '2026-01-28 15:27:21'),
(254, 142, 9180, '2026-01-28 15:45:41', '2026-01-28 15:45:41'),
(255, 142, 14000, '2026-01-28 15:45:41', '2026-01-28 15:45:41'),
(256, 143, 5000, '2026-01-28 15:47:19', '2026-01-28 15:47:19'),
(259, 145, 3980, '2026-01-28 15:58:17', '2026-01-28 15:58:17'),
(260, 145, 10200, '2026-01-28 15:58:17', '2026-01-28 15:58:17'),
(261, 146, 1750, '2026-01-28 16:41:14', '2026-01-28 16:41:14'),
(262, 146, 3750, '2026-01-28 16:41:14', '2026-01-28 16:41:14'),
(263, 147, 10000, '2026-01-28 16:53:01', '2026-01-28 16:53:01'),
(264, 148, 3400, '2026-01-28 16:56:08', '2026-01-28 16:56:08'),
(265, 148, 1950, '2026-01-28 16:56:08', '2026-01-28 16:56:08'),
(266, 148, 2000, '2026-01-28 16:56:08', '2026-01-28 16:56:08'),
(267, 148, 5000, '2026-01-28 16:56:08', '2026-01-28 16:56:08'),
(268, 148, 5000, '2026-01-28 16:56:08', '2026-01-28 16:56:08'),
(269, 149, 7500, '2026-01-28 17:04:22', '2026-01-28 17:04:22'),
(270, 149, 8700, '2026-01-28 17:04:22', '2026-01-28 17:04:22'),
(271, 149, 1975, '2026-01-28 17:04:22', '2026-01-28 17:04:22'),
(272, 149, 6000, '2026-01-28 17:04:22', '2026-01-28 17:04:22'),
(273, 149, 5400, '2026-01-28 17:04:22', '2026-01-28 17:04:22'),
(274, 149, 1600, '2026-01-28 17:04:22', '2026-01-28 17:04:22'),
(275, 149, 855, '2026-01-28 17:04:22', '2026-01-28 17:04:22'),
(276, 150, 2100, '2026-01-28 17:11:15', '2026-01-28 17:11:15'),
(277, 150, 2280, '2026-01-28 17:11:15', '2026-01-28 17:11:15'),
(278, 151, 5000, '2026-01-28 17:18:15', '2026-01-28 17:18:15'),
(279, 152, 5000, '2026-01-28 17:19:08', '2026-01-28 17:19:08'),
(280, 153, 5000, '2026-01-28 17:22:16', '2026-01-28 17:22:16'),
(281, 153, 3120, '2026-01-28 17:22:16', '2026-01-28 17:22:16'),
(282, 154, 7750, '2026-01-28 17:23:13', '2026-01-28 17:23:13'),
(283, 154, 7100, '2026-01-28 17:23:13', '2026-01-28 17:23:13'),
(284, 155, 10200, '2026-01-28 17:23:47', '2026-01-28 17:23:47'),
(285, 156, 11850, '2026-01-28 17:24:36', '2026-01-28 17:24:36'),
(286, 157, 4934, '2026-01-28 17:26:10', '2026-01-28 17:26:10'),
(287, 157, 1485, '2026-01-28 17:26:10', '2026-01-28 17:26:10'),
(288, 157, 8055, '2026-01-28 17:26:10', '2026-01-28 17:26:10'),
(289, 158, 3605, '2026-01-28 17:27:09', '2026-01-28 17:27:09'),
(290, 158, 6000, '2026-01-28 17:27:09', '2026-01-28 17:27:09'),
(291, 159, 3200, '2026-01-28 17:30:34', '2026-01-28 17:30:34'),
(292, 159, 1515, '2026-01-28 17:30:34', '2026-01-28 17:30:34'),
(293, 159, 4400, '2026-01-28 17:30:34', '2026-01-28 17:30:34'),
(294, 159, 1715, '2026-01-28 17:30:34', '2026-01-28 17:30:34'),
(295, 159, 2550, '2026-01-28 17:30:34', '2026-01-28 17:30:34'),
(296, 160, 3000, '2026-01-28 17:31:02', '2026-01-28 17:31:02'),
(297, 160, 5000, '2026-01-28 17:31:02', '2026-01-28 17:31:02'),
(298, 161, 10725, '2026-01-28 17:33:26', '2026-01-28 17:33:26'),
(299, 162, 10250, '2026-01-28 17:34:23', '2026-01-28 17:34:23'),
(300, 163, 13000, '2026-01-28 17:38:01', '2026-01-28 17:38:01'),
(301, 163, 6675, '2026-01-28 17:38:01', '2026-01-28 17:38:01'),
(302, 164, 6900, '2026-01-28 17:38:29', '2026-01-28 17:38:29'),
(303, 165, 21000, '2026-01-28 17:41:18', '2026-01-28 17:41:18'),
(304, 165, 11950, '2026-01-28 17:41:18', '2026-01-28 17:41:18'),
(305, 166, 2250, '2026-01-28 17:52:37', '2026-01-28 17:52:37'),
(306, 166, 20175, '2026-01-28 17:52:37', '2026-01-28 17:52:37'),
(307, 167, 1920, '2026-01-28 18:07:48', '2026-01-28 18:07:48'),
(308, 167, 3600, '2026-01-28 18:07:48', '2026-01-28 18:07:48'),
(309, 167, 2160, '2026-01-28 18:07:48', '2026-01-28 18:07:48'),
(310, 167, 10000, '2026-01-28 18:07:48', '2026-01-28 18:07:48'),
(311, 167, 5000, '2026-01-28 18:07:48', '2026-01-28 18:07:48'),
(312, 168, 10000, '2026-01-28 18:08:11', '2026-01-28 18:08:11'),
(313, 169, 2575, '2026-01-28 18:29:46', '2026-01-28 18:29:46'),
(314, 169, 1980, '2026-01-28 18:29:46', '2026-01-28 18:29:46'),
(315, 170, 3667, '2026-01-28 18:44:03', '2026-01-28 18:44:03'),
(316, 170, 2500, '2026-01-28 18:44:03', '2026-01-28 18:44:03'),
(317, 170, 1875, '2026-01-28 18:44:03', '2026-01-28 18:44:03'),
(318, 170, 3280, '2026-01-28 18:44:03', '2026-01-28 18:44:03'),
(319, 170, 5350, '2026-01-28 18:44:03', '2026-01-28 18:44:03'),
(320, 171, 1000, '2026-01-28 19:10:29', '2026-01-28 19:10:29'),
(321, 171, 2025, '2026-01-28 19:10:29', '2026-01-28 19:10:29'),
(322, 172, 2500, '2026-01-28 19:15:48', '2026-01-28 19:15:48'),
(323, 172, 6000, '2026-01-28 19:15:48', '2026-01-28 19:15:48'),
(324, 172, 6000, '2026-01-28 19:15:48', '2026-01-28 19:15:48'),
(325, 172, 1015, '2026-01-28 19:15:48', '2026-01-28 19:15:48'),
(326, 173, 19000, '2026-01-28 19:16:28', '2026-01-28 19:16:28'),
(327, 174, 7500, '2026-01-28 19:17:59', '2026-01-28 19:17:59'),
(328, 174, 1000, '2026-01-28 19:17:59', '2026-01-28 19:17:59'),
(329, 174, 12050, '2026-01-28 19:17:59', '2026-01-28 19:17:59'),
(330, 175, 6950, '2026-01-28 19:29:23', '2026-01-28 19:29:23'),
(331, 175, 1650, '2026-01-28 19:29:23', '2026-01-28 19:29:23'),
(332, 176, 7500, '2026-01-28 19:34:07', '2026-01-28 19:34:07'),
(333, 177, 2800, '2026-01-28 19:35:53', '2026-01-28 19:35:53'),
(334, 178, 2467, '2026-01-28 19:49:33', '2026-01-28 19:49:33'),
(335, 178, 3000, '2026-01-28 19:49:33', '2026-01-28 19:49:33'),
(336, 178, 7150, '2026-01-28 19:49:33', '2026-01-28 19:49:33'),
(337, 179, 11400, '2026-01-28 19:50:22', '2026-01-28 19:50:22'),
(338, 179, 5000, '2026-01-28 19:50:22', '2026-01-28 19:50:22'),
(339, 180, 3800, '2026-01-28 19:52:13', '2026-01-28 19:52:13'),
(340, 180, 3600, '2026-01-28 19:52:13', '2026-01-28 19:52:13'),
(341, 181, 8223, '2026-01-28 19:55:08', '2026-01-28 19:55:08'),
(342, 181, 5100, '2026-01-28 19:55:08', '2026-01-28 19:55:08'),
(343, 182, 1545, '2026-01-28 20:01:55', '2026-01-28 20:01:55'),
(344, 182, 5000, '2026-01-28 20:01:55', '2026-01-28 20:01:55'),
(345, 182, 2240, '2026-01-28 20:01:55', '2026-01-28 20:01:55'),
(346, 183, 5000, '2026-01-28 20:02:57', '2026-01-28 20:02:57'),
(347, 184, 8775, '2026-01-28 20:11:26', '2026-01-28 20:11:26'),
(348, 185, 4678, '2026-01-28 20:17:11', '2026-01-28 20:17:11'),
(349, 185, 4950, '2026-01-28 20:17:11', '2026-01-28 20:17:11'),
(350, 186, 630, '2026-01-28 20:19:33', '2026-01-28 20:19:33'),
(351, 187, 2200, '2026-01-28 20:20:03', '2026-01-28 20:20:03'),
(352, 188, 4400, '2026-01-28 20:22:29', '2026-01-28 20:22:29'),
(353, 189, 8055, '2026-01-28 20:23:51', '2026-01-28 20:23:51'),
(354, 190, 5670, '2026-01-28 20:28:45', '2026-01-28 20:28:45'),
(355, 190, 900, '2026-01-28 20:28:45', '2026-01-28 20:28:45'),
(356, 190, 1715, '2026-01-28 20:28:45', '2026-01-28 20:28:45'),
(357, 190, 3465, '2026-01-28 20:28:45', '2026-01-28 20:28:45'),
(358, 191, 5700, '2026-01-28 20:34:51', '2026-01-28 20:34:51'),
(359, 192, 1000, '2026-01-28 20:42:11', '2026-01-28 20:42:11'),
(360, 192, 12000, '2026-01-28 20:42:11', '2026-01-28 20:42:11'),
(361, 193, 3240, '2026-01-28 20:49:06', '2026-01-28 20:49:06'),
(362, 193, 3115, '2026-01-28 20:49:06', '2026-01-28 20:49:06'),
(363, 193, 4185, '2026-01-28 20:49:06', '2026-01-28 20:49:06'),
(364, 194, 6400, '2026-01-28 20:51:24', '2026-01-28 20:51:24'),
(365, 194, 3000, '2026-01-28 20:51:24', '2026-01-28 20:51:24'),
(366, 194, 3675, '2026-01-28 20:51:24', '2026-01-28 20:51:24'),
(367, 195, 4000, '2026-01-28 21:00:56', '2026-01-28 21:00:56'),
(368, 196, 0, '2026-01-28 21:04:12', '2026-01-28 21:04:12'),
(369, 197, 3400, '2026-01-28 21:06:10', '2026-01-28 21:06:10'),
(370, 197, 6600, '2026-01-28 21:06:10', '2026-01-28 21:06:10'),
(371, 198, 7950, '2026-01-28 21:17:10', '2026-01-28 21:17:10'),
(372, 198, 10000, '2026-01-28 21:17:10', '2026-01-28 21:17:10'),
(373, 198, 3815, '2026-01-28 21:17:10', '2026-01-28 21:17:10'),
(374, 198, 5000, '2026-01-28 21:17:10', '2026-01-28 21:17:10'),
(375, 198, 9625, '2026-01-28 21:17:10', '2026-01-28 21:17:10'),
(376, 199, 5333, '2026-01-28 21:18:40', '2026-01-28 21:18:40'),
(377, 200, 2750, '2026-01-28 21:30:07', '2026-01-28 21:30:07'),
(378, 200, 1000, '2026-01-28 21:30:07', '2026-01-28 21:30:07'),
(379, 200, 8715, '2026-01-28 21:30:07', '2026-01-28 21:30:07'),
(380, 200, 10400, '2026-01-28 21:30:07', '2026-01-28 21:30:07'),
(381, 201, 1400, '2026-01-28 21:31:26', '2026-01-28 21:31:26'),
(382, 202, 5100, '2026-01-28 22:04:11', '2026-01-28 22:04:11'),
(383, 202, 4000, '2026-01-28 22:04:11', '2026-01-28 22:04:11'),
(384, 203, 8000, '2026-01-28 22:07:29', '2026-01-28 22:07:29'),
(385, 204, 12213, '2026-01-29 08:59:19', '2026-01-29 08:59:19'),
(386, 205, 22315, '2026-01-29 09:16:10', '2026-01-29 09:16:10'),
(387, 205, 11977, '2026-01-29 09:16:10', '2026-01-29 09:16:10'),
(388, 206, 11400, '2026-01-29 09:48:49', '2026-01-29 09:48:49'),
(389, 206, 1000, '2026-01-29 09:48:49', '2026-01-29 09:48:49'),
(390, 207, 645, '2026-01-29 10:52:52', '2026-01-29 10:52:52'),
(391, 207, 3000, '2026-01-29 10:52:52', '2026-01-29 10:52:52'),
(392, 207, 5000, '2026-01-29 10:52:52', '2026-01-29 10:52:52'),
(393, 207, 2940, '2026-01-29 10:52:52', '2026-01-29 10:52:52'),
(394, 207, 1652, '2026-01-29 10:52:52', '2026-01-29 10:52:52'),
(395, 207, 2750, '2026-01-29 10:52:52', '2026-01-29 10:52:52'),
(396, 208, 9450, '2026-01-29 11:11:20', '2026-01-29 11:11:20'),
(397, 208, 20000, '2026-01-29 11:11:20', '2026-01-29 11:11:20'),
(398, 209, 16575, '2026-01-29 11:35:43', '2026-01-29 11:35:43'),
(399, 209, 22800, '2026-01-29 11:35:43', '2026-01-29 11:35:43'),
(400, 209, 1000, '2026-01-29 11:35:43', '2026-01-29 11:35:43'),
(401, 210, 1000, '2026-01-29 11:41:59', '2026-01-29 11:41:59'),
(402, 210, 1925, '2026-01-29 11:41:59', '2026-01-29 11:41:59'),
(403, 210, 4455, '2026-01-29 11:41:59', '2026-01-29 11:41:59'),
(404, 211, 12833, '2026-01-29 12:05:06', '2026-01-29 12:05:06'),
(405, 211, 4770, '2026-01-29 12:05:06', '2026-01-29 12:05:06'),
(406, 212, 1000, '2026-01-29 12:08:03', '2026-01-29 12:08:03'),
(407, 212, 7100, '2026-01-29 12:08:03', '2026-01-29 12:08:03'),
(408, 212, 5000, '2026-01-29 12:08:03', '2026-01-29 12:08:03'),
(409, 213, 6000, '2026-01-29 12:09:17', '2026-01-29 12:09:17'),
(410, 214, 7650, '2026-01-29 12:11:57', '2026-01-29 12:11:57'),
(411, 214, 3060, '2026-01-29 12:11:57', '2026-01-29 12:11:57'),
(412, 214, 3255, '2026-01-29 12:11:57', '2026-01-29 12:11:57'),
(413, 214, 4350, '2026-01-29 12:11:57', '2026-01-29 12:11:57'),
(414, 215, 2200, '2026-01-29 12:13:22', '2026-01-29 12:13:22'),
(415, 215, 5200, '2026-01-29 12:13:22', '2026-01-29 12:13:22'),
(416, 215, 5250, '2026-01-29 12:13:22', '2026-01-29 12:13:22'),
(417, 216, 12833, '2026-01-29 12:15:35', '2026-01-29 12:15:35'),
(418, 216, 3600, '2026-01-29 12:15:35', '2026-01-29 12:15:35'),
(419, 216, 5000, '2026-01-29 12:15:35', '2026-01-29 12:15:35'),
(420, 217, 1000, '2026-01-29 12:17:52', '2026-01-29 12:17:52'),
(421, 217, 875, '2026-01-29 12:17:52', '2026-01-29 12:17:52'),
(422, 217, 1100, '2026-01-29 12:17:52', '2026-01-29 12:17:52'),
(423, 217, 6000, '2026-01-29 12:17:52', '2026-01-29 12:17:52'),
(424, 218, 5000, '2026-01-29 12:47:39', '2026-01-29 12:47:39'),
(425, 218, 10050, '2026-01-29 12:47:39', '2026-01-29 12:47:39'),
(428, 220, 1515, '2026-01-29 13:42:32', '2026-01-29 13:42:32'),
(429, 220, 3000, '2026-01-29 13:42:32', '2026-01-29 13:42:32'),
(430, 221, 4400, '2026-01-29 13:44:12', '2026-01-29 13:44:12'),
(431, 221, 7280, '2026-01-29 13:44:12', '2026-01-29 13:44:12'),
(432, 222, 2467, '2026-01-29 13:45:44', '2026-01-29 13:45:44'),
(433, 222, 6000, '2026-01-29 13:45:44', '2026-01-29 13:45:44'),
(434, 222, 7693, '2026-01-29 13:45:44', '2026-01-29 13:45:44'),
(435, 223, 4000, '2026-01-29 13:51:20', '2026-01-29 13:51:20'),
(436, 223, 2834, '2026-01-29 13:51:20', '2026-01-29 13:51:20'),
(437, 224, 5700, '2026-01-29 13:54:27', '2026-01-29 13:54:27'),
(438, 224, 10000, '2026-01-29 13:54:27', '2026-01-29 13:54:27'),
(439, 224, 14000, '2026-01-29 13:54:27', '2026-01-29 13:54:27'),
(440, 225, 7176, '2026-01-29 13:55:38', '2026-01-29 13:55:38'),
(441, 225, 16000, '2026-01-29 13:55:38', '2026-01-29 13:55:38'),
(442, 226, 2536, '2026-01-29 14:21:50', '2026-01-29 14:21:50'),
(443, 226, 2200, '2026-01-29 14:21:50', '2026-01-29 14:21:50'),
(444, 226, 9700, '2026-01-29 14:21:50', '2026-01-29 14:21:50'),
(445, 226, 1870, '2026-01-29 14:21:50', '2026-01-29 14:21:50'),
(446, 226, 5700, '2026-01-29 14:21:50', '2026-01-29 14:21:50'),
(447, 227, 1000, '2026-01-29 15:00:39', '2026-01-29 15:00:39'),
(448, 227, 4525, '2026-01-29 15:00:39', '2026-01-29 15:00:39'),
(449, 227, 6850, '2026-01-29 15:00:39', '2026-01-29 15:00:39'),
(450, 228, 5000, '2026-01-29 15:04:50', '2026-01-29 15:04:50'),
(451, 228, 12334, '2026-01-29 15:04:50', '2026-01-29 15:04:50'),
(452, 228, 10560, '2026-01-29 15:04:50', '2026-01-29 15:04:50'),
(453, 229, 3550, '2026-01-29 15:13:18', '2026-01-29 15:13:18'),
(454, 229, 3400, '2026-01-29 15:13:18', '2026-01-29 15:13:18'),
(455, 229, 4000, '2026-01-29 15:13:18', '2026-01-29 15:13:18'),
(456, 229, 1050, '2026-01-29 15:13:18', '2026-01-29 15:13:18'),
(457, 229, 6120, '2026-01-29 15:13:18', '2026-01-29 15:13:18'),
(458, 229, 16000, '2026-01-29 15:13:18', '2026-01-29 15:13:18'),
(459, 230, 2250, '2026-01-29 15:14:46', '2026-01-29 15:14:46'),
(460, 230, 3200, '2026-01-29 15:14:46', '2026-01-29 15:14:46'),
(461, 230, 4400, '2026-01-29 15:14:46', '2026-01-29 15:14:46'),
(462, 231, 12495, '2026-01-29 15:19:57', '2026-01-29 15:19:57'),
(463, 232, 10000, '2026-01-29 16:08:48', '2026-01-29 16:08:48'),
(464, 232, 5240, '2026-01-29 16:08:48', '2026-01-29 16:08:48'),
(465, 232, 7250, '2026-01-29 16:08:48', '2026-01-29 16:08:48'),
(466, 232, 4815, '2026-01-29 16:08:48', '2026-01-29 16:08:48'),
(467, 233, 1635, '2026-01-29 16:15:57', '2026-01-29 16:15:57'),
(468, 233, 4635, '2026-01-29 16:15:57', '2026-01-29 16:15:57'),
(469, 233, 11000, '2026-01-29 16:15:57', '2026-01-29 16:15:57'),
(470, 233, 7648, '2026-01-29 16:15:57', '2026-01-29 16:15:57'),
(471, 234, 1500, '2026-01-29 16:26:29', '2026-01-29 16:26:29'),
(472, 234, 5000, '2026-01-29 16:26:29', '2026-01-29 16:26:29'),
(473, 234, 1000, '2026-01-29 16:26:30', '2026-01-29 16:26:30'),
(474, 235, 10000, '2026-01-29 16:30:17', '2026-01-29 16:30:17'),
(475, 235, 6928, '2026-01-29 16:30:17', '2026-01-29 16:30:17'),
(476, 236, 3625, '2026-01-29 16:45:51', '2026-01-29 16:45:51'),
(477, 236, 5460, '2026-01-29 16:45:51', '2026-01-29 16:45:51'),
(478, 236, 2540, '2026-01-29 16:45:51', '2026-01-29 16:45:51'),
(479, 236, 18000, '2026-01-29 16:45:51', '2026-01-29 16:45:51'),
(480, 237, 6215, '2026-01-29 16:47:14', '2026-01-29 16:47:14'),
(481, 238, 12400, '2026-01-29 16:49:40', '2026-01-29 16:49:40'),
(482, 239, 7500, '2026-01-29 17:13:30', '2026-01-29 17:13:30'),
(483, 240, 1260, '2026-01-29 17:22:36', '2026-01-29 17:22:36'),
(484, 240, 6400, '2026-01-29 17:22:36', '2026-01-29 17:22:36'),
(485, 240, 2870, '2026-01-29 17:22:36', '2026-01-29 17:22:36'),
(486, 241, 1000, '2026-01-29 17:29:34', '2026-01-29 17:29:34'),
(487, 242, 4000, '2026-01-29 17:30:00', '2026-01-29 17:30:00'),
(488, 243, 4000, '2026-01-29 17:33:03', '2026-01-29 17:33:03'),
(489, 244, 12000, '2026-01-29 17:34:29', '2026-01-29 17:34:29'),
(490, 245, 4000, '2026-01-29 17:41:19', '2026-01-29 17:41:19'),
(491, 246, 6400, '2026-01-29 17:51:13', '2026-01-29 17:51:13'),
(492, 246, 5000, '2026-01-29 17:51:13', '2026-01-29 17:51:13'),
(493, 246, 9700, '2026-01-29 17:51:13', '2026-01-29 17:51:13'),
(494, 246, 3640, '2026-01-29 17:51:13', '2026-01-29 17:51:13'),
(495, 246, 11000, '2026-01-29 17:51:13', '2026-01-29 17:51:13'),
(496, 246, 6248, '2026-01-29 17:51:13', '2026-01-29 17:51:13'),
(497, 247, 1785, '2026-01-29 17:53:22', '2026-01-29 17:53:22'),
(498, 247, 1980, '2026-01-29 17:53:22', '2026-01-29 17:53:22'),
(499, 248, 3203, '2026-01-29 17:54:36', '2026-01-29 17:54:36'),
(500, 249, 2550, '2026-01-29 18:13:52', '2026-01-29 18:13:52'),
(501, 249, 3290, '2026-01-29 18:13:52', '2026-01-29 18:13:52'),
(502, 249, 3550, '2026-01-29 18:13:52', '2026-01-29 18:13:52'),
(503, 250, 36000, '2026-01-29 18:21:27', '2026-01-29 18:21:27'),
(504, 251, 13667, '2026-01-29 18:22:56', '2026-01-29 18:22:56'),
(505, 251, 3955, '2026-01-29 18:22:56', '2026-01-29 18:22:56'),
(506, 252, 10000, '2026-01-29 18:31:18', '2026-01-29 18:31:18'),
(507, 253, 1000, '2026-01-29 18:42:20', '2026-01-29 18:42:20'),
(508, 254, 8000, '2026-01-29 18:44:37', '2026-01-29 18:44:37'),
(509, 255, 9000, '2026-01-29 18:52:27', '2026-01-29 18:52:27'),
(510, 255, 1720, '2026-01-29 18:52:27', '2026-01-29 18:52:27'),
(511, 256, 1000, '2026-01-29 19:12:17', '2026-01-29 19:12:17'),
(512, 256, 2500, '2026-01-29 19:12:17', '2026-01-29 19:12:17'),
(513, 257, 10000, '2026-01-29 19:18:00', '2026-01-29 19:18:00'),
(514, 257, 3745, '2026-01-29 19:18:00', '2026-01-29 19:18:00'),
(515, 258, 8000, '2026-01-29 19:18:14', '2026-01-29 19:18:14'),
(516, 259, 1000, '2026-01-29 19:20:55', '2026-01-29 19:20:55'),
(517, 259, 2750, '2026-01-29 19:20:55', '2026-01-29 19:20:55'),
(518, 260, 1320, '2026-01-29 19:27:07', '2026-01-29 19:27:07'),
(519, 260, 8000, '2026-01-29 19:27:07', '2026-01-29 19:27:07'),
(520, 260, 13000, '2026-01-29 19:27:07', '2026-01-29 19:27:07'),
(521, 260, 16000, '2026-01-29 19:27:07', '2026-01-29 19:27:07'),
(522, 261, 6400, '2026-01-29 19:29:03', '2026-01-29 19:29:03'),
(523, 261, 2650, '2026-01-29 19:29:03', '2026-01-29 19:29:03'),
(524, 261, 3500, '2026-01-29 19:29:03', '2026-01-29 19:29:03'),
(525, 261, 1250, '2026-01-29 19:29:03', '2026-01-29 19:29:03'),
(526, 262, 8000, '2026-01-29 19:29:25', '2026-01-29 19:29:25'),
(527, 263, 29100, '2026-01-29 19:31:59', '2026-01-29 19:31:59'),
(528, 263, 7100, '2026-01-29 19:31:59', '2026-01-29 19:31:59'),
(529, 263, 9000, '2026-01-29 19:31:59', '2026-01-29 19:31:59'),
(530, 263, 4880, '2026-01-29 19:31:59', '2026-01-29 19:31:59'),
(531, 264, 12833, '2026-01-29 20:21:22', '2026-01-29 20:21:22'),
(532, 265, 35010, '2026-01-29 21:02:53', '2026-01-29 21:02:53'),
(533, 265, 10160, '2026-01-29 21:02:53', '2026-01-29 21:02:53'),
(534, 266, 5700, '2026-01-29 21:08:33', '2026-01-29 21:08:33'),
(535, 266, 5555, '2026-01-29 21:08:33', '2026-01-29 21:08:33'),
(536, 266, 1000, '2026-01-29 21:08:33', '2026-01-29 21:08:33'),
(537, 267, 3760, '2026-01-29 21:12:20', '2026-01-29 21:12:20'),
(538, 268, 3300, '2026-01-29 21:14:06', '2026-01-29 21:14:06'),
(539, 268, 7300, '2026-01-29 21:14:06', '2026-01-29 21:14:06'),
(540, 268, 16000, '2026-01-29 21:14:06', '2026-01-29 21:14:06'),
(541, 269, 16000, '2026-01-29 21:53:41', '2026-01-29 21:53:41'),
(542, 270, 19000, '2026-01-29 22:32:49', '2026-01-29 22:32:49'),
(543, 270, 46000, '2026-01-29 22:32:49', '2026-01-29 22:32:49'),
(544, 271, 7833, '2026-01-30 08:57:19', '2026-01-30 08:57:19'),
(545, 271, 10000, '2026-01-30 08:57:19', '2026-01-30 08:57:19'),
(546, 272, 21000, '2026-01-30 09:31:39', '2026-01-30 09:31:39'),
(547, 273, 3250, '2026-01-30 09:38:30', '2026-01-30 09:38:30'),
(548, 273, 3195, '2026-01-30 09:38:30', '2026-01-30 09:38:30'),
(549, 274, 3000, '2026-01-30 10:15:34', '2026-01-30 10:15:34'),
(550, 274, 9420, '2026-01-30 10:15:34', '2026-01-30 10:15:34'),
(551, 275, 6000, '2026-01-30 10:24:50', '2026-01-30 10:24:50'),
(552, 275, 3953, '2026-01-30 10:24:50', '2026-01-30 10:24:50'),
(553, 276, 1000, '2026-01-30 10:44:07', '2026-01-30 10:44:07'),
(554, 276, 10000, '2026-01-30 10:44:07', '2026-01-30 10:44:07'),
(555, 276, 16000, '2026-01-30 10:44:07', '2026-01-30 10:44:07'),
(556, 277, 585, '2026-01-30 11:32:40', '2026-01-30 11:32:40'),
(557, 277, 1000, '2026-01-30 11:32:40', '2026-01-30 11:32:40'),
(558, 277, 1550, '2026-01-30 11:32:40', '2026-01-30 11:32:40'),
(559, 277, 6000, '2026-01-30 11:32:40', '2026-01-30 11:32:40'),
(560, 277, 5000, '2026-01-30 11:32:40', '2026-01-30 11:32:40'),
(561, 277, 2700, '2026-01-30 11:32:40', '2026-01-30 11:32:40'),
(562, 278, 11400, '2026-01-30 11:34:51', '2026-01-30 11:34:51'),
(563, 278, 5000, '2026-01-30 11:34:51', '2026-01-30 11:34:51'),
(564, 279, 1387, '2026-01-30 11:37:37', '2026-01-30 11:37:37'),
(565, 279, 9300, '2026-01-30 11:37:37', '2026-01-30 11:37:37'),
(566, 279, 1375, '2026-01-30 11:37:37', '2026-01-30 11:37:37'),
(567, 280, 1500, '2026-01-30 12:29:11', '2026-01-30 12:29:11'),
(568, 280, 4900, '2026-01-30 12:29:11', '2026-01-30 12:29:11'),
(569, 280, 6000, '2026-01-30 12:29:11', '2026-01-30 12:29:11'),
(570, 281, 765, '2026-01-30 13:32:19', '2026-01-30 13:32:19'),
(571, 281, 4500, '2026-01-30 13:32:19', '2026-01-30 13:32:19'),
(572, 282, 36000, '2026-01-30 14:13:52', '2026-01-30 14:13:52'),
(573, 283, 12500, '2026-01-30 14:55:54', '2026-01-30 14:55:54'),
(574, 283, 5000, '2026-01-30 14:55:54', '2026-01-30 14:55:54'),
(575, 283, 10795, '2026-01-30 14:55:54', '2026-01-30 14:55:54'),
(576, 283, 2000, '2026-01-30 14:55:54', '2026-01-30 14:55:54'),
(577, 283, 13000, '2026-01-30 14:55:54', '2026-01-30 14:55:54'),
(578, 283, 25000, '2026-01-30 14:55:54', '2026-01-30 14:55:54'),
(579, 283, 8240, '2026-01-30 14:55:54', '2026-01-30 14:55:54'),
(580, 284, 2250, '2026-01-30 14:57:37', '2026-01-30 14:57:37'),
(581, 284, 2750, '2026-01-30 14:57:37', '2026-01-30 14:57:37'),
(582, 284, 1000, '2026-01-30 14:57:37', '2026-01-30 14:57:37'),
(583, 285, 14000, '2026-01-30 15:01:59', '2026-01-30 15:01:59'),
(584, 285, 44000, '2026-01-30 15:01:59', '2026-01-30 15:01:59'),
(585, 286, 2520, '2026-01-30 15:11:22', '2026-01-30 15:11:22'),
(586, 286, 16200, '2026-01-30 15:11:22', '2026-01-30 15:11:22'),
(587, 286, 765, '2026-01-30 15:11:22', '2026-01-30 15:11:22'),
(588, 287, 2467, '2026-01-30 15:26:19', '2026-01-30 15:26:19'),
(589, 287, 5000, '2026-01-30 15:26:19', '2026-01-30 15:26:19'),
(590, 287, 0, '2026-01-30 15:26:19', '2026-01-30 15:26:19'),
(591, 288, 6000, '2026-01-30 16:39:12', '2026-01-30 16:39:12'),
(592, 288, 7833, '2026-01-30 16:39:12', '2026-01-30 16:39:12'),
(593, 288, 5000, '2026-01-30 16:39:12', '2026-01-30 16:39:12'),
(594, 288, 10000, '2026-01-30 16:39:12', '2026-01-30 16:39:12'),
(595, 288, 3800, '2026-01-30 16:39:12', '2026-01-30 16:39:12'),
(596, 288, 4500, '2026-01-30 16:39:12', '2026-01-30 16:39:12'),
(597, 289, 4000, '2026-01-30 16:46:48', '2026-01-30 16:46:48'),
(598, 289, 4000, '2026-01-30 16:46:48', '2026-01-30 16:46:48'),
(599, 289, 6000, '2026-01-30 16:46:48', '2026-01-30 16:46:48'),
(600, 289, 7015, '2026-01-30 16:46:48', '2026-01-30 16:46:48'),
(601, 290, 4425, '2026-01-30 16:50:40', '2026-01-30 16:50:40');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_orders`
--

CREATE TABLE `purchase_orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `po_number` varchar(255) NOT NULL COMMENT 'Auto-generated PO number',
  `supplier_id` bigint(20) UNSIGNED NOT NULL,
  `warehouse_id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('draft','sent','confirmed','shipped','partial','received','cancelled') NOT NULL DEFAULT 'draft',
  `order_date` date NOT NULL COMMENT 'PO creation date',
  `expected_date` date DEFAULT NULL COMMENT 'Expected delivery date',
  `received_date` date DEFAULT NULL COMMENT 'Actual received date',
  `notes` text DEFAULT NULL COMMENT 'PO notes',
  `invoice_number` varchar(255) DEFAULT NULL,
  `invoice_file` varchar(255) DEFAULT NULL,
  `total_amount` decimal(15,2) NOT NULL DEFAULT 0.00 COMMENT 'Total PO value',
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purchase_order_items`
--

CREATE TABLE `purchase_order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `purchase_order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity_ordered` decimal(10,2) NOT NULL COMMENT 'Quantity ordered',
  `quantity_received` decimal(10,2) NOT NULL DEFAULT 0.00 COMMENT 'Quantity received',
  `unit_price` decimal(15,2) NOT NULL COMMENT 'Unit price',
  `subtotal` decimal(15,2) NOT NULL COMMENT 'quantity × price',
  `batch_number` varchar(255) DEFAULT NULL COMMENT 'Product batch number',
  `expiry_date` date DEFAULT NULL COMMENT 'Expiry date',
  `notes` text DEFAULT NULL COMMENT 'Item notes',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `returns`
--

CREATE TABLE `returns` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `return_number` varchar(255) NOT NULL,
  `transaction_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `approved_by` bigint(20) UNSIGNED DEFAULT NULL,
  `return_type` enum('refund','exchange','credit') NOT NULL DEFAULT 'refund',
  `status` enum('pending','approved','rejected','completed') NOT NULL DEFAULT 'pending',
  `return_amount` decimal(15,2) NOT NULL DEFAULT 0.00,
  `reason` text DEFAULT NULL,
  `rejection_note` text DEFAULT NULL,
  `approved_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `return_items`
--

CREATE TABLE `return_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `return_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `variant_name` varchar(255) DEFAULT NULL,
  `qty` decimal(10,3) NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `subtotal` decimal(15,2) NOT NULL,
  `condition_note` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'super-admin', 'web', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(2, 'owner', 'web', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(3, 'cashier', 'web', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(4, 'warehouse', 'web', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(5, 'admin', 'web', '2026-01-27 08:23:45', '2026-01-27 08:23:45');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 2),
(14, 2),
(18, 2),
(26, 2),
(27, 2),
(28, 2),
(29, 2),
(30, 2),
(34, 2),
(38, 2),
(42, 2),
(44, 2),
(54, 2),
(58, 2),
(1, 3),
(26, 3),
(48, 3),
(49, 3),
(1, 4),
(14, 4),
(18, 4),
(30, 4),
(34, 4),
(38, 4),
(42, 4),
(43, 4),
(44, 4),
(45, 4),
(46, 4),
(50, 4),
(51, 4),
(52, 4),
(53, 4),
(1, 5),
(14, 5),
(15, 5),
(16, 5),
(17, 5),
(18, 5),
(19, 5),
(20, 5),
(21, 5),
(22, 5),
(23, 5),
(24, 5),
(25, 5),
(26, 5),
(27, 5),
(28, 5),
(29, 5),
(30, 5),
(31, 5),
(32, 5),
(33, 5),
(34, 5),
(35, 5),
(36, 5),
(37, 5),
(38, 5),
(39, 5),
(40, 5),
(41, 5),
(42, 5),
(43, 5),
(44, 5),
(45, 5),
(46, 5),
(47, 5),
(48, 5),
(49, 5),
(50, 5),
(51, 5),
(52, 5),
(53, 5),
(54, 5),
(55, 5),
(56, 5),
(57, 5),
(58, 5),
(59, 5),
(60, 5),
(61, 5);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('6aTfh1wYgRT1uFku9m5d3DFS9102AnLRjb5q93Pe', 3, '103.152.235.19', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiU3V6eXF5bEZjZUtGSDVoenNwbm53V3dKWE5XVVlCZkhRT3lOcGh3UCI7czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjI6e3M6MzoidXJsIjtzOjMyOiJodHRwczovL2p1bGlhZnJlc2htYXJ0LmNvbS9sb2dpbiI7czo1OiJyb3V0ZSI7czo1OiJsb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjM7fQ==', 1769766641),
('lmh2vkVwruJe0vfLZPd3gnzqJfApPPnRpEpIt4kH', 3, '103.152.235.19', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoib0x3UUVveURYZEtuWkxMcEdGRWZBVzNwR0JocWk0bEZCRWdua1pWeCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MztzOjk6Il9wcmV2aW91cyI7YToyOntzOjM6InVybCI7czozNjoiaHR0cHM6Ly9qdWxpYWZyZXNobWFydC5jb20vZGFzaGJvYXJkIjtzOjU6InJvdXRlIjtzOjk6ImRhc2hib2FyZCI7fX0=', 1769765539),
('RrWgIBldLw8cvEFPSUquKMCADUPP4OFr2ZNJNvhD', NULL, '202.43.172.5', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOFFmTWR2OUVweE5xZjhUeVJ0RVptOWxUUkw5Rks1MnpVbmU3a0ZzMiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHBzOi8vanVsaWFmcmVzaG1hcnQuY29tL2xvZ2luIjtzOjU6InJvdXRlIjtzOjU6ImxvZ2luIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1769765530),
('s7IX9Xe0uv0ktaVB0nsMSCp9s465nfMLwTb4jUHt', 1, '103.124.196.58', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiNWE4aGxsNk0yOFBQbmJhWHBjWGtSa0gxc1BrMVU5N3ZzRG9CR3hBeiI7czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjI6e3M6MzoidXJsIjtzOjQ1OiJodHRwczovL2p1bGlhZnJlc2htYXJ0LmNvbS9kYXNoYm9hcmQvc2hpZnRzLzkiO3M6NToicm91dGUiO3M6MTE6InNoaWZ0cy5zaG93Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9', 1769763703);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `group` varchar(255) NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `group`, `key`, `value`, `created_at`, `updated_at`) VALUES
(1, 'store', 'store_name', 'Julia Freshmart', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(2, 'store', 'store_address', 'KM.11 Jalan Raya Uban Lama', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(3, 'store', 'store_phone', '081234567', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(4, 'store', 'store_email', 'julia@example.com', '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(5, 'store', 'store_logo', 'store_logo.png', '2026-01-27 08:23:45', '2026-01-27 08:23:45');

-- --------------------------------------------------------

--
-- Table structure for table `shifts`
--

CREATE TABLE `shifts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `shift_number` varchar(50) NOT NULL,
  `started_at` timestamp NOT NULL,
  `ended_at` timestamp NULL DEFAULT NULL,
  `opening_cash` decimal(15,2) NOT NULL DEFAULT 0.00,
  `closing_cash` decimal(15,2) DEFAULT NULL,
  `expected_cash` decimal(15,2) DEFAULT NULL,
  `difference` decimal(15,2) DEFAULT NULL,
  `status` enum('active','closed') NOT NULL DEFAULT 'active',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shifts`
--

INSERT INTO `shifts` (`id`, `user_id`, `shift_number`, `started_at`, `ended_at`, `opening_cash`, `closing_cash`, `expected_cash`, `difference`, `status`, `notes`, `created_at`, `updated_at`) VALUES
(1, 3, 'SFT-20260126-001', '2026-01-26 08:30:48', '2026-01-26 16:06:30', 268000.00, 239700.00, 567096.00, -327396.00, 'closed', 'Adjustment: Tiga barang tidak masuk dikarenakan salah harga perkilo: Jeruk Raja (185g & 925g) dan Kelengkeng (390g). Kelengkeng satu pembayaran dengan Jeruk Raja.', '2026-01-26 08:30:48', '2026-01-26 16:06:30'),
(2, 6, 'SFT-20260126-002', '2026-01-26 16:08:40', '2026-01-27 08:55:42', 497700.00, 826470.00, 813240.00, 13230.00, 'closed', NULL, '2026-01-26 16:08:40', '2026-01-27 08:55:42'),
(3, 3, 'SFT-20260127-001', '2026-01-27 08:45:41', '2026-01-27 16:28:29', 236000.00, 474000.00, 642000.00, -168000.00, 'closed', NULL, '2026-01-27 08:45:41', '2026-01-27 16:28:29'),
(4, 6, 'SFT-20260127-002', '2026-01-27 16:29:40', '2026-01-27 23:01:53', 474000.00, 2692000.00, 2561897.00, 130103.00, 'closed', NULL, '2026-01-27 16:29:40', '2026-01-27 23:01:53'),
(5, 3, 'SFT-20260128-001', '2026-01-28 08:08:25', '2026-01-28 16:23:32', 300000.00, 1487500.00, 1347350.00, 140150.00, 'closed', 'ada beberapa barang yang belum di input', '2026-01-28 08:08:25', '2026-01-28 16:23:32'),
(6, 6, 'SFT-20260128-002', '2026-01-28 16:26:20', '2026-01-28 22:33:51', 141000.00, 3975000.00, 1894015.00, 2080985.00, 'closed', NULL, '2026-01-28 16:26:20', '2026-01-28 22:33:51'),
(7, 3, 'SFT-20260129-001', '2026-01-29 08:14:15', '2026-01-29 17:15:56', 330000.00, 2127000.00, 1977356.00, 149644.00, 'closed', NULL, '2026-01-29 08:14:15', '2026-01-29 17:15:56'),
(8, 6, 'SFT-20260129-002', '2026-01-29 17:35:09', '2026-01-29 22:34:32', 115000.00, 2247080.00, 1335650.00, 911430.00, 'closed', '-', '2026-01-29 17:35:09', '2026-01-29 22:34:32'),
(9, 6, 'SFT-20260130-001', '2026-01-30 08:21:47', NULL, 300000.00, NULL, NULL, NULL, 'active', NULL, '2026-01-30 08:21:47', '2026-01-30 08:21:47'),
(10, 3, 'SFT-20260130-002', '2026-01-30 15:23:46', NULL, 0.00, NULL, NULL, NULL, 'active', NULL, '2026-01-30 15:23:46', '2026-01-30 15:23:46');

-- --------------------------------------------------------

--
-- Table structure for table `stock_movements`
--

CREATE TABLE `stock_movements` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `receipt_id` varchar(255) DEFAULT NULL COMMENT 'Group ID for multi-item entry',
  `purchase_order_id` bigint(20) UNSIGNED DEFAULT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `from_type` varchar(255) NOT NULL,
  `from_id` bigint(20) UNSIGNED DEFAULT NULL,
  `supplier_id` bigint(20) UNSIGNED DEFAULT NULL,
  `invoice_number` varchar(255) DEFAULT NULL COMMENT 'Invoice number from supplier',
  `batch_number` varchar(255) DEFAULT NULL COMMENT 'Product batch number',
  `expiry_date` date DEFAULT NULL COMMENT 'Product expiry date',
  `to_type` varchar(255) NOT NULL,
  `to_id` bigint(20) UNSIGNED DEFAULT NULL,
  `quantity` decimal(15,3) NOT NULL,
  `purchase_price` decimal(15,2) DEFAULT NULL COMMENT 'Purchase price from supplier',
  `loss_amount` decimal(15,2) DEFAULT NULL COMMENT 'Loss = quantity × buy_price (for stock out)',
  `note` text DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `stock_movements`
--

INSERT INTO `stock_movements` (`id`, `receipt_id`, `purchase_order_id`, `product_id`, `from_type`, `from_id`, `supplier_id`, `invoice_number`, `batch_number`, `expiry_date`, `to_type`, `to_id`, `quantity`, `purchase_price`, `loss_amount`, `note`, `user_id`, `created_at`, `updated_at`) VALUES
(1, NULL, NULL, 1, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 10.000, 25000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(2, NULL, NULL, 1, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 10.000, 25000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:26'),
(3, NULL, NULL, 2, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 10.000, 31000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(4, NULL, NULL, 2, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 10.000, 31000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:26'),
(5, NULL, NULL, 3, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 35.000, 12000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(6, NULL, NULL, 3, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 35.000, 12000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:26'),
(7, NULL, NULL, 4, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 6.000, 35857.14, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(8, NULL, NULL, 4, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 6.000, 35857.14, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:26'),
(9, NULL, NULL, 5, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 3.000, 41333.33, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(10, NULL, NULL, 5, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 3.000, 41333.33, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:26'),
(11, NULL, NULL, 6, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 11.000, 41571.43, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(12, NULL, NULL, 6, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 11.000, 41571.43, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:26'),
(13, NULL, NULL, 7, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 24.000, 38000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(14, NULL, NULL, 7, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 24.000, 38000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:26'),
(15, NULL, NULL, 8, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 10.000, 47000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(16, NULL, NULL, 8, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 10.000, 47000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:26'),
(17, NULL, NULL, 9, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 3.000, 58000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(18, NULL, NULL, 9, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 3.000, 58000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:26'),
(19, NULL, NULL, 10, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 2.000, 55500.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(20, NULL, NULL, 10, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 2.000, 55500.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:26'),
(21, NULL, NULL, 11, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 5.000, 43000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(22, NULL, NULL, 11, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 5.000, 43000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:26'),
(23, NULL, NULL, 12, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 4.000, 35000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(24, NULL, NULL, 12, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 4.000, 35000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:26'),
(25, NULL, NULL, 13, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 2.000, 55500.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(26, NULL, NULL, 13, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 2.000, 55500.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:26'),
(27, NULL, NULL, 14, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 40.000, 8250.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(28, NULL, NULL, 14, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 40.000, 8250.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:26'),
(29, NULL, NULL, 15, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 24.000, 13800.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(30, NULL, NULL, 15, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 24.000, 13800.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:26'),
(31, NULL, NULL, 16, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 30.000, 9400.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(32, NULL, NULL, 16, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 30.000, 9400.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:26'),
(33, NULL, NULL, 17, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 42.000, 7250.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(34, NULL, NULL, 17, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 42.000, 7250.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:26'),
(35, NULL, NULL, 18, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 32.000, 3800.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(36, NULL, NULL, 18, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 32.000, 3800.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:26'),
(37, NULL, NULL, 19, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 25.000, 8533.33, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(38, NULL, NULL, 19, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 25.000, 8533.33, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:26'),
(39, NULL, NULL, 20, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 27.000, 8533.33, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(40, NULL, NULL, 20, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 27.000, 8533.33, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:26'),
(41, NULL, NULL, 21, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 23.000, 11000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(42, NULL, NULL, 21, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 23.000, 11000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:26'),
(43, NULL, NULL, 22, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 38.000, 10500.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(44, NULL, NULL, 22, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 38.000, 10500.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:26'),
(45, NULL, NULL, 23, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 97.000, 13000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(46, NULL, NULL, 23, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 97.000, 13000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:26'),
(47, NULL, NULL, 24, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 3.000, 80000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(48, NULL, NULL, 24, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 3.000, 80000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:26'),
(49, NULL, NULL, 25, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 3.000, 55500.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(50, NULL, NULL, 25, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 3.000, 55500.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:26'),
(51, NULL, NULL, 26, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 99.000, 11600.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(52, NULL, NULL, 26, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 99.000, 11600.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:26'),
(53, NULL, NULL, 27, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 178.000, 4000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:27'),
(54, NULL, NULL, 27, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 178.000, 4000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(55, NULL, NULL, 28, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 164.000, 13000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(56, NULL, NULL, 28, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 164.000, 13000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(57, NULL, NULL, 29, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 154.000, 13000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(58, NULL, NULL, 29, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 154.000, 13000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(59, NULL, NULL, 30, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 45.000, 33000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(60, NULL, NULL, 30, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 45.000, 33000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(61, NULL, NULL, 31, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 30.000, 51000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(62, NULL, NULL, 31, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 30.000, 51000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(63, NULL, NULL, 32, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 30.000, 45000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(64, NULL, NULL, 32, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 30.000, 45000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(65, NULL, NULL, 33, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 20.000, 43000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(66, NULL, NULL, 33, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 20.000, 43000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(67, NULL, NULL, 34, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 19.000, 41000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(68, NULL, NULL, 34, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 19.000, 41000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(69, NULL, NULL, 35, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 20.000, 41000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(70, NULL, NULL, 35, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 20.000, 41000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(71, NULL, NULL, 36, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 26.000, 25000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(72, NULL, NULL, 36, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 26.000, 25000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(73, NULL, NULL, 37, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 10.000, 39000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(74, NULL, NULL, 37, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 10.000, 39000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(75, NULL, NULL, 38, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 10.000, 39000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(76, NULL, NULL, 38, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 10.000, 39000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(77, NULL, NULL, 39, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 7.000, 115000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(78, NULL, NULL, 39, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 7.000, 115000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(79, NULL, NULL, 40, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 108.000, 19000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(80, NULL, NULL, 40, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 108.000, 19000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(81, NULL, NULL, 41, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 10.000, 42500.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(82, NULL, NULL, 41, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 10.000, 42500.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(83, NULL, NULL, 42, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 39.000, 35000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(84, NULL, NULL, 42, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 39.000, 35000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(85, NULL, NULL, 43, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 8.000, 100000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(86, NULL, NULL, 43, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 8.000, 100000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(87, NULL, NULL, 44, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 4.000, 114111.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(88, NULL, NULL, 44, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 4.000, 114111.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(89, NULL, NULL, 45, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 13.000, 18000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(90, NULL, NULL, 45, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 13.000, 18000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(91, NULL, NULL, 46, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 7.000, 26500.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(92, NULL, NULL, 46, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 7.000, 26500.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(93, NULL, NULL, 47, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 22.000, 15300.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(94, NULL, NULL, 47, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 22.000, 15300.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(95, NULL, NULL, 48, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 24.000, 30000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(96, NULL, NULL, 48, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 24.000, 30000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(97, NULL, NULL, 49, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 10.000, 63000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(98, NULL, NULL, 49, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 10.000, 63000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(99, NULL, NULL, 50, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 12.000, 32167.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(100, NULL, NULL, 50, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 12.000, 32167.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(101, NULL, NULL, 51, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 10.000, 33833.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(102, NULL, NULL, 51, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 10.000, 33833.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(103, NULL, NULL, 52, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 32.000, 9300.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(104, NULL, NULL, 52, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 32.000, 9300.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(105, NULL, NULL, 53, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 29.000, 10000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(106, NULL, NULL, 53, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 29.000, 10000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(107, NULL, NULL, 54, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 14.000, 24429.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(108, NULL, NULL, 54, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 14.000, 24429.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(109, NULL, NULL, 55, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 18.000, 19667.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(110, NULL, NULL, 55, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 18.000, 19667.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(111, NULL, NULL, 56, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 12.000, 31333.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(112, NULL, NULL, 56, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 12.000, 31333.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(113, NULL, NULL, 57, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 20.000, 25000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(114, NULL, NULL, 57, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 20.000, 25000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(115, NULL, NULL, 58, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 8.000, 45000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(116, NULL, NULL, 58, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 8.000, 45000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(117, NULL, NULL, 59, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 11.000, 50000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(118, NULL, NULL, 59, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 11.000, 50000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(119, NULL, NULL, 60, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 20.000, 51000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(120, NULL, NULL, 60, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 20.000, 51000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(121, NULL, NULL, 61, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 30.000, 15000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(122, NULL, NULL, 61, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 30.000, 15000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(123, NULL, NULL, 62, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 8.000, 30000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(124, NULL, NULL, 62, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 8.000, 30000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(125, NULL, NULL, 63, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 13.000, 49000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(126, NULL, NULL, 63, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 13.000, 49000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(127, NULL, NULL, 64, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 19.000, 35000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(128, NULL, NULL, 64, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 19.000, 35000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(129, NULL, NULL, 65, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 24.000, 59000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(130, NULL, NULL, 65, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 24.000, 59000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(131, NULL, NULL, 66, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 75.000, 6000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(132, NULL, NULL, 66, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 75.000, 6000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(133, NULL, NULL, 67, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 64.000, 29000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(134, NULL, NULL, 67, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 64.000, 29000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(135, NULL, NULL, 68, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 3.000, 21000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(136, NULL, NULL, 68, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 3.000, 21000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(137, NULL, NULL, 69, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 5.000, 180000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(138, NULL, NULL, 69, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 5.000, 180000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(139, NULL, NULL, 70, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 9.000, 95000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(140, NULL, NULL, 70, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 9.000, 95000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(141, NULL, NULL, 71, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 24.000, 15000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(142, NULL, NULL, 71, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 24.000, 15000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(143, NULL, NULL, 72, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 54.000, 21000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(144, NULL, NULL, 72, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 54.000, 21000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(145, NULL, NULL, 73, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 14.000, 70000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(146, NULL, NULL, 73, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 14.000, 70000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(147, NULL, NULL, 74, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 63.000, 12000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(148, NULL, NULL, 74, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 63.000, 12000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(149, NULL, NULL, 75, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 20.000, 37000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(150, NULL, NULL, 75, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 20.000, 37000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(151, NULL, NULL, 76, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 78.000, 10500.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(152, NULL, NULL, 76, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 78.000, 10500.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(153, NULL, NULL, 77, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 13.000, 25000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(154, NULL, NULL, 77, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 13.000, 25000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(155, NULL, NULL, 78, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 22.000, 38000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(156, NULL, NULL, 78, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 22.000, 38000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(157, NULL, NULL, 79, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 22.000, 95000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(158, NULL, NULL, 79, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 22.000, 95000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(159, NULL, NULL, 80, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 4.000, 46000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(160, NULL, NULL, 80, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 4.000, 46000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(161, NULL, NULL, 81, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 134.000, 35000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(162, NULL, NULL, 81, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 134.000, 35000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(163, NULL, NULL, 82, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 44.000, 37000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(164, NULL, NULL, 82, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 44.000, 37000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(165, NULL, NULL, 83, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 13.000, 35000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(166, NULL, NULL, 83, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 13.000, 35000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(167, NULL, NULL, 84, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 118.000, 23000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(168, NULL, NULL, 84, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 118.000, 23000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(169, NULL, NULL, 85, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 17.000, 21000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(170, NULL, NULL, 85, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 17.000, 21000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(171, NULL, NULL, 86, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 15.000, 22000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(172, NULL, NULL, 86, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 15.000, 22000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(173, NULL, NULL, 87, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 17.000, 26000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(174, NULL, NULL, 87, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 17.000, 26000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(175, NULL, NULL, 88, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 45.000, 38000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(176, NULL, NULL, 88, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 45.000, 38000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(177, NULL, NULL, 89, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 10.000, 31000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(178, NULL, NULL, 89, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 10.000, 31000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(179, NULL, NULL, 90, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 68.000, 20000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(180, NULL, NULL, 90, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 68.000, 20000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(181, NULL, NULL, 91, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 7.000, 30000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(182, NULL, NULL, 91, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 7.000, 30000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(183, NULL, NULL, 92, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 128.000, 9500.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(184, NULL, NULL, 92, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 128.000, 9500.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(185, NULL, NULL, 93, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 112.000, 9500.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(186, NULL, NULL, 93, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 112.000, 9500.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(187, NULL, NULL, 94, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 34.000, 23000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(188, NULL, NULL, 94, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 34.000, 23000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(189, NULL, NULL, 95, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 20.000, 88000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(190, NULL, NULL, 95, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 20.000, 88000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(191, NULL, NULL, 96, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 5.000, 269000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(192, NULL, NULL, 96, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 5.000, 269000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(193, NULL, NULL, 97, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 5.000, 234000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(194, NULL, NULL, 97, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 5.000, 234000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(195, NULL, NULL, 98, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 5.000, 204000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(196, NULL, NULL, 98, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 5.000, 204000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(197, NULL, NULL, 99, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 36.000, 12000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(198, NULL, NULL, 99, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 36.000, 12000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(199, NULL, NULL, 100, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 5.000, 112000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(200, NULL, NULL, 100, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 5.000, 112000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(201, NULL, NULL, 101, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 5.000, 127000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(202, NULL, NULL, 101, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 5.000, 127000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(203, NULL, NULL, 102, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 10.000, 71000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(204, NULL, NULL, 102, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 10.000, 71000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(205, NULL, NULL, 103, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 16.000, 30000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(206, NULL, NULL, 103, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 16.000, 30000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(207, NULL, NULL, 104, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 50.000, 35000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(208, NULL, NULL, 104, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 50.000, 35000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(209, NULL, NULL, 105, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 4.000, 25000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(210, NULL, NULL, 105, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 4.000, 25000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(211, NULL, NULL, 106, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 17.000, 70000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(212, NULL, NULL, 106, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 17.000, 70000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(213, NULL, NULL, 107, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 7.000, 65000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(214, NULL, NULL, 107, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 7.000, 65000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(215, NULL, NULL, 108, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 2.000, 35000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(216, NULL, NULL, 108, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 2.000, 35000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(217, NULL, NULL, 109, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 6.000, 13500.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(218, NULL, NULL, 109, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 6.000, 13500.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(219, NULL, NULL, 110, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 5.000, 7000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(220, NULL, NULL, 110, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 5.000, 7000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(221, NULL, NULL, 111, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 21.000, 22000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(222, NULL, NULL, 111, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 21.000, 22000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(223, NULL, NULL, 112, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 9.000, 11000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(224, NULL, NULL, 112, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 9.000, 11000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(225, NULL, NULL, 115, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 12.000, 80000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(226, NULL, NULL, 115, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 12.000, 80000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(227, NULL, NULL, 116, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 9.000, 17500.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(228, NULL, NULL, 116, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 9.000, 17500.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(229, NULL, NULL, 117, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 15.000, 8750.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(230, NULL, NULL, 117, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 15.000, 8750.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(231, NULL, NULL, 118, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 9.000, 77000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(232, NULL, NULL, 118, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 9.000, 77000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(233, NULL, NULL, 119, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 40.000, 1925.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(234, NULL, NULL, 119, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 40.000, 1925.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(235, NULL, NULL, 120, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 20.000, 19500.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(236, NULL, NULL, 120, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 20.000, 19500.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(237, NULL, NULL, 121, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 2.000, 39000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(238, NULL, NULL, 121, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 2.000, 39000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(239, NULL, NULL, 122, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 18.000, 20500.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(240, NULL, NULL, 122, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 18.000, 20500.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(241, NULL, NULL, 123, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 30.000, 71600.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(242, NULL, NULL, 123, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 30.000, 71600.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(243, NULL, NULL, 124, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 6.000, 39000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(244, NULL, NULL, 124, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 6.000, 39000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(245, NULL, NULL, 125, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 3.000, 50000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(246, NULL, NULL, 125, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 3.000, 50000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(247, NULL, NULL, 126, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 10.000, 48000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(248, NULL, NULL, 126, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 10.000, 48000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(249, NULL, NULL, 127, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 19.000, 25000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(250, NULL, NULL, 127, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 19.000, 25000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(251, NULL, NULL, 128, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 9.000, 30000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(252, NULL, NULL, 128, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 9.000, 30000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(253, NULL, NULL, 129, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 10.000, 31000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(254, NULL, NULL, 129, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 10.000, 31000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(255, NULL, NULL, 130, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 10.000, 24000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(256, NULL, NULL, 130, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 10.000, 24000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(257, NULL, NULL, 131, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 10.000, 36000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(258, NULL, NULL, 131, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 10.000, 36000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(259, NULL, NULL, 132, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 38.000, 175000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(260, NULL, NULL, 132, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 38.000, 175000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(261, NULL, NULL, 133, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 9.000, 220000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(262, NULL, NULL, 133, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 9.000, 220000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(263, NULL, NULL, 134, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 7.000, 35000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(264, NULL, NULL, 134, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 7.000, 35000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(265, NULL, NULL, 135, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 6.000, 22000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(266, NULL, NULL, 135, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 6.000, 22000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(267, NULL, NULL, 136, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 40.000, 64000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27');
INSERT INTO `stock_movements` (`id`, `receipt_id`, `purchase_order_id`, `product_id`, `from_type`, `from_id`, `supplier_id`, `invoice_number`, `batch_number`, `expiry_date`, `to_type`, `to_id`, `quantity`, `purchase_price`, `loss_amount`, `note`, `user_id`, `created_at`, `updated_at`) VALUES
(268, NULL, NULL, 136, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 40.000, 64000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(269, NULL, NULL, 137, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 40.000, 60000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(270, NULL, NULL, 137, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 40.000, 60000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(271, NULL, NULL, 138, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 40.000, 60000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(272, NULL, NULL, 138, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 40.000, 60000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(273, NULL, NULL, 139, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 40.000, 60000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(274, NULL, NULL, 139, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 40.000, 60000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(275, NULL, NULL, 140, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 40.000, 29000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(276, NULL, NULL, 140, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 40.000, 29000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(277, NULL, NULL, 141, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 40.000, 24000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(278, NULL, NULL, 141, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 40.000, 24000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(279, NULL, NULL, 142, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 40.000, 50000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(280, NULL, NULL, 142, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 40.000, 50000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(281, NULL, NULL, 143, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 40.000, 396000.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(282, NULL, NULL, 143, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 40.000, 396000.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(283, NULL, NULL, 144, 'adjustment', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 40.000, 6800.00, NULL, 'Initial Stock Seeding (Opname Awal)', 1, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(284, NULL, NULL, 144, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 40.000, 6800.00, NULL, 'Migrasi awal ke Display Toko', 1, '2026-01-25 22:04:28', '2026-01-25 22:04:27'),
(285, '30', NULL, 20, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 20.000, 8533.00, NULL, 'Restock', 1, '2026-01-26 13:30:19', '2026-01-26 13:30:19'),
(286, NULL, NULL, 23, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 31, 0.490, NULL, NULL, 'Penjualan: TRX-NV8S092S1H', 3, '2026-01-27 08:51:28', '2026-01-27 08:51:28'),
(287, NULL, NULL, 82, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 31, 0.205, NULL, NULL, 'Penjualan: TRX-NV8S092S1H', 3, '2026-01-27 08:51:28', '2026-01-27 08:51:28'),
(288, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 32, 1.000, NULL, NULL, 'Penjualan: TRX-8FAIH55L6A', 3, '2026-01-27 08:52:20', '2026-01-27 08:52:20'),
(289, NULL, NULL, 20, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 33, 1.000, NULL, NULL, 'Penjualan: TRX-MLM936NQKC', 3, '2026-01-27 09:25:24', '2026-01-27 09:25:24'),
(290, NULL, NULL, 28, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 33, 1.000, NULL, NULL, 'Penjualan: TRX-MLM936NQKC', 3, '2026-01-27 09:25:24', '2026-01-27 09:25:24'),
(291, NULL, NULL, 85, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 34, 0.180, NULL, NULL, 'Penjualan: TRX-0T931J0OHZ', 3, '2026-01-27 10:15:21', '2026-01-27 10:15:21'),
(292, NULL, NULL, 71, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 35, 1.000, NULL, NULL, 'Penjualan: TRX-BN384K9C86', 3, '2026-01-27 13:06:22', '2026-01-27 13:06:22'),
(293, NULL, NULL, 52, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 36, 1.000, NULL, NULL, 'Penjualan: TRX-X9L91ZK3XV', 3, '2026-01-27 13:25:24', '2026-01-27 13:25:24'),
(294, NULL, NULL, 66, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 36, 2.000, NULL, NULL, 'Penjualan: TRX-X9L91ZK3XV', 3, '2026-01-27 13:25:24', '2026-01-27 13:25:24'),
(295, NULL, NULL, 124, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 37, 2.000, NULL, NULL, 'Penjualan: TRX-HICPAJU478', 3, '2026-01-27 13:32:09', '2026-01-27 13:32:09'),
(296, NULL, NULL, 42, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 38, 0.560, NULL, NULL, 'Penjualan: TRX-07PR423324', 3, '2026-01-27 14:22:59', '2026-01-27 14:22:59'),
(298, NULL, NULL, 81, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 40, 1.115, NULL, NULL, 'Penjualan: TRX-4CU7SLMISZ', 3, '2026-01-27 14:42:09', '2026-01-27 14:42:09'),
(299, NULL, NULL, 10, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 41, 0.250, NULL, NULL, 'Penjualan: TRX-81902I106W', 3, '2026-01-27 15:21:20', '2026-01-27 15:21:20'),
(300, NULL, NULL, 40, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 41, 1.000, NULL, NULL, 'Penjualan: TRX-81902I106W', 3, '2026-01-27 15:21:20', '2026-01-27 15:21:20'),
(301, NULL, NULL, 124, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 41, 1.000, NULL, NULL, 'Penjualan: TRX-81902I106W', 3, '2026-01-27 15:21:20', '2026-01-27 15:21:20'),
(302, NULL, NULL, 47, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 42, 1.000, NULL, NULL, 'Penjualan: TRX-2RJ95E17DY', 3, '2026-01-27 16:22:31', '2026-01-27 16:22:31'),
(303, NULL, NULL, 65, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 42, 1.000, NULL, NULL, 'Penjualan: TRX-2RJ95E17DY', 3, '2026-01-27 16:22:31', '2026-01-27 16:22:31'),
(304, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 42, 1.000, NULL, NULL, 'Penjualan: TRX-2RJ95E17DY', 3, '2026-01-27 16:22:31', '2026-01-27 16:22:31'),
(305, NULL, NULL, 73, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 42, 1.000, NULL, NULL, 'Penjualan: TRX-2RJ95E17DY', 3, '2026-01-27 16:22:31', '2026-01-27 16:22:31'),
(306, NULL, NULL, 106, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 42, 1.000, NULL, NULL, 'Penjualan: TRX-2RJ95E17DY', 3, '2026-01-27 16:22:31', '2026-01-27 16:22:31'),
(307, NULL, NULL, 47, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 43, 2.000, NULL, NULL, 'Penjualan: TRX-N8H94D4C2J', 6, '2026-01-27 16:31:37', '2026-01-27 16:31:37'),
(308, NULL, NULL, 65, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 43, 1.000, NULL, NULL, 'Penjualan: TRX-N8H94D4C2J', 6, '2026-01-27 16:31:37', '2026-01-27 16:31:37'),
(309, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 43, 1.000, NULL, NULL, 'Penjualan: TRX-N8H94D4C2J', 6, '2026-01-27 16:31:37', '2026-01-27 16:31:37'),
(310, NULL, NULL, 73, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 43, 1.000, NULL, NULL, 'Penjualan: TRX-N8H94D4C2J', 6, '2026-01-27 16:31:37', '2026-01-27 16:31:37'),
(311, NULL, NULL, 106, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 43, 1.000, NULL, NULL, 'Penjualan: TRX-N8H94D4C2J', 6, '2026-01-27 16:31:37', '2026-01-27 16:31:37'),
(312, NULL, NULL, 23, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 44, 0.495, NULL, NULL, 'Penjualan: TRX-3MLFD8M9JU', 6, '2026-01-27 16:33:19', '2026-01-27 16:33:19'),
(313, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 44, 1.000, NULL, NULL, 'Penjualan: TRX-3MLFD8M9JU', 6, '2026-01-27 16:33:19', '2026-01-27 16:33:19'),
(314, NULL, NULL, 84, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 44, 0.535, NULL, NULL, 'Penjualan: TRX-3MLFD8M9JU', 6, '2026-01-27 16:33:19', '2026-01-27 16:33:19'),
(315, NULL, NULL, 85, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 44, 0.350, NULL, NULL, 'Penjualan: TRX-3MLFD8M9JU', 6, '2026-01-27 16:33:19', '2026-01-27 16:33:19'),
(316, NULL, NULL, 89, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 44, 0.485, NULL, NULL, 'Penjualan: TRX-3MLFD8M9JU', 6, '2026-01-27 16:33:19', '2026-01-27 16:33:19'),
(317, NULL, NULL, 116, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 44, 1.000, NULL, NULL, 'Penjualan: TRX-3MLFD8M9JU', 6, '2026-01-27 16:33:19', '2026-01-27 16:33:19'),
(318, NULL, NULL, 119, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 44, 1.000, NULL, NULL, 'Penjualan: TRX-3MLFD8M9JU', 6, '2026-01-27 16:33:19', '2026-01-27 16:33:19'),
(319, NULL, NULL, 81, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 45, 0.990, NULL, NULL, 'Penjualan: TRX-QO67445Y5X', 6, '2026-01-27 16:34:37', '2026-01-27 16:34:37'),
(320, NULL, NULL, 124, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 46, 1.000, NULL, NULL, 'Penjualan: TRX-3T2U0M0859', 6, '2026-01-27 16:53:36', '2026-01-27 16:53:36'),
(321, NULL, NULL, 169, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 10.000, 300000.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-27 16:56:14', '2026-01-27 16:56:14'),
(322, NULL, NULL, 169, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 10.000, NULL, NULL, '-', 6, '2026-01-27 16:56:37', '2026-01-27 16:56:37'),
(323, NULL, NULL, 70, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 47, 0.340, NULL, NULL, 'Penjualan: TRX-O9T087655V', 6, '2026-01-27 17:06:59', '2026-01-27 17:06:59'),
(324, NULL, NULL, 106, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 47, 1.000, NULL, NULL, 'Penjualan: TRX-O9T087655V', 6, '2026-01-27 17:06:59', '2026-01-27 17:06:59'),
(325, NULL, NULL, 117, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 47, 1.000, NULL, NULL, 'Penjualan: TRX-O9T087655V', 6, '2026-01-27 17:06:59', '2026-01-27 17:06:59'),
(326, NULL, NULL, 27, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 48, 1.000, NULL, NULL, 'Penjualan: TRX-J0T5WS8U60', 6, '2026-01-27 17:09:59', '2026-01-27 17:09:59'),
(327, NULL, NULL, 28, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 48, 1.000, NULL, NULL, 'Penjualan: TRX-J0T5WS8U60', 6, '2026-01-27 17:09:59', '2026-01-27 17:09:59'),
(328, NULL, NULL, 168, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 100.000, 350000.00, NULL, '-', 6, '2026-01-27 17:12:17', '2026-01-27 17:12:17'),
(329, NULL, NULL, 168, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 100.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-27 17:12:26', '2026-01-27 17:12:26'),
(330, NULL, NULL, 3, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 49, 1.000, NULL, NULL, 'Penjualan: TRX-57F306O869', 6, '2026-01-27 17:15:12', '2026-01-27 17:15:12'),
(331, NULL, NULL, 26, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 49, 1.000, NULL, NULL, 'Penjualan: TRX-57F306O869', 6, '2026-01-27 17:15:12', '2026-01-27 17:15:12'),
(332, NULL, NULL, 83, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 49, 0.745, NULL, NULL, 'Penjualan: TRX-57F306O869', 6, '2026-01-27 17:15:12', '2026-01-27 17:15:12'),
(333, NULL, NULL, 122, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 49, 0.445, NULL, NULL, 'Penjualan: TRX-57F306O869', 6, '2026-01-27 17:15:12', '2026-01-27 17:15:12'),
(334, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 49, 0.475, NULL, NULL, 'Penjualan: TRX-57F306O869', 6, '2026-01-27 17:15:12', '2026-01-27 17:15:12'),
(335, NULL, NULL, 18, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 50, 1.000, NULL, NULL, 'Penjualan: TRX-1L005ROFBV', 6, '2026-01-27 17:17:23', '2026-01-27 17:17:23'),
(336, NULL, NULL, 74, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 50, 2.000, NULL, NULL, 'Penjualan: TRX-1L005ROFBV', 6, '2026-01-27 17:17:23', '2026-01-27 17:17:23'),
(337, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 50, 0.395, NULL, NULL, 'Penjualan: TRX-1L005ROFBV', 6, '2026-01-27 17:17:23', '2026-01-27 17:17:23'),
(338, NULL, NULL, 65, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 51, 1.000, NULL, NULL, 'Penjualan: TRX-TYLG5Y9MD5', 6, '2026-01-27 17:18:42', '2026-01-27 17:18:42'),
(339, NULL, NULL, 107, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 51, 0.190, NULL, NULL, 'Penjualan: TRX-TYLG5Y9MD5', 6, '2026-01-27 17:18:42', '2026-01-27 17:18:42'),
(340, NULL, NULL, 5, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 52, 0.180, NULL, NULL, 'Penjualan: TRX-XP913XV5DC', 6, '2026-01-27 17:19:40', '2026-01-27 17:19:40'),
(341, NULL, NULL, 22, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 52, 1.000, NULL, NULL, 'Penjualan: TRX-XP913XV5DC', 6, '2026-01-27 17:19:40', '2026-01-27 17:19:40'),
(342, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 53, 0.715, NULL, NULL, 'Penjualan: TRX-3ORR14EU5O', 6, '2026-01-27 17:20:51', '2026-01-27 17:20:51'),
(343, NULL, NULL, 84, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 54, 0.340, NULL, NULL, 'Penjualan: TRX-751N2697U9', 6, '2026-01-27 17:22:38', '2026-01-27 17:22:38'),
(344, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 54, 0.615, NULL, NULL, 'Penjualan: TRX-751N2697U9', 6, '2026-01-27 17:22:38', '2026-01-27 17:22:38'),
(345, NULL, NULL, 50, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 55, 1.000, NULL, NULL, 'Penjualan: TRX-PL5VWW918C', 6, '2026-01-27 17:23:53', '2026-01-27 17:23:53'),
(346, NULL, NULL, 103, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 55, 0.515, NULL, NULL, 'Penjualan: TRX-PL5VWW918C', 6, '2026-01-27 17:23:53', '2026-01-27 17:23:53'),
(347, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 56, 0.545, NULL, NULL, 'Penjualan: TRX-99T894N4H2', 6, '2026-01-27 17:26:53', '2026-01-27 17:26:53'),
(348, NULL, NULL, 170, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 13.500, 310500.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-27 17:28:25', '2026-01-27 17:28:25'),
(349, NULL, NULL, 170, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 13.500, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-27 17:28:36', '2026-01-27 17:28:36'),
(350, NULL, NULL, 170, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 57, 2.300, NULL, NULL, 'Penjualan: TRX-IX8M4N3A15', 6, '2026-01-27 17:31:09', '2026-01-27 17:31:09'),
(351, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 58, 1.715, NULL, NULL, 'Penjualan: TRX-02K2M7H0D0', 6, '2026-01-27 17:32:52', '2026-01-27 17:32:52'),
(352, NULL, NULL, 48, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 59, 1.000, NULL, NULL, 'Penjualan: TRX-8MM3Q0Z37L', 6, '2026-01-27 17:37:35', '2026-01-27 17:37:35'),
(353, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 59, 2.000, NULL, NULL, 'Penjualan: TRX-8MM3Q0Z37L', 6, '2026-01-27 17:37:35', '2026-01-27 17:37:35'),
(354, NULL, NULL, 83, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 59, 0.355, NULL, NULL, 'Penjualan: TRX-8MM3Q0Z37L', 6, '2026-01-27 17:37:35', '2026-01-27 17:37:35'),
(355, NULL, NULL, 170, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 59, 0.540, NULL, NULL, 'Penjualan: TRX-8MM3Q0Z37L', 6, '2026-01-27 17:37:35', '2026-01-27 17:37:35'),
(356, NULL, NULL, 171, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 15.000, 195000.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-27 17:40:30', '2026-01-27 17:40:30'),
(357, NULL, NULL, 171, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 15.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-27 17:40:37', '2026-01-27 17:40:37'),
(358, NULL, NULL, 18, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 50.000, 190000.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-27 17:41:26', '2026-01-27 17:41:26'),
(359, NULL, NULL, 18, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 50.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-27 17:41:36', '2026-01-27 17:41:36'),
(360, NULL, NULL, 162, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 8.000, 15000000.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-27 17:43:18', '2026-01-27 17:43:48'),
(361, NULL, NULL, 162, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 8.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-27 17:43:57', '2026-01-27 17:43:57'),
(362, NULL, NULL, 24, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 60, 0.030, NULL, NULL, 'Penjualan: TRX-95AST83LHH', 6, '2026-01-27 17:45:53', '2026-01-27 17:45:53'),
(363, NULL, NULL, 72, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 60, 1.000, NULL, NULL, 'Penjualan: TRX-95AST83LHH', 6, '2026-01-27 17:45:53', '2026-01-27 17:45:53'),
(364, NULL, NULL, 170, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 60, 0.245, NULL, NULL, 'Penjualan: TRX-95AST83LHH', 6, '2026-01-27 17:45:53', '2026-01-27 17:45:53'),
(365, NULL, NULL, 78, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 61, 0.355, NULL, NULL, 'Penjualan: TRX-GUJLPH611R', 6, '2026-01-27 17:57:02', '2026-01-27 17:57:02'),
(366, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 61, 0.395, NULL, NULL, 'Penjualan: TRX-GUJLPH611R', 6, '2026-01-27 17:57:02', '2026-01-27 17:57:02'),
(367, NULL, NULL, 78, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 62, 0.270, NULL, NULL, 'Penjualan: TRX-9MYATPO7B3', 6, '2026-01-27 18:03:15', '2026-01-27 18:03:15'),
(368, NULL, NULL, 81, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 62, 0.195, NULL, NULL, 'Penjualan: TRX-9MYATPO7B3', 6, '2026-01-27 18:03:15', '2026-01-27 18:03:15'),
(369, NULL, NULL, 103, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 62, 0.525, NULL, NULL, 'Penjualan: TRX-9MYATPO7B3', 6, '2026-01-27 18:03:15', '2026-01-27 18:03:15'),
(370, NULL, NULL, 171, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 63, 1.000, NULL, NULL, 'Penjualan: TRX-IA29O0BHAB', 6, '2026-01-27 18:03:43', '2026-01-27 18:03:43'),
(371, NULL, NULL, 162, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 64, 1.000, NULL, NULL, 'Penjualan: TRX-06K1J5528P', 6, '2026-01-27 18:04:23', '2026-01-27 18:04:23'),
(372, NULL, NULL, 166, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 10.000, 150000.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-27 18:06:24', '2026-01-27 18:06:24'),
(373, NULL, NULL, 166, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 10.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-27 18:06:46', '2026-01-27 18:06:46'),
(374, NULL, NULL, 166, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 65, 2.000, NULL, NULL, 'Penjualan: TRX-15860AKY7J', 6, '2026-01-27 18:07:23', '2026-01-27 18:07:23'),
(375, NULL, NULL, 174, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 18.000, 270000.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-27 18:11:06', '2026-01-27 18:11:06'),
(376, NULL, NULL, 174, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 18.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-27 18:11:17', '2026-01-27 18:11:17'),
(377, NULL, NULL, 174, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 66, 1.000, NULL, NULL, 'Penjualan: TRX-LC5V2W8K5G', 6, '2026-01-27 18:11:40', '2026-01-27 18:11:40'),
(378, NULL, NULL, 19, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 67, 3.000, NULL, NULL, 'Penjualan: TRX-2A94040XJV', 6, '2026-01-27 18:16:05', '2026-01-27 18:16:05'),
(379, NULL, NULL, 52, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 67, 1.000, NULL, NULL, 'Penjualan: TRX-2A94040XJV', 6, '2026-01-27 18:16:05', '2026-01-27 18:16:05'),
(380, NULL, NULL, 65, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 67, 1.000, NULL, NULL, 'Penjualan: TRX-2A94040XJV', 6, '2026-01-27 18:16:05', '2026-01-27 18:16:05'),
(381, NULL, NULL, 40, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 68, 1.000, NULL, NULL, 'Penjualan: TRX-JMXX8F40E5', 6, '2026-01-27 18:23:17', '2026-01-27 18:23:17'),
(382, NULL, NULL, 65, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 68, 1.000, NULL, NULL, 'Penjualan: TRX-JMXX8F40E5', 6, '2026-01-27 18:23:17', '2026-01-27 18:23:17'),
(383, NULL, NULL, 116, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 68, 1.000, NULL, NULL, 'Penjualan: TRX-JMXX8F40E5', 6, '2026-01-27 18:23:17', '2026-01-27 18:23:17'),
(384, NULL, NULL, 170, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 68, 0.405, NULL, NULL, 'Penjualan: TRX-JMXX8F40E5', 6, '2026-01-27 18:23:17', '2026-01-27 18:23:17'),
(385, NULL, NULL, 171, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 68, 1.000, NULL, NULL, 'Penjualan: TRX-JMXX8F40E5', 6, '2026-01-27 18:23:17', '2026-01-27 18:23:17'),
(386, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 69, 1.000, NULL, NULL, 'Penjualan: TRX-Q64XK487Y8', 6, '2026-01-27 18:23:48', '2026-01-27 18:23:48'),
(387, NULL, NULL, 49, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 70, 0.545, NULL, NULL, 'Penjualan: TRX-A5U5XN0A4S', 6, '2026-01-27 18:28:21', '2026-01-27 18:28:21'),
(388, NULL, NULL, 51, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 70, 1.000, NULL, NULL, 'Penjualan: TRX-A5U5XN0A4S', 6, '2026-01-27 18:28:21', '2026-01-27 18:28:21'),
(389, NULL, NULL, 70, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 70, 0.340, NULL, NULL, 'Penjualan: TRX-A5U5XN0A4S', 6, '2026-01-27 18:28:21', '2026-01-27 18:28:21'),
(390, NULL, NULL, 64, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 71, 1.000, NULL, NULL, 'Penjualan: TRX-141WZ5Z74D', 6, '2026-01-27 18:32:13', '2026-01-27 18:32:13'),
(391, NULL, NULL, 166, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 71, 1.000, NULL, NULL, 'Penjualan: TRX-141WZ5Z74D', 6, '2026-01-27 18:32:13', '2026-01-27 18:32:13'),
(392, NULL, NULL, 170, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 71, 0.705, NULL, NULL, 'Penjualan: TRX-141WZ5Z74D', 6, '2026-01-27 18:32:13', '2026-01-27 18:32:13'),
(393, NULL, NULL, 175, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 11.000, 330000.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-27 18:36:26', '2026-01-27 18:36:26'),
(394, NULL, NULL, 175, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 11.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-27 18:37:00', '2026-01-27 18:37:00'),
(395, NULL, NULL, 175, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 72, 1.000, NULL, NULL, 'Penjualan: TRX-I66FMXBNLM', 6, '2026-01-27 18:37:24', '2026-01-27 18:37:24'),
(396, NULL, NULL, 164, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 12000.000, 156000.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-27 18:40:52', '2026-01-27 18:40:52'),
(397, NULL, NULL, 164, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 13.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-27 18:41:55', '2026-01-27 18:41:55'),
(398, NULL, NULL, 164, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 73, 1.000, NULL, NULL, 'Penjualan: TRX-EI7310W717', 6, '2026-01-27 18:42:22', '2026-01-27 18:42:22'),
(399, NULL, NULL, 158, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 13.000, 240500.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-27 18:44:53', '2026-01-27 18:44:53'),
(400, NULL, NULL, 158, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 13.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-27 18:45:05', '2026-01-27 18:45:05'),
(401, NULL, NULL, 176, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 10.800, 421200.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-27 18:52:31', '2026-01-27 18:52:31'),
(402, NULL, NULL, 176, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 10.800, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-27 18:52:49', '2026-01-27 18:52:49'),
(403, NULL, NULL, 27, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 74, 2.000, NULL, NULL, 'Penjualan: TRX-6KI1M81G3T', 6, '2026-01-27 18:59:02', '2026-01-27 18:59:02'),
(404, NULL, NULL, 124, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 74, 1.000, NULL, NULL, 'Penjualan: TRX-6KI1M81G3T', 6, '2026-01-27 18:59:02', '2026-01-27 18:59:02'),
(405, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 75, 1.000, NULL, NULL, 'Penjualan: TRX-I4N38PEOS0', 6, '2026-01-27 19:00:04', '2026-01-27 19:00:04'),
(406, NULL, NULL, 124, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 76, 1.000, NULL, NULL, 'Penjualan: TRX-D0E8E41Q71', 6, '2026-01-27 19:00:43', '2026-01-27 19:00:43'),
(407, NULL, NULL, 10, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 77, 0.250, NULL, NULL, 'Penjualan: TRX-4PP67ARU6Q', 6, '2026-01-27 19:16:51', '2026-01-27 19:16:51'),
(408, NULL, NULL, 15, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 77, 1.000, NULL, NULL, 'Penjualan: TRX-4PP67ARU6Q', 6, '2026-01-27 19:16:51', '2026-01-27 19:16:51'),
(409, NULL, NULL, 82, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 77, 0.220, NULL, NULL, 'Penjualan: TRX-4PP67ARU6Q', 6, '2026-01-27 19:16:51', '2026-01-27 19:16:51'),
(410, NULL, NULL, 48, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 78, 1.000, NULL, NULL, 'Penjualan: TRX-LNF62KG009', 6, '2026-01-27 19:18:11', '2026-01-27 19:18:11'),
(411, NULL, NULL, 64, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 78, 1.000, NULL, NULL, 'Penjualan: TRX-LNF62KG009', 6, '2026-01-27 19:18:11', '2026-01-27 19:18:11'),
(412, NULL, NULL, 48, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 79, 1.000, NULL, NULL, 'Penjualan: TRX-14R1AM90ME', 6, '2026-01-27 19:21:14', '2026-01-27 19:21:14'),
(413, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 79, 1.000, NULL, NULL, 'Penjualan: TRX-14R1AM90ME', 6, '2026-01-27 19:21:14', '2026-01-27 19:21:14'),
(414, NULL, NULL, 71, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 79, 1.000, NULL, NULL, 'Penjualan: TRX-14R1AM90ME', 6, '2026-01-27 19:21:14', '2026-01-27 19:21:14'),
(415, NULL, NULL, 89, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 79, 0.465, NULL, NULL, 'Penjualan: TRX-14R1AM90ME', 6, '2026-01-27 19:21:14', '2026-01-27 19:21:14'),
(416, NULL, NULL, 170, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 79, 0.510, NULL, NULL, 'Penjualan: TRX-14R1AM90ME', 6, '2026-01-27 19:21:14', '2026-01-27 19:21:14'),
(417, NULL, NULL, 175, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 79, 1.000, NULL, NULL, 'Penjualan: TRX-14R1AM90ME', 6, '2026-01-27 19:21:14', '2026-01-27 19:21:14'),
(418, NULL, NULL, 175, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 80, 1.000, NULL, NULL, 'Penjualan: TRX-W67Q4IM1R4', 6, '2026-01-27 19:22:42', '2026-01-27 19:22:42'),
(419, NULL, NULL, 23, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 81, 0.510, NULL, NULL, 'Penjualan: TRX-NM64OYGAN2', 6, '2026-01-27 19:32:32', '2026-01-27 19:32:32'),
(420, NULL, NULL, 65, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 81, 1.000, NULL, NULL, 'Penjualan: TRX-NM64OYGAN2', 6, '2026-01-27 19:32:32', '2026-01-27 19:32:32'),
(421, NULL, NULL, 84, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 81, 1.165, NULL, NULL, 'Penjualan: TRX-NM64OYGAN2', 6, '2026-01-27 19:32:32', '2026-01-27 19:32:32'),
(422, NULL, NULL, 85, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 81, 0.810, NULL, NULL, 'Penjualan: TRX-NM64OYGAN2', 6, '2026-01-27 19:32:32', '2026-01-27 19:32:32'),
(423, NULL, NULL, 170, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 81, 0.575, NULL, NULL, 'Penjualan: TRX-NM64OYGAN2', 6, '2026-01-27 19:32:32', '2026-01-27 19:32:32'),
(424, NULL, NULL, 175, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 81, 1.000, NULL, NULL, 'Penjualan: TRX-NM64OYGAN2', 6, '2026-01-27 19:32:32', '2026-01-27 19:32:32'),
(425, NULL, NULL, 4, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 82, 0.340, NULL, NULL, 'Penjualan: TRX-LHV2QX5I5S', 6, '2026-01-27 19:39:19', '2026-01-27 19:39:19'),
(426, NULL, NULL, 65, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 82, 1.000, NULL, NULL, 'Penjualan: TRX-LHV2QX5I5S', 6, '2026-01-27 19:39:19', '2026-01-27 19:39:19'),
(427, NULL, NULL, 82, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 82, 0.445, NULL, NULL, 'Penjualan: TRX-LHV2QX5I5S', 6, '2026-01-27 19:39:19', '2026-01-27 19:39:19'),
(428, NULL, NULL, 84, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 82, 0.600, NULL, NULL, 'Penjualan: TRX-LHV2QX5I5S', 6, '2026-01-27 19:39:19', '2026-01-27 19:39:19'),
(429, NULL, NULL, 170, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 82, 0.435, NULL, NULL, 'Penjualan: TRX-LHV2QX5I5S', 6, '2026-01-27 19:39:19', '2026-01-27 19:39:19'),
(430, NULL, NULL, 174, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 82, 1.000, NULL, NULL, 'Penjualan: TRX-LHV2QX5I5S', 6, '2026-01-27 19:39:19', '2026-01-27 19:39:19'),
(431, NULL, NULL, 5, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 83, 0.195, NULL, NULL, 'Penjualan: TRX-18VGE281B1', 6, '2026-01-27 19:41:32', '2026-01-27 19:41:32'),
(432, NULL, NULL, 66, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 83, 1.000, NULL, NULL, 'Penjualan: TRX-18VGE281B1', 6, '2026-01-27 19:41:32', '2026-01-27 19:41:32'),
(433, NULL, NULL, 66, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 84, 1.000, NULL, NULL, 'Penjualan: TRX-88I0J282QL', 6, '2026-01-27 19:45:29', '2026-01-27 19:45:29'),
(434, NULL, NULL, 116, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 84, 1.000, NULL, NULL, 'Penjualan: TRX-88I0J282QL', 6, '2026-01-27 19:45:29', '2026-01-27 19:45:29'),
(435, NULL, NULL, 85, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 85, 0.345, NULL, NULL, 'Penjualan: TRX-974AZKY9GY', 6, '2026-01-27 19:51:26', '2026-01-27 19:51:26'),
(436, NULL, NULL, 88, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 85, 0.130, NULL, NULL, 'Penjualan: TRX-974AZKY9GY', 6, '2026-01-27 19:51:26', '2026-01-27 19:51:26'),
(437, NULL, NULL, 46, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 86, 1.000, NULL, NULL, 'Penjualan: TRX-EYNI2A12UR', 6, '2026-01-27 19:55:57', '2026-01-27 19:55:57'),
(438, NULL, NULL, 162, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 86, 1.000, NULL, NULL, 'Penjualan: TRX-EYNI2A12UR', 6, '2026-01-27 19:55:57', '2026-01-27 19:55:57'),
(439, NULL, NULL, 131, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 87, 1.000, NULL, NULL, 'Penjualan: TRX-M48934JS2Q', 6, '2026-01-27 20:01:49', '2026-01-27 20:01:49'),
(440, NULL, NULL, 52, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 88, 2.000, NULL, NULL, 'Penjualan: TRX-535HJUCTWY', 6, '2026-01-27 20:03:47', '2026-01-27 20:03:47'),
(441, NULL, NULL, 107, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 88, 0.185, NULL, NULL, 'Penjualan: TRX-535HJUCTWY', 6, '2026-01-27 20:03:47', '2026-01-27 20:03:47'),
(442, NULL, NULL, 131, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 89, 1.000, NULL, NULL, 'Penjualan: TRX-947UU02AE0', 6, '2026-01-27 20:06:27', '2026-01-27 20:06:27'),
(443, NULL, NULL, 170, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 90, 0.540, NULL, NULL, 'Penjualan: TRX-G1JF207V25', 6, '2026-01-27 20:11:54', '2026-01-27 20:11:54'),
(444, NULL, NULL, 51, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 91, 1.000, NULL, NULL, 'Penjualan: TRX-9971A87G5M', 6, '2026-01-27 20:19:00', '2026-01-27 20:19:00'),
(445, NULL, NULL, 56, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 91, 1.000, NULL, NULL, 'Penjualan: TRX-9971A87G5M', 6, '2026-01-27 20:19:00', '2026-01-27 20:19:00'),
(446, NULL, NULL, 60, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 91, 1.000, NULL, NULL, 'Penjualan: TRX-9971A87G5M', 6, '2026-01-27 20:19:00', '2026-01-27 20:19:00'),
(447, NULL, NULL, 164, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 91, 1.000, NULL, NULL, 'Penjualan: TRX-9971A87G5M', 6, '2026-01-27 20:19:00', '2026-01-27 20:19:00'),
(448, NULL, NULL, 48, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 92, 1.000, NULL, NULL, 'Penjualan: TRX-294G15M0L1', 6, '2026-01-27 20:21:23', '2026-01-27 20:21:23'),
(449, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 92, 1.000, NULL, NULL, 'Penjualan: TRX-294G15M0L1', 6, '2026-01-27 20:21:23', '2026-01-27 20:21:23'),
(450, NULL, NULL, 84, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 92, 1.470, NULL, NULL, 'Penjualan: TRX-294G15M0L1', 6, '2026-01-27 20:21:23', '2026-01-27 20:21:23'),
(451, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 92, 0.435, NULL, NULL, 'Penjualan: TRX-294G15M0L1', 6, '2026-01-27 20:21:23', '2026-01-27 20:21:23'),
(452, NULL, NULL, 171, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 92, 1.000, NULL, NULL, 'Penjualan: TRX-294G15M0L1', 6, '2026-01-27 20:21:23', '2026-01-27 20:21:23'),
(453, NULL, NULL, 83, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 93, 0.390, NULL, NULL, 'Penjualan: TRX-4I650499HU', 6, '2026-01-27 20:25:20', '2026-01-27 20:25:20'),
(454, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 93, 0.445, NULL, NULL, 'Penjualan: TRX-4I650499HU', 6, '2026-01-27 20:25:20', '2026-01-27 20:25:20'),
(455, NULL, NULL, 170, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 93, 0.465, NULL, NULL, 'Penjualan: TRX-4I650499HU', 6, '2026-01-27 20:25:20', '2026-01-27 20:25:20'),
(456, NULL, NULL, 81, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 94, 0.745, NULL, NULL, 'Penjualan: TRX-5G7S0O43M5', 6, '2026-01-27 20:26:32', '2026-01-27 20:26:32'),
(457, NULL, NULL, 84, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 94, 0.810, NULL, NULL, 'Penjualan: TRX-5G7S0O43M5', 6, '2026-01-27 20:26:32', '2026-01-27 20:26:32'),
(458, NULL, NULL, 52, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 95, 1.000, NULL, NULL, 'Penjualan: TRX-65382ANL9A', 6, '2026-01-27 20:38:50', '2026-01-27 20:38:50'),
(459, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 95, 1.000, NULL, NULL, 'Penjualan: TRX-65382ANL9A', 6, '2026-01-27 20:38:50', '2026-01-27 20:38:50'),
(460, NULL, NULL, 72, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 95, 1.000, NULL, NULL, 'Penjualan: TRX-65382ANL9A', 6, '2026-01-27 20:38:50', '2026-01-27 20:38:50'),
(461, NULL, NULL, 87, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 95, 0.220, NULL, NULL, 'Penjualan: TRX-65382ANL9A', 6, '2026-01-27 20:38:50', '2026-01-27 20:38:50'),
(462, NULL, NULL, 26, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 96, 1.000, NULL, NULL, 'Penjualan: TRX-4402J861HL', 6, '2026-01-27 20:41:24', '2026-01-27 20:41:24'),
(463, NULL, NULL, 88, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 96, 0.940, NULL, NULL, 'Penjualan: TRX-4402J861HL', 6, '2026-01-27 20:41:24', '2026-01-27 20:41:24'),
(464, NULL, NULL, 177, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 10.000, 110000.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-27 20:43:56', '2026-01-27 20:43:56'),
(465, NULL, NULL, 42, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 97, 0.500, NULL, NULL, 'Penjualan: TRX-378DBYLEW1', 6, '2026-01-27 20:46:29', '2026-01-27 20:46:29'),
(466, NULL, NULL, 177, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 10.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-27 20:47:32', '2026-01-27 20:47:32'),
(467, NULL, NULL, 178, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 1.000, 56000.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-27 20:48:05', '2026-01-27 20:48:05'),
(468, NULL, NULL, 178, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 1.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-27 20:48:18', '2026-01-27 20:48:18'),
(469, NULL, NULL, 179, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 1.000, 43000.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-27 20:49:27', '2026-01-27 20:49:27'),
(470, NULL, NULL, 179, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 1.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-27 20:49:38', '2026-01-27 20:49:38'),
(471, NULL, NULL, 180, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 5.000, 40000.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-27 20:49:59', '2026-01-27 20:49:59'),
(472, NULL, NULL, 180, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 5.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-27 20:50:10', '2026-01-27 20:50:10'),
(473, NULL, NULL, 181, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 10.000, 68000.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-27 20:50:32', '2026-01-27 20:50:32'),
(474, NULL, NULL, 181, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 10.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-27 20:50:44', '2026-01-27 20:50:44'),
(475, NULL, NULL, 182, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 4.000, 96000.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-27 20:51:19', '2026-01-27 20:51:19'),
(476, NULL, NULL, 182, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 4.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-27 20:51:31', '2026-01-27 20:51:31'),
(477, NULL, NULL, 131, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 98, 1.000, NULL, NULL, 'Penjualan: TRX-K8DCE86O26', 6, '2026-01-27 20:52:50', '2026-01-27 20:52:50'),
(478, NULL, NULL, 103, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 99, 0.870, NULL, NULL, 'Penjualan: TRX-896WX67UA8', 6, '2026-01-27 20:58:16', '2026-01-27 20:58:16'),
(479, NULL, NULL, 76, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 100, 1.000, NULL, NULL, 'Penjualan: TRX-06I9A39QPW', 6, '2026-01-27 20:59:56', '2026-01-27 20:59:56'),
(480, NULL, NULL, 166, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 101, 1.000, NULL, NULL, 'Penjualan: TRX-HMDN72XJ34', 6, '2026-01-27 21:00:23', '2026-01-27 21:00:23'),
(481, NULL, NULL, 174, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 101, 1.000, NULL, NULL, 'Penjualan: TRX-HMDN72XJ34', 6, '2026-01-27 21:00:23', '2026-01-27 21:00:23'),
(482, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 102, 1.000, NULL, NULL, 'Penjualan: TRX-5R5P77I8QO', 6, '2026-01-27 21:09:40', '2026-01-27 21:09:40'),
(483, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 102, 0.665, NULL, NULL, 'Penjualan: TRX-5R5P77I8QO', 6, '2026-01-27 21:09:40', '2026-01-27 21:09:40'),
(484, NULL, NULL, 40, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 103, 1.000, NULL, NULL, 'Penjualan: TRX-9WVEF50OD1', 6, '2026-01-27 21:25:32', '2026-01-27 21:25:32'),
(485, NULL, NULL, 117, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 103, 1.000, NULL, NULL, 'Penjualan: TRX-9WVEF50OD1', 6, '2026-01-27 21:25:32', '2026-01-27 21:25:32'),
(486, NULL, NULL, 177, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 103, 0.040, NULL, NULL, 'Penjualan: TRX-9WVEF50OD1', 6, '2026-01-27 21:25:32', '2026-01-27 21:25:32'),
(487, NULL, NULL, 179, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 103, 0.145, NULL, NULL, 'Penjualan: TRX-9WVEF50OD1', 6, '2026-01-27 21:25:32', '2026-01-27 21:25:32'),
(488, NULL, NULL, 19, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 104, 1.000, NULL, NULL, 'Penjualan: TRX-43M6K279VU', 6, '2026-01-27 21:30:24', '2026-01-27 21:30:24'),
(489, NULL, NULL, 23, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 104, 0.480, NULL, NULL, 'Penjualan: TRX-43M6K279VU', 6, '2026-01-27 21:30:24', '2026-01-27 21:30:24'),
(490, NULL, NULL, 66, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 104, 2.000, NULL, NULL, 'Penjualan: TRX-43M6K279VU', 6, '2026-01-27 21:30:24', '2026-01-27 21:30:24'),
(491, NULL, NULL, 183, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 4.000, 100000.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-27 21:55:55', '2026-01-27 21:55:55'),
(492, NULL, NULL, 183, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 4.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-27 21:56:08', '2026-01-27 21:56:08'),
(493, NULL, NULL, 183, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 105, 1.000, NULL, NULL, 'Penjualan: TRX-326703932X', 6, '2026-01-27 21:57:53', '2026-01-27 21:57:53'),
(494, NULL, NULL, 184, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 11.000, 275000.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-27 22:02:58', '2026-01-27 22:02:58'),
(495, NULL, NULL, 184, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 11.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-27 22:03:13', '2026-01-27 22:03:13'),
(496, NULL, NULL, 185, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 1.000, 32500.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-27 22:51:47', '2026-01-27 22:51:47'),
(497, NULL, NULL, 185, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 1.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-27 22:51:58', '2026-01-27 22:51:58'),
(498, NULL, NULL, 42, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 106, 0.950, NULL, NULL, 'Penjualan: TRX-E2383H44KS', 3, '2026-01-28 08:37:10', '2026-01-28 08:37:10'),
(499, NULL, NULL, 86, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 106, 1.550, NULL, NULL, 'Penjualan: TRX-E2383H44KS', 3, '2026-01-28 08:37:10', '2026-01-28 08:37:10'),
(500, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 107, 1.000, NULL, NULL, 'Penjualan: TRX-208IWZ3747', 3, '2026-01-28 08:45:40', '2026-01-28 08:45:40'),
(501, NULL, NULL, 170, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 107, 0.435, NULL, NULL, 'Penjualan: TRX-208IWZ3747', 3, '2026-01-28 08:45:40', '2026-01-28 08:45:40'),
(502, NULL, NULL, 105, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 108, 1.000, NULL, NULL, 'Penjualan: TRX-493V2A0863', 3, '2026-01-28 09:11:48', '2026-01-28 09:11:48'),
(503, NULL, NULL, 105, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 109, 1.000, NULL, NULL, 'Penjualan: TRX-2G1794M950', 3, '2026-01-28 09:12:11', '2026-01-28 09:12:11'),
(504, NULL, NULL, 182, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 110, 0.795, NULL, NULL, 'Penjualan: TRX-UQ4JW80UE3', 3, '2026-01-28 09:16:57', '2026-01-28 09:16:57'),
(513, NULL, NULL, 47, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 113, 1.000, NULL, NULL, 'Penjualan: TRX-60180DQA7T', 3, '2026-01-28 09:41:39', '2026-01-28 09:41:39'),
(514, NULL, NULL, 52, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 113, 1.000, NULL, NULL, 'Penjualan: TRX-60180DQA7T', 3, '2026-01-28 09:41:39', '2026-01-28 09:41:39'),
(515, NULL, NULL, 59, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 113, 1.000, NULL, NULL, 'Penjualan: TRX-60180DQA7T', 3, '2026-01-28 09:41:39', '2026-01-28 09:41:39'),
(516, NULL, NULL, 62, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 113, 1.000, NULL, NULL, 'Penjualan: TRX-60180DQA7T', 3, '2026-01-28 09:41:39', '2026-01-28 09:41:39'),
(517, NULL, NULL, 4, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 114, 0.495, NULL, NULL, 'Penjualan: TRX-96035A4Q6N', 3, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(518, NULL, NULL, 6, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 114, 0.420, NULL, NULL, 'Penjualan: TRX-96035A4Q6N', 3, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(519, NULL, NULL, 16, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 114, 1.000, NULL, NULL, 'Penjualan: TRX-96035A4Q6N', 3, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(520, NULL, NULL, 18, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 114, 2.000, NULL, NULL, 'Penjualan: TRX-96035A4Q6N', 3, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(521, NULL, NULL, 19, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 114, 1.000, NULL, NULL, 'Penjualan: TRX-96035A4Q6N', 3, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(522, NULL, NULL, 20, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 114, 1.000, NULL, NULL, 'Penjualan: TRX-96035A4Q6N', 3, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(523, NULL, NULL, 127, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 114, 0.170, NULL, NULL, 'Penjualan: TRX-96035A4Q6N', 3, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(524, NULL, NULL, 128, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 114, 0.205, NULL, NULL, 'Penjualan: TRX-96035A4Q6N', 3, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(525, NULL, NULL, 185, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 114, 0.225, NULL, NULL, 'Penjualan: TRX-96035A4Q6N', 3, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(526, NULL, NULL, 23, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 115, 0.505, NULL, NULL, 'Penjualan: TRX-V5M9YAN4M4', 3, '2026-01-28 09:56:22', '2026-01-28 09:56:22'),
(527, NULL, NULL, 66, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 115, 1.000, NULL, NULL, 'Penjualan: TRX-V5M9YAN4M4', 3, '2026-01-28 09:56:22', '2026-01-28 09:56:22'),
(528, NULL, NULL, 23, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 116, 0.505, NULL, NULL, 'Penjualan: TRX-9YLK8Y28M2', 3, '2026-01-28 09:57:53', '2026-01-28 09:57:53'),
(529, NULL, NULL, 66, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 116, 1.000, NULL, NULL, 'Penjualan: TRX-9YLK8Y28M2', 3, '2026-01-28 09:57:53', '2026-01-28 09:57:53'),
(530, NULL, NULL, 170, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 117, 0.350, NULL, NULL, 'Penjualan: TRX-3CZ1749HM9', 3, '2026-01-28 10:15:20', '2026-01-28 10:15:20'),
(531, NULL, NULL, 170, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 118, 0.350, NULL, NULL, 'Penjualan: TRX-6L8AZ69EEZ', 3, '2026-01-28 10:16:16', '2026-01-28 10:16:16'),
(532, NULL, NULL, 55, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 119, 1.000, NULL, NULL, 'Penjualan: TRX-6X199MIL6R', 3, '2026-01-28 10:17:20', '2026-01-28 10:17:20'),
(533, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 120, 0.725, NULL, NULL, 'Penjualan: TRX-Z04QJAC6S6', 3, '2026-01-28 10:46:09', '2026-01-28 10:46:09'),
(534, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 121, 0.725, NULL, NULL, 'Penjualan: TRX-PU1HU52Q3O', 3, '2026-01-28 10:46:41', '2026-01-28 10:46:41'),
(535, NULL, NULL, 62, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 122, 1.000, NULL, NULL, 'Penjualan: TRX-34EGG3FQR9', 3, '2026-01-28 10:48:32', '2026-01-28 10:48:32'),
(536, NULL, NULL, 62, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 123, 1.000, NULL, NULL, 'Penjualan: TRX-S922E78CC6', 3, '2026-01-28 11:19:27', '2026-01-28 11:19:27'),
(537, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 123, 1.000, NULL, NULL, 'Penjualan: TRX-S922E78CC6', 3, '2026-01-28 11:19:27', '2026-01-28 11:19:27'),
(538, NULL, NULL, 103, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 123, 1.075, NULL, NULL, 'Penjualan: TRX-S922E78CC6', 3, '2026-01-28 11:19:27', '2026-01-28 11:19:27'),
(539, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 123, 0.525, NULL, NULL, 'Penjualan: TRX-S922E78CC6', 3, '2026-01-28 11:19:27', '2026-01-28 11:19:27'),
(540, NULL, NULL, 182, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 123, 0.875, NULL, NULL, 'Penjualan: TRX-S922E78CC6', 3, '2026-01-28 11:19:27', '2026-01-28 11:19:27'),
(541, NULL, NULL, 69, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 124, 0.520, NULL, NULL, 'Penjualan: TRX-F60O2L3M88', 3, '2026-01-28 11:20:03', '2026-01-28 11:20:03'),
(542, NULL, NULL, 55, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 125, 2.000, NULL, NULL, 'Penjualan: TRX-36CN9CZ002', 3, '2026-01-28 11:21:32', '2026-01-28 11:21:32'),
(543, NULL, NULL, 54, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 126, 1.000, NULL, NULL, 'Penjualan: TRX-03P3U5914M', 3, '2026-01-28 11:24:28', '2026-01-28 11:24:28'),
(544, NULL, NULL, 68, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 126, 1.000, NULL, NULL, 'Penjualan: TRX-03P3U5914M', 3, '2026-01-28 11:24:28', '2026-01-28 11:24:28'),
(545, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 126, 0.590, NULL, NULL, 'Penjualan: TRX-03P3U5914M', 3, '2026-01-28 11:24:28', '2026-01-28 11:24:28'),
(546, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 127, 0.860, NULL, NULL, 'Penjualan: TRX-XQE7LZFKM3', 3, '2026-01-28 11:25:27', '2026-01-28 11:25:27'),
(549, NULL, NULL, 15, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 129, 1.000, NULL, NULL, 'Penjualan: TRX-W1VCYHIQP0', 3, '2026-01-28 11:32:56', '2026-01-28 11:32:56'),
(550, NULL, NULL, 26, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 129, 1.000, NULL, NULL, 'Penjualan: TRX-W1VCYHIQP0', 3, '2026-01-28 11:32:56', '2026-01-28 11:32:56'),
(554, NULL, NULL, 55, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 131, 1.000, NULL, NULL, 'Penjualan: TRX-9BENLX5193', 3, '2026-01-28 11:41:21', '2026-01-28 11:41:21'),
(555, NULL, NULL, 81, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 131, 0.380, NULL, NULL, 'Penjualan: TRX-9BENLX5193', 3, '2026-01-28 11:41:21', '2026-01-28 11:41:21'),
(556, NULL, NULL, 87, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 131, 0.435, NULL, NULL, 'Penjualan: TRX-9BENLX5193', 3, '2026-01-28 11:41:21', '2026-01-28 11:41:21'),
(557, NULL, NULL, 48, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 132, 1.000, NULL, NULL, 'Penjualan: TRX-7Q6APISUV3', 3, '2026-01-28 11:55:46', '2026-01-28 11:55:46'),
(558, NULL, NULL, 82, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 132, 1.075, NULL, NULL, 'Penjualan: TRX-7Q6APISUV3', 3, '2026-01-28 11:55:46', '2026-01-28 11:55:46'),
(559, NULL, NULL, 87, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 132, 1.020, NULL, NULL, 'Penjualan: TRX-7Q6APISUV3', 3, '2026-01-28 11:55:46', '2026-01-28 11:55:46'),
(560, NULL, NULL, 102, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 132, 0.240, NULL, NULL, 'Penjualan: TRX-7Q6APISUV3', 3, '2026-01-28 11:55:46', '2026-01-28 11:55:46'),
(561, NULL, NULL, 177, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 132, 0.355, NULL, NULL, 'Penjualan: TRX-7Q6APISUV3', 3, '2026-01-28 11:55:46', '2026-01-28 11:55:46'),
(562, NULL, NULL, 52, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 133, 2.000, NULL, NULL, 'Penjualan: TRX-29W9AAP7IY', 3, '2026-01-28 13:25:23', '2026-01-28 13:25:23');
INSERT INTO `stock_movements` (`id`, `receipt_id`, `purchase_order_id`, `product_id`, `from_type`, `from_id`, `supplier_id`, `invoice_number`, `batch_number`, `expiry_date`, `to_type`, `to_id`, `quantity`, `purchase_price`, `loss_amount`, `note`, `user_id`, `created_at`, `updated_at`) VALUES
(563, NULL, NULL, 170, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 133, 0.560, NULL, NULL, 'Penjualan: TRX-29W9AAP7IY', 3, '2026-01-28 13:25:23', '2026-01-28 13:25:23'),
(564, NULL, NULL, 82, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 134, 1.725, NULL, NULL, 'Penjualan: TRX-78LTND15E0', 3, '2026-01-28 13:42:35', '2026-01-28 13:42:35'),
(565, NULL, NULL, 106, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 134, 1.000, NULL, NULL, 'Penjualan: TRX-78LTND15E0', 3, '2026-01-28 13:42:35', '2026-01-28 13:42:35'),
(566, NULL, NULL, 82, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 135, 0.625, NULL, NULL, 'Penjualan: TRX-T894B09ZNK', 3, '2026-01-28 13:58:12', '2026-01-28 13:58:12'),
(567, NULL, NULL, 84, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 135, 0.840, NULL, NULL, 'Penjualan: TRX-T894B09ZNK', 3, '2026-01-28 13:58:12', '2026-01-28 13:58:12'),
(568, NULL, NULL, 104, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 135, 0.490, NULL, NULL, 'Penjualan: TRX-T894B09ZNK', 3, '2026-01-28 13:58:12', '2026-01-28 13:58:12'),
(569, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 135, 1.325, NULL, NULL, 'Penjualan: TRX-T894B09ZNK', 3, '2026-01-28 13:58:12', '2026-01-28 13:58:12'),
(570, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 136, 1.075, NULL, NULL, 'Penjualan: TRX-0LFWGX1A3B', 3, '2026-01-28 14:13:33', '2026-01-28 14:13:33'),
(571, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 137, 1.000, NULL, NULL, 'Penjualan: TRX-28DX6R9NTF', 3, '2026-01-28 14:19:43', '2026-01-28 14:19:43'),
(572, NULL, NULL, 22, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 138, 1.000, NULL, NULL, 'Penjualan: TRX-F63T5D3CZ6', 3, '2026-01-28 15:09:39', '2026-01-28 15:09:39'),
(573, NULL, NULL, 64, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 138, 1.000, NULL, NULL, 'Penjualan: TRX-F63T5D3CZ6', 3, '2026-01-28 15:09:39', '2026-01-28 15:09:39'),
(574, NULL, NULL, 134, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 138, 1.000, NULL, NULL, 'Penjualan: TRX-F63T5D3CZ6', 3, '2026-01-28 15:09:39', '2026-01-28 15:09:39'),
(575, NULL, NULL, 182, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 138, 1.500, NULL, NULL, 'Penjualan: TRX-F63T5D3CZ6', 3, '2026-01-28 15:09:39', '2026-01-28 15:09:39'),
(576, NULL, NULL, 58, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 139, 0.220, NULL, NULL, 'Penjualan: TRX-2LKGN1Q5PI', 3, '2026-01-28 15:12:21', '2026-01-28 15:12:21'),
(577, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 139, 0.380, NULL, NULL, 'Penjualan: TRX-2LKGN1Q5PI', 3, '2026-01-28 15:12:21', '2026-01-28 15:12:21'),
(578, NULL, NULL, 52, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 140, 1.000, NULL, NULL, 'Penjualan: TRX-9FBIUUZOLL', 3, '2026-01-28 15:14:51', '2026-01-28 15:14:51'),
(579, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 140, 1.000, NULL, NULL, 'Penjualan: TRX-9FBIUUZOLL', 3, '2026-01-28 15:14:51', '2026-01-28 15:14:51'),
(580, NULL, NULL, 107, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 141, 0.785, NULL, NULL, 'Penjualan: TRX-5V7O85I966', 3, '2026-01-28 15:27:21', '2026-01-28 15:27:21'),
(581, NULL, NULL, 49, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 142, 0.540, NULL, NULL, 'Penjualan: TRX-ZY2ACKKA6Z', 3, '2026-01-28 15:45:41', '2026-01-28 15:45:41'),
(582, NULL, NULL, 80, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 142, 1.000, NULL, NULL, 'Penjualan: TRX-ZY2ACKKA6Z', 3, '2026-01-28 15:45:41', '2026-01-28 15:45:41'),
(583, NULL, NULL, 183, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 143, 1.000, NULL, NULL, 'Penjualan: TRX-861SXA3G4D', 3, '2026-01-28 15:47:19', '2026-01-28 15:47:19'),
(586, NULL, NULL, 87, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 145, 0.995, NULL, NULL, 'Penjualan: TRX-X39L60L7IV', 3, '2026-01-28 15:58:17', '2026-01-28 15:58:17'),
(587, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 145, 1.020, NULL, NULL, 'Penjualan: TRX-X39L60L7IV', 3, '2026-01-28 15:58:17', '2026-01-28 15:58:17'),
(588, NULL, NULL, 124, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 42.000, 0.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-28 16:35:19', '2026-01-28 16:35:19'),
(589, NULL, NULL, 124, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 42.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-28 16:35:28', '2026-01-28 16:35:28'),
(590, NULL, NULL, 18, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 50.000, 0.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-28 16:37:25', '2026-01-28 16:37:25'),
(591, NULL, NULL, 18, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 50.000, 0.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-28 16:37:25', '2026-01-28 16:37:25'),
(592, NULL, NULL, 18, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 50.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-28 16:37:34', '2026-01-28 16:37:34'),
(593, NULL, NULL, 81, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 146, 0.350, NULL, NULL, 'Penjualan: TRX-7VM5MCRS6U', 6, '2026-01-28 16:41:14', '2026-01-28 16:41:14'),
(594, NULL, NULL, 83, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 146, 0.375, NULL, NULL, 'Penjualan: TRX-7VM5MCRS6U', 6, '2026-01-28 16:41:14', '2026-01-28 16:41:14'),
(595, NULL, NULL, 188, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 25.000, 0.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-28 16:45:14', '2026-01-28 16:45:14'),
(596, NULL, NULL, 188, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 25.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-28 16:45:27', '2026-01-28 16:45:27'),
(597, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 147, 1.000, NULL, NULL, 'Penjualan: TRX-S0N1269715', 6, '2026-01-28 16:53:01', '2026-01-28 16:53:01'),
(598, NULL, NULL, 69, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 148, 0.170, NULL, NULL, 'Penjualan: TRX-P3O5417U10', 6, '2026-01-28 16:56:08', '2026-01-28 16:56:08'),
(599, NULL, NULL, 107, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 148, 0.195, NULL, NULL, 'Penjualan: TRX-P3O5417U10', 6, '2026-01-28 16:56:08', '2026-01-28 16:56:08'),
(600, NULL, NULL, 162, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 148, 1.000, NULL, NULL, 'Penjualan: TRX-P3O5417U10', 6, '2026-01-28 16:56:08', '2026-01-28 16:56:08'),
(601, NULL, NULL, 166, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 148, 1.000, NULL, NULL, 'Penjualan: TRX-P3O5417U10', 6, '2026-01-28 16:56:08', '2026-01-28 16:56:08'),
(602, NULL, NULL, 175, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 148, 1.000, NULL, NULL, 'Penjualan: TRX-P3O5417U10', 6, '2026-01-28 16:56:08', '2026-01-28 16:56:08'),
(603, NULL, NULL, 42, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 149, 0.500, NULL, NULL, 'Penjualan: TRX-N68H2VQXM4', 6, '2026-01-28 17:04:22', '2026-01-28 17:04:22'),
(604, NULL, NULL, 78, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 149, 0.870, NULL, NULL, 'Penjualan: TRX-N68H2VQXM4', 6, '2026-01-28 17:04:22', '2026-01-28 17:04:22'),
(605, NULL, NULL, 104, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 149, 0.395, NULL, NULL, 'Penjualan: TRX-N68H2VQXM4', 6, '2026-01-28 17:04:22', '2026-01-28 17:04:22'),
(606, NULL, NULL, 124, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 149, 1.000, NULL, NULL, 'Penjualan: TRX-N68H2VQXM4', 6, '2026-01-28 17:04:22', '2026-01-28 17:04:22'),
(607, NULL, NULL, 170, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 149, 0.900, NULL, NULL, 'Penjualan: TRX-N68H2VQXM4', 6, '2026-01-28 17:04:22', '2026-01-28 17:04:22'),
(608, NULL, NULL, 177, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 149, 0.200, NULL, NULL, 'Penjualan: TRX-N68H2VQXM4', 6, '2026-01-28 17:04:22', '2026-01-28 17:04:22'),
(609, NULL, NULL, 178, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 149, 0.095, NULL, NULL, 'Penjualan: TRX-N68H2VQXM4', 6, '2026-01-28 17:04:22', '2026-01-28 17:04:22'),
(610, NULL, NULL, 90, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 150, 0.420, NULL, NULL, 'Penjualan: TRX-VO540L71HB', 6, '2026-01-28 17:11:15', '2026-01-28 17:11:15'),
(611, NULL, NULL, 170, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 150, 0.380, NULL, NULL, 'Penjualan: TRX-VO540L71HB', 6, '2026-01-28 17:11:15', '2026-01-28 17:11:15'),
(612, NULL, NULL, 174, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 151, 1.000, NULL, NULL, 'Penjualan: TRX-T78O14O01F', 6, '2026-01-28 17:18:15', '2026-01-28 17:18:15'),
(613, NULL, NULL, 166, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 152, 1.000, NULL, NULL, 'Penjualan: TRX-ZL2B9823K7', 6, '2026-01-28 17:19:08', '2026-01-28 17:19:08'),
(614, NULL, NULL, 166, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 153, 1.000, NULL, NULL, 'Penjualan: TRX-824IUP4725', 6, '2026-01-28 17:22:16', '2026-01-28 17:22:16'),
(615, NULL, NULL, 170, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 153, 0.520, NULL, NULL, 'Penjualan: TRX-824IUP4725', 6, '2026-01-28 17:22:16', '2026-01-28 17:22:16'),
(616, NULL, NULL, 83, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 154, 0.775, NULL, NULL, 'Penjualan: TRX-RM65JZUYT1', 6, '2026-01-28 17:23:13', '2026-01-28 17:23:13'),
(617, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 154, 0.710, NULL, NULL, 'Penjualan: TRX-RM65JZUYT1', 6, '2026-01-28 17:23:13', '2026-01-28 17:23:13'),
(618, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 155, 1.020, NULL, NULL, 'Penjualan: TRX-G9E20LX199', 6, '2026-01-28 17:23:47', '2026-01-28 17:23:47'),
(619, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 156, 1.185, NULL, NULL, 'Penjualan: TRX-P9E74V0EV4', 6, '2026-01-28 17:24:36', '2026-01-28 17:24:36'),
(620, NULL, NULL, 20, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 157, 2.000, NULL, NULL, 'Penjualan: TRX-T38WWCEJ71', 6, '2026-01-28 17:26:10', '2026-01-28 17:26:10'),
(621, NULL, NULL, 23, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 157, 0.495, NULL, NULL, 'Penjualan: TRX-T38WWCEJ71', 6, '2026-01-28 17:26:10', '2026-01-28 17:26:10'),
(622, NULL, NULL, 85, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 157, 0.895, NULL, NULL, 'Penjualan: TRX-T38WWCEJ71', 6, '2026-01-28 17:26:10', '2026-01-28 17:26:10'),
(623, NULL, NULL, 122, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 158, 0.515, NULL, NULL, 'Penjualan: TRX-2266UVEV5J', 6, '2026-01-28 17:27:09', '2026-01-28 17:27:09'),
(624, NULL, NULL, 124, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 158, 1.000, NULL, NULL, 'Penjualan: TRX-2266UVEV5J', 6, '2026-01-28 17:27:09', '2026-01-28 17:27:09'),
(625, NULL, NULL, 179, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 10.000, 0.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-28 17:28:48', '2026-01-28 17:28:48'),
(626, NULL, NULL, 179, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 10.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-28 17:28:59', '2026-01-28 17:28:59'),
(627, NULL, NULL, 18, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 159, 1.000, NULL, NULL, 'Penjualan: TRX-T84U394CF4', 6, '2026-01-28 17:30:34', '2026-01-28 17:30:34'),
(628, NULL, NULL, 23, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 159, 0.505, NULL, NULL, 'Penjualan: TRX-T84U394CF4', 6, '2026-01-28 17:30:34', '2026-01-28 17:30:34'),
(629, NULL, NULL, 26, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 159, 1.000, NULL, NULL, 'Penjualan: TRX-T84U394CF4', 6, '2026-01-28 17:30:34', '2026-01-28 17:30:34'),
(630, NULL, NULL, 179, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 159, 0.245, NULL, NULL, 'Penjualan: TRX-T84U394CF4', 6, '2026-01-28 17:30:34', '2026-01-28 17:30:34'),
(631, NULL, NULL, 188, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 159, 0.255, NULL, NULL, 'Penjualan: TRX-T84U394CF4', 6, '2026-01-28 17:30:34', '2026-01-28 17:30:34'),
(632, NULL, NULL, 27, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 160, 1.000, NULL, NULL, 'Penjualan: TRX-87PR1137UB', 6, '2026-01-28 17:31:02', '2026-01-28 17:31:02'),
(633, NULL, NULL, 175, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 160, 1.000, NULL, NULL, 'Penjualan: TRX-87PR1137UB', 6, '2026-01-28 17:31:02', '2026-01-28 17:31:02'),
(634, NULL, NULL, 182, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 5.000, 0.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-28 17:32:31', '2026-01-28 17:32:31'),
(635, NULL, NULL, 182, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 5.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-28 17:32:40', '2026-01-28 17:32:40'),
(636, NULL, NULL, 182, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 161, 0.975, NULL, NULL, 'Penjualan: TRX-96N0KY9UST', 6, '2026-01-28 17:33:26', '2026-01-28 17:33:26'),
(637, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 162, 1.025, NULL, NULL, 'Penjualan: TRX-AEI8XSO8J4', 6, '2026-01-28 17:34:23', '2026-01-28 17:34:23'),
(638, NULL, NULL, 75, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 163, 1.000, NULL, NULL, 'Penjualan: TRX-BXI421BXKQ', 6, '2026-01-28 17:38:01', '2026-01-28 17:38:01'),
(639, NULL, NULL, 103, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 163, 0.445, NULL, NULL, 'Penjualan: TRX-BXI421BXKQ', 6, '2026-01-28 17:38:01', '2026-01-28 17:38:01'),
(640, NULL, NULL, 83, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 164, 0.690, NULL, NULL, 'Penjualan: TRX-QW27NHMY3I', 6, '2026-01-28 17:38:29', '2026-01-28 17:38:29'),
(641, NULL, NULL, 65, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 165, 1.000, NULL, NULL, 'Penjualan: TRX-OP48L8GORS', 6, '2026-01-28 17:41:18', '2026-01-28 17:41:18'),
(642, NULL, NULL, 83, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 165, 1.195, NULL, NULL, 'Penjualan: TRX-OP48L8GORS', 6, '2026-01-28 17:41:18', '2026-01-28 17:41:18'),
(643, NULL, NULL, 14, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 166, 1.000, NULL, NULL, 'Penjualan: TRX-93Y3NNC5M7', 6, '2026-01-28 17:52:37', '2026-01-28 17:52:37'),
(644, NULL, NULL, 103, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 166, 1.345, NULL, NULL, 'Penjualan: TRX-93Y3NNC5M7', 6, '2026-01-28 17:52:37', '2026-01-28 17:52:37'),
(645, NULL, NULL, 82, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 167, 0.240, NULL, NULL, 'Penjualan: TRX-12894G6T6E', 6, '2026-01-28 18:07:48', '2026-01-28 18:07:48'),
(646, NULL, NULL, 83, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 167, 0.360, NULL, NULL, 'Penjualan: TRX-12894G6T6E', 6, '2026-01-28 18:07:48', '2026-01-28 18:07:48'),
(647, NULL, NULL, 89, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 167, 0.240, NULL, NULL, 'Penjualan: TRX-12894G6T6E', 6, '2026-01-28 18:07:48', '2026-01-28 18:07:48'),
(648, NULL, NULL, 106, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 167, 1.000, NULL, NULL, 'Penjualan: TRX-12894G6T6E', 6, '2026-01-28 18:07:48', '2026-01-28 18:07:48'),
(649, NULL, NULL, 171, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 167, 1.000, NULL, NULL, 'Penjualan: TRX-12894G6T6E', 6, '2026-01-28 18:07:48', '2026-01-28 18:07:48'),
(650, NULL, NULL, 169, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 168, 1.000, NULL, NULL, 'Penjualan: TRX-C364E69M09', 6, '2026-01-28 18:08:11', '2026-01-28 18:08:11'),
(651, NULL, NULL, 81, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 169, 0.515, NULL, NULL, 'Penjualan: TRX-17428YC4RF', 6, '2026-01-28 18:29:46', '2026-01-28 18:29:46'),
(652, NULL, NULL, 170, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 169, 0.330, NULL, NULL, 'Penjualan: TRX-17428YC4RF', 6, '2026-01-28 18:29:46', '2026-01-28 18:29:46'),
(653, NULL, NULL, 6, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 170, 0.435, NULL, NULL, 'Penjualan: TRX-26K68K3T88', 6, '2026-01-28 18:44:03', '2026-01-28 18:44:03'),
(654, NULL, NULL, 17, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 170, 1.000, NULL, NULL, 'Penjualan: TRX-26K68K3T88', 6, '2026-01-28 18:44:03', '2026-01-28 18:44:03'),
(655, NULL, NULL, 119, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 170, 1.000, NULL, NULL, 'Penjualan: TRX-26K68K3T88', 6, '2026-01-28 18:44:03', '2026-01-28 18:44:03'),
(656, NULL, NULL, 177, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 170, 0.410, NULL, NULL, 'Penjualan: TRX-26K68K3T88', 6, '2026-01-28 18:44:03', '2026-01-28 18:44:03'),
(657, NULL, NULL, 180, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 170, 1.070, NULL, NULL, 'Penjualan: TRX-26K68K3T88', 6, '2026-01-28 18:44:03', '2026-01-28 18:44:03'),
(659, NULL, NULL, 154, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 3.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-28 18:47:12', '2026-01-28 18:47:12'),
(660, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 171, 1.000, NULL, NULL, 'Penjualan: TRX-I5W046T14O', 6, '2026-01-28 19:10:29', '2026-01-28 19:10:29'),
(661, NULL, NULL, 90, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 171, 0.405, NULL, NULL, 'Penjualan: TRX-I5W046T14O', 6, '2026-01-28 19:10:29', '2026-01-28 19:10:29'),
(662, NULL, NULL, 17, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 172, 1.000, NULL, NULL, 'Penjualan: TRX-W562HXJ530', 6, '2026-01-28 19:15:48', '2026-01-28 19:15:48'),
(663, NULL, NULL, 27, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 172, 2.000, NULL, NULL, 'Penjualan: TRX-W562HXJ530', 6, '2026-01-28 19:15:48', '2026-01-28 19:15:48'),
(664, NULL, NULL, 124, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 172, 1.000, NULL, NULL, 'Penjualan: TRX-W562HXJ530', 6, '2026-01-28 19:15:48', '2026-01-28 19:15:48'),
(665, NULL, NULL, 179, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 172, 0.145, NULL, NULL, 'Penjualan: TRX-W562HXJ530', 6, '2026-01-28 19:15:48', '2026-01-28 19:15:48'),
(666, NULL, NULL, 68, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 173, 1.000, NULL, NULL, 'Penjualan: TRX-1KYCS5R28D', 6, '2026-01-28 19:16:28', '2026-01-28 19:16:28'),
(667, NULL, NULL, 42, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 174, 0.500, NULL, NULL, 'Penjualan: TRX-1JL87C723Q', 6, '2026-01-28 19:17:59', '2026-01-28 19:17:59'),
(668, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 174, 1.000, NULL, NULL, 'Penjualan: TRX-1JL87C723Q', 6, '2026-01-28 19:17:59', '2026-01-28 19:17:59'),
(669, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 174, 1.205, NULL, NULL, 'Penjualan: TRX-1JL87C723Q', 6, '2026-01-28 19:17:59', '2026-01-28 19:17:59'),
(670, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 175, 0.695, NULL, NULL, 'Penjualan: TRX-39896QJ17A', 6, '2026-01-28 19:29:23', '2026-01-28 19:29:23'),
(671, NULL, NULL, 170, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 175, 0.275, NULL, NULL, 'Penjualan: TRX-39896QJ17A', 6, '2026-01-28 19:29:23', '2026-01-28 19:29:23'),
(672, NULL, NULL, 191, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 8.000, 488000.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-28 19:33:23', '2026-01-28 19:33:23'),
(673, NULL, NULL, 42, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 176, 0.500, NULL, NULL, 'Penjualan: TRX-K25711469N', 6, '2026-01-28 19:34:07', '2026-01-28 19:34:07'),
(674, NULL, NULL, 191, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 8.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-28 19:35:25', '2026-01-28 19:35:25'),
(675, NULL, NULL, 191, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 177, 0.200, NULL, NULL, 'Penjualan: TRX-0IQY9X1170', 6, '2026-01-28 19:35:53', '2026-01-28 19:35:53'),
(676, NULL, NULL, 20, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 178, 1.000, NULL, NULL, 'Penjualan: TRX-1GJM3I8970', 6, '2026-01-28 19:49:33', '2026-01-28 19:49:33'),
(677, NULL, NULL, 22, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 178, 1.000, NULL, NULL, 'Penjualan: TRX-1GJM3I8970', 6, '2026-01-28 19:49:33', '2026-01-28 19:49:33'),
(678, NULL, NULL, 182, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 178, 0.650, NULL, NULL, 'Penjualan: TRX-1GJM3I8970', 6, '2026-01-28 19:49:33', '2026-01-28 19:49:33'),
(679, NULL, NULL, 52, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 179, 2.000, NULL, NULL, 'Penjualan: TRX-0EP1M9VMZ7', 6, '2026-01-28 19:50:22', '2026-01-28 19:50:22'),
(680, NULL, NULL, 171, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 179, 1.000, NULL, NULL, 'Penjualan: TRX-0EP1M9VMZ7', 6, '2026-01-28 19:50:22', '2026-01-28 19:50:22'),
(681, NULL, NULL, 81, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 180, 0.760, NULL, NULL, 'Penjualan: TRX-ELAJX919D8', 6, '2026-01-28 19:52:13', '2026-01-28 19:52:13'),
(682, NULL, NULL, 170, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 180, 0.600, NULL, NULL, 'Penjualan: TRX-ELAJX919D8', 6, '2026-01-28 19:52:13', '2026-01-28 19:52:13'),
(683, NULL, NULL, 126, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 181, 0.715, NULL, NULL, 'Penjualan: TRX-LS5HK3Y17F', 6, '2026-01-28 19:55:08', '2026-01-28 19:55:08'),
(684, NULL, NULL, 131, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 181, 1.000, NULL, NULL, 'Penjualan: TRX-LS5HK3Y17F', 6, '2026-01-28 19:55:08', '2026-01-28 19:55:08'),
(685, NULL, NULL, 23, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 182, 0.515, NULL, NULL, 'Penjualan: TRX-Q515VN4W21', 6, '2026-01-28 20:01:55', '2026-01-28 20:01:55'),
(686, NULL, NULL, 171, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 182, 1.000, NULL, NULL, 'Penjualan: TRX-Q515VN4W21', 6, '2026-01-28 20:01:55', '2026-01-28 20:01:55'),
(687, NULL, NULL, 177, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 182, 0.280, NULL, NULL, 'Penjualan: TRX-Q515VN4W21', 6, '2026-01-28 20:01:55', '2026-01-28 20:01:55'),
(688, NULL, NULL, 77, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 183, 1.000, NULL, NULL, 'Penjualan: TRX-QT3J1C08UM', 6, '2026-01-28 20:02:57', '2026-01-28 20:02:57'),
(689, NULL, NULL, 85, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 184, 0.975, NULL, NULL, 'Penjualan: TRX-TWNVT27Z0A', 6, '2026-01-28 20:11:26', '2026-01-28 20:11:26'),
(690, NULL, NULL, 6, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 185, 0.555, NULL, NULL, 'Penjualan: TRX-CWAA3BZX77', 6, '2026-01-28 20:17:11', '2026-01-28 20:17:11'),
(691, NULL, NULL, 180, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 185, 0.990, NULL, NULL, 'Penjualan: TRX-CWAA3BZX77', 6, '2026-01-28 20:17:11', '2026-01-28 20:17:11'),
(692, NULL, NULL, 178, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 1.000, 0.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-28 20:18:41', '2026-01-28 20:18:41'),
(693, NULL, NULL, 178, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 1.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-28 20:18:52', '2026-01-28 20:18:52'),
(694, NULL, NULL, 178, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 186, 0.070, NULL, NULL, 'Penjualan: TRX-18C067NA4F', 6, '2026-01-28 20:19:33', '2026-01-28 20:19:33'),
(695, NULL, NULL, 15, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 187, 1.000, NULL, NULL, 'Penjualan: TRX-5X4EVZS756', 6, '2026-01-28 20:20:03', '2026-01-28 20:20:03'),
(696, NULL, NULL, 15, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 188, 2.000, NULL, NULL, 'Penjualan: TRX-3QFK67R3OL', 6, '2026-01-28 20:22:29', '2026-01-28 20:22:29'),
(697, NULL, NULL, 176, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 189, 0.895, NULL, NULL, 'Penjualan: TRX-6PR0G444R4', 6, '2026-01-28 20:23:51', '2026-01-28 20:23:51'),
(698, NULL, NULL, 85, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 190, 0.630, NULL, NULL, 'Penjualan: TRX-36N4W2UL55', 6, '2026-01-28 20:28:45', '2026-01-28 20:28:45'),
(699, NULL, NULL, 178, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 190, 0.100, NULL, NULL, 'Penjualan: TRX-36N4W2UL55', 6, '2026-01-28 20:28:45', '2026-01-28 20:28:45'),
(700, NULL, NULL, 179, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 190, 0.245, NULL, NULL, 'Penjualan: TRX-36N4W2UL55', 6, '2026-01-28 20:28:45', '2026-01-28 20:28:45'),
(701, NULL, NULL, 182, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 190, 0.315, NULL, NULL, 'Penjualan: TRX-36N4W2UL55', 6, '2026-01-28 20:28:45', '2026-01-28 20:28:45'),
(702, NULL, NULL, 52, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 191, 1.000, NULL, NULL, 'Penjualan: TRX-LY2969YUZJ', 6, '2026-01-28 20:34:51', '2026-01-28 20:34:51'),
(703, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 192, 1.000, NULL, NULL, 'Penjualan: TRX-202FJ7G2YN', 6, '2026-01-28 20:42:11', '2026-01-28 20:42:11'),
(704, NULL, NULL, 124, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 192, 2.000, NULL, NULL, 'Penjualan: TRX-202FJ7G2YN', 6, '2026-01-28 20:42:11', '2026-01-28 20:42:11'),
(705, NULL, NULL, 82, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 193, 0.405, NULL, NULL, 'Penjualan: TRX-R978G2C3U8', 6, '2026-01-28 20:49:06', '2026-01-28 20:49:06'),
(706, NULL, NULL, 84, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 193, 0.445, NULL, NULL, 'Penjualan: TRX-R978G2C3U8', 6, '2026-01-28 20:49:06', '2026-01-28 20:49:06'),
(707, NULL, NULL, 89, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 193, 0.465, NULL, NULL, 'Penjualan: TRX-R978G2C3U8', 6, '2026-01-28 20:49:06', '2026-01-28 20:49:06'),
(708, NULL, NULL, 18, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 194, 2.000, NULL, NULL, 'Penjualan: TRX-7LZCJO9EHC', 6, '2026-01-28 20:51:24', '2026-01-28 20:51:24'),
(709, NULL, NULL, 27, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 194, 1.000, NULL, NULL, 'Penjualan: TRX-7LZCJO9EHC', 6, '2026-01-28 20:51:24', '2026-01-28 20:51:24'),
(710, NULL, NULL, 122, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 194, 0.525, NULL, NULL, 'Penjualan: TRX-7LZCJO9EHC', 6, '2026-01-28 20:51:24', '2026-01-28 20:51:24'),
(711, NULL, NULL, 160, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 3.000, 0.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-28 20:57:55', '2026-01-28 20:57:55'),
(712, NULL, NULL, 161, 'supplier', NULL, NULL, NULL, NULL, NULL, 'warehouse', 1, 3.000, 0.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-28 20:58:07', '2026-01-28 20:58:07'),
(713, NULL, NULL, 160, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 3.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-28 21:00:19', '2026-01-28 21:00:19'),
(714, NULL, NULL, 161, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 3.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-28 21:00:30', '2026-01-28 21:00:30'),
(715, NULL, NULL, 161, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 195, 1.000, NULL, NULL, 'Penjualan: TRX-709T7J4YOT', 6, '2026-01-28 21:00:56', '2026-01-28 21:00:56'),
(716, NULL, NULL, 164, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 196, 1.000, NULL, NULL, 'Penjualan: TRX-MP7VD33O9F', 6, '2026-01-28 21:04:12', '2026-01-28 21:04:12'),
(717, NULL, NULL, 69, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 197, 0.170, NULL, NULL, 'Penjualan: TRX-I05AH2IV6R', 6, '2026-01-28 21:06:10', '2026-01-28 21:06:10'),
(718, NULL, NULL, 70, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 197, 0.330, NULL, NULL, 'Penjualan: TRX-I05AH2IV6R', 6, '2026-01-28 21:06:10', '2026-01-28 21:06:10'),
(719, NULL, NULL, 58, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 198, 0.530, NULL, NULL, 'Penjualan: TRX-U71Y0C4K5F', 6, '2026-01-28 21:17:10', '2026-01-28 21:17:10'),
(720, NULL, NULL, 64, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 198, 1.000, NULL, NULL, 'Penjualan: TRX-U71Y0C4K5F', 6, '2026-01-28 21:17:10', '2026-01-28 21:17:10'),
(721, NULL, NULL, 88, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 198, 0.545, NULL, NULL, 'Penjualan: TRX-U71Y0C4K5F', 6, '2026-01-28 21:17:10', '2026-01-28 21:17:10'),
(722, NULL, NULL, 166, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 198, 1.000, NULL, NULL, 'Penjualan: TRX-U71Y0C4K5F', 6, '2026-01-28 21:17:10', '2026-01-28 21:17:10'),
(723, NULL, NULL, 182, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 198, 0.875, NULL, NULL, 'Penjualan: TRX-U71Y0C4K5F', 6, '2026-01-28 21:17:10', '2026-01-28 21:17:10'),
(724, NULL, NULL, 55, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 199, 1.000, NULL, NULL, 'Penjualan: TRX-A2519JDFZR', 6, '2026-01-28 21:18:40', '2026-01-28 21:18:40'),
(725, NULL, NULL, 17, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 200, 1.000, NULL, NULL, 'Penjualan: TRX-CXBF6CZY5C', 6, '2026-01-28 21:30:07', '2026-01-28 21:30:07'),
(726, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 200, 1.000, NULL, NULL, 'Penjualan: TRX-CXBF6CZY5C', 6, '2026-01-28 21:30:07', '2026-01-28 21:30:07'),
(727, NULL, NULL, 84, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 200, 1.245, NULL, NULL, 'Penjualan: TRX-CXBF6CZY5C', 6, '2026-01-28 21:30:07', '2026-01-28 21:30:07'),
(728, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 200, 1.040, NULL, NULL, 'Penjualan: TRX-CXBF6CZY5C', 6, '2026-01-28 21:30:07', '2026-01-28 21:30:07'),
(729, NULL, NULL, 8, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 201, 0.175, NULL, NULL, 'Penjualan: TRX-IF95QKQNG2', 6, '2026-01-28 21:31:26', '2026-01-28 21:31:26'),
(730, NULL, NULL, 153, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 3.000, 0.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-28 21:34:03', '2026-01-28 21:34:03'),
(731, NULL, NULL, 153, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 3.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-28 21:34:11', '2026-01-28 21:34:11'),
(732, NULL, NULL, 133, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 202, 1.000, NULL, NULL, 'Penjualan: TRX-K3G8M12KOY', 6, '2026-01-28 22:04:11', '2026-01-28 22:04:11'),
(733, NULL, NULL, 160, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 202, 1.000, NULL, NULL, 'Penjualan: TRX-K3G8M12KOY', 6, '2026-01-28 22:04:11', '2026-01-28 22:04:11'),
(734, NULL, NULL, 72, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 203, 2.000, NULL, NULL, 'Penjualan: TRX-B84NP4SZO5', 6, '2026-01-28 22:07:29', '2026-01-28 22:07:29'),
(735, NULL, NULL, 192, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 8.800, 68000.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-28 22:31:32', '2026-01-28 22:31:32'),
(736, NULL, NULL, 127, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 204, 1.035, NULL, NULL, 'Penjualan: TRX-M2285G8O4Y', 3, '2026-01-29 08:59:19', '2026-01-29 08:59:19'),
(737, NULL, NULL, 4, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 205, 2.200, NULL, NULL, 'Penjualan: TRX-2PUG74187J', 3, '2026-01-29 09:16:10', '2026-01-29 09:16:10'),
(738, NULL, NULL, 127, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 205, 1.015, NULL, NULL, 'Penjualan: TRX-2PUG74187J', 3, '2026-01-29 09:16:10', '2026-01-29 09:16:10'),
(739, NULL, NULL, 52, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 206, 2.000, NULL, NULL, 'Penjualan: TRX-1DBG00K824', 3, '2026-01-29 09:48:49', '2026-01-29 09:48:49'),
(740, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 206, 1.000, NULL, NULL, 'Penjualan: TRX-1DBG00K824', 3, '2026-01-29 09:48:49', '2026-01-29 09:48:49'),
(741, NULL, NULL, 23, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 207, 0.215, NULL, NULL, 'Penjualan: TRX-SI8LB10878', 3, '2026-01-29 10:52:52', '2026-01-29 10:52:52'),
(742, NULL, NULL, 27, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 207, 1.000, NULL, NULL, 'Penjualan: TRX-SI8LB10878', 3, '2026-01-29 10:52:52', '2026-01-29 10:52:52'),
(743, NULL, NULL, 29, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 207, 1.000, NULL, NULL, 'Penjualan: TRX-SI8LB10878', 3, '2026-01-29 10:52:52', '2026-01-29 10:52:52'),
(744, NULL, NULL, 122, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 207, 0.420, NULL, NULL, 'Penjualan: TRX-SI8LB10878', 3, '2026-01-29 10:52:52', '2026-01-29 10:52:52'),
(745, NULL, NULL, 127, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 207, 0.140, NULL, NULL, 'Penjualan: TRX-SI8LB10878', 3, '2026-01-29 10:52:52', '2026-01-29 10:52:52'),
(746, NULL, NULL, 180, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 207, 0.550, NULL, NULL, 'Penjualan: TRX-SI8LB10878', 3, '2026-01-29 10:52:52', '2026-01-29 10:52:52'),
(747, NULL, NULL, 85, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 208, 1.050, NULL, NULL, 'Penjualan: TRX-95D65J38SE', 3, '2026-01-29 11:11:20', '2026-01-29 11:11:20'),
(748, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 208, 2.000, NULL, NULL, 'Penjualan: TRX-95D65J38SE', 3, '2026-01-29 11:11:20', '2026-01-29 11:11:20'),
(749, NULL, NULL, 42, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 209, 1.105, NULL, NULL, 'Penjualan: TRX-RWG90DI2QQ', 3, '2026-01-29 11:35:43', '2026-01-29 11:35:43'),
(750, NULL, NULL, 52, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 209, 4.000, NULL, NULL, 'Penjualan: TRX-RWG90DI2QQ', 3, '2026-01-29 11:35:43', '2026-01-29 11:35:43'),
(751, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 209, 1.000, NULL, NULL, 'Penjualan: TRX-RWG90DI2QQ', 3, '2026-01-29 11:35:43', '2026-01-29 11:35:43'),
(752, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 210, 1.000, NULL, NULL, 'Penjualan: TRX-W32HITV0M4', 3, '2026-01-29 11:41:59', '2026-01-29 11:41:59'),
(753, NULL, NULL, 84, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 210, 0.275, NULL, NULL, 'Penjualan: TRX-W32HITV0M4', 3, '2026-01-29 11:41:59', '2026-01-29 11:41:59'),
(754, NULL, NULL, 89, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 210, 0.495, NULL, NULL, 'Penjualan: TRX-W32HITV0M4', 3, '2026-01-29 11:41:59', '2026-01-29 11:41:59'),
(755, NULL, NULL, 50, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 211, 1.000, NULL, NULL, 'Penjualan: TRX-5N69UWCAJK', 3, '2026-01-29 12:05:06', '2026-01-29 12:05:06'),
(756, NULL, NULL, 85, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 211, 0.530, NULL, NULL, 'Penjualan: TRX-5N69UWCAJK', 3, '2026-01-29 12:05:06', '2026-01-29 12:05:06'),
(757, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 212, 1.000, NULL, NULL, 'Penjualan: TRX-04MOLMIHKB', 3, '2026-01-29 12:08:03', '2026-01-29 12:08:03'),
(758, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 212, 0.710, NULL, NULL, 'Penjualan: TRX-04MOLMIHKB', 3, '2026-01-29 12:08:03', '2026-01-29 12:08:03'),
(759, NULL, NULL, 171, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 212, 1.000, NULL, NULL, 'Penjualan: TRX-04MOLMIHKB', 3, '2026-01-29 12:08:03', '2026-01-29 12:08:03'),
(760, NULL, NULL, 124, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 213, 1.000, NULL, NULL, 'Penjualan: TRX-9W6064DZUT', 3, '2026-01-29 12:09:17', '2026-01-29 12:09:17'),
(761, NULL, NULL, 7, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 214, 0.765, NULL, NULL, 'Penjualan: TRX-HF5313G2X3', 3, '2026-01-29 12:11:57', '2026-01-29 12:11:57'),
(762, NULL, NULL, 23, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 214, 1.020, NULL, NULL, 'Penjualan: TRX-HF5313G2X3', 3, '2026-01-29 12:11:57', '2026-01-29 12:11:57'),
(763, NULL, NULL, 84, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 214, 0.465, NULL, NULL, 'Penjualan: TRX-HF5313G2X3', 3, '2026-01-29 12:11:57', '2026-01-29 12:11:57'),
(764, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 214, 0.435, NULL, NULL, 'Penjualan: TRX-HF5313G2X3', 3, '2026-01-29 12:11:57', '2026-01-29 12:11:57'),
(765, NULL, NULL, 15, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 215, 1.000, NULL, NULL, 'Penjualan: TRX-KN3067JX7V', 3, '2026-01-29 12:13:22', '2026-01-29 12:13:22'),
(766, NULL, NULL, 16, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 215, 2.000, NULL, NULL, 'Penjualan: TRX-KN3067JX7V', 3, '2026-01-29 12:13:22', '2026-01-29 12:13:22'),
(767, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 215, 0.525, NULL, NULL, 'Penjualan: TRX-KN3067JX7V', 3, '2026-01-29 12:13:22', '2026-01-29 12:13:22'),
(768, NULL, NULL, 50, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 216, 1.000, NULL, NULL, 'Penjualan: TRX-000K35D854', 3, '2026-01-29 12:15:35', '2026-01-29 12:15:35'),
(769, NULL, NULL, 69, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 216, 0.180, NULL, NULL, 'Penjualan: TRX-000K35D854', 3, '2026-01-29 12:15:35', '2026-01-29 12:15:35'),
(770, NULL, NULL, 175, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 216, 1.000, NULL, NULL, 'Penjualan: TRX-000K35D854', 3, '2026-01-29 12:15:35', '2026-01-29 12:15:35'),
(771, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 217, 1.000, NULL, NULL, 'Penjualan: TRX-567O0I2AU2', 3, '2026-01-29 12:17:52', '2026-01-29 12:17:52'),
(772, NULL, NULL, 81, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 217, 0.175, NULL, NULL, 'Penjualan: TRX-567O0I2AU2', 3, '2026-01-29 12:17:52', '2026-01-29 12:17:52'),
(773, NULL, NULL, 90, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 217, 0.220, NULL, NULL, 'Penjualan: TRX-567O0I2AU2', 3, '2026-01-29 12:17:52', '2026-01-29 12:17:52'),
(774, NULL, NULL, 124, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 217, 1.000, NULL, NULL, 'Penjualan: TRX-567O0I2AU2', 3, '2026-01-29 12:17:52', '2026-01-29 12:17:52'),
(775, NULL, NULL, 40, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 218, 1.000, NULL, NULL, 'Penjualan: TRX-0D8AH6ZZI5', 3, '2026-01-29 12:47:39', '2026-01-29 12:47:39'),
(776, NULL, NULL, 103, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 218, 0.670, NULL, NULL, 'Penjualan: TRX-0D8AH6ZZI5', 3, '2026-01-29 12:47:39', '2026-01-29 12:47:39'),
(777, NULL, NULL, 193, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 8.000, 672000.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-29 12:54:26', '2026-01-29 12:54:26'),
(778, NULL, NULL, 193, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 8.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-29 12:54:36', '2026-01-29 12:54:36'),
(779, NULL, NULL, 194, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 18.000, 295000.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-29 12:59:15', '2026-01-29 12:59:15'),
(780, NULL, NULL, 194, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 18.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-29 12:59:22', '2026-01-29 12:59:22'),
(781, NULL, NULL, 195, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 8.000, 224000.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-29 13:02:16', '2026-01-29 13:02:16'),
(782, NULL, NULL, 195, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 8.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-29 13:02:27', '2026-01-29 13:02:27'),
(783, NULL, NULL, 196, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 10.200, 275400.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-29 13:04:42', '2026-01-29 13:04:42'),
(784, NULL, NULL, 196, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 10.200, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-29 13:04:50', '2026-01-29 13:04:50'),
(785, NULL, NULL, 170, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 14.500, 297250.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-29 13:05:45', '2026-01-29 13:05:45'),
(786, NULL, NULL, 170, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 14.500, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-29 13:05:54', '2026-01-29 13:05:54'),
(787, NULL, NULL, 46, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 10.000, 270000.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-29 13:08:56', '2026-01-29 13:08:56'),
(788, NULL, NULL, 46, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 10.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-29 13:09:08', '2026-01-29 13:09:08'),
(789, NULL, NULL, 197, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 4.200, 264600.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-29 13:12:33', '2026-01-29 13:12:33'),
(790, NULL, NULL, 197, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 4.200, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-29 13:12:46', '2026-01-29 13:12:46'),
(791, NULL, NULL, 9, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 4.000, 0.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-29 13:25:10', '2026-01-29 13:25:10'),
(792, NULL, NULL, 9, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 4.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-29 13:25:21', '2026-01-29 13:25:21'),
(793, NULL, NULL, 198, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 6.800, 238000.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-29 13:28:59', '2026-01-29 13:30:07'),
(794, NULL, NULL, 198, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 6.800, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-29 13:29:10', '2026-01-29 13:29:10'),
(795, NULL, NULL, 67, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 20.000, 400000.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-29 13:32:56', '2026-01-29 13:32:56'),
(796, NULL, NULL, 67, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 20.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-29 13:33:08', '2026-01-29 13:33:08'),
(797, NULL, NULL, 103, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 18.000, 558000.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-29 13:33:56', '2026-01-29 13:33:56'),
(798, NULL, NULL, 103, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 18.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-29 13:34:08', '2026-01-29 13:34:08'),
(799, NULL, NULL, 105, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 22.000, 0.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-29 13:37:41', '2026-01-29 13:37:41'),
(800, NULL, NULL, 105, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 22.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-29 13:37:49', '2026-01-29 13:37:49'),
(803, NULL, NULL, 23, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 220, 0.505, NULL, NULL, 'Penjualan: TRX-93M8275G55', 3, '2026-01-29 13:42:32', '2026-01-29 13:42:32'),
(804, NULL, NULL, 27, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 220, 1.000, NULL, NULL, 'Penjualan: TRX-93M8275G55', 3, '2026-01-29 13:42:32', '2026-01-29 13:42:32'),
(805, NULL, NULL, 26, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 221, 1.000, NULL, NULL, 'Penjualan: TRX-DZ4Y0AYAL5', 3, '2026-01-29 13:44:12', '2026-01-29 13:44:12'),
(806, NULL, NULL, 197, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 221, 0.520, NULL, NULL, 'Penjualan: TRX-DZ4Y0AYAL5', 3, '2026-01-29 13:44:12', '2026-01-29 13:44:12'),
(807, NULL, NULL, 20, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 222, 1.000, NULL, NULL, 'Penjualan: TRX-VFWS6V65FG', 3, '2026-01-29 13:45:44', '2026-01-29 13:45:44'),
(808, NULL, NULL, 124, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 222, 1.000, NULL, NULL, 'Penjualan: TRX-VFWS6V65FG', 3, '2026-01-29 13:45:44', '2026-01-29 13:45:44'),
(809, NULL, NULL, 170, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 222, 0.905, NULL, NULL, 'Penjualan: TRX-VFWS6V65FG', 3, '2026-01-29 13:45:44', '2026-01-29 13:45:44'),
(810, NULL, NULL, 184, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 223, 1.000, NULL, NULL, 'Penjualan: TRX-77R6PN6YR9', 3, '2026-01-29 13:51:20', '2026-01-29 13:51:20'),
(811, NULL, NULL, 198, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 223, 0.218, NULL, NULL, 'Penjualan: TRX-77R6PN6YR9', 3, '2026-01-29 13:51:20', '2026-01-29 13:51:20'),
(812, NULL, NULL, 52, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 224, 1.000, NULL, NULL, 'Penjualan: TRX-RQ60IKVP0T', 3, '2026-01-29 13:54:27', '2026-01-29 13:54:27'),
(813, NULL, NULL, 61, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 224, 1.000, NULL, NULL, 'Penjualan: TRX-RQ60IKVP0T', 3, '2026-01-29 13:54:27', '2026-01-29 13:54:27'),
(814, NULL, NULL, 80, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 224, 1.000, NULL, NULL, 'Penjualan: TRX-RQ60IKVP0T', 3, '2026-01-29 13:54:27', '2026-01-29 13:54:27'),
(815, NULL, NULL, 126, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 225, 0.624, NULL, NULL, 'Penjualan: TRX-HOW72VF3JG', 3, '2026-01-29 13:55:38', '2026-01-29 13:55:38'),
(816, NULL, NULL, 193, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 225, 1.000, NULL, NULL, 'Penjualan: TRX-HOW72VF3JG', 3, '2026-01-29 13:55:38', '2026-01-29 13:55:38'),
(817, NULL, NULL, 4, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 226, 0.250, NULL, NULL, 'Penjualan: TRX-1O0326E0P6', 3, '2026-01-29 14:21:50', '2026-01-29 14:21:50'),
(818, NULL, NULL, 15, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 226, 1.000, NULL, NULL, 'Penjualan: TRX-1O0326E0P6', 3, '2026-01-29 14:21:50', '2026-01-29 14:21:50'),
(819, NULL, NULL, 47, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 226, 1.000, NULL, NULL, 'Penjualan: TRX-1O0326E0P6', 3, '2026-01-29 14:21:50', '2026-01-29 14:21:50'),
(820, NULL, NULL, 49, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 226, 0.110, NULL, NULL, 'Penjualan: TRX-1O0326E0P6', 3, '2026-01-29 14:21:50', '2026-01-29 14:21:50'),
(821, NULL, NULL, 52, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 226, 1.000, NULL, NULL, 'Penjualan: TRX-1O0326E0P6', 3, '2026-01-29 14:21:50', '2026-01-29 14:21:50'),
(822, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 227, 1.000, NULL, NULL, 'Penjualan: TRX-Z2S3HOS0S7', 3, '2026-01-29 15:00:39', '2026-01-29 15:00:39'),
(823, NULL, NULL, 81, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 227, 0.905, NULL, NULL, 'Penjualan: TRX-Z2S3HOS0S7', 3, '2026-01-29 15:00:39', '2026-01-29 15:00:39'),
(824, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 227, 0.685, NULL, NULL, 'Penjualan: TRX-Z2S3HOS0S7', 3, '2026-01-29 15:00:39', '2026-01-29 15:00:39'),
(825, NULL, NULL, 28, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 228, 1.000, NULL, NULL, 'Penjualan: TRX-A4542T5IE0', 3, '2026-01-29 15:04:50', '2026-01-29 15:04:50'),
(826, NULL, NULL, 51, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 228, 2.000, NULL, NULL, 'Penjualan: TRX-A4542T5IE0', 3, '2026-01-29 15:04:50', '2026-01-29 15:04:50'),
(827, NULL, NULL, 195, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 228, 0.960, NULL, NULL, 'Penjualan: TRX-A4542T5IE0', 3, '2026-01-29 15:04:50', '2026-01-29 15:04:50'),
(828, NULL, NULL, 4, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 229, 0.350, NULL, NULL, 'Penjualan: TRX-JS2DA259H5', 3, '2026-01-29 15:13:18', '2026-01-29 15:13:18'),
(829, NULL, NULL, 69, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 229, 0.170, NULL, NULL, 'Penjualan: TRX-JS2DA259H5', 3, '2026-01-29 15:13:18', '2026-01-29 15:13:18'),
(830, NULL, NULL, 72, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 229, 1.000, NULL, NULL, 'Penjualan: TRX-JS2DA259H5', 3, '2026-01-29 15:13:18', '2026-01-29 15:13:18'),
(831, NULL, NULL, 107, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 229, 0.105, NULL, NULL, 'Penjualan: TRX-JS2DA259H5', 3, '2026-01-29 15:13:18', '2026-01-29 15:13:18'),
(832, NULL, NULL, 170, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 229, 0.720, NULL, NULL, 'Penjualan: TRX-JS2DA259H5', 3, '2026-01-29 15:13:18', '2026-01-29 15:13:18'),
(833, NULL, NULL, 193, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 229, 1.000, NULL, NULL, 'Penjualan: TRX-JS2DA259H5', 3, '2026-01-29 15:13:18', '2026-01-29 15:13:18'),
(834, NULL, NULL, 14, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 230, 1.000, NULL, NULL, 'Penjualan: TRX-5GR3W35V73', 3, '2026-01-29 15:14:46', '2026-01-29 15:14:46'),
(835, NULL, NULL, 18, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 230, 1.000, NULL, NULL, 'Penjualan: TRX-5GR3W35V73', 3, '2026-01-29 15:14:46', '2026-01-29 15:14:46'),
(836, NULL, NULL, 26, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 230, 1.000, NULL, NULL, 'Penjualan: TRX-5GR3W35V73', 3, '2026-01-29 15:14:46', '2026-01-29 15:14:46'),
(837, NULL, NULL, 170, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 231, 1.470, NULL, NULL, 'Penjualan: TRX-6NXH47RRLN', 3, '2026-01-29 15:19:57', '2026-01-29 15:19:57'),
(838, NULL, NULL, 199, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 1.000, 40000.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-29 15:39:05', '2026-01-29 15:39:05'),
(839, NULL, NULL, 199, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 1.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-29 15:39:14', '2026-01-29 15:39:14'),
(840, NULL, NULL, 61, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 232, 1.000, NULL, NULL, 'Penjualan: TRX-9KWTYDO52X', 3, '2026-01-29 16:08:48', '2026-01-29 16:08:48'),
(841, NULL, NULL, 82, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 232, 0.655, NULL, NULL, 'Penjualan: TRX-9KWTYDO52X', 3, '2026-01-29 16:08:48', '2026-01-29 16:08:48'),
(842, NULL, NULL, 83, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 232, 0.725, NULL, NULL, 'Penjualan: TRX-9KWTYDO52X', 3, '2026-01-29 16:08:48', '2026-01-29 16:08:48'),
(843, NULL, NULL, 85, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 232, 0.535, NULL, NULL, 'Penjualan: TRX-9KWTYDO52X', 3, '2026-01-29 16:08:48', '2026-01-29 16:08:48'),
(844, NULL, NULL, 23, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 233, 0.545, NULL, NULL, 'Penjualan: TRX-9Z31S4DSFB', 3, '2026-01-29 16:15:57', '2026-01-29 16:15:57'),
(845, NULL, NULL, 85, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 233, 0.515, NULL, NULL, 'Penjualan: TRX-9Z31S4DSFB', 3, '2026-01-29 16:15:57', '2026-01-29 16:15:57'),
(846, NULL, NULL, 105, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 233, 1.000, NULL, NULL, 'Penjualan: TRX-9Z31S4DSFB', 3, '2026-01-29 16:15:57', '2026-01-29 16:15:57'),
(847, NULL, NULL, 126, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 233, 0.665, NULL, NULL, 'Penjualan: TRX-9Z31S4DSFB', 3, '2026-01-29 16:15:57', '2026-01-29 16:15:57'),
(848, NULL, NULL, 23, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 234, 0.500, NULL, NULL, 'Penjualan: TRX-NT2WN3X98Q', 3, '2026-01-29 16:26:29', '2026-01-29 16:26:29');
INSERT INTO `stock_movements` (`id`, `receipt_id`, `purchase_order_id`, `product_id`, `from_type`, `from_id`, `supplier_id`, `invoice_number`, `batch_number`, `expiry_date`, `to_type`, `to_id`, `quantity`, `purchase_price`, `loss_amount`, `note`, `user_id`, `created_at`, `updated_at`) VALUES
(849, NULL, NULL, 29, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 234, 1.000, NULL, NULL, 'Penjualan: TRX-NT2WN3X98Q', 3, '2026-01-29 16:26:30', '2026-01-29 16:26:30'),
(850, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 234, 1.000, NULL, NULL, 'Penjualan: TRX-NT2WN3X98Q', 3, '2026-01-29 16:26:30', '2026-01-29 16:26:30'),
(851, NULL, NULL, 106, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 235, 1.000, NULL, NULL, 'Penjualan: TRX-A7V3MNMMMN', 3, '2026-01-29 16:30:17', '2026-01-29 16:30:17'),
(852, NULL, NULL, 170, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 235, 0.815, NULL, NULL, 'Penjualan: TRX-A7V3MNMMMN', 3, '2026-01-29 16:30:17', '2026-01-29 16:30:17'),
(853, NULL, NULL, 81, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 236, 0.725, NULL, NULL, 'Penjualan: TRX-D3MF3W5ZBT', 3, '2026-01-29 16:45:51', '2026-01-29 16:45:51'),
(854, NULL, NULL, 84, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 236, 0.780, NULL, NULL, 'Penjualan: TRX-D3MF3W5ZBT', 3, '2026-01-29 16:45:51', '2026-01-29 16:45:51'),
(855, NULL, NULL, 87, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 236, 0.635, NULL, NULL, 'Penjualan: TRX-D3MF3W5ZBT', 3, '2026-01-29 16:45:51', '2026-01-29 16:45:51'),
(856, NULL, NULL, 103, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 236, 1.200, NULL, NULL, 'Penjualan: TRX-D3MF3W5ZBT', 3, '2026-01-29 16:45:51', '2026-01-29 16:45:51'),
(857, NULL, NULL, 182, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 237, 0.565, NULL, NULL, 'Penjualan: TRX-Y6WK4129B2', 3, '2026-01-29 16:47:14', '2026-01-29 16:47:14'),
(858, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 238, 1.240, NULL, NULL, 'Penjualan: TRX-H7N3399VK3', 3, '2026-01-29 16:49:40', '2026-01-29 16:49:40'),
(859, NULL, NULL, 42, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 239, 0.500, NULL, NULL, 'Penjualan: TRX-4J5G978RUW', 3, '2026-01-29 17:13:30', '2026-01-29 17:13:30'),
(860, NULL, NULL, 9, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 240, 0.210, NULL, NULL, 'Penjualan: TRX-CHNO65788E', 6, '2026-01-29 17:22:36', '2026-01-29 17:22:36'),
(861, NULL, NULL, 18, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 240, 2.000, NULL, NULL, 'Penjualan: TRX-CHNO65788E', 6, '2026-01-29 17:22:36', '2026-01-29 17:22:36'),
(862, NULL, NULL, 102, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 240, 0.205, NULL, NULL, 'Penjualan: TRX-CHNO65788E', 6, '2026-01-29 17:22:36', '2026-01-29 17:22:36'),
(863, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 241, 1.000, NULL, NULL, 'Penjualan: TRX-606BN0586C', 6, '2026-01-29 17:29:34', '2026-01-29 17:29:34'),
(864, NULL, NULL, 164, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 242, 1.000, NULL, NULL, 'Penjualan: TRX-99EFD6QW23', 6, '2026-01-29 17:30:00', '2026-01-29 17:30:00'),
(865, NULL, NULL, 163, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 5.000, 5000.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-29 17:31:23', '2026-01-29 17:31:23'),
(866, NULL, NULL, 163, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 5.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-29 17:31:32', '2026-01-29 17:31:32'),
(867, NULL, NULL, 163, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 243, 1.000, NULL, NULL, 'Penjualan: TRX-0WY06X8I5P', 6, '2026-01-29 17:33:03', '2026-01-29 17:33:03'),
(868, NULL, NULL, 202, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 10.000, 0.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-29 17:33:28', '2026-01-29 17:33:28'),
(869, NULL, NULL, 202, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 10.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-29 17:33:36', '2026-01-29 17:33:36'),
(870, NULL, NULL, 202, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 244, 1.000, NULL, NULL, 'Penjualan: TRX-27KR53N35M', 6, '2026-01-29 17:34:29', '2026-01-29 17:34:29'),
(871, NULL, NULL, 164, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 245, 1.000, NULL, NULL, 'Penjualan: TRX-36FHMT8S04', 6, '2026-01-29 17:41:19', '2026-01-29 17:41:19'),
(872, NULL, NULL, 18, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 246, 2.000, NULL, NULL, 'Penjualan: TRX-4536B78Z6C', 6, '2026-01-29 17:51:13', '2026-01-29 17:51:13'),
(873, NULL, NULL, 40, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 246, 1.000, NULL, NULL, 'Penjualan: TRX-4536B78Z6C', 6, '2026-01-29 17:51:13', '2026-01-29 17:51:13'),
(874, NULL, NULL, 47, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 246, 1.000, NULL, NULL, 'Penjualan: TRX-4536B78Z6C', 6, '2026-01-29 17:51:13', '2026-01-29 17:51:13'),
(875, NULL, NULL, 82, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 246, 0.455, NULL, NULL, 'Penjualan: TRX-4536B78Z6C', 6, '2026-01-29 17:51:13', '2026-01-29 17:51:13'),
(876, NULL, NULL, 105, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 246, 1.000, NULL, NULL, 'Penjualan: TRX-4536B78Z6C', 6, '2026-01-29 17:51:13', '2026-01-29 17:51:13'),
(877, NULL, NULL, 170, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 246, 0.735, NULL, NULL, 'Penjualan: TRX-4536B78Z6C', 6, '2026-01-29 17:51:13', '2026-01-29 17:51:13'),
(878, NULL, NULL, 88, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 247, 0.255, NULL, NULL, 'Penjualan: TRX-T2675A1OG6', 6, '2026-01-29 17:53:22', '2026-01-29 17:53:22'),
(879, NULL, NULL, 89, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 247, 0.220, NULL, NULL, 'Penjualan: TRX-T2675A1OG6', 6, '2026-01-29 17:53:22', '2026-01-29 17:53:22'),
(880, NULL, NULL, 6, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 248, 0.380, NULL, NULL, 'Penjualan: TRX-M6P88YIZ40', 6, '2026-01-29 17:54:36', '2026-01-29 17:54:36'),
(881, NULL, NULL, 81, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 249, 0.510, NULL, NULL, 'Penjualan: TRX-89MG519U47', 6, '2026-01-29 18:13:52', '2026-01-29 18:13:52'),
(882, NULL, NULL, 84, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 249, 0.470, NULL, NULL, 'Penjualan: TRX-89MG519U47', 6, '2026-01-29 18:13:52', '2026-01-29 18:13:52'),
(883, NULL, NULL, 168, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 249, 0.355, NULL, NULL, 'Penjualan: TRX-89MG519U47', 6, '2026-01-29 18:13:52', '2026-01-29 18:13:52'),
(884, NULL, NULL, 124, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 250, 6.000, NULL, NULL, 'Penjualan: TRX-M312I874A2', 6, '2026-01-29 18:21:27', '2026-01-29 18:21:27'),
(885, NULL, NULL, 56, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 251, 1.000, NULL, NULL, 'Penjualan: TRX-M3TFG5Y76Z', 6, '2026-01-29 18:22:56', '2026-01-29 18:22:56'),
(886, NULL, NULL, 84, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 251, 0.565, NULL, NULL, 'Penjualan: TRX-M3TFG5Y76Z', 6, '2026-01-29 18:22:56', '2026-01-29 18:22:56'),
(887, NULL, NULL, 106, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 252, 1.000, NULL, NULL, 'Penjualan: TRX-4Y46AI2UP4', 6, '2026-01-29 18:31:18', '2026-01-29 18:31:18'),
(888, NULL, NULL, 108, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 3.000, 0.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-29 18:33:30', '2026-01-29 18:33:30'),
(889, NULL, NULL, 108, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 3.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-29 18:33:43', '2026-01-29 18:33:43'),
(890, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 253, 1.000, NULL, NULL, 'Penjualan: TRX-8U03I3T6T6', 6, '2026-01-29 18:42:20', '2026-01-29 18:42:20'),
(891, NULL, NULL, 200, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 10.000, 0.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-29 18:44:09', '2026-01-29 18:44:09'),
(892, NULL, NULL, 200, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 10.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-29 18:44:19', '2026-01-29 18:44:19'),
(893, NULL, NULL, 200, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 254, 1.000, NULL, NULL, 'Penjualan: TRX-6RS5YC17DH', 6, '2026-01-29 18:44:37', '2026-01-29 18:44:37'),
(894, NULL, NULL, 27, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 255, 3.000, NULL, NULL, 'Penjualan: TRX-XMS92PPX7F', 6, '2026-01-29 18:52:27', '2026-01-29 18:52:27'),
(895, NULL, NULL, 87, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 255, 0.430, NULL, NULL, 'Penjualan: TRX-XMS92PPX7F', 6, '2026-01-29 18:52:27', '2026-01-29 18:52:27'),
(898, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 256, 1.000, NULL, NULL, 'Penjualan: TRX-P4HK329K1B', 6, '2026-01-29 19:12:17', '2026-01-29 19:12:17'),
(899, NULL, NULL, 104, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 256, 0.500, NULL, NULL, 'Penjualan: TRX-P4HK329K1B', 6, '2026-01-29 19:12:17', '2026-01-29 19:12:17'),
(900, NULL, NULL, 61, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 257, 1.000, NULL, NULL, 'Penjualan: TRX-11LB3B7DN4', 6, '2026-01-29 19:18:00', '2026-01-29 19:18:00'),
(901, NULL, NULL, 84, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 257, 0.535, NULL, NULL, 'Penjualan: TRX-11LB3B7DN4', 6, '2026-01-29 19:18:00', '2026-01-29 19:18:00'),
(902, NULL, NULL, 200, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 258, 1.000, NULL, NULL, 'Penjualan: TRX-499R73KJN8', 6, '2026-01-29 19:18:14', '2026-01-29 19:18:14'),
(903, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 259, 1.000, NULL, NULL, 'Penjualan: TRX-O1C3H5ECM4', 6, '2026-01-29 19:20:55', '2026-01-29 19:20:55'),
(904, NULL, NULL, 182, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 259, 0.250, NULL, NULL, 'Penjualan: TRX-O1C3H5ECM4', 6, '2026-01-29 19:20:55', '2026-01-29 19:20:55'),
(905, NULL, NULL, 8, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 260, 0.165, NULL, NULL, 'Penjualan: TRX-PU22834395', 6, '2026-01-29 19:27:07', '2026-01-29 19:27:07'),
(906, NULL, NULL, 72, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 260, 2.000, NULL, NULL, 'Penjualan: TRX-PU22834395', 6, '2026-01-29 19:27:07', '2026-01-29 19:27:07'),
(907, NULL, NULL, 75, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 260, 1.000, NULL, NULL, 'Penjualan: TRX-PU22834395', 6, '2026-01-29 19:27:07', '2026-01-29 19:27:07'),
(908, NULL, NULL, 193, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 260, 1.000, NULL, NULL, 'Penjualan: TRX-PU22834395', 6, '2026-01-29 19:27:07', '2026-01-29 19:27:07'),
(909, NULL, NULL, 18, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 261, 2.000, NULL, NULL, 'Penjualan: TRX-OIJG030DQW', 6, '2026-01-29 19:29:03', '2026-01-29 19:29:03'),
(910, NULL, NULL, 81, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 261, 0.530, NULL, NULL, 'Penjualan: TRX-OIJG030DQW', 6, '2026-01-29 19:29:03', '2026-01-29 19:29:03'),
(911, NULL, NULL, 84, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 261, 0.500, NULL, NULL, 'Penjualan: TRX-OIJG030DQW', 6, '2026-01-29 19:29:03', '2026-01-29 19:29:03'),
(912, NULL, NULL, 117, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 261, 1.000, NULL, NULL, 'Penjualan: TRX-OIJG030DQW', 6, '2026-01-29 19:29:03', '2026-01-29 19:29:03'),
(913, NULL, NULL, 200, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 262, 1.000, NULL, NULL, 'Penjualan: TRX-85YS8D6285', 6, '2026-01-29 19:29:25', '2026-01-29 19:29:25'),
(914, NULL, NULL, 47, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 263, 3.000, NULL, NULL, 'Penjualan: TRX-0XHY0WL1D6', 6, '2026-01-29 19:31:59', '2026-01-29 19:31:59'),
(915, NULL, NULL, 70, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 263, 0.355, NULL, NULL, 'Penjualan: TRX-0XHY0WL1D6', 6, '2026-01-29 19:31:59', '2026-01-29 19:31:59'),
(916, NULL, NULL, 74, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 263, 3.000, NULL, NULL, 'Penjualan: TRX-0XHY0WL1D6', 6, '2026-01-29 19:31:59', '2026-01-29 19:31:59'),
(917, NULL, NULL, 82, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 263, 0.610, NULL, NULL, 'Penjualan: TRX-0XHY0WL1D6', 6, '2026-01-29 19:31:59', '2026-01-29 19:31:59'),
(918, NULL, NULL, 50, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 264, 1.000, NULL, NULL, 'Penjualan: TRX-NN1PP32JOX', 6, '2026-01-29 20:21:22', '2026-01-29 20:21:22'),
(919, NULL, NULL, 2, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 265, 3.890, NULL, NULL, 'Penjualan: TRX-Y69ZQ7HT57', 6, '2026-01-29 21:02:53', '2026-01-29 21:02:53'),
(920, NULL, NULL, 82, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 265, 1.270, NULL, NULL, 'Penjualan: TRX-Y69ZQ7HT57', 6, '2026-01-29 21:02:53', '2026-01-29 21:02:53'),
(921, NULL, NULL, 52, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 266, 1.000, NULL, NULL, 'Penjualan: TRX-TZ3INRWY2E', 6, '2026-01-29 21:08:33', '2026-01-29 21:08:33'),
(922, NULL, NULL, 63, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 266, 0.505, NULL, NULL, 'Penjualan: TRX-TZ3INRWY2E', 6, '2026-01-29 21:08:33', '2026-01-29 21:08:33'),
(923, NULL, NULL, 66, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 266, 1.000, NULL, NULL, 'Penjualan: TRX-TZ3INRWY2E', 6, '2026-01-29 21:08:33', '2026-01-29 21:08:33'),
(924, NULL, NULL, 82, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 267, 0.470, NULL, NULL, 'Penjualan: TRX-68E3U2PSLX', 6, '2026-01-29 21:12:20', '2026-01-29 21:12:20'),
(925, NULL, NULL, 78, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 268, 0.330, NULL, NULL, 'Penjualan: TRX-5851D15BF4', 6, '2026-01-29 21:14:06', '2026-01-29 21:14:06'),
(926, NULL, NULL, 83, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 268, 0.730, NULL, NULL, 'Penjualan: TRX-5851D15BF4', 6, '2026-01-29 21:14:06', '2026-01-29 21:14:06'),
(927, NULL, NULL, 193, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 268, 1.000, NULL, NULL, 'Penjualan: TRX-5851D15BF4', 6, '2026-01-29 21:14:06', '2026-01-29 21:14:06'),
(928, NULL, NULL, 179, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 2.300, 0.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-29 21:16:00', '2026-01-29 21:16:00'),
(929, NULL, NULL, 179, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 2.300, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-29 21:16:08', '2026-01-29 21:16:08'),
(930, NULL, NULL, 193, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 269, 1.000, NULL, NULL, 'Penjualan: TRX-245P5AF30S', 6, '2026-01-29 21:53:41', '2026-01-29 21:53:41'),
(931, NULL, NULL, 35, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 270, 1.000, NULL, NULL, 'Penjualan: TRX-LFOTU973F7', 6, '2026-01-29 22:32:49', '2026-01-29 22:32:49'),
(932, NULL, NULL, 98, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 270, 1.000, NULL, NULL, 'Penjualan: TRX-LFOTU973F7', 6, '2026-01-29 22:32:49', '2026-01-29 22:32:49'),
(933, NULL, NULL, 204, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 8.000, 0.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-30 08:23:10', '2026-01-30 08:23:10'),
(934, NULL, NULL, 204, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 8.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-30 08:23:39', '2026-01-30 08:23:39'),
(935, NULL, NULL, 50, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 271, 1.000, NULL, NULL, 'Penjualan: TRX-159KJ81P28', 6, '2026-01-30 08:57:19', '2026-01-30 08:57:19'),
(936, NULL, NULL, 106, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 271, 1.000, NULL, NULL, 'Penjualan: TRX-159KJ81P28', 6, '2026-01-30 08:57:19', '2026-01-30 08:57:19'),
(937, NULL, NULL, 65, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 272, 1.000, NULL, NULL, 'Penjualan: TRX-TPK8AAJLA8', 6, '2026-01-30 09:31:39', '2026-01-30 09:31:39'),
(938, NULL, NULL, 83, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 273, 0.325, NULL, NULL, 'Penjualan: TRX-W349K344A8', 6, '2026-01-30 09:38:30', '2026-01-30 09:38:30'),
(939, NULL, NULL, 85, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 273, 0.355, NULL, NULL, 'Penjualan: TRX-W349K344A8', 6, '2026-01-30 09:38:30', '2026-01-30 09:38:30'),
(940, NULL, NULL, 66, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 274, 3.000, NULL, NULL, 'Penjualan: TRX-U6Q0VP51ZN', 6, '2026-01-30 10:15:34', '2026-01-30 10:15:34'),
(941, NULL, NULL, 87, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 274, 2.355, NULL, NULL, 'Penjualan: TRX-U6Q0VP51ZN', 6, '2026-01-30 10:15:34', '2026-01-30 10:15:34'),
(942, NULL, NULL, 124, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 275, 1.000, NULL, NULL, 'Penjualan: TRX-2CR7458323', 6, '2026-01-30 10:24:50', '2026-01-30 10:24:50'),
(943, NULL, NULL, 170, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 275, 0.465, NULL, NULL, 'Penjualan: TRX-2CR7458323', 6, '2026-01-30 10:24:50', '2026-01-30 10:24:50'),
(944, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 276, 1.000, NULL, NULL, 'Penjualan: TRX-50AK9W60IC', 6, '2026-01-30 10:44:07', '2026-01-30 10:44:07'),
(945, NULL, NULL, 106, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 276, 1.000, NULL, NULL, 'Penjualan: TRX-50AK9W60IC', 6, '2026-01-30 10:44:07', '2026-01-30 10:44:07'),
(946, NULL, NULL, 193, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 276, 1.000, NULL, NULL, 'Penjualan: TRX-50AK9W60IC', 6, '2026-01-30 10:44:07', '2026-01-30 10:44:07'),
(947, NULL, NULL, 23, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 277, 0.195, NULL, NULL, 'Penjualan: TRX-X050116WJ6', 6, '2026-01-30 11:32:40', '2026-01-30 11:32:40'),
(948, NULL, NULL, 66, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 277, 1.000, NULL, NULL, 'Penjualan: TRX-X050116WJ6', 6, '2026-01-30 11:32:40', '2026-01-30 11:32:40'),
(949, NULL, NULL, 104, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 277, 0.310, NULL, NULL, 'Penjualan: TRX-X050116WJ6', 6, '2026-01-30 11:32:40', '2026-01-30 11:32:40'),
(950, NULL, NULL, 124, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 277, 1.000, NULL, NULL, 'Penjualan: TRX-X050116WJ6', 6, '2026-01-30 11:32:40', '2026-01-30 11:32:40'),
(951, NULL, NULL, 171, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 277, 1.000, NULL, NULL, 'Penjualan: TRX-X050116WJ6', 6, '2026-01-30 11:32:40', '2026-01-30 11:32:40'),
(952, NULL, NULL, 188, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 277, 0.270, NULL, NULL, 'Penjualan: TRX-X050116WJ6', 6, '2026-01-30 11:32:40', '2026-01-30 11:32:40'),
(953, NULL, NULL, 52, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 278, 2.000, NULL, NULL, 'Penjualan: TRX-9629I44305', 6, '2026-01-30 11:34:51', '2026-01-30 11:34:51'),
(954, NULL, NULL, 73, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 278, 1.000, NULL, NULL, 'Penjualan: TRX-9629I44305', 6, '2026-01-30 11:34:51', '2026-01-30 11:34:51'),
(955, NULL, NULL, 5, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 279, 0.130, NULL, NULL, 'Penjualan: TRX-45IH314C2W', 6, '2026-01-30 11:37:37', '2026-01-30 11:37:37'),
(956, NULL, NULL, 103, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 279, 0.620, NULL, NULL, 'Penjualan: TRX-45IH314C2W', 6, '2026-01-30 11:37:37', '2026-01-30 11:37:37'),
(957, NULL, NULL, 180, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 279, 0.275, NULL, NULL, 'Penjualan: TRX-45IH314C2W', 6, '2026-01-30 11:37:37', '2026-01-30 11:37:37'),
(958, NULL, NULL, 205, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 9.200, 147200.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-30 11:49:43', '2026-01-30 11:49:43'),
(959, NULL, NULL, 205, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 9.200, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-30 11:49:53', '2026-01-30 11:49:53'),
(960, NULL, NULL, 23, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 280, 0.500, NULL, NULL, 'Penjualan: TRX-S3R9B5VU9J', 6, '2026-01-30 12:29:11', '2026-01-30 12:29:11'),
(961, NULL, NULL, 88, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 280, 0.700, NULL, NULL, 'Penjualan: TRX-S3R9B5VU9J', 6, '2026-01-30 12:29:11', '2026-01-30 12:29:11'),
(962, NULL, NULL, 124, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 280, 1.000, NULL, NULL, 'Penjualan: TRX-S3R9B5VU9J', 6, '2026-01-30 12:29:11', '2026-01-30 12:29:11'),
(963, NULL, NULL, 23, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 281, 0.255, NULL, NULL, 'Penjualan: TRX-OWM6OZD86U', 6, '2026-01-30 13:32:19', '2026-01-30 13:32:19'),
(964, NULL, NULL, 194, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 281, 1.000, NULL, NULL, 'Penjualan: TRX-OWM6OZD86U', 6, '2026-01-30 13:32:19', '2026-01-30 13:32:19'),
(965, NULL, NULL, 124, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 282, 6.000, NULL, NULL, 'Penjualan: TRX-9CG5RLN86K', 6, '2026-01-30 14:13:52', '2026-01-30 14:13:52'),
(966, NULL, NULL, 206, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 6.000, 148176.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-30 14:33:40', '2026-01-30 14:33:40'),
(967, NULL, NULL, 207, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 6.000, 148176.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-30 14:36:30', '2026-01-30 14:36:30'),
(968, NULL, NULL, 208, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 4.000, 185944.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-30 14:40:39', '2026-01-30 14:40:39'),
(969, NULL, NULL, 208, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 4.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-30 14:40:51', '2026-01-30 14:40:51'),
(970, NULL, NULL, 206, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 6.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-30 14:40:58', '2026-01-30 14:40:58'),
(971, NULL, NULL, 207, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 6.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-30 14:41:05', '2026-01-30 14:41:05'),
(972, NULL, NULL, 209, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 4.000, 193872.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-30 14:43:58', '2026-01-30 14:43:58'),
(973, NULL, NULL, 210, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 4.000, 185944.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-30 14:46:51', '2026-01-30 14:46:51'),
(974, NULL, NULL, 210, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 4.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-30 14:47:00', '2026-01-30 14:47:00'),
(975, NULL, NULL, 209, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 4.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-30 14:47:10', '2026-01-30 14:47:10'),
(976, NULL, NULL, 46, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 283, 1.000, NULL, NULL, 'Penjualan: TRX-BI0HX8111R', 6, '2026-01-30 14:55:54', '2026-01-30 14:55:54'),
(977, NULL, NULL, 48, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 283, 1.000, NULL, NULL, 'Penjualan: TRX-BI0HX8111R', 6, '2026-01-30 14:55:54', '2026-01-30 14:55:54'),
(978, NULL, NULL, 49, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 283, 0.635, NULL, NULL, 'Penjualan: TRX-BI0HX8111R', 6, '2026-01-30 14:55:54', '2026-01-30 14:55:54'),
(979, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 283, 2.000, NULL, NULL, 'Penjualan: TRX-BI0HX8111R', 6, '2026-01-30 14:55:54', '2026-01-30 14:55:54'),
(980, NULL, NULL, 75, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 283, 1.000, NULL, NULL, 'Penjualan: TRX-BI0HX8111R', 6, '2026-01-30 14:55:54', '2026-01-30 14:55:54'),
(981, NULL, NULL, 79, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 283, 1.000, NULL, NULL, 'Penjualan: TRX-BI0HX8111R', 6, '2026-01-30 14:55:54', '2026-01-30 14:55:54'),
(982, NULL, NULL, 82, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 283, 1.030, NULL, NULL, 'Penjualan: TRX-BI0HX8111R', 6, '2026-01-30 14:55:54', '2026-01-30 14:55:54'),
(983, NULL, NULL, 14, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 284, 1.000, NULL, NULL, 'Penjualan: TRX-F5046WIA6Q', 6, '2026-01-30 14:57:37', '2026-01-30 14:57:37'),
(984, NULL, NULL, 17, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 284, 1.000, NULL, NULL, 'Penjualan: TRX-F5046WIA6Q', 6, '2026-01-30 14:57:37', '2026-01-30 14:57:37'),
(985, NULL, NULL, 67, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 284, 1.000, NULL, NULL, 'Penjualan: TRX-F5046WIA6Q', 6, '2026-01-30 14:57:37', '2026-01-30 14:57:37'),
(986, NULL, NULL, 80, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 285, 1.000, NULL, NULL, 'Penjualan: TRX-87K271M0TQ', 6, '2026-01-30 15:01:59', '2026-01-30 15:01:59'),
(987, NULL, NULL, 105, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 285, 4.000, NULL, NULL, 'Penjualan: TRX-87K271M0TQ', 6, '2026-01-30 15:01:59', '2026-01-30 15:01:59'),
(988, NULL, NULL, 211, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 4.000, 181620.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-30 15:06:46', '2026-01-30 15:06:46'),
(989, NULL, NULL, 211, 'warehouse', 1, NULL, NULL, NULL, NULL, 'display', 1, 4.000, NULL, NULL, 'Transfer dari gudang ke display', 6, '2026-01-30 15:06:57', '2026-01-30 15:06:57'),
(990, NULL, NULL, 212, 'supplier', 1, 1, NULL, NULL, NULL, 'warehouse', 1, 2.000, 0.00, NULL, 'Barang masuk dari supplier', 6, '2026-01-30 15:09:36', '2026-01-30 15:09:36'),
(991, NULL, NULL, 9, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 286, 0.420, NULL, NULL, 'Penjualan: TRX-3PIZ46YF74', 6, '2026-01-30 15:11:22', '2026-01-30 15:11:22'),
(992, NULL, NULL, 103, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 286, 1.080, NULL, NULL, 'Penjualan: TRX-3PIZ46YF74', 6, '2026-01-30 15:11:22', '2026-01-30 15:11:22'),
(993, NULL, NULL, 178, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 286, 0.085, NULL, NULL, 'Penjualan: TRX-3PIZ46YF74', 6, '2026-01-30 15:11:22', '2026-01-30 15:11:22'),
(994, NULL, NULL, 20, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 287, 1.000, NULL, NULL, 'Penjualan: TRX-N8C448Y77D', 3, '2026-01-30 15:26:19', '2026-01-30 15:26:19'),
(995, NULL, NULL, 29, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 287, 1.000, NULL, NULL, 'Penjualan: TRX-N8C448Y77D', 3, '2026-01-30 15:26:19', '2026-01-30 15:26:19'),
(996, NULL, NULL, 138, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 287, 1.000, NULL, NULL, 'Penjualan: TRX-N8C448Y77D', 3, '2026-01-30 15:26:19', '2026-01-30 15:26:19'),
(997, NULL, NULL, 27, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 288, 2.000, NULL, NULL, 'Penjualan: TRX-21H981Z5M0', 3, '2026-01-30 16:39:12', '2026-01-30 16:39:12'),
(998, NULL, NULL, 50, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 288, 1.000, NULL, NULL, 'Penjualan: TRX-21H981Z5M0', 3, '2026-01-30 16:39:12', '2026-01-30 16:39:12'),
(999, NULL, NULL, 53, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 288, 1.000, NULL, NULL, 'Penjualan: TRX-21H981Z5M0', 3, '2026-01-30 16:39:12', '2026-01-30 16:39:12'),
(1000, NULL, NULL, 62, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 288, 1.000, NULL, NULL, 'Penjualan: TRX-21H981Z5M0', 3, '2026-01-30 16:39:12', '2026-01-30 16:39:12'),
(1001, NULL, NULL, 69, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 288, 0.190, NULL, NULL, 'Penjualan: TRX-21H981Z5M0', 3, '2026-01-30 16:39:12', '2026-01-30 16:39:12'),
(1002, NULL, NULL, 194, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 288, 1.000, NULL, NULL, 'Penjualan: TRX-21H981Z5M0', 3, '2026-01-30 16:39:12', '2026-01-30 16:39:12'),
(1003, NULL, NULL, 21, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 289, 1.000, NULL, NULL, 'Penjualan: TRX-U701P8681G', 3, '2026-01-30 16:46:48', '2026-01-30 16:46:48'),
(1004, NULL, NULL, 39, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 289, 0.400, NULL, NULL, 'Penjualan: TRX-U701P8681G', 3, '2026-01-30 16:46:48', '2026-01-30 16:46:48'),
(1005, NULL, NULL, 124, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 289, 1.000, NULL, NULL, 'Penjualan: TRX-U701P8681G', 3, '2026-01-30 16:46:48', '2026-01-30 16:46:48'),
(1006, NULL, NULL, 126, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 289, 0.610, NULL, NULL, 'Penjualan: TRX-U701P8681G', 3, '2026-01-30 16:46:48', '2026-01-30 16:46:48'),
(1007, NULL, NULL, 81, 'display', 1, NULL, NULL, NULL, NULL, 'transaction', 290, 0.885, NULL, NULL, 'Penjualan: TRX-8P80PSF331', 3, '2026-01-30 16:50:40', '2026-01-30 16:50:40');

-- --------------------------------------------------------

--
-- Table structure for table `stock_opnames`
--

CREATE TABLE `stock_opnames` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `location_type` enum('warehouse','display') NOT NULL,
  `location_id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('draft','completed') NOT NULL DEFAULT 'draft',
  `note` text DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stock_opname_items`
--

CREATE TABLE `stock_opname_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `stock_opname_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `system_qty` decimal(10,3) NOT NULL DEFAULT 0.000,
  `physical_qty` decimal(10,3) NOT NULL DEFAULT 0.000,
  `difference` decimal(10,3) NOT NULL DEFAULT 0.000,
  `loss_amount` decimal(15,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `company` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `name`, `company`, `email`, `phone`, `address`, `description`, `created_at`, `updated_at`) VALUES
(1, 'owner julia', 'julia freshmart', NULL, '089230293092', '-', '-', '2026-01-27 16:55:07', '2026-01-27 16:55:07');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cashier_id` bigint(20) UNSIGNED NOT NULL,
  `shift_id` bigint(20) UNSIGNED DEFAULT NULL,
  `customer_id` bigint(20) UNSIGNED DEFAULT NULL,
  `invoice` varchar(255) NOT NULL,
  `cash` bigint(20) NOT NULL,
  `change` bigint(20) NOT NULL,
  `discount` bigint(20) NOT NULL DEFAULT 0,
  `ppn` decimal(5,2) NOT NULL DEFAULT 0.00,
  `tax` bigint(20) NOT NULL DEFAULT 0,
  `grand_total` bigint(20) NOT NULL,
  `payment_method` varchar(255) NOT NULL DEFAULT 'cash',
  `payment_status` varchar(255) NOT NULL DEFAULT 'paid',
  `payment_reference` varchar(255) DEFAULT NULL,
  `payment_url` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `cashier_id`, `shift_id`, `customer_id`, `invoice`, `cash`, `change`, `discount`, `ppn`, `tax`, `grand_total`, `payment_method`, `payment_status`, `payment_reference`, `payment_url`, `created_at`, `updated_at`) VALUES
(1, 3, 1, NULL, 'TRX-96MR4T7TV2', 10000, 0, 0, 0.00, 0, 10000, 'cash', 'paid', NULL, NULL, '2026-01-26 10:41:01', '2026-01-26 10:41:01'),
(2, 3, 1, NULL, 'TRX-55D86I9FO5', 5400, 0, 0, 0.00, 0, 5400, 'qris', 'pending', NULL, NULL, '2026-01-26 10:43:38', '2026-01-26 10:43:38'),
(3, 3, 1, NULL, 'TRX-3181107I1M', 5400, 0, 0, 0.00, 0, 5400, 'qris', 'pending', NULL, NULL, '2026-01-26 10:45:10', '2026-01-26 10:45:10'),
(4, 3, 1, NULL, 'TRX-H72349TXP7', 58800, 0, 0, 0.00, 0, 58800, 'cash', 'paid', NULL, NULL, '2026-01-26 11:08:20', '2026-01-26 11:08:20'),
(5, 3, 1, NULL, 'TRX-P7MHU8S296', 58800, 0, 0, 0.00, 0, 58800, 'cash', 'paid', NULL, NULL, '2026-01-26 11:09:15', '2026-01-26 11:09:15'),
(6, 3, 1, NULL, 'TRX-1JH9MB2SN2', 5400, 0, 0, 0.00, 0, 5400, 'qris', 'pending', NULL, NULL, '2026-01-26 11:09:51', '2026-01-26 11:09:51'),
(7, 3, 1, NULL, 'TRX-3D2K9U05U4', 42200, 0, 0, 0.00, 0, 42200, 'qris', 'pending', NULL, NULL, '2026-01-26 13:05:52', '2026-01-26 13:05:52'),
(8, 3, 1, NULL, 'TRX-0ZU0670WAY', 50825, 0, 0, 0.00, 0, 50825, 'qris', 'pending', NULL, NULL, '2026-01-26 13:33:36', '2026-01-26 13:33:36'),
(9, 3, 1, NULL, 'TRX-Q4VSR3XLQ4', 36000, 0, 0, 0.00, 0, 36000, 'cash', 'paid', NULL, NULL, '2026-01-26 14:38:48', '2026-01-26 14:38:48'),
(10, 3, 1, NULL, 'TRX-91CUPIY4YA', 18720, 0, 0, 0.00, 0, 18720, 'cash', 'paid', NULL, NULL, '2026-01-26 14:50:40', '2026-01-26 14:50:40'),
(11, 3, 1, NULL, 'TRX-433876ZXHT', 52024, 5574, 0, 0.00, 0, 46450, 'cash', 'paid', NULL, NULL, '2026-01-26 15:12:45', '2026-01-26 15:12:45'),
(12, 3, 1, NULL, 'TRX-0I04BZH5RV', 50000, 3550, 0, 0.00, 0, 46450, 'cash', 'paid', NULL, NULL, '2026-01-26 15:14:44', '2026-01-26 15:14:44'),
(13, 3, 1, NULL, 'TRX-P0EZSGPX2P', 20000, 0, 0, 0.00, 0, 20000, 'cash', 'paid', NULL, NULL, '2026-01-26 15:30:49', '2026-01-26 15:30:49'),
(16, 3, 1, NULL, 'TRX-50Y4LE9M3B', 15000, 1000, 0, 0.00, 0, 14000, 'cash', 'paid', NULL, NULL, '2026-01-26 15:57:28', '2026-01-26 15:57:28'),
(18, 6, 2, NULL, 'TRX-OL71H5FR33', 100000, 56600, 0, 0.00, 0, 43400, 'cash', 'paid', NULL, NULL, '2026-01-26 16:43:27', '2026-01-26 16:43:27'),
(19, 6, 2, NULL, 'TRX-IKB782J9S3', 92850, 0, 0, 0.00, 0, 92850, 'qris', 'pending', NULL, NULL, '2026-01-26 16:55:57', '2026-01-26 16:55:57'),
(20, 6, 2, NULL, 'TRX-AM4RLY418I', 80000, 0, 0, 0.00, 0, 80000, 'qris', 'pending', NULL, NULL, '2026-01-26 17:19:22', '2026-01-26 17:19:22'),
(21, 6, 2, NULL, 'TRX-65G4H88691', 50000, 5000, 0, 0.00, 0, 45000, 'cash', 'paid', NULL, NULL, '2026-01-26 17:29:23', '2026-01-26 17:29:23'),
(22, 6, 2, NULL, 'TRX-1V16015545', 50000, 15000, 0, 0.00, 0, 35000, 'cash', 'paid', NULL, NULL, '2026-01-26 17:44:04', '2026-01-26 17:44:04'),
(23, 6, 2, NULL, 'TRX-6203XX5KC3', 100000, 27680, 0, 0.00, 0, 72320, 'cash', 'paid', NULL, NULL, '2026-01-26 18:16:34', '2026-01-26 18:16:34'),
(24, 6, 2, NULL, 'TRX-6EIQ7W7600', 152850, 0, 0, 0.00, 0, 152850, 'qris', 'pending', NULL, NULL, '2026-01-26 20:09:40', '2026-01-26 20:09:40'),
(25, 6, 2, NULL, 'TRX-EF71R08103', 45000, 0, 0, 0.00, 0, 45000, 'qris', 'pending', NULL, NULL, '2026-01-26 20:33:01', '2026-01-26 20:33:01'),
(26, 6, 2, NULL, 'TRX-QSS44YX02U', 77000, 0, 0, 0.00, 0, 77000, 'cash', 'paid', NULL, NULL, '2026-01-26 20:50:43', '2026-01-26 20:50:43'),
(27, 6, 2, NULL, 'TRX-05Q30134TK', 43000, 250, 0, 0.00, 0, 42750, 'cash', 'paid', NULL, NULL, '2026-01-26 20:52:25', '2026-01-26 20:52:25'),
(28, 6, 2, NULL, 'TRX-Q0NP2695GB', 26000, 800, 0, 0.00, 0, 25200, 'cash', 'paid', NULL, NULL, '2026-01-26 20:53:04', '2026-01-26 20:53:04'),
(29, 6, 2, NULL, 'TRX-3L4UI7DPP0', 100000, 25000, 0, 0.00, 0, 75000, 'cash', 'paid', NULL, NULL, '2026-01-26 21:46:33', '2026-01-26 21:46:33'),
(30, 6, 2, NULL, 'TRX-LTGIO741Z8', 50000, 9900, 0, 0.00, 0, 40100, 'cash', 'paid', NULL, NULL, '2026-01-26 22:22:07', '2026-01-26 22:22:07'),
(31, 3, 3, NULL, 'TRX-NV8S092S1H', 17065, 0, 0, 0.00, 0, 17065, 'qris', 'pending', NULL, NULL, '2026-01-27 08:51:28', '2026-01-27 08:51:28'),
(32, 3, 3, NULL, 'TRX-8FAIH55L6A', 35000, 0, 0, 0.00, 0, 35000, 'qris', 'pending', NULL, NULL, '2026-01-27 08:52:20', '2026-01-27 08:52:20'),
(33, 3, 3, NULL, 'TRX-MLM936NQKC', 50000, 21000, 0, 0.00, 0, 29000, 'cash', 'paid', NULL, NULL, '2026-01-27 09:25:24', '2026-01-27 09:25:24'),
(34, 3, 3, NULL, 'TRX-0T931J0OHZ', 5400, 0, 0, 0.00, 0, 5400, 'qris', 'pending', NULL, NULL, '2026-01-27 10:15:21', '2026-01-27 10:15:21'),
(35, 3, 3, NULL, 'TRX-BN384K9C86', 25000, 0, 0, 0.00, 0, 25000, 'cash', 'paid', NULL, NULL, '2026-01-27 13:06:22', '2026-01-27 13:06:22'),
(36, 3, 3, NULL, 'TRX-X9L91ZK3XV', 50000, 21000, 0, 0.00, 0, 29000, 'cash', 'paid', NULL, NULL, '2026-01-27 13:25:24', '2026-01-27 13:25:24'),
(37, 3, 3, NULL, 'TRX-HICPAJU478', 90000, 0, 0, 0.00, 0, 90000, 'qris', 'pending', NULL, NULL, '2026-01-27 13:32:09', '2026-01-27 13:32:09'),
(38, 3, 3, NULL, 'TRX-07PR423324', 50000, 22000, 0, 0.00, 0, 28000, 'cash', 'paid', NULL, NULL, '2026-01-27 14:22:59', '2026-01-27 14:22:59'),
(40, 3, 3, NULL, 'TRX-4CU7SLMISZ', 44600, 0, 0, 0.00, 0, 44600, 'qris', 'pending', NULL, NULL, '2026-01-27 14:42:09', '2026-01-27 14:42:09'),
(41, 3, 3, NULL, 'TRX-81902I106W', 85375, 0, 0, 0.00, 0, 85375, 'qris', 'pending', NULL, NULL, '2026-01-27 15:21:20', '2026-01-27 15:21:20'),
(42, 3, 3, NULL, 'TRX-2RJ95E17DY', 400000, 105000, 0, 0.00, 0, 295000, 'cash', 'paid', NULL, NULL, '2026-01-27 16:22:31', '2026-01-27 16:22:31'),
(43, 6, 4, NULL, 'TRX-N8H94D4C2J', 400000, 80000, 0, 0.00, 0, 320000, 'cash', 'paid', NULL, NULL, '2026-01-27 16:31:37', '2026-01-27 16:31:37'),
(44, 6, 4, NULL, 'TRX-3MLFD8M9JU', 200000, 87330, 0, 0.00, 0, 112670, 'cash', 'paid', NULL, NULL, '2026-01-27 16:33:19', '2026-01-27 16:33:19'),
(45, 6, 4, NULL, 'TRX-QO67445Y5X', 50000, 10400, 0, 0.00, 0, 39600, 'cash', 'paid', NULL, NULL, '2026-01-27 16:34:37', '2026-01-27 16:34:37'),
(46, 6, 4, NULL, 'TRX-3T2U0M0859', 45000, 0, 0, 0.00, 0, 45000, 'qris', 'pending', NULL, NULL, '2026-01-27 16:53:36', '2026-01-27 16:53:36'),
(47, 6, 4, NULL, 'TRX-O9T087655V', 129100, 0, 0, 0.00, 0, 129100, 'qris', 'pending', NULL, NULL, '2026-01-27 17:06:59', '2026-01-27 17:06:59'),
(48, 6, 4, NULL, 'TRX-J0T5WS8U60', 50000, 25000, 0, 0.00, 0, 25000, 'cash', 'paid', NULL, NULL, '2026-01-27 17:09:59', '2026-01-27 17:09:59'),
(49, 6, 4, NULL, 'TRX-57F306O869', 102510, 0, 0, 0.00, 0, 102510, 'qris', 'pending', NULL, NULL, '2026-01-27 17:15:12', '2026-01-27 17:15:12'),
(50, 6, 4, NULL, 'TRX-1L005ROFBV', 75825, 25000, 0, 0.00, 0, 50825, 'cash', 'paid', NULL, NULL, '2026-01-27 17:17:23', '2026-01-27 17:17:23'),
(51, 6, 4, NULL, 'TRX-TYLG5Y9MD5', 94250, 0, 0, 0.00, 0, 94250, 'qris', 'pending', NULL, NULL, '2026-01-27 17:18:42', '2026-01-27 17:18:42'),
(52, 6, 4, NULL, 'TRX-XP913XV5DC', 22860, 0, 0, 0.00, 0, 22860, 'qris', 'pending', NULL, NULL, '2026-01-27 17:19:40', '2026-01-27 17:19:40'),
(53, 6, 4, NULL, 'TRX-3ORR14EU5O', 25025, 0, 0, 0.00, 0, 25025, 'qris', 'pending', NULL, NULL, '2026-01-27 17:20:51', '2026-01-27 17:20:51'),
(54, 6, 4, NULL, 'TRX-751N2697U9', 50000, 18275, 0, 0.00, 0, 31725, 'cash', 'paid', NULL, NULL, '2026-01-27 17:22:38', '2026-01-27 17:22:38'),
(55, 6, 4, NULL, 'TRX-PL5VWW918C', 100000, 31825, 0, 0.00, 0, 68175, 'cash', 'paid', NULL, NULL, '2026-01-27 17:23:53', '2026-01-27 17:23:53'),
(56, 6, 4, NULL, 'TRX-99T894N4H2', 50000, 30925, 0, 0.00, 0, 19075, 'cash', 'paid', NULL, NULL, '2026-01-27 17:26:53', '2026-01-27 17:26:53'),
(57, 6, 4, NULL, 'TRX-IX8M4N3A15', 66700, 0, 0, 0.00, 0, 66700, 'qris', 'pending', NULL, NULL, '2026-01-27 17:31:09', '2026-01-27 17:31:09'),
(58, 6, 4, NULL, 'TRX-02K2M7H0D0', 100000, 32772, 0, 12.00, 7203, 67228, 'cash', 'paid', NULL, NULL, '2026-01-27 17:32:52', '2026-01-27 17:32:52'),
(59, 6, 4, NULL, 'TRX-8MM3Q0Z37L', 200000, 63365, 0, 0.00, 0, 136635, 'cash', 'paid', NULL, NULL, '2026-01-27 17:37:35', '2026-01-27 17:37:35'),
(60, 6, 4, NULL, 'TRX-95AST83LHH', 39150, 0, 0, 12.00, 4195, 39150, 'qris', 'pending', NULL, NULL, '2026-01-27 17:45:53', '2026-01-27 17:45:53'),
(61, 6, 4, NULL, 'TRX-GUJLPH611R', 30865, 0, 0, 0.00, 0, 30865, 'qris', 'pending', NULL, NULL, '2026-01-27 17:57:02', '2026-01-27 17:57:02'),
(62, 6, 4, NULL, 'TRX-9MYATPO7B3', 50000, 5615, 0, 0.00, 0, 44385, 'cash', 'paid', NULL, NULL, '2026-01-27 18:03:15', '2026-01-27 18:03:15'),
(63, 6, 4, NULL, 'TRX-IA29O0BHAB', 20000, 2000, 0, 0.00, 0, 18000, 'cash', 'paid', NULL, NULL, '2026-01-27 18:03:43', '2026-01-27 18:03:43'),
(64, 6, 4, NULL, 'TRX-06K1J5528P', 20000, 3000, 0, 0.00, 0, 17000, 'cash', 'paid', NULL, NULL, '2026-01-27 18:04:23', '2026-01-27 18:04:23'),
(65, 6, 4, NULL, 'TRX-15860AKY7J', 40000, 0, 0, 0.00, 0, 40000, 'qris', 'pending', NULL, NULL, '2026-01-27 18:07:23', '2026-01-27 18:07:23'),
(66, 6, 4, NULL, 'TRX-LC5V2W8K5G', 20000, 0, 0, 0.00, 0, 20000, 'cash', 'paid', NULL, NULL, '2026-01-27 18:11:40', '2026-01-27 18:11:40'),
(67, 6, 4, NULL, 'TRX-2A94040XJV', 150000, 22000, 0, 0.00, 0, 128000, 'cash', 'paid', NULL, NULL, '2026-01-27 18:16:05', '2026-01-27 18:16:05'),
(68, 6, 4, NULL, 'TRX-JMXX8F40E5', 200000, 46255, 0, 0.00, 0, 153745, 'cash', 'paid', NULL, NULL, '2026-01-27 18:23:17', '2026-01-27 18:23:17'),
(69, 6, 4, NULL, 'TRX-Q64XK487Y8', 70000, 35000, 0, 0.00, 0, 35000, 'cash', 'paid', NULL, NULL, '2026-01-27 18:23:48', '2026-01-27 18:23:48'),
(70, 6, 4, NULL, 'TRX-A5U5XN0A4S', 122700, 0, 0, 0.00, 0, 122700, 'qris', 'pending', NULL, NULL, '2026-01-27 18:28:21', '2026-01-27 18:28:21'),
(71, 6, 4, NULL, 'TRX-141WZ5Z74D', 85445, 0, 0, 0.00, 0, 85445, 'qris', 'pending', NULL, NULL, '2026-01-27 18:32:13', '2026-01-27 18:32:13'),
(72, 6, 4, NULL, 'TRX-I66FMXBNLM', 50000, 15000, 0, 0.00, 0, 35000, 'cash', 'paid', NULL, NULL, '2026-01-27 18:37:24', '2026-01-27 18:37:24'),
(73, 6, 4, NULL, 'TRX-EI7310W717', 20000, 0, 0, 0.00, 0, 20000, 'qris', 'pending', NULL, NULL, '2026-01-27 18:42:22', '2026-01-27 18:42:22'),
(74, 6, 4, NULL, 'TRX-6KI1M81G3T', 70700, 11700, 0, 0.00, 0, 59000, 'cash', 'paid', NULL, NULL, '2026-01-27 18:59:02', '2026-01-27 18:59:02'),
(75, 6, 4, NULL, 'TRX-I4N38PEOS0', 35000, 0, 0, 0.00, 0, 35000, 'qris', 'pending', NULL, NULL, '2026-01-27 19:00:04', '2026-01-27 19:00:04'),
(76, 6, 4, NULL, 'TRX-D0E8E41Q71', 45000, 0, 0, 0.00, 0, 45000, 'qris', 'pending', NULL, NULL, '2026-01-27 19:00:43', '2026-01-27 19:00:43'),
(77, 6, 4, NULL, 'TRX-4PP67ARU6Q', 42275, 0, 0, 0.00, 0, 42275, 'qris', 'pending', NULL, NULL, '2026-01-27 19:16:51', '2026-01-27 19:16:51'),
(78, 6, 4, NULL, 'TRX-LNF62KG009', 80000, 0, 0, 0.00, 0, 80000, 'qris', 'pending', NULL, NULL, '2026-01-27 19:18:11', '2026-01-27 19:18:11'),
(79, 6, 4, NULL, 'TRX-14R1AM90ME', 163390, 0, 0, 0.00, 0, 163390, 'qris', 'pending', NULL, NULL, '2026-01-27 19:21:14', '2026-01-27 19:21:14'),
(80, 6, 4, NULL, 'TRX-W67Q4IM1R4', 35000, 0, 0, 0.00, 0, 35000, 'qris', 'pending', NULL, NULL, '2026-01-27 19:22:42', '2026-01-27 19:22:42'),
(81, 6, 4, NULL, 'TRX-NM64OYGAN2', 200000, 915, 0, 0.00, 0, 199085, 'cash', 'paid', NULL, NULL, '2026-01-27 19:32:32', '2026-01-27 19:32:32'),
(82, 6, 4, NULL, 'TRX-LHV2QX5I5S', 166280, 0, 0, 0.00, 0, 166280, 'qris', 'pending', NULL, NULL, '2026-01-27 19:39:19', '2026-01-27 19:39:19'),
(83, 6, 4, NULL, 'TRX-18VGE281B1', 17140, 0, 0, 0.00, 0, 17140, 'qris', 'pending', NULL, NULL, '2026-01-27 19:41:32', '2026-01-27 19:41:32'),
(84, 6, 4, NULL, 'TRX-88I0J282QL', 50000, 19760, 0, 12.00, 3240, 30240, 'cash', 'paid', NULL, NULL, '2026-01-27 19:45:29', '2026-01-27 19:45:29'),
(85, 6, 4, NULL, 'TRX-974AZKY9GY', 20000, 1856, 0, 12.00, 1944, 18144, 'cash', 'paid', NULL, NULL, '2026-01-27 19:51:26', '2026-01-27 19:51:26'),
(86, 6, 4, NULL, 'TRX-EYNI2A12UR', 52000, 0, 0, 0.00, 0, 52000, 'qris', 'pending', NULL, NULL, '2026-01-27 19:55:57', '2026-01-27 19:55:57'),
(87, 6, 4, NULL, 'TRX-M48934JS2Q', 50000, 23000, 0, 0.00, 0, 27000, 'cash', 'paid', NULL, NULL, '2026-01-27 20:01:49', '2026-01-27 20:01:49'),
(88, 6, 4, NULL, 'TRX-535HJUCTWY', 50000, 6125, 0, 0.00, 0, 43875, 'cash', 'paid', NULL, NULL, '2026-01-27 20:03:47', '2026-01-27 20:03:47'),
(89, 6, 4, NULL, 'TRX-947UU02AE0', 52000, 25000, 0, 0.00, 0, 27000, 'cash', 'paid', NULL, NULL, '2026-01-27 20:06:27', '2026-01-27 20:06:27'),
(90, 6, 4, NULL, 'TRX-G1JF207V25', 20000, 4340, 0, 0.00, 0, 15660, 'cash', 'paid', NULL, NULL, '2026-01-27 20:11:54', '2026-01-27 20:11:54'),
(91, 6, 4, NULL, 'TRX-9971A87G5M', 165000, 0, 0, 0.00, 0, 165000, 'qris', 'pending', NULL, NULL, '2026-01-27 20:19:00', '2026-01-27 20:19:00'),
(92, 6, 4, NULL, 'TRX-294G15M0L1', 147325, 0, 0, 0.00, 0, 147325, 'qris', 'pending', NULL, NULL, '2026-01-27 20:21:23', '2026-01-27 20:21:23'),
(93, 6, 4, NULL, 'TRX-4I650499HU', 46610, 0, 0, 0.00, 0, 46610, 'qris', 'pending', NULL, NULL, '2026-01-27 20:25:20', '2026-01-27 20:25:20'),
(94, 6, 4, NULL, 'TRX-5G7S0O43M5', 54100, 0, 0, 0.00, 0, 54100, 'cash', 'paid', NULL, NULL, '2026-01-27 20:26:32', '2026-01-27 20:26:32'),
(95, 6, 4, NULL, 'TRX-65382ANL9A', 110000, 28400, 0, 0.00, 0, 81600, 'cash', 'paid', NULL, NULL, '2026-01-27 20:38:50', '2026-01-27 20:38:50'),
(96, 6, 4, NULL, 'TRX-4402J861HL', 100000, 41700, 0, 0.00, 0, 58300, 'cash', 'paid', NULL, NULL, '2026-01-27 20:41:24', '2026-01-27 20:41:24'),
(97, 6, 4, NULL, 'TRX-378DBYLEW1', 100000, 75000, 0, 0.00, 0, 25000, 'cash', 'paid', NULL, NULL, '2026-01-27 20:46:29', '2026-01-27 20:46:29'),
(98, 6, 4, NULL, 'TRX-K8DCE86O26', 27000, 0, 0, 0.00, 0, 27000, 'qris', 'pending', NULL, NULL, '2026-01-27 20:52:50', '2026-01-27 20:52:50'),
(99, 6, 4, NULL, 'TRX-896WX67UA8', 50000, 10850, 0, 0.00, 0, 39150, 'cash', 'paid', NULL, NULL, '2026-01-27 20:58:16', '2026-01-27 20:58:16'),
(100, 6, 4, NULL, 'TRX-06I9A39QPW', 20000, 5000, 0, 0.00, 0, 15000, 'cash', 'paid', NULL, NULL, '2026-01-27 20:59:56', '2026-01-27 20:59:56'),
(101, 6, 4, NULL, 'TRX-HMDN72XJ34', 50000, 10000, 0, 0.00, 0, 40000, 'cash', 'paid', NULL, NULL, '2026-01-27 21:00:23', '2026-01-27 21:00:23'),
(102, 6, 4, NULL, 'TRX-5R5P77I8QO', 58275, 0, 0, 0.00, 0, 58275, 'qris', 'pending', NULL, NULL, '2026-01-27 21:09:40', '2026-01-27 21:09:40'),
(103, 6, 4, NULL, 'TRX-9WVEF50OD1', 42010, 0, 0, 0.00, 0, 42010, 'qris', 'pending', NULL, NULL, '2026-01-27 21:25:32', '2026-01-27 21:25:32'),
(104, 6, 4, NULL, 'TRX-43M6K279VU', 35000, 2320, 0, 0.00, 0, 32680, 'cash', 'paid', NULL, NULL, '2026-01-27 21:30:24', '2026-01-27 21:30:24'),
(105, 6, 4, NULL, 'TRX-326703932X', 30000, 0, 0, 0.00, 0, 30000, 'qris', 'pending', NULL, NULL, '2026-01-27 21:57:53', '2026-01-27 21:57:53'),
(106, 3, 5, NULL, 'TRX-E2383H44KS', 100000, 6000, 0, 0.00, 0, 94000, 'cash', 'paid', NULL, NULL, '2026-01-28 08:37:10', '2026-01-28 08:37:10'),
(107, 3, 5, NULL, 'TRX-208IWZ3747', 47615, 0, 0, 0.00, 0, 47615, 'qris', 'pending', NULL, NULL, '2026-01-28 08:45:40', '2026-01-28 08:45:40'),
(108, 3, 5, NULL, 'TRX-493V2A0863', 30000, 0, 0, 0.00, 0, 30000, 'qris', 'pending', NULL, NULL, '2026-01-28 09:11:48', '2026-01-28 09:11:48'),
(109, 3, 5, NULL, 'TRX-2G1794M950', 30000, 0, 0, 0.00, 0, 30000, 'qris', 'pending', NULL, NULL, '2026-01-28 09:12:11', '2026-01-28 09:12:11'),
(110, 3, 5, NULL, 'TRX-UQ4JW80UE3', 50000, 22175, 0, 0.00, 0, 27825, 'cash', 'paid', NULL, NULL, '2026-01-28 09:16:57', '2026-01-28 09:16:57'),
(113, 3, 5, NULL, 'TRX-60180DQA7T', 135000, 0, 0, 0.00, 0, 135000, 'qris', 'pending', NULL, NULL, '2026-01-28 09:41:39', '2026-01-28 09:41:39'),
(114, 3, 5, NULL, 'TRX-96035A4Q6N', 131210, 0, 0, 0.00, 0, 131210, 'qris', 'pending', NULL, NULL, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(115, 3, 5, NULL, 'TRX-V5M9YAN4M4', 15080, 0, 0, 0.00, 0, 15080, 'cash', 'paid', NULL, NULL, '2026-01-28 09:56:22', '2026-01-28 09:56:22'),
(116, 3, 5, NULL, 'TRX-9YLK8Y28M2', 15080, 0, 0, 0.00, 0, 15080, 'cash', 'paid', NULL, NULL, '2026-01-28 09:57:53', '2026-01-28 09:57:53'),
(117, 3, 5, NULL, 'TRX-3CZ1749HM9', 10150, 0, 0, 0.00, 0, 10150, 'qris', 'pending', NULL, NULL, '2026-01-28 10:15:20', '2026-01-28 10:15:20'),
(118, 3, 5, NULL, 'TRX-6L8AZ69EEZ', 10150, 0, 0, 0.00, 0, 10150, 'qris', 'pending', NULL, NULL, '2026-01-28 10:16:16', '2026-01-28 10:16:16'),
(119, 3, 5, NULL, 'TRX-6X199MIL6R', 25000, 0, 0, 0.00, 0, 25000, 'qris', 'pending', NULL, NULL, '2026-01-28 10:17:20', '2026-01-28 10:17:20'),
(120, 3, 5, NULL, 'TRX-Z04QJAC6S6', 25375, 0, 0, 0.00, 0, 25375, 'qris', 'pending', NULL, NULL, '2026-01-28 10:46:09', '2026-01-28 10:46:09'),
(121, 3, 5, NULL, 'TRX-PU1HU52Q3O', 25375, 0, 0, 0.00, 0, 25375, 'qris', 'pending', NULL, NULL, '2026-01-28 10:46:41', '2026-01-28 10:46:41'),
(122, 3, 5, NULL, 'TRX-34EGG3FQR9', 100000, 60000, 0, 0.00, 0, 40000, 'cash', 'paid', NULL, NULL, '2026-01-28 10:48:32', '2026-01-28 10:48:32'),
(123, 3, 5, NULL, 'TRX-S922E78CC6', 172375, 0, 0, 0.00, 0, 172375, 'transfer', 'pending', NULL, NULL, '2026-01-28 11:19:27', '2026-01-28 11:19:27'),
(124, 3, 5, NULL, 'TRX-F60O2L3M88', 104000, 0, 0, 0.00, 0, 104000, 'transfer', 'pending', NULL, NULL, '2026-01-28 11:20:03', '2026-01-28 11:20:03'),
(125, 3, 5, NULL, 'TRX-36CN9CZ002', 50000, 0, 0, 0.00, 0, 50000, 'cash', 'paid', NULL, NULL, '2026-01-28 11:21:32', '2026-01-28 11:21:32'),
(126, 3, 5, NULL, 'TRX-03P3U5914M', 100000, 9350, 0, 0.00, 0, 90650, 'cash', 'paid', NULL, NULL, '2026-01-28 11:24:28', '2026-01-28 11:24:28'),
(127, 3, 5, NULL, 'TRX-XQE7LZFKM3', 50100, 20000, 0, 0.00, 0, 30100, 'cash', 'paid', NULL, NULL, '2026-01-28 11:25:27', '2026-01-28 11:25:27'),
(129, 3, 5, NULL, 'TRX-W1VCYHIQP0', 100000, 68000, 0, 0.00, 0, 32000, 'cash', 'paid', NULL, NULL, '2026-01-28 11:32:56', '2026-01-28 11:32:56'),
(131, 3, 5, NULL, 'TRX-9BENLX5193', 103000, 49750, 0, 0.00, 0, 53250, 'cash', 'paid', NULL, NULL, '2026-01-28 11:41:21', '2026-01-28 11:41:21'),
(132, 3, 5, NULL, 'TRX-7Q6APISUV3', 141120, 0, 0, 0.00, 0, 141120, 'qris', 'pending', NULL, NULL, '2026-01-28 11:55:46', '2026-01-28 11:55:46'),
(133, 3, 5, NULL, 'TRX-29W9AAP7IY', 50000, 3760, 0, 0.00, 0, 46240, 'cash', 'paid', NULL, NULL, '2026-01-28 13:25:23', '2026-01-28 13:25:23'),
(134, 3, 5, NULL, 'TRX-78LTND15E0', 200000, 42375, 0, 0.00, 0, 157625, 'cash', 'paid', NULL, NULL, '2026-01-28 13:42:35', '2026-01-28 13:42:35'),
(135, 3, 5, NULL, 'TRX-T894B09ZNK', 152000, 32700, 0, 0.00, 0, 119300, 'cash', 'paid', NULL, NULL, '2026-01-28 13:58:12', '2026-01-28 13:58:12'),
(136, 3, 5, NULL, 'TRX-0LFWGX1A3B', 50000, 12375, 0, 0.00, 0, 37625, 'cash', 'paid', NULL, NULL, '2026-01-28 14:13:33', '2026-01-28 14:13:33'),
(137, 3, 5, NULL, 'TRX-28DX6R9NTF', 35000, 0, 0, 0.00, 0, 35000, 'qris', 'pending', NULL, NULL, '2026-01-28 14:19:43', '2026-01-28 14:19:43'),
(138, 3, 5, NULL, 'TRX-F63T5D3CZ6', 134000, 0, 0, 0.00, 0, 134000, 'qris', 'pending', NULL, NULL, '2026-01-28 15:09:39', '2026-01-28 15:09:39'),
(139, 3, 5, NULL, 'TRX-2LKGN1Q5PI', 26500, 0, 0, 0.00, 0, 26500, 'cash', 'paid', NULL, NULL, '2026-01-28 15:12:21', '2026-01-28 15:12:21'),
(140, 3, 5, NULL, 'TRX-9FBIUUZOLL', 50000, 0, 0, 0.00, 0, 50000, 'cash', 'paid', NULL, NULL, '2026-01-28 15:14:51', '2026-01-28 15:14:51'),
(141, 3, 5, NULL, 'TRX-5V7O85I966', 60000, 1125, 0, 0.00, 0, 58875, 'cash', 'paid', NULL, NULL, '2026-01-28 15:27:21', '2026-01-28 15:27:21'),
(142, 3, 5, NULL, 'TRX-ZY2ACKKA6Z', 104000, 800, 0, 0.00, 0, 103200, 'cash', 'paid', NULL, NULL, '2026-01-28 15:45:41', '2026-01-28 15:45:41'),
(143, 3, 5, NULL, 'TRX-861SXA3G4D', 30000, 0, 0, 0.00, 0, 30000, 'qris', 'pending', NULL, NULL, '2026-01-28 15:47:19', '2026-01-28 15:47:19'),
(145, 3, 5, NULL, 'TRX-X39L60L7IV', 65550, 0, 0, 0.00, 0, 65550, 'qris', 'pending', NULL, NULL, '2026-01-28 15:58:17', '2026-01-28 15:58:17'),
(146, 6, 6, NULL, 'TRX-7VM5MCRS6U', 50000, 19125, 0, 0.00, 0, 30875, 'cash', 'paid', NULL, NULL, '2026-01-28 16:41:14', '2026-01-28 16:41:14'),
(147, 6, 6, NULL, 'TRX-S0N1269715', 35000, 0, 0, 0.00, 0, 35000, 'cash', 'paid', NULL, NULL, '2026-01-28 16:53:01', '2026-01-28 16:53:01'),
(148, 6, 6, NULL, 'TRX-P3O5417U10', 120625, 0, 0, 0.00, 0, 120625, 'qris', 'pending', NULL, NULL, '2026-01-28 16:56:08', '2026-01-28 16:56:08'),
(149, 6, 6, NULL, 'TRX-N68H2VQXM4', 163635, 0, 0, 0.00, 0, 163635, 'qris', 'pending', NULL, NULL, '2026-01-28 17:04:22', '2026-01-28 17:04:22'),
(150, 6, 6, NULL, 'TRX-VO540L71HB', 21520, 0, 0, 0.00, 0, 21520, 'qris', 'pending', NULL, NULL, '2026-01-28 17:11:15', '2026-01-28 17:11:15'),
(151, 6, 6, NULL, 'TRX-T78O14O01F', 100000, 80000, 0, 0.00, 0, 20000, 'cash', 'paid', NULL, NULL, '2026-01-28 17:18:15', '2026-01-28 17:18:15'),
(152, 6, 6, NULL, 'TRX-ZL2B9823K7', 20000, 0, 0, 0.00, 0, 20000, 'cash', 'paid', NULL, NULL, '2026-01-28 17:19:08', '2026-01-28 17:19:08'),
(153, 6, 6, NULL, 'TRX-824IUP4725', 35080, 0, 0, 0.00, 0, 35080, 'cash', 'paid', NULL, NULL, '2026-01-28 17:22:16', '2026-01-28 17:22:16'),
(154, 6, 6, NULL, 'TRX-RM65JZUYT1', 100000, 40275, 0, 0.00, 0, 59725, 'cash', 'paid', NULL, NULL, '2026-01-28 17:23:13', '2026-01-28 17:23:13'),
(155, 6, 6, NULL, 'TRX-G9E20LX199', 50000, 14300, 0, 0.00, 0, 35700, 'cash', 'paid', NULL, NULL, '2026-01-28 17:23:47', '2026-01-28 17:23:47'),
(156, 6, 6, NULL, 'TRX-P9E74V0EV4', 45000, 3525, 0, 0.00, 0, 41475, 'cash', 'paid', NULL, NULL, '2026-01-28 17:24:36', '2026-01-28 17:24:36'),
(157, 6, 6, NULL, 'TRX-T38WWCEJ71', 56770, 0, 0, 0.00, 0, 56770, 'qris', 'pending', NULL, NULL, '2026-01-28 17:26:10', '2026-01-28 17:26:10'),
(158, 6, 6, NULL, 'TRX-2266UVEV5J', 69720, 0, 0, 0.00, 0, 69720, 'qris', 'pending', NULL, NULL, '2026-01-28 17:27:09', '2026-01-28 17:27:09'),
(159, 6, 6, NULL, 'TRX-T84U394CF4', 53020, 0, 0, 0.00, 0, 53020, 'qris', 'pending', NULL, NULL, '2026-01-28 17:30:34', '2026-01-28 17:30:34'),
(160, 6, 6, NULL, 'TRX-87PR1137UB', 42000, 0, 0, 0.00, 0, 42000, 'qris', 'pending', NULL, NULL, '2026-01-28 17:31:02', '2026-01-28 17:31:02'),
(161, 6, 6, NULL, 'TRX-96N0KY9UST', 34125, 0, 0, 0.00, 0, 34125, 'qris', 'pending', NULL, NULL, '2026-01-28 17:33:26', '2026-01-28 17:33:26'),
(162, 6, 6, NULL, 'TRX-AEI8XSO8J4', 40000, 4125, 0, 0.00, 0, 35875, 'cash', 'paid', NULL, NULL, '2026-01-28 17:34:23', '2026-01-28 17:34:23'),
(163, 6, 6, NULL, 'TRX-BXI421BXKQ', 70025, 0, 0, 0.00, 0, 70025, 'qris', 'pending', NULL, NULL, '2026-01-28 17:38:01', '2026-01-28 17:38:01'),
(164, 6, 6, NULL, 'TRX-QW27NHMY3I', 31050, 0, 0, 0.00, 0, 31050, 'qris', 'pending', NULL, NULL, '2026-01-28 17:38:29', '2026-01-28 17:38:29'),
(165, 6, 6, NULL, 'TRX-OP48L8GORS', 133775, 0, 0, 0.00, 0, 133775, 'cash', 'paid', NULL, NULL, '2026-01-28 17:41:18', '2026-01-28 17:41:18'),
(166, 6, 6, NULL, 'TRX-93Y3NNC5M7', 100000, 28975, 0, 0.00, 0, 71025, 'cash', 'paid', NULL, NULL, '2026-01-28 17:52:37', '2026-01-28 17:52:37'),
(167, 6, 6, NULL, 'TRX-12894G6T6E', 134600, 0, 0, 0.00, 0, 134600, 'qris', 'pending', NULL, NULL, '2026-01-28 18:07:48', '2026-01-28 18:07:48'),
(168, 6, 6, NULL, 'TRX-C364E69M09', 35000, 0, 0, 0.00, 0, 35000, 'qris', 'pending', NULL, NULL, '2026-01-28 18:08:11', '2026-01-28 18:08:11'),
(169, 6, 6, NULL, 'TRX-17428YC4RF', 100500, 70330, 0, 0.00, 0, 30170, 'cash', 'paid', NULL, NULL, '2026-01-28 18:29:46', '2026-01-28 18:29:46'),
(170, 6, 6, NULL, 'TRX-26K68K3T88', 100000, 43000, 0, 0.00, 0, 57000, 'cash', 'paid', NULL, NULL, '2026-01-28 18:44:03', '2026-01-28 18:44:03'),
(171, 6, 6, NULL, 'TRX-I5W046T14O', 40125, 0, 0, 0.00, 0, 40125, 'qris', 'pending', NULL, NULL, '2026-01-28 19:10:29', '2026-01-28 19:10:29'),
(172, 6, 6, NULL, 'TRX-W562HXJ530', 76000, 0, 0, 0.00, 0, 76000, 'cash', 'paid', NULL, NULL, '2026-01-28 19:15:48', '2026-01-28 19:15:48'),
(173, 6, 6, NULL, 'TRX-1KYCS5R28D', 40000, 0, 0, 0.00, 0, 40000, 'qris', 'pending', NULL, NULL, '2026-01-28 19:16:28', '2026-01-28 19:16:28'),
(174, 6, 6, NULL, 'TRX-1JL87C723Q', 100200, 3025, 0, 0.00, 0, 97175, 'cash', 'paid', NULL, NULL, '2026-01-28 19:17:59', '2026-01-28 19:17:59'),
(175, 6, 6, NULL, 'TRX-39896QJ17A', 32300, 0, 0, 0.00, 0, 32300, 'qris', 'pending', NULL, NULL, '2026-01-28 19:29:23', '2026-01-28 19:29:23'),
(176, 6, 6, NULL, 'TRX-K25711469N', 50000, 25000, 0, 0.00, 0, 25000, 'cash', 'paid', NULL, NULL, '2026-01-28 19:34:07', '2026-01-28 19:34:07'),
(177, 6, 6, NULL, 'TRX-0IQY9X1170', 15000, 0, 0, 0.00, 0, 15000, 'cash', 'paid', NULL, NULL, '2026-01-28 19:35:53', '2026-01-28 19:35:53'),
(178, 6, 6, NULL, 'TRX-1GJM3I8970', 100000, 52750, 0, 0.00, 0, 47250, 'cash', 'paid', NULL, NULL, '2026-01-28 19:49:33', '2026-01-28 19:49:33'),
(179, 6, 6, NULL, 'TRX-0EP1M9VMZ7', 50000, 2000, 0, 0.00, 0, 48000, 'cash', 'paid', NULL, NULL, '2026-01-28 19:50:22', '2026-01-28 19:50:22'),
(180, 6, 6, NULL, 'TRX-ELAJX919D8', 47800, 0, 0, 0.00, 0, 47800, 'qris', 'pending', NULL, NULL, '2026-01-28 19:52:13', '2026-01-28 19:52:13'),
(181, 6, 6, NULL, 'TRX-LS5HK3Y17F', 71688, 0, 0, 0.00, 0, 71688, 'qris', 'pending', NULL, NULL, '2026-01-28 19:55:08', '2026-01-28 19:55:08'),
(182, 6, 6, NULL, 'TRX-Q515VN4W21', 50000, 18440, 0, 0.00, 0, 31560, 'cash', 'paid', NULL, NULL, '2026-01-28 20:01:55', '2026-01-28 20:01:55'),
(183, 6, 6, NULL, 'TRX-QT3J1C08UM', 50000, 20000, 0, 0.00, 0, 30000, 'cash', 'paid', NULL, NULL, '2026-01-28 20:02:57', '2026-01-28 20:02:57'),
(184, 6, 6, NULL, 'TRX-TWNVT27Z0A', 50200, 20950, 0, 0.00, 0, 29250, 'cash', 'paid', NULL, NULL, '2026-01-28 20:11:26', '2026-01-28 20:11:26'),
(185, 6, 6, NULL, 'TRX-CWAA3BZX77', 50000, 9380, 0, 0.00, 0, 40620, 'cash', 'paid', NULL, NULL, '2026-01-28 20:17:11', '2026-01-28 20:17:11'),
(186, 6, 6, NULL, 'TRX-18C067NA4F', 50000, 45450, 0, 0.00, 0, 4550, 'cash', 'paid', NULL, NULL, '2026-01-28 20:19:33', '2026-01-28 20:19:33'),
(187, 6, 6, NULL, 'TRX-5X4EVZS756', 16000, 0, 0, 0.00, 0, 16000, 'qris', 'pending', NULL, NULL, '2026-01-28 20:20:03', '2026-01-28 20:20:03'),
(188, 6, 6, NULL, 'TRX-3QFK67R3OL', 32000, 0, 0, 0.00, 0, 32000, 'cash', 'paid', NULL, NULL, '2026-01-28 20:22:29', '2026-01-28 20:22:29'),
(189, 6, 6, NULL, 'TRX-6PR0G444R4', 43000, 40, 0, 0.00, 0, 42960, 'cash', 'paid', NULL, NULL, '2026-01-28 20:23:51', '2026-01-28 20:23:51'),
(190, 6, 6, NULL, 'TRX-36N4W2UL55', 50000, 1325, 0, 0.00, 0, 48675, 'cash', 'paid', NULL, NULL, '2026-01-28 20:28:45', '2026-01-28 20:28:45'),
(191, 6, 6, NULL, 'TRX-LY2969YUZJ', 20000, 5000, 0, 0.00, 0, 15000, 'cash', 'paid', NULL, NULL, '2026-01-28 20:34:51', '2026-01-28 20:34:51'),
(192, 6, 6, NULL, 'TRX-202FJ7G2YN', 150000, 30000, 0, 0.00, 0, 120000, 'cash', 'paid', NULL, NULL, '2026-01-28 20:42:11', '2026-01-28 20:42:11'),
(193, 6, 6, NULL, 'TRX-R978G2C3U8', 50175, 0, 0, 0.00, 0, 50175, 'qris', 'pending', NULL, NULL, '2026-01-28 20:49:06', '2026-01-28 20:49:06'),
(194, 6, 6, NULL, 'TRX-7LZCJO9EHC', 46200, 0, 0, 0.00, 0, 46200, 'qris', 'pending', NULL, NULL, '2026-01-28 20:51:24', '2026-01-28 20:51:24'),
(195, 6, 6, NULL, 'TRX-709T7J4YOT', 22000, 0, 0, 0.00, 0, 22000, 'cash', 'paid', NULL, NULL, '2026-01-28 21:00:56', '2026-01-28 21:00:56'),
(196, 6, 6, NULL, 'TRX-MP7VD33O9F', 15000, 0, 0, 0.00, 0, 15000, 'qris', 'pending', NULL, NULL, '2026-01-28 21:04:12', '2026-01-28 21:04:12'),
(197, 6, 6, NULL, 'TRX-I05AH2IV6R', 71950, 0, 0, 0.00, 0, 71950, 'cash', 'paid', NULL, NULL, '2026-01-28 21:06:10', '2026-01-28 21:06:10'),
(198, 6, 6, NULL, 'TRX-U71Y0C4K5F', 152000, 50, 0, 0.00, 0, 151950, 'cash', 'paid', NULL, NULL, '2026-01-28 21:17:10', '2026-01-28 21:17:10'),
(199, 6, 6, NULL, 'TRX-A2519JDFZR', 25000, 0, 0, 0.00, 0, 25000, 'cash', 'paid', NULL, NULL, '2026-01-28 21:18:40', '2026-01-28 21:18:40'),
(200, 6, 6, NULL, 'TRX-CXBF6CZY5C', 113750, 0, 0, 0.00, 0, 113750, 'cash', 'paid', NULL, NULL, '2026-01-28 21:30:07', '2026-01-28 21:30:07'),
(201, 6, 6, NULL, 'TRX-IF95QKQNG2', 10000, 375, 0, 0.00, 0, 9625, 'cash', 'paid', NULL, NULL, '2026-01-28 21:31:26', '2026-01-28 21:31:26'),
(202, 6, 6, NULL, 'TRX-K3G8M12KOY', 49000, 0, 0, 0.00, 0, 49000, 'qris', 'pending', NULL, NULL, '2026-01-28 22:04:11', '2026-01-28 22:04:11'),
(203, 6, 6, NULL, 'TRX-B84NP4SZO5', 50000, 0, 0, 0.00, 0, 50000, 'cash', 'paid', NULL, NULL, '2026-01-28 22:07:29', '2026-01-28 22:07:29'),
(204, 3, 7, NULL, 'TRX-M2285G8O4Y', 100000, 29827, 0, 0.00, 0, 70173, 'cash', 'paid', NULL, NULL, '2026-01-29 08:59:19', '2026-01-29 08:59:19'),
(205, 3, 7, NULL, 'TRX-2PUG74187J', 200000, 29983, 0, 0.00, 0, 170017, 'cash', 'paid', NULL, NULL, '2026-01-29 09:16:10', '2026-01-29 09:16:10'),
(206, 3, 7, NULL, 'TRX-1DBG00K824', 60000, 0, 0, 0.00, 0, 60000, 'qris', 'pending', NULL, NULL, '2026-01-29 09:48:49', '2026-01-29 09:48:49'),
(207, 3, 7, NULL, 'TRX-SI8LB10878', 65242, 0, 0, 0.00, 0, 65242, 'cash', 'paid', NULL, NULL, '2026-01-29 10:52:52', '2026-01-29 10:52:52'),
(208, 3, 7, NULL, 'TRX-95D65J38SE', 200000, 98500, 0, 0.00, 0, 101500, 'cash', 'paid', NULL, NULL, '2026-01-29 11:11:20', '2026-01-29 11:11:20'),
(209, 3, 7, NULL, 'TRX-RWG90DI2QQ', 145250, 0, 0, 0.00, 0, 145250, 'qris', 'pending', NULL, NULL, '2026-01-29 11:35:43', '2026-01-29 11:35:43'),
(210, 3, 7, NULL, 'TRX-W32HITV0M4', 58050, 0, 0, 0.00, 0, 58050, 'qris', 'pending', NULL, NULL, '2026-01-29 11:41:59', '2026-01-29 11:41:59'),
(211, 3, 7, NULL, 'TRX-5N69UWCAJK', 110000, 49100, 0, 0.00, 0, 60900, 'cash', 'paid', NULL, NULL, '2026-01-29 12:05:06', '2026-01-29 12:05:06'),
(212, 3, 7, NULL, 'TRX-04MOLMIHKB', 72850, 0, 0, 0.00, 0, 72850, 'qris', 'pending', NULL, NULL, '2026-01-29 12:08:03', '2026-01-29 12:08:03'),
(213, 3, 7, NULL, 'TRX-9W6064DZUT', 100000, 55000, 0, 0.00, 0, 45000, 'cash', 'paid', NULL, NULL, '2026-01-29 12:09:17', '2026-01-29 12:09:17'),
(214, 3, 7, NULL, 'TRX-HF5313G2X3', 100000, 17785, 0, 0.00, 0, 82215, 'cash', 'paid', NULL, NULL, '2026-01-29 12:11:57', '2026-01-29 12:11:57'),
(215, 3, 7, NULL, 'TRX-KN3067JX7V', 100000, 41625, 0, 0.00, 0, 58375, 'cash', 'paid', NULL, NULL, '2026-01-29 12:13:22', '2026-01-29 12:13:22'),
(216, 3, 7, NULL, 'TRX-000K35D854', 150000, 22400, 0, 10.00, 11600, 127600, 'cash', 'paid', NULL, NULL, '2026-01-29 12:15:35', '2026-01-29 12:15:35'),
(217, 3, 7, NULL, 'TRX-567O0I2AU2', 87500, 0, 0, 0.00, 0, 87500, 'qris', 'pending', NULL, NULL, '2026-01-29 12:17:52', '2026-01-29 12:17:52'),
(218, 3, 7, NULL, 'TRX-0D8AH6ZZI5', 100000, 45850, 0, 0.00, 0, 54150, 'cash', 'paid', NULL, NULL, '2026-01-29 12:47:39', '2026-01-29 12:47:39'),
(220, 3, 7, NULL, 'TRX-93M8275G55', 50000, 34920, 0, 0.00, 0, 15080, 'cash', 'paid', NULL, NULL, '2026-01-29 13:42:32', '2026-01-29 13:42:32'),
(221, 3, 7, NULL, 'TRX-DZ4Y0AYAL5', 56040, 0, 0, 0.00, 0, 56040, 'qris', 'pending', NULL, NULL, '2026-01-29 13:44:12', '2026-01-29 13:44:12'),
(222, 3, 7, NULL, 'TRX-VFWS6V65FG', 100000, 17755, 0, 0.00, 0, 82245, 'cash', 'paid', NULL, NULL, '2026-01-29 13:45:44', '2026-01-29 13:45:44'),
(223, 3, 7, NULL, 'TRX-77R6PN6YR9', 39464, 0, 0, 0.00, 0, 39464, 'cash', 'paid', NULL, NULL, '2026-01-29 13:51:20', '2026-01-29 13:51:20'),
(224, 3, 7, NULL, 'TRX-RQ60IKVP0T', 100000, 0, 0, 0.00, 0, 100000, 'qris', 'pending', NULL, NULL, '2026-01-29 13:54:27', '2026-01-29 13:54:27'),
(225, 3, 7, NULL, 'TRX-HOW72VF3JG', 139000, 0, 0, 0.00, 0, 139000, 'qris', 'pending', NULL, NULL, '2026-01-29 13:55:38', '2026-01-29 13:55:38'),
(226, 3, 7, NULL, 'TRX-1O0326E0P6', 76300, 0, 0, 0.00, 0, 76300, 'qris', 'pending', NULL, NULL, '2026-01-29 14:21:50', '2026-01-29 14:21:50'),
(227, 3, 7, NULL, 'TRX-Z2S3HOS0S7', 90175, 0, 0, 0.00, 0, 90175, 'qris', 'pending', NULL, NULL, '2026-01-29 15:00:39', '2026-01-29 15:00:39'),
(228, 3, 7, NULL, 'TRX-A4542T5IE0', 135440, 0, 0, 0.00, 0, 135440, 'qris', 'pending', NULL, NULL, '2026-01-29 15:04:50', '2026-01-29 15:04:50'),
(229, 3, 7, NULL, 'TRX-JS2DA259H5', 240000, 36145, 0, 0.00, 0, 203855, 'cash', 'paid', NULL, NULL, '2026-01-29 15:13:18', '2026-01-29 15:13:18'),
(230, 3, 7, NULL, 'TRX-5GR3W35V73', 40000, 6500, 0, 0.00, 0, 33500, 'cash', 'paid', NULL, NULL, '2026-01-29 15:14:46', '2026-01-29 15:14:46'),
(231, 3, 7, NULL, 'TRX-6NXH47RRLN', 100000, 57370, 0, 0.00, 0, 42630, 'cash', 'paid', NULL, NULL, '2026-01-29 15:19:57', '2026-01-29 15:19:57'),
(232, 3, 7, NULL, 'TRX-9KWTYDO52X', 105000, 1850, 0, 0.00, 0, 103150, 'cash', 'paid', NULL, NULL, '2026-01-29 16:08:48', '2026-01-29 16:08:48'),
(233, 3, 7, NULL, 'TRX-9Z31S4DSFB', 97733, 0, 0, 0.00, 0, 97733, 'qris', 'pending', NULL, NULL, '2026-01-29 16:15:57', '2026-01-29 16:15:57'),
(234, 3, 7, NULL, 'TRX-NT2WN3X98Q', 56000, 0, 0, 0.00, 0, 56000, 'qris', 'pending', NULL, NULL, '2026-01-29 16:26:29', '2026-01-29 16:26:29'),
(235, 3, 7, NULL, 'TRX-A7V3MNMMMN', 200000, 96365, 0, 0.00, 0, 103635, 'cash', 'paid', NULL, NULL, '2026-01-29 16:30:17', '2026-01-29 16:30:17'),
(236, 3, 7, NULL, 'TRX-D3MF3W5ZBT', 200000, 74550, 0, 0.00, 0, 125450, 'cash', 'paid', NULL, NULL, '2026-01-29 16:45:51', '2026-01-29 16:45:51'),
(237, 3, 7, NULL, 'TRX-Y6WK4129B2', 20000, 225, 0, 0.00, 0, 19775, 'cash', 'paid', NULL, NULL, '2026-01-29 16:47:14', '2026-01-29 16:47:14'),
(238, 3, 7, NULL, 'TRX-H7N3399VK3', 43400, 0, 0, 0.00, 0, 43400, 'cash', 'paid', NULL, NULL, '2026-01-29 16:49:40', '2026-01-29 16:49:40'),
(239, 3, 7, NULL, 'TRX-4J5G978RUW', 25000, 0, 0, 0.00, 0, 25000, 'qris', 'pending', NULL, NULL, '2026-01-29 17:13:30', '2026-01-29 17:13:30'),
(240, 6, NULL, NULL, 'TRX-CHNO65788E', 50000, 6395, 0, 0.00, 0, 43605, 'cash', 'paid', NULL, NULL, '2026-01-29 17:22:36', '2026-01-29 17:22:36'),
(241, 6, NULL, NULL, 'TRX-606BN0586C', 30000, 0, 0, 0.00, 0, 30000, 'cash', 'paid', NULL, NULL, '2026-01-29 17:29:34', '2026-01-29 17:29:34'),
(242, 6, NULL, NULL, 'TRX-99EFD6QW23', 5000, 0, 0, 0.00, 0, 5000, 'cash', 'paid', NULL, NULL, '2026-01-29 17:30:00', '2026-01-29 17:30:00'),
(243, 6, NULL, NULL, 'TRX-0WY06X8I5P', 5000, 0, 0, 0.00, 0, 5000, 'cash', 'paid', NULL, NULL, '2026-01-29 17:33:03', '2026-01-29 17:33:03'),
(244, 6, NULL, NULL, 'TRX-27KR53N35M', 22000, 0, 0, 10.00, 2000, 22000, 'cash', 'paid', NULL, NULL, '2026-01-29 17:34:29', '2026-01-29 17:34:29'),
(245, 6, 8, NULL, 'TRX-36FHMT8S04', 10000, 5000, 0, 0.00, 0, 5000, 'cash', 'paid', NULL, NULL, '2026-01-29 17:41:19', '2026-01-29 17:41:19'),
(246, 6, 8, NULL, 'TRX-4536B78Z6C', 136790, 0, 0, 0.00, 0, 136790, 'qris', 'pending', NULL, NULL, '2026-01-29 17:51:13', '2026-01-29 17:51:13'),
(247, 6, 8, NULL, 'TRX-T2675A1OG6', 100000, 79725, 0, 0.00, 0, 20275, 'cash', 'paid', NULL, NULL, '2026-01-29 17:53:22', '2026-01-29 17:53:22'),
(248, 6, 8, NULL, 'TRX-M6P88YIZ40', 20000, 1000, 0, 0.00, 0, 19000, 'cash', 'paid', NULL, NULL, '2026-01-29 17:54:36', '2026-01-29 17:54:36'),
(249, 6, 8, NULL, 'TRX-89MG519U47', 50000, 3075, 0, 0.00, 0, 46925, 'cash', 'paid', NULL, NULL, '2026-01-29 18:13:52', '2026-01-29 18:13:52'),
(250, 6, 8, NULL, 'TRX-M312I874A2', 270000, 0, 0, 0.00, 0, 270000, 'qris', 'pending', NULL, NULL, '2026-01-29 18:21:27', '2026-01-29 18:21:27'),
(251, 6, 8, NULL, 'TRX-M3TFG5Y76Z', 61950, 0, 0, 0.00, 0, 61950, 'qris', 'pending', NULL, NULL, '2026-01-29 18:22:56', '2026-01-29 18:22:56'),
(252, 6, 8, NULL, 'TRX-4Y46AI2UP4', 80000, 0, 0, 0.00, 0, 80000, 'qris', 'pending', NULL, NULL, '2026-01-29 18:31:18', '2026-01-29 18:31:18'),
(253, 6, 8, NULL, 'TRX-8U03I3T6T6', 30000, 0, 0, 0.00, 0, 30000, 'cash', 'paid', NULL, NULL, '2026-01-29 18:42:20', '2026-01-29 18:42:20'),
(254, 6, 8, NULL, 'TRX-6RS5YC17DH', 50000, 28000, 0, 10.00, 2000, 22000, 'cash', 'paid', NULL, NULL, '2026-01-29 18:44:37', '2026-01-29 18:44:37'),
(255, 6, 8, NULL, 'TRX-XMS92PPX7F', 100000, 66100, 0, 0.00, 0, 33900, 'cash', 'paid', NULL, NULL, '2026-01-29 18:52:27', '2026-01-29 18:52:27'),
(256, 6, 8, NULL, 'TRX-P4HK329K1B', 50000, 0, 0, 0.00, 0, 50000, 'cash', 'paid', NULL, NULL, '2026-01-29 19:12:17', '2026-01-29 19:12:17'),
(257, 6, 8, NULL, 'TRX-11LB3B7DN4', 41050, 0, 0, 0.00, 0, 41050, 'qris', 'pending', NULL, NULL, '2026-01-29 19:18:00', '2026-01-29 19:18:00'),
(258, 6, 8, NULL, 'TRX-499R73KJN8', 22000, 0, 0, 10.00, 2000, 22000, 'qris', 'pending', NULL, NULL, '2026-01-29 19:18:14', '2026-01-29 19:18:14'),
(259, 6, 8, NULL, 'TRX-O1C3H5ECM4', 38750, 0, 0, 0.00, 0, 38750, 'qris', 'pending', NULL, NULL, '2026-01-29 19:20:55', '2026-01-29 19:20:55'),
(260, 6, 8, NULL, 'TRX-PU22834395', 209075, 0, 0, 0.00, 0, 209075, 'cash', 'paid', NULL, NULL, '2026-01-29 19:27:07', '2026-01-29 19:27:07'),
(261, 6, 8, NULL, 'TRX-OIJG030DQW', 60200, 0, 0, 0.00, 0, 60200, 'qris', 'pending', NULL, NULL, '2026-01-29 19:29:03', '2026-01-29 19:29:03'),
(262, 6, 8, NULL, 'TRX-85YS8D6285', 22000, 0, 0, 10.00, 2000, 22000, 'qris', 'pending', NULL, NULL, '2026-01-29 19:29:25', '2026-01-29 19:29:25'),
(263, 6, 8, NULL, 'TRX-0XHY0WL1D6', 200000, 11725, 0, 0.00, 0, 188275, 'cash', 'paid', NULL, NULL, '2026-01-29 19:31:59', '2026-01-29 19:31:59'),
(264, 6, 8, NULL, 'TRX-NN1PP32JOX', 45000, 0, 0, 0.00, 0, 45000, 'qris', 'pending', NULL, NULL, '2026-01-29 20:21:22', '2026-01-29 20:21:22'),
(265, 6, 8, NULL, 'TRX-Y69ZQ7HT57', 250000, 37250, 0, 0.00, 0, 212750, 'cash', 'paid', NULL, NULL, '2026-01-29 21:02:53', '2026-01-29 21:02:53'),
(266, 6, 8, NULL, 'TRX-TZ3INRWY2E', 55000, 2700, 0, 0.00, 0, 52300, 'cash', 'paid', NULL, NULL, '2026-01-29 21:08:33', '2026-01-29 21:08:33'),
(267, 6, 8, NULL, 'TRX-68E3U2PSLX', 50000, 28850, 0, 0.00, 0, 21150, 'cash', 'paid', NULL, NULL, '2026-01-29 21:12:20', '2026-01-29 21:12:20'),
(268, 6, 8, NULL, 'TRX-5851D15BF4', 148690, 0, 0, 0.00, 0, 148690, 'qris', 'pending', NULL, NULL, '2026-01-29 21:14:06', '2026-01-29 21:14:06'),
(269, 6, 8, NULL, 'TRX-245P5AF30S', 100000, 0, 0, 0.00, 0, 100000, 'qris', 'pending', NULL, NULL, '2026-01-29 21:53:41', '2026-01-29 21:53:41'),
(270, 6, 8, NULL, 'TRX-LFOTU973F7', 310000, 0, 0, 0.00, 0, 310000, 'cash', 'paid', NULL, NULL, '2026-01-29 22:32:49', '2026-01-29 22:32:49'),
(271, 6, 9, NULL, 'TRX-159KJ81P28', 120000, 0, 0, 0.00, 0, 120000, 'cash', 'paid', NULL, NULL, '2026-01-30 08:57:19', '2026-01-30 08:57:19'),
(272, 6, 9, NULL, 'TRX-TPK8AAJLA8', 80000, 0, 0, 0.00, 0, 80000, 'qris', 'pending', NULL, NULL, '2026-01-30 09:31:39', '2026-01-30 09:31:39'),
(273, 6, 9, NULL, 'TRX-W349K344A8', 25275, 0, 0, 0.00, 0, 25275, 'qris', 'pending', NULL, NULL, '2026-01-30 09:38:30', '2026-01-30 09:38:30'),
(274, 6, 9, NULL, 'TRX-U6Q0VP51ZN', 100000, 8350, 0, 0.00, 0, 91650, 'cash', 'paid', NULL, NULL, '2026-01-30 10:15:34', '2026-01-30 10:15:34'),
(275, 6, 9, NULL, 'TRX-2CR7458323', 58485, 0, 0, 0.00, 0, 58485, 'qris', 'pending', NULL, NULL, '2026-01-30 10:24:50', '2026-01-30 10:24:50'),
(276, 6, 9, NULL, 'TRX-50AK9W60IC', 210000, 0, 0, 0.00, 0, 210000, 'qris', 'pending', NULL, NULL, '2026-01-30 10:44:07', '2026-01-30 10:44:07'),
(277, 6, 9, NULL, 'TRX-X050116WJ6', 95780, 0, 0, 0.00, 0, 95780, 'qris', 'pending', NULL, NULL, '2026-01-30 11:32:40', '2026-01-30 11:32:40'),
(278, 6, 9, NULL, 'TRX-9629I44305', 105000, 0, 0, 0.00, 0, 105000, 'cash', 'paid', NULL, NULL, '2026-01-30 11:34:51', '2026-01-30 11:34:51'),
(279, 6, 9, NULL, 'TRX-45IH314C2W', 38235, 0, 0, 0.00, 0, 38235, 'qris', 'pending', NULL, NULL, '2026-01-30 11:37:37', '2026-01-30 11:37:37'),
(280, 6, 9, NULL, 'TRX-S3R9B5VU9J', 100000, 15500, 0, 0.00, 0, 84500, 'cash', 'paid', NULL, NULL, '2026-01-30 12:29:11', '2026-01-30 12:29:11'),
(281, 6, 9, NULL, 'TRX-OWM6OZD86U', 25080, 0, 0, 0.00, 0, 25080, 'qris', 'pending', NULL, NULL, '2026-01-30 13:32:19', '2026-01-30 13:32:19'),
(282, 6, 9, NULL, 'TRX-9CG5RLN86K', 270000, 0, 0, 0.00, 0, 270000, 'qris', 'pending', NULL, NULL, '2026-01-30 14:13:52', '2026-01-30 14:13:52'),
(283, 6, 9, NULL, 'TRX-BI0HX8111R', 401150, 0, 0, 0.00, 0, 401150, 'qris', 'pending', NULL, NULL, '2026-01-30 14:55:54', '2026-01-30 14:55:54'),
(284, 6, 9, NULL, 'TRX-F5046WIA6Q', 50500, 0, 0, 0.00, 0, 50500, 'qris', 'pending', NULL, NULL, '2026-01-30 14:57:37', '2026-01-30 14:57:37'),
(285, 6, 9, NULL, 'TRX-87K271M0TQ', 188000, 0, 0, 0.00, 0, 188000, 'qris', 'pending', NULL, NULL, '2026-01-30 15:01:59', '2026-01-30 15:01:59'),
(286, 6, 9, NULL, 'TRX-3PIZ46YF74', 78485, 0, 0, 0.00, 0, 78485, 'qris', 'pending', NULL, NULL, '2026-01-30 15:11:22', '2026-01-30 15:11:22'),
(287, 3, 10, NULL, 'TRX-N8C448Y77D', 60000, 16000, 0, 0.00, 0, 44000, 'cash', 'paid', NULL, NULL, '2026-01-30 15:26:19', '2026-01-30 15:26:19'),
(288, 3, 10, NULL, 'TRX-21H981Z5M0', 168000, 0, 0, 0.00, 0, 168000, 'qris', 'pending', NULL, NULL, '2026-01-30 16:39:12', '2026-01-30 16:39:12'),
(289, 3, 10, NULL, 'TRX-U701P8681G', 117325, 0, 0, 0.00, 0, 117325, 'qris', 'pending', NULL, NULL, '2026-01-30 16:46:48', '2026-01-30 16:46:48'),
(290, 3, 10, NULL, 'TRX-8P80PSF331', 50500, 15100, 0, 0.00, 0, 35400, 'cash', 'paid', NULL, NULL, '2026-01-30 16:50:40', '2026-01-30 16:50:40');

-- --------------------------------------------------------

--
-- Table structure for table `transaction_details`
--

CREATE TABLE `transaction_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `transaction_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `product_variant_id` bigint(20) UNSIGNED DEFAULT NULL,
  `variant_name` varchar(255) DEFAULT NULL,
  `qty` decimal(10,3) NOT NULL,
  `price` bigint(20) NOT NULL,
  `buy_price` decimal(15,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transaction_details`
--

INSERT INTO `transaction_details` (`id`, `transaction_id`, `product_id`, `product_variant_id`, `variant_name`, `qty`, `price`, `buy_price`, `created_at`, `updated_at`) VALUES
(1, 1, 42, NULL, NULL, 0.200, 50000, 35000.00, '2026-01-26 10:41:01', '2026-01-26 10:41:01'),
(2, 2, 85, NULL, NULL, 0.180, 30000, 21000.00, '2026-01-26 10:43:38', '2026-01-26 10:43:38'),
(3, 3, 85, NULL, NULL, 0.180, 30000, 21000.00, '2026-01-26 10:45:10', '2026-01-26 10:45:10'),
(4, 4, 58, NULL, NULL, 0.230, 60000, 45000.00, '2026-01-26 11:08:20', '2026-01-26 11:08:20'),
(5, 4, 64, NULL, NULL, 1.000, 45000, 35000.00, '2026-01-26 11:08:20', '2026-01-26 11:08:20'),
(6, 5, 58, NULL, NULL, 0.230, 60000, 45000.00, '2026-01-26 11:09:15', '2026-01-26 11:09:15'),
(7, 5, 64, NULL, NULL, 1.000, 45000, 35000.00, '2026-01-26 11:09:15', '2026-01-26 11:09:15'),
(8, 6, 85, NULL, NULL, 0.180, 30000, 21000.00, '2026-01-26 11:09:51', '2026-01-26 11:09:51'),
(9, 7, 67, NULL, NULL, 1.000, 35000, 29000.00, '2026-01-26 13:05:52', '2026-01-26 13:05:52'),
(10, 7, 81, NULL, NULL, 0.180, 40000, 35000.00, '2026-01-26 13:05:52', '2026-01-26 13:05:52'),
(11, 8, 20, NULL, NULL, 1.000, 11000, 8533.00, '2026-01-26 13:33:36', '2026-01-26 13:33:36'),
(12, 8, 82, NULL, NULL, 0.885, 45000, 37000.00, '2026-01-26 13:33:36', '2026-01-26 13:33:36'),
(13, 9, 2, NULL, NULL, 0.900, 40000, 31000.00, '2026-01-26 14:38:48', '2026-01-26 14:38:48'),
(14, 10, 78, NULL, NULL, 0.390, 48000, 38000.00, '2026-01-26 14:50:40', '2026-01-26 14:50:40'),
(15, 11, 2, NULL, NULL, 0.340, 40000, 31000.00, '2026-01-26 15:12:45', '2026-01-26 15:12:45'),
(16, 11, 81, NULL, NULL, 0.360, 40000, 35000.00, '2026-01-26 15:12:45', '2026-01-26 15:12:45'),
(17, 11, 88, NULL, NULL, 0.410, 45000, 38000.00, '2026-01-26 15:12:45', '2026-01-26 15:12:45'),
(18, 12, 2, NULL, NULL, 0.340, 40000, 31000.00, '2026-01-26 15:14:44', '2026-01-26 15:14:44'),
(19, 12, 81, NULL, NULL, 0.360, 40000, 35000.00, '2026-01-26 15:14:44', '2026-01-26 15:14:44'),
(20, 12, 88, NULL, NULL, 0.410, 45000, 38000.00, '2026-01-26 15:14:44', '2026-01-26 15:14:44'),
(21, 13, 81, NULL, NULL, 0.500, 40000, 35000.00, '2026-01-26 15:30:49', '2026-01-26 15:30:49'),
(25, 16, 91, NULL, NULL, 0.350, 40000, 30000.00, '2026-01-26 15:57:28', '2026-01-26 15:57:28'),
(27, 18, 81, NULL, NULL, 1.085, 40000, 35000.00, '2026-01-26 16:43:27', '2026-01-26 16:43:27'),
(28, 19, 90, NULL, NULL, 1.050, 25000, 20000.00, '2026-01-26 16:55:57', '2026-01-26 16:55:57'),
(29, 19, 103, NULL, NULL, 0.480, 45000, 30000.00, '2026-01-26 16:55:57', '2026-01-26 16:55:57'),
(30, 19, 117, NULL, NULL, 1.000, 10000, 8750.00, '2026-01-26 16:55:57', '2026-01-26 16:55:57'),
(31, 19, 122, NULL, NULL, 0.500, 70000, 20500.00, '2026-01-26 16:55:57', '2026-01-26 16:55:57'),
(32, 20, 67, NULL, NULL, 1.000, 35000, 29000.00, '2026-01-26 17:19:22', '2026-01-26 17:19:22'),
(33, 20, 124, NULL, NULL, 1.000, 45000, 39000.00, '2026-01-26 17:19:22', '2026-01-26 17:19:22'),
(34, 21, 52, NULL, NULL, 3.000, 15000, 9300.00, '2026-01-26 17:29:23', '2026-01-26 17:29:23'),
(35, 22, 67, NULL, NULL, 1.000, 35000, 29000.00, '2026-01-26 17:44:04', '2026-01-26 17:44:04'),
(36, 23, 42, NULL, NULL, 0.300, 50000, 35000.00, '2026-01-26 18:16:34', '2026-01-26 18:16:34'),
(37, 23, 67, NULL, NULL, 1.000, 35000, 29000.00, '2026-01-26 18:16:34', '2026-01-26 18:16:34'),
(38, 23, 78, NULL, NULL, 0.465, 48000, 38000.00, '2026-01-26 18:16:34', '2026-01-26 18:16:34'),
(39, 24, 124, NULL, NULL, 3.000, 45000, 39000.00, '2026-01-26 20:09:40', '2026-01-26 20:09:40'),
(40, 24, 127, NULL, NULL, 0.510, 35000, 25000.00, '2026-01-26 20:09:40', '2026-01-26 20:09:40'),
(41, 25, 124, NULL, NULL, 1.000, 45000, 39000.00, '2026-01-26 20:33:01', '2026-01-26 20:33:01'),
(42, 26, 22, NULL, NULL, 2.000, 13500, 10500.00, '2026-01-26 20:50:43', '2026-01-26 20:50:43'),
(43, 26, 75, NULL, NULL, 1.000, 50000, 37000.00, '2026-01-26 20:50:43', '2026-01-26 20:50:43'),
(44, 27, 103, NULL, NULL, 0.950, 45000, 30000.00, '2026-01-26 20:52:25', '2026-01-26 20:52:25'),
(45, 28, 103, NULL, NULL, 0.560, 45000, 30000.00, '2026-01-26 20:53:04', '2026-01-26 20:53:04'),
(46, 29, 46, NULL, NULL, 1.000, 35000, 26500.00, '2026-01-26 21:46:33', '2026-01-26 21:46:33'),
(47, 29, 68, NULL, NULL, 1.000, 40000, 21000.00, '2026-01-26 21:46:33', '2026-01-26 21:46:33'),
(48, 30, 11, NULL, NULL, 0.200, 53000, 43000.00, '2026-01-26 22:22:07', '2026-01-26 22:22:07'),
(49, 30, 18, NULL, NULL, 1.000, 7000, 3800.00, '2026-01-26 22:22:07', '2026-01-26 22:22:07'),
(50, 30, 103, NULL, NULL, 0.500, 45000, 30000.00, '2026-01-26 22:22:07', '2026-01-26 22:22:07'),
(51, 31, 23, NULL, NULL, 0.490, 16000, 13000.00, '2026-01-27 08:51:28', '2026-01-27 08:51:28'),
(52, 31, 82, NULL, NULL, 0.205, 45000, 37000.00, '2026-01-27 08:51:28', '2026-01-27 08:51:28'),
(53, 32, 67, NULL, NULL, 1.000, 35000, 29000.00, '2026-01-27 08:52:20', '2026-01-27 08:52:20'),
(54, 33, 20, NULL, NULL, 1.000, 11000, 8533.00, '2026-01-27 09:25:24', '2026-01-27 09:25:24'),
(55, 33, 28, NULL, NULL, 1.000, 18000, 13000.00, '2026-01-27 09:25:24', '2026-01-27 09:25:24'),
(56, 34, 85, NULL, NULL, 0.180, 30000, 21000.00, '2026-01-27 10:15:21', '2026-01-27 10:15:21'),
(57, 35, 71, NULL, NULL, 1.000, 25000, 15000.00, '2026-01-27 13:06:22', '2026-01-27 13:06:22'),
(58, 36, 52, NULL, NULL, 1.000, 15000, 9300.00, '2026-01-27 13:25:24', '2026-01-27 13:25:24'),
(59, 36, 66, NULL, NULL, 2.000, 7000, 6000.00, '2026-01-27 13:25:24', '2026-01-27 13:25:24'),
(60, 37, 124, NULL, NULL, 2.000, 45000, 39000.00, '2026-01-27 13:32:09', '2026-01-27 13:32:09'),
(61, 38, 42, NULL, NULL, 0.560, 50000, 35000.00, '2026-01-27 14:22:59', '2026-01-27 14:22:59'),
(63, 40, 81, NULL, NULL, 1.115, 40000, 35000.00, '2026-01-27 14:42:09', '2026-01-27 14:42:09'),
(64, 41, 10, NULL, NULL, 0.250, 65500, 55500.00, '2026-01-27 15:21:20', '2026-01-27 15:21:20'),
(65, 41, 40, NULL, NULL, 1.000, 24000, 19000.00, '2026-01-27 15:21:20', '2026-01-27 15:21:20'),
(66, 41, 124, NULL, NULL, 1.000, 45000, 39000.00, '2026-01-27 15:21:20', '2026-01-27 15:21:20'),
(67, 42, 47, NULL, NULL, 1.000, 25000, 15300.00, '2026-01-27 16:22:31', '2026-01-27 16:22:31'),
(68, 42, 65, NULL, NULL, 1.000, 80000, 59000.00, '2026-01-27 16:22:31', '2026-01-27 16:22:31'),
(69, 42, 67, NULL, NULL, 1.000, 35000, 29000.00, '2026-01-27 16:22:31', '2026-01-27 16:22:31'),
(70, 42, 73, NULL, NULL, 1.000, 75000, 70000.00, '2026-01-27 16:22:31', '2026-01-27 16:22:31'),
(71, 42, 106, NULL, NULL, 1.000, 80000, 70000.00, '2026-01-27 16:22:31', '2026-01-27 16:22:31'),
(72, 43, 47, NULL, NULL, 2.000, 25000, 15300.00, '2026-01-27 16:31:37', '2026-01-27 16:31:37'),
(73, 43, 65, NULL, NULL, 1.000, 80000, 59000.00, '2026-01-27 16:31:37', '2026-01-27 16:31:37'),
(74, 43, 67, NULL, NULL, 1.000, 35000, 29000.00, '2026-01-27 16:31:37', '2026-01-27 16:31:37'),
(75, 43, 73, NULL, NULL, 1.000, 75000, 70000.00, '2026-01-27 16:31:37', '2026-01-27 16:31:37'),
(76, 43, 106, NULL, NULL, 1.000, 80000, 70000.00, '2026-01-27 16:31:37', '2026-01-27 16:31:37'),
(77, 44, 23, NULL, NULL, 0.495, 16000, 13000.00, '2026-01-27 16:33:19', '2026-01-27 16:33:19'),
(78, 44, 67, NULL, NULL, 1.000, 35000, 29000.00, '2026-01-27 16:33:19', '2026-01-27 16:33:19'),
(79, 44, 84, NULL, NULL, 0.535, 30000, 23000.00, '2026-01-27 16:33:19', '2026-01-27 16:33:19'),
(80, 44, 85, NULL, NULL, 0.350, 30000, 21000.00, '2026-01-27 16:33:19', '2026-01-27 16:33:19'),
(81, 44, 89, NULL, NULL, 0.485, 40000, 31000.00, '2026-01-27 16:33:19', '2026-01-27 16:33:19'),
(82, 44, 116, NULL, NULL, 1.000, 20000, 17500.00, '2026-01-27 16:33:19', '2026-01-27 16:33:19'),
(83, 44, 119, NULL, NULL, 1.000, 3800, 1925.00, '2026-01-27 16:33:19', '2026-01-27 16:33:19'),
(84, 45, 81, NULL, NULL, 0.990, 40000, 35000.00, '2026-01-27 16:34:37', '2026-01-27 16:34:37'),
(85, 46, 124, NULL, NULL, 1.000, 45000, 39000.00, '2026-01-27 16:53:36', '2026-01-27 16:53:36'),
(86, 47, 70, NULL, NULL, 0.340, 115000, 95000.00, '2026-01-27 17:06:59', '2026-01-27 17:06:59'),
(87, 47, 106, NULL, NULL, 1.000, 80000, 70000.00, '2026-01-27 17:06:59', '2026-01-27 17:06:59'),
(88, 47, 117, NULL, NULL, 1.000, 10000, 8750.00, '2026-01-27 17:06:59', '2026-01-27 17:06:59'),
(89, 48, 27, NULL, NULL, 1.000, 7000, 4000.00, '2026-01-27 17:09:59', '2026-01-27 17:09:59'),
(90, 48, 28, NULL, NULL, 1.000, 18000, 13000.00, '2026-01-27 17:09:59', '2026-01-27 17:09:59'),
(91, 49, 3, NULL, NULL, 1.000, 15000, 12000.00, '2026-01-27 17:15:12', '2026-01-27 17:15:12'),
(92, 49, 26, NULL, NULL, 1.000, 16000, 11600.00, '2026-01-27 17:15:12', '2026-01-27 17:15:12'),
(93, 49, 83, NULL, NULL, 0.745, 45000, 35000.00, '2026-01-27 17:15:12', '2026-01-27 17:15:12'),
(94, 49, 122, NULL, NULL, 0.445, 48000, 41000.00, '2026-01-27 17:15:12', '2026-01-27 17:15:12'),
(95, 49, 168, NULL, NULL, 0.475, 35000, 25000.00, '2026-01-27 17:15:12', '2026-01-27 17:15:12'),
(96, 50, 18, NULL, NULL, 1.000, 7000, 3800.00, '2026-01-27 17:17:23', '2026-01-27 17:17:23'),
(97, 50, 74, NULL, NULL, 2.000, 15000, 12000.00, '2026-01-27 17:17:23', '2026-01-27 17:17:23'),
(98, 50, 168, NULL, NULL, 0.395, 35000, 25000.00, '2026-01-27 17:17:23', '2026-01-27 17:17:23'),
(99, 51, 65, NULL, NULL, 1.000, 80000, 59000.00, '2026-01-27 17:18:42', '2026-01-27 17:18:42'),
(100, 51, 107, NULL, NULL, 0.190, 75000, 65000.00, '2026-01-27 17:18:42', '2026-01-27 17:18:42'),
(101, 52, 5, NULL, NULL, 0.180, 52000, 41333.00, '2026-01-27 17:19:40', '2026-01-27 17:19:40'),
(102, 52, 22, NULL, NULL, 1.000, 13500, 10500.00, '2026-01-27 17:19:40', '2026-01-27 17:19:40'),
(103, 53, 168, NULL, NULL, 0.715, 35000, 25000.00, '2026-01-27 17:20:51', '2026-01-27 17:20:51'),
(104, 54, 84, NULL, NULL, 0.340, 30000, 23000.00, '2026-01-27 17:22:38', '2026-01-27 17:22:38'),
(105, 54, 168, NULL, NULL, 0.615, 35000, 25000.00, '2026-01-27 17:22:38', '2026-01-27 17:22:38'),
(106, 55, 50, NULL, NULL, 1.000, 45000, 32167.00, '2026-01-27 17:23:53', '2026-01-27 17:23:53'),
(107, 55, 103, NULL, NULL, 0.515, 45000, 30000.00, '2026-01-27 17:23:53', '2026-01-27 17:23:53'),
(108, 56, 168, NULL, NULL, 0.545, 35000, 25000.00, '2026-01-27 17:26:53', '2026-01-27 17:26:53'),
(109, 57, 170, NULL, NULL, 2.300, 29000, 23000.00, '2026-01-27 17:31:09', '2026-01-27 17:31:09'),
(110, 58, 168, NULL, NULL, 1.715, 35000, 25000.00, '2026-01-27 17:32:52', '2026-01-27 17:32:52'),
(111, 59, 48, NULL, NULL, 1.000, 35000, 30000.00, '2026-01-27 17:37:35', '2026-01-27 17:37:35'),
(112, 59, 67, NULL, NULL, 2.000, 35000, 29000.00, '2026-01-27 17:37:35', '2026-01-27 17:37:35'),
(113, 59, 83, NULL, NULL, 0.355, 45000, 35000.00, '2026-01-27 17:37:35', '2026-01-27 17:37:35'),
(114, 59, 170, NULL, NULL, 0.540, 29000, 23000.00, '2026-01-27 17:37:35', '2026-01-27 17:37:35'),
(115, 60, 24, NULL, NULL, 0.030, 95000, 80000.00, '2026-01-27 17:45:53', '2026-01-27 17:45:53'),
(116, 60, 72, NULL, NULL, 1.000, 25000, 21000.00, '2026-01-27 17:45:53', '2026-01-27 17:45:53'),
(117, 60, 170, NULL, NULL, 0.245, 29000, 23000.00, '2026-01-27 17:45:53', '2026-01-27 17:45:53'),
(118, 61, 78, NULL, NULL, 0.355, 48000, 38000.00, '2026-01-27 17:57:02', '2026-01-27 17:57:02'),
(119, 61, 168, NULL, NULL, 0.395, 35000, 25000.00, '2026-01-27 17:57:02', '2026-01-27 17:57:02'),
(120, 62, 78, NULL, NULL, 0.270, 48000, 38000.00, '2026-01-27 18:03:15', '2026-01-27 18:03:15'),
(121, 62, 81, NULL, NULL, 0.195, 40000, 35000.00, '2026-01-27 18:03:15', '2026-01-27 18:03:15'),
(122, 62, 103, NULL, NULL, 0.525, 45000, 30000.00, '2026-01-27 18:03:15', '2026-01-27 18:03:15'),
(123, 63, 171, NULL, NULL, 1.000, 18000, 13000.00, '2026-01-27 18:03:43', '2026-01-27 18:03:43'),
(124, 64, 162, NULL, NULL, 1.000, 17000, 15000.00, '2026-01-27 18:04:23', '2026-01-27 18:04:23'),
(125, 65, 166, NULL, NULL, 2.000, 20000, 15000.00, '2026-01-27 18:07:23', '2026-01-27 18:07:23'),
(126, 66, 174, NULL, NULL, 1.000, 20000, 15000.00, '2026-01-27 18:11:40', '2026-01-27 18:11:40'),
(127, 67, 19, NULL, NULL, 3.000, 11000, 8533.00, '2026-01-27 18:16:05', '2026-01-27 18:16:05'),
(128, 67, 52, NULL, NULL, 1.000, 15000, 9300.00, '2026-01-27 18:16:05', '2026-01-27 18:16:05'),
(129, 67, 65, NULL, NULL, 1.000, 80000, 59000.00, '2026-01-27 18:16:05', '2026-01-27 18:16:05'),
(130, 68, 40, NULL, NULL, 1.000, 24000, 19000.00, '2026-01-27 18:23:17', '2026-01-27 18:23:17'),
(131, 68, 65, NULL, NULL, 1.000, 80000, 59000.00, '2026-01-27 18:23:17', '2026-01-27 18:23:17'),
(132, 68, 116, NULL, NULL, 1.000, 20000, 17500.00, '2026-01-27 18:23:17', '2026-01-27 18:23:17'),
(133, 68, 170, NULL, NULL, 0.405, 29000, 23000.00, '2026-01-27 18:23:17', '2026-01-27 18:23:17'),
(134, 68, 171, NULL, NULL, 1.000, 18000, 13000.00, '2026-01-27 18:23:17', '2026-01-27 18:23:17'),
(135, 69, 67, NULL, NULL, 1.000, 35000, 29000.00, '2026-01-27 18:23:48', '2026-01-27 18:23:48'),
(136, 70, 49, NULL, NULL, 0.545, 80000, 63000.00, '2026-01-27 18:28:21', '2026-01-27 18:28:21'),
(137, 70, 51, NULL, NULL, 1.000, 40000, 33833.00, '2026-01-27 18:28:21', '2026-01-27 18:28:21'),
(138, 70, 70, NULL, NULL, 0.340, 115000, 95000.00, '2026-01-27 18:28:21', '2026-01-27 18:28:21'),
(139, 71, 64, NULL, NULL, 1.000, 45000, 35000.00, '2026-01-27 18:32:13', '2026-01-27 18:32:13'),
(140, 71, 166, NULL, NULL, 1.000, 20000, 15000.00, '2026-01-27 18:32:13', '2026-01-27 18:32:13'),
(141, 71, 170, NULL, NULL, 0.705, 29000, 23000.00, '2026-01-27 18:32:13', '2026-01-27 18:32:13'),
(142, 72, 175, NULL, NULL, 1.000, 35000, 30000.00, '2026-01-27 18:37:24', '2026-01-27 18:37:24'),
(143, 73, 164, NULL, NULL, 1.000, 20000, 15000.00, '2026-01-27 18:42:22', '2026-01-27 18:42:22'),
(144, 74, 27, NULL, NULL, 2.000, 7000, 4000.00, '2026-01-27 18:59:02', '2026-01-27 18:59:02'),
(145, 74, 124, NULL, NULL, 1.000, 45000, 39000.00, '2026-01-27 18:59:02', '2026-01-27 18:59:02'),
(146, 75, 67, NULL, NULL, 1.000, 35000, 29000.00, '2026-01-27 19:00:04', '2026-01-27 19:00:04'),
(147, 76, 124, NULL, NULL, 1.000, 45000, 39000.00, '2026-01-27 19:00:43', '2026-01-27 19:00:43'),
(148, 77, 10, NULL, NULL, 0.250, 65500, 55500.00, '2026-01-27 19:16:51', '2026-01-27 19:16:51'),
(149, 77, 15, NULL, NULL, 1.000, 16000, 13800.00, '2026-01-27 19:16:51', '2026-01-27 19:16:51'),
(150, 77, 82, NULL, NULL, 0.220, 45000, 37000.00, '2026-01-27 19:16:51', '2026-01-27 19:16:51'),
(151, 78, 48, NULL, NULL, 1.000, 35000, 30000.00, '2026-01-27 19:18:11', '2026-01-27 19:18:11'),
(152, 78, 64, NULL, NULL, 1.000, 45000, 35000.00, '2026-01-27 19:18:11', '2026-01-27 19:18:11'),
(153, 79, 48, NULL, NULL, 1.000, 35000, 30000.00, '2026-01-27 19:21:14', '2026-01-27 19:21:14'),
(154, 79, 67, NULL, NULL, 1.000, 35000, 29000.00, '2026-01-27 19:21:14', '2026-01-27 19:21:14'),
(155, 79, 71, NULL, NULL, 1.000, 25000, 15000.00, '2026-01-27 19:21:14', '2026-01-27 19:21:14'),
(156, 79, 89, NULL, NULL, 0.465, 40000, 31000.00, '2026-01-27 19:21:14', '2026-01-27 19:21:14'),
(157, 79, 170, NULL, NULL, 0.510, 29000, 23000.00, '2026-01-27 19:21:14', '2026-01-27 19:21:14'),
(158, 79, 175, NULL, NULL, 1.000, 35000, 30000.00, '2026-01-27 19:21:14', '2026-01-27 19:21:14'),
(159, 80, 175, NULL, NULL, 1.000, 35000, 30000.00, '2026-01-27 19:22:42', '2026-01-27 19:22:42'),
(160, 81, 23, NULL, NULL, 0.510, 16000, 13000.00, '2026-01-27 19:32:32', '2026-01-27 19:32:32'),
(161, 81, 65, NULL, NULL, 1.000, 80000, 59000.00, '2026-01-27 19:32:32', '2026-01-27 19:32:32'),
(162, 81, 84, NULL, NULL, 1.165, 30000, 23000.00, '2026-01-27 19:32:32', '2026-01-27 19:32:32'),
(163, 81, 85, NULL, NULL, 0.810, 30000, 21000.00, '2026-01-27 19:32:32', '2026-01-27 19:32:32'),
(164, 81, 170, NULL, NULL, 0.575, 29000, 23000.00, '2026-01-27 19:32:32', '2026-01-27 19:32:32'),
(165, 81, 175, NULL, NULL, 1.000, 35000, 30000.00, '2026-01-27 19:32:32', '2026-01-27 19:32:32'),
(166, 82, 4, NULL, NULL, 0.340, 46000, 35857.00, '2026-01-27 19:39:19', '2026-01-27 19:39:19'),
(167, 82, 65, NULL, NULL, 1.000, 80000, 59000.00, '2026-01-27 19:39:19', '2026-01-27 19:39:19'),
(168, 82, 82, NULL, NULL, 0.445, 45000, 37000.00, '2026-01-27 19:39:19', '2026-01-27 19:39:19'),
(169, 82, 84, NULL, NULL, 0.600, 30000, 23000.00, '2026-01-27 19:39:19', '2026-01-27 19:39:19'),
(170, 82, 170, NULL, NULL, 0.435, 29000, 23000.00, '2026-01-27 19:39:19', '2026-01-27 19:39:19'),
(171, 82, 174, NULL, NULL, 1.000, 20000, 15000.00, '2026-01-27 19:39:19', '2026-01-27 19:39:19'),
(172, 83, 5, NULL, NULL, 0.195, 52000, 41333.00, '2026-01-27 19:41:32', '2026-01-27 19:41:32'),
(173, 83, 66, NULL, NULL, 1.000, 7000, 6000.00, '2026-01-27 19:41:32', '2026-01-27 19:41:32'),
(174, 84, 66, NULL, NULL, 1.000, 7000, 6000.00, '2026-01-27 19:45:29', '2026-01-27 19:45:29'),
(175, 84, 116, NULL, NULL, 1.000, 20000, 17500.00, '2026-01-27 19:45:29', '2026-01-27 19:45:29'),
(176, 85, 85, NULL, NULL, 0.345, 30000, 21000.00, '2026-01-27 19:51:26', '2026-01-27 19:51:26'),
(177, 85, 88, NULL, NULL, 0.130, 45000, 38000.00, '2026-01-27 19:51:26', '2026-01-27 19:51:26'),
(178, 86, 46, NULL, NULL, 1.000, 35000, 26500.00, '2026-01-27 19:55:57', '2026-01-27 19:55:57'),
(179, 86, 162, NULL, NULL, 1.000, 17000, 15000.00, '2026-01-27 19:55:57', '2026-01-27 19:55:57'),
(180, 87, 131, NULL, NULL, 1.000, 27000, 21900.00, '2026-01-27 20:01:49', '2026-01-27 20:01:49'),
(181, 88, 52, NULL, NULL, 2.000, 15000, 9300.00, '2026-01-27 20:03:47', '2026-01-27 20:03:47'),
(182, 88, 107, NULL, NULL, 0.185, 75000, 65000.00, '2026-01-27 20:03:47', '2026-01-27 20:03:47'),
(183, 89, 131, NULL, NULL, 1.000, 27000, 21900.00, '2026-01-27 20:06:27', '2026-01-27 20:06:27'),
(184, 90, 170, NULL, NULL, 0.540, 29000, 23000.00, '2026-01-27 20:11:54', '2026-01-27 20:11:54'),
(185, 91, 51, NULL, NULL, 1.000, 40000, 33833.00, '2026-01-27 20:19:00', '2026-01-27 20:19:00'),
(186, 91, 56, NULL, NULL, 1.000, 45000, 31333.00, '2026-01-27 20:19:00', '2026-01-27 20:19:00'),
(187, 91, 60, NULL, NULL, 1.000, 60000, 51000.00, '2026-01-27 20:19:00', '2026-01-27 20:19:00'),
(188, 91, 164, NULL, NULL, 1.000, 20000, 15000.00, '2026-01-27 20:19:00', '2026-01-27 20:19:00'),
(189, 92, 48, NULL, NULL, 1.000, 35000, 30000.00, '2026-01-27 20:21:23', '2026-01-27 20:21:23'),
(190, 92, 67, NULL, NULL, 1.000, 35000, 29000.00, '2026-01-27 20:21:23', '2026-01-27 20:21:23'),
(191, 92, 84, NULL, NULL, 1.470, 30000, 23000.00, '2026-01-27 20:21:23', '2026-01-27 20:21:23'),
(192, 92, 168, NULL, NULL, 0.435, 35000, 25000.00, '2026-01-27 20:21:23', '2026-01-27 20:21:23'),
(193, 92, 171, NULL, NULL, 1.000, 18000, 13000.00, '2026-01-27 20:21:23', '2026-01-27 20:21:23'),
(194, 93, 83, NULL, NULL, 0.390, 45000, 35000.00, '2026-01-27 20:25:20', '2026-01-27 20:25:20'),
(195, 93, 168, NULL, NULL, 0.445, 35000, 25000.00, '2026-01-27 20:25:20', '2026-01-27 20:25:20'),
(196, 93, 170, NULL, NULL, 0.465, 29000, 23000.00, '2026-01-27 20:25:20', '2026-01-27 20:25:20'),
(197, 94, 81, NULL, NULL, 0.745, 40000, 35000.00, '2026-01-27 20:26:32', '2026-01-27 20:26:32'),
(198, 94, 84, NULL, NULL, 0.810, 30000, 23000.00, '2026-01-27 20:26:32', '2026-01-27 20:26:32'),
(199, 95, 52, NULL, NULL, 1.000, 15000, 9300.00, '2026-01-27 20:38:50', '2026-01-27 20:38:50'),
(200, 95, 67, NULL, NULL, 1.000, 35000, 29000.00, '2026-01-27 20:38:50', '2026-01-27 20:38:50'),
(201, 95, 72, NULL, NULL, 1.000, 25000, 21000.00, '2026-01-27 20:38:50', '2026-01-27 20:38:50'),
(202, 95, 87, NULL, NULL, 0.220, 30000, 26000.00, '2026-01-27 20:38:50', '2026-01-27 20:38:50'),
(203, 96, 26, NULL, NULL, 1.000, 16000, 11600.00, '2026-01-27 20:41:24', '2026-01-27 20:41:24'),
(204, 96, 88, NULL, NULL, 0.940, 45000, 38000.00, '2026-01-27 20:41:24', '2026-01-27 20:41:24'),
(205, 97, 42, NULL, NULL, 0.500, 50000, 35000.00, '2026-01-27 20:46:29', '2026-01-27 20:46:29'),
(206, 98, 131, NULL, NULL, 1.000, 27000, 21900.00, '2026-01-27 20:52:50', '2026-01-27 20:52:50'),
(207, 99, 103, NULL, NULL, 0.870, 45000, 30000.00, '2026-01-27 20:58:16', '2026-01-27 20:58:16'),
(208, 100, 76, NULL, NULL, 1.000, 15000, 10500.00, '2026-01-27 20:59:56', '2026-01-27 20:59:56'),
(209, 101, 166, NULL, NULL, 1.000, 20000, 15000.00, '2026-01-27 21:00:23', '2026-01-27 21:00:23'),
(210, 101, 174, NULL, NULL, 1.000, 20000, 15000.00, '2026-01-27 21:00:23', '2026-01-27 21:00:23'),
(211, 102, 67, NULL, NULL, 1.000, 35000, 29000.00, '2026-01-27 21:09:40', '2026-01-27 21:09:40'),
(212, 102, 168, NULL, NULL, 0.665, 35000, 25000.00, '2026-01-27 21:09:40', '2026-01-27 21:09:40'),
(213, 103, 40, NULL, NULL, 1.000, 24000, 19000.00, '2026-01-27 21:25:32', '2026-01-27 21:25:32'),
(214, 103, 117, NULL, NULL, 1.000, 10000, 8750.00, '2026-01-27 21:25:32', '2026-01-27 21:25:32'),
(215, 103, 177, NULL, NULL, 0.040, 19000, 11000.00, '2026-01-27 21:25:32', '2026-01-27 21:25:32'),
(216, 103, 179, NULL, NULL, 0.145, 50000, 43000.00, '2026-01-27 21:25:32', '2026-01-27 21:25:32'),
(217, 104, 19, NULL, NULL, 1.000, 11000, 8533.00, '2026-01-27 21:30:24', '2026-01-27 21:30:24'),
(218, 104, 23, NULL, NULL, 0.480, 16000, 13000.00, '2026-01-27 21:30:24', '2026-01-27 21:30:24'),
(219, 104, 66, NULL, NULL, 2.000, 7000, 6000.00, '2026-01-27 21:30:24', '2026-01-27 21:30:24'),
(220, 105, 183, NULL, NULL, 1.000, 30000, 25000.00, '2026-01-27 21:57:53', '2026-01-27 21:57:53'),
(221, 106, 42, NULL, NULL, 0.950, 50000, 35000.00, '2026-01-28 08:37:10', '2026-01-28 08:37:10'),
(222, 106, 86, NULL, NULL, 1.550, 30000, 22000.00, '2026-01-28 08:37:10', '2026-01-28 08:37:10'),
(223, 107, 67, NULL, NULL, 1.000, 35000, 29000.00, '2026-01-28 08:45:40', '2026-01-28 08:45:40'),
(224, 107, 170, NULL, NULL, 0.435, 29000, 23000.00, '2026-01-28 08:45:40', '2026-01-28 08:45:40'),
(225, 108, 105, NULL, NULL, 1.000, 30000, 25000.00, '2026-01-28 09:11:48', '2026-01-28 09:11:48'),
(226, 109, 105, NULL, NULL, 1.000, 30000, 25000.00, '2026-01-28 09:12:11', '2026-01-28 09:12:11'),
(227, 110, 182, NULL, NULL, 0.795, 35000, 24000.00, '2026-01-28 09:16:57', '2026-01-28 09:16:57'),
(236, 113, 47, NULL, NULL, 1.000, 25000, 15300.00, '2026-01-28 09:41:39', '2026-01-28 09:41:39'),
(237, 113, 52, NULL, NULL, 1.000, 15000, 9300.00, '2026-01-28 09:41:39', '2026-01-28 09:41:39'),
(238, 113, 59, NULL, NULL, 1.000, 55000, 50000.00, '2026-01-28 09:41:39', '2026-01-28 09:41:39'),
(239, 113, 62, NULL, NULL, 1.000, 40000, 30000.00, '2026-01-28 09:41:39', '2026-01-28 09:41:39'),
(240, 114, 4, NULL, NULL, 0.495, 46000, 35857.00, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(241, 114, 6, NULL, NULL, 0.420, 50000, 41571.00, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(242, 114, 16, NULL, NULL, 1.000, 12000, 9400.00, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(243, 114, 18, NULL, NULL, 2.000, 7000, 3800.00, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(244, 114, 19, NULL, NULL, 1.000, 11000, 8533.00, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(245, 114, 20, NULL, NULL, 1.000, 11000, 8533.00, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(246, 114, 127, NULL, NULL, 0.170, 67800, 56000.00, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(247, 114, 128, NULL, NULL, 0.205, 75800, 64000.00, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(248, 114, 185, NULL, NULL, 0.225, 55000, 32500.00, '2026-01-28 09:46:52', '2026-01-28 09:46:52'),
(249, 115, 23, NULL, NULL, 0.505, 16000, 13000.00, '2026-01-28 09:56:22', '2026-01-28 09:56:22'),
(250, 115, 66, NULL, NULL, 1.000, 7000, 6000.00, '2026-01-28 09:56:22', '2026-01-28 09:56:22'),
(251, 116, 23, NULL, NULL, 0.505, 16000, 13000.00, '2026-01-28 09:57:53', '2026-01-28 09:57:53'),
(252, 116, 66, NULL, NULL, 1.000, 7000, 6000.00, '2026-01-28 09:57:53', '2026-01-28 09:57:53'),
(253, 117, 170, NULL, NULL, 0.350, 29000, 23000.00, '2026-01-28 10:15:20', '2026-01-28 10:15:20'),
(254, 118, 170, NULL, NULL, 0.350, 29000, 23000.00, '2026-01-28 10:16:16', '2026-01-28 10:16:16'),
(255, 119, 55, NULL, NULL, 1.000, 25000, 19667.00, '2026-01-28 10:17:20', '2026-01-28 10:17:20'),
(256, 120, 168, NULL, NULL, 0.725, 35000, 25000.00, '2026-01-28 10:46:09', '2026-01-28 10:46:09'),
(257, 121, 168, NULL, NULL, 0.725, 35000, 25000.00, '2026-01-28 10:46:41', '2026-01-28 10:46:41'),
(258, 122, 62, NULL, NULL, 1.000, 40000, 30000.00, '2026-01-28 10:48:32', '2026-01-28 10:48:32'),
(259, 123, 62, NULL, NULL, 1.000, 40000, 30000.00, '2026-01-28 11:19:27', '2026-01-28 11:19:27'),
(260, 123, 67, NULL, NULL, 1.000, 35000, 29000.00, '2026-01-28 11:19:27', '2026-01-28 11:19:27'),
(261, 123, 103, NULL, NULL, 1.075, 45000, 30000.00, '2026-01-28 11:19:27', '2026-01-28 11:19:27'),
(262, 123, 168, NULL, NULL, 0.525, 35000, 25000.00, '2026-01-28 11:19:27', '2026-01-28 11:19:27'),
(263, 123, 182, NULL, NULL, 0.875, 35000, 24000.00, '2026-01-28 11:19:27', '2026-01-28 11:19:27'),
(264, 124, 69, NULL, NULL, 0.520, 200000, 180000.00, '2026-01-28 11:20:03', '2026-01-28 11:20:03'),
(265, 125, 55, NULL, NULL, 2.000, 25000, 19667.00, '2026-01-28 11:21:32', '2026-01-28 11:21:32'),
(266, 126, 54, NULL, NULL, 1.000, 30000, 24429.00, '2026-01-28 11:24:28', '2026-01-28 11:24:28'),
(267, 126, 68, NULL, NULL, 1.000, 40000, 21000.00, '2026-01-28 11:24:28', '2026-01-28 11:24:28'),
(268, 126, 168, NULL, NULL, 0.590, 35000, 25000.00, '2026-01-28 11:24:28', '2026-01-28 11:24:28'),
(269, 127, 168, NULL, NULL, 0.860, 35000, 25000.00, '2026-01-28 11:25:27', '2026-01-28 11:25:27'),
(272, 129, 15, NULL, NULL, 1.000, 16000, 13800.00, '2026-01-28 11:32:56', '2026-01-28 11:32:56'),
(273, 129, 26, NULL, NULL, 1.000, 16000, 11600.00, '2026-01-28 11:32:56', '2026-01-28 11:32:56'),
(277, 131, 55, NULL, NULL, 1.000, 25000, 19667.00, '2026-01-28 11:41:21', '2026-01-28 11:41:21'),
(278, 131, 81, NULL, NULL, 0.380, 40000, 35000.00, '2026-01-28 11:41:21', '2026-01-28 11:41:21'),
(279, 131, 87, NULL, NULL, 0.435, 30000, 26000.00, '2026-01-28 11:41:21', '2026-01-28 11:41:21'),
(280, 132, 48, NULL, NULL, 1.000, 35000, 30000.00, '2026-01-28 11:55:46', '2026-01-28 11:55:46'),
(281, 132, 82, NULL, NULL, 1.075, 45000, 37000.00, '2026-01-28 11:55:46', '2026-01-28 11:55:46'),
(282, 132, 87, NULL, NULL, 1.020, 30000, 26000.00, '2026-01-28 11:55:46', '2026-01-28 11:55:46'),
(283, 132, 102, NULL, NULL, 0.240, 85000, 71000.00, '2026-01-28 11:55:46', '2026-01-28 11:55:46'),
(284, 132, 177, NULL, NULL, 0.355, 19000, 11000.00, '2026-01-28 11:55:46', '2026-01-28 11:55:46'),
(285, 133, 52, NULL, NULL, 2.000, 15000, 9300.00, '2026-01-28 13:25:23', '2026-01-28 13:25:23'),
(286, 133, 170, NULL, NULL, 0.560, 29000, 23000.00, '2026-01-28 13:25:23', '2026-01-28 13:25:23'),
(287, 134, 82, NULL, NULL, 1.725, 45000, 37000.00, '2026-01-28 13:42:35', '2026-01-28 13:42:35'),
(288, 134, 106, NULL, NULL, 1.000, 80000, 70000.00, '2026-01-28 13:42:35', '2026-01-28 13:42:35'),
(289, 135, 82, NULL, NULL, 0.625, 45000, 37000.00, '2026-01-28 13:58:12', '2026-01-28 13:58:12'),
(290, 135, 84, NULL, NULL, 0.840, 30000, 23000.00, '2026-01-28 13:58:12', '2026-01-28 13:58:12'),
(291, 135, 104, NULL, NULL, 0.490, 40000, 35000.00, '2026-01-28 13:58:12', '2026-01-28 13:58:12'),
(292, 135, 168, NULL, NULL, 1.325, 35000, 25000.00, '2026-01-28 13:58:12', '2026-01-28 13:58:12'),
(293, 136, 168, NULL, NULL, 1.075, 35000, 25000.00, '2026-01-28 14:13:33', '2026-01-28 14:13:33'),
(294, 137, 67, NULL, NULL, 1.000, 35000, 29000.00, '2026-01-28 14:19:43', '2026-01-28 14:19:43'),
(295, 138, 22, NULL, NULL, 1.000, 13500, 10500.00, '2026-01-28 15:09:39', '2026-01-28 15:09:39'),
(296, 138, 64, NULL, NULL, 1.000, 45000, 35000.00, '2026-01-28 15:09:39', '2026-01-28 15:09:39'),
(297, 138, 134, NULL, NULL, 1.000, 23000, 18700.00, '2026-01-28 15:09:39', '2026-01-28 15:09:39'),
(298, 138, 182, NULL, NULL, 1.500, 35000, 24000.00, '2026-01-28 15:09:39', '2026-01-28 15:09:39'),
(299, 139, 58, NULL, NULL, 0.220, 60000, 45000.00, '2026-01-28 15:12:21', '2026-01-28 15:12:21'),
(300, 139, 168, NULL, NULL, 0.380, 35000, 25000.00, '2026-01-28 15:12:21', '2026-01-28 15:12:21'),
(301, 140, 52, NULL, NULL, 1.000, 15000, 9300.00, '2026-01-28 15:14:51', '2026-01-28 15:14:51'),
(302, 140, 67, NULL, NULL, 1.000, 35000, 29000.00, '2026-01-28 15:14:51', '2026-01-28 15:14:51'),
(303, 141, 107, NULL, NULL, 0.785, 75000, 65000.00, '2026-01-28 15:27:21', '2026-01-28 15:27:21'),
(304, 142, 49, NULL, NULL, 0.540, 80000, 63000.00, '2026-01-28 15:45:41', '2026-01-28 15:45:41'),
(305, 142, 80, NULL, NULL, 1.000, 60000, 46000.00, '2026-01-28 15:45:41', '2026-01-28 15:45:41'),
(306, 143, 183, NULL, NULL, 1.000, 30000, 25000.00, '2026-01-28 15:47:19', '2026-01-28 15:47:19'),
(309, 145, 87, NULL, NULL, 0.995, 30000, 26000.00, '2026-01-28 15:58:17', '2026-01-28 15:58:17'),
(310, 145, 168, NULL, NULL, 1.020, 35000, 25000.00, '2026-01-28 15:58:17', '2026-01-28 15:58:17'),
(311, 146, 81, NULL, NULL, 0.350, 40000, 35000.00, '2026-01-28 16:41:14', '2026-01-28 16:41:14'),
(312, 146, 83, NULL, NULL, 0.375, 45000, 35000.00, '2026-01-28 16:41:14', '2026-01-28 16:41:14'),
(313, 147, 168, NULL, NULL, 1.000, 35000, 25000.00, '2026-01-28 16:53:01', '2026-01-28 16:53:01'),
(314, 148, 69, NULL, NULL, 0.170, 200000, 180000.00, '2026-01-28 16:56:08', '2026-01-28 16:56:08'),
(315, 148, 107, NULL, NULL, 0.195, 75000, 65000.00, '2026-01-28 16:56:08', '2026-01-28 16:56:08'),
(316, 148, 162, NULL, NULL, 1.000, 17000, 15000.00, '2026-01-28 16:56:08', '2026-01-28 16:56:08'),
(317, 148, 166, NULL, NULL, 1.000, 20000, 15000.00, '2026-01-28 16:56:08', '2026-01-28 16:56:08'),
(318, 148, 175, NULL, NULL, 1.000, 35000, 30000.00, '2026-01-28 16:56:08', '2026-01-28 16:56:08'),
(319, 149, 42, NULL, NULL, 0.500, 50000, 35000.00, '2026-01-28 17:04:22', '2026-01-28 17:04:22'),
(320, 149, 78, NULL, NULL, 0.870, 48000, 38000.00, '2026-01-28 17:04:22', '2026-01-28 17:04:22'),
(321, 149, 104, NULL, NULL, 0.395, 40000, 35000.00, '2026-01-28 17:04:22', '2026-01-28 17:04:22'),
(322, 149, 124, NULL, NULL, 1.000, 45000, 39000.00, '2026-01-28 17:04:22', '2026-01-28 17:04:22'),
(323, 149, 170, NULL, NULL, 0.900, 29000, 23000.00, '2026-01-28 17:04:22', '2026-01-28 17:04:22'),
(324, 149, 177, NULL, NULL, 0.200, 19000, 11000.00, '2026-01-28 17:04:22', '2026-01-28 17:04:22'),
(325, 149, 178, NULL, NULL, 0.095, 65000, 56000.00, '2026-01-28 17:04:22', '2026-01-28 17:04:22'),
(326, 150, 90, NULL, NULL, 0.420, 25000, 20000.00, '2026-01-28 17:11:15', '2026-01-28 17:11:15'),
(327, 150, 170, NULL, NULL, 0.380, 29000, 23000.00, '2026-01-28 17:11:15', '2026-01-28 17:11:15'),
(328, 151, 174, NULL, NULL, 1.000, 20000, 15000.00, '2026-01-28 17:18:15', '2026-01-28 17:18:15'),
(329, 152, 166, NULL, NULL, 1.000, 20000, 15000.00, '2026-01-28 17:19:08', '2026-01-28 17:19:08'),
(330, 153, 166, NULL, NULL, 1.000, 20000, 15000.00, '2026-01-28 17:22:16', '2026-01-28 17:22:16'),
(331, 153, 170, NULL, NULL, 0.520, 29000, 23000.00, '2026-01-28 17:22:16', '2026-01-28 17:22:16'),
(332, 154, 83, NULL, NULL, 0.775, 45000, 35000.00, '2026-01-28 17:23:13', '2026-01-28 17:23:13'),
(333, 154, 168, NULL, NULL, 0.710, 35000, 25000.00, '2026-01-28 17:23:13', '2026-01-28 17:23:13'),
(334, 155, 168, NULL, NULL, 1.020, 35000, 25000.00, '2026-01-28 17:23:47', '2026-01-28 17:23:47'),
(335, 156, 168, NULL, NULL, 1.185, 35000, 25000.00, '2026-01-28 17:24:36', '2026-01-28 17:24:36'),
(336, 157, 20, NULL, NULL, 2.000, 11000, 8533.00, '2026-01-28 17:26:10', '2026-01-28 17:26:10'),
(337, 157, 23, NULL, NULL, 0.495, 16000, 13000.00, '2026-01-28 17:26:10', '2026-01-28 17:26:10'),
(338, 157, 85, NULL, NULL, 0.895, 30000, 21000.00, '2026-01-28 17:26:10', '2026-01-28 17:26:10'),
(339, 158, 122, NULL, NULL, 0.515, 48000, 41000.00, '2026-01-28 17:27:09', '2026-01-28 17:27:09'),
(340, 158, 124, NULL, NULL, 1.000, 45000, 39000.00, '2026-01-28 17:27:09', '2026-01-28 17:27:09'),
(341, 159, 18, NULL, NULL, 1.000, 7000, 3800.00, '2026-01-28 17:30:34', '2026-01-28 17:30:34'),
(342, 159, 23, NULL, NULL, 0.505, 16000, 13000.00, '2026-01-28 17:30:34', '2026-01-28 17:30:34'),
(343, 159, 26, NULL, NULL, 1.000, 16000, 11600.00, '2026-01-28 17:30:34', '2026-01-28 17:30:34'),
(344, 159, 179, NULL, NULL, 0.245, 50000, 43000.00, '2026-01-28 17:30:34', '2026-01-28 17:30:34'),
(345, 159, 188, NULL, NULL, 0.255, 38000, 28000.00, '2026-01-28 17:30:34', '2026-01-28 17:30:34'),
(346, 160, 27, NULL, NULL, 1.000, 7000, 4000.00, '2026-01-28 17:31:02', '2026-01-28 17:31:02'),
(347, 160, 175, NULL, NULL, 1.000, 35000, 30000.00, '2026-01-28 17:31:02', '2026-01-28 17:31:02'),
(348, 161, 182, NULL, NULL, 0.975, 35000, 24000.00, '2026-01-28 17:33:26', '2026-01-28 17:33:26'),
(349, 162, 168, NULL, NULL, 1.025, 35000, 25000.00, '2026-01-28 17:34:23', '2026-01-28 17:34:23'),
(350, 163, 75, NULL, NULL, 1.000, 50000, 37000.00, '2026-01-28 17:38:01', '2026-01-28 17:38:01'),
(351, 163, 103, NULL, NULL, 0.445, 45000, 30000.00, '2026-01-28 17:38:01', '2026-01-28 17:38:01'),
(352, 164, 83, NULL, NULL, 0.690, 45000, 35000.00, '2026-01-28 17:38:29', '2026-01-28 17:38:29'),
(353, 165, 65, NULL, NULL, 1.000, 80000, 59000.00, '2026-01-28 17:41:18', '2026-01-28 17:41:18'),
(354, 165, 83, NULL, NULL, 1.195, 45000, 35000.00, '2026-01-28 17:41:18', '2026-01-28 17:41:18'),
(355, 166, 14, NULL, NULL, 1.000, 10500, 8250.00, '2026-01-28 17:52:37', '2026-01-28 17:52:37'),
(356, 166, 103, NULL, NULL, 1.345, 45000, 30000.00, '2026-01-28 17:52:37', '2026-01-28 17:52:37'),
(357, 167, 82, NULL, NULL, 0.240, 45000, 37000.00, '2026-01-28 18:07:48', '2026-01-28 18:07:48'),
(358, 167, 83, NULL, NULL, 0.360, 45000, 35000.00, '2026-01-28 18:07:48', '2026-01-28 18:07:48'),
(359, 167, 89, NULL, NULL, 0.240, 40000, 31000.00, '2026-01-28 18:07:48', '2026-01-28 18:07:48'),
(360, 167, 106, NULL, NULL, 1.000, 80000, 70000.00, '2026-01-28 18:07:48', '2026-01-28 18:07:48'),
(361, 167, 171, NULL, NULL, 1.000, 18000, 13000.00, '2026-01-28 18:07:48', '2026-01-28 18:07:48'),
(362, 168, 169, NULL, NULL, 1.000, 35000, 25000.00, '2026-01-28 18:08:11', '2026-01-28 18:08:11'),
(363, 169, 81, NULL, NULL, 0.515, 40000, 35000.00, '2026-01-28 18:29:46', '2026-01-28 18:29:46'),
(364, 169, 170, NULL, NULL, 0.330, 29000, 23000.00, '2026-01-28 18:29:46', '2026-01-28 18:29:46'),
(365, 170, 6, NULL, NULL, 0.435, 50000, 41571.00, '2026-01-28 18:44:03', '2026-01-28 18:44:03'),
(366, 170, 17, NULL, NULL, 1.000, 9750, 7250.00, '2026-01-28 18:44:03', '2026-01-28 18:44:03'),
(367, 170, 119, NULL, NULL, 1.000, 3800, 1925.00, '2026-01-28 18:44:03', '2026-01-28 18:44:03'),
(368, 170, 177, NULL, NULL, 0.410, 19000, 11000.00, '2026-01-28 18:44:03', '2026-01-28 18:44:03'),
(369, 170, 180, NULL, NULL, 1.070, 13000, 8000.00, '2026-01-28 18:44:03', '2026-01-28 18:44:03'),
(370, 171, 67, NULL, NULL, 1.000, 30000, 29000.00, '2026-01-28 19:10:29', '2026-01-28 19:10:29'),
(371, 171, 90, NULL, NULL, 0.405, 25000, 20000.00, '2026-01-28 19:10:29', '2026-01-28 19:10:29'),
(372, 172, 17, NULL, NULL, 1.000, 9750, 7250.00, '2026-01-28 19:15:48', '2026-01-28 19:15:48'),
(373, 172, 27, NULL, NULL, 2.000, 7000, 4000.00, '2026-01-28 19:15:48', '2026-01-28 19:15:48'),
(374, 172, 124, NULL, NULL, 1.000, 45000, 39000.00, '2026-01-28 19:15:48', '2026-01-28 19:15:48'),
(375, 172, 179, NULL, NULL, 0.145, 50000, 43000.00, '2026-01-28 19:15:48', '2026-01-28 19:15:48'),
(376, 173, 68, NULL, NULL, 1.000, 40000, 21000.00, '2026-01-28 19:16:28', '2026-01-28 19:16:28'),
(377, 174, 42, NULL, NULL, 0.500, 50000, 35000.00, '2026-01-28 19:17:59', '2026-01-28 19:17:59'),
(378, 174, 67, NULL, NULL, 1.000, 30000, 29000.00, '2026-01-28 19:17:59', '2026-01-28 19:17:59'),
(379, 174, 168, NULL, NULL, 1.205, 35000, 25000.00, '2026-01-28 19:17:59', '2026-01-28 19:17:59'),
(380, 175, 168, NULL, NULL, 0.695, 35000, 25000.00, '2026-01-28 19:29:23', '2026-01-28 19:29:23'),
(381, 175, 170, NULL, NULL, 0.275, 29000, 23000.00, '2026-01-28 19:29:23', '2026-01-28 19:29:23'),
(382, 176, 42, NULL, NULL, 0.500, 50000, 35000.00, '2026-01-28 19:34:07', '2026-01-28 19:34:07'),
(383, 177, 191, NULL, NULL, 0.200, 75000, 61000.00, '2026-01-28 19:35:53', '2026-01-28 19:35:53'),
(384, 178, 20, NULL, NULL, 1.000, 11000, 8533.00, '2026-01-28 19:49:33', '2026-01-28 19:49:33'),
(385, 178, 22, NULL, NULL, 1.000, 13500, 10500.00, '2026-01-28 19:49:33', '2026-01-28 19:49:33'),
(386, 178, 182, NULL, NULL, 0.650, 35000, 24000.00, '2026-01-28 19:49:33', '2026-01-28 19:49:33'),
(387, 179, 52, NULL, NULL, 2.000, 15000, 9300.00, '2026-01-28 19:50:22', '2026-01-28 19:50:22'),
(388, 179, 171, NULL, NULL, 1.000, 18000, 13000.00, '2026-01-28 19:50:22', '2026-01-28 19:50:22'),
(389, 180, 81, NULL, NULL, 0.760, 40000, 35000.00, '2026-01-28 19:52:13', '2026-01-28 19:52:13'),
(390, 180, 170, NULL, NULL, 0.600, 29000, 23000.00, '2026-01-28 19:52:13', '2026-01-28 19:52:13'),
(391, 181, 126, NULL, NULL, 0.715, 62500, 51000.00, '2026-01-28 19:55:08', '2026-01-28 19:55:08'),
(392, 181, 131, NULL, NULL, 1.000, 27000, 21900.00, '2026-01-28 19:55:08', '2026-01-28 19:55:08'),
(393, 182, 23, NULL, NULL, 0.515, 16000, 13000.00, '2026-01-28 20:01:55', '2026-01-28 20:01:55'),
(394, 182, 171, NULL, NULL, 1.000, 18000, 13000.00, '2026-01-28 20:01:55', '2026-01-28 20:01:55'),
(395, 182, 177, NULL, NULL, 0.280, 19000, 11000.00, '2026-01-28 20:01:55', '2026-01-28 20:01:55'),
(396, 183, 77, NULL, NULL, 1.000, 30000, 25000.00, '2026-01-28 20:02:57', '2026-01-28 20:02:57'),
(397, 184, 85, NULL, NULL, 0.975, 30000, 21000.00, '2026-01-28 20:11:26', '2026-01-28 20:11:26'),
(398, 185, 6, NULL, NULL, 0.555, 50000, 41571.00, '2026-01-28 20:17:11', '2026-01-28 20:17:11'),
(399, 185, 180, NULL, NULL, 0.990, 13000, 8000.00, '2026-01-28 20:17:11', '2026-01-28 20:17:11'),
(400, 186, 178, NULL, NULL, 0.070, 65000, 56000.00, '2026-01-28 20:19:33', '2026-01-28 20:19:33'),
(401, 187, 15, NULL, NULL, 1.000, 16000, 13800.00, '2026-01-28 20:20:03', '2026-01-28 20:20:03'),
(402, 188, 15, NULL, NULL, 2.000, 16000, 13800.00, '2026-01-28 20:22:29', '2026-01-28 20:22:29'),
(403, 189, 176, NULL, NULL, 0.895, 48000, 39000.00, '2026-01-28 20:23:51', '2026-01-28 20:23:51'),
(404, 190, 85, NULL, NULL, 0.630, 30000, 21000.00, '2026-01-28 20:28:45', '2026-01-28 20:28:45'),
(405, 190, 178, NULL, NULL, 0.100, 65000, 56000.00, '2026-01-28 20:28:45', '2026-01-28 20:28:45'),
(406, 190, 179, NULL, NULL, 0.245, 50000, 43000.00, '2026-01-28 20:28:45', '2026-01-28 20:28:45'),
(407, 190, 182, NULL, NULL, 0.315, 35000, 24000.00, '2026-01-28 20:28:45', '2026-01-28 20:28:45'),
(408, 191, 52, NULL, NULL, 1.000, 15000, 9300.00, '2026-01-28 20:34:51', '2026-01-28 20:34:51'),
(409, 192, 67, NULL, NULL, 1.000, 30000, 29000.00, '2026-01-28 20:42:11', '2026-01-28 20:42:11'),
(410, 192, 124, NULL, NULL, 2.000, 45000, 39000.00, '2026-01-28 20:42:11', '2026-01-28 20:42:11'),
(411, 193, 82, NULL, NULL, 0.405, 45000, 37000.00, '2026-01-28 20:49:06', '2026-01-28 20:49:06'),
(412, 193, 84, NULL, NULL, 0.445, 30000, 23000.00, '2026-01-28 20:49:06', '2026-01-28 20:49:06'),
(413, 193, 89, NULL, NULL, 0.465, 40000, 31000.00, '2026-01-28 20:49:06', '2026-01-28 20:49:06'),
(414, 194, 18, NULL, NULL, 2.000, 7000, 3800.00, '2026-01-28 20:51:24', '2026-01-28 20:51:24'),
(415, 194, 27, NULL, NULL, 1.000, 7000, 4000.00, '2026-01-28 20:51:24', '2026-01-28 20:51:24'),
(416, 194, 122, NULL, NULL, 0.525, 48000, 41000.00, '2026-01-28 20:51:24', '2026-01-28 20:51:24'),
(417, 195, 161, NULL, NULL, 1.000, 22000, 18000.00, '2026-01-28 21:00:56', '2026-01-28 21:00:56'),
(418, 196, 164, NULL, NULL, 1.000, 15000, 15000.00, '2026-01-28 21:04:12', '2026-01-28 21:04:12'),
(419, 197, 69, NULL, NULL, 0.170, 200000, 180000.00, '2026-01-28 21:06:10', '2026-01-28 21:06:10'),
(420, 197, 70, NULL, NULL, 0.330, 115000, 95000.00, '2026-01-28 21:06:10', '2026-01-28 21:06:10'),
(421, 198, 58, NULL, NULL, 0.530, 60000, 45000.00, '2026-01-28 21:17:10', '2026-01-28 21:17:10'),
(422, 198, 64, NULL, NULL, 1.000, 45000, 35000.00, '2026-01-28 21:17:10', '2026-01-28 21:17:10'),
(423, 198, 88, NULL, NULL, 0.545, 45000, 38000.00, '2026-01-28 21:17:10', '2026-01-28 21:17:10'),
(424, 198, 166, NULL, NULL, 1.000, 20000, 15000.00, '2026-01-28 21:17:10', '2026-01-28 21:17:10'),
(425, 198, 182, NULL, NULL, 0.875, 35000, 24000.00, '2026-01-28 21:17:10', '2026-01-28 21:17:10'),
(426, 199, 55, NULL, NULL, 1.000, 25000, 19667.00, '2026-01-28 21:18:40', '2026-01-28 21:18:40'),
(427, 200, 17, NULL, NULL, 1.000, 10000, 7250.00, '2026-01-28 21:30:07', '2026-01-28 21:30:07'),
(428, 200, 67, NULL, NULL, 1.000, 30000, 29000.00, '2026-01-28 21:30:07', '2026-01-28 21:30:07'),
(429, 200, 84, NULL, NULL, 1.245, 30000, 23000.00, '2026-01-28 21:30:07', '2026-01-28 21:30:07'),
(430, 200, 168, NULL, NULL, 1.040, 35000, 25000.00, '2026-01-28 21:30:07', '2026-01-28 21:30:07'),
(431, 201, 8, NULL, NULL, 0.175, 55000, 47000.00, '2026-01-28 21:31:26', '2026-01-28 21:31:26'),
(432, 202, 133, NULL, NULL, 1.000, 27000, 21900.00, '2026-01-28 22:04:11', '2026-01-28 22:04:11'),
(433, 202, 160, NULL, NULL, 1.000, 22000, 18000.00, '2026-01-28 22:04:11', '2026-01-28 22:04:11'),
(434, 203, 72, NULL, NULL, 2.000, 25000, 21000.00, '2026-01-28 22:07:29', '2026-01-28 22:07:29'),
(435, 204, 127, NULL, NULL, 1.035, 67800, 56000.00, '2026-01-29 08:59:19', '2026-01-29 08:59:19'),
(436, 205, 4, NULL, NULL, 2.200, 46000, 35857.00, '2026-01-29 09:16:10', '2026-01-29 09:16:10'),
(437, 205, 127, NULL, NULL, 1.015, 67800, 56000.00, '2026-01-29 09:16:10', '2026-01-29 09:16:10'),
(438, 206, 52, NULL, NULL, 2.000, 15000, 9300.00, '2026-01-29 09:48:49', '2026-01-29 09:48:49'),
(439, 206, 67, NULL, NULL, 1.000, 30000, 29000.00, '2026-01-29 09:48:49', '2026-01-29 09:48:49'),
(440, 207, 23, NULL, NULL, 0.215, 16000, 13000.00, '2026-01-29 10:52:52', '2026-01-29 10:52:52'),
(441, 207, 27, NULL, NULL, 1.000, 7000, 4000.00, '2026-01-29 10:52:52', '2026-01-29 10:52:52'),
(442, 207, 29, NULL, NULL, 1.000, 18000, 13000.00, '2026-01-29 10:52:52', '2026-01-29 10:52:52'),
(443, 207, 122, NULL, NULL, 0.420, 48000, 41000.00, '2026-01-29 10:52:52', '2026-01-29 10:52:52'),
(444, 207, 127, NULL, NULL, 0.140, 67800, 56000.00, '2026-01-29 10:52:52', '2026-01-29 10:52:52'),
(445, 207, 180, NULL, NULL, 0.550, 13000, 8000.00, '2026-01-29 10:52:52', '2026-01-29 10:52:52'),
(446, 208, 85, NULL, NULL, 1.050, 30000, 21000.00, '2026-01-29 11:11:20', '2026-01-29 11:11:20'),
(447, 208, 168, NULL, NULL, 2.000, 35000, 25000.00, '2026-01-29 11:11:20', '2026-01-29 11:11:20'),
(448, 209, 42, NULL, NULL, 1.105, 50000, 35000.00, '2026-01-29 11:35:43', '2026-01-29 11:35:43'),
(449, 209, 52, NULL, NULL, 4.000, 15000, 9300.00, '2026-01-29 11:35:43', '2026-01-29 11:35:43'),
(450, 209, 67, NULL, NULL, 1.000, 30000, 29000.00, '2026-01-29 11:35:43', '2026-01-29 11:35:43'),
(451, 210, 67, NULL, NULL, 1.000, 30000, 29000.00, '2026-01-29 11:41:59', '2026-01-29 11:41:59'),
(452, 210, 84, NULL, NULL, 0.275, 30000, 23000.00, '2026-01-29 11:41:59', '2026-01-29 11:41:59'),
(453, 210, 89, NULL, NULL, 0.495, 40000, 31000.00, '2026-01-29 11:41:59', '2026-01-29 11:41:59'),
(454, 211, 50, NULL, NULL, 1.000, 45000, 32167.00, '2026-01-29 12:05:06', '2026-01-29 12:05:06'),
(455, 211, 85, NULL, NULL, 0.530, 30000, 21000.00, '2026-01-29 12:05:06', '2026-01-29 12:05:06'),
(456, 212, 67, NULL, NULL, 1.000, 30000, 29000.00, '2026-01-29 12:08:03', '2026-01-29 12:08:03'),
(457, 212, 168, NULL, NULL, 0.710, 35000, 25000.00, '2026-01-29 12:08:03', '2026-01-29 12:08:03'),
(458, 212, 171, NULL, NULL, 1.000, 18000, 13000.00, '2026-01-29 12:08:03', '2026-01-29 12:08:03'),
(459, 213, 124, NULL, NULL, 1.000, 45000, 39000.00, '2026-01-29 12:09:17', '2026-01-29 12:09:17'),
(460, 214, 7, NULL, NULL, 0.765, 48000, 38000.00, '2026-01-29 12:11:57', '2026-01-29 12:11:57'),
(461, 214, 23, NULL, NULL, 1.020, 16000, 13000.00, '2026-01-29 12:11:57', '2026-01-29 12:11:57'),
(462, 214, 84, NULL, NULL, 0.465, 30000, 23000.00, '2026-01-29 12:11:57', '2026-01-29 12:11:57'),
(463, 214, 168, NULL, NULL, 0.435, 35000, 25000.00, '2026-01-29 12:11:57', '2026-01-29 12:11:57'),
(464, 215, 15, NULL, NULL, 1.000, 16000, 13800.00, '2026-01-29 12:13:22', '2026-01-29 12:13:22'),
(465, 215, 16, NULL, NULL, 2.000, 12000, 9400.00, '2026-01-29 12:13:22', '2026-01-29 12:13:22'),
(466, 215, 168, NULL, NULL, 0.525, 35000, 25000.00, '2026-01-29 12:13:22', '2026-01-29 12:13:22'),
(467, 216, 50, NULL, NULL, 1.000, 45000, 32167.00, '2026-01-29 12:15:35', '2026-01-29 12:15:35'),
(468, 216, 69, NULL, NULL, 0.180, 200000, 180000.00, '2026-01-29 12:15:35', '2026-01-29 12:15:35'),
(469, 216, 175, NULL, NULL, 1.000, 35000, 30000.00, '2026-01-29 12:15:35', '2026-01-29 12:15:35'),
(470, 217, 67, NULL, NULL, 1.000, 30000, 29000.00, '2026-01-29 12:17:52', '2026-01-29 12:17:52'),
(471, 217, 81, NULL, NULL, 0.175, 40000, 35000.00, '2026-01-29 12:17:52', '2026-01-29 12:17:52'),
(472, 217, 90, NULL, NULL, 0.220, 25000, 20000.00, '2026-01-29 12:17:52', '2026-01-29 12:17:52'),
(473, 217, 124, NULL, NULL, 1.000, 45000, 39000.00, '2026-01-29 12:17:52', '2026-01-29 12:17:52'),
(474, 218, 40, NULL, NULL, 1.000, 24000, 19000.00, '2026-01-29 12:47:39', '2026-01-29 12:47:39'),
(475, 218, 103, NULL, NULL, 0.670, 45000, 30000.00, '2026-01-29 12:47:39', '2026-01-29 12:47:39'),
(478, 220, 23, NULL, NULL, 0.505, 16000, 13000.00, '2026-01-29 13:42:32', '2026-01-29 13:42:32'),
(479, 220, 27, NULL, NULL, 1.000, 7000, 4000.00, '2026-01-29 13:42:32', '2026-01-29 13:42:32'),
(480, 221, 26, NULL, NULL, 1.000, 16000, 11600.00, '2026-01-29 13:44:12', '2026-01-29 13:44:12'),
(481, 221, 197, NULL, NULL, 0.520, 77000, 63000.00, '2026-01-29 13:44:12', '2026-01-29 13:44:12'),
(482, 222, 20, NULL, NULL, 1.000, 11000, 8533.00, '2026-01-29 13:45:44', '2026-01-29 13:45:44'),
(483, 222, 124, NULL, NULL, 1.000, 45000, 39000.00, '2026-01-29 13:45:44', '2026-01-29 13:45:44'),
(484, 222, 170, NULL, NULL, 0.905, 29000, 20500.00, '2026-01-29 13:45:44', '2026-01-29 13:45:44'),
(485, 223, 184, NULL, NULL, 1.000, 29000, 25000.00, '2026-01-29 13:51:20', '2026-01-29 13:51:20'),
(486, 223, 198, NULL, NULL, 0.218, 48000, 35000.00, '2026-01-29 13:51:20', '2026-01-29 13:51:20'),
(487, 224, 52, NULL, NULL, 1.000, 15000, 9300.00, '2026-01-29 13:54:27', '2026-01-29 13:54:27'),
(488, 224, 61, NULL, NULL, 1.000, 25000, 15000.00, '2026-01-29 13:54:27', '2026-01-29 13:54:27'),
(489, 224, 80, NULL, NULL, 1.000, 60000, 46000.00, '2026-01-29 13:54:27', '2026-01-29 13:54:27'),
(490, 225, 126, NULL, NULL, 0.624, 62500, 51000.00, '2026-01-29 13:55:38', '2026-01-29 13:55:38'),
(491, 225, 193, NULL, NULL, 1.000, 100000, 84000.00, '2026-01-29 13:55:38', '2026-01-29 13:55:38'),
(492, 226, 4, NULL, NULL, 0.250, 46000, 35857.00, '2026-01-29 14:21:50', '2026-01-29 14:21:50'),
(493, 226, 15, NULL, NULL, 1.000, 16000, 13800.00, '2026-01-29 14:21:50', '2026-01-29 14:21:50'),
(494, 226, 47, NULL, NULL, 1.000, 25000, 15300.00, '2026-01-29 14:21:50', '2026-01-29 14:21:50'),
(495, 226, 49, NULL, NULL, 0.110, 80000, 63000.00, '2026-01-29 14:21:50', '2026-01-29 14:21:50'),
(496, 226, 52, NULL, NULL, 1.000, 15000, 9300.00, '2026-01-29 14:21:50', '2026-01-29 14:21:50'),
(497, 227, 67, NULL, NULL, 1.000, 30000, 29000.00, '2026-01-29 15:00:39', '2026-01-29 15:00:39'),
(498, 227, 81, NULL, NULL, 0.905, 40000, 35000.00, '2026-01-29 15:00:39', '2026-01-29 15:00:39'),
(499, 227, 168, NULL, NULL, 0.685, 35000, 25000.00, '2026-01-29 15:00:39', '2026-01-29 15:00:39'),
(500, 228, 28, NULL, NULL, 1.000, 18000, 13000.00, '2026-01-29 15:04:50', '2026-01-29 15:04:50'),
(501, 228, 51, NULL, NULL, 2.000, 40000, 33833.00, '2026-01-29 15:04:50', '2026-01-29 15:04:50'),
(502, 228, 195, NULL, NULL, 0.960, 39000, 28000.00, '2026-01-29 15:04:50', '2026-01-29 15:04:50'),
(503, 229, 4, NULL, NULL, 0.350, 46000, 35857.00, '2026-01-29 15:13:18', '2026-01-29 15:13:18'),
(504, 229, 69, NULL, NULL, 0.170, 200000, 180000.00, '2026-01-29 15:13:18', '2026-01-29 15:13:18'),
(505, 229, 72, NULL, NULL, 1.000, 25000, 21000.00, '2026-01-29 15:13:18', '2026-01-29 15:13:18'),
(506, 229, 107, NULL, NULL, 0.105, 75000, 65000.00, '2026-01-29 15:13:18', '2026-01-29 15:13:18'),
(507, 229, 170, NULL, NULL, 0.720, 29000, 20500.00, '2026-01-29 15:13:18', '2026-01-29 15:13:18'),
(508, 229, 193, NULL, NULL, 1.000, 100000, 84000.00, '2026-01-29 15:13:18', '2026-01-29 15:13:18'),
(509, 230, 14, NULL, NULL, 1.000, 10500, 8250.00, '2026-01-29 15:14:46', '2026-01-29 15:14:46'),
(510, 230, 18, NULL, NULL, 1.000, 7000, 3800.00, '2026-01-29 15:14:46', '2026-01-29 15:14:46'),
(511, 230, 26, NULL, NULL, 1.000, 16000, 11600.00, '2026-01-29 15:14:46', '2026-01-29 15:14:46'),
(512, 231, 170, NULL, NULL, 1.470, 29000, 20500.00, '2026-01-29 15:19:57', '2026-01-29 15:19:57'),
(513, 232, 61, NULL, NULL, 1.000, 25000, 15000.00, '2026-01-29 16:08:48', '2026-01-29 16:08:48'),
(514, 232, 82, NULL, NULL, 0.655, 45000, 37000.00, '2026-01-29 16:08:48', '2026-01-29 16:08:48'),
(515, 232, 83, NULL, NULL, 0.725, 45000, 35000.00, '2026-01-29 16:08:48', '2026-01-29 16:08:48'),
(516, 232, 85, NULL, NULL, 0.535, 30000, 21000.00, '2026-01-29 16:08:48', '2026-01-29 16:08:48'),
(517, 233, 23, NULL, NULL, 0.545, 16000, 13000.00, '2026-01-29 16:15:57', '2026-01-29 16:15:57'),
(518, 233, 85, NULL, NULL, 0.515, 30000, 21000.00, '2026-01-29 16:15:57', '2026-01-29 16:15:57'),
(519, 233, 105, NULL, NULL, 1.000, 32000, 21000.00, '2026-01-29 16:15:57', '2026-01-29 16:15:57'),
(520, 233, 126, NULL, NULL, 0.665, 62500, 51000.00, '2026-01-29 16:15:57', '2026-01-29 16:15:57'),
(521, 234, 23, NULL, NULL, 0.500, 16000, 13000.00, '2026-01-29 16:26:29', '2026-01-29 16:26:29'),
(522, 234, 29, NULL, NULL, 1.000, 18000, 13000.00, '2026-01-29 16:26:29', '2026-01-29 16:26:29'),
(523, 234, 67, NULL, NULL, 1.000, 30000, 29000.00, '2026-01-29 16:26:30', '2026-01-29 16:26:30'),
(524, 235, 106, NULL, NULL, 1.000, 80000, 70000.00, '2026-01-29 16:30:17', '2026-01-29 16:30:17'),
(525, 235, 170, NULL, NULL, 0.815, 29000, 20500.00, '2026-01-29 16:30:17', '2026-01-29 16:30:17'),
(526, 236, 81, NULL, NULL, 0.725, 40000, 35000.00, '2026-01-29 16:45:51', '2026-01-29 16:45:51'),
(527, 236, 84, NULL, NULL, 0.780, 30000, 23000.00, '2026-01-29 16:45:51', '2026-01-29 16:45:51'),
(528, 236, 87, NULL, NULL, 0.635, 30000, 26000.00, '2026-01-29 16:45:51', '2026-01-29 16:45:51'),
(529, 236, 103, NULL, NULL, 1.200, 45000, 30000.00, '2026-01-29 16:45:51', '2026-01-29 16:45:51'),
(530, 237, 182, NULL, NULL, 0.565, 35000, 24000.00, '2026-01-29 16:47:14', '2026-01-29 16:47:14'),
(531, 238, 168, NULL, NULL, 1.240, 35000, 25000.00, '2026-01-29 16:49:40', '2026-01-29 16:49:40'),
(532, 239, 42, NULL, NULL, 0.500, 50000, 35000.00, '2026-01-29 17:13:30', '2026-01-29 17:13:30'),
(533, 240, 9, NULL, NULL, 0.210, 58000, 52000.00, '2026-01-29 17:22:36', '2026-01-29 17:22:36'),
(534, 240, 18, NULL, NULL, 2.000, 7000, 3800.00, '2026-01-29 17:22:36', '2026-01-29 17:22:36'),
(535, 240, 102, NULL, NULL, 0.205, 85000, 71000.00, '2026-01-29 17:22:36', '2026-01-29 17:22:36'),
(536, 241, 67, NULL, NULL, 1.000, 30000, 29000.00, '2026-01-29 17:29:34', '2026-01-29 17:29:34'),
(537, 242, 164, NULL, NULL, 1.000, 5000, 1000.00, '2026-01-29 17:30:00', '2026-01-29 17:30:00'),
(538, 243, 163, NULL, NULL, 1.000, 5000, 1000.00, '2026-01-29 17:33:03', '2026-01-29 17:33:03'),
(539, 244, 202, NULL, NULL, 1.000, 20000, 8000.00, '2026-01-29 17:34:29', '2026-01-29 17:34:29'),
(540, 245, 164, NULL, NULL, 1.000, 5000, 1000.00, '2026-01-29 17:41:19', '2026-01-29 17:41:19'),
(541, 246, 18, NULL, NULL, 2.000, 7000, 3800.00, '2026-01-29 17:51:13', '2026-01-29 17:51:13'),
(542, 246, 40, NULL, NULL, 1.000, 24000, 19000.00, '2026-01-29 17:51:13', '2026-01-29 17:51:13'),
(543, 246, 47, NULL, NULL, 1.000, 25000, 15300.00, '2026-01-29 17:51:13', '2026-01-29 17:51:13');
INSERT INTO `transaction_details` (`id`, `transaction_id`, `product_id`, `product_variant_id`, `variant_name`, `qty`, `price`, `buy_price`, `created_at`, `updated_at`) VALUES
(544, 246, 82, NULL, NULL, 0.455, 45000, 37000.00, '2026-01-29 17:51:13', '2026-01-29 17:51:13'),
(545, 246, 105, NULL, NULL, 1.000, 32000, 21000.00, '2026-01-29 17:51:13', '2026-01-29 17:51:13'),
(546, 246, 170, NULL, NULL, 0.735, 29000, 20500.00, '2026-01-29 17:51:13', '2026-01-29 17:51:13'),
(547, 247, 88, NULL, NULL, 0.255, 45000, 38000.00, '2026-01-29 17:53:22', '2026-01-29 17:53:22'),
(548, 247, 89, NULL, NULL, 0.220, 40000, 31000.00, '2026-01-29 17:53:22', '2026-01-29 17:53:22'),
(549, 248, 6, NULL, NULL, 0.380, 50000, 41571.00, '2026-01-29 17:54:36', '2026-01-29 17:54:36'),
(550, 249, 81, NULL, NULL, 0.510, 40000, 35000.00, '2026-01-29 18:13:52', '2026-01-29 18:13:52'),
(551, 249, 84, NULL, NULL, 0.470, 30000, 23000.00, '2026-01-29 18:13:52', '2026-01-29 18:13:52'),
(552, 249, 168, NULL, NULL, 0.355, 35000, 25000.00, '2026-01-29 18:13:52', '2026-01-29 18:13:52'),
(553, 250, 124, NULL, NULL, 6.000, 45000, 39000.00, '2026-01-29 18:21:27', '2026-01-29 18:21:27'),
(554, 251, 56, NULL, NULL, 1.000, 45000, 31333.00, '2026-01-29 18:22:56', '2026-01-29 18:22:56'),
(555, 251, 84, NULL, NULL, 0.565, 30000, 23000.00, '2026-01-29 18:22:56', '2026-01-29 18:22:56'),
(556, 252, 106, NULL, NULL, 1.000, 80000, 70000.00, '2026-01-29 18:31:18', '2026-01-29 18:31:18'),
(557, 253, 67, NULL, NULL, 1.000, 30000, 29000.00, '2026-01-29 18:42:20', '2026-01-29 18:42:20'),
(558, 254, 200, NULL, NULL, 1.000, 20000, 12000.00, '2026-01-29 18:44:37', '2026-01-29 18:44:37'),
(559, 255, 27, NULL, NULL, 3.000, 7000, 4000.00, '2026-01-29 18:52:27', '2026-01-29 18:52:27'),
(560, 255, 87, NULL, NULL, 0.430, 30000, 26000.00, '2026-01-29 18:52:27', '2026-01-29 18:52:27'),
(561, 256, 67, NULL, NULL, 1.000, 30000, 29000.00, '2026-01-29 19:12:17', '2026-01-29 19:12:17'),
(562, 256, 104, NULL, NULL, 0.500, 40000, 35000.00, '2026-01-29 19:12:17', '2026-01-29 19:12:17'),
(563, 257, 61, NULL, NULL, 1.000, 25000, 15000.00, '2026-01-29 19:18:00', '2026-01-29 19:18:00'),
(564, 257, 84, NULL, NULL, 0.535, 30000, 23000.00, '2026-01-29 19:18:00', '2026-01-29 19:18:00'),
(565, 258, 200, NULL, NULL, 1.000, 20000, 12000.00, '2026-01-29 19:18:14', '2026-01-29 19:18:14'),
(566, 259, 67, NULL, NULL, 1.000, 30000, 29000.00, '2026-01-29 19:20:55', '2026-01-29 19:20:55'),
(567, 259, 182, NULL, NULL, 0.250, 35000, 24000.00, '2026-01-29 19:20:55', '2026-01-29 19:20:55'),
(568, 260, 8, NULL, NULL, 0.165, 55000, 47000.00, '2026-01-29 19:27:07', '2026-01-29 19:27:07'),
(569, 260, 72, NULL, NULL, 2.000, 25000, 21000.00, '2026-01-29 19:27:07', '2026-01-29 19:27:07'),
(570, 260, 75, NULL, NULL, 1.000, 50000, 37000.00, '2026-01-29 19:27:07', '2026-01-29 19:27:07'),
(571, 260, 193, NULL, NULL, 1.000, 100000, 84000.00, '2026-01-29 19:27:07', '2026-01-29 19:27:07'),
(572, 261, 18, NULL, NULL, 2.000, 7000, 3800.00, '2026-01-29 19:29:03', '2026-01-29 19:29:03'),
(573, 261, 81, NULL, NULL, 0.530, 40000, 35000.00, '2026-01-29 19:29:03', '2026-01-29 19:29:03'),
(574, 261, 84, NULL, NULL, 0.500, 30000, 23000.00, '2026-01-29 19:29:03', '2026-01-29 19:29:03'),
(575, 261, 117, NULL, NULL, 1.000, 10000, 8750.00, '2026-01-29 19:29:03', '2026-01-29 19:29:03'),
(576, 262, 200, NULL, NULL, 1.000, 20000, 12000.00, '2026-01-29 19:29:25', '2026-01-29 19:29:25'),
(577, 263, 47, NULL, NULL, 3.000, 25000, 15300.00, '2026-01-29 19:31:59', '2026-01-29 19:31:59'),
(578, 263, 70, NULL, NULL, 0.355, 115000, 95000.00, '2026-01-29 19:31:59', '2026-01-29 19:31:59'),
(579, 263, 74, NULL, NULL, 3.000, 15000, 12000.00, '2026-01-29 19:31:59', '2026-01-29 19:31:59'),
(580, 263, 82, NULL, NULL, 0.610, 45000, 37000.00, '2026-01-29 19:31:59', '2026-01-29 19:31:59'),
(581, 264, 50, NULL, NULL, 1.000, 45000, 32167.00, '2026-01-29 20:21:22', '2026-01-29 20:21:22'),
(582, 265, 2, NULL, NULL, 3.890, 40000, 31000.00, '2026-01-29 21:02:53', '2026-01-29 21:02:53'),
(583, 265, 82, NULL, NULL, 1.270, 45000, 37000.00, '2026-01-29 21:02:53', '2026-01-29 21:02:53'),
(584, 266, 52, NULL, NULL, 1.000, 15000, 9300.00, '2026-01-29 21:08:33', '2026-01-29 21:08:33'),
(585, 266, 63, NULL, NULL, 0.505, 60000, 49000.00, '2026-01-29 21:08:33', '2026-01-29 21:08:33'),
(586, 266, 66, NULL, NULL, 1.000, 7000, 6000.00, '2026-01-29 21:08:33', '2026-01-29 21:08:33'),
(587, 267, 82, NULL, NULL, 0.470, 45000, 37000.00, '2026-01-29 21:12:20', '2026-01-29 21:12:20'),
(588, 268, 78, NULL, NULL, 0.330, 48000, 38000.00, '2026-01-29 21:14:06', '2026-01-29 21:14:06'),
(589, 268, 83, NULL, NULL, 0.730, 45000, 35000.00, '2026-01-29 21:14:06', '2026-01-29 21:14:06'),
(590, 268, 193, NULL, NULL, 1.000, 100000, 84000.00, '2026-01-29 21:14:06', '2026-01-29 21:14:06'),
(591, 269, 193, NULL, NULL, 1.000, 100000, 84000.00, '2026-01-29 21:53:41', '2026-01-29 21:53:41'),
(592, 270, 35, NULL, NULL, 1.000, 60000, 41000.00, '2026-01-29 22:32:49', '2026-01-29 22:32:49'),
(593, 270, 98, NULL, NULL, 1.000, 250000, 204000.00, '2026-01-29 22:32:49', '2026-01-29 22:32:49'),
(594, 271, 50, NULL, NULL, 1.000, 40000, 32167.00, '2026-01-30 08:57:19', '2026-01-30 08:57:19'),
(595, 271, 106, NULL, NULL, 1.000, 80000, 70000.00, '2026-01-30 08:57:19', '2026-01-30 08:57:19'),
(596, 272, 65, NULL, NULL, 1.000, 80000, 59000.00, '2026-01-30 09:31:39', '2026-01-30 09:31:39'),
(597, 273, 83, NULL, NULL, 0.325, 45000, 35000.00, '2026-01-30 09:38:30', '2026-01-30 09:38:30'),
(598, 273, 85, NULL, NULL, 0.355, 30000, 21000.00, '2026-01-30 09:38:30', '2026-01-30 09:38:30'),
(599, 274, 66, NULL, NULL, 3.000, 7000, 6000.00, '2026-01-30 10:15:34', '2026-01-30 10:15:34'),
(600, 274, 87, NULL, NULL, 2.355, 30000, 26000.00, '2026-01-30 10:15:34', '2026-01-30 10:15:34'),
(601, 275, 124, NULL, NULL, 1.000, 45000, 39000.00, '2026-01-30 10:24:50', '2026-01-30 10:24:50'),
(602, 275, 170, NULL, NULL, 0.465, 29000, 20500.00, '2026-01-30 10:24:50', '2026-01-30 10:24:50'),
(603, 276, 67, NULL, NULL, 1.000, 30000, 29000.00, '2026-01-30 10:44:07', '2026-01-30 10:44:07'),
(604, 276, 106, NULL, NULL, 1.000, 80000, 70000.00, '2026-01-30 10:44:07', '2026-01-30 10:44:07'),
(605, 276, 193, NULL, NULL, 1.000, 100000, 84000.00, '2026-01-30 10:44:07', '2026-01-30 10:44:07'),
(606, 277, 23, NULL, NULL, 0.195, 16000, 13000.00, '2026-01-30 11:32:40', '2026-01-30 11:32:40'),
(607, 277, 66, NULL, NULL, 1.000, 7000, 6000.00, '2026-01-30 11:32:40', '2026-01-30 11:32:40'),
(608, 277, 104, NULL, NULL, 0.310, 40000, 35000.00, '2026-01-30 11:32:40', '2026-01-30 11:32:40'),
(609, 277, 124, NULL, NULL, 1.000, 45000, 39000.00, '2026-01-30 11:32:40', '2026-01-30 11:32:40'),
(610, 277, 171, NULL, NULL, 1.000, 18000, 13000.00, '2026-01-30 11:32:40', '2026-01-30 11:32:40'),
(611, 277, 188, NULL, NULL, 0.270, 38000, 28000.00, '2026-01-30 11:32:40', '2026-01-30 11:32:40'),
(612, 278, 52, NULL, NULL, 2.000, 15000, 9300.00, '2026-01-30 11:34:51', '2026-01-30 11:34:51'),
(613, 278, 73, NULL, NULL, 1.000, 75000, 70000.00, '2026-01-30 11:34:51', '2026-01-30 11:34:51'),
(614, 279, 5, NULL, NULL, 0.130, 52000, 41333.00, '2026-01-30 11:37:37', '2026-01-30 11:37:37'),
(615, 279, 103, NULL, NULL, 0.620, 45000, 30000.00, '2026-01-30 11:37:37', '2026-01-30 11:37:37'),
(616, 279, 180, NULL, NULL, 0.275, 13000, 8000.00, '2026-01-30 11:37:37', '2026-01-30 11:37:37'),
(617, 280, 23, NULL, NULL, 0.500, 16000, 13000.00, '2026-01-30 12:29:11', '2026-01-30 12:29:11'),
(618, 280, 88, NULL, NULL, 0.700, 45000, 38000.00, '2026-01-30 12:29:11', '2026-01-30 12:29:11'),
(619, 280, 124, NULL, NULL, 1.000, 45000, 39000.00, '2026-01-30 12:29:11', '2026-01-30 12:29:11'),
(620, 281, 23, NULL, NULL, 0.255, 16000, 13000.00, '2026-01-30 13:32:19', '2026-01-30 13:32:19'),
(621, 281, 194, NULL, NULL, 1.000, 21000, 16500.00, '2026-01-30 13:32:19', '2026-01-30 13:32:19'),
(622, 282, 124, NULL, NULL, 6.000, 45000, 39000.00, '2026-01-30 14:13:52', '2026-01-30 14:13:52'),
(623, 283, 46, NULL, NULL, 1.000, 39000, 26500.00, '2026-01-30 14:55:54', '2026-01-30 14:55:54'),
(624, 283, 48, NULL, NULL, 1.000, 35000, 30000.00, '2026-01-30 14:55:54', '2026-01-30 14:55:54'),
(625, 283, 49, NULL, NULL, 0.635, 80000, 63000.00, '2026-01-30 14:55:54', '2026-01-30 14:55:54'),
(626, 283, 67, NULL, NULL, 2.000, 30000, 29000.00, '2026-01-30 14:55:54', '2026-01-30 14:55:54'),
(627, 283, 75, NULL, NULL, 1.000, 50000, 37000.00, '2026-01-30 14:55:54', '2026-01-30 14:55:54'),
(628, 283, 79, NULL, NULL, 1.000, 120000, 95000.00, '2026-01-30 14:55:54', '2026-01-30 14:55:54'),
(629, 283, 82, NULL, NULL, 1.030, 45000, 37000.00, '2026-01-30 14:55:54', '2026-01-30 14:55:54'),
(630, 284, 14, NULL, NULL, 1.000, 10500, 8250.00, '2026-01-30 14:57:37', '2026-01-30 14:57:37'),
(631, 284, 17, NULL, NULL, 1.000, 10000, 7250.00, '2026-01-30 14:57:37', '2026-01-30 14:57:37'),
(632, 284, 67, NULL, NULL, 1.000, 30000, 29000.00, '2026-01-30 14:57:37', '2026-01-30 14:57:37'),
(633, 285, 80, NULL, NULL, 1.000, 60000, 46000.00, '2026-01-30 15:01:59', '2026-01-30 15:01:59'),
(634, 285, 105, NULL, NULL, 4.000, 32000, 21000.00, '2026-01-30 15:01:59', '2026-01-30 15:01:59'),
(635, 286, 9, NULL, NULL, 0.420, 58000, 52000.00, '2026-01-30 15:11:22', '2026-01-30 15:11:22'),
(636, 286, 103, NULL, NULL, 1.080, 45000, 30000.00, '2026-01-30 15:11:22', '2026-01-30 15:11:22'),
(637, 286, 178, NULL, NULL, 0.085, 65000, 56000.00, '2026-01-30 15:11:22', '2026-01-30 15:11:22'),
(638, 287, 20, NULL, NULL, 1.000, 11000, 8533.00, '2026-01-30 15:26:19', '2026-01-30 15:26:19'),
(639, 287, 29, NULL, NULL, 1.000, 18000, 13000.00, '2026-01-30 15:26:19', '2026-01-30 15:26:19'),
(640, 287, 138, NULL, NULL, 1.000, 15000, 15000.00, '2026-01-30 15:26:19', '2026-01-30 15:26:19'),
(641, 288, 27, NULL, NULL, 2.000, 7000, 4000.00, '2026-01-30 16:39:12', '2026-01-30 16:39:12'),
(642, 288, 50, NULL, NULL, 1.000, 40000, 32167.00, '2026-01-30 16:39:12', '2026-01-30 16:39:12'),
(643, 288, 53, NULL, NULL, 1.000, 15000, 10000.00, '2026-01-30 16:39:12', '2026-01-30 16:39:12'),
(644, 288, 62, NULL, NULL, 1.000, 40000, 30000.00, '2026-01-30 16:39:12', '2026-01-30 16:39:12'),
(645, 288, 69, NULL, NULL, 0.190, 200000, 180000.00, '2026-01-30 16:39:12', '2026-01-30 16:39:12'),
(646, 288, 194, NULL, NULL, 1.000, 21000, 16500.00, '2026-01-30 16:39:12', '2026-01-30 16:39:12'),
(647, 289, 21, NULL, NULL, 1.000, 15000, 11000.00, '2026-01-30 16:46:48', '2026-01-30 16:46:48'),
(648, 289, 39, NULL, NULL, 0.400, 48000, 38000.00, '2026-01-30 16:46:48', '2026-01-30 16:46:48'),
(649, 289, 124, NULL, NULL, 1.000, 45000, 39000.00, '2026-01-30 16:46:48', '2026-01-30 16:46:48'),
(650, 289, 126, NULL, NULL, 0.610, 62500, 51000.00, '2026-01-30 16:46:48', '2026-01-30 16:46:48'),
(651, 290, 81, NULL, NULL, 0.885, 40000, 35000.00, '2026-01-30 16:50:40', '2026-01-30 16:50:40');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `balance` decimal(15,2) NOT NULL DEFAULT 0.00,
  `avatar` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `balance`, `avatar`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Administrator', 'admin@admin.com', NULL, '$2y$12$zqGqfNO38VIgX//Vi.6wp.RS1BFK7u1bv3SzslIw.RaSKLAE7qIe6', 0.00, NULL, NULL, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(2, 'Nando', 'fernando@example.com', NULL, '$2y$12$srRDcRhyvoiaOrxbd/jSAOWNxTz8iNKjN4SdRl5gGZe0wUBMew/ZO', 0.00, NULL, NULL, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(3, 'suci ramadantia', 'suciramadantia2@gmail.com', NULL, '$2y$12$IQv7/GRfcnQVHxa6HJL7EuwLIrdO3ToS/MP/6gjRQLkcVYT9qiB32', 0.00, NULL, NULL, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(4, 'anggie', 'anggidwii578652@gmail.com', NULL, '$2y$12$4.J49fdYN9FtbmLbLrdEnu.0Dh9ei83rKNhoh56tuCUA1giZsspQ6', 0.00, NULL, NULL, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(5, 'tiara', 'tiarakasih518@gmail.com', NULL, '$2y$12$dlVALmBq1e.ZdjXS/uZER.T.PyPcWaRbctMTnmyhXNrjD3.X6Oiju', 0.00, NULL, NULL, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(6, 'SILFY DESTIANTI', 'Silfydestiantif@gmail.com', NULL, '$2y$12$eNnpfResy1iaRl2IRuTlLO2anqjXtSppbfeN1490tX68jwGFpUalO', 0.00, NULL, NULL, '2026-01-27 08:23:45', '2026-01-27 08:23:45');

-- --------------------------------------------------------

--
-- Table structure for table `warehouses`
--

CREATE TABLE `warehouses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `warehouses`
--

INSERT INTO `warehouses` (`id`, `name`, `location`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Gudang Utama', 'Pusat', NULL, 1, '2026-01-27 08:23:45', '2026-01-27 08:23:45');

-- --------------------------------------------------------

--
-- Table structure for table `warehouse_stock`
--

CREATE TABLE `warehouse_stock` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `warehouse_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` decimal(15,3) NOT NULL DEFAULT 0.000,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `warehouse_stock`
--

INSERT INTO `warehouse_stock` (`id`, `warehouse_id`, `product_id`, `quantity`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(2, 1, 2, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(3, 1, 3, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(4, 1, 4, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(5, 1, 5, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(6, 1, 6, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(7, 1, 7, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(8, 1, 8, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(9, 1, 9, 0.000, '2026-01-27 08:23:45', '2026-01-29 13:25:21'),
(10, 1, 10, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(11, 1, 11, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(12, 1, 12, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(13, 1, 13, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(14, 1, 14, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(15, 1, 15, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(16, 1, 16, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(17, 1, 17, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(18, 1, 18, 50.000, '2026-01-27 08:23:45', '2026-01-28 16:37:34'),
(19, 1, 19, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(20, 1, 20, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(21, 1, 21, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(22, 1, 22, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(23, 1, 23, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(24, 1, 24, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(25, 1, 25, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(26, 1, 26, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(27, 1, 27, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(28, 1, 28, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(29, 1, 29, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(30, 1, 30, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(31, 1, 31, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(32, 1, 32, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(33, 1, 33, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(34, 1, 34, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(35, 1, 35, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(36, 1, 36, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(37, 1, 37, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(38, 1, 38, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(39, 1, 39, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(40, 1, 40, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(41, 1, 41, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(42, 1, 42, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(43, 1, 43, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(44, 1, 44, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(45, 1, 45, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(46, 1, 46, 0.000, '2026-01-27 08:23:45', '2026-01-29 13:09:08'),
(47, 1, 47, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(48, 1, 48, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(49, 1, 49, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(50, 1, 50, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(51, 1, 51, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(52, 1, 52, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(53, 1, 53, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(54, 1, 54, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(55, 1, 55, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(56, 1, 56, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(57, 1, 57, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(58, 1, 58, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(59, 1, 59, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(60, 1, 60, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(61, 1, 61, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(62, 1, 62, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(63, 1, 63, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(64, 1, 64, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(65, 1, 65, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(66, 1, 66, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(67, 1, 67, 0.000, '2026-01-27 08:23:45', '2026-01-29 13:33:08'),
(68, 1, 68, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(69, 1, 69, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(70, 1, 70, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(71, 1, 71, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(72, 1, 72, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(73, 1, 73, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(74, 1, 74, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(75, 1, 75, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(76, 1, 76, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(77, 1, 77, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(78, 1, 78, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(79, 1, 79, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(80, 1, 80, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(81, 1, 81, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(82, 1, 82, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(83, 1, 83, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(84, 1, 84, 1.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(85, 1, 85, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(86, 1, 86, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(87, 1, 87, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(88, 1, 88, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(89, 1, 89, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(90, 1, 90, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(91, 1, 91, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(92, 1, 92, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(93, 1, 93, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(94, 1, 94, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(95, 1, 95, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(96, 1, 96, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(97, 1, 97, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(98, 1, 98, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(99, 1, 99, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(100, 1, 100, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(101, 1, 101, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(102, 1, 102, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(103, 1, 103, 0.000, '2026-01-27 08:23:45', '2026-01-29 13:34:08'),
(104, 1, 104, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(105, 1, 105, 0.000, '2026-01-27 08:23:45', '2026-01-29 13:37:49'),
(106, 1, 106, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(107, 1, 107, 1.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(108, 1, 108, 0.000, '2026-01-27 08:23:45', '2026-01-29 18:33:43'),
(109, 1, 109, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(110, 1, 110, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(111, 1, 111, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(112, 1, 112, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(113, 1, 113, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(114, 1, 114, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(115, 1, 115, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(116, 1, 116, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(117, 1, 117, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(118, 1, 118, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(119, 1, 119, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(120, 1, 120, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(121, 1, 121, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(122, 1, 122, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(123, 1, 123, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(124, 1, 124, 0.000, '2026-01-27 08:23:45', '2026-01-28 16:35:28'),
(125, 1, 125, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(126, 1, 126, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(127, 1, 127, 0.000, '2026-01-27 08:23:45', '2026-01-27 08:23:45'),
(128, 1, 169, 0.000, '2026-01-27 16:56:14', '2026-01-27 16:56:37'),
(129, 1, 168, 0.000, '2026-01-27 17:12:17', '2026-01-27 17:12:26'),
(130, 1, 170, 0.000, '2026-01-27 17:28:25', '2026-01-29 13:05:54'),
(131, 1, 171, 0.000, '2026-01-27 17:40:30', '2026-01-27 17:40:37'),
(132, 1, 162, 0.000, '2026-01-27 17:43:18', '2026-01-27 17:43:57'),
(133, 1, 166, 0.000, '2026-01-27 18:06:24', '2026-01-27 18:06:46'),
(134, 1, 174, 0.000, '2026-01-27 18:11:06', '2026-01-27 18:11:17'),
(135, 1, 175, 0.000, '2026-01-27 18:36:26', '2026-01-27 18:37:00'),
(136, 1, 164, 11987.000, '2026-01-27 18:40:52', '2026-01-27 18:41:55'),
(137, 1, 158, 0.000, '2026-01-27 18:44:53', '2026-01-27 18:45:05'),
(138, 1, 176, 0.000, '2026-01-27 18:52:31', '2026-01-27 18:52:49'),
(139, 1, 177, 0.000, '2026-01-27 20:43:56', '2026-01-27 20:47:32'),
(140, 1, 178, 0.000, '2026-01-27 20:48:05', '2026-01-28 20:18:52'),
(141, 1, 179, 0.000, '2026-01-27 20:49:27', '2026-01-29 21:16:08'),
(142, 1, 180, 0.000, '2026-01-27 20:49:59', '2026-01-27 20:50:10'),
(143, 1, 181, 0.000, '2026-01-27 20:50:32', '2026-01-27 20:50:44'),
(144, 1, 182, 0.000, '2026-01-27 20:51:19', '2026-01-28 17:32:40'),
(145, 1, 183, 0.000, '2026-01-27 21:55:55', '2026-01-27 21:56:08'),
(146, 1, 184, 0.000, '2026-01-27 22:02:58', '2026-01-27 22:03:13'),
(147, 1, 185, 0.000, '2026-01-27 22:51:47', '2026-01-27 22:51:58'),
(148, 1, 188, 0.000, '2026-01-28 16:45:14', '2026-01-28 16:45:27'),
(149, 1, 154, -3.000, '2026-01-28 18:47:00', '2026-01-28 18:47:24'),
(150, 1, 191, 0.000, '2026-01-28 19:33:23', '2026-01-28 19:35:25'),
(151, 1, 160, 0.000, '2026-01-28 20:57:55', '2026-01-28 21:00:19'),
(152, 1, 161, 0.000, '2026-01-28 20:58:07', '2026-01-28 21:00:30'),
(153, 1, 153, 0.000, '2026-01-28 21:34:03', '2026-01-28 21:34:11'),
(154, 1, 192, 8.800, '2026-01-28 22:31:32', '2026-01-28 22:31:32'),
(155, 1, 193, 0.000, '2026-01-29 12:54:26', '2026-01-29 12:54:36'),
(156, 1, 194, 0.000, '2026-01-29 12:59:15', '2026-01-29 12:59:22'),
(157, 1, 195, 0.000, '2026-01-29 13:02:16', '2026-01-29 13:02:27'),
(158, 1, 196, 0.000, '2026-01-29 13:04:42', '2026-01-29 13:04:50'),
(159, 1, 197, 0.000, '2026-01-29 13:12:33', '2026-01-29 13:12:46'),
(160, 1, 198, 0.000, '2026-01-29 13:28:59', '2026-01-29 13:30:07'),
(161, 1, 199, 0.000, '2026-01-29 15:39:05', '2026-01-29 15:39:14'),
(162, 1, 163, 0.000, '2026-01-29 17:31:23', '2026-01-29 17:31:32'),
(163, 1, 202, 0.000, '2026-01-29 17:33:28', '2026-01-29 17:33:36'),
(164, 1, 200, 0.000, '2026-01-29 18:44:09', '2026-01-29 18:44:19'),
(165, 1, 131, 0.000, '2026-01-29 19:04:28', '2026-01-29 19:04:47'),
(166, 1, 204, 0.000, '2026-01-30 08:23:10', '2026-01-30 08:23:39'),
(167, 1, 205, 0.000, '2026-01-30 11:49:43', '2026-01-30 11:49:53'),
(168, 1, 206, 0.000, '2026-01-30 14:33:40', '2026-01-30 14:40:58'),
(169, 1, 207, 0.000, '2026-01-30 14:36:30', '2026-01-30 14:41:05'),
(170, 1, 208, 0.000, '2026-01-30 14:40:39', '2026-01-30 14:40:51'),
(171, 1, 209, 0.000, '2026-01-30 14:43:58', '2026-01-30 14:47:10'),
(172, 1, 210, 0.000, '2026-01-30 14:46:51', '2026-01-30 14:47:00'),
(173, 1, 211, 0.000, '2026-01-30 15:06:46', '2026-01-30 15:06:57'),
(174, 1, 212, 2.000, '2026-01-30 15:09:36', '2026-01-30 15:09:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_lookup_index` (`cashier_id`,`product_id`,`product_variant_id`),
  ADD KEY `carts_product_variant_id_foreign` (`product_variant_id`),
  ADD KEY `cart_product_idx` (`product_id`);

--
-- Indexes for table `cash_flows`
--
ALTER TABLE `cash_flows`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cash_flows_user_id_foreign` (`user_id`),
  ADD KEY `cash_flows_shift_id_type_index` (`shift_id`,`type`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `displays`
--
ALTER TABLE `displays`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `display_stock`
--
ALTER TABLE `display_stock`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `display_stock_display_id_product_id_unique` (`display_id`,`product_id`),
  ADD KEY `display_stock_product_id_foreign` (`product_id`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `expenses_expense_category_id_foreign` (`expense_category_id`),
  ADD KEY `expenses_user_id_foreign` (`user_id`);

--
-- Indexes for table `expense_categories`
--
ALTER TABLE `expense_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `payment_settings`
--
ALTER TABLE `payment_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `payment_settings_key_unique` (`key`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `price_histories`
--
ALTER TABLE `price_histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `price_histories_changed_by_foreign` (`changed_by`),
  ADD KEY `price_histories_product_id_created_at_index` (`product_id`,`created_at`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_sku_unique` (`sku`),
  ADD UNIQUE KEY `products_barcode_unique` (`barcode`),
  ADD KEY `products_product_type_index` (`product_type`),
  ADD KEY `products_category_id_index` (`category_id`),
  ADD KEY `products_is_active_index` (`is_active`);

--
-- Indexes for table `product_ingredients`
--
ALTER TABLE `product_ingredients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_ingredients_product_id_ingredient_id_unique` (`product_id`,`ingredient_id`),
  ADD KEY `product_ingredients_ingredient_id_foreign` (`ingredient_id`);

--
-- Indexes for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_variants_product_id_foreign` (`product_id`);

--
-- Indexes for table `product_variant_ingredients`
--
ALTER TABLE `product_variant_ingredients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pvi_variant_ingredient_unique` (`product_variant_id`,`ingredient_id`),
  ADD KEY `product_variant_ingredients_ingredient_id_foreign` (`ingredient_id`);

--
-- Indexes for table `profits`
--
ALTER TABLE `profits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `profit_trx_idx` (`transaction_id`);

--
-- Indexes for table `purchase_orders`
--
ALTER TABLE `purchase_orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `purchase_orders_po_number_unique` (`po_number`),
  ADD KEY `purchase_orders_supplier_id_foreign` (`supplier_id`),
  ADD KEY `purchase_orders_warehouse_id_foreign` (`warehouse_id`),
  ADD KEY `purchase_orders_user_id_foreign` (`user_id`),
  ADD KEY `purchase_orders_status_index` (`status`),
  ADD KEY `purchase_orders_order_date_index` (`order_date`),
  ADD KEY `purchase_orders_expected_date_index` (`expected_date`);

--
-- Indexes for table `purchase_order_items`
--
ALTER TABLE `purchase_order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchase_order_items_product_id_foreign` (`product_id`),
  ADD KEY `purchase_order_items_purchase_order_id_product_id_index` (`purchase_order_id`,`product_id`);

--
-- Indexes for table `returns`
--
ALTER TABLE `returns`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `returns_return_number_unique` (`return_number`),
  ADD KEY `returns_transaction_id_foreign` (`transaction_id`),
  ADD KEY `returns_user_id_foreign` (`user_id`),
  ADD KEY `returns_approved_by_foreign` (`approved_by`);

--
-- Indexes for table `return_items`
--
ALTER TABLE `return_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `return_items_return_id_foreign` (`return_id`),
  ADD KEY `return_items_product_id_foreign` (`product_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `settings_key_unique` (`key`),
  ADD KEY `settings_group_index` (`group`);

--
-- Indexes for table `shifts`
--
ALTER TABLE `shifts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `shifts_shift_number_unique` (`shift_number`),
  ADD KEY `shifts_user_id_status_index` (`user_id`,`status`),
  ADD KEY `shifts_started_at_index` (`started_at`);

--
-- Indexes for table `stock_movements`
--
ALTER TABLE `stock_movements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stock_movements_product_id_foreign` (`product_id`),
  ADD KEY `stock_movements_supplier_id_foreign` (`supplier_id`),
  ADD KEY `stock_movements_user_id_foreign` (`user_id`),
  ADD KEY `stock_movements_receipt_id_index` (`receipt_id`),
  ADD KEY `stock_movements_invoice_number_index` (`invoice_number`),
  ADD KEY `stock_movements_batch_number_index` (`batch_number`),
  ADD KEY `stock_movements_from_type_index` (`from_type`),
  ADD KEY `stock_movements_to_type_index` (`to_type`),
  ADD KEY `stock_movements_purchase_order_id_foreign` (`purchase_order_id`);

--
-- Indexes for table `stock_opnames`
--
ALTER TABLE `stock_opnames`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stock_opnames_user_id_foreign` (`user_id`);

--
-- Indexes for table `stock_opname_items`
--
ALTER TABLE `stock_opname_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stock_opname_items_stock_opname_id_foreign` (`stock_opname_id`),
  ADD KEY `stock_opname_items_product_id_foreign` (`product_id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `transactions_invoice_unique` (`invoice`),
  ADD KEY `transactions_cashier_id_foreign` (`cashier_id`),
  ADD KEY `transactions_created_at_index` (`created_at`),
  ADD KEY `transactions_shift_id_index` (`shift_id`),
  ADD KEY `transactions_customer_id_foreign` (`customer_id`);

--
-- Indexes for table `transaction_details`
--
ALTER TABLE `transaction_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaction_details_transaction_id_foreign` (`transaction_id`),
  ADD KEY `td_product_idx` (`product_id`),
  ADD KEY `transaction_details_product_variant_id_foreign` (`product_variant_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `warehouses`
--
ALTER TABLE `warehouses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `warehouse_stock`
--
ALTER TABLE `warehouse_stock`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `warehouse_stock_warehouse_id_product_id_unique` (`warehouse_id`,`product_id`),
  ADD KEY `warehouse_stock_product_id_foreign` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=676;

--
-- AUTO_INCREMENT for table `cash_flows`
--
ALTER TABLE `cash_flows`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `displays`
--
ALTER TABLE `displays`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `display_stock`
--
ALTER TABLE `display_stock`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=187;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `expense_categories`
--
ALTER TABLE `expense_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `payment_settings`
--
ALTER TABLE `payment_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `price_histories`
--
ALTER TABLE `price_histories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=213;

--
-- AUTO_INCREMENT for table `product_ingredients`
--
ALTER TABLE `product_ingredients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_variant_ingredients`
--
ALTER TABLE `product_variant_ingredients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `profits`
--
ALTER TABLE `profits`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=602;

--
-- AUTO_INCREMENT for table `purchase_orders`
--
ALTER TABLE `purchase_orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchase_order_items`
--
ALTER TABLE `purchase_order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `returns`
--
ALTER TABLE `returns`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `return_items`
--
ALTER TABLE `return_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `shifts`
--
ALTER TABLE `shifts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `stock_movements`
--
ALTER TABLE `stock_movements`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1008;

--
-- AUTO_INCREMENT for table `stock_opnames`
--
ALTER TABLE `stock_opnames`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stock_opname_items`
--
ALTER TABLE `stock_opname_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=291;

--
-- AUTO_INCREMENT for table `transaction_details`
--
ALTER TABLE `transaction_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=652;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `warehouses`
--
ALTER TABLE `warehouses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `warehouse_stock`
--
ALTER TABLE `warehouse_stock`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=175;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_cashier_id_foreign` FOREIGN KEY (`cashier_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carts_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carts_product_variant_id_foreign` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `cash_flows`
--
ALTER TABLE `cash_flows`
  ADD CONSTRAINT `cash_flows_shift_id_foreign` FOREIGN KEY (`shift_id`) REFERENCES `shifts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cash_flows_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `display_stock`
--
ALTER TABLE `display_stock`
  ADD CONSTRAINT `display_stock_display_id_foreign` FOREIGN KEY (`display_id`) REFERENCES `displays` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `display_stock_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `expenses`
--
ALTER TABLE `expenses`
  ADD CONSTRAINT `expenses_expense_category_id_foreign` FOREIGN KEY (`expense_category_id`) REFERENCES `expense_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `expenses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `price_histories`
--
ALTER TABLE `price_histories`
  ADD CONSTRAINT `price_histories_changed_by_foreign` FOREIGN KEY (`changed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `price_histories_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_ingredients`
--
ALTER TABLE `product_ingredients`
  ADD CONSTRAINT `product_ingredients_ingredient_id_foreign` FOREIGN KEY (`ingredient_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_ingredients_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `product_variants_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_variant_ingredients`
--
ALTER TABLE `product_variant_ingredients`
  ADD CONSTRAINT `product_variant_ingredients_ingredient_id_foreign` FOREIGN KEY (`ingredient_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_variant_ingredients_product_variant_id_foreign` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `profits`
--
ALTER TABLE `profits`
  ADD CONSTRAINT `profits_transaction_id_foreign` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `purchase_orders`
--
ALTER TABLE `purchase_orders`
  ADD CONSTRAINT `purchase_orders_supplier_id_foreign` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`),
  ADD CONSTRAINT `purchase_orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `purchase_orders_warehouse_id_foreign` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses` (`id`);

--
-- Constraints for table `purchase_order_items`
--
ALTER TABLE `purchase_order_items`
  ADD CONSTRAINT `purchase_order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `purchase_order_items_purchase_order_id_foreign` FOREIGN KEY (`purchase_order_id`) REFERENCES `purchase_orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `returns`
--
ALTER TABLE `returns`
  ADD CONSTRAINT `returns_approved_by_foreign` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `returns_transaction_id_foreign` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `returns_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `return_items`
--
ALTER TABLE `return_items`
  ADD CONSTRAINT `return_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `return_items_return_id_foreign` FOREIGN KEY (`return_id`) REFERENCES `returns` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `shifts`
--
ALTER TABLE `shifts`
  ADD CONSTRAINT `shifts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `stock_movements`
--
ALTER TABLE `stock_movements`
  ADD CONSTRAINT `stock_movements_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `stock_movements_purchase_order_id_foreign` FOREIGN KEY (`purchase_order_id`) REFERENCES `purchase_orders` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `stock_movements_supplier_id_foreign` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `stock_movements_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `stock_opnames`
--
ALTER TABLE `stock_opnames`
  ADD CONSTRAINT `stock_opnames_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `stock_opname_items`
--
ALTER TABLE `stock_opname_items`
  ADD CONSTRAINT `stock_opname_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `stock_opname_items_stock_opname_id_foreign` FOREIGN KEY (`stock_opname_id`) REFERENCES `stock_opnames` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_cashier_id_foreign` FOREIGN KEY (`cashier_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `transactions_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `transactions_shift_id_foreign` FOREIGN KEY (`shift_id`) REFERENCES `shifts` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `transaction_details`
--
ALTER TABLE `transaction_details`
  ADD CONSTRAINT `transaction_details_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `transaction_details_product_variant_id_foreign` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `transaction_details_transaction_id_foreign` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `warehouse_stock`
--
ALTER TABLE `warehouse_stock`
  ADD CONSTRAINT `warehouse_stock_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `warehouse_stock_warehouse_id_foreign` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
