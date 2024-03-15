import React from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';

import { BsStarFill } from "react-icons/bs";
import { BsStar } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";

import { notes } from '../../outils/notes';



export default function CartePrestataire(props) {


    return (
        <>
            <Grid
                width={'180px'}
                maxWidth={'180px'}>
                <Grid
                    container
                    display='flex'
                    justifyContent='center'
                    alignContent='center'
                >
                    <Link href={'/prestataire/' + props.prestataire.idPersonne}>
                        <Avatar
                            sx={{ minWidth: '120px', height: '120px' }}
                        />
                    </Link>
                </Grid>

                <Grid container item xs={12} display='flex' justifyContent='center' alignContent='center' mt='20px'>
                    <Link href={'/prestataire/' + props.prestataire.idPersonne} sx={{ textDecoration: 'none' }}>
                        <Grid container item xs={12} display='flex' justifyContent='center' alignContent='center' >
                            <Typography variant='h2' maxWidth={'200px'} align='center' textAlign={'center'} minHeight={'45px'}>
                                {props.prestataire.personneNom} {props.prestataire.personnePrenom}
                            </Typography>
                        </Grid>

                        <Grid container item xs={12} display='flex' justifyContent='center' alignContent='center' mt='10px' height='24px'>

                            <Typography variant='body1'>
                                {props.prestataire.prestataireEntrepriseNom ? props.prestataire.prestataireEntrepriseNom : 'Titre'}
                            </Typography>

                        </Grid>

                        <Grid container item xs={12} display='flex' justifyContent='center' alignContent='center' mt='10px' height='16px'>
                            {notes(0)}
                        </Grid>
                    </Link>
                </Grid>
            </Grid>

        </>
    )
}
