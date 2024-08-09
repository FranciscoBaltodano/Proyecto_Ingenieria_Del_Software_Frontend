import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Typography, Avatar, IconButton, Box, Button, TextField, Snackbar, Alert, Divider } from '@mui/material';
import { Edit, Save, Cancel, Send } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { FotoPerfil } from './components/FotoPerfil';
import './../index.css';

export const PerfilMainPage = () => {
  const { user } = useAuth();
  const [fotoPerfil, setFotoPerfil] = useState(user.imagen || '');
  const [avatar, setAvatar] = useState(user.imagen || null);
  const [gallery, setGallery] = useState([null, null, null]);
  const [formState, setFormState] = useState({
    Descripcion: '',
    Fotografia1: null,
    Fotografia2: null,
    Fotografia3: null
  });
  const [editingDescription, setEditingDescription] = useState(false);
  const [newDescription, setNewDescription] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Default severity

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/student/perfil/${user.id}`);
        const perfilData = response.data.data.Perfiles[0];
        setGallery([perfilData.Fotografia1, perfilData.Fotografia2, perfilData.Fotografia3]);
        setFormState({
          Descripcion: perfilData.Descripcion || '',
          Fotografia1: perfilData.Fotografia1,
          Fotografia2: perfilData.Fotografia2,
          Fotografia3: perfilData.Fotografia3
        });
        setNewDescription(perfilData.Descripcion || '');
      } catch (error) {
        showSnackbar('Error al obtener los datos del perfil', 'error');
      }
    };

    fetchPerfil();
  }, [user.id]);

  const updateProfile = async (updatedFormState) => {
    const formData = new FormData();
    formData.append('Descripcion', updatedFormState.Descripcion);
    if (updatedFormState.Fotografia1) formData.append('Fotografia1', updatedFormState.Fotografia1);
    if (updatedFormState.Fotografia2) formData.append('Fotografia2', updatedFormState.Fotografia2);
    if (updatedFormState.Fotografia3) formData.append('Fotografia3', updatedFormState.Fotografia3);

    try {
      await axios.put(`http://localhost:3000/api/student/perfil/${user.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      showSnackbar('Perfil actualizado correctamente', 'success');
      // Fetch updated profile data
      const response = await axios.get(`http://localhost:3000/api/student/perfil/${user.id}`);
      const updatedData = response.data.data.Perfiles[0];
      setGallery([updatedData.Fotografia1, updatedData.Fotografia2, updatedData.Fotografia3]);
      setFormState({
        Descripcion: updatedData.Descripcion,
        Fotografia1: updatedData.Fotografia1,
        Fotografia2: updatedData.Fotografia2,
        Fotografia3: updatedData.Fotografia3
      });
      setNewDescription(updatedData.Descripcion);
    } catch (error) {
      showSnackbar('Error al actualizar el perfil', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.files[0]
    });
  };

  const onDropAvatar = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const newAvatarURL = URL.createObjectURL(file);
    setAvatar(newAvatarURL);
    setFormState(prevState => ({
      ...prevState,
      Fotografia1: file
    }));
    // Immediately update the profile on the server
    updateProfile({
      ...formState,
      Fotografia1: file
    });
  }, [formState]);

  const onDropGallery = useCallback((acceptedFiles, index) => {
    const file = acceptedFiles[0];
    const newGallery = [...gallery];
    newGallery[index] = URL.createObjectURL(file);
    setGallery(newGallery);
    setFormState(prevState => ({
      ...prevState,
      [`Fotografia${index + 1}`]: file
    }));
    // Immediately update the profile on the server
    updateProfile({
      ...formState,
      [`Fotografia${index + 1}`]: file
    });
  }, [gallery, formState]);

  const { getRootProps: getRootPropsAvatar, getInputProps: getInputPropsAvatar } = useDropzone({ onDrop: onDropAvatar });
  const getRootPropsGallery = (index) => useDropzone({ onDrop: (acceptedFiles) => onDropGallery(acceptedFiles, index) }).getRootProps;
  const getInputPropsGallery = (index) => useDropzone({ onDrop: (acceptedFiles) => onDropGallery(acceptedFiles, index) }).getInputProps;

  const handleEditDescription = () => {
    setEditingDescription(true);
  };

  const handleSaveDescription = async () => {
    const updatedFormState = {
      ...formState,
      Descripcion: newDescription
    };
    await updateProfile(updatedFormState);
    setEditingDescription(false);
  };

  const handleCancelEdit = () => {
    setNewDescription(formState.Descripcion);
    setEditingDescription(false);
  };

  return (
    <Box sx={{ flexGrow: 1, borderRadius:'15px', padding:'30px' , width:'100%', boxShadow:'2px 2px 10px 0px #D0D0D0', backgroundColor:'#F9F9F9' }}>

      <Grid container>

        <Grid container mb='20px'>
          <Grid item xs={12} md={3} sx={{ mb: { xs: '20px', md:'0px' }, mr: { xs: '0px', md:'30px' } }} >
            <FotoPerfil />
          </Grid>

          <Grid display='flex' item xs={12} md={8.5} sx={{ borderRadius: '15px',boxShadow:'2px 2px 10px 0px #D0D0D0', padding:'30px',  backgroundColor:'#FCFDFD' }} >
            <Grid container spacing={2}>
                      <Grid item xs={12} md={5} sx={{ mt:'7px'}} direction='column'>
                        <Typography variant="subtitle1"><strong>Centro:</strong> {user.centro}</Typography>
                        <Typography variant="subtitle1"><strong>Carrera:</strong> {user.departamento}</Typography>
                        <Typography variant="subtitle1">
                          <strong>{user.numeroCuenta ? "Número de Cuenta: " : "Número Empleado: "}</strong> 
                          {user.numeroCuenta ? user.numeroCuenta : user.numeroEmpleado}
                        </Typography>
                      </Grid>

                      <Divider orientation="vertical" flexItem />

                      <Grid item xs={12} md={6.9} >
                        <Grid display='flex' alignItems='center'>

                        <Typography variant="subtitle1"><strong>Descripción</strong></Typography>
                        <IconButton onClick={editingDescription ? handleSaveDescription : handleEditDescription}>
                          {editingDescription ? <Send fontSize='small' color='primary' /> : <Edit fontSize='small' color='primary' />}
                        </IconButton>
                        {editingDescription && (
                          <IconButton onClick={handleCancelEdit}>
                            <Cancel fontSize='small' color='error'/>
                          </IconButton>
                        )}
                        </Grid>
                      {editingDescription ? (
                        <TextField
                          multiline
                          rows={4}
                          fullWidth
                          inputProps={{ maxLength: 200 }} 
                          value={newDescription}
                          onChange={(e) => setNewDescription(e.target.value)}
                          variant="outlined"
                        />
                      ) : (
                        <Typography variant="body1" sx={{ display: 'inline-block', marginTop: 2 }}>
                          {formState.Descripcion}
                        </Typography>
                      )}
                      </Grid>
                </Grid>
          </Grid>
        </Grid>


        <Grid item xs={12} padding='20px' sx={{boxShadow:'2px 2px 10px 0px #D0D0D0',  backgroundColor:'#FCFDFD' }}>
          <Grid justifyContent='center' container spacing={2}>
            {gallery.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <div
                  {...getRootPropsGallery(index)()}
                  style={{
                    width: '100%',
                    paddingTop: '75%', // Ratio de 4:3
                    backgroundColor: '#f0f0f0',
                    position: 'relative',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    borderRadius: '8px', 
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                  }}
                >
                  {image ? (
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <Typography
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: '#888', // Cambiar color para mejor visibilidad
                      }}
                    >
                      Imagen {index + 1}
                    </Typography>
                  )}
                  <input
                    {...getInputPropsGallery(index)()}
                    style={{ display: 'none' }}
                  />
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>

      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          variant="filled"
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
