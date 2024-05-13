import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

import axiosClient from '../../../axios-client';
import { useStateContext } from '../../../contexts/ContextProvider';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Avatar, CardMedia, Typography, useRadioGroup } from '@mui/material';
import Loader from '../../../views/Loader';


export default function UserForm() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [selectValue, setSelectValue] = useState('')
    const [prestations, setPrestations] = useState([]);
    const [errors, setErrors] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();
    const [roleUserDb, setRoleUserDb] = useState('')
    const [user, setUser] = useState({
        idPersonne: null,
        personneLogin: '',
        personneNom: '',
        personnePrenom: '',
        personneDateNaissance: '',
        clientRue: '',
        clientCodePostal: '',
        clientVille: '',
        prestaireType: '',
        prestataireDescription: '',
        prestatairePhotos: '',
        prestataireEntrepriseNom: '',
        prestataireEntrepriseRue: '',
        prestataireEntrepriseCP: '',
        prestataireEntrepriseVille: '',
        prestataireNoTVA: '',
        prestataireBanque: '',
        prestataireBanqueRue: '',
        prestataireBanqueCP: '',
        prestataireBanqueVille: '',
        prestataireSWIFT: '',
        prestataireIBAN: '',
        created_at: '',
        updated_at: '',
        role: 'user',
        password: '',
        password_confirmation: ''
    });
    const [personnePhoto, setPersonnePhoto] = useState(null);

    const roles = [
        { value: 'user', text: 'User' },
        { value: 'prestataire', text: 'Prestataire' },
        { value: 'admin', text: 'Admin' },
        { value: 'bloque', text: 'Bloque' },
        { value: 'supprimer', text: 'Supprimer' }
    ]

    const getUserDb = async (id) => {
        await axiosClient.get(`/admin/user/${id}`)
            .then(({ data }) => {
                // console.log(data)
                setRoleUserDb(data.role)
            })
            .catch(() => {

            })
    }

    const options = roles.map((option) => {
        return <option
            key={option.value}
            value={option.value}
        // defaultValue={option.value}
        // selected={option.value===selectValue}
        >
            {option.text}
        </option>
    })

    const getPrestations = (id) => {
        axiosClient.get(`/admin/user/${id}/getPrestations`)
            .then(({ data }) => {
                // console.log(data);
                setPrestations(data);
            })
            .catch(() => {

            })
    }

    // si id on veut modifier un user
    if (id) {
        useEffect(() => {
            setLoading(true);
            const fetchData = async () => {
                await axiosClient.get(`/admin/users/${id}`)
                    .then(({ data }) => {
                        setLoading(false);
                        // console.log(data)
                        setUser(data);
                        setSelectValue(data.role)
                        // console.log(data.role)
                    })
                    .catch((err) => {
                        console.log(err);
                        setLoading(false);
                    })
            }
            fetchData()
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms))
            }

            // setTimeout(
            //     console.log(selectValue),
            //     1000
            // )
            sleep(1000)
        }, []);
        useEffect(() => {
            getPrestations(id)
            getUserDb(id)
        }, [])
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        for (const key in user) {
            console.log(key, user[key])
            formData.append(key, user[key]);
        }


        console.log(formData)
        // append other fields
        // setUser({ ...user, prestatairePhotos: personnePhoto })

        // if (personnePhoto) {
        //     formData.append('prestatairePhotos', personnePhoto);
        // }
        console.log(user)

        // alert(user.role)
        if (!isOver18(user.personneDateNaissance)) {
            setError("L'utilisateur doit avoir au moins 18 ans.");
            return;
        }
        if (formData) {
            if (user.idPersonne) {
                axiosClient.put(`/admin/users/${user.idPersonne}`, user)
                    .then(() => {
                        setNotification('Utilisateur bien mis à jours !')
                        alert('Utilisateur bien mis à jours !')
                        // navigate('/admin/users')
                    })
                    .catch(err => {
                        const response = err.response;
                        if (response && response.status === 422) {
                            setErrors(response.data.errors)
                        }
                    })
            } else {
                axiosClient.post(`/admin/users`, user)
                    .then((data) => {
                        // console.log('Utilisateur n°' + data.data.idPersonne + ' a bien été créé !')
                        setNotification('Utilisateur n°' + data.data.idPersonne + ' a bien été créé !')
                        alert('Utilisateur n°' + data.data.idPersonne + ' a bien été créé !')
                        // navigate('/admin/users')
                    })
                    .catch(err => {
                        const response = err.response;
                        if (response && response.status === 422) {
                            setErrors(response.data.errors)
                        }
                    })
            }
        }
    }

    const location = window.location.pathname

    function selectOptionByJSONValue(jsonValue) {
        const optionSelector = `#role option[value="${jsonValue}"]`;
        return document.querySelector(optionSelector);
    }

    const isOver18 = (date) => {
        const currentDate = new Date();
        const birthDate = new Date(date);
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        const monthDifference = currentDate.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
            return age - 1 >= 18;
        } else {
            return age >= 18;
        }
    };

    useEffect(() => {
        console.log(personnePhoto)
        setUser({ ...user, prestatairePhotos: personnePhoto })

        console.log(user)
    }, [personnePhoto])

    return (
        <>
            {error && <div className="alert">{error}</div>}

            {/* <div className="card animated fadeInDown" style={{ padding: '0 20px 20px' }}> */}
            <div
                className="animated fadeInDown"
                style={{
                    padding: '38px 100px 38px 100px',
                    // width: '80vw'
                }}>
                {loading && (
                    // <div className="text-center">Loading ...</div>
                    <Grid
                        container
                        justifyContent='center'
                        alignContent='center'
                        height='50rem'
                    >
                        <Loader />
                    </Grid>
                )}
                {
                    errors && <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }

                {!loading && user.idPersonne &&
                    <Typography variant='h1' pb='38px'>Modifier l'utilisateur: {user.personnePrenom} {user.personneNom}</Typography>
                }
                {!loading && !user.idPersonne &&
                    <Typography variant='h1'>Créer utilisateur</Typography>
                }
                {!loading &&
                    <form onSubmit={onSubmit}>
                        <CardMedia
                            sx={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '0%',
                                margin: '0 auto',
                                marginBottom: '20px'
                            }}
                            // src={'https://keums.ch/api/'+ personnePhoto}
                            src={"http://localhost:8000/" + personnePhoto}

                        >

                        </CardMedia>
                        <TextField
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPersonnePhoto(e.target.files[0])}
                        />
                        <TextField
                            placeholder="Name"
                            value={user.personneNom}
                            onChange={e => setUser({ ...user, personneNom: e.target.value })}
                        />
                        <TextField
                            placeholder="Prenom"
                            value={user.personnePrenom}
                            onChange={e => setUser({ ...user, personnePrenom: e.target.value })}
                        />
                        <TextField
                            placeholder="Email"
                            type="email"
                            value={user.personneLogin}
                            onChange={e => setUser({ ...user, personneLogin: e.target.value })}
                        />
                        <TextField
                            placeholder="Mot de passe"
                            type="password"
                            onChange={e => setUser({ ...user, password: e.target.value })}
                        />
                        <TextField
                            placeholder="Confirmez votre mot de passe"
                            type="password"
                            onChange={e => setUser({ ...user, password_confirmation: e.target.value })}
                        />
                        <TextField
                            placeholder="Date de naissance"
                            type="date"
                            value={user.personneDateNaissance}
                            onChange={e => setUser({ ...user, personneDateNaissance: e.target.value })}
                        />
                        <FormControl
                            sx={{
                                mt: 1,
                                width: '100%'
                            }}
                        >
                            {/* <InputLabel
                                id="role-label"
                            >Choisir le rôle de l'utilisateur</InputLabel> */}
                            <Select
                                labelId="role-label"
                                id="role"
                                value={selectValue}
                                onChange={e => {
                                    setUser({ ...user, role: e.target.value });
                                    setSelectValue(e.target.value);
                                }}
                            >
                                {roles.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.text}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {/* additional fields for the user role "prestataire" */}
                        {user.role === 'prestataire' && (
                            <>
                                <TextField
                                    placeholder="Profession"
                                    value={user.prestaireType}
                                    onChange={e => setUser({ ...user, prestaireType: e.target.value })}
                                />
                                <TextField
                                    placeholder="Description"
                                    value={user.prestataireDescription}
                                    onChange={e => setUser({ ...user, prestataireDescription: e.target.value })}
                                />
                                <TextField
                                    placeholder="Nom entreprise"
                                    value={user.prestataireEntrepriseNom}
                                    onChange={e => setUser({ ...user, prestataireEntrepriseNom: e.target.value })}
                                />
                                <TextField
                                    placeholder="Rue entreprise"
                                    value={user.prestataireEntrepriseRue}
                                    onChange={e => setUser({ ...user, prestataireEntrepriseRue: e.target.value })}
                                />
                                <TextField
                                    placeholder="Code postal entreprise"
                                    value={user.prestataireEntrepriseCP}
                                    onChange={e => setUser({ ...user, prestataireEntrepriseCP: e.target.value })}
                                />
                                <TextField
                                    placeholder="Ville entreprise"
                                    value={user.prestataireEntrepriseVille}
                                    onChange={e => setUser({ ...user, prestataireEntrepriseVille: e.target.value })}
                                />
                                <TextField
                                    placeholder="No TVA"
                                    value={user.prestataireNoTVA}
                                    onChange={e => setUser({ ...user, prestataireNoTVA: e.target.value })}
                                />
                                <TextField
                                    placeholder="Banque"
                                    value={user.prestataireBanque}
                                    onChange={e => setUser({ ...user, prestataireBanque: e.target.value })}
                                />
                                <TextField
                                    placeholder="Rue banque"
                                    value={user.prestataireBanqueRue}
                                    onChange={e => setUser({ ...user, prestataireBanqueRue: e.target.value })}
                                />
                                <TextField
                                    placeholder="Code postal banque"
                                    value={user.prestataireBanqueCP}
                                    onChange={e => setUser({ ...user, prestataireBanqueCP: e.target.value })}
                                />
                                <TextField
                                    placeholder="Ville banque"
                                    value={user.prestataireBanqueVille}
                                    onChange={e => setUser({ ...user, prestataireBanqueVille: e.target.value })}
                                />

                                {/* ...more fields... */}
                                <TextField
                                    placeholder="SWIFT"
                                    value={user.prestataireSWIFT}
                                    onChange={e => setUser({ ...user, prestataireSWIFT: e.target.value })}
                                />
                                <TextField
                                    placeholder="IBAN"
                                    value={user.prestataireIBAN}
                                    onChange={e => setUser({ ...user, prestataireIBAN: e.target.value })}
                                />
                            </>
                        )}
                        {prestations.length > 0 && (
                            <div style={{ marginBottom: '20px' }}>
                                <button onClick={() => { navigate(`/admin/users/${id}/showPrestation`) }}>Voir les prestations de {user.personneNom}</button>
                            </div>
                        )}

                        {user.role == 'prestataire' && roleUserDb == 'prestataire' && location != '/admin/users/new' && (
                            <div style={{ marginBottom: '20px' }}>
                                <button onClick={() => { navigate(`/admin/users/${id}/addPrestation`) }}>Ajouter une prestation</button>
                            </div>
                        )}
                        <button
                            className="btn"

                        >Save</button>
                    </form>
                }
            </div>
        </>
    )
}
