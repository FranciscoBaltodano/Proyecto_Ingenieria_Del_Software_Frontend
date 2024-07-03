import React, { useState } from 'react';
import { Grid, Typography, Avatar, IconButton, Box, Button } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';

export const Profile = () => {
  const [avatar, setAvatar] = useState(null);
  const [gallery, setGallery] = useState([null, null, null]);

  const onDropAvatar = (acceptedFiles) => {
    setAvatar(URL.createObjectURL(acceptedFiles[0]));
  };

  const onDropGallery = (acceptedFiles, index) => {
    const newGallery = [...gallery];
    newGallery[index] = URL.createObjectURL(acceptedFiles[0]);
    setGallery(newGallery);
  };

  const { getRootProps: getRootPropsAvatar, getInputProps: getInputPropsAvatar } = useDropzone({ onDrop: onDropAvatar });
  const getRootPropsGallery = (index) => useDropzone({ onDrop: (acceptedFiles) => onDropGallery(acceptedFiles, index) }).getRootProps;
  const getInputPropsGallery = (index) => useDropzone({ onDrop: (acceptedFiles) => onDropGallery(acceptedFiles, index) }).getInputProps;

  return (
    <Box sx={{ padding: '20px', flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} display="flex" alignItems="center">
          <div {...getRootPropsAvatar()} style={{ display: 'inline-block', position: 'relative' }}>
            <Avatar alt="User Photo" src={avatar || "user-photo.jpg"} sx={{ width: 80, height: 80, cursor: 'pointer' }} />
            <input {...getInputPropsAvatar()} />
            <IconButton style={{ position: 'absolute', top: 0, right: 0 }}>
              <Edit />
            </IconButton>
          </div>
          <Typography variant="h5" sx={{ marginLeft: 2 }}>ESTUDIANTE Enrique Alfonzo Lopez Gonzales</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1"><strong>Carrera:</strong> Ingeniería en Sistemas</Typography>
          <Typography variant="subtitle1"><strong>Indice:</strong> 85</Typography>
          <Typography variant="subtitle1"><strong>Correo institucional:</strong> example@unah.edu.hn</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1"><strong>Mi descripción</strong></Typography>
          <Typography variant="body1">Me llamo Enrique, estoy cursando la carrera de ingeniería en sistemas porque me apasiona la tecnología. Actualmente estoy aprendiendo Java y C++.</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1"><strong>Mi galería</strong></Typography>
          <Grid container spacing={2}>
            {gallery.map((image, index) => (
              <Grid item xs={4} key={index}>
                <div {...getRootPropsGallery(index)} style={{ width: '100%', paddingTop: '100%', backgroundColor: '#f0f0f0', position: 'relative', cursor: 'pointer' }}>
                  {image ? (
                    <img src={image} alt={`Gallery ${index + 1}`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <Typography style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>Subir imagen</Typography>
                  )}
                  <input {...getInputPropsGallery(index)} />
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
