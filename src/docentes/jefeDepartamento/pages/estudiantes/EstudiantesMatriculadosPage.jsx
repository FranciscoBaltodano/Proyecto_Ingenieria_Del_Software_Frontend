import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, TextField, InputAdornment } from '@mui/material';
import { DocenteLayout } from '../../../layout/DocenteLayout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { esESLocaleText } from '../../../../components/esESLocaleText';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport 
                csvOptions={{ 
                    delimiter: ';', 
                    utf8WithBom: true, 
                    fileName: 'estudiantes_matriculados' 
                }} 
            />
        </GridToolbarContainer>
    );
}

export const EstudiantesMatriculadosPage = () => {
    const { user } = useAuth();
    const [docentesActivos, setDocentesActivos] = useState([]);
    const [open, setOpen] = useState(false);
    const [openEstudiantesModal, setOpenEstudiantesModal] = useState(false);
    const [seccionesDocenteSeleccionado, setSeccionesDocenteSeleccionado] = useState([]);
    const [estudiantesMatriculados, setEstudiantesMatriculados] = useState([]);
    const [docenteSeleccionado, setDocenteSeleccionado] = useState(null);
    const [docenteNombreSeleccionado, setDocenteNombreSeleccionado] = useState(''); // Nuevo estado
    const [seccionSeleccionada, setSeccionSeleccionada] = useState(null);
    const [codigoAsignatura, setCodigoAsignatura] = useState('');  // Estado para el código de la asignatura
    const [nombreSeccionSeleccionada, setNombreSeccionSeleccionada] = useState(''); // Nuevo estado
    const [codigoSeccionSeleccionada, setCodigoSeccionSeleccionada] = useState(''); // Nuevo estado
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/jefeDepartamento/estudiantes');
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
                throw new Error('Error al obtener las secciones del docente');
            }

            const data = await response.json();
            console.log('SECCIONES', data.data);
            
            // Actualiza las secciones del docente con el código de la asignatura
            const seccionesConCodigo = data.data.map(seccion => ({
                ...seccion,
                codigoAsignatura: seccion.Asignaturas ? seccion.Asignaturas.codigo : 'Desconocido'
            }));

            setSeccionesDocenteSeleccionado(seccionesConCodigo);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const fetchEstudiantes = async (idSeccion) => {
        try {
            const response = await fetch(`http://localhost:3000/api/teacher/students/${idSeccion}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al obtener los estudiantes matriculados');
            }

            const data = await response.json();
            console.log('ESTUDIANTES', data.data.estudiantes);
            console.log('CODIGO ASIGNATURA', data.data.codigo);  // Verifica que el código esté bien

            const estudiantesData = data.data.estudiantes.map(estudiante => ({
                id: estudiante.estudiante[0].numeroCuenta,
                nombre: `${estudiante.Nombre} ${estudiante.Apellido}`,
                numeroCuenta: estudiante.estudiante[0].numeroCuenta,
            }));

            setEstudiantesMatriculados(estudiantesData);
            setCodigoAsignatura(data.data.codigoAsignatura);  // Guarda el código de la asignatura en el estado

        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleVerSecciones = (numeroEmpleado, nombreDocente) => {
        setDocenteSeleccionado(numeroEmpleado);
        setDocenteNombreSeleccionado(nombreDocente); // Actualiza el nombre del docente
        fetchSecciones(numeroEmpleado);
        setOpen(true);
    };

    const handleVerEstudiantes = (idSeccion, nombreSeccion, codigoSeccion) => {
        setSeccionSeleccionada(idSeccion);
        setNombreSeccionSeleccionada(nombreSeccion); // Actualiza el nombre de la sección
        setCodigoSeccionSeleccionada(codigoSeccion); // Actualiza el código de la sección
        fetchEstudiantes(idSeccion);
        setOpenEstudiantesModal(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setSeccionesDocenteSeleccionado([]);
        setDocenteSeleccionado(null);
        setDocenteNombreSeleccionado(''); // Restablece el nombre del docente
    };

    const handleCloseEstudiantesModal = () => {
        setOpenEstudiantesModal(false);
        setEstudiantesMatriculados([]);
        setCodigoAsignatura('');  // Restablece el código de la asignatura
        setSeccionSeleccionada(null);
        setNombreSeccionSeleccionada(''); // Restablece el nombre de la sección
        setCodigoSeccionSeleccionada(''); // Restablece el código de la sección
    };

    const normalizeText = (text) => {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    const filteredDocentes = docentesActivos.filter(docente =>
        normalizeText(docente.Nombre_docente).toLowerCase().includes(normalizeText(searchTerm.toLowerCase()))
    );

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
        { field: 'horaInicio1', headerName: 'Sección', width: 150 },
        { field: 'codigoAsignatura', headerName: 'Código Asignatura', width: 200 },
        { field: 'horaInicio2', headerName: 'Hora de Inicio', width: 150 },
        { field: 'Hora_Final', headerName: 'Hora Final', width: 150 },
        { field: 'Cupos', headerName: 'Cupos', width: 100 },
        { field: 'estado', headerName: 'Estado', width: 150 },
        {
            field: 'viewStudents',
            headerName: 'Ver',
            width: 200,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleVerEstudiantes(params.row.id, params.row.horaInicio1, params.row.codigoAsignatura)}
                >
                    Ver Estudiantes
                </Button>
            ),
        },
    ];

    const estudiantesColumns = [
        { field: 'nombre', headerName: 'Nombre Completo', flex: 1},
        { field: 'numeroCuenta', headerName: 'Número de Cuenta', flex: 1 },
    ];

    const rows = filteredDocentes.map((docente) => ({
        id: docente.id_Usuario,
        Nombre_docente: docente.Nombre_docente,
        numeroEmpleado: docente.numeroEmpleado,
    }));

    const seccionesRows = seccionesDocenteSeleccionado.map((seccion) => ({
        horaInicio1: seccion.Hora_inicio,  
        horaInicio2: seccion.Hora_inicio, 
        codigoAsignatura: seccion.codigoAsignatura,
        Hora_Final: seccion.Hora_Final,
        Cupos: seccion.Cupos,
        estado: seccion.estado ? 'Activo' : 'Inactivo',
        id: seccion.id_Secciones,  
    }));

    const estudiantesRows = estudiantesMatriculados;

    return (
        <DocenteLayout titulo='Estudiantes matriculados'>
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
                style={{ marginBottom: 20, width: '33%' }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />

            <div style={{ height: '100%', width: '100%' }}>
                <DataGrid
                    rows={rows}
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
                <DialogTitle>Estudiantes Matriculados en la Sección: {codigoSeccionSeleccionada} | {nombreSeccionSeleccionada}</DialogTitle>
                <DialogContent>
                    {codigoAsignatura && (
                        <Typography variant="h6">Código de Asignatura: {codigoAsignatura}</Typography>
                    )}
                    {estudiantesMatriculados.length > 0 ? (
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={estudiantesRows}
                                columns={estudiantesColumns}
                                pageSize={5}
                                localeText={esESLocaleText}
                                components={{
                                    Toolbar: CustomToolbar,
                                }}
                            />
                        </div>
                    ) : (
                        <Typography>No se encontraron estudiantes matriculados para la sección seleccionada.</Typography>
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
