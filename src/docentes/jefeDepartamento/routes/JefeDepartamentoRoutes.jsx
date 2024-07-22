import { Navigate, Route, Routes } from 'react-router-dom'
import { CalificacionesPage, ConfigurarSeccionesPage, DocentesPage, EstadisticasPage, EstudiantesMatriculadosPage, EstudiantesPage, EvaluacionesPage, HistorialesPage, InfraestructuraPage, ListaDeEsperaPage, MatriculasPage, RegistrarSeccionPage } from '../pages'
import { ReinicioClavesPage } from '../pages/docentes/ReinicioClavesPage';

export const JefeDepartamentoRoutes = () => {
  return (
    <Routes>
      <Route path="/"           element={<DocentesPage /> }/>
      {/* <Route path="/"           element={<Navigate to='/docentes/clases' /> }/> */}
      <Route path="docentes"    element={<DocentesPage /> }/>
      <Route path="estudiantes" element={<EstudiantesPage /> }/>
      <Route path="matricula"   element={<MatriculasPage /> }/>
      
      {/* Seccion de maatricula */}
      <Route path="registrarSeccion"   element={<RegistrarSeccionPage /> }/>
      <Route path="configurarSecciones"   element={<ConfigurarSeccionesPage /> }/>
      <Route path="infraestructura"   element={<InfraestructuraPage /> }/>
      <Route path="listaDeEspera"   element={<ListaDeEsperaPage /> }/>


      {/* Seccion de Estudiantes */}
      <Route path="estadisticas"   element={<EstadisticasPage /> }/>
      <Route path="estudiantesMatriculados"   element={<EstudiantesMatriculadosPage /> }/>
      <Route path="historiales"   element={<HistorialesPage /> }/>

      {/* Seccion de Docentes */}
      <Route path="reinicioClaves"   element={<ReinicioClavesPage /> }/>
      <Route path="evaluaciones"   element={<EvaluacionesPage /> }/>
      <Route path="calificaciones"   element={<CalificacionesPage /> }/>


      <Route path="/*"          element={ <Navigate to='/admisiones/' /> }/>
    </Routes>
  );
};