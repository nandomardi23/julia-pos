<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DisplayStock extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'display_stock';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'display_id',
        'product_id',
        'quantity',
    ];

    /**
     * Get the display that owns the stock.
     */
    public function display()
    {
        return $this->belongsTo(Display::class);
    }

    /**
     * Get the product for this stock record.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
