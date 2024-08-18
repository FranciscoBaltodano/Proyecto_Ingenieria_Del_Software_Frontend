import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Divider, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Grid, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

import { useAuth } from '../../../../contexts/AuthContext';
import { GraficoBarras } from '../../components/GraficoBarras';
import { GraficoPastel } from '../../components/GraficoPastel';
import { DocenteLayout } from '../../../layout/DocenteLayout';
import { Info, School, People, Square, Help, CheckCircle, Cancel, RunCircleRounded } from '@mui/icons-material'; // Importa iconos de Material-UI
import { GraficoPastelClases } from '../../components/GraficoPastelClases';

export const EstadisticasPage = () => {
    const [data, setData] = useState([]);
    const [totalEstudiantes, setTotalEstudiantes] = useState();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/jefeDepartamento/estudiantes');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/department-head/countStudents');
                setData(response.data.resultArray);
                setTotalEstudiantes(response.data.totalStudents);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Encontrar el departamento y la facultad del usuario
    const userDepartment = data.flatMap(facultad => facultad.departamentos)
        .find(departamento => departamento.id_Departamento === user.id_departamento);
    const userFaculty = data.find(facultad => facultad.departamentos.some(dept => dept.id_Departamento === user.id_departamento));

    const departmentCount = userDepartment ? userDepartment.cantidad : 'No disponible';
    const facultyCount = userFaculty ? userFaculty.cantidad : 'No disponible';

    // Datos para el gráfico de barras de la facultad del usuario
    const facultyDepartments = userFaculty ? userFaculty.departamentos : [];
    const facultyDepartmentNames = facultyDepartments.map(dept => dept.nombre);
    const facultySeries = facultyDepartmentNames.map(departmentName => ({
        label: departmentName,
        data: [facultyDepartments.find(dept => dept.nombre === departmentName)?.cantidad || 0],
        stack: 'total',
    }));

    return (
        <DocenteLayout titulo='Estadisticas Generales'>
            <Button variant="text" color="primary" onClick={handleBack}>
                Regresar
            </Button>

            <Grid display='flex' direction='column' container spacing={2} sx={{ mt: 0 , borderRadius: '15px',boxShadow:'2px 2px 10px 0px #D0D0D0', padding:'30px',  backgroundColor:'#F6FCFC' }}>
            <Grid display='flex' container spacing={2} sx={{ mt: 0 , borderRadius: '15px',boxShadow:'2px 2px 10px 0px #D0D0D0', padding:'0px',  backgroundColor:'#FCFDFD' }}>

            <List>
                <ListItem>
                    <ListItemIcon>
                        <People />
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography variant="h6">Total Estudiantes:</Typography>}
                        secondary={<Typography variant="body1">{totalEstudiantes} Estudiantes</Typography>}
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemIcon>
                        <School />
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography variant="h6">Estudiantes en Departamento:</Typography>}
                        secondary={<Typography variant="body1">{departmentCount} en {userDepartment ? userDepartment.nombre : 'no encontrado'}</Typography>}
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemIcon>
                        <Info />
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography variant="h6">Estudiantes en la Facultad:</Typography>}
                        secondary={<Typography variant="body1">{facultyCount} en {userFaculty ? userFaculty.nombre : 'no encontrado'}</Typography>}
                    />
                </ListItem>
            </List>
            </Grid>

            <Grid display='flex'container spacing={2}  >
                <Grid item xs={12} xl={6}>
                    <Box my={4}>
                        <Typography variant="h5" gutterBottom>
                            Distribución de Estudiantes por Departamento en la Facultad
                        </Typography>
                        <Typography variant="body1" mb='50px' gutterBottom>
                        Este gráfico de pastel muestra la distribución de estudiantes por departamento en la {userFaculty ? userFaculty.nombre : 'no disponible'}.                </Typography>
                        <GraficoPastel data={data} user={user} />
                    </Box>
                 </Grid>

                <Divider sx={{ my: 2 }} />

                <Grid item xs={12} xl={6}>
                    <Box my={4}>
                        <Typography variant="h5" gutterBottom>
                            Número de Estudiantes por Facultad
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Este gráfico de barras muestra la cantidad de estudiantes por cada facultad dentro de la universidad.
                        </Typography>
                        <GraficoBarras data={data} user={user} />
                    </Box>
                    </Grid>
                </Grid>


                <Typography my={2} variant='h5'>Distribución de resultados por clase</Typography>
                <Grid ml={1} direction='row' mb={2}  justifyContent='space-evenly' container spacing={0} >
                    <Chip icon={<CheckCircle style={{ color:'green' }}  />} label="Aprobado" variant="outlined" color='success' />
                    <Chip icon={<Cancel style={{ color:'red' }}  />} label="Reprobado" variant="outlined" color='error' />
                    <Chip icon={<Help style={{ color:'#E3B90E' }}  />} label="No se presento" variant="outlined"  sx={{ borderColor:'#FFDE59', color:'#AB8A02'}} />
                    <Chip icon={<RunCircleRounded style={{ color:'grey' }}  />} label="Abandono" variant="outlined" color='default' />
                </Grid>

                <Grid display='flex' container spacing={2} sx={{ mt: 0 , borderRadius: '15px',boxShadow:'2px 2px 10px 0px #D0D0D0', padding:'0px',  backgroundColor:'#FCFDFD' }}>
                    <GraficoPastelClases />
                </Grid>
            </Grid>

        </DocenteLayout>
    );
};
