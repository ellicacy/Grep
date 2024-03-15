import React, { useState } from "react";
import Header from "../../components/Navigation/Header";
import BottomPage from "../../components/Navigation/BottomPage";
import { Box, width } from "@mui/system";
import { Grid, Typography, Container, Link, IconButton, getDialogActionsUtilityClass } from "@mui/material";
import { BiHeart, BiSend, BiLike, BiCheckCircle, BiAddToQueue } from 'react-icons/bi';
import SelectionTab from "../../components/Home/Home.Selection.Prestation";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { BiRightArrowAlt } from "react-icons/bi";
import { BiLeftArrowAlt } from "react-icons/bi";
import CartePrestation from "../../components/Prestation/Carte.PrestationNew";
import TabPanel from "../../components/Prestation/Prestation.TabPanel";
import { add, get, set } from "lodash";
import { notes } from "../../outils/notes";
import { TabPrestation } from "../../components/Prestation/Prestation.Tab.Prestation";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import FAQ from "../../components/Prestation/Prestation.Tab.FAQ";
import TabAvis from "../../components/Prestation/Prestation.Tab.Avis";
import Loader from "../Loader";
import { premiereLettreMajuscule } from "../../outils/stringTransform";
import { isNull } from "../../outils/isNull";
import { BsHeart, BsHeartFill, BsSend, BsHandThumbsUp } from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import { ajouterFavPrestation, retirerFavPrestation } from "../../store/panierSlice";
import { random } from "lodash";

import {
    BsArrowRight,
    BsArrowLeft,
    BsCheckCircle,
    BsExclamationTriangle,
    BsDot,
} from "react-icons/bs";
import PrestationSimilaire from "../../components/Prestation/Prestation.PrestationSimilaire";

