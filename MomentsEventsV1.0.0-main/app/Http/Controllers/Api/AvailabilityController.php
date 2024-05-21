<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Availability;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AvailabilityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Récupération des disponibilités de l'utilisateur authentifié
        //$availabilities = auth()->user()->availabilities;
        $availabilities = Availability::query()->orderBy('availability', 'asc')->get();
        //dd($availabilities);

        return response()->json($availabilities);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Convertir les données depuis le JSON
        $data = json_decode($request->getContent(), true);

        // Validation des données du formulaire pour chaque disponibilité
        $validator = Validator::make($data, [
            'availabilities' => 'required|array',
            'availabilities.*.dateTime' => 'required|date',
            'availabilities.*.idPrestation' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $addedAvailabilities = [];
        $conflicts = [];

        foreach ($data['availabilities'] as $availabilityData) {
            // Vérifier si une disponibilité similaire existe déjà
            $existingAvailability = Availability::where('dateTime', $availabilityData['dateTime'])
                ->where('idPrestation', $availabilityData['idPrestation'])
                ->first();

            if ($existingAvailability) {
                $conflicts[] = $availabilityData;
                continue;
            }

            // Création d'une nouvelle disponibilité
            $availability = new Availability();
            $availability->dateTime = $availabilityData['dateTime'];
            $availability->idPrestation = $availabilityData['idPrestation'];
            $availability->save();

            $addedAvailabilities[] = $availability;
        }

        $response = [
            'added' => $addedAvailabilities,
            'conflicts' => $conflicts
        ];

        return response()->json($response, 201);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Availability  $availability
     * @return \Illuminate\Http\Response
     */
    public function show(Availability $availability)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Availability  $availability
     * @return \Illuminate\Http\Response
     */
    public function edit(Availability $availability)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Availability  $availability
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Availability $availability)
    {

        // Valider les données entrantes
        $validatedData = $request->validate([
            'dateTime' => 'required|date',
            // Ajoutez d'autres champs si nécessaire
        ]);

        // Mettre à jour la disponibilité dans la base de données
        $availability->update($validatedData);

        // Rediriger l'utilisateur vers une page (par exemple, la page de détails de la disponibilité)
        return redirect()->json($availability, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Availability  $availability
     * @return \Illuminate\Http\Response
     */
    public function destroy(Availability $availability)
    {
        // Supprimer la disponibilité de la base de données
        $availability->delete();

        // Rediriger l'utilisateur vers une page (par exemple, la page de liste des disponibilités)
        return response()->json(['message' => 'Disponibilité supprimée avec succès'], 204);
    }
}
