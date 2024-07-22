import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import { DocenteLayout } from '../../../layout/DocenteLayout';
import { DataGrid } from '@mui/x-data-grid';
import { useAuth } from '../../../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { esESLocaleText } from '../../../../components/esESLocaleText';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';

export const RegistrarSeccionPage = () => {
  const navigate = useNavigate();
  const [asignaturas, setAsignaturas] = useState([]);
  const { user } = useAuth();

  // Navega a la pantalla anterior
  const handleBack = () => {
    navigate('/jefeDepartamento/matricula');
  };

  useEffect(() => {
    const getAsignaturasByDepartamento = async () => {
      try {
        const result = await axios.get(
          `/api/department-head/asignaturas/${user.id_departamento}`
        );
        const { data } = result.data;
        setAsignaturas(data);
      } catch (error) {
        console.error("Error al traer las asignaturas:", error);
      }
    };
    getAsignaturasByDepartamento();
  }, [user.id_departamento]);

  const columns = [
    { field: "codigo", headerName: "Código", width: 150 },
    { field: "nombre", headerName: "Nombre Asignatura", width: 300 },
    { field: "uv", headerName: "uv", width: 100 },
    {
      field: "actions",
      headerName: "Accion",
      width: 200,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate(`/jefeDepartamento/formularioRegritrarSeccion`, { state: { asignatura: params.row } });
          }}
          endIcon={<AddIcon />}
        >
          Crear Sección
        </Button>
      ),
    },
  ];

  return (
    <DocenteLayout titulo='Registrar Secciones'>
      <Button variant="text" color="primary" onClick={handleBack}>
        Regresar
      </Button>

      <Typography variant="h6" component="h2" gutterBottom>
        Lista de Asignaturas de {user.departamento}
      </Typography>

      <Grid container spacing={2} display='flex' justifyContent='center' alignItems='center'>

        <Box mt={4}>
          <DataGrid
            rows={asignaturas}
            getRowId={(row) => row.codigo}
            columns={columns}
            autoHeight
            localeText={esESLocaleText}
            checkboxSelection={false}
          />
        </Box>

      </Grid>
    </DocenteLayout>
  );
};
