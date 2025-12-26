<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    
    /**
     * fillable
     *
     * @var array
     */
    protected $fillable = [
        'cashier_id', 'product_id', 'product_variant_id', 'qty', 'price'
    ];

    /**
     * casts
     *
     * @var array
     */
    protected $casts = [
        'qty' => 'decimal:3',
        'price' => 'integer',
    ];

    /**
     * Get the product.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the product variant (optional).
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function variant()
    {
        return $this->belongsTo(ProductVariant::class, 'product_variant_id');
    }

    /**
     * Get cart total (price * qty).
     * This optimizes repeated calculations across controllers.
     *
     * @return float
     */
    public function getTotalAttribute()
    {
        return $this->price * $this->qty;
    }
}

