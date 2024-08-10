import { Navigate, Route, Routes } from "react-router-dom"
import { ReinicioClavePage } from "../pages/ReinicioClavePage";

export const ReinicioClaveRoutes = () => {
  return (
    <Routes>
      <Route path=":token"      element={<ReinicioClavePage/>} />

      


      <Route path="/*"          element={ <Navigate to='/admisiones/' /> }/>
    </Routes>
  )
}
