<?php

namespace App\Providers;

use Illuminate\Support\Carbon;
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

        // Fix: Serialize dates with real timezone offset instead of literal 'Z'.
        // Without this, Laravel outputs e.g. "2026-05-12T17:03:00.000000Z" for Jakarta time,
        // which JavaScript incorrectly interprets as UTC, adding +7 hours (showing May 13 instead of May 12).
        Carbon::serializeUsing(function (Carbon $carbon) {
            return $carbon->format('Y-m-d\TH:i:s.uP');
        });
    }
}
