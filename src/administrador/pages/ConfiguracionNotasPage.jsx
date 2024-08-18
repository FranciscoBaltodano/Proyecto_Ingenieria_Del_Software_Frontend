import { AdministradorLayout } from '../layout/AdministradorLayout'
import { Divider, Typography } from '@mui/material'
import { FormCrearNota } from '../components/FormCrearNota'

export const ConfiguracionNotasPage =()=>{
    return (
        <AdministradorLayout>
        <Typography variant="h5" component="h1" gutterBottom>
          Configuracion Notas
        </Typography>
        
        <Divider sx={{ marginBottom: 2 }} />
        
        <FormCrearNota/>
        
    </AdministradorLayout>
    )
}