export default function Prestation(props) {

    const { id } = useParams();

    //Récupérer la liste des favoris depuis le store
    const dispatch = useDispatch()

    const stateFavoris = useSelector(state => state.panier.favorisPrestations)
    const [fav, setFav] = useState([])

    const statePrestations = useSelector(state => state.prestations.prestations)
    const [prestations, setPrestations] = useState([])

    const statePrestataires = useSelector(state => state.prestataires.prestataires)
    const [prestataires, setPrestataires] = useState([])

    const [isFav, setIsFav] = useState(false)

    const [prestation, setPrestation] = useState([])

    //Nb limite d'affichage de cartes de prestation
    const nbAffichageMax = 4;


    const [loading, setLoading] = useState(true)

    const [prestataire, setPrestataire] = useState(null)

    const [index, setIndex] = useState(0)

    function getPrestation(idPresta) {
        setLoading(true)
        // console.log(statePrestations)
        // console.log(idPresta)
        for (let i = 0; i < statePrestations.length; i++) {
            if (statePrestations[i].id == idPresta) {
                return statePrestations[i]
            }
        }
    }



    // --------------------------------- Fonctions --------------------------------- //
    function FavorisButton(idPresta) {
        for (let i = 0; i < fav.length; i++) {
            if (fav[i].id == idPresta) {
                setIsFav(true)
                return isFav
            }
        }
        setIsFav(false)
        return isFav
    }


    function partagerPrestation() {
        navigator.clipboard.writeText(window.location.href);
        alert("Lien copié dans le presse-papier");
    }

    function ajouterAuFavoris() {
        if (isFav) {
            dispatch(retirerFavPrestation(prestation))
            setIsFav(false);
        } else {
            dispatch(ajouterFavPrestation(prestation))
            setIsFav(true);
        }
    }

    // Fonction qui retourne les propriétés d'accessibilité pour un onglet
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    };


    const getPrestataire = async (idUser) => {
        setLoading(true)
        await axiosClient.get(`/users/` + idUser)
            .then(response => {
                setPrestataire(response.data)
                setLoading(false)

            })
            .catch(error => {
                console.log(error)
            })
    }

    // Composant de base pour les onglets
    const BasicTabs = (props) => {
        const [value, setValue] = React.useState(0);

        const handleChange = (event, newValue) => {
            setValue(newValue);
        };

        return (
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab key={0} label="Présentation" {...a11yProps(0)} sx={{ width: '120px' }} />
                        <Tab key={1} label="FAQ" {...a11yProps(1)} sx={{ width: '90px' }} />
                        <Tab key={2} label="Avis" {...a11yProps(2)} sx={{ width: '90px' }} />
                    </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                    <TabPrestation prestation={props.prestation} prestataire={props.prestataire} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <FAQ />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <TabAvis reviews={props.prestation.reviews} />
                </TabPanel>
            </Box>
        )
    }



    useEffect(() => {
        const stkPresta = getPrestation(id)
        setPrestation(stkPresta)
        // console.log(prestation)
        setFav(stateFavoris)
        FavorisButton(id)
        // console.log(isFav)
        if (prestation?.id_user) {
            getPrestataire(prestation.id_user)
        }
        // console.log(prestataire)

    }, [stateFavoris, statePrestations, statePrestataires, isFav])

    return (
        <>
            {/* Si loading est true charger la page */}
            {loading &&
                <Grid
                    container
                    direction="column"
                    sx={{
                        minHeight: "100vh"
                    }}
                >
                    <Grid item>
                        <Header />
                    </Grid>
                    <Grid item sx={{ flex: 1 }}>

                        <Grid
                            mt={'35vh'}
                        >

                            <Loader />
                        </Grid>

                    </Grid>
                    <Grid item>
                        <BottomPage />
                    </Grid>
                </Grid>
            }
            {!loading && prestation && prestataire && prestations &&
                <Grid
                    id={'Page-Prestation-' + prestation.id}
                    // key={'Page-Prestation-' + prestation.id}
                    container
                    direction="column"
                    sx={{
                        minHeight: "100vh"
                    }}
                    alignContent={'center'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Grid item>
                        <Header />
                    </Grid>
                    <Grid
                        item
                        container
                        sx={{
                            // maxWidth: '1180px',
                            flex: 1
                        }}
                        // mx='auto'
                        width={{
                            xs: '100vw',
                            sm: '100%',
                            md: '100%',
                            lg: '1180px',
                            xl: '1180px'
                        }}
                        px={{
                            xs: '20px',
                            sm: '20px',
                            md: '20px',
                            lg: '0px',
                            xl: '0px'
                        }}
                    >


                        <Grid
                            container
                            mt='50px'
                            width={'100%'}
                            height={'45px'}
                        >

                            <Grid item minWidth={'170px'}>
                                <Typography variant="h1">
                                    {premiereLettreMajuscule(isNull(prestation.nom))}
                                </Typography>
                            </Grid>

                            <Grid item ml='20px'>
                                <IconButton
                                    disableRipple
                                    size={'small'}
                                    onClick={() => ajouterAuFavoris()}
                                >

                                    {isFav &&
                                        <BsHeartFill size={24} fill='red' />
                                    }
                                    {!isFav &&
                                        <BsHeart size={24} fill='primary' />
                                    }

                                </IconButton>
                            </Grid>

                            <Grid item>
                                <IconButton
                                    disableRipple
                                    size={'small'}
                                    onClick={() => partagerPrestation()}
                                >
                                    <BsSend size={24} fill='primary' />
                                </IconButton>
                            </Grid>

                        </Grid>

                        <Grid
                            container
                            direction="row"
                            // border={'1px solid blue'}
                            mt={'10px'}
                        >

                            <Grid item ml='-8px'>
                                <IconButton
                                    disableRipple
                                    size={'small'}
                                >
                                    <BsHandThumbsUp size={24} fill='primary' />

                                </IconButton>
                            </Grid>

                            <Grid item>
                                <Typography variant="body1" ml={'10px'} mr={'10px'}>98%  d'avis positifs</Typography>
                            </Grid>

                            <Grid item ml='20px'>
                                {notes(random(1, 5))}
                            </Grid>

                        </Grid>


                        {/* Onglets */}
                        <Grid
                            container
                            alignItems='center'
                            justifyContent='center'
                            alignContent={'center'}
                        >
                            <BasicTabs key={'tableau-prestation' + prestation.id} prestataire={prestataire} prestation={prestation} />

                        </Grid>

                        {/* Section "D'autres prestations similaires" */}
                        <PrestationSimilaire prestations={statePrestations} />
                    </Grid>


                    <Grid item>
                        <BottomPage />
                    </Grid>
                </Grid>


            }
        </>
    )
}
