import React from 'react';
import { Modal, Button } from '@mui/material';


const DisponibilitesModal = ({ disponibilites, onClose }) => {
  return (
    <Modal
      open={true} // Ouverture automatique du modal lorsque disponibilitesModal est rendu
      onClose={onClose} // Gestionnaire d'événements pour fermer le modal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: 400, // Largeur maximale du modal
        backgroundColor: 'white',
        boxShadow: 24,
        p: 4,
      }}>
        <h2 id="modal-title">Disponibilités</h2>
        <div id="modal-description">
          {/* Affichage des disponibilités */}
          {disponibilites.map((disponibilite, index) => (
            <div key={index}>
              {/* Affichage des détails de disponibilité */}
              <p>Date: {disponibilite.date}</p>
              <p>Lieu: {disponibilite.lieu}</p>
              {/* Ajoutez d'autres détails de disponibilité selon vos besoins */}
            </div>
          ))}
        </div>
        {/* Bouton pour fermer le modal */}
        <Button onClick={onClose}>Fermer</Button>
      </div>
    </Modal>
  );
};

export default DisponibilitesModal;