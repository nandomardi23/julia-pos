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
     * Get all products from this supplier.
     */
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
