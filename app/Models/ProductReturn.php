<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductReturn extends Model
{
    use HasFactory;

    protected $table = 'returns';

    // Return Type Constants
    const TYPE_REFUND = 'refund';
    const TYPE_EXCHANGE = 'exchange';
    const TYPE_CREDIT = 'credit';

    // Status Constants
    const STATUS_PENDING = 'pending';
    const STATUS_APPROVED = 'approved';
    const STATUS_REJECTED = 'rejected';
    const STATUS_COMPLETED = 'completed';

    protected $fillable = [
        'return_number',
        'transaction_id',
        'user_id',
        'approved_by',
        'return_type',
        'status',
        'return_amount',
        'reason',
        'rejection_note',
        'approved_at',
    ];

    protected $casts = [
        'return_amount' => 'decimal:2',
        'approved_at' => 'datetime',
    ];

    /**
     * Boot function to auto-generate return number
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($return) {
            if (empty($return->return_number)) {
                $return->return_number = self::generateReturnNumber();
            }
        });
    }

    /**
     * Generate unique return number
     */
    public static function generateReturnNumber(): string
    {
        $date = now()->format('Ymd');
        $prefix = 'RTN-' . $date . '-';
        
        $lastReturn = self::where('return_number', 'like', $prefix . '%')
            ->orderBy('return_number', 'desc')
            ->first();

        if ($lastReturn) {
            $lastNumber = (int) substr($lastReturn->return_number, -3);
            $newNumber = str_pad($lastNumber + 1, 3, '0', STR_PAD_LEFT);
        } else {
            $newNumber = '001';
        }

        return $prefix . $newNumber;
    }

    /**
     * Get the transaction associated with this return
     */
    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }

    /**
     * Get the user who created this return
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the manager who approved/rejected this return
     */
    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    /**
     * Get return items
     */
    public function items()
    {
        return $this->hasMany(ReturnItem::class, 'return_id');
    }

    /**
     * Get return types for dropdown
     */
    public static function getReturnTypes(): array
    {
        return [
            self::TYPE_REFUND => 'Refund (Uang Kembali)',
            self::TYPE_EXCHANGE => 'Exchange (Tukar Barang)',
            self::TYPE_CREDIT => 'Credit (Voucher)',
        ];
    }

    /**
     * Get statuses for dropdown
     */
    public static function getStatuses(): array
    {
        return [
            self::STATUS_PENDING => 'Menunggu Approval',
            self::STATUS_APPROVED => 'Disetujui',
            self::STATUS_REJECTED => 'Ditolak',
            self::STATUS_COMPLETED => 'Selesai',
        ];
    }

    /**
     * Check if return can be approved
     */
    public function canBeApproved(): bool
    {
        return $this->status === self::STATUS_PENDING;
    }

    /**
     * Check if return is pending
     */
    public function isPending(): bool
    {
        return $this->status === self::STATUS_PENDING;
    }

    /**
     * Check if return is approved
     */
    public function isApproved(): bool
    {
        return $this->status === self::STATUS_APPROVED;
    }

    /**
     * Get status label
     */
    public function getStatusLabelAttribute(): string
    {
        return self::getStatuses()[$this->status] ?? $this->status;
    }

    /**
     * Get return type label
     */
    public function getTypeLabelAttribute(): string
    {
        return self::getReturnTypes()[$this->return_type] ?? $this->return_type;
    }
}
