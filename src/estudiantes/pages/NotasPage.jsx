import React, { useState, useEffect } from 'react';
import { EstudianteLayout } from '../layout/EstudianteLayout';
import { useAuth } from '../../contexts/AuthContext';
import { Grid, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const NotasPage = () => {
  const { user } = useAuth();
  const [secciones, setSecciones] = useState([]);
  const [notas, setNotas] = useState(null);
  const [selectedSeccion, setSelectedSeccion] = useState(null);

  useEffect(() => {
    const fetchSecciones = async () => {
      try {
        const response = await fetch(`/api/student/secciones/${user.numeroCuenta}`);
        const data = await response.json();
        setSecciones(data);
      } catch (error) {
        console.error('Error al obtener las secciones:', error);
      }
    };

    fetchSecciones();
  }, [user]);

  const handleVerNota = async (seccionId) => {
    try {
      const response = await fetch(`/api/student/notas/${seccionId}/${user.numeroCuenta}`);
      if (response.status === 403) {
        alert('Debes completar la encuesta antes de ver las notas.');
      } else {
        const data = await response.json();
        setNotas(data);
        setSelectedSeccion(seccionId);
      }
    } catch (error) {
      console.error('Error al obtener las notas:', error);
    }
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
          Ver Nota
        </Button>
      ),
    },
  ];

  return (
    <EstudianteLayout titulo='Secciones'>
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

      {notas && selectedSeccion && (
        <div>
          <h3>Notas de la sección {selectedSeccion}</h3>
          <ul>
            {notas.map((nota, index) => (
              <li key={index}>{nota}</li>
            ))}
          </ul>
        </div>
      )}
    </EstudianteLayout>
  );
};
