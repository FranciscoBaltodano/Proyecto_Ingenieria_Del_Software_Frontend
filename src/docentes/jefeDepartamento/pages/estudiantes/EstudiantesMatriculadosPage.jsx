import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { DocenteLayout } from '../../../layout/DocenteLayout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { esESLocaleText } from '../../../../components/esESLocaleText';
import DownloadStudents from '../../components/SaveList';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
function CustomToolbar({ name }) {
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
    const [seccionSeleccionada, setSeccionSeleccionada] = useState(null);
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
            console.log( 'SECCIONES', data.data);
            setSeccionesDocenteSeleccionado(data.data);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const fetchEstudiantes = async (idSeccion) => {
        try {
            const response = await fetch('http://localhost:3000/api/teacher/estudiantes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ seccion: idSeccion }),
            });

            if (!response.ok) {
                throw new Error('Error al obtener los estudiantes matriculados');
            }

            const data = await response.json();
            console.log('ESTUDIANTES', data.data.estudiantes);
            const estudiantesData = data.data.estudiantes.map(estudiante => ({
                id: estudiante.estudiante[0].numeroCuenta,
                nombre: `${estudiante.Nombre} ${estudiante.Apellido}`,
                numeroCuenta: estudiante.estudiante[0].numeroCuenta,
            }));
            setEstudiantesMatriculados(estudiantesData);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleVerSecciones = (numeroEmpleado) => {
        setDocenteSeleccionado(numeroEmpleado);
        fetchSecciones(numeroEmpleado);
        setOpen(true);
    };

    const handleVerEstudiantes = (idSeccion) => {
        setSeccionSeleccionada(idSeccion);
        fetchEstudiantes(idSeccion);
        setOpenEstudiantesModal(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setSeccionesDocenteSeleccionado([]);
        setDocenteSeleccionado(null);
    };

    const handleCloseEstudiantesModal = () => {
        setOpenEstudiantesModal(false);
        setEstudiantesMatriculados([]);
        setSeccionSeleccionada(null);
    };

    const columns = [
        { field: 'numeroEmpleado', headerName: 'Número de Empleado',flex: 1},
        { field: 'Nombre_docente', headerName: 'Nombre del Docente', flex: 1 },
        {
            field: 'actions',
            headerName: 'Acciones',
            flex: 1,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleVerSecciones(params.row.numeroEmpleado)}
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
        { field: 'estado', headerName: 'Estado', width: 150 },
        {
            field: 'viewStudents',
            headerName: 'Ver',
            width: 200,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleVerEstudiantes(params.row.id)}
                >
                    Ver Estudiantes
                </Button>
            ),
        },
        // {
        //     field: 'downloadStudents',
        //     headerName: 'Descargar',
        //     width: 200,
        //     renderCell: (params) => (
        //         <DownloadStudents seccionId={params.row.id} />

        //     ),
        // },
    ];

    const estudiantesColumns = [
        { field: 'nombre', headerName: 'Nombre Completo', width: 300 },
        { field: 'numeroCuenta', headerName: 'Número de Cuenta', width: 200 },
        // Agrega más columnas si es necesario
    ];

    const rows = docentesActivos.map((docente) => ({
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

    const estudiantesRows = estudiantesMatriculados;

    return (
        <DocenteLayout titulo='Estudiantes matriculados'>
            <Button variant="text" color="primary" onClick={handleBack}>
                Regresar
            </Button>
             <br />
             <br />

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
                <DialogTitle>Secciones del Docente</DialogTitle>
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

            <Dialog open={openEstudiantesModal}  fullWidth maxWidth="md">
                <DialogTitle>Estudiantes Matriculados</DialogTitle>
                <DialogContent>
                    {estudiantesMatriculados.length > 0 ? (
                        <div style={{ height: 400, width: '100%' }}>
                            {/* <DataGrid
                                rows={estudiantesRows}
                                columns={estudiantesColumns}
                                pageSize={5}
                                localeText={esESLocaleText}
                            /> */}
                            <DataGrid
                                rows={estudiantesRows}
                                columns={estudiantesColumns}
                                pageSize={5}
                                localeText={esESLocaleText}
                                slots={{
                                    toolbar: () => <CustomToolbar name={name} />,
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
