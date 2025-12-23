<?php

namespace App\Http\Controllers\Apps;

use App\Models\Warehouse;
use App\Models\WarehouseStock;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class WarehouseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        
        $warehouses = Warehouse::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('location', 'like', '%' . $search . '%');
            })
            ->withSum('stocks', 'quantity')
            ->withCount(['stocks as products_count' => function ($query) {
                $query->where('quantity', '>', 0);
            }])
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Dashboard/Warehouses/Index', [
            'warehouses' => $warehouses,
            'filters' => ['search' => $search],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dashboard/Warehouses/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $validated['is_active'] ?? true;

        Warehouse::create($validated);

        return redirect()->route('warehouses.index')->with('success', 'Gudang berhasil ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Warehouse $warehouse)
    {
        $search = $request->input('search');

        $stocks = WarehouseStock::query()
            ->where('warehouse_id', $warehouse->id)
            ->with(['product.category'])
            ->when($search, function ($query, $search) {
                $query->whereHas('product', function ($q) use ($search) {
                    $q->where('title', 'like', '%' . $search . '%')
                        ->orWhere('barcode', 'like', '%' . $search . '%');
                });
            })
            ->where('quantity', '>', 0)
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Dashboard/Warehouses/Show', [
            'warehouse' => $warehouse,
            'stocks' => $stocks,
            'filters' => ['search' => $search],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Warehouse $warehouse)
    {
        return Inertia::render('Dashboard/Warehouses/Edit', [
            'warehouse' => $warehouse,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Warehouse $warehouse)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $warehouse->update($validated);

        return redirect()->route('warehouses.index')->with('success', 'Gudang berhasil diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Warehouse $warehouse)
    {
        // Check if warehouse has stock
        if ($warehouse->stocks()->where('quantity', '>', 0)->count() > 0) {
            return redirect()->back()->with('error', 'Gudang tidak bisa dihapus karena masih memiliki stok!');
        }

        $warehouse->stocks()->delete();
        $warehouse->delete();

        return redirect()->route('warehouses.index')->with('success', 'Gudang berhasil dihapus!');
    }
}
