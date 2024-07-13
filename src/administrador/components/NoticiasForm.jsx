
import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography, Snackbar, Alert, Backdrop, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export const NoticiasForm = () => {
  const { register, reset, handleSubmit, formState: { errors } } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loading, setLoading] = useState(false);
  const onSubmit = async (noticiadData) => {
    setLoading(true);
    const formData = new FormData();
    Object.keys(noticiadData).forEach((key) => {
      formData.append(key, noticiadData[key]);
    });
    if (selectedImage) {
      formData.append('imagen', selectedImage);
    }
    try {
      const res = await axios.post('http://localhost:3000/api/admin/noticias', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSnackbarMessage('Noticia creada exitosamente');
      setSnackbarSeverity('success');
      reset();
      setSelectedImage(null);
      document.getElementById('upload-image').value = null;
    } catch (error) {
      setSnackbarMessage('Error al crear la noticia');
      setSnackbarSeverity('error');
      console.error('Error al enviar el formulario:', error);
    } finally {
      setLoading(false);
      setOpen(true);
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
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
        Agregar Entrada para la página de inicio
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField 
            label="Título" 
            variant="outlined" 
            fullWidth 
            {...register("titulo", { required: 'El título es obligatorio' })}
            error={!!errors.titulo}
            helperText={errors.titulo?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            label="Descripción" 
            variant="outlined" 
            fullWidth 
            {...register("descripcion")}
          />
        </Grid>
        <Grid item xs={12}>
          <input 
            {...register("imagen")} 
            type="file" 
            accept="image/*"
            style={{ display: 'none' }}
            id="upload-image"
            onChange={handleImageChange}
          />
          <label htmlFor="upload-image">
            <Button 
              variant="outlined" 
              color="primary" 
              component="span"
            >
              Subir Imagen
            </Button>
          </label>
          {selectedImage && (
            <Typography variant="body2" sx={{ marginLeft: 2, display: 'inline' }}>
              {selectedImage.name}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={loading}
          >
            Registrar
          </Button>
        </Grid>
      </Grid>
       <Snackbar 
       open={open} 
       autoHideDuration={2000} 
       onClose={handleClose}
       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
       >
       <Alert onClose={handleClose} variant='filled' severity={snackbarSeverity} sx={{ width: '100%' }}>
         {snackbarMessage}
       </Alert>
       </Snackbar>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit"/>
      </Backdrop>
    </Box>
  );
}