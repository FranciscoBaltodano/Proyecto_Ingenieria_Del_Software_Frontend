import { AdministradorLayout } from '../layout/AdministradorLayout'
import { Divider, Typography } from '@mui/material'
import { FormMatricula } from '../components/FormMatricula'

export const ConfiguracionMatriculaPage =()=>{
    return (
        <AdministradorLayout>
        <Typography variant="h5" component="h1" gutterBottom>
          Configuracion Matricula
        </Typography>
        
        <Divider sx={{ marginBottom: 2 }} />
        
        <FormMatricula/>
        
    </AdministradorLayout>
    )
}
