import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { DocenteLayout } from '../../../layout/DocenteLayout';

export const RegistrarSeccionPage = () => {
  const navigate = useNavigate();

   // Navega a la pantalla anterior
  const handleBack = () => {
    navigate('/jefeDepartamento/matricula');
  };

  return (
    <DocenteLayout titulo='Registrar Secciones'>
      <Button variant="outlined" color="primary" onClick={handleBack}>
        Regresar
      </Button>

      <div>RegistrarSeccionPage</div>


    </DocenteLayout>
  );
};
