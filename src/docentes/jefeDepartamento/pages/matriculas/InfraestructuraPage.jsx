import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Typography, Modal } from '@mui/material';
import { DocenteLayout } from '../../../layout/DocenteLayout';
import { DataGrid } from '@mui/x-data-grid';
import { useAuth } from '../../../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { esESLocaleText } from '../../../../components/esESLocaleText';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';

export const InfraestructuraPage = () => {
  const navigate = useNavigate();
  const [aulas, setAulas] = useState([]);
  const [tipoAulas, setTipoAulas] = useState([]);
  const [edificios, setEdificios] = useState([]);
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [selectedEdificio, setSelectedEdificio] = useState({ nombre: '', id: '' });

  const handleBack = () => {
    navigate('/jefeDepartamento/matricula');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const edificio = await axios.get(`/api/department-head/edificios/${user.id_centro}`);
        setEdificios(edificio.data.data);
      } catch (error) {
        console.error("Error al traer los edificios:", error);
      }
    };
    fetchData();
  }, [user.id_centro]);

  const handleOpenModal = async (idEdificio, nombreEdificio) => {
    setSelectedEdificio({ nombre: nombreEdificio, id: idEdificio });
    try {
      const [aulasRes , tipoAulasRes]= await Promise.all([
        axios.get(`/api/department-head/aulas/${idEdificio}`),
        axios.get(`/api/department-head/tipoAulas`)
      ]);
      setTipoAulas(tipoAulasRes.data.data);
      setAulas(aulasRes.data.data);
      
    } catch (error) {
      console.error("Error al traer las aulas:", error);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEdificio({ nombre: '', id: '' });
  };

  const columns = [
    {
      field: "Nombre",
      headerName: "Nombre Edificio",
      width: 300
    },
    {
      field: "actions",
      headerName: "Acción",
      width: 300,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal(params.row.id_Edficios, params.row.Nombre)}
          endIcon={<EditIcon />}
        >
          Ver Aulas
        </Button>
      ),
    },
  ];

  const columns2 = [
    {
      field: "Nombre",
      headerName: "Aula",
      flex: 1
    },
    {
      field: "Capacidad",
      headerName: "Capacidad",
      flex: 1
    },
    {
      field: "Tipo",
      headerName: "Tipo Aula",
      flex: 1,
      renderCell: (params) => {
        const tipo = tipoAulas.find(t => t.id === params.row.Tipo);
        return tipo ? tipo.Nombre_Tipo : 'Desconocido';
      }
    },
  ];

  return (
    <DocenteLayout titulo='Registrar Secciones'>
      <Button variant="text" color="primary" onClick={handleBack}>
        Regresar
      </Button>

      <Typography variant="h6" component="h2" gutterBottom>
        Lista de Edificios de {user.centro}
      </Typography>

      <Grid container spacing={2} display='flex' justifyContent='center' alignItems='center'>
        <Box mt={4}>
          <DataGrid
            rows={edificios}
            getRowId={(row) => row.id_Edficios}
            columns={columns}
            autoHeight
            localeText={esESLocaleText}
            checkboxSelection={false}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 20 },
              },
            }}
            pageSizeOptions={[0, 20]}
          />
        </Box>
      </Grid>

      <Modal
        open={openModal}
        
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxHeight: '80vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            Infraestructura del {selectedEdificio.nombre} - {user.centro}
          </Typography>
          <Box sx={{ flexGrow: 1, minHeight: '300px', overflowY: 'auto', mb: 2 }}>
            <DataGrid
              rows={aulas}
              getRowId={(row) => row.id_Aula}
              columns={columns2}
              autoHeight
              localeText={esESLocaleText}
              checkboxSelection={false}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[0, 10]}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleCloseModal}>Cerrar</Button>
          </Box>
        </Box>
      </Modal>
    </DocenteLayout>
  );
};
