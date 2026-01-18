<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Expense extends Model
{
    protected $fillable = [
        'expense_category_id',
        'user_id',
        'amount',
        'expense_date',
        'description',
        'proof_image',
    ];

    protected $casts = [
        'expense_date' => 'date',
        'amount' => 'decimal:2',
    ];

    /**
     * Get the category
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(ExpenseCategory::class, 'expense_category_id');
    }

    /**
     * Get the user who created this expense
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
