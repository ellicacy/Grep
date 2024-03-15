import React, { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Link from "@mui/material/Link";
import { useSelector } from "react-redux";
import {
    BsArrowRight,
    BsArrowLeft,
    BsCheckCircle,
    BsExclamationTriangle,
    BsDot,
} from "react-icons/bs";
import CarteCategorie from "../Categorie/Carte.Categorie";

export default function SelectionCategorie(props) {
    //Nb limite d'affichage de cartes de prestation
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, [props.categorie]);

    return (
        <>
            {loading ? (
                <>
                </>
            )
                :
                (
                    <>
                        <Grid
                            id='Selection-Categorie'
                            key='Selection-Categorie'
                            container
                            width={'100%'}
                            alignContent={'center'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            padding={{ xs: '0px 20px 0px 20px', lg: '0px 0px 0px 0px' }}
                        >
                            <Grid
                                id='Selection-Categorie-Content'
                                key='Selection-Categorie-Content'
                                container
                                mt='100px'
                                width={'1180px'}
                            >

                                <Grid container>

                                <Grid container item lg={8}>
                                    <Typography variant="h1" gutterBottom>
                                        Quel événement prévoyez-vous?
                                    </Typography>
                                </Grid>

                                <Grid
                                    container
                                    item
                                    lg={4}
                                    alignItems="center"
                                    justifyContent="flex-end"
                                >
                                    <Grid item>
                                            <Link
                                                href="/rechercher?type=categorie"
                                                style={{
                                                    fontSize: "12px",
                                                    textDecoration: "none",
                                                    alignSelf: "center",
                                                    color: "black",
                                                }}
                                            >
                                                Voir toutes les catégories
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <IconButton
                                                size="large"
                                                disabled={index == 0}
                                                aria-label="Glisser les categories vers la gauche"
                                                key="arrow-left-categories"
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
                                                disabled={index == props.categories.length - 4 || props.categories.length < 4}
                                                size="large"
                                                aria-label="Glisser les catégories vers la droite"
                                                key="arrow-right-categories"
                                                onClick={() => {
                                                    if (index < props.categories.length - 4) {
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
                                    id='cartes-categories'
                                    key='cartes-categories'
                                    container
                                    // columns={{
                                    //     xs: 4,
                                    //     sm: 8
                                    // }}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent={{ xs: 'center', md: "space-between" }}
                                    maxWidth={'100%'}
                                    columnSpacing={{ xs: '20px', md: '0px' }}
                                    // rowSpacing={'20px'}
                                >
                                    {/* <CarteEventType categorie={props.categories[index]} />
                                <CarteEventType categorie={props.categories[index+1]} />
                                <CarteEventType categorie={props.categories[index+2]} />
                                <CarteEventType categorie={props.categories[index+3]} /> */}

                                    {props.categories.map(function (categorie, idx) {
                                        if (idx == index || idx == index + 1 || idx == index + 2 || idx == index + 3) {
                                            return (
                                                <Grid item key={idx}>
                                                    <CarteCategorie
                                                        categorie={categorie}
                                                        aria-labelledby={
                                                            "categorie-" + idx
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
                )}
        </>
    );
}
