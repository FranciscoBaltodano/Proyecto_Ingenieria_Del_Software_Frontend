import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography, Radio, RadioGroup, FormControlLabel, Snackbar, Alert, Backdrop, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export const DocentesForm = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/admin/empleados', formData);
      console.log('Respuesta del servidor:', response.data);

      if (response.status === 201) {
        setSnackbarMessage('Docente creado exitosamente');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        reset(); 
      } else {
        setSnackbarMessage('Error al MEADOS el docente');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setSnackbarMessage('Error al PUTA el docente');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit(onSubmit)} 
      sx={{ 
        maxWidth: '800px', 
        margin: 'auto', 
        padding: 2, 
        backgroundColor: 'white', 
        borderRadius: 2, 
        boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom >
        Agregar {watch('roles') === 'Coordinador' ? 'Coordinador' : watch('roles') === 'JefeDepartamento' ? 'Jefe de Departamento' : 'Docente'}
      </Typography>

      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="roles"
        defaultValue="Docente"
      >
        <FormControlLabel value="Docente" control={<Radio />} label="Docente" {...register("roles", { required: true })}/>
        <FormControlLabel value="Coordinador" control={<Radio />} label="Coordinador" {...register("roles", { required: true })}/>
        <FormControlLabel value="JefeDepartamento" control={<Radio />} label="Jefe de Departamento" {...register("roles", { required: true })}/>
      </RadioGroup>

      <Grid container spacing={2}>
        <Grid item xs={12} >
          <TextField 
            label="Nombre" 
            variant="outlined" 
            fullWidth 
            {...register("nombre", { required: 'El nombre es obligatorio' })}
            error={!!errors.nombre}
            helperText={errors.nombre?.message}
          />
        </Grid>

        <Grid item xs={12} >
          <TextField 
            label="Apellido" 
            variant="outlined" 
            fullWidth 
            {...register("apellido", { required: 'El apellido es obligatorio' })}
            error={!!errors.apellido}
            helperText={errors.apellido?.message}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField 
              label="Identidad" 
              variant="outlined" 
              placeholder="Sin guiones ni espacios (ej. 0801199901234)"
              fullWidth 
              {...register("identidad", { 
                  required: 'La identidad es obligatoria', 
                  maxLength: { value: 13, message: 'Máximo 13 caracteres' },
                  pattern: { 
                  value: /^[0-9]{13}$/, 
                  message: 'La identidad debe contener solo 13 dígitos, sin guiones ni espacios' 
                  }
              })}
              error={!!errors.identidad}
              helperText={errors.identidad?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField 
            label="Teléfono" 
            variant="outlined" 
            fullWidth 
            {...register("telefono")}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField 
            label="Correo" 
            type="email" 
            variant="outlined" 
            fullWidth 
            {...register("correo", { required: 'El correo es obligatorio' })}
            error={!!errors.correo}
            helperText={errors.correo?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            label="Contraseña" 
            type="password" 
            variant="outlined" 
            fullWidth 
            {...register("contrasena", { required: 'La contraseña es obligatoria' })}
            error={!!errors.contrasena}
            helperText={errors.contrasena?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            label="Confirmar contraseña" 
            type="password" 
            variant="outlined" 
            fullWidth 
            {...register("confirmarContrasena", { 
              required: 'La confirmación de contraseña es obligatoria', 
              validate: value => value === watch('contrasena') || 'Las contraseñas no coinciden' 
            })}
            error={!!errors.confirmarContrasena}
            helperText={errors.confirmarContrasena?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            disabled={loading}
          >
            Registrar
          </Button>
        </Grid>
      </Grid>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} variant='filled' severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit"/>
      </Backdrop>
    </Box>
  );
};
