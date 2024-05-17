import React, {useState, useEffect} from "react";
import axiosClient from "../../axios-client";

import "../../index.css";
const ME_AfficherPackClient = (prestationActuelle) => {
    
    const [packs, setPacks] = useState([])
    const [prestations, setPrestations] = useState([])
    const user = JSON.parse(localStorage.getItem("USER"));
    const [showForm, setShowForm] = useState(false);

    const handleClick = () => {
        setShowForm(true);
    };
    
    useEffect (() => {
        fetchPacks();
    }, []);
    
    const fetchPacks = async () => {
        console.log('recuperetation des prestations');
        try {
            const prestationResponse = await axiosClient.get('/prestations');
            
            const prestationsFiltre = prestationResponse.data.filter(prestation => prestation.id_user === user.idPersonne);
            console.log('Prestations récupérées avec succès :', prestationsFiltre);
            setPrestations(prestationsFiltre);
            prestationActuelle = prestationsFiltre;
            console.log('props.prestations :', prestationActuelle);
            setPrestations(prestationsFiltre);
        } catch (error) {
            console.error('Erreur lors de la récupération des prestations :', error);
        }


        console.log('Récupération des packs...');
        try {
            const packsResponse = await axiosClient.get('/packs');
            console.log('Packs récupérés avec succès :', packsResponse);
            
            // Filtrer les packs pour ne garder que ceux qui correspondent aux prestations de l'utilisateur
            const packsFiltres = packsResponse.data.filter(pack =>
                pack.prestations.some(prestationPack =>
                    prestations.map(prestationUser => prestationUser.id).includes(prestationPack.id)
                )
            );
    
            console.log('Packs filtrés :', packsFiltres);
            setPacks(packsFiltres);
        } catch (error) {
            console.error('Erreur lors de la récupération des packs :', error);
        }
    }

    const handleButtonClick = () => {
        fetchPacks();
    };

    return (
        <div>
        <h1>Liste des Packs</h1>
       
        {packs.length > 0 && (
            <table >
                <thead>
                    <tr className="wrap-text">
                        <th className="text-center">Prestation</th>
                        <th className="text-center">Nom</th>
                        <th className="text-center">Description</th>
                        <th className="text-center">Prix Fixe (CHF)</th>
                        <th className="text-center">Prix Unitaire (CHF)</th>
                        <th className="text-center">Unité</th>
                        <th className="text-center">Unité Max</th>
                    </tr>
                </thead>
                <tbody>
                    {packs.map((pack, index) => (
                        <tr className="wrap-text" key={index}>
                            <td className="text-center">{pack.prestations.map(prestation => prestation.nom).join(", ")}</td>
                            <td className="text-center">{pack.nom}</td>
                            <td className="text-center" style={{ maxWidth: '200px', wordWrap: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}>
                                {pack.description}
                            </td>
                            <td className="text-center">{pack.prix_fixe ? pack.prix_fixe + " CHF" : "-"}</td>
                            <td className="text-center">{pack.prix_unite ? pack.prix_unite + " CHF" : "-"}</td>
                            <td className="text-center">{pack.unite || "-"}</td>
                            <td className="text-center">{pack.unite_max || "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}

        <button className="button" onClick={handleButtonClick}>Afficher liste</button>
        
    </div>
    );
}

export default ME_AfficherPackClient;