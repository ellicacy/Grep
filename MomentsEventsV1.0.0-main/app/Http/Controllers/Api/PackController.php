<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePackRequest;
use App\Http\Requests\UpdatePackRequest;
use App\Http\Resources\PackResource;
use App\Models\Pack;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Pack $pack)
    {
        try{
            // $pack = Pack::findOrFail($pack);
            $pack = Pack::find($pack);
            // return new PackResource($pack);
            return response([
                'pack' => $pack
            ], 200);
        } catch (Exception $e) {
            var_dump($e);
            return response()->json(['error'=>'object not found ...'],Response::HTTP_NOT_FOUND);
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
        $donnees = $request->validated();
        $pack->update($donnees);
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
}
