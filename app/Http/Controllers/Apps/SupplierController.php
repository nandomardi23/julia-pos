<?php

namespace App\Http\Controllers\Apps;

use App\Models\Supplier;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        
        $suppliers = Supplier::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('company', 'like', '%' . $search . '%')
                    ->orWhere('phone', 'like', '%' . $search . '%');
            })
            ->withCount('stockMovements')
            ->latest()
            ->paginate($request->input('per_page', 10))
            ->withQueryString();

        return Inertia::render('Dashboard/Suppliers/Index', [
            'suppliers' => $suppliers,
            'filters' => ['search' => $search],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dashboard/Suppliers/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'company' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'required|string|max:50',
            'address' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        Supplier::create($validated);

        return redirect()->route('suppliers.index')->with('success', 'Supplier berhasil ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Supplier $supplier)
    {
        // Get unique product IDs from stock movements for this supplier
        $productIds = \App\Models\StockMovement::where('supplier_id', $supplier->id)
            ->distinct()
            ->pluck('product_id');

        // Get unique products that belong to this supplier - paginated
        $products = \App\Models\Product::whereIn('id', $productIds)
            ->with('category:id,name')
            ->paginate(10, ['*'], 'products_page')
            ->withQueryString();

        // Get purchase history (stock movements from this supplier) - paginated
        $purchases = \App\Models\StockMovement::where('supplier_id', $supplier->id)
            ->with(['product:id,title,barcode', 'user:id,name'])
            ->latest()
            ->paginate(10, ['*'], 'purchases_page')
            ->withQueryString();

        // Calculate totals from stock movements
        $totalPurchases = \App\Models\StockMovement::where('supplier_id', $supplier->id)->count();
        $totalSpent = \App\Models\StockMovement::where('supplier_id', $supplier->id)->sum('purchase_price');
        $totalItems = \App\Models\StockMovement::where('supplier_id', $supplier->id)->sum('quantity');

        return Inertia::render('Dashboard/Suppliers/Show', [
            'supplier' => $supplier,
            'products' => $products,
            'purchases' => $purchases,
            'stats' => [
                'total_purchases' => $totalPurchases,
                'total_spent' => $totalSpent,
                'total_items' => $totalItems,
                'total_products' => $productIds->count(),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Supplier $supplier)
    {
        return Inertia::render('Dashboard/Suppliers/Edit', [
            'supplier' => $supplier,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Supplier $supplier)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'company' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'required|string|max:50',
            'address' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $supplier->update($validated);

        return redirect()->route('suppliers.index')->with('success', 'Supplier berhasil diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supplier $supplier)
    {
        // Check if supplier has stock movements
        if ($supplier->stockMovements()->count() > 0) {
            return redirect()->back()->with('error', 'Supplier tidak bisa dihapus karena masih memiliki riwayat transaksi!');
        }

        $supplier->delete();

        return redirect()->route('suppliers.index')->with('success', 'Supplier berhasil dihapus!');
    }
}
