import React from 'react'
import { AdministradorLayout } from '../layout/AdministradorLayout'
import { Divider, Typography } from '@mui/material'
import { Calendario } from '../components/FormCalendario'
import EventCalendar from '../components/Calendario'
export const PlanificacionAcademicaPage = () => {
  return (
    <AdministradorLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Planificación Academica
      </Typography>

      <Divider sx={{ marginBottom: 2 }} />

      <Calendario/>
      <Divider sx={{ marginBottom: 2 }} />
        <Typography variant="h6" gutterBottom>
        
      <EventCalendar />
        </Typography>
      
   
    </AdministradorLayout>
  )
}
