import React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { BiLeftArrowAlt } from "react-icons/bi";
import { BiRightArrowAlt } from "react-icons/bi";
import CartePrestation from "../Prestation/Carte.Prestation";
import { random } from "lodash";
import { useEffect } from "react";
import { StyleSheetManager } from "styled-components";
import BoutonRecherche from "./Rechercher.button";
import axiosClient from "../../axios-client";
import CartePrestationNew from "../Prestation/Carte.PrestationNew";
import { useSelector } from "react-redux";
import CarteCategorie from "../Categorie/Carte.Categorie";
import CartePrestataire from "../Prestataire/Carte.Prestataire";


export default function SearchResult(props) {

    const urlSearchParams = new URLSearchParams(window.location.search);
    const type = urlSearchParams.get('type');

    const [loading, setLoading] = useState(true);

    const [nbMax, setNbMax] = useState(4);

    const handleClick = () => {
        setNbMax(nbMax + 4);
    };


    const typeObject = () => {
        if (type === 'prestataire') {
            return 'prestataire'
        } else if (type === 'categorie') {
            return 'categorie'
        }
        else if (type === 'prestation') {
            return 'prestation'
        }
    }
    //-----------------------------------------------------------------------------
    useEffect(() => {
        if (props.prestations.length > 0 && props.categories.length > 0 && props.prestataires.length > 0) {
            setLoading(false)
        }
        // console.log(type);
    }, [props])

    return (

        <>
            <Grid
                id='Recherche-Resultat'
                key='Recherche-Resultat'
                container
                width={'100%'}
                alignContent={'center'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Grid
                    id='Recherche-Resultat-Content'
                    key='Recherche-Resultat-Content'
                    container
                    mt='100px'
                    width={'1180px'}
                >
                    <Typography variant="h4" component="h1" m={'50px 0px 20px 0px'}>
                        Résultats de la recherche
                    </Typography>
                    <Grid container mb={'30px'}>
                        <Grid container xs={8} >
                            <BoutonRecherche categories={props.categories} />
                        </Grid>
                        <Grid container xs={4} justifyContent='flex-end' alignItems={'center'}>

                        </Grid>
                    </Grid>

                    {typeObject() === 'prestataire' ? (
                        <>
                            <Grid
                                id='prestataire-cards'
                                key='prestataire-cards'
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
                                {props.prestataires.map((prestataire, idx) => {
                                    if (idx < nbMax) {
                                        return (
                                            <Grid item key={idx}>
                                                <CartePrestataire prestataire={prestataire} />
                                            </Grid>
                                        );
                                    }
                                })}
                            </Grid>
                            <Grid mt='20px'>
                                <Button
                                    disabled={nbMax >= props.prestataires.length}
                                    onClick={() => handleClick()}
                                >
                                    Voir plus
                                </Button>
                            </Grid>
                        </>

                    ) : typeObject() === 'categorie' ? (
                        <>
                            <Grid
                                id='categorie-cards'
                                key='categorie-cards'
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
                                {props.categories.map((c, idx) => {
                                    if (idx < nbMax) {
                                        return (
                                            <Grid item key={idx}>
                                                <CarteCategorie categorie={c} />
                                            </Grid>
                                        );
                                    }
                                })}
                            </Grid>
                            <Grid mt='20px'>
                                <Button
                                    disabled={nbMax >= props.categories.length}
                                    onClick={() => handleClick()}
                                >
                                    Voir plus
                                </Button>
                            </Grid>
                        </>
                    ) : (
                        <>
                        <Grid
                                id='prestation-cards'
                                key='prestation-cards'
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
                                {props.prestations.map((d, idx) => {
                                    if (idx < nbMax) {
                                        return (
                                            <Grid item key={idx}>
                                                <CartePrestationNew prestation={d} />
                                            </Grid>
                                        );
                                    }
                                })}
                            </Grid>
                            <Grid mt='20px'>
                                <Button
                                    disabled={nbMax >= props.prestations.length}
                                    onClick={() => handleClick()}
                                >
                                    Voir plus
                                </Button>
                            </Grid>
                        </>
                    )}
                </Grid>
            </Grid>

        </>
    );
}
