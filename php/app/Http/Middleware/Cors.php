<?php

namespace App\Http\Middleware;

use Closure;

class Cors 
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    public function handle($request, Closure $next)
	{
    return $next($request)->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods','GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	}
}
