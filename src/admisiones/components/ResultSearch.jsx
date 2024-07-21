import React, { useState } from 'react';
import axios from 'axios';
import { Button, Snackbar, Alert, CircularProgress } from '@mui/material';

export const ResultSearch = () => {
  const [dni, setDni] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleInputChange = (e) => {
    setDni(e.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/admisiones/notas/${dni}`);
      setResult(response.data);
      setSnackbarMessage('Búsqueda exitosa');
      setSnackbarSeverity('success');
    } catch (error) {
      setSnackbarMessage('Error al buscar las notas');
      setSnackbarSeverity('error');
      console.error('Error al buscar las notas:', error);
    } finally {
      setLoading(false);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div style={{ marginTop: 20, marginLeft: 20, marginRight: 10, marginBottom: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="w-2/3" style={{ marginBottom: 20 }}>
        <input
          id="dni"
          type="text"
          placeholder="Ingrese su número de identidad"
          value={dni}
          onChange={handleInputChange}
          className="w-full p-2 border border-black rounded"
        />
      </div>
      <div>
        <Button
          className="w-full"
          id="resultSearch"
          type="button"
          variant="contained"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Buscar'}
        </Button>
      </div>
      {result && (
        <div style={{ marginTop: 20, textAlign: 'left' }}>
          <p><strong>PAA:</strong> {result.nota1}</p>
          <p><strong>PAM o PCCNS:</strong> {result.nota2}</p>
          <p><strong>Carrera 1:</strong> {result.carrera1.nombre} ({result.carrera1.aprobacion})</p>
          {result.carrera1.aprobacionPAM_PCCNS && (
            <p><strong>Resultado PAM/PCCNS:</strong> {result.carrera1.aprobacionPAM_PCCNS}</p>
          )}
          {result.carrera1.aprobacionPAM_PCCNS === `reprobó , pero puede ingresar a una carrera que no requiere PAM o PCCNS` && (
            <p><strong>Nota:</strong> Aunque reprobó el PAM/PCCNS, puede ingresar a una carrera que no requiere PAM o PCCNS.</p>
          )}
          <p><strong>Carrera 2:</strong> {result.carrera2.nombre} ({result.carrera2.aprobacion})</p>
          {result.carrera2.aprobacionPAM_PCCNS && (
            <p><strong>Resultado PAM/PCCNS:</strong> {result.carrera2.aprobacionPAM_PCCNS}</p>
          )}
          {result.carrera2.aprobacionPAM_PCCNS === 'reprobó, pero puede ingresar a una carrera que no requiere PAM o PCCNS' && (
            <p><strong>Nota:</strong> Aunque reprobó el PAM/PCCNS, puede ingresar a una carrera que no requiere PAM o PCCNS.</p>
          )}
        </div>
      )}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
