<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest as Request;
use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $per_page = $request->has('per_page') ? $request->input('per_page') : 10;
        $sort = $request->has('sort') ? $request->sort : 'name';
        $direction = $request->has('direction') ? $request->direction : 'asc';
        $category = new Category;
        if ($request->has('search')) {
            $category = $category->where('name', 'like', '%'.$request->search.'%')
            ->orWhere('site', 'like', '%'.$request->search.'%');
        }

        $category = $category->orderBy($sort, $direction);

        $category = $category->paginate(intval($per_page))->toArray();

        return array_add(array_add($category, 'sort', $sort), 'direction', $direction);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $category = new Category($request->all());

        if (! $category->save()) {
            abort(500, 'category was not saved');
        }

        return $category;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $category = Category::find($id);

        if (! $category) {
            abort(404, 'not category found');
        }

        return $category;
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
        $category = $this->show($id);

        $category->fill($request->all());

        if (! $category->save()) {
            abort(500, 'category was not updated');
        }

        return Category::find($id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category = $this->show($id);

        $category->delete();

        return;
    }
}
