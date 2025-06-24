<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session as FacadesSession;
use Symfony\Component\HttpFoundation\Response;

class CasAuth
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (FacadesSession::exists("cas_user")) {
            return $next($request);
        }
        if (!cas()->checkAuthentication()) {
            if ($request->ajax() || $request->wantsJson()) {
                return response('Unauthorized', 401);
            }

            cas()->authenticate();
        }

        $casUser = cas()->user();
        $fullName = cas()->getAttribute('displayName');
        $email = cas()->getAttribute('mail');

        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'full_name' => $fullName,
                'email' => $email,
            ]
        );
        if (!Auth::check()) {
            Auth::login($user); // <- Optionnel si tu veux l’authentifier via Laravel
        }
        // Optionnel : stocker dans la session si nécessaire
        session(['cas_user' => $casUser]);

        return $next($request);
    }
}
