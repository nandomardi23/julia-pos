<?php

use App\Models\Cart;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

// Simulate authentication
$user = User::first();
Auth::login($user);

echo "User ID: " . $user->id . "\n";

// Clear carts
Cart::truncate();

// Find a product with variants (e.g. Matcha Latte)
$product = Product::with('variants')->where('title', 'like', '%Matcha Latte%')->first();

if (!$product) {
    echo "Matcha Latte not found.\n";
    exit;
}

echo "Product: " . $product->title . " (ID: " . $product->id . ")\n";

$variant1 = $product->variants[0];
$variant2 = $product->variants[1];

echo "Variant 1: " . $variant1->name . " (ID: " . $variant1->id . ")\n";
echo "Variant 2: " . $variant2->name . " (ID: " . $variant2->id . ")\n";

// Simulate Add To Cart - Variant 1 (Regular)
echo "\n--- Adding Variant 1 ---\n";
addToCart($product->id, $variant1->id, 1);
printCart();

// Simulate Add To Cart - Variant 2 (Large)
echo "\n--- Adding Variant 2 ---\n";
addToCart($product->id, $variant2->id, 1);
printCart();

function addToCart($productId, $variantId, $qty) {
    $existingCart = Cart::where('product_id', $productId)
        ->where('product_variant_id', $variantId)
        ->where('cashier_id', Auth::id())
        ->first();

    if ($existingCart) {
        echo "[MATCH FOUND] Updating existing cart ID: " . $existingCart->id . "\n";
        $existingCart->increment('qty', $qty);
        // Simulate price update
        $variant = ProductVariant::find($variantId);
        $existingCart->price = $variant->sell_price;
        $existingCart->save();
    } else {
        echo "[NO MATCH] Creating new cart item\n";
        $variant = ProductVariant::find($variantId);
        Cart::create([
            'cashier_id' => Auth::id(),
            'product_id' => $productId,
            'product_variant_id' => $variantId,
            'qty' => $qty,
            'price' => $variant->sell_price,
        ]);
    }
}

function printCart() {
    $carts = Cart::where('cashier_id', Auth::id())->get();
    echo "Current Cart:\n";
    foreach ($carts as $cart) {
        echo " - Cart ID: " . $cart->id . 
             " | Product ID: " . $cart->product_id . 
             " | Variant ID: " . ($cart->product_variant_id ?? 'NULL') . 
             " | Qty: " . $cart->qty . "\n";
    }
}
