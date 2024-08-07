import React from 'react'
import { EstudianteLayout } from '../layout/EstudianteLayout'
import Matricula from '../components/Matricula'
import {ClaseMatriculadas} from '../components/ClaseMatriculadas'
export const ClasesPage = () => {
  return (
    <EstudianteLayout titulo='Clases'>
    <div>ClasesPage</div>
  <h1>prueba</h1>
  <Matricula/>
   <br/>
  <br/>
  <ClaseMatriculadas/>
 
    </EstudianteLayout>

  )
}
// import React from 'react'
// import { EstudianteLayout } from '../../layout/EstudianteLayout'
// import { Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// export const Forma03Page = () => {
//   const navigate = useNavigate();
//   const handleBack = () => {
//       navigate('/estudiantes/matricula');
//   };

//   return (
//     <EstudianteLayout titulo='Forma 03'>
//       <Button variant="text" color="primary" onClick={handleBack}>
//           Regresar
//       </Button> 
      
//       <div>Forma 03</div>
//     </EstudianteLayout>
//   )
// }


// import React from 'react'
// import { EstudianteLayout } from '../../layout/EstudianteLayout'
// import { Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { ClaseMatriculadas } from '../../components/ClaseMatriculadas';

// export const Forma03Page = () => {
//   const navigate = useNavigate();
//   const handleBack = () => {
//       navigate('/estudiantes/matricula');
//   };

//   return (
//     <EstudianteLayout titulo='Forma 03'>
//       <Button variant="text" color="primary" onClick={handleBack}>
//           Regresar
//       </Button> 
      
//       <ClaseMatriculadas/>
//     </EstudianteLayout>
//   )
// }


// import React from 'react'
// import { EstudianteLayout } from '../layout/EstudianteLayout'
// import Matricula from '../components/Matricula'

// export const ClasesPage = () => {
//   return (
//     <EstudianteLayout titulo='Clases'>
//     <div>ClasesPage</div>
//   <h1>prueba</h1>
//     </EstudianteLayout>
//   )
// }
