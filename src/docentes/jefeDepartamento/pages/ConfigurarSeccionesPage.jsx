import { Button } from '@mui/material';
import { DocenteLayout } from '../../layout/DocenteLayout'
import { useNavigate } from 'react-router-dom';

export const ConfigurarSeccionesPage = () => {

    const navigate = useNavigate();

    // Navega a la pantalla anterior
   const handleBack = () => {
     navigate(-1);
   };

  return (
    <DocenteLayout titulo='Configurar Secciones'>
        <Button variant="outlined" color="primary" onClick={handleBack}>
            Regresar
        </Button>
        
        <div>ConfigurarSeccionesPage</div>
    </DocenteLayout>
  )
}
