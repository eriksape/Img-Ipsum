<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\ImageBank;
use Uuid;

class ImageBankController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return BankImage::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $imageBank = new ImageBank();
        $imageBank->origin_url          = $request->origin_url;
        $imageBank->category_id         = $request->category_id;
        $imageBank->file_storage_id     = $request->file_storage_id;
        $imageBank->author_id           = $request->author_id;

        if (!$imageBank->save()) {
            abort(500, 'bank image was not saved');
        }

        return $imageBank;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $imageBank = ImageBank::find($id);

        if (!$imageBank) {
            abort(404, 'not image bank found');
        }

        return $imageBank;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $imageBank = $this->show($id);

        $imageBank->fill($request->all());

        if (!$imageBank->save()) {
            abort(500, 'author was not updated');
        }

        return ImageBank::find($id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $imageBank = $this->show($id);

        $imageBank->delete();

        return null;
    }
}
