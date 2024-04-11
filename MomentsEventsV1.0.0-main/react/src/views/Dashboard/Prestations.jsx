import React, { useState, useEffect } from "react";
import CartePrestation from '../../components/Prestation/Carte.PrestationNew';
import axiosClient from '../../axios-client'

function Prestations() {
  const [isOpen, setIsOpen] = useState(false);
  const [prestations, setPrestations] = useState([]);
  const [userId, setUserId] = useState(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const fetchPrestations = async () => {
    console.log('Récupération des prestations...');
    try {
      const prestationsResponse = await axiosClient.get('/prestations');
      const userActuel = JSON.parse(localStorage.getItem('USER'));
      
      if (userActuel) {
        const userId = userActuel.idPersonne;
        setUserId(userId);
        console.log('User actuel :', userActuel);
        const prestationsUser = prestationsResponse.data.filter(prestation => prestation.id_user === userId);
        setPrestations(prestationsUser);
        console.log('Prestations récupérées avec succès :', prestationsUser);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des prestations :', error);
    }
  };


  const exemplePrestation = {
    id: 1,
    nom: "Massage relaxant",
    description: "Un massage relaxant pour détendre vos muscles et vous libérer du stress. Idéal après une longue journée de travail.",
    photo: "avatars/default.jpeg", // Remplacez par l'URL de votre image
    categories: [{ nom: "Bien-être" }],
    lieu: "Paris"
  };

  useEffect(() => {
    fetchPrestations();
  }
    , []);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '42px', marginBottom: '35px' }}>
        <h1 style={{ marginLeft: '00px' }}>Prestations</h1>
        <button onClick={handleOpen} style={{ marginLeft: 'auto', marginRight: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' } }>Ajouter une prestation</button>
        {isOpen && <CartePrestation onClose={handleClose} />}
    </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {prestations.map(prestation => <CartePrestation prestation={prestation} />)}
      </div>
    </div>
  );
}

export default Prestations;
