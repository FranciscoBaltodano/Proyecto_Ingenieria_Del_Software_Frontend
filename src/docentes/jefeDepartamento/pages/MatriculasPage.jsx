import React from 'react'
import { DocenteLayout } from '../../layout/DocenteLayout'
import { MatriculaMenu } from '../components/MatriculaMenu'

export const MatriculasPage = () => {
  return (
    <DocenteLayout titulo='Matriculas'>

        <MatriculaMenu />

    </DocenteLayout>
  )
}
