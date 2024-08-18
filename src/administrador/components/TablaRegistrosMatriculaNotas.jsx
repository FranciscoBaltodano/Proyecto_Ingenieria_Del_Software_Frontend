import React, { useState, useEffect } from "react";
import { Box, Snackbar, Alert, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Link } from 'react-router-dom';
import { esESLocaleText } from "../../components/esESLocaleText";

export const TablaRegistrosMatriculaNotas = () => {

  const [procesoNotas, setProcesoNotas] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/procesoNotas');
        setProcesoNotas(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  
  const columns = [
    { 
      field: "pacSeleccionado", 
      headerName: "Descripcion", 
      width:200,
    },
    { 
      field: "estado", 
      headerName: "Estado", 
      width:150,
      renderCell: (params) => params.value ? 'Activo' : 'Desactivo'
    },
    { 
      field: "fecha_inicio", 
      headerName: "Fecha Inicio", 
      width:150,
      renderCell: (params) => new Date(params.value).toLocaleDateString()
    },
    { 
      field: "fecha_final", 
      headerName: "Fecha Final", 
      width:150,
      renderCell: (params) => new Date(params.value).toLocaleDateString()
    },
    {
      field: "actions",
      headerName: "Acciones",
      width:150,
      renderCell: (params) => (
        <>
          

          <IconButton
            color="primary"
            component={Link}
            to={`/admin/proceso_notas_modificar/${params.row.id_procesoNota}`}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.id_procesoNota)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const handleDelete = async (id_procesoNota) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/api/admin/proceso_notas/${id_procesoNota}`);
      
      // Actualiza la lista de procesoNotas después de eliminar uno
      const response = await axios.get('http://localhost:3000/api/admin/procesoNotas');
      setProcesoNotas(response.data);
  
      setSnackbarMessage('ProcesoNota eliminado exitosamente');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error al eliminar el procesoNota:', error);
      setSnackbarMessage('Error al eliminar el procesoNota');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Box>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={procesoNotas}
            getRowId={(row) => row.id_procesoNota}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[10]}
            checkboxSelection={false}
            localeText={esESLocaleText}
          />
          <Snackbar 
            open={openSnackbar} 
            autoHideDuration={6000} 
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert onClose={handleCloseSnackbar} variant='filled' severity={snackbarSeverity} sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </div>
      </Box>
    </div>
  );
}
