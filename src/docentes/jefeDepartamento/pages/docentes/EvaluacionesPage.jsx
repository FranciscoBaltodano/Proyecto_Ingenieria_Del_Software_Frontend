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
    const [docenteSeleccionado, setDocenteSeleccionado] = useState(null);
    const [openEvaluacionesIndividuales, setOpenEvaluacionesIndividuales] = useState(false);
    const [openPromedioTotal, setOpenPromedioTotal] = useState(false);
    const [promedioTotal, setPromedioTotal] = useState(null);
    const [evaluacionesIndividuales, setEvaluacionesIndividuales] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEncuestas = async () => {
            if (!user.id_departamento) {
                console.error('id_Departamento is undefined');
                return;
            }
            try {
                const response = await axios.get(`http://localhost:3000/api/department-head/encuestas/${user.id_departamento}`);
                if (response.data && response.data.data && response.data.data.data && Array.isArray(response.data.data.data)) {
                    const dataWithId = response.data.data.data.map((row) => ({ id: row.numeroEmpleado, ...row }));
                    setDocentes(dataWithId);
                } else {
                    console.warn('No se encontraron datos de encuestas o la estructura es incorrecta:', response.data);
                    setDocentes([]);
                }
            } catch (error) {
                console.error('Error al obtener las encuestas:', error);
                setDocentes([]);
            }
        };
        
        fetchEncuestas();
    }, [user.id_departamento]);

    const handleVerSecciones = (numeroEmpleado, nombreCompleto) => {
        const docente = docentes.find((doc) => doc.numeroEmpleado === numeroEmpleado);
        if (docente) {
            setSeccionesDocenteSeleccionado(docente.secciones);
            setDocenteNombreSeleccionado(nombreCompleto);
            setDocenteSeleccionado(docente);
            setPromedioTotal(docente.promedioTotal);
            setOpen(true);
        } else {
            console.error('No se encontró el docente');
        }
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

    const handleVerEvaluacionesIndividuales = (seccion) => {
        if (docenteSeleccionado) {
            const seccionSeleccionada = docenteSeleccionado.secciones.find(s => s.seccion === seccion);
            if (seccionSeleccionada && Array.isArray(seccionSeleccionada.evaluacionesIndividuales)) {
                setEvaluacionesIndividuales(seccionSeleccionada.evaluacionesIndividuales);
            } else {
                setEvaluacionesIndividuales([]); // Establece un array vacío si no hay evaluaciones
            }
            setOpenEvaluacionesIndividuales(true);
        } else {
            console.error('No hay docente seleccionado');
        }
    };

    const handleVerPromedioTotal = () => {
        setOpenPromedioTotal(true);
    };

    const seccionesColumns = [
        { field: 'seccion', headerName: 'Sección', width:150},
        { field: 'promedioPregunta1', headerName: 'Promedio Pregunta 1', width:150 },
        { field: 'promedioPregunta2', headerName: 'Promedio Pregunta 2', width:150 },
        { field: 'promedioPregunta3', headerName: 'Promedio Pregunta 3', width:150 },
        { field: 'promedioPregunta4', headerName: 'Promedio Pregunta 4', width:150 },
        { field: 'promedioPregunta5', headerName: 'Promedio Pregunta 5', width:150 },
        {
            field: 'actions',
            headerName: 'Acciones',
            width:450,
            renderCell: (params) => (
                <>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleVerEvaluacionesIndividuales(params.row.seccion)}
                    style={{ marginRight: '10px' }}
                >
                    Evaluaciones Individuales
                </Button>
                </>
            ),
        },
    ];

    return (
        <DocenteLayout titulo='Evaluaciones De Docentes'>
            <Button variant="outlined" color="primary" onClick={() => navigate(-1)}>
                Regresar
            </Button>
            <br />
            <br />

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                <TextField
                    label="Buscar Docente"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '33%' }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    variant="contained"
                    color="inherit"
                    onClick={handleVerPromedioTotal}
                    style={{ marginLeft: 'auto' }}
                >
                    Promedio Total
                </Button>
            </div>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={docentes}
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
                                rows={seccionesDocenteSeleccionado.map((seccion, index) => ({ ...seccion, id: index }))}
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

            <Dialog open={openEvaluacionesIndividuales} onClose={() => setOpenEvaluacionesIndividuales(false)} fullWidth maxWidth="md">
                <DialogTitle>Evaluaciones Individuales</DialogTitle>
                <DialogContent>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={(evaluacionesIndividuales && Array.isArray(evaluacionesIndividuales))
                                ? evaluacionesIndividuales.map((evaluacion, index) => ({ ...evaluacion, id: index }))
                                : []    
                            }            
                            columns={[
                                { field: 'pregunta1', headerName: 'Pregunta 1', flex: 2},
                                { field: 'pregunta2', headerName: 'Pregunta 2', flex: 2 },
                                { field: 'pregunta3', headerName: 'Pregunta 3', flex: 2 },
                                { field: 'pregunta4', headerName: 'Pregunta 4', flex: 2 },
                                { field: 'pregunta5', headerName: 'Pregunta 5', flex: 2 },
                            ]}
                            pageSize={5}
                            localeText={esESLocaleText}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEvaluacionesIndividuales(false)} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openPromedioTotal} fullWidth maxWidth="sm">
                <DialogTitle>Promedio Total</DialogTitle>
                <DialogContent>
                    {promedioTotal ? (
                        <center>
                            <div>
                                <Typography>Promedio Pregunta 1: &emsp; {promedioTotal.promedioPregunta1}</Typography>
                                <Typography>Promedio Pregunta 2: &emsp; {promedioTotal.promedioPregunta2}</Typography>
                                <Typography>Promedio Pregunta 3: &emsp; {promedioTotal.promedioPregunta3}</Typography>
                                <Typography>Promedio Pregunta 4: &emsp; {promedioTotal.promedioPregunta4}</Typography>
                                <Typography>Promedio Pregunta 5: &emsp; {promedioTotal.promedioPregunta5}</Typography>
                            </div>
                        </center>
                    ) : (
                        <Typography>No hay datos de promedio total disponibles.</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenPromedioTotal(false)} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </DocenteLayout>
    );
};
