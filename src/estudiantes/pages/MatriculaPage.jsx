import React from 'react';
import { EstudianteLayout } from '../layout/EstudianteLayout';
import { Menu } from '../../components/Menu';
import { AddCircle, Cancel, Receipt, ListAlt, HourglassEmpty } from '@mui/icons-material';
import { Divider } from '@mui/material';

export const MatriculaPage = () => {
  const menuItems = [
    {
      text: 'Adicionar Asignatura',
      to: '/estudiantes/matricula/adicionar',
      description: 'Añade una nueva asignatura al registro.',
      icon: <AddCircle sx={{ color: '#4CAF50' }} /> // Verde
    },
    {
      text: 'Cancelar Asignatura',
      to: '/estudiantes/matricula/cancelar',
      description: 'Cancela una asignatura previamente registrada.',
      icon: <Cancel sx={{ color: '#F44336' }} /> // Rojo
    },

  ];

  const menu2Items = [
    {
      text: 'Forma03',
      to: '/estudiantes/matricula/forma03',
      description: 'Completa y envía el formulario Forma 03.',
      icon: <Receipt sx={{ color: '#03A9F4' }} /> // Azul claro
    },
    // {
    //   text: 'Lista de Asignaturas Canceladas',
    //   to: '/estudiantes/matricula/listaCaceladas',
    //   description: 'Consulta la lista de asignaturas que has cancelado.',
    //   icon: <ListAlt sx={{ color: '#2196F3' }} /> // Azul medio
    // },
    {
      text: 'Lista de asignaturas en espera',
      to: '/estudiantes/matricula/listaEspera',
      description: 'Consulta la lista de asignaturas que tienes en espera.',
      icon: <HourglassEmpty sx={{ color: '#64B5F6' }} /> // Azul más claro
    },
  ];


  return (
    <EstudianteLayout titulo='Matricula'>
      <Menu menuItems={menuItems} />
      <Divider sx={{ margin: '2rem 0' }} />
      <Menu menuItems={menu2Items} />
    </EstudianteLayout>
  );
};
