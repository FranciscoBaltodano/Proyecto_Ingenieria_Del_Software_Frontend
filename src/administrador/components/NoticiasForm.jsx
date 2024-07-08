import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

export const NoticiasForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);
  
  const onSubmit = data => console.log(data);
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file ? file.name : null);
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
          Agregar Entrada para la pagina de inicio
        </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField 
            label="Título" 
            variant="outlined" 
            fullWidth 
            {...register("Titulo", { required: 'El título es obligatorio' })}
            error={!!errors.Titulo}
            helperText={errors.Titulo?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            label="Descripción" 
            variant="outlined" 
            fullWidth 
            {...register("Descripcion")}
          />
        </Grid>
        <Grid item xs={12}>
          <input 
            {...register("Imagen")} 
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
              {selectedImage}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
          >
            Registrar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
