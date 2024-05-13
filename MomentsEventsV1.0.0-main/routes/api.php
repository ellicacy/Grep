<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategorieController;
use App\Http\Controllers\Api\EvenementController;
use App\Http\Controllers\Api\MailController;
use App\Http\Controllers\Api\PackController;
use App\Http\Controllers\Api\PrestationController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\UserSettingsController;

use App\Http\Resources\PrestationResource;
use App\Http\Resources\UserResource;
use App\Models\Categorie;
use App\Models\Evenement;
use App\Models\Prestation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Payrexx\Models\Request\Gateway;
use Payrexx\Payrexx;
use Payrexx\PayrexxException;


use App\Http\Controllers\Api\AvailabilityController;
use App\Http\Controllers\Api\NotificationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// #########################################################################
//                     REQUESTS FOR PUBLIC USERS :
// #########################################################################

// ############################
// LOGIN, LOGINADMIN AND SIGNUP
// ############################
// POST ('/SIGNUP') -> INSCRIPTION
Route::post('/signup', [AuthController::class, 'signup']);
// POST ('/LOGINADMIN') -> CONNEXION ADMIN
Route::post('/loginAdmin', [AuthController::class, 'loginAdmin']);
// POST ('/LOGIN') -> CONNEXION USER
Route::post('/login', [AuthController::class, 'login']);

// CATEGORIES/PRESTATIONS/REVIEWS/PACKS (SEULEMENT GET (index et show))
// CATEGORIES
Route::get('/categories', [CategorieController::class, 'index']);
Route::get('/categories/{category}', [CategorieController::class, 'show']);
// PRESTATIONS
Route::get('/prestations', [PrestationController::class, 'index']);
Route::get('/prestations/{prestation}', [PrestationController::class, 'show']);
// GET ('/SEARCH10BESTSCORE') -> GET 10 PRESTATIONS WITH BEST SCORE
Route::get('/search10bestScore', [PrestationController::class, 'search10bestScore']);

// REVIEWS
Route::get('/reviews', [ReviewController::class, 'index']);
Route::get('/reviews/{review}', [ReviewController::class, 'show']);
// PACKS
#Route::get('/packs', [PackController::class, 'index']);
#Route::get('/packs/{pack}', [PackController::class, 'show']);
// USERS
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{user}', [UserController::class, 'show']);
// EVENTS
// Route::get('/events', [EvenementController::class, 'index']);
// Route::get('/events/{event}', [EvenementController::class, 'show']);

// GET ('/PRESTATAIRES') -> GET ALL PRESTATAIRES FROM DATABASE
Route::get('/prestataires', function () {
    $prestataires = User::where('role', 'prestataire')->get();
    return UserResource::collection($prestataires);
});

// POST ('/PRESTATIONS/{PRESTATION}/CATEGORIE/ADD') -> ATTACH CATEGORIES TO A SPECIFIC PRESTATION
Route::post('/prestations/{prestation}/categorie/add', [PrestationController::class, 'attachCategorie']);
// POST ('/PRESTATIONS/{PRESTATION}/CATEGORIE/REMOVE') -> DETACH CATEGORIES FROM A SPECIFIC PRESTATION
Route::post('/prestations/{prestation}/categorie/remove', [PrestationController::class, 'detachCategorie']);
// POST ('/PRESTATIONS/{PRESTATION}/PACK/ADD') -> ATTACH PACKS TO A SPECIFIC PRESTATION
Route::post('/prestations/{prestation}/pack/add', [PrestationController::class, 'attachPack']);
// POST ('/PRESTATIONS/{PRESTATION}/PACK/REMOVE') -> DETACH PACKS TO A SPECIFIC PRESTATION
Route::post('/prestations/{prestation}/pack/remove', [PrestationController::class, 'detachPack']);


// #########################################################################
//                   END REQUESTS FOR PUBLIC USERS :
// #########################################################################

