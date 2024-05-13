import React, { useState } from 'react';
import axiosClient from '../../axios-client';
import "../../index.css";

const ME_AffichagePack = () => {

const [packs, setPacks] = useState([]);
const [showMessage, setShowMessage] = useState(false);


const fetchPacks = async () => {
    console.log('Récupération des packs...');
    try {
        const response = await axiosClient.get('/packs');
        console.log('Packs récupérés avec succès :', response);
        setPacks(response.data);
        setShowMessage(response.data.length === 0);
    } catch (error) {
        console.error('Erreur lors de la récupération des packs :', error);
    }
    }

    return (
        <div>
            <button className="button" onClick={fetchPacks}>Afficher les packs</button>
            {packs.length > 0 && (
                <div>
                    <h2>Liste des packs</h2>
                    <ul>
                        {packs.map((pack, index) => (
                            <li key={index}>
                                <strong>{pack.name}</strong> - {pack.description} - {pack.priceType} - {pack.priceValue} - {pack.maxQuantity}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {showMessage && packs.length === 0 && <p>Aucun pack à afficher</p>}

        </div>
    );
}

export default ME_AffichagePack;