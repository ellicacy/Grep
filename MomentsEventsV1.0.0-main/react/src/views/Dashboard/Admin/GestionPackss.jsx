import React from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../../axios-client';
import { useStateContext } from '../../../contexts/ContextProvider';
import parse from 'html-react-parser';
import { Box, Tab, Tabs, Grid, Typography, Button } from '@mui/material';
import CKeditor from "../../../components/CKeditor";
import { DataGrid } from '@mui/x-data-grid';
import formatDate from '../../../outils/formatDate'
export default function GestionPackss() {

    const navigate = useNavigate()

    const [prestations, setPrestations] = useState([])

    const [packs, setPacks] = useState([])
    const [loading, setLoading] = useState(false)
    const [value, setValue] = React.useState(0);
    const [isPrixFixe, setIsPrixFixe] = useState(true);

    // CHAMPS POUR L'AJOUT D'UN PACK
    const [nom, setNom] = useState('')
    const [description, setDescription] = useState('')
    const [prixFixe, setPrixFixe] = useState(0)
    const [unite, setUnite] = useState(0)
    const [prixUnite, setPrixUnite] = useState(0)

    const { user, token, notification, setUser, setToken, setNotification } = useStateContext()
    //--------------------------------------------------
    const formattedPacks = prestations.packs ? prestations.packs.map((pack) => {
        return {
            id: pack.id,
            nom: pack.nom,
            description: pack.description,
            prixFixe: pack.prix_fixe,
            unite: pack.unite,
            prixUnite: pack.prix_unite,
            createdAt: pack.created_at,
            updatedAt: pack.updated_at
        };
    }) : [];

    const formattedCategories = prestations.categories ? prestations.categories.map((category) => {
        return {
            id: category.id,
            nom: category.nom,
            description: category.description,
            createdAt: category.created_at,
            updatedAt: category.updated_at
        };
    }) : [];

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nom', headerName: 'Nom', width: 150 },
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
                        <Link key={pack.id} to={`/admin/packs/${pack.id}`}>
                            {pack.nom},
                        </Link>
                    ))}
                </>
            ),

        },
        { 
            field: 'categories', 
            headerName: 'Categories', 
            width: 200, 
            renderCell: (params) => 
            params.row.categories.map((category) => category.nom).join(', ') }
    ];


    const onDelete = (p) => {
        if (!window.confirm('Are you sure you want to delete this pack (id: ' + p.id + ') ?')) {
            return;
        }
        // axiosClient.delete(`/categories/${c.id}`)
        // axiosClient.get(`/delete/categoryNew/${c.id}`)
        axiosClient.delete(`/admin/packs/${p.id}`)
            .then(() => {
                setNotification('Pack was successfully deleted !')
                getPacks();
            })
    }

    const getPacks = async () => {
        setLoading(true)
        await axiosClient.get('/admin/packs')
            .then(({ data }) => {
                setLoading(false)
                // console.log(data)
                setPacks(data)
            })
            .catch((e) => {
                setLoading(false)
                console.log(e)
            })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        alert('formulaire soumis')
        const formData = new FormData()
        formData.append('nom', nom)
        formData.append('description', description)
        formData.append('prix_fixe', prixFixe)
        formData.append('unite', unite)
        formData.append('prix_unite', prixUnite)
        console.log(formData)
        axiosClient.post('/admin/packs', formData)
            .then(({ data }) => {
                console.log('RETOUR DE L\'APPEL AXIOS :')
                console.log(data)
                navigate('/admin/packs')
            })
            .catch((error) => {
                console.log(error)
            })
    }

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
        getPacks();
        getPrestations();
    }, []);

    return (
        <>
            {/* <div style={{ padding: '0 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1>Packs</h1>
                    {/* TODO => AJOUTER LA ROUTE /ADMIN/PACKS/NEW DANS LE ROUTER.JSX */}
            {/* METTRE L'ANCIEN FORMULAIRE DU FICHIER GESTIONPACKS.JSX */}
            {/* <Link to='/admin/packs/new' className='btn-add'>Add new</Link>
                </div>
                <div className="card animated fadeInDown">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Description</th>
                                <th>Prix fixe</th>
                                <th>Unité</th>
                                <th>Prix unité</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {loading && <tbody>
                            <tr>
                                <td colSpan={7} className={'text-center'}>
                                    Loading ...
                                </td>
                            </tr>
                        </tbody>
                        }
                        {!loading && <tbody>
                            {packs.map(p => {
                                return (
                                    <tr key={p.id}>
                                        <td>{p.id}</td>
                                        <td>{p.nom}</td>
                                        <td>{parse(p.description)}</td>
                                        <td>{p.prix_fixe}</td>
                                        <td>{p.unite}</td>
                                        <td>{p.prix_unite}</td>
                                        <td>
                                            <Link to={'/admin/packs/' + p.id} className='btn-edit'>Edit</Link>
                                            &nbsp;
                                            <button onClick={e=>onDelete(c)} className='btn-delete'>Delete</button>
                                            <button onClick={e => { onDelete(p) }} className='btn-delete'>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        }
                    </table>
                </div>
            </div>  */}
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
                        to='/admin/packs/new'
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
                    width: '100%' }}>
                    {/* <DataGrid rows={prestations} columns={columns} pageSize={5} /> */}
                    <DataGrid
                        rows={prestations}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    // pageSize: 10,
                                },
                            },
                        }}
                        // pageSizeOptions={[10]}
                        getRowId={(row) => row.id}
                        rowHeight={80}
                        columnHeaderHeight={80}
                        sx={{
                            // fontFamily: 'Roboto, sans-serif',
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