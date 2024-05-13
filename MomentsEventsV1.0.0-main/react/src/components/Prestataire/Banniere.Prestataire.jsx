import React from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { notes } from "../../outils/notes";
import axiosClient from "../../axios-client";
import Loader from "../../views/Loader";
import { useState, useEffect } from "react";
import Link from "@mui/material/Link";

export default function BannierePrestataire(props) {

    const [prestataire, setPrestataire] = useState(props.prestataire);

    useEffect(() => {
        if (props.prestataire) {
            setPrestataire(props.prestataire);
        }
    }, [props.prestataire]);

    return (
        <Grid
            container
            // border={1}
            alignItems={'center'}
            // mt='30px'
            // padding='20px 0px 20px 0px'
            height='130px'
        >
            <Grid
                container
                item
                xs={6}
                direction='row'
                // border={1}
                alignItems={'center'}
            >
                <Grid item>
                    <Avatar
                        style={{ width: '70px', height: '70px' }}
                    />
                </Grid>

                <Grid item ml='20px'>
                    <Typography variant="h2">
                        {prestataire.personneNom} {prestataire.personnePrenom} {notes(3.26)}
                    </Typography>
                    <Typography variant="body1">
                        Prestataire
                    </Typography>
                </Grid>
                
            </Grid>

            <Grid
                container
                item
                xs={6}
                alignContent='center'
                justifyContent={'flex-end'}
                // border={1}
            >
                <Link
                    href={'/prestataire/' + prestataire.idPersonne}
                    variant="subtitle1"
                    sx={{ textDecoration: 'none' }}>
                    Voir toutes les prestations
                </Link>
            </Grid>

        </Grid>
    );
}