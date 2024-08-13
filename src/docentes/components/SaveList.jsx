import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const ListDownloader = ({ seccion }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleDownload = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/api/teacher/estudiantes/${seccion}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener la lista');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `seccion_${seccion}.xlsx`; // Nombre del archivo con el ID de la sección
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      handleClick();
      console.log('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleDownload}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Descargar Lista'}
      </Button>

      <Snackbar open={open} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          No hay datos de estudiantes por el momento, intente más tarde.
        </Alert>
      </Snackbar>
    </>
  );
};

export default ListDownloader;
