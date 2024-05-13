
import React from "react";
import Modal from "react-modal";

const ModifEvent = ({
    isOpen,
    onRequestClose,
    selectedEvent,
    handleConfirmDelete,
    handleCancelDelete,
    allDay,
    setAllDay,
    setSelectedTimes,
    selectedDate,
    selectedTimes,
    showTimeDropdown,
    prestations,
  }) => {
    
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Supprimer disponibilité"
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
            <h2>Supprimer {prestations} </h2>
            <p>Date sélectionnée: {selectedDate}</p>

            <label>
                Journée entière
                <input
                    type="radio"
                    name="eventTime"
                    checked={allDay}
                    onChange={() => setAllDay(true)}
                />
            </label>
            <label>
                Heure spécifique
                <input
                    type="radio"
                    name="eventTime"
                    checked={!allDay}
                    onChange={() => {
                        setAllDay(false);
                        setShowTimeDropdown(true);
                    }}
                />
            </label>
            {showTimeDropdown && (
                <label>
                    Heure :
                    <select
                        multiple
                        value={selectedTimes}
                        onChange={(e) => {
                            const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                            setSelectedTimes(selectedOptions);
                        }}
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
            
            <button onClick={handleConfirmDelete}>Confirmer la suppression</button>
            <button onClick={handleCancelDelete}>Annuler</button>
        </Modal>
    );
};

export default ModifEvent;
