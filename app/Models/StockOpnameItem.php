<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockOpnameItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'stock_opname_id',
        'product_id',
        'system_qty',
        'physical_qty',
        'difference',
        'loss_amount',
    ];

    protected $casts = [
        'system_qty' => 'decimal:3',
        'physical_qty' => 'decimal:3',
        'difference' => 'decimal:3',
        'loss_amount' => 'decimal:2',
    ];

    /**
     * Get the stock opname that owns this item.
     */
    public function stockOpname()
    {
        return $this->belongsTo(StockOpname::class);
    }

    /**
     * Get the product for this item.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the difference status.
     * Returns: 'match', 'surplus', 'deficit'
     */
    public function getDifferenceStatusAttribute()
    {
        if ($this->difference == 0) {
            return 'match';
        }
        return $this->difference > 0 ? 'surplus' : 'deficit';
    }

    /**
     * Get formatted difference with sign.
     */
    public function getFormattedDifferenceAttribute()
    {
        if ($this->difference > 0) {
            return '+' . $this->difference;
        }
        return (string) $this->difference;
    }
}
