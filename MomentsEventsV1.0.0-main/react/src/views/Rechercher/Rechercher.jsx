import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import Header from '../../components/Navigation/Header'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../../components/Rechercher/Rechercher.Input'
import SearchResult from '../../components/Rechercher/Rechercher.output'
import BottomPage from '../../components/Navigation/BottomPage'
import { useSelector } from 'react-redux'
import Loader from '../Loader'
import Grid from '@mui/material/Grid'


export default function Rechercher() {

  const prestations = useSelector(state => state.prestations)
  const categories = useSelector(state => state.categories)
  const prestataires = useSelector(state => state.prestataires)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    
    // console.log(prestations.prestations)
    // console.log(categories.categories)
    if(prestations.prestations.length > 0 && categories.categories.length > 0){
      setLoading(false)
    }
  }, [prestations, categories])

  return (
    <>
      {loading ?
        <Box>
          <Header />
          <Grid container item height='70vh'>
            <Loader />
          </Grid>
          <BottomPage />
        </Box>
        :
        <Box sx={{ background: 'white' }}>
          <Header />
          <SearchBar/>
          <SearchResult prestations={prestations.prestations} categories={categories.categories} prestataires={prestataires.prestataires}/>
          <BottomPage />
        </Box>
      }
    </>
  )
}