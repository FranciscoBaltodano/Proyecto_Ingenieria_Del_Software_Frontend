import { Route, Routes } from "react-router-dom"
import { EstudiantesRoutes } from "../estudiantes/routes/EstudiantesRoutes";
import { LoginRoutes } from "../login/routes/LoginRoutes";
import { AdministradorRoutes } from "../administrador/routes/AdministradorRoutes";
import { IngresoNotasRoutes } from "../ingresoNotas/routes/IngresoNotasRoutes";
import { ProcesoMatriculaRoutes } from "../procesoMatricula/routes/ProcesoMatriculaRoutes";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { AdmisionesRoutes } from "../admisiones/routes/AdmisionesRoutes";
import { CoordinadoresRoutes } from "../docentes/coordinadores/routes/CoordinadoresRoutes";
import { JefeDepartamentoRoutes} from "../docentes/jefeDepartamento/routes/JefeDepartamentoRoutes";
import { DocentesRoutes } from "../docentes/routes/DocentesRoutes";
import { ReinicioClaveRoutes } from "../reinicioClave/routes/ReinicioClaveRoutes";
import { PerfilView } from "../perfiles/components/PerfilView";
import { SolicitudAceptadaPage } from "../perfiles/SolicitudAceptadaPage";


export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/"                  element={<AdmisionesRoutes/>} />
        <Route path="/*"                 element={<AdmisionesRoutes/>} />
        <Route path="login/*"            element={<LoginRoutes/>} />
        <Route path="reinicioClave/*"    element={<ReinicioClaveRoutes/>} />
  
        <Route path="admisiones/*"       element={<AdmisionesRoutes/>} />
        <Route path="notas/*"            element={<IngresoNotasRoutes/>} />
        <Route path="matricula/*"        element={<ProcesoMatriculaRoutes/>} />
        <Route path="estudiantes/*"      element={<EstudiantesRoutes/>} />

        <Route path="perfiles/:id_Usuario"      element={<PerfilView/>} />
        <Route path="solicitudAceptada/"         element={<SolicitudAceptadaPage/>} />
        
        {/* <Route path="docentes/*"         element={<DocentesRoutes/>} /> */}
        {/* <Route path="jefedepartamento/*"    element={<JefeDepartamentoRoutes/>} /> 
        <Route path="coordinadores/*"    element={<CoordinadoresRoutes/>} /> 
        <Route path="administrador/*"    element={<AdministradorRoutes/>} /> */}
       <Route element={<ProtectedRoute allowedRoles={['Estudiante']}/>}>
        <Route path="estudiantes/*" element={<EstudiantesRoutes/>} />
      </Route>
      
      <Route element={<ProtectedRoute allowedRoles={['Docente']}/>}>
        <Route path="docentes/*" element={<DocentesRoutes/>} />
      </Route>
      
      <Route element={<ProtectedRoute allowedRoles={['Docente', 'JefeDepartamento']}/>}>
        <Route path="jefedepartamento/*" element={<JefeDepartamentoRoutes/>} />
      </Route>
      
      <Route element={<ProtectedRoute allowedRoles={['Docente', 'Coordinador']}/>}>
        <Route path="coordinadores/*" element={<CoordinadoresRoutes/>} />
      </Route>
      
      <Route element={<ProtectedRoute allowedRoles={['Administrador']}/>}>
        <Route path="admin/*" element={<AdministradorRoutes/>} />
      </Route> 
        

    </Routes>
  );
};
