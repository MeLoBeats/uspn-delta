<?php

namespace App\Http\Controllers;

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

    // Additional methods for managing admin users can be added here
}
