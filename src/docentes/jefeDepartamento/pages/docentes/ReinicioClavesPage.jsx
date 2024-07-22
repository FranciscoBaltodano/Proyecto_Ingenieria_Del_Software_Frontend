
import { Button } from '@mui/material';
import { DocenteLayout } from '../../../layout/DocenteLayout'
import { useNavigate } from 'react-router-dom';

export const ReinicioClavesPage = () => {
    const navigate = useNavigate();
    // Navega a la pantalla anterior
    const handleBack = () => {
        navigate('/jefeDepartamento/docentes');
    };

    return (
        <DocenteLayout titulo='Reinicio de claves'>
            <Button variant="outlined" color="primary" onClick={handleBack}>
                Regresar
            </Button>
            
            <div>ReinicioClavesPages</div>
        </DocenteLayout>
    );
};