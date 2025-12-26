<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    // Product Type Constants
    const TYPE_SELLABLE = 'sellable';
    const TYPE_INGREDIENT = 'ingredient';
    const TYPE_SUPPLY = 'supply';
    const TYPE_RECIPE = 'recipe';
    
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
        'average_cost',
        'category_id', 
        'supplier_id',
        'unit',
        'min_stock',
        'product_type',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'min_stock' => 'decimal:3',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['warehouse_stock', 'display_stock'];

    /**
     * Get the category that owns the product.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the supplier that owns the product.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
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
     * Get product variants (sizes).
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function variants()
    {
        return $this->hasMany(ProductVariant::class)->orderBy('sort_order');
    }

    /**
     * Get price history records.
     */
    public function priceHistories()
    {
        return $this->hasMany(PriceHistory::class)->orderBy('created_at', 'desc');
    }

    /**
     * Check if product has variants.
     */
    public function hasVariants(): bool
    {
        return $this->variants()->count() > 0;
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

    /**
     * Calculate weighted average cost from all stock in movements.
     * Formula: Σ(qty × price) / Σ(qty)
     *
     * @return float
     */
    public function calculateAverageCost(): float
    {
        $movements = StockMovement::where('product_id', $this->id)
            ->where('from_type', StockMovement::TYPE_SUPPLIER)
            ->whereNotNull('purchase_price')
            ->where('purchase_price', '>', 0)
            ->get();

        if ($movements->isEmpty()) {
            return 0;
        }

        $totalValue = $movements->sum(fn($m) => $m->quantity * $m->purchase_price);
        $totalQty = $movements->sum('quantity');

        return $totalQty > 0 ? round($totalValue / $totalQty, 2) : 0;
    }

    /**
     * Update the average cost and save to database.
     *
     * @return float The calculated average cost
     */
    public function updateAverageCost(): float
    {
        $averageCost = $this->calculateAverageCost();
        $this->update(['average_cost' => $averageCost]);
        return $averageCost;
    }
}
