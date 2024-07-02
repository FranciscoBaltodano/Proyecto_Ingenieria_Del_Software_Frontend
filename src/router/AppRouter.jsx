import { Route, Routes } from "react-router-dom"
import { EstudiantesRoutes } from "../estudiantes/routes/EstudiantesRoutes";
import { LoginRoutes } from "../login/routes/LoginRoutes";
import { AdministradorRoutes } from "../administrador/routes/AdministradorRoutes";
import { IngresoNotasRoutes } from "../ingresoNotas/routes/IngresoNotasRoutes";
import { ProcesoMatriculaRoutes } from "../procesoMatricula/routes/ProcesoMatriculaRoutes";

import { AdmisionesRoutes } from "../admisiones/routes/AdmisionesRoutes";
import { CoordinadoresRoutes } from "../docentes/coordinadores/routes/CoordinadoresRoutes";
import {JefeDepartamentoRoutes} from "../docentes/jefeDepartamento/routes/JefeDepartamentoRoutes";
// import {DocenteRoutes} from "../docentes/docente/routes/DocenteRoutes";
 // Asegúrate de importar correctamente tu componente Formulario
export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/*"                 element={<AdmisionesRoutes/>} />
        <Route path="login/*"            element={<LoginRoutes/>} />
        

        <Route path="admisiones/*"       element={<AdmisionesRoutes/>} />
        <Route path="estudiantes/*"      element={<EstudiantesRoutes/>} />
        <Route path="notas/*"            element={<IngresoNotasRoutes/>} />
        <Route path="matricula/*"        element={<ProcesoMatriculaRoutes/>} />

        
        <Route path="docentes/*"         element={<DocenteRoutes/>} />
        <Route path="jefedepartamento/*"    element={<JefeDepartamentoRoutes/>} /> 
        <Route path="coordinadores/*"    element={<CoordinadoresRoutes/>} /> 
        
    </Routes>
  );
};
