import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { Box } from "@mui/system";
import {
    Grid,
    Typography,
    Button,
    CardMedia,
    Avatar,
    Link,
    IconButton,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";

import {
    BsArrowRight,
    BsArrowLeft,
    BsCheckCircle,
    BsExclamationTriangle,
    BsDot,
} from "react-icons/bs";

import { notes } from "../../outils/notes";

import { forEach, set, split } from "lodash";

import DOMPurify from "dompurify";
import Modal from "react-modal";
import {
    ajouterPackPanier,
    ajouterPrestationPanier,
} from "../../store/panierSlice";
import { ajouterPack } from "../../store/packSlice";

import BannierePrestataire from "../Prestataire/Banniere.Prestataire";
import Loader from "../../views/Loader";
import Pack from "./Prestation.Pack";
import axiosClient from '../../axios-client.js'
import DisponibilitesModal from "../ME_Availability/ME_DisponibilteModal";
import ReserverForm from "../ME_Reservation/ME_ReserverForm";
import Footer from "../ME_Availability/ME_FooterDispo";


function convertToUserTimezone(utcDate) {
    // Création d'un nouvel objet Date à partir de la date UTC
    const date = new Date(utcDate);
  
    // Obtention du décalage horaire de l'utilisateur par rapport à l'heure UTC en minutes
    const userTimezoneOffset = date.getTimezoneOffset();
  
    // Ajout du décalage horaire de l'utilisateur pour obtenir la date locale
    date.setMinutes(date.getMinutes() + userTimezoneOffset);
  
    
  
    return date;
  }

export function TabPrestation(props) {
    const [description, setDescription] = useState("");
    const [lstCara, setLstCara] = useState([]);
    const packSelectionner = useSelector((state) => state.pack);

    const [lstPhoto, setLstPhoto] = useState(props.prestation.photo.split("|"));
    const [indexPhoto, setIndexPhoto] = useState(0);

    function getLastDate(separator = "-") {
        let newDate = new Date();
        let date_raw = newDate.getDate() - 1;
        let month_raw = newDate.getMonth();
        let year = newDate.getFullYear();
        var date, month;

        if (date_raw < 10) {
            date = "0" + date_raw.toString();
        } else {
            date = date_raw.toString();
        }
        if (month_raw < 10) {
            month = "0" + month_raw.toString();
        } else {
            month = month_raw.toString();
        }

        return { year } + { separator } + { month } + { separator } + { date };
    }

    const [lstPacks, setLstPack] = useState(
        // [
        //     {
        //         id: 1,
        //         nom: 'Pack 1',
        //         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        //         prix_fixe: 2500,
        //         unite: 'vide',
        //         prix_unite: 0,
        //     },
        //     {
        //         id: 2,
        //         nom: 'Pack 2',
        //         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        //         prix_fixe: 0,
        //         unite: 'par unité',
        //         prix_unite: 250,
        //     },
        // ]
        []
    );

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    const [date, setDate] = useState("");
    const [lieux, setLieux] = useState("");
    const [disponible, setDisponible] = useState(false);
    const dispo = () => {
        if ((date === "" && lieux === "") || date === "" || lieux === "") {
            return false;
        } else {
            return true;
        }
    };

    const [oneMedia, setOneMedia] = useState(false);

    const couleur = (bool) => {
        if (!bool) {
            setCouleurFleche("#111827");
        } else {
            setCouleurFleche("#E5E7EB");
        }
    };

    const [couleurFleche, setCouleurFleche] = useState("#E5E7EB");

    const isPhoto = (photo) => {
        if (photo !== undefined) {
            return "http://localhost:8000/" + lstPhoto[indexPhoto];
            // return "https://api.keums.ch/" + lstPhoto[indexPhoto];
        } else {
            return false;
        }
    };

    const handleAddPanier = () => {
        dispatch(ajouterPackPanier(packSelectionner));
        // console.log(props.prestation)
        dispatch(ajouterPrestationPanier(props.prestation));
        // console.log('PACK SELECTIONNE')
        // console.log(packSelectionner)
    };

    const handleChangeDate = (event) => {
        setDate(event.target.value);
        // console.log(date);
    };

    const handleChangeLieu = (event) => {
        setLieux(event.target.value);
        // console.log(lieux);
    };

    useEffect(() => {
        const descr = props.prestation.description;
        const purifyDescr = DOMPurify.sanitize(descr);
        //setLstPack(props.prestation.pack)

        setDescription(purifyDescr);
        console.log(props.prestation);
        
        const lst = props.prestation.contrainte.split(";");
        
        setLstCara(lst);
        setOneMedia(lstPhoto.length === 1);
        couleur(oneMedia);

        const packs = props.prestation.packs;
        // console.log('PACKS = ')
        // console.log(packs)
        setLstPack(packs);
        const payload = {
            pack: packs[0],
            quantite: 1,
        };
        dispatch(ajouterPack(payload));

        setLoading(false);
    }, []);
    const [dateRecherche, setDateRecherche] = useState("");
    const [lieuRecherche, setLieuRecherche] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [typeRecherche, setTypeRecherche] = useState("");
    const [disponibilites, setDisponibilites] = useState([]);
    const [showDisponibilites, setShowDisponibilites] = useState(true);
    const [reserverFormIsOpen, setReserverFormIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [selectedPrestataire, setSelectedPrestataire] = useState(null);
    const [selectedPrestationId, setSelectedPrestationId] = useState(null);
    
    const capitalizeFirstLetter = (value) => {
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    };
    
    const openModal = () => {
      setModalIsOpen(true);
  };
  
  const closeModal = () => {
      setModalIsOpen(false);
  };
  const rechercherDisponibilites = async (tous) => {
    try {
        
      // Récupérer les prestations depuis l'API
        const prestationsResponse = await axiosClient.get('/prestations');
        const prestations = prestationsResponse.data;
        // filtrer les prestations pour obtenir la prestation sélectionnée
        const prestation = prestations.find(prestation => prestation.id === props.prestation.id);
        console.log('Prestation sélectionnée 2:', prestation);
        
        const prestationId = prestation.id;
        setSelectedPrestationId(prestationId);
        console.log('idPrestation:', prestationId);

        const prestationTitre = props.prestation.nom;
        const prestataireId = props.prestation.id_user;

        // Récupérer toutes les disponibilités depuis l'API
        const availabilitiesResponse = await axiosClient.get('/availabilities');
        const allAvailabilities = availabilitiesResponse.data;
        const usersResponse = await axiosClient.get('/users');
        const usersData = usersResponse.data.data;
    
        // Filtrer les disponibilités en fonction des critères de recherche
        const filteredAvailabilities = allAvailabilities.filter(availability => {
            const availabilityPrestationId = prestationId;
            console.log('idPrestation:', availabilityPrestationId);
            // Vérifier si la disponibilité correspond à la prestation sélectionnée
            if (availability.idPrestation !== availabilityPrestationId) {
                return false;
            }

            // Vérifier si la date de la disponibilité correspond à la date de recherche
            if (dateRecherche !== "" && tous === false) {
                const selectedDate = new Date(dateRecherche);
                const availabilityDate = convertToUserTimezone(availability.dateTime);
  
          if (availabilityDate.setHours(0, 0, 0, 0) !== selectedDate.setHours(0, 0, 0, 0)) {
            return false;
          }
        }
  
        // Vérifier si le lieu de la disponibilité correspond au lieu de recherche
        if (lieuRecherche !== "" && availability.lieu !== lieuRecherche && tous === false) {
          return false;
        }
        if (tous === true) {
          // Vérifier si la disponibilité est déjà réservée
          if (availability.reservationId) {
            return false;
          }
        }

        
  
        // Si tous les critères correspondent, conserver la disponibilité
        return true;
      });
  
      console.log('Disponibilités filtrées:', filteredAvailabilities);
  
      // Formater les disponibilités filtrées dans le format attendu par FullCalendar
      const formattedEvents = filteredAvailabilities.map(availability => {
        

        const prestataire = usersData.find(user => user.idPersonne === prestataireId);
        
        return {
          title: prestationTitre,
          dateTime: availability.dateTime, 
          prestataire: capitalizeFirstLetter(prestataire.personnePrenom) + ' ' + capitalizeFirstLetter(prestataire.personneNom),
        };
      });
      
  
      console.log('Événements formatés:', formattedEvents);
  
      // Mettre à jour l'état des disponibilités avec les données formatées
      setDisponibilites(formattedEvents);
  
  
      // Ouvrir le modal après avoir filtré les disponibilités
      openModal();
    } catch (error) {
      console.error('Erreur lors de la recherche des disponibilités:', error);
      alert('Il n\' y a pas d\'évenement disponible.');
    }
  };
  
    const handleClick = () => {
        const tous = false;
        rechercherDisponibilites(tous);
    }
  
    const handleClickTous = () => {
        const tous = true;

        rechercherDisponibilites(tous);
    }
    const openReserverFormModal = (date) => {
      setShowDisponibilites(false);
      setReserverFormIsOpen(true);
  
  };
  
  const closeReserverFormModal = () => {
      setReserverFormIsOpen(false);
      setShowDisponibilites(true);
  };
  
  const onSelectedDisponibiliteChange = (date) => {
    setSelectedDate(date.dateTime);
    setSelectedTitle(date.title);
    setSelectedPrestataire(date.prestataire);

  
  }

    return (
        <>
            {!loading && (
                <Grid container direction="row" margin={"20px 0px 0px 0px"}>
                    <Grid container item direction="column" lg={7.8}>
                        <Link
                            href={isPhoto(props.prestation.photo)}
                        >

                            <Grid
                                container
                                height={{ xs: "450px" }}
                                maxWidth={{ xs: "100%", sm: "100%", md: "100%", lg: "760px" }}
                                // maxHeight="450px"
                                // maxWidth="760px"
                                alignItems="center"
                                justifyContent="center"
                                backgroundColor="#F3F4F6"
                            >

                                {/* <Grid 
                            item
                            > */}
                                <img
                                    // objectPosition="center"
                                    src={isPhoto(props.prestation.photo)}
                                    style={{
                                        // height: "100%",
                                        width: "100%",
                                    }}
                                    alt={"photo prestation " + props.prestation.nom}
                                />
                                {/* </Grid> */}
                            </Grid>
                        </Link>
                        <Grid container sx={{ mt: "20px" }}>
                            <Grid container item xs={6}>
                                {lstPhoto.map((photo, index) => (
                                    <Grid item id={index} key={index}>
                                        <BsDot
                                            size="24px"
                                            onClick={() => setIndexPhoto(index)}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                            <Grid
                                container
                                item
                                xs={6}
                                alignItems="center"
                                justifyContent={"flex-end"}
                            >
                                <Grid item>
                                    <Typography variant="body1">
                                        {lstPhoto.length} médias
                                    </Typography>
                                </Grid>
                                <Grid item ml="10px">
                                    <IconButton
                                        aria-label="photo précédente"
                                        size="small"
                                        disabled={lstPhoto.length === 1}
                                        onClick={() => {
                                            if (indexPhoto > 0) {
                                                setIndexPhoto(indexPhoto - 1);
                                            } else {
                                                setIndexPhoto(
                                                    lstPhoto.length - 1
                                                );
                                            }
                                        }}
                                    >
                                        <BsArrowLeft
                                            color={couleurFleche}
                                            size={30}
                                        />
                                    </IconButton>
                                </Grid>
                                <Grid item ml="5px">
                                    <IconButton
                                        aria-label="photo suivante"
                                        size="small"
                                        disabled={lstPhoto.length === 1}
                                        onClick={() => {
                                            if (
                                                indexPhoto <
                                                lstPhoto.length - 1
                                            ) {
                                                setIndexPhoto(indexPhoto + 1);
                                            } else {
                                                setIndexPhoto(0);
                                            }
                                        }}
                                    >
                                        <BsArrowRight
                                            color={couleurFleche}
                                            size={30}
                                        />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item sx={{ mt: "30px" }}>
                            <Typography variant="h2">Description</Typography>
                            <Typography variant="body1" sx={{ mt: "20px" }}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: description,
                                    }}
                                ></div>
                            </Typography>
                        </Grid>

                        <Grid
                            item
                            sx={{
                                borderBottom: 1,
                                borderColor: "#E5E7EB",
                                pb: "50px",
                            }}
                        >
                            <Typography variant="h2" sx={{ mt: "50px" }}>
                                Caractéristiques
                            </Typography>

                            {lstCara.map((cara, index) => (
                                <Grid
                                    key={index}
                                    container
                                    sx={{ mt: "15px" }}
                                    justifyItems="center"
                                >
                                    <BsCheckCircle size={"24px"} />
                                    <Typography
                                        variant="body1"
                                        sx={{ mt: "20px", ml: "7px" }}
                                    />
                                    {cara}
                                </Grid>
                            ))}
                        </Grid>

                        <Grid sx={{
                            borderBottom: 1,
                            borderColor: "#E5E7EB",
                            // padding:'30px 0px 30px 0px'
                        }}>
                            <BannierePrestataire
                                prestataire={props.prestataire}
                            />
                        </Grid>

                        <Link href="/signaler" sx={{ textDecoration: "none" }}>
                            <Grid
                                container
                                alignItems={"center"}
                                mt={"30px"}
                                mb={"30px"}
                            >
                                <BsExclamationTriangle size={20} />
                                <Typography variant="body1" sx={{ ml: "7px" }}>
                                    Signaler un abus
                                </Typography>
                            </Grid>
                        </Link>
                    </Grid>

                    <Grid container item direction="column" lg={4.2}>
                        <Box
                            sx={{
                                m: {
                                    xs: "0px 0px 0px 0px",
                                    sm: "0px 0px 0px 20px",
                                },
                            }}
                        >
                            <form>
                                <Grid
                                    container
                                    alignContent={"center"}
                                    direction={"column"}
                                    border={"1px solid #E5E7EB"}
                                    minHeight={"200px"}
                                >
                                    <Grid mt="20px">
                                        <Typography variant="h2">
                                            Vérifiez votre date et lieu
                                        </Typography>
                                    </Grid>
                                    <Grid mt="10px">
                                        <TextField
                                            required
                                            type="date"
                                            variant="outlined"
                                            id="date"
                                            //label={'Date'}
                                            fullWidth
                                            autoComplete="date"
                                            size="small"
                                            sx={{ width: "340px" }}
                                            value={dateRecherche}
                                            onChange={(e) => setDateRecherche(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid mt="10px">
                                        <TextField
                                            required
                                            id="lieu"
                                            type="text"
                                            variant="outlined"
                                            fullWidth
                                            value={lieuRecherche}
                                            onChange={(e) => setLieuRecherche(e.target.value)}
                                            sx={{ width: "340px" }}
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid mt="10px">
                                        <Button onClick={() => {
                                            handleClick();
                                        }} variant="contained" color="primary">
                                            Recherche
                                        </Button>
                                        <Button onClick={() => {
                                            handleClickTous(); 
                                        }}  variant="contained" color="primary">Afficher toutes les dispos</Button>
                                    </Grid>
                                    
                                    <Modal
                                        isOpen={modalIsOpen}
                                        onRequestClose={closeModal}
                                        contentLabel="Event Modal"
                                        shouldCloseOnOverlayClick={false}
                                        style={{
                                            overlay: {
                                                zIndex: 1000,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            },
                                            content: {
                                                zIndex: 1001,
                                                position: "relative",
                                                top: "auto",
                                                left: "auto",
                                                right: "auto",
                                                bottom: "auto",
                                                border: "1px solid #ccc",
                                                background: "white",
                                                WebkitOverflowScrolling: "touch",
                                                borderRadius: "4px",
                                                outline: "none",
                                                padding: "20px",
                                                width: "auto",
                                                maxHeight: "80vh" 
                                            },
                                            
                                            
                                        }}
                                        
                                    >
                                        <div
                                        style={{
                                        position: "sticky",
                                        top: 0,
                                        backgroundColor: "white",
                                        padding: "10px",
                                        borderBottom: "1px solid #ccc",
                                        textAlign: "left",
                                        }}
                                    >
                                        <h2>Disponibilités trouvées</h2>
                                        <table>
                                        <thead>
                                            <tr>
                                            <th>Titre</th>
                                            <th>Date</th>
                                            <th>Nom</th>
                                            </tr>
                                        </thead>
                                        </table>
                                    </div>

                                        {showDisponibilites && (
                                        <div style={{ maxHeight: "calc(80vh - 50px)", overflowY: "auto" }}>
                                            <DisponibilitesModal 
                                                disponibilites={disponibilites}
                                                closeModal={closeModal}
                                                openReserverFormModal={openReserverFormModal} 
                                                onSelectedDisponibiliteChange={onSelectedDisponibiliteChange}
                                            />
                                            
                                        </div>
                                    )}
                                        <Footer onClose={closeModal} />
                                    </Modal>

                                    <Modal isOpen={reserverFormIsOpen} onRequestClose={closeReserverFormModal} contentLabel="Reserver Form Modal">
                                        <ReserverForm
                                        onClose={closeReserverFormModal}
                                        selectedDate={selectedDate}
                                        selectedTitle={selectedTitle}
                                        selectedPrestataire={selectedPrestataire}
                                        disponibilites={disponibilites}
                                        setDisponibilites={setDisponibilites}
                                        />
                                    </Modal>

                                    {dispo() && (
                                        <Grid mt="10px">
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    fontWeight: 700,
                                                    fontSize: "14px",
                                                }}
                                            >
                                                Disponible
                                            </Typography>
                                        </Grid>
                                    )}
                                </Grid>

                                {lstPacks.length > 0 &&
                                    lstPacks.map((p, index) => (
                                        <Pack
                                            pack={p}
                                            nbPack={lstPacks.length}
                                        />
                                    ))}

                                <Button
                                    disabled={dispo() === false}
                                    onClick={() => handleAddPanier()}
                                    variant="contained"
                                    sx={{
                                        textTransform: "none",
                                        mt: "20px",
                                        width: "163px",
                                        fontSize: "14px",
                                    }}
                                >
                                    Ajouter au panier
                                </Button>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            )}
        </>
    );
}