Route::middleware(['auth:sanctum'])->group(function () {
    // GET ('/USER') -> GET THE USER WITH THE BEARER TOKEN PASSED IN THE REQUEST
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    // POST ('/LOGOUT') -> LOGOUT A USER
    Route::post('/logout', [AuthController::class, 'logout']);
});

// #########################################################################
//                 REQUESTS FOR AUTHENTICATED USERS :
// #########################################################################

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user/settings', [UserSettingsController::class, 'getSettings']);
    Route::post('/user/settings', [UserSettingsController::class, 'updateSettings']);
    Route::post('/user/settings/bank', [UserSettingsController::class, 'updateBankInformations']);
    Route::get('/user/avatar', [UserSettingsController::class, 'getAvatar']);
    Route::post('/user/avatar', [UserSettingsController::class, 'updateAvatar']);
    Route::post('/user/profile', [UserSettingsController::class, 'updateProfile']);
});

// #########################
// REQUESTS FOR ADMIN ONLY :
// #########################
Route::prefix('admin')->middleware(['auth:sanctum', 'isAdmin'])->group(function () {
    // Route::middleware(['auth:sanctum','isAdmin'])->group(function() {
    // Route::get('test', function() {
    //     return response([
    //         'message' => 'ADMIN ACCESS'
    //     ], 200);
    // });
    // APIRESOURCE ('/USERS') -> [INDEX,STORE,SHOW,UPDATE,DESTROY]
    Route::get('/users/actifs', [UserController::class, 'getActiveUsers']);
    Route::get('/users/supprimes', [UserController::class, 'getDeletedUsers']);
    Route::post('/users/activer/{id}', [UserController::class, 'activateUser']);
    Route::post('/users/desactiver/{id}', [UserController::class, 'desactivateUser']);
    Route::post('/users/changerRole/{id}', [UserController::class, 'swapRole']);

    Route::apiResource('/users', UserController::class);

    // APIRESOURCE ('/CATEGORIES') -> [INDEX,STORE,SHOW,UPDATE,DESTROY] (UPDATE ISSUE, USE UPDATECATEGORIE/{IDPARAM} INSTEAD)
    Route::apiResource('/categories', CategorieController::class);
    // APIRESOURCE ('/PRESTATIONS') -> [INDEX,STORE,{{ SHOW }},UPDATE,DESTROY] (UPDATE ISSUE, USE UPDATEPRESTATION/{IDPARAM} INSTEAD)
    Route::apiResource('/prestations', PrestationController::class);
    // APIRESOURCE ('/REVIEWS') -> [INDEX,STORE,SHOW,UPDATE,DESTROY]
    Route::apiResource('/reviews', ReviewController::class);
    // APIRESOURCE ('/PACKS') -> [INDEX,STORE,SHOW,UPDATE,DESTROY] (UPDATE ISSUE, USE UPDATEPACK/{IDPARAM} INSTEAD)
    Route::apiResource('/packs', PackController::class);
    // APIRESOURCE ('/EVENTS') -> [INDEX,STORE,SHOW,UPDATE,DESTROY]
    Route::apiResource('/events', EvenementController::class);
    // POST ('/UPDATECATEGORIE/{IDPARAM}') -> UPDATE A SPECIFIC CATEGORIE
    Route::post('/updateCategorie/{idParam}', [CategorieController::class, 'updateCategorie']);
    // POST ('/UPDATEPRESTATION/{IDPARAM}') -> UPDATE A SPECIFIC PRESTATION
    Route::post('/updatePrestation/{idParam}', [PrestationController::class, 'updatePrestation']);
    // POST ('/UPDATEPACK/{IDPARAM}) -> UPDATE A SPECIFIC PACK
    Route::post('/updatePack/{idParam}', [PackController::class, 'updatePack']);

    // ##############################################################################################################
    // A TRIER
    // ##############################################################################################################
    // GET ('/GETCATEGORIESBYPRESTATION/{IDPRESTA}') -> GET ALL CATEGORIES OF A SPECIFIC PRESTATION BY ITS ID
    Route::get('/getCategoriesByPrestation/{idPresta}', [PrestationController::class, 'getCategoriesByPrestation']);
    // GET ('/GETCATEGORIENOM/{CATID}') -> GET A SPECIFIC CATEGORIE NAME BY ITS ID
    Route::get('/getCategorieNom/{catId}', function (Request $request) {
        $catId = $request->catId;
        $catNom = DB::table('categories')->where('id', $catId)->value('nom');
        return response($catNom, 200);
    });
    // GET ('/CATEGORY') -> GET ALL CATEGORIES OF A SPECIFIC PRESTATION
    Route::get('/category', function (Request $request) {
        return $request->category();
    });
    // GET ('/GETCATEGORIES') -> GET ALL CATEGORIES
    Route::get('/getCategories', function () {
        $cat = DB::table('categories')->get();
        return $cat;
    });
    // GET ('/GETPRESTATION/{IDPARAM}') -> GET A SPECIFIC PRESTATION
    Route::get('/getPrestation/{idParam}', [PrestationController::class, 'getPrestation']);
    // GET ('/DELETE/PRESTATION/{IDPARAM}') -> DELETE A SPECIFIC PRESTATION
    Route::get('/delete/prestation/{idParam}', [PrestationController::class, 'deletePrestation']);
    // GET ('/PRESTATION') -> GET ALL PRESTATIONS FROM A SPECIFIC USER
    Route::get('/prestation', function (Request $request) {
        return $request->prestation();
    });
    // POST ('/ADDPRESTATION') -> STORE A PRESTATION
    Route::post('/addPrestation', [PrestationController::class, 'addPrestation']);
    // GET ('/PRESTATAIRES') -> GET ALL PRESTATAIRES FROM DATABASE
    Route::get('/prestataires', function () {
        $prestataires = User::where('role', 'prestataire')->get();
        return UserResource::collection($prestataires);
    });
    // GET ('/USER/{ID}/GETNAME') -> GET THE NAME OF A SPECIFIC USER BY HIS ID
    Route::get('/user/{id}/getName', function (Request $request) {
        $id = $request->id;
        $nom = DB::table('users')->where('idPersonne', $id)->value('personneNom');
        return response($nom, 201);
    });
    // GET ('/USER/{ID}/GETPRESTATAIRE') -> GET A SPECIFIC PRESTATAIRE BY HIS ID
    Route::get('/user/{id}/getPrestataire', function (Request $request) {
        $id = $request->id;
        $prestataire = DB::table('users')->where('idPersonne', $id)->first();
        return $prestataire;
    });
    // GET ('/USER/{ID}/GETPRESTATIONS') -> GET ALL PRESTATIONS OF A SPECIFIC PRESTATAIRE BY HIS ID
    Route::get('/user/{id}/getPrestations', function (Request $request) {
        $id = $request->id;
        $prestations = DB::table('prestations')->where('id_user', $id)->get();
        return $prestations;
    });
    // GET ('/USER/{ID}/GETPRESTATIONSAVECCATEGORIES') -> GET ALL PRESTATIONS WITH CATEGORIES OF A SPECIFIC PRESTATAIRE BY HIS ID
    Route::get('/user/{id}/getPrestationsAvecCategories', function (Request $request) {
        $id = $request->id;
        $prestations = Prestation::with('categories')->get();
        $res = $prestations->where('id_user', '=', $id)->all();
        return PrestationResource::collection($res);
        // return $prestations;
    });
    // GET ('/CLIENTS') -> GET ALL CLIENTS
    Route::get('/clients', function () {
        $clients = User::get();
        $res = $clients->where('role', '=', 'user')->all();
        return response([
            'clients' => UserResource::collection($res)
        ], 200);
    });
    // GET ('/USER') -> GET THE USER WITH THE BEARER TOKEN PASSED IN THE REQUEST
    Route::get('/userBack', function (Request $request) {
        return $request->user();
    });
    // DELETE ('/CLIENTS/{ID}) -> DELETE A SPECIFIC CLIENT BY HIS ID
    Route::delete('/clients/{id}', function (Request $request) {
        $client = User::findOrFail($request->id);
        $client->delete();
    });
    // GET ('/USER/{ID}') -> GET A SPECIFIC USER (CLIENT/PRESTATAIRE/ADMIN) AND RETURN A RESOURCE
    Route::get('/user/{id}', function (Request $request) {
        $id = $request->id;
        // $user = DB::table('users')->where('idPersonne',$id)->first();
        $user = User::find($id);
        // ->get([
        //     'idPersonne',
        //     'personneNom',
        //     'personnePrenom',
        //     'personneLogin',
        //     'role'
        // ]);
        if ($user) {
            return response(new UserResource($user), 201);
        } else {
            return response([
                'message' => 'No user found ...'
            ], 404);
        }
    });
    // GET ('/CLIENTS/{ID}') -> GET A SPECIFIC CLIENT BY HIS ID
    Route::get('/clients/{id}', function (Request $request) {
        $id = $request->id;
        $clients = User::get();
        $res = $clients->where('role', '=', 'user')->where('idPersonne', '=', $id)->first();
        if ($res) {
            return new UserResource($res);
        } else {
            return response([
                'message' => 'No client found ...'
            ], 404);
        }
    });
    // POST ('/EVENTS/{EVENT}/PRESTATION/ADD') -> ATTACH PRESTATIONS TO A SPECIFIC EVENT
    Route::post('/events/{event}/prestation/add', [EvenementController::class, 'attachPrestation']);
    // POST ('/EVENTS/{EVENT}/PRESTATION/REMOVE') -> DETACH PRESTATIONS TO A SPECIFIC EVENT
    Route::post('/events/{event}/prestation/remove', [EvenementController::class, 'detachPrestation']);
    // ##############################################################################################################
    // FIN A TRIER
    // ##############################################################################################################
    // POST ('/LOGOUT') -> LOGOUT A USER
    Route::post('/logout', [AuthController::class, 'logout']);
});

