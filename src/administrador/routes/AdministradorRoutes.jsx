import { Navigate, Route, Routes } from 'react-router-dom'
import { ArchivosAdmisionPage, CancelacionesPage, DocentesPage, MatriculaPage, NoticiasPage, PlanificacionAcademicaPage,MatriculaTrimestralPage,MatriculaSemestralPage,CancelacionExcepcionalPage,GenerarCalendarioPage } from '../pages'

export const AdministradorRoutes = () => {
  return (
    <Routes>
      <Route path="/"              element={ <InicioPage/> }/>
      <Route path="noticias"       element={ <NoticiasPage/> }/>
      <Route path="docentes"       element={ <DocentesPage/> }/>
      <Route path="planificacion"  element={ <PlanificacionAcademicaPage/> }/>
      <Route path="cancelaciones"  element={ <CancelacionesPage/> }/>
      <Route path="admisiones"     element={ <ArchivosAdmisionPage/> }/>
      <Route path="matricula"      element={ <MatriculaPage/> }/>
      <Route path="matricula_trimestral" element={<MatriculaTrimestralPage/>}/>
      <Route path="matricula_semestral" element={<MatriculaSemestralPage/>}/>
      <Route path="cancelacion_excepcional" element={<CancelacionExcepcionalPage/>}/>
      <Route path="generar_calendario" element={<GenerarCalendarioPage/>}/>

      <Route path="/*" element={ <Navigate to='/admisiones/' /> }/>
    </Routes>
  );
};

