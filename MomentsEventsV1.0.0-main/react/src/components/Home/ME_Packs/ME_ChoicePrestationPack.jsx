import React, {useState, useEffect} from "react";
import axiosClient from "../../../axios-client";
import "../../../index.css";
import ME_FormPack from "./ME_FormPack";
import { set } from "lodash";
const ME_ChoicePrestationPack = () => {

    const [prestations, setPrestations] = useState([]);
    const [userId, setUserId] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [selectedPrestation, setSelectedPrestation] = useState(null);
    const [formKey, setFormKey] = useState(0);

    useEffect(() => {
        fetchPrestations();
    }, []); // Utilisez useEffect pour exécuter fetchPrestations une fois que le composant est monté

    const handleBack = () => {
        console.log('Retour à la liste des packs');
        window.location.href = "/packs";
    }

    const fetchPrestations = async () => {
        console.log('Récupération des prestations...');
        try {
            const prestationsResponse = await axiosClient.get('/prestations');
            const user = JSON.parse(localStorage.getItem("USER"));
            let userPrestations = [];
            if (user) {
                
                const userIdP = user.idPersonne;
                console.log('user id '+userIdP);
                setUserId(userIdP);
                userPrestations = prestationsResponse.data.filter(prestation => prestation.id_user === userIdP);
                console.log('Prestations récupérées avec succès :', prestationsResponse);
            }    
            setPrestations(userPrestations); // Mettez à jour le state avec les données des prestations
        } catch (error) {
            console.error('Erreur lors de la récupération des prestations :', error);
        }
    }

    const handlePrestationClick = (prestation) => {
        console.log('Prestation cliquée :', prestation);
        setSelectedPrestation(prestation);
        setFormKey(prevKey => prevKey + 1);
        setShowForm(true);
    }


    const handlePrestationMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handlePrestationMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <div>
            <h1 style={{ cursor: 'default' }}>Liste des prestations</h1>
            <p style={{ cursor: 'default' }}>Cliquez sur la prestation pour lui créer un pack</p>
        
            <ul>
                {prestations.map((prestation, index) => (
                    <li
                    onClick={() => handlePrestationClick(prestation)} 
                    key={index}
                    onMouseEnter={() => handlePrestationMouseEnter(index)}
                    onMouseLeave={handlePrestationMouseLeave}
                    style={{ 
                        backgroundColor: hoveredIndex === index ? "#e5e5e5" : "transparent",
                        cursor: "pointer"
                    }} 
                >
                    <strong>{prestation.nom}</strong> - {prestation.description} 
                </li>
                ))}
            </ul>
            <button onClick={handleBack}>Retour</button>

            {showForm && <ME_FormPack prestation={selectedPrestation} key={formKey}/>} 
        </div>
        // creer un bouton retour en bas de la page pour retourner à la liste des packs

    );
}

export default ME_ChoicePrestationPack;