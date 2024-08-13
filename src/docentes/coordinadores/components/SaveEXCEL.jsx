import React, { useState } from 'react';
import { Button, CircularProgress, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

const ExcelDownloader = ({ id_Departamento, nombre }) => {
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
      const response = await fetch('http://localhost:3000/api/coordinator/secciones/excel', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_Departamento })
      });

      if (!response.ok) {
        throw new Error('Error al obtener la lista');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `secciones_${nombre}.xlsx`; // Nombre del archivo con el ID de la sección
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
      <style>{estilosExcel}</style>
      <Button 
        variant="contained" 
        color="success" 
        onClick={handleDownload}
        disabled={isLoading}
        className="custom-button"
      >
        {isLoading ? <CircularProgress size={24} /> : 'Descargar Excel'}
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

export default ExcelDownloader;

const estilosExcel =`
  .custom-button {
    position: relative;
    overflow: hidden;
    transition: background 0.2s ease-out;
  }

  .custom-button:hover {

    transition: all 0.2s ease-out;
  }

  .custom-button:hover::before {
    content: '';
    display: block;
    width: 0px;
    height: 86%;
    position: absolute;
    top: 7%;
    left: 0%;
    opacity: 0;
    background: #fff;
    box-shadow: 0 0 50px 30px #fff;
    transform: skewX(-20deg);
    animation: sh02 0.5s 0s linear;
  }

  @keyframes sh02 {
    from {
      opacity: 0;
      left: 0%;
    }
    50% {
      opacity: 1;
    }
    to {
      opacity: 0;
      left: 100%;
    }
  }

  .custom-button:active {
    box-shadow: 0 0 0 0 transparent;
    transition: box-shadow 0.2s ease-in;
  }
`