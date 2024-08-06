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

  // Manejo del modal
  const handleClickOpen = (asignatura) => {
    setSelectedAsignatura(asignatura);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAsignatura(null);
  };

  const handleConfirm = async () => {
    if (selectedAsignatura) {
      try {
        await axios.delete(`/api/matricula/cancelar/${selectedAsignatura.id_matricula}`, {
          headers: { Authorization: `Bearer ${token}` }
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

  // Manejo del Snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <EstudianteLayout titulo='Cancelar Asignatura'>
      <Button variant="text" color="primary" onClick={handleBack}>
        Regresar
      </Button> 
      
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
              <TableCell></TableCell>
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
                  <Button variant="contained" color="error" onClick={() => handleClickOpen(asignatura)}>
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
          <Button variant='contained' onClick={handleConfirm} color="primary">
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
