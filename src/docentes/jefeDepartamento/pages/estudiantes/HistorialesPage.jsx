import { Button } from '@mui/material';
import { DocenteLayout } from '../../../layout/DocenteLayout'
import { useNavigate } from 'react-router-dom';

export const HistorialesPage = () => {
    const navigate = useNavigate();
    // Navega a la pantalla anterior
    const handleBack = () => {
        navigate('/jefeDepartamento/estudiantes');
    };
    
    return (
        <DocenteLayout titulo='Historiales'>
            <Button variant="outlined" color="primary" onClick={handleBack}>
                Regresar
            </Button>
            
            <div>HistorialesPage</div>
        </DocenteLayout>
    );
};

