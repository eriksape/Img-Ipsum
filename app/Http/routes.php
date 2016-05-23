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

Route::get('/generate/{width}/{height}/{category}', 'CustomImageCacheController@prueba');
Route::group(['middleware' => 'json'], function () {
    resource('author', 'AuthorController', ['except'=>['create', 'show', 'edit']]);
    resource('category', 'CategoryController', ['except'=>['create', 'show', 'edit']]);
    resource('files', 'FileStorageController', ['only'=>['store', 'destroy']]);
});
