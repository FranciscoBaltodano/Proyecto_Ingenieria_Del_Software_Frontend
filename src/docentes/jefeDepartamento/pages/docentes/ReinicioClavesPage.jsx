import { Button, InputAdornment, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress, Snackbar, Alert, Box, Typography } from '@mui/material';
import { DocenteLayout } from '../../../layout/DocenteLayout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { esESLocaleText } from '../../../../components/esESLocaleText';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';

export const ReinicioClavesPage = () => {
    const { user } = useAuth();
    const [docentesActivos, setDocentesActivos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDocente, setSelectedDocente] = useState(null);
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
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
            console.log('Datos recibidos:', data.data);
            setDocentesActivos(data.data);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    useEffect(() => {
        fetchDocentesActivos();
    }, [user.id_departamento]);

    const handleOpenDialog = (docente) => {
        setSelectedDocente(docente);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedDocente(null);
    };

    const handleConfirmReinicioClave = async () => {
        setLoading(true);
        try {
            await fetch('http://localhost:3000/api/department-head/rqspass', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: selectedDocente.id,
                    email: selectedDocente.correo,
                }),
            });

            console.log('Activación de reinicio de clave exitosa para:', selectedDocente.id);
            setSnackbarMessage('Reinicio de clave exitoso.');
        } catch (error) {
            console.error('Error al activar el reinicio de clave:', error.message);
            setSnackbarMessage('Error al reiniciar la clave.');
        } finally {
            setLoading(false);
            setSnackbarOpen(true);
            handleCloseDialog();
        }
    };

    const columns = [
        { field: 'numeroEmpleado', headerName: 'Número de Empleado', flex: 1 },
        { field: 'Nombre_docente', headerName: 'Nombre del Docente', flex: 1 },
        { field: 'correo', headerName: 'Correo Electrónico', flex: 1 },
        {
            field: 'actions',
            headerName: 'Acciones',
            flex: 1,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => handleOpenDialog(params.row)}
                >
                    Reiniciar Clave
                </Button>
            ),
        },
    ];

    const filteredDocentes = docentesActivos.filter(docente =>
        docente.Nombre_docente.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const rows = filteredDocentes.map((docente) => ({
        id: docente.id_Usuario,
        Nombre_docente: docente.Nombre_docente,
        numeroEmpleado: docente.numeroEmpleado,
        correo: docente.correo,
    }));

    return (

        <DocenteLayout titulo='Reinicio De Claves'>
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

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection={false}
                    localeText={esESLocaleText}
                />
            </div>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Reiniciar Clave</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Está seguro de querer reiniciar la clave de {selectedDocente?.Nombre_docente}?
                    </DialogContentText>
                    {loading && (
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={3}>
                            <CircularProgress />
                            <Typography variant="body1" style={{ marginTop: 10 }}>
                                Enviando{'.'.repeat(Math.min(3, (new Date().getMilliseconds() / 333) % 4))}
                            </Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        onClick={handleConfirmReinicioClave}
                        disabled={loading}
                    >
                        Confirmar
                    </Button>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}

            >
                <Alert 
                variant='filled' 
                sx={{ width: '100%' }}
                onClose={() => 
                    setSnackbarOpen(false)}
                    severity={snackbarMessage.includes('Error') ? 'error' : 'success'}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </DocenteLayout>
    );
};
