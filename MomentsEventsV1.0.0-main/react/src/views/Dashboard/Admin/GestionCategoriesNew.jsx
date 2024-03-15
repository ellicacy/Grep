import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../../../axios-client';
import { useStateContext } from '../../../contexts/ContextProvider';
// import {Table} from 'react-bootstrap/Table';
// import format from 'date-fns/format'

export default function GestionCategoriesNew() {

  const [users, setUsers] = useState([])
  const [cat, setCat] = useState([])
  const [loading, setLoading] = useState(false)
  const [premiereImg,setPremiereImg] = useState('')

  const {user, token, notification, setUser, setToken, setNotification} = useStateContext()

  useEffect(()=>{
    // getUsers()
    getCategories()
    // cat.map(c=>console.log(c.image))
  }, [])

  const onDelete = (c) => {
    // if (!window.confirm('Are you sure you want to delete this category ?')) {
    //   return;
    // }
    // // axiosClient.delete(`/categories/${c.id}`)
    // axiosClient.get(`/delete/category/${c.id}`)
    // .then(()=>{
    //   setNotification('Category was successfully deleted !')
    //   getCategories();
    // })
  }

  // const getUsers = async () => {
  //   setLoading(true);
  //   await axiosClient.get('/users')
  //   .then(({data}) => {
  //     setLoading(false);
  //     // console.log(data);
  //     setUsers(data.data);
  //   })
  //   .catch((e)=>{
  //     setLoading(false);
  //     console.error(e);
  //   })
  // }

  const getCategories = async () => {
    setLoading(true)
    await axiosClient.get('/categoriesNew')
    .then(({data})=>{
      setLoading(false)
    //   setCat(data.data)
    //   // cat.map(c=>console.log(c.image))
      console.log(data)
    //   // console.log(data.data[0].created_at)
    //   // console.log(format(new Date(data.data[0].created_at),'dd MMMM yyyy HH:mm:ss'))
    })
    .catch((e)=>{
      setLoading(false)
      console.log(e)
    })
  }

  return (
    
      // loading ? 
      // <div><h1>Chargement des données ...</h1></div> :
      <div style={{ padding: '0 20px' }}>
      {/* <h1>user : {user.name} - role : {user.role}</h1> */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Categories</h1>
        <Link to='/admin/categoriesNew/new' className='btn-add'>Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        
      </div>
    </div>
    
  )
}


{/* <table>
    <thead>
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Image</th>
        <th>Created At</th>
        <th>Updated At</th>
        <th>Actions</th>
    </tr>
    </thead>
    {loading && <tbody>
    <tr>
        <td colSpan={6} className={'text-center'}>
        Loading ...
        </td>
    </tr>
    </tbody>
    }
    {!loading && <tbody>
    {cat.map(c=>{
        // console.log(c)
        return (
        <tr key={c.id}>
        <td>{c.id}</td>
        <td>{c.name}</td> */}
        {/* <td><img src={'/upload/category/'+c.image} width={140} height={80} alt="" /></td> */}
        {/* <td><img src={c.image.split('|').at(0).substr(58, c.image.split('|').at(0).length)} width={140} height={80} alt="" /></td> */}
        {/* <td><img src={'/upload/category/'+c.image} width={140} height={80} alt="" /></td> */}
        {/* <td><img src={'https://keums.ch/api/'+c.image.split('|').at(0)} width={140} height={80} alt="" /></td> */}
        {/* <td><img src={'http://localhost:8000/api/'+c.image.split('|').at(0)} width={140} height={80} alt="" /></td> */}
        {/* <td><img src={c.image.split('|').at(0)} width={140} height={80} alt="" /></td> */}
        {/* <td>{format(new Date(c.created_at),'yyyy-mm-dd HH:mm:ss')}</td> */}
        {/* <td>{c.created_at}</td> */}
        {/* <td>{c.updated_at == null ? 'Pas encore modifié' : format(new Date(c.updated_at),'yyyy-mm-dd HH:mm:ss')}</td> */}
        {/* <td>{c.updated_at == null ? 'Pas encore modifié' : c.updated_at}</td>
        <td>
            <Link to={'/admin/categoriesNew/'+c.id} className='btn-edit'>Edit</Link>
            &nbsp;
            <button onClick={e=>onDelete(c)} className='btn-delete'>Delete</button>
        </td>
        </tr>
    )})}
    </tbody>
    }
</table> */}