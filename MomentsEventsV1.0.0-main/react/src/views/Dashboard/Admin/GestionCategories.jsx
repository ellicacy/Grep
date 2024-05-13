import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../../../axios-client';
import { useStateContext } from '../../../contexts/ContextProvider';

import formatDate from '../../../outils/formatDate'

import { DataGrid } from '@mui/x-data-grid';
import { Button, Typography, Grid } from '@mui/material';
import { Tabs, Tab } from '@mui/material';


export default function GestionCategories() {

  const [users, setUsers] = useState([])
  const [cat, setCat] = useState([])
  const [loading, setLoading] = useState(false)
  const [premiereImg, setPremiereImg] = useState('')

  const [rows, setRows] = useState([])

  const { user, token, notification, setUser, setToken, setNotification } = useStateContext()

  useEffect(() => {
    // getUsers()
    getCategories()
    // console.log(cat)
    // cat.map(c=>console.log(c.image))
  }, [])

  const columns = [
    // -----------------Information personnel-----------------
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'nom',
      headerName: 'Catégorie',
      width: 160,
      editable: false,
    },
    {
      field: 'image',
      headerName: 'Image url',
      width: 420,
      editable: false,
    },
    {
      field: 'score',
      headerName: 'Score recherche',
      width: 110,
      editable: false,
    },
    {
      field: 'created_at',
      headerName: 'Crée le',
      width: 110,
      editable: false,
      valueGetter: (params) =>
        `${formatDate(params.row.created_at) || ''}`,
    },
    {
      field: 'updated_at',
      headerName: 'Mis à jour le',
      width: 110,
      editable: false,
      valueGetter: (params) =>
        `${formatDate(params.row.updated_at) || ''}`,
    },
    {
      field: 'edit',
      headerName: 'Modifier',
      width: 140,
      renderCell: (params) => (
        <Link
          to={`/admin/categories/${params.row.id}`}
        >
          <Button
            variant='contained'
            color='primary'
          //onClick={() => onEdit(params.row)}
          >
            Modifier
          </Button>
        </Link>
      ),
    },
    {
      field: 'delete',
      headerName: 'Supprimer',
      width: 140,
      renderCell: (params) => (
          <Button
            variant='contained'
            color='primary'
            onClick={() => onDelete(params.row)}
          >
            Supprimer
          </Button>
      ),
    },
  ];


  const onDelete = async(c) => {
    
    if (!window.confirm('Vous étes sur le point de définitivement supprimer la catégorie ' + c.nom + '. Souhaitez-vous continer ? \n Cette action est irréversible ! \n Si vous souhaitez simplement désactiver la personne, cliquez sur "Modifier" et séléctionnez le role "inactif"')) {
      return;
    }
    await axiosClient.delete(`/admin/categories/${c.id}`)
      .then(() => {
        setNotification('La catégorie à été supprimé avec succès !')
        alert('La catégorie à été supprimé avec succès !')
        getCategories();
      })

  }

  const getCategories = async () => {
    setLoading(true)
    await axiosClient.get('/admin/categories')
      .then(({ data }) => {
        setLoading(false)
        setCat(data.data)
        // console.log(data)
        setRows(data.data)
      })
      .catch((e) => {
        setLoading(false)
        // console.log(e)
      })
  }


  return <>

    {/* <div style={{ padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Categories</h1>
        <Link to='/admin/categories/new' className='btn-add'>Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Score</th>
              <th>Image</th>
              <th>Created At</th>
              <th>Updated At</th>
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
            {cat.map(c => {
              // console.log(c)
              return (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.nom}</td>
                  <td>{c.score}</td>
                  AFFICHAGE POUR LOCALHOST
                  <td><img src={'http://localhost:8000/'+c.image.split('|').at(0)} width={140} height={80} alt="" /></td>
                  AFFICHAGE POUR LA PRODUCTION KEUMS.CH
                   <td><img src={'https://keums.ch/api/' + c.image.split('|').at(0)} width={140} height={80} alt="" /></td>
                  <td>{c.created_at}</td>
                  <td>{c.updated_at == null ? 'Pas encore modifié' : c.updated_at}</td>
                  <td>
                    <Link to={'/admin/categories/' + c.id} className='btn-edit'>Edit</Link>
                    &nbsp;
                    <button onClick={e => onDelete(c)} className='btn-delete'>Delete</button>
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
        // width: '100vw-260px',
      }}
      >

        <Typography variant='h1'>Catégories</Typography>

        <Link
          to='/admin/categories/new'
        >
          <Button
            variant='contained'
            color='primary'
          >
            Nouveau
          </Button>
        </Link>

      </div>

      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
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
    </Grid>
  </>
}
