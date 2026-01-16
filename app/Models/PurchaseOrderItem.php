<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PurchaseOrderItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'purchase_order_id',
        'product_id',
        'quantity_ordered',
        'quantity_received',
        'unit_price',
        'subtotal',
        'batch_number',
        'expiry_date',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'quantity_ordered' => 'decimal:2',
        'quantity_received' => 'decimal:2',
        'unit_price' => 'decimal:2',
        'subtotal' => 'decimal:2',
        'expiry_date' => 'date',
    ];

    /**
     * Get the purchase order that owns this item.
     */
    public function purchaseOrder()
    {
        return $this->belongsTo(PurchaseOrder::class);
    }

    /**
     * Get the product.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get remaining quantity to receive.
     */
    public function getRemainingQuantityAttribute(): float
    {
        return max(0, $this->quantity_ordered - $this->quantity_received);
    }

    /**
     * Check if this item is fully received.
     */
    public function getIsFullyReceivedAttribute(): bool
    {
        return $this->quantity_received >= $this->quantity_ordered;
    }

    /**
     * Get receiving percentage.
     */
    public function getReceivingPercentageAttribute(): float
    {
        if ($this->quantity_ordered == 0) return 0;
        return round(($this->quantity_received / $this->quantity_ordered) * 100, 1);
    }

    /**
     * Auto-calculate subtotal when saving.
     */
    protected static function boot()
    {
        parent::boot();

        static::saving(function ($model) {
            $model->subtotal = $model->quantity_ordered * $model->unit_price;
        });

        // Update PO total after saving/deleting item
        static::saved(function ($model) {
            $model->purchaseOrder->recalculateTotal();
        });

        static::deleted(function ($model) {
            $model->purchaseOrder->recalculateTotal();
        });
    }
}
