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
        'cashier_id', 'product_id', 'qty', 'price'
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
     * product
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
