import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Grid, Tabs, Tab, Box } from '@mui/material';
import { GroupChat } from '../../chats/components/GroupChat';
import { ClasesLayout } from '../layout/ClasesLayout';
import { Forum } from '@mui/icons-material';

export const ClasePage = () => {
  const { id } = useParams();
  const [seccion, setSeccion] = useState({});
  const [tabIndex, setTabIndex] = useState(0); // Estado para la pestaña activa

  useEffect(() => {
    const fetchSeccion = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/matricula/seccion/${id}`);
        setSeccion(response.data);
      } catch (error) {
        console.error("Error fetching seccion:", error);
      }
    }
    fetchSeccion();
  }, [id]);

  const navigate = useNavigate();
  const onNavigateBack = () => {
    navigate(-1);
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <ClasesLayout>
      {/* <Button variant="text" onClick={onNavigateBack}>
        Regresar
      </Button>
       */}
      <Box sx={{ width: '100%', mb:'100px' }}>
        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Clase Page Tabs">
          <Tab label="Información" />
          <Tab label={<Forum/>} />
        </Tabs>
        <Box sx={{ padding: 2 }}>
          {tabIndex === 0 && <div>ClasePage</div>}
          {tabIndex === 1 && seccion.nombreChat && <GroupChat GUID={seccion.nombreChat} />}
        </Box>
      </Box>
    </ClasesLayout>
  );
};
