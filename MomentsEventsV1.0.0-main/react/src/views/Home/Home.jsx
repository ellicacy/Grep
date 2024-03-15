import React, { useEffect } from 'react'
import { useState } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Cover from '../../components/Home/Home.Cover.Recherche'
import Header from '../../components/Navigation/Header'
import SelectionPrestation from '../../components/Home/Home.Selection.Prestation'
import SelectionCategorie from '../../components/Home/Home.Selection.Categorie'
import SelectionPrestataire from '../../components/Home/Home.Selection.Prestataire'
import SelectionFAQ from '../../components/Home/Home.Selection.FAQ'
import BottomPage from '../../components/Navigation/BottomPage'
import Loader from '../Loader'

import { useSelector } from 'react-redux'


export default function Home(props) {

  const statePrestataires = useSelector(state => state.prestataires)
  const statePrestations = useSelector(state => state.prestations.prestations)
  const stateCategories = useSelector(state => state.categories)
  const [loading, setLoading] = useState(true)

  const [prestataires, setPrestataires] = useState([])
  const [prestations, setPrestations] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    setPrestataires(statePrestataires.prestataires)
    setPrestations(statePrestations)
    setCategories(stateCategories.categories)
    if (categories !== undefined) {
      setLoading(false)
    }

  }, [statePrestataires, statePrestations, stateCategories])




  return (
    <>
      {/* {console.log(categories)} */}
      {loading ?
        <Box>
          <Header />
          <Grid container item height='70vh'>
            <Loader />
          </Grid>
          <BottomPage />
        </Box>
        :
        <Grid
          container
          direction="column"
          style={{ minHeight: "100vh" }}
        >
          <Grid item sx={{ 
            flex: 1,
            width: '100%'
            }}
            >
            <Header />
            <Cover />
            <SelectionPrestation prestations={prestations} categories={categories} />
            <SelectionCategorie categories={categories} />
            <SelectionPrestataire prestataires={prestataires} />
            <SelectionFAQ />
          </Grid>
          <Grid item>
            <BottomPage />
          </Grid>
        </Grid>
      }

    </>
  )
}