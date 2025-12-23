<?php

namespace App\Http\Controllers\Apps;

use App\Models\Cart;
use App\Models\Product;
use App\Models\Customer;
use App\Models\Category;
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
        // Get all products with category
        $products = Product::with('category')
            ->where('stock', '>', 0)
            ->latest()
            ->get();

        // Get all categories for filter
        $categories = Category::orderBy('name')->get();

        // Get cart for current cashier
        $carts = Cart::with('product')
            ->where('cashier_id', auth()->user()->id)
            ->latest()
            ->get();

        // Get all customers
        $customers = Customer::latest()->get();

        // Calculate cart total
        $carts_total = 0;
        foreach ($carts as $cart) {
            $carts_total += $cart->price * $cart->qty;
        }

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
            'customers' => $customers,
            'paymentGateways' => $paymentSetting?->enabledGateways() ?? [],
            'defaultPaymentGateway' => $defaultGateway,
        ]);
    }

    /**
     * Add product to cart from POS
     */
    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'qty' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);

        // Check stock
        if ($product->stock < $request->qty) {
            return redirect()->back()->with('error', 'Stok tidak mencukupi!');
        }

        // Check if product already in cart
        $cart = Cart::where('product_id', $request->product_id)
            ->where('cashier_id', auth()->user()->id)
            ->first();

        if ($cart) {
            // Update quantity
            $cart->increment('qty', $request->qty);
            $cart->price = $product->sell_price;
            $cart->save();
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
            'qty' => 'required|integer|min:1',
        ]);

        $cart = Cart::with('product')
            ->where('id', $cart_id)
            ->where('cashier_id', auth()->user()->id)
            ->first();

        if (!$cart) {
            return redirect()->back()->with('error', 'Item keranjang tidak ditemukan!');
        }

        // Check stock
        if ($cart->product->stock < $request->qty) {
            return redirect()->back()->with('error', 'Stok tidak mencukupi!');
        }

        $cart->qty = $request->qty;
        $cart->price = $cart->product->sell_price;
        $cart->save();

        return redirect()->back()->with('success', 'Keranjang diperbarui!');
    }
}
