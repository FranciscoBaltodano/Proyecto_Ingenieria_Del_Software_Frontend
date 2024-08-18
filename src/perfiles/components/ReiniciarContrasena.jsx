import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, CircularProgress, Snackbar, Alert } from '@mui/material';

export const ReiniciarContrasena = ({ numeroCuenta }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset(); // Reinicia los campos del formulario al cerrar el modal
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const reiniciarContrasena = async (data) => {
    setIsLoading(true);
    try {
      const { contrasenaActual, nuevaContrasena } = data;
      console.log('Reiniciar Contraseña', data);
      const response = await axios.put(`/api/student/contrasena/${numeroCuenta}`, {
        contrasenaActual,
        nuevaContrasena,
      });
      console.log(response.data);
      setAlert({ open: true, message: 'Contraseña cambiada exitosamente', severity: 'success' });
      handleClose(); // Cierra el modal después de reiniciar la contraseña
    } catch (error) {
        console.log(error.response?.data);
        console.log(error);
        
        const errorMessage = error.response?.data?.error || 'Error al cambiar la contraseña';
        setAlert({ open: true, message: errorMessage, severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // Obtener el valor de la nueva contraseña para compararlo
  const nuevaContrasena = watch('nuevaContrasena');

  return (
    <>
      <Button sx={{ mb: 2 }} variant="contained" color="primary" onClick={handleOpen}>
        Reiniciar Contraseña
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cambiar Contraseña</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(reiniciarContrasena)}>
            <TextField
              label="Contraseña Actual"
              type="password"
              fullWidth
              margin="dense"
              {...register('contrasenaActual', { required: 'Este campo es obligatorio' })}
              error={!!errors.contrasenaActual}
              helperText={errors.contrasenaActual?.message}
              autoFocus
            />
            <TextField
              label="Nueva Contraseña"
              type="password"
              fullWidth
              margin="dense"
              {...register('nuevaContrasena', { required: 'Este campo es obligatorio' })}
              error={!!errors.nuevaContrasena}
              helperText={errors.nuevaContrasena?.message}
            />
            <TextField
              label="Confirmar Nueva Contraseña"
              type="password"
              fullWidth
              margin="dense"
              {...register('confirmarContrasena', { 
                required: 'Este campo es obligatorio',
                validate: value =>
                  value === nuevaContrasena || 'Las contraseñas no coinciden',
              })}
              error={!!errors.confirmarContrasena}
              helperText={errors.confirmarContrasena?.message}
            />
            {isLoading && <CircularProgress style={{ display: 'block', margin: '20px auto' }} />}
            <DialogActions>
              <Button variant='contained' type="submit" color="primary" disabled={isLoading}>
                Aceptar
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={alert.open}
        autoHideDuration={2000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity} variant="filled">
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};
