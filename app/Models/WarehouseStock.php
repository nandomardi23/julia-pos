<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WarehouseStock extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'warehouse_stock';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'warehouse_id',
        'product_id',
        'quantity',
    ];

    /**
     * Get the warehouse that owns the stock.
     */
    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    /**
     * Get the product for this stock record.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
