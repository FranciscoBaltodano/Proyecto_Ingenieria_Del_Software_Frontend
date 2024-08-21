import React, { useState, useEffect } from 'react';
import { EstudianteLayout } from '../layout/EstudianteLayout';
import { useAuth } from '../../contexts/AuthContext';
import { Grid, Button, Modal, Box, TextField, IconButton, Snackbar, Alert, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';
import { SaveCertificadoVOAE } from '../components/SaveCertificadoVOAE';

export const NotasPage = () => {
  const { user } = useAuth();
  const [secciones, setSecciones] = useState([]);
  const [notas, setNotas] = useState([]);
  const [selectedSeccion, setSelectedSeccion] = useState(null);
  const [openEncuesta, setOpenEncuesta] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [encuesta, setEncuesta] = useState({
    pregunta1: '',
    pregunta2: '',
    pregunta3: '',
    pregunta4: '',
    pregunta5: '',
  });

  useEffect(() => {
    const fetchSecciones = async () => {
      try {
        const response = await fetch(`/api/student/secciones/${user.numeroCuenta}`);
        if (!response.ok) throw new Error('Error en la respuesta de la API');
        const data = await response.json();
        setSecciones(data);
      } catch (error) {
        console.error('Error al obtener las secciones:', error);
        handleSnackbarOpen('Error al obtener las secciones', 'error');
      }
    };

    fetchSecciones();
  }, [user]);

  const handleVerNota = async (seccionId) => {
    try {
      const response = await fetch(`/api/student/notas/${seccionId}/${user.numeroCuenta}`);
      if (!response.ok) throw new Error('Error en la respuesta de la API');
      const data = await response.json();

      if (Array.isArray(data)) {
        setNotas(data);
        setSelectedSeccion(seccionId);
      } else {
        console.error('La respuesta no es un array:', data);
        setSelectedSeccion(seccionId);
        setOpenEncuesta(true);
      }
    } catch (error) {
      console.error('Error al obtener las notas:', error);
      handleSnackbarOpen('Error al obtener las notas', 'error');
    }
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 1 && Number(value) <= 5)) {
      setEncuesta({ ...encuesta, [field]: value });
    } else {
      handleSnackbarOpen('Por favor ingresa un valor entre 1 y 5.', 'warning');
    }
  };

  const handleSubmitEncuesta = async () => {
    // Convertir los valores de las preguntas a enteros
    const encuestaData = {
      id_Seccion: selectedSeccion,
      id_Estudiante: user.numeroCuenta,
      pregunta1: parseInt(encuesta.pregunta1, 10),
      pregunta2: parseInt(encuesta.pregunta2, 10),
      pregunta3: parseInt(encuesta.pregunta3, 10),
      pregunta4: parseInt(encuesta.pregunta4, 10),
      pregunta5: parseInt(encuesta.pregunta5, 10),
    };
    
    // Mostrar los datos de la encuesta en la consola
    console.log('Datos de la encuesta a enviar:', encuestaData);

    try {
      const response = await fetch('/api/student/encuesta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(encuestaData),
      });

      if (response.ok) {
        handleSnackbarOpen('Encuesta enviada exitosamente', 'success');
        setOpenEncuesta(false);
        handleVerNota(selectedSeccion);
      } else {
        const data = await response.json();
        handleSnackbarOpen(data.message || 'Error al enviar la encuesta', 'error');
      }
    } catch (error) {
      console.error('Error al enviar la encuesta:', error);
      handleSnackbarOpen('Error al enviar la encuesta', 'error');
    }
  };

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const columnasSecciones = [
    { field: 'codigoAsignatura', headerName: 'Código Asignatura', width: 150 },
    { field: 'nombreAsignatura', headerName: 'Nombre Asignatura', width: 200 },
    { field: 'Hora_inicio', headerName: 'Sección', width: 120 },
    { field: 'nombreDocente', headerName: 'Nombre Docente', width: 200 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleVerNota(params.row.id_Secciones)}
        >
          Encuesta
        </Button>
      ),
    },
  ];

  return (
    <EstudianteLayout titulo='Notas'>
      <Grid container justifyContent='center' spacing={2}>
        <SaveCertificadoVOAE numeroCuenta={user.numeroCuenta} />
      </Grid>
      <br />
      <br />
      <Grid container justifyContent='center' spacing={2}>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={secciones}
            columns={columnasSecciones}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row.id_Secciones}
          />
        </div>
      </Grid>

      {notas.length > 0 && selectedSeccion && (
        <div>
          <h3>Notas de la sección {selectedSeccion}</h3>
          <ul>
            {notas.map((nota, index) => (
              <li key={index}>{nota}</li>
            ))}
          </ul>
        </div>
      )}

      <Modal
        open={openEncuesta}
        onClose={() => setOpenEncuesta(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxHeight: '80%',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            overflow: 'auto', // Permite el scroll si es necesario
            scrollbarWidth: 'none', // Oculta la barra de desplazamiento en Firefox
            msOverflowStyle: 'none', // Oculta la barra de desplazamiento en Internet Explorer y Edge
          }}
        >
          <IconButton
            onClick={() => setOpenEncuesta(false)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" id="modal-modal-title">Encuesta</Typography>
          <br />
          <Typography variant="h11" id="modal-modal-title">
            ¿El docente realiza una evaluación justa y acorde con lo impartido en clase?
          </Typography>
          <TextField
            fullWidth
            label="Pregunta 1 (1-5)"
            value={encuesta.pregunta1}
            onChange={(e) => handleInputChange(e, 'pregunta1')}
            margin="normal"
            type="number"
            inputProps={{ min: 1, max: 5 }}
          />
          <Typography variant="h11" id="modal-modal-title">
            ¿El docente demuestra un buen dominio del tema impartido?
          </Typography>
          <TextField
            fullWidth
            label="Pregunta 2 (1-5)"
            value={encuesta.pregunta2}
            onChange={(e) => handleInputChange(e, 'pregunta2')}
            margin="normal"
            type="number"
            inputProps={{ min: 1, max: 5 }}
          />
          <Typography variant="h11" id="modal-modal-title">
            ¿El docente explica los temas de manera clara y comprensible?
          </Typography>
          <TextField
            fullWidth
            label="Pregunta 3 (1-5)"
            value={encuesta.pregunta3}
            onChange={(e) => handleInputChange(e, 'pregunta3')}
            margin="normal"
            type="number"
            inputProps={{ min: 1, max: 5 }}
          />
          <Typography variant="h11" id="modal-modal-title">
            ¿El docente fomenta la participación y responde a las dudas de los estudiantes?
          </Typography>
          <TextField
            fullWidth
            label="Pregunta 4 (1-5)"
            value={encuesta.pregunta4}
            onChange={(e) => handleInputChange(e, 'pregunta4')}
            margin="normal"
            type="number"
            inputProps={{ min: 1, max: 5 }}
          />
          <Typography variant="h11" id="modal-modal-title">
            ¿El docente está disponible fuera del horario de clase para resolver dudas?
          </Typography>
          <TextField
            fullWidth
            label="Pregunta 5 (1-5)"
            value={encuesta.pregunta5}
            onChange={(e) => handleInputChange(e, 'pregunta5')}
            margin="normal"
            type="number"
            inputProps={{ min: 1, max: 5 }}
          />

          <br />
          <br />
          <center>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitEncuesta}
              sx={{ width: '33%' }} // Ancho del 33%
            >
              Enviar Encuesta
            </Button>
          </center>
          
        </Box>
      </Modal>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          variant='filled'
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </EstudianteLayout>
  );
};
