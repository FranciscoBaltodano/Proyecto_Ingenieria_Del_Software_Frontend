import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Typography } from '@mui/material';

// Si necesitas usar pieArcLabelClasses, asegúrate de importarlo desde '@mui/x-charts'
import { pieArcLabelClasses } from '@mui/x-charts/PieChart';

export const GraficoPastel = ({ data, user }) => {
  const [departmentsInFaculty, setDepartmentsInFaculty] = useState([]);

  useEffect(() => {
    if (data.length > 0 && user.id_departamento) {
      // Encuentra la facultad a la que pertenece el usuario
      const userFaculty = data.find(faculty =>
        faculty.departamentos.some(department => department.id_Departamento === user.id_departamento)
      );

      if (userFaculty) {
        // Encuentra el ID de la facultad y los departamentos de la facultad
        const departments = userFaculty.departamentos;
        setDepartmentsInFaculty(departments);
      } else {
        console.log('Facultad del usuario no encontrada');
      }
    }
  }, [data, user.id_departamento]);

  // Transforma los datos de departamentos a un formato compatible con PieChart
  const pieChartData = departmentsInFaculty.map((department, index) => ({
    id: index,
    value: department.cantidad,
    label: department.nombre,
  }));

  return (
      <PieChart
        series={[
          {
            data: pieChartData,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          },
        ]}

        height={300}
      />
  );
};
