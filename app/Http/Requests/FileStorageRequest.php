<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class FileStorageRequest extends Request
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
            case 'PUT':
            case 'PATCH':
            case 'DELETE':
                return [];
            break;
            case 'POST':
                $validation = '';
                switch ($this->validation) {
                    case 'image':
                        $validation.='image';
                    break;
                    case 'pdf':
                        $validation.='mimetypes:application/pdf';
                    default:
                        $validation = '';
                    break;
                }
                return ['file'=>$validation];
            break;
        }
    }
}
