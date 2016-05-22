<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Models\FileStorage;
use Uuid;
use Storage;
use App\Library\Conversions;

class FileStorageController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $file = $request->file('file');
        $size = Conversions::human_filesize($file->getClientSize());
        $filename = Uuid::generate(4).'.'.$file->getExtension();
        Storage::put( $filename, $file );

        $fileStorage = new FileStorage();
        $fileStorage->filename  = $filename;
        $fileStorage->size      = $size;
    }

}
