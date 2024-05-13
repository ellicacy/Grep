<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use App\Models\User;

class UserSettingsController extends Controller
{
    public function getSettings()
    {
        if (!auth()->check()) {
            return response()->json(['error' => 'Non authentifié'], 401);
        }

        // Récupérer les paramètres de l'utilisateur actuellement connecté
        $userSettings = auth()->user();

        return response()->json($userSettings);
    }


    public function updateSettings(Request $request)
    {
        // Récupérer l'utilisateur actuellement connecté
        $user = auth()->user();

        // Valider les données reçues
        $data = $request->validate([
            'personneNom' => 'required|string|max:255',
            'personnePrenom' => 'required|string|max:255',
            'personneLogin' => 'required|string|email|max:255',
            'clientVille' => 'required|string|max:255',
            'clientCodePostal' => 'required|numeric',
            'clientRue' => 'required|string|max:255',
            // autres règles si besoins
        ]);

        // Mettre à jour les attributs de l'utilisateur
        $user->personneNom = $data['personneNom'];
        $user->personnePrenom = $data['personnePrenom'];
        $user->personneLogin = $data['personneLogin'];
        $user->clientVille = $data['clientVille'];
        $user->clientCodePostal = $data['clientCodePostal'];
        $user->clientRue = $data['clientRue'];

        // Sauvegarder les modifications
        $user->save();

        // Retourner une réponse JSON avec les données mises à jour
        return response()->json($user);
    }

    public function updateBankInformations(Request $request)
    {
        // Récupérer l'utilisateur actuellement connecté
        $user = auth()->user();

        // Valider les données reçues
        $data = $request->validate([
            'prestataireBanque' => 'required|string|max:255',
            'prestataireIBAN' => 'required|string|max:34',
            // autres règles si besoin
        ]);

        // Mettre à jour les attributs de l'utilisateur
        $user->prestataireBanque = $data['prestataireBanque'];
        $user->prestataireIBAN = $data['prestataireIBAN'];

        // Sauvegarder les modifications
        $user->save();

        // Retourner une réponse JSON avec les données mises à jour
        return response()->json($user);
    }

    public function getAvatar()
    {
        if (!auth()->check()) {
            return response()->json(['error' => 'Non authentifié'], 401);
        }

        $user = auth()->user();
        $avatarPath = $user->prestatairePhotos;

        if (!$avatarPath || empty($avatarPath)) {
            // URL vers l'image par défaut
            $defaultAvatarUrl = asset('avatars/default.jpeg');
            return response()->json(['avatar_url' => $defaultAvatarUrl]);
        }

        $avatarUrl = asset(Storage::url($avatarPath));
        return response()->json(['avatar_url' => $avatarUrl]);
    }

    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user = auth()->user();

        // Supprimer l'ancien avatar si existant
        if ($user->prestatairePhotos) {
            Storage::disk('public')->delete($user->prestatairePhotos);
        }

        $file = $request->file('avatar');
        $path = $file->store('avatars', 'public');

        $user->prestatairePhotos = $path;
        $user->save();

        $avatarUrl = asset(Storage::url($path));
        return response()->json(['avatar_url' => $avatarUrl]);
    }

    public function updateProfile(Request $request)
    {
        $user = auth()->user();
        $user->personnePrenom = $request->input('personnePrenom');
        $user->personneNom = $request->input('personneNom');
        $user->clientVille = $request->input('clientVille');
        $user->prestataireDescription = $request->input('prestataireDescription');
        $user->save();

        return response()->json(['message' => 'Profil mis à jour avec succès']);
    }
}
