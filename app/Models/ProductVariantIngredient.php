<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVariantIngredient extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_variant_id',
        'ingredient_id',
        'quantity',
    ];

    protected $casts = [
        'quantity' => 'decimal:3',
    ];

    /**
     * Get the variant that owns this ingredient
     */
    public function variant()
    {
        return $this->belongsTo(ProductVariant::class, 'product_variant_id');
    }

    /**
     * Get the ingredient product
     */
    public function ingredient()
    {
        return $this->belongsTo(Product::class, 'ingredient_id');
    }
}