// ###############################
// REQUESTS FOR PRESTATAIRE ONLY :
// ###############################
Route::middleware(['auth:sanctum', 'isPrestataire'])->group(function () {
    // Route::get('test', function() {
    //     return response([
    //         'message' => 'PRESTATAIRE ACCESS'
    //     ], 200);
    // });

    // POST ('/LOGOUT') -> LOGOUT A USER
    // Route::post('/logout', [AuthController::class, 'logout']);
});

// ##########################
// REQUESTS FOR CLIENT ONLY :
// ##########################
Route::middleware(['auth:sanctum', 'isClient'])->group(function () {
    // Route::get('test', function() {
    //     return response([
    //         'message' => 'CLIENT ACCESS'
    //     ], 200);
    // });

    // POST ('/LOGOUT') -> LOGOUT A USER
    // Route::post('/logout', [AuthController::class, 'logout']);
});

// #########################################################################
//                 END REQUESTS FOR AUTHENTICATED USERS :
// #########################################################################

// ######################
// REQUESTS FOR TESTING :
// ######################
// POST ('/testMail') -> ROUTE DE TEST POUR L'ENVOI D'EMAIL
Route::post('/testMail', [MailController::class, 'sendTestMail']);
// POST ('/testMailSuivi') -> ROUTE DE TEST POUR L'ENVOI D'EMAIL DE SUIVI
Route::post('/testMailSuivi', [MailController::class, 'sendTestMailSuivi']);


