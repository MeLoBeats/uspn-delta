<?php

namespace App\Http\Controllers;

class AdminUsersController extends Controller
{
    public function index()
    {
        // Logic to list admin users
        return inertia('admin/users/index');
    }

    // Additional methods for managing admin users can be added here
}
