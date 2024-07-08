import React, { useState } from 'react';
import { AdministradorLayout } from '../layout/AdministradorLayout';
import { Box, Button, Typography, Divider } from '@mui/material';
import { NoticiasForm } from '../components/NoticiasForm';

export const NoticiasPage = () => {

  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(prevShowForm => !prevShowForm);
  };

  return (
    <AdministradorLayout>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestión de Noticias
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Button variant="contained" color="primary" onClick={handleToggleForm}>
          {showForm ? 'Cancelar' : 'Nueva Noticia'}
        </Button>
        {showForm && <NoticiasForm />}
      </Box>
    </AdministradorLayout>
  )
}
