import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, InputAdornment, TextField, Typography, Modal } from '@mui/material';
import { DocenteLayout } from '../../../layout/DocenteLayout';
import { DataGrid } from '@mui/x-data-grid';
import { useAuth } from '../../../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { esESLocaleText } from '../../../../components/esESLocaleText';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useForm } from 'react-hook-form';

export const ListaDeEsperaPage = () => {
  const navigate = useNavigate();
  const [asignaturas, setAsignaturas] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [edificios, setEdificios] = useState([]);
  const [busquedaValue, setBusquedaValue] = useState('');
  const [asignaturasFiltradas, setAsignaturasFiltradas] = useState([]);
  const [listaEspera, setListaEspera] = useState([]);
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [selectedAsignatura, setSelectedAsignatura] = useState({ codigo: '', nombre: '' });
  const [selectedSeccion, setSelectedSeccion] = useState(null);

  const { formState: { errors } } = useForm();

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

  const handleOpenModal2 = async (seccion) => {
    setSelectedSeccion(seccion);
    try {
      const response = await axios.get(`http://localhost:3000/api/matricula/lista-espera/seccion/${seccion.id_Secciones}`);
      setListaEspera(response.data);
    } catch (error) {
      console.error("Error al traer la lista de espera:", error);
    }
    setOpenModal2(true);
  };

  const handleCloseModal2 = () => {
    setOpenModal2(false);
    setSelectedSeccion(null);
    setListaEspera([]); // Limpiar la lista de espera al cerrar el modal
  };

  const columns = [
    { field: "codigo", headerName: "Código", width: 150 },
    { field: "nombre", headerName: "Nombre Asignatura", width: 300 },
    { field: "uv", headerName: "uv", width: 100 },
    {
      field: "actions",
      headerName: "Acción",
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
      renderCell: (params) => {
        const aula = aulas.find(aula => aula.id_Aula === params.row.id_Aula);
        return aula ? aula.Capacidad : 'Desconocido';
      }
    },
    { field: "Cupos", headerName: "Cupos", width: 100 },
    { field: "matriculados", headerName: "Matriculados", width: 100 },
    {
      field: "actions",
      headerName: "Acción",
      width: 230,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal2(params.row)}
            endIcon={<VisibilityIcon />}
          >
            Ver Lista De Espera
          </Button>
        </>
      ),
    },
  ];

  const columns3 = [
    {
      field: 'id_estudiante',
      headerName: 'Estudiante',
      width: 250,
      renderCell: (params) => {
        const { Nombre, Apellido } = params.row.estudiante.usuario || {};
        return `${Nombre || 'Desconocido'} ${Apellido || 'Desconocido'}`;
      }
    },
    { field: 'numeroCuenta', 
      headerName: 'Número de Cuenta', 
      width: 150, 
      renderCell: (params) => {
        const { numeroCuenta} = params.row.estudiante || {};
        return `${numeroCuenta || 'Desconocido'} `;
      }
    },
    { field: 'fecha_solicitud', headerName: 'Fecha Solicitud', width: 150 }
  ];

  return (
    <DocenteLayout titulo='Lista De Espera'>
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

      <Modal
        open={openModal2}
        
        aria-labelledby="modal-title-2"
        aria-describedby="modal-description-2"
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
          <Typography id="modal-title-2" variant="h6" component="h2" gutterBottom>
            Lista De Espera Sección {selectedSeccion?.id_Secciones || 'Desconocido'} | {selectedAsignatura.codigo} | {selectedAsignatura.nombre}
          </Typography>
          <Box sx={{ flexGrow: 1, minHeight: '300px', overflowY: 'auto', mb: 2 }}>
            <DataGrid
              rows={listaEspera}
              getRowId={(row) => row.id}
              columns={columns3}
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
            <Button onClick={handleCloseModal2}>Cerrar</Button>
          </Box>
        </Box>
      </Modal>
    </DocenteLayout>
  );
};
