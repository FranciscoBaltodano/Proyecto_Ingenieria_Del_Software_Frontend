import React from 'react'
import { EstudianteLayout } from '../layout/EstudianteLayout'
import { SaveCertificadoVOAE } from '../components/SaveCertificadoVOAE'
import { useAuth } from '../../contexts/AuthContext'
import { Grid } from '@mui/material'

export const NotasPage = () => {
  const {user} = useAuth()
  return (
    <EstudianteLayout titulo='Notas'>
      <Grid container justifyContent='center' spacing={2}>
        <SaveCertificadoVOAE numeroCuenta={user.numeroCuenta} />
      </Grid>
    </EstudianteLayout>
  )
}
