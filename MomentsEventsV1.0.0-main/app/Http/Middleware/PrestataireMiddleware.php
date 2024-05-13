<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PrestataireMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // CHECK AUTHENTICATION
        if (Auth::check()) {
            // CHECK PRESTATAIRE ROLE
            // var_dump(Auth::check());
            if (Auth::user()->role == 'prestataire') {
                return $next($request);
            } else {
                return redirect('/')->with('message', 'access denied as you are not a prestataire ...');
            }
        } else {
            return redirect('/login')->with('message', 'access denied as you are not log in ...');
        }
        return $next($request);
    }
}
