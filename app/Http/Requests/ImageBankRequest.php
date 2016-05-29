<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class ImageBankRequest extends Request
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
                return [
                    'origin_url'      => 'required|unique:image_banks',
                    'category_id'     => 'required|exists:categories,id',
                    'author_id'       => 'required|exists:authors,id',
                    'file_storage_id' => 'required|exists:file_storages,id',
                ];
            break;
            case 'PUT':
            case 'PATCH':
                return [
                    'origin_url'      => 'required|unique:image_banks,'.$this->id,
                    'category_id'     => 'required|exists:categories,id',
                    'author_id'       => 'required|exists:authors,id',
                    'file_storage_id' => 'required|exists:file_storages,id',
                ];
            break;
        }
    }
}
