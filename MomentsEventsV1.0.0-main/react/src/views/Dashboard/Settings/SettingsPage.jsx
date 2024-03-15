import React from 'react';
import { Box, Button, Tab, Tabs, Snackbar } from '@mui/material';
import { grey } from '@mui/material/colors';
import MonProfil from './MonProfil';
import Paiement from './Paiement';
import MonCompte from './MonCompte';
import Alert from '@mui/material/Alert';
import SettingsIcon from '@mui/icons-material/Settings';


function SettingsPage() {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarType, setSnackbarType] = React.useState('success');

  const [value, setValue] = React.useState(() => {
    return parseInt(localStorage.getItem('activeTab') || '0', 10);
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem('activeTab', newValue);
  };

  const handleOpenSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setOpenSnackbar(true);

    localStorage.setItem('snackbarMessage', message);
    localStorage.setItem('snackbarType', type);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  React.useEffect(() => {
    // Récupérez l'état de la notification depuis le localStorage
    const message = localStorage.getItem('snackbarMessage');
    const type = localStorage.getItem('snackbarType');
    if (message && type) {
      handleOpenSnackbar(message, type);
      // Supprimez l'état de la notification du localStorage pour qu'il ne soit pas réutilisé
      localStorage.removeItem('snackbarMessage');
      localStorage.removeItem('snackbarType');
    }
  }, []);


  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '42px', marginBottom: '35px' }}>
        <SettingsIcon style={{ fontSize: '35px'}} />
        <h1 style={{ marginLeft: '10px' }}>Paramètres</h1>
      </div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '4px',
          margin: '0 42px',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
          aria-label="tabs example"
          TabIndicatorProps={{ style: { display: 'none' } }}
          sx={{
            '& .MuiTab-root': {
              '&.Mui-selected': {
                backgroundColor: grey[50],
                borderRight: `1px solid ${grey[200]}`,
              },
              whiteSpace: 'nowrap',
            },
          }}
        >
          <Tab label="Mon Profil" />
          <Tab label="Paiement" />
          <Tab label="Mon Compte" />
        </Tabs>
        <Box
          sx={{
            padding: 3,
            width: '100%',
            backgroundColor: grey[50],
          }}
        >
          {value === 0 && <MonProfil handleOpenSnackbar={handleOpenSnackbar} />}
          {value === 1 && <Paiement handleOpenSnackbar={handleOpenSnackbar} />}
          {value === 2 && <MonCompte handleOpenSnackbar={handleOpenSnackbar} />}
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position en haut à droite.
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarType}
          sx={{
            width: '100%',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SettingsPage;
