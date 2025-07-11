<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAdminUserRequest;
use App\Http\Resources\AdminUsersResource;
use App\Models\AdminUsers;

class AdminUsersController extends Controller
{
    public function index()
    {
        $admins = AdminUsers::paginate()->withQueryString();
        $res = AdminUsersResource::collection($admins);
        // Logic to list admin users
        return inertia('admin/users/index', [
            "users" => $res
        ]);
    }

    public function store(StoreAdminUserRequest $request)
    {
        // Validate and store the new admin user
        $validated = $request->validated();

        // Create the admin user
        AdminUsers::create($validated);

        // Redirect back to the admin users index with a success message
        return redirect()->route('admin.users.index')->with('success', 'L\'administrateur a été ajouté avec succès.');
    }

    public function destroy($id)
    {
        // Logic to delete an admin user
        $admin = AdminUsers::findOrFail($id);
        $admin->delete();

        return redirect()->route('admin.users.index')->with('success', 'L\'administrateur a été supprimé avec succès.');
    }
}
