<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
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
            // CHECK ADMIN ROLE
            // var_dump(Auth::check());
            if (Auth::user()->role == 'admin') {
                return $next($request);
            } else {
                return redirect('/')->with('message', 'access denied as you are not an admin ...');
            }
        } else {
            return redirect('/login')->with('message', 'access denied as you are not log in ...');
        }
        return $next($request);
    }
}
