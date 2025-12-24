<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StockMovement extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'product_id',
        'from_type',
        'from_id',
        'supplier_id',
        'to_type',
        'to_id',
        'quantity',
        'purchase_price',
        'loss_amount',
        'note',
        'user_id',
    ];

    /**
     * Get the supplier associated with this movement (for stock in).
     */
    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    /**
     * Type constants
     */
    const TYPE_SUPPLIER = 'supplier';
    const TYPE_WAREHOUSE = 'warehouse';
    const TYPE_DISPLAY = 'display';
    const TYPE_TRANSACTION = 'transaction';
    const TYPE_OUT = 'out'; // For stock out (damaged, expired, return, etc.)

    /**
     * Stock out reason constants
     */
    const REASON_DAMAGED = 'damaged';
    const REASON_EXPIRED = 'expired';
    const REASON_RETURN = 'return';
    const REASON_INTERNAL_USE = 'internal_use';
    const REASON_ADJUSTMENT = 'adjustment';
    const REASON_OTHER = 'other';

    /**
     * Get the product associated with this movement.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the user who made this movement.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the source entity.
     */
    public function getFromAttribute()
    {
        return $this->resolveEntity($this->from_type, $this->from_id);
    }

    /**
     * Get the destination entity.
     */
    public function getToAttribute()
    {
        return $this->resolveEntity($this->to_type, $this->to_id);
    }

    /**
     * Resolve entity based on type and id.
     */
    protected function resolveEntity($type, $id)
    {
        if (!$id) return null;

        return match ($type) {
            self::TYPE_SUPPLIER => Supplier::find($id),
            self::TYPE_WAREHOUSE => Warehouse::find($id),
            self::TYPE_DISPLAY => Display::find($id),
            self::TYPE_TRANSACTION => Transaction::find($id),
            default => null,
        };
    }

    /**
     * Get human-readable source name.
     */
    public function getFromNameAttribute()
    {
        $entity = $this->from;
        if (!$entity) return ucfirst($this->from_type);
        
        return match ($this->from_type) {
            self::TYPE_SUPPLIER => $entity->name ?? 'Supplier',
            self::TYPE_WAREHOUSE => $entity->name ?? 'Gudang',
            self::TYPE_DISPLAY => $entity->name ?? 'Display',
            default => ucfirst($this->from_type),
        };
    }

    /**
     * Get human-readable destination name.
     */
    public function getToNameAttribute()
    {
        $entity = $this->to;
        if (!$entity && $this->to_type !== self::TYPE_OUT) return ucfirst($this->to_type);
        
        return match ($this->to_type) {
            self::TYPE_WAREHOUSE => $entity->name ?? 'Gudang',
            self::TYPE_DISPLAY => $entity->name ?? 'Display',
            self::TYPE_TRANSACTION => $entity->invoice ?? 'Transaksi #' . $this->to_id,
            self::TYPE_OUT => 'Barang Keluar',
            default => ucfirst($this->to_type),
        };
    }

    /**
     * Get available stock out reasons.
     */
    public static function getStockOutReasons()
    {
        return [
            self::REASON_DAMAGED => 'Rusak',
            self::REASON_EXPIRED => 'Kadaluarsa',
            self::REASON_RETURN => 'Retur ke Supplier',
            self::REASON_INTERNAL_USE => 'Pemakaian Internal',
            self::REASON_ADJUSTMENT => 'Koreksi Stok',
            self::REASON_OTHER => 'Lainnya',
        ];
    }
}
