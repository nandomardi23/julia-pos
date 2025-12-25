<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductVariant extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'product_id',
        'name',
        'sku',
        'buy_price',
        'sell_price',
        'sort_order',
        'is_default',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'buy_price' => 'integer',
        'sell_price' => 'integer',
        'sort_order' => 'integer',
        'is_default' => 'boolean',
    ];

    /**
     * Get the product that owns this variant.
     *
     * @return BelongsTo
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get ingredients specific to this variant.
     * If variant has its own ingredients, use those.
     * Otherwise, fall back to parent product's ingredients.
     */
    public function ingredients()
    {
        return $this->hasMany(ProductVariantIngredient::class);
    }

    /**
     * Check if variant has its own ingredients defined.
     */
    public function hasOwnIngredients(): bool
    {
        return $this->ingredients()->count() > 0;
    }

    /**
     * Get effective ingredients (variant's own or fallback to product's).
     * Returns collection of ingredient data with 'ingredient' and 'quantity'.
     */
    public function getEffectiveIngredients()
    {
        if ($this->hasOwnIngredients()) {
            return $this->ingredients()->with('ingredient')->get();
        }
        
        return $this->product->ingredients()->with('ingredient')->get();
    }
}
