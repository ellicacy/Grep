import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'

export default function DefaultLayout() {

    const {user, token, notification, setUser, setToken} = useStateContext()
    const [loading,setLoading] = useState(false)

    const onLogout = (e) => {
        e.preventDefault()
        // alert('userrole = '+user.role)
        axiosClient.post('/logout')
        .then(()=>{
            setUser({})
            setToken(null)
        })
    }

    useEffect(()=>{
        setLoading(true)
        axiosClient.get('/user')
        .then(({data})=>{
            setUser(data)
            setLoading(false)
        })
        .then(()=>{
            // if (user) console.log(user)
            // console.log(JSON.parse(localStorage.getItem('USER')))
        })
    }, [])

    if (!token) {
        return <Navigate to='/' />
    }

    return (
        <div id='defaultLayout'>
            <aside>
                <Link to='/'>Home</Link>
                <Link to='/dashboard'>Dashboard</Link>
                {/* <Link to='/users'>Users</Link> */}
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {!loading ? user.personneNom+" "+user.personnePrenom : 'CHARGEMENT DES DONNEES'}
                        <a className="btn-logout" href="#" onClick={onLogout}>Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
            {notification && 
                <div className='notification'>
                    {notification}
                </div>
            }
        </div>
    )
}
