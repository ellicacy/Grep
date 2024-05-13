<!DOCTYPE html>
<html>
<head>
    <title>Confirmation de votre payaement - Sparkling Events</title>
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
    .order-summary {
        margin-bottom: 20px;
    }
    .order-summary h2 {
        margin-bottom: 10px;
    }
    .item {
        background-color: #f2f2f2;
        padding: 10px;
        margin-bottom: 15px;
        border-radius: 5px;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24);
    }
    .item h3 {
        margin-top: 0;
        margin-bottom: 8px;
        color: #fff;
        font-weight: bold;
        background-color: #277A68;
        display: inline-block;
        padding: 4px 8px;
        border-radius: 4px;
    }
    .contact {
        margin-top: 5px;
        font-weight: bold;
        color: #277A68;
        margin-bottom: 5px;
    }
    .contact-details {
        display: flex;
        flex-direction: column;
        gap: 1px;
        line-height: 0.01; /* Valeur à changer pour ajuster l'espacement entre les éléments */
    }
    .total {
        font-weight: bold;
        font-size: 1.1em;
        background-color: #2FAF94;
        display: inline-block;
        padding: 4px 8px;
        border-radius: 4px;
        color: #fff;
        margin-top: 10px;
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
    <div class="container">
        <div class="header">
            <h1>Sparkling Events</h1>
        </div>
        <div class="thank-you">
            <p>Bonjour {{ $user_name }}, merci d'avoir choisi notre plateforme Sparkling Events pour organiser votre événement. Nous sommes ravis de vous aider à rendre cette journée spéciale et inoubliable. Voici le résumé de votre commande :</p>
        </div>
        <div class="order-summary">
            <h2>Résumé de votre commande</h2>
            <h3>Événement: {{ $titreEvenement }}</h3>
            <h4>Lieux: {{ $adresseEvenement }}, {{ $codePostalEvenement }} {{ $villeEvenement   }} </h4>
            <h4>Date: {{ $dateEvenement }}</h4>
            <!-- boucle foreach qui va afficher un div pour chaque prestation -->
            @foreach($panier['packPrestation'] as $prestation) 
            <div class="item">
                <h3>Titre : {{ $prestation['nom'] }} </h3>
                @foreach ($tabPrestataires as $prestataire)
                @if ($prestataire['idPersonne'] == $prestation['id_user'])
                <p>Prestataire: {{ $prestataire['personneNom']}}</p> <!-- à remplacer avec le pseudo du prestataire -->
                <p>Prix: CHF XXX</p> <!-- à remplacer avec le prix de la prestation -->
                <p class="contact">Contact:</p>
                <div class="contact-details">
                    {{-- TODO ADD FIELD TELEPHONE IN USER MIGRATION --}}
                    <p>• Téléphone: </p>
                    <p>• Email: {{ $prestataire['personneLogin']}} </p>
                </div>
                @endif
                @endforeach
            </div>
            @endforeach
            <div class="total">Total:{{ $panier['total'] }} CHF</div>
        </div>
        <div class="footer">
            <p>En procédant à cette réservation, vous acceptez nos <a href="https://keums.ch/" target="_blank">Conditions Générales</a>.</p>
            <p>Visitez notre site web pour plus d'informations : <a href="https://keums.ch" target="_blank">sparkling-events.ch</a></p>
        </div>
    </div>
</body>
</html>