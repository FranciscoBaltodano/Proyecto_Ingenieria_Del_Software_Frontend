import { AdministradorLayout } from '../layout/AdministradorLayout'
import { Divider, Typography } from '@mui/material'
import { FormCancelacionExcepcional } from '../components/FormCancelacionExcepcional'

export const ConfiguracionCancelacionesPage =()=>{
    return (
        <AdministradorLayout>
        <Typography variant="h5" component="h1" gutterBottom>
          Configuracion Cancelaciones
        </Typography>
        
        <Divider sx={{ marginBottom: 2 }} />
        
        <FormCancelacionExcepcional/>
        
    </AdministradorLayout>
    )
}
