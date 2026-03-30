<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\UserRequest;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // get all users data
        $users = User::query()
            ->with('roles')
            ->when(request()->search, fn($query) => $query->where('name', 'like', '%' . request()->search . '%'))
            ->select('id', 'name', 'avatar', 'email')
            ->latest()
            ->paginate(request()->input('per_page', 10))
            ->withQueryString();

        // render view
        return Inertia::render('Dashboard/Users/Index', [
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // get all role data
        $roles = Role::query()
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        // render view
        return Inertia::render('Dashboard/Users/Create', [
            'roles' => $roles
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        // create new user data
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        // assign role to user
        $user->assignRole($request->selectedRoles);

        // render view
        return to_route('users.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        // get all role data
        $roles = Role::query()
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        // load relationship
        $user->load(['roles' => fn($query) => $query->select('id', 'name'), 'roles.permissions' => fn($query) => $query->select('id', 'name')]);

        // render view
        return Inertia::render('Dashboard/Users/Edit', [
            'roles' => $roles,
            'user' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user)
    {
        // check if user send request password
        if ($request->password)
            // update user data password
            $user->update([
                'password' => bcrypt($request->password),
            ]);

        // update user data name
        $user->update([
            'name' => $request->name,
        ]);

        // assign role to user
        $user->syncRoles($request->selectedRoles);

        // render view
        return to_route('users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $ids = explode(',', $id);

        // Prevent deleting yourself
        if (in_array(auth()->id(), $ids)) {
            return back()->with('error', 'Anda tidak bisa menghapus akun sendiri!');
        }

        // Check relationships for each user
        $users = User::whereIn('id', $ids)->get();
        foreach ($users as $user) {
            if ($user->shifts()->count() > 0) {
                return back()->with('error', "User '{$user->name}' tidak bisa dihapus karena masih memiliki riwayat shift!");
            }
        }

        User::whereIn('id', $ids)->delete();

        // render view
        return back()->with('success', 'User berhasil dihapus!');
    }
}
