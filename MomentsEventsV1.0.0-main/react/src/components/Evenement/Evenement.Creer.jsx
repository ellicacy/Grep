import react from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ajouterTitre } from '../../store/panierSlice';
import { ajouterDescription } from '../../store/panierSlice';
import { ajouterAdresse } from '../../store/panierSlice';
import { ajouterNpa } from '../../store/panierSlice';
import { ajouterVille } from '../../store/panierSlice';
import { ajouterDate } from '../../store/panierSlice';
import CKeditor from '../CKeditor';


import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip'

import DOMPurify from "dompurify";
import theme from '../../theme';



export default function EvenementCreer() {

    const panier = useSelector((state) => state.panier);
    const dispatch = useDispatch();

    const sanitize = DOMPurify.sanitize;

    const [phrases, setPhrases] = useState([
        "Prêt à faire la fête ? Indiquez-nous le nom de votre événement pour commencer !",
        "Entrez le nom de l'événement qui va enflammer vos prochains souvenirs.",
        "Dites-nous le nom de votre événement, et préparez-vous à vivre une expérience inoubliable !",
        "Donnez-nous le nom de votre événement, et laissez la magie opérer !",
        "Votre événement sera fantastique ! Pour commencer, inscrivez son nom ci-dessous.",
        "On s'occupe de tout ! Indiquez simplement le nom de l'événement à organiser.",
        "Vous allez adorer votre événement ! Dites-nous son nom et nous nous occupons du reste.",
        "Une fête inoubliable vous attend ! Entrez le nom de votre événement pour démarrer les préparatifs.",
        "Célébrez en grand ! Inscrivez le nom de l'événement",
        "Ensemble, créons la fête de vos rêves ! Saisissez le nom de votre événement pour commencer.",
        "Faites-nous part du nom de votre événement et préparez-vous à vivre des moments mémorables !",
        "Transformons vos idées en réalité ! Veuillez inscrire le nom de l'événement ici.",
        "Nous sommes impatients de vous aider à organiser votre événement ! Entrez son nom pour débuter.",
        "La fête de l'année, c'est par ici ! Indiquez-nous le nom de votre événement pour démarrer.",
        "Mettons le feu à votre événement ! Saisissez le nom et nous nous chargeons du reste.",
        "Partagez le nom de votre événement et laissez-nous créer des souvenirs inoubliables ensemble.",
        "Prêt pour une célébration exceptionnelle ? Inscrivez le nom de votre événement ci-dessous.",
        "Laissez-nous donner vie à votre événement ! Commencez par nous indiquer son nom.",
        "Que la fête commence ! Entrez le nom de votre événement et nous ferons le reste."
    ]);
    const [titre, setTitre] = useState(getRandomPhrase());


    const [titreEvenement, setTitreEvenement] = useState(panier.titreEvenement);
    const [descriptionEvenement, setDescriptionEvenement] = useState(panier.descriptionEvenement);
    const [adresseEvenement, setAdresseEvenement] = useState(panier.adresseEvenement);
    const [npaEvenement, setNpaEvenement] = useState(panier.npaEvenement);
    const [villeEvenement, setVilleEvenement] = useState(panier.villeEvenement);
    const [dateEvenement, setDateEvenement] = useState(panier.dateEvenement);

    const [editorLoaded, setEditorLoaded] = useState(false)
    const [data, setData] = useState('');


    function getRandomPhrase() {
        const randomIndex = Math.floor(Math.random() * phrases.length);
        return phrases[randomIndex];
    }

    const handlePutEvenement = () => {
        if (titreEvenement !== undefined) {
            dispatch(ajouterTitre(titreEvenement));
        }
        if (descriptionEvenement !== undefined) {
            dispatch(ajouterDescription(descriptionEvenement));
        }
        if (adresseEvenement !== undefined) {
            dispatch(ajouterAdresse(adresseEvenement));
        }
        if (npaEvenement !== undefined) {
            dispatch(ajouterNpa(npaEvenement));
        }
        if (villeEvenement !== undefined) {
            dispatch(ajouterVille(villeEvenement));
        }
        if (dateEvenement !== undefined) {
            dispatch(ajouterDate(dateEvenement));
        }
    };

    useEffect(() => {
        if (!editorLoaded) {
            setTitreEvenement(panier.titreEvenement);
            setDescriptionEvenement(panier.descriptionEvenement);
            setData(panier.descriptionEvenement);
            setAdresseEvenement(panier.adresseEvenement);
            setNpaEvenement(panier.npaEvenement);
            setVilleEvenement(panier.villeEvenement);
            setDateEvenement(panier.dateEvenement);
            setEditorLoaded(true);
        }
        handlePutEvenement();
    }, [titreEvenement, descriptionEvenement, adresseEvenement, npaEvenement, villeEvenement, dateEvenement]);

    return (
        <>

            <Grid container mt='50px' mb='20px'>
                <Typography
                    variant="h2"
                    color='#111827'>
                    {titre}
                </Typography>
                <form>
                    <Grid container item xs={12} justifyContent={'center'}>
                        <Grid item xs={10}>
                            <Typography
                                variant="body2"
                                color='#111827'
                                mt='20px'
                                mb='20px'>
                                Sélectionnez un nom simple qui en un seul ou quelque mot vous rappel l'élément central de votre événement.
                            </Typography>
                        </Grid>
                        <Grid container item xs={10} rowSpacing={'20px'}>

                            <Grid item xs={12} md={8}>
                                <TextField
                                    required
                                    variant="outlined"
                                    id="evenementNom"
                                    // label={'Titre de l\'évènement'}
                                    placeholder={'Nom de l\'évènement*'}
                                    fullWidth
                                    autoComplete='nom-evenement'
                                    onChange={(e) => {
                                        setTitreEvenement(e.target.value)
                                    }}
                                    value={titreEvenement ? titreEvenement : ''}
                                />
                            </Grid>
                            {/* <Grid item md={1} /> */}
                            <Grid item xs={12} md={4}>
                                <TextField
                                    type={'date'}
                                    variant="outlined"
                                    required
                                    // placeholder={'Date de l\'évènement'}
                                    id="evenementDate"
                                    fullWidth
                                    autoComplete='date-evenement'
                                    onChange={(e) => {
                                        setDateEvenement(e.target.value)
                                    }}
                                    value={dateEvenement ? dateEvenement : '0000-00-00'}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    // hiddenLabel
                                    variant='outlined'
                                    placeholder={'Rue*'}
                                    required
                                    fullWidth
                                    id="evenementAdresse"
                                    autoComplete='adresse-evenement'
                                    onChange={(e) => {
                                        setAdresseEvenement(e.target.value)
                                    }}
                                    value={adresseEvenement ? adresseEvenement : ''}
                                />
                            </Grid>
                            <Grid item xs={4} md={4}>
                                <TextField
                                    // hiddenLabel
                                    variant='outlined'
                                    placeholder={'NPA*'}
                                    required
                                    fullWidth
                                    id="evenementNpa"
                                    // placeholder={'NPA'}
                                    autoComplete='npa-evenement'
                                    onChange={(e) => {
                                        setNpaEvenement(e.target.value)
                                    }}
                                    value={npaEvenement ? npaEvenement : ''}
                                />
                            </Grid>
                            {/* <Grid item md={2}/> */}
                            <Grid
                                item
                                xs={8}
                                md={8}
                                ml={'-1px'}
                                mr={'1px'}
                            >
                                <TextField
                                    hiddenLabel
                                    placeholder={'Ville*'}
                                    variant='outlined'
                                    required
                                    fullWidth
                                    type={'text'}
                                    id="evenementVille"
                                    // placeholder={'Ville'}
                                    autoComplete='ville-evenement'
                                    onChange={(e) => {
                                        setVilleEvenement(e.target.value)
                                    }}
                                    value={villeEvenement ? villeEvenement : ''}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    hiddenLabel
                                    id="evenementDescription"
                                    placeholder={'Description de l\'évènement'}
                                    fullWidth
                                    autoComplete='description-evenement'
                                    onChange={(e) => {
                                        setDescriptionEvenement(e.target.value)
                                    }}
                                    multiline
                                    minRows={8}
                                    maxRows={20}
                                    value={descriptionEvenement ? descriptionEvenement : ''}
                                />
                            </Grid>
                        </Grid>

                        {/* <TextField
                        type={'time'}
                        hiddenLabel
                        id="evenementHeure"
                        fullWidth
                        autoComplete='heure-evenement'
                        onChange={(e) => { setNomEvenement(e.target.value)
                        }}
                    /> */}
                        {/* <TextField
                        type={'number'}
                        hiddenLabel
                        id="evenementNbInvite"
                        fullWidth
                        autoComplete='nb-invite-evenement'
                        onChange={(e) => { setNomEvenement(e.target.value)
                        }}
                    /> */}

                    </Grid>
                </form>
            </Grid>
        </>
    )
}