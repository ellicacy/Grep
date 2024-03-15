import React from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import axiosClient from '../../../axios-client';
import { useStateContext } from '../../../contexts/ContextProvider';
import parse from 'html-react-parser';
import { Box, Tab, Tabs, Grid, Typography, Button, Divider } from '@mui/material';
import CKeditor from "../../../components/CKeditor";
import { DataGrid, GridToolbar, renderEditInputCell } from '@mui/x-data-grid';
import formatDate from '../../../outils/formatDate'
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuItem from '@mui/material/MenuItem';


export default function GestionPrestations() {

    const navigate = useNavigate()

    const [prestations, setPrestations] = useState([])

    const [packs, setPacks] = useState([])
    const [loading, setLoading] = useState(false)

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nom', headerName: 'Nom', width: 250 },
        // { field: 'description', headerName: 'Description', width: 200 },
        // { field: 'prixFixe', headerName: 'Prix Fixe', width: 120 },
        // { field: 'unite', headerName: 'Unité', width: 120 },
        // { field: 'prixUnite', headerName: 'Prix Unite', width: 120 },
        {
            field: 'created_at',
            headerName: 'Created At',
            width: 180,
            valueGetter: (params) =>
                `${formatDate(params.row.created_at) || ''}`,
        },
        {
            field: 'updated_ad',
            headerName: 'Updated At',
            width: 180,
            valueGetter: (params) =>
                `${formatDate(params.row.updated_at) || ''}`,
        },
        {
            field: 'packs',
            headerName: 'Packs',
            width: 200,
            enablesort: false,
            renderCell: (params) => (
                <>
                    {params.row.packs.map((pack) => (
                        <Link key={pack.id} style={{ textDecoration: 'none' }} to={`/admin/packs/${pack.id}`}>
                            <Typography variant='subtitle1' color='primary' sx={{ mr: 1 }} component='span'>
                                {pack.nom},
                            </Typography>
                        </Link>
                    ))}
                </>
            ),

        },
        {
            field: 'categories',
            headerName: 'Categories',
            width: 200,
            // renderCell: (params) => 
            // params.row.categories.map((categorie) => categorie.nom).join(', ') }
            renderCell: (params) => (
                <>
                    {params.row.categories.map((categorie) => (
                        <Link key={categorie.id} style={{ textDecoration: 'none' }} to={`/admin/categories/${categorie.id}`}>
                            <Typography variant='subtitle1' color='primary' sx={{ mr: 1 }} component='span'>
                                {categorie.nom},
                            </Typography>
                        </Link>
                    ))}
                </>
            ),
        },
        {
            field: 'modifier',
            headerName: 'Action',
            width: 180,
            renderCell: (params) => {
                // Initialize the ref for this row if it doesn't exist
                if (!refMap.current[params.id]) {
                    refMap.current[params.id] = React.createRef();
                }

                return (
                    <>
                        <Button
                            ref={refMap.current[params.id]}
                            id="composition-button"
                            aria-controls={openMap[params.id] ? 'composition-menu' : undefined}
                            aria-expanded={openMap[params.id] ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={() => handleToggle(params)}
                        >
                            ...
                        </Button>
                        <Popper
                            open={openMap[params.id]}
                            anchorEl={refMap.current[params.id].current}
                            role={undefined}
                            transition
                            disablePortal
                            style={{ zIndex: 9999 }} //
                        >
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{
                                        transformOrigin:
                                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                                        // 'bottom-start'
                                    }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose(params)}>
                                            <MenuList
                                                autoFocusItem={openMap[params.id]}
                                                id="composition-menu"
                                                aria-labelledby="composition-button"
                                                onKeyDown={handleListKeyDown(params)}
                                            >
                                                <MenuItem onClick={handleClose(params)}>Modifier</MenuItem>
                                                <MenuItem onClick={handleClose(params)}>Ajouter une catégorie</MenuItem>
                                                <MenuItem onClick={handleClose(params)}>Ajouter un nouveau pack</MenuItem>
                                                <Divider />
                                                <MenuItem onClick={handleClose(params)}>Supprimer</MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </>
                );
            },
        },
    ];


    //-----------------------------------------------------------------------------------------------------
    // const [value, setValue] = React.useState(0);
    // const [isPrixFixe, setIsPrixFixe] = useState(true);

    // CHAMPS POUR L'AJOUT D'UN PACK
    // const [nom, setNom] = useState('')
    // const [description, setDescription] = useState('')
    // const [prixFixe, setPrixFixe] = useState(0)
    // const [unite, setUnite] = useState(0)
    // const [prixUnite, setPrixUnite] = useState(0)

    // const { user, token, notification, setUser, setToken, setNotification } = useStateContext()

    // const onDelete = (p) => {
    //     if (!window.confirm('Are you sure you want to delete this pack (id: ' + p.id + ') ?')) {
    //         return;
    //     }
    //     // axiosClient.delete(`/categories/${c.id}`)
    //     // axiosClient.get(`/delete/categoryNew/${c.id}`)
    //     axiosClient.delete(`/admin/packs/${p.id}`)
    //         .then(() => {
    //             setNotification('Pack was successfully deleted !')
    //             getPacks();
    //         })
    // }

    // const onSubmit = (e) => {
    //     e.preventDefault()
    //     alert('formulaire soumis')
    //     const formData = new FormData()
    //     formData.append('nom', nom)
    //     formData.append('description', description)
    //     formData.append('prix_fixe', prixFixe)
    //     formData.append('unite', unite)
    //     formData.append('prix_unite', prixUnite)
    //     console.log(formData)
    //     axiosClient.post('/admin/packs', formData)
    //         .then(({ data }) => {
    //             console.log('RETOUR DE L\'APPEL AXIOS :')
    //             console.log(data)
    //             navigate('/admin/packs')
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }


    // const getPacks = async () => {
    //     setLoading(true)
    //     await axiosClient.get('/admin/packs')
    //     .then(({ data }) => {
    //         setLoading(false)
    //         // console.log(data)
    //         setPacks(data)
    //     })
    //     .catch((e) => {
    //         setLoading(false)
    //         console.log(e)
    //     })
    // }

    //-------------------------------BOUTON ACTION---------------------------------------------------------
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [openMap, setOpenMap] = useState({}); // Maps row id to open state
    const refMap = useRef({}); // Maps row id to ref

    const handleToggle = (params) => {
        setOpenMap((prev) => ({ ...prev, [params.id]: !prev[params.id] }));
    };



    const handleClose = (params) => (event) => {
        console.log(params)
        console.log(event)
        if (params.field == 'modifier') {
            navigate(`/admin/prestation/${params.id}`)
        }
        if (refMap.current[params.id].current && refMap.current[params.id].current.contains(event.target)) {
            return;
        }
        setOpenMap((prev) => ({ ...prev, [params.id]: false }));

    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);



    //-----------------------------------------------------------------------------------------------------

    const getPrestations = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get('/prestations');
            setPrestations(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        // getPacks();
        getPrestations();
    }, []);

    return (
        <>
            <Grid
                maxWidth='1643px'
                style={{
                    padding: '38px 100px 38px 100px',
                    // width: '1643px',
                }}
            >
                {/* <h1>user : {user.name} - role : {user.role}</h1> */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '38px',
                }}
                >

                    <Typography variant='h1'>Prestations</Typography>

                    <Link
                        to='/admin/prestation/new'
                    >
                        <Button
                            variant='contained'
                            color='primary'
                        >
                            Nouveau
                        </Button>
                    </Link>

                </div>
                <div style={{
                    // height: 400, 
                    width: '100%'
                }}>
                    {/* <DataGrid rows={prestations} columns={columns} pageSize={5} /> */}
                    <DataGrid
                        rows={prestations}
                        columns={columns}
                        getEstimatedRowHeight={() => 100}
                        getRowHeight={() => 'auto'}
                        slots={{ toolbar: GridToolbar }}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    // pageSize: 10,
                                },
                            },
                        }}
                        // pageSizeOptions={[10]}
                        getRowId={(row) => row.id}
                        // rowHeight={80}
                        columnHeaderHeight={80}
                        sx={{
                            // fontFamily: 'Roboto, sans-serif',
                            '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': {
                                py: 1,
                            },
                            '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
                                py: '15px',
                            },
                            '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': {
                                py: '22px',
                            },
                            backgroundColor: 'background.default',
                            borderRadius: '0px',
                            border: 'none',
                            '& .MuiDataGrid-columnHeaderTitle': {
                                fontWeight: 'bold',
                                fontSize: '0.9rem',
                                color: 'secondary.main',
                            },
                            '& .MuiDataGrid-cell': {
                                color: '#000000',
                                // fontSize: '14px',
                                fontSize: '0.9rem',
                                lineHeight: '1.5rem',
                            },
                        }}
                        // checkboxSelection
                        disableRowSelectionOnClick
                    />
                </div>

            </Grid>
        </>
    )
}