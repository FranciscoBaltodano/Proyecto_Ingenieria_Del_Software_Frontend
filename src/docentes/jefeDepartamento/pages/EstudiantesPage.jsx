import React from 'react';
import { DocenteLayout } from '../../layout/DocenteLayout';
import { Menu } from '../../../components/Menu';
import { People, BarChart, History } from '@mui/icons-material';

const menuItems = [
  { text: 'Estudiantes Matriculados', to: '/jefeDepartamento/estudiantesMatriculados', description: 'Aquí verás a los estudiantes que se han matriculado', icon: <People sx={{ color: '#2E8B57' }} /> }, // SeaGreen
  { text: 'Estadísticas', to: '/jefeDepartamento/estadisticas', description: 'Estadísticas para la toma de decisiones', icon: <BarChart sx={{ color: '#3CB371' }} /> }, // MediumSeaGreen
  { text: 'Historiales', to: '/jefeDepartamento/historiales', description: 'Visualiza los historiales de los estudiantes', icon: <History sx={{ color: '#66CDAA' }} /> }, // MediumAquamarine
];

export const EstudiantesPage = () => {
  return (
    <DocenteLayout titulo='Estudiantes'>
      <Menu menuItems={menuItems} />
    </DocenteLayout>
  );
};
