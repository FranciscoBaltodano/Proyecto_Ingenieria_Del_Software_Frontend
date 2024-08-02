import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, InputAdornment, TextField, Typography, Modal ,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@mui/material';
import { DocenteLayout } from '../../../layout/DocenteLayout';
import { DataGrid } from '@mui/x-data-grid';
import { useAuth } from '../../../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { esESLocaleText } from '../../../../components/esESLocaleText';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import React from 'react';
import { useForm } from 'react-hook-form';

export const ConfigurarSeccionesPage = () => {
  const navigate = useNavigate();
  const [asignaturas, setAsignaturas] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [edificios, setEdificios] = useState([]);
  const [busquedaValue, setBusquedaValue] = useState('');
  const [asignaturasFiltradas, setAsignaturasFiltradas] = useState([]);
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [selectedAsignatura, setSelectedAsignatura] = useState({ codigo: '', nombre: '' });
  const { register, formState: { errors } } = useForm();
  // const [value, setValue] = useState('');

  const [disabledSections, setDisabledSections] = useState({});
  const [sectionToDelete, setSectionToDelete] = useState('');
  const [sectionToAddCupos, setSectionToAddCupos] = useState('');
const [cuposValue, setCuposValue] = useState('');

  const handleBack = () => {
    navigate('/jefeDepartamento/matricula');
  };

  const filtrarAsignaturas = (busquedaValue) => {
    const filtro = asignaturas.filter((asignatura) => 
      asignatura.nombre.toLowerCase().includes(busquedaValue.toLowerCase())
    );
    setAsignaturasFiltradas(filtro);
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setBusquedaValue(value);
    filtrarAsignaturas(value);
  };

  useEffect(() => {
    const getAsignaturasByDepartamento = async () => {
      try {
        const result = await axios.get(`/api/department-head/asignaturas/${user.id_departamento}`);
        setAsignaturas(result.data.data);
        setAsignaturasFiltradas(result.data.data); // Inicializar las asignaturas filtradas
      } catch (error) {
        console.error("Error al traer las asignaturas:", error);
      }
    };
    getAsignaturasByDepartamento();
  }, [user.id_departamento]);

  const handleOpenModal = async (codigoAsignatura, nombre) => {
    setSelectedAsignatura({ codigo: codigoAsignatura, nombre: nombre });
    try {
      const [seccionesRes, edificiosRes, aulasRes, docentesRes] = await Promise.all([
        axios.get(`/api/department-head/secciones/${codigoAsignatura}`),
        axios.get('/api/department-head/edificios'),
        axios.get('/api/department-head/aulas'),
        axios.post('http://localhost:3000/api/department-head/docentes/activos', { id_Departamento: user.id_departamento })
      ]);
      setSecciones(seccionesRes.data.data);
      setEdificios(edificiosRes.data.data);
      setAulas(aulasRes.data.data);
      setDocentes(docentesRes.data.data);
    } catch (error) {
      console.error("Error al traer las secciones:", error);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedAsignatura({ codigo: '', nombre: '' });
  };


  const handleClickOpen = (sectionId) => {
    console.log("seccion a eliminar", sectionId);
    setSectionToDelete(sectionId);
  };
  
  const handleClose = () => {
    setSectionToDelete(null);
  };

  const handleClickOpenAddCupos = (sectionId) => {
    setSectionToAddCupos(sectionId);
    setCuposValue('');
  };
  
  const handleCloseAddCupos = () => {
    setSectionToAddCupos(null);
    setCuposValue('');
  };

  const handleConfirmDisableSection = async () => {
    if (sectionToDelete !== null) {
      try {
        await axios.delete('http://localhost:3000/api/department-head/just', {
          data: {
          id_Seccion: parseInt(sectionToDelete)}
        });
        console.log('Seccion cancelada');
        setDisabledSections(prev => ({...prev, [sectionToDelete]: true}));
        console.log(disabledSections);
        handleClose();
      } catch (error) {
        console.error("Error al deshabilitar la sección:", error);
      }
    }
  };


  const handleConfirmAddCupos = async () => {
    if (sectionToAddCupos !== null) {
      try {
        await axios.put('http://localhost:3000/api/department-head/cupos', {
          id_Seccion: parseInt(sectionToAddCupos),
          Cupos: parseInt(cuposValue)
        });
        
        console.log('Cupos actualizados');
        // Aquí deberías actualizar el estado local de las secciones
        setSecciones(prevSecciones => prevSecciones.map(seccion => 
          seccion.id_Secciones === sectionToAddCupos 
            ? {...seccion, Cupos: seccion.Cupos + parseInt(cuposValue)} 
            : seccion
        ));
        handleCloseAddCupos();
      } catch (error) {
        console.error("Error al actualizar los cupos:", error);
        console.log(cuposValue);
        console.log(sectionToAddCupos);
      }
    }
  };

  const columns = [
    { field: "codigo", headerName: "Código", width: 150 },
    { field: "nombre", headerName: "Nombre Asignatura", width: 300 },
    { field: "uv", headerName: "uv", width: 100 },
    {
      field: "actions",
      headerName: "Accion",
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal(params.row.codigo, params.row.nombre)}
            endIcon={<VisibilityIcon />}
          >
            Ver Secciones
          </Button>
        </>
      ),
    },
  ];

  const columns2 = [
    {
      field: "id_Docentes",
      headerName: "Docente",
      width: 150,
      renderCell: (params) => {
        const docent = docentes.find(docent => docent.numeroEmpleado === params.value);
        return docent ? docent.Nombre_docente : 'Desconocido';
      }
    },
    {
      field: "id_Aula",
      headerName: "Aula",
      width: 100,
      renderCell: (params) => {
        const aula = aulas.find(aula => aula.id_Aula === params.value);
        return aula ? aula.Nombre : 'Desconocido';
      }
    },
    {
      field: "id_Edificios",
      headerName: "Edificio",
      width: 100,
      renderCell: (params) => {
        const edificio = edificios.find(edificio => edificio.id_Edficios === params.value);
        return edificio ? edificio.Nombre : 'Desconocido';
      }
    },
    { field: "Hora_inicio", headerName: "Hora Inicio", width: 100 },
    { field: "Hora_Final", headerName: "Hora Final", width: 100 },
    {
      field: "Capacidad",
      headerName: "Capacidad",
      width: 100,
      
    },
    { field: "Cupos", headerName: "Cupos", width: 100 },
    { field: "matriculados", headerName: "Matriculados", width: 100 },
    {
      field: "actions",
      headerName: "Accion",
      width: 450,
      renderCell: (params) => (
        <>
     <Button 
  variant="outlined" 
  color="warning" 
  endIcon={<DeleteIcon />} 
  onClick={() => handleClickOpen(params.row.id_Secciones)}
  disabled={disabledSections[params.row.id_Secciones]}
>
  Eliminar
</Button>
<Dialog 
  open={sectionToDelete === params.row.id_Secciones} 
  onClose={handleClose} 
  aria-labelledby="form-dialog-title"
>
  <DialogTitle id="form-dialog-title">Eliminar Sección</DialogTitle>
  <DialogActions>
    <Button color="primary" onClick={handleConfirmDisableSection}>
      Confirmar
    </Button>
    <Button onClick={handleClose} color="primary">
      Cancelar
    </Button>
  </DialogActions>
</Dialog>

<Button 
          style={{ marginLeft: '15px' }} 
          variant="outlined" 
          color="primary" 
          endIcon={<AddIcon />} 
          onClick={() => handleClickOpenAddCupos(params.row.id_Secciones)}
        >
          Añadir Cupos
        </Button>
        <Dialog 
          open={sectionToAddCupos === params.row.id_Secciones} 
          onClose={handleCloseAddCupos} 
          aria-labelledby="add-cupos-dialog-title"
        >
          <DialogTitle id="add-cupos-dialog-title">Añadir Cupos</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Para añadir cupos, ingrese el número de cupos adicionales aquí.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="nuevos_cupos"
              label="Añadir cupos"
              type="number"
              fullWidth
              value={cuposValue}
              onChange={(e) => setCuposValue(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmAddCupos} color="primary">
              Confirmar
            </Button>
            <Button onClick={handleCloseAddCupos} color="primary">
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
        </>
      ),
    },
  ];

  return (
    <DocenteLayout titulo='Configurar Secciones'>
      <Button variant="text" color="primary" onClick={handleBack}>
        Regresar
      </Button>

      <Typography variant="h6" component="h2" gutterBottom>
        Lista de Asignaturas de {user.departamento}
      </Typography>

      <Grid container spacing={2} display='flex' justifyContent='center' alignItems='center'>
        <Box mt={4}>
          <TextField
            placeholder="Buscar por nombre de asignatura"
            variant="outlined"
            margin="normal"
            value={busquedaValue}
            onChange={handleSearchChange}
            sx={{ width: '100%', maxWidth: '300px', mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <DataGrid
            rows={asignaturasFiltradas}
            getRowId={(row) => row.codigo}
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
            Secciones de {selectedAsignatura.codigo} | {selectedAsignatura.nombre}
          </Typography>
          <Box sx={{ flexGrow: 1, minHeight: '300px', overflowY: 'auto', mb: 2 }}>
            <DataGrid
              rows={secciones}
              getRowId={(row) => row.id_Secciones}
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