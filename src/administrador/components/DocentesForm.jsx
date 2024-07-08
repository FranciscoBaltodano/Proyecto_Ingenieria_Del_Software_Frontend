import React from 'react';
import { AdministradorLayout } from '../layout/AdministradorLayout';
import { useForm } from 'react-hook-form';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

export const DocentesForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  const password = watch('Contrasena');
 
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

        <Grid container spacing={2}>
          <Grid item xs={12} >
            <TextField 
              label="Nombre" 
              variant="outlined" 
              fullWidth 
              {...register("Nombre", { required: 'El nombre es obligatorio' })}
              error={!!errors.Nombre}
              helperText={errors.Nombre?.message}
            />
          </Grid>
          <Grid item xs={12} >
            <TextField 
              label="Apellido" 
              variant="outlined" 
              fullWidth 
              {...register("Apellido", { required: 'El apellido es obligatorio' })}
              error={!!errors.Apellido}
              helperText={errors.Apellido?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
                label="Identidad" 
                variant="outlined" 
                placeholder="Sin guiones ni espacios (ej. 0801199901234)"
                fullWidth 
                {...register("Identidad", { 
                    required: 'La identidad es obligatoria', 
                    maxLength: { value: 13, message: 'Máximo 13 caracteres' },
                    pattern: { 
                    value: /^[0-9]{13}$/, 
                    message: 'La identidad debe contener solo 13 dígitos, sin guiones ni espacios' 
                    }
                })}
                error={!!errors.Identidad}
                helperText={errors.Identidad?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Teléfono" 
              variant="outlined" 
              fullWidth 
              {...register("Telefono")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label="Correo" 
              type="email" 
              variant="outlined" 
              fullWidth 
              {...register("Correo", { required: 'El correo es obligatorio' })}
              error={!!errors.Correo}
              helperText={errors.Correo?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label="Contraseña" 
              type="password" 
              variant="outlined" 
              fullWidth 
              {...register("Contrasena", { required: 'La contraseña es obligatoria' })}
              error={!!errors.Contrasena}
              helperText={errors.Contrasena?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label="Confirmar contraseña" 
              type="password" 
              variant="outlined" 
              fullWidth 
              {...register("ConfirmarContrasena", { 
                required: 'La confirmación de contraseña es obligatoria', 
                validate: value => value === password || 'Las contraseñas no coinciden' 
              })}
              error={!!errors.ConfirmarContrasena}
              helperText={errors.ConfirmarContrasena?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
            >
              Registrar
            </Button>
          </Grid>
        </Grid>
      </Box>
  );
};
