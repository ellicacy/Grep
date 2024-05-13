import React from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../../axios-client';
import { useStateContext } from '../../../contexts/ContextProvider';
import { Box, Tab, Tabs } from '@mui/material';
import CKeditor from "../../../components/CKeditor";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function GestionPacks() {

    const navigate = useNavigate()
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

    const {user, token, notification, setUser, setToken, setNotification} = useStateContext()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleCheckbox = (e) => {
        // e.preventDefault()
        if(e.target.checked) {
            // alert('is checked')
            // console.log('is checked')
            setIsPrixFixe(true)
            setUnite(0)
            setPrixUnite(0)
        } else {
            // alert('isn\'t checked')
            // console.log('isn\'t checked')
            setIsPrixFixe(false)
            setPrixFixe(0)
        }
    }

    const getPacks = async () => {
        setLoading(true)
        await axiosClient.get('/admin/packs')
        .then(({data})=>{
            setLoading(false)
            // console.log(data)
            setPacks(data)
        })
        .catch((e)=>{
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
        .then(({data})=>{
            console.log('RETOUR DE L\'APPEL AXIOS :')
            console.log(data)
            navigate('/admin/packs')
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        // console.log('USER =')
        // console.log(user)
        getPacks()
    }, [])

    return (
        <div style={{ padding: '0 20px' }}>
            <h1>Packs</h1>

            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Tous les packs" {...a11yProps(0)} />
                    <Tab label="Créer un pack" {...a11yProps(1)} />
                    <Tab label="Autre" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <>
                    <table>
                        <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Id</th>
                            <th style={{ textAlign: 'center' }}>Nom</th>
                            <th style={{ textAlign: 'center' }}>Description</th>
                            <th style={{ textAlign: 'center' }}>Prix</th>
                            <th style={{ textAlign: 'center' }}>Unité</th>
                            <th style={{ textAlign: 'center' }}>Prix_unité</th>
                            <th style={{ textAlign: 'center' }}>Date création</th>
                            <th style={{ textAlign: 'center' }}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* TOURNER DANS LE TABLEAU DE PACKS */}
                        {
                            loading ?
                            (
                            <tr><td colSpan={8}>Chargement des données</td></tr>
                            )
                            :
                            (
                            packs.map(p=>{
                            return (
                                <tr key={p.id} style={{ textAlign: 'center' }}>
                                    <td>{p.id}</td>
                                    <td>{p.nom}</td>
                                    <td>{p.description}</td>
                                    <td>{p.prix_fixe}</td>
                                    <td>{p.unite}</td>
                                    <td>{p.prix_unite}</td>
                                    <td>{p.created_at}</td>
                                    <td><button href="#">...</button></td>
                                </tr>
                            )
                            }))
                        }
                        </tbody>
                    </table>
                    </>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <h1>Créer un nouveau pack</h1>

                    <form onSubmit={onSubmit}>
                        <input 
                            type="text" 
                            placeholder='Entrer le nom du pack'
                            value={nom}
                            onChange={(e)=>{setNom(e.target.value)}}
                        />
                        <br />
                        <CKeditor 
                            name={'pack'}
                            placeholder={'Entrer la description du pack'}
                            onChange={(data)=>{
                                console.log(data)
                                setDescription(data)
                            }}
                            value={description}
                            editorLoaded={true}
                        />
                        <br />
                        <div style={{ display:'flex' }}>
                            <input 
                                type="checkbox" 
                                value={isPrixFixe}
                                defaultChecked={isPrixFixe}
                                onChange={handleCheckbox}
                                style={{ width:'50px',height:'15px' }}
                            />
                            <label>Prix fixe (forfait global)</label>
                        </div>
                        {
                            isPrixFixe 
                            ? 
                            (
                                <div>
                                    <h4>Entrer le prix fixe :</h4>
                                    <input 
                                        type="number"
                                        step={0.05} 
                                        placeholder='Entrer le prix fixe'
                                        value={prixFixe}
                                        onChange={(e)=>{setPrixFixe(e.target.value)}}
                                    />
                                </div>
                            )
                            :
                            (
                                <div>
                                    <h4>Entrer le type d'unité :</h4>
                                    <input 
                                        type="text" 
                                        placeholder="Entrer le nombre d'unité"
                                        value={unite}
                                        onChange={(e)=>{setUnite(e.target.value)}}
                                    />
                                    <br />
                                    <h4>Entrer le prix d'une unité :</h4>
                                    <input 
                                        type="number"
                                        step={0.05} 
                                        placeholder="Entrer le prix d'une unité"
                                        value={prixUnite}
                                        onChange={(e)=>{setPrixUnite(e.target.value)}}
                                    />
                                    <br />
                                </div>
                            )
                        }
                        <input 
                            type="submit" 
                            className='btn btn-success'
                            value={'Créer le pack'}
                        />
                    </form>

                </TabPanel>
                <TabPanel value={value} index={2}>
                    Autre ...
                </TabPanel>
            </Box>
        </div>
    )
}