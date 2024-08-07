import React from 'react'
import { EstudianteLayout } from '../../layout/EstudianteLayout'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const ListadoAsignaturasCanceladasPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
      navigate('/estudiantes/matricula');
  };

  return (

    <EstudianteLayout titulo='Listado de Asignaturas Canceladas'>
      <Button variant="text" color="primary" onClick={handleBack}>
        Regresar
      </Button> 
    <div>ListadoAsignaturasCanceladasPage</div>
    </EstudianteLayout>
  )
}

