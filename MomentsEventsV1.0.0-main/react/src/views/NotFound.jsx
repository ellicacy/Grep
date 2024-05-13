import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { purple } from '@mui/material/colors';
import Header from '../components/Navigation/Header';

//Create handleOnClick function to redirect to home page
const handleOnClick = () => {
 window.location.href = '/home';
}


export default function NotFound() {
  return (
    <>
    <Box sx={{minHeight: '100vh'}}>
      <Header />
      
      <Grid
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '80vh',
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h1" style={{ color: 'black' }}>
          Erreur 404
        </Typography>
        <Typography variant="h6" style={{ color: 'black' }}>
          Oups. La page que vous recherchez n'existe pas encore. Nos artisans sont en train de la créer. Restez bien connecté !
        </Typography>
        <Grid mt={10}>
          <Button variant="contained" size='large' style={{background: 'grey', color:'white'}} onClick={handleOnClick}>Retour à la page d'accueil</Button>
        </Grid>
      </Grid>
    </Box>
    </>
  );
}
