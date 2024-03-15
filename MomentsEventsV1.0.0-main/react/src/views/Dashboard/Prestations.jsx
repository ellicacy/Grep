import React from 'react';
import CartePrestation from '../../components/Prestation/Carte.PrestationNew';

function Prestations() {
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
