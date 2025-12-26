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
            'barcode' => 'required|unique:products,barcode',
            'title' => 'required',
            'description' => 'required',
            'category_id' => 'required',
            'supplier_id' => 'nullable|exists:suppliers,id',
            'buy_price' => 'required',
            'sell_price' => 'required',
            'unit' => 'required',
            'product_type' => 'required|in:sellable,ingredient,supply,recipe',
        ]);
        //upload image
        $image = $request->file('image');
        $image->storeAs('public/products', $image->hashName());

        //create product
        $product = Product::create([
            'image' => $image->hashName(),
            'barcode' => $request->barcode,
            'title' => $request->title,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'supplier_id' => $request->supplier_id,
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
     * Show the form for editing the specified resource.
     *
     * @param  Product  $product
     * @return \Inertia\Response
     */
    public function edit(Product $product)
    {
        //get categories
        $categories = Category::all();
        $suppliers = Supplier::orderBy('name')->get(['id', 'name', 'company']);
        
        // Get available ingredients (products that can be used as ingredients)
        $availableIngredients = Product::where('id', '!=', $product->id)
            ->whereIn('product_type', [Product::TYPE_INGREDIENT, Product::TYPE_SUPPLY])
            ->get(['id', 'title', 'unit', 'barcode']);
        
        // Load variants and price history
        $product->load('variants.ingredients.ingredient', 'priceHistories.user');

        return Inertia::render('Dashboard/Products/Edit', [
            'product' => $product,
            'categories' => $categories,
            'suppliers' => $suppliers,
            'availableIngredients' => $availableIngredients,
            'priceHistories' => $product->priceHistories,
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
        $request->validate([
            'barcode' => 'required|unique:products,barcode,' . $product->id,
            'title' => 'required',
            'description' => 'required',
            'category_id' => 'required',
            'supplier_id' => 'nullable|exists:suppliers,id',
            'buy_price' => 'required',
            'sell_price' => 'required',
            'unit' => 'required',
            'min_stock' => 'nullable|numeric|min:0',
            'product_type' => 'required|in:sellable,ingredient,supply,recipe',
        ]);

        $updateData = [
            'barcode' => $request->barcode,
            'title' => $request->title,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'supplier_id' => $request->supplier_id,
            'buy_price' => $request->buy_price,
            'sell_price' => $request->sell_price,
            'unit' => $request->unit,
            'min_stock' => $request->min_stock ?? 0,
            'product_type' => $request->product_type,
        ];

        //check image update
        if ($request->file('image')) {
            //remove old image
            Storage::disk('local')->delete('public/products/' . basename($product->image));

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

        //remove image
        Storage::disk('local')->delete('public/products/' . basename($product->image));

        //delete
        $product->delete();

        //redirect
        return back();
    }
}
