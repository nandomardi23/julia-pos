<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class ProductionCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['id' => 1, 'name' => 'Sayuran', 'description' => 'Kategori Sayuran'],
            ['id' => 2, 'name' => 'Kacang-Kacangan', 'description' => 'Kategori Kacang-Kacangan'],
            ['id' => 3, 'name' => 'Umbi & Akar', 'description' => 'Kategori Umbi & Akar'],
            ['id' => 4, 'name' => 'Jamur', 'description' => 'Kategori Jamur'],
            ['id' => 5, 'name' => 'Produk Olahan', 'description' => 'Kategori Produk Olahan'],
            ['id' => 6, 'name' => 'Daging Ayam', 'description' => 'Kategori Daging Ayam'],
            ['id' => 7, 'name' => 'Buah', 'description' => 'Kategori Buah'],
            ['id' => 8, 'name' => 'Jus', 'description' => 'Kategori Jus'],
            ['id' => 9, 'name' => 'Makanan Berat', 'description' => 'Kategori Makanan Berat'],
            ['id' => 10, 'name' => 'Makanan Ringan', 'description' => 'Kategori Makanan Ringan'],
        ];

        foreach ($categories as $cat) {
            Category::firstOrCreate(
                ['id' => $cat['id']],
                [
                    'name' => $cat['name'],
                    'description' => $cat['description'],
                    'created_at' => '2026-01-25 22:04:26',
                    'updated_at' => '2026-01-25 22:04:26',
                ]
            );
        }
    }
}
