import React, { useState } from 'react';
import CartePrestation from '../../components/Prestation/Carte.PrestationNew';

function Prestations() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const exemplePrestation = {
    id: 1,
    nom: "Massage relaxant",
    description: "Un massage relaxant pour détendre vos muscles et vous libérer du stress. Idéal après une longue journée de travail.",
    photo: "avatars/default.jpeg", // Remplacez par l'URL de votre image
    categories: [{ nom: "Bien-être" }],
    lieu: "Paris"
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '42px', marginBottom: '35px' }}>
        <h1 style={{ marginLeft: '00px' }}>Prestations</h1>
        <button onClick={handleOpen} style={{ marginLeft: 'auto', marginRight: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' } }>Ajouter une prestation</button>
        {isOpen && <CartePrestation onClose={handleClose} />}
    </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        <CartePrestation prestation={exemplePrestation} />
        <CartePrestation prestation={exemplePrestation} />
        <CartePrestation prestation={exemplePrestation} />
        <CartePrestation prestation={exemplePrestation} />
        <CartePrestation prestation={exemplePrestation} />
        <CartePrestation prestation={exemplePrestation} />
        <CartePrestation prestation={exemplePrestation} />
      </div>
    </div>
  );
}

export default Prestations;
