import React, { useState, useEffect } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Typography, InputAdornment, TextField, Snackbar, Alert, Divider
} from '@mui/material';
import { DocenteLayout } from '../../docentes/layout/DocenteLayout';
import { useAuth } from '../../contexts/AuthContext';
import { esESLocaleText } from '../../components/esESLocaleText';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

export const NotasPage = () => {
  const { user } = useAuth();
  const [secciones, setSecciones] = useState([]);
  const [openEstudiantesModal, setOpenEstudiantesModal] = useState(false);
  const [openNotasModal, setOpenNotasModal] = useState(false);
  const [openModificarNotaModal, setOpenModificarNotaModal] = useState(false);
  const [estudiantesSecciones, setEstudiantesSecciones] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeccionName, setSelectedSeccionName] = useState('');
  const [selectedSeccionId, setSelectedSeccionId] = useState('');
  const [notas, setNotas] = useState([]);
  const [procesoNotas, setProcesoNotas] = useState([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [selectedProcesoId, setSelectedProcesoId] = useState(null);
  const [selectedEstudianteIndex, setSelectedEstudianteIndex] = useState(null);
  const [notaModificada, setNotaModificada] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const fetchSecciones = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/teacher/secciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ docente: user.numeroEmpleado }),
      });

      if (!response.ok) {
        throw new Error('Error al obtener las secciones del docente');
      }

      const data = await response.json();
      setSecciones(data.data);
    } catch (error) {
      console.error('Error:', error.message);
      setSnackbarMessage(error.message || 'Error al obtener las secciones');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const checkProcesoNotas = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/teacher/procesoNota');
      if (!response.ok) {
        throw new Error('Error al obtener los procesos de notas');
      }
      const data = await response.json();
      const today = new Date().toISOString().split('T')[0];

      const procesoActivo = data.data.find(proceso =>
        proceso.fecha_inicio <= today && proceso.fecha_final >= today
      );

      if (procesoActivo) {
        setIsButtonEnabled(true);
        setSnackbarMessage(`El proceso está activo, termina el ${procesoActivo.fecha_final}.`);
        setSnackbarSeverity('success');
      } else {
        setIsButtonEnabled(false);
        setSnackbarMessage('No hay un proceso activo en este momento.');
        setSnackbarSeverity('warning');
      }
      setOpenSnackbar(true);
      setProcesoNotas(data.data);
    } catch (error) {
      console.error('Error:', error.message);
      setSnackbarMessage('Error al obtener los procesos de notas.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    fetchSecciones();
    checkProcesoNotas();
  }, [user.numeroEmpleado]);

  const fetchEstudiantes = async (idSeccion) => {
    try {
      const response = await fetch(`http://localhost:3000/api/teacher/studentNota/${idSeccion}`);
      if (!response.ok) {
        throw new Error('Error al obtener los estudiantes de la sección');
      }
      const data = await response.json();
      setEstudiantesSecciones(data.estudiantes);
      setSelectedSeccionId(data.id_Seccion); // Asegúrate de guardar el id_Seccion
      setNotas(data.estudiantes.map(() => ({ nota: '', obs: '' })));
    } catch (error) {
      console.error('Error:', error.message);
      setSnackbarMessage(error.message || 'Error al obtener los estudiantes');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };
  
  

  const handleVerEstudiantes = (idSeccion, nombreSeccion) => {
    setSelectedSeccionName(nombreSeccion);
    fetchEstudiantes(idSeccion);
    setOpenEstudiantesModal(true);
    setSelectedSeccionId(idSeccion);
  };

  const handleCloseEstudiantesModal = () => {
    setOpenEstudiantesModal(false);
    setEstudiantesSecciones([]);
    setSelectedSeccionName('');
    setSelectedSeccionId('');
  };

  const handleAbrirNotas = (idSeccion, nombreSeccion, procesoId) => {
    setSelectedSeccionName(nombreSeccion);
    setSelectedSeccionId(idSeccion);
    setSelectedProcesoId(procesoId);
    fetchEstudiantes(idSeccion);
    setOpenNotasModal(true);
  };

  const handleCloseNotasModal = () => {
    setOpenNotasModal(false);
    setEstudiantesSecciones([]);
    setSelectedSeccionName('');
    setSelectedSeccionId('');
  };

  const handleNotaChange = (index, field, value) => {
    const newNotas = [...notas];
    newNotas[index][field] = value;
    setNotas(newNotas);
    
  };

  const handleModificarNota = (index) => {
    setSelectedEstudianteIndex(index);
    setNotaModificada(estudiantesSecciones[index].nota || '');
    setOpenModificarNotaModal(true);
  };
  
  
  const handleGuardarNotas = async () => {
    try {
      const notasPayload = estudiantesSecciones.map((estudiante, index) => ({
        id_Secciones: selectedSeccionId,
        id_Docentes: user.numeroEmpleado,
        id_Estudiante: estudiante.estudiante[0].numeroCuenta,
        nota: parseInt(notas[index].nota, 10),
        proceso: procesoNotas[0].id_ProcesoNotas,
        detail: '',
      }));

      const response = await fetch('http://localhost:3000/api/teacher/notas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notasPayload),
      });

      if (!response.ok) {
        throw new Error('Error al guardar las notas');
      }

      const data = await response.json();
      const message = data.message || 'Notas procesadas';
      const results = data.results || [];
      if (results.length > 0) {
        setSnackbarMessage(results[0].message || message);
      } else {
        setSnackbarMessage(message);
      }
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      handleCloseNotasModal();
    } catch (error) {
      console.error('Error:', error.message);
      setSnackbarMessage(error.message || 'Error al guardar las notas');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

 

  const handleGuardarCambios = async () => {
    try {
       const estudiante = estudiantesSecciones[selectedEstudianteIndex];
       const seccion = selectedSeccionId;
        const updatedNota = {
          id_Secciones: seccion, // Usar el ID de la sección
          id_Docentes: user.numeroEmpleado,
          id_Estudiante: estudiante.estudiante[0].numeroCuenta,
          nota: parseInt(notaModificada, 10),
          proceso: procesoNotas[0].id_ProcesoNotas,
          detail: '',
        };
  
      console.log('Datos de la nota actualizada:', updatedNota);
  
      const response = await fetch('http://localhost:3000/api/teacher/notas', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNota),
      });
  
      if (!response.ok) {
        throw new Error('Error al modificar la nota');
      }
  
      const data = await response.json();
      const message = data.message || 'Nota modificada';
      setSnackbarMessage(message);
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setOpenModificarNotaModal(false);
      fetchEstudiantes(selectedSeccionId); // Refrescar los estudiantes con el ID de la sección actual
    } catch (error) {
      console.error('Error:', error.message);
      setSnackbarMessage(error.message || 'Error al modificar la nota');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };
  
  
  const normalizeText = (text) => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  const columns = [
    { field: 'codigoAsignatura', headerName: 'Código', width: 100 },
    { field: 'nombreAsignatura', headerName: 'Asignatura', width: 200 },
    { field: 'Hora_inicio', headerName: 'Hora Inicio', width: 100 },
    { field: 'Hora_Final', headerName: 'Hora Final', width: 100 },
    { field: 'uv', headerName: 'UV', width: 100 },
    { field: 'nombreEdificio', headerName: 'Edificio', width: 100 },
    { field: 'nombreAula', headerName: 'Aula', width: 100 },
    { field: 'dias', headerName: 'Días', width: 200 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 350,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleVerEstudiantes(params.row.id_Secciones, params.row.nombreAsignatura)}
            endIcon={<VisibilityIcon />}
          >
            Ver Notas
          </Button>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => handleAbrirNotas(params.row.id_Secciones, params.row.nombreAsignatura, selectedProcesoId)}
            style={{ marginLeft: 10 }}
            disabled={!isButtonEnabled}
            endIcon={<AddIcon />}
          >
            Añadir Notas
          </Button>
        </>
      ),
    },
  ];

  const filteredSecciones = secciones.filter(seccion =>
    normalizeText(seccion.Asignaturas.nombre)?.toLowerCase().includes(normalizeText(searchTerm.toLowerCase()))
  );

  const seccionesRows = filteredSecciones.map((seccion) => ({
    id: seccion.id_Secciones,
    id_Secciones: seccion.id_Secciones,
    nombreAsignatura: seccion.Asignaturas.nombre,
    Hora_inicio: seccion.Hora_inicio,
    Hora_Final: seccion.Hora_Final,
    Cupos: seccion.Cupos,
    codigoAsignatura: seccion.Asignaturas.codigo,
    uv: seccion.Asignaturas.uv,
    nombreEdificio: seccion.Edificios.Nombre,
    nombreAula: seccion.Aula.Nombre,
    dias: seccion.Dias.map(dia => dia.Dia.Nombre).join(', ')
  }));


  const columnasEstudiantes = [
    { field: 'Nombre', headerName: 'Nombre', width: 150 },
    { field: 'Apellido', headerName: 'Apellido', width: 150 },
    { field: 'numeroCuenta', headerName: 'Número de Cuenta', width: 150 },
    { field: 'nota', headerName: 'Nota', width: 120 },
    { field: 'obs', headerName: 'Observación', width: 120 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 210,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => handleModificarNota(params.row.id)} 
            style={{ marginLeft: 10 }}
            disabled={!isButtonEnabled}
            endIcon={<EditIcon />}
          >
            Modificar Nota
          </Button>
        </>
      ),
    },
  ]
  
