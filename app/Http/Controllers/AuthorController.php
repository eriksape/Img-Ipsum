<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthorRequest as Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Models\Author;

class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Author::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $author = new Author($request->all());

        if (!$author->save()) {
            abort(500, 'author was not saved');
        }

        return $author;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $author = Author::find($id);

        if (!$author) {
            abort(404, 'not author found');
        }

        return $author;
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
        $author = $this->show($id);

        $author->fill($request->all());

        if (!$author->save()) {
            abort(500, 'author was not updated');
        }

        return Author::find($id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $author = $this->show($id);

        $author->delete();

        return null;
    }
}
