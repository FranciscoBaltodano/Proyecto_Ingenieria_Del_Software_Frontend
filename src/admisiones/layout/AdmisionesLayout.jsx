import React from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Grid } from '@mui/material'

export const AdmisionesLayout = ({children}) => {
  return (
    <>
        <Navbar />
        
        <Grid container>
          <Grid item mx={'10px'}>
            {children}
          </Grid>
          <Footer />
        </Grid>
    </>
  )
}
