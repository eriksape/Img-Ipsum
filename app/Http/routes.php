<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/app/{all?}', function () {
    return view('welcome');
})->where('all', '.*');

//get('/{width}/{height}/{category?}/{id?}', 'CustomImageCacheController@show');
get('/{width}/{height}', 'CustomImageCacheController@prueba');

get('/token', function (Request $request) {
  return response(csrf_token());
});

get('/token/new', function (Request $request) {
  Session::regenerateToken();

  return [csrf_token(), $request->cookie('XSRF-TOKEN')];
});

Route::get('/generate/{width}/{height}/{category}', 'CustomImageCacheController@prueba');
Route::group(['middleware' => 'json'], function () {
    resource('author', 'AuthorController', ['except' => ['create', 'edit']]);
    resource('category', 'CategoryController', ['except' => ['create', 'edit']]);

    Route::group(['prefix' => 'files', 'as' => 'files.'], function () {
        post('{validation}', ['as' => 'store', 'uses' => 'FileStorageController@store'])->where('validation', '(image|pdf)?');
        delete('{file}', ['as' => 'destroy', 'uses' => 'FileStorageController@destroy']);
    });

    resource('bank', 'ImageBankController', ['except' => ['create', 'show', 'edit']]);
});
