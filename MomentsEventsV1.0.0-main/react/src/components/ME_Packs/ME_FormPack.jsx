import react, {useState, useEffect} from "react";
import axiosClient from "../../axios-client";
import "../../index.css";

const ME_FormPack = ({ prestation }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        priceType: "", 
        priceValue: 0,
        maxQuantity: 0,
        prestations: []
    });
    const [showList, setShowList] = useState(false);
    const [prestations, setPrestations] = useState([]);
    const [userId, setUserId] = useState(null);
    const [prestationsId, setPrestationsId] = useState([]);
    const [packs, setPacks] = useState([]);
 
    const selectPrestation = async () => {
        try {
            const prestationsResponse = await axiosClient.get('/prestations');
            const user = JSON.parse(localStorage.getItem("USER"));
            let userPrestations = [];
            if (user) {
                
                const userIdP = user.idPersonne;
                console.log('user id '+userIdP);
                setUserId(userIdP);
                userPrestations = prestationsResponse.data.filter(prestation => prestation.id_user === userIdP);

            }    
            setPrestations(userPrestations); // Mettez à jour le state avec les données des prestations
        } catch (error) {
            console.error('Erreur lors de la récupération des prestations :', error);
        }
    }

    const handlePrestationSelect = (event) => {
        const prestId = event.target.value;
        // Vérifiez si la prestation est déjà sélectionnée ou désélectionnée
        if (prestationsId.includes(prestId)) {
            // Si la prestation est déjà sélectionnée, retirez-la du tableau
            setPrestationsId(prestationsId.filter(id => id !== prestId));
        } else {
            // Si la prestation n'est pas encore sélectionnée, ajoutez-la au tableau
            setPrestationsId([...prestationsId, prestId]);
        }
    };

    

    const insertPack = async () => {
 
        console.log('Insertion du pack...');
        console.log('tableau id :', prestationsId);
        console.log('formData :', formData);
        try {
            if (formData.priceType === "unitaire") {
                
                const response = await axiosClient.post('/packs', {
                    nom: formData.name,
                    description: formData.description,
                    prix_fixe: null,
                    unite: formData.maxQuantity,
                    prix_unite: formData.priceValue,
                    prestations: prestationsId
                });
                console.log('Pack inséré avec succès :', response);
            }
            else {
                const response = await axiosClient.post('/packs', {
                    nom: formData.name,
                    description: formData.description,
                    prix_fixe: formData.priceValue,
                    unite: null,
                    prix_unite: null,
                    prestations: prestationsId
                });
                console.log('Pack inséré avec succès :', response);
            }
           
            onUpdate(response.data);

        } catch (error) {
            console.error('Erreur lors de l\'insertion du pack :', error);
        }
    }

    const handlePriceTypeChange = (priceType) => {
        setFormData({
            ...formData,
            priceType: priceType
        });
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleShowListChange = (value) => {
        selectPrestation();
        setPrestationsId([prestation.id]);
        setShowList(value === "oui");
    };

    const handleSubmit = async (event) => {
        console.log('submit...');
        event.preventDefault();
        await insertPack();
        
    };

    useEffect(() => {
        setPrestationsId([prestation.id]);
    }, []);

    return (
        <div>
            <h1>Création de pack pour {prestation.nom}</h1>
            <form onSubmit={handleSubmit}>
            <label>
                Nom:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <label>
                    Voulez-vous lier des prestations à ce pack ?
                </label>
                <div>
                
                <button 
                    type = "button"
                    className="button"
                    style={{ marginRight: "10px", backgroundColor: showList ? "#4a4a4a" : "#C0C0C0" }}
                    onClick={() => handleShowListChange("oui")}
                >
                    Oui
                </button>
                <button
                    type = "button"
                    className="button"
                    style={{ backgroundColor: !showList ? "#4a4a4a" : "#C0C0C0" }}
                    onClick={() => handleShowListChange("non")}
                >
                    Non
                </button>
                </div>
                    {showList && (
                    <ul style={{ listStyleType: 'none' }}>
                        {prestations
                            .filter((presta) => presta.id !== prestation.id)
                            .map((presta, index) => (
                            <li key={index}>
                             <label style={{ display: 'flex' }}>
                                <div>
                                    <input
                                        type="checkbox"
                                        name="prestations"
                                        value={presta.id}
                                        onChange={handlePrestationSelect}
                                    />
                                </div>
                                <div style={{ marginLeft: "20px" }}>
                                    {presta.nom}
                                </div>
                            </label>
                            </li>
                        ))}
                    </ul>
                )}

                <label>
                    Description:
                    <input type="text" name="description" value={formData.description} required onChange={handleChange} />
                </label>
                <div>
                    <button type="button"   className="button" onClick={() => handlePriceTypeChange("unitaire")} style={{ backgroundColor: formData.priceType === "unitaire" ? "#4a4a4a" : "#C0C0C0" }}>Prix Unitaire</button>
                    <button type="button" required className="button" onClick={() => handlePriceTypeChange("fixe")} style={{ backgroundColor: formData.priceType === "fixe" ? "#4a4a4a" : "#C0C0C0" }}>Prix Fixe</button>
                    
                </div>
                {formData.priceType === "unitaire" && (
                    <label>
                        Nombre maximum de personnes:
                        <input type="number" required name="maxQuantity" value={formData.maxQuantity} onChange={handleChange} />
                    </label>
                )}
                <label>
                    Montant:
                    <input type="number" required name="priceValue" value={formData.priceValue} onChange={handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>

        </div>
    );
}

export default ME_FormPack;