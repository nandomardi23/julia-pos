<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CashFlow extends Model
{
    use HasFactory;

    const TYPE_IN = 'in';
    const TYPE_OUT = 'out';

    protected $fillable = [
        'shift_id',
        'user_id',
        'type',
        'amount',
        'category',
        'description',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
    ];

    /**
     * Get the shift that owns this cash flow.
     */
    public function shift()
    {
        return $this->belongsTo(Shift::class);
    }

    /**
     * Get the user who created this cash flow.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Check if this is cash in.
     */
    public function isCashIn(): bool
    {
        return $this->type === self::TYPE_IN;
    }

    /**
     * Check if this is cash out.
     */
    public function isCashOut(): bool
    {
        return $this->type === self::TYPE_OUT;
    }

    /**
     * Get types for dropdown.
     */
    public static function getTypes(): array
    {
        return [
            self::TYPE_IN => 'Kas Masuk',
            self::TYPE_OUT => 'Kas Keluar',
        ];
    }

    /**
     * Get common categories for cash in.
     */
    public static function getCashInCategories(): array
    {
        return [
            'modal_tambahan' => 'Modal Tambahan',
            'pengembalian' => 'Pengembalian',
            'lainnya' => 'Lainnya',
        ];
    }

    /**
     * Get common categories for cash out.
     */
    public static function getCashOutCategories(): array
    {
        return [
            'pembelian_kecil' => 'Pembelian Kecil',
            'biaya_operasional' => 'Biaya Operasional',
            'pengeluaran_darurat' => 'Pengeluaran Darurat',
            'setor_bank' => 'Setor ke Bank',
            'lainnya' => 'Lainnya',
        ];
    }

    /**
     * Scope for cash in records.
     */
    public function scopeCashIn($query)
    {
        return $query->where('type', self::TYPE_IN);
    }

    /**
     * Scope for cash out records.
     */
    public function scopeCashOut($query)
    {
        return $query->where('type', self::TYPE_OUT);
    }
}
