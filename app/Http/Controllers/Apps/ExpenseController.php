<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use App\Models\ExpenseCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    /**
     * Display a listing of expenses.
     */
    public function index(Request $request)
    {
        $expenses = Expense::with(['category', 'user'])
            ->when($request->search, function ($query, $search) {
                $query->where('description', 'like', "%{$search}%")
                    ->orWhereHas('category', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            })
            ->when($request->category, function ($query, $category) {
                $query->where('expense_category_id', $category);
            })
            ->when($request->start_date, function ($query, $date) {
                $query->whereDate('expense_date', '>=', $date);
            })
            ->when($request->end_date, function ($query, $date) {
                $query->whereDate('expense_date', '<=', $date);
            })
            ->orderBy('expense_date', 'desc')
            ->paginate($request->input('per_page', 10))
            ->withQueryString();

        $categories = ExpenseCategory::orderBy('name')->get();

        // Calculate totals for current filter
        $totalExpenses = Expense::when($request->category, function ($query, $category) {
            $query->where('expense_category_id', $category);
        })
            ->when($request->start_date, function ($query, $date) {
                $query->whereDate('expense_date', '>=', $date);
            })
            ->when($request->end_date, function ($query, $date) {
                $query->whereDate('expense_date', '<=', $date);
            })
            ->sum('amount');

        return Inertia::render('Dashboard/Expenses/Index', [
            'expenses' => $expenses,
            'categories' => $categories,
            'totalExpenses' => $totalExpenses,
        ]);
    }

    /**
     * Show the form for creating a new expense.
     */
    public function create()
    {
        $categories = ExpenseCategory::orderBy('name')->get();

        return Inertia::render('Dashboard/Expenses/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created expense.
     */
    public function store(Request $request)
    {
        $request->validate([
            'expense_category_id' => 'required|exists:expense_categories,id',
            'amount' => 'required|numeric|min:0',
            'expense_date' => 'required|date',
            'description' => 'nullable|string|max:1000',
            'proof_image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $data = $request->only(['expense_category_id', 'amount', 'expense_date', 'description']);
        $data['user_id'] = auth()->id();

        // Handle proof image upload
        if ($request->hasFile('proof_image')) {
            $image = $request->file('proof_image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->storeAs('public/expenses', $imageName);
            $data['proof_image'] = $imageName;
        }

        Expense::create($data);

        return redirect()->route('expenses.index')
            ->with('success', 'Pengeluaran berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified expense.
     */
    public function edit(Expense $expense)
    {
        $categories = ExpenseCategory::orderBy('name')->get();

        return Inertia::render('Dashboard/Expenses/Edit', [
            'expense' => $expense->load('category'),
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified expense.
     */
    public function update(Request $request, Expense $expense)
    {
        $request->validate([
            'expense_category_id' => 'required|exists:expense_categories,id',
            'amount' => 'required|numeric|min:0',
            'expense_date' => 'required|date',
            'description' => 'nullable|string|max:1000',
            'proof_image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $data = $request->only(['expense_category_id', 'amount', 'expense_date', 'description']);

        // Handle proof image upload
        if ($request->hasFile('proof_image')) {
            // Delete old image
            if ($expense->proof_image) {
                Storage::delete('public/expenses/' . $expense->proof_image);
            }

            $image = $request->file('proof_image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->storeAs('public/expenses', $imageName);
            $data['proof_image'] = $imageName;
        }

        $expense->update($data);

        return redirect()->route('expenses.index')
            ->with('success', 'Pengeluaran berhasil diperbarui.');
    }

    /**
     * Remove the specified expense.
     */
    public function destroy(Expense $expense)
    {
        // Delete proof image if exists
        if ($expense->proof_image) {
            Storage::delete('public/expenses/' . $expense->proof_image);
        }

        $expense->delete();

        return redirect()->route('expenses.index')
            ->with('success', 'Pengeluaran berhasil dihapus.');
    }
}
