// Avis.js
import React, { useState } from 'react';
import { Avatar, Typography, Box, Card, CardContent, CardHeader, IconButton } from '@mui/material';


const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const Avis = (props) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Card key={props.review.id} sx={{ marginBottom: '20px' }}>
      <CardHeader
        avatar={<Avatar  />}
        action={
          <IconButton aria-label="settings" onClick={toggleExpanded}>

          </IconButton>
        }
        title={`${"Françis"} ${"Test"}.`}
        subheader={`Note : ${props.review.note}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {expanded ? props.review.commentaire : truncateText(props.review.commentaire, 250)}
          {!expanded && props.review.commentaire.length > 250 && (
            <span style={{ color: 'blue', cursor: 'pointer' }} onClick={toggleExpanded}>
              {' '}
              Voir plus...
            </span>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Avis;

