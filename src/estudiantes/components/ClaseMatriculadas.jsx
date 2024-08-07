//src/estudiantes/components/ClaseMatriculadas.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

export const ClaseMatriculadas = () => {
    const [asignaturas, setAsignaturas] = useState([]);
    const { user, token } = useAuth();

    useEffect(() => {
      if (user && user.id) {
        fetchAsignaturasMatriculadas(user.id);
      }
    }, [user]);

    const fetchAsignaturasMatriculadas = async (idEstudiante) => {
      try {
        const response = await axios.get(`/api/matricula/estudiantes/${idEstudiante}/asignatura`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('response', response);
        setAsignaturas(response.data);
      } catch (error) {
        console.error('Error fetching asignaturas matriculadas:', error);
      }
    };

  return (
   
    <TableContainer component={Paper}>
    
            <Table>
            <TableHead>
                <TableRow>
                    <TableCell sx={{ textAlign: 'center', color: 'white', backgroundColor: '#3f50b5' }}>Asignaturas Matriculadas</TableCell>
                </TableRow>
            </TableHead>
            </Table>

            <br />
            
        
      <Table>
      <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'white', backgroundColor: '#3f50b5' }}>Cod.</TableCell>
            <TableCell sx={{ color: 'white', backgroundColor: '#3f50b5' }}>Asignatura</TableCell>
            <TableCell sx={{ color: 'white', backgroundColor: '#3f50b5' }}>Sección</TableCell>
            <TableCell sx={{ color: 'white', backgroundColor: '#3f50b5' }}>HI</TableCell>
            <TableCell sx={{ color: 'white', backgroundColor: '#3f50b5' }}>HF</TableCell>
            <TableCell sx={{ color: 'white', backgroundColor: '#3f50b5' }}>Días</TableCell>
            <TableCell sx={{ color: 'white', backgroundColor: '#3f50b5' }}>Edificio</TableCell>
            <TableCell sx={{ color: 'white', backgroundColor: '#3f50b5' }}>Aula</TableCell>
            <TableCell sx={{ color: 'white', backgroundColor: '#3f50b5' }}>UV</TableCell>
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
  );
};
