import { useNavigate } from 'react-router-dom';
import { DocenteLayout } from '../../layout/DocenteLayout'
import { Button } from '@mui/material';

export const ListaDeEsperaPage = () => {
    const navigate = useNavigate();

    // Navega a la pantalla anterior
    const handleBack = () => {
        navigate(-1);
    };
  return (
    <DocenteLayout titulo='Lista de Espera'>
        <Button variant="outlined" color="primary" onClick={handleBack}>
            Regresar
        </Button>
    <div>ListaDeEsperaPage</div>
    </DocenteLayout>
  )
}
