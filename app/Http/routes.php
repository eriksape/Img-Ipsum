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
  $img = Image::make('2833540510_23b8d43865_o.jpg')->fit(1920, 1920);
  return $img->response('jpg');
});

Route::get('/generate', 'CustomImageCacheController@generate');
get('/{width}/{height}/{category?}/{id?}', 'CustomImageCacheController@show');

Route::get('/generate/{width}/{height}/{category}', 'CustomImageCacheController@prueba');
Route::group(['middleware' => 'json'], function () {
    resource('author', 'AuthorController', ['except'=>['create', 'show', 'edit']]);
    resource('category', 'CategoryController', ['except'=>['create', 'show', 'edit']]);

    Route::group(['prefix' => 'files', 'as'=>'files.'], function () {
        post('{validation}', ['as'=>'store', 'uses'=>'FileStorageController@store'])->where('validation', '(image|pdf)?');
        delete('{file}', ['as'=>'destroy', 'uses'=>'FileStorageController@destroy']);
    });

    resource('bank', 'ImageBankController', ['except'=>['create', 'show', 'edit']]);
});
