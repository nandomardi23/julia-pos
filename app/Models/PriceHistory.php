<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PriceHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'old_buy_price',
        'new_buy_price',
        'old_sell_price',
        'new_sell_price',
        'changed_by',
        'note',
    ];

    protected $casts = [
        'old_buy_price' => 'decimal:2',
        'new_buy_price' => 'decimal:2',
        'old_sell_price' => 'decimal:2',
        'new_sell_price' => 'decimal:2',
    ];

    /**
     * Get the product that owns the price history.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the user who changed the price.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'changed_by');
    }

    /**
     * Record a price change.
     */
    public static function recordChange($productId, $oldBuyPrice, $newBuyPrice, $oldSellPrice, $newSellPrice, $note = null)
    {
        // Only record if there's an actual change
        if ($oldBuyPrice == $newBuyPrice && $oldSellPrice == $newSellPrice) {
            return null;
        }

        return self::create([
            'product_id' => $productId,
            'old_buy_price' => $oldBuyPrice,
            'new_buy_price' => $newBuyPrice,
            'old_sell_price' => $oldSellPrice,
            'new_sell_price' => $newSellPrice,
            'changed_by' => auth()->id(),
            'note' => $note,
        ]);
    }
}
