import { AdministradorLayout } from '../layout/AdministradorLayout'
import { Divider, Typography } from '@mui/material'
import { FormCancelacionExcepcionalModificar } from '../components/FormCancelacionExcepcionalModificar'

export const ConfiguracionCancelacionModificarPage =()=>{
    return (
        <AdministradorLayout>
        <Typography variant="h5" component="h1" gutterBottom>
          Modificar Cancelaciones
        </Typography>
        
        <Divider sx={{ marginBottom: 2 }} />
        
        <FormCancelacionExcepcionalModificar/>
        
    </AdministradorLayout>
    )
}
