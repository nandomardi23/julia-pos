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
        $ingredients = Product::where('product_type', Product::TYPE_INGREDIENT)
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
            'barcode' => 'required|unique:products',
            'title' => 'required',
            'description' => 'nullable',
            'category_id' => 'required|exists:categories,id',
            'buy_price' => 'required|numeric|min:0',
            'sell_price' => 'required|numeric|min:0',
            'unit' => 'required|string',
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
            'barcode' => $validated['barcode'],
            'title' => $validated['title'],
            'description' => $validated['description'] ?? '',
            'category_id' => $validated['category_id'],
            'buy_price' => $validated['buy_price'],
            'sell_price' => $validated['sell_price'],
            'unit' => $validated['unit'],
            'product_type' => Product::TYPE_INGREDIENT,
            'is_ingredient' => true,
            'is_recipe' => false,
            'is_supply' => false,
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
            'barcode' => 'required|unique:products,barcode,' . $ingredient->id,
            'title' => 'required',
            'description' => 'nullable',
            'category_id' => 'required|exists:categories,id',
            'buy_price' => 'required|numeric|min:0',
            'sell_price' => 'required|numeric|min:0',
            'unit' => 'required|string',
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
            // Remove image from validated to keep existing image
            unset($validated['image']);
        }

        // Record price change if buy_price or sell_price changed
        if ($ingredient->buy_price != $validated['buy_price'] || $ingredient->sell_price != $validated['sell_price']) {
            PriceHistory::recordChange(
                $ingredient->id,
                $ingredient->buy_price,
                $validated['buy_price'],
                $ingredient->sell_price,
                $validated['sell_price']
            );
        }

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
