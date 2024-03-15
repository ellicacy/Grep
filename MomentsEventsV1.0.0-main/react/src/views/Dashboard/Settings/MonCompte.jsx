import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import axiosClient from '../../../axios-client';
import SaveIcon from '@mui/icons-material/Save';

function MonCompte({ handleOpenSnackbar }) {
  const [formData, setFormData] = useState({
    personneNom: '',
    personnePrenom: '',
    personneLogin: '',
    clientVille: '',
    clientCodePostal: '',
    clientRue: '',
  });

  // Update l'user au clic du btn
  const handleSave = () => {
    axiosClient.post('/user/settings', formData)
      .then(() => {
        window.location.reload();
        handleOpenSnackbar('Vos informations personnelles ont bien été modifiées !', 'success');
      })
      .catch(error => {
        const errorMessage = error.response?.data?.message || 'Une erreur inconnue s\'est produite';
        handleOpenSnackbar(errorMessage, 'error');
      });
  };

  // Recup les données de l'user
  useEffect(() => {
    axiosClient.get('/user/settings')
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la récupération des données', error);
        console.error('Détails de l\'erreur:', error.response);
      });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '42px', marginRight: '42px', marginTop: '22px' }}>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginBottom: '15px' }}>
        <TextField
          value={formData.personneNom}
          onChange={e => setFormData({ ...formData, personneNom: e.target.value })}
          style={{ width: '48%' }} label="Nom" variant="filled" color="primary" sx={{ borderRadius: '4px', backgroundColor: grey[50] }} />
        <TextField
          value={formData.personnePrenom}
          onChange={e => setFormData({ ...formData, personnePrenom: e.target.value })}
          style={{ width: '48%' }} label="Prénom" variant="filled" color="primary" sx={{ borderRadius: '4px', backgroundColor: grey[50] }} />
      </div>
      <TextField
        value={formData.personneLogin}
        onChange={e => setFormData({ ...formData, personneLogin: e.target.value })}
        fullWidth label="E-mail" variant="filled" color="primary" sx={{ borderRadius: '4px', backgroundColor: grey[50], marginBottom: '15px' }} />
      <TextField
        value={formData.clientVille}
        onChange={e => setFormData({ ...formData, clientVille: e.target.value })}
        fullWidth label="Localité" variant="filled" color="primary" sx={{ borderRadius: '4px', backgroundColor: grey[50], marginBottom: '15px' }} />
      <TextField
        value={formData.clientCodePostal}
        onChange={e => setFormData({ ...formData, clientCodePostal: e.target.value })}
        fullWidth type="number" label="NPA" variant="filled" color="primary" sx={{ borderRadius: '4px', backgroundColor: grey[50], marginBottom: '15px' }} />
      <TextField
        value={formData.clientRue}
        onChange={e => setFormData({ ...formData, clientRue: e.target.value })}
        fullWidth label="Adresse" variant="filled" color="primary" sx={{ borderRadius: '4px', backgroundColor: grey[50], marginBottom: '15px' }} />
      <TextField
        value={formData.clientTelephone} // Assumant que c'est le nom correct dans l'objet formData
        onChange={e => setFormData({ ...formData, clientTelephone: e.target.value })}
        fullWidth label="Téléphone" variant="filled" color="primary" sx={{ borderRadius: '4px', backgroundColor: grey[50], marginBottom: '15px' }} />
      <Button variant="contained" color="primary" onClick={handleSave} startIcon={<SaveIcon />}>
        Enregistrer
      </Button>
    </div>
  );
}

export default MonCompte;
