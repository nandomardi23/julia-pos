<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Supplier extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'company',
        'email',
        'phone',
        'address',
        'description',
    ];

    /**
     * Get all stock movements from this supplier.
     */
    public function stockMovements()
    {
        return $this->hasMany(StockMovement::class);
    }

    /**
     * Get unique products that were purchased from this supplier.
     */
    public function getProductsAttribute()
    {
        $productIds = $this->stockMovements()->distinct()->pluck('product_id');
        return Product::whereIn('id', $productIds)->get();
    }
}
