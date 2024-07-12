import React, { useState } from 'react';
import { Box, Button, Typography, styled, Modal, Grid, Divider, Snackbar, Alert } from '@mui/material';
import * as XLSX from 'xlsx';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';

const Input = styled('input')({
  display: 'none',
});

export const ExcelInput = () => {
  const [fileName, setFileName] = useState('');
  const [cantidadEstudiantes, setCantidadEstudiantes] = useState(0);
  const [dataJson, setDataJson] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'application/vnd.ms-excel' || file.type === 'text/csv')) {
      setFileName(file.name);
      readFile(file);
    } else {
      setSnackbarMessage('Por favor seleccione un archivo Excel o CSV.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      setFileName('');
    }
  };

  const readFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);

      setDataJson(jsonData);
      setCantidadEstudiantes(jsonData.length);
    };
    reader.readAsBinaryString(file);
  };

  const handleConfirmarMatricula = () => {
    setOpenModal(true);
  };

  const handleCancel = () => {
    setFileName('');
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    sendDataToBackend();
  };

  const sendDataToBackend = async () => {
    try {
      const response = await axios.post('La url que va a llevar el json al backend', dataJson);
      setSnackbarMessage('Datos enviados exitosamente: ' + response.data);
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Error al enviar los datos: ' + error.message);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const ExcelIcon = () => (
    <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50">
      <path d="M28.8125 .03125L.8125 5.34375C.339844 5.433594 0 5.863281 0 6.34375L0 43.65625C0 44.136719 .339844 44.566406 .8125 44.65625L28.8125 49.96875C28.875 49.980469 28.9375 50 29 50C29.230469 50 29.445313 49.929688 29.625 49.78125C29.855469 49.589844 30 49.296875 30 49L30 1C30 .703125 29.855469 .410156 29.625 .21875C29.394531 .0273438 29.105469 -.0234375 28.8125 .03125ZM32 6L32 13L34 13L34 15L32 15L32 20L34 20L34 22L32 22L32 27L34 27L34 29L32 29L32 35L34 35L34 37L32 37L32 44L47 44C48.101563 44 49 43.101563 49 42L49 8C49 6.898438 48.101563 6 47 6ZM36 13L44 13L44 15L36 15ZM6.6875 15.6875L11.8125 15.6875L14.5 21.28125C14.710938 21.722656 14.898438 22.265625 15.0625 22.875L15.09375 22.875C15.199219 22.511719 15.402344 21.941406 15.6875 21.21875L18.65625 15.6875L23.34375 15.6875L17.75 24.9375L23.5 34.375L18.53125 34.375L15.28125 28.28125C15.160156 28.054688 15.035156 27.636719 14.90625 27.03125L14.875 27.03125C14.8125 27.316406 14.664063 27.761719 14.4375 28.34375L11.1875 34.375L6.1875 34.375L12.15625 25.03125ZM36 20L44 20L44 22L36 22ZM36 27L44 27L44 29L36 29ZM36 35L44 35L44 37L36 37Z"></path>
    </svg>
  );

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100px">
        <label htmlFor="contained-button-file">
          <Input accept=".csv, application/vnd.ms-excel" id="contained-button-file" multiple type="file" onChange={handleFileChange} />

          <Button variant="contained" color='success' component="span" startIcon={<ExcelIcon />}>
            Matricular Estudiantes
          </Button>
        </label>

        {fileName && (
          <Grid container display='flex' direction='column' alignItems='center'>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Archivo a subir: {fileName}
            </Typography>

            <Grid item>
              <Button variant="contained" color='inherit' onClick={handleCancel} sx={{ mt: 2, mr: 1 }}>
                Cancelar
              </Button>

              <Button variant="contained" color='primary' endIcon={<SendIcon />} onClick={handleConfirmarMatricula} sx={{ mt: 2 }}>
                Enviar
              </Button>
            </Grid>
          </Grid>
        )}
      </Box>

      <Modal 
        open={openModal} 
        onClose={handleCloseModal}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
        <Box sx={{ bgcolor: 'background.paper', padding: 4, borderRadius: 2 }}>
          
          <Typography variant="h6" component="h2" gutterBottom>
            Confirmación de Registro
          </Typography>

          <Typography >
            ¿Está seguro de registrar {cantidadEstudiantes} estudiantes?
          </Typography>
          
          <Button onClick={handleCloseModal} variant="contained" color="inherit" sx={{ mt: 2 }}>
            No
          </Button>
          
          <Button onClick={handleCloseModal} variant="contained" color="primary" sx={{ mt: 2, ml: 2 }}>
            Sí
          </Button>
        </Box>

      </Modal>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={2000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} variant='filled' severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
