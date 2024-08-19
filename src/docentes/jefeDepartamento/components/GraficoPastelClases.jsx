import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Chip, CircularProgress, Grid } from '@mui/material';
import { Square } from '@mui/icons-material';

export const GraficoPastelClases = () => {

    const {user:{id_departamento}} = useAuth();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const pieParams = { height: 200, margin: { right: 5 } };


    const dataPrueba = [
        {
            "clase": "Introducción a la Ingeniería en Sistemas",
            "codigo": "IS-110",
            "RPB": 10,
            "APB": 20,
            "ADB": 5,
            "NSP": 6
        },
        {
            "clase": "Programación II",
            "codigo": "IS-210",
            "RPB": 1,
            "APB": 2,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Circuitos Eléctricos para Ingenieria en Sistemas",
            "codigo": "IS-311",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Algoritmos y Estructura de Datos",
            "codigo": "IS-310",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Programación Orientada a Objetos",
            "codigo": "IS-410",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Electrónica para Ing. en Sistemas",
            "codigo": "IS-411",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Sistemas Operativos I",
            "codigo": "IS-412",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Base de Datos I",
            "codigo": "IS-501",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Historia de Honduras",
            "codigo": "HH-101",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Instalaciones Eléctricas",
            "codigo": "IS-510",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Redes de Datos I",
            "codigo": "IS-511",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Sistemas Operativos II",
            "codigo": "IS-512",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Base de Datos II",
            "codigo": "IS-601",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Arquitectura de Computadoras",
            "codigo": "IS-603",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Lenguajes de Programación I",
            "codigo": "IS-513",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Redes de Datos II",
            "codigo": "IS-611",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Diseño Digital",
            "codigo": "IS-711",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Sistema de Información",
            "codigo": "IS-602",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Seguridad Informática",
            "codigo": "IS-811",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Administración I",
            "codigo": "IS-720",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Análisis y Diseño de Sistemas",
            "codigo": "IS-702",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Contabilidad I",
            "codigo": "IS-721",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Auditoría Informática",
            "codigo": "IS-903",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Inteligencia Artificial",
            "codigo": "IS-701",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Ingeniería del Software",
            "codigo": "IS-802",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Finanzas Administrativas",
            "codigo": "IS-820",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Industria del Software",
            "codigo": "IS-902",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Gerencia Informática",
            "codigo": "IS-904",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Tópicos Especiales y Avanzados",
            "codigo": "IS-906",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Economía Digital",
            "codigo": "IS-905",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Seminario de Investigación",
            "codigo": "IS-115",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Teoría de la Simulación",
            "codigo": "IS-910",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Microprocesadores",
            "codigo": "IS-911",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Liderazgo para el cambio",
            "codigo": "IS-914",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Sistemas Expertos",
            "codigo": "IS-912",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        },
        {
            "clase": "Diseño de Compiladores",
            "codigo": "IS-913",
            "RPB": 0,
            "APB": 0,
            "ADB": 0,
            "NSP": 0
        }
    ]

    useEffect(() => {
        const fetchEstadisticas = async() => {
            try {
                const response = await axios.get(`/api/department-head/estadisticas/${id_departamento}`);
                const { estadisticas} = response.data.data;
                console.log(estadisticas);
                setData(estadisticas);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchEstadisticas()
    }, [id_departamento])
    

    const calculatePercentages = (clase) => {
        const total = clase.RPB + clase.APB + clase.ADB + clase.NSP;
        return {
            RPB: (clase.RPB / total) * 100 || 0,
            APB: (clase.APB / total) * 100 || 0,
            ADB: (clase.ADB / total) * 100 || 0,
            NSP: (clase.NSP / total) * 100 || 0
        };
    };

  return (
    <>
        {loading ? 
            <Grid container display='flex' justifyContent='center' alignItems='center' minHeight='20vh'>
                <CircularProgress/> 
            </Grid>
        :
        (
            <Grid display='flex' container spacing={0} >
                { dataPrueba.map((clase, index) => {
                    // {data.map((clase, index) => {
                    const percentages = calculatePercentages(clase);
                    const roundedPercentages = {
                        RPB: Math.round(percentages.RPB),
                        APB: Math.round(percentages.APB),
                        ADB: Math.round(percentages.ADB),
                        NSP: Math.round(percentages.NSP)
                    };
                    const maxPercentage = Math.max(roundedPercentages.RPB, roundedPercentages.APB, roundedPercentages.ADB, roundedPercentages.NSP);
            
                    return (
                        <Grid key={index} display='flex' item xs={12} sm={6} lg={3} sx={{ padding: '25px' }}>
                            <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' flexGrow={1} sx={{ boxShadow: '2px 2px 10px 0px #D0D0D0', padding: '20px', backgroundColor: '#FCFDFD', borderRadius: '15px' }}>
                                <PieChart
                                    series={[
                                        {
                                            innerRadius: 65,
                                            cornerRadius: 7,
                                            data: [
                                                { value: (!clase.APB && !clase.NSP && !clase.RPB) && 1, color: '#EBEAEA' },
                                                { value: roundedPercentages.RPB, color: 'red', label: `${roundedPercentages.RPB}%` },
                                                { value: roundedPercentages.APB, color: 'green', label: `${roundedPercentages.APB}%` },
                                                { value: roundedPercentages.ADB, color: 'grey', label: `${roundedPercentages.ADB}%` },
                                                { value: roundedPercentages.NSP, color: '#F5E108', label: `${roundedPercentages.NSP}%` }
                                            ],
                                            highlightScope: { faded: 'global', highlighted: 'item' },
                                            faded: { innerRadius: 50, additionalRadius: -10, color: 'gray' },
                                        }]}
                                    {...pieParams}
                                />
                                
                                <Typography>{clase.clase}</Typography>
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>
        )
        }
    </>
  )
}
