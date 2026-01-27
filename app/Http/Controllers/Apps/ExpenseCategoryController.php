<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Models\ExpenseCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseCategoryController extends Controller
{
    /**
     * Display a listing of expense categories.
     */
    public function index(Request $request)
    {
        $categories = ExpenseCategory::when($request->search, function ($query, $search) {
            $query->where('name', 'like', "%{$search}%");
        })
            ->withCount('expenses')
            ->orderBy('name')
            ->paginate($request->input('per_page', 10))
            ->withQueryString();

        return Inertia::render('Dashboard/ExpenseCategories/Index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created expense category.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:expense_categories,name',
            'description' => 'nullable|string|max:500',
        ]);

        ExpenseCategory::create($request->only(['name', 'description']));

        return redirect()->route('expense-categories.index')
            ->with('success', 'Kategori pengeluaran berhasil ditambahkan.');
    }

    /**
     * Update the specified expense category.
     */
    public function update(Request $request, ExpenseCategory $expense_category)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:expense_categories,name,' . $expense_category->id,
            'description' => 'nullable|string|max:500',
        ]);

        $expense_category->update($request->only(['name', 'description']));

        return redirect()->route('expense-categories.index')
            ->with('success', 'Kategori pengeluaran berhasil diperbarui.');
    }

    /**
     * Remove the specified expense category.
     */
    public function destroy(ExpenseCategory $expense_category)
    {
        if ($expense_category->expenses()->count() > 0) {
            return redirect()->route('expense-categories.index')
                ->with('error', 'Tidak dapat menghapus kategori yang masih memiliki data pengeluaran.');
        }

        $expense_category->delete();

        return redirect()->route('expense-categories.index')
            ->with('success', 'Kategori pengeluaran berhasil dihapus.');
    }
}
