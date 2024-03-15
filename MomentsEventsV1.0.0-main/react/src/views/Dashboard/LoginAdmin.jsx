import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import axiosClient from '../../axios-client'
import { useStateContext } from '../../contexts/ContextProvider'
import Header from '../../components/Navigation/Header'
import BottomPage from '../../components/Navigation/BottomPage'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import FormControlContext from '@mui/material/FormControl/FormControlContext'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'


export default function LoginAdmin() {

    const personneLoginRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);
    const {user, token, setUser, setToken} = useStateContext();

    // useEffect(()=>{
    //     if (token && user.role == "admin") {
    //         navigate('/admin/users');
    //         // return <Navigate to='/admin/users' />
    //     } else if (!token || user.role != "admin") {
    //         navigate('/admin');
    //         // return <Navigate to='/admin' />
    //     }
    // },[token,user])

    // if (!token || user.role != "admin") {
    //     return <Navigate to='/admin' />
    // }

    // if (token && user.role == 'admin') {
    //     return <Navigate to={'/admin/users'} />
    // }

    // useEffect(()=>{

    // }, [])

    // if (token && user && user.role == 'admin') {
    //     return <Navigate to='/admin/users' />
    // }

    const onSubmit = (e) => {
        e.preventDefault()
        const payload = {
            personneLogin: personneLoginRef.current.value,
            password: passwordRef.current.value,
        }
        setErrors(null)
        axiosClient.post('/loginAdmin', payload)
        .then(({data})=>{
            // console.log('data=')
            // console.log(data)
            setUser(data.user)
            setToken(data.token)
            navigate('/admin')
        })
        .catch(err=>{
            const response = err.response;
            if (response && response.status === 422) {
                if (response.data.errors) {
                    setErrors(response.data.errors)
                } else {
                    setErrors({
                        email: [response.data.message]
                    })
                }
                
            }
        })
    }

    
    return (
        <>
        <Box backgroundColor='white' height={'100%'}>
            <Header />
            <Grid container justifyContent={'center'} sx={{mt:'10%', mb:'14%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Grid border={1} borderColor={'#E5E7EB'} width={460}>
                    <form onSubmit={onSubmit}>
                        <Grid m='20px 20px 20px 20px'>
                            <Typography variant="h2" color="initial" mb='20px'>Connectez vous à votre compte</Typography>
                            {
                                errors && 
                                <Grid backgroundColor='#E5E7EB' mb='20px'  p='10px 20px 10px 20px'>
                                    {Object.keys(errors).map(key=>(
                                        <Typography variant='body1' fontWeight={500} key={key} >{errors[key][0]}</Typography>
                                    ))}
                                </Grid>
                            }
                            <TextField sx={{mb:'20px'}} inputRef={personneLoginRef} type='email' placeholder='Email' fullWidth autoFocus/>
                            <TextField sx={{mb:'20px'}} inputRef={passwordRef} type='password' placeholder='Mot de passe' fullWidth/>
                            <Button  sx={{mb:'20px'}} variant="contained" color="primary" onClick={onSubmit} fullWidth>
                            Me connecter
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
