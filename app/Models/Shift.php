<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shift extends Model
{
    use HasFactory;

    const STATUS_ACTIVE = 'active';
    const STATUS_CLOSED = 'closed';

    protected $fillable = [
        'user_id',
        'shift_number',
        'started_at',
        'ended_at',
        'opening_cash',
        'closing_cash',
        'expected_cash',
        'difference',
        'status',
        'notes',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
        'opening_cash' => 'decimal:2',
        'closing_cash' => 'decimal:2',
        'expected_cash' => 'decimal:2',
        'difference' => 'decimal:2',
    ];

    /**
     * Boot function for generating shift number.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($shift) {
            if (empty($shift->shift_number)) {
                $shift->shift_number = self::generateShiftNumber();
            }
            if (empty($shift->started_at)) {
                $shift->started_at = now();
            }
        });
    }

    /**
     * Generate unique shift number.
     */
    public static function generateShiftNumber(): string
    {
        $date = now()->format('Ymd');
        $prefix = 'SFT-' . $date . '-';
        
        $lastShift = self::where('shift_number', 'like', $prefix . '%')
            ->orderBy('shift_number', 'desc')
            ->first();

        if ($lastShift) {
            $lastNumber = (int) substr($lastShift->shift_number, -3);
            $newNumber = str_pad($lastNumber + 1, 3, '0', STR_PAD_LEFT);
        } else {
            $newNumber = '001';
        }

        return $prefix . $newNumber;
    }

    /**
     * Get the user (cashier) that owns this shift.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Alias for user relationship.
     */
    public function cashier()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get cash flows for this shift.
     */
    public function cashFlows()
    {
        return $this->hasMany(CashFlow::class);
    }

    /**
     * Get transactions for this shift.
     */
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    /**
     * Check if shift is active.
     */
    public function isActive(): bool
    {
        return $this->status === self::STATUS_ACTIVE;
    }

    /**
     * Check if shift is closed.
     */
    public function isClosed(): bool
    {
        return $this->status === self::STATUS_CLOSED;
    }

    /**
     * Get active shift for a user.
     */
    public static function getActiveShift($userId = null)
    {
        $userId = $userId ?? auth()->id();
        
        return self::where('user_id', $userId)
            ->where('status', self::STATUS_ACTIVE)
            ->first();
    }

    /**
     * Check if user has active shift.
     */
    public static function hasActiveShift($userId = null): bool
    {
        return self::getActiveShift($userId) !== null;
    }

    /**
     * Calculate total cash in from cash flows.
     */
    public function getTotalCashInAttribute(): float
    {
        return (float) $this->cashFlows()->where('type', 'in')->sum('amount');
    }

    /**
     * Calculate total cash out from cash flows.
     */
    public function getTotalCashOutAttribute(): float
    {
        return (float) $this->cashFlows()->where('type', 'out')->sum('amount');
    }

    /**
     * Calculate total sales from transactions.
     */
    public function getTotalSalesAttribute(): float
    {
        return (float) $this->transactions()->sum('grand_total');
    }

    /**
     * Calculate total cash sales only.
     */
    public function getTotalCashSalesAttribute(): float
    {
        return (float) $this->transactions()
            ->where('payment_method', 'cash')
            ->sum('grand_total');
    }

    /**
     * Calculate total change given to customers.
     */
    public function getTotalChangeAttribute(): float
    {
        return (float) $this->transactions()
            ->where('payment_method', 'cash')
            ->sum('change');
    }

    /**
     * Calculate expected cash at end of shift.
     * Formula: opening_cash + cash_sales - change + cash_in - cash_out
     */
    public function calculateExpectedCash(): float
    {
        return $this->opening_cash 
            + $this->total_cash_sales 
            - $this->total_change
            + $this->total_cash_in 
            - $this->total_cash_out;
    }

    /**
     * Get transaction count for this shift.
     */
    public function getTransactionCountAttribute(): int
    {
        return $this->transactions()->count();
    }

    /**
     * Close the shift with actual closing cash.
     */
    public function close(float $closingCash, ?string $notes = null): self
    {
        $expectedCash = $this->calculateExpectedCash();
        
        $this->update([
            'ended_at' => now(),
            'closing_cash' => $closingCash,
            'expected_cash' => $expectedCash,
            'difference' => $closingCash - $expectedCash,
            'status' => self::STATUS_CLOSED,
            'notes' => $notes,
        ]);

        return $this->fresh();
    }

    /**
     * Get statuses for dropdown.
     */
    public static function getStatuses(): array
    {
        return [
            self::STATUS_ACTIVE => 'Aktif',
            self::STATUS_CLOSED => 'Ditutup',
        ];
    }

    /**
     * Scope for active shifts.
     */
    public function scopeActive($query)
    {
        return $query->where('status', self::STATUS_ACTIVE);
    }

    /**
     * Scope for closed shifts.
     */
    public function scopeClosed($query)
    {
        return $query->where('status', self::STATUS_CLOSED);
    }
}
