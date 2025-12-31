<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockOpname extends Model
{
    use HasFactory;

    protected $fillable = [
        'location_type',
        'location_id',
        'status',
        'note',
        'user_id',
    ];

    const STATUS_DRAFT = 'draft';
    const STATUS_COMPLETED = 'completed';

    const LOCATION_WAREHOUSE = 'warehouse';
    const LOCATION_DISPLAY = 'display';

    /**
     * Get the items for this stock opname.
     */
    public function items()
    {
        return $this->hasMany(StockOpnameItem::class);
    }

    /**
     * Get the user who created this stock opname.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the location (warehouse or display).
     */
    public function getLocationAttribute()
    {
        if ($this->location_type === self::LOCATION_WAREHOUSE) {
            return Warehouse::find($this->location_id);
        }
        return Display::find($this->location_id);
    }

    /**
     * Get location name.
     */
    public function getLocationNameAttribute()
    {
        $location = $this->location;
        return $location ? $location->name : '-';
    }

    /**
     * Calculate total loss amount.
     */
    public function getTotalLossAttribute()
    {
        return $this->items->sum('loss_amount') ?? 0;
    }

    /**
     * Get items with differences only.
     */
    public function getItemsWithDifferenceAttribute()
    {
        return $this->items->filter(fn($item) => $item->difference != 0);
    }

    /**
     * Check if opname is completed.
     */
    public function isCompleted()
    {
        return $this->status === self::STATUS_COMPLETED;
    }

    /**
     * Check if opname is draft.
     */
    public function isDraft()
    {
        return $this->status === self::STATUS_DRAFT;
    }
}
