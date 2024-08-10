import React, { useEffect, useState } from 'react';
import { EstudianteLayout } from '../../layout/EstudianteLayout'
import { useNavigate } from 'react-router-dom';
import Matricula from '../../components/Matricula';
import { ClaseMatriculadas } from '../../components/ClaseMatriculadas';

import axios from 'axios';
import {Button, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useAuth } from '../../../contexts/AuthContext';



export const AdicionarAsignaturaPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
      navigate('/estudiantes/matricula');
  };

  const [asignaturas, setAsignaturas] = useState([]);
  const [listaEspera, setListaEspera] = useState([]);
  const { user, token } = useAuth();

  useEffect(() => {
      if (user && user.id) {
          fetchAsignaturasMatriculadas();
          fetchAsignaturasListaEspera();
      }
  }, [user]);

  const fetchAsignaturasMatriculadas = async () => {
      try {
          const response = await axios.get(`/api/matricula/estudiantes/${user.id}/asignatura`, {
              headers: { Authorization: `Bearer ${token}` }
          });
          setAsignaturas(response.data);
      } catch (error) {
          console.error('Error fetching asignaturas matriculadas:', error);
      }
  };

  const obtenerIdEstudiante = async (id_user) => {
    try {
      const response = await axios.get(`/api/matricula/estudiante/${id_user}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data.id);
      return response.data.id;
      
    } catch (error) {
      console.error('Error fetching student ID:', error);
      throw error;
    }
  };

  const fetchAsignaturasListaEspera = async () => {
    const idEstudiante = await obtenerIdEstudiante(user.id);
      try {
          const response = await axios.get(`/api/matricula/lista-espera/estudiante/${idEstudiante}`, {
              headers: { Authorization: `Bearer ${token}` }
          });
          // console.log(idEstudiante)
          setListaEspera(response.data);
      } catch (error) {
          console.error('Error fetching asignaturas en lista de espera:', error);
      }
  };

  return (
    <EstudianteLayout titulo='Adicionar Asignatura'>
      <Button variant="text" color="primary" onClick={handleBack}>
          Regresar
      </Button>

      
      <Matricula fetchAsignaturasMatriculadas={fetchAsignaturasMatriculadas} fetchAsignaturasEnEspera={fetchAsignaturasListaEspera} />
      <Divider sx={{my:2}}/>
      <div>
            <TableContainer component={Paper}>
               
              <Table>
              <TableHead>
                  <TableRow>
                      <TableCell sx={{ textAlign: 'center', color: 'white', backgroundColor: '#060270' }}>ASIGNATURAS MATRICULADAS</TableCell>
                  </TableRow>
              </TableHead>
              </Table>

              <Table>
              <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'white', backgroundColor: '#060270' }}>Cod.</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#060270' }}>Asignatura</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#060270' }}>Sección</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#060270' }}>HI</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#060270' }}>HF</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#060270' }}>Días</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#060270' }}>Edificio</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#060270' }}>Aula</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#060270' }}>UV</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {asignaturas.map((asignatura) => (
                    <TableRow key={asignatura.id_matricula}>
                      <TableCell>{asignatura.Secciones.Asignaturas.codigo}</TableCell>
                      <TableCell>{asignatura.Secciones.Asignaturas.nombre}</TableCell>
                      <TableCell>{asignatura.Secciones.Hora_inicio}</TableCell>
                      <TableCell>{asignatura.Secciones.Hora_inicio}</TableCell>
                      <TableCell>{asignatura.Secciones.Hora_Final}</TableCell>
                      <TableCell>{asignatura.Secciones.Dias.map(dia => dia.Dia.Nombre).join(', ')}</TableCell>
                      <TableCell>{asignatura.Secciones.Edificios.Nombre}</TableCell>
                      <TableCell>{asignatura.Secciones.Aula.Nombre}</TableCell>
                      <TableCell>{asignatura.Secciones.Asignaturas.uv}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <br />

            <TableContainer component={Paper}>
            <Table>
              <TableHead>
                  <TableRow>
                      <TableCell sx={{ textAlign: 'center', color: 'white', backgroundColor: '#060270' }}>ASIGNATURAS EN LISTA DE ESPERA</TableCell>
                  </TableRow>
              </TableHead>
              </Table>

              <Table>
              <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'white', backgroundColor: '#060270' }}>Cod.</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#060270' }}>Asignatura</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#060270' }}>Sección</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#060270' }}>HI</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#060270' }}>HF</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#060270' }}>UV</TableCell>
                  </TableRow>
                </TableHead>
                    <TableBody>
                        {listaEspera.map((asignatura) => (
                            <TableRow key={asignatura.id}>
                                <TableCell>{asignatura.Secciones.Asignaturas.codigo}</TableCell>
                                <TableCell>{asignatura.Secciones.Asignaturas.nombre}</TableCell>
                                <TableCell>{asignatura.Secciones.Hora_inicio}</TableCell>
                                <TableCell>{asignatura.Secciones.Hora_inicio}</TableCell>
                                <TableCell>{asignatura.Secciones.Hora_Final}</TableCell>
                                <TableCell>{asignatura.Secciones.Asignaturas.uv}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>    </EstudianteLayout>
  )
}








// import React from 'react'
// import { EstudianteLayout } from '../../layout/EstudianteLayout'
// import { Button, Divider } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import Matricula from '../../components/Matricula';
// import { ClaseMatriculadas } from '../../components/ClaseMatriculadas';

// export const AdicionarAsignaturaPage = () => {
//   const navigate = useNavigate();
//   const handleBack = () => {
//       navigate('/estudiantes/matricula');
//   };

//   return (
//     <EstudianteLayout titulo='Adicionar Asignatura'>
//       <Button variant="text" color="primary" onClick={handleBack}>
//           Regresar
//       </Button>

      
//       <Matricula/>
//       <Divider sx={{my:2}}/>
//       <ClaseMatriculadas/>
//     </EstudianteLayout>
//   )
// }
