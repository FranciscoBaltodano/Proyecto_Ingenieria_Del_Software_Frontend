import React, { useEffect, useState } from 'react'
import { EstudianteLayout } from '../../layout/EstudianteLayout'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
export const ListadoAsignaturasEnEsperaPage = () => {
  const { user, token } = useAuth();
  const [listaEspera, setListaEspera] = useState([]);
  const navigate = useNavigate();
  const handleBack = () => {
      navigate('/estudiantes/matricula');
  };



  useEffect(() => {
    if (user && user.id) {
        fetchAsignaturasListaEspera();
    }
}, [user]);


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
    <EstudianteLayout titulo='Listado de Asignaturas en Espera'>
     <Button variant="text" color="primary" onClick={handleBack}>
          Regresar
      </Button> 


    <TableContainer component={Paper}>
            <Table>
              <TableHead>
                  <TableRow>
                      <TableCell sx={{ textAlign: 'center', color: 'white', backgroundColor: '#3f50b5' }}>Asignaturas en lista de espera</TableCell>
                  </TableRow>
              </TableHead>
              </Table>

              <Table>
              <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'white', backgroundColor: '#3f50b5' }}>Cod.</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#3f50b5' }}>Asignatura</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#3f50b5' }}>Sección</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#3f50b5' }}>HI</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#3f50b5' }}>HF</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#3f50b5' }}>UV</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: '#3f50b5' }}></TableCell>
                  </TableRow>
                </TableHead>
                    <TableBody>
                      {listaEspera.length === 0 && (
                          <TableRow>
                              <TableCell colSpan={6}>No hay asignaturas en lista de espera</TableCell>
                          </TableRow>
                      )}
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



    </EstudianteLayout>
  )
}