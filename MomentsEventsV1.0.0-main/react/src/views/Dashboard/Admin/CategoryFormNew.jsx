import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../../axios-client';
import { useEffect } from 'react';
// import WisiwigCat from '../components/WisiwigCat';
import CKeditor from '../../../components/CKeditor';

export default function CategoryFormNew(id) {

    // console.log('id : ',id)
    const [formSubmitted,setFormSubmitted] = useState(false)
    const [loading,setLoading] = useState(true)
    const [editorLoaded,setEditorLoaded] = useState(false)
    const [data,setData] = useState('')
    const [cat,setCat] = useState({
        'id': null,
        'nom': '',
        'description': '',
        'image': '',
        'score': 0
    });

    const navigate = useNavigate()
    const {idParam} = useParams()
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [photo,setPhoto] = useState(null)
    const [photos,setPhotos] = useState([])
    const [createdAt,setCreatedAt] = useState('')

    const [nameMod,setNameMod] = useState('')
    const [descriptionMod,setDescriptionMod] = useState('')
    const [photoMod,setPhotoMod] = useState(null)
    const [photosMod,setPhotosMod] = useState([])
    const [updatedAt,setUpdatedAt] = useState('')
    const [avatar,setAvatar] = useState(true);

    const handleAdd = async (e) => {
        e.preventDefault()
        // console.log('id : '+idParam)
        // console.log(e.target)
        // const formData = new FormData()
        // formData.append('name',name)
        // formData.append('description',description)
        // // formData.append('image',photo)
        // var files = e.target[13].files
        // for(let i=0; i<files.length; i++) {
        //     formData.append('file[]', files[i])
        // }
        // let date = new Date();
        // let current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
        // let current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
        // let date_time = current_date+" "+current_time;
        // formData.append('created_at',date_time)

        // await axiosClient.post('/addCategory',formData)
        // .then(({data})=>{
        //     alert('ok catégorie enregistré')
        //     navigate('/admin/categories')
        // })
        // .catch(({response})=>{
        //     console.log(response)
        // })
    }

    const renderPhotos = (source) => {
        return source.map(photo=>{
            // console.log(photo)
            return <img src={photo} alt="" key={photo} style={{ width:'20%',height:'180px',margin:'0 5px' }} />
        })
    }

    const renderPhotosMod = (source) => {
        return source.map(photo=>{

            // console.log(photo)
            // let realpath = photo.split('|').at(0).substr(58,photo.split('|').at(0).length)
            let realpath = photo.split('|').at(0)
            // console.log('realpath='+realpath)
            return <img src={'http://localhost:8000/'+realpath} alt="" key={realpath} style={{ width:'20%',height:'180px',margin:'0 5px' }} />
            // return <img src={'http://localhost:8000/'+realpath} alt="" key={realpath} style={{ width:'20%',height:'180px',margin:'0 5px' }} />
        })
    }

    const handlePhotos = (e) => {
        setPhotos([])
        // setFormSubmitted(true)
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file)=>{
                return URL.createObjectURL(file)
            })
            setPhotos(prevImage => prevImage.concat(filesArray))
            Array.from(e.target.files).map((file)=>{
                return URL.revokeObjectURL(file)
            })
            console.log(photos)
        }
    }

    // const handlePhoto = (e) => {
    //     let fichier = e.target.files[0]
    //     let reader = new FileReader()
    //     let limit = 1024*1024*2
    //     if(fichier['size'] > limit) {
    //         alert('Oups, l\'image est trop volumineuse.')
    //     }
    //     reader.onloadend = (fichier) => {
    //         setPhoto(reader.result)
    //     }
    //     reader.readAsDataURL(fichier)
    // }

    const handlePhotosMod = (e) => {
        setPhotosMod([])
        setFormSubmitted(true)
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file)=>{
                return URL.createObjectURL(file)
            })
            setPhotosMod(prevImage => prevImage.concat(filesArray))
            Array.from(e.target.files).map((file)=>{
                return URL.revokeObjectURL(file)
            })
        }
    }

    // const handlePhotoMod = (e) => {
    //     let fichier = e.target.files[0]
    //     let limit = 1024*1024*2
    //     if(fichier['size'] > limit) {
    //         alert('Oups, l\'image est trop volumineuse.')
    //     }else{
    //         let reader = new FileReader()
    //         reader.onload = (e) => {
    //             setAvatar(false)
    //             setPhotoMod(e.target.result)
    //         }
    //         reader.readAsDataURL(fichier)
    //     }
    // }

    if(idParam) {
        useEffect(()=>{
            // console.log('idParam : ',idParam)
            setEditorLoaded(true)
            getCategories()
            // function sleep(ms) {
            //     return new Promise(resolve => setTimeout(resolve, ms))
            // }
            // sleep(1000)
            // alert('CATEGORY FORM NEWWWWWWWW')
        }, [])
    }else{
        useEffect(()=>{
            setLoading(false)
            setEditorLoaded(true)
            // alert('CATEGORY FORM NEWWWWWWWW')
        }, [])
    }

    const getCategories = async () => {
        setLoading(true)
        await axiosClient.get(`/getCategoryNew/${idParam}`)
        .then(({data})=>{
            console.log('data => ',data)
            const {nom,description,image,created_at,updated_at} = data.category
            // console.log('id=',id)
            // console.log('id_user=',id_user)
            // console.log('nom=',nom)
            // console.log('description=',description)
            // console.log('contraintes=',contrainte)
            // console.log('photo=',photo)
            setNameMod(nom)
            setDescriptionMod(description)
            setPhotoMod(image)
            setPhotosMod(image.split('|'))
            let date = new Date();
            let current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
            let current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
            let date_time = current_date+" "+current_time;
            setUpdatedAt(date_time)
            setLoading(false)
            setCat(data.category)
            setNameMod(data.category.nom)
        })
        .catch(()=>{
            setLoading(false)
        })
    }

    const handleModify = async (e) => {
        e.preventDefault()

        console.log('nomMod = ', nameMod)
        

        // console.log('id catégorie = ')
        // console.log(idParam)
        // console.log('event = ')
        // console.log(e.target)
        setFormSubmitted(true)
        const formData = new FormData()
        formData.append('nom',nameMod)
        formData.append('description',descriptionMod)
        // // formData.append('file',photosMod)

        var files = e.target[13].files

        if (files.length > 0) {
            for(let i=0; i<files.length; i++) {
                formData.append('file[]', files[i])
            }
        }
        // // console.log(photosMod)
        // // return
        let date = new Date();
        let current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
        let current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
        let date_time = current_date+" "+current_time;
        formData.append('updated_at',date_time)
        await axiosClient.post(`/updateCategoryNew/${idParam}`, formData)
        .then((data)=>{
            alert('modification effectuée')
            navigate(-1)
        })
    }

    return (
    <>
    {/* ON SE TROUVE DANS LE FORMULAIRE DE MODIFICATION */}
    {
        loading ?
        <div><h1>Chargement des données ...</h1></div> :
        idParam ?
        <div className="card animated fadeInDown" style={{ padding: '0 20px 20px' }}>
            {/* {console.log(cat)} */}
            <h1 style={{ marginBottom: '20px' }}>Modifier une catégorie</h1>
            <form onSubmit={handleModify}>
                <div>

                    <h4>Nom de la catégorie :</h4>
                    <input type="text" placeholder='Entrer le nom de la catégorie' value={nameMod} onChange={(e)=>{setNameMod(e.target.value)}}/>
                    <br />

                    <h4>Description de la catégorie :</h4>
                    <CKeditor
                        name={'categorie'}
                        placeholder={'Entrer la description de la catégorie'}
                        onChange={(data)=>{
                            // console.log(data)
                            // setData(data)
                            // setDescriptionMod(data)
                            setData(data)
                            setDescriptionMod(data)
                        }}
                        value={cat.description}
                        editorLoaded={editorLoaded}
                    />
                    {/* <textarea style={{ width: '100%' }} rows="5" placeholder='Entrer la description de la catégorie' value={descriptionMod} onChange={(e)=>{setDescriptionMod(e.target.value)}} ></textarea> */}
                    <br />

                    <h4>Image de la catégorie :</h4>
                    <input 
                        type="file" 
                        name='file[]'
                        multiple
                        accept='image/png, image/jpeg, image/jpg'
                        onChange={handlePhotosMod}
                    />
                    <br />
                    
                    <div style={{ textAlign: 'center' }}>
                        {/* <h4>Aperçu de l'image :</h4>
                        {
                            avatar === true
                            ? <img src={'/upload/category/'+photoMod} width={'50%'} height={'350px'}/>
                            :  <img src={photoMod} width={'50%'} height={'350px'}/>
                        } */}
                        {
                            formSubmitted ?
                            renderPhotos(photosMod)
                            :
                            renderPhotosMod(photosMod)
                        }
                        
                    </div>

                    <br /><br />
                    <div style={{ textAlign: 'center' }}>
                        <button className='btn btn-add'>Modifier</button>
                    </div>
                </div>
            </form>
            </div>
            : 
            <div className="card animated fadeInDown" style={{ padding: '0 20px 20px', width: '100%' }}>
                <h1 style={{ marginBottom: '20px' }}>New Category</h1>
            <form onSubmit={handleAdd}>
                <div>

                    {/* <h4>Nom de la catégorie :</h4> */}
                    <input type="text" placeholder='Entrer le nom de la catégorie' value={name} onChange={(e)=>{setName(e.target.value)}}/>
                    <br />

                    {/* <h4>Description de la catégorie :</h4> */}
                    {/* <WisiwigCat /> */}
                    <CKeditor
                        name={'categorie'}
                        placeholder={'Entrer la description de la catégorie'}
                        onChange={(data)=>{
                            setData(data)
                            setDescription(data)
                        }}
                        // data={data}
                        editorLoaded={editorLoaded}
                    />
                    {/* <textarea style={{ width: '100%' }} rows="5" placeholder='Entrer la description de la catégorie' value={description} onChange={(e)=>{setDescription(e.target.value)}} ></textarea> */}
                    <br />

                    {/* <h4>Image de la catégorie :</h4> */}
                    <input 
                        type="file" 
                        name='file[]' 
                        onChange={handlePhotos} 
                        multiple accept='image/png, image/jpeg, image/jpg' 
                    />
                    <br />
                    
                    {/* {photo && (
                        <div style={{ textAlign: 'center' }}>
                            <h4>Aperçu de l'image :</h4>
                            <img src={photo} width={'50%'} height={'350px'}/>
                        </div>
                    )} */}
                    <div style={{ textAlign: 'center' }}>
                    {
                        renderPhotos(photos)
                    }
                    </div>
                    <br /><br />
                    <div style={{ textAlign: 'center' }}>
                        <button className='btn btn-add'>Ajouter</button>
                    </div>
                </div>
            </form>
        </div>
    }
    </>
  )
}
