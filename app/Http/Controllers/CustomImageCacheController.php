<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Image;
use App\Models\Category;

class CustomImageCacheController extends Controller
{

    public function show($width, $height, $category = false, $id = false)
    {
        if ($category) {
            $category = Category::whereName($category)->first();
        } else {
            $category = Category::all()->random(1);
        }

        if (!$id) {
            $id = rand(1, 10);
        }

        return $width.' '.$height.' '.$category->name.' '.$id;
    }

    public function generate()
    {
        $img = Image::make('2833540510_23b8d43865_o.jpg')->fit(1920, 1920);
        return $img->response('jpg');
    }

    public function prueba($width, $height)
    {
        $img = Image::cache(function ($image) use ($width, $height) {
            $image->make('2833540510_23b8d43865_o.jpg')->fit($width, $height);
        }, config('imagecache.lifetime'));

        return $this->buildResponse($img);
    }

    private function buildResponse($content)
    {
        return response($content, 200)
            ->header('Content-Type', finfo_buffer(finfo_open(FILEINFO_MIME_TYPE), $content))
            ->header('Cache-Control', 'max-age='.(config('imagecache.lifetime')*60).', public')
            ->header('Etag', md5($content));
    }
}
