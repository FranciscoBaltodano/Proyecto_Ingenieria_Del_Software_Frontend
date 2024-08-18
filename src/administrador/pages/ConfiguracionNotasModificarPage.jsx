import { AdministradorLayout } from '../layout/AdministradorLayout'
import { Divider, Typography } from '@mui/material'
import { FormCrearNotaModificar } from '../components/FormCrearNotaModificar'

export const ConfiguracionNotasModificarPage =()=>{
    return (
        <AdministradorLayout>
        <Typography variant="h5" component="h1" gutterBottom>
          Configuracion Notas
        </Typography>
        
        <Divider sx={{ marginBottom: 2 }} />
        
        <FormCrearNotaModificar/>
        
    </AdministradorLayout>
    )
}
