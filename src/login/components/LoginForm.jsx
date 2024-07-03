import { useState } from 'react';
import { Button, FormControl, Grid, TextField, Select, MenuItem, Alert } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const LoginForm = () => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm();
  const [userType, setUserType] = useState('estudiante');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleRedirect = (roles) => {
    if (roles.includes('Administrador')) {
      navigate('/admin');
    } else if (roles.includes('Docente')) {
      navigate('/docentes');
    } else if (roles.includes('Coordinador')) {
      navigate('/coordinadores');
    } else if (roles.includes('JefeDepartamento')) {
      navigate('/jefedepartamento');
    } else if (roles.includes('Estudiante')) {
      navigate('/estudiantes');
    } else {
      navigate('/');
    }
  };

  const onSubmit = async (data) => {
    setLoginError('');  // Resetear el mensaje de error
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [userType === 'empleado' ? 'numeroEmpleado' : 'numeroCuenta']: data.identifier,
          contrasena: data.contrasena
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la autenticación');
      }

      const result = await response.json();
      console.log('Resultado del login:', result);

      // Guardar el token en localStorage
      login({ token: result.token, roles: result.user.roles });
      localStorage.setItem('token', result.token);

      // Redirigir basado en los roles
      handleRedirect(result.user.roles);
    } catch (error) {
      console.error('Error:', error.message);
      setLoginError('Acceso inválido. Por favor, inténtelo otra vez.');
    }
  };

  const handleUserTypeChange = (newValue) => {
    setUserType(newValue);
    reset({ identifier: '', contrasena: '' });  // Limpiar los valores de identifier y contrasena
    setLoginError('');  // Limpiar también el mensaje de error
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Select
                value={userType}
                onChange={(e) => handleUserTypeChange(e.target.value)}
              >
                <MenuItem value="estudiante">Estudiante</MenuItem>
                <MenuItem value="empleado">Empleado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="identifier"
              control={control}
              rules={{
                required: 'Este campo es requerido',
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  key={userType}  // Asegura que se reinicie cuando cambie el userType
                  fullWidth
                  label={userType === 'empleado' ? 'Número de Empleado' : 'Número de Cuenta'}
                  error={!!errors.identifier}
                  helperText={errors.identifier?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="contrasena"
              control={control}
              rules={{
                required: 'La contraseña es requerida',
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  key={userType}  // Asegura que se reinicie cuando cambie el userType
                  fullWidth
                  type="password"
                  label="Contraseña"
                  error={!!errors.contrasena}
                  helperText={errors.contrasena?.message}
                />
              )}
            />
          </Grid>
          {loginError && (
            <Grid item xs={12}>
              <Alert severity="error">
                {loginError}
              </Alert>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Iniciar Sesión
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
