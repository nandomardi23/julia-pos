<?php

namespace App\Http\Controllers\Apps;

use App\Models\Product;
use App\Models\Category;
use App\Models\PriceHistory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class IngredientController extends Controller
{
    /**
     * Display a listing of ingredients (Bahan Baku).
     */
    public function index()
    {
        $ingredients = Product::whereJsonContains('tags', Product::TAG_INGREDIENT)
            ->with('category')
            ->when(request()->search, function ($query) {
                $query->where('title', 'like', '%' . request()->search . '%');
            })
            ->latest()
            ->paginate(request()->input('per_page', 10))
            ->withQueryString();

        return Inertia::render('Dashboard/Ingredients/Index', [
            'ingredients' => $ingredients,
        ]);
    }

    /**
     * Show the form for creating a new ingredient.
     */
    public function create()
    {
        $categories = Category::orderBy('name')->get();
        
        return Inertia::render('Dashboard/Ingredients/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created ingredient.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'image' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
            'title' => 'required',
            'description' => 'nullable',
            'category_id' => 'required|exists:categories,id',
            'buy_price' => 'required|numeric|min:0',
            'sell_price' => 'nullable|numeric|min:0',
            'unit' => 'required|string',
            'min_stock' => 'nullable|numeric|min:0',
        ]);

        // Upload image
        $imageName = null;
        if ($request->file('image')) {
            $image = $request->file('image');
            $image->storeAs('public/products', $image->hashName());
            $imageName = $image->hashName();
        }

        Product::create([
            'image' => $imageName,
            'sku' => null, // Ingredients don't need SKU by default per recent tasks
            'barcode' => null, // Ingredients don't need barcode by default
            'title' => $validated['title'],
            'description' => $validated['description'] ?? '',
            'category_id' => $validated['category_id'],
            'buy_price' => $validated['buy_price'],
            'sell_price' => $validated['sell_price'] ?? 0,
            'unit' => $validated['unit'],
            'min_stock' => $validated['min_stock'] ?? 0,
            'product_type' => Product::TYPE_INGREDIENT,
            'tags' => [Product::TAG_INGREDIENT],
        ]);

        return redirect()->route('ingredients.index')->with('success', 'Bahan baku berhasil ditambahkan!');
    }

    /**
     * Show the form for editing an ingredient.
     */
    public function edit(Product $ingredient)
    {
        $categories = Category::orderBy('name')->get();
        $ingredient->load('priceHistories.user');

        return Inertia::render('Dashboard/Ingredients/Edit', [
            'ingredient' => $ingredient,
            'categories' => $categories,
            'priceHistories' => $ingredient->priceHistories,
        ]);
    }

    /**
     * Update the specified ingredient.
     */
    public function update(Request $request, Product $ingredient)
    {
        $validated = $request->validate([
            'image' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
            'title' => 'required',
            'description' => 'nullable',
            'category_id' => 'required|exists:categories,id',
            'buy_price' => 'required|numeric|min:0',
            'sell_price' => 'nullable|numeric|min:0',
            'unit' => 'required|string',
            'min_stock' => 'nullable|numeric|min:0',
        ]);

        // Update image if provided
        if ($request->file('image')) {
            if ($ingredient->getRawOriginal('image')) {
                Storage::disk('local')->delete('public/products/' . $ingredient->getRawOriginal('image'));
            }
            $image = $request->file('image');
            $image->storeAs('public/products', $image->hashName());
            $validated['image'] = $image->hashName();
        } else {
            unset($validated['image']);
        }

        // Record price change if buy_price or sell_price changed
        $newSellPrice = $validated['sell_price'] ?? 0;
        if ($ingredient->buy_price != $validated['buy_price'] || $ingredient->sell_price != $newSellPrice) {
            PriceHistory::recordChange(
                $ingredient->id,
                $ingredient->buy_price,
                $validated['buy_price'],
                $ingredient->sell_price,
                $newSellPrice
            );
        }

        $validated['sell_price'] = $newSellPrice;
        $validated['product_type'] = Product::TYPE_INGREDIENT; // Ensure type remains ingredient
        
        // Ensure ingredient tag is present (merge with existing if needed, but for now simple)
        $existingTags = $ingredient->tags ?? [];
        if (!in_array(Product::TAG_INGREDIENT, $existingTags)) {
             $existingTags[] = Product::TAG_INGREDIENT;
        }
        $validated['tags'] = $existingTags;

        $ingredient->update($validated);

        return redirect()->route('ingredients.index')->with('success', 'Bahan baku berhasil diperbarui!');
    }

    /**
     * Remove the specified ingredient.
     */
    public function destroy(Product $ingredient)
    {
        if ($ingredient->getRawOriginal('image')) {
            Storage::disk('local')->delete('public/products/' . $ingredient->getRawOriginal('image'));
        }

        $ingredient->delete();

        return redirect()->route('ingredients.index')->with('success', 'Bahan baku berhasil dihapus!');
    }
}
