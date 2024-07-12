import { Navigate, Route, Routes } from 'react-router-dom'
import { ArchivosAdmisionPage, CancelacionesPage, DocentesPage, InicioPage, MatriculaPage, NoticiasPage, PlanificacionAcademicaPage } from '../pages'

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
    
      <Route path="/*" element={ <Navigate to='/admisiones/' /> }/>
    </Routes>
  );
};

