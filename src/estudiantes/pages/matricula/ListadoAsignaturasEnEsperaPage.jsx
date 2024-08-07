import React from 'react'
import { EstudianteLayout } from '../../layout/EstudianteLayout'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const ListadoAsignaturasEnEsperaPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
      navigate('/estudiantes/matricula');
  };
  return (
    <EstudianteLayout titulo='Listado de Asignaturas en Espera'>
     <Button variant="text" color="primary" onClick={handleBack}>
          Regresar
      </Button> 
    <div>ListadoAsignaturasEnEsperaPage</div>
    </EstudianteLayout>
  )
}