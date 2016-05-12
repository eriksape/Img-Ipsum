<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class AuthorRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        switch ($this->method()) {
            case 'GET':
            case 'DELETE':
                return [];
            break;
            case 'POST':
            case 'PUT':
            case 'PATCH':
                return [
                    'name'  => 'required|max:100|string',
                    'site'  => 'required|max:200|url'
                ];
            break;
        }
    }

}
