<?php

namespace App\Http\Controllers\Apps;

use App\Models\Cart;
use App\Exceptions\PaymentGatewayException;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\PaymentSetting;
use App\Models\Display;
use App\Models\DisplayStock;
use App\Models\WarehouseStock;
use App\Models\ProductVariant;
use App\Models\StockMovement;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Payments\PaymentGatewayManager;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * index
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        //get cart
        $carts = Cart::with('product')->where('cashier_id', auth()->user()->id)->latest()->get();

        $paymentSetting = PaymentSetting::first();

        $carts_total = $carts->sum(fn($cart) => $cart->price * $cart->qty);

        $defaultGateway = $paymentSetting?->default_gateway ?? 'cash';
        if (
            $defaultGateway !== 'cash'
            && (!$paymentSetting || !$paymentSetting->isGatewayReady($defaultGateway))
        ) {
            $defaultGateway = 'cash';
        }

        return Inertia::render('Dashboard/Transactions/Index', [
            'carts' => $carts,
            'carts_total' => $carts_total,
            'paymentGateways' => $paymentSetting?->enabledGateways() ?? [],
            'defaultPaymentGateway' => $defaultGateway,
        ]);
    }

    /**
     * searchProduct
     *
     * @param  mixed $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function searchProduct(Request $request)
    {
        //find product by barcode
        $product = Product::where('barcode', $request->barcode)->first();

        if ($product) {
            return response()->json([
                'success' => true,
                'data' => $product
            ]);
        }

        return response()->json([
            'success' => false,
            'data' => null
        ]);
    }

    /**
     * addToCart
     *
     * @param  mixed $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function addToCart(Request $request)
    {
        // Cari produk berdasarkan ID yang diberikan
        $product = Product::whereId($request->product_id)->first();

        // Jika produk tidak ditemukan, redirect dengan pesan error
        if (!$product) {
            return redirect()->back()->with('error', 'Product not found.');
        }

        // Cek stok produk
        if ($product->stock < $request->qty) {
            return redirect()->back()->with('error', 'Out of Stock Product!.');
        }

        // Cek keranjang
        $cart = Cart::with('product')
            ->where('product_id', $request->product_id)
            ->where('cashier_id', auth()->user()->id)
            ->first();

        if ($cart) {
            // Tingkatkan qty
            $cart->increment('qty', $request->qty);

            // Jumlahkan harga * kuantitas
            $cart->price = $cart->product->sell_price * $cart->qty;

            $cart->save();
        } else {
            // Insert ke keranjang
            Cart::create([
                'cashier_id' => auth()->user()->id,
                'product_id' => $request->product_id,
                'qty' => $request->qty,
                'price' => $request->sell_price * $request->qty,
            ]);
        }

        return redirect()->route('pos.index')->with('success', 'Product Added Successfully!.');
    }


    /**
     * destroyCart
     *
     * @param  mixed $cart_id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroyCart($cart_id)
    {
        $cart = Cart::with('product')->whereId($cart_id)->first();

        if ($cart) {
            $cart->delete();
            return back();
        } else {
            // Handle case where no cart is found (e.g., redirect with error message)
            return back()->withErrors(['message' => 'Cart not found']);
        }

    }

    /**
     * Recursively deduct ingredient stocks for recipe products.
     * Supports variant-based ingredients.
     *
     * @param  Product $product The recipe product
     * @param  ProductVariant|null $variant The selected variant
     * @param  float $multiplier Quantity multiplier
     * @param  Display $display Active display location
     * @param  Transaction $transaction Current transaction
     * @return void
     */
    private function deductIngredientStock($product, $variant, $multiplier, $display, $transaction)
    {
        if (!$product->is_recipe) {
            return;
        }

        // Get ingredients from the selected variant
        $ingredients = [];
        if ($variant) {
            $variant->load('ingredients.ingredient');
            $ingredients = $variant->ingredients;
        }

        // If no ingredients on variant, skip
        if (empty($ingredients) || count($ingredients) === 0) {
            return;
        }

        foreach ($ingredients as $variantIngredient) {
            $ingredient = $variantIngredient->ingredient;
            if (!$ingredient) continue;
            
            $ingredientQty = $variantIngredient->quantity * $multiplier;

            if ($ingredient->is_supply || $ingredient->product_type === Product::TYPE_SUPPLY) {
                // SUPPLY → deduct from WAREHOUSE (first available)
                $warehouseStock = WarehouseStock::where('product_id', $ingredient->id)
                    ->where('quantity', '>=', $ingredientQty)
                    ->first();

                if ($warehouseStock) {
                    $warehouseStock->decrement('quantity', $ingredientQty);

                    StockMovement::create([
                        'product_id' => $ingredient->id,
                        'from_type' => StockMovement::TYPE_WAREHOUSE,
                        'from_id' => $warehouseStock->warehouse_id,
                        'to_type' => StockMovement::TYPE_TRANSACTION,
                        'to_id' => $transaction->id,
                        'quantity' => $ingredientQty,
                        'note' => 'Supply resep: ' . $product->title . ' (' . ($variant->name ?? 'default') . ') x' . $multiplier,
                        'user_id' => auth()->id(),
                    ]);
                }
            } else {
                // INGREDIENT → deduct from DISPLAY
                $ingredientDisplayStock = DisplayStock::where('display_id', $display->id)
                    ->where('product_id', $ingredient->id)
                    ->first();

                if ($ingredientDisplayStock) {
                    $ingredientDisplayStock->decrement('quantity', $ingredientQty);

                    StockMovement::create([
                        'product_id' => $ingredient->id,
                        'from_type' => StockMovement::TYPE_DISPLAY,
                        'from_id' => $display->id,
                        'to_type' => StockMovement::TYPE_TRANSACTION,
                        'to_id' => $transaction->id,
                        'quantity' => $ingredientQty,
                        'note' => 'Bahan resep: ' . $product->title . ' (' . ($variant->name ?? 'default') . ') x' . $multiplier,
                        'user_id' => auth()->id(),
                    ]);
                }
            }
        }
    }

    /**
     * store
     *
     * @param  mixed $request
     * @param  PaymentGatewayManager $paymentGatewayManager
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request, PaymentGatewayManager $paymentGatewayManager)
    {
        
        $paymentGateway = $request->input('payment_gateway');
        if ($paymentGateway) {
            $paymentGateway = strtolower($paymentGateway);
        }
        $paymentSetting = null;

        if ($paymentGateway) {
            $paymentSetting = PaymentSetting::first();

            if (!$paymentSetting || !$paymentSetting->isGatewayReady($paymentGateway)) {
                return redirect()
                    ->route('pos.index')
                    ->with('error', 'Gateway pembayaran belum dikonfigurasi.');
            }
        }

        $length = 10;
        $random = '';
        for ($i = 0; $i < $length; $i++) {
            $random .= rand(0, 1) ? rand(0, 9) : chr(rand(ord('a'), ord('z')));
        }

        $invoice = 'TRX-' . Str::upper($random);
        $isCashPayment = empty($paymentGateway);
        $cashAmount = $isCashPayment ? $request->cash : $request->grand_total;
        $changeAmount = $isCashPayment ? $request->change : 0;

        $transaction = DB::transaction(function () use (
            $request,
            $invoice,
            $cashAmount,
            $changeAmount,
            $paymentGateway,
            $isCashPayment
        ) {
            $transaction = Transaction::create([
                'cashier_id' => auth()->user()->id,
                'invoice' => $invoice,
                'cash' => $cashAmount,
                'change' => $changeAmount,
                'discount' => $request->discount,
                'grand_total' => $request->grand_total,
                'payment_method' => $paymentGateway ?: 'cash',
                'payment_status' => $isCashPayment ? 'paid' : 'pending',
            ]);

            $carts = Cart::where('cashier_id', auth()->user()->id)->get();

            foreach ($carts as $cart) {
                // Simpan buy_price saat transaksi agar profit tetap akurat meski harga berubah
                $currentBuyPrice = $cart->product->buy_price;
                
                $transaction->details()->create([
                    'transaction_id' => $transaction->id,
                    'product_id' => $cart->product_id,
                    'qty' => $cart->qty,
                    'price' => $cart->price,
                    'buy_price' => $currentBuyPrice,
                ]);

                // Hitung profit berdasarkan buy_price saat transaksi
                $total_buy_price = $currentBuyPrice * $cart->qty;
                $total_sell_price = $cart->product->sell_price * $cart->qty;
                $profits = $total_sell_price - $total_buy_price;

                $transaction->profits()->create([
                    'transaction_id' => $transaction->id,
                    'total' => $profits,
                ]);

                // Deduct from display stock (for non-recipe products only)
                $display = Display::active()->first();
                $product = $cart->product;
                
                if ($display) {
                    // Only deduct display stock for non-recipe products
                    if (!$product->is_recipe) {
                        $displayStock = DisplayStock::where('display_id', $display->id)
                            ->where('product_id', $cart->product_id)
                            ->first();
                        
                        if ($displayStock) {
                            $displayStock->decrement('quantity', (float) $cart->qty);
                            
                            // Create stock movement record
                            StockMovement::create([
                                'product_id' => $cart->product_id,
                                'from_type' => StockMovement::TYPE_DISPLAY,
                                'from_id' => $display->id,
                                'to_type' => StockMovement::TYPE_TRANSACTION,
                                'to_id' => $transaction->id,
                                'quantity' => $cart->qty,
                                'note' => 'Penjualan: ' . $transaction->invoice,
                                'user_id' => auth()->id(),
                            ]);
                        }
                    }

                    // Deduct ingredient stocks for recipe products
                    if ($product->is_recipe) {
                        // Load variant from cart if available
                        $variant = $cart->variant;
                        $this->deductIngredientStock($product, $variant, (float) $cart->qty, $display, $transaction);
                    }
                }
            }

            Cart::where('cashier_id', auth()->user()->id)->delete();

            return $transaction->fresh();
        });

        if ($paymentGateway) {
            try {
                $paymentResponse = $paymentGatewayManager->createPayment($transaction, $paymentGateway, $paymentSetting);

                $transaction->update([
                    'payment_reference' => $paymentResponse['reference'] ?? null,
                    'payment_url' => $paymentResponse['payment_url'] ?? null,
                ]);
            } catch (PaymentGatewayException $exception) {
                return redirect()
                    ->route('transactions.print', $transaction->invoice)
                    ->with('error', $exception->getMessage());
            }
        }

        return to_route('transactions.print', $transaction->invoice);
    }

    public function print($invoice)
    {
        //get transaction
        $transaction = Transaction::with('details.product', 'cashier')->where('invoice', $invoice)->firstOrFail();

        return Inertia::render('Dashboard/Transactions/Print', [
            'transaction' => $transaction
        ]);
    }

    /**
     * Display transaction history.
     */
    public function history(Request $request)
    {
        $filters = [
            'invoice' => $request->input('invoice'),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
        ];

        $query = Transaction::query() 
            ->with(['cashier:id,name'])
            ->withSum('details as total_items', 'qty')
            ->withSum('profits as total_profit', 'total')
            ->orderByDesc('created_at');

        if (!$request->user()->isSuperAdmin()) {
            $query->where('cashier_id', $request->user()->id);
        }

        $query
            ->when($filters['invoice'], function (Builder $builder, $invoice) {
                $builder->where('invoice', 'like', '%' . $invoice . '%');
            })
            ->when($filters['start_date'], function (Builder $builder, $date) {
                $builder->whereDate('created_at', '>=', $date);
            })
            ->when($filters['end_date'], function (Builder $builder, $date) {
                $builder->whereDate('created_at', '<=', $date);
            });

        $transactions = $query->paginate(10)->withQueryString();

        return Inertia::render('Dashboard/Transactions/History', [
            'transactions' => $transactions,
            'filters' => $filters,
        ]);
    }

    /**
     * Delete transaction and revert stock changes.
     */
    public function destroy($invoice)
    {
        $transaction = Transaction::where('invoice', $invoice)->firstOrFail();

        DB::transaction(function () use ($transaction) {
            // Get display for restoring stock
            $display = Display::active()->first();

            // Restore stock for each transaction detail
            foreach ($transaction->details as $detail) {
                $product = Product::find($detail->product_id);
                
                if ($product && $display) {
                    // Kembalikan stok ke display
                    $displayStock = DisplayStock::firstOrCreate(
                        [
                            'display_id' => $display->id,
                            'product_id' => $detail->product_id,
                        ],
                        ['quantity' => 0]
                    );
                    $displayStock->increment('quantity', $detail->qty);
                }
            }

            // Delete related stock movements
            StockMovement::where('to_type', StockMovement::TYPE_TRANSACTION)
                ->where('to_id', $transaction->id)
                ->delete();

            // Delete profits
            $transaction->profits()->delete();

            // Delete transaction details
            $transaction->details()->delete();

            // Delete transaction
            $transaction->delete();
        });

        return redirect()->route('transactions.history')->with('success', 'Transaksi berhasil dihapus dan stok dikembalikan!');
    }
}
