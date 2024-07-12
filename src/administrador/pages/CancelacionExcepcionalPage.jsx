import { AdministradorLayout } from '../layout/AdministradorLayout'
import { Divider, Typography } from '@mui/material'

export const CancelacionExcepcionalPage =()=>{
    return (
        <AdministradorLayout>
        <Typography variant="h4" component="h1" gutterBottom>
          Hola Mundo
        </Typography>
        
        <Divider sx={{ marginBottom: 2 }} />

    </AdministradorLayout>
    )
}