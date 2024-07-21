
import { Navigate, Route, Routes } from 'react-router-dom'
import { DocentesPage, EstudiantesPage, MatriculasPage } from '../pages'

export const JefeDepartamentoRoutes = () => {
  return (
    <Routes>
      <Route path="/"           element={<MatriculasPage /> }/>
      <Route path="docentes"    element={<DocentesPage /> }/>
      <Route path="estudiantes" element={<EstudiantesPage /> }/>
      <Route path="matricula"   element={<MatriculasPage /> }/>

      <Route path="/*"          element={ <Navigate to='/admisiones/' /> }/>
    </Routes>
  );
};