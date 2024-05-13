import React from "react";
import { useState } from "react";
import axiosClient from "../../axios-client";


const ReserverForm = ({ onClose, selectedDate, selectedTitle, selectedPrestataire, disponibilites, setDisponibilites}) => {
  
  const capitalizeFirstLetter = (str) => {
    // Vérifie si la chaîne de caractères est vide ou null
    if (!str) return '';

    // Récupère la première lettre et la convertit en majuscule
    const firstLetter = str.charAt(0).toUpperCase();

    // Concatène la première lettre majuscule avec le reste de la chaîne de caractères
    return firstLetter + str.slice(1);
};
  
  const deleteEvent = async (selectedPrestationId) => {
    try {
        // get the event 
        const response = await axiosClient.get(`/availabilities`);
        const availabilities = response.data;
        const availability = availabilities.find(availability => availability.idPrestation === selectedPrestationId && availability.dateTime === selectedDate);
        
        // delete the event
        await axiosClient.delete(`/availabilities/${availability.id}`);
        console.log('L\'événement a été supprimé avec succès');

        fetchDisponibilites(setDisponibilites);


    } catch (error) {
        console.error('Erreur lors de la suppression de l\'événement :', error);
    }
};
  const recupererPresationFiltre = async () => {
    const response = await axiosClient.get('/users');
    const prestateur = response.data.data;

   

    try {
      /// Séparer selectedPrestataire pour obtenir le prénom et le nom de famille
      const prenom = selectedPrestataire.split(' ')[0];
      const nomFamille = selectedPrestataire.split(' ')[1];
      const selectedPre = prestateur.find(user => {
        const prenomCapitalized = capitalizeFirstLetter(user.personnePrenom);
        const nomFamilleCapitalized = capitalizeFirstLetter(user.personneNom);
        return prenomCapitalized === prenom && nomFamilleCapitalized === nomFamille;
    });
      const prestataireId = selectedPre.idPersonne;
      console.log(prestataireId);
      const prestationsRecherche = await axiosClient.get(`/prestations`);
      const prestations = prestationsRecherche.data;


      const prestationselectionne = prestations.find(prestation => prestation.id_user === prestataireId && prestation.nom === selectedTitle);
      console.log(prestationselectionne);
      const selectedPrestationId = prestationselectionne.id;
      deleteEvent(selectedPrestationId);
    }
    catch (error) {
      console.error('Erreur lors de la récupération des prestations :', error);
    }
};
    

    const handleReservation = (e) => {
        e.preventDefault();
        onClose();

    }
    

    const reserver = async (info) => {
         
         recupererPresationFiltre();  
         
    }
    const fetchDisponibilites = async (setDisponibilites) => {
      try {
          // Récupérer les disponibilités depuis l'API
          const response = await axiosClient.get('/availabilities');
          const disponibilites = response.data;
  
          // Mettre à jour l'état des disponibilités avec les nouvelles données
          setDisponibilites(disponibilites);
  
      } catch (error) {
          console.error('Erreur lors de la récupération des disponibilités :', error);
      }
  };

  return (
    <div>
      <h1>Formulaire de réservation pour un(e) {selectedTitle} de {selectedPrestataire}</h1>
      <form onSubmit={handleReservation}>
        <label>
          Nom:
          <input type="text" name="name" />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
        Date et heure:
        <input 
            type="datetime-local" 
            name="date" 
            value={selectedDate ? selectedDate.slice(0, 16) : ""} 
            readOnly 
        />
        </label>
        <label>Selectionner le temps de la prestation    </label>
        <select name="time"style={{ height: '70px' }}>
            <option value='1' >1h </option>
            <option value='2'>2h </option>
            <option value='3'>3h </option>
            <option value='4'>4h </option>
            <option value='5'>5h </option>
            <option value='6'>6h </option>
            <option value='7'>7h </option>
        </select>
        <div style={{ display: 'flex'}}>
        <input type="button" value="Annuler" onClick={onClose} />
        <input type="submit" value="Réserver" onClick={reserver} /> 
        </div>
        
      </form>
    </div>
  );
}

export default ReserverForm;