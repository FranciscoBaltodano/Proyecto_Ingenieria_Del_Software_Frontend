import React, { useEffect, useState } from 'react';
import { EstudianteLayout } from '../../layout/EstudianteLayout';
import { Button, Grid, Card, CardContent, Typography, Box, Paper, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ClaseMatriculadas } from '../../components/ClaseMatriculadas';
import { useAuth } from '../../../contexts/AuthContext';
import axios from 'axios';

export const Forma03Page = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [estudianteInfo, setEstudianteInfo] = useState([]);
  const currentYear = new Date().getFullYear();


  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/student/perfil/${user.id}`);
        const data = response.data.data.estudiante[0];

        const estudianteInfo = [
          { titulo: 'Nombre', data:`${user.nombre} ${user.apellido}`},
          { titulo: 'Cuenta', data: user.numeroCuenta},
          { titulo: 'Año', data: currentYear},
          { titulo: 'Correo', data: data.correo_Institucional ? data.correo_Institucional : user.correo},
          { titulo: 'Centro', data: user.centro},
          { titulo: 'Departamento', data: user.departamento},
          { titulo: 'Índice Global', data: data.indice_global},
          { titulo: 'Índice del periodo', data: data.indice_periodo},
        ];

        setEstudianteInfo(estudianteInfo);

      } catch (error) {
        console.error(error);
      }
    };
    fetchPerfil();
  }, []);
  

  const handleBack = () => {
    navigate('/estudiantes/matricula');
  };


  return (
    <EstudianteLayout titulo='Forma 03'>
      <Button 
        variant="text" 
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
          padding: 20 ,
        }}
      >
        <Card style={{ width: '100%', maxWidth:'1000px' }}>
              <Grid container padding={2} spacing={3}>

                  <Grid xs={12} md={2}
                    item
                    padding={2}
                    ml={2}
                    mt={2} 
                    justifyContent="center"
                    sx={{
                      borderRadius: '15px',
                      boxShadow:'1px 1px 7px 0px #D0D0D0',
                      backgroundColor:'#FCFDFD',
                      display: { xs: 'flex' } 
                    }}
                  >
                    <Box
                      component="img" 
                      src={user.imagen} 
                      alt={`${user.nombre} ${user.apellido}`} 
                      sx={{ width: 150, height: 150, objectFit: 'cover', boxShadow: 2}} 
                      />

                  </Grid>

                <Grid item xs={12} md={5}>
                  {estudianteInfo.slice(0,4).map((info, index) => (
                    <Grid item mb={2} key={index}>
                      <Typography >
                        <strong style={{color:'#060270'}}>{info.titulo}: </strong>{info.data}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>

                <Divider orientation="vertical" flexItem />

                <Grid item xs={12} md={4}>
                  {estudianteInfo.slice(4,8).map((info, index) => (
                    <Grid item mb={2} key={index}>
                      <Typography>
                        <strong style={{color:'#060270'}}>{info.titulo}: </strong>{info.data}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
                
              </Grid>
        </Card>
      </Paper>

      <ClaseMatriculadas />

    </EstudianteLayout>
  );
};
