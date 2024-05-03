import React from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, CardActions, CardMedia, CardActionArea, Typography, Button } from '@mui/material';
import { BsMusicNoteList, BsStarFill } from "react-icons/bs";
import { BsStar } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";
import Grid from '@mui/material/Grid';


import { notes } from '../../outils/notes';

const useStyles = makeStyles({
    imageContainer: {
        height: '140px',
        width: '280px',
    },
});


//Méthode similaire à notes() mais n'affiche que 5 étoiles maximum même si la note est supérieure


export default function CartePrestation(props) {

    const classes = useStyles();

    return (
        <>
            <Card sx={{ maxWidth: 280, height: 360 }}>
                <CardActionArea href={'prestation/' + props.prestation.id}>
                    <div className={classes.imageContainer}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={props.prestation.image}
                            alt="green iguana"
                        />
                    </div>
                    <CardContent>
                        <Typography gutterBottom variant="h2" sx={{ mt: '10px' }} component="div">
                            {props.prestation.titre}
                        </Typography>
                        <Typography sx={{ fontSize: 12, mt: '10px' }} color="text.secondary" gutterBottom>
                            {props.prestation.categorie} · {props.prestation.lieu}
                        </Typography>
                        <Grid item xs zeroMinWidth>
                            <Typography noWrap>
                                {props.prestation.description}
                            </Typography>
                        </Grid>
                        {notes(props.prestation.note)}
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}
