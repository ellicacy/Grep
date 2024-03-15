import React, { useEffect, useState } from 'react'
import { Box, IconButton } from '@mui/material'
import { Grid, Typography, Container, Button, CardMedia } from "@mui/material";
import { BiHeart, BiSend, BiLike, BiCheckCircle } from 'react-icons/bi';
import { BsHeartFill, BsHeart, BsSend, BsHandThumbsUp } from 'react-icons/bs';
import BottomPage from '../../components/Navigation/BottomPage'
import Avatar from '@mui/material/Avatar';
import { random } from "lodash";
import CartePrestation from "../../components/Prestation/Carte.PrestationNew";

import Header from '../../components/Navigation/Header';
import { useParams } from 'react-router-dom';

import axiosClient from '../../axios-client';

import { notes } from '../../outils/notes';
import Loader from '../Loader';

import DOMPurify from 'dompurify';

import { isNull } from "../../outils/isNull";
import { premiereLettreMajuscule } from '../../outils/stringTransform';
import { useSelector } from 'react-redux';
import { ajouterFavPrestataire, retirerFavPrestataire } from '../../store/panierSlice';
import { useDispatch } from 'react-redux';






export default function Prestataire(props) {

    //Récupération de l'id du prestataire
    const { id } = useParams();

    //Récupération du dispatch permettant de modifier le store et donc le state
    // en appelant les fonctions du slice panier
    const dispatch = useDispatch();

    //Récupération du state du store pour les favoris prestataires
    const favoris = useSelector(state => state.panier.favorisPrestataires);
    // constante qui stocks la liste des favoris prestataires du store
    const [fav, setFav] = useState(favoris);
    // constante qui stocke si le prestataire est dans les favoris ou non
    const [isFav, setIsFav] = useState(false);

    //Création de la constante qui stockera le prestataire affiché
    const [prestataire, setPrestataire] = useState(null);

    //Création de la constante qui stockera le chargement de la page
    const [loading, setLoading] = useState(true);

    //Création de la constante qui stockera la description dite nettoyer du prestataire
    const [cleanDescription, setCleanDescription] = useState("");

    //Parti permettant de récupérer les prestations du prestataires
    const statePrestations = useSelector(state => state.prestations.prestations);
    const [prestationsPrestataire, setPrestationsPrestataire] = useState([]);



    const getPrestationsFromPrestataire = async () => {
        // console.log(statePrestations)
        // console.log(prestataire)

        const newPrestPrestataire = [];

        for (let i = 0; i < statePrestations.length; i++) {
            if (statePrestations[i].id_user === prestataire.idPersonne) {
                newPrestPrestataire.push(statePrestations[i]);
            }
        }
        setPrestationsPrestataire(newPrestPrestataire);
        // console.log(prestationsPrestataire)

    }

    const getPrestataire = async (idUser) => {

        await axiosClient.get('/users/' + idUser)
            .then(({ data }) => {
                // console.log(data)
                setPrestataire(data)
                const clean = DOMPurify.sanitize(isNull(prestataire?.prestataireDescription));
                setCleanDescription(clean);
                // console.log(cleanDescription)
                setLoading(false)

            })
            .catch(({ error }) => {
                // console.log(error)
            })
    }

    const FavorisButton = () => {
        for (let i = 0; i < fav.length; i++) {
            if (fav[i].idPersonne === prestataire.idPersonne) {
                setIsFav(true);
                return;
            }
        }
        if (!isFav) {
            return <BsHeart size={24} fill='primary' />;
        } else {
            return <BsHeartFill size={24} fill='red' />;
        }
    }

    const BannierePrestations = () => {

        return (
            <>
                <Grid container margin={'50px 0px 20px 0px'}>
                    <Typography variant="h2">Prestations</Typography>
                </Grid>

                {prestationsPrestataire.length === 0 &&
                    <Grid container margin={'50px 0px 20px 0px'}>
                        <Typography variant="h4">Ce prestataire n'a pas encore de prestations</Typography>
                    </Grid>
                }

                <Grid container columnSpacing={'20px'} rowSpacing={'20px'} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                    {prestationsPrestataire.map(function (d, idx) {
                        return (
                            <Grid key={idx} item>
                                <CartePrestation prestation={d} />
                            </Grid>
                        );
                    }
                    )}
                </Grid>
            </>
        );
    }

    // const getFavoris = async () => {
    //     await axiosClient.get('/favoris')
    //         .then(({ data }) => {
    //             // console.log(data)
    //             setFav(data)
    //         })
    //         .catch(({ error }) => {
    //             // console.log(error)
    //         })
    // }



    function partagerPrestataire() {
        navigator.clipboard.writeText(window.location.href);
        alert("Lien copié dans le presse-papier");
    }


    function ajouterAuFavoris() {
        if (isFav) {
            dispatch(retirerFavPrestataire(prestataire))
            setIsFav(false);
        } else {
            dispatch(ajouterFavPrestataire(prestataire))
            setIsFav(true);
        }
    }


    useEffect(() => {
        getPrestataire(id);


        getPrestationsFromPrestataire();


    }, [isFav, loading, statePrestations, favoris])

    return (
        <>
            {loading &&
                <Grid container direction="column" sx={{ minHeight: "100vh" }}>
                    <Grid item>
                        <Header />
                    </Grid>
                    <Grid item sx={{ flex: 1 }}>
                        <Loader />
                    </Grid>
                    <Grid item>
                        <BottomPage sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} />
                    </Grid>
                </Grid>
            }
            {!loading &&
                <>
                    <Grid container direction="column" sx={{ minHeight: "100vh" }}>
                        <Grid item>
                            <Header />
                        </Grid>
                        <Grid item sx={{ flex: 1 }}>

                            <Container>

                                <Grid
                                    key={'Prestataire' + id}
                                    container
                                    alignItems="center"
                                    justifyContent={{ xs: 'center', md: 'flex-start' }}
                                    m={'50px 0px 20px 0px'}
                                // border='1px solid blue'
                                >

                                    <Grid
                                    // border='1px solid red'

                                    >
                                        <Avatar
                                            sx={{
                                                width: '120px',
                                                height: '120px'
                                            }}
                                        >
                                        <Typography variant="h1">
                                        {premiereLettreMajuscule(isNull(prestataire.personneNom))[0]}{premiereLettreMajuscule(isNull(prestataire.personnePrenom))[0]}
                                        </Typography>
                                        </Avatar>

                                    </Grid>

                                    {/* ----------------------------------------------------------------------------- */}
                                    <Grid
                                        container
                                        item
                                        xs={12}
                                        md={8}
                                        ml='30px'
                                        alignContent='center'

                                        // border='1px solid red'
                                        height={'120px'}
                                    >

                                        <Grid
                                            container
                                            item
                                            xs={12}
                                        // border={'1px solid blue'}
                                        >

                                            <Grid item>
                                                <Typography variant="h1">
                                                    {premiereLettreMajuscule(isNull(prestataire.personneNom))} {premiereLettreMajuscule(isNull(prestataire.personnePrenom))}
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
                                                    onClick={() => partagerPrestataire()}
                                                >
                                                    <BsSend size={24} fill='primary' />
                                                </IconButton>
                                            </Grid>

                                        </Grid>
                                        {/* ----------------------------------------------------------------------------- */}

                                        <Grid
                                            container
                                            // border={'1px solid blue'}
                                            alignContent={'center'}
                                        >

                                            <Grid item>
                                                <Typography variant="h2" mt={'10px'}>
                                                    {isNull(prestataire.prestaireType)}
                                                </Typography>
                                            </Grid>

                                        </Grid>

                                        <Grid
                                            container
                                            direction="row"
                                            alignItems="center"
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
                                                <Typography variant="text" mr={'10px'}>98 %  d'avis positifs</Typography>
                                            </Grid>

                                            <Grid item ml='20px'>
                                                {notes(random(1, 5))}
                                            </Grid>

                                        </Grid>

                                    </Grid>


                                </Grid>


                                <Grid container mt={'50px'}>
                                    <Typography variant="h2">Description</Typography>
                                </Grid>
                                <Grid container mt={'20px'} maxWidth={'780px'}>
                                    <Typography dangerouslySetInnerHTML={{ __html: cleanDescription }}></Typography>
                                </Grid>

                                <BannierePrestations />

                            </Container>

                        </Grid>
                        <Grid item>
                            <BottomPage sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} />
                        </Grid>
                    </Grid>
                </>
            }
        </>
    )
}