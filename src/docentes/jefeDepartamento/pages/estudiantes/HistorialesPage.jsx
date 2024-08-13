import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, InputAdornment, TextField } from '@mui/material';
import { DocenteLayout } from '../../../layout/DocenteLayout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { esESLocaleText } from '../../../../components/esESLocaleText';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';

export const HistorialesPage = () => {
    const { user } = useAuth();
    const [estudiantes, setEstudiantes] = useState([]);
    const [openEstudiantesModal, setOpenEstudiantesModal] = useState(false);
    const [notasEstudiantes, setNotasEstudiantes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudentName, setSelectedStudentName] = useState(''); // Variable de estado para el nombre del estudiante
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/jefeDepartamento/estudiantes');
    };

    const fetchEstudiantes = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/department-head/student/${user.id_departamento}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al obtener la lista de estudiantes');
            }

            const data = await response.json();
            setEstudiantes(data.data);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    useEffect(() => {
        fetchEstudiantes();
    }, [user.id_departamento]);

    const fetchNotas = async (idEstudiante) => {
        try {
            const response = await fetch(`http://localhost:3000/api/department-head/notasByStudent/${idEstudiante}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al obtener las notas del estudiante');
            }

            const data = await response.json();
            const notasData = data.data.map(nota => ({
                id: nota.id_Estudiante + '-' + nota.codigoAsignatura, // Unique ID
                nombreEstudiante: nota.nombreEstudiante,
                codigoAsignatura: nota.codigoAsignatura,
                nombreDocente: nota.nombreDocente,
                nota: nota.nota,
                obs: nota.obs,
                seccionHora:nota.seccionHora,
            }));
            setNotasEstudiantes(notasData);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleVerNotas = (idEstudiante, nombreEstudiante) => {
        setSelectedStudentName(nombreEstudiante); // Almacena el nombre del estudiante
        fetchNotas(idEstudiante);
        setOpenEstudiantesModal(true);
    };

    const handleCloseEstudiantesModal = () => {
        setOpenEstudiantesModal(false);
        setNotasEstudiantes([]);
        setSelectedStudentName(''); // Limpia el nombre del estudiante
    };

    // Función para normalizar cadenas (eliminar acentos)
    const normalizeText = (text) => {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    const columns = [
        { field: 'numeroCuenta', headerName: 'Número de Cuenta', flex: 1},
        { field: 'nombreEstudiante', headerName: 'Nombre Completo', flex: 1 },
        { field: 'correo_Institucional', headerName: 'Correo Institucional', flex: 1 },
        {
            field: 'actions',
            headerName: 'Acciones',
            flex: 1,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleVerNotas(params.row.numeroCuenta, params.row.nombreEstudiante)} // Pasa el nombre del estudiante
                >
                    Ver Notas
                </Button>
            ),
        },
    ];

    const notasEstudiantesColumns = [
        { field: 'codigoAsignatura', headerName: 'Código Asignatura', width: 200 },
        { field: 'seccionHora', headerName: 'Seccion', width: 150 },
        { field: 'nombreDocente', headerName: 'Nombre Docente', width: 250 },
        { field: 'nota', headerName: 'Nota', width: 150 },
        { field: 'obs', headerName: 'Observaciones', width: 150 },
    ];

    // Filtrar estudiantes según el término de búsqueda, ignorando acentos
    const filteredEstudiantes = estudiantes.filter(estudiante =>
        normalizeText(estudiante.nombreEstudiante)?.toLowerCase().includes(normalizeText(searchTerm.toLowerCase()))
    );

    const estudiantesRows = filteredEstudiantes.map((estudiante) => ({
        id: estudiante.id,
        numeroCuenta: estudiante.numeroCuenta,
        nombreEstudiante: estudiante.nombreEstudiante,
        correo_Institucional: estudiante.correo_Institucional,
    }));

    return (
        <DocenteLayout titulo='Historiales'>
            <Button variant="outlined" color="primary" onClick={handleBack}>
                Regresar
            </Button>
            <br />
            <br />

            <TextField
                label="Buscar Estudiante"
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

            {/* Tabla de datos de estudiantes */}
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={estudiantesRows}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection={false}
                    localeText={esESLocaleText}
                />
            </div>

            <Dialog open={openEstudiantesModal} fullWidth maxWidth="md">
                <DialogTitle>
                    {`Notas Del Estudiante: ${selectedStudentName}`} {/* Muestra el nombre del estudiante */}
                </DialogTitle>
                <DialogContent>
                    {notasEstudiantes.length > 0 ? (
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={notasEstudiantes}
                                columns={notasEstudiantesColumns}
                                pageSize={5}
                                localeText={esESLocaleText}
                            />
                        </div>
                    ) : (
                        <Typography>No se encontraron notas para el estudiante seleccionado.</Typography>
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
