import { Route, Routes } from "react-router-dom"
import { CoordinadoresRoutes } from "../coordinadores/routes/CoordinadoresRoutes";
import { Dashboard } from "../pages/Dashboard";

export const DocentesRoutes = () => {
  return (
    <Routes>
      {/* <Route path="coordinador/*"  element={<CoordinadoresRoutes/>} /> */}
      <Route path="/"  element={<Dashboard/>} />

    </Routes>
  )
}
