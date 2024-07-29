
import { Navigate, Route, Routes } from 'react-router-dom'
import { CargaAcademicaPage, HistorialesPage, SolicitudesPage } from '../pages'

export const CoordinadoresRoutes = () => {
  return (
    <Routes>
      <Route path="/"               element={<SolicitudesPage /> }/>
      <Route path="solicitudes"     element={<SolicitudesPage /> }/>
      <Route path="cargaAcademica"  element={<CargaAcademicaPage /> }/>
      <Route path="historiales"     element={<HistorialesPage /> }/>

      <Route path="/*"   element={ <Navigate to='/admisiones/' /> }/>
    </Routes>
    
  )
}


