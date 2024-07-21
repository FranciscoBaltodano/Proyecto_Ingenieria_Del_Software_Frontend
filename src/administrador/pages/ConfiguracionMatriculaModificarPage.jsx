import { AdministradorLayout } from '../layout/AdministradorLayout'
import { Divider, Typography } from '@mui/material'
import { FormMatriculaModificar } from '../components/FormMatriculaModificar'

export const ConfiguracionMatriculaModificarPage =()=>{
    return (
        <AdministradorLayout>
        <Typography variant="h5" component="h1" gutterBottom>
          Modificando Matricula
        </Typography>
        
        <Divider sx={{ marginBottom: 2 }} />
        
        <FormMatriculaModificar/>
        
    </AdministradorLayout>
    )
}
