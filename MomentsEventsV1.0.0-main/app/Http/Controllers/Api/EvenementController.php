<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Http\Resources\EvenementResource;
use App\Models\Evenement;
use Illuminate\Http\Request;

class EvenementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // LA REPONSE EST DATA.DATA
        // return EvenementResource::collection(
        //     // Evenement::query()->orderBy('id','desc')->get()
        //     Evenement::with('prestations')->get()
        // );
        // LA REPONSE EST DATA
        return Evenement::with('prestations')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreEventRequest $request)
    {
        $donnees = $request->validated();
        $event = Evenement::create($donnees);
        return response(new EvenementResource($event), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Evenement $event)
    {
        return new EvenementResource($event);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateEventRequest $request, Evenement $event)
    {
        $donnees = $request->validated();
        $event->update($donnees);
        return new EvenementResource($event);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Evenement $event)
    {
        $event->delete();

        return response([
            'message' => 'Review deleted'
        ], 200);
    }

    public function attachPrestation(Request $request, $event) {
        // $evenement = Evenement::with('prestations')->get();
        // $evenement = Evenement::with('prestations')->find($event)->prestations()->get();
        // $presta = $evenement->prestations();
        // $presta = $evenement->prestations;
        // $evenement = Evenement::with('prestations')->where('id','=',$event)->get();
        
        // $presta = $evenement->first()->prestations();
        // $prestations = $evenement->prestations();
        foreach ($request->prestation as $id) {
            Evenement::with('prestations')->find($event)->prestations()->attach($id);
        }
        // $presta = PrestationNew::with('categories')->find($prestation);
        
        return response([
            'message'=>'Prestations attachees'
        ], 201);
    }

    public function detachPrestation(Request $request, $event) {
        // Evenement::find($event)->get();
        foreach ($request->prestation as $id) {
            Evenement::with('prestations')->find($event)->prestations()->detach($id);
        }
        
        return response([
            'message'=>'Prestations détachées'
        ], 201);
    }

}
