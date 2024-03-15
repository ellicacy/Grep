<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginAdminRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\User;

class AuthController extends Controller
{

    public function signup(SignupRequest $request) {
        $data = $request->validated();
        
        /** @var \App\Models\User $user */
        $user = User::create([
            'personneNom'=>$data['personneNom'],
            'personnePrenom'=>$data['personnePrenom'],
            'personneDateNaissance'=>$data['personneDateNaissance'],
            'personneLogin'=>$data['personneLogin'],
            'password'=>bcrypt($data['password']),
            'role'=>'user',
        ]);

        $token = $user->createToken('main')->plainTextToken;

        // return response([
        //     'user'=>$user,
        //     'token'=>$token
        // ]);

        return response(compact('user','token'));
    }

    public function login(LoginRequest $request) {
        $credentials = $request->validated();
        if (!Auth::attempt(($credentials))) {
            return response([
                'message' => 'Provided email address or password is incorrect'
            ], 422);
        }
        /** @var \App\Models\User $user */
        $user = Auth::user();
        
        // var_dump($user);
        $token = $user->createToken('main')->plainTextToken;

        $user = $user->only(['idPersonne', 'personnePrenom', 'personneNom', 'personneLogin', 'role']);
        // return response([
        //     'user'=>$user,
        //     'token'=>$token
        // ]);

        return response(compact('user','token'));

    }

    public function loginAdmin(LoginAdminRequest $request) {
        $credentials = $request->validated();
        $u = User::where('personneLogin',$credentials['personneLogin'])->get()->first();
        if ($u) {
            $role = $u->role;
            $credentials['role'] = $role;
        }
        if (!Auth::attempt(($credentials))) {
            return response([
                'message' => 'Provided email address or password is incorrect'
            ], 422);
        }
        if (!isset($credentials['role']) || $credentials['role'] != 'admin') {
            return response([
                'message' => 'You are not an admin, you cant log in ...' 
            ], 404);
        }
        /** @var \App\Models\User $user */
        $user = Auth::user();
        
        $token = $user->createToken('main')->plainTextToken;

        $user = $user->only(['idPersonne', 'personnePrenom', 'personneNom', 'personneLogin', 'role']);

        return response(compact('user','token'));
    }

    public function logout(Request $request) {
        /** @var User $user */
        $user = $request->user();
        // dd($user->currentAccessToken()->id);
        // dd($request);
        // var_dump('USERRRR :');
        // dd($request);
        // var_dump($user);
        $user->tokens()->where('id',$user->currentAccessToken()->id)->delete();
        // var_dump($user->tokens()->where('idPersonne', $user->currentAccessToken()));
        // $user->currentAccessToken()->delete();
        return response('', 204);
    }

    
}