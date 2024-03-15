import React, { useEffect } from 'react';
import { useState } from 'react';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';

import CartePrestataire from '../Prestataire/Carte.Prestataire';

import { BiLeftArrowAlt } from "react-icons/bi";
import { BiRightArrowAlt } from "react-icons/bi";


import {
    BsArrowRight,
    BsArrowLeft,
    BsCheckCircle,
    BsExclamationTriangle,
    BsDot,
} from "react-icons/bs";


export default function SelectionPrestataire(props) {

    const [index, setIndex] = useState(0);

    const [prestataires, setPrestataires] = useState([])
    const [users, setUsers] = useState([])

    // console.log(props.prestataire)

    useEffect(() => {
        setPrestataires(props.prestataires)
    }, [props.prestataires, index])

    return (
        <>
            <Grid
                id='Selection-Prestataire'
                key='Selection-Prestataire'
                container
                width={'100%'}
                alignContent={'center'}
                justifyContent={'center'}
                alignItems={'center'}
                padding={{ xs: '0px 20px 0px 20px', lg: '0px 0px 0px 0px' }}
            >
                <Grid
                    id='Selection-Prestataire-Content'
                    key='Selection-Prestataire-Content'
                    container
                    mt='100px'
                    width={'1180px'}
                >
                    <Grid container lg={8}>
                        <Typography variant='h1' gutterBottom>Meilleurs prestataires</Typography>
                    </Grid>
                    <Grid container lg={4} alignItems="center" justifyContent="flex-end">
                        <Grid item>
                            <Link href="/rechercher?type=prestataire" style={{ fontSize: '12px', textDecoration: 'none', alignSelf: 'center', color: 'black' }}>Voir tous les prestataires</Link>
                        </Grid>
                        <Grid item>
                            <IconButton
                                size="large"
                                disabled={index == 0}
                                aria-label="Glisser les prestations vers la gauche"
                                key="arrow-left-prestations"
                                onClick={() => {
                                    if (index > 0) {
                                        setIndex(index - 1);
                                    }
                                }}
                            >
                                <BsArrowLeft fontSize='large' />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton
                                disabled={index == prestataires.length - 5}
                                size="large"
                                aria-label="Glisser les prestations vers la droite"
                                key="arrow-right-prestations"
                                onClick={() => {
                                    if (index < prestataires.length - 5) {
                                        setIndex(index + 1);
                                    }
                                }}
                            >
                                <BsArrowRight fontSize='large' />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid
                        id='cartes-prestataires'
                        key='cartes-prestataires'
                        container
                        columns={{
                            xs: 4,
                            sm: 8
                        }}
                        display="flex"
                        alignItems="center"
                        justifyContent={{xs:'center', md:"space-between"}}
                        maxWidth={'100%'}
                        columnSpacing={{xs: '20px', md: '0px'}}
                        rowSpacing={'20px'}
                    >
                        {prestataires.map(function (prestataire, idx) {
                            if (idx == index && prestataire.role === 'prestataire' || idx == index + 1 && prestataire.role === 'prestataire' || idx == index + 2 && prestataire.role === 'prestataire' || idx == index + 3 && prestataire.role === 'prestataire' || idx == index + 4 && prestataire.role === 'prestataire') {
                                return (
                                    <Grid item key={idx}>
                                        <CartePrestataire
                                            prestataire={prestataire}
                                            aria-labelledby={
                                                "prestataire-title-" + idx
                                            }
                                        />
                                    </Grid>
                                );
                            }
                        })}
                    </Grid>
                </Grid>

            </Grid>

        </>
    )
}
