import { Button, Container, Grid, Paper } from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles';
import { TextField } from '@mui/material';
import { Link, Typography } from '@mui/material';
import theme from '../../theme';
import { useState } from 'react';
import axiosClient from '../../axios-client'
import DisponibilitesModal from '../../views/Dashboard/disponibilteModal.jsx';




export default function BarreRecherche() {
  const [dateRecherche, setDateRecherche] = useState("");
  const [lieuRecherche, setLieuRecherche] = useState("");
  const [typeRecherche, setTypeRecherche] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [disponibilites, setDisponibilites] = useState([]);
  
  const rechercherDisponibilites = async () => {
    try {
      const params = {};


      if (dateRecherche !== "") {
        // Vérifier si la date de recherche est de type journée
        const date = new Date(dateRecherche);
        const today = new Date();
        if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
          // Si la date de recherche est le jour même, inclure les heures du jour
          const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
          const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
          params.date = {
            $gte: startOfDay.toISOString(),
            $lte: endOfDay.toISOString()
          };
        } else {
          // Sinon, utiliser simplement la date fournie
          params.date = dateRecherche;
        }
      }
      if (lieuRecherche !== "") {
        params.lieu = lieuRecherche;
      }
      if (typeRecherche !== "") {
        params.type = typeRecherche;
      }
  
      console.log('Recherche des disponibilités avec les paramètres:', params);
      const response = await axiosClient.get('/availabilities', { params });
      console.log('Disponibilités trouvées:', response.data);
  
     
      console.log('Disponibilités trouvées:', response.data); 
      setDisponibilites(response.data);

      handleOpenModal();
    } catch (error) {
      console.error('Erreur lors de la recherche des disponibilités:', error);
    }
  };
  const handleClick = () => {
    rechercherDisponibilites();
  }
  const handleOpenModal = () => {
    setModalOpen(true);
  };

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
                  onChange={(e) => setTypeRecherche(e.target.value)}
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
              {modalOpen && (
                <DisponibilitesModal
                  disponibilites={disponibilites}
                  onClose={() => setModalOpen(false)}
                />
)}
            </Grid>

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