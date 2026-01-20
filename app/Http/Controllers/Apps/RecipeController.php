<?php

namespace App\Http\Controllers\Apps;

use App\Models\Product;
use App\Models\Category;
use App\Models\ProductVariant;
use App\Models\ProductVariantIngredient;
use App\Models\ProductIngredient;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RecipeController extends Controller
{
    /**
     * Display a listing of recipes.
     */
    public function index()
    {
        $recipes = Product::where('product_type', Product::TYPE_RECIPE)
            ->with(['category', 'variants'])
            ->when(request()->search, function ($query) {
                $query->where('title', 'like', '%' . request()->search . '%');
            })
            ->latest()
            ->paginate(request()->input('per_page', 10))
            ->withQueryString();

        return Inertia::render('Dashboard/Recipes/Index', [
            'recipes' => $recipes,
        ]);
    }

    /**
     * Show the form for creating a new recipe.
     */
    public function create()
    {
        $categories = Category::orderBy('name')->get();
        
        // Get ingredients and supplies for recipe components
        $ingredients = Product::where('product_type', Product::TYPE_INGREDIENT)
            ->orderBy('title')
            ->get(['id', 'title', 'unit']);
        
        $supplies = Product::where('product_type', Product::TYPE_SUPPLY)
            ->orderBy('title')
            ->get(['id', 'title', 'unit']);
        
        return Inertia::render('Dashboard/Recipes/Create', [
            'categories' => $categories,
            'ingredients' => $ingredients,
            'supplies' => $supplies,
        ]);
    }

    /**
     * Store a newly created recipe.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'image' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
            'sku' => 'nullable|unique:products,sku',
            'barcode' => 'nullable|unique:products,barcode',
            'title' => 'required',
            'description' => 'nullable',
            'category_id' => 'required|exists:categories,id',
            'buy_price' => 'nullable|numeric|min:0',
            'sell_price' => 'required|numeric|min:0',
            'variants' => 'nullable|array',
            'variants.*.name' => 'required|string',
            'variants.*.buy_price' => 'nullable|numeric|min:0',
            'variants.*.sell_price' => 'required|numeric|min:0',
            'variants.*.ingredients' => 'nullable|array',
        ]);

        DB::transaction(function () use ($request, $validated) {
            // Upload image
            $imageName = null;
            if ($request->file('image')) {
                $image = $request->file('image');
                $image->storeAs('public/products', $image->hashName());
                $imageName = $image->hashName();
            }

            // Get category for SKU generation
            $category = Category::find($validated['category_id']);
            
            // Generate SKU if not provided
            $sku = $request->sku;
            if (empty($sku)) {
                $sku = Product::generateSku($category, $validated['title']);
            }

            $recipe = Product::create([
                'image' => $imageName,
                'sku' => $sku,
                'barcode' => $request->barcode ?: null,
                'title' => $validated['title'],
                'description' => $validated['description'] ?? '',
                'category_id' => $validated['category_id'],
                'buy_price' => $validated['buy_price'] ?? 0,
                'sell_price' => $validated['sell_price'],
                'unit' => 'pcs',
                'product_type' => Product::TYPE_RECIPE,
            ]);

            // Create variants with their ingredients
            if (!empty($validated['variants'])) {
                foreach ($validated['variants'] as $index => $variantData) {
                    $variant = ProductVariant::create([
                        'product_id' => $recipe->id,
                        'name' => $variantData['name'],
                        'buy_price' => $variantData['buy_price'] ?? 0,
                        'sell_price' => $variantData['sell_price'],
                        'sort_order' => $index,
                        'is_default' => $index === 0,
                    ]);

                    // Add ingredients to variant
                    if (!empty($variantData['ingredients'])) {
                        foreach ($variantData['ingredients'] as $ingredientData) {
                            ProductVariantIngredient::create([
                                'product_variant_id' => $variant->id,
                                'ingredient_id' => $ingredientData['ingredient_id'],
                                'quantity' => $ingredientData['quantity'],
                            ]);
                        }
                    }
                }
            }
        });

        return redirect()->route('recipes.index')->with('success', 'Resep berhasil ditambahkan!');
    }

    /**
     * Show the form for editing a recipe.
     */
    public function edit(Product $recipe)
    {
        $recipe->load(['variants.ingredients.ingredient']);
        
        $categories = Category::orderBy('name')->get();
        
        $ingredients = Product::where('product_type', Product::TYPE_INGREDIENT)
            ->orderBy('title')
            ->get(['id', 'title', 'unit']);
        
        $supplies = Product::where('product_type', Product::TYPE_SUPPLY)
            ->orderBy('title')
            ->get(['id', 'title', 'unit']);

        return Inertia::render('Dashboard/Recipes/Edit', [
            'recipe' => $recipe,
            'categories' => $categories,
            'ingredients' => $ingredients,
            'supplies' => $supplies,
        ]);
    }

    /**
     * Update the specified recipe.
     */
    public function update(Request $request, Product $recipe)
    {
        $validated = $request->validate([
            'image' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
            'sku' => 'required|unique:products,sku,' . $recipe->id,
            'barcode' => 'nullable|unique:products,barcode,' . $recipe->id,
            'title' => 'required',
            'description' => 'nullable',
            'category_id' => 'required|exists:categories,id',
            'buy_price' => 'nullable|numeric|min:0',
            'sell_price' => 'required|numeric|min:0',
            'variants' => 'nullable|array',
            'variants.*.name' => 'required|string',
            'variants.*.buy_price' => 'nullable|numeric|min:0',
            'variants.*.sell_price' => 'required|numeric|min:0',
            'variants.*.ingredients' => 'nullable|array',
        ]);

        DB::transaction(function () use ($request, $validated, $recipe) {
            // Update image if provided
            if ($request->file('image')) {
                if ($recipe->getRawOriginal('image')) {
                    Storage::disk('local')->delete('public/products/' . $recipe->getRawOriginal('image'));
                }
                $image = $request->file('image');
                $image->storeAs('public/products', $image->hashName());
                $validated['image'] = $image->hashName();
            }

            $recipe->update([
                'image' => $validated['image'] ?? $recipe->getRawOriginal('image'),
                'sku' => $validated['sku'],
                'barcode' => $request->barcode ?: null,
                'title' => $validated['title'],
                'description' => $validated['description'] ?? '',
                'category_id' => $validated['category_id'],
                'buy_price' => $validated['buy_price'] ?? 0,
                'sell_price' => $validated['sell_price'],
            ]);

            // Update variants - delete old and create new
            if (isset($validated['variants'])) {
                // Delete old variants and their ingredients
                $recipe->variants()->each(function ($variant) {
                    $variant->ingredients()->delete();
                    $variant->delete();
                });

                // Create new variants
                foreach ($validated['variants'] as $index => $variantData) {
                    $variant = ProductVariant::create([
                        'product_id' => $recipe->id,
                        'name' => $variantData['name'],
                        'buy_price' => $variantData['buy_price'] ?? 0,
                        'sell_price' => $variantData['sell_price'],
                        'sort_order' => $index,
                        'is_default' => $index === 0,
                    ]);

                    if (!empty($variantData['ingredients'])) {
                        foreach ($variantData['ingredients'] as $ingredientData) {
                            ProductVariantIngredient::create([
                                'product_variant_id' => $variant->id,
                                'ingredient_id' => $ingredientData['ingredient_id'],
                                'quantity' => $ingredientData['quantity'],
                            ]);
                        }
                    }
                }
            }
        });

        return redirect()->route('recipes.index')->with('success', 'Resep berhasil diperbarui!');
    }

    /**
     * Remove the specified recipe.
     */
    public function destroy(Product $recipe)
    {
        DB::transaction(function () use ($recipe) {
            if ($recipe->getRawOriginal('image')) {
                Storage::disk('local')->delete('public/products/' . $recipe->getRawOriginal('image'));
            }

            // Delete variants and their ingredients
            $recipe->variants()->each(function ($variant) {
                $variant->ingredients()->delete();
                $variant->delete();
            });

            $recipe->delete();
        });

        return redirect()->route('recipes.index')->with('success', 'Resep berhasil dihapus!');
    }
}
