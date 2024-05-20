<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
//use App\Http\Requests\StorePackRequest;
use App\Http\Requests\UpdatePackRequest;
use App\Http\Resources\PackResource;
use App\Models\Pack;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class PackController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // return Pack::with('prestations')->get();
        return Pack::with('prestations')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        #MomentsEvent
        /*
        // $donnees = $request->validated();
        // dd($donnees);
        // $pack = Pack::create($donnees);
        // dd($request);
        $pack = new Pack();
        $pack->nom = $request['nom'];
        $pack->description = $request['description'];
        $pack->prix_fixe = $request['prix_fixe'];
        $pack->unite = $request['unite'];
        $pack->prix_unite = $request['prix_unite'];
        // dd($pack);
        $pack->save();
        // dd($pack);
        // return response(new PackResource($pack), 201);
        return response([
            'message'=>'Pack added successfully !',
            'pack'=>$pack
        ], 201);
        */
        // Convertir les données depuis le JSON
        $data = json_decode($request->getContent(), true);

        $validator = Validator::make($data, [
            'nom' => 'required',
            'description' => 'required|string',
            'prestations' => 'required|array',
            'prestations.*' => 'exists:prestations,id',
        ]);

        $validator->sometimes('prix_fixe', 'required|numeric', function ($input) {
            return empty($input->unite) && empty($input->prix_unite) && empty($input->unite_max);
        });

        $validator->sometimes(['unite', 'prix_unite', 'unite_max'], 'required', function ($input) {
            return empty($input->prix_fixe);
        });

        $validatedData = $validator->validate();

        $pack = new Pack();
        $pack->nom = $validatedData['nom'];
        $pack->description = $validatedData['description'];
        $pack->prix_fixe = $validatedData['prix_fixe'] ?? null;
        $pack->unite = $validatedData['unite'] ?? null;
        $pack->prix_unite = $validatedData['prix_unite'] ?? null;
        $pack->unite_max = $validatedData['unite_max'] ?? null;
        $pack->save();

        //return response()->json(dd($validatedData['prestations']));

        $pack->prestations()->attach($validatedData['prestations'][0]);


        return response()->json($pack, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Pack $pack)
    {
        try {
            // $pack = Pack::findOrFail($pack);
            $pack = Pack::find($pack);
            // return new PackResource($pack);
            return response([
                'pack' => $pack
            ], 200);
        } catch (Exception $e) {
            var_dump($e);
            return response()->json(['error' => 'object not found ...'], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePackRequest $request, Pack $pack)
{
    return response()->json($request->all());
    $data = $request->all();


    $validator = Validator::make($data, [
        'nom' => 'required',
        'description' => 'required|string',
        'prestations' => 'required|array',
        'prestations.*' => 'exists:prestations,id',
        'prix_fixe' => 'nullable|numeric',
        'unite' => 'nullable|string',
        'prix_unite' => 'nullable|numeric',
        'unite_max' => 'nullable|numeric'
    ]);

    $validator->after(function ($validator) use ($data) {
        if (is_null($data['prix_fixe']) && (is_null($data['unite']) || is_null($data['prix_unite']) || is_null($data['unite_max']))) {
            $validator->errors()->add('fields', 'If prix_fixe is null, unite, prix_unite, unite_max must not be null.');
        }
    });

    $validatedData = $validator->validate();

    $pack->nom = $validatedData['nom'];
    $pack->description = $validatedData['description'];
    $pack->prix_fixe = $validatedData['prix_fixe'];
    $pack->unite = $validatedData['unite'];
    $pack->prix_unite = $validatedData['prix_unite'];
    $pack->unite_max = $validatedData['unite_max'];

    $pack->save();

    $pack->prestations()->sync($validatedData['prestations']);

    return new PackResource($pack);
}

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pack $pack)
    {
        $pack->delete();

        return response([
            'message' => 'Pack deleted'
        ], 200);
    }
    /*
    public function updatePack(Request $request, $idParam) {
        $pack = Pack::find($idParam);
        $pack->nom = $request->nom;
        $pack->description = $request->description;
        $pack->prix_fixe = $request->prix_fixe;
        $pack->unite = $request->unite;
        $pack->prix_unite = $request->prix_unite;
        $pack->save();

        return new PackResource($pack);
    }
    */
}
