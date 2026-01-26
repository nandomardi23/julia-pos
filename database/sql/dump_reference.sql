-- Partial Dump Content for parsing
INSERT INTO `categories` (`id`, `name`, `description`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Sayuran', 'Kategori Sayuran', NULL, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(2, 'Umbi & Akar', 'Kategori Umbi & Akar', NULL, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(3, 'Jamur', 'Kategori Jamur', NULL, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(4, 'Kacang-Kacangan', 'Kategori Kacang-Kacangan', NULL, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(5, 'Produk Olahan', 'Kategori Produk Olahan', NULL, '2026-01-25 22:04:26', '2026-01-25 22:04:26'),
(6, 'Daging Ayam', 'Kategori Daging Ayam', NULL, '2026-01-25 22:04:27', '2026-01-25 22:04:27'),
(7, 'Buah', 'Kategori Buah', NULL, '2026-01-25 22:04:27', '2026-01-25 22:04:27');

INSERT INTO `displays` (`id`, `name`, `location`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Display Lantai 1', '-', 1, '2026-01-25 22:04:26', '2026-01-25 22:04:26');

-- products, display_stock, stock_movements ... (to be processed via specialized tool or regex)
