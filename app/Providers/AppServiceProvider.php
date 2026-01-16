<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Implicitly grant "super-admin" role all permissions
        // This works in the app by bypassing Gate checks
        Gate::before(function ($user, $ability) {
            return $user->hasRole('super-admin') ? true : null;
        });
    }
}
