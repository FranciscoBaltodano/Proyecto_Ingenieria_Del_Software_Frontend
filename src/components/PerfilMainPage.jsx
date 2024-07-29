import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Typography, Avatar, IconButton, Box, Button, TextField, Snackbar, Alert } from '@mui/material';
import { Edit, Save, Cancel } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

export const PerfilMainPage = () => {
  const { user } = useAuth();
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
        const perfilData = response.data.data;
        setAvatar(perfilData.Fotografia1);
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
      const updatedData = response.data.data;
      setAvatar(updatedData.Fotografia1);
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
    <Box sx={{ padding: '20px', flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} display="flex" alignItems="center">
          <div {...getRootPropsAvatar()} style={{ display: 'inline-block', position: 'relative' }}>
            <Avatar alt="User Photo" src={user.imagen} sx={{ width: 120, height: 120, cursor: 'pointer' }} />
            <input {...getInputPropsAvatar()} style={{ display: 'none' }} />
            <IconButton style={{  position: 'absolute', top: 0, right: -15 }}>
              <Edit />
            </IconButton>
          </div>
          <Typography variant="h5" sx={{ marginLeft: 2 }}>{`${user.nombre} ${user.apellido}`}</Typography>
            <Typography variant="small" sx={{ marginLeft: 2 }}>
            {` ${ user.roles.map( i => i)} `}
            </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1"><strong>Centro:</strong> {user.centro}</Typography>
          <Typography variant="subtitle1"><strong>Carrera:</strong> {user.departamento}</Typography>
          <Typography variant="subtitle1"><strong>Número de Cuenta:</strong> {user.numeroCuenta ? user.numeroCuenta : user.numeroEmpleado}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1"><strong>Descripción</strong></Typography>
           {editingDescription ? (
              <TextField
                multiline
                rows={2}
                fullWidth
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                variant="outlined"
                sx={{ marginRight: 2 }}
              />
            ) : (
              <Typography variant="body1" sx={{ display: 'inline-block', marginRight: 2 }}>
                {formState.Descripcion}
              </Typography>
            )}
            <IconButton onClick={editingDescription ? handleSaveDescription : handleEditDescription}>
              {editingDescription ? <Save /> : <Edit />}
            </IconButton>
            {editingDescription && (
              <IconButton onClick={handleCancelEdit}>
                <Cancel />
              </IconButton>
            )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1"><strong>Mi galería</strong></Typography>
          <Grid container spacing={2}>
            {gallery.map((image, index) => (
              <Grid item xs={4} key={index}>
                <div {...getRootPropsGallery(index)()} style={{ width: '100%', paddingTop: '75%', backgroundColor: '#f0f0f0', position: 'relative', cursor: 'pointer', overflow: 'hidden' }}>
                  {image ? (
                    <img src={image} alt={`Gallery ${index + 1}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <Typography style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>Imagen {index + 1}</Typography>
                  )}
                  <input {...getInputPropsGallery(index)()} style={{ display: 'none' }} />
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