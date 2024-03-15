import React, { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Header from "../../components/Navigation/Header";
import BottomPage from "../../components/Navigation/BottomPage";
import { useSelector } from "react-redux";

export default function paiementReussi(props) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("USER")));
    const [email, setEmail] = useState(user.personneLogin);
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const panier = useSelector((state) => state.panier);
    const [description, setDescription] = useState(panier.descriptionEvenement);
    // const [prestations, setPrestations] = useState(panier.packPrestation);
    const [prestations, setPrestations] = useState(panier.prestationPanier);
    const [packs, setPacks] = useState(panier.packPanier);

    const [tabPrestataireId, setTabPrestataireId] = useState([]);

    panier.prestationPanier.map((p) => {
        tabPrestataireId.push(p.id_user);
    });

    const data = {
        panier,
        user_id: user.idPersonne,
        user_surname: user.personneNom,
        user_name: user.personnePrenom,
        user_email: user.personneLogin,
        titreEvenement: panier.titreEvenement,
        descriptionEvenement: panier.descriptionEvenement,
        dateEvenement: panier.dateEvenement,
        adresseEvenement: panier.adresseEvenement,
        codePostalEvenement: panier.npaEvenement,
        villeEvenement: panier.villeEvenement,
        totalEvenement: panier.total,
        idPrestataires: tabPrestataireId,
    };

    axiosClient
        .post("/testMail", data)
        .then((data) => {
            console.log("RETOUR APRES ENVOI MAIL");
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });

    // try {
    //     const response = axiosClient.post('/testMail', data);
    //     if (response.status === 200) {
    //       setMessage({
    //         type: 'success',
    //         text: 'Un mail de confirmation a été envoyé.',
    //       });
    //     } else {
    //       setMessage({
    //         type: 'error',
    //         text: "Erreur lors de l'envoi du mail de confirmation.",
    //       });
    //     }
    //   } catch (error) {
    //     setMessage({
    //       type: 'error',
    //       text: "Erreur lors de l'envoi du mail de confirmation.",
    //     });
    // }

    return (
        <>
            <Header />
            <Grid height={"60vh"} container>
                <Grid
                    container
                    alignContent={"center"}
                    justifyContent={"center"}
                >
                    <Typography variant="h1">
                        Merci pour votre réservation !
                    </Typography>
                </Grid>
                <Grid
                    container
                    alignContent={"center"}
                    justifyContent={"center"}
                >
                    <Button href="/home">
                        <Typography>Retour au menu</Typography>
                    </Button>
                </Grid>
            </Grid>

            <BottomPage />
        </>
    );
}
