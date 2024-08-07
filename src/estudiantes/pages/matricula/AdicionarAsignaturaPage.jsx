import React from 'react'
import { EstudianteLayout } from '../../layout/EstudianteLayout'
import { Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Matricula from '../../components/Matricula';
import { ClaseMatriculadas } from '../../components/ClaseMatriculadas';

export const AdicionarAsignaturaPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
      navigate('/estudiantes/matricula');
  };

  return (
    <EstudianteLayout titulo='Adicionar Asignatura'>
      <Button variant="text" color="primary" onClick={handleBack}>
          Regresar
      </Button>

      
      <Matricula/>
      <Divider sx={{my:2}}/>
      <ClaseMatriculadas/>
    </EstudianteLayout>
  )
}





// import React, { useEffect, useState } from 'react';
// import { EstudianteLayout } from '../../layout/EstudianteLayout';
// import { Button, Divider, Typography, Snackbar, Alert } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../../contexts/AuthContext';
// import axios from 'axios';
// import { Box, Grid, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// export const AdicionarAsignaturaPage = () => {
//   const navigate = useNavigate();
//   const handleBack = () => {
//     navigate('/estudiantes/matricula');
//   };


//   const [asignaturasMatriculadas, setAsignaturasMatriculadas] = useState([]);
//   const { user, token } = useAuth();
//   const [departamentos, setDepartamentos] = useState([]);
//   const [asignaturas, setAsignaturas] = useState([]);
//   const [secciones, setSecciones] = useState([]);
//   const [selectedDepartamento, setSelectedDepartamento] = useState('');
//   const [selectedAsignatura, setSelectedAsignatura] = useState('');
//   const [selectedSeccion, setSelectedSeccion] = useState('');
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Default severity

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [departamentosResponse, asignaturasMatriculadasResponse] = await Promise.all([
//           axios.get('/api/matricula/departamentos', { headers: { Authorization: `Bearer ${token}` } }),
//           axios.get(`/api/matricula/estudiantes/${user.id}/asignatura`, { headers: { Authorization: `Bearer ${token}` } }),
//         ]);
//         setDepartamentos(departamentosResponse.data);
//         setAsignaturasMatriculadas(asignaturasMatriculadasResponse.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     if (user && user.id) {
//       fetchData();
//     }
//   }, [user, token]);

//   const fetchAsignaturas = async (id_Departamento) => {
//     try {
//       const response = await axios.get(`/api/matricula/asignaturas/${id_Departamento}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setAsignaturas(response.data);
//     } catch (error) {
//       console.error('Error fetching asignaturas:', error);
//     }
//   };

//   const fetchSecciones = async (codigo) => {
//     try {
//       const response = await axios.get(`/api/matricula/secciones/${codigo}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       const seccionesConDocentes = await Promise.all(response.data.map(async (seccion) => {
//         try {
//           const docenteResponse = await axios.get(`/api/matricula/seccion/${seccion.id_Secciones}`, {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           return { ...seccion, docente: docenteResponse.data };
//         } catch (error) {
//           console.error(`Error fetching docente for seccion ${seccion.id_Secciones}:`, error);
//           return { ...seccion, docente: { nombre: 'No disponible', apellido: '' } };
//         }
//       }));
//       setSecciones(seccionesConDocentes);
//     } catch (error) {
//       console.error('Error fetching secciones:', error);
//     }
//   };

//   const obtenerIdEstudiante = async (id_user) => {
//     try {
//       const response = await axios.get(`/api/matricula/estudiante/${id_user}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       return response.data.id;
//     } catch (error) {
//       console.error('Error fetching student ID:', error);
//       throw error;
//     }
//   };

//   const handleDepartamentoChange = (event) => {
//     const deptoId = event.target.value;
//     setSelectedDepartamento(deptoId);
//     setSelectedAsignatura('');
//     setSelectedSeccion('');
//     setSecciones([]);
//     fetchAsignaturas(deptoId);
//   };

//   const handleAsignaturaChange = (event) => {
//     const asignaturaCodigo = event.target.value;
//     setSelectedAsignatura(asignaturaCodigo);
//     setSelectedSeccion('');
//     fetchSecciones(asignaturaCodigo);
//   };

//   const handleSeccionChange = (event) => {
//     setSelectedSeccion(event.target.value);
//   };

//   const formatSeccionInfo = (seccion) => {
//     const dias = seccion.seccion_dias.map(sd => sd.Dias.Nombre).join(', ');
//     const docenteInfo = seccion.docente ? `${seccion.docente.nombre} ${seccion.docente.apellido}` : 'No asignado';
//     return `Sección ${seccion.id_Secciones} - ${dias} ${seccion.Hora_inicio} - ${seccion.Hora_Final} - Docente: ${docenteInfo} - Cupos: ${seccion.cuposDisponibles}`;
//   };

//   const handleMatricular = async () => {
//     if (!selectedSeccion) {
//       setSnackbarMessage('Por favor, seleccione una sección');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//       return;
//     }

//     try {
//       const id_estudiante = await obtenerIdEstudiante(user.id);

//       const response = await axios.post('/api/matricula/proceder-matricula', {
//         id_estudiante: id_estudiante, // Asume que tienes el ID del estudiante
//         id_seccion: selectedSeccion
//       }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setSnackbarMessage('Matrícula realizada con éxito');
//       setSnackbarSeverity('success');
//       setSnackbarOpen(true);
//     } catch (error) {
//       setSnackbarMessage(error.response?.data?.error || 'Error al matricular');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//     fetchData();
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   return (
//     <EstudianteLayout titulo='Adicionar Asignatura'>
//       <Button variant="text" color="primary" onClick={handleBack}>
//           Regresar
//       </Button>

//       <Paper elevation={3} sx={{ p: 3, maxWidth: 800, margin: 'auto' }}>
//       <Typography variant="h4" gutterBottom>
//         Detalle de Asignaturas
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={4}>
//           <Typography variant="subtitle1">Departamentos</Typography>
//           <Select
//             fullWidth
//             value={selectedDepartamento}
//             onChange={handleDepartamentoChange}
//           >
//             {departamentos.map((depto) => (
//               <MenuItem key={depto.id_Departamento} value={depto.id_Departamento}>
//                 {depto.Nombre}
//               </MenuItem>
//             ))}
//           </Select>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Typography variant="subtitle1">Asignaturas</Typography>
//           <Select
//             fullWidth
//             value={selectedAsignatura}
//             onChange={handleAsignaturaChange}
//             disabled={!selectedDepartamento}
//           >
//             {asignaturas.map((asignatura) => (
//               <MenuItem key={asignatura.codigo} value={asignatura.codigo}>
//                 {asignatura.nombre}
//               </MenuItem>
//             ))}
//           </Select>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Typography variant="subtitle1">Secciones</Typography>
       
//            <Select
//             fullWidth
//             value={selectedSeccion}
//             onChange={handleSeccionChange}
//             disabled={!selectedAsignatura}
//           >
//             {secciones.map((seccion) => (
//               <MenuItem key={seccion.id_Secciones} value={seccion.id_Secciones}>
//                 {formatSeccionInfo(seccion)}
//               </MenuItem>
//             ))}
//           </Select>
//         </Grid>
//       </Grid>
//       <Box mt={2}>
//         <Button variant="contained" color="primary" onClick={handleMatricular}>
//           Matricular Asignatura
//         </Button>
//       </Box>
//       <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={2000}
//           onClose={handleSnackbarClose}
//           anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         >
//           <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
//             {snackbarMessage}
//           </Alert>
//         </Snackbar>
//     </Paper>
//       <Divider sx={{my:2}}/>

//     <TableContainer component={Paper}>
//       <Table>
//       <TableHead>
//           <TableRow>
//               <TableCell sx={{ textAlign: 'center', color: 'white', backgroundColor: '#156590' }}>Asignaturas Matriculadas</TableCell>
//           </TableRow>
//       </TableHead>
//       </Table>
//       <Table>
//       <TableHead>
//         <TableRow>
//           <TableCell sx={{ color: 'white', backgroundColor: '#156590' }}>Cod.</TableCell>
//           <TableCell sx={{ color: 'white', backgroundColor: '#156590' }}>Asignatura</TableCell>
//           <TableCell sx={{ color: 'white', backgroundColor: '#156590' }}>Sección</TableCell>
//           <TableCell sx={{ color: 'white', backgroundColor: '#156590' }}>HI</TableCell>
//           <TableCell sx={{ color: 'white', backgroundColor: '#156590' }}>HF</TableCell>
//           <TableCell sx={{ color: 'white', backgroundColor: '#156590' }}>Días</TableCell>
//           <TableCell sx={{ color: 'white', backgroundColor: '#156590' }}>Edificio</TableCell>
//           <TableCell sx={{ color: 'white', backgroundColor: '#156590' }}>Aula</TableCell>
//           <TableCell sx={{ color: 'white', backgroundColor: '#156590' }}>UV</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {asignaturasMatriculadas.map((asignatura) => (
//           <TableRow key={asignatura.id_matricula}>
//             <TableCell>{asignatura.Secciones.Asignaturas.codigo}</TableCell>
//             <TableCell>{asignatura.Secciones.Asignaturas.nombre}</TableCell>
//             <TableCell>{asignatura.Secciones.Hora_inicio}</TableCell>
//             <TableCell>{asignatura.Secciones.Hora_inicio}</TableCell>
//             <TableCell>{asignatura.Secciones.Hora_Final}</TableCell>
//             <TableCell>{asignatura.Secciones.Dias.map(dia => dia.Dia.Nombre).join(', ')}</TableCell>
//             <TableCell>{asignatura.Secciones.Edificios.Nombre}</TableCell>
//             <TableCell>{asignatura.Secciones.Aula.Nombre}</TableCell>
//             <TableCell>{asignatura.Secciones.Asignaturas.uv}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//       </Table>
//     </TableContainer>
//     </EstudianteLayout>
//   )
// }







