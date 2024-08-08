import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

export const ClaseMatriculadas = () => {
    const [asignaturas, setAsignaturas] = useState([]);
    const [listaEspera, setListaEspera] = useState([]);
    const { user, token } = useAuth();

    useEffect(() => {
        if (user && user.id) {
            fetchAsignaturasMatriculadas(user.id);
            fetchAsignaturasListaEspera();
        }
    }, [user]);

    const fetchAsignaturasMatriculadas = async (idEstudiante) => {
        try {
            const response = await axios.get(`/api/matricula/estudiantes/${idEstudiante}/asignatura`, {
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
        <div>
            <TableContainer component={Paper}>
               
              <Table>
              <TableHead>
                  <TableRow>
                      <TableCell sx={{ textAlign: 'center', color: 'white', backgroundColor: '#060270' }}>Asignaturas Matriculadas</TableCell>
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
                      <TableCell sx={{ textAlign: 'center', color: 'white', backgroundColor: '#060270' }}>Asignaturas en lista de espera</TableCell>
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
        </div>
    );
};
