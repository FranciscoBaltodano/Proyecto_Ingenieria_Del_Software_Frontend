import { AdministradorLayout } from '../layout/AdministradorLayout'
import { Divider, Typography } from '@mui/material'

export const MatriculaPage = () => {
  return (
    <AdministradorLayout>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestión de Matricula
        </Typography>
        
        <Divider sx={{ marginBottom: 2 }} />

    </AdministradorLayout>
  )
}
