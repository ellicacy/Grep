import React from 'react';
import { TextField, Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import axiosClient from '../../../axios-client';
import SaveIcon from '@mui/icons-material/Save';

function Paiement({ handleOpenSnackbar }) {
  const [formData, setFormData] = React.useState({
    prestataireBanque: '',
    prestataireIBAN: '',
  });

  // Récupérer les données de l'utilisateur
  React.useEffect(() => {
    axiosClient.get('/user/settings')
      .then(response => {
        setFormData({
          prestataireBanque: response.data.prestataireBanque || '',
          prestataireIBAN: response.data.prestataireIBAN || '',
        });
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la récupération des données', error);
        console.error('Détails de l\'erreur:', error.response);
      });
  }, []);

  // Mettre à jour les données de l'utilisateur au clic du bouton
  const handleSave = () => {
    console.log('Données envoyées:', formData);
    axiosClient.post('/user/settings/bank', formData)
      .then(response => {
        handleOpenSnackbar('Vos informations bancaires ont bien été modifiées !', 'success');
      })
      .catch(error => {
        const errorMessage = error.response?.data?.message || 'Une erreur inconnue s\'est produite';
        handleOpenSnackbar(errorMessage, 'error');
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '42px', marginRight: '42px', marginTop: '22px' }}>
      <TextField
        value={formData.prestataireBanque}
        onChange={e => setFormData({ ...formData, prestataireBanque: e.target.value })}
        fullWidth label="Banque" variant="filled" color="primary" sx={{ borderRadius: '4px', backgroundColor: grey[50], marginBottom: '15px' }} />
      <TextField
        value={formData.prestataireIBAN}
        onChange={e => setFormData({ ...formData, prestataireIBAN: e.target.value })}
        fullWidth label="Coordonnées bancaires (IBAN)" variant="filled" color="primary" sx={{ borderRadius: '4px', backgroundColor: grey[50], marginBottom: '15px' }} />
      <Button variant="contained" color="primary" onClick={handleSave} startIcon={<SaveIcon />}>
        Enregistrer
      </Button>
    </div>
  );
}

export default Paiement;
