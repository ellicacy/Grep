import React, {useState, useEffect} from "react";
import axiosClient from "../../axios-client";
const ME_CreatePack = () => {
    
    const [packs, setPacks] = useState([])
    
    useEffect(() => {
        const fetchPacks = async () => {
            console.log('Récupération des packs...');
            try {
                const response = await axiosClient.get('/packs');
                console.log('Packs récupérés avec succès :', response);
                setPacks(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des packs :', error);
            }
        }
        fetchPacks();
    }

        , []);


    return (
        <div>
            <h1>Liste des Packs</h1>
            {packs.length > 0 && (
                <div>
                    <ul>
                        {packs.map((pack, index) => (
                            <li key={index}>
                                <strong>{pack.name}</strong> - {pack.description} - {pack.priceType} - {pack.priceValue} - {pack.maxQuantity}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
           
        </div>
    );
}

export default ME_CreatePack;