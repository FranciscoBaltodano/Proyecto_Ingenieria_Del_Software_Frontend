import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, InputAdornment, TextField } from '@mui/material';
import { DocenteLayout } from '../../../layout/DocenteLayout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { esESLocaleText } from '../../../../components/esESLocaleText';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

export const EvaluacionesPage = () => {
    const { user } = useAuth();
    const [docentes, setDocentes] = useState([]);
    const [open, setOpen] = useState(false);
    const [seccionesDocenteSeleccionado, setSeccionesDocenteSeleccionado] = useState([]);
    const [docenteNombreSeleccionado, setDocenteNombreSeleccionado] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEncuestas = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/department-head/encuestas', { id_Departamento: user.departamentoId });
                console.log('Datos recibidos del backend:', response.data);
                if (Array.isArray(response.data.data)) {
                    console.log('Datos a setear en docentes:', response.data.data);
                    setDocentes(response.data.data);
                } else {
                    console.error('Los datos recibidos no son un arreglo:', response.data.data);
                    setDocentes([]);
                }
            } catch (error) {
                console.error('Error al obtener las encuestas:', error);
                setDocentes([]);
            }
        };

        fetchEncuestas();
    }, [user.departamentoId]);

    const handleVerSecciones = (numeroEmpleado, nombreCompleto) => {
        const docenteSeleccionado = docentes.find(docente => docente.numeroEmpleado === numeroEmpleado);
        setDocenteNombreSeleccionado(nombreCompleto);
        setSeccionesDocenteSeleccionado(docenteSeleccionado ? docenteSeleccionado.secciones : []);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const columns = [
        { field: 'numeroEmpleado', headerName: 'Número de Empleado', flex: 1 },
        { field: 'nombreCompleto', headerName: 'Nombre del Docente', flex: 1 },
        {
            field: 'actions',
            headerName: 'Acciones',
            flex: 1,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleVerSecciones(params.row.numeroEmpleado, params.row.nombreCompleto)}
                >
                    Ver Secciones
                </Button>
            ),
        },
    ];

    const seccionesColumns = [
        { field: 'seccion', headerName: 'Sección', flex: 1 },
        { field: 'promedioPregunta1', headerName: 'Promedio Pregunta 1', flex: 1 },
        { field: 'promedioPregunta2', headerName: 'Promedio Pregunta 2', flex: 1 },
        { field: 'promedioPregunta3', headerName: 'Promedio Pregunta 3', flex: 1 },
        { field: 'promedioPregunta4', headerName: 'Promedio Pregunta 4', flex: 1 },
        { field: 'promedioPregunta5', headerName: 'Promedio Pregunta 5', flex: 1 },
    ];

    return (
        <DocenteLayout titulo='Evaluaciones De Docentes'>
            <Button variant="outlined" color="primary" onClick={() => navigate(-1)}>
                Regresar
            </Button>
            <br />
            <br />

            <TextField
                label="Buscar Docente"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: 20, width: '33%' }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={Array.isArray(docentes) ? docentes.filter((docente) => docente.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase())) : []}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection={false}
                    localeText={esESLocaleText}
                />
            </div>

            <Dialog open={open} fullWidth maxWidth="md">
                <DialogTitle>Secciones del Docente: {docenteNombreSeleccionado}</DialogTitle>
                <DialogContent>
                    {seccionesDocenteSeleccionado.length > 0 ? (
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={seccionesDocenteSeleccionado}
                                columns={seccionesColumns}
                                pageSize={5}
                                localeText={esESLocaleText}
                            />
                        </div>
                    ) : (
                        <Typography>No se encontraron secciones para el docente seleccionado.</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </DocenteLayout>
    );
};
