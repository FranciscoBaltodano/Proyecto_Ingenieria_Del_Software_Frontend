import React from 'react';
import { AdmisionesLayout } from '../layout/AdmisionesLayout';
import { Container, Typography, Grid } from '@mui/material';
import {Carrusel} from '../components/Carrusel'; // Asumiendo que Carrusel está exportado correctamente desde Carrusel.jsx

import logoUNAHconLetras from '/assets/logoUNAHconLetras.png';
import calendario from '/assets/admisiones/calendario.png';
import creacionExpediente from '/assets/admisiones/creacionExpediente.png';
import solvenciaMatricula from '/assets/admisiones/solvenciaMatricula.png';
import recomendaciones from '/assets/admisiones/recomendaciones.png';

export const InicioPage = () => {
  return (
      <AdmisionesLayout>
        <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mt: 4 }}>
          <Typography variant="h4" mb='10px' alignItems='center' sx={{ display: { sm: 'block', md: 'flex' } }}>
            Bienvenido a <img src={logoUNAHconLetras} alt="UNAH" width="200" style={{ marginLeft: '20px'}} />
          </Typography>
          <Typography variant="h5" paragraph>
            Encuentra toda la información que necesitas para tu proceso de admisión a la universidad.
          </Typography>
          <Grid container spacing={4} justifyContent="center" sx={{ mt: 0.1 }}>
            <Grid item>
              <img src={calendario} alt="Calendario de Admisiones" style={{ maxWidth: '100%', height: 'auto', borderRadius: '15px', boxShadow: '1px 10px 20px 1px rgba(0,0,0,0.6)', marginBottom: '20px' }} />
            </Grid>
            <Grid item>
              <img src={creacionExpediente} alt="Creación Expediente" style={{ maxWidth: '100%', height: 'auto', borderRadius: '15px', boxShadow: '1px 10px 20px 1px rgba(0,0,0,0.6)', marginBottom: '20px' }} />
            </Grid>
            <Grid item>
              <img src={solvenciaMatricula} alt="Solvencia Matrícula" style={{ maxWidth: '100%', height: 'auto', borderRadius: '15px', boxShadow: '1px 10px 20px 1px rgba(0,0,0,0.6)', marginBottom: '20px' }} />
            </Grid>
            <Grid item>
              <img src={recomendaciones} alt="Recomendaciones" style={{ maxWidth: '100%', height: 'auto', borderRadius: '15px', boxShadow: '1px 10px 20px 1px rgba(0,0,0,0.6)', marginBottom: '20px' }} />
            </Grid>
          </Grid>

          <Carrusel />
        </Container>
      </AdmisionesLayout>
  );
};

