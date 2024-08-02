import React from 'react'
import { EstudianteLayout } from '../../layout/EstudianteLayout'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const AdicionarAsignaturaPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
      navigate('/estudiantes/matricula');
  };

  return (
    <EstudianteLayout titulo='Adicionar Asignatura'>
      <Button variant="text" color="primary" onClick={handleBack}>
          Regresar
      </Button>

      
      <div>AdicionarAsignaturaPage</div>
    </EstudianteLayout>
  )
}




