import React from 'react'
import { AdministradorLayout } from '../layout/AdministradorLayout'
import { Divider, Typography } from '@mui/material'

export const PlanificacionAcademicaPage = () => {
  return (
    <AdministradorLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Planificación Academica
      </Typography>

      <Divider sx={{ marginBottom: 2 }} />


    </AdministradorLayout>
  )
}
