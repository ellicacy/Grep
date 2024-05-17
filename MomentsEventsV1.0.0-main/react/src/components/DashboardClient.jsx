import {React, useState, useEffect } from 'react'
import { Navigate, Outlet, useLocation, Link } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'

import { Avatar, Grid, Typography, Badge, Box } from '@mui/material'
import { premiereLettreMajuscule } from '../outils/stringTransform'

// import some icons.
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

import { grey } from '@mui/material/colors';

export default function DashboardClient() {

    const { user, token, notification, setUser, setToken } = useStateContext()
    const [loading, setLoading] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState(null);


    const onLogout = (e) => {
        e.preventDefault()
        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
    }

    const location = useLocation();

    const isActive = (path) => {
        return location.pathname.startsWith(path);
    };

    const linkStyle = (path) => {
        return {
            textDecoration: 'none',
            width: '100%',
            height: '42px',
            color: isActive(path) ? '#fff' : '#000',
            backgroundColor: isActive(path) ? '#000' : '#fff',
        };
    };


    const subLinkStyle = (path) => ({
        textDecoration: 'none',
        width: '100%',
        height: '42px',
        color: isActive(path) ? '#000' : grey[500],
        fontWeight: isActive(path) ? 'bold' : 'normal',
        marginLeft: '45px',
        display: 'block',
        paddingTop: '20px',
        marginTop: '-10px'
    });


    useEffect(() => {
        setLoading(true);

        // Charger les informations de l'utilisateur depuis la BDD
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });

        // Charger l'avatar depuis la BDD
        axiosClient.get('/user/avatar')
            .then(response => {
                setAvatarUrl(response.data.avatar_url);
                //console.log(avatarUrl);
            })
            .catch(error => {
                const errorMessage = error.response?.data?.message || 'Une erreur inconnue s\'est produite pendant le chargement de votre avatar.';
                console.log(errorMessage);
            });
        

    }, []);


    if (!token) {
        return <Navigate to='/' />
    }




    

    return (
        <div id='defaultLayout'>
            <aside
                style={{
                    padding: 0,
                    width: '260px',
                    backgroundColor: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between', // Répartit l'espace entre le haut et le bas
                }}
            >

                {/* Contenu du haut */}
                <Grid container direction='column'>
                    {/* Avatar + nom*/}
                    <Grid container display='flex' alignItems='center' justifyItems='flex-start' alignContent='center' padding='30px 0 30px 30px'>
                        {/* Avatar*/}
                        <Grid item>
                            <Avatar
                                sx={{
                                    height: '50px',
                                    width: '50px',
                                }}
                                src={avatarUrl}
                            >
                                {!loading && user.personneNom && user.personnePrenom ?
                                    premiereLettreMajuscule(user.personneNom[0]) + premiereLettreMajuscule(user.personnePrenom[0])
                                    :
                                    <>
                                    </>
                                }
                            </Avatar>
                        </Grid>

                        {/* Nom */}
                        <Grid item ml='10px'>
                            <Typography variant='body1'>
                                {!loading && user.personneNom && user.personnePrenom ?
                                    premiereLettreMajuscule(user.personneNom) + " " + premiereLettreMajuscule(user.personnePrenom)
                                    :
                                    <>
                                    </>
                                }
                            </Typography>
                        </Grid>
                    </Grid>

                    {/* Lien Dashboard */}
                    <Link to='/dashboard' style={linkStyle('/dashboard')}>
                        <Grid container height={'100%'} alignItems='center' ml='30px'>
                            <Typography variant='body1'>Tableau de bord</Typography>
                        </Grid>
                    </Link>

                    {/* Lien Réservations */}
                    <Link
                        to='/reservations/demandes'
                        style={{
                            textDecoration: 'none',
                            width: '100%',
                            height: '42px',
                            color: location.pathname.startsWith('/reservations') ? '#fff' : '#000',
                            backgroundColor: location.pathname.startsWith('/reservations') ? '#000' : '#fff',
                        }}
                    >
                        <Grid container height={'100%'} alignItems='center' ml='30px'>
                            <Typography variant='body1'>Réservations</Typography>
                        </Grid>
                    </Link>

                    {/* Sous-onglets pour Réservations */}
                    {location.pathname.startsWith('/reservations') && (
                        <Box>
                            <Link to='/reservations/demandes' style={subLinkStyle('/reservations/demandes')}>Demandes</Link>
                            <Link to='/reservations/a-venir' style={subLinkStyle('/reservations/a-venir')}>À venir</Link>
                            <Link to='/reservations/annule' style={subLinkStyle('/reservations/annule')}>Annulé</Link>
                        </Box>
                    )}

                    {/* Lien Prestations */}
                    <Link to='/prestations' style={linkStyle('/prestations')}>
                        <Grid container height={'100%'} alignItems='center' ml='30px'>
                            <Typography variant='body1'>Prestations</Typography>
                        </Grid>
                    </Link>
                    {/* #MomentsEvent */}
                    {/* Lien Packs */}
                    <Link to='/packs' style={linkStyle('/packs')}>
                        <Grid container height={'100%'} alignItems='center' ml='30px'>
                            <Typography variant='body1'>Packs</Typography>
                        </Grid>
                    </Link>

                    {/* #MomentsEvent */}
                    {/* Lien Disponibilitées */}
                    <Link to='/availabilities' style={linkStyle('/availabilities')}>
                        <Grid container height={'100%'} alignItems='center' ml='30px'>
                            <Typography variant='body1'>Disponibilitées</Typography>
                        </Grid>
                    </Link>
                    


                    {/* Lien Notifications */}
                    <Link to='/notifications' style={linkStyle('/notifications')}>
                        <Grid container height={'100%'} alignItems='center' ml='30px'>
                            <Typography variant='body1'>Notifications</Typography>
                            <Badge badgeContent={4} color="primary" sx={{
                                marginLeft: 12,
                                '& .MuiBadge-badge': {
                                    backgroundColor: grey[300],
                                    color: grey[900],
                                    paddingLeft: 2,
                                    paddingRight: 2
                                }
                            }}>
                            </Badge>
                        </Grid>
                    </Link>
                </Grid>

                {/* Contenu du bas */}
                <Grid container direction='column'>

                    {/* Lien Paramètres */}
                    <Link to='/parametres' style={linkStyle('/parametres')}>
                        <Grid container height={'100%'} alignItems='center' ml='30px'>
                            <SettingsIcon style={{ fontSize: '25px', marginRight: '5px' }} />
                            <Typography variant='body1'>Parametres</Typography>
                        </Grid>
                    </Link>

                    {/* Lien Accueil */}
                    <Link to='/#' style={linkStyle('#')}>
                        <Grid container height={'100%'} alignItems='center' ml='30px'>
                            <HomeIcon style={{ fontSize: '25px', marginRight: '5px' }} />
                            <Typography variant='body1'>Accueil</Typography>
                        </Grid>
                    </Link>

                    {/* Lien Se déconnecter */}
                    <Link onClick={onLogout} style={linkStyle('#')}>
                        <Grid container height={'100%'} alignItems='center' ml='30px'>
                            <LogoutIcon style={{ fontSize: '25px', marginRight: '5px', color: grey[500] }} />
                            <Typography variant='body1' style={{ color: grey[500] }} >Se déconnecter </Typography>
                        </Grid>
                    </Link>
                </Grid>
            </aside>

            <div className="content" style={{ backgroundColor: grey[200] }}>
                <main>
                    <Outlet />
                </main>
            </div>
        </div >
    );
}
