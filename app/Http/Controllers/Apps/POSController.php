<?php

namespace App\Http\Controllers\Apps;

use App\Models\Cart;
use App\Models\Product;
use App\Models\Category;
use App\Models\Display;
use App\Models\DisplayStock;
use App\Models\PaymentSetting;
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

        // Get products that have display stock
        $products = collect();
        if ($display) {
            $displayStocks = DisplayStock::where('display_id', $display->id)
                ->where('quantity', '>', 0)
                ->with(['product.category'])
                ->get();
            
            $products = $displayStocks->map(function ($stock) {
                $product = $stock->product;
                $product->display_qty = $stock->quantity;
                return $product;
            });
        }

        // Get all categories for filter
        $categories = Category::orderBy('name')->get();

        // Get cart for current cashier
        $carts = Cart::with('product')
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
            'qty' => 'required|numeric|min:0.001',
        ]);

        $product = Product::findOrFail($request->product_id);
        
        // Get active display
        $display = Display::active()->first();
        if (!$display) {
            return redirect()->back()->with('error', 'Display tidak tersedia!');
        }

        // Get display stock for this product
        $displayStock = DisplayStock::where('display_id', $display->id)
            ->where('product_id', $request->product_id)
            ->first();

        $availableQty = $displayStock ? $displayStock->quantity : 0;

        // Check if product already in cart (to account for already added qty)
        $existingCart = Cart::where('product_id', $request->product_id)
            ->where('cashier_id', auth()->user()->id)
            ->first();
        
        $totalQtyNeeded = $request->qty + ($existingCart ? $existingCart->qty : 0);

        // Check stock
        if ($availableQty < $totalQtyNeeded) {
            return redirect()->back()->with('error', 'Stok display tidak mencukupi! (Tersedia: ' . $availableQty . ')');
        }

        if ($existingCart) {
            // Update quantity
            $existingCart->increment('qty', $request->qty);
            $existingCart->price = $product->sell_price;
            $existingCart->save();
        } else {
            // Create new cart item
            Cart::create([
                'cashier_id' => auth()->user()->id,
                'product_id' => $request->product_id,
                'qty' => $request->qty,
                'price' => $product->sell_price,
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

        $cart->qty = $request->qty;
        $cart->price = $cart->product->sell_price;
        $cart->save();

        return redirect()->back()->with('success', 'Keranjang diperbarui!');
    }
}
