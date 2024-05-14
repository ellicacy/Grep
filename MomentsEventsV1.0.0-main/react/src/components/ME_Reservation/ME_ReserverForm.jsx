import React from "react";
import { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import ME_AffichagePack from "../ME_Packs/ME_affichagePackCarte";
import CartePrestation from "../Prestation/Carte.Prestation";
import { set } from "lodash";


const ReserverForm = ({ onClose, selectedDate, selectedTitle, selectedPrestataire, disponibilites, setDisponibilites}) => {
  
  const [option, setOption] = useState(null);
  const [packs, setPacks] = useState([]);
  const [prestations, setPrestations] = useState([]);
  const [prestataireID, setPrestataireID] = useState(null);
  const [time, setTime] = useState(1);
  const [nomPersonne, setNomPersonne] = useState('');
  const [email, setEmail] = useState('');
  const [prestationselectionne, setPrestationSelectionne] = useState(null);


  useEffect(() => {
    recuperPack();
  }, []);

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
      setPrestations(prestations);
      console.log(prestations);


      const prestationselectionne = prestations.find(prestation => prestation.id_user === prestataireId && prestation.nom === selectedTitle);
      const selectedPrestationId = prestationselectionne.id;
      setPrestataireID(selectedPrestationId);
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
      creerNotification();
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

  const recuperPack = async () => {
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
      setPrestataireID(prestataireId);
  } catch (error) {
    console.error('Erreur lors de la récupération des prestations :', error);
  }

    try{
      const prestationsRecherche = await axiosClient.get(`/prestations`);
      const prestations = prestationsRecherche.data;

      setPrestations(prestations);

      console.log(prestations);
      console.log(prestataireID);
      console.log(selectedTitle);
      const prestationselectionne = prestations.find(prestation => prestation.id_user === prestataireID && prestation.nom === selectedTitle);

      console.log(prestationselectionne);
      setPrestationSelectionne(prestationselectionne);
    } catch (error) {
      console.error('Erreur lors de la récupération des prestations :', error);
    }

    try {
      const response = await axiosClient.get('/packs');
      const packs = response.data;
      // recuperer les packs de la prestation
      console.log(prestationselectionne.id)
      const packsFiltres = packs.filter(pack => pack.prestations.map(prestation => prestation.id).includes(prestationselectionne.id));

      console.log(packs);
      console.log(packsFiltres);
      setPacks(packsFiltres);
    }
    catch (error) {
      console.error('Erreur lors de la récupération des packs :', error);
    }
  };

  const creerNotification = async () => {

    try {
      const response = await axiosClient.post('/user/{user}/notifications', {
        title: selectedTitle,
        content: nomPersonne + " a réservé un(e) " + selectedTitle + " avec vous le " + selectedDate + " pour une durée de " 
        + time + "h. Vous pouvez le/la contacté(e) à l'adresse email suivante: " + email + " pour plus d'informations",
        idPersonne: prestataireID,
      } );
      console.log('Notification créée avec succès :', response);
    }
    catch (error) {
      console.error('Erreur lors de la création de la notification :', error);
    }
  };

  const handlePackChange = (event) => {

    const selectedPack = event.target.value;
    setPacks(selectedPack); 
};

  return (
    <div>


      <h1>Formulaire de réservation pour un(e) {selectedTitle} de {selectedPrestataire}</h1>

      <form onSubmit={handleReservation}>

        <label>
          Sélectionnez un pack:
          <select name="Pack" onChange={handlePackChange}>
            {packs.map((pack, index) => (
              <option key={index} value={pack.id}>{pack.nom}</option>
            ))}
          </select>

        </label>
        <br />

        <label>
          Nom:
          <input type="text" name="name" value={nomPersonne} onChange={(e) => setNomPersonne(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
        <select name="time" value={time} style={{ height: '70px' }} onChange={(e) => setTime(e.target.value)}>
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