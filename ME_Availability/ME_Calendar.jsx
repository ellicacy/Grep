{
    /* #MomentsEvent */
}
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";


import frLocale from '@fullcalendar/core/locales/fr';

import ModifEvent from './ModifEvent';

import axiosClient from '../../axios-client'

import Modal from "react-modal";
import "../../index.css"

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [allDay, setAllDay] = useState(true);
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [showTimeDropdown, setShowTimeDropdown] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modifEventModalIsOpen, setModifEventModalIsOpen] = useState(false);
    const [prestation, setPrestation] = useState(""); // Ajout du champ "prestation"

    const openModal = (date) => {
        setSelectedDate(date);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    const openModifEventModal = () => {
        setModifEventModalIsOpen(true);
    };

    const closeModifEventModal = () => {
        setModifEventModalIsOpen(false);
    };

    const handleEventClick = (info) => {
        setSelectedEvent(info.event);
        openModifEventModal(true);
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
    const handleConfirmDelete = () => {
        if (selectedEvent) {
            // Supprimer l'événement sélectionné de l'état des événements
            const updatedEvents = events.filter(event => event.id !== selectedEvent.id);
            setEvents(updatedEvents);
            closeModifEventModal()
    
            // Code pour supprimer l'événement de la base de données ou d'où vous stockez vos données
            // axios.delete(`/events/${selectedEvent.id}`).then(response => {
            //    console.log("Événement supprimé :", selectedEvent);
            // }).catch(error => {
            //    console.error("Erreur lors de la suppression de l'événement :", error);
            // });
        }

        closeModifEventModal();
    };
    
    const handleCancelDelete = () => {
        closeModifEventModal();
    };

    const customDayRender = ({ date, dayEl }) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (date < today) {
            dayEl.style.backgroundColor = "#f2f2f2";
            dayEl.style.pointerEvents = "none";
        }
    };

    const handleConfirm = async () => {
        try {
            let newEvents = [];
            if (allDay) {
                for (let i = 0; i < 24; i++) {
                    newEvents.push({
                        title: "Dispo" + " - " + prestation,
                        date: `${selectedDate}T${i}:00`,
                        prestation: prestation // Ajout du champ "prestation"
                    });
                }
            } else {
                selectedTimes.forEach((time) => {
                    newEvents.push({
                        title: "Dispo" + " - " + prestation,
                        date: `${selectedDate}T${time}`,
                        prestation: prestation 
                    });
                });
            }
    
            // Envoi de la requête à l'API pour enregistrer les disponibilités
            const response = await axiosClient.post('/availabilities', newEvents);
    
            // Vérification de la réponse de l'API
            if (response.status === 200) {
                // Si la réponse est réussie, mettre à jour les événements dans le state
                setEvents([...events, ...newEvents]);
            } else {
                // Si la réponse échoue, afficher un message d'erreur
                console.error('Erreur lors de l\'enregistrement de la disponibilité:', response.statusText);
            }
    
            // Fermer le modal
            closeModal();
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement de la disponibilité :', error);
        }
    };


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
                dayRender={customDayRender}
                locales={[frLocale]}
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
                <label>
                    Prestation:
                    <input
                        type="text"
                        value={prestation}
                        onChange={(e) => setPrestation(e.target.value)}
                        style={{ width: "25%", height: "25px", marginLeft: "10px"}}
                    />
                </label>
                <label>
                    <input
                        type="radio"
                        name="eventTime"
                        checked={allDay}
                        onChange={() => setAllDay(true)}
                    />
                    Journée entière
                </label>
                <label>
                    <input
                        type="radio"
                        name="eventTime"
                        checked={!allDay}
                        onChange={() => {
                            setAllDay(false);
                            setShowTimeDropdown(true);
                        }}
                    />
                    Heure spécifique
                </label>
                {showTimeDropdown && (
                    <label>
                        Heure :
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
                <br />
                <br />
                <button onClick={handleConfirm}>Confirmer</button>
                <button onClick={closeModal}>Annuler</button>
            </Modal>
            
            <ModifEvent
                isOpen={modifEventModalIsOpen}
                onRequestClose={closeModifEventModal}
                selectedEvent={selectedEvent}
                handleConfirmDelete={handleConfirmDelete}
                handleCancelDelete={handleCancelDelete}
                allDay={allDay}
                setAllDay={setAllDay}
                setSelectedTimes={setSelectedTimes}
                selectedDate={selectedDate}
                selectedTimes={selectedTimes}
                showTimeDropdown={showTimeDropdown}
                prestations={prestation}
            />
           

            
        </div>
    );
};

export default Calendar;
