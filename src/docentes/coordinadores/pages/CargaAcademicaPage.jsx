import React from 'react';
import { DocenteLayout } from '../../layout/DocenteLayout';
import SaveEXCEL from '../components/SaveEXCEL';
import SavePDF from '../components/SavePDF';
import { useAuth } from '../../../contexts/AuthContext';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';

export const CargaAcademicaPage = () => {
  const { user, user: { id_departamento, departamento } } = useAuth();

  return (
    <DocenteLayout titulo="Carga Academica">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box className="card">
            <SavePDF id_Departamento={id_departamento} nombre={departamento} />
            <Box className="card-details">
              <p className="text-title">Carga Academica</p>
              <p className="text-body">Genera un reporte de la carga academica</p>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box className="card">
            <SaveEXCEL id_Departamento={id_departamento} nombre={departamento} />
            <Box className="card-details">
              <p className="text-title">Carga Academica</p>
              <p className="text-body">Genera un reporta de la carga academica</p>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <style>{`
        .card {
          width: 100%;
          height: 280px;
          border-radius: 20px;
          position: relative;
          padding: 1.5rem;
          border: 2px solid #c3c6ce;
          background-color: white;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          margin: auto;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border: 1px solid #e0e0e0;
          transition: border-color 0.3s ease;
        }

        .card-details {
          color: black;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 0.5em;
        }


        .text-body {
          color: rgb(134, 134, 134);
        }

        .text-title {
          font-size: 1.5em;
          font-weight: bold;
        }

        .card:hover {
          border-color: #008bf8;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.2);
          transform: scale(1.02);
        }

        .card:hover .text-title {
          color: #008bf8;
          transition: color 0.3s ease;
        }
      `}</style>
    </DocenteLayout>
  );
};
