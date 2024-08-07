import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Grid, Typography } from '@mui/material';

export const GraficoBarras = ({ data, user }) => {
  const transformData = (data) => {
    const faculties = data.map(facultad => `${facultad.nombre}: ${facultad.cantidad}`);
    const departmentNames = [...new Set(data.flatMap(facultad => facultad.departamentos.map(departamento => departamento.nombre)))];

    const series = departmentNames.map(departmentName => ({
      label: departmentName,
      data: data.map(facultad => {
        const dept = facultad.departamentos.find(departamento => departamento.nombre === departmentName);
        return dept ? dept.cantidad : null; // Devuelve null si no hay datos para el departamento
      }),
      stack: 'total',
    }));

    // Filtrar series para eliminar aquellas que no tienen datos
    const filteredSeries = series.filter(serie => serie.data.some(value => value !== null));

    return { series: filteredSeries, faculties };
  };

  const { series, faculties } = transformData(data);

  return (
    <>
        <BarChart
            series={series}
            height={500}
            xAxis={[{ data: faculties, scaleType: 'band' }]}
            margin={{ top: 100, bottom: 50, left: 40, right: 10 }}
            tooltip={{
            custom: (point, series) => {
                return series
                .map(s => ({
                    label: s.label,
                    value: s.data[point.index],
                    color: s.color,
                }))
                .filter(s => s.value !== null);
            },
            }}
        />

    </>
  );
};