import { useState } from 'react';
import { AdministradorLayout } from '../layout/AdministradorLayout';
import { Box, Button, Typography, Divider } from '@mui/material';
import { DocentesForm } from '../components/DocentesForm';
import DataTable from '../../components/DataTable';

export const DocentesPage = () => {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(prevShowForm => !prevShowForm);
  };

  return (
    <AdministradorLayout>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestión de Docentes
        </Typography>

        <Divider sx={{ marginBottom: 2 }} />
        
        <Button variant="contained" color="primary" onClick={handleToggleForm}>
          {showForm ? 'Cancelar' : 'Nuevo Docente'}
        </Button>
        
        {showForm && <DocentesForm />}

        <Box sx={{ marginTop: 2 }}>
         <DataTable url='/api/admin/empleados' name='Datos Empleados' />
        </Box>
    </AdministradorLayout>
  );
};
