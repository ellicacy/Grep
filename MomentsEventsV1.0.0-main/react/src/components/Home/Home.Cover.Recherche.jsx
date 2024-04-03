import { Button, Container, Grid, Paper } from '@mui/material'
import React from 'react'
import { TextField } from '@mui/material';
import { Link, Typography } from '@mui/material';
import theme from '../../theme';
import { useState } from 'react';
import axiosClient from '../../axios-client'
import DisponibilitesModal from '../../views/Dashboard/disponibilteModal.jsx';
import Modal from "react-modal";
import { set } from 'date-fns';




export default function BarreRecherche() {
  const [dateRecherche, setDateRecherche] = useState("");
  const [lieuRecherche, setLieuRecherche] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [typeRecherche, setTypeRecherche] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [disponibilites, setDisponibilites] = useState([]);
  const [prestations, setPrestations] = useState([]);
  const [events, setEvents] = useState([]);
  
  const capitalizeFirstLetter = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };
  
  const openModal = () => {
    setModalIsOpen(true);
};

const closeModal = () => {
    setModalIsOpen(false);
};
const rechercherDisponibilites = async () => {
  try {
    // Récupérer les prestations depuis l'API
    const prestationsResponse = await axiosClient.get('/prestations');
    const prestations = prestationsResponse.data;

    // Récupérer toutes les disponibilités depuis l'API
    const availabilitiesResponse = await axiosClient.get('/availabilities');
    const allAvailabilities = availabilitiesResponse.data;

    console.log('Disponibilités trouvées:', allAvailabilities);

    // Filtrer les disponibilités en fonction des critères de recherche
    const filteredAvailabilities = allAvailabilities.filter(availability => {
      // Vérifier si la date de la disponibilité correspond à la date de recherche
      if (dateRecherche !== "") {
        const selectedDate = new Date(dateRecherche);
        const availabilityDate = new Date(availability.dateTime);
        if (availabilityDate.setHours(0, 0, 0, 0) !== selectedDate.setHours(0, 0, 0, 0)) {
          return false;
        }
      }

      // Vérifier si le lieu de la disponibilité correspond au lieu de recherche
      if (lieuRecherche !== "" && availability.lieu !== lieuRecherche) {
        return false;
      }

      // Vérifier si le type de la disponibilité correspond au type de recherche
      if (typeRecherche !== "" && prestations.find(prestation => prestation.nom === typeRecherche).id !== availability.idPrestation) {
        return false;
      }

      // Si tous les critères correspondent, conserver la disponibilité
      return true;
    });

    console.log('Disponibilités filtrées:', filteredAvailabilities);

    // Formater les disponibilités filtrées dans le format attendu par FullCalendar
    const formattedEvents = filteredAvailabilities.map(availability => ({
      title: prestations.find(prestation => prestation.id === availability.idPrestation).nom,
      dateTime: availability.dateTime, 
    }));

    console.log('Événements formatés:', formattedEvents);

    // Mettre à jour l'état des disponibilités avec les données formatées
    setDisponibilites(formattedEvents);

    // Ouvrir le modal après avoir filtré les disponibilités
    openModal();
  } catch (error) {
    console.error('Erreur lors de la recherche des disponibilités:', error);
    alert('Il n\' y a pas d\'évenement disponible.');
  }
};
  const handleClick = () => {
    rechercherDisponibilites();
  }

  


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
                    overflow: "auto", // Permet le défilement lorsque le contenu dépasse la taille du modal
                    WebkitOverflowScrolling: "touch",
                    borderRadius: "4px",
                    outline: "none",
                    padding: "20px",
                    width: "auto",
                    maxHeight: "80vh" 
                  },
              }}
          >
            <DisponibilitesModal disponibilites={disponibilites} />
            <button onClick={closeModal}>
              Fermer
              </button>
            
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