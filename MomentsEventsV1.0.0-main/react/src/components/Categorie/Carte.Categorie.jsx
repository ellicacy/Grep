import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
    Card,
    CardContent,
    CardActions,
    CardMedia,
    CardActionArea,
    Typography,
    Button,
} from "@mui/material";

import { premiereLettreMajuscule } from "../../outils/stringTransform";



const useStyles = makeStyles({
    imageContainer: {
        height: "140px",
        width: "280px",
        backgroundColor: "#E5E7EB",
    },
});

const handleClick = (nom) => {
    Navigate("/rechercher?type=" + nom);
};

// const handleClick = (id) => {
//     console.log(id);
// }

export default function CarteCategorie(props) {
    const [titre, setTitre] = useState("")
    useEffect(() => {
        // console.log(props.categorie);
        setTitre(premiereLettreMajuscule(props.categorie.nom));
    }, []);

    const classes = useStyles();

    const imageUrl = props.categorie.image
    ? "http://localhost:8000/" + props.categorie.image.split("|").at(0)
    : ""; // Image par défaut si existe

    return (
        <Card
            id={props.id + "-card"}
            key={props.key + "-card"}
            sx={{
                maxWidth: 280,
                maxHeight: 200,
                '&:hover': {
                    boxShadow: 3,
                    // transition: 'all 0.3s ease-in-out',
                },
            }}>
            <CardActionArea
                href={"/rechercher?categorie=" + props.categorie.nom}
            >
                <div className={classes.imageContainer}>
                    <CardMedia
                        component="img"
                        height="140"
                        // image={
                        //     "http://localhost:8000/" + 
                        //     props.categorie.image.split('|').at(0)
                        // }
                        image={imageUrl}
                        alt={
                            "Image categorie " +
                            props.categorie.nom
                        }
                    />
                </div>
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h2"
                        sx={{ fontSize: 18 }}
                        component="div"
                    >
                        {titre}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
