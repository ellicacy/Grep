import React, { useState } from 'react';
const ME_AffichagePack = () => {

const [packs, setPacks] = useState([]);

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

    return (
        <div>
            <h1>Affichage des Packs fun</h1>
            <button onClick={fetchPacks}>Récupérer les packs</button>

        </div>
    );
}

export default ME_AffichagePack;