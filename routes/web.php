<?php

use App\Http\Controllers\Apps\CategoryController;
use App\Http\Controllers\Apps\CustomerController;
use App\Http\Controllers\Apps\ProductController;
use App\Http\Controllers\Apps\TransactionController;
use App\Http\Controllers\Apps\POSController;
use App\Http\Controllers\Apps\PaymentSettingController;
use App\Http\Controllers\Apps\SupplierController;
use App\Http\Controllers\Apps\WarehouseController;
use App\Http\Controllers\Apps\DisplayController;
use App\Http\Controllers\Apps\StockMovementController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Reports\ProfitReportController;
use App\Http\Controllers\Reports\SalesReportController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin'       => Route::has('login'),
//         'canRegister'    => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion'     => PHP_VERSION,
//     ]);
// });
Route::get('/', function () {
    return redirect()->route('login');
});

Route::group(['prefix' => 'dashboard', 'middleware' => ['auth']], function () {
    Route::get('/', [DashboardController::class, 'index'])->middleware(['auth', 'verified', 'permission:dashboard-access'])->name('dashboard');
    Route::get('/permissions', [PermissionController::class, 'index'])->middleware('permission:permissions-access')->name('permissions.index');
    // roles route
    Route::resource('/roles', RoleController::class)
        ->except(['create', 'edit', 'show'])
        ->middlewareFor('index', 'permission:roles-access')
        ->middlewareFor('store', 'permission:roles-create')
        ->middlewareFor('update', 'permission:roles-update')
        ->middlewareFor('destroy', 'permission:roles-delete');
    // users route
    Route::resource('/users', UserController::class)
        ->except('show')
        ->middlewareFor('index', 'permission:users-access')
        ->middlewareFor(['create', 'store'], 'permission:users-create')
        ->middlewareFor(['edit', 'update'], 'permission:users-update')
        ->middlewareFor('destroy', 'permission:users-delete');

    Route::resource('categories', CategoryController::class)
        ->middlewareFor(['index', 'show'], 'permission:categories-access')
        ->middlewareFor(['create', 'store'], 'permission:categories-create')
        ->middlewareFor(['edit', 'update'], 'permission:categories-edit')
        ->middlewareFor('destroy', 'permission:categories-delete');
    Route::resource('products', ProductController::class)
        ->middlewareFor(['index', 'show'], 'permission:products-access')
        ->middlewareFor(['create', 'store'], 'permission:products-create')
        ->middlewareFor(['edit', 'update'], 'permission:products-edit')
        ->middlewareFor('destroy', 'permission:products-delete');
    Route::resource('customers', CustomerController::class)
        ->middlewareFor(['index', 'show'], 'permission:customers-access')
        ->middlewareFor(['create', 'store'], 'permission:customers-create')
        ->middlewareFor(['edit', 'update'], 'permission:customers-edit')
        ->middlewareFor('destroy', 'permission:customers-delete');

    // Suppliers Routes
    Route::resource('suppliers', SupplierController::class)
        ->middlewareFor(['index', 'show'], 'permission:suppliers-access')
        ->middlewareFor(['create', 'store'], 'permission:suppliers-create')
        ->middlewareFor(['edit', 'update'], 'permission:suppliers-edit')
        ->middlewareFor('destroy', 'permission:suppliers-delete');

    // Warehouses Routes
    Route::resource('warehouses', WarehouseController::class)
        ->middlewareFor(['index', 'show'], 'permission:warehouses-access')
        ->middlewareFor(['create', 'store'], 'permission:warehouses-create')
        ->middlewareFor(['edit', 'update'], 'permission:warehouses-edit')
        ->middlewareFor('destroy', 'permission:warehouses-delete');

    // Displays Routes
    Route::resource('displays', DisplayController::class)
        ->middlewareFor(['index', 'show'], 'permission:displays-access')
        ->middlewareFor(['create', 'store'], 'permission:displays-create')
        ->middlewareFor(['edit', 'update'], 'permission:displays-edit')
        ->middlewareFor('destroy', 'permission:displays-delete');

    // Stock Movements Routes
    Route::get('/stock-movements', [StockMovementController::class, 'index'])
        ->middleware('permission:stock-movements-access')
        ->name('stock-movements.index');
    Route::get('/stock-movements/create', [StockMovementController::class, 'create'])
        ->middleware('permission:stock-movements-create')
        ->name('stock-movements.create');
    Route::post('/stock-movements', [StockMovementController::class, 'store'])
        ->middleware('permission:stock-movements-create')
        ->name('stock-movements.store');
    Route::get('/stock-movements/transfer', [StockMovementController::class, 'transfer'])
        ->middleware('permission:stock-movements-create')
        ->name('stock-movements.transfer');
    Route::post('/stock-movements/transfer', [StockMovementController::class, 'storeTransfer'])
        ->middleware('permission:stock-movements-create')
        ->name('stock-movements.storeTransfer');
    Route::get('/stock-movements/warehouse-stock', [StockMovementController::class, 'getWarehouseStock'])
        ->middleware('permission:stock-movements-access')
        ->name('stock-movements.warehouseStock');
    Route::get('/stock-movements/display-stock', [StockMovementController::class, 'getDisplayStock'])
        ->middleware('permission:stock-movements-access')
        ->name('stock-movements.displayStock');
    Route::get('/stock-movements/stock-out', [StockMovementController::class, 'stockOut'])
        ->middleware('permission:stock-movements-create')
        ->name('stock-movements.stockOut');
    Route::post('/stock-movements/stock-out', [StockMovementController::class, 'storeStockOut'])
        ->middleware('permission:stock-movements-create')
        ->name('stock-movements.storeStockOut');

    //route transaction
    // Route::get('/transactions', [TransactionController::class, 'index'])->middleware('permission:transactions-access')->name('transactions.index'); // Removed - using POS instead

    //route transaction searchProduct
    Route::post('/transactions/searchProduct', [TransactionController::class, 'searchProduct'])->middleware('permission:transactions-access')->name('transactions.searchProduct');

    //route transaction addToCart
    Route::post('/transactions/addToCart', [TransactionController::class, 'addToCart'])->middleware('permission:transactions-access')->name('transactions.addToCart');

    //route transaction destroyCart
    Route::delete('/transactions/{cart_id}/destroyCart', [TransactionController::class, 'destroyCart'])->middleware('permission:transactions-access')->name('transactions.destroyCart');

    //route transaction store
    Route::post('/transactions/store', [TransactionController::class, 'store'])->middleware('permission:transactions-access')->name('transactions.store');
    Route::get('/transactions/{invoice}/print', [TransactionController::class, 'print'])->middleware('permission:transactions-access')->name('transactions.print');
    Route::get('/transactions/history', [TransactionController::class, 'history'])->middleware('permission:transactions-access')->name('transactions.history');

    // POS Routes
    Route::get('/pos', [POSController::class, 'index'])->middleware('permission:transactions-access')->name('pos.index');
    Route::post('/pos/addToCart', [POSController::class, 'addToCart'])->middleware('permission:transactions-access')->name('pos.addToCart');
    Route::delete('/pos/{cart_id}/destroyCart', [POSController::class, 'destroyCart'])->middleware('permission:transactions-access')->name('pos.destroyCart');
    Route::patch('/pos/{cart_id}/updateCart', [POSController::class, 'updateCart'])->middleware('permission:transactions-access')->name('pos.updateCart');

    Route::get('/settings/payments', [PaymentSettingController::class, 'edit'])->middleware('permission:payment-settings-access')->name('settings.payments.edit');
    Route::put('/settings/payments', [PaymentSettingController::class, 'update'])->middleware('permission:payment-settings-access')->name('settings.payments.update');

    //reports
    Route::get('/reports/sales', [SalesReportController::class, 'index'])->middleware('permission:reports-access')->name('reports.sales.index');
    Route::get('/reports/profits', [ProfitReportController::class, 'index'])->middleware('permission:profits-access')->name('reports.profits.index');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

