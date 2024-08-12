import React from 'react'
import { DocenteLayout } from '../layout/DocenteLayout'
import { ClasesLayout } from '../layout/ClasesLayout'
import { ClasesList } from '../components/ClasesList'

export const ClasesPage = () => {
  return (
    <ClasesLayout titulo='Mis Clases'>
      <ClasesList/>
    </ClasesLayout>
  )
}
