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
     * Display POS page with product cards
     */
    public function index()
    {
        // Get active display (since we use single display)
        $display = Display::active()->first();

        // Get products that have display stock (non-recipe products)
        $products = collect();
        if ($display) {
            $displayStocks = DisplayStock::where('display_id', $display->id)
                ->where('quantity', '>', 0)
                ->with(['product.category', 'product.variants'])
                ->get();
            
            $products = $displayStocks->map(function ($stock) {
                $product = $stock->product;
                // Skip recipe products from display stock (they are handled separately)
                if ($product->product_type === Product::TYPE_RECIPE) {
                    return null;
                }
                $product->display_qty = $stock->quantity;
                $product->is_available = true;
                return $product;
            })->filter();
        }

        // Get RECIPE products and check ingredient availability
        $recipeProducts = Product::where('product_type', Product::TYPE_RECIPE)
            ->where('sell_price', '>', 0)
            ->with(['category', 'variants.ingredients'])
            ->get()
            ->map(function ($product) use ($display) {
                // Check if all ingredients are available
                $isAvailable = $this->checkRecipeIngredients($product, $display);
                $product->display_qty = $isAvailable ? 999 : 0;
                $product->is_available = $isAvailable;
                return $product;
            });

        // Merge all products
        $products = $products->merge($recipeProducts);

        // Get all categories for filter
        $categories = Category::orderBy('name')->get();

        // Get cart for current cashier
        $carts = Cart::with(['product', 'variant'])
            ->where('cashier_id', auth()->user()->id)
            ->latest()
            ->get();

        // Calculate cart total
        $carts_total = $carts->sum(fn($cart) => $cart->price * $cart->qty);

        // Get payment settings
        $paymentSetting = PaymentSetting::first();
        $defaultGateway = $paymentSetting?->default_gateway ?? 'cash';
        if (
            $defaultGateway !== 'cash'
            && (!$paymentSetting || !$paymentSetting->isGatewayReady($defaultGateway))
        ) {
            $defaultGateway = 'cash';
        }

        return Inertia::render('Dashboard/POS/Index', [
            'products' => $products,
            'categories' => $categories,
            'carts' => $carts,
            'carts_total' => $carts_total,
            'paymentGateways' => $paymentSetting?->enabledGateways() ?? [],
            'defaultPaymentGateway' => $defaultGateway,
            'display' => $display,
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
        $isRecipe = $product->is_recipe;

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
        $isRecipe = $cart->product->is_recipe;

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
     * Check if all ingredients for a recipe are available in display stock
     */
    private function checkRecipeIngredients($recipe, $display)
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
                // Check if this ingredient exists in display stock
                $displayStock = DisplayStock::where('display_id', $display->id)
                    ->where('product_id', $ingredient->ingredient_id)
                    ->first();

                // If ingredient not in display or quantity is 0, variant is not available
                if (!$displayStock || $displayStock->quantity < $ingredient->quantity) {
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
