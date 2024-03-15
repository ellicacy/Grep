import React, { useState, useEffect } from 'react'
import { Grid, Typography, Link, IconButton } from '@mui/material'
import CartePrestation from './Carte.PrestationNew'
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";





export default function PrestationSimilaire(props) {

    const [prestations, setPrestations] = useState([])
    const [index, setIndex] = useState(0)

    useEffect(() => {
        setPrestations(props.prestations)
        console.log(props.prestations)
    }, [props.prestations])

    return (
        <>
            {/* Section "D'autres prestations similaires" */}
            <Grid
                container
                sx={{
                    m: '50px 0px 20px 0px'
                }}
            >
                {/* Titre */}
                <Grid
                    container
                    pb='30px'>
                    <Grid
                        container
                        item
                        xs={12}
                        sm={6}
                    >
                        <Typography
                            variant="h1"
                            id="autres-prestations-similaires"
                        >
                            D'autres prestations similaires
                        </Typography>
                    </Grid>
                    {/* Boutons de navigation */}
                    <Grid
                        container
                        item
                        xs={6}
                        justifyContent={'flex-end'}
                        alignItems={'center'}
                    >
                        <Link
                            href='/rechercher?type=prestations'
                            variant="subtitle1"
                            sx={{
                                textDecoration: 'none',
                                mr: '20px'
                            }}
                        >
                            Voir toutes les prestations
                        </Link>

                        <IconButton
                            aria-label="Précédent"
                            size='small'
                            onClick={(event) => {
                                event.preventDefault()
                                if (index > 0) {
                                    setIndex(index - 1)
                                }
                            }}
                        >
                            <BsArrowLeft
                                color={'#111827'}
                                size={30}
                            />
                        </IconButton>

                        <IconButton
                            aria-label="Suivant"
                            size='small'
                            onClick={(event) => {
                                event.preventDefault()
                                if (index < prestations.length - 4) {
                                    setIndex(index + 1)
                                }
                            }}
                        >
                            <BsArrowRight color={'#111827'} size={30} />
                        </IconButton>
                    </Grid>
                </Grid>
                {/* Cartes de prestation */}
                <Grid
                    key={"liste-cartes-prestations"}
                    // container
                    // item
                    // xs={12}
                    // mt={'30px'}
                    // mb={'200px'}
                    // justifyContent={'space-between'}
                    // alignItems={'center'}
                    container
                    columns={{
                        xs: 4,
                        sm: 8
                    }}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    maxWidth={'100%'}
                    rowSpacing={'20px'}
                >
                    {prestations.map(function (d, idx) {
                        if (idx == index || idx == index + 1 || idx == index + 2 || idx == index + 3) {
                            return (
                                <Grid item key={idx}>
                                    <CartePrestation prestation={d} key={idx} />
                                </Grid>
                            )
                        }
                    })}
                </Grid>
            </Grid>
        </>
    )
}