import { Navigate, Route, Routes } from 'react-router-dom'
import { ArchivosAdmisionPage, InicioPage, CancelacionesPage, DocentesPage, MatriculaPage, NoticiasPage, ConfiguracionMatriculaPage,GenerarCalendarioPage,ConfiguracionCancelacionPage } from '../pages'

export const AdministradorRoutes = () => {
  return (
    <Routes>
      <Route path="/"              element={ <InicioPage/> }/>
      <Route path="noticias"       element={ <NoticiasPage/> }/>
      <Route path="docentes"       element={ <DocentesPage/> }/>
      <Route path="cancelaciones"  element={ <CancelacionesPage/> }/>
      <Route path="admisiones"     element={ <ArchivosAdmisionPage/> }/>
      <Route path="matricula"      element={ <MatriculaPage/> }/>
      <Route path="configuracion_cancelacion" element={<ConfiguracionCancelacionPage/>}/>
      <Route path="configuracion_matricula" element={<ConfiguracionMatriculaPage/>}/>

      <Route path="generar_calendario" element={<GenerarCalendarioPage/>}/>

      <Route path="/*" element={ <Navigate to='/admisiones/' /> }/>
    </Routes>
  );
};