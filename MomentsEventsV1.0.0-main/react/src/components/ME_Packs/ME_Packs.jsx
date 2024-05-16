import React, {useState, useEffect} from "react";
import axiosClient from "../../axios-client";

import "../../index.css";
const ME_CreatePack = () => {
    
    const [packs, setPacks] = useState([])
    const [prestations, setPrestations] = useState([])
    const user = JSON.parse(localStorage.getItem("USER"));
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [packsPerPage] = useState(5);

    const indexOfLastPack = currentPage * packsPerPage;
    const indexOfFirstPack = indexOfLastPack - packsPerPage;
    const currentPacks = packs.slice(indexOfFirstPack, indexOfLastPack);

    const handleClick = () => {
        setShowForm(true);
    };
    
    useEffect (() => {
        fetchPacks();
    }, [currentPage]);
    
    const fetchPacks = async () => {
        
        setLoading(true);
        try {
            const prestationResponse = await axiosClient.get('/prestations');
            const prestationsFiltre = prestationResponse.data.filter(prestation => prestation.id_user === user.idPersonne);
            console.log('Prestations récupérées avec succès :', prestationsFiltre);
            setPrestations(prestationsFiltre);
        } catch (error) {
            console.error('Erreur lors de la récupération des prestations :', error);
        }


        console.log('Récupération des packs...');
        try {
            const startIndex = (currentPage - 1) * packsPerPage;
            const endIndex = startIndex + packsPerPage;
            const packsResponse = await axiosClient.get('/packs?startIndex=${startIndex}&endIndex=${endIndex}');
            console.log('Packs récupérés avec succès :', packsResponse);
            
            // Filtrer les packs pour ne garder que ceux qui correspondent aux prestations de l'utilisateur
            const packsFiltres = packsResponse.data.filter(pack =>
                pack.prestations.some(prestationPack =>
                    prestations.map(prestationUser => prestationUser.id).includes(prestationPack.id)
                )
            );
    
            console.log('Packs filtrés :', packsFiltres);
            setPacks(packsFiltres);
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des packs :', error);
            setLoading(false);
        }
    }

    const handleButtonClick = () => {
        fetchPacks();
    };

    const handleDeletePack = async (packId) => {
        try {
            await axiosClient.delete(`/packs/${packId}`);
            setPacks(packs.filter(pack => pack.id !== packId));
        } catch (error) {
            console.error('Erreur lors de la suppression du pack :', error);
        }
    };
    
    const totalPages = Math.ceil(packs.length / packsPerPage);

    // Gestion de la navigation des pages
    const nextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const prevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const renderPaginationButtons = () => {
        return (
            <div>
                <button 
                    onClick={prevPage} 
                    disabled={currentPage === 1} // Désactive le bouton "Précédent" sur la première page
                    className="pagination-button"
                >
                    Précédent
                </button>
                <button 
                    onClick={nextPage} 
                    disabled={currentPage === totalPages} // Désactive le bouton "Suivant" sur la dernière page
                    className="pagination-button"
                >
                    Suivant
                </button>
            </div>
        );
    };


    return (
        <div>
        <h1>Liste des Packs</h1>
        {loading && <p>Chargement en cours...</p>}
        
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
                    {currentPacks.map((pack, index) => (
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
                            <button  className="buttonSupprimer" onClick={() => handleDeletePack(pack.id)}>Supprimer</button>
                        </tr>
                    ))}
                </tbody>
            </table>

            
        )}

        {packs.length > 0 && (
            <div>
                {/* Affichage du numéro de page */}
                <p>Page {currentPage} sur {totalPages}</p>

                {/* Boutons de pagination */}
                {renderPaginationButtons()}
            </div>
        )}


        {!showForm && packs.length === 0 && (
            <button className="button" onClick={handleButtonClick}>Ma liste</button>
        )}
        
    </div>
    );
}

export default ME_CreatePack;