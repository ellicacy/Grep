import React from 'react'
import { useState } from 'react';
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Header from '../components/Navigation/Header';
import BottomPage from '../components/Navigation/BottomPage';

export default function Signup() {

    const personnePrenomRef = useRef();
    const personneNomRef = useRef();
    const personneDateNaissanceRef = useRef();
    const personneLoginRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const [errors, setErrors] = useState(null);

    const {setUser,setToken} = useStateContext()

    const onSubmit = (e) => {
        e.preventDefault()
        const payload = {
            personneNom: personneNomRef.current.value,
            personnePrenom: personnePrenomRef.current.value,
            personneDateNaissance: personneDateNaissanceRef.current.value,
            personneLogin: personneLoginRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }
        // console.log(payload)
        axiosClient.post('/signup', payload)
        .then(({data})=>{
            setUser(data.user)
            setToken(data.token)
        })
        .catch(err=>{
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors)
            }
        })
    }

    return (
        <>
            <Box
                backgroundColor='white'
                height={'100%'}>
                <Header />
                <Grid
                    container
                    justifyContent={'center'}
                    sx={{
                        mt: '10%',
                        mb: '14%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Grid
                        border={1}
                        borderColor={'#E5E7EB'}
                        width={460}>
                        <form onSubmit={onSubmit}>
                            <Grid m='20px 20px 20px 20px'>
                                <Typography
                                    variant="h2"
                                    color="initial"
                                    mb='20px'>
                                    Enregistrez-vous gratuitement
                                </Typography>
                                {
                                    errors &&
                                    <Grid backgroundColor='#E5E7EB' mb='20px' p='10px 20px 10px 20px'>
                                        {Object.keys(errors).map(key => (
                                            <Typography variant='body1' fontWeight={500} key={key} >{errors[key][0]}</Typography>
                                        ))}
                                    </Grid>
                                }
                                <TextField
                                    name="nom"
                                    id="nom"
                                    sx={{ mb: '20px' }}
                                    inputRef={personneNomRef}
                                    type='text'
                                    placeholder='Nom'
                                    fullWidth
                                />
                                <TextField
                                    name="prenom"
                                    id="prenom"
                                    sx={{ mb: '20px' }}
                                    inputRef={personnePrenomRef}
                                    type='text'
                                    placeholder='Prenom'
                                    fullWidth
                                />
                                <TextField
                                    name="dateNaissance"
                                    id="dateNaissance"
                                    sx={{ mb: '20px' }}
                                    inputRef={personneDateNaissanceRef}
                                    type='date'
                                    fullWidth
                                />
                                <TextField
                                    name="email"
                                    id="email"
                                    sx={{ mb: '20px' }}
                                    inputRef={personneLoginRef}
                                    type='email'
                                    autocomplete="email"
                                    placeholder='Entrez votre adresse email'
                                    fullWidth
                                />
                                <TextField
                                    name="password"
                                    id="password"
                                    sx={{ mb: '20px' }}
                                    inputRef={passwordRef}
                                    type='password'
                                    autocomplete="new-password"
                                    placeholder='Entrez un mot de passe'
                                    fullWidth
                                />
                                <TextField
                                    name="passwordConfirmation"
                                    id="passwordConfirmation"
                                    sx={{ mb: '20px' }}
                                    inputRef={passwordConfirmationRef}
                                    type='password'
                                    autocomplete="new-password"
                                    placeholder='Confirmez votre mot de passe'
                                    fullWidth
                                />
                                <Button
                                    sx={{ mb: '20px' }}
                                    variant="contained"
                                    color="primary"
                                    onClick={onSubmit}
                                    fullWidth
                                >
                                    S'enregistrer
                                </Button>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
                <BottomPage />
            </Box>
        </>
    )
}
