import { useState } from 'react';
import { Typography, Divider, Box } from '@mui/material';
import { AdministradorLayout } from '../layout/AdministradorLayout';
import { ExcelInput } from '../components/ExcelInput';
import CSVDownloader from '../../admisiones/components/SaveCSV';

export const ArchivosAdmisionPage = () => {
  return (
    <AdministradorLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Archivos Admisiones
      </Typography>

      <Divider />

      <Box sx={{ mb: 2, padding: 3, borderRadius: 2, backgroundColor: '#f9f9f9' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          Instrucciones
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Descargue el CSV que contiene los resultados de la prueba de admision
        </Typography>
        
        <CSVDownloader />
        
        <Typography variant="body1" sx={{ my: 1 }}>
          Asegúrese de que el archivo Excel o CSV a enviar contenga las siguientes columnas:
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Id Admision, DNI,Primer Nombre, Segundo Nombre, Primer Apellido, Segundo Apellido, Centro, Codigo, Carrera, Segunda Carrera, Email, Intentos, Nota1, Nota2, AprobacionPAA, Aprobacion PAM PCCNS, Matricula
        </Typography>
        <Typography variant="body1" sx={{ color: 'red', fontWeight: 'bold', mb: 1 }}>
          Advertencia:
        </Typography>
        <Typography variant="body1" sx={{ color: 'red', mb: 2 }}>
          Una vez procesados y enviados los datos, no se pueden revertir los cambios. 
          Tenga precaución al realizar esta acción.
        </Typography>
        <Typography variant="body1">
          Revise su archivo cuidadosamente antes de proceder con la carga. 
        </Typography>
      </Box>

      <ExcelInput />
      
    </AdministradorLayout>
  );
};