// POST ('/TEST') ROUTE DE TEST
Route::post('/test', [PrestationController::class, 'test']);
// GET ('/TEST') -> ROUTE POUR EFFECTUER UN TEST
Route::get('/test', function () {
    $events = Evenement::all();
    $event1 = Evenement::find(1);
    $eventsAvecPresta = Evenement::with('prestations')->get();
    $event1AvecPresta = Evenement::with('prestations')->find(1);
    $prestations = $event1AvecPresta->prestations()->get();
    return response([
        'events' => $events,
        'event1' => $event1,
        'eventsAvecPresta' => $eventsAvecPresta,
        'event1AvecPresta' => $event1AvecPresta,
        'prestations' => $prestations
    ], 200);
});
// POST ('/TESTPMT') -> ROUTE DE TEST POUR LE PAIEMENT
Route::post('/testPmt', function (Request $req) {
    // dd($req->all());
    $data = $req->all();
    // dd($data['panier']);
    // Récupérez le tableau de produits à partir des données reçues
    $panier = $data['panier'];
    $packs = $panier['packPanier'];
    $prixTotal = $panier['total'];
    // foreach ($packs as $pack) {
    //     if ($pack['pack']['unite'] == 'vide') {
    //         $prixTotal += $pack['pack']['prix_fixe'];
    //     } else {
    //         $prixTotal += $pack['pack']['prix_unite'];
    //     }
    // }
    // dd($packs[0]['pack']['prix_fixe']);
    // var_dump($panier);
    // dd($data);
    //$userID = $data['iDpersonne'];
    $userEmail = $data['personneLogin'];
    $userNom = $data['personneNom'];
    $userPrenom = $data['personnePrenom'];
    $userRue = "Avenue des pommes de terres 12";
    // $userRue = $data['personneRue'];
    $userCodePostal = 1217;
    $userVille = "Meyrin";
    // $userCodePostal = strval($data['personneCodePostal']); // conversion en string pour correspondre au format de l'api
    // $userVille = $data['personneVille'];
    //conversion pour coresspondre au format de l'api
    $userNaissance = date("d.m.Y", strtotime($data['personneNaissance']));

    // CREATION D'UN EVENT

    // $table->string('evenementNom');
    // $table->string('evenementDescription');
    // $table->date('evenementDate');
    // $table->string('evenementRue');
    // $table->integer('evenementCP');
    // $table->string('evenementVille');

    // $table->integer('evenementNbrPersonne');
    // $table->time('evenementHeureDebut');
    // $table->time('evenementHeureFin');
    // $table->string('evenementStatus');
    // $table->string('paiementNo');
    // $table->decimal('paiementMontant',2);
    // $table->string('paiementType');
    // $table->string('paiementStatus');

    $event = new Evenement();
    $event->evenementNom = $panier['titreEvenement'];
    $event->evenementDescription = $panier['descriptionEvenement'];
    $event->evenementDate = $panier['dateEvenement'];
    $event->evenementRue = $panier['adresseEvenement'];
    $event->evenementCP = $panier['npaEvenement'];
    $event->evenementVille = $panier['villeEvenement'];

    $event->evenementNbrPersonne = 10;
    $event->evenementHeureDebut = '14:30';
    $event->evenementHeureFin = '18:30';
    $event->evenementStatus = 'à venir';
    $event->paiementNo = 'vide';
    $event->paiementMontant = $panier['total'];
    $event->paiementType = 'carte';
    $event->paiementStatus = $panier['status'] == null ? 'en cours' : $panier['status'];

    // $instanceName is a part of the url where you access your payrexx installation.
    // https://{$instanceName}.payrexx.com
    $instanceName = 'yumytech';
    // $secret is the payrexx secret for the communication between the applications
    // if you think someone got your secret, just regenerate it in the payrexx administration
    $secret = getenv('PAYREXX_API_KEY');
    $payrexx = new Payrexx($instanceName, $secret);
    // $payrexx = new \Payrexx\Payrexx($instanceName, $secret);
    // $gateway = new \Payrexx\Models\Request\Gateway();
    $gateway = new Gateway();
    // amount multiplied by 100
    $gateway->setAmount(2000 * 100);
    // VAT rate percentage (nullable)
    $gateway->setVatRate(7.70);
    //Product SKU
    $gateway->setSku('P01122000');
    // currency ISO code
    $gateway->setCurrency('CHF');
    //success and failed url in case that merchant redirects to payment site instead of using the modal view
    // $gateway->setSuccessRedirectUrl('https://momentsevents.ch/paiement/success');//sucess
    // $gateway->setFailedRedirectUrl('https://momentsevents.ch/paiement/fail');
    // $gateway->setCancelRedirectUrl('https://momentsevents.ch/paiement/cancel');
    $gateway->setSuccessRedirectUrl('http://localhost:3000/paiement/success'); //sucess
    $gateway->setFailedRedirectUrl('http://localhost:3000/paiement/fail');
    $gateway->setCancelRedirectUrl('http://localhost:3000/paiement/cancel');
    // empty array = all available psps
    //$gateway->setPsp([]);
    //$gateway->setPsp(array(4));
    $gateway->setPm(['Mastercard', 'visa', 'google-pay', 'apple-pay', 'american-express']);
    // optional: whether charge payment manually at a later date (type authorization)
    $gateway->setPreAuthorization(false);
    // optional: if you want to do a pre authorization which should be charged on first time
    //$gateway->setChargeOnAuthorization(true);
    // optional: whether charge payment manually at a later date (type reservation)
    $gateway->setReservation(false);
    // optional: reference id of merchant (e. g. order number)
    $gateway->setReferenceId(999999);

    // Tableau `$tableau_produits` à partir des données récoltéés
    $tableau_produits = [];
    foreach ($panier['prestationPanier'] as $produit) {
        $prestaId = $produit['id'];
        // dd($prestaId);
        $packs = $panier['packPanier'];
        $prixPresta = 0;
        $quantitePack = 0;
        $quantitePackUnite = 0;
        foreach ($packs as $p) {
            $pack = $p['pack'];
            $pivot = $pack['pivot'];
            $quantitePackUnite = $p['quantite'];
            $packPivotIdPresta = $pivot['prestation_id'];
            if ($prestaId == $packPivotIdPresta) {
                // idPresta = idPrestaPivot
                if ($pack['unite'] == 'vide') {
                    $prixPresta += $pack['prix_fixe'];
                } else {
                    $prixPresta += $pack['prix_unite'] * $quantitePackUnite;
                }
                // break;
            }
        } // FIN DU FOREACH($packs as $p)

        $tableau_produits[] = [
            'name' => [
                1 => 'Nom du produit en allemand (DE)',
                2 => 'Nom du produit en anglais (EN)',
                3 => $produit['nom'],
                4 => 'Nom du produit en italien (IT)'
            ],
            'description' => [
                1 => 'Description du produit en allemand (DE)',
                2 => 'Description du produit en anglais (EN)',
                3 => $produit['description'],
                4 => 'Description du produit en italien (IT)'
            ],
            'quantity' => 1,
            // 'amount' => $produit['prix_type_facturation'] * 100
            'amount' => $prixPresta * 100
        ];
    } // FIN DU FOREACH($panier['prestationPanier'] as $produit)

    //// optional: parse multiple products
    $gateway->setBasket($tableau_produits);
    // optional: add contact information which should be stored along with payment
    //$gateway->addField($type = 'title', $value = 'mister');
    $gateway->addField($type = 'forename', $value = $userPrenom);
    $gateway->addField($type = 'surname', $value = $userNom);
    //$gateway->addField($type = 'company', $value = 'XXX');
    $gateway->addField($type = 'street', $value = $userRue);
    $gateway->addField($type = 'postcode', $value = $userCodePostal);
    $gateway->addField($type = 'place', $value = $userVille);
    //$gateway->addField($type = 'country', $value = 'AT');
    //$gateway->addField($type = 'phone', $value = '+43123456789');
    $gateway->addField($type = 'email', $value = $userEmail); // Envoi un mail automatique à l'acheteur en cas de payement résussi
    $gateway->addField($type = 'date_of_birth', $value = $userNaissance);
    $gateway->addField($type = 'terms', '');
    $gateway->addField($type = 'privacy_policy', '');
    $gateway->addField($type = 'custom_field_1', $value = '123456789', $name = array(
        1 => 'Champ personnalisé', // (DE)
        2 => 'Champ personnalisé', // (EN)
        3 => 'Champ personnalisé', // Ici on pourrait mettre le titre de l'event ou qqch du style (FR)
        4 => 'Champ personnalisé', // (IT)
    ));
    try {
        $response = $payrexx->create($gateway);
        $event->paiementNo = $response->getId();
        $event->paiementStatus = $response->getStatus();
        $event->save();
        return $response->getLink();
    } catch (PayrexxException $e) {
        print $e->getMessage();
    }
});




