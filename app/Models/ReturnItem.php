<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReturnItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'return_id',
        'product_id',
        'variant_name',
        'qty',
        'price',
        'subtotal',
        'condition_note',
    ];

    protected $casts = [
        'qty' => 'decimal:3',
        'price' => 'decimal:2',
        'subtotal' => 'decimal:2',
    ];

    /**
     * Get the return associated with this item
     */
    public function return()
    {
        return $this->belongsTo(ProductReturn::class, 'return_id');
    }

    /**
     * Get the product
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
