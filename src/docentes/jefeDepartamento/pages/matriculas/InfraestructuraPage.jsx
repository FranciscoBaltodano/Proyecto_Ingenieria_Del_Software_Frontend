import { Button } from '@mui/material';
import { DocenteLayout } from '../../../layout/DocenteLayout'
import { useNavigate } from 'react-router-dom';

export const InfraestructuraPage = () => {

    const navigate = useNavigate();

    // Navega a la pantalla anterior
    const handleBack = () => {
        navigate('/jefeDepartamento/matricula');
    };


    return (
    <DocenteLayout titulo='Infraestructura'>
        <Button variant="outlined" color="primary" onClick={handleBack}>
            Regresar
        </Button>
        
        <div>InfraestructuraPage</div>
    </DocenteLayout>
  )
}
