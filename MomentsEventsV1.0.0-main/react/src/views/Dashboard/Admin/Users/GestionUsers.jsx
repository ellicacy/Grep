import React from 'react';
import { Button, Box, Tab, Tabs, Snackbar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';


import { grey } from '@mui/material/colors';
import UsersActifs from './UsersActifs'; // Assurez-vous que le chemin est correct
import UsersSupprimes from './UsersSupprimes'; // Assurez-vous que le chemin est correct
import GroupIcon from '@mui/icons-material/Group';
import Alert from '@mui/material/Alert';

function GestionUsers() {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarType, setSnackbarType] = React.useState('success');

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: '42px', marginRight: '42px', marginBottom: '35px', paddingTop: '42px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <GroupIcon style={{ fontSize: '35px' }} />
          <h1 style={{ marginLeft: '10px' }}>Gestion des utilisateurs</h1>
        </Box>
        <RouterLink to='/admin/users/new'>
    <Button variant="contained" color="primary">Créer utilisateur</Button>
</RouterLink>

      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '4px',
          margin: '0 42px',
          overflow: 'hidden',
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
          <Tab label="Actifs" />
          <Tab label="Supprimés" />
        </Tabs>
        <Box
          sx={{
            padding: 0,
            width: '100%',
            backgroundColor: grey[50],
          }}
        >
          {value === 0 && <UsersActifs />}
          {value === 1 && <UsersSupprimes />}
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
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

export default GestionUsers;
