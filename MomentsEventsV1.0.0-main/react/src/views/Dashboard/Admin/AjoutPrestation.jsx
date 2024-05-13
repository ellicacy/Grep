import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../../axios-client';
import { useStateContext } from '../../../contexts/ContextProvider';
import PrestationForm from './PrestationForm';

export default function AjoutPrestation() {

  // ID = USER_ID
  const {id} = useParams();
  const [prestataire, setPrestataire] = useState(null);
  const [prestations, setPrestations] = useState([]);
  const {user, token, notification, setUser, setToken} = useStateContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [idPresta, setIdPresta] = useState(0)

  const getPrestataire = (id) => {
    axiosClient.get(`/admin/user/${id}/getPrestataire`)
    .then(({data})=>{
        // console.log('prestataire = ')
        // console.log(data);
        setPrestataire(data);
        setIdPresta(data.id);
    })
  }

  const getPrestations = (id) => {
    axiosClient.get(`/admin/user/${id}/getPrestations`)
    .then(({data})=>{
        // console.log(data);
        setPrestations(data);
    })
  }

  const getCategoriesByPresta = (id) => {
    axiosClient.get(`/admin/getCategoriesByPrestation/${id}`)
    .then(({data})=>{
      // console.log('retour pour les catégories : ')
      // console.log(data)
    })
    .catch(({error})=>{
      console.log(error)
    })
  }

  useEffect(()=>{
    // getNomPrestataire(id)
    // console.log('id_param =', id)
    getPrestataire(id)
    getPrestations(id)
    // chercher les catégories de la prestation passée en paramètre (id de la prestation)
    getCategoriesByPresta(idPresta)
  },[])

  return (
    <div style={{ padding: '0 20px 20px' }}>

        <PrestationForm id={id} prestations={prestations} />

    </div>
  )
}