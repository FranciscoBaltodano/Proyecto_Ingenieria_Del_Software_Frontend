import React, { useEffect, useState } from 'react';
import { EstudianteLayout } from '../../layout/EstudianteLayout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert
} from '@mui/material';
import { useAuth } from '../../../contexts/AuthContext';

export const CancelarAsignaturaPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/estudiantes/matricula');
  };

  const [asignaturas, setAsignaturas] = useState([]);
  const { user, token } = useAuth();
  const [listaEspera, setListaEspera] = useState([]);
  const [estaEnEspera, setEstaEnEspera] = useState(false);

  // Estado para el modal
  const [open, setOpen] = useState(false);
  const [selectedAsignatura, setSelectedAsignatura] = useState(null);

  // Estado para el Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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

  // Manejo del modal
  const handleClickOpen = (asignatura, booleano) => {
    setEstaEnEspera(booleano);
    console.log('La clase seleccionada esta en lista de espera? ',booleano);
    setSelectedAsignatura(asignatura);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAsignatura(null);
  };

  const cancelarAsignatura = async () => {
    if (selectedAsignatura) {
      try {

        await axios.post(`/api/matricula/cancelar`, {
          // headers: { Authorization: `Bearer ${token}` },
          // body: {
            id_estudiante: selectedAsignatura.id_estudiante,
            id_seccion: selectedAsignatura.id_seccion
          // },
        });
        // Refresca la lista de asignaturas
        fetchAsignaturasMatriculadas(user.id);

        // Mostrar Snackbar de éxito
        setSnackbarMessage('Asignatura cancelada con éxito.');
        setSnackbarSeverity('success');
      } catch (error) {
        console.error('Error cancelando asignatura:', error);

        // Mostrar Snackbar de error
        setSnackbarMessage('Error al cancelar la asignatura.');
        setSnackbarSeverity('error');
      }
      handleClose();
      setSnackbarOpen(true);
    }
  };

  const cancelarAsignaturaEnEspera = async () => {
    if (selectedAsignatura) {
      const idEstudiante = await obtenerIdEstudiante(user.id);

      try {
        await axios.post(`/api/matricula/lista-espera/cancelar`, {
          // headers: { Authorization: `Bearer ${token}` },
          // body: {
            id_estudiante: idEstudiante,
            id_seccion: selectedAsignatura.id_seccion
          // }
        });
        // Refresca la lista de asignaturas
        fetchAsignaturasListaEspera();

        // Mostrar Snackbar de éxito
        setSnackbarMessage('Asignatura cancelada con éxito.');

        setSnackbarSeverity('success');
      } catch (error) {
        console.error('Error cancelando asignatura:', error);

        // Mostrar Snackbar de error
        setSnackbarMessage('Error al cancelar la asignatura.');
        setSnackbarSeverity('error');

      }
      handleClose();
      setSnackbarOpen(true);
    }
  };

  // Manejo del Snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <EstudianteLayout titulo='Cancelar Asignatura'>
      <Button variant="text" color="primary" onClick={handleBack}>
        Regresar
      </Button> 
      
      <br /><br />
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
              <TableCell sx={{ color: 'white', backgroundColor: '#060270' }}></TableCell>
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
                <TableCell>
                  <Button variant="contained" color="error" onClick={() => handleClickOpen(asignatura, false)}>
                    Cancelar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br /><br />
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
                    <TableCell sx={{ color: 'white', backgroundColor: '#060270' }}></TableCell>
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
                                <TableCell>
                                  <Button variant="contained" color="error" onClick={() => handleClickOpen(asignatura, true)}>
                                    Cancelar
                                  </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

      {/* Modal de confirmación */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmar Cancelación</DialogTitle>
        <DialogContent>
          {selectedAsignatura && (
            <div>
              ¿Está seguro de que desea cancelar la asignatura 
              <strong> {selectedAsignatura.Secciones.Asignaturas.codigo} {selectedAsignatura.Secciones.Asignaturas.nombre}</strong>?
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button variant='contained' onClick={ estaEnEspera ? cancelarAsignaturaEnEspera : cancelarAsignatura} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para mensajes de éxito o error */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </EstudianteLayout>
  );
};
