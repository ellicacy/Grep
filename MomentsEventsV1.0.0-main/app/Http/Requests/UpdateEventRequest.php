<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEventRequest extends FormRequest
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
            'evenementNom'=>'string|max:50',
            'evenementDescription'=>'string|max:255',
            'evenementDate'=>'date',
            'evenementRue'=>'string|max:255',
            'evenementCP'=>'numeric',
            'evenementVille'=>'string|max:255',
            'evenementNbrPersonne'=>'numeric|min:0',
            'evenementHeureDebut'=>'',
            'evenementHeureFin'=>'',
            'evenementStatus'=>'string',
            'paiementNo'=>'string',
            'paiementMontant'=>'numeric',
            'paiementType'=>'string',
            'paiementStatus'=>'string'
        ];
    }
}
