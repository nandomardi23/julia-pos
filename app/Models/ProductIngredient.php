<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductIngredient extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'ingredient_id',
        'quantity',
    ];

    /**
     * Get the product (recipe) that owns this ingredient
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the ingredient product
     */
    public function ingredient()
    {
        return $this->belongsTo(Product::class, 'ingredient_id');
    }
}
