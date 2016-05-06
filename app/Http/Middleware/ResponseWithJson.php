<?php

namespace App\Http\Middleware;

use Closure;

class ResponseWithJson
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        if($response->status() == 200){

            switch ($request->method()) {
                case 'POST':
                    return response()->json($response->original,201);
                    break;
                case 'GET':
                case 'PUT':
                case 'PATCH':
                    return response()->json($response->original,200);
                    break;
                case 'DELETE':
                    return response($response->original, 204);
                    break;
            }

        }

        return $response;

    }
}
