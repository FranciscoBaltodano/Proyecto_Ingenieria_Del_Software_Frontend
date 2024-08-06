import React from 'react'
import { EstudianteLayout } from '../../layout/EstudianteLayout'
import { Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Matricula from '../../components/Matricula';
import { ClaseMatriculadas } from '../../components/ClaseMatriculadas';

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

      
      <Matricula/>
      <Divider sx={{my:2}}/>
      <ClaseMatriculadas/>
    </EstudianteLayout>
  )
}




