import "../../../components/init";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { useEffect } from "react";
// import { Editor } from "react-draft-wysiwyg";
// import Wisiwig from '../components/Wisiwig';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
import CKeditor from "../../../components/CKeditor";
// import parse from 'html-react-parser';

export default function PrestationForm(id, prestations) {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState("");
    const [txtWisiwig, setTxtWisiwig] = useState("");
    const [textValue, setTextValue] = useState("");
    const [loading, setLoading] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const navigate = useNavigate();
    const { idParam } = useParams();
    const [userId] = useState(id.id);
    const [catId, setCatId] = useState([]);
    const [nom, setNom] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState("");
    const [photos, setPhotos] = useState([]);
    const [contraintes, setContraintes] = useState("");
    const [typeFacturation, setTypeFacturation] = useState("");
    const [prixFacturation, setPrixFacturation] = useState("");
    const [duree, setDuree] = useState("");
    const [nbPersMin, setNbPersMin] = useState("");
    const [nbPersMax, setNbPersMax] = useState("");
    const [heureMin, setHeureMin] = useState("");
    const [heureMax, setHeureMax] = useState("");

    const [categories, setCategories] = useState([]);

    const [idUserMod, setIdUserMod] = useState("");
    const [catIdMod, setCatIdMod] = useState("");
    const [nomMod, setNomMod] = useState("");
    const [descriptionMod, setDescriptionMod] = useState("");
    const [photoMod, setPhotoMod] = useState("");
    const [photosMod, setPhotosMod] = useState([]);
    const [contraintesMod, setContraintesMod] = useState("");
    const [typeFacturationMod, setTypeFacturationMod] = useState("");
    const [prixFacturationMod, setPrixFacturationMod] = useState("");
    const [dureeMod, setDureeMod] = useState("");
    const [nbPersMinMod, setNbPersMinMod] = useState("");
    const [nbPersMaxMod, setNbPersMaxMod] = useState("");
    const [heureMinMod, setHeureMinMod] = useState("");
    const [heureMaxMod, setHeureMaxMod] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");
    const [avatar, setAvatar] = useState(true);

    // const handleCkeditorState = (e,editor) => {
    //     const data = editor.getData()
    //     setDescription(data)
    //     console.log(data)
    // }

    const handleAdd = async (e) => {
        e.preventDefault();
        // console.log('id : '+id.id)
        // let desc = document.getElementById('wisiwig').value
        let newContraintes = handleChangeContraintes(contraintes);
        const formData = new FormData();
        if (catId.length < 1) {
            alert("Vous devez choisir une catégorie pour la prestation ...");
            return;
        }

        if (!e.target[3].files || e.target[3].files.length < 1) {
            alert("Vous devez télécharger au moins une image pour la prestation ...");
            return;
        }
        if (!nom) {
            alert("Vous devez renseigner un nom pour la prestation ...");
            return;
        }
        if (!description) {
            alert("Vous devez renseigner une description pour la prestation ...");
            return;
        }
        if (!newContraintes) {
            alert("Vous devez renseigner une contrainte pour la prestation ...");
            return;
        }
        if (!typeFacturation) {
            alert("Vous devez renseigner un type de facturation pour la prestation ...");
            return;
        }
        if (!prixFacturation) {
            alert("Vous devez renseigner un prix de facturation pour la prestation ...");
            return;
        }
        if (!duree) {
            alert("Vous devez renseigner une durée pour la prestation ...");
            return;
        }
        if (!nbPersMin) {
            alert("Vous devez renseigner un nombre de personne minimum pour la prestation ...");
            return;
        }
        if (!nbPersMax) {
            alert("Vous devez renseigner un nombre de personne maximum pour la prestation ...");
            return;
        }
        if (!heureMin) {
            alert("Vous devez renseigner une heure minimum pour la prestation ...");
            return;
        }
        if (!heureMax) {
            alert("Vous devez renseigner une heure maximum pour la prestation ...");
            return;
        }
        // console.log(catId)
        // return

        formData.append("userId", userId);
        formData.append("catId", catId);
        formData.append("nom", nom);
        formData.append("description", description);
        // formData.append('photo',photo)

        // console.log('E.TARGET :')
        // console.log(e.target)
        // return

        let files = e.target[3].files;
        let totalSize = 0;
        for (let i = 0; i < files.length; i++) {
            // formData.append("file[]", files[i]);
            // console.log('fichier files[i] -> i=',i)
            // console.log(files[i])
            if (files[i].size <= 2000000 && ['jpg','jpeg','png','gif'].includes(files[i].type.split('/')[1]) && totalSize < 5000000) {
                formData.append("file[]", files[i]);
                totalSize += files[i].size;
            } else {
                // format du fichier invalid ou taille trop grande ... 
            }
        }
        if (formData.getAll('file[]').length < 1) {
            alert('Il faut télécharger au moins un fichier valide ...')
            return;
        }
        // if (totalSize > 5000000) {
        //     alert('Les fichiers sont trop volumineux ... (max 5mo)')
        //     return
        // }
        formData.append("contraintes", newContraintes);
        formData.append("typeFacturation", typeFacturation);
        formData.append("prixFacturation", prixFacturation);
        formData.append("duree", duree);
        formData.append("nbPersMin", nbPersMin);
        formData.append("nbPersMax", nbPersMax);
        formData.append("heureMin", heureMin);
        formData.append("heureMax", heureMax);
        let date = new Date();
        let current_date =
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate();
        let current_time =
            date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        let date_time = current_date + " " + current_time;
        formData.append("createdAt", date_time);

        // console.log('formData =')
        // console.log(formData)
        // return
        await axiosClient
            .post("/admin/addPrestation", formData)
            .then(({ data }) => {
                alert("ok prestation enregistrée");
                navigate("/admin/users");
            })
            .catch(({ response }) => {
                console.log(response);
            });
    };

    const handleChangeContraintes = (contraintes) => {
        // let text = document.getElementById('contraintes').innerHTML;
        // let eachLine = text.split('\n');
        // alert('Lines found: ' + eachLine.length);
        // for(let i = 0, l = eachLine.length; i < l; i++) {
        // alert('Line ' + (i+1) + ': ' + eachLine[i]);
        // }
        let newText = contraintes.replaceAll("\n", ";");
        // setContraintes(newText);
        // alert('newText:'+newText)
        // alert('contraintes:'+contraintes)
        return newText;
    };

    const handleReChangeContraintes = (contraintes) => {
        let newText = contraintes.replaceAll(";", "\n");
        return newText;
    };

    const renderPhotos = (source) => {
        return source.map((photo) => {
            // console.log(photo)
            return (
                <img
                    src={photo}
                    alt=""
                    key={photo}
                    style={{ width: "20%", height: "180px", margin: "0 5px" }}
                />
            );
        });
    };

    const renderPhotosMod = (source) => {
        return source.map((photo) => {
            // console.log(photo)
            // let realpath = photo.split('|').at(0).substr(58,photo.split('|').at(0).length)
            let realpath = photo.split("|").at(0);
            // console.log('realpath='+realpath)
            return (
                <img
                    // src={"https://keums.ch/api/" + realpath}
                    src={"http://localhost:8000/" + realpath}
                    alt=""
                    key={realpath}
                    style={{ width: "20%", height: "180px", margin: "0 5px" }}
                />
            );
        });
    };

    // const handlePhoto = (e) => {
    //     let fichier = e.target.files[0]
    //     let reader = new FileReader()
    //     let limit = 1024*1024*2
    //     if(fichier['size'] > limit) {
    //         alert('Oups, l\'image est trop volumineuse.')
    //     }
    //     reader.onloadend = (fichiers) => {
    //         setPhoto(reader.result)
    //     }
    //     reader.readAsDataURL(fichier)
    // }

    // const handlePhotoMod = (e) => {
    //     let fichier = e.target.files[0]
    //     let limit = 1024*1024*2
    //     if(fichier['size'] > limit) {
    //         alert('Oups, l\'image est trop volumineuse.')
    //     }else{
    //         let reader = new FileReader()
    //         reader.onload = (e) => {
    //             setAvatar(false)
    //             setPhotoMod(e.target.result)
    //         }
    //         reader.readAsDataURL(fichier)
    //     }
    // }

    const handlePhotosMod = (e) => {
        setPhotosMod([]);
        setFormSubmitted(true);
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file) => {
                return URL.createObjectURL(file);
            });
            setPhotosMod((prevImage) => prevImage.concat(filesArray));
            Array.from(e.target.files).map((file) => {
                return URL.revokeObjectURL(file);
            });
        }
    };

    if (idParam) {
        useEffect(() => {
            getPrestation();
            getCategories();
            setEditorLoaded(true);
            // function sleep(ms) {
            //     return new Promise(resolve => setTimeout(resolve, ms))
            // }
            // sleep(1000)
        }, []);
    } else {
        useEffect(() => {
            getCategories();
            setLoading(false);
            setEditorLoaded(true);
        }, []);
    }

    const getPrestation = async () => {
        setLoading(true);
        await axiosClient
            .get(`/admin/getPrestation/${idParam}`)
            .then(({ data }) => {
                // console.log('data => ',data)

                const {
                    id,
                    id_user,
                    nom,
                    description,
                    photo,
                    contrainte,
                    duree,
                    type_facturation,
                    prix_type_facturation,
                    personne_min,
                    personne_max,
                    heure_min,
                    heure_max,
                } = data.prestation;
                // console.log('id=',id)
                // console.log('id_user=',id_user)
                // console.log('nom=',nom)
                // console.log('description=',description)
                // console.log('contraintes=',contrainte)
                // console.log('photo=',photo)
                // console.log(description)
                setIdUserMod(id_user);
                setNomMod(nom);
                setDescriptionMod(description);
                setPhotoMod(photo);
                setPhotosMod(photo.split("|"));
                let newContraintes = handleReChangeContraintes(contrainte);
                setContraintesMod(newContraintes);
                // setContraintesMod(contrainte)
                setDureeMod(duree);
                setTypeFacturationMod(type_facturation);
                setPrixFacturationMod(prix_type_facturation);
                setNbPersMaxMod(personne_max);
                setNbPersMinMod(personne_min);
                setHeureMaxMod(heure_max);
                setHeureMinMod(heure_min);
                let date = new Date();
                let current_date =
                    date.getFullYear() +
                    "-" +
                    (date.getMonth() + 1) +
                    "-" +
                    date.getDate();
                let current_time =
                    date.getHours() +
                    ":" +
                    date.getMinutes() +
                    ":" +
                    date.getSeconds();
                let date_time = current_date + " " + current_time;
                setUpdatedAt(date_time);
                setLoading(false);
                setData(description);
                // console.log(data)
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const getCategories = async () => {
        setLoading(true);
        await axiosClient
            .get("/admin/getCategories")
            .then(({ data }) => {
                // console.log(data)

                setCategories(data);
                setLoading(false);
                // console.log(categories)
            })
            .catch((e) => {
                setLoading(false);
                console.log(e);
            });
    };

    const handlePhotos = (e) => {
        setPhotos([]);
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file) => {
                return URL.createObjectURL(file);
            });
            setPhotos((prevImage) => prevImage.concat(filesArray));
            Array.from(e.target.files).map((file) => {
                return URL.revokeObjectURL(file);
            });
        }
    };

    const handleChange = (e) => {
        let value = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setCatId(value);
    };

    // console.log(catId)

    // useEffect(()=>{
    //     getCategories()
    //     // setTxtWisiwig(document.getElementById('wisiwig').value)
    //     // console.log(document.getElementById('wisiwig').value)
    // }, [])

    const handleModify = async (e) => {
        // console.log(e.target)
        e.preventDefault();
        let newContraintes = handleChangeContraintes(contraintesMod);
        const formData = new FormData();
        if (catId.length < 1) {
            alert("Vous devez choisir une catégorie pour la prestation ...");
            return;
        }
        formData.append("userId", idUserMod);
        formData.append("nom", nomMod);
        formData.append("description", descriptionMod);
        formData.append("catId", catId);

        // console.log('E.TARGET :')
        // console.log(e.target)
        // return


        // formData.append('photo',photoMod)
        let files = e.target[3].files;
        let totalSize = 0;
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                // console.log('fichier files[i] -> i=',i)
                // console.log(files[i])
                if (files[i].size <= 2000000 && ['jpg','jpeg','png','gif'].includes(files[i].type.split('/')[1])) {
                    formData.append("file[]", files[i]);
                    totalSize += files[i].size;
                } else {
                    // format du fichier invalid ou taille trop grande ... 
                }
            }
        }
        if (formData.getAll('file[]').length < 1) {
            alert('Il faut télécharger au moins un fichier valide ...')
            return
        }
        if (totalSize > 5000000) {
            alert('Les fichiers sont trop volumineux ... (max 5mo)')
            return
        }
        formData.append("contraintes", newContraintes);
        formData.append("typeFacturation", typeFacturationMod);
        formData.append("prixFacturation", prixFacturationMod);
        formData.append("duree", dureeMod);
        formData.append("nbPersMin", nbPersMinMod);
        formData.append("nbPersMax", nbPersMaxMod);
        formData.append("heureMin", heureMinMod);
        formData.append("heureMax", heureMaxMod);
        let date = new Date();
        let current_date =
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate();
        let current_time =
            date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        let date_time = current_date + " " + current_time;
        formData.append("updatedAt", date_time);

        await axiosClient
            .post(`/admin/updatePrestation/${idParam}`, formData)
            .then((data) => {
                alert("modification effectuée");
                navigate(-1);
            });
    };

    return (
        <>
            {/* ON SE TROUVE DANS LE FORMULAIRE DE MODIFICATION */}
            {loading ? (
                <div>
                    <h1>Chargement des données ...</h1>
                </div>
            ) : idParam ? (
                <div style={{ padding: "0 20px 20px" }}>
                    <h1 style={{ marginBottom: "20px" }}>
                        Modifier une prestation
                    </h1>
                    {/* <h2>data = {data}</h2> */}
                    <form onSubmit={handleModify}>
                        <div>
                            <h4>Id du prestataire :</h4>
                            <input type="text" readOnly value={idUserMod} />
                            <br />
                            <br />
                            

                            <h4>Choix des catégories :</h4>
                            {/* (e)=>setCatId(e.target.value) */}
                            {loading ? (
                                <div>En attente des données :</div>
                            ) : (
                                <select
                                    style={{ width: "100%" }}
                                    className={"form-control"}
                                    id="cat"
                                    multiple
                                    onChange={(e) => handleChange(e)}
                                >
                                    {/* <option>Choisir</option> */}
                                    {categories.map((c, key) => (
                                        // console.log(key)
                                        <option key={key} value={c.id}>
                                            {c.nom}
                                        </option>
                                    ))}
                                </select>
                            )}
                            <br />
                            <br />

                            <h4>Nom de la prestation :</h4>
                            <input
                                type="text"
                                placeholder="Entrer le nom de la prestation"
                                value={nomMod}
                                onChange={(e) => {
                                    setNomMod(e.target.value);
                                }}
                            />
                            <br />

                            <h4>Image de la prestation :</h4>
                            <p>Les formats acceptés ['jpg','jpeg','png',gif]</p>
                            <p>Taille maximum [2mo/fichiers]</p>
                            <input
                                type="file"
                                name="file[]"
                                multiple
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={handlePhotosMod}
                            />
                            <br />

                            {/* {console.log(data)} */}
                            {/* <p>{data}</p> */}
                            <h4>Description de la prestation :</h4>
                            <CKeditor
                                name={"prestation"}
                                placeholder={
                                    "Entrer la description de la prestation"
                                }
                                onChange={(data) => {
                                    setData(data);
                                    setDescriptionMod(data);
                                }}
                                value={descriptionMod}
                                editorLoaded={editorLoaded}
                            />
                            {/* {data} */}
                            {/* <Wisiwig  /> */}
                            {/* <textarea style={{ width: '100%' }} rows="5" placeholder='Entrer la description de la prestation' value={descriptionMod} onChange={(e)=>{setDescriptionMod(e.target.value)}} ></textarea> */}
                            <br />

                            <div style={{ textAlign: "center" }}>
                                {/* <h4>Aperçu de l'image :</h4>
                {
                    avatar === true
                    ? <img src={'/upload/'+photoMod} width={'50%'} height={'350px'}/>
                    :  <img src={photoMod} width={'50%'} height={'350px'}/>
                } */}
                                {formSubmitted
                                    ? renderPhotos(photosMod)
                                    : renderPhotosMod(photosMod)}
                            </div>

                            <h4>
                                Contraintes de la prestation :
                                <Tooltip
                                    title={
                                        <React.Fragment>
                                            <Typography color="inherit">
                                                Pour ajouter des contraintes
                                            </Typography>
                                            <p>
                                                Il faut séparer les contraintes
                                                par des sauts à la ligne
                                            </p>
                                        </React.Fragment>
                                    }
                                    placement="top"
                                >
                                    <Button>?</Button>
                                </Tooltip>
                            </h4>
                            <textarea
                                style={{ width: "100%" }}
                                id="contraintes"
                                rows="5"
                                placeholder="Entrer les contraintes de la prestation"
                                value={contraintesMod}
                                onChange={(e) => {
                                    setContraintesMod(e.target.value);
                                }}
                            ></textarea>
                            <br />
                            <br />

                            <h4>Type de facturation :</h4>
                            <input
                                type="text"
                                placeholder="Entrer le type de tarification"
                                value={typeFacturationMod}
                                onChange={(e) => {
                                    setTypeFacturationMod(e.target.value);
                                }}
                            />
                            <br />

                            <h4>Prix du type de facturation :</h4>
                            <input
                                type="number"
                                placeholder="Entrer le prix de facturation"
                                min={0}
                                step={0.05}
                                value={prixFacturationMod}
                                onChange={(e) => {
                                    setPrixFacturationMod(e.target.value);
                                }}
                            />
                            <br />

                            <h4>Durée de la prestation :</h4>
                            <input
                                type="time"
                                placeholder="Entrer la durée de la prestation"
                                min={"00:00"}
                                max={"08:00"}
                                value={dureeMod.substring(0, 5)}
                                onChange={(e) => {
                                    setDureeMod(e.target.value);
                                }}
                            />
                            <br />

                            <h4>Nombre de personne minimum :</h4>
                            <input
                                type="number"
                                placeholder="Entrer le nombre de personne minimum"
                                min={0}
                                step={1}
                                value={nbPersMinMod}
                                onChange={(e) => {
                                    setNbPersMinMod(e.target.value);
                                }}
                            />
                            <br />

                            <h4>Nombre de personne maximum :</h4>
                            <input
                                type="number"
                                placeholder="Entrer le nombre de personne maximum"
                                min={0}
                                step={1}
                                value={nbPersMaxMod}
                                onChange={(e) => {
                                    setNbPersMaxMod(e.target.value);
                                }}
                            />
                            <br />

                            <h4>Heure minimum pour la prestation :</h4>
                            <input
                                type="time"
                                placeholder="Entrer l'heure minimum pour la prestation"
                                min={"07:00"}
                                step={"00:01"}
                                value={heureMinMod.substring(0, 5)}
                                onChange={(e) => {
                                    setHeureMinMod(e.target.value);
                                }}
                            />
                            <br />

                            <h4>Heure maximum pour la prestation :</h4>
                            <input
                                type="time"
                                placeholder="Entrer l'heure minimum pour la prestation"
                                min={"12:00"}
                                step={"00:01"}
                                value={heureMaxMod.substring(0, 5)}
                                onChange={(e) => {
                                    setHeureMaxMod(e.target.value);
                                }}
                            />
                            <br />
                            <br />
                            <div style={{ textAlign: "center" }}>
                                <button className="btn btn-add">
                                    Modifier
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            ) : (
                <div style={{ padding: "0 20px 20px" }}>
                    <h1 style={{ marginBottom: "20px" }}>
                        Ajouter une prestation
                    </h1>
                    <form onSubmit={handleAdd}>
                        <div>
                            <h4>Id du prestataire :</h4>
                            {id && <input type="text" readOnly value={id.id} />}
                            <br />

                            <h4>Choix des catégories :</h4>
                            {/* (e)=>setCatId(e.target.value) */}
                            {loading ? (
                                <div>En attente des données :</div>
                            ) : (
                                <select
                                    style={{ width: "100%" }}
                                    className={"form-control"}
                                    id="cat"
                                    multiple
                                    onChange={(e) => handleChange(e)}
                                >
                                    {/* <option>Choisir</option> */}
                                    {categories.map((c, key) => (
                                        // console.log(key)
                                        <option key={key} value={c.id}>
                                            {c.nom}
                                        </option>
                                    ))}
                                </select>
                            )}
                            <br />
                            <br />
                            <h4>Nom de la prestation :</h4>
                            <input
                                type="text"
                                placeholder="Entrer le nom de la prestation"
                                value={nom}
                                onChange={(e) => {
                                    setNom(e.target.value);
                                }}
                            />
                            <br />

                            <h4>Image de la prestation :</h4>
                            <p>Les formats acceptés ['jpg','jpeg','png',gif]</p>
                            <p>Taille maximum [2mo/fichiers]</p>
                            <input
                                type="file"
                                name="file[]"
                                onChange={handlePhotos}
                                multiple
                                accept="image/png, image/jpeg, image/jpg"
                            />
                            <br />

                            <h4>Description de la prestation :</h4>
                            {/* <Wisiwig /> */}
                            {/* <CKEditor 
                config={{placeholder:'Entrer la description de la prestation'}} 
                editor={ClassicEditor} 
                onReady={editor=>{console.log('Editor ready to be used')}} 
                onChange={handleCkeditorState} 
            /> */}
                            <CKeditor
                                name={"prestation"}
                                placeholder={
                                    "Entrer la description de la prestation"
                                }
                                onChange={(data) => {
                                    setData(data);
                                    setDescription(data);
                                }}
                                // data={data}
                                editorLoaded={editorLoaded}
                            />

                            {/* <h2>{parse(JSON.stringify(data))}</h2> */}
                            {/* <h2>{parse(data)}</h2> */}
                            {/* <h2>{JSON.stringify(data)}</h2> */}
                            {/* <div>{data}</div> */}

                            {/* <textarea style={{ width: '100%' }} rows="5" placeholder='Entrer la description de la prestation' value={description} onChange={(e)=>{setDescription(e.target.value)}} ></textarea> */}
                            <br />

                            {/* {photo && (
                <div style={{ textAlign: 'center' }}>
                    <h4>Aperçu de l'image :</h4>
                    <img src={photo} width={'50%'} height={'350px'}/>
                </div>
            )} */}

                            <div style={{ textAlign: "center" }}>
                                {renderPhotos(photos)}
                            </div>

                            <h4>
                                Contraintes de la prestation :
                                <Tooltip
                                    title={
                                        <React.Fragment>
                                            <Typography color="inherit">
                                                Pour ajouter des contraintes
                                            </Typography>
                                            <p>
                                                Il faut séparer les contraintes
                                                par des sauts à la ligne
                                            </p>
                                        </React.Fragment>
                                    }
                                    placement="top"
                                >
                                    <Button>?</Button>
                                </Tooltip>
                            </h4>
                            <textarea
                                style={{ width: "100%" }}
                                id="contraintes"
                                rows="5"
                                placeholder="Entrer les contraintes de la prestation"
                                value={contraintes}
                                onChange={(e) => {
                                    setContraintes(e.target.value);
                                }}
                            ></textarea>
                            <br />
                            <br />

                            <h4>Type de facturation :</h4>
                            <input
                                type="text"
                                placeholder="Entrer le type de tarification"
                                value={typeFacturation}
                                onChange={(e) => {
                                    setTypeFacturation(e.target.value);
                                }}
                            />
                            <br />

                            <h4>Prix du type de facturation :</h4>
                            <input
                                type="number"
                                placeholder="Entrer le prix de facturation"
                                min={0}
                                step={0.05}
                                value={prixFacturation}
                                onChange={(e) => {
                                    setPrixFacturation(e.target.value);
                                }}
                            />
                            <br />

                            <h4>Durée de la prestation :</h4>
                            <input
                                type="time"
                                placeholder="Entrer la durée de la prestation"
                                min={"00:00"}
                                max={"08:00"}
                                value={duree}
                                onChange={(e) => {
                                    setDuree(e.target.value);
                                }}
                            />
                            <br />

                            <h4>Nombre de personne minimum :</h4>
                            <input
                                type="number"
                                placeholder="Entrer le nombre de personne minimum"
                                min={0}
                                step={1}
                                value={nbPersMin}
                                onChange={(e) => {
                                    setNbPersMin(e.target.value);
                                }}
                            />
                            <br />

                            <h4>Nombre de personne maximum :</h4>
                            <input
                                type="number"
                                placeholder="Entrer le nombre de personne maximum"
                                min={0}
                                step={1}
                                value={nbPersMax}
                                onChange={(e) => {
                                    setNbPersMax(e.target.value);
                                }}
                            />
                            <br />

                            <h4>Heure minimum pour la prestation :</h4>
                            <input
                                type="time"
                                placeholder="Entrer l'heure minimum pour la prestation"
                                min={"07:00"}
                                step={"00:01"}
                                value={heureMin}
                                onChange={(e) => {
                                    setHeureMin(e.target.value);
                                }}
                            />
                            <br />

                            <h4>Heure maximum pour la prestation :</h4>
                            <input
                                type="time"
                                placeholder="Entrer l'heure minimum pour la prestation"
                                min={"12:00"}
                                step={"00:01"}
                                value={heureMax}
                                onChange={(e) => {
                                    setHeureMax(e.target.value);
                                }}
                            />
                            <br />
                            <br />
                            <div style={{ textAlign: "center" }}>
                                <button className="btn btn-add">Ajouter</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}