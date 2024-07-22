import { Button } from '@mui/material';
import { DocenteLayout } from '../../../layout/DocenteLayout'
import { json, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';

export const ConfigurarSeccionesPage = () => {

    const navigate = useNavigate();
    const { user, logout } = useAuth();


    // Navega a la pantalla anterior
   const handleBack = () => {
    navigate('/jefeDepartamento/matricula');
  };

  return (
    <DocenteLayout titulo='Configurar Secciones'>
        <Button variant="outlined" color="primary" onClick={handleBack}>
            Regresar
        </Button>
        
      <h1>Bienvenido, {user?.nombre} {user?.apellido}</h1>
      <p>Roles: {user?.roles.join(', ')}</p>
      <p>{JSON.stringify(user)}</p>
      <button onClick={logout}>Cerrar Sesión</button>
    </DocenteLayout>
  )
}



// import React from 'react';
// import { useAuth } from '../../contexts/AuthContext';

// const SomeComponent = () => {
//   const { user, logout } = useAuth();

//   return (
//     <div>
//       <h1>Bienvenido, {user?.nombre} {user?.apellido}</h1>
//       <p>Roles: {user?.roles.join(', ')}</p>
//       <button onClick={logout}>Cerrar Sesión</button>
//     </div>
//   );
// };

// export default SomeComponent;
