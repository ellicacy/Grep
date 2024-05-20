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
    const [formData, setFormData] = useState({
        nom: "",
        description: "",
        prix_fixe: null,
        prix_unite: null,
        unite: "",
        unite_max: null,
    });

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



    const handleClickModifier = ( index) => {
        setEditIndex(index);
        setFormData({
            nom: currentPacks[index].nom,
            description: currentPacks[index].description,
            prix_fixe: currentPacks[index].prix_fixe,
            prix_unite: currentPacks[index].prix_unite,
            unite: currentPacks[index].unite,
            unite_max: currentPacks[index].unite_max
        });

    };

    const handleSubmitEdit = async (e, index) => {
        e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire

        // remplacer currentPacks par les valeurs de formData
        // Récupérer le pack modifié à partir de currentPacks
        const editedPack = currentPacks[index];
        
        editedPack.nom = formData.nom;
        editedPack.description = formData.description;
        editedPack.prix_fixe = formData.prix_fixe;
        editedPack.prix_unite = formData.prix_unite;
        editedPack.unite = formData.unite;
        editedPack.unite_max = formData.unite_max;

        try {
            // Effectuer une requête HTTP pour mettre à jour le pack dans la base de données pour prix fixe
            if (editedPack.prix_fixe !== null ) {
                console.log('if prix fixe');
                const response = await axiosClient.put(`/packs/${editedPack.id}`, {
                    nom: editedPack.nom,
                    description: editedPack.description,
                    prix_fixe: editedPack.prix_fixe,
                    unite: null,
                    prix_unite: null,
                    unite_max: null,
                    prestations: editedPack.prestations.map(prestation => prestation.id)
                });
                // Mettre à jour la liste currentPacks avec les données mises à jour
                const updatedPacks = [...packs];
                updatedPacks[index] = editedPack;
                setPacks(updatedPacks);
                console.log('updatedPacks', updatedPacks);
                console.log('Pack mis à jour avec succès :', response);

                // Réinitialiser l'index de l'édition
                setEditIndex(null);
                // Effectuer une requête HTTP pour mettre à jour le pack dans la base de données pour prix unitaire
            } else {
                console.log('if prix unitaire');
                const response = await axiosClient.put(`/packs/${editedPack.id}`, {
                    nom: editedPack.nom,
                    description: editedPack.description,
                    prix_fixe: null,
                    unite: editedPack.unite,
                    prix_unite: editedPack.prix_unite,
                    unite_max: editedPack.unite_max,
                    prestations: editedPack.prestations.map(prestation => prestation.id)
                });
                // Mettre à jour la liste currentPacks avec les données mises à jour
                const updatedPacks = [...packs];
                updatedPacks[index] = editedPack;
                setPacks(updatedPacks);
                console.log('updatedPacks', updatedPacks);
                console.log('Pack mis à jour avec succès :', response);
                // Réinitialiser l'index de l'édition
                setEditIndex(null);
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du pack :', error);
        }
    };

    const handleCancelEdit = () => {

        setEditIndex(null);
    }

    const handleInputChange = (e, fieldName) => {
        const { value } = e.target;
        if (fieldName === "prix_fixe" || fieldName === "prix_unite" || fieldName === "unite_max") {
            if (value === "" || value === "0") {
                setFormData({
                    ...formData,
                    [fieldName]: null
                });
                return;
            }
        }
        // Mettre à jour les valeurs du formulaire d'édition en fonction du champ modifié
        setFormData({
            ...formData,
            [fieldName]: value
        });

        console
    };

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
                        <th className="text-center action-cell">Actions</th> {/* Ajout de la colonne Actions */}
                    </tr>
                </thead>
                <tbody>
                    {currentPacks.map((pack, index) => (
                        <tr className="wrap-text" key={index}>
                            {/* Afficher les détails du pack */}
                            {editIndex === index ? (
                                // Si la ligne est en mode édition, afficher les inputs
                                <>
                                    <td className="text-center-modif">{pack.prestations.map(prestation => prestation.nom).join(", ")}</td>
                                    <td className="text-center-modif">
                                    <form onSubmit={(e) => handleSubmitEdit(e, index)}>
                                        {/* Input pour le nom du pack */}
                                        <textarea 
                                            type="text" 
                                            value={formData.nom} 
                                            onChange={(e) => handleInputChange(e, "nom")} 
                                        />
                                    </form>
                                    </td>
                                    <td className="text-center-modif">
                                        <textarea 
                                            className="text-center-modif "
                                            type="text"
                                            value={formData.description}
                                            onChange={(e) => handleInputChange(e, "description")}
                                        />
                                    </td>
                                    <td className="text-center-modif">
                                        <input
                                            type="number"
                                            value={formData.prix_fixe}
                                            onChange={(e) => handleInputChange(e, "prix_fixe")}
                                        />
                                    </td>
                                    <td className="text-center-modif">
                                        <input
                                            type="number"
                                            value={formData.prix_unite}
                                            onChange={(e) => handleInputChange(e, "prix_unite")}
                                        />
                                    </td>
                                    <td className="text-center-modif">
                                        <input
                                            type="text"
                                            value={formData.unite}
                                            onChange={(e) => handleInputChange(e, "unite")}
                                        />
                                    </td>
                                    <td className="text-center-modif">
                                        <input
                                            type="text"
                                            value={formData.unite_max}
                                            onChange={(e) => handleInputChange(e, "unite_max")}
                                        />
                                    </td>
                                    <td className="text-center-modif action-cell">
                                        <button className="button-modifier" type="button" onClick={(e) => handleSubmitEdit(e, index)}>Enregistrer</button>
                                        <button className="button-supprimer" type="button" onClick={handleCancelEdit}>Annuler</button>
                                    </td>
                                </>
                            ) : (
                                // Si la ligne n'est pas en mode édition, afficher les détails du pack
                                <>
                                
                                    <td className="text-center">{pack.prestations.map(prestation => prestation.nom).join(", ")}</td>
                                    <td className="text-center">{pack.nom}</td>
                                    <td className="text-center description-cell">{pack.description}</td>
                                    <td className="text-center">{pack.prix_fixe ? pack.prix_fixe + " CHF" : "-"}</td>
                                    <td className="text-center">{pack.prix_unite ? pack.prix_unite + " CHF" : "-"}</td>
                                    <td className="text-center">{pack.unite || "-"}</td>
                                    <td className="text-center">{pack.unite_max || "-"}</td>
                                    <td className="text-center action-cell">
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