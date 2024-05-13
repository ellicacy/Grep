import React from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, CardActions, CardMedia, CardActionArea, Typography, Button, Grid } from '@mui/material';
import { BsStarFill } from "react-icons/bs";
import { BsStar } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";

const useStyles = makeStyles({
    imageContainer: {
        height: '150px',
        maxWidth: '380px',
        backgroundColor: '#E5E7EB',
    },
});

export default function CarteFAQ(props) {

    const classes = useStyles();

    return (
        <>
            <Grid
            id={'carte'+props.id}
            key={'carte'+props.id}
                container
                sx={{
                    height: '300px',
                    minWidth: '380px',
                    width: '380px',
                    display: 'flex',
                }}
            >
                <Card sx={{
                    border: '1px solid #E5E7EB',
                    '&:hover': {
                        boxShadow: 3,
                    },
                }}>
                    <CardActionArea href={'/faq/'+props.id}>
                        <CardContent sx={{ padding: '20px', pb: '26px' }}>
                            <Typography gutterBottom variant="h2" mb='10px'>
                                {props.title}
                            </Typography>
                            <Typography gutterBottom variant="body1" mb='0px'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            height="150"
                            image={props.imagePath}
                        >

                        </CardMedia>
                    </CardActionArea>
                </Card>
            </Grid>
        </>
    )
}