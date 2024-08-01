import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const ClaseMatriculadas = () => {
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
            <TableCell>Cod.</TableCell>
            <TableCell>Asignatura</TableCell>
            <TableCell>Sección</TableCell>
            <TableCell>HI</TableCell>
            <TableCell>HF</TableCell>
            <TableCell>Días</TableCell>
            <TableCell>Edificio</TableCell>
            <TableCell>Aula</TableCell>
            <TableCell>UV</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {asignaturas.map((asignatura) => (
            <TableRow key={asignatura.id_matricula}>
              <TableCell>{asignatura.Secciones.Asignaturas.codigo}</TableCell>
              <TableCell>{asignatura.Secciones.Asignaturas.nombre}</TableCell>
              <TableCell>{asignatura.Secciones.id_Secciones}</TableCell>
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

export default ClaseMatriculadas;
