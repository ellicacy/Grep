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
  const [showPackOptions, setShowPackOptions] = useState(false);
  const [packid, setPackId] = useState(null);
  const [showPackDetails, setShowPackDetails] = useState(false);
  const [quantite, setQuantite] = useState(1);
  const [packselectionne, setPackSelectionne] = useState(null);
  


  function convertToUserTimezone(utcDate) {
    // Création d'un nouvel objet Date à partir de la date UTC
    const date = new Date(utcDate);
  
    // Obtention du décalage horaire de l'utilisateur par rapport à l'heure UTC en minutes
    const userTimezoneOffset = date.getTimezoneOffset();
  
    // Ajout du décalage horaire de l'utilisateur pour obtenir la date locale
    date.setMinutes(date.getMinutes() + userTimezoneOffset);
  
    
  
    return date;
  }

  const capitalizeFirstLetter = (str) => {
    // Vérifie si la chaîne de caractères est vide ou null
    if (!str) return '';

    // Récupère la première lettre et la convertit en majuscule
    const firstLetter = str.charAt(0).toUpperCase();

    // Concatène la première lettre majuscule avec le reste de la chaîne de caractères
    return firstLetter + str.slice(1);
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
      const prestationsRecherche = await axiosClient.get(`/prestations`);
      const prestations = prestationsRecherche.data;

      setPrestations(prestations);

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
        if (packid === null) {
          alert("Veuillez sélectionner un pack avant de soumettre le formulaire.");
          return; // Arrête la soumission du formulaire si aucun pack n'est sélectionné
      }
        onClose();

    }
    

    const reserver = async () => {
      creerNotification();
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

  const recuperPrestataireId = async () => {
    try {
      const response = await axiosClient.get('/users');
      const prestateur = response.data.data;
  
      /// Séparer selectedPrestataire pour obtenir le prénom et le nom de famille
      const prenom = selectedPrestataire.split(' ')[0];
      const nomFamille = selectedPrestataire.split(' ')[1];
      const selectedPre = prestateur.find(user => {
        const prenomCapitalized = capitalizeFirstLetter(user.personnePrenom);
        const nomFamilleCapitalized = capitalizeFirstLetter(user.personneNom);
        return prenomCapitalized === prenom && nomFamilleCapitalized === nomFamille;
      });
  
      const presta = selectedPre.idPersonne;
      setPrestataireID(presta);

    } catch (error) {
      console.error('Erreur lors de la récupération des prestations :', error);
    }

    
  };

  recuperPrestataireId();

  const handleClickAffichage = (packId) => {
    setPackId(packId);
    const packselection = packs.find(pack => pack.id === packId);
    setPackSelectionne(packselection);
    setShowPackDetails(true);
  }
  
  const recuperPack = async () => {

    console.log(prestationselectionne);
    try {
      const prestationsRecherche = await axiosClient.get(`/prestations`);
      const prestations = prestationsRecherche.data;

      setPrestations(prestations);
      console.log(prestations);
      const prestationselectionne = prestations.find(prestation => prestation.id_user === prestataireID && prestation.nom === selectedTitle);
      setPrestationSelectionne(prestationselectionne);

      const response = await axiosClient.get('/packs');
      const packs = response.data;
      // recuperer les packs de la prestation
      const packsFiltres = packs.filter(pack => pack.prestations.map(prestation => prestation.id).includes(prestationselectionne.id));
      setPacks(packsFiltres);
    }
    catch (error) {
      console.error('Erreur lors de la récupération des packs :', error);
    }
  };

  const creerNotification = async () => {

    const packselectionne = packs.find(pack => pack.id === packid);
    let date = new Date(selectedDate);
    date = convertToUserTimezone(date);
    let options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
  };
  
  // Formater la date
    let formattedDate = date.toLocaleDateString('fr-FR', options);
  
    
    const content = nomPersonne + " a réservé, un(e) " + selectedTitle + " avec le pack: " + packselectionne.nom +" ,avec vous le " + formattedDate + " pour une durée de "
    + time + "h. Vous pouvez le/la contacté(e) à l'adresse email suivante: " + email + " pour plus d'informations";
    console.log(content);
    try {
      const response = await axiosClient.post(`/user/${prestataireID}/notifications`, {
        title: selectedTitle,
        content: content,
        idPersonne: prestataireID
      } );
      console.log('Notification créée avec succès :', response);
    }
    catch (error) {
      console.error('Erreur lors de la création de la notification :', error);
    }
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




  return (
    <div>


      <h1>Formulaire de réservation pour un(e) {selectedTitle} de {selectedPrestataire}</h1>

      <form onSubmit={handleReservation}>

      <label>
        <button required className="buttonSelection" onClick={(e) => {
           e.preventDefault();
          setShowPackOptions(!showPackOptions);
          recuperPack();
        }
        
        }>Sélectionnez un pack</button>
        {showPackOptions && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
          {packs.map((pack, index) => (
             <label key={index} style={{ marginLeft: '5px' }}>
              <input 
                type="radio" 
                name="pack" 
                value={pack.id} 
                style={{ display: 'inline-block', marginRight: '10px' }}
                onChange={() => {
                  handleClickAffichage(pack.id);
                }}
                title="Plus d'infos"
              />
              {pack.nom}
            </label >
          ))}
        </div>
        )}
      </label>
        
      {showPackDetails && (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Prix fixe (CHF)</th>
                        <th>Prix unitaire (CHF)</th>
                        <th>Unité</th>
                        <th>Unité max</th>
                    </tr>
                </thead>
                <tbody>
                    {packs.map((pack, index) => (
                        <tr key={index}>
                            <td>{pack.nom}</td>
                            <td>{pack.description}</td>
                            <td>{pack.prix_fixe ? pack.prix_fixe + " CHF" : "-"}</td>
                            <td>{pack.prix_unite ? pack.prix_unite + " CHF" : "-"}</td>
                            <td>{pack.unite || "-"}</td>
                            <td>{pack.unite_max || "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            {packselectionne.prix_fixe ? (
                <div>
                    Prix Total: { (packselectionne.prix_fixe).toLocaleString('fr-CH', { style: 'currency', currency: 'CHF' }) }
                </div>
            ) : (
                <div>
                  <br />
                  <label>
                      {packselectionne.unite} maximum:
                      <div className="quantity-controls">
                        <button  onClick={(e) => {
                          e.preventDefault();
                          setQuantite((prevQuantite) => {
                            if (prevQuantite == null || prevQuantite <= 1) {
                                return 1; // Si la quantité est null ou égale à 1, retourne 1
                            } else {
                                return prevQuantite - 1; // Sinon, décrémente la quantité de 1
                            }
                        })
                          }}>
                            -</button>
                        <span className="quantity-display">{quantite}</span>
                        <button onClick={(e) => { 
                          e.preventDefault();
                          setQuantite((prevQuantite) => {
                            if (prevQuantite == null || prevQuantite <= 0) {
                                return 1; // Si la quantité est null ou inférieure à 0, retourne 1
                            } else if (prevQuantite >= packselectionne.unite_max) {
                                return packselectionne.unite_max; // Si la quantité atteint la quantité maximale, retourne la quantité maximale
                            } else {
                                return prevQuantite + 1; // Sinon, incrémente la quantité de 1
                            }
                        })
                          }}>
                            +</button>
                      
                    </div>
                  </label>
                    <div>
                        Prix Total: { (packselectionne.prix_unite * quantite).toLocaleString('fr-CH', { style: 'currency', currency: 'CHF' }) }
                    </div>
                </div>
            )}
        </div>
    )}

        <br />


        <label>
          Nom *:
          <input required type="text" name="name" value={nomPersonne} onChange={(e) => setNomPersonne(e.target.value)} />
        </label>
        <label>
          Email *:
          <input required type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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