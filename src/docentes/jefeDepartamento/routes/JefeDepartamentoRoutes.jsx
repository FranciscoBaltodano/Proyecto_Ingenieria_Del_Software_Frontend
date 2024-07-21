import { Navigate, Route, Routes } from 'react-router-dom'
import { ConfigurarSeccionesPage, DocentesPage, EstudiantesPage, InfraestructuraPage, ListaDeEsperaPage, MatriculasPage, RegistrarSeccionPage } from '../pages'

export const JefeDepartamentoRoutes = () => {
  return (
    <Routes>
      <Route path="/"           element={<MatriculasPage /> }/>
      <Route path="docentes"    element={<DocentesPage /> }/>
      <Route path="estudiantes" element={<EstudiantesPage /> }/>
      <Route path="matricula"   element={<MatriculasPage /> }/>
      
      <Route path="registrarSeccion"   element={<RegistrarSeccionPage /> }/>
      <Route path="configurarSecciones"   element={<ConfigurarSeccionesPage /> }/>
      <Route path="infraestructura"   element={<InfraestructuraPage /> }/>
      <Route path="listaDeEspera"   element={<ListaDeEsperaPage /> }/>

      <Route path="/*"          element={ <Navigate to='/admisiones/' /> }/>
    </Routes>
  );
};