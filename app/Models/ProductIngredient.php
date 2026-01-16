<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * ProductIngredient Model
 * 
 * Stores ingredients for recipe products at the PRODUCT level.
 * Used when a recipe product doesn't have variants, or as default ingredients.
 * 
 * Example: "Jus Apel" uses Apel 200g, Gula 30g, Air 150ml
 */
class ProductIngredient extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'ingredient_id',
        'quantity',
    ];

    protected $casts = [
        'quantity' => 'decimal:3',
    ];

    /**
     * Get the recipe product that owns this ingredient
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
