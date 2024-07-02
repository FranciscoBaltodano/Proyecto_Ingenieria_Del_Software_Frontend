import React from 'react';
import { Button, FormControl, Grid, TextField } from "@mui/material";
import { useForm } from 'react-hook-form';
import { Link,  useNavigate} from "react-router-dom";

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  
  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Error en la autenticación');
      }
      
      const result = await response.json();
      console.log(result);
      
      // Guardar el token en localStorage
      localStorage.setItem('token', result.token);
      
      // Redirigir basado en los roles
      handleRedirect(result.user.roles);
    } catch (error) {
      console.error('Error:', error);
      // Aquí puedes manejar los errores, por ejemplo, mostrando un mensaje al usuario
    }
  };

  const handleRedirect = (roles) => {
    if (roles.includes('administrador')) {
      navigate('/admin');
    } else if (roles.includes('jefe_departamento')) {
      navigate('/jefe-departamento');
    } else if (roles.includes('coordinador')) {
      navigate('/coordinador');
    } else if (roles.includes('docente')) {
      navigate('/docente');
    } else if (roles.includes('estudiante')) {
      navigate('/estudiante');
    } else {
      // Ruta por defecto si no se reconoce el rol
      navigate('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <FormControl fullWidth margin="normal" sx={{gap: '20px'}}>
          <TextField 
            error={!!errors.identifier} 
            helperText={errors.identifier ? errors.identifier.message : ''}
            {...register('identifier', { required: 'El campo es requerido' })}
            id="identifier" 
            name="identifier"
            type="text"
            placeholder="Ingrese su número de cuenta o empleado"
            label="Número de cuenta o empleado"
            variant="outlined"
          />
          <TextField 
            error={!!errors.contrasena}
            helperText={errors.contrasena ? errors.contrasena.message : ''}
            {...register('contrasena', { required: 'La contraseña es requerida' })}
            id="contrasena"
            name="contrasena"
            type="password"
            placeholder="Ingrese la contraseña"
            label="Contraseña"
            variant="outlined"
          />
        </FormControl>
        <Grid item xs={12} display='flex' flexDirection='column' alignItems='end' sx={{ marginTop: 2 }}>
          <Button variant='text' component={Link} to='/login/recuperar' sx={{ fontSize:'9px', color:'grey'}}>
            ¿Olvidó su nombre de usuario o contraseña?
          </Button>
          <Button variant="contained" color="primary" type="submit" sx={{ width: '100%'}}>
            Acceder
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};