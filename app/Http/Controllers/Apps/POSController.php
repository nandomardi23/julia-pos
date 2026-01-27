<?php

namespace App\Http\Controllers\Apps;

use App\Models\Cart;
use App\Models\Product;
use App\Models\Category;
use App\Models\Display;
use App\Models\DisplayStock;
use App\Models\PaymentSetting;
use App\Models\ProductVariantIngredient;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class POSController extends Controller
{
    /**
     * Display POS page with product cards (paginated)
     */
    public function index(Request $request)
    {
        // Get active display (since we use single display)
        $display = Display::active()->first();

        // Pagination settings
        $perPage = 10;
        $categoryFilter = $request->get('category');
        $searchQuery = $request->get('search');
        $hideOutOfStock = $request->boolean('hide_out_of_stock');

        // Preload ALL display stocks to prevent N+1 queries
        $displayStockMap = [];
        if ($display) {
            $displayStockMap = DisplayStock::where('display_id', $display->id)
                ->pluck('quantity', 'product_id')
                ->toArray();
        }

        // Base query for products
        $productsQuery = Product::query()
            ->where('is_active', true) // Only active products in POS
            ->where(function ($q) {
                // Get sellable products OR recipe products with sell_price > 0
                $q->whereIn('product_type', [Product::TYPE_SELLABLE, Product::TYPE_RECIPE])
                  ->where('sell_price', '>', 0);
            })
            ->with(['category', 'variants.ingredients']);

        // Apply category filter
        if ($categoryFilter && $categoryFilter !== 'all') {
            $productsQuery->where('category_id', $categoryFilter);
        }

        // Apply search filter
        if ($searchQuery) {
            $productsQuery->where(function ($q) use ($searchQuery) {
                $q->where('title', 'like', "%{$searchQuery}%")
                  ->orWhere('sku', 'like', "%{$searchQuery}%");
            });
        }

        // Filter: only products that have display stock OR are recipes
        // When hide_out_of_stock is true, only show products with quantity > 0
        $productsQuery->where(function ($q) use ($displayStockMap, $hideOutOfStock) {
            if ($hideOutOfStock) {
                // Only products with stock > 0
                $productIdsWithStock = array_keys(array_filter($displayStockMap, fn($qty) => $qty > 0));
                $q->whereIn('id', $productIdsWithStock)
                  ->orWhere('product_type', Product::TYPE_RECIPE);
            } else {
                // All products that are in display (even with 0 stock) or are recipes
                $productIdsWithStock = array_keys($displayStockMap);
                $q->whereIn('id', $productIdsWithStock)
                  ->orWhere('product_type', Product::TYPE_RECIPE);
            }
        });

        // Paginate
        $productsPaginated = $productsQuery->orderBy('title')->paginate($perPage)->withQueryString();

        // Preload warehouse stocks for smart warnings
        $warehouseStockMap = \App\Models\WarehouseStock::pluck('quantity', 'product_id')->toArray();

        // Process products to add display_qty and is_available
        $products = $productsPaginated->through(function ($product) use ($display, $displayStockMap, $warehouseStockMap) {
            if ($product->product_type === Product::TYPE_RECIPE) {
                // Check if all ingredients are available
                $isAvailable = $this->checkRecipeIngredients($product, $display, $displayStockMap);
                $product->display_qty = $isAvailable ? 999 : 0;
                $product->is_available = $isAvailable;
                $product->warehouse_qty = 0; // Recipes don't have warehouse stock
            } else {
                // Get display stock quantity
                $product->display_qty = $displayStockMap[$product->id] ?? 0;
                $product->is_available = $product->display_qty > 0;
                // Add warehouse stock for smart warning
                $product->warehouse_qty = $warehouseStockMap[$product->id] ?? 0;
            }
            return $product;
        });

        // Get all categories for filter
        $categories = Category::orderBy('name')->get();

        // Get cart for current cashier
        $carts = Cart::with(['product', 'variant'])
            ->where('cashier_id', auth()->user()->id)
            ->latest()
            ->get();

        // Calculate cart total (using Cart model accessor)
        $carts_total = $carts->sum(fn($cart) => $cart->total);

        // Get payment settings
        $paymentSetting = PaymentSetting::first();
        $defaultGateway = $paymentSetting?->default_gateway ?? 'cash';
        if (
            $defaultGateway !== 'cash'
            && (!$paymentSetting || !$paymentSetting->isGatewayReady($defaultGateway))
        ) {
            $defaultGateway = 'cash';
        }

        // Get active shift for current user
        $activeShift = \App\Models\Shift::getActiveShift();

        return Inertia::render('Dashboard/POS/Index', [
            'products' => $products,
            'categories' => $categories,
            'carts' => $carts,
            'carts_total' => $carts_total,
            'paymentGateways' => $paymentSetting?->enabledGateways() ?? [],
            'defaultPaymentGateway' => $defaultGateway,
            'display' => $display,
            'activeShift' => $activeShift,
            'filters' => [
                'category' => $categoryFilter,
                'search' => $searchQuery,
                'hide_out_of_stock' => $hideOutOfStock,
            ],
        ]);
    }

    /**
     * Find product by exact barcode match (API endpoint for barcode scanner)
     */
    public function findByBarcode(Request $request)
    {
        $barcode = $request->get('barcode');
        
        if (!$barcode) {
            return response()->json(['found' => false, 'message' => 'Barcode tidak boleh kosong']);
        }

        // Find product by exact barcode match (case-insensitive)
        $product = Product::where(function ($q) use ($barcode) {
                $q->whereRaw('LOWER(barcode) = ?', [strtolower($barcode)]);
            })
            ->where('is_active', true) // Only active products
            ->whereIn('product_type', [Product::TYPE_SELLABLE, Product::TYPE_RECIPE])
            ->where('sell_price', '>', 0)
            ->with(['category', 'variants.ingredients'])
            ->first();

        if (!$product) {
            return response()->json(['found' => false, 'message' => 'Produk dengan barcode "' . $barcode . '" tidak ditemukan']);
        }

        // Get display stock info
        $display = Display::active()->first();
        $displayStock = 0;
        $isAvailable = false;

        if ($display) {
            if ($product->product_type === Product::TYPE_RECIPE) {
                // Check recipe ingredients availability
                $displayStockMap = DisplayStock::where('display_id', $display->id)
                    ->pluck('quantity', 'product_id')
                    ->toArray();
                $isAvailable = $this->checkRecipeIngredients($product, $display, $displayStockMap);
                $displayStock = $isAvailable ? 999 : 0;
            } else {
                $stock = DisplayStock::where('display_id', $display->id)
                    ->where('product_id', $product->id)
                    ->first();
                $displayStock = $stock ? $stock->quantity : 0;
                $isAvailable = $displayStock > 0;
            }
        }

        $product->display_qty = $displayStock;
        $product->is_available = $isAvailable;

        return response()->json([
            'found' => true,
            'product' => $product,
        ]);
    }

    /**
     * Add product to cart from POS
     */
    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'product_variant_id' => 'nullable|exists:product_variants,id',
            'qty' => 'required|numeric|min:0.001',
        ]);

        $product = Product::findOrFail($request->product_id);
        $variantId = $request->product_variant_id;
        
        // Determine price based on variant or product
        $price = $product->sell_price;
        if ($variantId) {
            $variant = \App\Models\ProductVariant::find($variantId);
            if ($variant) {
                $price = $variant->sell_price;
            }
        }
        
        // Get active display
        $display = Display::active()->first();
        if (!$display) {
            return redirect()->back()->with('error', 'Display tidak tersedia!');
        }

        // Skip stock check for RECIPE products (they don't need display stock)
        $isRecipe = $product->product_type === Product::TYPE_RECIPE;

        // Get display stock for this product (only for non-recipe products)
        $displayStock = null;
        $availableQty = 0;
        
        if (!$isRecipe) {
            $displayStock = DisplayStock::where('display_id', $display->id)
                ->where('product_id', $request->product_id)
                ->first();
            $availableQty = $displayStock ? $displayStock->quantity : 0;
        }

        // Check if product (with same variant) already in cart
        $existingCart = Cart::where('product_id', $request->product_id)
            ->where('product_variant_id', $variantId)
            ->where('cashier_id', auth()->user()->id)
            ->first();
        
        $totalQtyNeeded = $request->qty + ($existingCart ? $existingCart->qty : 0);

        // Check stock (only for non-recipe products)
        if (!$isRecipe && $availableQty < $totalQtyNeeded) {
            return redirect()->back()->with('error', 'Stok display tidak mencukupi! (Tersedia: ' . $availableQty . ')');
        }

        if ($existingCart) {
            // Update quantity
            $existingCart->increment('qty', $request->qty);
            $existingCart->price = $price;
            $existingCart->save();
        } else {
            // Create new cart item
            Cart::create([
                'cashier_id' => auth()->user()->id,
                'product_id' => $request->product_id,
                'product_variant_id' => $variantId,
                'qty' => $request->qty,
                'price' => $price,
            ]);
        }

        return redirect()->back()->with('success', 'Produk ditambahkan ke keranjang!');
    }

    /**
     * Remove item from cart
     */
    public function destroyCart($cart_id)
    {
        $cart = Cart::where('id', $cart_id)
            ->where('cashier_id', auth()->user()->id)
            ->first();

        if ($cart) {
            $cart->delete();
            return redirect()->back()->with('success', 'Produk dihapus dari keranjang!');
        }

        return redirect()->back()->with('error', 'Item keranjang tidak ditemukan!');
    }

    /**
     * Update cart item quantity
     */
    public function updateCart(Request $request, $cart_id)
    {
        $request->validate([
            'qty' => 'required|numeric|min:0.001',
        ]);

        $cart = Cart::with('product')
            ->where('id', $cart_id)
            ->where('cashier_id', auth()->user()->id)
            ->first();

        if (!$cart) {
            return redirect()->back()->with('error', 'Item keranjang tidak ditemukan!');
        }

        // Skip stock check for RECIPE products
        $isRecipe = $cart->product->product_type === Product::TYPE_RECIPE;

        if (!$isRecipe) {
            // Get active display
            $display = Display::active()->first();
            if (!$display) {
                return redirect()->back()->with('error', 'Display tidak tersedia!');
            }

            // Get display stock for this product
            $displayStock = DisplayStock::where('display_id', $display->id)
                ->where('product_id', $cart->product_id)
                ->first();

            $availableQty = $displayStock ? $displayStock->quantity : 0;

            // Check stock
            if ($availableQty < $request->qty) {
                return redirect()->back()->with('error', 'Stok display tidak mencukupi! (Tersedia: ' . $availableQty . ')');
            }
        }

        $cart->qty = $request->qty;
        $cart->price = $cart->product->sell_price;
        $cart->save();

        return redirect()->back()->with('success', 'Keranjang diperbarui!');
    }

    /**
     * Check if all ingredients for a recipe are available in display stock.
     * Optimized version that uses preloaded display stock map.
     */
    private function checkRecipeIngredients($recipe, $display, $displayStockMap)
    {
        // If no display, recipe is not available
        if (!$display) {
            return false;
        }

        // Get all variants of the recipe
        $variants = $recipe->variants;
        
        // If recipe has no variants, check if it has any ingredients defined
        if ($variants->isEmpty()) {
            return true; // No variants, assume always available
        }

        // Check each variant - if ANY variant is available, recipe is available
        foreach ($variants as $variant) {
            $variantAvailable = true;

            // If variant has no ingredients, it's available
            if (!$variant->ingredients || $variant->ingredients->isEmpty()) {
                return true;
            }

            foreach ($variant->ingredients as $ingredient) {
                // Check using preloaded stock map (no query!)
                $availableQty = $displayStockMap[$ingredient->ingredient_id] ?? 0;

                // If ingredient not in display or quantity is 0, variant is not available
                if ($availableQty < $ingredient->quantity) {
                    $variantAvailable = false;
                    break;
                }
            }

            // If any variant is fully available, recipe is available
            if ($variantAvailable) {
                return true;
            }
        }

        return false;
    }
}
