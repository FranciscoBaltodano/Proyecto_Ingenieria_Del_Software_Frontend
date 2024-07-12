import { AdministradorLayout } from '../layout/AdministradorLayout'
import { Divider, Typography } from '@mui/material'

export const MatriculaSemestralPage =()=>{
    return (
        <AdministradorLayout>
        <Typography variant="h4" component="h1" gutterBottom>
          Matricula Semestral
        </Typography>
        
        <Divider sx={{ marginBottom: 2 }} />

    </AdministradorLayout>
    )
}