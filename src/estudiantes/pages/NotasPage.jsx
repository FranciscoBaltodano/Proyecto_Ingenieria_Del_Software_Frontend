import React, { useState, useEffect } from 'react';
import { EstudianteLayout } from '../layout/EstudianteLayout';
import { useAuth } from '../../contexts/AuthContext';
import { Grid, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { SaveCertificadoVOAE } from '../components/SaveCertificadoVOAE';

export const NotasPage = () => {
  const { user } = useAuth();
  const [notas, setNotas] = useState([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false); // Comienza como deshabilitado

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const response = await fetch(`/api/notas/${user.seccion}/${user.id}`);
        const data = await response.json();
        
        if (data.message === 'evalua al docente') {
          alert('Por favor, evalúa al docente antes de ver las notas.');
          setIsButtonEnabled(false); // Deshabilita el botón si no ha evaluado
        } else {
          setNotas([data]); // Ajusta el estado de notas si la evaluación existe
          setIsButtonEnabled(true); // Habilita el botón porque la evaluación está completa
        }
      } catch (error) {
        console.error('Error al obtener las notas:', error);
      }
    };

    fetchNotas();
  }, [user]);

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
      renderCell: () => (
        <Button
          variant="contained"
          color="inherit"
          onClick={() => alert('Modificar Nota')}
          style={{ marginLeft: 10 }}
          disabled={!isButtonEnabled}
          endIcon={<EditIcon />}
        >
          Modificar Nota
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
            rows={notas}
            columns={columnasEstudiantes}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row.id} // Asegúrate de que cada fila tenga un ID único
          />
        </div>
      </Grid>
    </EstudianteLayout>
  );
};
