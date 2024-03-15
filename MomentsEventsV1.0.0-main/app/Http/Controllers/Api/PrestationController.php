<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Prestation;
use App\Http\Requests\StorePrestationRequest;
use App\Http\Requests\UpdatePrestationRequest;
use App\Http\Resources\PrestationResource;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Intervention\Image\Facades\Image;

class PrestationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        // return PrestationResource::collection(
        //     Prestation::query()->orderBy('id','desc')->paginate()
        // );

        return Prestation::with('categories','reviews','packs')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorePrestationRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePrestationRequest $request)
    {
        $data = $request->validated();
        $data['id_user'] = $request->userId;
        $data['contrainte'] = $request->contraintes;
        $data['type_facturation'] = $request->typeFacturation;
        $data['prix_type_facturation'] = $request->prixFacturation;
        $data['duree'] = $request->duree;
        $data['personne_min'] = $request->nbPersMin;
        $data['personne_max'] = $request->nbPersMax;
        $data['heure_min'] = $request->heureMin;
        $data['heure_max'] = $request->heureMax;
        $data['created_at'] = $request->createdAt;
        $lastId = Prestation::max('id');
        $images = array();
        // dd($request->file('file'));
        if ($files = $request->file('file')) {
            foreach ($files as $file) {
                $image_name =md5(rand(1000,10000));
                $ext = strtolower($file->getClientOriginalExtension());
                $image_full_name = $image_name.'.'.$ext;
                $upload_path = 'prestations/'.($lastId+1).'-'.$data['id_user'].'/';
                $image_url = $upload_path.$image_full_name;
                $file->move($upload_path,$image_full_name);
                $images[] = $image_url;
            }
            $image_str = implode('|',$images);
            $data['photo'] = $image_str;
        }

        // dd($data);
        // $data['description'] = $request->description;

        // var_dump($request->catId);

        $prestation = Prestation::create($data);

        return response(new PrestationResource($prestation), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Prestation  $prestation
     * @return \Illuminate\Http\Response
     */
    public function show(Prestation $prestation)
    {
        $prestation = Prestation::find($prestation)->first();
        // dd($prestation);        
        if (!$prestation) {
            return response([
                'message' => 'No prestation with id ('.$prestation->id.') found ...'
            ], 404);
        } else {
            return new PrestationResource($prestation);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePrestationRequest  $request
     * @param  \App\Models\Prestation  $prestation
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePrestationRequest $request, Prestation $prestation)
    {
        $prestation = Prestation::find($prestation);
        $prestation->nom = $request->nom;
        $prestation->description = $request->description;
        $images = array();
        if ($files = $request->file('file')) {
            $filess = $prestation->photo;
            $list = explode('|', $filess);
            foreach ($list as $file) {
                @unlink($file);
            }
            foreach ($files as $file) {
                $image_name = md5(rand(1000,10000));
                $ext = strtolower($file->getClientOriginalExtension());
                $image_full_name = $image_name.'.'.$ext;
                // $upload_path = 'C://Users/41792/Desktop/Sites_Laravel/l-r-fullstack/react/public/upload/category/'.$cat->name.'/';
                $upload_path = 'prestations/'.$prestation->id.'-'.$prestation->id_user.'/';
                $image_url = $upload_path.$image_full_name;
                $file->move($upload_path,$image_full_name);
                $images[] = $image_url;
            }
            $image_str = implode('|',$images);
            $prestation->photo = $image_str;
        }
        $prestation->contrainte = $request->contraintes;
        $prestation->type_facturation = $request->typeFacturation;
        $prestation->prix_type_facturation = $request->prixFacturation;
        $prestation->duree = $request->duree;
        $prestation->personne_min = $request->nbPersMin;
        $prestation->personne_max = $request->nbPersMax;
        $prestation->heure_min = $request->heureMin;
        $prestation->heure_max = $request->heureMax;
        $prestation->updated_at = $request->updatedAt;
        $prestation->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Prestation  $prestation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Prestation $prestation)
    {
        $prestation = Prestation::find($prestation)->first();
        // dd($prestation);
        // $image_path = 'C://Users/41792/Desktop/Sites_Laravel/l-r-fullstack/react/public/upload/';
        $image_path = public_path('prestations/'.$prestation->id.'-'.$prestation->id_user);
        $files = $prestation->photo;
        $list = explode('|', $files);
        foreach ($list as $file) {
            @unlink($file);
        }
        rmdir($image_path);

        // TODO -> DELETE PRESTATION FROM TABLE CATEGORIE_PRESTATION WITH THE ID OF THE PRESTATION
        $prestaId = $prestation->id;

        DB::table('categorie_prestation')->where('prestation_id', $prestaId)->delete();

        $prestation->delete();
    }

    public function search10bestScore(Request $request) {
        // retourner les 10 prestations les mieux notées
        // $reviews = PrestationNew::find(1)->reviews()->get();
        $reviews = Review::orderBy('note','desc')->take(10)->get();
        $tabPrestaId = [];
        foreach ($reviews as $review) {
            if (!in_array($review->id_prestation, $tabPrestaId)) {
                $tabPrestaId[] = $review->id_prestation;
            }
        }
        $presta = Prestation::find($tabPrestaId);
        // $tenBest = $reviews->
        // return $reviews;
        return response([
            'reviews' => $reviews,
            'tableau' => $tabPrestaId,
            'prestations' => $presta
        ], 200);
        // $prestations = PrestationNew::where('score','>',3)->get();
        // return $prestations;
    }

    public function attachCategorie(Request $request, $prestation) {

        // dd($request);
        foreach ($request->cat as $id) {
            Prestation::with('categories')->find($prestation)->categories()->attach($id);
        }
        // $presta = PrestationNew::with('categories')->find($prestation);
        
        return response([
            'message'=>'Categories attachees'
        ], 201);
    }

    public function detachCategorie(Request $request, $prestation) {
        foreach ($request->cat as $id) {
            Prestation::with('categories')->find($prestation)->categories()->detach($id);
        }

        return response([
            'message'=>'Categories detachees'
        ], 201);
    }

    public function attachPack(Request $request, $prestation) {

        // dd($request);
        foreach ($request->pack as $id) {
            Prestation::with('packs')->find($prestation)->packs()->attach($id);
        }
        // $presta = PrestationNew::with('categories')->find($prestation);
        
        return response([
            'message'=>'Packs attachees'
        ], 201);
    }

    public function detachPack(Request $request, $prestation) {
        foreach ($request->pack as $id) {
            Prestation::with('packs')->find($prestation)->packs()->detach($id);
        }

        return response([
            'message'=>'Categories detachees'
        ], 201);
    }

    // add prestation and attach categories to it
    public function addPrestation(Request $request) {
        $prestation = new Prestation();
        $lastId = Prestation::max('id');
        $prestation->id_user = $request->userId;
        $prestation->nom = $request->nom;
        $prestation->description = $request->description;
        $images = array();
        // $totalSize = 0;
        // dd($prestation);
        if ($files = $request->file('file')) {
            foreach ($files as $file) {
                // dd($file->getSize());
                var_dump($file);
                $image_name =md5(rand(1000,10000));
                // VERIFICATION DE LA TAILLE DU FICHIER (fichier doit être > 2mo)
                if ($file->getSize() > 2000000) {
                    continue;
                }
                $ext = strtolower($file->getClientOriginalExtension());
                // dd($ext);
                // VERIFICATION DU FORMAT DU FICHIER (fichiers acceptés : 'jpg,jpeg,png,gif')
                if(!in_array($ext, ['jpg','jpeg','png','gif'])) {
                    continue;
                }
                // VERIFICATION DE LA TAILLE TOTALE (MAXIMUM 5MO)
                // if (($totalSize + $file->getSize()) > 5000000) {
                //     break;
                // }
                $image_full_name = $image_name.'.'.$ext;
                $upload_path = 'prestations/'.($lastId+1).'-'.$prestation->id_user.'/';
                $image_url = $upload_path.$image_full_name;
                $file->move($upload_path,$image_full_name);
                $images[] = $image_url;
                // $totalSize += $file->getSize();
            }
            $image_str = implode('|',$images);
            $prestation->photo = $image_str;
        }
        // dd($prestation);
        $prestation->contrainte = $request->contraintes;
        $prestation->type_facturation = $request->typeFacturation;
        $prestation->prix_type_facturation = $request->prixFacturation;
        $prestation->duree = $request->duree;
        $prestation->personne_min = $request->nbPersMin;
        $prestation->personne_max = $request->nbPersMax;
        $prestation->heure_min = $request->heureMin;
        $prestation->heure_max = $request->heureMax;
        $prestation->created_at = $request->createdAt;
        $catTab = explode(',',$request->catId);
        // dd($prestation);
        $prestation->save();
        Prestation::with('categories')->find($prestation->id)->categories()->attach($catTab);
        return response()->json([
            'prestation' => $prestation
        ], 201);
    }

    public function deletePrestation($id) {
        $prestation = Prestation::findOrFail($id);
        $image_path = 'prestations/'.$prestation->id.'-'.$prestation->id_user;
        $files = $prestation->photo;
        $list = explode('|', $files);
        foreach ($list as $file) {
            @unlink($file);
        }
        rmdir($image_path);
        $prestation->delete();
    }

    public function getPrestation($idParam) {
        $prestation = Prestation::find($idParam);
        return response()->json([
            'prestation'=>$prestation
        ],200);
    }

    public function updatePrestation(Request $request, $idParam) {
        $prestation = Prestation::find($idParam);
        $prestation->nom = $request->nom;
        $prestation->description = $request->description;
        $images = array();
        if ($files = $request->file('file')) {
            $filess = $prestation->photo;
            $list = explode('|', $filess);
            foreach ($list as $file) {
                @unlink($file);
            }
            foreach ($files as $file) {
                $image_name = md5(rand(1000,10000));
                $ext = strtolower($file->getClientOriginalExtension());
                $image_full_name = $image_name.'.'.$ext;
                // $upload_path = 'C://Users/41792/Desktop/Sites_Laravel/l-r-fullstack/react/public/upload/category/'.$cat->name.'/';
                $upload_path = 'prestations/'.$prestation->id.'-'.$prestation->id_user.'/';
                $image_url = $upload_path.$image_full_name;
                $file->move($upload_path,$image_full_name);
                $images[] = $image_url;
            }
            $image_str = implode('|',$images);
            $prestation->photo = $image_str;
        }
        $prestation->contrainte = $request->contraintes;
        $prestation->type_facturation = $request->typeFacturation;
        $prestation->prix_type_facturation = $request->prixFacturation;
        $prestation->duree = $request->duree;
        $prestation->personne_min = $request->nbPersMin;
        $prestation->personne_max = $request->nbPersMax;
        $prestation->heure_min = $request->heureMin;
        $prestation->heure_max = $request->heureMax;
        $prestation->updated_at = $request->updatedAt;
        // ON ENLEVE LES ANCIENNES RELATIONS SUR LES CATEGORIES
        $catTabOld = $prestation->categories()->get();
        $oldCatTab = [];
        foreach ($catTabOld as $cat) {
            $oldCatTab[] = $cat->id;
        }
        Prestation::with('categories')->find($prestation->id)->categories()->detach($oldCatTab);
        // ON RAJOUTE LES RELATIONS SUR LES CATEGORIES
        $catTab = explode(',',$request->catId);
        $prestation->save();
        Prestation::with('categories')->find($prestation->id)->categories()->attach($catTab);
    }

    public function getCategoriesByPrestation($idPresta) {
        $prestation = Prestation::with('categories')->where('id',$idPresta)->get();
        // $prestation = Prestation::all();
        // dd($prestation);
        if ($prestation[0]) {
            $categories = $prestation[0]->categories;
            // dd($categories);
            $tabNomCat = [];
            foreach($categories as $cat) {
                $tabNomCat[] = $cat->nom;
            }
        } else {
            return response([
                'message' => 'Pas de prestations ...'
            ], 404);
        }
        // dd($prestation);

        return response([
            'categories'=> $categories,
            'nomCategories'=> $tabNomCat
        ], 200);
        // return response([
        //     'prestation'=> $prestation,
        // ], 200);
    }
}
