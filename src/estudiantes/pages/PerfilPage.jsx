import React from 'react'
import { EstudianteLayout } from '../layout/EstudianteLayout'
import { PerfilMainPage } from '../../components/PerfilMainPage'

export const PerfilPage = () => {
  return (
    <EstudianteLayout titulo='Mi Perfil'>
      <PerfilMainPage/>
    </EstudianteLayout>
  )
}

