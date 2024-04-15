{
    /* #MomentsEvent */
}
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { format } from 'date-fns';
import frLocale from '@fullcalendar/core/locales/fr';
import ModifEvent from './ModifEvent';
import axiosClient from '../../axios-client'
import Modal from "react-modal";
import "../../index.css"

function convertToUserTimezone(utcDate) {
    // Création d'un nouvel objet Date à partir de la date UTC
    const date = new Date(utcDate);
  
    // Obtention du décalage horaire de l'utilisateur par rapport à l'heure UTC en minutes
    const userTimezoneOffset = date.getTimezoneOffset();
  
    // Ajout du décalage horaire de l'utilisateur pour obtenir la date locale
    date.setMinutes(date.getMinutes() + userTimezoneOffset);
  
    
  
    return date;
  }

const Calendar = () => {
    let formattedEvents = [];
    const [events, setEvents] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [allDay, setAllDay] = useState(true);
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [showTimeDropdown, setShowTimeDropdown] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [prestations, setPrestations] = useState([]);
    const [prestationId, setPrestationId] = useState('');
    const [prestation, setPrestation] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    const [userId, setUserId] = useState(null);
    const [specificTime, setSpecificTime] = useState(false);

    const openModal = (date) => {
        setSelectedDate(date);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    
    const handleEventClick = (info) => {
        
        const alertShownTime = localStorage.getItem("alertShownTime");
        if (!alertShownTime || (Date.now() - alertShownTime > 5 * 60 * 1000)) {
            // Afficher l'alerte uniquement si elle n'a pas déjà été affichée ou si elle a expiré
            alert('Voulez-vous supprimer cet événement.');
            
            // Enregistrer dans le stockage local que l'alerte a été affichée
            localStorage.setItem("alertShownTime", Date.now());
        }
        
        const eventId = info.event.id;
        deleteEvent(eventId);
        info.event.remove();

    };
    const deleteEventPastdate = async () => {
        try {
            const response = await axiosClient.get('/availabilities');
            const availabilities = response.data;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const pastEvents = availabilities.filter(availability => convertToUserTimezone(availability.dateTime) < today);
            for (let i = 0; i < pastEvents.length; i++) {
                const eventId = pastEvents[i].id;
                await axiosClient.delete(`/availabilities/${eventId}`);
            }
            const newEvents = availabilities.filter(availability => new Date(availability.dateTime) >= today);
            setEvents(newEvents);
        } catch (error) {
            console.error('Erreur lors de la suppression des événements passés :', error);
        }
    };

    const deleteEvent = async (eventId) => {
        try {
            // Envoyer une requête DELETE à l'API pour supprimer l'événement avec l'ID donné
            const response = await axiosClient.delete(`/availabilities/${eventId}`);
            //console.log(response.data); // Afficher la réponse de l'API si nécessaire
            // Mettre à jour l'état events en supprimant l'événement avec l'ID donné
            setEvents(events.filter(event => event.id !== eventId));
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'événement :', error);
        }
    };

    const handleDateClick = (info) => {
        
        if (!modalIsOpen && info.date > new Date()) {
        const clickedDate = info.dateStr;
        
        // Vérifier si un événement existe déjà à l'heure sélectionnée
        const existingEvent = events.find(event => {
            const eventDate = new Date(event.date);
            return eventDate.getTime() === info.date.getTime();
        });

        if (existingEvent) {
            // Si un événement existe, demandez à l'utilisateur de confirmer la suppression
            if (window.confirm("Voulez-vous supprimer cette disponibilité ?")) {
                // Supprimez l'événement du state et de la base de données
                handleConfirmDelete(existingEvent);
            }
        } else {
            // Si aucun événement n'existe, ouvrez le modal pour ajouter une disponibilité
            openModal(clickedDate);
        }
    }
    };

    const handleConfirm = async () => {

        try {
            if (!prestationId) {
                // Affichez un message d'erreur sur la fenetre
                alert('Veuillez sélectionner une prestation');
                return; 
            }
            let newEvents = [];
            let prestaId = prestationId;
            // Créer un tableau d'événements pour chaque heure sélectionnée
            if (allDay) {
                for (let i = 7; i < 24; i++) {
                    newEvents.push({
                        dateTime: format(new Date(`${selectedDate}T${i.toString().padStart(2, '0')}:00:00`), "yyyy-MM-dd'T'HH:mm:ss"),
                        idPrestation: prestaId,
                    });
                }
                
            } else {
                selectedTimes.forEach((time) => {
                    newEvents.push({
                        dateTime: format(new Date(`${selectedDate}T${time}:00`), "yyyy-MM-dd'T'HH:mm:ss"),
                        idPrestation: prestationId,
                    });
                });
            }
            
            // Enregistrer les événements dans la base de données
            for (let i = 0; i < newEvents.length; i++) {
                const response = await axiosClient.post('/availabilities', newEvents[i]);
                //console.log(response.data); // Process or log the response as needed
                if (response.status === 201) {
                    // Si la réponse est réussie, mettre à jour les événements dans le state
                    const addedAvailability = response.data;
                    const eventId = addedAvailability.id;
                    addedAvailability.id = eventId;
                    //console.log(addedAvailability);
                    setEvents([...events, addedAvailability]);
                    // recuper directement les disponibilités mais trop de requetes a la fois ->
                    //fetchData();
                    
                } else if (response.status === 409) {
                    // Si le statut est 409 (conflit), afficher une alerte spécifique
                    alert('Une disponibilité similaire existe déjà.');
                } else {
                    // Si la réponse échoue, afficher un message d'erreur
                    console.error('Erreur lors de l\'enregistrement de la disponibilité:', response.statusText);
                }
            }
            closeModal();
        } catch (error) {
            if (error.response) {
                
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
            } else if (error.request) {
                // La requête a été faite mais pas de réponse
                console.error('Error request:', error.request);
            } else {
                // Quelque chose s'est passé dans la configuration de la requête
                console.error('Error message:', error.message);
            }
            console.error('Erreur lors de l\'enregistrement de la disponibilité :', error);
        }
    };


    const fetchData = async () => {
        try {
            // Récupérer les prestations de la base de données
            deleteEventPastdate();
            const prestationsResponse = await axiosClient.get('/prestations');
            setPrestations(prestationsResponse.data);

            const user = JSON.parse(localStorage.getItem("USER"));
            if (user) {
                const userIdP = user.idPersonne;
                console.log(userIdP);
                setUserId(userIdP);
                const userPrestations = prestationsResponse.data.filter(prestation => prestation.id_user === userIdP);
                const availabilitiesResponse = await axiosClient.get('/availabilities');
                const availabilities = availabilitiesResponse.data;
    
                // Formater les disponibilités dans le format attendu par FullCalendar
                const formattedEvents = availabilities
                .filter(availability => userPrestations.some(prestation => prestation.id === availability.idPrestation))
                .map(availability => ({
                    title: prestationsResponse.data.find(prestation => prestation.id === availability.idPrestation).nom,
                    start: availability.dateTime, 
                    id: availability.id,
                }));
                
                // Mettre à jour l'état events avec les disponibilités récupérées
                setEvents(formattedEvents);
            
            }
 
           
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    };


    useEffect(() => {

        // Récupérer les prestations de la base de données
       if (!isMounted) {
        fetchData();
        setIsMounted(true);
    }
    }
    , [isMounted]);


    return (
        <div>
            
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                events={events}
                eventClick={handleEventClick}
                dateClick={handleDateClick}
                select={(info) => handleDateClick(info)}
                validRange={{
                    start: new Date(),
                }}
                dayCellDidMount={({ date, el }) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
            
                    // Désactiver les jours passés
                    if (date < today) {
                        el.style.backgroundColor = "#f2f2f2";
                        el.style.pointerEvents = "none";
                    }
                }}
                locales={[frLocale]}
                timeZone="Europe/Paris"
            />
            
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
                        overflow: "auto",
                        WebkitOverflowScrolling: "touch",
                        borderRadius: "4px",
                        outline: "none",
                        padding: "20px",
                        width: "auto",

                    },
                }}
            >
                <h2>Créer un événement</h2>
                <p>Date sélectionnée: {selectedDate}</p>
                <label className="radio-label">
                    <span className="radio-text">Prestation</span>
                    <select
                        id="prestation"
                        value={prestationId}
                        onChange={(e) => setPrestationId(e.target.value)}
                        style={{ width: "auto", height: "25px", marginLeft: "10px"}}
                    >
                        <option value="">Sélectionnez une prestation</option>
                        // Récupérer les prestations de l'utilisateur connecté
                        
                        {prestations
                        .filter(prestation => prestation.id_user === userId)
                        .map((prestation) => (
                            <option key={prestation.id} value={prestation.id}>
                                {prestation.nom}
                            </option>
                        ))}
                    </select>
                </label>
                <div  className="radio-container">
                <label className="radio-label">
                    <span className="radio-text">Journée entière</span>
                    <input
                        type="radio"
                        value="allDay"
                        name="eventTime"
                        checked={allDay}
                        onChange={() => {
                            setAllDay(true);
                            setShowTimeDropdown(false);
                        }}
                    />
                </label>
                </div>
                <div className="radio-container">
                <label className="radio-label">
                <span className="radio-text">Heure(s) spécéfique(s)</span> 
                    <input
                        type="radio"
                        name="eventTime"
                        value="specificTime"
                        checked={!allDay}
                        onChange={() => {
                            setAllDay(false);
                            setShowTimeDropdown(true);
                        }}
                    />
                </label>
                {showTimeDropdown && (
                    <label>
                       
                        <select
                            multiple
                            value={selectedTimes}
                            onChange={(e) =>
                                setSelectedTimes(
                                    Array.from(
                                        e.target.selectedOptions,
                                        (option) => option.value
                                    )
                                )
                            }
                        >
                            <option value="06:00">06:00</option>
                            <option value="07:00">07:00</option>
                            <option value="08:00">08:00</option>
                            <option value="09:00">09:00</option>
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                            <option value="13:00">13:00</option>
                            <option value="14:00">14:00</option>
                            <option value="15:00">15:00</option>
                            <option value="16:00">16:00</option>
                            <option value="17:00">17:00</option>
                            <option value="18:00">18:00</option>
                            <option value="19:00">19:00</option>
                            <option value="20:00">20:00</option>
                            <option value="21:00">21:00</option>
                            <option value="22:00">22:00</option>
                            <option value="23:00">23:00</option>
                            {/* Ajoutez d'autres options d'heures selon vos besoins */}
                        </select>
                    </label>
                )}
                </div>
                <br />
                <br />
                <button onClick={handleConfirm}>Confirmer</button>
                <button onClick={closeModal}>Annuler</button>

            </Modal>

        </div>
    );
};

export default Calendar;
