import React from 'react'
import { EstudianteLayout } from '../../layout/EstudianteLayout'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {ClaseMatriculadas} from '../../components/ClaseMatriculadas';

export const Forma03Page = () => {
  const navigate = useNavigate();
  const handleBack = () => {
      navigate('/estudiantes/matricula');
  };

  return (
    <EstudianteLayout titulo='Forma 03'>
      <Button variant="text" color="primary" onClick={handleBack}>
          Regresar
      </Button> 
      
      <div>Forma 03</div>

      <ClaseMatriculadas/>
      <br />
    </EstudianteLayout>
  )
}


