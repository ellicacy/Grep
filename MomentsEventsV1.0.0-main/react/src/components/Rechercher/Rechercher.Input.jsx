import { Button, Container, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';

export default function SearchBar() {
  const [occasion, setOccasion] = useState('');
  const [date, setDate] = useState('');
  const [lieu, setLieu] = useState('');

  const handleOccasionChange = (event) => {
    setOccasion(event.target.value);
  }

  const handleDateChange = (event) => {
    setDate(event.target.value);
  }

  const handleLieuChange = (event) => {
    setLieu(event.target.value);
  }

  const handleSearchButtonClick = () => {
    // const searchUrl = `http://127.0.0.1:3000/rechercher?occasion=${encodeURIComponent(occasion)}&date=${encodeURIComponent(date)}&lieu=${encodeURIComponent(lieu)}`;
    const searchUrl = `http://localhost:3000/rechercher?occasion=${encodeURIComponent(occasion)}&date=${encodeURIComponent(date)}&lieu=${encodeURIComponent(lieu)}`;
    window.location.href = searchUrl;
  }

  return (
    <Grid style={{ background: '#E5E7EB' }}>
      <Container>
        <Grid container lg={12} sx={{ padding: '30px 0px 30px 0px' }}>
          <Grid item>
            <TextField
              id="champ-texte-recherche-evenement"
              autoComplete="evenement"
              placeholder="Pour quelle occasion ?"
              size="small"
              sx={{ background: 'white' }}
              value={occasion}
              onChange={handleOccasionChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="champ-texte-recherche-date"
              type='date'
              autoComplete="date"
              size="small"
              sx={{ background: 'white' }}
              value={date}
              onChange={handleDateChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="champ-texte-recherche-lieu"
              placeholder="Lieu"
              autoComplete="ville"
              size="small"
              sx={{ background: 'white' }}
              value={lieu}
              onChange={handleLieuChange}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#111827',
                color: '#FFFFFF',
                height: '37px'
              }}
              onClick={handleSearchButtonClick}
            >
              Rechercher
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}
