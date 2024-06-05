import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { BsHeart, BsCart3 } from 'react-icons/bs';

import { Button, IconButton, Grid, Container, Typography } from '@mui/material';
import { Link } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Badge } from '@mui/material';



import { useStateContext } from '../../contexts/ContextProvider';

import { useSelector } from 'react-redux';

export default function Header() {

  const { token, setToken } = useStateContext();
  const isConnected = token ? true : false;
  const [mobileHeader, setMobileHeader] = useState(false);
  const match = useMediaQuery(theme => theme.breakpoints.down('md'));
  const panier = useSelector(state => state.panier);
  const [nbPanier, setNbPanier] = useState(panier.packPanier.length);



  useEffect(() => {
    setMobileHeader(match);
    setNbPanier(panier.packPanier.length);
  }, [match, panier.packPanier]);

  return (
    <>
      <Grid
        id='Header'
        key='Header'
        item
        container
        sx={{ background: 'white', boxShadow: 1 }}
        width={'100vw'}
        alignContent={'center'}
        justifyContent={'center'}
        alignItems={'center'}
        padding={{ xs: '0px 20px 0px 20px', lg: '0px 0px 0px 0px' }}
      >
        <Grid
          id='Header-Content'
          key='Header-Content'
          container
          width={'1180px'}
        >
          <Grid item container height={80} alignItems="center">
            <Grid item xs={2}>
              <Link href="/" style={{ fontWeight: 700, fontSize: "18px", textDecoration: 'none' }}>Moments Events</Link>
            </Grid>
            {!mobileHeader && (
              <Grid item container direction="row" xs justifyContent="flex-start" alignItems="center">
                <Grid item xs={2}>
                  <Link href="/rechercher?type=musique" style={{ textDecoration: 'none' }} variant="subtitle1">Musique</Link>
                </Grid>
                <Grid item xs={2}>
                  <Link href="/rechercher?type=cuisine" style={{ textDecoration: 'none' }} variant="subtitle1">Cuisine</Link>
                </Grid>
                <Grid item xs={2}>
                  <Link href="/rechercher?type=anniversaire" style={{ textDecoration: 'none' }} variant="subtitle1">Anniversaire</Link>
                </Grid>
              </Grid>
            )}
            <Grid container item xs justifyContent="flex-end" alignItems="center">
              {!isConnected && (
                <Grid item sm={2.4} md={2.9} lg={2.4}>
                  <Link href="/login" style={{ textDecoration: 'none' }} variant="subtitle1">Se connecter</Link>
                </Grid>
              )}
              {isConnected && (
                <Grid item sm={2.4} md={2.9} lg={2.4}>
                  <Link href="/reservations" style={{ textDecoration: 'none' }} variant="subtitle1">Mon profil</Link>
                </Grid>
              )}
              <Grid item xs={1}>
                <IconButton href='/favoris'>
                  <BsHeart width={30} height={24} color='#111827' />
                </IconButton>
              </Grid>
              <Grid item xs={1}>
                <IconButton href='/panier'>
                  <Badge badgeContent={nbPanier} color="primary">
                    <BsCart3 width={30} height={24} color='#111827' />
                  </Badge>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

