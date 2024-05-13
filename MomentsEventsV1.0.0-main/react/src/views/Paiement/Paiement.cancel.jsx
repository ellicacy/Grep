import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Header from "../../components/Navigation/Header";
import BottomPage from "../../components/Navigation/BottomPage";

export default function paiementReussi(props) {
    return (
        <>
            <Header />
            <Grid>
                <Grid xs={12}>
                    <Typography variant="h1">
                        Votre paiement a été annulé !
                    </Typography>
                </Grid>
                <Grid xs={12}>
                    <Button href="/home">
                        <Typography>Retour au menu</Typography>
                    </Button>
                </Grid>
            </Grid>
            <BottomPage />
        </>
    );
}
