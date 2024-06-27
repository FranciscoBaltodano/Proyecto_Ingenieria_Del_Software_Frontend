import { Route, Routes } from "react-router-dom"
import { EstudiantesRoutes } from "../estudiantes/routes/EstudiantesRoutes";
import { LoginRoutes } from "../login/routes/LoginRoutes";
import { AdministradorRoutes } from "../administrador/routes/AdministradorRoutes";
import { AdmisionesRoutes } from "../admisiones/routes/AdmisionesRoutes";
import { IngresoNotasRoutes } from "../ingresoNotas/routes/IngresoNotasRoutes";
import { ProcesoMatriculaRoutes } from "../procesoMatricula/routes/ProcesoMatriculaRoutes";
import { DocentesRoutes } from "../docentes/routes/DocentesRoutes";

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/"                 element={<EstudiantesRoutes/>} />
        <Route path="login/"            element={<LoginRoutes/>} />

        <Route path="admin/"            element={<AdministradorRoutes/>} />
        <Route path="admisiones/"       element={<AdmisionesRoutes/>} />
        <Route path="estudiantes/"      element={<EstudiantesRoutes/>} />
        <Route path="notas/"            element={<IngresoNotasRoutes/>} />
        <Route path="matricula/"        element={<ProcesoMatriculaRoutes/>} />

        <Route path="docentes/"         element={<DocentesRoutes/>} />
        {/* <Route path="jefeDepartamento/" component={</>} /> */}
        {/* <Route path="coordinadores/"    component={</>} /> */}
        {/* <Route path="/"                 component={NotFound} /> */}
    </Routes>
  );
};
