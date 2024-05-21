import React, { useState, useEffect } from 'react';
import "../../index.css"
import { set } from 'lodash';
import axiosClient from '../../axios-client';
import Prestations from '../../views/Dashboard/Prestations';
function convertToUserTimezone(utcDate) {
  // Création d'un nouvel objet Date à partir de la date UTC
  const date = new Date(utcDate);

  // Obtention du décalage horaire de l'utilisateur par rapport à l'heure UTC en minutes
  const userTimezoneOffset = date.getTimezoneOffset();

  // Ajout du décalage horaire de l'utilisateur pour obtenir la date locale
  date.setMinutes(date.getMinutes() + userTimezoneOffset);

  return date;
}

const DisponibilitesModal = ({ disponibilites, closeModal,  openReserverFormModal, onSelectedDisponibiliteChange, recherchePlusTard  }) => {

  const [selectedDisponibilite, setSelectedDisponibilite] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedOccasionType, setSelectedOccasionType] = useState(null);
  const [option, setOption] = useState("default");
  const [packs, setPacks] = useState([]);
  const [originalPacks, setOriginalPacks] = useState([]);
  const [selectedPackType, setSelectedPackType] = useState("all"); // "all", "prix_fixe", "prix_unitaire"
  const [filteredDisponibilites, setFilteredDisponibilites] = useState(disponibilites);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Utiliser toLocaleString() pour formater la date de manière conviviale
  };
  
  const handleClick = (disponibilite) => {
    // stocker la disponibilité sélectionnée dans le state
    setSelectedDisponibilite(disponibilite);
   
  }

 
  const handleClickPresta = (presta) => {
    console.log("Presta")
    const prestataire = presta
    console.log(prestataire)
    //Prestations(prestataire)
  }

  const sortPacks = (option) => {
    let sortedPacks = [...originalPacks]; // Toujours utiliser la copie originale des packs

    if (option === "nom") {
      sortedPacks.sort((a, b) => a.nom.localeCompare(b.nom));
    } else if (option === "prix_fixe") {
      sortedPacks = sortedPacks.filter(pack => pack.prix_fixe !== null);
      sortedPacks.sort((a, b) => (a.prix_fixe || 0) - (b.prix_fixe || 0));

    } else if (option === "prix_unitaire") {
      sortedPacks = sortedPacks.filter(pack => pack.prix_unite !== null);
      sortedPacks.sort((a, b) => (a.prix_unite || 0) - (b.prix_unite || 0));
    }
    console.log('Packs triés :', sortedPacks);
    setPacks(sortedPacks); // Mettre à jour la liste des packs triés
    
    console.log('Packs :', sortedPacks);
    

    const filtered = filterDisponibilitesByPack(sortedPacks, disponibilites);

    setFilteredDisponibilites(filtered);
    console.log('Disponibilités filtrées :', filtered);
  };


const getPrestationIdsFromPacks = (packs) => {
  return packs.reduce((ids, pack) => {
    pack.prestations.forEach(prestation => {
      ids.push(prestation.id);
    });
    return ids;
  }, []);
};

const filterDisponibilitesByPack = (packs, disponibilites) => {
  const prestationIds = getPrestationIdsFromPacks(packs);
  console.log('Prestation IDs :', prestationIds);
  console.log('Disponibilités :', disponibilites);
  
  return disponibilites.filter(disponibilite => 
    prestationIds.includes(disponibilite.prestation)
  );
};



const handlePackTypeChange = (packType) => {
  setSelectedPackType(packType);
  sortPacks(packType);
};

  // Fonction pour gérer le changement de l'option de tri
  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setOption(selectedOption);
    sortPacks(selectedOption);
  };

  const getPacks = async () => {
    try {
      const response = await axiosClient.get('/packs');
      setPacks(response.data);
      setOriginalPacks(response.data);
      console.log('Packs récupérés :', response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des packs :', error);
    }
  };

  useEffect(() => {
    getPacks();
    
  }, []);

  const handleClickReserver = (disponibilite) => {
    console.log('Réserver la disponibilité :', disponibilite);
    openReserverFormModal();
    onSelectedDisponibiliteChange(disponibilite);
    closeModal();
  };

  

  if (disponibilites.length === 0) {
    return (
      <div>
        <p>Aucune disponibilité trouvée pour le moment.</p>
        <br />
        <button className='ButtonRechercheProDispo' onClick={recherchePlusTard}>Voir les prochaines disponibilités</button>

        {/*
          <p>Afficher les dates de disponibilite suivante?</p>
          <button>Oui</button>
          <button onClick={closeModal}>Non</button>
        */}

        <br />
        <br />
        <br />
      </div>
    );
  }

  disponibilites.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
  
  return (
    <div>
      <label>
        Trier par :
        <select value={option} onChange={handleSortChange}>
          <option onClick={() => handlePackTypeChange("all")} value="default">-- Tous--</option>
          <option onClick={() => handlePackTypeChange("nom")} value="nom">Nom</option>
          <option onClick={() => handlePackTypeChange("prix_fixe")} value="prix_fixe">Prix Fixe</option>
          <option onClick={() => handlePackTypeChange("prix_unitaire")} value="prix_unitaire">Prix Unitaire</option>
        </select>
      </label>
      <table>
        <tbody>
          {filteredDisponibilites.map((disponibilite, index) => (
            <tr key={index} onClick={() => handleClick(disponibilite)} className="dateEtTitre" >
              <td >{disponibilite.title}</td>
              <td >{formatDateString(convertToUserTimezone(disponibilite.dateTime))}</td>
              <td onClick={()=> 
                handleClickPresta(disponibilite.prestataire)
                } >{disponibilite.prestataire}</td> 
              <td>
              <button onClick={() => handleClickReserver(disponibilite)}>
                Réserver
              </button>
              </td>
            </tr>
          ))}
        </tbody>
        <div> 
        <button onClick={recherchePlusTard}>Voir les prochaines disponibilités</button>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </table>
      <style>{`
        .dateEtTitre:hover{
          background-color: #f0f0f0; /* Couleur de fond au survol */
          cursor: pointer; /* Curseur de la souris */
        }
      `}</style>
     
    </div>
  );
};

export default DisponibilitesModal;