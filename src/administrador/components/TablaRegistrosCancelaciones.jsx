import React, { useState, useEffect ,useCallback,useMemo} from "react";
import {Box,Snackbar,Alert} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Link } from 'react-router-dom';



export const TablaRegistrosCancelaciones = () => {

  const [matricula, setMatricula] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cancelacionesRes = await axios.get('http://localhost:3000/api/admin/cancelaciones')
        setMatricula(cancelacionesRes.data);
        console.log('Data set in state:', cancelacionesRes.data); // Imprime los datos establecidos en el estado
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);



  const columns = [
    { field: "pac", 
      headerName: "Pac",
       width: 200,
      renderCell: (params) => (params.value)
    },
    { field: "tipoMatricula", 
      headerName: "Tipo Matricula", 
      width: 200,
      renderCell: (params) => (params.value)
     },
    { field: "created_at", 
      headerName: "Fecha", 
      width: 200,
      renderCell: (params) => new Date(params.value).toLocaleDateString()
     },
    
    {
      field: "actions",
      headerName: "Acciones",
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            component={Link}
            to={`/admin/configuracion_cancelacion_modificar/${params.row.id_canExcep}`}
            
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.id_canExcep)}
           
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];


  const handleDelete = async (id_canExcep) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/admin/cancelaciones/${id_canExcep}`
      );
      const matriculaRes = await axios.get('http://localhost:3000/api/admin/cancelaciones');
      setMatricula(matriculaRes.data);
      if (matriculaRes.status === 200) {
        setSnackbarMessage('Cancelacion eliminada exitosamente');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        
      } 
    } catch (error) {
      console.error('Error al eliminar el cancelacion:', error);
      setSnackbarMessage('Error al eliminar la cancelacion');
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
          rows={matricula}
          getRowId={(row) => row.id_canExcep}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[10]}
          checkboxSelection={false}
        
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
