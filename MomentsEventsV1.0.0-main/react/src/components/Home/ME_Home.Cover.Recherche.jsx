import { Button, Container, Grid, Paper } from '@mui/material'
import React from 'react'
import { TextField } from '@mui/material';
import { Link, Typography } from '@mui/material';
import theme from '../../theme.jsx';
import { useState, useEffect } from 'react';
import axiosClient from '../../axios-client.js'
import DisponibilitesModal from '../ME_Availability/ME_DisponibilteModal.jsx';
import Modal from "react-modal";
import ReserverForm from '../ME_Reservation/ME_ReserverForm.jsx';
import Footer from '../ME_Availability/ME_FooterDispo.jsx';

function convertToUserTimezone(utcDate) {
  // Création d'un nouvel objet Date à partir de la date UTC
  const date = new Date(utcDate);

  // Obtention du décalage horaire de l'utilisateur par rapport à l'heure UTC en minutes
  const userTimezoneOffset = date.getTimezoneOffset();

  // Ajout du décalage horaire de l'utilisateur pour obtenir la date locale
  date.setMinutes(date.getMinutes() + userTimezoneOffset);

  

  return date;
}


export default function BarreRecherche() {

  const [dateRecherche, setDateRecherche] = useState("");
  const [lieuRecherche, setLieuRecherche] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [typeRecherche, setTypeRecherche] = useState("");
  const [disponibilites, setDisponibilites] = useState([]);
  const [showDisponibilites, setShowDisponibilites] = useState(true);
  const [reserverFormIsOpen, setReserverFormIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedPrestataire, setSelectedPrestataire] = useState(null);
  const [selectedPrestation, setSelectedPrestation] = useState(null);
 
  const capitalizeFirstLetter = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };
  
  const openModal = () => {
    setModalIsOpen(true);
};

const closeModal = () => {
    setModalIsOpen(false);
};
const rechercherDisponibilites = async (nextDate) => {
  try {
    
    
    // Récupérer les prestations depuis l'API
    const prestationsResponse = await axiosClient.get('/prestations');
    const prestations = prestationsResponse.data;

    console.log('Prestations trouvées:', prestations);
    // Récupérer toutes les disponibilités depuis l'API
    const availabilitiesResponse = await axiosClient.get('/availabilities');
    const allAvailabilities = availabilitiesResponse.data;
    const usersResponse = await axiosClient.get('/users');
    const usersData = usersResponse.data.data;

    console.log('Disponibilités trouvées:', allAvailabilities);
    console.log('recheerche trouvées:', typeRecherche);
    console.log('ttire presta:', prestations.nom);
    // Filtrer les disponibilités en fonction des critères de recherche
    const filteredAvailabilities = allAvailabilities.filter(availability => {

      if (nextDate !== "") {
        console.log('in the if');
        console.log('nextDate', nextDate);
        setDateRecherche(nextDate); 

        console.log('dateRecherche', dateRecherche);

        //nextDate = ""; // Réinitialiser nextDate pour éviter de la répéter sur chaque itération
      }
      console.log('dateRecherche', dateRecherche);

      // Vérifier si la date de la disponibilité correspond à la date de recherche
      if (dateRecherche !== "") {
        const selectedDate = new Date(dateRecherche);
        const availabilityDate = convertToUserTimezone(availability.dateTime);
        
        if (availabilityDate.setHours(0, 0, 0, 0) !== selectedDate.setHours(0, 0, 0, 0)) {
          return false;
        }
        
      }
      // date et typeRcherche
       if (dateRecherche !== "" && typeRecherche !== "") {
        const selectedDate = new Date(dateRecherche);
        const availabilityDate = convertToUserTimezone(availability.dateTime);
        if (availabilityDate.setHours(0, 0, 0, 0) !== selectedDate.setHours(0, 0, 0, 0)&& prestations.find(prestation => prestation.nom === typeRecherche).id !== availability.idPrestation) {
          return false;
        }
  
      }
      

      // Vérifier si le lieu de la disponibilité correspond au lieu de recherche
      if (lieuRecherche !== "") {
        const prestation = prestations.find(prestation => prestation.id === availability.idPrestation);
        if (prestation.lieu.toLowerCase() !== lieuRecherche.toLowerCase()) {
          return false;
        }
      }

      
      // Vérifier si le type de la disponibilité correspond au type de recherche
      if (typeRecherche !== "") {
        // recuperer toutes les prestations avec le type de recherche
        const prestationsRecherche = prestations.filter(prestation => prestation.nom === typeRecherche);
        // Vérifier si la disponibilité correspond à l'une des prestations trouvées
        if (!prestationsRecherche.find(prestation => prestation.id === availability.idPrestation)) {
          return false;
        }
      }

      
      

      // Si tous les critères correspondent, conserver la disponibilité
      return true;
    });

    console.log('Disponibilités filtrées:', filteredAvailabilities);

    // Formater les disponibilités filtrées dans le format attendu par FullCalendar
    const formattedEvents = filteredAvailabilities.map(availability => {
      const prestation = prestations.find(prestation => prestation.id === availability.idPrestation);
      const userId = prestation.id_user;
      const prestataire = usersData.find(user => user.idPersonne === userId);
      return {
        title: prestation.nom,
        dateTime: availability.dateTime, 
        prestataire: capitalizeFirstLetter(prestataire.personnePrenom) + ' ' + capitalizeFirstLetter(prestataire.personneNom),
        prestation: prestation.id,
      };
    });
    

    console.log('Événements formatés:', formattedEvents);

    // Mettre à jour l'état des disponibilités avec les données formatées
    setDisponibilites(formattedEvents);
    if (nextDate !== "") {
      setShowDisponibilites(true);
    }

    /* trop de demande pour le serveur
    if (formattedEvents.length === 0) {
      // Aucune disponibilité trouvée, recherchez la disponibilité suivante
      // rajouter un jour a la date de recherche
      const nextDate = new Date(dateRecherche);
      nextDate.setDate(nextDate.getDate() + 1);
      setDateRecherche(nextDate.toISOString().split('T')[0]);
      rechercherDisponibilites();

    } else {
      // Des disponibilités ont été trouvées, mettre à jour l'état et ouvrir le modal
      setDisponibilites(formattedEvents);
      openModal();
    }
*/
    // Ouvrir le modal après avoir filtré les disponibilités
    openModal();
  } catch (error) {
    console.error('Erreur lors de la recherche des disponibilités:', error);
    alert('Il n\' y a pas d\'évenement disponible.');
  }
};


  const handleClick = () => {
    rechercherDisponibilites("");
  }

  const openReserverFormModal = () => {
    setShowDisponibilites(false);
    setReserverFormIsOpen(true);

};

