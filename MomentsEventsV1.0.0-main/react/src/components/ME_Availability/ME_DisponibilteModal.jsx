import React, { useState } from 'react';


function convertToUserTimezone(utcDate) {
  // Création d'un nouvel objet Date à partir de la date UTC
  const date = new Date(utcDate);

  // Obtention du décalage horaire de l'utilisateur par rapport à l'heure UTC en minutes
  const userTimezoneOffset = date.getTimezoneOffset();

  // Ajout du décalage horaire de l'utilisateur pour obtenir la date locale
  date.setMinutes(date.getMinutes() + userTimezoneOffset);

  return date;
}

const DisponibilitesModal = ({ disponibilites, closeModal,  openReserverFormModal, onSelectedDisponibiliteChange  }) => {

  const [selectedDisponibilite, setSelectedDisponibilite] = useState(null);


  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Utiliser toLocaleString() pour formater la date de manière conviviale
  };
  
  const handleClick = (disponibilite) => {
    // stocker la disponibilité sélectionnée dans le state
    setSelectedDisponibilite(disponibilite);
   
  }

  const handleClickReserver = (disponibilite) => {
    openReserverFormModal();
    onSelectedDisponibiliteChange(disponibilite)
    closeModal();

  };

  

  if (disponibilites.length === 0) {
    return (
      <div>
        <p>Aucune disponibilité trouvée pour le moment.</p>
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
      <table>
        <tbody>
          {disponibilites.map((disponibilite, index) => (
            <tr key={index} onClick={() => handleClick(disponibilite)} className="dateEtTitre" >
              <td >{disponibilite.title}</td>
              <td >{formatDateString(convertToUserTimezone(disponibilite.dateTime))}</td>
              <td>{disponibilite.prestataire}</td> 
              <td>
              <button onClick={() => handleClickReserver(disponibilite)}>
                Réserver
              </button>
              </td>
            </tr>
          ))}
        </tbody>
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