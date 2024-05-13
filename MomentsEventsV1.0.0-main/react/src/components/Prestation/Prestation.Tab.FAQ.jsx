import React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { BsChevronUp } from "react-icons/bs";

const faqData = [
  {
    question: "Quels types de spectacles ou d'animations proposez-vous pour les événements ?",
    answer:
      "Je propose une variété de spectacles et d'animations, notamment des numéros de jonglerie, des tours de magie, des sketches humoristiques, des sculptures de ballons et des jeux interactifs pour les enfants et les adultes.",
  },
  {
    question: "Combien de temps dure généralement votre prestation lors d'un événement ?",
    answer:
      "Mes prestations peuvent être adaptées en fonction de vos besoins et de la durée de l'événement. En général, mes spectacles durent entre 30 minutes et 1 heure, tandis que les animations peuvent s'étendre sur plusieurs heures selon vos préférences.",
  },
  {
    question: "Quel espace ou équipement avez-vous besoin pour votre prestation ?",
    answer:
      "Pour mes spectacles, j'ai besoin d'un espace dégagé d'au moins 3 mètres sur 3 mètres, avec une hauteur minimale de 2,5 mètres pour les numéros de jonglerie. Si une sonorisation est nécessaire, je peux apporter mon propre matériel. Pour les animations, un espace ouvert et sécurisé pour les participants est suffisant.",
  },
  // Ajoutez autant de questions et réponses que nécessaire
];

const FAQ = () => {
  return (
    <div style={{ minHeight: '40vh' }}>
      {faqData.map((item, index) => (
        <Box key={index} sx={{ borderTop: index === 0 ? 'none' : '1px solid', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Accordion elevation={0}>
            <AccordionSummary
              expandIcon={<BsChevronUp />}
              aria-controls={`panel${index + 1}-content`}
              id={`panel${index + 1}-header`}
            >
              <Typography variant='h2'>{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant='body1'>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      ))}
    </div>
  );
};

export default FAQ;
