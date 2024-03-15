import React from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, CardActions, CardMedia, CardActionArea, Typography, Button } from '@mui/material';
import { BsMusicNoteList, BsStarFill } from "react-icons/bs";
import { BsStar } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";
import Grid from '@mui/material/Grid';
import { notes } from '../../outils/notes';
import axiosClient from '../../axios-client';
import { useState } from 'react';
import DOMPurify from 'dompurify';
import { premiereLettreMajuscule } from '../../outils/stringTransform';
import { random } from 'lodash';


const useStyles = makeStyles({
    imageContainer: {
        height: '140px',
        width: '280px',
    },
});


//Méthode similaire à notes() mais n'affiche que 5 étoiles maximum même si la note est supérieure

const isPhoto = (photo) => {
    if (photo !== null) {
        // return "https://api.keums.ch/" + photo.split('|').at(0);
        return "http://localhost:8000/" + photo.split('|').at(0);
    } else {
        return false;
    }
}

export default function CartePrestation(props) {

    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [nomCategorie, setNomCategorie] = useState('')
    const [description, setDescription] = useState('')
    // console.log(props.prestation);


    const getNomCategorie = () => {
        if(props.prestation.categories.length >= 1) {
        setNomCategorie(props.prestation.categories[0].nom)
        } else {
            return false
        }
    }

    useState(() => {
        setLoading(true)
        getNomCategorie()
        const descr = props.prestation.description;

        const regex = /(<([^>]+)>)/ig;
        const regexDescr = DOMPurify.sanitize(descr.replace(regex, ''));
        const word = '&nbsp;';
        const descrTableau = regexDescr.split(word);
        const resultatDescription = descrTableau.join('\n');
        setDescription(resultatDescription)
        setLoading(false)
    }, [])

    return (
        <>
            {loading && <div>Chargement...</div>}
            {!loading &&
                <Card
                    sx={{
                        maxWidth: 280,
                        height: 360,
                        '&:hover': {
                            boxShadow: 3,
                            // transition: 'all 0.3s ease-in-out',
                        },
                    }}
                >
                    <CardActionArea
                        href={'/prestation/' + props.prestation.id}
                        sx={{ maxWidth: 280, height: 360 }}>
                        <div
                            className={classes.imageContainer}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={isPhoto(props.prestation.photo)}
                                alt={"image de la prestation " + props.prestation.nom}
                            />
                        </div>
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h2"
                                sx={{ mt: '10px' }} >
                                {props.prestation.nom}
                            </Typography>
                            <Typography
                                sx={{ fontSize: 12, mt: '10px' }}
                                color="text.secondary" >
                                {nomCategorie} · {props.prestation.lieu}
                            </Typography>
                            <Grid item style={{ overflow: "hidden", width: '15rem', height: '100px' }}>
                                <Typography
                                    variant="body1"
                                    style={{
                                        display: "-webkit-box",
                                        WebkitLineClamp: 4,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                      }}
                                >
                                    {/* {props.prestation.description} */}
                                    {description}
                                </Typography>
                            </Grid>
                            {notes(random(1, 5))}
                        </CardContent>
                    </CardActionArea>
                </Card>
            }
        </>
    )
}
