import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Divider, Typography, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

import { useAuth } from '../../../../contexts/AuthContext';
import { GraficoBarras } from '../../components/GraficoBarras';
import { GraficoPastel } from '../../components/GraficoPastel';
import { DocenteLayout } from '../../../layout/DocenteLayout';
import { Info, School, People } from '@mui/icons-material'; // Importa iconos de Material-UI

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
            <Button variant="outlined" color="primary" onClick={handleBack}>
                Regresar
            </Button>

            <List>
                <ListItem>
                    <ListItemIcon>
                        <People />
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography variant="h6">Total Estudiantes:</Typography>}
                        secondary={<Typography variant="body1">{totalEstudiantes}</Typography>}
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <School />
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography variant="h6">Estudiantes en Departamento:</Typography>}
                        secondary={<Typography variant="body1">{departmentCount} en {userDepartment ? userDepartment.nombre : 'no encontrado'}</Typography>}
                    />
                </ListItem>
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

            <Box my={4}>
                <Typography variant="h5" gutterBottom>
                    Distribución de Estudiantes por Departamento en la Facultad
                </Typography>
                <Typography variant="body1" gutterBottom>
                Este gráfico de pastel muestra la distribución de estudiantes por departamento en la {userFaculty ? userFaculty.nombre : 'no disponible'}.                </Typography>
                <GraficoPastel data={data} user={user} />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box my={4}>
                <Typography variant="h5" gutterBottom>
                    Número de Estudiantes por Facultad
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Este gráfico de barras muestra la cantidad de estudiantes por cada facultad dentro de la universidad.
                </Typography>
                <GraficoBarras data={data} user={user} />
            </Box>
        </DocenteLayout>
    );
};
