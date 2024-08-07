import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import {Carrusel} from '../components/Carrusel';
import { Footer } from '../components/Footer'; 
import logoUNAHconLetras from '/assets/logoUNAHconLetras.webp';
import { NoticiasList } from '../components/NoticiasList';
import { Navbar } from '../components/Navbar';

export const InicioPage = () => {
  return (
    <Grid sx={{marginLeft:'10px'}}>
  
    <Navbar />

        <Container maxWidth="100%" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mt: 4 }}>
          <Typography variant="h4" mb='10px' alignItems='center' sx={{ display: { sm: 'block', md: 'flex' } }}>
            Bienvenido a <img src={logoUNAHconLetras} alt="UNAH" width="200" style={{ marginLeft: '20px'}} />
          </Typography>
          <Typography variant="h5" paragraph>
            Encuentra toda la información que necesitas para tu proceso de admisión a la universidad.
          </Typography>
          
          <NoticiasList />

          <Carrusel />
        </Container>
        <Footer/>
    </Grid>

  );
};

