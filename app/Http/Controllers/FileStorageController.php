<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Models\FileStorage;
use Uuid;
use Storage;
use File;
use App\Library\Conversions;

class FileStorageController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  Symfony\Component\HttpFoundation\File\UploadedFile
     *
     * @return object
     */
    private function save_file($file)
    {
        $fileObject = (object) [
            'size' => Conversions::human_filesize($file->getClientSize()),
            'filename' => Uuid::generate(4).'.'.$file->getExtension(),
        ];

        Storage::put($fileObject->filename, File::get($file));

        return $fileObject;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $file = $this->save_file($request->file('file'));

        $fileStorage = new FileStorage();
        $fileStorage->filename = $file->filename;
        $fileStorage->size = $file->size;

        if (!$fileStorage->save()) {
            abort(500, 'category was not saved');
        }

        return $fileStorage;
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $fileStorage = FileStorage::find($id);

        if (!$fileStorage) {
            abort(404, 'not File Storage found');
        }

        return $fileStorage;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int                      $id
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $fileStorage = $this->show($id);

        $fileStorage->fill($request->all());

        if (!$fileStorage->save()) {
            abort(500, 'file storage was not updated');
        }

        return Author::find($id);
    }
}
