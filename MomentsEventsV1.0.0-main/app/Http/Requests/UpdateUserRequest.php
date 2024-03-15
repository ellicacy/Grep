<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
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
    public function rules(Request $request)
    {
        // $personneLogin = $this->user()->personneLogin;

        // dd($this->user);
        // dd($request);

        return [
            'personneNom'=>'string|max:55',
            'personnePrenom'=>'string|max:55',
            // 'personneLogin' => 'email|unique:users,personneLogin,'.$this->user->personneLogin,
            Rule::unique('users')->where('personneLogin', '!=', $request->personneLogin),
            // Rule::unique('users')->ignore($this->user->personneLogin, 'personneLogin'),
            'password'=>[
                'confirmed',
                Password::min(8)
                ->letters()
                ->symbols()
            ]
        ];
    }

}
