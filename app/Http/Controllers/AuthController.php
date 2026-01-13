<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{
    public function logout()
    {
        Auth::logout();
        Session::forget('cas_user');
        Session::invalidate();
        Session::regenerateToken();

        cas()->logout();

        return redirect('/');
    }
}
