<?php

namespace App\Http\Controllers\Apps;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use App\Models\Supplier;
use App\Models\ProductIngredient;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get products
        $products = Product::when(request()->search, function ($products) {
            $products = $products->where('title', 'like', '%' . request()->search . '%');
        })->with('category')->latest()->paginate(request()->input('per_page', 10))->withQueryString();

        //return inertia
        return Inertia::render('Dashboard/Products/Index', [
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
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
     * @return \Illuminate\Http\Response
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
            'is_recipe' => 'boolean',
            'is_supply' => 'boolean',
            'is_ingredient' => 'boolean',
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
            'is_recipe' => $request->is_recipe ?? false,
            'is_supply' => $request->is_supply ?? false,
            'is_ingredient' => $request->is_ingredient ?? false,
        ]);

        // Handle ingredients for recipe products
        if ($request->is_recipe && $request->ingredients) {
            foreach ($request->ingredients as $ingredient) {
                ProductIngredient::create([
                    'product_id' => $product->id,
                    'ingredient_id' => $ingredient['ingredient_id'],
                    'quantity' => $ingredient['quantity'],
                ]);
            }
        }

        //redirect
        return to_route('products.index');
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //get categories
        $categories = Category::all();
        $suppliers = Supplier::orderBy('name')->get(['id', 'name', 'company']);
        
        // Get available ingredients (products that can be used as ingredients)
        $availableIngredients = Product::where('id', '!=', $product->id)
            ->where(function($query) {
                $query->where('is_ingredient', true)
                    ->orWhere('is_supply', true);
            })
            ->get(['id', 'title', 'unit', 'barcode']);
        
        // Load current ingredients
        $product->load('ingredients.ingredient');

        return Inertia::render('Dashboard/Products/Edit', [
            'product' => $product,
            'categories' => $categories,
            'suppliers' => $suppliers,
            'availableIngredients' => $availableIngredients,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
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
            'is_recipe' => 'boolean',
            'is_supply' => 'boolean',
            'is_ingredient' => 'boolean',
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
            'is_recipe' => $request->is_recipe ?? false,
            'is_supply' => $request->is_supply ?? false,
            'is_ingredient' => $request->is_ingredient ?? false,
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

        $product->update($updateData);

        // Sync ingredients for recipe products
        if ($request->is_recipe) {
            // Delete existing ingredients
            $product->ingredients()->delete();
            
            // Add new ingredients
            if ($request->ingredients) {
                foreach ($request->ingredients as $ingredient) {
                    ProductIngredient::create([
                        'product_id' => $product->id,
                        'ingredient_id' => $ingredient['ingredient_id'],
                        'quantity' => $ingredient['quantity'],
                    ]);
                }
            }
        } else {
            // If not a recipe anymore, remove all ingredients
            $product->ingredients()->delete();
        }

        //redirect
        return to_route('products.index');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
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
