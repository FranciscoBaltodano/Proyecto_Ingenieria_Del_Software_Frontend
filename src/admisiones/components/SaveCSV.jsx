import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import DataTable from '../../components/DataTable';

const CSVDownloader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/admisiones/csv', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Asumiendo que guardas el token en localStorage
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener el CSV');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'Admisiones.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al descargar el CSV');
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
      {isLoading ? <CircularProgress size={24} /> : 'Descargar CSV'}
    </Button>
    
    <DataTable url="http://localhost:3000/api/admisiones/json" name="Admisiones" />
    </>
  );
};

export default CSVDownloader;