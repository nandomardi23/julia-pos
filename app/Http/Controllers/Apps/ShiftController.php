<?php

namespace App\Http\Controllers\Apps;

use App\Models\Shift;
use App\Models\CashFlow;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ShiftController extends Controller
{
    /**
     * Display a listing of shifts.
     */
    public function index(Request $request)
    {
        $query = Shift::with(['user:id,name'])
            ->withCount('transactions')
            ->withSum('transactions as total_sales', 'grand_total');

        // Filter by status
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Filter by user (for admin viewing all shifts)
        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        // Filter by date range
        if ($request->filled('start_date')) {
            $query->whereDate('started_at', '>=', $request->start_date);
        }
        if ($request->filled('end_date')) {
            $query->whereDate('started_at', '<=', $request->end_date);
        }

        // If not super admin, only show own shifts
        if (!$request->user()->isSuperAdmin()) {
            $query->where('user_id', $request->user()->id);
        }

        $query->orderBy('started_at', 'desc');

        $shifts = $query->paginate($request->input('per_page', 10))->withQueryString();

        // Get current active shift for the user
        $activeShift = Shift::getActiveShift();

        return Inertia::render('Dashboard/Shifts/Index', [
            'shifts' => $shifts,
            'activeShift' => $activeShift,
            'filters' => $request->only(['status', 'user_id', 'start_date', 'end_date']),
            'statuses' => Shift::getStatuses(),
        ]);
    }

    /**
     * Show form to open a new shift.
     */
    public function create()
    {
        // Check if user already has active shift
        if (Shift::hasActiveShift()) {
            return redirect()->route('shifts.index')
                ->with('error', 'Anda sudah memiliki shift yang aktif. Tutup shift terlebih dahulu.');
        }

        return Inertia::render('Dashboard/Shifts/Open', [
            'suggestedOpeningCash' => 0,
        ]);
    }

    /**
     * Store a newly created shift (open shift).
     */
    public function store(Request $request)
    {
        $request->validate([
            'opening_cash' => 'required|numeric|min:0',
            'notes' => 'nullable|string|max:1000',
        ]);

        // Check if user already has active shift
        if (Shift::hasActiveShift()) {
            return redirect()->route('shifts.index')
                ->with('error', 'Anda sudah memiliki shift yang aktif.');
        }

        $shift = Shift::create([
            'user_id' => auth()->id(),
            'opening_cash' => $request->opening_cash,
            'notes' => $request->notes,
            'status' => Shift::STATUS_ACTIVE,
        ]);

        return redirect()->route('pos.index')
            ->with('success', 'Shift berhasil dibuka dengan nomor: ' . $shift->shift_number);
    }

    /**
     * Display the specified shift.
     */
    public function show($id)
    {
        $shift = Shift::with([
            'user:id,name',
            'cashFlows' => function ($query) {
                $query->orderBy('created_at', 'desc');
            },
            'cashFlows.user:id,name',
        ])->findOrFail($id);

        // Paginate transactions separately
        $transactions = $shift->transactions()
            ->select('id', 'shift_id', 'invoice', 'grand_total', 'payment_method', 'created_at')
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        // Calculate summary
        $summary = [
            'total_sales' => $shift->total_sales,
            'total_cash_sales' => $shift->total_cash_sales,
            'total_change' => $shift->total_change,
            'total_cash_in' => $shift->total_cash_in,
            'total_cash_out' => $shift->total_cash_out,
            'expected_cash' => $shift->calculateExpectedCash(),
            'transaction_count' => $shift->transaction_count,
        ];

        return Inertia::render('Dashboard/Shifts/Show', [
            'shift' => $shift,
            'summary' => $summary,
            'transactions' => $transactions,
        ]);
    }

    /**
     * Show form to close an active shift.
     */
    public function close($id)
    {
        $shift = Shift::with(['user:id,name', 'cashFlows'])
            ->findOrFail($id);

        if ($shift->isClosed()) {
            return redirect()->route('shifts.show', $id)
                ->with('error', 'Shift ini sudah ditutup.');
        }

        // Only owner or superadmin can close
        if ($shift->user_id !== auth()->id() && !auth()->user()->isSuperAdmin()) {
            return redirect()->route('shifts.index')
                ->with('error', 'Anda tidak memiliki akses untuk menutup shift ini.');
        }

        $summary = [
            'opening_cash' => $shift->opening_cash,
            'total_sales' => $shift->total_sales,
            'total_cash_sales' => $shift->total_cash_sales,
            'total_change' => $shift->total_change,
            'total_cash_in' => $shift->total_cash_in,
            'total_cash_out' => $shift->total_cash_out,
            'expected_cash' => $shift->calculateExpectedCash(),
            'transaction_count' => $shift->transaction_count,
        ];

        return Inertia::render('Dashboard/Shifts/Close', [
            'shift' => $shift,
            'summary' => $summary,
        ]);
    }

    /**
     * Process shift closing.
     */
    public function storeClose(Request $request, $id)
    {
        $request->validate([
            'closing_cash' => 'required|numeric|min:0',
            'notes' => 'nullable|string|max:1000',
        ]);

        $shift = Shift::findOrFail($id);

        if ($shift->isClosed()) {
            return redirect()->route('shifts.show', $id)
                ->with('error', 'Shift ini sudah ditutup.');
        }

        // Only owner or superadmin can close
        if ($shift->user_id !== auth()->id() && !auth()->user()->isSuperAdmin()) {
            return redirect()->route('shifts.index')
                ->with('error', 'Anda tidak memiliki akses untuk menutup shift ini.');
        }

        $shift->close($request->closing_cash, $request->notes);

        $difference = (float) $shift->difference;
        $message = 'Shift berhasil ditutup.';

        if ($difference > 0) {
            $message .= ' Selisih lebih: Rp ' . number_format($difference, 0, ',', '.');
        } elseif ($difference < 0) {
            $message .= ' Selisih kurang: Rp ' . number_format(abs($difference), 0, ',', '.');
        } else {
            $message .= ' Kas sesuai (tidak ada selisih).';
        }

        return redirect()->route('shifts.show', $id)
            ->with('success', $message);
    }

    /**
     * Add cash flow (cash in/out) to active shift.
     */
    public function addCashFlow(Request $request)
    {
        $request->validate([
            'type' => 'required|in:in,out',
            'amount' => 'required|numeric|min:0.01',
            'category' => 'nullable|string|max:100',
            'description' => 'nullable|string|max:500',
        ]);

        $shift = Shift::getActiveShift();

        if (!$shift) {
            return back()->with('error', 'Tidak ada shift aktif. Buka shift terlebih dahulu.');
        }

        CashFlow::create([
            'shift_id' => $shift->id,
            'user_id' => auth()->id(),
            'type' => $request->type,
            'amount' => $request->amount,
            'category' => $request->category,
            'description' => $request->description,
        ]);

        $typeLabel = $request->type === 'in' ? 'Kas Masuk' : 'Kas Keluar';

        return back()->with('success', $typeLabel . ' berhasil dicatat: Rp ' . number_format($request->amount, 0, ',', '.'));
    }

    /**
     * Delete cash flow entry.
     */
    public function deleteCashFlow($id)
    {
        $cashFlow = CashFlow::with('shift')->findOrFail($id);

        // Only allow delete if shift is still active
        if ($cashFlow->shift->isClosed()) {
            return back()->with('error', 'Tidak dapat menghapus kas dari shift yang sudah ditutup.');
        }

        // Only owner or superadmin can delete
        if ($cashFlow->user_id !== auth()->id() && !auth()->user()->isSuperAdmin()) {
            return back()->with('error', 'Anda tidak memiliki akses untuk menghapus entri ini.');
        }

        $cashFlow->delete();

        return back()->with('success', 'Entri kas berhasil dihapus.');
    }

    /**
     * Get current active shift status (for AJAX).
     */
    public function status()
    {
        $shift = Shift::getActiveShift();

        if (!$shift) {
            return response()->json([
                'has_active_shift' => false,
                'shift' => null,
            ]);
        }

        return response()->json([
            'has_active_shift' => true,
            'shift' => [
                'id' => $shift->id,
                'shift_number' => $shift->shift_number,
                'started_at' => $shift->started_at->format('d M Y H:i'),
                'opening_cash' => $shift->opening_cash,
                'transaction_count' => $shift->transaction_count,
                'total_sales' => $shift->total_sales,
            ],
        ]);
    }

    /**
     * Get cash flow categories.
     */
    public function categories()
    {
        return response()->json([
            'cash_in' => CashFlow::getCashInCategories(),
            'cash_out' => CashFlow::getCashOutCategories(),
        ]);
    }
}
