<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PurchaseOrder extends Model
{
    use HasFactory;

    /**
     * Status constants
     */
    const STATUS_DRAFT = 'draft';
    const STATUS_SENT = 'sent';
    const STATUS_CONFIRMED = 'confirmed';
    const STATUS_SHIPPED = 'shipped';
    const STATUS_PARTIAL = 'partial';
    const STATUS_RECEIVED = 'received';
    const STATUS_CANCELLED = 'cancelled';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'po_number',
        'supplier_id',
        'warehouse_id',
        'status',
        'order_date',
        'expected_date',
        'received_date',
        'notes',
        'invoice_number',
        'invoice_file',
        'total_amount',
        'user_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'order_date' => 'date',
        'expected_date' => 'date',
        'received_date' => 'date',
        'total_amount' => 'decimal:2',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Auto-generate PO number on creating
        static::creating(function ($model) {
            if (empty($model->po_number)) {
                $model->po_number = self::generatePoNumber();
            }
        });
    }

    /**
     * Generate unique PO number.
     * Format: PO-YYYYMMDD-XXX
     */
    public static function generatePoNumber(): string
    {
        $date = now()->format('Ymd');
        $prefix = "PO-{$date}-";
        
        $lastPo = self::where('po_number', 'like', "{$prefix}%")
            ->orderBy('po_number', 'desc')
            ->first();
        
        if ($lastPo) {
            $lastNumber = (int) substr($lastPo->po_number, -3);
            $newNumber = str_pad($lastNumber + 1, 3, '0', STR_PAD_LEFT);
        } else {
            $newNumber = '001';
        }
        
        return $prefix . $newNumber;
    }

    /**
     * Get the supplier that owns this PO.
     */
    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    /**
     * Get the warehouse destination.
     */
    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    /**
     * Get the user who created this PO.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get all items in this PO.
     */
    public function items()
    {
        return $this->hasMany(PurchaseOrderItem::class);
    }

    /**
     * Get stock movements created from this PO.
     */
    public function stockMovements()
    {
        return $this->hasMany(StockMovement::class);
    }

    /**
     * Calculate and update total amount from items.
     */
    public function recalculateTotal()
    {
        $this->total_amount = $this->items()->sum('subtotal');
        $this->save();
    }

    /**
     * Check if PO can be edited.
     */
    public function canBeEdited(): bool
    {
        return $this->status === self::STATUS_DRAFT;
    }

    /**
     * Check if PO can be received.
     */
    public function canBeReceived(): bool
    {
        return in_array($this->status, [
            self::STATUS_SENT,
            self::STATUS_CONFIRMED,
            self::STATUS_SHIPPED,
            self::STATUS_PARTIAL,
        ]);
    }

    /**
     * Check if PO can be cancelled.
     */
    public function canBeCancelled(): bool
    {
        return in_array($this->status, [
            self::STATUS_DRAFT,
            self::STATUS_SENT,
            self::STATUS_CONFIRMED,
        ]);
    }

    /**
     * Get status label in Indonesian.
     */
    public function getStatusLabelAttribute(): string
    {
        return match ($this->status) {
            self::STATUS_DRAFT => 'Draft',
            self::STATUS_SENT => 'Dikirim ke Supplier',
            self::STATUS_CONFIRMED => 'Dikonfirmasi',
            self::STATUS_SHIPPED => 'Dalam Pengiriman',
            self::STATUS_PARTIAL => 'Diterima Sebagian',
            self::STATUS_RECEIVED => 'Diterima Lengkap',
            self::STATUS_CANCELLED => 'Dibatalkan',
            default => ucfirst($this->status),
        };
    }

    /**
     * Get status color for UI.
     */
    public function getStatusColorAttribute(): string
    {
        return match ($this->status) {
            self::STATUS_DRAFT => 'gray',
            self::STATUS_SENT => 'blue',
            self::STATUS_CONFIRMED => 'indigo',
            self::STATUS_SHIPPED => 'yellow',
            self::STATUS_PARTIAL => 'orange',
            self::STATUS_RECEIVED => 'green',
            self::STATUS_CANCELLED => 'red',
            default => 'gray',
        };
    }

    /**
     * Get all available statuses.
     */
    public static function getStatuses(): array
    {
        return [
            self::STATUS_DRAFT => 'Draft',
            self::STATUS_SENT => 'Dikirim ke Supplier',
            self::STATUS_CONFIRMED => 'Dikonfirmasi',
            self::STATUS_SHIPPED => 'Dalam Pengiriman',
            self::STATUS_PARTIAL => 'Diterima Sebagian',
            self::STATUS_RECEIVED => 'Diterima Lengkap',
            self::STATUS_CANCELLED => 'Dibatalkan',
        ];
    }

    /**
     * Scope a query to only include draft POs.
     */
    public function scopeDraft($query)
    {
        return $query->where('status', self::STATUS_DRAFT);
    }

    /**
     * Scope a query to only include pending POs (waiting for receiving).
     */
    public function scopePending($query)
    {
        return $query->whereIn('status', [
            self::STATUS_SENT,
            self::STATUS_CONFIRMED,
            self::STATUS_SHIPPED,
            self::STATUS_PARTIAL,
        ]);
    }

    /**
     * Scope a query to only include completed POs.
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', self::STATUS_RECEIVED);
    }

    /**
     * Get total quantity ordered for all items.
     */
    public function getTotalQuantityOrderedAttribute()
    {
        return $this->items()->sum('quantity_ordered');
    }

    /**
     * Get total quantity received for all items.
     */
    public function getTotalQuantityReceivedAttribute()
    {
        return $this->items()->sum('quantity_received');
    }

    /**
     * Get completion percentage.
     */
    public function getCompletionPercentageAttribute(): float
    {
        $ordered = $this->total_quantity_ordered;
        if ($ordered == 0) return 0;
        
        return round(($this->total_quantity_received / $ordered) * 100, 1);
    }
}
