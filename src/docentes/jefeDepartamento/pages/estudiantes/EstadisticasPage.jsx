import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Grid, Typography, Divider, Box } from '@mui/material';
import { DocenteLayout } from '../../../layout/DocenteLayout';
import { useNavigate } from 'react-router-dom';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';

const chartSetting = {
  yAxis: [
    {
      label: 'Número de estudiantes',
    },
  ],
  width: 800,
  height: 400,
  sx: {
    ['& .MuiChartsAxis-left .MuiChartsAxis-label']: {
      transform: 'translate(-20px, 0)',
    },
  },
};

export const EstadisticasPage = () => {
    const navigate = useNavigate();
    const [barChartData, setBarChartData] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);

    // Navega a la pantalla anterior
    const handleBack = () => {
        navigate('/jefeDepartamento/estudiantes');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/department-head/countStudents');
                const data = response.data.resultArray;

                // Prepara datos para el gráfico de barras
                const barData = data.flatMap(facultad => 
                    facultad.departamentos.map(departamento => ({
                        faculty: facultad.nombre,
                        department: departamento.nombre,
                        count: departamento.cantidad
                    }))
                );

                // Prepara datos para el gráfico de pastel
                const pieData = data.flatMap(facultad =>
                    facultad.departamentos.map(departamento => ({
                        id: departamento.id_Departamento,
                        value: departamento.cantidad,
                        label: departamento.nombre
                    }))
                );

                setBarChartData(barData);
                setPieChartData(pieData);
            } catch (error) {
                console.error("Error al traer los datos:", error);
            }
        };

        fetchData();
    }, []);

    const valueFormatter = (value) => `${value}`;

    return (
        <DocenteLayout titulo='Estadísticas'>
            <Button variant="outlined" color="primary" onClick={handleBack} sx={{ mb: 3 }}>
                Regresar
            </Button>
            
            <Typography variant="h4" component="h1" gutterBottom>
                Estadísticas
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h6" align="center" gutterBottom>
                        Gráficos
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h6" align="center" gutterBottom>
                        Gráfico de Barras
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <BarChart
                            dataset={barChartData}
                            xAxis={[{ scaleType: 'band', dataKey: 'department' }]}
                            series={[
                                { dataKey: 'count', label: 'Número de Estudiantes', valueFormatter }
                            ]}
                            {...chartSetting}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Divider variant="middle" sx={{ my: 4 }} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h6" align="center" gutterBottom>
                        Gráfico de Pastel
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <PieChart
                            series={[
                                {
                                    data: pieChartData,
                                },
                            ]}
                            width={800}
                            height={400}
                        />
                    </Box>
                </Grid>
            </Grid>
        </DocenteLayout>
    );
};
