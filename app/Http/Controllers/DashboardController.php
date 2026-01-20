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

        // Top 5 products (optimized)
        $topProducts = TransactionDetail::select('product_id', DB::raw('SUM(qty) as qty'))
            ->with('product:id,title')
            ->groupBy('product_id')
            ->orderByDesc('qty')
            ->take(5)
            ->get()
            ->map(fn($d) => [
                'name' => $d->product?->title ?? 'Produk terhapus',
                'qty'  => (int) $d->qty,
            ]);

        // Recent 5 transactions
        $recentTransactions = Transaction::with('cashier:id,name')
            ->latest()
            ->take(5)
            ->get(['id', 'invoice', 'cashier_id', 'grand_total', 'created_at'])
            ->map(fn($t) => [
                'invoice'  => $t->invoice,
                'date'     => Carbon::parse($t->created_at)->format('d M Y'),
                'cashier'  => $t->cashier?->name ?? '-',
                'total'    => (int) $t->grand_total,
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

        return Inertia::render('Dashboard/Index', [
            'totalCategories'    => $totalCategories,
            'totalProducts'      => $totalProducts,
            'totalTransactions'  => $totalTransactions,
            'totalUsers'         => $totalUsers,
            'todayTransactions'  => (int) $todayTransactions,
            'todayRevenue'       => (int) $todayRevenue,
            'todayProfit'        => (int) $todayProfit,
            'revenueTrend'       => $revenueTrend,
            'topProducts'        => $topProducts,
            'recentTransactions' => $recentTransactions,
            'lowStockProducts'   => $lowStockProducts,
        ]);
    }
}
