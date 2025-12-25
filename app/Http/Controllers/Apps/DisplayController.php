<?php

namespace App\Http\Controllers\Apps;

use App\Models\Display;
use App\Models\DisplayStock;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DisplayController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        
        $displays = Display::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('location', 'like', '%' . $search . '%');
            })
            ->withSum('stocks', 'quantity')
            ->withCount(['stocks as products_count' => function ($query) {
                $query->where('quantity', '>', 0);
            }])
            ->latest()
            ->paginate($request->input('per_page', 10))
            ->withQueryString();

        return Inertia::render('Dashboard/Displays/Index', [
            'displays' => $displays,
            'filters' => ['search' => $search],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dashboard/Displays/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $validated['is_active'] ?? true;

        Display::create($validated);

        return redirect()->route('displays.index')->with('success', 'Display berhasil ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Display $display)
    {
        $search = $request->input('search');

        $stocks = DisplayStock::query()
            ->where('display_id', $display->id)
            ->with(['product.category'])
            ->when($search, function ($query, $search) {
                $query->whereHas('product', function ($q) use ($search) {
                    $q->where('title', 'like', '%' . $search . '%')
                        ->orWhere('barcode', 'like', '%' . $search . '%');
                });
            })
            ->where('quantity', '>', 0)
            ->latest()
            ->paginate($request->input('per_page', 15))
            ->withQueryString();

        return Inertia::render('Dashboard/Displays/Show', [
            'display' => $display,
            'stocks' => $stocks,
            'filters' => ['search' => $search],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Display $display)
    {
        return Inertia::render('Dashboard/Displays/Edit', [
            'display' => $display,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Display $display)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $display->update($validated);

        return redirect()->route('displays.index')->with('success', 'Display berhasil diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Display $display)
    {
        // Check if display has stock
        if ($display->stocks()->where('quantity', '>', 0)->count() > 0) {
            return redirect()->back()->with('error', 'Display tidak bisa dihapus karena masih memiliki stok!');
        }

        $display->stocks()->delete();
        $display->delete();

        return redirect()->route('displays.index')->with('success', 'Display berhasil dihapus!');
    }
}
