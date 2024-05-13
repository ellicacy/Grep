<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
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
            'evenementNom'=>'required|string|max:50',
            'evenementDescription'=>'required|string|max:255',
            'evenementDate'=>'required|date',
            'evenementRue'=>'required|string|max:255',
            'evenementCP'=>'required|numeric',
            'evenementVille'=>'required|string|max:255',
            'evenementNbrPersonne'=>'required|numeric|min:0',
            'evenementHeureDebut'=>'required',
            'evenementHeureFin'=>'required',
            'evenementStatus'=>'required|string',
            'paiementNo'=>'required|string',
            'paiementMontant'=>'required|numeric',
            'paiementType'=>'required|string',
            'paiementStatus'=>'required|string'
        ];
    }
}
