{
    /* #MomentsEvent */
}
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import axiosClient from '../../axios-client'

import Modal from "react-modal";

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [allDay, setAllDay] = useState(true);
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [showTimeDropdown, setShowTimeDropdown] = useState(false);

    const openModal = (date) => {
        setSelectedDate(date);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleEventClick = (info) => {
        alert(`Clicked on event: ${info.event.title}`);
    };

    const handleDateClick = (info) => {
        if (!modalIsOpen && info.date > new Date()) {
            openModal(info.dateStr);
        }
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
        let newEvent = {};
        if (allDay) {
            /*newEvent = {
                title: "Disponible",
                date: selectedDate,
                allDay: allDay,
            };*/

            // Créer une liste d'événements pour chaque heure de la journée
            let newEvents = {};
            for (let i = 0; i < 24; i++) {
                newEvents.push({
                    title: "Disponible",
                    date: `${selectedDate}T${i}:00`,
                });
            }

            // Faire appel vers l'API Laravel pour enregistrer les disponibilités
            await axiosClient.post('/availabilities', newEvents);

            // Ajoute le nouvel événement au state
            setEvents([...events, ...newEvents]);


        } else {
            newEvent = selectedTimes.map((time) => ({
                title: "Disponible",
                availability: `${selectedDate}T${time}`,
            }));

            // Faire appel vers l'API Laravel pour enregistrer les disponibilités
            await axiosClient.post('/availabilities', newEvent);


             // Ajoute le nouvel événement au state
             setEvents([...events, ...newEvent]);
        }

        try {



        } catch (error) {
            console.error('Erreur lors de l\'enregistrement de la disponibilité :', error);
        }

        closeModal();
    };


    return (
        <div>
            <h1>Mes disponibilitées</h1>
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
                    },
                }}
            >
                <h2>Créer un événement</h2>
                <p>Date sélectionnée: {selectedDate}</p>

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
        </div>
    );
};

export default Calendar;
