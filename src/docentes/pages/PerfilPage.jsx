import React from 'react'
import { DocenteLayout } from '../layout/DocenteLayout'
import { PerfilMainPage } from '../../components/PerfilMainPage'

export const PerfilPage = () => {
  return (
    <DocenteLayout titulo='Perfil'>
      <PerfilMainPage />
    </DocenteLayout>
  )
}

