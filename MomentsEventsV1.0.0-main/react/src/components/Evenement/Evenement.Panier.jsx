import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { retirerPackPanier, retirerPrestationPanier } from "../../store/panierSlice";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";

import { BsChevronUp } from "react-icons/bs";
import { BsX } from "react-icons/bs";

import axiosClient from "../../axios-client";

import BannierePrestataire from "../Prestataire/Banniere.Prestataire";
import Loader from "../../views/Loader";

import DOMPurify from "dompurify";
import { set } from "lodash";

import { roundAmount } from "../../outils/arrMontant";
import { Link } from "@mui/material";

export default function Panier() {
    const panier = useSelector((state) => state.panier);



    // const APIMap = 'pk.eyJ1IjoieWVsbG93YmVhbmllIiwiYSI6ImNsZnN5Z2Y4NzBheGkzdG80c3Y1dnZzcTMifQ.GjYIokOuiLs2ghQs0-4w8Q'

    const [description, setDescription] = useState(panier.descriptionEvenement);
    // const [prestations, setPrestations] = useState(panier.packPrestation);
    const prestations = useSelector((state) => state.panier.packPrestation);

    // const [packs, setPacks] = useState(panier.packPanier);
    const packs = useSelector((state) => state.panier.packPanier);

    // console.log(packs);

    // AFFECTER DOMPurify À UNE VARIABLE POUR NETTOYER LES DONNÉES
    // AVANT INSERTION DANS LE DOM
    const sanitize = DOMPurify.sanitize;
    const dispatch = useDispatch();

    // FONCTION POUR AFFICHER LES PACKS
    const AfficherPack = (props) => {

        const [loading, setLoading] = useState(true);

        const [prestation, setPrestation] = useState(null);
        const [prestataire, setPrestataire] = useState(null);

        const [lstPhoto, setLstPhoto] = useState([]);
        const [indexPhoto, setIndexPhoto] = useState(0);

        const [idPersta, setIdPresta] = useState(0);
        const [idUser, setIdUser] = useState(null);


        const getPrestation = async (idPrestation) => {
            setLoading(true)
            await axiosClient
                .get("/prestations/" + idPrestation)
                .then(({ data }) => {
                    // console.log(data.data);
                    setPrestation(data.data)
                    setIdPresta(data.data.id)
                    setIdUser(data.data.id_user)
                    // getPrestataire(data.data.id_user)
                    setLstPhoto(data.data.photo.split("|"));
                    getPrestataire(data.data.id_user);
                })
                .catch((e) => {
                    // console.log(e);
                });
        }

        const getPrestataire = async (idUser) => {
            await axiosClient
                .get('/users/' + idUser)
                .then((data) => {
                    // console.log(data.data);
                    setPrestataire(data.data);
                    setLoading(false);
                })
                .catch((error) => {
                    // if (error.response) {
                    //     console.log(error.response.data);
                    //     console.log(error.response.status);
                    //     console.log(error.response.headers);
                    // }
                });
        }

        useEffect(() => {
            if (props.pack.pack !== null) {
                // console.log(props.pack.pack.pivot.prestation_id);
                getPrestation(props.pack.pack.pivot.prestation_id);
                if (idUser !== null) {
                    getPrestataire(idUser);
                }
            }

        }, []);

        return (
            <>
               {loading ? (
                <Grid 
                    key={"loading-grid-" + props.index} 
                    id={"loading-grid-" + props.index}
                    container 
                    alignContent={'center'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Loader key={"loader-" + props.index} id={"loader-" + props.index} />
                </Grid>
            ) : (
                <Box
                    key={"box-" + props.index}
                    id={"box-" + props.index}
                    sx={{
                        width: "100%",
                        borderTop: props.index === 0 ? "none" : "1px solid",
                        borderColor: "divider",
                        mt: "20px",
                    }}
                >
                    <Grid container key={"grid-container-" + props.index} id={"grid-container-" + props.index}>
                        <Grid container item xs={12} alignItems={'center'} key={"grid-item-" + props.index} id={"grid-item-" + props.index}>
                            <Grid item xs={6} key={"grid-item-link-" + props.index} id={"grid-item-link-" + props.index}>
                            <Link 
                                key={"link-" + props.index}
                                id={"link-" + props.index}
                                href={'/prestation/'+prestation.id}
                                sx={{ textDecoration: 'none' }}
                            >
                                <Typography variant="h2" key={"typography-" + props.index} id={"typography-" + props.index}>
                                    {prestation.nom}
                                </Typography>
                            </Link>
                            </Grid>
                                <Grid
                                    container
                                    item
                                    xs={3}
                                    justifyContent={"flex-end"}
                                    pr={"10px"}
                                >
                                    {/* <Typography variant="h2">
                                        {roundAmount(
                                            props.pack.pack.prix_fixe
                                                ? props.pack.pack.prix_fixe * props.pack.quantite
                                                : props.pack.pack.prix_unite * props.pack.quantite
                                        )}
                                    </Typography> */}
                                </Grid>
                                <Grid
                                    container
                                    item
                                    xs={3}
                                    justifyContent={"flex-end"}
                                    pr={"10px"}
                                >
                                    <IconButton onClick={() => {
                                        dispatch(retirerPackPanier(props.pack));
                                        dispatch(retirerPrestationPanier(prestation))

                                    }} >
                                        <BsX
                                            color={"#111827"}
                                        />
                                    </IconButton>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid
                            container
                            item
                            xs={12}
                            mt="20px"
                            mr="10px"
                            border="1px solid"
                            borderColor="divider"
                            padding={"20px 20px 20px 20px"}
                        >
                            <Grid item xs={12} md={4}>
                                <Typography variant="h2">
                                    {props.pack.pack.nom}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Typography ml={'20px'}
                                    variant="body1"
                                    dangerouslySetInnerHTML={{
                                        __html: sanitize(
                                            props.pack.pack.description
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid container item xs={3} justifyContent={'flex-end'}>
                                <Typography variant="body1" color="initial">
                                    Quantité : {props.pack.quantite} {props.pack.pack.unite ==='vide' ? "fois" : props.pack.pack.unite}
                                </Typography>
                            </Grid>
                            <Grid container item xs={3} justifyContent={'flex-end'}>
                                <Typography variant="h2">
                                    {/* {roundAmount(
                                        props.pack.pack.prix_fixe !== 0 || props.pack.pack.prix_fixe !== "0.00"
                                            ? props.pack.pack.prix_fixe * props.pack.quantite
                                            : props.pack.pack.prix_unite * props.pack.quantite
                                    )} */}
                                    {roundAmount(Number.parseFloat(props.pack.pack.prix_fixe) > 0 ? Number.parseFloat(props.pack.pack.prix_fixe) * Number.parseFloat(props.pack.quantite) : Number.parseFloat(props.pack.pack.prix_unite) * Number.parseFloat(props.pack.quantite))} CHF
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid
                                container
                                item
                                xs={12}
                                border="1px solid"
                                borderColor="divider"
                                padding={"20px 20px 20px 20px"}
                            >
                                <Grid item sm={12} md={6} height={"240px"}>
                                    <CardMedia
                                        component={"img"}
                                        // image={"https://api.keums.ch/" + lstPhoto[indexPhoto]}
                                        image={"http://localhost:8000/" + lstPhoto[indexPhoto]}
                                        alt={"image de la photo " + lstPhoto[indexPhoto]}
                                        height={'100%'}
                                    />
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <Typography ml={'20px'}
                                        variant="body1"
                                        dangerouslySetInnerHTML={{
                                            __html: sanitize(
                                                prestation.description
                                            ),
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>

                                <Grid
                                    container
                                    item
                                    xs={12}
                                    mt="20px"
                                    border="1px solid"
                                    borderColor="divider"
                                    padding={"0px 20px 20px 20px"}
                                >
                                    <BannierePrestataire
                                        prestataire={prestataire}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </>
        );
    };



    const handlePayer = () => {
        // axiosClient.post('/paiement', {
        //     "packs": packs,
        //     "id_user": panier.id_user,
        //     "id_evenement": panier.id_evenement
        // })
        //     .then(({ data }) => {
        //         console.log(data)
        //     })
        //     .catch(({ error }) => {
        //         console.log(error)
        //     })
    };

    useState(() => {
        const sanitizedDescription = sanitize(description);
        setDescription(sanitizedDescription);
    }, [packs]);

    return (
        <>
            <Grid mt={"50px"}>
                {/* Titre évènement */}
                <Grid item xs={12}>
                    <Typography variant="h2" mt="20px">
                        {panier.titreEvenement}
                    </Typography>
                </Grid>

                {/* Date et lieu */}
                <Grid item xs={12}>
                    <Typography variant="body1" mt="20px">
                        le {panier.dateEvenement}, à {panier.villeEvenement}.
                    </Typography>
                </Grid>

                {/* Description évènement */}
                <Grid item xs={12} mb={"20px"}>
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                </Grid>

                {/* Packs */}
                <Divider />

                {/* Affichage des packs séléctionner en présentant la préstation */}
                <Grid item mt="20px" mb='20px'>
                    {/* {console.log(packs.at(0).pack)} */}
                    {packs.length > 0 &&
                        (
                            packs.map((pack, index) => (
                                <AfficherPack index={index} pack={pack} key={index} />
                            )))}
                </Grid>

                {/* Prix total */}
                <Divider />

                <Grid container display={"flex"} justifyContent={"flex-end"}>
                    <Typography variant="body1" mt="20px">
                        Total (HT): {roundAmount(panier.ht)} CHF
                    </Typography>
                </Grid>
                <Grid container display={"flex"} justifyContent={"flex-end"}>
                    <Typography variant="body1">
                        TVA (7.70%): {roundAmount(panier.tva)} CHF
                    </Typography>
                </Grid>
                <Grid container display={"flex"} justifyContent={"flex-end"}>
                    <Typography variant="h2" mt="20px">
                        Sous-total: {roundAmount(panier.total)} CHF
                    </Typography>
                </Grid>
            </Grid>

        </>
    );
};
