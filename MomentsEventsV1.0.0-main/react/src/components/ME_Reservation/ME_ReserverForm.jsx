import React from "react";


const ReserverForm = ({closeModal, onClose, selectedDate, selectedTitle}) => {

    
    const handleReservation = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            date: formData.get('date')
        }
        console.log(data);
        onClose();
        closeModal();

    }

  return (
    <div>
      <h1>Formulaire de réservation pour {selectedTitle}</h1>
      <form onSubmit={handleReservation}>
        <label>
          Nom:
          <input type="text" name="name" />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
        Date et heure:
        <input 
            type="datetime-local" 
            name="date" 
            value={selectedDate ? selectedDate.slice(0, 16) : ""} 
            readOnly 
        />
        </label>
        <label>Selectionner le temps de la prestation    </label>
        <select name="time"style={{ height: '70px' }}>
            <option value='1' >1h </option>
            <option value='2'>2h </option>
            <option value='3'>3h </option>
            <option value='4'>4h </option>
            <option value='5'>5h </option>
            <option value='6'>6h </option>
            <option value='7'>7h </option>
        </select>
        <div style={{ display: 'flex'}}>
        <input type="button" value="Annuler" onClick={onClose} />
        <input type="submit" value="Réserver"  /> 
        </div>
        
      </form>
    </div>
  );
}

export default ReserverForm;