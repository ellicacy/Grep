import React, { useEffect } from "react";

import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";

import DOMPurify from "dompurify";
import Button from "@mui/material/Button";
import { BiLastPage } from "react-icons/bi";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ajouterPack } from "../../store/packSlice";

export default function Pack(props) {
    const [pack, setPack] = React.useState(props.pack);
    const packSelected = useSelector((state) => state.pack.pack);
    const dispatch = useDispatch();

    const [isForfait, setIsForfait] = React.useState(true);

    const [description, setDescription] = React.useState("");

    const [unite, setUnite] = React.useState(1);

    //Si le pack séléctionné importé depuis le store est le même que le pack en cours de traitement, alors on renvoie true
    const isSelected = () => {
        // console.log('packSelected =')
        // console.log(packSelected);
        // console.log('pack =')
        // console.log(pack);

        if (packSelected.id == pack.id) {
            return true;
        } else {
            return false;
        }
    };

    //Si le pack est séléctionné, alors on renvoie la couleur #111827, sinon on renvoie #E5E7EB
    //Permettra de rapidement changer la couleur du pack séléctionné
    const color = () => {
        if (isSelected()) {
            return "#111827";
        } else {
            return "#E5E7EB";
        }
    };

    useEffect(() => {
        setPack(props.pack);
        if (props.pack.unite == "vide") {
            setIsForfait(true);
        } else {
            setIsForfait(false);
        }

        const descr = pack.description;
        const purifyDescr = DOMPurify.sanitize(descr);
        setDescription(purifyDescr);
    }, [packSelected]);

    return (
        <>
            <Box
                sx={{
                    border: 1,
                    borderColor: color(),
                    minHeight: "200px",
                    mt: "20px",
                }}
            >
                <Grid key={'pack-' + pack.nom} container alignItems={"center"} p="20px 20px 20px 20px">
                    {props.nbPack !== 1 && (
                        <>
                            <Grid ml={{
                                md: "0px",
                                xl: "-10px"
                            }}>
                                <Radio
                                    checked={isSelected()}
                                    sx={{
                                        color: color(),
                                    }}
                                    disableRipple
                                    value="a"
                                    label="Titre pack"
                                    name="Titre pack"
                                    inputProps={{ "aria-label": "Titre pack" }}
                                    onChange={() => {
                                        const payload = {
                                            pack: pack,
                                            quantite: unite,
                                        };
                                        dispatch(ajouterPack(payload));
                                    }}
                                />
                            </Grid>
                        </>
                    )}

                    <Grid item>
                        <Typography variant="h2" color={color()}>{pack.nom}</Typography>
                    </Grid>
                    <Grid item width={"320px"}>
                        <Typography
                            variant="body1"
                            sx={{
                                color: color(),
                            }}
                            dangerouslySetInnerHTML={{ __html: description }}
                            mr="0px"
                        />
                    </Grid>

                    {isForfait && (
                        <>
                            <Grid item mt="10px">
                                <Typography variant="h1"

                                    color={color()}
                                >
                                    CHF {pack.prix_fixe}.-
                                </Typography>
                            </Grid>
                        </>
                    )}
                    {!isForfait && (
                        <>
                            <Grid container alignItems={"center"} mt="10px">
                                <Grid sx={{ maxWidth: "40px" }}>
                                    <button
                                        disabled={isSelected() || unite === 0 ? false : true}
                                        style={{
                                            height: "40px",
                                            width: "40px",
                                            border: "1px solid",
                                            color: color(),
                                            borderRadius: "0px",
                                            backgroundColor: "white",
                                        }}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            if (unite > 0) {
                                                setUnite(unite - 1);
                                            }
                                            const payload = {
                                                pack: pack,
                                                quantite: unite - 1,
                                            };
                                            dispatch(ajouterPack(payload));
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: "500",
                                                fontSize: "24px",
                                            }}
                                        >
                                            -
                                        </Typography>
                                    </button>
                                </Grid>
                                <Grid>
                                    <Typography
                                        width="40px"
                                        height="40px"
                                        border="1px solid"
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        fontSize="18px"
                                        ml="-1px"
                                        color={color()}
                                    >
                                        {unite}
                                    </Typography>
                                </Grid>
                                <Grid sx={{ maxWidth: "40px" }}>
                                    <button
                                        disabled={isSelected() ? false : true}
                                        style={{
                                            height: "40px",
                                            width: "40px",
                                            border: "1px solid",
                                            borderRadius: "0px",
                                            backgroundColor: "white",
                                            marginLeft: "-1px",
                                            color: color(),
                                        }}
                                        onClick={(event) => {
                                            event.preventDefault()
                                            setUnite(unite + 1)
                                            const payload = {
                                                pack: pack,
                                                quantite: unite + 1,
                                            };
                                            dispatch(ajouterPack(payload));
                                        }

                                        }
                                    >
                                        <Typography

                                            fontWeight="500"
                                            fontSize="24px"
                                            color={color()}
                                        >
                                            +
                                        </Typography>
                                    </button>
                                </Grid>
                                <Grid
                                    ml="10px">

                                    <Typography
                                        color={color()}
                                    >{pack.unite}</Typography>
                                </Grid>
                            </Grid>

                            <Grid
                                item
                                mt="10px">
                                <Typography
                                    variant="h1"
                                    color={color()}>
                                    CHF {pack.prix_unite * unite}.-
                                </Typography>
                            </Grid>
                        </>
                    )}
                </Grid>
            </Box>
        </>
    );
}
