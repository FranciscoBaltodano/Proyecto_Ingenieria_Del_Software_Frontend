import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Select, 
  MenuItem, 
  Button, 
  Paper, 
  Snackbar,
  Alert,
  LinearProgress
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const Matricula = ({ fetchAsignaturasMatriculadas, fetchAsignaturasEnEspera }) => {
  const [departamentos, setDepartamentos] = useState([]);
  const [asignaturas, setAsignaturas] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState('');
  const [selectedAsignatura, setSelectedAsignatura] = useState('');
  const [selectedSeccion, setSelectedSeccion] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Añadido para el severity
  const [loading, setLoading] = useState(false); // Añadido para el estado de carga

  const { user, token } = useAuth();

  useEffect(() => {
    fetchDepartamentos();
  }, []);

  const fetchDepartamentos = async () => {
    try {
      const response = await axios.get('/api/matricula/departamentos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDepartamentos(response.data);
    } catch (error) {
      console.error('Error fetching departamentos:', error);
    }
  };

  const fetchAsignaturas = async (id_Departamento) => {
    try {
      const response = await axios.get(`/api/matricula/asignaturas/${id_Departamento}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAsignaturas(response.data);
    } catch (error) {
      console.error('Error fetching asignaturas:', error);
    }
  };

  const fetchSecciones = async (codigo) => {
    try {
      const response = await axios.get(`/api/matricula/secciones/${codigo}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const seccionesConDocentes = await Promise.all(response.data.map(async (seccion) => {
        try {
          const docenteResponse = await axios.get(`/api/matricula/seccion/${seccion.id_Secciones}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          return { ...seccion, docente: docenteResponse.data };
        } catch (error) {
          console.error(`Error fetching docente for seccion ${seccion.id_Secciones}:`, error);
          return { ...seccion, docente: { nombre: 'No disponible', apellido: '' } };
        }
      }));
      setSecciones(seccionesConDocentes);
    } catch (error) {
      console.error('Error fetching secciones:', error);
    }
  };

  const obtenerIdEstudiante = async (id_user) => {
    try {
      const response = await axios.get(`/api/matricula/estudiante/${id_user}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.id;
    } catch (error) {
      console.error('Error fetching student ID:', error);
      throw error;
    }
  };

  const handleDepartamentoChange = (event) => {
    const deptoId = event.target.value;
    setSelectedDepartamento(deptoId);
    setSelectedAsignatura('');
    setSelectedSeccion('');
    setSecciones([]);
    fetchAsignaturas(deptoId);
  };

  const handleAsignaturaChange = (event) => {
    const asignaturaCodigo = event.target.value;
    setSelectedAsignatura(asignaturaCodigo);
    setSelectedSeccion('');
    fetchSecciones(asignaturaCodigo);
  };

  const handleSeccionChange = (event) => {
    setSelectedSeccion(event.target.value);
  };

  const formatSeccionInfo = (seccion) => {
    const dias = seccion.seccion_dias.map(sd => sd.Dias.Nombre).join(', ');
    const docenteInfo = seccion.docente ? `${seccion.docente.nombre} ${seccion.docente.apellido}` : 'No asignado';
    return `Sección ${seccion.id_Secciones} - ${dias} ${seccion.Hora_inicio} - ${seccion.Hora_Final} - Docente: ${docenteInfo} - Cupos: ${seccion.cuposDisponibles}`;
  };

  const handleMatricular = async () => {
    if (!selectedSeccion) {
      setSnackbarMessage('Por favor, seleccione una sección');
      setSnackbarSeverity('error'); // Asegúrate de usar "error" para mensajes de error
      setSnackbarOpen(true);
      return;
    }

    setLoading(true); // Mostrar la barra de progreso

    try {
      const id_estudiante = await obtenerIdEstudiante(user.id);

      const response = await axios.post('/api/matricula/proceder-matricula', {
        id_estudiante: id_estudiante,
        id_seccion: selectedSeccion
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAsignaturasMatriculadas();
      fetchAsignaturasEnEspera();
      setSnackbarMessage('Matrícula realizada con éxito');
      setSnackbarSeverity('success'); // Asegúrate de usar "success" para mensajes de éxito
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage(error.response?.data?.error || 'Error al matricular');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false); // Ocultar la barra de progreso
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Detalle de Asignaturas
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1">Departamentos</Typography>
          <Select
            fullWidth
            value={selectedDepartamento}
            onChange={handleDepartamentoChange}
          >
            {departamentos.map((depto) => (
              <MenuItem key={depto.id_Departamento} value={depto.id_Departamento}>
                {depto.Nombre}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1">Asignaturas</Typography>
          <Select
            fullWidth
            value={selectedAsignatura}
            onChange={handleAsignaturaChange}
            disabled={!selectedDepartamento}
          >
            {asignaturas.map((asignatura) => (
              <MenuItem key={asignatura.codigo} value={asignatura.codigo}>
                {asignatura.nombre}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1">Secciones</Typography>
          <Select
            fullWidth
            value={selectedSeccion}
            onChange={handleSeccionChange}
            disabled={!selectedAsignatura}
          >
            {secciones.map((seccion) => (
              <MenuItem key={seccion.id_Secciones} value={seccion.id_Secciones}>
                {formatSeccionInfo(seccion)}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Button disabled={loading} variant="contained" color="primary" onClick={handleMatricular}>
          Matricular Asignatura
        </Button>
      </Box>
      {loading && <LinearProgress sx={{ mt: 2 }} />} {/* Mostrar barra de progreso */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Posición del Snackbar
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default Matricula;
