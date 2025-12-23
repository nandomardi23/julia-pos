<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Display extends Model
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
     * Get all stock records for this display.
     */
    public function stocks()
    {
        return $this->hasMany(DisplayStock::class);
    }

    /**
     * Scope a query to only include active displays.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get total quantity of all products in this display.
     */
    public function getTotalStockAttribute()
    {
        return $this->stocks()->sum('quantity');
    }

    /**
     * Get count of unique products in this display.
     */
    public function getTotalProductsAttribute()
    {
        return $this->stocks()->where('quantity', '>', 0)->count();
    }
}
