<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategorieResource;
use App\Models\Categorie;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CategorieResource::collection(
            Categorie::query()->orderBy('id', 'desc')->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $cat = Categorie::create($request->all());
        $cat = new Categorie();
        $lastId = Categorie::max('id');
        $cat->id = $lastId+1;
        // dd($cat);
        $cat->nom = $request->nom;
        $cat->score = $request->score;
        $images = array();
        // Storage::makeDirectory('upload/category/'.$cat->name);
        if ($files = $request->file('file')) {
            foreach ($files as $file) {
                $image_name = md5(rand(1000,10000));
                $ext = strtolower($file->getClientOriginalExtension());
                $image_full_name = $image_name.'.'.$ext;
                // $upload_path = 'C://Users/41792/Desktop/Sites_Laravel/l-r-fullstack/react/public/upload/category/'.$cat->name.'/';
                $upload_path = 'category/'.$cat->id.'/';
                $image_url = $upload_path.$image_full_name;
                $file->move($upload_path,$image_full_name);
                $images[] = $image_url;
            }
            $image_str = implode('|',$images);
            $cat->image = $image_str;
        }
        $cat->created_at = $request->created_at;
        // $cat->updated_at = $request->updated_at;
        $cat -> save();

        // return response(new CategoryResource($cat), 201);
        return response([
            'message'=>'CategorieNew created !',
            'categorie'=>$cat
        ],201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Categorie $category)
    {
        // return Categorie::with('prestations')->find($category);
        return response([
            'category' => Categorie::find($category)->first()
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // #########################################################################
    // NE FONCTIONNE PAS (REQUEST ERREUR) 
    // ALTERNATIVE A CE PROBLEME : 
    // APPEL POST => updateCategorie(Request $request, $idParam) un peu plus bas
    // #########################################################################
    // public function update(Request $request, $category)
    // {
    //     $cat = Categorie::find($category)->first();
    //     $old_name = $cat->nom;
    //     // dd($old_name);
    //     dd($request);
    //     $cat->nom = $request->nom;
    //     // $cat->description = $request->description;
    //     $image_path = 'category/'.$old_name;
    //     // $image_path = 'C://Users/41792/Desktop/Sites_Laravel/l-r-fullstack/react/public/upload/category/'.$old_name;
    //     // $new_image_path = 'C://Users/41792/Desktop/Sites_Laravel/l-r-fullstack/react/public/upload/category/'.$cat->nom;
    //     // if ($old_name != $cat->nom) {
    //     //     rmdir($image_path);
    //     // }
    //     $images = array();
    //     if ($files = $request->file('file')) {
    //         $filess = $cat->image;
    //         $list = explode('|', $filess);
    //         foreach ($list as $file) {
    //             @unlink($file);
    //         }
    //         foreach ($files as $file) {
    //             $image_name = md5(rand(1000,10000));
    //             $ext = strtolower($file->getClientOriginalExtension());
    //             $image_full_name = $image_name.'.'.$ext;
    //             // $upload_path = 'C://Users/41792/Desktop/Sites_Laravel/l-r-fullstack/react/public/upload/category/'.$cat->name.'/';
    //             $upload_path = 'category/'.$cat->id.'/';
    //             $image_url = $upload_path.$image_full_name;
    //             $file->move($upload_path,$image_full_name);
    //             $images[] = $image_url;
    //         }
    //         $image_str = implode('|',$images);
    //         $cat->image = $image_str;
    //     }
    //     $cat->updated_at = $request->updated_at;
    //     $cat->save();

    //     // return new CategorieResource($cat);
    // }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($category)
    {        
        // $cat = Categorie::find($category);
        // $cat->first()->delete();
        // return response([
        //     'message' => 'catégorie supprimée ainsi que ses relations avec les prestations !'
        // ], 200);
        $cat = Categorie::findOrFail($category);
        // dd($cat);
        $image_path = public_path('category/'.$cat->id);
        // dd($image_path);
        $files = $cat->image;
        $list = explode('|', $files);
        foreach ($list as $file) {
            @unlink($file);
        }
        rmdir($image_path);
        $cat->delete();
    }

    public function search(Request $request, $id) {
        // return new CategorieNewResource(CategorieNew::find($id));
        $categories = Categorie::with('prestations')->get();
        // les prestations de la catégorie en questions
        $cat = Categorie::find($id)->prestations()->get();
        // $user->posts()->where('active', 1)->get();
        return $cat;
    }

    public function searchByName(Request $request, $name) {
        // les prestations de la catégorie en questions
        $cat = Categorie::with('prestations')->where('nom','like','%'.$name.'%')->get();
        // $cat = CategorieNew::where('nom','like','%'.$name.'%')->get();
        // $user->posts()->where('active', 1)->get();
        return $cat;
    }

    public function addCategory(Request $request) {
        $cat = new Categorie();
        $cat->id = $request->id;
        // $lastId = Category::max('id') + 1;
        // Category::query()->truncate();
        // dd('Table tronquée :D');
        $cat->nom = $request->nom;
        $cat->score = $request->score;
        // $cat->description = $request->description;
        $images = array();
        // Storage::makeDirectory('upload/category/'.$cat->name);
        if ($files = $request->file('file')) {
            foreach ($files as $file) {
                $image_name = md5(rand(1000,10000));
                $ext = strtolower($file->getClientOriginalExtension());
                $image_full_name = $image_name.'.'.$ext;
                // $upload_path = 'C://Users/41792/Desktop/Sites_Laravel/l-r-fullstack/react/public/upload/category/'.$cat->name.'/';
                $upload_path = 'category/'.$cat->id.'/';
                $image_url = $upload_path.$image_full_name;
                $file->move($upload_path,$image_full_name);
                $images[] = $image_url;
            }
            $image_str = implode('|',$images);
            $cat->image = $image_str;
        }
        $cat->created_at = $request->created_at;
        // $cat->updated_at = $request->updated_at;
        $cat -> save();
    }

    public function updateCategorie(Request $request, $idParam) {
        $cat = Categorie::find($idParam);
        // dd($request);
        $cat->nom = $request->nom;
        $image_path = public_path('category/'.$cat->id);

        $images = array();
        // dd($request->file('file'));
        if ($files = $request->file('file')) {
            $filess = $cat->image;
            $list = explode('|', $filess);
            foreach ($list as $file) {
                @unlink($file);
            }
            foreach ($files as $file) {
                $image_name = md5(rand(1000,10000));
                $ext = strtolower($file->getClientOriginalExtension());
                $image_full_name = $image_name.'.'.$ext;
                // $upload_path = 'C://Users/41792/Desktop/Sites_Laravel/l-r-fullstack/react/public/upload/category/'.$cat->name.'/';
                $upload_path = 'category/'.$cat->id.'/';
                $image_url = $upload_path.$image_full_name;
                $file->move($upload_path,$image_full_name);
                $images[] = $image_url;
            }
            $image_str = implode('|',$images);
            $cat->image = $image_str;    
        }
        
        $cat->updated_at = $request->updated_at;
        $cat->save();

        return new CategorieResource($cat);
    }

    public function deleteCategory($id) {
        $cat = Categorie::findOrFail($id);
        // dd($cat);
        $image_path = public_path('category/'.$cat->nom);
        // dd($image_path);
        $files = $cat->image;
        $list = explode('|', $files);
        foreach ($list as $file) {
            @unlink($file);
        }
        rmdir($image_path);
        $cat->delete();
    }

}
