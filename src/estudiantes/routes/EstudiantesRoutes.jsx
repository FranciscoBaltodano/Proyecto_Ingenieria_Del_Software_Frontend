import { Navigate, Route, Routes } from "react-router-dom"
import { AdicionarAsignaturaPage, CancelarAsignaturaPage, ChatsPage, ClasesPage, Forma03Page, ListadoAsignaturasCanceladasPage, ListadoAsignaturasEnEsperaPage, MatriculaPage, NotasPage, PerfilPage, SolicitudesPage } from "../pages";
import { ClasePage } from "../pages/ClasePage";

export const EstudiantesRoutes = () => {
  return (
    <Routes>
      <Route path="/"      element={<ClasesPage/>} />
      <Route path="clases"      element={<ClasesPage/>} />
      <Route path="clase/:id"      element={<ClasePage/>} />
      <Route path="chats"       element={<ChatsPage/>} />
      <Route path="notas"       element={<NotasPage/>} />
      <Route path="perfil"      element={<PerfilPage/>} />
      <Route path="solicitudes" element={<SolicitudesPage/>} />

      <Route path="matricula" element={<MatriculaPage/>} />
      <Route path="matricula/adicionar" element={<AdicionarAsignaturaPage/>} />
      <Route path="matricula/cancelar" element={<CancelarAsignaturaPage/>} />
      <Route path="matricula/forma03" element={<Forma03Page/>} />
      <Route path="matricula/listaCaceladas" element={<ListadoAsignaturasCanceladasPage/>} />
      <Route path="matricula/listaEspera" element={<ListadoAsignaturasEnEsperaPage/>} />

      <Route path="/*"          element={ <Navigate to='/admisiones/' /> }/>
    </Routes>
  )
};