//console.log('que hace este chiste',selectedSeccionId)
//console.log('tuopa',estudiantesSecciones)
  return (
    <DocenteLayout titulo='Secciones'>
      <Typography variant="h6">
        Ingreso de notas por el docente.
      </Typography>

      <br />

      <TextField
        label="Buscar Sección"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 20, width: '33%' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={seccionesRows}
          columns={columns}
          pageSize={5}
          checkboxSelection={false}
          localeText={esESLocaleText}
        />
      </div>

      <Dialog open={openEstudiantesModal} fullWidth maxWidth="md">
  <DialogTitle>
    {`Estudiantes de la Sección: ${selectedSeccionName} `}
  </DialogTitle>
  <DialogContent>
    {estudiantesSecciones.length > 0 ? (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={estudiantesSecciones.map((estudiante, index) => ({
            id: index,
            Nombre: estudiante.Nombre,
            Apellido: estudiante.Apellido,
            numeroCuenta: estudiante.estudiante[0]?.numeroCuenta || 'N/A',
            nota: estudiante.nota || 'No asignada',
            obs: estudiante.obs || 'No disponible',
            
          }))}
          columns={columnasEstudiantes}
          pageSize={5}
          checkboxSelection={false}
          localeText={esESLocaleText}
        />
      </div>
      
    ) : (
      <Typography>No se encontraron estudiantes para la sección seleccionada.</Typography>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseEstudiantesModal} color="primary">
      Cerrar
    </Button>
  </DialogActions>
</Dialog>

      <Dialog open={openNotasModal} fullWidth maxWidth="md">
        <DialogTitle>
          {`Añadir Notas - Sección: ${selectedSeccionName}`}
        </DialogTitle>
        <DialogContent>
          {estudiantesSecciones.length > 0 ? (
            estudiantesSecciones.map((estudiante, index) => (
              <div key={index} style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', flexWrap: 'nowrap' }}>
                  <Typography variant="subtitle1" style={{ width: '100%' }}>
                    {`${estudiante.Nombre} ${estudiante.Apellido} (${estudiante.estudiante[0]?.numeroCuenta || 'N/A'})`}
                  </Typography>
                  <TextField
                    label="Nota"
                    variant="outlined"
                    value={notas[index]?.nota || ''}
                    onChange={(e) => handleNotaChange(index, 'nota', e.target.value)}
                    style={{ marginTop: '5px', width: 300 }}
                  />
                </div>
                <Divider style={{ marginTop: 10, marginBottom: 10 }} />
              </div>
            ))
          ) : (
            <Typography>No se encontraron estudiantes para la sección seleccionada.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGuardarNotas} color="primary">
            Guardar Notas
          </Button>
          <Button onClick={handleCloseNotasModal} color="inherit">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openModificarNotaModal} fullWidth maxWidth="sm">
  <DialogTitle>
    {`Modificar Nota | ${estudiantesSecciones[selectedEstudianteIndex]?.Nombre || ''} ${estudiantesSecciones[selectedEstudianteIndex]?.Apellido || ''} | Nota Actual: ${estudiantesSecciones[selectedEstudianteIndex]?.nota || 'No asignada'}`}
  </DialogTitle>
  <DialogContent>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="subtitle1" style={{ flexGrow: 1 }}>
        Ingrese la nota del estudiante:
      </Typography>
      <TextField
        label="Nota"
        variant="outlined"
        value={notaModificada}
        onChange={(e) => setNotaModificada(e.target.value)}
        style={{ marginTop:'5px', marginLeft: 'auto', width: '33%' }}
      />
    </div>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleGuardarCambios} color="primary">
      Guardar Cambios
    </Button>
    <Button onClick={() => setOpenModificarNotaModal(false)} color="inherit">
      Cancelar
    </Button>
  </DialogActions>
</Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} variant="filled" severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </DocenteLayout>
  );
};
