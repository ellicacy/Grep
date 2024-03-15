<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Barryvdh\DomPDF\PDF as PDF;

class MailController extends Controller
{
    public function sendTestMail(Request $request)
    {
        $data = $request->validate([
            'user_surname' => 'required',
            'user_name' => 'required',
            'user_email' => 'required',
            //Rajouter ici les variables qu'on a besoins de récupérer (event prix/desc etc)
            'titreEvenement' => 'required',
            'descriptionEvenement' => 'required',
            'dateEvenement' => 'required',
            'adresseEvenement' => 'required',
            'codePostalEvenement' => 'required',
            'villeEvenement' => 'required',
            'totalEvenement' => 'required',
            'idPrestataires' => 'required|array'
        ]);

        
        // dd($request);

        $panier = $request['panier'];
        $data['panier'] = $panier;

        

        $tabPrestataires = [];

        foreach($request['idPrestataires'] as $idPrestataire) {
            $prestataire = User::find($idPrestataire);
            $tabPrestataires[] = $prestataire;
        }

        $data['tabPrestataires'] = $tabPrestataires;

        // dd($data);

        $contentMail = $this->generateMailContent();
        $subject = "Confirmation Sparkling Events";

        // utiliser pdf
        $pdf = app(PDF::class);
        $pdf = $pdf->loadView('emails.pdfConfirmation', $data);

        try {
            Mail::send([], [], function ($message) use ($data, $pdf, $contentMail, $subject) {
                $message->to($data['user_email']);
                $message->subject($subject);
                $message->html($contentMail);
                $message->attachData($pdf->output(), "confirmation commande.pdf");
            });
        
            return response()->json(['message' => 'Mail de test envoyé avec succès.'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => "Erreur lors de l'envoi du mail de test.", 'error' => $e->getMessage()], 500);
        }
    }

    function generateMailContent() {
        $htmlContent = "
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    color: #333;
                    line-height: 1.4;
                    font-size: 0.9em;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 100%;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    background-color: #2FAF94;
                    padding: 20px;
                    text-align: center;
                    margin-bottom: 30px;
                }
                .header h1 {
                    margin: 0;
                    color: #fff;
                }
                .thank-you {
                    margin-bottom: 20px;
                }
                .footer {
                    font-size: 0.8em;
                    text-align: center;
                    margin-top: 30px;
                }
                a {
                    color: #2FAF94;
                    text-decoration: none;
                }
                a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class=\"container\">
                <div class=\"header\">
                    <h1>Sparkling Events</h1>
                </div>
                <div class=\"thank-you\">
                    <p>Bonjour,</p>
                    <p>Merci pour votre achat sur notre plateforme Sparkling Events. Vous trouverez les détails de la commande en pièce jointe.</p>
                </div>
                <div class=\"footer\">
                    <p>Visitez notre site web pour plus d'informations : <a href=\"https://keums.ch\" target=\"_blank\">sparkling-events.ch</a></p>
                </div>
            </div>
        </body>
        </html>
        ";
    
        return $htmlContent;
    }
    

    public function sendTestMailSuivi(Request $request)
    {
    $data = $request->validate([
        'email' => 'required|email',
        'subject' => 'required',
        'content' => 'required',
        'user_id' => 'required',
        'user_surname' => 'required',
        'user_name' => 'required',
        'user_email' => 'required',
        //rajouter ici les variables manquantes
        // exemple nom des prestataires associé à l'event
    ]);

    // Rajouter PDF ici si nécessaire

    try {
        Mail::send([], [], function ($message) use ($data) {
            $message->to($data['email']);
            $message->subject($data['subject']);
            $message->html($data['content']);
            // Rajouter PDF (pièce jointe) ici si nécessaire
        });
    
        return response()->json(['message' => 'Mail de suivi envoyé avec succès.'], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => "Erreur lors de l'envoi du mail de suivi.", 'error' => $e->getMessage()], 500);
        }
    }
}



