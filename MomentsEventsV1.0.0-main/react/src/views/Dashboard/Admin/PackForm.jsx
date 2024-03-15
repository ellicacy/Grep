import CKeditor from "../../../components/CKeditor";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function PackForm(id) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [isPrixFixe, setIsPrixFixe] = useState(true);
    const { idParam } = useParams();
    const [packNew, setPackNew] = useState(null);

    //Champ pour selection d'un prestataire
    const [lstPrestataire, setLstPrestataire] = useState([]);

    const [prestataire, setPrestataire] = useState(null);

    const [valuePrestataire, setValuePrestataire] = useState(null);
    const [inputValuePrestataire, setInputValuePrestataire] = useState("");

    //Champ pour selection des prestations d'un prestataire
    const [lstPrestationPrestataire, setLstPrestationPrestataire] = useState(
        []
    );
    const [prestation, setPrestation] = useState([]);

    //Champ pour stocker le nouveau pack
    const [lstPacks, setLstPacks] = useState([]);
    const [pack, setPack] = useState(null);
    const [tabPack, setTabPack] = useState([]);

    // CHAMPS POUR L'AJOUT D'UN PACK
    const [nom, setNom] = useState("");
    const [description, setDescription] = useState("");
    const [prixFixe, setPrixFixe] = useState(0);
    const [unite, setUnite] = useState("vide");
    const [prixUnite, setPrixUnite] = useState(0);

    const handleCheckbox = (e) => {
        if (e.target.checked) {
            // alert('is checked')
            // console.log('is checked')
            setIsPrixFixe(true);
            setUnite("vide");
            setPrixUnite(0);
        } else {
            // alert('isn\'t checked')
            // console.log('isn\'t checked')
            setIsPrixFixe(false);
            setPrixFixe(0);
        }
    };

    const getPrestataires = async () => {
        setLoading(true);
        await axiosClient
            .get("/admin/prestataires")
            .then(({ data }) => {
                setLstPrestataire(data.data);
                console.log("setLstPrestataire");
                console.log(data);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
            });
    };

    const getPrestationPrestataire = async (idPrestataire) => {
        await axiosClient
            .get("/admin/user/" + idPrestataire + "/getPrestations")
            .then(({ data }) => {
                console.log(data);
                setLstPrestationPrestataire(data);
                console.log(lstPrestationPrestataire);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const getPack = async () => {
        setLoading(true);
        await axiosClient
            .get(`/admin/packs/${idParam}`)
            .then(({ data }) => {
                // console.log('RETOUR DE LA METHODE GETPACK() :')
                // console.log(data.data)
                setNom(data.data.nom);
                setDescription(data.data.description);
                setPrixFixe(data.data.prixFixe);
                setUnite(data.data.unite);
                setPrixUnite(data.data.prixUnite);
                if (data.data.unite != "vide") {
                    setIsPrixFixe(false);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    if (idParam) {
        // alert('on est la (idParam)')
        useEffect(() => {
            setTabPack([])
            getPack();
            setLoading(false);
            setEditorLoaded(true);
        }, []);
    } else {
        // alert('on est la (sans idParam)')
        useEffect(() => {
            setTabPack([])
            getPrestataires();
            // console.log('LSTPRESTATATIAWERIJAWEéLIRFHAéWL')
            // console.log(lstPrestataire)
            // setValuePrestataire(lstPrestataire[0]);
            setLoading(false);
            setEditorLoaded(true);
        }, []);
    }

    const onModify = (e) => {
        e.preventDefault();
        alert("formulaire modification soumis");
        const formData = new FormData();
        if (prixFixe != 0) {
            setUnite("vide");
        }
        formData.append("nom", nom);
        formData.append("description", description);
        formData.append("prix_fixe", prixFixe);
        formData.append("unite", unite);
        formData.append("prix_unite", prixUnite);
        // console.log(formData)

        axiosClient
            .post(`/admin/updatePack/${idParam}`, formData)
            .then(({ data }) => {
                // console.log(data.data)
                navigate("/admin/packs");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        alert("formulaire ajout soumis");
        const formData = new FormData();
        formData.append("nom", nom);
        formData.append("description", description);
        formData.append("prix_fixe", prixFixe);
        formData.append("unite", unite);
        formData.append("prix_unite", prixUnite);
        // console.log(formData)
        // setLoading(true)

        const {data} = await axiosClient.post('/admin/packs', formData)

        const idNewPack = data.pack.id;
        setPackNew(data.pack)
        // setTabPack([idNewPack]);
        tabPack.push(idNewPack)
        
        console.log('setPackNew')
        console.log(packNew)
        console.log('idNewPack =')
        console.log(idNewPack)
        console.log('tabPack =')
        console.log(tabPack)

        await axiosClient.get('/admin/packs')
        .then((data)=>{
            console.log('DATA PACKS =')
            console.log(data.data)
            setLstPacks(data.data);

            const dataPack = new FormData();
            dataPack.append("pack[]", tabPack);

            console.log('DATAPACK =')
            console.log(dataPack)

            axiosClient.post(
                "prestations/" + prestation + "/pack/add",
                dataPack
            )
            .then(({ data }) => {
                // console.log(data);
            })
            .catch((error) => {
                // console.log(error);
            });
        })
        .catch((error)=>{
            console.log(error)
        })

        setTabPack([])

        return

        await axiosClient
            .post("/admin/packs", formData)
            .then(({ data }) => {
                // console.log('RETOUR DE L\'APPEL AXIOS :')
                // console.log(data)
                // navigate("/admin/packs");
                setPackNew(data.pack);
                // setLoading(false)
                axiosClient
                    .get("admin/packs")
                    .then(({ data }) => {
                        setLstPacks(data);
                        // setLoading(false)
                        // const newPack = lstPacks[lstPacks.length - 1];
                        // const newPack = data[data.length - 1];
                        const newPack = packNew
                        console.log("NEW PACK !!!!");
                        console.log(newPack);
                        setPack(newPack);
                        setTabPack([newPack.id]);

                        const dataPack = new FormData();
                        dataPack.append("pack[]", tabPack);

                        console.log("DATAPACK = ");
                        console.log(dataPack);
                        
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleChangePrestataire = (event) => {
        setPrestataire(event.target.value);
        getPrestationPrestataire(event.target.value);
    };

    const handleChangePrestationPrestataire = (event) => {
        setPrestation(event.target.value);
        // getPrestationPrestataire(event.target.value);
    };

    return (
        <>
            {loading ? (
                <div>
                    <h1>Chargement des données ...</h1>
                </div>
            ) : (
                <div
                    className="card animated fadeInDown"
                    style={{ padding: "0 20px 20px", width: "100%" }}
                >
                    {idParam ? (
                        <>
                            <h1 style={{ marginBottom: "20px" }}>
                                Modification d'un pack ({idParam})
                            </h1>

                            <form onSubmit={onModify}>
                                <input
                                    type="text"
                                    placeholder="Entrer le nom du pack"
                                    value={nom}
                                    onChange={(e) => {
                                        setNom(e.target.value);
                                    }}
                                />
                                <br />
                                <textarea
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                    style={{ width: "100%" }}
                                    value={description}
                                    name="pack"
                                    id="pack"
                                    rows="5"
                                    placeholder="Entrer la description du pack"
                                ></textarea>
                                {/* <CKeditor 
                        name={'pack'}
                        placeholder={'Entrer la description du pack'}
                        onChange={(data)=>{
                            // console.log(data)
                            setDescription(data)
                        }}
                        value={description}
                        editorLoaded={editorLoaded}
                    /> */}
                                <br />
                                <br />
                                <div style={{ display: "flex" }}>
                                    <input
                                        type="checkbox"
                                        id="prixFixe"
                                        value={isPrixFixe}
                                        defaultChecked={isPrixFixe}
                                        onChange={handleCheckbox}
                                        style={{
                                            width: "50px",
                                            height: "15px",
                                        }}
                                    />
                                    <label htmlFor="prixFixe">
                                        Prix fixe (forfait global)
                                    </label>
                                </div>
                                {isPrixFixe ? (
                                    <div>
                                        <h4>Entrer le prix fixe :</h4>
                                        <input
                                            type="number"
                                            step={0.05}
                                            placeholder="Entrer le prix fixe"
                                            value={prixFixe}
                                            onChange={(e) => {
                                                setPrixFixe(e.target.value);
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <h4>Entrer le type d'unité :</h4>
                                        <input
                                            type="text"
                                            placeholder="Entrer le nombre d'unité"
                                            value={unite}
                                            onChange={(e) => {
                                                setUnite(e.target.value);
                                            }}
                                        />
                                        <br />
                                        <h4>Entrer le prix d'une unité :</h4>
                                        <input
                                            type="number"
                                            step={0.05}
                                            placeholder="Entrer le prix d'une unité"
                                            value={prixUnite}
                                            onChange={(e) => {
                                                setPrixUnite(e.target.value);
                                            }}
                                        />
                                        <br />
                                    </div>
                                )}
                                <input
                                    type="submit"
                                    className="btn btn-success"
                                    value={"Modifier le pack"}
                                />
                            </form>
                        </>
                    ) : (
                        <>
                            <h1 style={{ marginBottom: "20px" }}>
                                Nouveau pack
                            </h1>
                            <Typography variant="h2" mb={"20px"}>
                                Selectionnez votre prestataire
                            </Typography>

                            <Autocomplete
                                disablePortal
                                fullWidth
                                id="selection-autocompletion-prestataire"
                                key="selection-autocompletion-prestataire"
                                value={valuePrestataire}
                                onChange={(event, newValue) => {
                                    setValuePrestataire(newValue);
                                    const idPrestataire = newValue
                                        .split("|")
                                        .at(0);
                                    getPrestationPrestataire(idPrestataire);
                                }}
                                inputValue={inputValuePrestataire}
                                onInputChange={(event, newInputValue) => {
                                    setInputValuePrestataire(newInputValue);
                                }}
                                options={lstPrestataire.map(
                                    (prestataire, index) =>
                                        prestataire.idPersonne +
                                        "|" +
                                        prestataire.personneNom +
                                        " " +
                                        prestataire.personnePrenom
                                )}
                                sx={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Prestataire"
                                    />
                                )}
                            />

                            {lstPrestationPrestataire.length > 0 ? (
                                <>
                                    <InputLabel id="demo-simple-select-autowidth-label">
                                        Prestation
                                    </InputLabel>
                                    <Select
                                        labelId="selection-prestation-du-prestataire"
                                        id="selection-prestation-du-prestataire"
                                        value={prestation.id}
                                        onChange={
                                            handleChangePrestationPrestataire
                                        }
                                        fullWidth
                                        label="prestation"
                                    >
                                        {lstPrestationPrestataire.map(
                                            (p, index) => (
                                                <MenuItem value={p.id}>
                                                    {p.id} - {p.nom}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                </>
                            ) : (
                                <></>
                            )}

                            <form onSubmit={onSubmit}>
                                <input
                                    type="text"
                                    placeholder="Entrer le nom du pack"
                                    value={nom}
                                    onChange={(e) => {
                                        setNom(e.target.value);
                                    }}
                                />
                                <br />
                                <textarea
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                    style={{ width: "100%" }}
                                    value={description}
                                    name="pack"
                                    id="pack"
                                    rows="5"
                                    placeholder="Entrer la description du pack"
                                ></textarea>
                                {/* <CKeditor 
                        name={'pack'}
                        placeholder={'Entrer la description du pack'}
                        onChange={(data)=>{
                            // console.log(data)
                            setDescription(data)
                        }}
                        value={description}
                        editorLoaded={editorLoaded}
                    /> */}
                                <br />
                                <br />
                                <div style={{ display: "flex" }}>
                                    <input
                                        type="checkbox"
                                        id="prixFixe"
                                        value={isPrixFixe}
                                        defaultChecked={isPrixFixe}
                                        onChange={handleCheckbox}
                                        style={{
                                            width: "50px",
                                            height: "15px",
                                        }}
                                    />
                                    <label htmlFor="prixFixe">
                                        Prix fixe (forfait global)
                                    </label>
                                </div>
                                {isPrixFixe ? (
                                    <div>
                                        <h4>Entrer le prix fixe :</h4>
                                        <input
                                            type="number"
                                            step={0.05}
                                            placeholder="Entrer le prix fixe"
                                            value={prixFixe}
                                            onChange={(e) => {
                                                setPrixFixe(e.target.value);
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <h4>Entrer le type d'unité :</h4>
                                        <input
                                            type="text"
                                            placeholder="Entrer le nombre d'unité"
                                            value={unite}
                                            onChange={(e) => {
                                                setUnite(e.target.value);
                                            }}
                                        />
                                        <br />
                                        <h4>Entrer le prix d'une unité :</h4>
                                        <input
                                            type="number"
                                            step={0.05}
                                            placeholder="Entrer le prix d'une unité"
                                            value={prixUnite}
                                            onChange={(e) => {
                                                setPrixUnite(e.target.value);
                                            }}
                                        />
                                        <br />
                                    </div>
                                )}
                                <input
                                    type="submit"
                                    className="btn btn-success"
                                    value={"Créer le pack"}
                                />
                            </form>
                        </>
                    )}
                </div>
            )}
        </>
    );
}
