<?php

namespace App\Http\Controllers\Apps;

use App\Models\Setting;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SettingsController extends Controller
{
    /**
     * Display the settings page
     */
    public function index()
    {
        $settings = [
            'store' => Setting::getGroup('store'),
            'receipt' => Setting::getGroup('receipt'),
            'sales' => Setting::getGroup('sales'),
            'display' => Setting::getGroup('display'),
            'notification' => Setting::getGroup('notification'),
        ];

        return Inertia::render('Dashboard/Settings/Index', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update settings
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'group' => 'required|string|in:store,receipt,sales,display,notification',
            'settings' => 'required|array',
        ]);

        $group = $validated['group'];
        $settings = $validated['settings'];

        // Handle logo upload for store group
        if ($group === 'store' && $request->hasFile('logo')) {
            $logo = $request->file('logo');
            $logoName = 'store_logo.' . $logo->getClientOriginalExtension();
            $logo->storeAs('public/settings', $logoName);
            $settings['store_logo'] = $logoName;
        }

        // Save each setting
        foreach ($settings as $key => $value) {
            // Skip file inputs and null values for toggles
            if ($value === null && !str_contains($key, 'enabled')) {
                continue;
            }
            
            // Convert boolean-like values
            if (is_bool($value)) {
                $value = $value ? '1' : '0';
            }
            
            Setting::set($key, $value, $group);
        }

        return redirect()->back()->with('success', 'Pengaturan berhasil disimpan!');
    }
}
