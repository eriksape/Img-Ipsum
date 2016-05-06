<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyCsrfToken extends BaseVerifier
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        //
    ];



    /**
    * Override to disable validation when testing.
    *
    * @param \Illuminate\Http\Request $request
    * @return bool
    */
    protected function tokensMatch($request)
    {
        // Don't validate CSRF when testing.
        if(env('APP_ENV') === 'testing') {
            return true;
        }

        return parent::tokensMatch($request);
    }
}