// FORMAT DE LA REPONSE RECU DE PAYREXX
// Payrexx\Models\Response\Gateway {#1343 // routes\api.php:487
//     #uuid: null
//     #id: 9769857
//     #amount: 97500
//     #vatRate: "7.7"
//     #sku: null
//     #currency: "CHF"
//     #purpose: null
//     #psp: []
//     #pm: array:5 [
//       0 => "mastercard"
//       1 => "visa"
//       2 => "google-pay"
//       3 => "apple-pay"
//       4 => "american-express"
//     ]
//     #preAuthorization: false
//     #reservation: false
//     #referenceId: "999999"
//     #fields: array:8 [
//       "forename" => array:2 [
//         "active" => false
//         "mandatory" => true
//       ]
//       "surname" => array:2 [
//         "active" => false
//         "mandatory" => true
//       ]
//       "postcode" => array:2 [
//         "active" => false
//         "mandatory" => true
//       ]
//       "email" => array:2 [
//         "active" => false
//         "mandatory" => true
//       ]
//       "date_of_birth" => array:2 [
//         "active" => false
//         "mandatory" => true
//       ]
//       "terms" => array:3 [
//         "active" => true
//         "mandatory" => true
//         "names" => array:1 [
//           "fr" => ""
//         ]
//       ]
//       "privacy_policy" => array:3 [
//         "active" => true
//         "mandatory" => true
//         "names" => array:1 [
//           "fr" => ""
//         ]
//       ]
//       "text" => array:3 [
//         "active" => false
//         "mandatory" => true
//         "names" => array:1 [
//           "fr" => "Champ personnalisé"
//         ]
//       ]
//     ]
//     #concardisOrderId: null
//     #successRedirectUrl: null
//     #failedRedirectUrl: null
//     #cancelRedirectUrl: null
//     #skipResultPage: null
//     #chargeOnAuthorization: null
//     #customerStatementDescriptor: null
//     #validity: null
//     #subscriptionState: false
//     #subscriptionInterval: ""
//     #subscriptionPeriod: ""
//     #subscriptionPeriodMinAmount: ""
//     #subscriptionCancellationInterval: ""
//     #buttonText: null
//     #lookAndFeelProfile: null
//     #successMessage: null
//     #basket: null
//     #qrCodeSessionId: null
//     #returnApp: null
//     #spotlightStatus: null
//     #spotlightOrderDetailsUrl: null
//     #hash: "6aa77ef90ea1fb0c6a055bd2b15d8fd7"
//     #link: "https://yumytech.payrexx.com/?payment=6aa77ef90ea1fb0c6a055bd2b15d8fd7"
//     #status: "waiting"
//     #createdAt: 1683150015
//     #invoices: []
//     #transactionId: null
//     #appLink: null
//   }



// #########################################################################
// MOMENTS EVENTS


Route::middleware(['auth:sanctum', 'isPrestataire'])->group(function () { // Utilisation du middleware de MomentsEvent

});
Route::apiResource('availabilities', AvailabilityController::class);
Route::get('/user/{id}/prestations', [App\Http\Controllers\API\PrestationController::class, 'getPrestationsByUser']);

Route::apiResource('packs', PackController::class);
#Route::get('/packs', [PackController::class, 'index']);
#Route::get('/packs/{pack}', [PackController::class, 'show']);

Route::apiResource('notifications', NotificationController::class)->only(['store', 'destroy', 'read']);
Route::get('/user/{user}/notifications', [NotificationController::class, 'notificationsById']);

