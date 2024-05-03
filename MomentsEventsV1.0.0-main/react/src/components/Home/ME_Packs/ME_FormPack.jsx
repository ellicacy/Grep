import react, {useState, useEffect} from "react";
import axiosClient from "../../../axios-client";
import "../../../index.css";

const ME_FormPack = ({ prestation }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        fixedPrice: 0
    });


    const handleSubmit = (event) => {
        event.preventDefault();
        insertPack();
        
    };

    const insertPack = async () => {
        const id_prestation = prestation.id;
        try {
            const response = await axiosClient.post('/packs', {
                name: formData.name,
                description: formData.description,
                fixedPrice: formData.fixedPrice
            });
            const response2 = await axiosClient.post('/pack_prestation', {
                id_pack: response.data.id,
                id_prestation: id_prestation
            });
            console.log('Pack inséré avec succès :', response2);
            
        } catch (error) {
            console.error('Erreur lors de l\'insertion du pack :', error);
        }
    }

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    return (
        <div>
            <h1>Création de pack pour {prestation.nom}</h1>
            <form>
            <label>
                    Nom:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <label>
                    Description:
                    <input type="text" name="description" value={formData.description} onChange={handleChange} />
                </label>
                <label>
                    Prix Fixe:
                    <input type="number" name="fixedPrice" value={formData.fixedPrice} onChange={handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>

        </div>
    );
}

export default ME_FormPack;