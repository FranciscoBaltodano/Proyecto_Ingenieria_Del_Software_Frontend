import React from 'react';
import { DocenteLayout } from '../../layout/DocenteLayout';
import { Menu } from '../../../components/Menu';
import { Grade, Assessment, VpnKey } from '@mui/icons-material';

export const DocentesPage = () => {
  const menuItems = [
    { text: 'Calificaciones Docentes', to: '/jefeDepartamento/calificaciones', description: 'Mira las calificaciones que han registrado los docentes', icon: <Grade sx={{ color: '#FFD700' }} /> }, // Tomato
    { text: 'Evaluaciones Docentes', to: '/jefeDepartamento/evaluaciones', description: 'Visualiza las evaluaciones que han recibido los docentes por los estudiantes', icon: <Assessment sx={{ color: '#FFA500' }} /> }, // Orange
    { text: 'Reinicio Clave', to: '/jefeDepartamento/reinicioClaves', description: 'Reinicia la clave de los docentes', icon: <VpnKey sx={{ color: '#FF6347' }} /> }, // Gold
  ];

  return (
    <DocenteLayout titulo='Docentes'>
      <Menu menuItems={menuItems} />
    </DocenteLayout>
  );
};
