import React from 'react';
import { TextField, Button, Avatar } from '@mui/material';
import { grey } from '@mui/material/colors';
import axiosClient from '../../../axios-client';
import SaveIcon from '@mui/icons-material/Save';

function MonProfil({ handleOpenSnackbar }) {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [professions, setProfessions] = React.useState([]);
  const [newProfession, setNewProfession] = React.useState('');



  // Initialisation de l'état avec des chaînes vides
  const [formData, setFormData] = React.useState({
    personnePrenom: '',
    personneNom: '',
    clientVille: '',
    professions: '',
    personneDescription: '',
    avatarUrl: '',
  });

  React.useEffect(() => {
    // Charger les données de l'utilisateur
    axiosClient.get('/user/settings')
      .then(response => {
        setFormData(prevState => ({
          ...prevState,
          ...response.data,
        }));
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la récupération des données', error);
        console.error('Détails de l\'erreur:', error.response);
      });

    // Charger l'avatar depuis la BDD
    axiosClient.get('/user/avatar')
      .then(response => {
        setFormData(prevState => ({
          ...prevState,
          avatarUrl: response.data.avatar_url,
        }));
      })
      .catch(error => {
        const errorMessage = error.response?.data?.message || 'Une erreur inconnue s\'est produite pendant le chargement de votre avatar.';
        handleOpenSnackbar(errorMessage, 'error');
      });
  }, []);


  // Fonction pour mettre à jour les données dans la base de données
  const handleUpdateProfile = () => {
    axiosClient.post('/user/profile', formData)
      .then(() => {
        handleOpenSnackbar('Votre profil a bien été mis à jour !', 'success');
      })
      .catch(error => {
        const errorMessage = error.response?.data?.message || 'Une erreur inconnue s\'est produite pendant la mise à jour de votre profil.';
        handleOpenSnackbar(errorMessage, 'error');
      });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);

    const newFormData = new FormData();
    newFormData.append('avatar', event.target.files[0]);

    axiosClient.post('/user/avatar', newFormData)
      .then(response => {
        setFormData(prevState => ({
          ...prevState,
          avatarUrl: response.data.avatar_url, // Assurez-vous que c'est la clé correcte
        }));
        handleOpenSnackbar('Votre avatar a bien été modifié !', 'success');
      })
      .catch(error => {
        const errorMessage = error.response?.data?.message || 'Une erreur inconnue s\'est produite pendant la modification de votre avatar.';
        handleOpenSnackbar(errorMessage, 'error');
      });
  };

  const handleEditPhotoClick = () => {
    document.getElementById('avatarInput').click();
  };

  const handleAddProfession = () => {
    if (newProfession.trim() !== '') {
      setProfessions([...professions, newProfession.trim()]);
      setNewProfession(''); // Réinitialiser la nouvelle profession
    }
  };


  const handleDeleteProfession = (index) => {
    // Supprimer la profession à l'index donné
    const newProfessions = professions.slice();
    newProfessions.splice(index, 1);
    setProfessions(newProfessions);
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '-20px', marginRight: '42px', marginTop: '22px' }}>
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ width: 125, height: 125, marginBottom: '10px' }} src={formData.avatarUrl} />
        <input
          type="file"
          id="avatarInput"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <span style={{ color: grey[400], cursor: 'pointer' }} onClick={handleEditPhotoClick}>Éditer la photo</span>
      </div>
      <div style={{ flex: '2', marginLeft: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '15px' }}>
          <TextField
            value={formData.personnePrenom}
            onChange={e => setFormData({ ...formData, personnePrenom: e.target.value })}
            label="Prénom"
            variant="filled"
            color="primary"
            sx={{ flex: '1', borderRadius: '4px', backgroundColor: grey[50], marginRight: '10px' }}
          />
          <TextField
            value={formData.personneNom}
            onChange={e => setFormData({ ...formData, personneNom: e.target.value })}
            label="Nom"
            variant="filled"
            color="primary"
            sx={{ flex: '1', borderRadius: '4px', backgroundColor: grey[50] }}
          />
        </div>
        <TextField
          value={formData.clientVille}
          onChange={e => setFormData({ ...formData, clientVille: e.target.value })}
          fullWidth
          label="Localité"
          variant="filled"
          color="primary"
          sx={{ borderRadius: '4px', backgroundColor: grey[50], marginBottom: '15px' }}
        />

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', marginBottom: '15px' }}>
          <TextField
            value={newProfession}
            onChange={e => setNewProfession(e.target.value)}
            label="Ajouter une profession"
            variant="filled"
            color="primary"
            sx={{ flex: '1', borderRadius: '4px', backgroundColor: grey[50], marginRight: '10px' }}
          />
          <Button variant="contained" color="primary" sx={{ height: '56px', alignSelf: 'flex-end', fontSize: '16px' }} onClick={handleAddProfession}>
            +
          </Button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '15px' }}>
          {professions.map((profession, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '5px 10px', border: '1px solid grey', borderRadius: '4px', marginRight: '10px', marginBottom: '10px' }}>
              <span style={{ marginRight: '5px' }}>{profession}</span>
              <span style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDeleteProfession(index)}>×</span>
            </div>
          ))}
        </div>


        <TextField
          value={formData.prestataireDescription}
          onChange={e => setFormData({ ...formData, prestataireDescription: e.target.value })}
          fullWidth
          label="Description"
          variant="filled"
          color="primary"
          multiline
          rows={5}
          sx={{ flex: '1', borderRadius: '4px', backgroundColor: grey[50], marginBottom: '15px' }}
        />
        <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleUpdateProfile}>
          Enregistrer
        </Button>
      </div>
    </div>
  );
}

export default MonProfil;
