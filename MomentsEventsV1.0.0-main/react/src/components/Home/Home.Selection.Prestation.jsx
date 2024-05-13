import React, { useState, useEffect } from "react";
import { Container } from "@mui/system";
import { Stack, Link, Grid, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { BiRightArrowAlt } from "react-icons/bi";
import { BiLeftArrowAlt } from "react-icons/bi";
import CartePrestation from "../Prestation/Carte.Prestation";
import { random } from "lodash";
import BoutonRecherche from "../Rechercher/Rechercher.button";
import axiosClient from "../../axios-client";
import CartePrestationNew from "../Prestation/Carte.PrestationNew";
import {
    BsArrowRight,
    BsArrowLeft,
    BsCheckCircle,
    BsExclamationTriangle,
    BsDot,
} from "react-icons/bs";

export default function SelectionPrestation(props) {
    //Nb limite d'affichage de cartes de prestation
    const [index, setIndex] = useState(0);
    const [prestations, setPrestations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (props.prestations && props.categories) {
            setPrestations(props.prestations);
            setCategories(props.categories);
            setLoading(false);
        }

    }, [props.prestations, props.categories, index]);

    return (
        <>
            {loading ? (
                <></>
            ) : (
                <Grid
                    id='Selection-Prestation'
                    key='Selection-Prestation'
                    container
                    width={'100%'}
                    alignContent={'center'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    padding={{xs:'0px 20px 0px 20px', lg:'0px 0px 0px 0px'}}
                >
                    <Grid
                        id='Selection-Prestation-Content'
                        key='Selection-Prestation-Content'
                        container
                        mt='100px'
                        width={'1180px'}
                    >
                        <Typography variant="h1" id="selection-title">
                            Notre sélection
                        </Typography>


                        <Grid container item md={12} mt={"20px"} mb={"30px"} >
                            <Grid
                                container
                                item
                                xs={12}
                                sm={7}
                                // alignItems="center"
                                // rowSpacing={"10px"}

                            >
                                <BoutonRecherche
                                    categories={categories}
                                    aria-label="Bouton de recherche de prestations"
                                />
                            </Grid>

                            <Grid
                                container
                                item
                                xs={12}
                                sm={5}
                                justifyContent={{
                                    xs: "center",
                                    sm:"flex-end"                                    
                                }}
                                alignItems="center"
                            >
                                <Grid item>
                                    <Link
                                        href="/rechercher?type=prestation"
                                        style={{
                                            fontSize: "12px",
                                            textDecoration: "none",
                                            alignSelf: "center",
                                            color: "black",
                                        }}
                                        aria-label="Lien vers la page de toutes les prestations"
                                    >
                                        Voir toutes les prestations
                                    </Link>
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
                                        <BsArrowLeft fontSize="large" />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <IconButton
                                        disabled={index == prestations.length - 4}
                                        size="large"
                                        aria-label="Glisser les prestations vers la droite"
                                        key="arrow-right-prestations"
                                        onClick={() => {
                                            if (index < prestations.length - 4) {
                                                setIndex(index + 1);
                                            }
                                        }}
                                    >
                                        <BsArrowRight fontSize="large" />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid
                            id='cartes-prestations'
                            key='cartes-prestations'
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
                            {prestations.map(function (prestation, idx) {
                                if (idx == index || idx == index + 1 || idx == index + 2 || idx == index + 3) {
                                    return (
                                        <Grid 
                                        item 
                                        key={idx}
                                        // mt={{xs:'20px', lg:'0px'}}
                                        >
                                            <CartePrestationNew
                                                prestation={prestation}
                                                aria-labelledby={
                                                    "prestation-title-" + idx
                                                }
                                            />
                                        </Grid>
                                    );
                                }
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </>
    );
}
