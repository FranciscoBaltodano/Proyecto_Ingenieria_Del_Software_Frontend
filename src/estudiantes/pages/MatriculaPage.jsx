

import { NavLink } from 'react-router-dom';

import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { EstudianteLayout } from '../layout/EstudianteLayout';
import { AddCircle, Cancel, Receipt, HourglassEmpty } from '@mui/icons-material';
import { Divider, Snackbar, Alert, Typography, Grid, Box, CircularProgress } from '@mui/material';

// Componente Menu

export const Menu = ({ menuItems = [], disabledItems = [], onDisabledItemClick }) => {
  return (
    <Box>
 <Grid container justifyContent="center" spacing={6}>
        {menuItems.map((item) => (
          <Grid item xs={12} md={6} xl={3} key={item.text}>
            <div 
              className={`card ${disabledItems.includes(item.text) ? 'disabled' : ''}`}
              onClick={(e) => {
                if (disabledItems.includes(item.text)) {
                  e.preventDefault(); // Evitar la acción predeterminada
                  if (onDisabledItemClick) {
                    onDisabledItemClick();
                  }
                }
              }}
            >
              {/* No redirigir si está deshabilitado */}
              <NavLink 
                to={item.to}
                style={{ textDecoration: 'none', pointerEvents: disabledItems.includes(item.text) ? 'none' : 'auto' }}
              >
                <div className="card-details">
                  {item.icon}
                  <p className="text-title">{item.text}</p>
                  <p className="text-body">{item.description}</p>
                </div>
              </NavLink>
            </div>
          </Grid>
        ))}
      </Grid>

      <style>{`
        .card {
          width: 100%;
          height: 280px;
          border-radius: 20px;
          position: relative;
          padding: 1.5rem;
          border: 2px solid #c3c6ce;
          background-color: white;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          margin: auto;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border: 1px solid #e0e0e0;
          transition: border-color 2s ease;
        }

        .card.disabled {
          opacity: 0.5;
        }

        .card-details {
          color: black;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 0.5em;
        }

        .card-details svg {
          width: 50px; 
          height: 50px;
          margin-bottom: 0.5rem;
        }

        .text-body {
          color: rgb(134, 134, 134);
        }

        .text-title {
          font-size: 1.5em;
          font-weight: bold;
        }

        .card:hover {
          border-color: #008bf8;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.2);
          transform: scale(1.05);
        }

        .card:hover .text-title {
          color: #008bf8;
          transition: color 0.3s ease;
        }
      `}</style>
    </Box>
  );
};









export const MatriculaPage = () => {
  const navigate = useNavigate();
  const { user: { numeroCuenta } } = useAuth();
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'
  const [puedeMatricular, setPuedeMatricular] = useState(true);

  // Función para obtener la información de la API
  const fetchMatriculaData = async () => {
    console.log('Número de cuenta:', numeroCuenta);

    try {
      const response = await axios.get(`/api/matricula/validar-adicion/${numeroCuenta}`);
      console.log('Data de matrícula:', response.data);
      
      // Configurar el Snackbar en función de la respuesta
      if (response.data.puedeMatricular) {
        setSnackbarMessage(response.data.mensaje);
        setSnackbarSeverity('success');
        setPuedeMatricular(true);
      } else {
        setSnackbarMessage(response.data.mensaje);
        setSnackbarSeverity('error');
        setPuedeMatricular(false);
      }
      setSnackbarOpen(true); // Mostrar Snackbar
    } catch (error) {
      console.error('Error al obtener datos de matrícula:', error);

      setSnackbarMessage('Error al obtener datos de matrícula.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true); // Mostrar Snackbar
    } finally {
      setLoading(false);
    }
  };

  // Usar useEffect para llamar a la función fetchMatriculaData cuando el componente se monte
  useEffect(() => {
    console.log('Número de cuenta:', numeroCuenta);
    fetchMatriculaData(); // Llama a la función para obtener datos
  }, [numeroCuenta]); // Dependencia de numeroCuenta

  // Función para manejar el cierre del Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Maneja el clic en un elemento deshabilitado
  const handleDisabledItemClick = () => {
    setSnackbarOpen(true);
  };

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
      description: 'Cancela una asignatura registrada.',
      icon: <Cancel sx={{ color: '#F44336' }} /> // Rojo
    },
  ];

  const menu2Items = [
    {
      text: 'Forma03',
      to: '/estudiantes/matricula/forma03',
      description: 'Revisa tus clases matriculadas oficialmente.',
      icon: <Receipt sx={{ color: '#03A9F4' }} /> // Azul claro
    },
    {
      text: 'Lista de asignaturas en espera',
      to: '/estudiantes/matricula/listaEspera',
      description: 'Consulta la lista de asignaturas que tienes en espera.',
      icon: <HourglassEmpty sx={{ color: '#64B5F6' }} /> // Azul más claro
    },
  ];

  // Items deshabilitados
  const disabledItems = menuItems.filter(item => !puedeMatricular).map(item => item.text);

  return (
    <EstudianteLayout titulo='Matricula'>
      {loading ?
        <Grid container justifyContent='center'>
          <CircularProgress sx={{ margin: '2rem' }} />
        </Grid>
       :
        <Menu menuItems={menuItems} disabledItems={disabledItems} onDisabledItemClick={handleDisabledItemClick} />
      }
      <Divider sx={{ margin: '2rem 0' }} />
      <Menu menuItems={menu2Items} />
    
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert variant='filled' onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </EstudianteLayout>
  );
};