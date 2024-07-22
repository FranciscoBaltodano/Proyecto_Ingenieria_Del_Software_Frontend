import { Button } from '@mui/material';
import { DocenteLayout } from '../../../layout/DocenteLayout'
import { useNavigate } from 'react-router-dom';


export const EvaluacionesPage = () => {
  const navigate = useNavigate();
  // Navega a la pantalla anterior
  const handleBack = () => {
    navigate('/jefeDepartamento/docentes');
  };

  return (
    <DocenteLayout titulo='Evaluaciones de docentes'>
      <Button variant="outlined" color="primary" onClick={handleBack}>
          Regresar
      </Button>
      
      <div>EvaluacionesPage</div>

    </DocenteLayout>
  );
};




