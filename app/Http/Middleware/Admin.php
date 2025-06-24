<?php

namespace App\Http\Middleware;

use App\Models\AdminUsers;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        $isAdmin = AdminUsers::where('email', $user->email)->exists();

        if (!$isAdmin) {
            Log::debug('Redirection avec flash error');

            $response = redirect('/')
                ->with('error', 'Vous n\'êtes pas autorisé(e) à accéder à cette page.');
            return $response;
        }

        return $next($request);
    }
}
