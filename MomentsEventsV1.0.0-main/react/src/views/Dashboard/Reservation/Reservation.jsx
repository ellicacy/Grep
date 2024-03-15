import React from 'react';
import { Tabs, Tab, Box, Badge, Link } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import ReservationAnnule from './ReservationAnnule';
import ReservationAvenir from './ReservationAvenir';
import ReservationDemande from './ReservationDemande';

import EventNoteIcon from '@mui/icons-material/EventNote';

function Reservations() {
  const { tab } = useParams();
  const navigate = useNavigate();

  const [tabValue, setTabValue] = React.useState(
    tab === 'demandes' ? 0 : tab === 'a-venir' ? 1 : tab === 'annule' ? 2 : 0
  );

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/reservations/demandes');
        break;
      case 1:
        navigate('/reservations/a-venir');
        break;
      case 2:
        navigate('/reservations/annule');
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    setTabValue(
      tab === 'demandes' ? 0 : tab === 'a-venir' ? 1 : tab === 'annule' ? 2 : 0
    );
  }, [tab]);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '42px', marginBottom: '35px' }}>
        <EventNoteIcon style={{ fontSize: '35px' }} />
        <h1 style={{ marginLeft: '10px' }}>Réservations</h1>
      </div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '4px',
          margin: '0 42px',
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
          TabIndicatorProps={{ style: { display: 'none' } }}
          sx={{
            '& .MuiTab-root': {
              flexGrow: 1,
              minWidth: '175px',
              '&.Mui-selected': {
                backgroundColor: grey[50],
              },
              whiteSpace: 'nowrap',
            },
          }}
        >
          <Tab label={
            <Badge badgeContent={12} color="secondary" showZero sx={{ '& .MuiBadge-badge': { right: -20, top: 5 } }}>
              Demandes
            </Badge>
          } />
          <Tab label={
            <Badge badgeContent={6} color="secondary" showZero sx={{ '& .MuiBadge-badge': { right: -20, top: 5 } }}>
              À venir
            </Badge>
          } />
          <Tab label={
            <Badge badgeContent={0} color="secondary" showZero sx={{ '& .MuiBadge-badge': { right: -20, top: 5 } }}>
              Annulé
            </Badge>
          } />
        </Tabs>
        <Box
          sx={{
            padding: 3,
            width: '100%',
            backgroundColor: grey[50],
          }}
        >
          {tabValue === 0 && <ReservationDemande />}
          {tabValue === 1 && <ReservationAvenir />}
          {tabValue === 2 && <ReservationAnnule />}
        </Box>
      </Box>
    </div>
  );
}

export default Reservations;
