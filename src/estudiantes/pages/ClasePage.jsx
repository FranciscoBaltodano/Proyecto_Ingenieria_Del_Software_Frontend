import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Grid, Tabs, Tab, Box, Typography } from '@mui/material';
import { GroupChat } from '../../chats/components/GroupChat';
import { ClasesLayout } from '../layout/ClasesLayout';
import { AssignmentInd, Forum } from '@mui/icons-material';
import { DocentePerfil } from '../components/DocentePerfil';

export const ClasePage = () => {
  const { id } = useParams();
  const [seccion, setSeccion] = useState({});
  const [tabIndex, setTabIndex] = useState(0); // Estado para la pestaña activa
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeccion = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/matricula/seccion/${id}`);
        setSeccion(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error("Error fetching seccion:", error);
      }
    }
    fetchSeccion();
  }, [id]);

  const onNavigateBack = () => {
    navigate(-1);
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <ClasesLayout titulo={ seccion?.Asignaturas?.nombre || 'Mis Clases' }>
      {/* <Button variant="text" onClick={onNavigateBack}>
        Regresar
      </Button>
       */}

      <Box sx={{ width: '100%', mb:'100px' }}>
        <Typography variant='body2' sx={{ textAlign:'center', mb:'20px' }}>{JSON.stringify( seccion.id_Docentes )}</Typography>
        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Clase Page Tabs">
          <Tab label={seccion?.codigoAsignatura ? seccion?.codigoAsignatura : 'Información' } />
          <Tab label={<div>Chat <Forum fontSize='small' /></div>} />
          <Tab label={<div>Docente <AssignmentInd fontSize='small' /></div>} />
        </Tabs>
        <Box sx={{ padding: 2 }}>
          {tabIndex === 1 && seccion.nombreChat && 
            (
              <Grid container justifyContent='center' height='75vh' sx={{ backgroundColor:'red',  borderRadius: '15px',boxShadow:'2px 2px 10px 0px #D0D0D0', padding:'0px', pt:'20px', backgroundColor:'#FCFDFD'}}>
                <GroupChat GUID={seccion.nombreChat} />
              </Grid>
            )
          }
          {tabIndex === 0 && (
            <div>
             {/* <div>{JSON.stringify(seccion)}</div> */}
              {seccion.urlVideo && (
                <iframe 
                width="560" 
                height="315" 
                src={seccion.urlVideo} 
                frameBorder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                ></iframe>
              )}
            </div>
          )}
          {tabIndex === 2 && (
            <DocentePerfil id_Usuario={seccion.id_Docentes} />
          )}
        </Box>
      </Box>
    </ClasesLayout>
  );
};
