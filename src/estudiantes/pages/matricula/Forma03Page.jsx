import React, { useEffect, useState } from 'react';
import { EstudianteLayout } from '../../layout/EstudianteLayout';
import { Button, Grid, Card, CardContent, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ClaseMatriculadas } from '../../components/ClaseMatriculadas';
import { useAuth } from '../../../contexts/AuthContext';
import axios from 'axios';

export const Forma03Page = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [estudianteInfo, setEstudianteInfo] = useState();

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/student/perfil/${user.id}`);
        setEstudianteInfo(response.data.data.estudiante[0]);
        console.log('Perfil:', response.data.data.estudiante[0]);
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchPerfil();
  }, []);
  
  // Obtener el año actual
  const currentYear = new Date().getFullYear();

  const handleBack = () => {
    navigate('/estudiantes/matricula');
  };

  const obtenerIdEstudiante = async (id_user) => {
    try {
      const response = await axios.get(`/api/matricula/estudiante/${id_user}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data.id);
      return response.data.id;
      
    } catch (error) {
      console.error('Error fetching student ID:', error);
      throw error;
    }
  };

  // useEffect(() => {

  //   const obtenerEstudiante = async (userId) => {

  //     let { data: estudiante, error } = await supabase
  //     .from('estudiante')
  //     .select("*")
  //     .eq('column', 'Equal to')

  //     setEstudianteInfo(estudiante);
  //     console.log(estudiante);
      
  //   };

  //   obtenerEstudiante(user.id);
  // }, []);
  

  return (
    <EstudianteLayout titulo='Forma 03'>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleBack}
        style={{ marginBottom: 20 }}
      >
        Regresar
      </Button>

      <Paper 
        style={{ 
          width: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          padding: 20 
        }}
      >
        <Card style={{ width: '100%', maxWidth:'1000px' }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Box 
                  component="img" 
                  src={user.imagen} 
                  alt={`${user.nombre} ${user.apellido}`} 
                  sx={{ width: 150, height: 150, objectFit: 'cover', boxShadow: 2 }} 
                />
              </Grid>
              <Grid item xs={12} md={9}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Typography variant="body1">
                          <strong>Nombre: </strong>{user.nombre} {user.apellido}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">
                          <strong>Cuenta: </strong>{user.numeroCuenta}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">
                          <strong>Año: </strong>{currentYear}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">
                          <strong>Correo: </strong>{estudianteInfo.correo_Institucional}
                        </Typography>
                      </Grid>
                      
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Typography variant="body1">
                          <strong>Centro: </strong>{user.centro}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">
                          <strong>Departamento: </strong>{user.departamento}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">
                          <strong>Índice Global: </strong>{estudianteInfo.indice_global}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">
                          <strong>Índice del periodo: </strong>{estudianteInfo.indice_periodo}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Paper>

      <ClaseMatriculadas />
    </EstudianteLayout>
  );
};
