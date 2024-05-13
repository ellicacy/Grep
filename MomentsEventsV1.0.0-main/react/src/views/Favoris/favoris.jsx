import React from "react";
import { useEffect, useState } from "react";

import Header from "../../components/Navigation/Header";
import BottomPage from "../../components/Navigation/BottomPage";
import CartePrestation from "../../components/Prestation/Carte.PrestationNew";
import CartePrestataire from "../../components/Prestataire/Carte.Prestataire";


import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";



export default function Favoris(props) {

    const statePrestations = useSelector(state => state.panier.favorisPrestations)
    const statePrestataires = useSelector(state => state.panier.favorisPrestataires)
    const [prestations, setPrestations] = useState([])
    const [prestataires, setPrestataires] = useState([])


    useEffect(() => {
        setPrestations(statePrestations)
        setPrestataires(statePrestataires)
    }, [statePrestations, statePrestataires])

    return (
        <>
            <Grid container direction="column" sx={{ minHeight: "100vh" }}>
                {/* En-tête */}
                <Grid item>
                    <Header />
                </Grid>
                {/* Section principale */}
                <Grid item sx={{ flex: 1 }}>

                    <Container>

                        <Typography variant="h1" mt="50px" tabIndex="0">
                            Mes favoris
                        </Typography>

                        <Grid container item xs={12} spacing={2}>
                            <Grid item >
                                <Typography variant="h2" tabIndex="0" mt='30px'>
                                    Prestations
                                </Typography>
                            </Grid>
                            <Grid item container mt='20px'>
                                {prestations.map(prestation => (
                                    <Grid key={`prestation-${prestation.id}`} item xs={12} sm={6} md={4}>
                                        <CartePrestation prestation={prestation} />
                                    </Grid>
                                ))}
                            </Grid>

                            <Grid item>
                                <Typography variant="h2" tabIndex="0" mt='30px'>
                                    Prestataires
                                </Typography>
                            </Grid>
                            <Grid item container mt='20px'>
                                {prestataires.map(prestataire => (
                                    <Grid key={`prestataire-${prestataire.idPersonne}`} item xs={12} sm={6} md={4}>
                                        <CartePrestataire prestataire={prestataire} />
                                    </Grid>
                                ))}
                            </Grid>

                        </Grid>
                    </Container>
                </Grid>
                <Grid item>
                    <BottomPage sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} />
                </Grid>
            </Grid>
        </>
    );
}
