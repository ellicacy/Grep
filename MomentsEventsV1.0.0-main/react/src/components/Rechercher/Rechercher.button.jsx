import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { premiereLettreMajuscule } from '../../outils/stringTransform';


const useStyles = makeStyles((theme) => ({
    btn: {
        fontFamily: 'Roboto, sans-serif',
        color: '#D1D5DB',
        backgroundColor: '#ffffff',
        padding: '10px 15px 10px 15px',
        border: '1px solid #D1D5DB',
        boxShadow: 'rgb(0, 0, 0) 0px 0px 0px 0px',
        borderRadius: 1,
        transition: '410ms',
        transform: 'translateY(0)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        cursor: 'pointer',
        marginRight: '10px',
        lineHeight: '15px',
        '&:hover': {
            transition: '410ms',
            padding: '10px 15px 10px 15px',
            transform: 'translateY(-2px)',
            backgroundColor: '#fff',
            color: '#000000',
            border: 'solid 1px #000000',
        }
    },
}));




export default function BoutonRecherche(props) {

    const classes = useStyles();


    return (
        <>
            {props.categories.map(function (categorie, idx) {
                if (idx < 5 && categorie) {
                    return (
                        <Grid id={idx} key={categorie.id} item>
                            <Link href={"/rechercher?type=" + categorie.nom} style={{ textDecoration: 'none' }}>
                                <button className={classes.btn}>{premiereLettreMajuscule(categorie.nom)}</button>
                            </Link>
                        </Grid>
                    );
                }

            })}
        </>
    );
}