/**
 * 
 import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EstudianteLayout } from '../layout/EstudianteLayout';
import { Menu } from '../../components/Menu';
import { AddCircle, Cancel, Receipt, HourglassEmpty } from '@mui/icons-material';
import { Divider } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

export const MatriculaPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.numeroCuenta) {
      setLoading(false);
    }
  }, [user]);

  const handleAdicionarClick = async () => {
    if (!user || !user.numeroCuenta) {
      alert('No se pudo obtener el número de cuenta del estudiante. Por favor, inicia sesión nuevamente.');
      return;
    }
  
    try {
      console.log('Token:', user.token); // Verifica el token
      console.log('Número de cuenta:', user.numeroCuenta); // Verifica el número de cuenta
  
      const response = await axios.get(`/api/matricula/validar-adicion/${user.numeroCuenta}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
  
      console.log('Respuesta de la API:', response.data); // Verifica la respuesta
  
      if (response.data.puedeMatricular) {
        navigate('/estudiantes/matricula/adicionar');
      } else {
        alert(response.data.mensaje);
      }
    } catch (error) {
      console.error('Error al validar la matrícula:', error.response || error.message);
      if (error.response) {
        console.error('Respuesta del servidor:', error.response.data);
      }
      alert('Ocurrió un error al validar la matrícula. Por favor, intenta de nuevo más tarde.');
    }
  };
  
  const menuItems = [
    {
      text: 'Adicionar Asignatura',
      onClick: handleAdicionarClick,
      description: 'Añade una nueva asignatura al registro.',
      icon: <AddCircle sx={{ color: '#4CAF50' }} />
    },
    {
      text: 'Cancelar Asignatura',
      to: '/estudiantes/matricula/cancelar',
      description: 'Cancela una asignatura previamente registrada.',
      icon: <Cancel sx={{ color: '#F44336' }} />
    },
  ];

  const menu2Items = [
    {
      text: 'Forma03',
      to: '/estudiantes/matricula/forma03',
      description: 'Completa y envía el formulario Forma 03.',
      icon: <Receipt sx={{ color: '#03A9F4' }} />
    },
    {
      text: 'Lista de asignaturas en espera',
      to: '/estudiantes/matricula/listaEspera',
      description: 'Consulta la lista de asignaturas que tienes en espera.',
      icon: <HourglassEmpty sx={{ color: '#64B5F6' }} />
    },
  ];

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <EstudianteLayout titulo='Matricula'>
      <Menu menuItems={menuItems} />
      <Divider sx={{ margin: '2rem 0' }} />
      <Menu menuItems={menu2Items} />
    </EstudianteLayout>
  );
};
 */







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
