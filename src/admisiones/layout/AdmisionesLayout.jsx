import React from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Grid } from '@mui/material'

export const AdmisionesLayout = ({children}) => {
  return (
    <>
        <Navbar />
        
        <Grid container display='flex' justifyContent='center' alignItems='center' >
          <Grid item mx={'10px'}>
            {children}
          </Grid>
          <Footer />
        </Grid>
    </>
  );
};