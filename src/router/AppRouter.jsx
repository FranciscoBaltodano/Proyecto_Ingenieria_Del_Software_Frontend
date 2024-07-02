import { Route, Routes } from "react-router-dom"
import { EstudiantesRoutes } from "../estudiantes/routes/EstudiantesRoutes";
import { LoginRoutes } from "../login/routes/LoginRoutes";
import { AdministradorRoutes } from "../administrador/routes/AdministradorRoutes";
import { IngresoNotasRoutes } from "../ingresoNotas/routes/IngresoNotasRoutes";
import { ProcesoMatriculaRoutes } from "../procesoMatricula/routes/ProcesoMatriculaRoutes";

import { AdmisionesRoutes } from "../admisiones/routes/AdmisionesRoutes";
import { CoordinadoresRoutes } from "../docentes/coordinadores/routes/CoordinadoresRoutes";
import {JefeDepartamentoRoutes} from "../docentes/jefeDepartamento/routes/JefeDepartamentoRoutes";

import {DocenteRoutes} from "../docentes/docente/routes/DocenteRoutes";
import {ProtectedRoute} from "../components/ProtectedRoute";

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/*"                 element={<AdmisionesRoutes/>} />
        <Route path="login/*"            element={<LoginRoutes/>} />
               
        <Route path="admisiones/*"       element={<AdmisionesRoutes/>} />
        <Route path="estudiantes/*"      element={<EstudiantesRoutes/>} />
        <Route path="notas/*"            element={<IngresoNotasRoutes/>} />
        <Route path="matricula/*"        element={<ProcesoMatriculaRoutes/>} />

        
        
         <Route element= {<ProtectedRoute allowedRoles={['docente']}/>}>
          <Route path="docentes/*"         element={<DocenteRoutes/>} />
         </Route>
        <Route element = {<ProtectedRoute allowedRoles={['docente, jefedepartamento']}/>}>
          <Route path="jefedepartamento/*"    element={<JefeDepartamentoRoutes/>} />
        </Route>
        <Route element= {<ProtectedRoute allowedRoles={['docente', 'coordinador']}/>}>
          <Route path="coordinadores/*"    element={<CoordinadoresRoutes/>} />
        </Route>
        <Route element = {<ProtectedRoute allowedRoles = {['administrador']}/>}>
          <Route path="admin/*"            element={<AdministradorRoutes/>} />
        </Route> 
        

    </Routes>
  );
};
