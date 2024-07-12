import React from 'react';
import { AdmisionesLayout } from '../layout/AdmisionesLayout';
import { Container, Typography } from '@mui/material';
import {Carrusel} from '../components/Carrusel';

import logoUNAHconLetras from '/assets/logoUNAHconLetras.webp';
import { NoticiasList } from '../components/NoticiasList';

export const InicioPage = () => {
  return (
      <AdmisionesLayout >
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
      </AdmisionesLayout>
  );
};

