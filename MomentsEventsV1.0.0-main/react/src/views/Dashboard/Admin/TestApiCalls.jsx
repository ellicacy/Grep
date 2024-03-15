import { useEffect, useState } from "react"
import axiosClient from '../../../axios-client';

export default function TestApiCalls() {

    const [loading, setLoading] = useState(true)
    const [loading2, setLoading2] = useState(true)
    const [loading3, setLoading3] = useState(true)
    const [clients, setClients] = useState([])
    const [client, setClient] = useState([])
    const [clientPost, setClientPost] = useState([])
    const [nameClient,setNameClient] = useState('')
    const [emailClient,setEmailClient] = useState('')
    const [mdp,setMdp] = useState('')
    const [mdpConf,setMdpConf] = useState('')
    const [user3,setUser3] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'user',
    })

    const getClients = async () => {
        await axiosClient.get('/admin/clients')
        .then(({data})=>{
            // console.log('/clients')
            // console.log(data.clients)
            setClients(data.clients)
            setLoading(false)
        })
        .catch(({error})=>{
            console.log(error)
        })
    }

    const getClientById = async (id) => {
        await axiosClient.get(`/admin/clients/${id}`)
        .then(({data})=>{
            // console.log('/clients/${id}')
            // console.log(data.client)
            setClient(data.client)
            // setUser3(data.client)
            setLoading2(false)
        })
        .catch(({error})=>{
            console.log(error)
        })
    }

    const postClientById = async (id) => {

        // Créer le formData et y insérer les éléments nécessaires à l'ajout d'un client
        const formData = new FormData()
        

        await axiosClient.post(`/admin/postClientById/${id}`, formData)
        .then(({data})=>{
            console.log(data)
            setLoading3(false)
        })
        .catch(({error})=>{
            console.log(error)
        })
    }

    const handlePostClientById = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        formData.append('role', 'user')
        console.log('soumission du formulaire')
        console.log(formData)

        axiosClient.post('/admin/users', formData)
        .then(({data})=>{
            console.log(data)
            setNameClient('')
            setEmailClient('')
            setMdp('')
            setMdpConf('')
        })
        .catch(({error})=>{
            console.log(error)
        })
    }

    const handlePutClientById = (e) => {
        e.preventDefault()
        // const formData = new FormData(e.target)

        axiosClient.put('/admin/users/3', user3)
        .then(({data})=>{
            console.log(data)
        })
        .catch(({error})=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        // console.log('on est la ...')
        getClients()
        getClientById(3)
        axiosClient.get(`/admin/users/3`)
        .then(({data})=>{
            setLoading2(false);
            // console.log(data)
            setUser3(data);
            // setSelectValue(data.role)
            // console.log(data.role)
        })
        .catch((err)=>{
            console.log(err);
            setLoading2(false);
        })
    }, [])


    return (
        <div style={{ padding: '0 20px' }}>
            <h1>Page de test pour les appels API</h1>

            <div>
                <h3>GetClients()</h3>

                <p>
                    {
                        !loading ?
                            // console.log(clients)
                            clients && clients.length > 0 ?
                                clients.map(c=>{
                                    // console.log(client)
                                    return (
                                    c.role == 'user' ?
                                    <div key={c.idPersonne}>
                                    <div>{c.personneNom+" "+c.personnePrenom + " (role="+c.role+")"}</div>
                                    </div>
                                    :
                                    <>
                                    <div>Pas client ...</div>
                                    </>
                                    )
                                })
                            :
                            //     clients ? 
                            //     // console.log(clients[1].name)
                            //         <>
                            //         <div>{clients[2].name}</div>
                            //         <div>{clients[2].role}</div>
                            //         </>
                            //     :
                                    <>
                                    <div>Pas de résultat ...</div>
                                    </>
                        :
                            <>
                            <div>En chargement</div>
                            </>
                    }
                </p>
            </div>
            <div>
                <h3>GetClientById(id)</h3>

                <p>
                    {
                        !loading2 ?
                            // console.log(client)
                            client && client.length > 0 ?
                                <>
                                    <div>{client[0].name}</div>
                                    <div>{client[0].email}</div>
                                    <div>{client[0].role}</div>
                                </>
                            :
                                <>
                                    <div>Pas de client</div>
                                </>
                        :
                            <>
                            <div>En chargement</div>
                            </>
                    }
                </p>
            </div>
            <div>
                <h3>PostClientById(id)</h3>

                <p>
                    <form onSubmit={handlePostClientById}>
                        <p>Name :</p>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                            value={nameClient}
                            onChange={e=>setNameClient(e.target.value)}
                        />
                        <p>Email :</p>
                        <input 
                            type="email"  
                            name="email"
                            id="email"
                            value={emailClient}
                            onChange={e=>setEmailClient(e.target.value)}
                        />
                        <p>Mot de passe :</p>
                        <input 
                            type="password" 
                            name="password"
                            id="password"
                            value={mdp}
                            onChange={e=>setMdp(e.target.value)}
                        />
                        <p>Confirmation du mot de passe :</p>
                        <input 
                            type="password" 
                            name="password_confirmation"
                            id="password_confirmation"
                            value={mdpConf}
                            onChange={e=>setMdpConf(e.target.value)}
                        />
                        <br />
                        <button>Ajouter le client</button>
                    </form>
                    {/* {
                        !loading3 ?
                            client && client.length > 0 ?
                                <>
                                    <div>{client[0].name}</div>
                                    <div>{client[0].email}</div>
                                    <div>{client[0].role}</div>
                                </>
                            :
                                <>
                                    <div>Pas de client</div>
                                </>
                        :
                            <div>En chargement</div>
                    } */}
                </p>
            </div>
            <div>
                <h3>Modification du client n° 3</h3>

                    {
                        !loading2 && user3
                        ?
                            <>
                                <form onSubmit={handlePutClientById}>
                                    <p>Name :</p>
                                    <input 
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={user3.name}
                                        onChange={e=>setUser3({...user3, name:e.target.value})}
                                    />
                                    <p>Email :</p>
                                    <input 
                                        type="email"  
                                        name="email"
                                        id="email"
                                        value={user3.email}
                                        onChange={e=>setUser3({...user3, email:e.target.value})}
                                    />
                                    <p>Mot de passe :</p>
                                    <input 
                                        type="password" 
                                        name="password"
                                        id="password"
                                        autoComplete="new-password"
                                        // value={user3.password}
                                        onChange={e=>setUser3({...user3, password:e.target.value})}
                                    />
                                    <p>Confirmation du mot de passe :</p>
                                    <input 
                                        type="password" 
                                        name="password_confirmation"
                                        id="password_confirmation"
                                        // value={user3.password_confirmation}
                                        onChange={e=>setUser3({...user3, password_confirmation:e.target.value})}
                                    />
                                    <br />
                                    <button>Modifier le client 3</button>
                                </form>   
                            </>
                        :
                            <div>En attente des données ...</div>
                    }
            </div>
        </div>
    )
}