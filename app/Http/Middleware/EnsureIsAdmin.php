<?php

namespace App\Http\Middleware;

use App\Models\AdminUsers;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class EnsureIsAdmin
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if (!$user || !AdminUsers::where('email', $user->email)->exists()) {
            Log::debug('Redirection non autorisée - utilisateur non admin ou non connecté.');

            return redirect(route('request.index'))
                ->with('error', 'Vous n\'êtes pas autorisé(e) à accéder à cette page.');
        }

        return $next($request);
    }
}
