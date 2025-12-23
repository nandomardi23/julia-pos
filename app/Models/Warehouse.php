<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Warehouse extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'location',
        'description',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Get all stock records for this warehouse.
     */
    public function stocks()
    {
        return $this->hasMany(WarehouseStock::class);
    }

    /**
     * Scope a query to only include active warehouses.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get total quantity of all products in this warehouse.
     */
    public function getTotalStockAttribute()
    {
        return $this->stocks()->sum('quantity');
    }

    /**
     * Get count of unique products in this warehouse.
     */
    public function getTotalProductsAttribute()
    {
        return $this->stocks()->where('quantity', '>', 0)->count();
    }
}
