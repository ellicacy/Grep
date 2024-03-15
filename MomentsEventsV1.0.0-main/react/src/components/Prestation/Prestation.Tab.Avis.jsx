import React from 'react';
import Avis from '../Avis/Avis';

export default function TabAvis(props) {
  
  return (
    <div>
      {props.reviews.map((avis, index) => (
        <Avis key={index} review={avis} />
      ))}
    </div>
  );
};