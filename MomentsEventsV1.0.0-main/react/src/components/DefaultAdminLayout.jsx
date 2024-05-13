import React, { useState } from 'react';
import axiosClient from '../axios-client'
import { Link, Navigate, Outlet } from 'react-router-dom';
import { SplitScreen } from '../components/SplitScreen'
import { useStateContext } from '../contexts/ContextProvider';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { display } from '@mui/system';
import { Avatar, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useLocation } from 'react-router-dom';

export default function DefaultAdminLayout() {

    const { user, token, notification, setUser, setToken } = useStateContext();
    const navigate = useNavigate();
    const userLocal = JSON.parse(localStorage.getItem('USER'));
    const [selectedButton, setSelectedButton] = useState(0);
    const [selectedSubButton, setSelectedSubButton] = useState(null);

    const currentUrl = window.location.href;
    const { pathname } = new URL(currentUrl);

    // Split the pathname by "/"
    const pathSegments = pathname.split("/");

    // Get the second parameter
    const secondParam = pathSegments[2];




    if (!token || userLocal?.role != 'admin') {
        return <Navigate to='/admin' />
    }



    const onLogout = (e) => {
        e.preventDefault()
        axiosClient.post('/admin/logout')
            .then((data) => {
                setUser({})
                setToken(null)
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleEvents = () => {
        navigate('/admin/events')
    }

    const handleUsers = () => {
        navigate('/admin/users')
    }

    const handleCategories = () => {
        navigate('/admin/categories')
    }

    const handlePrestations = () => {
        navigate('/admin/prestations')
    }

    const handleTest = () => {
        navigate('/admin/filesUpload')
    }

    const handleApiCalls = () => {
        navigate('/admin/apiCalls')
    }

    const handlePmtTest = () => {
        navigate('/admin/testPmt')
    }

    const handleMailTest = () => {
        navigate('/admin/testMail')
    }

    const handleMailTestSuivi = () => {
        navigate('/admin/testMailSuivi')
    }

    useEffect(() => {
        if (secondParam === 'users') {
            setSelectedButton(0)
        }
        if (secondParam === 'categories') {
            setSelectedButton(1)
        }
        if (secondParam === 'Prestations') {
            setSelectedButton(2)
        }
        if (secondParam === 'events') {
            setSelectedButton(3)
        }
        axiosClient.get('/admin/userBack')
            .then(({ data }) => {
                setUser(data)
            })
            .catch(({ error }) => {
                console.log(error)
            })
    }, [])

    const handleButtonClicked = (buttonIndex) => {
        setSelectedButton(buttonIndex);
        if (buttonIndex === 0) {
            handleUsers()
        }
        if (buttonIndex === 1) {
            handleCategories()
        }
        if (buttonIndex === 2) {
            handlePrestations()
        }
        if (buttonIndex === 3) {
            handleEvents()
        }
    }

    const handleSubButtonClicked = (index) => {
        setSelectedSubButton(index);
    };

    const LeftHandComponent = () => {
        return (
            <>
                <Grid container direction={'row'} alignContent='flex-end' width={'260px'}>
                    <Grid m="30px 30px 30px 30px">
                        <Typography
                            variant="body1"
                            color="initial"
                            fontWeight={500}>
                            {user.personneNom + ' ' + user.personnePrenom}
                        </Typography>
                    </Grid>
                    <Grid>
                        <Button
                            variant="contained"
                            disableElevation
                            style={{
                                justifyContent: "flex-start",
                                height: '40px',
                                width: '100%',
                                backgroundColor: selectedButton === 0 ? '#111827' : '#FFFFFF'
                            }}
                            onClick={() => handleButtonClicked(0)}>
                            <Typography
                                color={selectedButton === 0 ? '#FFFFFF' : '#111827'}
                                ml='12px'>
                                Prestataires
                            </Typography>
                        </Button>
                        <Button
                            variant="contained"
                            disableElevation
                            style={{
                                justifyContent: "flex-start",
                                height: '40px',
                                width: '100%',
                                backgroundColor: selectedButton === 1 ? '#111827' : '#FFFFFF'
                            }}
                            onClick={() => handleButtonClicked(1)}>
                            <Typography
                                color={selectedButton === 1 ? '#FFFFFF' : '#111827'}
                                ml='12px'>
                                Catégories
                            </Typography>
                        </Button>
                        <Button
                            variant="contained"
                            disableElevation
                            style={{
                                justifyContent: "flex-start",
                                height: '40px',
                                width: '100%',
                                backgroundColor: selectedButton === 2 ? '#111827' : '#FFFFFF'
                            }}
                            onClick={() => handleButtonClicked(2)}>
                            <Typography
                                color={selectedButton === 2 ? '#FFFFFF' : '#111827'}
                                ml='12px'>
                                Prestations
                            </Typography>
                        </Button>
                        <Button
                            variant="contained"
                            disableElevation
                            style={{
                                justifyContent: "flex-start",
                                height: '40px',
                                width: '100%',
                                backgroundColor: selectedButton === 3 ? '#111827' : '#FFFFFF'
                            }}

                            onClick={() => handleButtonClicked(3)}>
                            <Typography
                                color={selectedButton === 3 ? '#FFFFFF' : '#111827'}
                                ml='12px'>
                                Réservations
                            </Typography>
                        </Button>

                        {selectedButton === 3 && (
                            <Grid>
                                <Button
                                    variant="contained"
                                    disableElevation
                                    style={{
                                        justifyContent: "flex-start",
                                        height: '40px',
                                        width: '100%',
                                        backgroundColor: selectedSubButton === 1 ? '#111827' : '#FFFFFF',
                                        paddingLeft: '30px'
                                    }}
                                    onClick={() => handleSubButtonClicked(1)}
                                >
                                    <Typography
                                        color={selectedSubButton === 1 ? '#FFFFFF' : '#111827'}
                                        ml='12px'
                                    >
                                        Demandées
                                    </Typography>
                                </Button>
                                <Button
                                    variant="contained"
                                    disableElevation
                                    style={{
                                        justifyContent: "flex-start",
                                        height: '40px',
                                        width: '100%',
                                        backgroundColor: selectedSubButton === 2 ? '#111827' : '#FFFFFF',
                                        paddingLeft: '30px'
                                    }}
                                    onClick={() => handleSubButtonClicked(2)}
                                >
                                    <Typography
                                        color={selectedSubButton === 2 ? '#FFFFFF' : '#111827'}
                                        ml='12px'
                                    >
                                        À venir
                                    </Typography>
                                </Button>
                                <Button
                                    variant="contained"
                                    disableElevation
                                    style={{
                                        justifyContent: "flex-start",
                                        height: '40px',
                                        width: '100%',
                                        backgroundColor: selectedSubButton === 3 ? '#111827' : '#FFFFFF',
                                        paddingLeft: '30px'
                                    }}
                                    onClick={() => handleSubButtonClicked(3)}
                                >
                                    <Typography
                                        color={selectedSubButton === 3 ? '#FFFFFF' : '#111827'}
                                        ml='12px'
                                    >
                                        Annulé
                                    </Typography>
                                </Button>
                            </Grid>
                        )}
                    </Grid>

                    {/* <Grid m="30px 30px 30px 30px">
                        <br /><br /><br />
                        <div style={{ backgroundColor: 'grey', textAlign: 'center' }}>
                            <br />
                            <button onClick={handleUsers} style={{ width: '80%' }}>Gestion users</button>
                            <br /><br />
                            <button onClick={handleCategories} style={{ width: '80%' }}>Gestion catégories</button>
                            <br /><br />
                            <button onClick={handleEvents} style={{ width: '80%' }}>Réservations</button>
                            <br /><br />
                  <button onClick={handleTest} style={{ width:'80%' }}>Upload images</button>
                            <br /><br />
                            <button onClick={handleApiCalls} style={{ width: '80%' }}>Api calls</button>
                            <br /><br />
                            <button onClick={handlePmtTest} style={{ width: '80%' }}>Test paiements</button>
                            <br /><br />
                            <button onClick={handleNewCategories} style={{ width: '80%' }}>New gestion catégories</button>
                            <br /><br />
                            <button onClick={onLogout} style={{ width: '80%' }}>Logout</button>
                            <br /><br />
                            <button onClick={handleMailTest} style={{ width: '80%' }}>Test Mail</button>
                            <br /><br />
                            <button onClick={handleMailTestSuivi} style={{ width: '80%' }}>Test Mail de Suivi</button>
                        </div>
                    </Grid> */}

                    <Grid
                        container
                        alignItems='flex-end'>
                        <Divider>
                            <Button
                                variant="contained"
                                disableElevation
                                style={{
                                    justifyContent: "flex-start",
                                    height: '40px',
                                    width: '100%',
                                    backgroundColor: '#FFFFFF'
                                }}
                                onClick={onLogout}>
                                <Typography
                                    // ml='12px'
                                    color={'#111827'}>
                                    Se déconnecter
                                </Typography>
                            </Button>
                        </Divider>
                    </Grid>
                </Grid>
            </>
        )
    }

    const RightHandComponent = () => {
        return (
            <>
                <div style={
                    {
                        backgroundColor: '#F3F4F6',
                        height: '100%',
                    }
                }>
                    <Outlet />
                </div>
            </>
        )
    }

    return (
        <SplitScreen
            leftWeight={0.5}
            rightWeight={2.5}
        >
            <LeftHandComponent />
            <RightHandComponent />
        </SplitScreen>
    )
}
