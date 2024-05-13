import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../../../axios-client';
import parse from 'html-react-parser';
// import functions from '../apifunction/PrestationsApi';



export default function ShowPrestation() {
    
    const {id} = useParams();
    let catNom = '';
    const [cat, setCat] = useState([]);
    const [catBDD, setCatBDD] = useState([])
    const [nomCat, setNomCat] = useState([])
    const [prestataire, setPrestataire] = useState(null);
    const [prestations, setPrestations] = useState([]);
    const [loading, setLoading] = useState(false)

    const getPrestataire = async (id) => {
        setLoading(true)
        await axiosClient.get(`/admin/user/${id}/getPrestataire`)
        .then(({data})=>{
            // console.log('prestataire = ')
            // console.log(data);
            setPrestataire(data);
            setLoading(false)
        })
        .catch((e)=>{
          console.log(e)
          setLoading(false)
        })
    }

    const getCategoriesByPresta = async (id) => {
      setLoading(true)
      await axiosClient.get(`/getCategoriesByPrestation/${id}`)
      .then(({data})=>{
        // console.log('DATAAAAA')
        // console.log(data)
        // console.log('retour pour les catégories : ')
        // console.log(data.categories)
        setCatBDD(data.categories)
        // console.log(data.nomCategories)
        setNomCat(data.nomCategories)
        // setNomCat(data.prestation)
        setLoading(false)
      })
      .catch(({error})=>{
        console.log(error)
        setLoading(false)
      })
    }

    // const getPrestations = async (id) => {
    //     await axiosClient.get(`/user/${id}/getPrestations`)
    //     .then(({data})=>{
    //         console.log(data);
    //         setPrestations(data);
    //     })
    // }
    const getPrestations = async (id) => {
        setLoading(true)
        await axiosClient.get(`/admin/user/${id}/getPrestationsAvecCategories`)
        .then(({data})=>{
            // console.log('prestations = ')
            // console.log(data.data);
            setPrestations(data.data);
            setLoading(false)
        })
    }

    useEffect(()=>{
        getPrestataire(id)
        // setTimeout(()=>{
        // console.log(functions.getPrestations(id))
        // },1000)
        // prestations2 = functions.getPrestations(id)
        getPrestations(id)
        getCategories()
        // getCategoriesByPresta(1)
        // console.log(prestations2)
        // console.log(prestations)
    },[])

    const onDelete = (prestation) => {
        // console.log(prestation)
        axiosClient.delete('/admin/prestations/'+prestation.id)
        .then(()=>{
          alert('Prestation supprimé')
          getPrestations(id)
        })
        .catch(()=>{

        })
    }

    const getCategories = async () => {
      setLoading(true)
      await axiosClient.get('/admin/getCategories')
      .then(({data})=>{
        // console.log('categories = ')
        // console.log(data)
        setCat(data)
        setLoading(false)
      })
      .catch((e)=>{
        console.log(e)
        setLoading(false)
      })
    }

    // const getCategorieNom = async (catId) => {
    //   // a changer
    //   await axiosClient.get('/getCategorieNewNom/'+catId)
    //   .then(({data})=>{
    //     // console.log(data)
    //     // setCatNom(data)
    //   })
    //   .catch((e)=>{
    //     console.log(e)
    //   })
    // }

    // const handleDelete = (prestation, idUser) => {
    //   functions.onDelete(prestation, idUser)
    //   // setPrestations(functions.getPrestations(idUser))

    // }

    return (
    <div style={{ padding: '0 20px 20px' }}>
        {prestataire && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Les prestations de {prestataire.personneNom+' '+prestataire.personnePrenom} ({prestations.length})</h1>
            <Link to={'/admin/users/'+id+'/addPrestation'} className='btn-add'>Add new</Link>
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Catégorie</th>
              <th>Description</th>
              <th>Image</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody key={'tbody'}>
            {/* {console.log('catBDD = ')}
            {console.log(catBDD)} */}
            {
              loading ?
              <tr>
                <td colSpan={6}>
                  Chargement des données
                </td>
              </tr>
              :
              prestations.map(p=>{
                // console.log('PPPPPPPP')
                // console.log(p)
                return (
                <tr key={p.id}>
                  <td>{p.nom}</td>
                  <td>
                    <ul style={{ padding:0, listStylePosition:'inside' }}>
                      {/* {getCategoriesByPresta(p.id)} */}
                      {/* {catBDD.map((c,i) => {
                        // console.log(c)
  
                        return (
                          <li key={i}>{c.nom}</li>
                        )
                      })} */}
                      {p.categories.map((c,i)=>{
                        return (
                          <li key={c.id}>{c.nom}</li>
                        )
                      })}
                  {/* {nomCat.map((c,i)=>{
                    // getCategoriesByPresta(p.id)
                    // console.log(c)
                    // if (c.id == p.id_cat) {
                    //   catNom = c.name
                    // }
                    return (
                    <li key={i}>{c}</li>
                    )
                  })} */}
                  </ul>
                  </td>
                  {/* <td>{catNom}</td> */}
                  <td>{parse(p.description)}</td>
                  <td><img src={'http://localhost:8000/'+p.photo.split('|').at(0)} alt="" width={'150px'} height={'100px'} /></td>
                  {/* <td><img src={'http://localhost:8000/'+p.photo.split('|').at(0)} alt="" width={'150px'} height={'100px'} /></td> */}
                  <td>{p.created_at}</td>
                  <td>
                    <Link to={'/admin/prestation/'+p.id} className='btn-edit'>Edit</Link>
                    &nbsp;
                    {/* <button onClick={e=>handleDelete(p,id)} className='btn-delete'>Delete</button> */}
                    <button onClick={e=>onDelete(p)} className='btn-delete'>Delete</button>
                  </td>
                </tr>
                )
              })}
          </tbody>
        </table>
    </div>
  )
}
