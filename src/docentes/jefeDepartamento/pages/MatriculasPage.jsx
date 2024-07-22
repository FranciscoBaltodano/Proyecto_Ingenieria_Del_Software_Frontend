import React from 'react';
import { DocenteLayout } from '../../layout/DocenteLayout';
import { Menu } from '../../../components/Menu';
import { Add, Build, Business, ListAlt } from '@mui/icons-material';

export const MatriculasPage = () => {
  const menuItems = [
    { text: 'Registrar Sección', to: '/jefeDepartamento/registrarSeccion', description: 'Registra nuevas secciones para tu departamento', icon: <Add sx={{ color: '#00BFFF' }} /> }, // DeepSkyBlue
    { text: 'Configurar Secciones', to: '/jefeDepartamento/configurarSecciones', description: 'Configura las secciones de tu departamento', icon: <Build sx={{ color: '#4682B4' }} /> }, // SteelBlue
    { text: 'Infraestructura', to: '/jefeDepartamento/infraestructura', description: 'Maneja y controla la infraestructura', icon: <Business sx={{ color: '#5F9EA0' }} /> }, // CadetBlue
    { text: 'Lista de Espera', to: '/jefeDepartamento/listaDeEspera', description: 'Revisa las listas de espera de las secciones', icon: <ListAlt sx={{ color: '#6495ED' }} /> }, // CornflowerBlue
  ];

  return (
    <DocenteLayout titulo='Matriculas'>
      <Menu menuItems={menuItems} />
    </DocenteLayout>
  );
};
