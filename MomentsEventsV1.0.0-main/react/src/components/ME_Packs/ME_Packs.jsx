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
    const [editIndex, setEditIndex] = useState(null);

    const handleClick = () => {
        setShowForm(true);
    };
    
    useEffect (() => {
        fetchPacks();
    }, [currentPage]);
    
    const fetchPacks = async () => {
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

    const handlePackChange = (e, index) => {
        const { name, value } = e.target;
        const updatedPacks = [...currentPacks];
        updatedPacks[index] = {
            ...updatedPacks[index],
            [name]: value
        };
        setPacks(updatedPacks);
    };


    const handleClickModifier = ( index) => {
        setEditIndex(index);
    };

    const handleSubmitEdit = async (e, index) => {
        e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire

    // Récupérer le pack modifié à partir de currentPacks
    const editedPack = currentPacks[index];

    try {
        // Effectuer une requête HTTP pour mettre à jour le pack dans la base de données
        await axiosClient.updatePack(`/packs/${editedPack.id}`, editedPack);
        // Mettre à jour la liste currentPacks avec les données mises à jour
        const updatedPacks = [...packs];
        updatedPacks[index] = editedPack;
        setPacks(updatedPacks);

        // Réinitialiser l'index de l'édition
        setEditIndex(null);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du pack :', error);
    }
};

    const handleCancelEdit = () => {
        setEditIndex(null);
    }



    return (
        <div>
        <h1>Liste des Packs</h1>
        {loading && <p>Chargement en cours...</p>}
        
        {packs.length > 0 && (
            <table>
                <thead>
                    <tr className="wrap-text">
                        <th className="text-center">Prestation</th>
                        <th className="text-center">Nom</th>
                        <th className="text-center">Description</th>
                        <th className="text-center">Prix Fixe (CHF)</th>
                        <th className="text-center">Prix Unitaire (CHF)</th>
                        <th className="text-center">Unité</th>
                        <th className="text-center">Unité Max</th>
                        <th className="text-center">Actions</th> {/* Ajout de la colonne Actions */}
                    </tr>
                </thead>
                <tbody>
                    {currentPacks.map((pack, index) => (
                        <tr className="wrap-text" key={index}>
                            {/* Afficher les détails du pack */}
                            {editIndex === index ? (
                                // Si la ligne est en mode édition, afficher les inputs
                                <>
                                    <td className="text-center">{pack.prestations.map(prestation => prestation.nom).join(", ")}</td>
                                    <td className="text-center">
                                    <form onSubmit={(e) => handleSubmitEdit(e, index)}>
                                        {/* Input pour le nom du pack */}
                                        <input 
                                            type="text" 
                                            value={pack.nom} 
                                            onChange={(e) => handlePackChange(e, index)} 
                                        />
                                    </form>
                                    </td>
                                    <td className="text-center">
                                        <input 
                                            className="text-center"
                                            type="text"
                                            value={pack.description}
                                            onChange={(e) => handlePackChange(e, index)}
                                        />
                                    </td>
                                    <td className="text-center">
                                        <input
                                            type="number"
                                            value={pack.prix_fixe}
                                            onChange={(e) => handlePackChange(e, index)}
                                        />
                                    </td>
                                    <td className="text-center">
                                        <input
                                            type="number"
                                            value={pack.prix_unite}
                                            onChange={(e) => handlePackChange(e, index)}
                                        />
                                    </td>
                                    <td className="text-center">
                                        <input
                                            type="text"
                                            value={pack.unite}
                                            onChange={(e) => handlePackChange(e, index)}
                                        />
                                    </td>
                                    <td className="text-center">
                                        <input
                                            type="text"
                                            value={pack.unite_max}
                                            onChange={(e) => handlePackChange(e, index)}
                                        />
                                    </td>
                                    <td className="text-center">
                                        <button type="button" onClick={(e) => handleSubmitEdit(e, index)}>Enregistrer</button>
                                        <button type="button" onClick={handleCancelEdit}>Annuler</button>
                                    </td>
                                </>
                            ) : (
                                // Si la ligne n'est pas en mode édition, afficher les détails du pack
                                <>
                                    <td className="text-center">{pack.prestations.map(prestation => prestation.nom).join(", ")}</td>
                                    <td className="text-center">{pack.nom}</td>
                                    <td className="text-center">{pack.description}</td>
                                    <td className="text-center">{pack.prix_fixe ? pack.prix_fixe + " CHF" : "-"}</td>
                                    <td className="text-center">{pack.prix_unite ? pack.prix_unite + " CHF" : "-"}</td>
                                    <td className="text-center">{pack.unite || "-"}</td>
                                    <td className="text-center">{pack.unite_max || "-"}</td>
                                    <td className="text-center">
                                        <button className="button-modifier" onClick={() => handleClickModifier(index)}>Modifier un pack</button>
                                        <button className="button-supprimer" onClick={() => handleDeletePack(pack.id)}>Supprimer un pack</button>
                                    </td>
                                </>
                            )}
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