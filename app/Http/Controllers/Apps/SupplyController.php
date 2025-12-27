<?php

namespace App\Http\Controllers\Apps;

use App\Models\Product;
use App\Models\Category;
use App\Models\PriceHistory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SupplyController extends Controller
{
    /**
     * Display a listing of supplies (Alat Pendukung).
     */
    public function index()
    {
        $supplies = Product::where('product_type', Product::TYPE_SUPPLY)
            ->with('category')
            ->when(request()->search, function ($query) {
                $query->where('title', 'like', '%' . request()->search . '%');
            })
            ->latest()
            ->paginate(request()->input('per_page', 10))
            ->withQueryString();

        return Inertia::render('Dashboard/Supplies/Index', [
            'supplies' => $supplies,
        ]);
    }

    /**
     * Show the form for creating a new supply.
     */
    public function create()
    {
        $categories = Category::orderBy('name')->get();
        
        return Inertia::render('Dashboard/Supplies/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created supply.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'image' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
            'title' => 'required',
            'description' => 'nullable',
            'category_id' => 'required|exists:categories,id',
            'buy_price' => 'required|numeric|min:0',
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
            'sku' => null, // Supplies don't need SKU
            'barcode' => null, // Supplies don't need barcode
            'title' => $validated['title'],
            'description' => $validated['description'] ?? '',
            'category_id' => $validated['category_id'],
            'buy_price' => $validated['buy_price'],
            'sell_price' => 0,
            'unit' => $validated['unit'],
            'product_type' => Product::TYPE_SUPPLY,
        ]);

        return redirect()->route('supplies.index')->with('success', 'Supply berhasil ditambahkan!');
    }

    /**
     * Show the form for editing a supply.
     */
    public function edit(Product $supply)
    {
        $categories = Category::orderBy('name')->get();
        $supply->load('priceHistories.user');

        return Inertia::render('Dashboard/Supplies/Edit', [
            'supply' => $supply,
            'categories' => $categories,
            'priceHistories' => $supply->priceHistories,
        ]);
    }

    /**
     * Update the specified supply.
     */
    public function update(Request $request, Product $supply)
    {
        $validated = $request->validate([
            'image' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
            'title' => 'required',
            'description' => 'nullable',
            'category_id' => 'required|exists:categories,id',
            'buy_price' => 'required|numeric|min:0',
            'unit' => 'required|string',
        ]);

        // Update image if provided
        if ($request->file('image')) {
            if ($supply->getRawOriginal('image')) {
                Storage::disk('local')->delete('public/products/' . $supply->getRawOriginal('image'));
            }
            $image = $request->file('image');
            $image->storeAs('public/products', $image->hashName());
            $validated['image'] = $image->hashName();
        } else {
            unset($validated['image']);
        }

        // Record price change if buy_price changed (supplies only have buy_price)
        if ($supply->buy_price != $validated['buy_price']) {
            PriceHistory::recordChange(
                $supply->id,
                $supply->buy_price,
                $validated['buy_price'],
                0,
                0
            );
        }

        $supply->update($validated);

        return redirect()->route('supplies.index')->with('success', 'Supply berhasil diperbarui!');
    }

    /**
     * Remove the specified supply.
     */
    public function destroy(Product $supply)
    {
        if ($supply->getRawOriginal('image')) {
            Storage::disk('local')->delete('public/products/' . $supply->getRawOriginal('image'));
        }

        $supply->delete();

        return redirect()->route('supplies.index')->with('success', 'Supply berhasil dihapus!');
    }
}
