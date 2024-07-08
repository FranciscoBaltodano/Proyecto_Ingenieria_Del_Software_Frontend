import React from 'react'
import { AdministradorLayout } from '../layout/AdministradorLayout'
import { Divider, Typography } from '@mui/material'

export const CancelacionesPage = () => {
  return (
    <AdministradorLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Cancelaciones Excepcionales
      </Typography>

      <Divider sx={{ marginBottom: 2 }} />


    </AdministradorLayout>
  )
}
