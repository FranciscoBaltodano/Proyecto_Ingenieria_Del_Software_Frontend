import { Navigate, Route, Routes } from 'react-router-dom'
import { ArchivosAdmisionPage, InicioPage, CancelacionesPage, DocentesPage, MatriculaPage, NoticiasPage,ConfiguracionMatriculaPage,ConfiguracionCancelacionesPage ,ConfiguracionMatriculaModificarPage,ConfiguracionCancelacionModificarPage,ConfiguracionNotasPage,NotasPage,ConfiguracionNotasModificarPage } from '../pages'

export const AdministradorRoutes = () => {
  return (
    <Routes>
      <Route path="/"              element={ <InicioPage/> }/>
      <Route path="noticias"       element={ <NoticiasPage/> }/>
      <Route path="docentes"       element={ <DocentesPage/> }/>
      <Route path="cancelaciones"  element={ <CancelacionesPage/> }/>
      <Route path="admisiones"     element={ <ArchivosAdmisionPage/> }/>
      <Route path="matricula"      element={ <MatriculaPage/> }/>
      <Route path="configuracion_cancelacion" element={<ConfiguracionCancelacionesPage/>}/>
      <Route path="configuracion_matricula" element={<ConfiguracionMatriculaPage/>}/>
      <Route path="configuracion_crear_nota" element={<ConfiguracionNotasPage/>}/>
      <Route path="proceso_notas_modificar/:id" element={<ConfiguracionNotasModificarPage/>}/>
      <Route path="configuracion_matricula_modificar/:id" element={<ConfiguracionMatriculaModificarPage/>}/>
      <Route path="configuracion_cancelacion_modificar/:id" element={<ConfiguracionCancelacionModificarPage/>}/>
      <Route path="notas" element={<NotasPage/>}/>




      <Route path="/*" element={ <Navigate to='/admisiones/' /> }/>
    </Routes>
  );
};