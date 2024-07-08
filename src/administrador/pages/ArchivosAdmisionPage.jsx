import { AdministradorLayout } from '../layout/AdministradorLayout'
import { Divider, Typography } from '@mui/material'

export const ArchivosAdmisionPage = () => {
  return (
    <AdministradorLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Archivos Admisiones
      </Typography>
      
      <Divider sx={{ marginBottom: 2 }} />

    </AdministradorLayout>
  )
}
