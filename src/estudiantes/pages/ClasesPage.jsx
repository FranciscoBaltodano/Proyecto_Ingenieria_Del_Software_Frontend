import React from 'react'
import { EstudianteLayout } from '../layout/EstudianteLayout'
import Matricula from '../components/Matricula'
import ClaseMatriculadas from '../components/ClaseMatriculadas'
export const ClasesPage = () => {
  return (
    <EstudianteLayout titulo='Clases'>
    <div>ClasesPage</div>
  <h1>prueba</h1>
  <Matricula/>
   <br/>
  <br/>
  <ClaseMatriculadas/>
 
    </EstudianteLayout>

  )
}
