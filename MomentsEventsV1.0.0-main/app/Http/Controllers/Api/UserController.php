<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Http\Resources\ActiveUserResource;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return UserResource::collection(
            User::query()->orderBy('idPersonne', 'desc')->get()
        );
    }

    public function getActiveUsers()
    {
        $activeUsers = User::where('isActive', 1)->get();
        return response()->json([
            'data' => ActiveUserResource::collection($activeUsers)
        ]);
    }

    public function getDeletedUsers()
    {
        $deletedUsers = User::where('isActive', 0)->get();
        return response()->json([
            'data' => ActiveUserResource::collection($deletedUsers)
        ]);
    }

    public function activateUser($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'Utilisateur non trouvé'], 404);
        }

        $user->isActive = 1;
        $user->save();

        return response()->json(['message' => 'Utilisateur activé avec succès']);
    }

    public function desactivateUser($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'Utilisateur non trouvé'], 404);
        }

        $user->isActive = 0;
        $user->save();

        return response()->json(['message' => 'Utilisateur activé avec succès']);
    }


    public function swapRole($id, Request $request) {
        try {
            // Trouver l'utilisateur par ID
            $user = User::findOrFail($id);
    
            // Vérifier si le rôle envoyé est valide
            $allowedRoles = ['user', 'prestataire']; // Vous pouvez ajouter d'autres rôles si nécessaire
            $newRole = $request->input('role');
    
            if (!in_array($newRole, $allowedRoles)) {
                return response()->json(['error' => 'Rôle non valide.'], 400);
            }
    
            // Mettre à jour le rôle de l'utilisateur
            $user->role = $newRole;
            $user->save();
    
            return response()->json(['message' => 'Rôle mis à jour avec succès.'], 200);
    
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Utilisateur non trouvé.'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Une erreur est survenue lors de la mise à jour du rôle.'], 500);
        }
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreUserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $data['role'] = $request->input('role');
        $user = User::create($data);
        return response(new UserResource($user), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateUserRequest  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }
        $data['personneLogin'] = $request->input('personneLogin');
        $data['personneDateNaissance'] = $request->input('personneDateNaissance');
        $data['role'] = $request->input('role');
        $user->update($data);
        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response('User deleted', 204);
    }

    // public function getName(Request $request) {
    //     dd($request->query());
    //     return response($request->query(), 201);
    // }
}
