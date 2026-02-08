<?php
namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\DisplayStock;
use App\Models\Profit;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Basic counts (lightweight)
        $totalCategories   = Category::count();
        $totalProducts     = Product::count();
        $totalTransactions = Transaction::count();
        $totalUsers        = User::count();

        // Today's stats (optimized single queries)
        $today = Carbon::today();
        $todayStats = Transaction::whereDate('created_at', $today)
            ->selectRaw('COUNT(*) as count, SUM(grand_total) as revenue')
            ->first();

        $todayTransactions = $todayStats->count ?? 0;
        $todayRevenue = $todayStats->revenue ?? 0;
        
        // Today's profit using join (efficient)
        $todayProfit = DB::table('profits')
            ->join('transactions', 'profits.transaction_id', '=', 'transactions.id')
            ->whereDate('transactions.created_at', $today)
            ->sum('profits.total');

        // 1. Yesterday's stats (for comparison)
        $yesterday = Carbon::yesterday();
        $yesterdayStats = Transaction::whereDate('created_at', $yesterday)
            ->selectRaw('COUNT(*) as count, SUM(grand_total) as revenue')
            ->first();
        $yesterdayTransactions = $yesterdayStats->count ?? 0;
        $yesterdayRevenue = $yesterdayStats->revenue ?? 0;
        $yesterdayProfit = DB::table('profits')
            ->join('transactions', 'profits.transaction_id', '=', 'transactions.id')
            ->whereDate('transactions.created_at', $yesterday)
            ->sum('profits.total');

        // Revenue trend (last 7 days only for performance)
        $revenueTrend = Transaction::selectRaw('DATE(created_at) as date, SUM(grand_total) as total')
            ->where('created_at', '>=', Carbon::now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get()
            ->map(fn($row) => [
                'date'  => $row->date,
                'label' => Carbon::parse($row->date)->format('d M'),
                'total' => (int) $row->total,
            ]);

        // 3. Profit Trend (last 7 days)
        $profitTrend = DB::table('profits')
            ->join('transactions', 'profits.transaction_id', '=', 'transactions.id')
            ->where('transactions.created_at', '>=', Carbon::now()->subDays(7))
            ->selectRaw('DATE(transactions.created_at) as date, SUM(profits.total) as total')
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get()
            ->map(fn($row) => [
                'date' => $row->date,
                'label' => Carbon::parse($row->date)->format('d M'),
                'total' => (int) $row->total,
            ]);

        // 4. Monthly Stats
        $thisMonth = Carbon::now()->startOfMonth();
        $lastMonth = Carbon::now()->subMonth()->startOfMonth();
        $lastMonthEnd = Carbon::now()->subMonth()->endOfMonth();
        $thisMonthRevenue = (int) Transaction::where('created_at', '>=', $thisMonth)->sum('grand_total');
        $lastMonthRevenue = (int) Transaction::whereBetween('created_at', [$lastMonth, $lastMonthEnd])->sum('grand_total');

        // Top 5 products (last 30 days)
        $topProducts = TransactionDetail::select('product_id', DB::raw('SUM(qty) as qty'))
            ->where('created_at', '>=', Carbon::now()->subDays(30))
            ->with('product:id,title')
            ->groupBy('product_id')
            ->orderByDesc('qty')
            ->take(10)
            ->get()
            ->map(fn($d) => [
                'name' => $d->product?->title ?? 'Produk terhapus',
                'qty'  => (int) $d->qty,
            ]);

        // Recent 10 transactions
        $recentTransactions = Transaction::with('cashier:id,name')
            ->latest()
            ->take(10)
            ->get(['id', 'invoice', 'cashier_id', 'grand_total', 'created_at'])
            ->map(fn($t) => [
                'invoice'  => $t->invoice,
                'date'     => Carbon::parse($t->created_at)->format('d M Y'),
                'cashier'  => $t->cashier?->name ?? '-',
                'total'    => (int) $t->grand_total,
            ]);

        // Payment method statistics (last 30 days)
        $paymentMethodStats = Transaction::select('payment_method', 
                DB::raw('COUNT(*) as count'),
                DB::raw('SUM(grand_total) as total')
            )
            ->where('created_at', '>=', Carbon::now()->subDays(30))
            ->whereNotNull('payment_method')
            ->groupBy('payment_method')
            ->orderByDesc('count')
            ->get()
            ->map(fn($row) => [
                'method' => $row->payment_method,
                'label' => match($row->payment_method) {
                    'cash' => 'Tunai',
                    'transfer' => 'Transfer',
                    'qris' => 'QRIS',
                    default => ucfirst($row->payment_method),
                },
                'count' => (int) $row->count,
                'total' => (int) $row->total,
            ]);

        // Low stock alert (display stock below product's min_stock, limit 10)
        $lowStockProducts = DisplayStock::select('display_stock.*')
            ->join('products', 'display_stock.product_id', '=', 'products.id')
            ->whereColumn('display_stock.quantity', '<=', 'products.min_stock')
            ->where('products.min_stock', '>', 0)
            ->with('product:id,title,unit,min_stock', 'display:id,name')
            ->take(10)
            ->get()
            ->map(fn($s) => [
                'name' => $s->product?->title ?? 'Produk',
                'unit' => $s->product?->unit ?? 'pcs',
                'stock' => (float) $s->quantity,
                'min_stock' => (float) ($s->product?->min_stock ?? 0),
                'display' => $s->display?->name ?? 'Display',
            ]);

        // 5. Slow Moving Products (no sales in 30+ days)
        $slowProducts = Product::whereDoesntHave('transactionDetails', function($q) {
                $q->where('created_at', '>=', Carbon::now()->subDays(30));
            })
            ->where('is_active', true)
            ->take(10)
            ->get(['id', 'title', 'sell_price'])
            ->map(fn($p) => [
                'name' => $p->title,
                'price' => (int) $p->sell_price,
            ]);

        // 6. Top Cashiers (last 30 days)
        $topCashiers = Transaction::select('cashier_id', 
                DB::raw('COUNT(*) as count'), 
                DB::raw('SUM(grand_total) as total'))
            ->where('created_at', '>=', Carbon::now()->subDays(30))
            ->whereNotNull('cashier_id')
            ->groupBy('cashier_id')
            ->orderByDesc('count')
            ->take(5)
            ->with('cashier:id,name')
            ->get()
            ->map(fn($t) => [
                'name' => $t->cashier?->name ?? 'Unknown',
                'count' => (int) $t->count,
                'total' => (int) $t->total,
            ]);

        // 7. Peak Hours (last 30 days)
        $peakHours = Transaction::selectRaw('HOUR(created_at) as hour, COUNT(*) as count')
            ->where('created_at', '>=', Carbon::now()->subDays(30))
            ->groupBy('hour')
            ->orderBy('hour')
            ->get()
            ->map(fn($row) => [
                'hour' => sprintf('%02d:00', $row->hour),
                'count' => (int) $row->count,
            ]);

        return Inertia::render('Dashboard/Index', [
            'totalCategories'      => $totalCategories,
            'totalProducts'        => $totalProducts,
            'totalTransactions'    => $totalTransactions,
            'totalUsers'           => $totalUsers,
            'todayTransactions'    => (int) $todayTransactions,
            'todayRevenue'         => (int) $todayRevenue,
            'todayProfit'          => (int) $todayProfit,
            'yesterdayTransactions'=> (int) $yesterdayTransactions,
            'yesterdayRevenue'     => (int) $yesterdayRevenue,
            'yesterdayProfit'      => (int) $yesterdayProfit,
            'revenueTrend'         => $revenueTrend,
            'profitTrend'          => $profitTrend,
            'thisMonthRevenue'     => $thisMonthRevenue,
            'lastMonthRevenue'     => $lastMonthRevenue,
            'topProducts'          => $topProducts,
            'recentTransactions'   => $recentTransactions,
            'lowStockProducts'     => $lowStockProducts,
            'paymentMethodStats'   => $paymentMethodStats,
            'slowProducts'         => $slowProducts,
            'topCashiers'          => $topCashiers,
            'peakHours'            => $peakHours,
        ]);
    }
}
