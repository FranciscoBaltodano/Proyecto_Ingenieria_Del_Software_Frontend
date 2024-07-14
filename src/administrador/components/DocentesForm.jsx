import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, TextField, Typography, Radio, RadioGroup, FormControlLabel, Snackbar, Alert, Backdrop, CircularProgress, Checkbox } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export const DocentesForm = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset, 
   } = useForm();
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [errorRoles, setErrorRoles] = useState(false);
  const [centros, setCentros] = useState([]);

  useEffect(() => {
    const fetchCentros = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/centros');
        setCentros(response.data);
      } catch (error) {
        console.error('Error al obtener los centros:', error);
      }
    };
    fetchCentros(); 
  }, []);

  const onSubmit = async (formData) => {
    setLoading(true);

    //convertir roles a array
    const roles =[];

    if (formData.Docente) roles.push('Docente');
    if (formData.Coordinador) roles.push('Coordinador');
    if (formData.JefeDepartamento) roles.push('JefeDepartamento');

    //agregando roles 

   const dataToSend = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      identidad: formData.identidad,
      telefono: formData.telefono,
      correo: formData.correo,
      contrasena: formData.contrasena,
      roles: roles,
      id_Centros: formData.id_Centros,
    };



    try {
      const response = await axios.post('http://localhost:3000/api/admin/empleados', dataToSend);
      console.log('Respuesta del servidor:', response.data);

      if (response.status === 201) {
        setSnackbarMessage('Docente creado exitosamente');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        reset(); 
      } else {
        setSnackbarMessage('Error al crear el docente');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setSnackbarMessage('Error al crear el docente');
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
        Agregar Docente
      </Typography>

      <div>
        <FormControlLabel
          control={<Checkbox {...register("Docente")} defaultChecked />}
          label="Docente"
          sx={{ pointerEvents: 'none', opacity: 0.5 }} 
        />
        <FormControlLabel
          control={<Checkbox {...register("Coordinador")} />}
          label="Coordinador"
          disabled={watch('JefeDepartamento')}
        />
        <FormControlLabel
          control={<Checkbox {...register("JefeDepartamento")} />}
          label="Jefe de Departamento"
          disabled={watch('Coordinador')}
        />
      </div>

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
          
          <div>
            <label htmlFor="id_Centro" className="block font-medium">Centro Regional</label>
            <select
              id="id_Centro"
              {...register("id_Centros", { required: "El Cento es obligatorio" })}
              className="w-full p-2 border border-input rounded"
            >
              <option value="" disabled selected>Elige el centro</option>
              {centros.map(centro => (
                <option key={centro.id_Centros} value={centro.id_Centros}>{centro.Nombre}</option>
              ))}
            </select>
            {errors.id_Centro && <span className="text-red-500">{errors.id_Centro.message}</span>}
          </div>
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
