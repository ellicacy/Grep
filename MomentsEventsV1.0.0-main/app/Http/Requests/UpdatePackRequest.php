<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePackRequest extends FormRequest
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
             'nom' => 'required',
             'description' => 'required|string',
             'prestations' => 'required|array',
             'prestations.*' => 'exists:prestations,id',
             'prix_fixe' => 'nullable|numeric',
             'unite' => 'nullable|string',
             'prix_unite' => 'nullable|numeric',
             'unite_max' => 'nullable|numeric'
         ];
     }
}
