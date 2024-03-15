import React from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { Container, Stack, Grid } from '@mui/material';
import CartePrestataire from '../Prestataire/Carte.Prestataire';
import IconButton from '@mui/material/IconButton';
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Link from '@mui/material/Link';
import CarteFAQ from '../FAQ/Carte.FAQ';
import Box from '@mui/material/Box';

const useStyles = makeStyles({

});

export default function SelectionFAQ() {

    const classes = useStyles();

    return (
        <>
            <Grid
                id='FAQ'
                key='FAQ'
                container
                width={'100%'}
                alignContent={'center'}
                justifyContent={'center'}
                alignItems={'center'}
                padding={{ xs: '0px 20px 0px 20px', lg: '0px 0px 0px 0px' }}
            >
                <Grid
                    id='FAQContent'
                    key='FAQContent'
                    container
                    mt='100px'
                    width={'1180px'}
                >
                    <Grid
                        id='FAQTitle'
                        key='FAQTitle'
                        pb='50px'
                    >
                        <Typography
                            variant="h1" >
                            Comment fonctionne Sparkling
                        </Typography>
                    </Grid>
                    <Grid
                        id='FAQCards'
                        key='FAQCards'
                        container

                        // columns={{
                        //     xs: 4,
                        //     sm: 8
                        // }}
                        display="flex"
                        alignItems="center"
                        justifyContent={{ xs: 'center', md: "space-between" }}
                        maxWidth={'100%'}
                        columnSpacing={{ xs: '20px', md: '0px' }}
                        rowSpacing={'20px'}
                    >
                        <Grid
                            item
                            id={'FAQCard1'}
                            key={'FAQCard1'}
                        >
                            <CarteFAQ
                                id={1}
                                title='Vous organisez un évènement'
                                imagePath={'../upload/orga.png'}
                            />
                        </Grid>
                        <Grid
                            item
                            id={'FAQCard2'}
                            key={'FAQCard2'}
                        >
                            <CarteFAQ
                                id={2}
                                title='Des prestataires à votre service'
                                imagePath={'../upload/service.png'}
                            />
                        </Grid>
                        <Grid
                            item
                            id={'FAQCard3'}
                            key={'FAQCard3'}
                        >
                            <CarteFAQ
                                id={3}
                                title='La combinaison gagnante'
                                imagePath={'../upload/gg.png'}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
