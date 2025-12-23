<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;
    
    /**
     * fillable
     *
     * @var array
     */
    protected $fillable = [
        'image', 
        'barcode', 
        'title', 
        'description', 
        'buy_price', 
        'sell_price', 
        'category_id', 
        'supplier_id',
        'unit',
        'is_recipe',
        'is_supply',
        'is_ingredient',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'is_recipe' => 'boolean',
        'is_supply' => 'boolean',
        'is_ingredient' => 'boolean',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['warehouse_stock', 'display_stock'];

    /**
     * category
     *
     * @return void
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * supplier
     *
     * @return void
     */
    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    /**
     * Get warehouse stock records.
     */
    public function warehouseStocks()
    {
        return $this->hasMany(WarehouseStock::class);
    }

    /**
     * Get display stock records.
     */
    public function displayStocks()
    {
        return $this->hasMany(DisplayStock::class);
    }

    /**
     * Get stock movements for this product.
     */
    public function stockMovements()
    {
        return $this->hasMany(StockMovement::class);
    }

    /**
     * Get total warehouse stock.
     */
    public function getWarehouseStockAttribute()
    {
        return $this->warehouseStocks()->sum('quantity');
    }

    /**
     * Get total display stock.
     */
    public function getDisplayStockAttribute()
    {
        return $this->displayStocks()->sum('quantity');
    }

    /**
     * Get ingredients (for recipe products)
     */
    public function ingredients()
    {
        return $this->hasMany(ProductIngredient::class);
    }

    /**
     * Get products that use this product as ingredient
     */
    public function usedInRecipes()
    {
        return $this->hasMany(ProductIngredient::class, 'ingredient_id');
    }

    /**
     * Check if product is a recipe/composite product
     */
    public function hasIngredients()
    {
        return $this->is_recipe && $this->ingredients()->count() > 0;
    }

    /**
     * image
     *
     * @return Attribute
     */
    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => asset('/storage/products/' . $value),
        );
    }
}
