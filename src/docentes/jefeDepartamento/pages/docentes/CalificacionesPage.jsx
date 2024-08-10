import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, InputAdornment, TextField } from '@mui/material';
import { DocenteLayout } from '../../../layout/DocenteLayout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { esESLocaleText } from '../../../../components/esESLocaleText';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';

export const CalificacionesPage = () => {
    const { user } = useAuth();
    const [docentesActivos, setDocentesActivos] = useState([]);
    const [open, setOpen] = useState(false);
    const [openEstudiantesModal, setOpenEstudiantesModal] = useState(false);
    const [seccionesDocenteSeleccionado, setSeccionesDocenteSeleccionado] = useState([]);
    const [notasEstudiantes, setNotasEstudiantes] = useState([]);
    const [docenteSeleccionado, setDocenteSeleccionado] = useState(null);
    const [docenteNombreSeleccionado, setDocenteNombreSeleccionado] = useState('');
    const [seccionSeleccionada, setSeccionSeleccionada] = useState(null);
    const [seccionNombreSeleccionada, setSeccionNombreSeleccionada] = useState('');
    const [horaInicioSeleccionada, setHoraInicioSeleccionada] = useState(''); // Nuevo estado para la hora de inicio
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/jefeDepartamento/docentes');
    };

    const fetchDocentesActivos = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/department-head/docentes/activos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_Departamento: user.id_departamento }),
            });

            if (!response.ok) {
                throw new Error('Error al obtener la lista de docentes activos');
            }

            const data = await response.json();
            setDocentesActivos(data.data);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    useEffect(() => {
        fetchDocentesActivos();
    }, []);

    const fetchSecciones = async (numeroEmpleado) => {
        try {
            const response = await fetch('http://localhost:3000/api/teacher/secciones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ docente: numeroEmpleado }),
            });

            if (!response.ok) {
                throw new Error('Error al obtener las notas ingresadas por el docente');
            }

            const data = await response.json();
            setSeccionesDocenteSeleccionado(data.data);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const fetchNotas = async (idSeccion) => {
        try {
            const response = await fetch(`http://localhost:3000/api/department-head/notas/${idSeccion}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al obtener las notas de la sección');
            }

            const data = await response.json();
            const notasData = data.data.map(nota => ({
                id: nota.id_Estudiante,
                nombre: nota.nombreEstudiante,
                numeroCuenta: nota.id_Estudiante,
                nota: nota.nota,
                obs: nota.obs,
                horaSeccion: `${nota.codigoAsignatura} - ${nota.horaInicio}`, // Combinando sección y hora
            }));
            setNotasEstudiantes(notasData);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleVerSecciones = (numeroEmpleado, nombreDocente) => {
        setDocenteSeleccionado(numeroEmpleado);
        setDocenteNombreSeleccionado(nombreDocente);
        fetchSecciones(numeroEmpleado);
        setOpen(true);
    };

    const handleVerEstudiantes = (idSeccion, nombreSeccion, horaInicio) => {
        setSeccionSeleccionada(idSeccion);
        setSeccionNombreSeleccionada(nombreSeccion);
        setHoraInicioSeleccionada(horaInicio); // Establece la hora de inicio seleccionada
        fetchNotas(idSeccion);
        setOpenEstudiantesModal(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setSeccionesDocenteSeleccionado([]);
        setDocenteSeleccionado(null);
        setDocenteNombreSeleccionado('');
    };

    const handleCloseEstudiantesModal = () => {
        setOpenEstudiantesModal(false);
        setNotasEstudiantes([]);
        setSeccionSeleccionada(null);
        setSeccionNombreSeleccionada('');
        setHoraInicioSeleccionada(''); // Limpia la hora de inicio
    };

    const columns = [
        { field: 'numeroEmpleado', headerName: 'Número de Empleado', flex: 1 },
        { field: 'Nombre_docente', headerName: 'Nombre del Docente', flex: 1 },
        {
            field: 'actions',
            headerName: 'Acciones',
            flex: 1,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleVerSecciones(params.row.numeroEmpleado, params.row.Nombre_docente)}
                >
                    Ver Secciones
                </Button>
            ),
        },
    ];

    const seccionesColumns = [
        { field: 'id', headerName: 'ID Sección', width: 150 },
        { field: 'codigoAsignatura', headerName: 'Código Asignatura', width: 200 },
        { field: 'Hora_inicio', headerName: 'Hora Inicio', width: 150 },
        { field: 'Hora_Final', headerName: 'Hora Final', width: 150 },
        { field: 'Cupos', headerName: 'Cupos', width: 100 },
        { field: 'estado', headerName: 'Estado', width: 100 },
        {
            field: 'viewStudents',
            headerName: 'Acciones',
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleVerEstudiantes(params.row.id, params.row.codigoAsignatura, params.row.Hora_inicio)}
                >
                    Ver Notas
                </Button>
            ),
        },
    ];

    const notasEstudiantesColumns = [
        { field: 'nombre', headerName: 'Nombre Completo', width: 300 },
        { field: 'numeroCuenta', headerName: 'Número de Cuenta', width: 200 },
        { field: 'nota', headerName: 'Nota', width: 150 },
        { field: 'obs', headerName: 'Observaciones', width: 150 },
    ];

    // Filtrar docentes según el término de búsqueda
    const filteredDocentes = docentesActivos.filter(docente =>
        docente.Nombre_docente.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const rows = filteredDocentes.map((docente) => ({
        id: docente.id_Usuario,
        Nombre_docente: docente.Nombre_docente,
        numeroEmpleado: docente.numeroEmpleado,
    }));

    const seccionesRows = seccionesDocenteSeleccionado.map((seccion) => ({
        id: seccion.id_Secciones,
        codigoAsignatura: seccion.codigoAsignatura,
        Hora_inicio: seccion.Hora_inicio,
        Hora_Final: seccion.Hora_Final,
        Cupos: seccion.Cupos,
        estado: seccion.estado ? 'Activo' : 'Inactivo',
    }));

    const estudiantesRows = notasEstudiantes;

    return (
        <DocenteLayout titulo='Calificaciones De Docentes'>
            <Button variant="outlined" color="primary" onClick={handleBack}>
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
                style={{ marginBottom: 20, width: '33%' }} // 1/3 del ancho de la pantalla
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />

            {/* Tabla de datos */}
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection={false}
                    localeText={esESLocaleText}
                />
            </div>

            <Dialog open={open} fullWidth maxWidth="md">
                <DialogTitle>Notas Ingresadas Por El Docente: {docenteNombreSeleccionado}</DialogTitle>
                <DialogContent>
                    {seccionesDocenteSeleccionado.length > 0 ? (
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={seccionesRows}
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

            <Dialog open={openEstudiantesModal} fullWidth maxWidth="md">
                <DialogTitle>
                    Notas De La Sección: {seccionNombreSeleccionada} | {horaInicioSeleccionada}
                </DialogTitle>
                <DialogContent>
                    {notasEstudiantes.length > 0 ? (
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={estudiantesRows}
                                columns={notasEstudiantesColumns}
                                pageSize={5}
                                localeText={esESLocaleText}
                            />
                        </div>
                    ) : (
                        <Typography>No se encontraron notas para la sección seleccionada.</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEstudiantesModal} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </DocenteLayout>
    );
};
