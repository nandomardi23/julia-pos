<?php

namespace App\Http\Controllers\Apps;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use App\Models\Supplier;
use App\Models\ProductVariant;
use App\Models\PriceHistory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $type = $request->input('type', 'product');
        
        $products = Product::query()
            // Filter by product_type
            ->when($type === 'product', function ($query) {
                // Produk jual (sellable)
                $query->where('product_type', Product::TYPE_SELLABLE);
            })
            ->when($type === 'ingredient', function ($query) {
                $query->where('product_type', Product::TYPE_INGREDIENT);
            })
            ->when($type === 'recipe', function ($query) {
                $query->where('product_type', Product::TYPE_RECIPE);
            })
            ->when($type === 'supply', function ($query) {
                $query->where('product_type', Product::TYPE_SUPPLY);
            })
            // Search filter
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', '%' . $search . '%');
            })
            ->with('category')
            ->latest()
            ->paginate($request->input('per_page', 10))
            ->withQueryString();

        // Get page titles based on type
        $typeLabels = [
            'product' => 'Produk Jual',
            'ingredient' => 'Bahan Baku',
            'recipe' => 'Resep',
            'supply' => 'Alat Pendukung',
        ];

        return Inertia::render('Dashboard/Products/Index', [
            'products' => $products,
            'currentType' => $type,
            'typeLabel' => $typeLabels[$type] ?? 'Produk',
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        //get categories
        $categories = Category::all();
        $suppliers = Supplier::orderBy('name')->get(['id', 'name', 'company']);

        //return inertia
        return Inertia::render('Dashboard/Products/Create', [
            'categories' => $categories,
            'suppliers' => $suppliers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        /**
         * validate
         */
        $request->validate([
            'sku' => 'nullable|unique:products,sku',
            'barcode' => 'nullable|unique:products,barcode',
            'title' => 'required',
            'description' => 'required',
            'category_id' => 'required',
            'buy_price' => 'required',
            'sell_price' => 'required',
            'unit' => 'required',
            'product_type' => 'required|in:sellable,ingredient,supply,recipe',
        ]);
        //upload image
        $image = $request->file('image');
        $image->storeAs('public/products', $image->hashName());

        // Get category for SKU generation
        $category = Category::find($request->category_id);
        
        // Generate SKU if not provided
        $sku = $request->sku;
        if (empty($sku)) {
            $sku = Product::generateSku($category, $request->title);
        }

        //create product
        $product = Product::create([
            'image' => $image->hashName(),
            'sku' => $sku,
            'barcode' => $request->barcode ?: null,
            'title' => $request->title,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'buy_price' => $request->buy_price,
            'sell_price' => $request->sell_price,
            'unit' => $request->unit,
            'product_type' => $request->product_type,
        ]);

        // Note: Recipe ingredients are now managed via ProductVariant and ProductVariantIngredient
        // This happens in Recipe/Variant management, not here

        //redirect
        return to_route('products.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  Product  $product
     * @return \Inertia\Response
     */
    public function show(Product $product)
    {
        // Load variants and price history
        $product->load(['category', 'variants.ingredients.ingredient', 'priceHistories.user']);

        // Get sales analytics
        $salesStats = \DB::table('transaction_details')
            ->join('transactions', 'transaction_details.transaction_id', '=', 'transactions.id')
            ->where('transaction_details.product_id', $product->id)
            ->selectRaw('
                COUNT(DISTINCT transaction_details.transaction_id) as total_transactions,
                SUM(transaction_details.qty) as total_qty_sold,
                SUM(transaction_details.price * transaction_details.qty) as total_revenue
            ')
            ->first();

        // Get sales by variant
        $variantSales = \DB::table('transaction_details')
            ->where('transaction_details.product_id', $product->id)
            ->whereNotNull('transaction_details.variant_name')
            ->groupBy('transaction_details.variant_name')
            ->selectRaw('
                transaction_details.variant_name,
                SUM(transaction_details.qty) as qty_sold,
                SUM(transaction_details.price * transaction_details.qty) as revenue
            ')
            ->get();

        // Get recent transactions (last 30 days, max 20)
        $recentTransactions = \DB::table('transaction_details')
            ->join('transactions', 'transaction_details.transaction_id', '=', 'transactions.id')
            ->where('transaction_details.product_id', $product->id)
            ->where('transactions.created_at', '>=', now()->subDays(30))
            ->select(
                'transaction_details.id',
                'transaction_details.qty',
                'transaction_details.price',
                'transaction_details.variant_name',
                'transactions.invoice',
                'transactions.grand_total',
                'transactions.created_at as transaction_date'
            )
            ->orderBy('transactions.created_at', 'desc')
            ->limit(20)
            ->get();

        // Pass raw image filename
        $productData = $product->toArray();
        $productData['image'] = $product->getRawOriginal('image');

        return Inertia::render('Dashboard/Products/Show', [
            'product' => $productData,
            'priceHistories' => $product->priceHistories,
            'salesStats' => $salesStats,
            'variantSales' => $variantSales,
            'recentTransactions' => $recentTransactions,
            'warehouseStocks' => [],
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  Product  $product
     * @return \Inertia\Response
     */
    public function edit(Product $product)
    {
        //get categories
        $categories = Category::all();
        
        // Get available ingredients (products that can be used as ingredients)
        $availableIngredients = Product::where('id', '!=', $product->id)
            ->whereIn('product_type', [Product::TYPE_INGREDIENT, Product::TYPE_SUPPLY])
            ->get(['id', 'title', 'unit', 'barcode']);
        
        // Load variants and price history
        $product->load(['variants.ingredients.ingredient', 'priceHistories.user']);

        // Get sales analytics
        $salesStats = \DB::table('transaction_details')
            ->join('transactions', 'transaction_details.transaction_id', '=', 'transactions.id')
            ->where('transaction_details.product_id', $product->id)
            ->selectRaw('
                COUNT(DISTINCT transaction_details.transaction_id) as total_transactions,
                SUM(transaction_details.qty) as total_qty_sold,
                SUM(transaction_details.price * transaction_details.qty) as total_revenue
            ')
            ->first();

        // Get sales by variant
        $variantSales = \DB::table('transaction_details')
            ->where('transaction_details.product_id', $product->id)
            ->whereNotNull('transaction_details.variant_name')
            ->groupBy('transaction_details.variant_name')
            ->selectRaw('
                transaction_details.variant_name,
                SUM(transaction_details.qty) as qty_sold,
                SUM(transaction_details.price * transaction_details.qty) as revenue
            ')
            ->get();

        // Get recent transactions (last 30 days, max 20)
        $recentTransactions = \DB::table('transaction_details')
            ->join('transactions', 'transaction_details.transaction_id', '=', 'transactions.id')
            ->where('transaction_details.product_id', $product->id)
            ->where('transactions.created_at', '>=', now()->subDays(30))
            ->select(
                'transaction_details.id',
                'transaction_details.qty',
                'transaction_details.price',
                'transaction_details.variant_name',
                'transactions.invoice',
                'transactions.grand_total',
                'transactions.created_at as transaction_date'
            )
            ->orderBy('transactions.created_at', 'desc')
            ->limit(20)
            ->get();

        // Pass raw image filename for ImagePreview component
        $productData = $product->toArray();
        $productData['image'] = $product->getRawOriginal('image');

        return Inertia::render('Dashboard/Products/Edit', [
            'product' => $productData,
            'categories' => $categories,
            'availableIngredients' => $availableIngredients,
            'priceHistories' => $product->priceHistories,
            'salesStats' => $salesStats,
            'variantSales' => $variantSales,
            'recentTransactions' => $recentTransactions,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Product  $product
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Product $product)
    {
        /**
         * validate
         */
        $isSellableOrRecipe = in_array($request->product_type, [Product::TYPE_SELLABLE, Product::TYPE_RECIPE]);

        $request->validate([
            'sku' => [
                $isSellableOrRecipe ? 'required' : 'nullable',
                'unique:products,sku,' . $product->id
            ],
            'barcode' => 'nullable|unique:products,barcode,' . $product->id,
            'title' => 'required',
            'description' => 'required',
            'category_id' => 'required',
            'buy_price' => 'required',
            'sell_price' => 'required',
            'unit' => 'required',
            'min_stock' => 'nullable|numeric|min:0',
            'product_type' => 'required|in:sellable,ingredient,supply,recipe',
        ]);

        $updateData = [
            'sku' => $request->sku,
            'barcode' => $request->barcode ?: null,
            'title' => $request->title,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'buy_price' => $request->buy_price,
            'sell_price' => $request->sell_price,
            'unit' => $request->unit,
            'min_stock' => $request->min_stock ?? 0,
            'product_type' => $request->product_type,
        ];

        //check image update
        if ($request->file('image')) {
            //remove old image using raw filename
            Storage::disk('local')->delete('public/products/' . $product->getRawOriginal('image'));

            //upload new image
            $image = $request->file('image');
            $image->storeAs('public/products', $image->hashName());
            $updateData['image'] = $image->hashName();
        }

        // Record price change if buy_price or sell_price changed
        if ($product->buy_price != $request->buy_price || $product->sell_price != $request->sell_price) {
            PriceHistory::recordChange(
                $product->id,
                $product->buy_price,
                $request->buy_price,
                $product->sell_price,
                $request->sell_price
            );
        }

        $product->update($updateData);

        // Note: Recipe ingredients are now managed via ProductVariant and ProductVariantIngredient
        // Variants are synced below

        // Sync variants
        $existingVariantIds = $product->variants->pluck('id')->toArray();
        $newVariantIds = [];

        if ($request->variants) {
            foreach ($request->variants as $index => $variant) {
                if (!empty($variant['id'])) {
                    // Update existing variant
                    ProductVariant::where('id', $variant['id'])->update([
                        'name' => $variant['name'],
                        'buy_price' => $variant['buy_price'] ?? 0,
                        'sell_price' => $variant['sell_price'] ?? 0,
                        'sort_order' => $index,
                        'is_default' => $variant['is_default'] ?? false,
                    ]);
                    $newVariantIds[] = $variant['id'];
                } else {
                    // Create new variant
                    $newVariant = ProductVariant::create([
                        'product_id' => $product->id,
                        'name' => $variant['name'],
                        'buy_price' => $variant['buy_price'] ?? 0,
                        'sell_price' => $variant['sell_price'] ?? 0,
                        'sort_order' => $index,
                        'is_default' => $variant['is_default'] ?? false,
                    ]);
                    $newVariantIds[] = $newVariant->id;
                }
            }
        }

        // Delete removed variants
        $variantsToDelete = array_diff($existingVariantIds, $newVariantIds);
        ProductVariant::whereIn('id', $variantsToDelete)->delete();

        //redirect
        return to_route('products.index');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        //find by ID
        $product = Product::findOrFail($id);

        //remove image using raw filename
        Storage::disk('local')->delete('public/products/' . $product->getRawOriginal('image'));

        //delete
        $product->delete();

        //redirect
        return back();
    }
}
