import { Button } from '@mui/material';
import { DocenteLayout } from '../../../layout/DocenteLayout'
import { useNavigate } from 'react-router-dom';

export const CalificacionesPage = () => {
    const navigate = useNavigate();
    // Navega a la pantalla anterior
    const handleBack = () => {
        navigate('/jefeDepartamento/docentes');
    };

    return (
        <DocenteLayout titulo='Calificaciones de docentes'>
            <Button variant="outlined" color="primary" onClick={handleBack}>
                Regresar
            </Button>
            
            <div>CalificacionesPage</div>
        </DocenteLayout>
    );
};


