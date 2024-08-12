import { Navigate, Route, Routes } from "react-router-dom"
import { ChatsPage, ClasePage, ClasesPage, NotasPage, PerfilPage } from "../pages";

export const DocentesRoutes = () => {
  return (
    <Routes>
      <Route path="/"      element={<ClasesPage/>} />
      <Route path="clases"      element={<ClasesPage/>} />
      <Route path="clase/:id"      element={<ClasePage/>} />
      <Route path="chats"       element={<ChatsPage/>} />
      <Route path="notas"       element={<NotasPage/>} />
      <Route path="perfil"      element={<PerfilPage/>} />


      <Route path="/*"          element={ <Navigate to='/admisiones/' /> }/>
    </Routes>
  )
}
