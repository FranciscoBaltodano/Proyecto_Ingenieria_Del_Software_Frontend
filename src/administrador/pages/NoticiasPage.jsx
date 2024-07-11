import React, { useState } from 'react';
import { AdministradorLayout } from '../layout/AdministradorLayout';
import { Box, Button, Typography, Divider } from '@mui/material';
import { NoticiasForm } from '../components/NoticiasForm';
import DataTable from '../../components/DataTable';

export const NoticiasPage = () => {

  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(prevShowForm => !prevShowForm);
  };

  return (
    <AdministradorLayout>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestión de Noticias
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Button variant="contained" color="primary" onClick={handleToggleForm}>
          {showForm ? 'Cancelar' : 'Nueva Noticia'}
        </Button>
        {showForm && <NoticiasForm />}

        <Box sx={{ marginTop: 2 }}>
          <DataTable url='http://localhost:3000/api/admin/noticias' name='Noticias' />
        </Box>
    </AdministradorLayout>
  )
}