const closeReserverFormModal = () => {
    setReserverFormIsOpen(false);
    setShowDisponibilites(true);
};

const onSelectedDisponibiliteChange = (date) => {
  setSelectedDate(date.dateTime);
  setSelectedTitle(date.title);
  setSelectedPrestataire(date.prestataire);
  setSelectedPrestation(date.prestation);


}
const recherchePlusTard = () => {
  const nextDate = new Date(dateRecherche);
  nextDate.setDate(nextDate.getDate() + 1);
  setShowDisponibilites(false);
  rechercherDisponibilites(nextDate.toISOString().split('T')[0]);
  
  
}


useEffect(() => {
  console.log('dateRecherche use efffect', dateRecherche);

}, [dateRecherche]); 


  return (
    <>
      <div style={{
        backgroundImage: "url(https://source.unsplash.com/collection/8654836/1920x520)",

      }}>
        <Grid
          container
          
          width={'100%'}
          height={{
            xs: '100vh',
            md: '520px'
          }}
          justifyContent='center'
          alignContent='center'>

          <Grid
            container
            item
            justifyContent='center'>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '36px',
                lineHeight: '44px'
              }}
              textAlign={'center'}>
              Trouvez une prestation pour votre événement
            </Typography>
          </Grid>

          <Grid
            container
            item
            lg={8}
            xl={6}
            m={'0px 20px 0px 20px'}>

            <Grid
              container
              justifyContent='center'>
              <Grid
                itam
                sm={8}
                m={'30px 0px 30px 0px'}>
                <Typography
                  variant="body1"
                  textAlign={'center'}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              item
              lg={12}>
              <Grid
                item
                xs={12}
                sm={12}
                lg={4}
                pr={{ xs: '0px', sm: '1px', lg: '0px' }}
              >
                <TextField
                  id="rechercheOccasionType"
                  placeholder="Pour quelle occasion ?"
                  inputProps={theme.inputProps}
                  value={typeRecherche}
                  onChange={(e) => setTypeRecherche(capitalizeFirstLetter(e.target.value))}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                lg={3}
                mt={{ xs: '-1px', lg: '0px' }}
                ml={{ xs: '0px', lg: '-1px' }}
              >
                <TextField
                  type="date"
                  id="rechercheOccasionDate"
                  inputProps={theme.inputProps}
                  value={dateRecherche}
                  onChange={(e) => setDateRecherche(e.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                lg={3}
                mt={{ xs: '-1px', lg: '0px' }}
                ml={{ xs: '0px', sm: '-1px' }}
              >
                <TextField
                  id="rechercheOccasionLieu"
                  type='text'
                  placeholder="Lieu"
                  inputProps={theme.inputProps}
                  value={lieuRecherche}
                  onChange={(e) => setLieuRecherche(e.target.value)}
                />
              </Grid>

              {/* Button de recherche */}
              <Grid
                item
                xs={12}
                sm={12}
                lg={2}
                pr={{ xs: '0px', sm: '1px' }}
              >
                <Button
                  variant="contained"
                  sx={{
                    height: '100%',
                    width: '100%'
                  }}
                  onClick={() => {
                    handleClick();
                  }}
                >Rechercher
                </Button>
              </Grid>
              
            </Grid>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Event Modal"
              shouldCloseOnOverlayClick={false}
              style={{
                  overlay: {
                      zIndex: 1000,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                  },
                  content: {
                    zIndex: 1001,
                    position: "relative",
                    top: "auto",
                    left: "auto",
                    right: "auto",
                    bottom: "auto",
                    border: "1px solid #ccc",
                    background: "white",
                    WebkitOverflowScrolling: "touch",
                    borderRadius: "4px",
                    outline: "none",
                    padding: "20px",
                    width: "auto",
                    maxHeight: "80vh" 
                  },
                  
                  
              }}
              
          >
            <div
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "white",
              padding: "10px",
              borderBottom: "1px solid #ccc",
              textAlign: "left",
            }}
          >
            <h2>Disponibilités trouvées</h2>
            <table>
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Date</th>
                  <th>Nom</th>
                  <th>Tri</th>
                  <th> </th>
                </tr>
              </thead>
            </table>
          </div>

            {showDisponibilites && (
              <div style={{ maxHeight: "calc(80vh - 50px)", overflowY: "auto" }}>
                  <DisponibilitesModal 
                      disponibilites={disponibilites}
                      closeModal={closeModal}
                      openReserverFormModal={openReserverFormModal} 
                      onSelectedDisponibiliteChange={onSelectedDisponibiliteChange}
                      recherchePlusTard={recherchePlusTard}
                  />
                  
              </div>
          )}
              <Footer onClose={closeModal} />
          </Modal>

          <Modal isOpen={reserverFormIsOpen} onRequestClose={closeReserverFormModal} contentLabel="Reserver Form Modal">
            <ReserverForm
              onClose={closeReserverFormModal}
              selectedDate={selectedDate}
              selectedTitle={selectedTitle}
              selectedPrestataire={selectedPrestataire}
              disponibilites={disponibilites}
              setDisponibilites={setDisponibilites}
              
              
            />
          </Modal>


            <Grid
              container
              item
              lg={12}
              mt={'10px'}>
              <Typography
                variant='body2'
                color={'grey400.main'}
              >
                Exemples:
                <Link
                  href="/rechercher?type=anniversaire"
                  variant='body2'
                  color={'grey400.main'}
                >Anniversaire
                </Link>,
                <Link
                  href="/rechercher?type=clown"
                  variant='body2'
                  color={'grey400.main'}
                >Clown</Link>,
                <Link
                  href="/rechercher?type=mariage"
                  variant='body2'
                  color={'grey400.main'}
                >Mariage</Link>,
                <Link
                  href="/rechercher?type=concert"
                  variant='body2'
                  color={'grey400.main'}
                >Concert</Link>,
                <Link
                  href="/rechercher?type=photographe"
                  variant='body2'
                  color={'grey400.main'}
                >Photographe</Link>
              </Typography>
            </Grid>

          </Grid>

        </Grid>
      </div>
    </>
  )
}