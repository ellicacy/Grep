<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePackRequest extends FormRequest
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
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'nom'=>'required|string|max:255',
            'description'=>'required|string|max:255',
            'prix_fixe'=>'numeric|min:0',
            'unite'=>'string|max:255',
            'prix_unite'=>'numeric|min:0'
        ];
    }
}
