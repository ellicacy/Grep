import React, {useState} from "react";
import ME_CreatePack from "../../components/ME_Packs/ME_CreatePack";
import ME_ChoicePrestationPack from "../../components/ME_Packs/ME_ChoicePrestationPack";
function Packs() {
    const [showForm, setShowForm] = useState(false);

    const handleClick = () => {
        setShowForm(true);
    };

    return (
        <div>
            <h1>Pack</h1>
            {showForm ? <ME_ChoicePrestationPack /> : <ME_CreatePack />}
            {!showForm && <button onClick={handleClick}>Créer nouveau pack</button>}
            {/* Ajoutez ici les composants et le code nécessaires pour la page */}
        </div>
    );
    }

export default Packs;