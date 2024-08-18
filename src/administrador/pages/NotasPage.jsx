
import { OptionNotas } from '../components/OptionNotas'
import { AdministradorLayout } from '../layout/AdministradorLayout'
import { Divider, Typography } from '@mui/material'


export const NotasPage = () => {
  return (
    <AdministradorLayout>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestión de Notas
        </Typography>
        
        <Divider sx={{ marginBottom: 2 }} />

        <br />
        
        <OptionNotas/>

    </AdministradorLayout>
  )
}
