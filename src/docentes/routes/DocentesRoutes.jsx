import { Route, Routes } from "react-router-dom"
import { CoordinadoresRoutes } from "../coordinadores/routes/CoordinadoresRoutes";

export const DocentesRoutes = () => {
  return (
    <Routes>
      <Route path="coordinador/*"                 element={<CoordinadoresRoutes/>} />

    </Routes>
  )
}
